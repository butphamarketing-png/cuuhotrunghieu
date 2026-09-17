const fs = require("fs");
const path = require("path");

const BASE = "https://cuuhotrunghieu.com";
const OGIMG = BASE + "/images/hero-slide-1.png";
const MAPS = "https://maps.app.goo.gl/oDM8HWbHmq7ijzN36";

function absBai(file) {
  const stem = String(file).replace(/\.html$/i, "");
  return stem === "index" ? BASE + "/bai-viet" : BASE + "/bai-viet/" + stem;
}

function chrome(p) {
  const url = absBai(p.file);
  const bizNode = Object.assign({}, p.jsonld);
  delete bizNode["@context"];
  bizNode.url = url;
  bizNode["@id"] = BASE + "/#business";
  const crumbs = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: BASE + "/" },
      { "@type": "ListItem", position: 2, name: "Cứu hộ theo khu vực", item: BASE + "/bai-viet" }
    ]
  };
  if (url !== BASE + "/bai-viet") {
    crumbs.itemListElement.push({ "@type": "ListItem", position: 3, name: p.crumb, item: url });
  }
  const graph = { "@context": "https://schema.org", "@graph": [bizNode, crumbs] };
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
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
    <a class="btn-phone" href="tel:0343387868">0343 387 868</a>
  </header>
  <main id="noi-dung" class="page-main">
    <header class="page-hero">
      <p class="crumb"><a href="../index.html">Trang chủ</a> / <a href="index.html">Cứu hộ khu vực</a> / ${esc(p.crumb)}</p>
      <h1>${esc(p.h1)}</h1>
      <p>${esc(p.lead)}</p>
      <div class="hero-actions">
        <a class="btn btn-call" href="tel:0343387868">Gọi 0343 387 868</a>
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
function esc(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
}
function faq(items) {
  return `<h2>Câu hỏi thường gặp</h2>` + items.map(([q,a]) => `<h3>${q}</h3><p>${a}</p>`).join("");
}
function biz(name) {
  return {
    "@type": "EmergencyService",
    name: "Cứu hộ Trung Hiếu",
    image: OGIMG,
    telephone: "+84343387868",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tổ 5, Khu phố Phú Thuận",
      addressLocality: "An Lộc",
      addressRegion: "Đồng Nai",
      addressCountry: "VN"
    },
    geo: { "@type": "GeoCoordinates", latitude: 11.6390278, longitude: 106.6087778 },
    hasMap: MAPS,
    areaServed: name,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    },
    sameAs: ["https://zalo.me/0343387868"]
  };
}

const pages = [];

pages.push({
  file: "cuu-ho-an-loc.html",
  title: "Cứu hộ An Lộc 24/7 | Kéo xe, thay lốp, câu bình | Trung Hiếu",
  desc: "Cứu hộ An Lộc 24/7: kéo xe, cứu hộ xe máy & ô tô, thay lốp, câu bình, giao xăng. Xuất phát Tổ 5, Phú Thuận. Gọi 0343 387 868, báo giá trước.",
  crumb: "An Lộc",
  h1: "Cứu hộ An Lộc – có mặt khi xe nằm đường",
  lead: "Phường An Lộc là nơi Trung Hiếu đóng quân. Ca trong phường không phải ‘điều xe từ tỉnh khác’: gọi được là xếp lịch xuất phát.",
  jsonld: biz("Phường An Lộc"),
  related: `<li><a href="keo-xe-an-loc.html">Kéo xe An Lộc</a></li><li><a href="cuu-ho-xe-may-an-loc.html">Cứu hộ xe máy An Lộc</a></li><li><a href="cuu-ho-24-7-an-loc.html">Cứu hộ 24/7 An Lộc</a></li>`,
  body: `
<p>Người tìm <strong>cứu hộ An Lộc</strong> thường đang đứng cạnh xe chết máy, lốp xẹp hoặc hết xăng — không phải đang so sánh catalog. Trang này nói việc Trung Hiếu làm được trong phường, cần bạn nói gì khi gọi, và khi nào nên kéo chứ đừng tự đẩy.</p>
<h2>Vì sao An Lộc khác các phường lân cận</h2>
<p>Điểm xuất phát ghi trên giấy tờ và Maps: Tổ 5, Khu phố Phú Thuận, An Lộc, Đồng Nai. Ca nội phường rút được thời gian chờ so với ca phải băng sang Bình Long hay Chơn Thành. Vẫn không hứa “5 phút” vì kẹt xe, mưa, hoặc xe đang kẹt trong hẻm hẹp. Trung Hiếu nói thời gian dự kiến lúc báo giá, không hứa suông trên web.</p>
<p>An Lộc có đoạn đường dân cư lẫn lối vào khu phố. Nếu xe nằm giữa ngã tư, ưu tiên tấp lề rồi gọi. Đừng để người ngồi trên yên giữa làn xe tải.</p>
<h2>Những ca cứu hộ An Lộc nhận nhiều</h2>
<ul>
<li>Xe máy hết bình sau đêm mưa, đề không nổ.</li>
<li>Ô tô nổ lốp gần lề, không dám tự kích kích vì thiếu kích.</li>
<li>Hết xăng lúc quán xá đóng cửa.</li>
<li>Xe không đi được, cần kéo về nhà trong phường hoặc gara quen.</li>
</ul>
<p>Chi tiết từng việc nằm ở các bài <a href="thay-lop-tan-noi-an-loc.html">thay lốp tận nơi</a>, <a href="cau-binh-ac-quy-an-loc.html">câu bình</a>, <a href="giao-xang-an-loc.html">giao xăng</a>. Trang này là cửa vào: biết gọi ai, nói gì, kỳ vọng gì.</p>
<h2>Gọi cứu hộ An Lộc như thế nào cho nhanh</h2>
<p>Số <a href="tel:0343387868">0343 387 868</a> hoặc Zalo cùng số. Bốn ý đủ dùng: đang ở An Lộc chỗ nào (link Maps hoặc tên đường + điểm nhìn thấy), xe máy hay ô tô, xe đang làm gì (không nổ / xẹp lốp / nằm chắn đường), muốn xử lý tại chỗ hay kéo về đâu.</p>
<p>Không cần kể dài tiểu sử xe. Càng rõ vị trí, xe tới đúng ngõ càng nhanh. Hẻm cụt thì nói “hẻm không quay đầu được” để chọn xe kéo phù hợp.</p>
<h2>Giá cứu hộ trong phường</h2>
<p>Không niêm yết một con số cho mọi ca vì km thực tế, loại xe và tình trạng khác nhau. An Lộc gần điểm xuất phát nên ca nội phường thường gọn hơn ca xuyên phường. Điều không đổi: <strong>nói giá trước khi điều xe</strong>, không đội giá dọc đường. Đêm hoặc mưa có phụ thu thì nói lúc đó.</p>
${faq([
  ["Cứu hộ An Lộc có làm nửa đêm không?", "Có. Trực 24/7, kể cả lễ. Ca đêm xem bài cứu hộ đêm."],
  ["Có cần đặt lịch không?", "Xe đang nằm đường thì gọi ngay. Không gấp thì đặt lịch ở trang Liên hệ."],
  ["Có nhận phường khác không?", "Có, trong danh sách phường lân cận trên trang Khu vực. Ngoài vùng sẽ nói thẳng."]
])}
<p>Maps trụ sở: <a href="https://maps.app.goo.gl/oDM8HWbHmq7ijzN36" target="_blank" rel="noopener">mở Google Maps</a>.</p>`
});

