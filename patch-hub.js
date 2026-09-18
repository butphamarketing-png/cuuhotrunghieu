const fs = require("fs");
const path = require("path");
const skip = new Set([
  "cuu-ho-an-loc.html",
  "cuu-ho-phu-thuan.html",
  "cuu-ho-24-7-binh-long.html",
  "cuu-ho-24-7-chon-thanh.html",
  "cuu-ho-24-7-minh-hung.html",
  "cuu-ho-24-7-dong-xoai.html",
  "cuu-ho-binh-phuoc.html",
  "cuu-ho-24-7-binh-phuoc.html",
  "keo-xe-an-loc.html",
  "cuu-ho-xe-may-an-loc.html",
  "cuu-ho-o-to-an-loc.html",
  "thay-lop-tan-noi-an-loc.html",
  "cau-binh-ac-quy-an-loc.html",
  "giao-xang-an-loc.html",
  "cuu-ho-24-7-an-loc.html",
  "cuu-ho-dem-an-loc.html",
  "cuu-ho-xe-ngap-nuoc-an-loc.html"
]);
const dir = "tin-tuc";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html") && !skip.has(f)).sort();
function crumb(f) {
  const h = fs.readFileSync(path.join(dir, f), "utf8");
  const m = h.match(/\/ Tin tức<\/a> \/ ([^<]+)/);
  return m ? m[1] : f.replace(".html", "");
}
const lis = files
  .map((f) => `<li><a href="tin-tuc/${f}">${crumb(f).replace(/&/g, "&amp;")}</a></li>`)
  .join("\n        ");
let html = fs.readFileSync("tin-tuc.html", "utf8");
if (html.includes('id="kw-100"')) {
  console.log("hub exists", files.length);
  process.exit(0);
}
const needle = "    <div class=\"article-list\">";
if (!html.includes(needle)) throw new Error("no article-list");
html = html.replace(
  needle,
  `    <section class="prose-block" id="kw-100">
      <h2>Từ khóa cứu hộ theo việc và phường</h2>
      <ul class="kw-list">
        ${lis}
      </ul>
    </section>
    <div class="article-list">`
);
fs.writeFileSync("tin-tuc.html", html);
console.log("hub", files.length);
