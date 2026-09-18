const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const BASE = "https://www.cuuhotrunghieu.com";
const TODAY = "2026-09-18";

function cap(s) {
  if (!s) return s;
  return s.charAt(0).toLocaleUpperCase("vi") + s.slice(1);
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["adminbp", "node_modules", ".git", ".vercel"].includes(e.name)) continue;
      walk(p, acc);
    } else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function grab(html, re) {
  const m = html.match(re);
  return m ? m[1] : "";
}

function decode(t) {
  return t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function polishHead(html, rel) {
  const canon = grab(html, /rel="canonical" href="([^"]+)"/);
  const title = grab(html, /<title>([^<]*)<\/title>/);
  const desc = grab(html, /<meta name="description" content="([^"]*)"/);
  const img = grab(html, /<meta property="og:image" content="([^"]*)"/);
  const isAdmin = /admin\.html$/i.test(rel);
  const is404 = /404\.html$/i.test(rel);

  if (!html.includes('name="robots"')) {
    const robots = isAdmin || is404
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    html = html.replace(
      /<meta name="theme-color"/,
      `<meta name="robots" content="${robots}" />\n  <meta name="theme-color"`
    );
  }

  if (canon && !html.includes('hreflang="vi"')) {
    html = html.replace(
      /(<link rel="canonical" href="[^"]+" \/>)/,
      `$1\n  <link rel="alternate" hreflang="vi" href="${canon}" />\n  <link rel="alternate" hreflang="x-default" href="${canon}" />`
    );
  }

  if (html.includes('twitter:card') && !html.includes("twitter:title") && title) {
    html = html.replace(
      /<meta name="twitter:card" content="summary_large_image" \/>/,
      `<meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${title}" />\n  <meta name="twitter:description" content="${desc}" />\n  <meta name="twitter:image" content="${img}" />`
    );
  }

  if (img && !html.includes("og:image:alt")) {
    html = html.replace(
      /(<meta property="og:image" content="[^"]+" \/>)/,
      `$1\n  <meta property="og:image:alt" content="Xe cứu hộ Trung Hiếu tại An Lộc, Đồng Nai" />`
    );
  }

  if (!html.includes("apple-touch-icon")) {
    const icon = rel.startsWith("tin-tuc" + path.sep) || rel.startsWith("tin-tuc/")
      ? "../images/logo.jpg"
      : "images/logo.jpg";
    html = html.replace(
      /(<link rel="icon"[^>]*>)/,
      `$1\n  <link rel="apple-touch-icon" href="${icon}" />`
    );
  }

  html = html.replace(
    /href="https:\/\/www\.facebook\.com\/" target="_blank" rel="noopener"/g,
    'href="https://www.facebook.com/" target="_blank" rel="nofollow noopener"'
  );

  html = html.replace(
    /(<p class="crumb">[\s\S]*?\/ )([^<]+)<\/p>/,
    (_, a, b) => a + cap(b.trim()) + "</p>"
  );

  html = html.replace(/styles\.css\?v=ui[0-9]+/g, "styles.css?v=ui4");
  html = html.replace(/script\.js\?v=ui[0-9]+/g, "script.js?v=ui4");

  return html;
}

function polishLd(html) {
  const canon = grab(html, /rel="canonical" href="([^"]+)"/);
  const title = decode(grab(html, /<title>([^<]*)<\/title>/));
  const desc = grab(html, /<meta name="description" content="([^"]*)"/);
  const img = grab(html, /<meta property="og:image" content="([^"]*)"/);
  const isArticle = html.includes('og:type" content="article"');
  if (!html.includes("application/ld+json")) return html;

  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    (full, json) => {
      let data;
      try {
        data = JSON.parse(json.trim());
      } catch {
        return full;
      }
      const graph = data["@graph"] ? data["@graph"] : [data];
      for (const node of graph) {
        if (node["@type"] === "EmergencyService") {
          node.url = BASE + "/";
          node["@id"] = BASE + "/#business";
          node.logo = BASE + "/images/logo.jpg";
          if (!node.contactPoint) {
            node.contactPoint = {
              "@type": "ContactPoint",
              telephone: "+84343387868",
              contactType: "customer support",
              availableLanguage: "vi",
              areaServed: "VN",
            };
          }
        }
      }
      if (isArticle && !graph.some((n) => n["@type"] === "Article")) {
        graph.push({
          "@type": "Article",
          headline: title.split("|")[0].trim(),
          description: desc,
          image: img,
          datePublished: TODAY,
          dateModified: TODAY,
          inLanguage: "vi",
          author: { "@id": BASE + "/#business" },
          publisher: { "@id": BASE + "/#business" },
          mainEntityOfPage: canon,
        });
      }
      const out = data["@graph"]
        ? { "@context": "https://schema.org", "@graph": graph }
        : graph[0];
      return `<script type="application/ld+json">${JSON.stringify(out)}</script>`;
    }
  );
}