pages.push({
  file: "cuu-ho-phu-thuan.html",
  title: "Cứu hộ Khu phố Phú Thuận, An Lộc | Trung Hiếu 24/7",
  desc: "Cứu hộ tận nơi Khu phố Phú Thuận, An Lộc: hẻm, ngõ, xe máy và ô tô. Xuất phát ngay khu phố. Gọi 0343 387 868.",
  crumb: "Phú Thuận",
  h1: "Cứu hộ Khu phố Phú Thuận: ngõ hẹp vẫn gọi được",
  lead: "Phú Thuận không phải ‘khu vực lân cận’ — đây là khu phố đặt Tổ 5. Ca trong khu phố thường là ca gần nhất trong ngày.",
  jsonld: biz("Khu phố Phú Thuận"),
  related: `<li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li><li><a href="cuu-ho-dem-an-loc.html">Cứu hộ đêm</a></li>`,
  body: `
<p>Tìm <strong>cứu hộ Phú Thuận</strong> vì xe kẹt trong ngõ, không phải vì muốn đọc giới thiệu công ty. Hẻm nhỏ, xe tải cứu hộ không phải lúc nào cũng vào được sát cửa. Việc cần làm trước khi gọi: tấp xe sát tường, để lối đi, nhớ số nhà hoặc cổng để mô tả.</p>
<h2>Ngõ Phú Thuận khác đường lớn An Lộc</h2>
<p>Đường lớn còn chỗ xe kéo quay đầu. Trong khu phố, có đoạn chỉ xe máy kéo hoặc phải kéo bộ ra mặt đường. Trung Hiếu hỏi bề ngang ngõ, có trụ điện giữa lối không, có thể đẩy ra đầu hẻm không. Trả lời thật để khỏi điều xe không vào được.</p>
<p>Ban đêm trong ngõ tối: bật đèn xe nếu còn điện, nhờ người nhà ra đầu hẻm vẫy. Đừng đứng giữa ngõ hẹp khi xe máy khác vẫn lao vào.</p>
<h2>Ca hay gặp ở Phú Thuận</h2>
<p>Xe máy quên tắt đèn hết bình trong sân. Ô tô kẹt cổng, đề yếu buổi sáng. Trẻ em hoặc người lớn tuổi không tự thay lốp. Những ca này không cần ‘đội hình lớn’ — cần người tới đúng cổng, đúng giờ đã báo.</p>
<h2>Đừng tự buộc dây kéo trong hẻm</h2>
<p>Kéo tạm bằng dây dù trong ngõ dễ quệt tường, quệt gương nhà hàng xóm. Để đội cứu hộ chọn dây, bánh xe, hướng lùi. Nếu phải kéo ra mặt đường An Lộc rồi mới lên sàn, sẽ nói rõ hai đoạn này khi báo giá.</p>
${faq([
  ["Ở sát trụ sở thì có miễn phí không?", "Không hứa miễn phí trên web. Ca gần vẫn tính theo loại việc. Giá được nói trước khi đi."],
  ["Không nhớ số nhà?", "Gửi tin nhắn Zalo vị trí trực tiếp. Pin Maps trong ngõ vẫn tốt hơn mô tả ‘gần nhà ai đó’."]
])}
<p>Gọi <a href="tel:0343387868">0343 387 868</a>. Zalo cùng số.</p>`
});

