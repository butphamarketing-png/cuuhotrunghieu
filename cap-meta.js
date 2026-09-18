const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "tin-tuc");
function cap(s) {
  if (!s) return s;
  return s.charAt(0).toLocaleUpperCase("vi") + s.slice(1);
}
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".html"))) {
  let s = fs.readFileSync(path.join(dir, f), "utf8");
  s = s.replace(
    /(<meta name="description" content=")([^"]*)(")/g,
    (_, a, c, z) => a + cap(c) + z
  );
  s = s.replace(
    /(<meta property="og:description" content=")([^"]*)(")/g,
    (_, a, c, z) => a + cap(c) + z
  );
  s = s.replace(
    /("name":")(kéo xe |cứu hộ |câu bình |giao xăng |hết |nổ lốp |xe |thay lốp |báo giá )/gi,
    (m, a, b) => a + cap(b)
  );
  fs.writeFileSync(path.join(dir, f), s);
}
console.log("capped description metas");
