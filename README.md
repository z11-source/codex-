# codex-prompt-card

A tiny command line helper that prints reusable prompt cards for Codex tasks.

It is intentionally small: no dependencies, no build step, just Node.js.

## Usage

```bash
node ./bin/codex-prompt-card.mjs list
node ./bin/codex-prompt-card.mjs make bugfix "fix the save button"
```

Templates:

- `bugfix`
- `feature`
- `review`

## Example

```bash
node ./bin/codex-prompt-card.mjs make feature "add a CSV export button"
```

## Test

```bash
node --test
```

## License

MIT
