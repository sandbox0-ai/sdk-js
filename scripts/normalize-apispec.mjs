// Deterministic documentation cleanup after the pinned OpenAPI generator.
// Keep this in generation so generated files never need manual whitespace edits.
import { readdir, readFile, writeFile } from "node:fs/promises";
const directory = new URL("../src/apispec/docs/", import.meta.url);
for (const name of await readdir(directory)) {
  if (!name.endsWith(".md")) continue;
  const file = new URL(name, directory);
  const source = await readFile(file, "utf8");
  const normalized = source.replace(/[\t ]+$/gm, "");
  if (normalized !== source) await writeFile(file, normalized);
}
// Literal YAML operation descriptions can leave a trailing space in populated
// JSDoc prose. Preserve the generator's blank comment lines and code formatting.
const apiDirectory = new URL("../src/apispec/src/apis/", import.meta.url);
for (const name of await readdir(apiDirectory)) {
  if (!name.endsWith(".ts")) continue;
  const file = new URL(name, apiDirectory);
  const source = await readFile(file, "utf8");
  const normalized = source.replace(/^(\s*\* \S[^\n]*?)[\t ]+$/gm, "$1");
  if (normalized !== source) await writeFile(file, normalized);
}
