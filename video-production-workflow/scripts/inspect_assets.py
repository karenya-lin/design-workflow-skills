#!/usr/bin/env python3
"""Read-only local asset summary: existence, SHA-256, and PNG IHDR dimensions.

No image decoding, network, environment-file reading, installation, or mutation of
source assets. Native/upscaled provenance is never inferred from image size.
"""

import argparse
import hashlib
import json
from pathlib import Path
import re
import struct
import sys
import zlib


PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
HEX_SHA256 = re.compile(r"^[0-9a-fA-F]{64}$")


class ManifestError(ValueError):
    """Invalid input; messages deliberately omit private paths and contents."""


def forbidden_path(path):
    """Refuse remote paths and environment files, including resolved targets."""
    value = str(path)
    if value.startswith(("\\\\", "//")) or "://" in value:
        return True
    return any(part.casefold() == ".env" or part.casefold().startswith(".env.")
               for part in Path(value).parts)


def validate_manifest(data):
    if not isinstance(data, dict) or not isinstance(data.get("assets"), list):
        raise ManifestError("Expected an object containing an assets array.")
    if not data["assets"]:
        raise ManifestError("The assets array must contain at least one asset.")
    seen = set()
    for row in data["assets"]:
        if not isinstance(row, dict):
            raise ManifestError("Every asset must be an object.")
        ident = row.get("id")
        if not isinstance(ident, str) or not ident.strip() or ident in seen:
            raise ManifestError("Asset IDs must be nonempty, unique strings.")
        seen.add(ident)
        if not isinstance(row.get("path"), str) or not row["path"].strip():
            raise ManifestError("Every asset needs a nonempty local path.")
        digest = row.get("sha256")
        if digest is not None and (not isinstance(digest, str)
                                   or not HEX_SHA256.fullmatch(digest)):
            raise ManifestError("Expected SHA-256 values must be 64 hex characters.")
        for key in ("requiredWidth", "requiredHeight"):
            value = row.get(key)
            if value is not None and (isinstance(value, bool)
                                      or not isinstance(value, int) or value <= 0):
                raise ManifestError("Dimension targets must be positive integers.")
    return data["assets"]


def png_dimensions(header):
    """Validate the signature and IHDR structure/CRC; not the complete pixels."""
    if not header.startswith(PNG_SIGNATURE):
        return None, "FORMAT_UNVERIFIED"
    if len(header) < 33:
        return None, "PNG_HEADER_INVALID"
    length, kind = struct.unpack(">I4s", header[8:16])
    if length != 13 or kind != b"IHDR":
        return None, "PNG_HEADER_INVALID"
    expected_crc = struct.unpack(">I", header[29:33])[0]
    actual_crc = zlib.crc32(header[12:29]) & 0xffffffff
    width, height = struct.unpack(">II", header[16:24])
    if expected_crc != actual_crc or width <= 0 or height <= 0:
        return None, "PNG_HEADER_INVALID"
    return {"width": width, "height": height}, None


def provenance_summary(value):
    # The manifest may quote a receipt. This script neither reads that receipt
    # nor verifies native generation, upscaling, region coverage, or visual quality.
    if isinstance(value, str):
        claimed = value.casefold() if value.casefold() in ("native", "upscaled") else "unknown"
        receipt_supplied = False
    elif isinstance(value, dict):
        raw = value.get("kind", value.get("type", "unknown"))
        claimed = raw.casefold() if isinstance(raw, str) and raw.casefold() in ("native", "upscaled") else "unknown"
        receipt_supplied = bool(value.get("receipt"))
    else:
        claimed, receipt_supplied = "unknown", False
    return {"claimed": claimed, "receiptSupplied": receipt_supplied,
            "verification": "UNVERIFIED_RECEIPT_NOT_READ"}


