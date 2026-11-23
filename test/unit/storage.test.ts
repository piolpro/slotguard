import { describe, expect, it } from "vitest";
import { diffStorage } from "../../src/diff/storage.js";
import type { RuleId, StorageVar } from "../../src/types.js";
import { addr, bool, gap, mapping, struct, u128, u256, v } from "./helpers.js";

function rules(base: StorageVar[], head: StorageVar[]): RuleId[] {
  const out: RuleId[] = [];
  diffStorage(base, head, (r) => out.push(r));
  return out;
}

describe("diffStorage", () => {
  it("reports nothing for identical layouts", () => {
    const layout = [v("a", 0), v("b", 1)];
    expect(rules(layout, layout)).toEqual([]);
  });

  it("allows appending", () => {
    expect(rules([v("a", 0)], [v("a", 0), v("b", 1)])).toEqual(["storage-var-appended"]);
  });

  it("flags an inserted variable and the ones it shifts", () => {
    expect(rules([v("a", 0), v("b", 1)], [v("x", 0), v("a", 1), v("b", 2)]).sort()).toEqual(
      ["storage-var-inserted", "storage-var-moved", "storage-var-moved"].sort(),
    );
  });

  it("flags reordered variables", () => {
    expect(rules([v("a", 0), v("b", 1)], [v("b", 0), v("a", 1)])).toEqual(["storage-var-moved", "storage-var-moved"]);
  });

  it("flags a retyped variable", () => {
    expect(rules([v("a", 0, u256)], [v("a", 0, addr)])).toEqual(["storage-type-changed"]);
  });

  it("flags a removed variable", () => {
    expect(rules([v("a", 0), v("b", 1)], [v("a", 0)])).toEqual(["storage-var-removed"]);
  });

  it("treats a same-type rename as a warning and a different-type one as a replacement", () => {
    expect(rules([v("a", 0)], [v("b", 0)])).toEqual(["storage-var-renamed"]);
    expect(rules([v("a", 0, u256)], [v("b", 0, bool)])).toEqual(["storage-var-replaced"]);
  });

  it("detects packing changes", () => {
    const base = [v("a", 0, u128), v("b", 0, u128, 16)];
    const head = [v("a", 0, u128), v("c", 0, bool, 16), v("b", 1, u128)];
    expect(rules(base, head).sort()).toEqual(["storage-var-inserted", "storage-var-moved"].sort());
  });

  it("warns about a variable packed into unused bytes without moving anything", () => {
    expect(rules([v("a", 0, addr), v("b", 1)], [v("a", 0, addr), v("fee", 0, bool, 20), v("b", 1)])).toEqual(["storage-var-packed"]);
  });

  it("accepts new variables that consume a storage gap", () => {
    const base = [v("a", 0), v("__gap", 1, gap(49)), v("child", 50)];
    const head = [v("a", 0), v("b", 1), v("__gap", 2, gap(48)), v("child", 50)];
    expect(rules(base, head).sort()).toEqual(["storage-gap-consumed", "storage-var-appended"].sort());
  });

  it("rejects a gap that was not shrunk to match", () => {
    const base = [v("a", 0), v("__gap", 1, gap(49)), v("child", 50)];
    const head = [v("a", 0), v("b", 1), v("__gap", 2, gap(49)), v("child", 51)];
    const r = rules(base, head);
    expect(r).toContain("storage-gap-changed");
    expect(r).toContain("storage-var-moved");
  });

  it("allows struct members appended inside a mapping", () => {
    const s1 = struct("struct V.Pos", [["amount", u256]]);
    const s2 = struct("struct V.Pos", [["amount", u256], ["since", u256]]);
    expect(rules([v("m", 0, mapping(addr, s1)), v("z", 1)], [v("m", 0, mapping(addr, s2)), v("z", 1)])).toEqual(["storage-type-compatible"]);
  });

  it("rejects struct members appended to a struct stored inline before other variables", () => {
    const s1 = struct("struct V.Pos", [["amount", u256]]);
    const s2 = struct("struct V.Pos", [["amount", u256], ["since", u256]]);
    expect(rules([v("p", 0, s1), v("z", 1)], [v("p", 0, s2), v("z", 2)])).toContain("storage-type-changed");
  });

  it("rejects reordered struct members", () => {
    const s1 = struct("struct V.Pos", [["amount", u256], ["owner", addr]]);
    const s2 = struct("struct V.Pos", [["owner", addr], ["amount", u256]]);
    expect(rules([v("m", 0, mapping(addr, s1))], [v("m", 0, mapping(addr, s2))])).toEqual(["storage-type-changed"]);
  });

  it("treats address to contract type as compatible", () => {
    const token = { kind: "value" as const, label: "contract IERC20", bytes: 20 };
    expect(rules([v("t", 0, addr)], [v("t", 0, token)])).toEqual(["storage-type-compatible"]);
  });

  it("flags changed mapping keys", () => {
    expect(rules([v("m", 0, mapping(addr, u256))], [v("m", 0, mapping(u256, u256))])).toEqual(["storage-type-changed"]);
  });
});
