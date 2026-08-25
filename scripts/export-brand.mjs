import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("public/brand");
const artifacts = path.resolve("artifacts/brand");
await mkdir(out, { recursive: true });
await mkdir(artifacts, { recursive: true });

const boards = [
  { id: "icon-pink", w: 1024, h: 1024, file: "icon-pink.svg" },
  { id: "icon-black", w: 1024, h: 1024, file: "icon-black.svg" },
  { id: "lockup-pink", w: 2400, h: 900, file: "lockup-pink.svg" },
  { id: "wordmark-pink", w: 1600, h: 720, file: "wordmark-pink.svg" },
  { id: "mark", w: 1024, h: 1024, file: "mark.svg", pink: true },
  { id: "whatsapp-cover", w: 1600, h: 900, file: "whatsapp-cover.svg" },
  { id: "whatsapp-banner", w: 2400, h: 900, file: "whatsapp-banner.svg" },
];

const parts = [];
for (const b of boards) {
  const svg = await readFile(path.join(out, b.file), "utf8");
  parts.push(
    `<div id="${b.id}" style="width:${b.w}px;height:${b.h}px;${b.pink ? "background:#FF0074;" : ""}">${svg}</div>`,
  );
}

parts.push(`
<div id="whatsapp-cover-html" style="width:1600px;height:900px;background:#FF0074;position:relative">
  <div style="position:absolute;right:96px;top:50%;transform:translateY(-50%);text-align:right;font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:0.2em;line-height:0.92">
    <div style="color:#000;font-size:152px">KORKU</div>
    <div style="color:#fff;font-size:152px">LOOK</div>
  </div>
</div>
<div id="whatsapp-banner-html" style="width:2400px;height:900px;background:#FF0074;position:relative">
  <div style="position:absolute;right:120px;top:50%;transform:translateY(-50%);text-align:right;font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:0.2em;line-height:0.92">
    <div style="color:#000;font-size:168px">KORKU</div>
    <div style="color:#fff;font-size:168px">LOOK</div>
  </div>
</div>
`);

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet"/>
  <style>
    body { margin: 0; background: #111; }
    svg { width: 100%; height: 100%; display: block; }
  </style>
</head>
<body>${parts.join("")}</body>
</html>`;

const htmlPath = path.join(out, "_export.html");
await writeFile(htmlPath, html);

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

for (const b of boards) {
  const el = page.locator(`#${b.id}`);
  await el.screenshot({ path: path.join(out, `${b.id}.png`), type: "png" });
  await el.screenshot({ path: path.join(artifacts, `${b.id}.png`), type: "png" });
  console.log("wrote", b.id);
}

for (const id of ["whatsapp-cover-html", "whatsapp-banner-html"]) {
  const el = page.locator(`#${id}`);
  const name = id.replace("-html", "");
  await el.screenshot({ path: path.join(out, `${name}.png`), type: "png" });
  await el.screenshot({ path: path.join(artifacts, `${name}.png`), type: "png" });
  console.log("wrote", name, "html");
}

await browser.close();
console.log("brand export done");
