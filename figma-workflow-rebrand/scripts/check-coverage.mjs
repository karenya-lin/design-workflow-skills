import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const key = (source, variant) => JSON.stringify([source, variant]);

export function checkCoverage(manifest) {
  const errors = [];
  const fail = (message) => errors.push(message);
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    return { ok: false, errors: ['Manifest must be an object.'] };
  }
  if (manifest.version !== 1) fail('version must be 1.');
  const names = ['variants', 'sourceFrames', 'sourceEdges', 'excludedFrames', 'excludedEdges', 'frames', 'edges'];
  for (const name of names) {
    if (!Array.isArray(manifest[name])) fail(`${name} must be an array.`);
  }
  if (errors.length) return { ok: false, errors };
  const { variants, sourceFrames, sourceEdges, excludedFrames, excludedEdges, frames, edges } = manifest;
  for (const [name, values] of [['variants', variants], ['sourceFrames', sourceFrames]]) {
    if (!values.length || values.some((value) => !nonempty(value))) fail(`${name} needs nonempty strings.`);
    if (new Set(values).size !== values.length) fail(`${name} contains duplicates.`);
  }
  const frameIds = new Set(sourceFrames);
  const edgeIds = new Set();
  for (const edge of sourceEdges) {
    if (!edge || !nonempty(edge.id) || !frameIds.has(edge.from) || !frameIds.has(edge.to)) {
      fail('Each source edge needs an ID and known frame endpoints.');
      continue;
    }
    if (edgeIds.has(edge.id)) fail(`Duplicate source edge: ${edge.id}`);
    edgeIds.add(edge.id);
  }
  const exclusions = (items, known, label) => {
    const ids = new Set();
    for (const item of items) {
      if (!item || !known.has(item.id) || !nonempty(item.reason)) {
        fail(`${label} needs a known ID and a reason.`);
        continue;
      }
      if (ids.has(item.id)) fail(`Duplicate ${label}: ${item.id}`);
      ids.add(item.id);
    }
    return ids;
  };
  const skippedFrames = exclusions(excludedFrames, frameIds, 'frame exclusion');
  const skippedEdges = exclusions(excludedEdges, edgeIds, 'edge exclusion');
  if (sourceFrames.length && skippedFrames.size === frameIds.size) fail('No included source frames.');
  const activeFrames = sourceFrames.filter((id) => !skippedFrames.has(id));
  const activeEdges = sourceEdges.filter((edge) => edge && !skippedEdges.has(edge.id));
  for (const edge of activeEdges) {
    if (skippedFrames.has(edge.from) || skippedFrames.has(edge.to)) fail(`Retained edge touches excluded frame: ${edge.id}`);
  }
  const frameMap = new Map();
  const destinationIds = new Set();
  for (const frame of frames) {
    if (!frame || !activeFrames.includes(frame.source) || !variants.includes(frame.variant) || !nonempty(frame.target)) {
      fail('Frame mapping needs an included source, known variant and target ID.');
      continue;
    }
    const pair = key(frame.source, frame.variant);
    if (frameMap.has(pair)) fail(`Duplicate frame mapping: ${pair}`);
    if (destinationIds.has(frame.target)) fail(`Reused target frame: ${frame.target}`);
    if (frameIds.has(frame.target)) fail(`Target reuses original frame ID: ${frame.target}`);
    frameMap.set(pair, frame.target);
    destinationIds.add(frame.target);
    for (const check of ['visual', 'content', 'structure']) {
      if (frame.checks?.[check] !== 'passed') fail(`Incomplete ${check} check: ${pair}`);
    }
  }
  for (const source of activeFrames) {
    for (const variant of variants) {
      if (!frameMap.has(key(source, variant))) fail(`Missing frame mapping: ${key(source, variant)}`);
    }
  }
  const activeEdgeMap = new Map(activeEdges.map((edge) => [edge.id, edge]));
  const mappedEdges = new Set();
  for (const edge of edges) {
    if (!edge || !activeEdgeMap.has(edge.source) || !variants.includes(edge.variant)) {
      fail('Edge mapping needs an included source edge and known variant.');
      continue;
    }
    const pair = key(edge.source, edge.variant);
    if (mappedEdges.has(pair)) fail(`Duplicate edge mapping: ${pair}`);
    mappedEdges.add(pair);
    const original = activeEdgeMap.get(edge.source);
    const expectedFrom = frameMap.get(key(original.from, edge.variant));
    const expectedTo = frameMap.get(key(original.to, edge.variant));
    if (!nonempty(edge.from) || !nonempty(edge.to) || edge.from !== expectedFrom || edge.to !== expectedTo) {
      fail(`Incorrect target endpoints: ${pair}`);
    }
    if (edge.status !== 'passed') fail(`Incomplete interaction check: ${pair}`);
  }
  for (const edge of activeEdges) {
    for (const variant of variants) {
      if (!mappedEdges.has(key(edge.id, variant))) fail(`Missing edge mapping: ${key(edge.id, variant)}`);
    }
  }
  return { ok: errors.length === 0, errors, expectedFrames: activeFrames.length * variants.length, expectedEdges: activeEdges.length * variants.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length !== 1 || args[0] === '--help') {
    console.log('Usage: node check-coverage.mjs <manifest.json>');
    process.exitCode = args[0] === '--help' && args.length === 1 ? 0 : 2;
  } else {
    try {
      const result = checkCoverage(JSON.parse(readFileSync(args[0], 'utf8').replace(/^\uFEFF/, '')));
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = result.ok ? 0 : 1;
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 2;
    }
  }
}
