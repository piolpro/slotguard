import type { TypeNode } from "../types.js";

export type CompareStatus = "equal" | "compatible" | "breaking";

export interface CompareResult {
  status: CompareStatus;
  reasons: string[];
}

const ADDRESS_LIKE = /^(address( payable)?|contract .+)$/;

function worst(a: CompareStatus, b: CompareStatus): CompareStatus {
  const order: CompareStatus[] = ["equal", "compatible", "breaking"];
  return order[Math.max(order.indexOf(a), order.indexOf(b))];
}

/**
 * Compares two storage types. `tail` is true when nothing is stored after the value
 * (a mapping value, a dynamic array element, or the last variable of a layout), so it may grow.
 */
export function compareTypes(a: TypeNode, b: TypeNode, tail: boolean, path = ""): CompareResult {
  const at = path ? ` (${path})` : "";
  if (a.kind !== b.kind) {
    return { status: "breaking", reasons: [`\`${a.label}\` became \`${b.label}\`${at}`] };
  }
  switch (a.kind) {
    case "value": {
      const bb = b as typeof a;
      if (a.label === bb.label) return { status: "equal", reasons: [] };
      if (a.bytes === bb.bytes && ADDRESS_LIKE.test(a.label) && ADDRESS_LIKE.test(bb.label)) {
        return { status: "compatible", reasons: [`\`${a.label}\` became \`${bb.label}\`${at} (same 20-byte encoding)`] };
      }
      if (a.bytes === bb.bytes && a.label.startsWith("enum ") && bb.label.startsWith("enum ")) {
        return { status: "compatible", reasons: [`\`${a.label}\` became \`${bb.label}\`${at} (same size; check member order)`] };
      }
      return { status: "breaking", reasons: [`\`${a.label}\` became \`${bb.label}\`${at}`] };
    }
    case "bytes": {
      const bb = b as typeof a;
      if (a.label === bb.label) return { status: "equal", reasons: [] };
      return { status: "compatible", reasons: [`\`${a.label}\` became \`${bb.label}\`${at} (same encoding)`] };
    }
    case "ref": {
      const bb = b as typeof a;
      return a.label === bb.label
        ? { status: "equal", reasons: [] }
        : { status: "breaking", reasons: [`\`${a.label}\` became \`${bb.label}\`${at}`] };
    }
    case "mapping": {
      const bb = b as typeof a;
      const key = compareTypes(a.key, bb.key, false, join(path, "key"));
      const value = compareTypes(a.value, bb.value, true, join(path, "value"));
      return { status: worst(key.status, value.status), reasons: [...key.reasons, ...value.reasons] };
    }
    case "array": {
      const bb = b as typeof a;
      if (a.length !== bb.length) {
        return { status: "breaking", reasons: [`\`${a.label}\` became \`${bb.label}\`${at}`] };
      }
      return compareTypes(a.base, bb.base, a.length === null, join(path, "[]"));
    }
    case "struct": {
      const bb = b as typeof a;
      let status: CompareStatus = "equal";
      const reasons: string[] = [];
      const common = Math.min(a.members.length, bb.members.length);
      for (let i = 0; i < common; i++) {
        const ma = a.members[i];
        const mb = bb.members[i];
        const memberPath = join(path, ma.label);
        if (ma.slot !== mb.slot || ma.offset !== mb.offset) {
          status = "breaking";
          reasons.push(`member \`${ma.label}\` moved from slot ${ma.slot}+${ma.offset} to ${mb.slot}+${mb.offset} in \`${a.label}\``);
          continue;
        }
        const r = compareTypes(ma.type, mb.type, tail && i === a.members.length - 1 && i === bb.members.length - 1, memberPath);
        status = worst(status, r.status);
        reasons.push(...r.reasons);
        if (ma.label !== mb.label) {
          status = worst(status, "compatible");
          reasons.push(`member \`${ma.label}\` renamed to \`${mb.label}\` in \`${a.label}\``);
        }
      }
      if (bb.members.length < a.members.length) {
        status = "breaking";
        const removed = a.members.slice(common).map((m) => `\`${m.label}\``).join(", ");
        reasons.push(`members ${removed} removed from \`${a.label}\``);
      } else if (bb.members.length > a.members.length) {
        const added = bb.members.slice(common).map((m) => `\`${m.label}\``).join(", ");
        if (tail) {
          status = worst(status, "compatible");
          reasons.push(`members ${added} appended to \`${a.label}\`; safe because nothing is stored after it`);
        } else {
          status = "breaking";
          reasons.push(`members ${added} appended to \`${a.label}\`, which grows it over the storage that follows`);
        }
      }
      if (status === "equal" && a.label !== bb.label) {
        return { status: "compatible", reasons: [`\`${a.label}\` renamed to \`${bb.label}\`${at}`] };
      }
      return { status, reasons };
    }
  }
}

function join(path: string, part: string): string {
  return path ? `${path}.${part}` : part;
}
