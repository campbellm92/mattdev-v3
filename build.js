import { minify } from "minify";
import { mkdirSync, writeFileSync, cpSync } from "fs";
import { dirname } from "path";

const files = [
  { src: "index.html" },
  { src: "project.html" },
  { src: "css/global.css" },
  { src: "css/home.css" },
  { src: "css/project.css" },
  { src: "js/api/fetchProjectData.js" },
  { src: "js/home.js" },
  { src: "js/project.js" },
];

for (const { src } of files) {
  const outPath = `dist/${src}`;
  mkdirSync(dirname(outPath), { recursive: true });
  const minified = await minify(src);
  writeFileSync(outPath, minified);
}

cpSync("assets", "dist/assets", { recursive: true });
cpSync("data", "dist/data", { recursive: true });
