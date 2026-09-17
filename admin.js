(function () {
  var KEY = "cuuho-cms";
  var AUTH = "cuuho-admin-ok";
  var INBOX = "cuuho-inbox";
  var PASS = "cuuho-admin-pass";
  var DEFAULT_PASS = "trunghieu247";
  var TITLES = {
    dashboard: "Tổng quan",
    inbox: "Hộp thư liên hệ",
    posts: "Tin tức",
    services: "Dịch vụ",
    gallery: "Hình ảnh",
    pages: "Trang menu",
    hero: "Slideshow / Hero",
    issues: "Sự cố",
    process: "Quy trình",
    areas: "Khu vực",
    pricing: "Bảng giá",
    why: "Vì sao chọn",
    reviews: "Đánh giá",
    faq: "FAQ",
    banner: "Banner gọi ngay",
    menu: "Menu website",
    footer: "Footer",
    general: "Thông tin website",
    google: "Google & Maps",
    mobile: "Thanh liên hệ mobile",
    seo: "SEO tổng quan"
  };

  var DEFAULT = {
    brand: "Cứu hộ Trung Hiếu",
    phone: "0343387868",
    phoneDisplay: "0343 387 868",
    zalo: "https://zalo.me/0343387868",
    facebook: "https://www.facebook.com/",
    maps: "https://maps.app.goo.gl/oDM8HWbHmq7ijzN36",
    mapsEmbed: "https://www.google.com/maps?q=11.6390278,106.6087778&hl=vi&z=17&output=embed",
    address: "Tổ 5, Khu phố Phú Thuận, An Lộc, Đồng Nai",
    dockCall: "Gọi điện",
    dockZalo: "Zalo",
    seoTitle: "Cứu hộ Trung Hiếu | Kéo xe – cứu hộ 24/7 Đồng Nai",
    seoDesc: "Cứu hộ Trung Hiếu – kéo xe, cứu hộ xe máy & ô tô 24/7 tại An Lộc, Đồng Nai. Báo giá trước. Gọi 0343 387 868.",
    heroCaption: "Cứu hộ 24/7",
    heroPlace: "An Lộc · Đồng Nai",
    introTitle: "Cứu hộ xe nhanh",
    introLead: "Hết xăng, nổ lốp, chết máy, tai nạn nhỏ hay cần kéo xe — Trung Hiếu nhận cuộc gọi và xuất phát ngay, cả đêm lẫn ngày lễ.",
    newPassword: "",
    services: [
      { title: "Kéo xe – chở xe", desc: "Vận chuyển xe an toàn đến mọi địa điểm" },
      { title: "Thay lốp tận nơi", desc: "Hỗ trợ thay lốp nhanh chóng, đúng kỹ thuật" },
      { title: "Câu bình ắc quy", desc: "Khởi động xe an toàn, không lo hết bình" },
      { title: "Giao xăng tận nơi", desc: "Giao xăng nhanh chóng mọi lúc mọi nơi" }
    ],
    process: [
      { title: "Gọi cứu hộ", desc: "Gọi hotline hoặc nhắn Zalo." },
      { title: "Gửi vị trí", desc: "Gửi vị trí + loại xe + tình trạng xe." },
      { title: "Báo giá", desc: "Trung Hiếu báo chi phí trước khi xuất phát." },
      { title: "Có mặt & xử lý", desc: "Đến nơi, cứu hộ tại chỗ hoặc kéo xe về gara." }
    ],
    areas: ["P. An Lộc", "P. Bình Long", "P. Chơn Thành", "P. Minh Hưng", "P. Đồng Xoài", "P. Bình Phước", "Các phường lân cận khác"],
    faqs: [
      { q: "Gọi cứu hộ cần nói gì?", a: "Vị trí (link Maps hoặc gửi Zalo), loại xe (xe máy / ô tô), tình trạng, muốn kéo về đâu." },
      { q: "Có báo giá trước không?", a: "Có. Báo giá trước khi xuất phát. Không đội giá dọc đường." },
      { q: "Có làm đêm, cuối tuần, lễ Tết không?", a: "Có. Trực 24/7." },
      { q: "Kéo về nhà hoặc gara được không?", a: "Được. Kéo về nhà, gara quen, hoặc điểm bạn chỉ định." },
      { q: "Có đặt lịch hẹn trước được không?", a: "Được. Dùng form Liên hệ hoặc nhắn Zalo. Xe đang kẹt giữa đường thì gọi ngay." }
    ],
    reviews: [
      { name: "Anh Minh", text: "Xe nổ lốp trên đường, gọi Trung Hiếu có mặt nhanh, báo giá rõ." },
      { name: "Chị Hoa", text: "Xe chết máy trời mưa, các anh vẫn đến hỗ trợ tận nơi." },
      { name: "Anh Long", text: "Nhân viên thân thiện, không phát sinh chi phí." }
    ],
    posts: [
      { id: "no-lop", date: "2026-09-12", title: "Xe bị nổ lốp giữa đường phải làm gì?", body: "Bật đèn cảnh báo, tấp vào lề an toàn. Gọi Trung Hiếu: vị trí, loại xe, lốp nào nổ, có lốp dự phòng không." },
      { id: "ac-quy", date: "2026-09-06", title: "Cách nhận biết bình ắc quy yếu", body: "Đèn mờ, đề kêu ụt ụt. Không đề liên tục. Trung Hiếu câu bình tại chỗ khi còn cứu được." },
      { id: "mua-lon", date: "2026-09-03", title: "Kinh nghiệm lái xe khi trời mưa lớn", body: "Giảm tốc, tránh vũng nước sâu. Chết máy khi ngập: tắt máy, gọi cứu hộ." },
      { id: "goi-cuu-ho", date: "2026-08-28", title: "Khi nào nên gọi cứu hộ thay vì tự xử lý?", body: "Gọi khi xe nằm giữa đường, cao tốc, trời tối, mưa, hoặc không chắc kỹ thuật." }
    ],
    gallery: [
      "images/hero-slide-1.png",
      "images/hero-slide-2.png",
      "images/hero-slide-3.png",
      "images/svc-keo.png",
      "images/svc-lop.png",
      "images/svc-binh.png",
      "images/svc-xang.png"
    ],
    brandLine1: "TRUNG HIẾU",
    brandLine2: "CỨU HỘ 24/7",
    tickerNote: "Hỗ trợ 24/7",
    introTags: "Hết xăng, Nổ lốp, Chết máy, Tai nạn nhỏ, Cần kéo xe",
    issuesHead: "Bạn đang gặp sự cố gì?",
    issuesLead: "Chỉ cần một cuộc gọi, chúng tôi có mặt ngay để hỗ trợ bạn.",
    issues: ["Xe chết máy", "Nổ lốp", "Hết xăng", "Hết bình", "Tai nạn / nằm đường", "Cần kéo xe", "Quên chìa khóa", "Xe bị ngập nước"],
    svcHead: "Dịch vụ cứu hộ",
    svcLead: "Đa dạng dịch vụ – Phục vụ nhanh chóng – Hỗ trợ 24/7",
    priceKicker: "Minh bạch chi phí",
    priceTitle: "Báo giá trước khi xuất phát",
    pricePoints: [
      "Giá tùy loại xe, số km và tình trạng (kéo / xử lý tại chỗ)",
      "Nói rõ chi phí trước khi điều xe",
      "Đêm muộn, mưa, cao tốc có thể phụ thu — sẽ báo trước"
    ],
    whyKicker: "Vì sao nên chọn Trung Hiếu",
    whyTitle: "6 tiêu chí tạo nên sự khác biệt",
    whyLead: "Không chỉ là cứu hộ – Chúng tôi mang đến sự an tâm trên mọi hành trình.",
    why: [
      { title: "Có mặt nhanh", desc: "Hỗ trợ 24/7, đến nơi trong thời gian sớm nhất." },
      { title: "Uy tín – Minh bạch", desc: "Báo giá rõ ràng trước khi xuất phát." },
      { title: "Đội ngũ chuyên nghiệp", desc: "Kỹ thuật viên giàu kinh nghiệm, tận tâm, nhiệt tình." },
      { title: "Trang thiết bị hiện đại", desc: "Xe cứu hộ, dụng cụ chuyên dụng, xử lý mọi tình huống." },
      { title: "Phủ sóng rộng", desc: "Hỗ trợ tại phường An Lộc và các phường lân cận." },
      { title: "Luôn đặt khách hàng lên hàng đầu", desc: "Giải pháp nhanh – an toàn – tiết kiệm nhất cho bạn." }
    ],
    bannerKicker: "Cần cứu hộ?",
    bannerTitle: "Gọi ngay Trung Hiếu",
    bannerSub: "Hỗ trợ nhanh – Có mặt tận nơi",
    bannerLead: "Dù ngày hay đêm, chúng tôi luôn sẵn sàng hỗ trợ bạn trên mọi nẻo đường.",
    footerBrand: "TRUNG HIẾU",
    footerSub: "CỨU HỘ GIAO THÔNG 24/7",
    footerAbout: "Luôn sẵn sàng hỗ trợ bạn trên mọi nẻo đường. Trung Hiếu cam kết phục vụ nhanh chóng, an toàn và uy tín.",
    copyright: "© 2026 Trung Hiếu. Tất cả quyền được bảo lưu.",
    menu: [
      { label: "Trang chủ", href: "index.html" },
      { label: "Dịch vụ", href: "dich-vu.html" },
      { label: "Bảng giá", href: "bang-gia.html" },
      { label: "Khu vực", href: "khu-vuc.html" },
      { label: "Hình ảnh", href: "hinh-anh.html" },
      { label: "Tin tức", href: "tin-tuc.html" },
      { label: "Liên hệ", href: "lien-he.html" }
    ],
    pages: [
      { file: "dich-vu.html", title: "Dịch vụ cứu hộ 24/7", desc: "Kéo xe, thay lốp, câu bình, giao xăng tận nơi tại phường An Lộc và các phường lân cận. Báo giá trước khi xuất phát.", seoTitle: "Dịch vụ cứu hộ | Cứu hộ Trung Hiếu" },
      { file: "bang-gia.html", title: "Báo giá trước khi xuất phát", desc: "Chi phí tùy loại xe, số km và tình trạng. Trung Hiếu nói rõ trước khi điều xe — không đội giá dọc đường.", seoTitle: "Bảng giá cứu hộ | Cứu hộ Trung Hiếu" },
      { file: "khu-vuc.html", title: "Khu vực hoạt động", desc: "Có mặt 24/7 tại phường An Lộc và các phường lân cận.", seoTitle: "Khu vực cứu hộ | Cứu hộ Trung Hiếu" },
      { file: "hinh-anh.html", title: "Hình ảnh cứu hộ thực tế", desc: "Ảnh xe và ca cứu hộ Trung Hiếu.", seoTitle: "Hình ảnh | Cứu hộ Trung Hiếu" },
      { file: "tin-tuc.html", title: "Tin tức & kinh nghiệm cứu hộ", desc: "Hướng dẫn ngắn khi xe gặp sự cố trên đường.", seoTitle: "Tin tức cứu hộ | Cứu hộ Trung Hiếu" },
      { file: "lien-he.html", title: "Liên hệ Trung Hiếu", desc: "Xe đang nằm đường thì gọi ngay. Không gấp thì đặt lịch hẹn.", seoTitle: "Liên hệ | Cứu hộ Trung Hiếu" }
    ]
  };

  var data = load();
  var view = "dashboard";

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT));
      var parsed = JSON.parse(raw);
      return Object.assign(JSON.parse(JSON.stringify(DEFAULT)), parsed);
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT));
    }
  }

  function inbox() {
    try { return JSON.parse(localStorage.getItem(INBOX) || "[]"); } catch (e) { return []; }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(data));
    if (data.newPassword) {
      localStorage.setItem(PASS, data.newPassword);
      data.newPassword = "";
    }
    toast("Đã lưu. Mở website trên máy này để xem thay đổi.");
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.style.display = "block";
    setTimeout(function () { el.style.display = "none"; }, 2600);
  }

  function digits(v) {
    return String(v || "").replace(/\D/g, "");
  }

  function field(label, key, type) {
    var val = data[key] == null ? "" : data[key];
    return '<div class="field"><label>' + label + '<input data-key="' + key + '" type="' + (type || "text") + '" value="' + escapeAttr(val) + '" /></label></div>';
  }

  function escapeAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function bindInputs(root) {
    root.querySelectorAll("[data-key]").forEach(function (el) {
      el.addEventListener("input", function () {
        data[el.getAttribute("data-key")] = el.value;
        if (el.getAttribute("data-key") === "phone") {
          var d = digits(el.value);
          data.phone = d;
          if (d.length === 10) data.phoneDisplay = d.slice(0, 4) + " " + d.slice(4, 7) + " " + d.slice(7);
          data.zalo = "https://zalo.me/" + d;
        }
      });
    });
    root.querySelectorAll("[data-list]").forEach(function (el) {
      el.addEventListener("input", function () {
        var list = el.getAttribute("data-list");
        var i = Number(el.getAttribute("data-i"));
        var k = el.getAttribute("data-k");
        if (k) data[list][i][k] = el.value;
        else data[list][i] = el.value;
      });
    });
  }

  function render() {
    document.getElementById("crumb").textContent = TITLES[view] || view;
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-view") === view);
    });
    var n = inbox().filter(function (x) { return !x.read; }).length;
    var badge = document.getElementById("inbox-badge");
    badge.hidden = n === 0;
    badge.textContent = n;
    var page = document.getElementById("page");
    page.innerHTML = screens[view] ? screens[view]() : "";
    bindInputs(page);
    page.querySelectorAll("[data-act]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        actions[btn.getAttribute("data-act")](btn);
      });
    });
  }

  var screens = {
    dashboard: function () {
      var leads = inbox();
      return (
        '<h1 class="page-title">Tổng quan</h1><p class="lead">Giống CMS Sao Khuê: xem nhanh vận hành rồi sửa từng khối website.</p>' +
        '<div class="stats">' +
          card(data.phoneDisplay, "Hotline đang hiện") +
          card(String(data.posts.length), "Bài tin tức") +
          card(String(leads.length), "Lịch hẹn / hộp thư") +
          card(String(data.services.length), "Dịch vụ") +
        "</div>" +
        '<div class="grid2">' +
          '<div class="panel"><h2>Việc nên làm</h2><ul><li>Kiểm tra số điện thoại và Zalo</li><li>Dán link Maps / Facebook thật</li><li>Duyệt hộp thư đặt lịch</li><li>Thêm tin tức khi có ca cứu hộ mới</li></ul></div>' +
          '<div class="panel"><h2>Lịch hẹn mới</h2>' + (leads.slice(0, 4).map(function (l) {
            return "<p><b>" + escapeHtml(l.name) + "</b> · " + escapeHtml(l.phone) + "<br /><span class='note'>" + escapeHtml(l.note || "") + "</span></p>";
          }).join("") || "<p class='note'>Chưa có lịch từ form website.</p>") + "</div>" +
        "</div>"
      );
    },
    inbox: function () {
      var rows = inbox();
      return (
        '<h1 class="page-title">Hộp thư liên hệ</h1><p class="lead">Form đặt lịch trên trang chủ / Liên hệ lưu vào đây rồi mở Zalo.</p>' +
        '<div class="panel"><table><thead><tr><th>Thời gian</th><th>Khách</th><th>SĐT</th><th>Xe</th><th>Ghi chú</th></tr></thead><tbody>' +
        (rows.map(function (l) {
          return "<tr><td>" + escapeHtml(l.at || "") + "</td><td>" + escapeHtml(l.name) + "</td><td>" + escapeHtml(l.phone) + "</td><td>" + escapeHtml(l.vehicle || "") + "</td><td>" + escapeHtml(l.note || "") + "</td></tr>";
        }).join("") || "<tr><td colspan='5'>Chưa có tin nhắn.</td></tr>") +
        "</tbody></table></div>"
      );
    },
    posts: function () {
      return (
        '<h1 class="page-title">Tin tức</h1><p class="lead">Bài viết hiện trên tin-tuc.html khi khách mở site trên cùng trình duyệt.</p>' +
        data.posts.map(function (p, i) {
          return '<div class="panel"><div class="row">' +
            '<div class="field"><label>Ngày<input data-list="posts" data-i="' + i + '" data-k="date" value="' + escapeAttr(p.date) + '" /></label></div>' +
            '<div class="field"><label>Tiêu đề<input data-list="posts" data-i="' + i + '" data-k="title" value="' + escapeAttr(p.title) + '" /></label></div></div>' +
            '<div class="field"><label>Nội dung<textarea rows="4" data-list="posts" data-i="' + i + '" data-k="body">' + escapeHtml(p.body) + "</textarea></label></div>" +
            '<button class="btn btn-danger" type="button" data-act="delPost" data-i="' + i + '">Xóa bài</button></div>';
        }).join("") +
        '<button class="btn btn-ghost" type="button" data-act="addPost">Thêm bài viết</button>'
      );
    },
    services: function () {
      return '<h1 class="page-title">Dịch vụ</h1>' + data.services.map(function (s, i) {
        return '<div class="panel"><div class="row"><div class="field"><label>Tên<input data-list="services" data-i="' + i + '" data-k="title" value="' + escapeAttr(s.title) + '" /></label></div>' +
          '<div class="field"><label>Mô tả<input data-list="services" data-i="' + i + '" data-k="desc" value="' + escapeAttr(s.desc) + '" /></label></div></div></div>';
      }).join("");
    },
    gallery: function () {
      return '<h1 class="page-title">Hình ảnh</h1><p class="lead">Đường dẫn file trong thư mục images/.</p>' +
        data.gallery.map(function (g, i) {
          return '<div class="field"><label>Ảnh ' + (i + 1) + '<input data-list="gallery" data-i="' + i + '" value="' + escapeAttr(g) + '" /></label></div>';
        }).join("");
    },
    hero: function () {
      return '<h1 class="page-title">Slideshow / Hero</h1><div class="panel">' +
        field("Nhãn vàng", "heroCaption") + field("Dòng địa điểm", "heroPlace") +
        field("Tiêu đề H1", "introTitle") +
        '<div class="field"><label>Đoạn mô tả<textarea data-key="introLead" rows="4">' + escapeHtml(data.introLead) + "</textarea></label></div>" +
        field("Nhãn sự cố (cách nhau bởi dấu phẩy)", "introTags") +
        field("Dòng 1 logo", "brandLine1") + field("Dòng 2 logo", "brandLine2") + "</div>";
    },
    process: function () {
      return '<h1 class="page-title">Quy trình 4 bước</h1>' + data.process.map(function (s, i) {
        return '<div class="panel"><b>0' + (i + 1) + '</b><div class="row"><div class="field"><label>Tiêu đề<input data-list="process" data-i="' + i + '" data-k="title" value="' + escapeAttr(s.title) + '" /></label></div>' +
          '<div class="field"><label>Mô tả<input data-list="process" data-i="' + i + '" data-k="desc" value="' + escapeAttr(s.desc) + '" /></label></div></div></div>';
      }).join("");
    },
    areas: function () {
      return '<h1 class="page-title">Khu vực</h1>' + data.areas.map(function (a, i) {
        return '<div class="field"><label>Phường ' + (i + 1) + '<input data-list="areas" data-i="' + i + '" value="' + escapeAttr(a) + '" /></label></div>';
      }).join("");
    },
    reviews: function () {
      return '<h1 class="page-title">Đánh giá</h1>' + data.reviews.map(function (r, i) {
        return '<div class="panel"><div class="field"><label>Tên<input data-list="reviews" data-i="' + i + '" data-k="name" value="' + escapeAttr(r.name) + '" /></label></div>' +
          '<div class="field"><label>Nội dung<textarea rows="3" data-list="reviews" data-i="' + i + '" data-k="text">' + escapeHtml(r.text) + "</textarea></label></div></div>";
      }).join("");
    },
    faq: function () {
      return '<h1 class="page-title">FAQ</h1>' + data.faqs.map(function (f, i) {
        return '<div class="panel"><div class="field"><label>Câu hỏi<input data-list="faqs" data-i="' + i + '" data-k="q" value="' + escapeAttr(f.q) + '" /></label></div>' +
          '<div class="field"><label>Trả lời<textarea rows="3" data-list="faqs" data-i="' + i + '" data-k="a">' + escapeHtml(f.a) + "</textarea></label></div></div>";
      }).join("");
    },
    issues: function () {
      return '<h1 class="page-title">Sự cố</h1><div class="panel">' +
        field("Tiêu đề", "issuesHead") + field("Mô tả", "issuesLead") +
        data.issues.map(function (a, i) {
          return '<div class="field"><label>Ô ' + (i + 1) + '<input data-list="issues" data-i="' + i + '" value="' + escapeAttr(a) + '" /></label></div>';
        }).join("") + "</div>";
    },
    pricing: function () {
      return '<h1 class="page-title">Bảng giá</h1><div class="panel">' +
        field("Nhãn", "priceKicker") + field("Tiêu đề", "priceTitle") +
        data.pricePoints.map(function (a, i) {
          return '<div class="field"><label>Dòng ' + (i + 1) + '<input data-list="pricePoints" data-i="' + i + '" value="' + escapeAttr(a) + '" /></label></div>';
        }).join("") + "</div>";
    },
    why: function () {
      return '<h1 class="page-title">Vì sao chọn</h1><div class="panel">' +
        field("Kicker", "whyKicker") + field("Tiêu đề", "whyTitle") + field("Mô tả", "whyLead") + "</div>" +
        data.why.map(function (s, i) {
          return '<div class="panel"><div class="field"><label>Tiêu chí<input data-list="why" data-i="' + i + '" data-k="title" value="' + escapeAttr(s.title) + '" /></label></div>' +
            '<div class="field"><label>Mô tả<input data-list="why" data-i="' + i + '" data-k="desc" value="' + escapeAttr(s.desc) + '" /></label></div></div>';
        }).join("");
    },
    banner: function () {
      return '<h1 class="page-title">Banner gọi ngay</h1><div class="panel">' +
        field("Nhãn", "bannerKicker") + field("Tiêu đề", "bannerTitle") +
        field("Dòng phụ", "bannerSub") +
        '<div class="field"><label>Mô tả<textarea data-key="bannerLead" rows="3">' + escapeHtml(data.bannerLead) + "</textarea></label></div></div>";
    },
    menu: function () {
      return '<h1 class="page-title">Menu website</h1>' + data.menu.map(function (m, i) {
        return '<div class="panel"><div class="row"><div class="field"><label>Tên<input data-list="menu" data-i="' + i + '" data-k="label" value="' + escapeAttr(m.label) + '" /></label></div>' +
          '<div class="field"><label>Link<input data-list="menu" data-i="' + i + '" data-k="href" value="' + escapeAttr(m.href) + '" /></label></div></div></div>';
      }).join("");
    },
    pages: function () {
      return '<h1 class="page-title">Trang menu</h1><p class="lead">Tiêu đề / mô tả / SEO từng trang con.</p>' +
        data.pages.map(function (p, i) {
          return '<div class="panel"><b>' + escapeHtml(p.file) + "</b>" +
            '<div class="field"><label>H1<input data-list="pages" data-i="' + i + '" data-k="title" value="' + escapeAttr(p.title) + '" /></label></div>' +
            '<div class="field"><label>Mô tả<textarea rows="2" data-list="pages" data-i="' + i + '" data-k="desc">' + escapeHtml(p.desc) + "</textarea></label></div>" +
            '<div class="field"><label>Meta title<input data-list="pages" data-i="' + i + '" data-k="seoTitle" value="' + escapeAttr(p.seoTitle) + '" /></label></div></div>';
        }).join("");
    },
    footer: function () {
      return '<h1 class="page-title">Footer</h1><div class="panel">' +
        field("Tên thương hiệu", "footerBrand") + field("Dòng phụ", "footerSub") +
        '<div class="field"><label>Đoạn giới thiệu<textarea data-key="footerAbout" rows="3">' + escapeHtml(data.footerAbout) + "</textarea></label></div>" +
        field("Copyright", "copyright") + "</div>";
    },
    general: function () {
      return '<h1 class="page-title">Thông tin website</h1><div class="panel">' +
        field("Tên thương hiệu", "brand") +
        field("Số điện thoại (10 số)", "phone", "tel") +
        field("Hiển thị số", "phoneDisplay") +
        field("Link Zalo", "zalo") +
        field("Facebook", "facebook") +
        field("Địa chỉ", "address") +
        field("Đổi mật khẩu admin", "newPassword", "password") +
        '<p class="note">Mật khẩu lưu trên trình duyệt. Đường dẫn quản trị: /adminbp</p></div>';
    },
    google: function () {
      return '<h1 class="page-title">Google &amp; Maps</h1><div class="panel">' +
        field("Link mở Google Maps", "maps") +
        field("Link nhúng iframe (src)", "mapsEmbed") +
        '<p class="note">Dán maps.app.goo.gl vào ô link mở. Ô nhúng dùng URL có output=embed.</p></div>';
    },
    mobile: function () {
      return '<h1 class="page-title">Thanh liên hệ mobile</h1><div class="panel">' +
        field("Nút gọi", "dockCall") + field("Nút Zalo", "dockZalo") +
        "<p class='note'>Số điện thoại và Zalo lấy từ Thông tin website.</p></div>";
    },
    seo: function () {
      return '<h1 class="page-title">SEO tổng quan</h1><div class="panel">' +
        field("Meta title trang chủ", "seoTitle") +
        '<div class="field"><label>Meta description<textarea data-key="seoDesc" rows="3">' + escapeHtml(data.seoDesc) + "</textarea></label></div></div>";
    }
  };

  function card(n, l) {
    return '<article class="stat"><b>' + escapeHtml(n) + "</b><span>" + escapeHtml(l) + "</span></article>";
  }

  var actions = {
    addPost: function () {
      data.posts.unshift({ id: "p-" + Date.now(), date: new Date().toISOString().slice(0, 10), title: "Bài viết mới", body: "" });
      render();
    },
    delPost: function (btn) {
      data.posts.splice(Number(btn.getAttribute("data-i")), 1);
      render();
    }
  };

  document.querySelectorAll(".nav-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      view = b.getAttribute("data-view");
      document.getElementById("sidebar").classList.remove("is-open");
      render();
    });
  });
  document.getElementById("save").addEventListener("click", save);
  document.getElementById("logout").addEventListener("click", function () {
    sessionStorage.removeItem(AUTH);
    location.reload();
  });
  document.getElementById("open-side").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("is-open");
  });

  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(e.target);
    var user = String(fd.get("user") || "");
    var pass = String(fd.get("pass") || "");
    var stored = localStorage.getItem(PASS) || DEFAULT_PASS;
    var err = document.getElementById("login-err");
    if (user === "admin" && pass === stored) {
      sessionStorage.setItem(AUTH, "1");
      showApp();
    } else {
      err.textContent = "Sai tài khoản hoặc mật khẩu.";
    }
  });

  function showApp() {
    document.getElementById("login").hidden = true;
    document.getElementById("app").hidden = false;
    render();
  }

  if (sessionStorage.getItem(AUTH) === "1") showApp();
})();
