# Contributing

Bug reports with a minimal before/after pair of contracts are the most useful thing you can send: open an issue with both versions and the output you expected.

To work on slotguard:

1. `git clone --recursive https://github.com/piolpro/slotguard && cd slotguard`
2. `npm ci && (cd examples/hardhat-vault && npm ci)`
3. Make your change, with a unit test in `test/unit` or a fixture in `test/fixtures`.
4. `npm run typecheck && npm run build && npm test`, then commit `dist/` together with the source.

New rules go in `src/rules.ts`; run `npm run gen` to update `docs/rules.md` and `schema.json`.