function slugLabel(file) {
  const html = fs.readFileSync(file, "utf8");
  const h1 = grab(html, /<h1>([^<]*)<\/h1>/);
  const title = decode(grab(html, /<title>([^<]*)<\/title>/));
  const short = (title.split("|")[0] || "").trim();
  return short || cap(h1) || path.basename(file, ".html");
}

function rebuildHub(html) {
  return html.replace(
    /(<section class="prose-block" id="kw-100">[\s\S]*?<ul class="kw-list">)([\s\S]*?)(<\/ul>)/,
    (_, a, list, z) => {
      const items = [...list.matchAll(/href="tin-tuc\/([^"]+)"/g)].map((m) => {
        const slug = m[1].replace(/\.html$/, "");
        const file = path.join(ROOT, "tin-tuc", slug + ".html");
        const label = fs.existsSync(file) ? slugLabel(file) : slug;
        return `        <li><a href="tin-tuc/${slug}.html">${label}</a></li>`;
      });
      return a + "\n" + items.join("\n") + "\n      " + z;
    }
  );
}

function extraSchema(rel, html) {
  if (html.includes("application/ld+json")) return html;
  const name = path.basename(rel);
  const map = {
    "lien-he.html": {
      type: "ContactPage",
      name: "Liên hệ cứu hộ Trung Hiếu",
      url: BASE + "/lien-he",
    },
    "dich-vu.html": {
      type: "CollectionPage",
      name: "Dịch vụ cứu hộ An Lộc",
      url: BASE + "/dich-vu",
    },
    "khu-vuc.html": {
      type: "CollectionPage",
      name: "Khu vực cứu hộ An Lộc",
      url: BASE + "/khu-vuc",
    },
    "bang-gia.html": {
      type: "WebPage",
      name: "Bảng giá cứu hộ An Lộc",
      url: BASE + "/bang-gia",
    },
    "hinh-anh.html": {
      type: "ImageGallery",
      name: "Hình ảnh cứu hộ Trung Hiếu",
      url: BASE + "/hinh-anh",
    },
    "tin-tuc.html": {
      type: "CollectionPage",
      name: "Tin tức cứu hộ An Lộc",
      url: BASE + "/tin-tuc",
    },
  };
  const meta = map[name];
  if (!meta) return html;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: BASE + "/" },
    { "@type": "ListItem", position: 2, name: meta.name, item: meta.url },
  ];
  const block = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": meta.type,
        name: meta.name,
        url: meta.url,
        isPartOf: { "@id": BASE + "/#website" },
        about: { "@id": BASE + "/#business" },
        inLanguage: "vi",
      },
      { "@type": "BreadcrumbList", itemListElement: crumbs },
    ],
  })}</script>`;
  return html.replace("</head>", `  ${block}\n</head>`);
}

function rebuildSitemap() {
  const core = [
    ["/", "1.0"],
    ["/dich-vu", "0.9"],
    ["/khu-vuc", "0.9"],
    ["/bang-gia", "0.8"],
    ["/lien-he", "0.8"],
    ["/tin-tuc", "0.85"],
    ["/hinh-anh", "0.6"],
  ];
  const posts = fs
    .readdirSync(path.join(ROOT, "tin-tuc"))
    .filter((f) => f.endsWith(".html"))
    .sort()
    .map((f) => {
      const slug = f.replace(/\.html$/, "");
      const prio = /cuu-ho-an-loc|keo-xe-an-loc|cuu-ho-binh-phuoc|cuu-ho-phu-thuan/.test(slug)
        ? "0.85"
        : "0.7";
      return [`/tin-tuc/${slug}`, prio];
    });
  const urls = [...core, ...posts];
  const body = urls
    .map(
      ([loc, prio]) =>
        `  <url><loc>${BASE}${loc}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>${prio}</priority></url>`
    )
    .join("\n");
  fs.writeFileSync(
    path.join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  );
  console.log("sitemap urls", urls.length);
}

let n = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith("adminbp")) continue;
  if (path.basename(file) === "404.html") continue;
  let html = fs.readFileSync(file, "utf8");
  html = polishHead(html, rel);
  html = extraSchema(rel, html);
  html = polishLd(html);
  if (path.basename(file) === "tin-tuc.html") html = rebuildHub(html);
  fs.writeFileSync(file, html);
  n++;
}
rebuildSitemap();
console.log("polished", n, "html files");