pages.push({
  file: "cuu-ho-24-7-binh-long.html",
  title: "Cứu hộ Bình Long 24/7 | Kéo xe tận nơi | Trung Hiếu",
  desc: "Cứu hộ phường Bình Long: kéo xe, xe máy, ô tô, hết bình, nổ lốp. Báo giá theo km từ An Lộc. Gọi 0343 387 868.",
  crumb: "Bình Long",
  h1: "Cứu hộ Bình Long: gửi cổng khu, đừng chỉ nói tên phường",
  lead: "Bình Long rộng hơn một ngã tư. Gọi ‘cứu hộ Bình Long’ mà không gửi vị trí thì xe dễ vào nhầm cổng, mất thời gian lúc đang kẹt.",
  jsonld: biz("Phường Bình Long"),
  related: `<li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li><li><a href="cuu-ho-24-7-chon-thanh.html">Cứu hộ Chơn Thành</a></li>`,
  body: `
<p>Trung Hiếu nhận <strong>cứu hộ Bình Long</strong> trong vùng phường lân cận An Lộc. Xe xuất phát từ Phú Thuận nên có quãng đường, không phải ‘có mặt ngay lập tức như ca nội ô’. Phần bạn kiểm soát được: vị trí chính xác và tình trạng xe.</p>
<h2>Vì sao ca Bình Long hay chậm vì mô tả sai</h2>
<p>Nhiều người chỉ nói ‘đầu khu’, ‘gần chợ’, ‘cổng sau’. Tài xế cứu hộ không đứng cạnh bạn. Một link Google Maps hoặc tin nhắn vị trí Zalo rút được cả chục phút. Nếu đang trong khu công nghiệp, nói số cổng, hướng từ quốc lộ vào.</p>
<h2>Việc nhận tại Bình Long</h2>
<p>Kéo xe máy, kéo ô tô về An Lộc hoặc gara bạn chỉ. Thay lốp nếu mặt bằng an toàn. Câu bình, giao xăng khi còn cứu tại chỗ được. Xe nằm trên đoạn không có lề: ưu tiên kéo vào chỗ trống rồi mới thay, không bắt kỹ thuật viên ngồi giữa làn container.</p>
<h2>Giá ca Bình Long</h2>
<p>Có phần km từ An Lộc. Sẽ nói trước khi đi. Không có bảng ‘Bình Long = một giá’ vì điểm đón trong phường lệch nhau. Đêm, mưa nói phụ thu (nếu có) cùng lúc với giá kéo.</p>
${faq([
  ["Có trực Bình Long 24/7 không?", "Có nhận ca đêm trong vùng. Thời gian tới nơi phụ thuộc đường và vị trí cổng."],
  ["Kéo về Bình Long hay về An Lộc?", "Bạn chọn điểm trả. Nói gara hoặc nhà trước khi xe xuất phát."]
])}
<p>Hotline <a href="tel:0343387868">0343 387 868</a>.</p>`
});

pages.push({
  file: "cuu-ho-24-7-chon-thanh.html",
  title: "Cứu hộ Chơn Thành | Kéo xe, cứu hộ 24/7 | Trung Hiếu",
  desc: "Cứu hộ phường Chơn Thành: kéo xe máy, ô tô, thay lốp, câu bình. Báo thời gian và giá trước. Gọi 0343 387 868.",
  crumb: "Chơn Thành",
  h1: "Cứu hộ Chơn Thành: nói điểm kéo về trước khi xe lăn bánh",
  lead: "Ca Chơn Thành hay phát sinh vì khách muốn ‘kéo tạm rồi tính’. Trung Hiếu cần điểm trả rõ để báo km, tránh dừng giữa đường hỏi thêm.",
  jsonld: biz("Phường Chơn Thành"),
  related: `<li><a href="cuu-ho-24-7-binh-long.html">Cứu hộ Bình Long</a></li><li><a href="cuu-ho-24-7-minh-hung.html">Cứu hộ Minh Hưng</a></li>`,
  body: `
<p><strong>Cứu hộ Chơn Thành</strong> nằm trong danh sách phường Trung Hiếu phục vụ từ An Lộc. Không phải chi nhánh đặt tại Chơn Thành. Người gọi cần biết điều này để không kỳ vọng xe đang đỗ sẵn trong phường.</p>
<h2>Trước khi gọi</h2>
<p>Xe có đẩy được ra chỗ rộng không. Có giấy tờ, chìa khóa không. Muốn về nhà Chơn Thành, về An Lộc, hay gara quen. Ba câu này quyết định loại xe kéo và giá.</p>
<h2>Tình huống nên kéo, đừng tự sửa</h2>
<p>Đề nhiều lần không nổ. Nước vào ống xả. Gầm kẹt sau va chạm nhẹ. Tự buộc dây vào xe tải lạ trên đường Chơn Thành rủi ro hơn chờ cứu hộ có sàn, có cố định bánh.</p>
<h2>Liên lạc</h2>
<p>Gọi <a href="tel:0343387868">0343 387 868</a>. Nếu ồn, nhắn Zalo ảnh xe + pin vị trí. Ảnh giúp biết cần sàn thấp hay chỉ kéo xe máy.</p>
${faq([
  ["Có thay lốp tại Chơn Thành không?", "Có nếu chỗ đứng an toàn và đúng loại việc. Không thay được thì kéo, vẫn báo giá trước."],
  ["Thanh toán thế nào?", "Nói khi báo giá. Không thu thêm dọc đường ngoài điều đã chốt."]
])}
<p>Xem thêm <a href="../khu-vuc.html">khu vực phục vụ</a>.</p>`
});

pages.push({
  file: "cuu-ho-24-7-minh-hung.html",
  title: "Cứu hộ Minh Hưng | Xe công nghiệp, kéo xe 24/7 | Trung Hiếu",
  desc: "Cứu hộ phường Minh Hưng: cổng khu công nghiệp, xe máy ca, ô tô. Gửi số cổng trên Zalo. Gọi 0343 387 868.",
  crumb: "Minh Hưng",
  h1: "Cứu hộ Minh Hưng: ca hay kẹt ở cổng khu, không phải ở ‘trung tâm phường’",
  lead: "Minh Hưng có lối công nghiệp. Xe cứu hộ vào sai cổng là mất ca. Số cổng và hướng từ đường lớn quan trọng hơn tên phường.",
  jsonld: biz("Phường Minh Hưng"),
  related: `<li><a href="cuu-ho-24-7-dong-xoai.html">Cứu hộ Đồng Xoài</a></li><li><a href="cuu-ho-24-7-chon-thanh.html">Cứu hộ Chơn Thành</a></li>`,
  body: `
<p>Người search <strong>cứu hộ Minh Hưng</strong> hay đang hết ca, xe máy không nổ, hoặc ô tô chết máy gần cổng. Bảo vệ khu không phải cứu hộ. Gọi Trung Hiếu, đồng thời xin bảo vệ chỗ xe được phép đứng chờ.</p>
<h2>Thông tin cần có khi gọi từ khu công nghiệp</h2>
<ul>
<li>Số cổng hoặc tên công ty trên bảng.</li>
<li>Xe đang trong cổng hay ngoài đường.</li>
<li>Xe tải ra vào có thường xuyên không — quyết định có thay lốp tại chỗ được hay phải kéo.</li>
</ul>
<p>Ca Minh Hưng tính km từ An Lộc. Báo giá gồm đoạn đường đó. Không nhận ‘ghé giúp không tính’ trên web.</p>
<h2>Xe máy công nhân</h2>
<p>Hết bình, hết xăng, xích, lốp. Nhiều người muốn về nhà ngay trong đêm. Nói rõ nhà ở phường nào để chốt điểm kéo, tránh đổi điểm khi xe đã đi.</p>
${faq([
  ["Bảo vệ không cho xe kéo vào?", "Nói trước. Có thể kéo từ ngoài cổng. Bạn ra điểm tập kết bảo vệ chỉ."],
  ["Có giao xăng vào khu không?", "Có nếu vào được và bạn nói đúng loại nhiên liệu."]
])}
<p>0343 387 868 — Zalo gửi ảnh cổng.</p>`
});

