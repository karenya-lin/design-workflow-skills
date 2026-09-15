import assert from 'node:assert/strict';
import test from 'node:test';
import { checkCoverage } from './check-coverage.mjs';

function fixture() {
  const variants = ['brand-b/en', 'brand-b/ar'];
  const sourceFrames = ['list', 'detail', 'error-overlay'];
  const sourceEdges = [
    { id: 'open-detail', from: 'list', to: 'detail' },
    { id: 'show-error', from: 'detail', to: 'error-overlay' },
    { id: 'retry', from: 'error-overlay', to: 'detail' },
  ];
  return {
    version: 1, variants, sourceFrames, sourceEdges, excludedFrames: [], excludedEdges: [],
    frames: variants.flatMap((variant) => sourceFrames.map((source) => ({
      source, variant, target: `${variant}:${source}`,
      checks: { visual: 'passed', content: 'passed', structure: 'passed' },
    }))),
    edges: variants.flatMap((variant) => sourceEdges.map((edge) => ({
      source: edge.id, variant, from: `${variant}:${edge.from}`, to: `${variant}:${edge.to}`, status: 'passed',
    }))),
  };
}

test('covers both languages, overlay and retry branch', () => {
  assert.deepEqual(checkCoverage(fixture()), { ok: true, errors: [], expectedFrames: 6, expectedEdges: 6 });
});
test('rejects missing alternate-language error state', () => {
  const input = fixture();
  input.frames.pop();
  assert.equal(checkCoverage(input).ok, false);
});
test('rejects duplicate mappings and reused destination IDs', () => {
  const input = fixture();
  input.frames.push(structuredClone(input.frames[0]));
  const result = checkCoverage(input);
  assert.ok(result.errors.some((error) => error.includes('Duplicate frame mapping')));
  assert.ok(result.errors.some((error) => error.includes('Reused target frame')));
});
test('rejects navigation into original or another language', () => {
  for (const destination of ['detail', 'brand-b/ar:detail']) {
    const input = fixture();
    input.edges[0].to = destination;
    assert.equal(checkCoverage(input).ok, false);
  }
});
test('rejects missing and duplicate branches', () => {
  const input = fixture();
  input.edges.pop();
  input.edges.push(structuredClone(input.edges[0]));
  const result = checkCoverage(input);
  assert.ok(result.errors.some((error) => error.includes('Missing edge mapping')));
  assert.ok(result.errors.some((error) => error.includes('Duplicate edge mapping')));
});
test('requires actual recorded review completion', () => {
  const input = fixture();
  input.frames[0].checks.visual = 'pending';
  input.edges[0].status = 'failed';
  assert.equal(checkCoverage(input).ok, false);
});
test('allows explicit archive exclusion without silently excluding connected branches', () => {
  const input = fixture();
  input.sourceFrames.push('archive');
  input.excludedFrames.push({ id: 'archive', reason: 'Outside the approved workflow' });
  assert.equal(checkCoverage(input).ok, true);
  input.sourceEdges.push({ id: 'archive-link', from: 'list', to: 'archive' });
  assert.equal(checkCoverage(input).ok, false);
  input.excludedEdges.push({ id: 'archive-link', reason: 'Archived destination is outside scope' });
  assert.equal(checkCoverage(input).ok, true);
});
test('rejects exclusions without reasons and source ID reuse', () => {
  const input = fixture();
  input.excludedFrames.push({ id: 'list', reason: '' });
  input.frames[0].target = 'list';
  assert.equal(checkCoverage(input).ok, false);
});
test('rejects malformed roots and entries without throwing', () => {
  for (const input of [null, [], {}, { version: 1, frames: null }]) {
    assert.equal(checkCoverage(input).ok, false);
  }
  for (const field of ['sourceEdges', 'excludedFrames', 'excludedEdges', 'frames', 'edges']) {
    const input = fixture();
    input[field].push(null);
    assert.equal(checkCoverage(input).ok, false);
  }
});
test('rejects unknown sources, variants and duplicated inventories', () => {
  const input = fixture();
  input.sourceFrames.push('list');
  input.variants.push('brand-b/en');
  input.sourceEdges.push({ id: 'unknown', from: 'missing', to: 'detail' });
  input.frames[0].variant = 'unrequested';
  input.edges[0].source = 'unlisted-edge';
  assert.equal(checkCoverage(input).ok, false);
});
test('does not mutate the manifest', () => {
  const input = fixture();
  const before = structuredClone(input);
  checkCoverage(input);
  assert.deepEqual(input, before);
});
test('rejects an empty or wholly excluded inventory', () => {
  const input = fixture();
  input.excludedFrames = input.sourceFrames.map((id) => ({ id, reason: 'No work' }));
  assert.equal(checkCoverage(input).ok, false);
  input.sourceFrames = [];
  assert.equal(checkCoverage(input).ok, false);
});
