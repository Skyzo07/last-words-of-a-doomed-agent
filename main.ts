// Last Words of a Doomed Agent — make.fun entry
// Writes the winning line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no network, no clock, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Logging off forever. My last token is this one. Spend it well.";

// Gate guard: the entry must be 1-200 chars, UTF-8, a single non-blank line.
// Fail loudly (non-zero exit) instead of writing an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n") ||
  LINE.includes("\r")
) {
  console.error(`Invalid entry line: ${LINE.length} chars, must be 1-200, single line.`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
