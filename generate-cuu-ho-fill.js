const fs = require("fs");
const path = require("path");
const { chrome, faq, writePages, MAPS, TEL } = require("./generate-100-car.js");

const pages = [
  {
    file: "cuu-ho-binh-long.html",
    area: "Bình Long",
    title: "Cứu hộ Bình Long | Kéo xe, ô tô, xe hơi 24/7 | Trung Hiếu",
    h1: "Cứu hộ Bình Long: URL đúng từ khóa, xe vẫn đi từ An Lộc",
    crumb: "Cứu hộ Bình Long",
    desc: "Cứu hộ Bình Long 24/7: kéo xe máy, ô tô, xe hơi, lốp, bình. Xuất phát Tổ 5 Phú Thuận, An Lộc. Gọi 0343 387 868, báo giá trước.",
    lead: "Người gõ cứu hộ Bình Long cần số và km, không cần bài 24/7 trùng. Trung Hiếu nhận phường Bình Long; chốt cổng khu rồi mới điều xe.",
    related: `<li><a href="cuu-ho-24-7-binh-long.html">Cứu hộ 24/7 Bình Long</a></li><li><a href="cuu-ho-o-to-binh-long.html">Cứu hộ ô tô Bình Long</a></li><li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li>`,
    body: `<p>Trang <strong>cứu hộ Bình Long</strong> bổ sung URL đúng cụm người search nhiều nhất. Nội dung 24/7 nằm ở bài <a href="cuu-ho-24-7-binh-long.html">cứu hộ 24/7 Bình Long</a>. Cùng một đội, cùng số ${TEL}.</p>
<h2>Cứu hộ Bình Long làm gì</h2>
<p>Kéo xe máy và ô tô / xe hơi về nhà hoặc gara bạn chỉ. Thay lốp nếu chỗ đứng an toàn. Câu bình, giao xăng. Ca cổng khu: gửi số cổng trên Zalo, đừng chỉ nói “Bình Long”.</p>
<h2>Giá và thời gian</h2>
<p>Xe đóng Tổ 5, Khu phố Phú Thuận, An Lộc. Có km. Nói số tiền và giờ dự kiến trước khi xuất phát. Không đội giá dọc đường.</p>
<h2>Ô tô và xe hơi</h2>
<p>Cùng kỹ thuật. Nói sedan, SUV, 7 chỗ hay bán tải. Xem <a href="cuu-ho-xe-hoi-binh-long.html">cứu hộ xe hơi Bình Long</a>.</p>
${faq([
  ["Có chi nhánh tại Bình Long không?", "Không. Xe đi từ An Lộc."],
  ["Đêm có nhận không?", `Có trong vùng. Gọi ${TEL}.`]
])}
<p><a href="${MAPS}" target="_blank" rel="noopener">Maps trụ sở</a>.</p>`
  },
  {
    file: "cuu-ho-chon-thanh.html",
    area: "Chơn Thành",
    title: "Cứu hộ Chơn Thành | Kéo xe, ô tô 24/7 | Trung Hiếu",
    h1: "Cứu hộ Chơn Thành: chốt điểm trả rồi mới ra xe kéo",
    crumb: "Cứu hộ Chơn Thành",
    desc: "Cứu hộ Chơn Thành 24/7 từ An Lộc: kéo xe, ô tô, xe hơi, lốp, bình. Gọi 0343 387 868, báo km trước khi đi.",
    lead: "Cứu hộ Chơn Thành không có đội đỗ sẵn trong phường. Gọi được thì nói muốn kéo về Chơn Thành, An Lộc hay gara nào.",
    related: `<li><a href="cuu-ho-24-7-chon-thanh.html">Cứu hộ 24/7 Chơn Thành</a></li><li><a href="keo-o-to-chon-thanh.html">Kéo ô tô Chơn Thành</a></li><li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li>`,
    body: `<p><strong>Cứu hộ Chơn Thành</strong> là cụm search ngắn. Bài 24/7 đã có; trang này là cửa vào đúng đường dẫn cứu hộ Chơn Thành. Vẫn Nguyễn Trung Hiếu, Tổ 5 Phú Thuận.</p>
<h2>Khi gọi từ Chơn Thành</h2>
<p>Nói xe máy hay ô tô, còn đứng được làn không, điểm trả. Đổi gara giữa đường thì nói lại giá. Tự buộc dây vào xe lạ trên đường — đừng.</p>
<h2>Ca nên kéo</h2>
<p>Đề dai không nổ, thủy kích, va chạm nhẹ xe không đi, hộp số. Chi tiết ô tô: <a href="cuu-ho-o-to-chon-thanh.html">cứu hộ ô tô Chơn Thành</a>.</p>
<h2>Km từ An Lộc</h2>
<p>Dài hơn ca nội phường. Trung Hiếu nói giờ dự kiến thật, không hứa “tới ngay” trên web.</p>
${faq([
  ["Có thay lốp Chơn Thành không?", "Có nếu chỗ an toàn. Không thì kéo."],
  ["Thanh toán?", "Chốt lúc báo giá. Không ép app lạ."]
])}
<p>Gọi <a href="tel:0343387868">${TEL}</a>.</p>`
  },
  {
    file: "cuu-ho-minh-hung.html",
    area: "Minh Hưng",
    title: "Cứu hộ Minh Hưng | Cổng khu, xe máy, ô tô | Trung Hiếu",
    h1: "Cứu hộ Minh Hưng: gửi số cổng, đừng chỉ gửi tên phường",
    crumb: "Cứu hộ Minh Hưng",
    desc: "Cứu hộ Minh Hưng 24/7: cổng khu công nghiệp, kéo xe máy và ô tô từ An Lộc. Gọi 0343 387 868, báo giá trước.",
    lead: "Cứu hộ Minh Hưng hay kẹt vì sai cổng. Trung Hiếu cần số cổng hoặc tên xưởng, rồi mới tính km từ An Lộc.",
    related: `<li><a href="cuu-ho-24-7-minh-hung.html">Cứu hộ 24/7 Minh Hưng</a></li><li><a href="cuu-ho-xe-may-minh-hung.html">Cứu hộ xe máy Minh Hưng</a></li><li><a href="cuu-ho-o-to-minh-hung.html">Cứu hộ ô tô Minh Hưng</a></li>`,
    body: `<p>Search <strong>cứu hộ Minh Hưng</strong> thường là hết ca, xe máy không nổ hoặc ô tô chết máy ngoài cổng. Trang 24/7 nói góc thời gian; trang này là URL đúng từ khóa ngắn.</p>
<h2>Bảo vệ khu không phải cứu hộ</h2>
<p>Xin chỗ đứng chờ. Gửi ảnh bảng cổng trên Zalo. Xe kéo không vào được thì hẹn điểm ngoài cổng.</p>
<h2>Việc nhận</h2>
<p>Kéo, lốp, bình, xăng. Ca công nhân đêm: nói nhà thuộc phường nào để chốt điểm trả, không đổi khi xe đã đi.</p>
<h2>Giá</h2>
<p>Có km An Lộc → Minh Hưng. Không nhận “ghé giúp không tính” trên web.</p>
${faq([
  ["Giao xăng vào khu được không?", "Nếu vào được và bạn nói đúng xăng hay dầu."],
  ["Ô tô 7 chỗ?", "Nói loại xe. Thiết bị không khớp thì từ chối trước."]
])}
<p>Gọi <a href="tel:0343387868">${TEL}</a>.</p>`
  },
  {
    file: "cuu-ho-dong-xoai.html",
    area: "Đồng Xoài",
    title: "Cứu hộ Đồng Xoài | Kéo xe từ An Lộc, báo giờ | Trung Hiếu",
    h1: "Cứu hộ Đồng Xoài: hỏi giờ và giá ngay cuộc gọi đầu",
    crumb: "Cứu hộ Đồng Xoài",
    desc: "Cứu hộ Đồng Xoài 24/7: không có đội sẵn tại chỗ, xe đi từ An Lộc. Kéo xe, ô tô, lốp, bình. Gọi 0343 387 868.",
    lead: "Cứu hộ Đồng Xoài vẫn trong vùng phường lân cận. Trung Hiếu không giữ khách bằng câu mơ hồ — chốt giờ và km rồi mới đi.",
    related: `<li><a href="cuu-ho-24-7-dong-xoai.html">Cứu hộ 24/7 Đồng Xoài</a></li><li><a href="keo-xe-hoi-dong-xoai.html">Kéo xe hơi Đồng Xoài</a></li><li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li>`,
    body: `<p><strong>Cứu hộ Đồng Xoài</strong> không đồng nghĩa chi nhánh đặt tại Đồng Xoài. Xe xuất phát Tổ 5 Phú Thuận. Bài 24/7 đã nói góc chờ; slug này bù đúng cụm search không có chữ 24/7.</p>
<h2>Tự xử hay gọi</h2>
<p>Có lề, có đèn, vá lốp được: có thể tự làm. Đêm, mưa, ô tô không vào số: gọi. Đừng lăn dài khi mất phanh.</p>
<h2>Điểm trả</h2>
<p>Về Đồng Xoài hay về An Lộc khác giá. Một điểm. Đổi giữa đường thì nói lại số tiền.</p>
<h2>Ô tô / xe hơi</h2>
<p>Cùng đội. <a href="cuu-ho-xe-hoi-dong-xoai.html">Cứu hộ xe hơi Đồng Xoài</a>, <a href="cuu-ho-o-to-dong-xoai.html">cứu hộ ô tô Đồng Xoài</a>.</p>
${faq([
  ["Có đội sẵn Đồng Xoài không?", "Không quảng cáo chi nhánh ảo."],
  ["Ngoài vùng?", "Gửi Maps. Ngoài danh sách phường thì nói không."]
])}
<p>Gọi <a href="tel:0343387868">${TEL}</a>. <a href="${MAPS}" target="_blank" rel="noopener">Maps</a>.</p>`
  },
  {
    file: "cuu-ho-24-7-phu-thuan.html",
    area: "Khu phố Phú Thuận",
    title: "Cứu hộ 24/7 Phú Thuận | Ngõ hẹp, An Lộc | Trung Hiếu",
    h1: "Cứu hộ 24/7 Phú Thuận: ca gần trụ sở, vẫn báo giá trước",
    crumb: "Cứu hộ 24/7 Phú Thuận",
    desc: "Cứu hộ 24/7 Khu phố Phú Thuận, An Lộc: ngõ hẹp, xe máy và ô tô. Tổ 5 ngay khu phố. Gọi 0343 387 868.",
    lead: "Thiếu URL cứu hộ 24/7 Phú Thuận trong cụm 24/7 các phường. Phú Thuận là khu phố đặt Tổ 5, không phải vùng xa.",
    related: `<li><a href="cuu-ho-phu-thuan.html">Cứu hộ Phú Thuận</a></li><li><a href="cuu-ho-dem-phu-thuan.html">Cứu hộ đêm Phú Thuận</a></li><li><a href="cuu-ho-an-loc.html">Cứu hộ An Lộc</a></li>`,
    body: `<p><strong>Cứu hộ 24/7 Phú Thuận</strong> bù lưới từ khóa 24/7: An Lộc, Bình Long, Chơn Thành, Minh Hưng, Đồng Xoài, phường Bình Phước đã có trang 24/7; khu phố trụ sở thì chưa.</p>
<h2>Đêm trong ngõ</h2>
<p>Hẻm hẹp, xe kéo lớn có thể đón đầu ngõ. Nói bề ngang, trụ điện, có đẩy ra mặt đường không. Bật đèn nếu còn điện, người ra đầu hẻm vẫy.</p>
<h2>Gần trụ sở không miễn phí</h2>
<p>Ca gần vẫn tính theo loại việc. Giá nói trước khi đi. Trang khu phố đầy đủ: <a href="cuu-ho-phu-thuan.html">cứu hộ Phú Thuận</a>.</p>
<h2>Ô tô trong ngõ</h2>
<p>Không quay đầu được thì kéo hai đoạn: ra mặt đường An Lộc rồi lên sàn. Sẽ nói khi báo giá.</p>
${faq([
  ["Mùng 1 có đi trong khu phố không?", `Gọi ${TEL}. Trong vùng thì nhận.`],
  ["Không nhớ số nhà?", "Gửi vị trí Zalo."]
])}
<p>Gọi <a href="tel:0343387868">${TEL}</a>.</p>`
  }
];