pages.push({
  file: "cuu-ho-24-7-dong-xoai.html",
  title: "Cứu hộ Đồng Xoài | Kéo xe từ An Lộc | Trung Hiếu",
  desc: "Cứu hộ phường Đồng Xoài: kéo xe, cứu hộ 24/7. Báo thời gian và chi phí km trước khi đi. Gọi 0343 387 868.",
  crumb: "Đồng Xoài",
  h1: "Cứu hộ Đồng Xoài: chốt thời gian và km, rồi mới điều xe",
  lead: "Đồng Xoài không phải ca ‘quay đầu là tới’. Trung Hiếu nói thẳng thời gian dự kiến. Không giữ khách bằng câu mơ hồ.",
  jsonld: biz("Phường Đồng Xoài"),
  related: `<li><a href="cuu-ho-24-7-binh-phuoc.html">Cứu hộ phường Bình Phước</a></li><li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li>`,
  body: `
<p><strong>Cứu hộ Đồng Xoài</strong> vẫn trong vùng phường lân cận An Lộc mà site đã liệt kê. Người gọi nên hỏi ‘bao lâu tới’ và ‘bao nhiêu tiền’ ngay cuộc gọi đầu — đó là việc Trung Hiếu chủ động nói, không đợi xuống xe mới kể.</p>
<h2>Khi nào nên gọi, khi nào tự xử</h2>
<p>Tự vá lốp được ở chỗ có đèn, có lề, có kích: có thể tự làm. Giữa đường, đêm, mưa, xe tải sát: gọi. Ô tô mất phanh hay không vào số: gọi, đừng thử lăn dài.</p>
<h2>Điểm trả xe</h2>
<p>Kéo về Đồng Xoài hay về An Lộc khác giá. Chốt một điểm. Đổi điểm giữa đường làm lại km — sẽ nói lại giá, không âm thầm cộng.</p>
${faq([
  ["Có đội sẵn tại Đồng Xoài không?", "Không quảng cáo chi nhánh ảo. Xe đi từ An Lộc."],
  ["Thanh toán trước hay sau?", "Chốt lúc báo giá, trước khi xuất phát."]
])}
<p>Gọi <a href="tel:0343387868">0343 387 868</a>.</p>`
});

pages.push({
  file: "cuu-ho-24-7-binh-phuoc.html",
  title: "Cứu hộ phường Bình Phước | Trung Hiếu 24/7",
  desc: "Cứu hộ tại phường Bình Phước (vùng lân cận An Lộc): kéo xe, thay lốp, câu bình. Không nhầm với tỉnh cũ. Gọi 0343 387 868.",
  crumb: "Phường Bình Phước",
  h1: "Cứu hộ phường Bình Phước — đúng phường, không phải ‘cả tỉnh’",
  lead: "Tên phường trùng cách gọi cũ dễ gây hiểu nhầm. Trung Hiếu nhận ca tại phường Bình Phước trong danh sách lân cận An Lộc, không nhận mọi huyện đã sáp nhập.",
  jsonld: biz("Phường Bình Phước"),
  related: `<li><a href="cuu-ho-24-7-dong-xoai.html">Cứu hộ Đồng Xoài</a></li><li><a href="../khu-vuc.html">Khu vực phục vụ</a></li>`,
  body: `
<p>Người gõ <strong>cứu hộ Bình Phước</strong> có khi muốn cứu hộ cả vùng rộng. Trang này chỉ nói <em>phường Bình Phước</em> nằm trong vùng Trung Hiếu chạy từ An Lộc. Ngoài phường, gọi để hỏi — nếu ngoài tầm sẽ từ chối chứ không nhận rồi bỏ dở.</p>
<h2>Làm sao biết xe có tới được</h2>
<p>Gửi Maps. Đối chiếu với vùng An Lộc – Bình Long – Chơn Thành – Minh Hưng – Đồng Xoài – phường Bình Phước. Lệch xa: nói không. Đó là cách giữ uy tín, không phải từ chối cho có.</p>
<h2>Dịch vụ khi đã trong vùng</h2>
<p>Kéo xe máy, ô tô, thay lốp, câu bình, giao xăng, ca đêm. Giống các phường khác về quy trình: giá trước, không đội giá.</p>
${faq([
  ["Tôi ở huyện cũ khác?", "Nói tên phường/xã hiện tại + Maps. Không đoán theo tên gọi cũ."],
  ["Có số khác trên logo?", "Site dùng 0343 387 868. Gọi đúng số này."]
])}
<p><a href="https://maps.app.goo.gl/oDM8HWbHmq7ijzN36" target="_blank" rel="noopener">Maps trụ sở An Lộc</a>.</p>`
});

