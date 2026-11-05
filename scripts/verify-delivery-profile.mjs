import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateGithubProfile } from "@juangcarmona/lighthouse-sdlc/github-profile";
const profile = JSON.parse(await readFile(new URL("../.lighthouse/github.json", import.meta.url), "utf8"));
assert.deepEqual(validateGithubProfile(profile), [], "the adopted delivery profile must validate with the installed package");
