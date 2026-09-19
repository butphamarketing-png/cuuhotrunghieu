const fs = require("fs");
const path = require("path");

const BASE = "https://www.cuuhotrunghieu.com";
const OGIMG = BASE + "/images/hero-slide-1.png";
const MAPS = "https://maps.app.goo.gl/oDM8HWbHmq7ijzN36";
const TEL = "0343 387 868";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
function faq(items) {
  return `<h2>Câu hỏi thường gặp</h2>` + items.map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join("");
}
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function chrome(p) {
  const slug = p.file.replace(/\.html$/i, "");
  const url = BASE + "/tin-tuc/" + slug;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmergencyService",
        "@id": BASE + "/#business",
        name: "Cứu hộ Trung Hiếu",
        image: OGIMG,
        logo: BASE + "/images/logo.jpg",
        telephone: "+84343387868",
        url: BASE + "/",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Tổ 5, Khu phố Phú Thuận",
          addressLocality: "An Lộc",
          addressRegion: "Đồng Nai",
          addressCountry: "VN"
        },
        geo: { "@type": "GeoCoordinates", latitude: 11.6390278, longitude: 106.6087778 },
        hasMap: MAPS,
        areaServed: p.area,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59"
        },
        sameAs: ["https://zalo.me/0343387868"]
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: BASE + "/" },
          { "@type": "ListItem", position: 2, name: "Tin tức", item: BASE + "/tin-tuc" },
          { "@type": "ListItem", position: 3, name: p.crumb, item: url }
        ]
      },
      {
        "@type": "Article",
        headline: p.h1,
        description: p.desc,
        image: OGIMG,
        datePublished: "2026-09-20",
        dateModified: "2026-09-20",
        inLanguage: "vi",
        author: { "@id": BASE + "/#business" },
        publisher: { "@id": BASE + "/#business" },
        mainEntityOfPage: url
      }
    ]
  };
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.desc)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="theme-color" content="#06152c" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="vi" href="${url}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:site_name" content="Cứu hộ Trung Hiếu" />
  <meta property="og:title" content="${esc(p.title)}" />
  <meta property="og:description" content="${esc(p.desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${OGIMG}" />
  <meta property="og:image:alt" content="Xe cứu hộ Trung Hiếu tại An Lộc, Đồng Nai" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(p.title)}" />
  <meta name="twitter:description" content="${esc(p.desc)}" />
  <meta name="twitter:image" content="${OGIMG}" />
  <link rel="icon" href="../images/logo.jpg" type="image/jpeg" />
  <link rel="apple-touch-icon" href="../images/logo.jpg" />
  <link rel="stylesheet" href="../styles.css?v=ui4" />
  <script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body>
  <a class="skip" href="#noi-dung">Bỏ qua menu</a>
  <div class="topbar"><div class="ticker"><div class="ticker-track"><span class="ticker-item">Tổ 5, Khu phố Phú Thuận, An Lộc, Đồng Nai <span class="sep">•</span> Hỗ trợ 24/7</span><span class="ticker-item" aria-hidden="true">Tổ 5, Khu phố Phú Thuận, An Lộc, Đồng Nai <span class="sep">•</span> Hỗ trợ 24/7</span></div></div>
    <div class="topbar-social"><a class="soc soc-zalo" href="https://zalo.me/0343387868" target="_blank" rel="noopener">Zalo</a></div></div>
  <div class="nav-scrim" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="../index.html"><img class="logo" src="../images/logo.jpg" width="72" height="72" alt="Cứu hộ Trung Hiếu 24/7" /><span class="brand-name">TRUNG HIẾU<br />CỨU HỘ 24/7</span></a>
    <button class="menu-btn" type="button" aria-label="Mở menu" aria-expanded="false" aria-controls="menu-chinh"><span></span><span></span><span></span></button>
    <nav class="nav" id="menu-chinh" aria-label="Chính">
      <a href="../index.html">Trang chủ</a><a href="../dich-vu.html">Dịch vụ</a><a href="../bang-gia.html">Bảng giá</a><a href="../khu-vuc.html">Khu vực</a><a href="../hinh-anh.html">Hình ảnh</a><a href="../tin-tuc.html">Tin tức</a><a href="../lien-he.html">Liên hệ</a>
    </nav>
    <a class="btn-phone" href="tel:0343387868">${TEL}</a>
  </header>
  <main id="noi-dung" class="page-main">
    <header class="page-hero">
      <p class="crumb"><a href="../index.html">Trang chủ</a> / <a href="../tin-tuc.html">Tin tức</a> / ${esc(p.crumb)}</p>
      <h1>${esc(p.h1)}</h1>
      <p>${p.lead}</p>
      <div class="hero-actions">
        <a class="btn btn-call" href="tel:0343387868">Gọi ${TEL}</a>
        <a class="btn btn-zalo" href="https://zalo.me/0343387868" target="_blank" rel="noopener">Nhắn Zalo</a>
      </div>
    </header>
    <article class="prose-block seo-post">${p.body}</article>
    <nav class="prose-block"><h2>Xem thêm</h2><ul class="seo-related">${p.related}</ul></nav>
  </main>
  <footer class="foot"><p class="copy">© 2026 Trung Hiếu. Tổ 5, Khu phố Phú Thuận, An Lộc, Đồng Nai.</p></footer>
  <div class="dock"><a href="tel:0343387868">Gọi điện</a><a class="zalo" href="https://zalo.me/0343387868" target="_blank" rel="noopener">Zalo</a></div>
  <script src="../cms.js?v=cms3"></script>
  <script src="../script.js?v=ui4"></script>