pages.push({
  file: "keo-xe-an-loc.html",
  title: "Kéo xe An Lộc | Xe máy & ô tô, kéo về nhà hoặc gara | Trung Hiếu",
  desc: "Kéo xe An Lộc 24/7: xe máy, ô tô, cố định đúng cách, báo giá trước. Tổ 5 Phú Thuận. Gọi 0343 387 868.",
  crumb: "Kéo xe",
  h1: "Kéo xe An Lộc: chốt điểm đón và điểm trả, rồi mới ra xe",
  lead: "Kéo xe không phải ‘tới là chất lên’. Sai sàn, sai dây, sai hướng lùi là cào gầm. An Lộc gần trụ sở — phần còn lại là làm đúng kỹ thuật.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="cuu-ho-o-to-an-loc.html">Cứu hộ ô tô An Lộc</a></li><li><a href="cuu-ho-xe-may-an-loc.html">Cứu hộ xe máy An Lộc</a></li>`,
  body: `
<p>Từ khóa <strong>kéo xe An Lộc</strong> thường đi với xe không tự đi: gãy, thủy kích, va chạm nhẹ, hết điện kéo dài. Trung Hiếu kéo về nhà trong phường hoặc gara bạn chỉ, không tự ý kéo về chỗ mình rồi tính sau.</p>
<h2>Xe máy kéo khác ô tô</h2>
<p>Xe máy: cố định bánh, không chồng đè vội. Ô tô: hỏi còn vào số được không, phanh tay, kích thước gầm. SUV, bán tải không dùng cách kéo xe máy. Nói đời xe, số chỗ khi gọi.</p>
<h2>An Lộc: hẻm hay mặt đường</h2>
<p>Mặt đường: lên sàn tại chỗ nếu đủ chỗ. Hẻm Phú Thuận: có thể phải ra đầu ngõ. Sẽ nói hai đoạn nếu phát sinh, không lặng lẽ cộng tiền.</p>
<h2>Bạn làm gì trong lúc chờ</h2>
<p>Lấy đồ cá nhân, giấy tờ. Không leo lên thùng xe lạ. Không nhờ người đi đường kéo dây dù. Trông xe, bật đèn cảnh báo.</p>
${faq([
  ["Kéo bao nhiêu km được tính?", "Theo điểm đón — điểm trả thực tế, nói trước."],
  ["Xe số tự động kéo khác không?", "Có thể khác cách nâng. Nói loại hộp số nếu biết."]
])}
<p>Gọi 0343 387 868.</p>`
});

pages.push({
  file: "cuu-ho-xe-may-an-loc.html",
  title: "Cứu hộ xe máy An Lộc 24/7 | Chết máy, nổ lốp, hết xăng | Trung Hiếu",
  desc: "Cứu hộ xe máy An Lộc: hết bình, nổ lốp, hết xăng, kéo về nhà. Gọi 0343 387 868, báo giá trước.",
  crumb: "Xe máy",
  h1: "Cứu hộ xe máy An Lộc — ca nhỏ nhưng không đứng giữa đường",
  lead: "Xe máy nằm An Lộc trông ‘nhẹ’. Nguy hiểm là người đứng trên làn. Việc đầu tiên không phải sửa máy — là tấp lề.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="giao-xang-an-loc.html">Giao xăng An Lộc</a></li><li><a href="cau-binh-ac-quy-an-loc.html">Câu bình An Lộc</a></li>`,
  body: `
<p><strong>Cứu hộ xe máy An Lộc</strong> chiếm phần lớn cuộc gọi đêm. Đề không nổ, lốp đinh, hết xăng sau giờ cây xăng đóng. Trung Hiếu nhận tại chỗ hoặc kéo; không phải gara sửa đồng hồ công tơ mét.</p>
<h2>Thứ tự an toàn</h2>
<p>Bật đèn. Tấp phải. Người ngồi xuống lề, không ngồi trên yên chat điện thoại giữa đường. Rồi mới gọi. Kể ‘xe ga hay số’, ‘vừa ngập hay vừa hết xăng’ — hai câu này đổi hẳn cách xử lý.</p>
<h2>Khi nào câu bình, khi nào kéo</h2>
<p>Đèn còn sáng, đề kêu ụt: hay là bình. Im thin thít sau ngập: đừng đề, kéo. Trung Hiếu không câu bừa cho có tiếng nổ rồi hỏng máy.</p>
<h2>Giá xe máy</h2>
<p>Thấp hơn ô tô, vẫn nói trước. Không có ‘giá mạng’ trên Facebook ẩn phí. Số trên site: 0343 387 868.</p>
${faq([
  ["Có vá lốp không?", "Thay/vá tùy tình trạng và mặt bằng. Không được thì kéo."],
  ["Xe không giấy tờ?", "Nói thật khi gọi. Không khuyến khích xe không rõ nguồn gốc."]
])}
<p>Bài liên quan: <a href="cuu-ho-an-loc.html">cứu hộ An Lộc</a>.</p>`
});

pages.push({
  file: "cuu-ho-o-to-an-loc.html",
  title: "Cứu hộ ô tô An Lộc | Kéo xe, lốp, ắc quy 24/7 | Trung Hiếu",
  desc: "Cứu hộ ô tô An Lộc: kéo an toàn, thay lốp, câu bình. Báo giá trước. Gọi 0343 387 868.",
  crumb: "Ô tô",
  h1: "Cứu hộ ô tô An Lộc: ưu tiên không cào gầm, không kéo ẩu",
  lead: "Ô tô nặng, góc nâng sai một phát là hỏng két, hỏng che gầm. Ca An Lộc gần — không vì gần mà làm tắt.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="keo-xe-an-loc.html">Kéo xe An Lộc</a></li><li><a href="thay-lop-tan-noi-an-loc.html">Thay lốp An Lộc</a></li>`,
  body: `
<p>Search <strong>cứu hộ ô tô An Lộc</strong> thường là lốp, bình, hoặc xe không nổ sau mưa. Người ngồi trong xe: thắt dây, đèn cảnh báo, không mở cửa về phía làn xe chạy.</p>
<h2>Thông tin ô tô cần nói</h2>
<p>Sedan hay SUV, số sàn hay tự động, đang chắn hết làn hay đã vào lề. Có lốp bước không. Muốn về nhà An Lộc hay gara.</p>
<h2>Không tự kích trên dốc</h2>
<p>Thiếu kích, thiếu điểm tựa, xe lăn. Đợi cứu hộ. An Lộc vẫn có đoạn dốc, cống, lề yếu.</p>
<h2>Sau khi xe tới</h2>
<p>Bạn xem cách cố định, hỏi lại giá đã chốt. Không ký thêm phí không được nói trước. Phụ thu đêm/mưa chỉ khi đã thông báo lúc gọi.</p>
${faq([
  ["Có nhận xe 7 chỗ, bán tải không?", "Nói loại xe khi gọi. Xe quá khổ sẽ nói không nếu thiết bị không phù hợp."],
  ["Có cứu hộ pin điện?", "Nói hãng và tình trạng. Không cam kết mọi dòng xe điện trên web."]
])}
<p>0343 387 868.</p>`
});

