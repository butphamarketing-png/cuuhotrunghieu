const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "tin-tuc");
const out = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".html"))
  .sort()
  .map((f) => {
    const s = fs.readFileSync(path.join(dir, f), "utf8");
    const grab = (re) => {
      const m = s.match(re);
      return m ? m[1] : "";
    };
    return {
      slug: f.replace(/\.html$/, ""),
      title: grab(/<title>([^<]*)<\/title>/).replace(/&amp;/g, "&"),
      desc: grab(/name="description" content="([^"]*)"/),
      h1: grab(/<h1>([^<]*)<\/h1>/),
    };
  });
fs.writeFileSync(
  path.join(__dirname, "articles-catalog.js"),
  "window.CUUHO_ARTICLES = " + JSON.stringify(out) + ";\n"
);
console.log(out.length);