</body>
</html>`;
}

const areas = [
  { id: "an-loc", name: "An Lộc", pillar: "cuu-ho-an-loc.html", oto: "cuu-ho-o-to-an-loc.html", near: "đóng quân Tổ 5 Phú Thuận nên ca nội phường thường ngắn hơn ca xuyên phường", call: "nói hẻm hay mặt đường, có quay đầu được không" },
  { id: "phu-thuan", name: "Khu phố Phú Thuận", pillar: "cuu-ho-phu-thuan.html", oto: "cuu-ho-o-to-phu-thuan.html", near: "ngõ hẹp, xe kéo lớn có thể phải đón ở đầu hẻm", call: "nói rõ số nhà / đầu ngõ, hẻm có quay đầu không" },
  { id: "binh-long", name: "Bình Long", pillar: "cuu-ho-24-7-binh-long.html", oto: "cuu-ho-o-to-binh-long.html", near: "nhiều ca gần cổng khu; gửi số cổng còn hơn chỉ nói tên phường", call: "gửi cổng khu hoặc link Maps" },
  { id: "chon-thanh", name: "Chơn Thành", pillar: "cuu-ho-24-7-chon-thanh.html", oto: "cuu-ho-o-to-chon-thanh.html", near: "km từ An Lộc dài hơn nội phường — chốt điểm kéo về trước", call: "nói muốn kéo về An Lộc, Chơn Thành hay gara nào" },
  { id: "minh-hung", name: "Minh Hưng", pillar: "cuu-ho-24-7-minh-hung.html", oto: "cuu-ho-o-to-minh-hung.html", near: "ca công nhân hay kẹt cổng khu công nghiệp, không phải ‘trung tâm phường’", call: "gửi số cổng / tên xưởng trên Zalo" },
  { id: "dong-xoai", name: "Đồng Xoài", pillar: "cuu-ho-24-7-dong-xoai.html", oto: "cuu-ho-o-to-dong-xoai.html", near: "không có đội sẵn tại Đồng Xoài; xe đi từ An Lộc, chốt giờ và km", call: "báo giờ bạn còn đứng được tại chỗ" },
  { id: "binh-phuoc", name: "phường Bình Phước", pillar: "cuu-ho-binh-phuoc.html", oto: "cuu-ho-o-to-binh-phuoc.html", near: "đúng phường lân cận An Lộc, không phải nhận cả tỉnh cũ", call: "gửi Maps để đối chiếu còn trong vùng không" }
];

const intents = [
  {
    id: "xehoi", slug: (a) => `cuu-ho-xe-hoi-${a.id}.html`, kw: (a) => `cứu hộ xe hơi ${a.name}`,
    title: (a) => `Cứu hộ xe hơi ${a.name} 24/7 | Kéo, lốp, bình | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ xe hơi ${a.name}: cùng đội cứu hộ ô tô, không đội ảo`, `Xe hơi ${a.name} nằm đường — gọi một số, báo loại xe`, `Cứu hộ xe hơi ${a.name} xuất phát An Lộc`][v],
    lead: (a) => `Người gõ cứu hộ xe hơi ${a.name} là cùng nhu cầu cứu hộ ô tô. ${a.near}. Gọi ${TEL}.`,
    h2: ["Xe hơi hay ô tô", "Loại xe cần nói", "Khi phải kéo"],
    p: (a, kw) => [
      `<strong>${kw}</strong> không tách dịch vụ riêng. Trung Hiếu nhận sedan, SUV, bán tải, 7 chỗ trong vùng — cùng kỹ thuật <a href="${a.oto}">cứu hộ ô tô ${a.name}</a>.`,
      `${a.call}. Nói số chỗ, số sàn hay tự động, còn đứng được làn không. ${a.near}.`,
      `Không nổ được, gầm thấp, va chạm nhẹ: kéo về nhà hoặc gara bạn chỉ. Chốt km trước, không âm thầm đổi điểm.`
    ],
    faqs: (a) => [
      [`Search cứu hộ xe hơi ${a.name} rồi cứu hộ ô tô, gọi số nào?`, `Một số: ${TEL}.`],
      ["Có nhận đêm không?", "Có, trong vùng phục vụ."]
    ]
  },
  {
    id: "keoxehoi", slug: (a) => `keo-xe-hoi-${a.id}.html`, kw: (a) => `kéo xe hơi ${a.name}`,
    title: (a) => `Kéo xe hơi ${a.name} | Sedan, SUV, 7 chỗ | Trung Hiếu`,
    h1: (a, v) => [`Kéo xe hơi ${a.name}: chốt điểm đón rồi mới móc xe`, `Kéo xe hơi ${a.name} — sai góc nâng là cào gầm`, `Kéo xe hơi ${a.name} về nhà hoặc gara, nói trước km`][v],
    lead: (a) => `Kéo xe hơi ${a.name} từ An Lộc. ${a.near}. Gọi ${TEL}.`,
    h2: ["Khi nào kéo xe hơi", "Xe hơi khác xe máy", "Giá kéo"],
    p: (a, kw) => [
      `<strong>${kw}</strong> khi xe không tự đi: thủy kích, hộp số, va chạm nhẹ, hết điện kéo dài. Không đẩy ẩu trên làn.`,
      `Xe hơi nặng hơn xe máy; ${a.near}. ${a.call}. Nói điểm trả nhà hay gara.`,
      `Giá theo km và loại xe. Đổi điểm giữa đường thì nói lại giá, không cộng sau.`
    ],
    faqs: (a) => [
      [`Kéo xe hơi ${a.name} đêm được không?`, `Được trong vùng. Gọi ${TEL}.`],
      ["Kéo về gara mình chỉ được không?", "Được. Nói địa chỉ gara lúc gọi."]
    ]
  },
  {
    id: "keooto", slug: (a) => `keo-o-to-${a.id}.html`, kw: (a) => `kéo ô tô ${a.name}`,
    title: (a) => `Kéo ô tô ${a.name} 24/7 | Báo km trước | Trung Hiếu`,
    h1: (a, v) => [`Kéo ô tô ${a.name}: sàn, dây, góc nâng đúng loại xe`, `Kéo ô tô ${a.name} không tự ý kéo về chỗ mình`, `Kéo ô tô ${a.name} — chốt đón và trả trước khi lăn bánh`][v],
    lead: (a) => `Kéo ô tô ${a.name}. ${a.near}. Gọi ${TEL}, báo giá trước.`,
    h2: ["Chuẩn bị trước khi kéo", "Điểm đón an toàn", "Không nhận ca ngoài vùng"],
    p: (a, kw) => [
      `<strong>${kw}</strong> là ca nặng: Trung Hiếu hỏi loại xe, còn khóa được không, có người ngồi trên xe không. Không kéo kiểu “cứ móc rồi tính”.`,
      `${a.call}. Tấp lề, bật đèn cảnh báo. ${a.near}.`,
      `Ngoài An Lộc, Phú Thuận, Bình Long, Chơn Thành, Minh Hưng, Đồng Xoài, phường Bình Phước thì nói thẳng không nhận.`
    ],
    faqs: (a) => [
      ["Có người ngồi trên xe khi kéo không?", "Hỏi lúc gọi. Nhiều ca không cho ngồi trên xe kéo."],
      ["Thanh toán thế nào?", "Chốt lúc báo giá. Không ép app lạ."]
    ]
  },
  {
    id: "suv", slug: (a) => `cuu-ho-suv-${a.id}.html`, kw: (a) => `cứu hộ SUV ${a.name}`,
    title: (a) => `Cứu hộ SUV ${a.name} | Gầm, lốp, kéo | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ SUV ${a.name}: nói gầm cao, 2 cầu hay 1 cầu`, `SUV ${a.name} nổ lốp / chết máy — đừng tự kích ẩu`, `Cứu hộ SUV ${a.name} 24/7 từ An Lộc`][v],
    lead: (a) => `Cứu hộ SUV ${a.name}: lốp, ắc quy, kéo. ${a.near}. Gọi ${TEL}.`,
    h2: ["SUV khác sedan chỗ nào", "Lốp SUV", "Kéo SUV"],
    p: (a, kw) => [
      `<strong>${kw}</strong> cần biết xe 2 cầu hay 1 cầu, gầm cao. Sai móc kéo dễ hỏng vi sai.`,
      `${a.call}. Nổ lốp SUV hay thiếu lốp dự phòng đúng size — nói rõ khi gọi.`,
      `${a.near}. Không nhận ca địa hình rừng / suối ngoài đường phố.`
    ],
    faqs: (a) => [
      ["SUV 7 chỗ được không?", "Nói hãng và số chỗ. Thiết bị không khớp thì từ chối trước."],
      ["Có thay lốp tại chỗ?", "Nhiều ca được nếu có lốp / vá được. Không thì kéo."]
    ]
  },
  {
    id: "bantai", slug: (a) => `cuu-ho-ban-tai-${a.id}.html`, kw: (a) => `cứu hộ bán tải ${a.name}`,
    title: (a) => `Cứu hộ bán tải ${a.name} | 4x4, lốp, kéo | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ bán tải ${a.name}: nói 2 cầu, thùng hàng còn đồ không`, `Bán tải ${a.name} nằm đường — báo trọng tải gần đúng`, `Cứu hộ bán tải ${a.name} từ An Lộc, chốt km`][v],
    lead: (a) => `Cứu hộ bán tải ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Bán tải khác sedan", "Thùng hàng", "Kéo 4x4"],
    p: (a, kw) => [
      `<strong>${kw}</strong> hay gặp lốp, ắc quy, chết máy sau mưa. Xe 4x4 móc kéo khác xe 2 cầu.`,
      `Còn hàng trên thùng thì nói — ảnh hưởng móc và an toàn. ${a.call}.`,
      `${a.near}. Không nhận kéo container hay xe tải lớn ngoài bán tải gia đình / công việc nhẹ.`
    ],
    faqs: (a) => [
      ["Bán tải công trình nặng quá thì sao?", "Nói trọng tải gần đúng. Không khớp thì không nhận."],
      ["Đêm có đi không?", `Có trong vùng. Gọi ${TEL}.`]
    ]
  },
  {
    id: "baycho", slug: (a) => `cuu-ho-xe-7-cho-${a.id}.html`, kw: (a) => `cứu hộ xe 7 chỗ ${a.name}`,
    title: (a) => `Cứu hộ xe 7 chỗ ${a.name} | MPV, kéo, bình | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ xe 7 chỗ ${a.name}: nói MPV hay SUV 7 chỗ`, `Xe 7 chỗ ${a.name} hết bình / nổ lốp — tấp lề rồi gọi`, `Cứu hộ xe 7 chỗ ${a.name} 24/7`][v],
    lead: (a) => `Cứu hộ xe 7 chỗ ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Xe 7 chỗ hay gặp gì", "Người trên xe", "Kéo về"],
    p: (a, kw) => [
      `<strong>${kw}</strong> thường ca gia đình: hết bình sau tắt máy chờ, lốp, hết xăng. Xe dài hơn sedan — hẻm hẹp phải đón đầu ngõ.`,
      `${a.call}. Cho người xuống chỗ an toàn, không đứng giữa làn.`,
      `${a.near}. Chốt kéo về nhà hay gara trước khi xe lăn.`
    ],
    faqs: (a) => [
      ["Có câu bình xe 7 chỗ không?", "Nhiều ca được. Bình hỏng thì nói kéo."],
      ["Hẻm không quay đầu?", "Đón đầu hẻm. Nói rõ khi gọi."]
    ]
  },
  {
    id: "xhchet", slug: (a) => `xe-hoi-chet-may-${a.id}.html`, kw: (a) => `xe hơi chết máy ${a.name}`,
    title: (a) => `Xe hơi chết máy ${a.name} | Đừng đề dai | Trung Hiếu`,
    h1: (a, v) => [`Xe hơi chết máy ${a.name}: tắt máy, tấp lề, gọi cứu hộ`, `Chết máy ${a.name} sau mưa — đừng nổ lại nếu ngập`, `Xe hơi chết máy ${a.name} 24/7 từ An Lộc`][v],
    lead: (a) => `Xe hơi chết máy ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Đừng đề liên tục", "Sau mưa / ngập", "Khi phải kéo"],
    p: (a, kw) => [
      `<strong>${kw}</strong>: đề dai dễ cháy củ đề. Tắt điều hòa, đèn; nếu vừa đi nước thì không nổ lại.`,
      `${a.call}. Nói vừa ngập hay chỉ hết điện. ${a.near}.`,
      `Câu được thì câu tại chỗ. Máy kêu lạ, thủy kích: kéo, không “thử nổ” thêm.`
    ],
    faqs: (a) => [
      ["Hết bình hay hỏng máy?", "Cứu hộ phân biệt tại chỗ. Không đoán qua điện thoại rồi tính tiền sai ca."],
      ["Có kéo đêm không?", "Có trong vùng."]
    ]
  },
  {
    id: "xhbinh", slug: (a) => `xe-hoi-het-binh-${a.id}.html`, kw: (a) => `xe hơi hết bình ${a.name}`,
    title: (a) => `Xe hơi hết bình ${a.name} | Câu ắc quy tận nơi | Trung Hiếu`,
    h1: (a, v) => [`Xe hơi hết bình ${a.name}: câu đúng cực, không đề dai`, `Hết bình ${a.name} — đèn mờ, đề ụt ụt thì gọi`, `Câu bình xe hơi ${a.name} 24/7`][v],
    lead: (a) => `Xe hơi hết bình ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Dấu hiệu hết bình", "Câu tại chỗ", "Bình đã chết"],
    p: (a, kw) => [
      `<strong>${kw}</strong> hay gặp sau để xe lâu, quên đèn, trời mưa. Đèn mờ, còi yếu, đề ụt ụt.`,
      `${a.call}. Câu đúng cực; không câu kiểu dây chập. ${a.near}.`,
      `Bình chai, không giữ điện: báo giá kéo về gara, không câu xong rồi biến.`
    ],
    faqs: (a) => [
      ["Câu xong chạy được ngay?", "Nhiều ca được. Bình hỏng thì nói thật."],
      ["Xe start-stop khác không?", "Nói hãng xe. Không nhận ca ắc quy phức tạp rồi mới báo."]
    ]
  },
  {
    id: "xhlop", slug: (a) => `xe-hoi-no-lop-${a.id}.html`, kw: (a) => `xe hơi nổ lốp ${a.name}`,
    title: (a) => `Xe hơi nổ lốp ${a.name} | Thay tại chỗ hoặc kéo | Trung Hiếu`,
    h1: (a, v) => [`Xe hơi nổ lốp ${a.name}: tấp lề, không tự thay trên làn`, `Nổ lốp ${a.name} — có dự phòng thì nói size`, `Thay lốp xe hơi ${a.name} 24/7`][v],
    lead: (a) => `Xe hơi nổ lốp ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["An toàn khi nổ lốp", "Thay tại chỗ", "Không vá được"],
    p: (a, kw) => [
      `<strong>${kw}</strong>: hai tay lái, nhả ga, không phanh gấp. Người xuống phía lề, không đứng sau xe trên làn.`,
      `${a.call}. Có lốp dự phòng / kích không. ${a.near}.`,
      `Không thay an toàn thì kéo. Giá thay và giá kéo nói riêng.`
    ],
    faqs: (a) => [
      ["Không có lốp dự phòng?", "Nói khi gọi. Có thể kéo về chỗ có lốp."],
      ["Lốp run-flat?", "Nói loại lốp. Không giả vờ vá mọi loại."]
    ]
  },
  {
    id: "gara", slug: (a) => `keo-xe-ve-gara-${a.id}.html`, kw: (a) => `kéo xe về gara ${a.name}`,
    title: (a) => `Kéo xe về gara ${a.name} | Ô tô & xe hơi | Trung Hiếu`,
    h1: (a, v) => [`Kéo xe về gara ${a.name}: bạn chỉ địa chỉ, không kéo về chỗ mình`, `Kéo về gara ${a.name} — chốt km đón và trả`, `Kéo xe về gara từ ${a.name} 24/7`][v],
    lead: (a) => `Kéo xe về gara ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Bạn chọn gara", "Km hai chặng", "Ô tô / xe hơi"],
    p: (a, kw) => [
      `<strong>${kw}</strong> nghĩa là điểm trả do bạn chỉ. Trung Hiếu không tự kéo về xưởng mình rồi tính sau.`,
      `Giá gồm điểm đón ${a.name} và điểm gara. ${a.call}. ${a.near}.`,
      `Sedan, SUV, 7 chỗ, bán tải: nói loại xe. Gara đóng cửa đêm thì chốt chỗ gửi tạm.`
    ],
    faqs: (a) => [
      ["Gara ngoài phường được không?", "Nói địa chỉ. Ngoài vùng phục vụ thì từ chối hoặc báo km thật."],
      ["Có người đi theo xe kéo?", "Hỏi lúc gọi."]
    ]
  },
  {
    id: "vacham", slug: (a) => `va-cham-nhe-${a.id}.html`, kw: (a) => `cứu hộ va chạm nhẹ ${a.name}`,
    title: (a) => `Cứu hộ va chạm nhẹ ${a.name} | Kéo xe, không sửa đồng sơn | Trung Hiếu`,
    h1: (a, v) => [`Va chạm nhẹ ${a.name}: xe không đi được thì kéo, không “gò tại chỗ”`, `Cứu hộ sau va chạm ${a.name} — tấp lề, chụp ảnh, gọi`, `Kéo xe sau va chạm nhẹ ${a.name}`][v],
    lead: (a) => `Va chạm nhẹ ${a.name}: kéo khi xe không tự đi. ${a.near}. Gọi ${TEL}.`,
    h2: ["Cứu hộ không phải gara đồng sơn", "An toàn hiện trường", "Bảo hiểm"],
    p: (a, kw) => [
      `<strong>${kw}</strong> là kéo hoặc làm xe nhúc nhích an toàn, không nhận gò, sơn, giám định hộ. Bạn tự liên hệ gara / bảo hiểm.`,
      `Tấp lề nếu được, bật đèn. ${a.call}. ${a.near}.`,
      `Không đứng giữa làn tranh cãi. Xe gãy càng, chảy nước thì kéo, không nổ máy thử.`
    ],
    faqs: (a) => [
      ["Làm việc với bảo hiểm giúp không?", "Không. Kéo xe và báo giá kéo. Giấy tờ bảo hiểm bạn tự xử."],
      ["Xe còn đi được?", "Nếu an toàn thì bạn tự đi gara. Không chắc thì gọi kéo."]
    ]
  },
  {
    id: "khongno", slug: (a) => `xe-khong-no-may-${a.id}.html`, kw: (a) => `xe không nổ máy ${a.name}`,
    title: (a) => `Xe không nổ máy ${a.name} | Ô tô, xe hơi | Trung Hiếu`,
    h1: (a, v) => [`Xe không nổ máy ${a.name}: hết điện, hết xăng hay hỏng — phân biệt tại chỗ`, `Không nổ máy ${a.name} — đừng đề đến khi nóng củ`, `Xe không nổ máy ${a.name} 24/7`][v],
    lead: (a) => `Xe không nổ máy ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Ba nguyên nhân hay gặp", "Bạn nói gì khi gọi", "Kéo khi không câu được"],
    p: (a, kw) => [
      `<strong>${kw}</strong> ô tô / xe hơi: hết bình, hết xăng, máy/hộp số. Trung Hiếu không đoán một câu rồi tính tiền sai loại ca.`,
      `Nói đèn taplo, vừa mưa không, còn xăng không. ${a.call}. ${a.near}.`,
      `Câu / giao xăng được thì làm tại chỗ. Không thì kéo về nhà hoặc gara.`
    ],
    faqs: (a) => [
      ["Xe máy cũng nhận?", "Có. Trang này tập trung ô tô / xe hơi; nói loại xe khi gọi."],
      ["Có phụ thu đêm?", "Nếu có, nói lúc báo giá."]
    ]
  },
  {
    id: "letet", slug: (a) => `cuu-ho-le-tet-${a.id}.html`, kw: (a) => `cứu hộ lễ Tết ${a.name}`,
    title: (a) => `Cứu hộ lễ Tết ${a.name} | Ô tô, xe hơi 24/7 | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ lễ Tết ${a.name}: vẫn gọi được, chốt giá lúc gọi`, `Lễ Tết ${a.name} xe nằm đường — đừng chờ gara mở cửa`, `Cứu hộ 30 Tết / mùng 1 tại ${a.name}`][v],
    lead: (a) => `Cứu hộ lễ Tết ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Ngày lễ vẫn trong vùng", "Gara đóng cửa", "Phụ thu"],
    p: (a, kw) => [
      `<strong>${kw}</strong> không nghĩa “nghỉ Tết”. Trung Hiếu nhận ca trong An Lộc và phường lân cận; giờ đến nơi có thể lâu hơn ngày thường vì đường đông.`,
      `Gara đóng: kéo về nhà hoặc chỗ bạn chỉ. ${a.call}. ${a.near}.`,
      `Phụ thu lễ nếu có sẽ nói trước khi xuất phát, không cộng dọc đường.`
    ],
    faqs: (a) => [
      ["Mùng 1 có đi không?", `Gọi ${TEL}. Trong vùng thì nhận.`],
      ["Xe hơi 7 chỗ lễ được không?", "Nói loại xe. Cùng đội cứu hộ ô tô."]
    ]
  },
  {
    id: "baogia", slug: (a) => `bao-gia-cuu-ho-${a.id}.html`, kw: (a) => `báo giá cứu hộ ${a.name}`,
    title: (a) => `Báo giá cứu hộ ${a.name} | Nói trước khi đi | Trung Hiếu`,
    h1: (a, v) => [`Báo giá cứu hộ ${a.name}: không niêm một số cho mọi ca`, `Giá cứu hộ ${a.name} phụ thuộc km và loại xe`, `Báo giá cứu hộ ${a.name} trước khi điều xe`][v],
    lead: (a) => `Báo giá cứu hộ ${a.name}. ${a.near}. Gọi ${TEL}.`,
    h2: ["Giá phụ thuộc gì", "Ô tô / xe hơi", "Cách chốt"],
    p: (a, kw) => [
      `<strong>${kw}</strong> không in một con số trên web vì km và xe máy / ô tô khác nhau. Điều không đổi: chốt trước khi xuất phát.`,
      `Ca ô tô, xe hơi, SUV nặng hơn xe máy. ${a.near}. ${a.call}.`,
      `Gọi hoặc Zalo, gửi Maps. Xem thêm <a href="../bang-gia.html">bảng giá</a>.`
    ],
    faqs: (a) => [
      ["Có phụ thu đêm / mưa?", "Nếu có, nói lúc báo giá."],
      ["Chuyển khoản được không?", "Hỏi lúc chốt. Không ép app lạ."]
    ]
  },
  {
    id: "goi", slug: (a) => `goi-cuu-ho-${a.id}.html`, kw: (a) => `gọi cứu hộ ${a.name}`,
    title: (a) => `Gọi cứu hộ ${a.name} | 0343 387 868 | Trung Hiếu`,
    h1: (a, v) => [`Gọi cứu hộ ${a.name}: nói vị trí, loại xe, xe còn đi được không`, `Gọi cứu hộ ${a.name} — một số, Zalo cùng chủ`, `Cần cứu hộ ${a.name}: gọi rồi gửi Maps`][v],
    lead: (a) => `Gọi cứu hộ ${a.name}: ${TEL}. ${a.near}.`,
    h2: ["Nói gì trong 20 giây", "Ô tô hay xe máy", "Không nhắn tin số lạ"],
    p: (a, kw) => [
      `<strong>${kw}</strong> tới số <a href="tel:0343387868">${TEL}</a> hoặc <a href="https://zalo.me/0343387868" target="_blank" rel="noopener">Zalo</a>. ${a.call}.`,
      `Ô tô / xe hơi: nói số chỗ, sedan hay SUV. Xe máy: tay ga hay số. ${a.near}.`,
      `Không chuyển khoản cho số tự xưng cứu hộ khác. Chủ dịch vụ: Nguyễn Trung Hiếu, Tổ 5 Phú Thuận, An Lộc.`
    ],
    faqs: (a) => [
      ["Có form trên web không?", "Có trang liên hệ. Gọi điện nhanh hơn khi xe đang nằm làn."],
      ["Ngoài vùng thì sao?", "Nói Maps. Không nhận thì nói không."]
    ]
  }
];

function writePages(pages) {
  const dir = path.join(__dirname, "tin-tuc");
  fs.mkdirSync(dir, { recursive: true });
  for (const p of pages) {
    fs.writeFileSync(path.join(dir, p.file), chrome(p), "utf8");
  }
  const smPath = path.join(__dirname, "sitemap.xml");
  let sm = fs.readFileSync(smPath, "utf8");
  const today = "2026-09-20";
  for (const p of pages) {
    const loc = `${BASE}/tin-tuc/${p.file.replace(/\.html$/i, "")}`;
    if (sm.includes(loc)) continue;
    sm = sm.replace(
      "</urlset>",
      `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n</urlset>`
    );
  }
  fs.writeFileSync(smPath, sm, "utf8");
  return pages;
}

module.exports = { chrome, esc, faq, writePages, BASE, MAPS, TEL };

if (require.main !== module) {
  // imported by generate-cuu-ho-fill.js
} else {
const dir = path.join(__dirname, "tin-tuc");
const keepHandwritten = new Set(["bao-gia-cuu-ho-an-loc.html", "goi-cuu-ho-an-loc.html"]);

const pages = [];
for (const area of areas) {
  for (const intent of intents) {
    const file = intent.slug(area);
    if (keepHandwritten.has(file)) continue;
    const v = hash(file) % 3;
    const kw = intent.kw(area);
    const paras = intent.p(area, kw);
    const [h2a, h2b, h2c] = intent.h2;
    let desc = `${kw} 24/7. Xuất phát An Lộc. ${area.near}. Gọi ${TEL}, báo giá trước.`;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    if (desc.length > 158) desc = desc.slice(0, 157) + ".";
    pages.push({
      file,
      area: area.name,
      title: intent.title(area),
      h1: intent.h1(area, v),
      crumb: kw,
      desc,
      lead: intent.lead(area),
      label: kw.charAt(0).toUpperCase() + kw.slice(1),
      related: `<li><a href="${area.pillar}">Cứu hộ ${area.name}</a></li><li><a href="${area.oto}">Cứu hộ ô tô ${area.name}</a></li><li><a href="cuu-ho-xe-hoi.html">Cứu hộ xe hơi</a></li>`,
      body: `<p>${paras[0]}</p><h2>${h2a}</h2><p>${paras[1]}</p><h2>${h2b}</h2><p>${paras[2]}</p><h2>Liên hệ</h2><p>Gọi <a href="tel:0343387868">${TEL}</a> hoặc Zalo. Trụ sở: Tổ 5, Khu phố Phú Thuận, An Lộc. <a href="${MAPS}" target="_blank" rel="noopener">Maps</a>.</p>${faq(intent.faqs(area))}`
    });
  }
}

for (const p of pages) {
  fs.writeFileSync(path.join(dir, p.file), chrome(p), "utf8");
}

const smPath = path.join(__dirname, "sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8");
const today = "2026-09-20";
for (const p of pages) {
  const loc = `${BASE}/tin-tuc/${p.file.replace(/\.html$/i, "")}`;
  if (sm.includes(loc)) continue;
  sm = sm.replace(
    "</urlset>",
    `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n</urlset>`
  );
}
fs.writeFileSync(smPath, sm, "utf8");

const hubPath = path.join(__dirname, "tin-tuc.html");
let hub = fs.readFileSync(hubPath, "utf8");
const items = pages
  .slice()
  .sort((a, b) => a.file.localeCompare(b.file))
  .map((p) => `        <li><a href="tin-tuc/${p.file}">${esc(p.label)}</a></li>`)
  .join("\n");
if (!hub.includes('id="kw-xe-hoi"')) {
  const block = `    <section class="prose-block" id="kw-xe-hoi">
      <h2>Cứu hộ ô tô, cứu hộ xe hơi theo phường</h2>
      <ul class="kw-list">
${items}
      </ul>
    </section>
`;
  hub = hub.replace(
    '    <div class="article-list">',
    block + '    <div class="article-list">'
  );
} else {
  for (const p of pages) {
    const href = `tin-tuc/${p.file}`;
    if (hub.includes(href)) continue;
    hub = hub.replace(
      '      </ul>\n    </section>\n    <div class="article-list">',
      `        <li><a href="${href}">${esc(p.label)}</a></li>\n      </ul>\n    </section>\n    <div class="article-list">`
    );
  }
}
fs.writeFileSync(hubPath, hub, "utf8");

console.log("wrote", pages.length, "pages");
}
