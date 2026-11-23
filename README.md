# slotguard

Catch storage layout and ABI breaking changes in upgradeable Solidity contracts before they reach a proxy.

slotguard builds your contracts on the PR's base branch and on the PR itself, compares the storage layout and ABI of every contract that looks upgradeable, and comments on the PR when something would corrupt proxy state or break integrators. It works with **Foundry** and **Hardhat** (2 and 3), as a **GitHub Action** or a **CLI**.

```text
src/Vault.sol:Vault
  error    storage-var-moved      totalShares (uint256) moved from slot 1 to slot 2. Existing data stays at the old slot.
  error    storage-var-inserted   withdrawFeeBps (uint256) was inserted at slot 1, on top of base variable totalShares (uint256). Variables after it shift and read the wrong data.
  error    abi-event-removed      Event Withdrawn(address,uint256,uint256) was removed. Now: Withdrawn(address,uint256,uint256,uint256).

1 contract checked: 6 errors, 0 warnings, 2 info
```

## What it catches

**Storage layout** (compared slot by slot and byte by byte, including packed variables, structs inside mappings and arrays):

- Variables inserted in the middle of the layout, and every variable they shift
- Reordered, removed or retyped variables (`uint256` → `uint128`, changed mapping keys, reordered struct members)
- Storage gaps (`__gap`) that were not shrunk to match the variables added above them
- Renames at the same slot (warning), and safe changes: appended variables, members appended to structs stored in mappings, gaps consumed correctly

**ABI**:

- Removed or re-signed functions, events and custom errors
- Changed return types, state mutability, and `indexed` event parameters
- Removed `receive` / `fallback`

Every finding has a rule id with a documented default severity, which you can override. See [docs/rules.md](docs/rules.md).

## GitHub Action

```yaml
# .github/workflows/slotguard.yml
name: slotguard
on: pull_request

permissions:
  contents: read
  pull-requests: write # for the PR comment

jobs:
  slotguard:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0 # the base commit must be available
          submodules: recursive
      - uses: foundry-rs/foundry-toolchain@v1
      - uses: piolpro/slotguard@v0
```

For Hardhat, install your dependencies instead of Foundry:

```yaml
      - uses: actions/setup-node@v5
        with:
          node-version: 24
      - run: npm ci
      - uses: piolpro/slotguard@v0
```

The action posts one sticky comment per project and updates it on every push, writes the same report to the job summary, annotates findings, and fails the job when there are findings at or above `fail-on`.

| Input | Default | Description |
| --- | --- | --- |
| `working-directory` | `.` | Project directory with `foundry.toml` or `hardhat.config.*`. Use one step per project in a monorepo. |
| `base-ref` | PR base SHA | Ref or SHA to compare against. On `push` it defaults to the previous commit. |
| `framework` | `auto` | `foundry`, `hardhat` or `auto`. |
| `scope` | `upgradeable` | `all` checks every deployable contract, not just upgradeable ones. |
| `fail-on` | `error` | `error`, `warning`, `info` or `never`. |
| `comment` | `on-change` | `on-change` comments once there are findings and keeps the comment updated; `always`; `never`. |
| `config` | | Config file path, relative to `working-directory`. |
| `build-command` | | Custom build command, run on both sides. |
| `base-setup-command` | | Installs dependencies in the base checkout when its lockfile differs from the PR's. |
| `github-token` | `github.token` | Token for the PR comment. |

Outputs: `errors`, `warnings`, `checked`, `report-path`, `json-path`.

PRs from forks get a read-only token, so the comment is skipped there; the report is still in the job summary and the check still fails.

## CLI

Download `cli.js` from the [latest release](https://github.com/piolpro/slotguard/releases/latest) (a single file, Node 20+, no dependencies), or run it from a clone:

```sh
curl -fsSLo slotguard.js https://github.com/piolpro/slotguard/releases/latest/download/cli.js
node slotguard.js check --base origin/main
```

```text
slotguard check [--base <ref>]          Build the base ref and the working tree, then diff them
slotguard snapshot [--out <file>]       Write the storage layout + ABI snapshot of the working tree
slotguard diff <base.json> <head.json>  Diff two snapshots
```

`check` compares your working tree, including uncommitted changes, against `--base` (default `origin/main`). The base is built in a temporary `git worktree`, reusing your submodules, `node_modules` and Soldeer `dependencies` when the lockfiles match. Use `--format markdown|json`, `--fail-on`, `--scope all` and `--no-build` (read existing artifacts) as needed; `slotguard --help` lists everything.

Snapshots are useful for comparing against what is actually deployed: commit `slotguard snapshot --out deployed/v1.json` when you release, then run `slotguard diff deployed/v1.json head.json`.

Exit codes: `0` no findings at the `--fail-on` level, `1` findings, `2` usage or build error.

## Which contracts are checked

By default, deployable contracts that look upgradeable: they have an `initialize*` function, `upgradeTo`/`upgradeToAndCall`/`proxiableUUID`, an `Initialized` event, a `__gap`, or an `_initialized` variable. Contracts in `lib/`, `node_modules/`, `dependencies/`, `test/`, `script/` and `mocks/` are skipped. Add others explicitly in the config file:

```json
{
  "$schema": "https://raw.githubusercontent.com/piolpro/slotguard/main/schema.json",
  "contracts": ["Vault", "src/core/**"],
  "extraExclude": ["src/legacy/**"],
  "failOn": "warning",
  "rules": {
    "storage-var-renamed": "error",
    "abi-function-mutability-changed": "off"
  }
}
```

Save it as `.slotguard.json` or `slotguard.config.json` in the project directory. `include`, `exclude`, `extraExclude` and `contracts` take globs over source paths (`src/Vault.sol`) or fully qualified names (`src/Vault.sol:Vault`); `contracts` also accepts plain contract names.

## How it works

slotguard reads the compiler's own `storageLayout` output, so what it compares is exactly what solc will lay out:

- **Foundry**: `forge build --extra-output storageLayout` into a temporary directory, so your `out/` and cache are untouched.
- **Hardhat**: `hardhat compile`/`build`, then the build-info files. If they lack storage layouts, slotguard recompiles the same inputs with the same solc that Hardhat downloaded, adding `storageLayout` to the output selection. To skip the recompile, add `"*": { "*": ["storageLayout"] }` to `solidity.settings.outputSelection`.

Types are normalized recursively (structs, mappings, arrays, enums, contracts), so a member reordered inside a struct inside a mapping is reported, while `address` → `IERC20` is not.

OpenZeppelin Contracts 5 keeps its own state in ERC-7201 namespaced storage, which does not appear in the layout; slotguard checks your contract's own variables. If you use ERC-7201 for your own state, the namespaced structs are not compared yet.

## Example

[`examples/foundry-vault`](examples/foundry-vault) and [`examples/hardhat-vault`](examples/hardhat-vault) are a small UUPS vault built on OpenZeppelin Contracts Upgradeable. The [`slotguard examples`](.github/workflows/examples.yml) workflow runs the action from this repository on both for every PR that touches them.

## Development

```sh
git clone --recursive https://github.com/piolpro/slotguard && cd slotguard
npm ci && (cd examples/hardhat-vault && npm ci)
npm run typecheck && npm run build && npm test
```

Integration tests need `forge` on the `PATH`. `dist/` is committed because GitHub runs the action from it; run `npm run build` before committing. `npm run gen` regenerates `docs/rules.md` and `schema.json` from `src/rules.ts`.

## License

[MIT](LICENSE)
