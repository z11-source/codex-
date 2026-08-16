#!/usr/bin/env node
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { makePromptCard, listTemplates } from '../src/prompt-card.mjs';

const HELP = `codex-prompt-card

Usage:
  codex-prompt-card list
  codex-prompt-card make <bugfix|feature|review> <task>

Examples:
  codex-prompt-card list
  codex-prompt-card make bugfix "fix the broken save button"
`;

export async function main(argv = process.argv.slice(2), io = console) {
  const [command, template, ...taskParts] = argv;

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    io.log(HELP.trimEnd());
    return 0;
  }

  if (command === 'list') {
    io.log(listTemplates().join('\n'));
    return 0;
  }

  if (command === 'make') {
    io.log(makePromptCard(template, taskParts.join(' ')));
    return 0;
  }

  throw new Error(`Unknown command: ${command}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then((code) => {
    process.exitCode = code;
  }).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
