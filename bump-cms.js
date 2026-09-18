const fs = require("fs");
const path = require("path");
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if ([".git", "node_modules", "adminbp"].includes(e.name)) continue;
      walk(p);
    } else if (e.name.endsWith(".html")) {
      const s = fs.readFileSync(p, "utf8");
      const n = s.replace(/cms\.js\?v=cms2/g, "cms.js?v=cms3");
      if (n !== s) fs.writeFileSync(p, n);
    }
  }
}
walk(__dirname);
console.log("cms query bumped");