pages.push({
  file: "thay-lop-tan-noi-an-loc.html",
  title: "Thay lốp tận nơi An Lộc | Xe máy & ô tô | Trung Hiếu",
  desc: "Thay lốp tận nơi An Lộc khi nổ lốp, xẹp hơi. Ưu tiên chỗ an toàn. Không thay được thì kéo. Gọi 0343 387 868.",
  crumb: "Thay lốp",
  h1: "Thay lốp tận nơi An Lộc: chỗ đứng an toàn còn hơn thay cho xong",
  lead: "Lốp xẹp không chết người. Đứng trên làn xe tải mới nguy. Trung Hiếu có thể từ chối thay giữa đường, chuyển sang kéo vào lề.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="cuu-ho-xe-may-an-loc.html">Cứu hộ xe máy</a></li><li><a href="cuu-ho-o-to-an-loc.html">Cứu hộ ô tô</a></li>`,
  body: `
<p><strong>Thay lốp tận nơi An Lộc</strong> là việc Trung Hiếu làm khi có mặt bằng. Không có lề, trời tối, mưa to: kéo trước, thay sau. Đó là quy trình, không phải thoái thác.</p>
<h2>Bạn chuẩn bị</h2>
<p>Lốp trước hay sau. Xe máy hay ô tô. Có lốp dự phòng trên cốp không. Ô tô thiếu lốp bước thì nói ngay — có thể phải kéo.</p>
<h2>Tam giác phản quang</h2>
<p>Nếu có, đặt phía sau xe theo chiều xe chạy. Không có thì càng không đứng sau xe. Gọi xong, lên lề.</p>
<h2>Giá</h2>
<p>Công thay khác công kéo. Chốt trước. Không bán thêm dịch vụ không liên quan trên lề đường.</p>
${faq([
  ["Có bán lốp mới không?", "Tùy tình trạng. Không ép mua. Có thể vá/thay hoặc kéo tới chỗ có lốp."],
  ["Lốp không săm?", "Nói loại lốp khi gọi."]
])}
<p>Gọi <a href="tel:0343387868">0343 387 868</a>.</p>`
});

pages.push({
  file: "cau-binh-ac-quy-an-loc.html",
  title: "Câu bình ắc quy An Lộc | Đề không nổ, đèn mờ | Trung Hiếu",
  desc: "Câu bình ắc quy tại An Lộc 24/7. Đúng cực, không đề dai. Bình hỏng thì kéo về gara. Gọi 0343 387 868.",
  crumb: "Câu bình",
  h1: "Câu bình An Lộc: hết điện thì câu, hỏng bình thì nói thật",
  lead: "Nhiều ca ‘câu bình’ thực ra bình đã chết. Câu cho có tiếng nổ rồi tắt lại là phí thời gian. Trung Hiếu câu khi còn cứu được.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="cuu-ho-xe-may-an-loc.html">Cứu hộ xe máy An Lộc</a></li><li><a href="keo-xe-an-loc.html">Kéo xe An Lộc</a></li>`,
  body: `
<p><strong>Câu bình ắc quy An Lộc</strong> gặp nhiều buổi sáng sớm và sau mưa. Đèn pha tối, còi yếu, đề ụt ụt. Tắt hết thiết bị trên xe trước khi đội tới.</p>
<h2>Đừng làm trước khi cứu hộ tới</h2>
<p>Không đề 20 lần. Không tự kẹp dây nhầm cực. Không đổ nước lã vào bình khô. Gọi 0343 387 868, mô tả tiếng đề.</p>
<h2>Sau khi nổ máy</h2>
<p>Nếu nổ được, chạy đủ để máy tự sạc theo hướng dẫn lúc đó — không phải đề rồi tắt ngay. Bình già sẽ được nói để bạn biết rủi ro tắt lại.</p>
<h2>Khi phải kéo</h2>
<p>Củ đề kêu khác, mùi cháy, ngập nước: chuyển kéo. Giá kéo nói riêng, không gộp mập mờ với công câu.</p>
${faq([
  ["Xe máy câu được không?", "Được nhiều trường hợp. Nói loại xe."],
  ["Có bán bình tại chỗ không?", "Không cam kết luôn có bình đúng loại trên xe cứu hộ. Có thể kéo tới chỗ thay."]
])}
<p>Zalo 0343387868 nếu không nghe máy vì đang trên đường.</p>`
});

