const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "../dist");
const manifestLink = '<link rel="manifest" href="/manifest.json">';

function injectManifestLink(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (html.includes(manifestLink)) return; // Already injected
  html = html.replace(
    /<head(.*?)>/i,
    (match) => `${match}\n    ${manifestLink}`
  );
  fs.writeFileSync(filePath, html, "utf8");
  console.log(`Injected manifest link into: ${filePath}`);
}

function processDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith(".html")) {
      injectManifestLink(fullPath);
    }
  });
}

processDir(distDir);
