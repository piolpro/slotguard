import { copyFileSync, existsSync, mkdirSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { cli, repo } from "./helpers.js";

const example = join(__dirname, "../../examples/hardhat-vault");
const v2 = join(__dirname, "../fixtures/vault-v2.sol");

describe.skipIf(!existsSync(join(example, "node_modules/hardhat")))("hardhat end to end", () => {
  let r: ReturnType<typeof repo>;

  beforeAll(() => {
    r = repo(
      (dir) => {
        for (const f of ["hardhat.config.ts", "package.json", "package-lock.json", ".slotguard.json"]) copyFileSync(join(example, f), join(dir, f));
        writeFileSync(join(dir, ".gitignore"), "node_modules\nartifacts\ncache\n");
        symlinkSync(join(example, "node_modules"), join(dir, "node_modules"), "dir");
        mkdirSync(join(dir, "contracts"));
        copyFileSync(join(example, "contracts/Vault.sol"), join(dir, "contracts/Vault.sol"));
      },
      (dir) => copyFileSync(v2, join(dir, "contracts/Vault.sol")),
    );
  });
  afterAll(() => r?.cleanup());

  it("catches the inserted variable and the changed event", () => {
    const res = cli(r.dir, ["check", "--base", "main", "--format", "json", "-q"]);
    expect(res.status, res.stderr).toBe(1);
    const json = JSON.parse(res.stdout);
    expect(json.checked).toEqual(["contracts/Vault.sol:Vault"]);
    const rules = json.contracts[0].findings.map((f: { rule: string }) => f.rule);
    expect(rules).toContain("storage-var-inserted");
    expect(rules).toContain("storage-var-moved");
    expect(rules).toContain("abi-event-removed");
  });
});
