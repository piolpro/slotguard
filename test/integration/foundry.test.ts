import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { cli, copy, has, repo } from "./helpers.js";

const fixture = join(__dirname, "../fixtures/basic");

describe.skipIf(!has("forge"))("foundry end to end", () => {
  let r: ReturnType<typeof repo>;
  let report: { counts: Record<string, number>; checked: string[]; contracts: { contract: string; findings: { rule: string; message: string }[] }[] };
  let status: number;

  beforeAll(() => {
    r = repo(
      (dir) => {
        copyFileSync(join(fixture, "foundry.toml"), join(dir, "foundry.toml"));
        copy(join(fixture, "v1"), dir);
      },
      (dir) => copy(join(fixture, "v2"), dir),
    );
    const res = cli(r.dir, ["check", "--base", "main", "--format", "json", "-q"]);
    status = res.status;
    if (!res.stdout) throw new Error(res.stderr);
    report = JSON.parse(res.stdout);
  });
  afterAll(() => r?.cleanup());

  it("fails with exit code 1", () => expect(status).toBe(1));

  it("only checks contracts that look upgradeable", () => expect(report.checked).toEqual(["src/Box.sol:Box"]));

  it("reports the expected breaking changes", () => {
    const rules = report.contracts[0].findings.map((f) => f.rule).sort();
    expect(rules).toEqual(
      [
        "abi-event-indexed-changed",
        "abi-event-removed",
        "abi-function-added",
        "abi-function-added",
        "abi-function-outputs-changed",
        "abi-function-outputs-changed",
        "abi-function-outputs-changed",
        "abi-function-removed",
        "abi-function-removed",
        "storage-gap-consumed",
        "storage-type-changed",
        "storage-type-compatible",
        "storage-var-appended",
      ].sort(),
    );
  });

  it("explains the retyped slot and the removed event", () => {
    const messages = report.contracts[0].findings.map((f) => f.message).join("\n");
    expect(messages).toMatch(/value.*uint256.*uint128/);
    expect(messages).toContain("AdminChanged(address)");
  });

  it("passes when nothing breaking changed", () => {
    const res = cli(r.dir, ["check", "--base", "feature", "-q"]);
    expect(res.status).toBe(0);
    expect(res.stdout).toContain("1 contract checked: 0 errors");
  });

  it("checks every contract with --scope all", () => {
    const res = cli(r.dir, ["check", "--base", "main", "--scope", "all", "--format", "json", "-q"]);
    const json = JSON.parse(res.stdout);
    expect(json.checked).toContain("src/Box.sol:Plain");
    const plain = json.contracts.find((c: { contract: string }) => c.contract === "src/Box.sol:Plain");
    expect(plain.findings.map((f: { rule: string }) => f.rule)).toContain("storage-var-moved");
  });
});