def inspect_asset(row, manifest_directory):
    result = {"id": row["id"], "exists": None, "sha256": None,
              "dimensions": None, "findings": [],
              "provenance": provenance_summary(row.get("provenance"))}
    try:
        path = Path(row["path"])
        if forbidden_path(row["path"]):
            result["findings"].append("PATH_REFUSED")
        else:
            if not path.is_absolute():
                path = Path(manifest_directory) / path
            path = path.resolve()
            if forbidden_path(path):
                result["findings"].append("PATH_REFUSED")
            elif not path.is_file():
                result["exists"] = False
                result["findings"].append("MISSING_OR_NOT_FILE")
            else:
                result["exists"] = True
                digest = hashlib.sha256()
                with path.open("rb") as stream:
                    header = stream.read(33)
                    digest.update(header)
                    for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                        digest.update(chunk)
                result["sha256"] = digest.hexdigest()
                expected = row.get("sha256")
                result["shaCheck"] = ("MATCH" if expected.lower() == result["sha256"]
                                      else "MISMATCH") if expected else "NOT_REQUESTED"
                if result["shaCheck"] == "MISMATCH":
                    result["findings"].append("SHA256_MISMATCH")
                dimensions, problem = png_dimensions(header)
                result["dimensions"] = dimensions
                if problem:
                    result["findings"].append(problem)
                    result["dimensionCheck"] = "UNVERIFIED"
                elif any(row.get(key) is not None and dimensions[axis] < row[key]
                         for key, axis in (("requiredWidth", "width"),
                                           ("requiredHeight", "height"))):
                    result["dimensionCheck"] = "UNDER_TARGET"
                    result["findings"].append("UNDER_TARGET")
                else:
                    result["dimensionCheck"] = ("MET" if any(
                        row.get(k) is not None for k in ("requiredWidth", "requiredHeight"))
                        else "NOT_REQUESTED")
    except (OSError, ValueError, RuntimeError):
        result["findings"].append("READ_ERROR")
    result["status"] = "FINDINGS" if result["findings"] else "BASIC_FILE_CHECKS_MET"
    return result


def inspect_manifest(data, manifest_directory):
    rows = validate_manifest(data)
    results = [inspect_asset(row, manifest_directory) for row in rows]
    counts = {"assets": len(results),
              "basicFileChecksMet": sum(r["status"] == "BASIC_FILE_CHECKS_MET" for r in results),
              "withFindings": sum(bool(r["findings"]) for r in results)}
    return {"scope": "Existence, SHA-256 and PNG IHDR only; not visual or provenance acceptance.",
            "counts": counts, "assets": results}


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="Summarize local assets without altering them. Exit 0: basic file checks met; "
                    "1: asset findings/unverified format; 2: input or report error.")
    parser.add_argument("manifest", help="Local JSON manifest containing assets[{id,path,...}].")
    parser.add_argument("--output", help="Write a new JSON report exclusively; existing files are refused.")
    args = parser.parse_args(argv)
    try:
        manifest = Path(args.manifest)
        if forbidden_path(args.manifest) or forbidden_path(manifest.resolve()):
            raise ManifestError("Manifest path refused.")
        with manifest.open("r", encoding="utf-8-sig") as stream:
            data = json.load(stream)
        report = inspect_manifest(data, manifest.resolve().parent)
        serialized = json.dumps(report, ensure_ascii=False, separators=(",", ":")) + "\n"
        if args.output:
            destination = Path(args.output)
            if forbidden_path(args.output) or forbidden_path(destination.resolve()):
                raise ManifestError("Output path refused.")
            # Do not make directories or overwrite an existing asset/report.
            with destination.open("x", encoding="utf-8", newline="\n") as stream:
                stream.write(serialized)
        else:
            sys.stdout.write(serialized)
        return 1 if report["counts"]["withFindings"] else 0
    except (ManifestError, OSError, ValueError, RuntimeError, UnicodeError):
        sys.stderr.write('{"error":"INPUT_OR_REPORT_ERROR","exitCode":2}\n')
        return 2


if __name__ == "__main__":
    sys.exit(main())
