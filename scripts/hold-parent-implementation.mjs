import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const path = new URL("../.github/workflows/lighthouse-sdlc-router.yml", import.meta.url);
const source = await readFile(path, "utf8");
assert.equal(source.match(/^  LIGHTHOUSE_AUTO_IMPLEMENT: (?:true|false)$/gm)?.length, 1, "Review the changed installer projection before applying this fixture policy");
await writeFile(path, source.replace(/^  LIGHTHOUSE_AUTO_IMPLEMENT: true$/m, "  LIGHTHOUSE_AUTO_IMPLEMENT: false"));
