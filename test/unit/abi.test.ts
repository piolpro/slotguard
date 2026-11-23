import { describe, expect, it } from "vitest";
import { diffAbi, signature } from "../../src/diff/abi.js";
import type { AbiEntry, RuleId } from "../../src/types.js";

const fn = (name: string, inputs: string[], outputs: string[] = [], stateMutability = "nonpayable"): AbiEntry => ({
  type: "function",
  name,
  inputs: inputs.map((type) => ({ name: "", type })),
  outputs: outputs.map((type) => ({ name: "", type })),
  stateMutability,
});
const ev = (name: string, inputs: [string, boolean][]): AbiEntry => ({
  type: "event",
  name,
  inputs: inputs.map(([type, indexed]) => ({ name: "", type, indexed })),
  anonymous: false,
});

function rules(base: AbiEntry[], head: AbiEntry[]): RuleId[] {
  const out: RuleId[] = [];
  diffAbi(base, head, (r) => out.push(r));
  return out.filter((r) => !r.endsWith("-added"));
}

describe("diffAbi", () => {
  it("builds canonical signatures with tuples", () => {
    const e: AbiEntry = {
      type: "function",
      name: "f",
      inputs: [{ type: "tuple[]", components: [{ type: "address" }, { type: "tuple", components: [{ type: "uint256" }] }] }],
    };
    expect(signature(e)).toBe("f((address,(uint256))[])");
  });

  it("flags removed and re-signed functions", () => {
    expect(rules([fn("a", []), fn("b", ["uint256"])], [fn("b", ["uint128"])])).toEqual(["abi-function-removed", "abi-function-removed"]);
  });

  it("flags changed outputs and mutability", () => {
    expect(rules([fn("a", [], ["uint256"], "view")], [fn("a", [], ["address"], "nonpayable")])).toEqual([
      "abi-function-outputs-changed",
      "abi-function-mutability-changed",
    ]);
  });

  it("flags removed events and indexed changes", () => {
    const base = [ev("A", [["address", true]]), ev("B", [["uint256", false]])];
    const head = [ev("A", [["address", false]])];
    expect(rules(base, head)).toEqual(["abi-event-indexed-changed", "abi-event-removed"]);
  });

  it("flags removed receive and errors", () => {
    const base: AbiEntry[] = [{ type: "receive", stateMutability: "payable" }, { type: "error", name: "E", inputs: [] }];
    expect(rules(base, [])).toEqual(["abi-error-removed", "abi-receive-removed"]);
  });

  it("reports additions as info rules", () => {
    const out: RuleId[] = [];
    diffAbi([], [fn("a", []), ev("A", [])], (r) => out.push(r));
    expect(out).toEqual(["abi-function-added", "abi-event-added"]);
  });
});
