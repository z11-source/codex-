const TEMPLATES = {
  bugfix: {
    label: 'Bug Fix',
    focus: 'Find the root cause, make the smallest fix, and verify the original symptom.'
  },
  feature: {
    label: 'Feature',
    focus: 'Build the smallest useful version, follow the existing project style, and verify the main path.'
  },
  review: {
    label: 'Code Review',
    focus: 'Review for bugs, regressions, missing tests, and risky assumptions before summarizing.'
  }
};

export function listTemplates() {
  return Object.keys(TEMPLATES).sort();
}

export function makePromptCard(templateName, task = '') {
  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Unknown template: ${templateName}`);
  }

  const cleanTask = task.trim() || 'Describe the task here';

  return [
    '# Codex Task Card',
    '',
    `Type: ${template.label}`,
    `Task: ${cleanTask}`,
    '',
    '## Goal',
    template.focus,
    '',
    '## Context',
    '- Read the nearby files before editing.',
    '- Keep the change small and easy to explain.',
    '',
    '## Acceptance',
    '- The requested task is complete.',
    '- Run the smallest relevant verification.',
    '- Report what changed and anything not verified.'
  ].join('\n');
}