writePages(pages);

const hubPath = path.join(__dirname, "tin-tuc.html");
let hub = fs.readFileSync(hubPath, "utf8");
const inserts = [
  ['tin-tuc/cuu-ho-24-7-binh-long.html">Cứu hộ Bình Long', 'tin-tuc/cuu-ho-binh-long.html">Cứu hộ Bình Long'],
  ['tin-tuc/cuu-ho-24-7-chon-thanh.html">Cứu hộ Chơn Thành', 'tin-tuc/cuu-ho-chon-thanh.html">Cứu hộ Chơn Thành'],
  ['tin-tuc/cuu-ho-24-7-minh-hung.html">Cứu hộ Minh Hưng', 'tin-tuc/cuu-ho-minh-hung.html">Cứu hộ Minh Hưng'],
  ['tin-tuc/cuu-ho-24-7-dong-xoai.html">Cứu hộ Đồng Xoài', 'tin-tuc/cuu-ho-dong-xoai.html">Cứu hộ Đồng Xoài']
];
for (const [from, to] of inserts) {
  if (hub.includes(to)) continue;
  hub = hub.replace(from, to);
}
if (!hub.includes("cuu-ho-24-7-phu-thuan.html")) {
  hub = hub.replace(
    '<li><a href="tin-tuc/cuu-ho-phu-thuan.html">Cứu hộ Khu phố Phú Thuận</a></li>',
    '<li><a href="tin-tuc/cuu-ho-phu-thuan.html">Cứu hộ Khu phố Phú Thuận</a></li>\n        <li><a href="tin-tuc/cuu-ho-24-7-phu-thuan.html">Cứu hộ 24/7 Phú Thuận</a></li>'
  );
}
fs.writeFileSync(hubPath, hub, "utf8");

console.log("filled", pages.map((p) => p.file).join(", "));