pages.push({
  file: "giao-xang-an-loc.html",
  title: "Giao xăng tận nơi An Lộc | Hết xăng đêm | Trung Hiếu",
  desc: "Giao xăng tận nơi An Lộc, Phú Thuận. Nói xăng hoặc dầu. Gọi 0343 387 868, báo giá trước.",
  crumb: "Giao xăng",
  h1: "Giao xăng An Lộc: nói đúng xăng hay dầu trước khi ai đó đổ nhầm",
  lead: "Hết xăng trông đơn giản. Đổ nhầm dầu vào xe xăng thì thành ca kéo. Trung Hiếu hỏi loại nhiên liệu trước, không đoán.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="cuu-ho-xe-may-an-loc.html">Cứu hộ xe máy</a></li><li><a href="cuu-ho-dem-an-loc.html">Cứu hộ đêm</a></li>`,
  body: `
<p><strong>Giao xăng tận nơi An Lộc</strong> cho xe máy và ô tô trong phường và ngõ Phú Thuận. Ngoài phường: hỏi km. Không nhận giao xuyên vùng ngoài danh sách.</p>
<h2>Thông tin bắt buộc</h2>
<p>Xăng hay dầu. Xe máy hay ô tô. Đang ở mặt đường hay trong hẻm. Đổ xong không nổ thì sao — có thể không chỉ hết xăng.</p>
<h2>An toàn</h2>
<p>Không hút thuốc gần bình. Không đổ trong nhà kín. Đội tới chỗ thoáng. Đêm: đèn pin, không đổ giữa quốc lộ.</p>
<h2>Giá</h2>
<p>Gồm nhiên liệu + công tới nơi, nói trước. Không ‘giá xăng cây’ rồi cộng ẩn.</p>
${faq([
  ["Có giao dầu diesel không?", "Nói rõ dầu. Không đoán."],
  ["Cây xăng gần nhà tôi đang mở?", "Nếu bạn tự đổ được thì tự đổ. Gọi khi không đi nổi tới cây."]
])}
<p>0343 387 868.</p>`
});

pages.push({
  file: "cuu-ho-24-7-an-loc.html",
  title: "Cứu hộ 24/7 An Lộc | Đêm, lễ, Tết | Trung Hiếu 0343 387 868",
  desc: "Cứu hộ 24/7 tại An Lộc và phường lân cận. Không hẹn sáng mai khi xe nằm đường. Gọi 0343 387 868.",
  crumb: "24/7",
  h1: "Cứu hộ 24/7 An Lộc nghĩa là ca 2 giờ sáng vẫn nhận cuộc gọi",
  lead: "‘24/7’ trên nhiều site chỉ là khẩu hiệu. Ở đây: số 0343 387 868 trực đêm. Thời gian tới nơi vẫn nói thật, không hứa bay tới.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="cuu-ho-dem-an-loc.html">Cứu hộ đêm An Lộc</a></li><li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li>`,
  body: `
<p>Người gõ <strong>cứu hộ 24/7 An Lộc</strong> hay gọi sau 22h. Xe về quê, ca đêm, lễ. Trung Hiếu không bảo ‘mai tính’. Có thể đang trong ca khác — lúc đó nói giờ dự kiến, không im lặng.</p>
<h2>Lễ Tết</h2>
<p>Vẫn nhận trong vùng. Phụ thu lễ nếu có, nói lúc báo giá. Không đăng giá Tết trên web cho vui rồi thu khác.</p>
<h2>An toàn đêm</h2>
<p>Áo sáng màu. Đứng lề. Gửi live location. Tắt nhạc, nghe máy.</p>
<h2>Phường khác ban đêm</h2>
<p>Bình Long, Chơn Thành, Minh Hưng, Đồng Xoài, phường Bình Phước: vẫn 24/7 trong vùng, thời gian dài hơn ca Phú Thuận.</p>
${faq([
  ["Có nhắn tin được không?", "Zalo 0343387868. Xe nằm giữa đường thì gọi thoại nhanh hơn."],
  ["Có lịch trực công khai không?", "Trực cả ngày. Không chia ca công khai trên site."]
])}
<p>Gọi ngay <a href="tel:0343387868">0343 387 868</a>.</p>`
});

pages.push({
  file: "cuu-ho-dem-an-loc.html",
  title: "Cứu hộ đêm An Lộc | Xe nằm đường sau 22h | Trung Hiếu",
  desc: "Cứu hộ đêm tại An Lộc, Phú Thuận: kéo xe, hết bình, hết xăng. Đèn cảnh báo, đứng lề. Gọi 0343 387 868.",
  crumb: "Cứu hộ đêm",
  h1: "Cứu hộ đêm An Lộc: ánh sáng và vị trí quan trọng hơn ‘sửa cho nhanh’",
  lead: "Đêm thiếu đèn, dễ nhầm hẻm Phú Thuận. Một tin Zalo kèm ảnh biển số nhà đỡ được một vòng xe sai ngõ.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="cuu-ho-24-7-an-loc.html">Cứu hộ 24/7</a></li><li><a href="giao-xang-an-loc.html">Giao xăng đêm</a></li>`,
  body: `
<p><strong>Cứu hộ đêm An Lộc</strong> không khác ban ngày về dịch vụ (kéo, lốp, bình, xăng) nhưng khác về rủi ro. Xe máy không đèn, ô tô đỗ khuất. Bạn làm phần chiếu sáng và mô tả ngõ.</p>
<h2>Checklist 30 giây</h2>
<ul>
<li>Hazard hoặc đèn xe.</li>
<li>Người xuống lề.</li>
<li>Gọi 0343 387 868.</li>
<li>Zalo: ảnh cổng + vị trí.</li>
</ul>
<h2>Phụ thu đêm</h2>
<p>Nếu có, nằm trong câu báo giá đầu. Không thêm khi đã xong việc.</p>
<h2>Rượu bia</h2>
<p>Không lái thử sau khi câu bình. Xe nổ xong, người tỉnh táo mới chạy. Cứu hộ không phải taxi hộ.</p>
${faq([
  ["Có nữ kỹ thuật viên đêm không?", "Không cam kết. Quan trọng là xe tới và làm đúng."],
  ["Không nghe máy?", "Gọi lại hoặc Zalo. Có thể đang trên ca."]
])}
<p>Bài gốc khu vực: <a href="cuu-ho-an-loc.html">cứu hộ An Lộc</a>.</p>`
});

