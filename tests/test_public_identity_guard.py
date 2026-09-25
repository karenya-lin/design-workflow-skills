"""The public identity guard names one address and both hooks are wired to it.

The hooks are shell, so this does not run them. It pins what a reader of
docs/PUBLIC-IDENTITY.md is promised: the approved address is the GitHub
noreply one, both hooks refuse on it, and both can be skipped only by the
documented variable. A change to any of those shows up here.
"""

import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
APPROVED = "99601006+karenya-lin@users.noreply.github.com"


class PublicIdentityGuardTest(unittest.TestCase):
    def read(self, relative):
        return (ROOT / relative).read_text(encoding="utf-8")

    def test_hooks_pin_the_noreply_identity(self):
        for hook in ("pre-commit", "pre-push"):
            body = self.read(f".githooks/{hook}")
            self.assertIn(f'APPROVED="{APPROVED}"', body, hook)
            self.assertIn("SKIP_IDENTITY_GUARD", body, hook)
            self.assertTrue(body.startswith("#!/bin/sh"), hook)

    def test_hooks_do_not_rewrite_history(self):
        for hook in ("pre-commit", "pre-push"):
            body = self.read(f".githooks/{hook}")
            for forbidden in ("git filter-repo", "git filter-branch", "git rebase", "git commit --amend", "git push --force", "push -f "):
                self.assertNotIn(forbidden, body, f"{hook} must only refuse, never rewrite")

    def test_document_names_the_same_identity_and_the_hooks(self):
        doc = self.read("docs/PUBLIC-IDENTITY.md")
        self.assertIn(APPROVED, doc)
        self.assertIn("core.hooksPath .githooks", doc)
        self.assertIn(".githooks/pre-commit", doc)
        self.assertIn(".githooks/pre-push", doc)

    def test_no_personal_gmail_in_tracked_text(self):
        # File bodies were clean before the rewrite; keep them that way.
        for path in ROOT.rglob("*"):
            if path.is_dir() or ".git" in path.parts:
                continue
            if path.suffix.lower() in {".png", ".webp", ".webm", ".jpg", ".jpeg", ".gif", ".ico", ".woff", ".woff2", ".pyc"}:
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            if path == pathlib.Path(__file__).resolve():
                continue
            self.assertNotIn("@" + "gmail.com", text, str(path.relative_to(ROOT)))


if __name__ == "__main__":
    unittest.main()
