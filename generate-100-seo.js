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
function chrome(p) {
  const url = BASE + "/tin-tuc/" + p.file.replace(/\.html$/i, "");
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmergencyService",
        "@id": BASE + "/#business",
        name: "Cứu hộ Trung Hiếu",
        image: OGIMG,
        telephone: "+84343387868",
        url,
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
  <meta name="theme-color" content="#06152c" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:site_name" content="Cứu hộ Trung Hiếu" />
  <meta property="og:title" content="${esc(p.title)}" />
  <meta property="og:description" content="${esc(p.desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${OGIMG}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="../images/logo.jpg" type="image/jpeg" />
  <link rel="stylesheet" href="../styles.css?v=ui2" />
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
      <p>${esc(p.lead)}</p>
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
  <script src="../cms.js?v=cms2"></script>
  <script src="../script.js?v=ui2"></script>
</body>
</html>`;
}

const areas = [
  { id: "an-loc", name: "An Lộc", pillar: "cuu-ho-an-loc.html", near: "đóng quân Tổ 5 Phú Thuận nên ca nội phường thường ngắn hơn ca xuyên phường", call: "nói hẻm hay mặt đường, có quay đầu được không" },
  { id: "phu-thuan", name: "Khu phố Phú Thuận", pillar: "cuu-ho-phu-thuan.html", near: "ngõ hẹp, xe kéo lớn có thể phải đón ở đầu hẻm", call: "nói rõ số nhà / đầu ngõ, hẻm có quay đầu không" },
  { id: "binh-long", name: "Bình Long", pillar: "cuu-ho-24-7-binh-long.html", near: "nhiều ca gần cổng khu; gửi số cổng còn hơn chỉ nói tên phường", call: "gửi cổng khu hoặc link Maps" },
  { id: "chon-thanh", name: "Chơn Thành", pillar: "cuu-ho-24-7-chon-thanh.html", near: "km từ An Lộc dài hơn nội phường — chốt điểm kéo về trước", call: "nói muốn kéo về An Lộc, Chơn Thành hay gara nào" },
  { id: "minh-hung", name: "Minh Hưng", pillar: "cuu-ho-24-7-minh-hung.html", near: "ca công nhân hay kẹt cổng khu công nghiệp, không phải ‘trung tâm phường’", call: "gửi số cổng / tên xưởng trên Zalo" },
  { id: "dong-xoai", name: "Đồng Xoài", pillar: "cuu-ho-24-7-dong-xoai.html", near: "không có đội sẵn tại Đồng Xoài; xe đi từ An Lộc, chốt giờ và km", call: "báo giờ bạn còn đứng được tại chỗ" },
  { id: "binh-phuoc", name: "phường Bình Phước", pillar: "cuu-ho-binh-phuoc.html", near: "đúng phường lân cận An Lộc, không phải nhận cả tỉnh cũ", call: "gửi Maps để đối chiếu còn trong vùng không" }
];

const intents = [
  {
    id: "keo", slug: (a) => `keo-xe-${a.id}.html`, kw: (a) => `kéo xe ${a.name}`,
    title: (a) => `Kéo xe ${a.name} 24/7 | Xe máy & ô tô | Trung Hiếu`,
    h1: (a, v) => [`Kéo xe ${a.name}: chốt điểm đón rồi mới ra xe`, `Kéo xe ${a.name} — xe không tự đi thì kéo, đừng đẩy ẩu`, `Kéo xe ${a.name} từ An Lộc, báo km trước`][v],
    lead: (a) => `Kéo xe ${a.name} xuất phát An Lộc. ${a.near}. Gọi ${TEL}.`,
    h2: ["Khi nào nên kéo", "Xe máy khác ô tô", "Giá kéo"],
    p: (a, kw) => [
      `Người tìm <strong>${kw}</strong> thường xe đã không tự đi: gãy, thủy kích, va chạm nhẹ, hết điện kéo dài. Trung Hiếu kéo về nhà hoặc gara bạn chỉ, không tự ý kéo về chỗ mình rồi tính sau.`,
      `${a.name}: ${a.near}. ${a.call}. Sai sàn, sai dây là cào gầm — gần hay xa đều làm đúng kỹ thuật.`,
      `Chốt điểm đón và điểm trả trước khi xe lăn bánh. Đổi điểm giữa đường thì nói lại giá, không âm thầm cộng.`
    ],
    faqs: (a) => [
      [`Kéo xe ${a.name} có đêm không?`, `Có, trong vùng. Gọi ${TEL}.`],
      ["Kéo về gara được không?", "Được. Nói địa chỉ gara khi gọi."]
    ]
  },
  {
    id: "xemay", slug: (a) => `cuu-ho-xe-may-${a.id}.html`, kw: (a) => `cứu hộ xe máy ${a.name}`,
    title: (a) => `Cứu hộ xe máy ${a.name} | Chết máy, nổ lốp, hết xăng | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ xe máy ${a.name} — ca nhỏ cũng không đứng giữa đường`, `Xe máy ${a.name} nằm đường: tấp lề rồi gọi`, `Cứu hộ xe máy ${a.name} 24/7 từ An Lộc`][v],
    lead: (a) => `Cứu hộ xe máy ${a.name}: hết bình, nổ lốp, hết xăng, kéo về nhà. ${a.near}`,
    h2: ["Ca xe máy hay gặp", "Đứng chỗ nào cho an toàn", "Khi phải kéo"],
    p: (a, kw) => [
      `<strong>${kw}</strong> là ca Trung Hiếu nhận nhiều: đề không nổ sau mưa, lốp xẹp, hết xăng đêm. Đừng ngồi yên giữa làn.`,
      `${a.call}. Xe máy cố định khác ô tô — nói tay ga hay số, còn đứng được không.`,
      `Không vá được tại chỗ thì kéo. Giá kéo nói riêng, không gộp mập mờ.`
    ],
    faqs: (a) => [
      ["Xe tay ga câu được không?", "Nhiều ca được. Nói hãng xe khi gọi."],
      [`Có giao xăng ${a.name} không?`, "Có, nói xăng hay dầu."]
    ]
  },
  {
    id: "oto", slug: (a) => `cuu-ho-o-to-${a.id}.html`, kw: (a) => `cứu hộ ô tô ${a.name}`,
    title: (a) => `Cứu hộ ô tô ${a.name} | Kéo xe, lốp, ắc quy | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ ô tô ${a.name}: không cào gầm, không kéo ẩu`, `Ô tô ${a.name} nằm đường — ưu tiên lề rồi mới xử lý`, `Cứu hộ ô tô ${a.name} 24/7, báo giá trước`][v],
    lead: (a) => `Cứu hộ ô tô ${a.name}: kéo an toàn, thay lốp, câu bình. ${a.near}`,
    h2: ["Thông tin ô tô cần nói", "Không tự kích trên dốc", "Sau khi xe tới"],
    p: (a, kw) => [
      `Search <strong>${kw}</strong> thường là lốp, bình, hoặc không nổ sau mưa. Thắt dây, đèn cảnh báo, không mở cửa về phía làn.`,
      `Sedan hay SUV, số sàn hay tự động, đã vào lề chưa. ${a.call}.`,
      `Bạn xem cách cố định, hỏi lại giá đã chốt. Phụ thu đêm/mưa chỉ khi đã nói lúc gọi.`
    ],
    faqs: (a) => [
      ["Xe 7 chỗ, bán tải?", "Nói loại xe. Quá khổ thì nói không nếu thiết bị không phù hợp."],
      ["Xe điện?", "Nói hãng và tình trạng. Không cam kết mọi dòng trên web."]
    ]
  },
  {
    id: "lop", slug: (a) => `thay-lop-${a.id}.html`, kw: (a) => `thay lốp tận nơi ${a.name}`,
    title: (a) => `Thay lốp tận nơi ${a.name} | Xe máy & ô tô | Trung Hiếu`,
    h1: (a, v) => [`Thay lốp ${a.name}: chỗ đứng an toàn còn hơn thay cho xong`, `Nổ lốp ${a.name} — tấp lề, đừng vá giữa làn`, `Thay lốp tận nơi ${a.name} 24/7`][v],
    lead: (a) => `Thay lốp ${a.name} khi nổ lốp, xẹp hơi. Không thay được thì kéo. ${TEL}.`,
    h2: ["Bạn chuẩn bị", "Khi phải kéo thay vì thay", "Chi phí"],
    p: (a, kw) => [
      `<strong>${kw}</strong> chỉ làm khi có mặt bằng. Không lề, trời tối, mưa: kéo trước. ${a.near}.`,
      `Lốp trước hay sau, xe máy hay ô tô, có lốp dự phòng không. ${a.call}.`,
      `Công thay khác công kéo. Chốt trước. Không ép bán lốp trên lề.`
    ],
    faqs: (a) => [
      ["Có bán lốp mới không?", "Tùy tình trạng. Không ép mua."],
      ["Lốp không săm?", "Nói loại lốp khi gọi."]
    ]
  },
  {
    id: "binh", slug: (a) => `cau-binh-${a.id}.html`, kw: (a) => `câu bình ắc quy ${a.name}`,
    title: (a) => `Câu bình ắc quy ${a.name} | Đề không nổ | Trung Hiếu`,
    h1: (a, v) => [`Câu bình ${a.name}: hết điện thì câu, hỏng bình thì nói thật`, `Ắc quy ${a.name} yếu — đừng đề 20 lần`, `Câu bình tận nơi ${a.name} 24/7`][v],
    lead: (a) => `Câu bình ${a.name} khi đề không nổ, đèn mờ. Bình chết thì kéo. Gọi ${TEL}.`,
    h2: ["Dấu hiệu hết điện", "Đừng làm trước khi đội tới", "Khi phải kéo"],
    p: (a, kw) => [
      `<strong>${kw}</strong> gặp buổi sáng và sau mưa. Đèn tối, còi yếu, đề ụt ụt. Tắt hết thiết bị trên xe.`,
      `Không đề dai, không kẹp nhầm cực. ${a.call}. ${a.near}.`,
      `Củ đề kêu khác, mùi cháy, ngập: chuyển kéo. Giá kéo nói riêng.`
    ],
    faqs: (a) => [
      ["Xe máy câu được không?", "Được nhiều trường hợp. Nói loại xe."],
      ["Có bán bình tại chỗ?", "Không cam kết luôn có đúng loại trên xe cứu hộ."]
    ]
  },
  {
    id: "xang", slug: (a) => `giao-xang-${a.id}.html`, kw: (a) => `giao xăng tận nơi ${a.name}`,
    title: (a) => `Giao xăng ${a.name} | Hết xăng đêm | Trung Hiếu`,
    h1: (a, v) => [`Giao xăng ${a.name}: nói xăng hay dầu trước khi đổ`, `Hết xăng ${a.name} — gọi, đừng đổ nhờ loại không rõ`, `Giao xăng tận nơi ${a.name} 24/7`][v],
    lead: (a) => `Giao xăng ${a.name}. Nói đúng xăng hoặc dầu. ${a.near}`,
    h2: ["Nói loại nhiên liệu", "Sau khi đổ", "Giá"],
    p: (a, kw) => [
      `<strong>${kw}</strong> trông đơn giản. Đổ nhầm dầu vào xe xăng thành ca kéo. Trung Hiếu hỏi loại trước.`,
      `${a.call}. Xe máy hay ô tô, còn đứng được chỗ đó không.`,
      `Báo giá trước. Đêm hay xa An Lộc thì nói phụ thu lúc gọi, không đội sau.`
    ],
    faqs: (a) => [
      ["Dầu diezen có giao không?", "Nói rõ dầu. Không đoán."],
      ["Đổ xong không nổ?", "Báo lại. Có thể không chỉ hết xăng."]
    ]
  },
  {
    id: "dem", slug: (a) => `cuu-ho-dem-${a.id}.html`, kw: (a) => `cứu hộ đêm ${a.name}`,
    title: (a) => `Cứu hộ đêm ${a.name} | Sau 22h | Trung Hiếu ${TEL}`,
    h1: (a, v) => [`Cứu hộ đêm ${a.name}: ánh sáng và lề quan trọng hơn ‘sửa cho nhanh’`, `Xe nằm đường đêm ${a.name} — gọi ${TEL}`, `Cứu hộ đêm ${a.name} 24/7 từ An Lộc`][v],
    lead: (a) => `Cứu hộ đêm ${a.name}: kéo xe, hết bình, hết xăng. Đèn cảnh báo, đứng lề.`,
    h2: ["Trước khi xe tới", "Ca đêm hay gặp", "Phụ thu"],
    p: (a, kw) => [
      `<strong>${kw}</strong> nghĩa là ca 22h–sáng vẫn nhận. Không hẹn sáng mai khi xe chắn đường.`,
      `Bật đèn hazard, lên lề. ${a.call}. ${a.near}.`,
      `Phụ thu đêm nếu có sẽ nói lúc báo giá, trước khi xuất phát.`
    ],
    faqs: (a) => [
      ["Có trực Tết không?", "Có. Gọi cùng số."],
      ["Không nghe máy?", "Nhắn Zalo 0343387868 — có thể đang trên ca."]
    ]
  },
  {
    id: "ngap", slug: (a) => `xe-ngap-${a.id}.html`, kw: (a) => `cứu hộ xe ngập nước ${a.name}`,
    title: (a) => `Xe ngập nước ${a.name} | Tắt máy, kéo xe | Trung Hiếu`,
    h1: (a, v) => [`Xe ngập ${a.name}: tắt máy ngay, đừng đề thử`, `Cứu hộ xe ngập ${a.name} — ưu tiên kéo, không thủy kích thêm`, `Xe chết vì ngập ${a.name}: gọi kéo`][v],
    lead: (a) => `Xe ngập ${a.name}: tắt máy, không đề lại, gọi kéo. Tránh thủy kích. ${TEL}.`,
    h2: ["Việc làm ngay", "Vì sao không đề lại", "Kéo về đâu"],
    p: (a, kw) => [
      `<strong>${kw}</strong>: nước vào ống xả hoặc khoang máy rồi đề là dễ thủy kích. Tắt máy.`,
      `Đẩy vào chỗ cao chỉ khi nước cạn, không điện, an toàn. ${a.call}.`,
      `Kéo về gara hoặc nhà. ${a.near}. Giữ hóa đơn nếu tính bảo hiểm — cứu hộ không làm hồ sơ hộ.`
    ],
    faqs: (a) => [
      ["Tự đẩy được không?", "Chỉ khi nước cạn, không chảy. Không chắc thì đừng."],
      ["Xe máy ngập?", "Tắt máy, gọi. Đừng nổ thử."]
    ]
  },
  {
    id: "chet", slug: (a) => `xe-chet-may-${a.id}.html`, kw: (a) => `xe chết máy ${a.name}`,
    title: (a) => `Xe chết máy ${a.name} | Cứu hộ tận nơi | Trung Hiếu`,
    h1: (a, v) => [`Xe chết máy ${a.name}: mô tả tiếng đề, đừng đoán bệnh trên lề`, `Chết máy ${a.name} — hết bình, hết xăng hay phải kéo?`, `Cứu hộ xe chết máy ${a.name} 24/7`][v],
    lead: (a) => `Xe chết máy ${a.name}: câu bình, giao xăng hoặc kéo. Gọi ${TEL}, nói triệu chứng.`,
    h2: ["Phân loại nhanh", "Thông tin khi gọi", "Không tự tháo"],
    p: (a, kw) => [
      `Gõ <strong>${kw}</strong> vì xe đứng giữa đường. Hết xăng, hết bình, ngập, gãy — mỗi việc một hướng xử lý.`,
      `Nói: vừa mưa chưa, đèn còn sáng không, có mùi xăng không. ${a.call}.`,
      `${a.near}. Không tự tháo bugi giữa làn. Đợi cứu hộ.`
    ],
    faqs: (a) => [
      ["Có sửa tại chỗ không?", "Câu bình, xăng, lốp thì tại chỗ nếu được. Hỏng nặng thì kéo."],
      ["Có thợ máy theo xe?", "Cứu hộ đường, không mở garage dã chiến."]
    ]
  },
  {
    id: "hetxang", slug: (a) => `het-xang-${a.id}.html`, kw: (a) => `hết xăng ${a.name}`,
    title: (a) => `Hết xăng ${a.name} | Giao xăng tận nơi 24/7 | Trung Hiếu`,
    h1: (a, v) => [`Hết xăng ${a.name}: gọi giao, đừng đẩy xe hàng cây số`, `Xe hết xăng ${a.name} đêm — nói đúng loại nhiên liệu`, `Hết xăng ${a.name}, cứu hộ Trung Hiếu giao tận nơi`][v],
    lead: (a) => `Hết xăng ${a.name}. Giao xăng/dầu tận nơi. ${a.near}`,
    h2: ["Gọi thế nào", "Xe đẩy được thì đẩy", "Nhầm nhiên liệu"],
    p: (a, kw) => [
      `<strong>${kw}</strong> hay gặp đêm, khu ít cây xăng. Đừng đẩy dọc quốc lộ.`,
      `${a.call}. Còn xăng đèn báo không, xe xăng hay dầu.`,
      `Đổ nhầm là ca kéo. Trung Hiếu hỏi loại trước khi mang can.`
    ],
    faqs: (a) => [
      ["Mang can sẵn không?", "Nói loại xe. Không tự ý đổ."],
      ["Giá gồm xăng?", "Báo rõ công giao và nhiên liệu lúc gọi."]
    ]
  },
  {
    id: "hetbinh", slug: (a) => `het-binh-${a.id}.html`, kw: (a) => `hết bình ${a.name}`,
    title: (a) => `Hết bình ${a.name} | Câu ắc quy tận nơi | Trung Hiếu`,
    h1: (a, v) => [`Hết bình ${a.name}: tắt đèn, gọi câu, đừng đề thêm`, `Xe hết điện ${a.name} — câu bình hoặc kéo`, `Hết bình ${a.name} 24/7, Trung Hiếu An Lộc`][v],
    lead: (a) => `Hết bình ${a.name}: câu ắc quy tại chỗ nếu còn cứu. Gọi ${TEL}.`,
    h2: ["Nhận biết", "Chờ cứu hộ", "Bình đã chết"],
    p: (a, kw) => [
      `<strong>${kw}</strong>: đèn mờ, đề ụt, taplo nhấp nháy. Tắt quạt, radio, đèn.`,
      `${a.near}. ${a.call}. Không chập dây ‘cho có’.`,
      `Câu được thì nổ máy, đừng tắt ngay. Không nổ lại: kéo về gara, nói giá kéo riêng.`
    ],
    faqs: (a) => [
      ["Để xe lâu hết bình?", "Hay gặp. Gọi câu."],
      ["Có bảo hành bình?", "Không bán bình ảo trên web. Tư vấn khi tới nơi."]
    ]
  },
  {
    id: "nolop", slug: (a) => `no-lop-${a.id}.html`, kw: (a) => `nổ lốp ${a.name}`,
    title: (a) => `Nổ lốp ${a.name} | Thay lốp tận nơi | Trung Hiếu`,
    h1: (a, v) => [`Nổ lốp ${a.name}: giữ lái, tấp lề, đừng phanh gấp`, `Lốp nổ ${a.name} — gọi thay hoặc kéo`, `Xử lý nổ lốp ${a.name} rồi gọi ${TEL}`][v],
    lead: (a) => `Nổ lốp ${a.name}: tấp lề, đèn cảnh báo, gọi thay lốp hoặc kéo.`,
    h2: ["Trên đường", "Gọi cứu hộ", "Ô tô thiếu lốp bước"],
    p: (a, kw) => [
      `<strong>${kw}</strong>: hai tay lái, nhả ga, không phanh gấp. Người xuống phía lề, không đứng sau xe.`,
      `Tam giác phản quang nếu có. ${a.call}. ${a.near}.`,
      `Thiếu lốp bước: có thể phải kéo. Nói rõ khi gọi.`
    ],
    faqs: (a) => [
      ["Vá tại chỗ?", "Tùy lốp và chỗ đứng. Không vá ẩu giữa làn."],
      ["Lốp sau ô tô?", "Nói vị trí lốp."]
    ]
  },
  {
    id: "tannoi", slug: (a) => `cuu-ho-tan-noi-${a.id}.html`, kw: (a) => `cứu hộ tận nơi ${a.name}`,
    title: (a) => `Cứu hộ tận nơi ${a.name} 24/7 | Trung Hiếu An Lộc`,
    h1: (a, v) => [`Cứu hộ tận nơi ${a.name}: gửi vị trí, không hẹn ‘ghé lúc nào rảnh’`, `Tận nơi ${a.name} nghĩa là xe tới chỗ bạn đứng`, `Cứu hộ tận nơi ${a.name} — kéo, lốp, bình, xăng`][v],
    lead: (a) => `Cứu hộ tận nơi ${a.name}: Trung Hiếu tới chỗ xe nằm. ${a.near}`,
    h2: ["Tận nơi gồm gì", "Bạn cần gửi gì", "Ngoài vùng"],
    p: (a, kw) => [
      `<strong>${kw}</strong> là kéo, thay lốp, câu bình, giao xăng tại chỗ xe đang đứng — không phải bạn tự dắt về An Lộc.`,
      `${a.call}. Link Maps còn hơn mô tả ‘gần ngã ba’.`,
      `Ngoài danh sách phường: nói không. Không nhận cho có.`
    ],
    faqs: (a) => [
      ["Có mặt bao lâu?", "Nói giờ dự kiến lúc báo giá. Không in ‘5 phút’ trên web."],
      ["Thanh toán?", "Chốt trước khi đi."]
    ]
  },
  {
    id: "venha", slug: (a) => `keo-xe-ve-nha-${a.id}.html`, kw: (a) => `kéo xe về nhà ${a.name}`,
    title: (a) => `Kéo xe về nhà ${a.name} | Trung Hiếu 24/7`,
    h1: (a, v) => [`Kéo xe về nhà ${a.name}: nói địa chỉ trả trước khi xe lăn`, `Về nhà ${a.name} hay về gara — chốt một điểm`, `Kéo xe về nhà ${a.name} từ chỗ nằm đường`][v],
    lead: (a) => `Kéo xe về nhà ${a.name}. Chốt điểm trả, báo giá km. Gọi ${TEL}.`,
    h2: ["Chốt địa chỉ", "Hẻm nhà", "Không đổi điểm lặng lẽ"],
    p: (a, kw) => [
      `<strong>${kw}</strong> khác kéo về gara. Nói số nhà, hẻm có vào được xe kéo không.`,
      `${a.near}. ${a.call}.`,
      `Đổi sang gara giữa đường: tính lại km, nói lại giá.`
    ],
    faqs: (a) => [
      ["Nhà trong hẻm cụt?", "Nói rõ. Có thể trả đầu ngõ."],
      ["Có người nhà nhận xe?", "Nên có. Nói SĐT người nhận."]
    ]
  },
  {
    id: "mua", slug: (a) => `cuu-ho-mua-${a.id}.html`, kw: (a) => `cứu hộ trời mưa ${a.name}`,
    title: (a) => `Cứu hộ trời mưa ${a.name} | Ngập, chết máy | Trung Hiếu`,
    h1: (a, v) => [`Cứu hộ mưa ${a.name}: giảm tốc, đừng lội vũng không rõ đáy`, `Mưa lớn ${a.name} — xe chết thì tắt máy, gọi kéo`, `Cứu hộ khi mưa ${a.name} 24/7`][v],
    lead: (a) => `Cứu hộ mưa ${a.name}: ngập, hết bình, nổ lốp trơn. Gọi ${TEL}.`,
    h2: ["Lái khi mưa", "Xe đã chết", "Phụ thu mưa"],
    p: (a, kw) => [
      `<strong>${kw}</strong> hay dính ngập và mất điện. Giảm tốc, tăng khoảng cách, bật đèn.`,
      `Chết máy dưới mưa: tắt máy, không nổ lại. ${a.call}. ${a.near}.`,
      `Mưa có phụ thu thì báo lúc gọi, trước khi đi.`
    ],
    faqs: (a) => [
      ["Mưa có đi không?", "Có, trong vùng. Thời gian có thể dài hơn."],
      ["Sét, cây đổ?", "Ưu tiên an toàn. Có thể hẹn khi đường thông."]
    ]
  }
];

const skip = new Set([
  "keo-xe-an-loc.html",
  "cuu-ho-xe-may-an-loc.html",
  "cuu-ho-o-to-an-loc.html",
  "giao-xang-an-loc.html",
  "cuu-ho-dem-an-loc.html",
  "thay-lop-an-loc.html",
  "cau-binh-an-loc.html",
  "xe-ngap-an-loc.html"
]);

function hash(s) {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n;
}

const extras = [
  {
    file: "goi-cuu-ho-an-loc.html",
    area: "An Lộc",
    title: `Gọi cứu hộ An Lộc | Số ${TEL} | Trung Hiếu`,
    h1: "Gọi cứu hộ An Lộc: bốn ý đủ, không cần kể tiểu sử xe",
    crumb: "Gọi cứu hộ An Lộc",
    kw: "gọi cứu hộ An Lộc",
    lead: `Gọi ${TEL} hoặc Zalo. Nói vị trí, loại xe, tình trạng, muốn kéo về đâu.`,
    body: `<p><strong>Gọi cứu hộ An Lộc</strong> nhanh khi đủ bốn ý: đang ở đâu (Maps), xe máy hay ô tô, xe đang làm gì, muốn xử lý tại chỗ hay kéo về đâu.</p>
<h2>Số nào</h2><p>Site dùng <a href="tel:0343387868">${TEL}</a>. Zalo cùng số. Logo cũ nếu khác số — gọi số trên trang này.</p>
<h2>Không nghe máy</h2><p>Nhắn Zalo vị trí. Có thể đang trên ca.</p>
${faq([["Có tổng đài 1900 không?", "Không. Gọi thẳng 0343 387 868."], ["Đặt lịch?", "Xe nằm đường thì gọi ngay. Không gấp thì form Liên hệ."]])}
<p><a href="${MAPS}" target="_blank" rel="noopener">Maps trụ sở</a>.</p>`,
    related: `<li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li><li><a href="../lien-he.html">Liên hệ</a></li>`
  },
  {
    file: "cuu-ho-trung-hieu.html",
    area: "An Lộc",
    title: `Cứu hộ Trung Hiếu | An Lộc 24/7 | ${TEL}`,
    h1: "Cứu hộ Trung Hiếu: đội xe tại An Lộc, không chi nhánh ảo",
    crumb: "Cứu hộ Trung Hiếu",
    kw: "cứu hộ Trung Hiếu",
    lead: "Cứu hộ Trung Hiếu — Nguyễn Trung Hiếu, Tổ 5 Phú Thuận, An Lộc. Kéo xe, lốp, bình, xăng 24/7.",
    body: `<p><strong>Cứu hộ Trung Hiếu</strong> là dịch vụ cứu hộ đường của Nguyễn Trung Hiếu, đóng Tổ 5, Khu phố Phú Thuận, An Lộc, Đồng Nai. Không phải mạng lưới nhiều tỉnh.</p>
<h2>Làm gì</h2><p>Kéo xe máy và ô tô, thay lốp tận nơi, câu bình, giao xăng. Báo giá trước.</p>
<h2>Phục vụ đâu</h2><p>An Lộc, Phú Thuận, Bình Long, Chơn Thành, Minh Hưng, Đồng Xoài, phường Bình Phước. <a href="../khu-vuc.html">Xem khu vực</a>.</p>
${faq([["Chủ là ai?", "Nguyễn Trung Hiếu. Gọi 0343 387 868."], ["Có Facebook?", "Footer generic cho tới khi có fanpage thật."]])}
<p><a href="${MAPS}" target="_blank" rel="noopener">Google Maps</a>.</p>`,
    related: `<li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li><li><a href="cuu-ho-binh-phuoc.html">Cứu hộ Bình Phước</a></li>`
  },
  {
    file: "bao-gia-cuu-ho-an-loc.html",
    area: "An Lộc",
    title: "Báo giá cứu hộ An Lộc | Nói giá trước khi xuất phát | Trung Hiếu",
    h1: "Báo giá cứu hộ An Lộc: không niêm một số cho mọi ca, nhưng nói trước khi đi",
    crumb: "Báo giá cứu hộ An Lộc",
    kw: "báo giá cứu hộ An Lộc",
    lead: "Giá tùy loại xe, km, kéo hay xử lý tại chỗ. Trung Hiếu nói rõ trước khi điều xe.",
    body: `<p><strong>Báo giá cứu hộ An Lộc</strong> không phải bảng in sẵn trên web vì km và loại xe khác nhau. Điều không đổi: chốt số trước khi xuất phát, không đội giá dọc đường.</p>
<h2>Giá phụ thuộc gì</h2><p>Xe máy hay ô tô, kéo hay câu bình/thay lốp/giao xăng, đêm, mưa, điểm trả nhà hay gara.</p>
<h2>Cách biết giá</h2><p>Gọi <a href="tel:0343387868">${TEL}</a>, gửi Maps. <a href="../bang-gia.html">Trang bảng giá</a> giải thích cách tính.</p>
${faq([["Có phụ thu đêm?", "Nếu có, nói lúc báo giá."], ["Thanh toán chuyển khoản?", "Hỏi lúc chốt. Không ép app lạ."]])}`,
    related: `<li><a href="../bang-gia.html">Bảng giá</a></li><li><a href="keo-xe-an-loc.html">Kéo xe An Lộc</a></li>`
  }
];

const pages = [];
for (const area of areas) {
  for (const intent of intents) {
    const file = intent.slug(area);
    if (skip.has(file)) continue;
    const v = hash(file) % 3;
    const kw = intent.kw(area);
    const paras = intent.p(area, kw);
    const [h2a, h2b, h2c] = intent.h2;
    pages.push({
      file,
      area: area.name,
      title: intent.title(area),
      h1: intent.h1(area, v),
      crumb: kw,
      desc: `${kw} 24/7. Xuất phát An Lộc. ${area.near}. Gọi ${TEL}, báo giá trước.`,
      lead: intent.lead(area),
      related: `<li><a href="${area.pillar}">Cứu hộ ${area.name}</a></li><li><a href="../khu-vuc.html">Khu vực phục vụ</a></li><li><a href="../lien-he.html">Liên hệ</a></li>`,
      body: `<p>${paras[0]}</p><h2>${h2a}</h2><p>${paras[1]}</p><h2>${h2b}</h2><p>${paras[2]}</p><h2>${h2c}</h2><p>Gọi <a href="tel:0343387868">${TEL}</a> hoặc Zalo. Trụ sở: Tổ 5, Khu phố Phú Thuận, An Lộc. <a href="${MAPS}" target="_blank" rel="noopener">Maps</a>.</p>${faq(intent.faqs(area))}`
    });
  }
}

for (const e of extras) pages.push(e);

if (pages.length > 100) pages.length = 100;
if (pages.length < 100) {
  console.error("need 100, got", pages.length);
  process.exit(1);
}

const dir = path.join(__dirname, "tin-tuc");
fs.mkdirSync(dir, { recursive: true });
for (const p of pages) {
  fs.writeFileSync(path.join(dir, p.file), chrome(p), "utf8");
}

const smPath = path.join(__dirname, "sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8");
const today = "2026-09-18";
for (const p of pages) {
  const loc = `${BASE}/tin-tuc/${p.file.replace(/\.html$/i, "")}`;
  if (sm.includes(loc)) continue;
  sm = sm.replace(
    "</urlset>",
    `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n</urlset>`
  );
}
fs.writeFileSync(smPath, sm, "utf8");
console.log("wrote", pages.length, "pages");