pages.push({
  file: "cuu-ho-xe-ngap-nuoc-an-loc.html",
  title: "Cứu hộ xe ngập nước An Lộc | Tắt máy, kéo xe | Trung Hiếu",
  desc: "Xe ngập An Lộc: tắt máy, không đề lại, gọi kéo. Tránh thủy kích. Gọi 0343 387 868.",
  crumb: "Ngập nước",
  h1: "Cứu hộ xe ngập An Lộc: tắt máy ngay, đừng đề ‘thử xem còn sống không’",
  lead: "Một lần đề trong nước có thể phá máy. Việc cứu hộ đúng lúc ngập là kéo ra, không phải nổ máy cho có.",
  jsonld: biz("An Lộc"),
  related: `<li><a href="keo-xe-an-loc.html">Kéo xe An Lộc</a></li><li><a href="cuu-ho-o-to-an-loc.html">Cứu hộ ô tô</a></li>`,
  body: `
<p>Mưa lớn, đoạn trũng An Lộc và hẻm Phú Thuận có thể ngập nhanh. <strong>Cứu hộ xe ngập nước</strong> bắt đầu bằng an toàn người: ra chỗ cao, không lội nếu nước chảy. Rồi gọi kéo.</p>
<h2>Xe máy</h2>
<p>Tắt máy. Không vẫy đề. Kéo hoặc bế lên vỉa nếu an toàn. Nói ngập tới yên hay tới lọc gió.</p>
<h2>Ô tô</h2>
<p>Nước vào ống xả hoặc sàn: không đề. Đèn cảnh báo nếu còn điện. Gọi 0343 387 868, nói mực nước (bánh, sàn, ghế).</p>
<h2>Sau khi kéo</h2>
<p>Trung Hiếu kéo về điểm bạn chỉ. Không mở gara sửa máy trên web. Gara bạn chọn sẽ xử lý ngâm nước.</p>
${faq([
  ["Bảo hiểm?", "Giữ hóa đơn, ảnh mực nước. Cứu hộ không thay mặt bồi thường hộ."],
  ["Tự đẩy được không?", "Chỉ khi nước cạn, không chảy, không điện. Không chắc thì đừng."]
])}
<p>Maps: <a href="https://maps.app.goo.gl/oDM8HWbHmq7ijzN36" target="_blank" rel="noopener">trụ sở</a>.</p>`
});

const dir = path.join(__dirname, "bai-viet");
fs.mkdirSync(dir, { recursive: true });
for (const p of pages) {
  fs.writeFileSync(path.join(dir, p.file), chrome(p), "utf8");
}

const index = chrome({
  file: "index.html",
  title: "Cứu hộ An Lộc theo khu vực | Trung Hiếu 24/7",
  desc: "Bài cứu hộ theo từng phường và từng việc: An Lộc, Phú Thuận, Bình Long, Chơn Thành, Minh Hưng, Đồng Xoài, phường Bình Phước. Gọi 0343 387 868.",
  crumb: "Mục lục",
  h1: "Cứu hộ An Lộc theo khu vực — từng phường, từng việc",
  lead: "Mỗi link là một bài riêng: góc khác, câu hỏi khác, cùng số 0343 387 868.",
  jsonld: biz("An Lộc"),
  related: pages.map((p) => `<li><a href="${p.file}">${esc(p.h1)}</a></li>`).join(""),
  body: `<p>Google không cần 100 trang gần giống nhau. Cần trang trả lời đúng ý định tìm kiếm: đang ở phường nào, đang kẹt việc gì. Các bài này viết cho An Lộc và phường lân cận — không bịa đường ngoài vùng.</p>
<h2>Theo phường</h2>
<ul class="kw-list">
<li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li>
<li><a href="cuu-ho-phu-thuan.html">Cứu hộ Khu phố Phú Thuận</a></li>
<li><a href="cuu-ho-24-7-binh-long.html">Cứu hộ Bình Long</a></li>
<li><a href="cuu-ho-24-7-chon-thanh.html">Cứu hộ Chơn Thành</a></li>
<li><a href="cuu-ho-24-7-minh-hung.html">Cứu hộ Minh Hưng</a></li>
<li><a href="cuu-ho-24-7-dong-xoai.html">Cứu hộ Đồng Xoài</a></li>
<li><a href="cuu-ho-24-7-binh-phuoc.html">Cứu hộ phường Bình Phước</a></li>
</ul>
<h2>Theo việc tại An Lộc</h2>
<ul class="kw-list">
<li><a href="keo-xe-an-loc.html">Kéo xe</a></li>
<li><a href="cuu-ho-xe-may-an-loc.html">Cứu hộ xe máy</a></li>
<li><a href="cuu-ho-o-to-an-loc.html">Cứu hộ ô tô</a></li>
<li><a href="thay-lop-tan-noi-an-loc.html">Thay lốp tận nơi</a></li>
<li><a href="cau-binh-ac-quy-an-loc.html">Câu bình ắc quy</a></li>
<li><a href="giao-xang-an-loc.html">Giao xăng</a></li>
<li><a href="cuu-ho-24-7-an-loc.html">Cứu hộ 24/7</a></li>
<li><a href="cuu-ho-dem-an-loc.html">Cứu hộ đêm</a></li>
<li><a href="cuu-ho-xe-ngap-nuoc-an-loc.html">Xe ngập nước</a></li>
</ul>
<p>Gọi <a href="tel:0343387868">0343 387 868</a> khi xe đang nằm đường.</p>`
});
fs.writeFileSync(path.join(dir, "index.html"), index, "utf8");

const today = "2026-09-17";
function smUrl(p, pri) {
  return `  <url><loc>${BASE}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${pri}</priority></url>`;
}
const smPaths = [
  ["/", "1.0"],
  ["/dich-vu", "0.9"],
  ["/bang-gia", "0.8"],
  ["/khu-vuc", "0.9"],
  ["/hinh-anh", "0.6"],
  ["/tin-tuc", "0.6"],
  ["/lien-he", "0.8"],
  ["/bai-viet", "0.85"],
  ...pages.map((p) => ["/bai-viet/" + p.file.replace(/\.html$/i, ""), "0.8"])
];
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${smPaths.map(([p, pri]) => smUrl(p, pri)).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sm, "utf8");
console.log("hand pages", pages.length);
