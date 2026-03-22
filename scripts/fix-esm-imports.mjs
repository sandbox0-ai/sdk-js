import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distRoot = path.resolve(__dirname, "../dist");

const rewritePatterns = [
  /(\bimport\s+(?:type\s+)?[^'"\n]*?\sfrom\s*)(['"])(\.\.?\/[^'"]+)\2/g,
  /(\bexport\s+(?:type\s+)?[^'"\n]*?\sfrom\s*)(['"])(\.\.?\/[^'"]+)\2/g,
  /(\bimport\s*)(['"])(\.\.?\/[^'"]+)\2/g,
  /(\bimport\s*\(\s*)(['"])(\.\.?\/[^'"]+)\2/g,
];

async function walk(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
      continue;
    }

    if (
      entry.isFile() &&
      (entry.name.endsWith(".js") || entry.name.endsWith(".d.ts"))
    ) {
      files.push(entryPath);
    }
  }

  return files;
}

function hasKnownExtension(specifier) {
  const extension = path.extname(specifier);
  return extension === ".js" || extension === ".mjs" || extension === ".cjs";
}

async function rewriteFile(filePath) {
  const original = await readFile(filePath, "utf8");
  let rewritten = original;

  for (const pattern of rewritePatterns) {
    rewritten = rewritten.replace(
      pattern,
      (fullMatch, prefix, quote, specifier) => {
        if (hasKnownExtension(specifier)) {
          return fullMatch;
        }

        return `${prefix}${quote}${specifier}.js${quote}`;
      },
    );
  }

  if (rewritten !== original) {
    await writeFile(filePath, rewritten);
  }
}

const distStats = await stat(distRoot).catch(() => null);
if (!distStats?.isDirectory()) {
  throw new Error(`dist directory not found at ${distRoot}`);
}

for (const filePath of await walk(distRoot)) {
  await rewriteFile(filePath);
}
