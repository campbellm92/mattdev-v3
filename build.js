import { minify } from "minify";
import { mkdirSync, writeFileSync, cpSync, readFileSync } from "fs";
import { dirname } from "path";

const minifyFiles = [
  "index.html",
  "project.html",
  "css/global.css",
  "css/home.css",
  "css/project.css",
];

const copyFiles = ["js/api/fetchProjectData.js", "js/home.js", "js/project.js"];

for (const src of minifyFiles) {
  const outPath = `dist/${src}`;
  mkdirSync(dirname(outPath), { recursive: true });
  const minified = await minify(src);
  writeFileSync(outPath, minified);
}

for (const src of copyFiles) {
  const outPath = `dist/${src}`;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, readFileSync(src));
}

cpSync("assets", "dist/assets", { recursive: true });
cpSync("data", "dist/data", { recursive: true });
