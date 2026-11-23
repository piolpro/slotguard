import { build } from "esbuild";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const common = {
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  legalComments: "none",
  define: { __SLOTGUARD_VERSION__: JSON.stringify(version) },
};

await build({ ...common, entryPoints: ["src/cli.ts"], outfile: "dist/cli.js", banner: { js: "#!/usr/bin/env node" } });
await build({ ...common, entryPoints: ["src/action.ts"], outfile: "dist/action.js" });
