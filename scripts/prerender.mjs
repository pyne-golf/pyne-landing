import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Polyfill browser globals required by Supabase client at module load time
const noop = () => {};
const noopStorage = { getItem: () => null, setItem: noop, removeItem: noop, clear: noop, key: () => null, length: 0 };
globalThis.localStorage = noopStorage;
globalThis.sessionStorage = noopStorage;
globalThis.window = globalThis;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, "..", p);

const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");
// pathToFileURL handles Windows paths (C:\...) → file:///C:/...
const { render } = await import(pathToFileURL(toAbsolute("dist_server/entry-server.js")));

const routes = ["/", "/impressum", "/datenschutz", "/nutzungsbedingungen"];

for (const url of routes) {
  const appHtml = render(url);
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  const filePath = url === "/" ? "dist/index.html" : `dist${url}.html`;
  fs.mkdirSync(path.dirname(toAbsolute(filePath)), { recursive: true });
  fs.writeFileSync(toAbsolute(filePath), html);
  console.log("Pre-rendered:", filePath);
}

// Clean up the temporary server bundle
fs.rmSync(toAbsolute("dist_server"), { recursive: true, force: true });
console.log("Done.");
