import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultConfig, loadConfig } from "../../src/config.js";
import { diffSnapshots, looksUpgradeable, shouldFail } from "../../src/diff/index.js";
import { upsertComment } from "../../src/github.js";
import { marker, renderMarkdown, renderText } from "../../src/report/markdown.js";
import type { ContractSnapshot, Snapshot } from "../../src/types.js";
import { addr, gap, u256, v } from "./helpers.js";

const initialize = { type: "function" as const, name: "initialize", inputs: [{ name: "owner", type: "address" }], outputs: [], stateMutability: "nonpayable" };

function contract(storage: ContractSnapshot["storage"], extraAbi: ContractSnapshot["abi"] = []): ContractSnapshot {
  return { source: "src/Vault.sol", name: "Vault", deployable: true, abi: [initialize, ...extraAbi], storage };
}

function snap(c: ContractSnapshot): Snapshot {
  return { tool: "slotguard", version: 1, framework: "foundry", contracts: { "src/Vault.sol:Vault": c } };
}

describe("config", () => {
  it("loads .slotguard.json and validates rules", () => {
    const dir = mkdtempSync(join(tmpdir(), "sg-"));
    writeFileSync(join(dir, ".slotguard.json"), JSON.stringify({ failOn: "warning", rules: { "storage-var-renamed": "off" } }));
    const c = loadConfig(dir);
    expect(c.failOn).toBe("warning");
    expect(c.rules["storage-var-renamed"]).toBe("off");
    writeFileSync(join(dir, ".slotguard.json"), JSON.stringify({ rules: { nope: "error" } }));
    expect(() => loadConfig(dir)).toThrow(/unknown rule "nope"/);
  });
});

describe("diffSnapshots", () => {
  it("detects upgradeable contracts by initializer", () => {
    expect(looksUpgradeable(contract([]))).toBe(true);
    expect(looksUpgradeable({ ...contract([]), abi: [] })).toBe(false);
    expect(looksUpgradeable({ ...contract([v("__gap", 0, gap(50))]), abi: [] })).toBe(true);
  });

  it("applies rule overrides and fail-on", () => {
    const base = snap(contract([v("a", 0), v("b", 1)]));
    const head = snap(contract([v("a", 0), v("c", 1)]));
    const config = defaultConfig();
    let r = diffSnapshots(base, head, config);
    expect(r.counts).toMatchObject({ error: 0, warning: 1 });
    expect(shouldFail(r, "error")).toBe(false);
    expect(shouldFail(r, "warning")).toBe(true);
    config.rules["storage-var-renamed"] = "error";
    r = diffSnapshots(base, head, config);
    expect(shouldFail(r, "error")).toBe(true);
    expect(shouldFail(r, "never")).toBe(false);
  });

  it("reports removed contracts", () => {
    const r = diffSnapshots(snap(contract([v("a", 0)])), { tool: "slotguard", version: 1, framework: "foundry", contracts: {} }, defaultConfig());
    expect(r.contracts[0].findings[0].rule).toBe("contract-removed");
  });
});

describe("reports", () => {
  const base = snap(contract([v("owner", 0, addr), v("total", 1, u256)]));
  const head = snap(contract([v("owner", 0, addr), v("fee", 1, u256), v("total", 2, u256)]));
  const result = diffSnapshots(base, head, defaultConfig());

  it("renders markdown with the sticky marker, findings and a layout table", () => {
    const md = renderMarkdown(result, { id: "examples/vault", version: "1.2.3" });
    expect(md.startsWith(marker("examples/vault"))).toBe(true);
    expect(md).toContain("storage-var-inserted");
    expect(md).toContain("| 1 | 0 | `total`: `uint256` | `fee`: `uint256` | changed |");
    expect(md).toContain("v1.2.3");
  });

  it("renders a clean report", () => {
    const md = renderMarkdown(diffSnapshots(base, base, defaultConfig()));
    expect(md).toContain("no breaking storage or ABI changes");
    expect(renderText(diffSnapshots(base, base, defaultConfig()))).toContain("0 errors");
  });
});

describe("upsertComment", () => {
  afterEach(() => vi.unstubAllGlobals());
  const ctx = { token: "t", apiUrl: "https://api.example", repository: "o/r", issueNumber: 7 };

  function stub(existing: { id: number; body: string }[]) {
    const calls: { method: string; url: string }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push({ method: init.method ?? "GET", url });
        return new Response(init.method === "GET" ? JSON.stringify(existing) : "{}", { status: 200 });
      }),
    );
    return calls;
  }

  it("updates the existing comment", async () => {
    const calls = stub([{ id: 1, body: "hi" }, { id: 42, body: `${marker()}\nold` }]);
    expect(await upsertComment(ctx, "default", "new", true)).toBe("updated");
    expect(calls[1]).toEqual({ method: "PATCH", url: "https://api.example/repos/o/r/issues/comments/42" });
  });

  it("creates a comment only when asked", async () => {
    let calls = stub([]);
    expect(await upsertComment(ctx, "default", "new", false)).toBe("skipped");
    expect(calls).toHaveLength(1);
    calls = stub([]);
    expect(await upsertComment(ctx, "default", "new", true)).toBe("created");
    expect(calls[1]).toEqual({ method: "POST", url: "https://api.example/repos/o/r/issues/7/comments" });
  });
});
