import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listTemplates, makePromptCard } from '../src/prompt-card.mjs';

const execFileAsync = promisify(execFile);

test('makePromptCard prints a useful bugfix task card', () => {
  const card = makePromptCard('bugfix', '修复保存按钮点不了');

  assert.match(card, /Codex Task Card/);
  assert.match(card, /修复保存按钮点不了/);
  assert.match(card, /Goal/);
  assert.match(card, /Context/);
  assert.match(card, /Acceptance/);
  assert.match(card, /Run the smallest relevant verification/);
});

test('makePromptCard rejects unknown templates', () => {
  assert.throws(
    () => makePromptCard('unknown', 'anything'),
    /Unknown template: unknown/
  );
});

test('listTemplates returns stable built-in template names', () => {
  assert.deepEqual(listTemplates(), ['bugfix', 'feature', 'review']);
});

test('CLI list prints templates', async () => {
  const { stdout } = await execFileAsync(process.execPath, ['./bin/codex-prompt-card.mjs', 'list']);

  assert.match(stdout, /bugfix/);
  assert.match(stdout, /feature/);
  assert.match(stdout, /review/);
});
