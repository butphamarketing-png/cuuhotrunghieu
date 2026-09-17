(function () {
  var KEY = "cuuho-cms";
  var data;
  try { data = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { data = null; }
  if (!data) return;

  var phone = String(data.phone || "").replace(/\D/g, "");
  var display = data.phoneDisplay || phone;
  var zalo = data.zalo || (phone ? "https://zalo.me/" + phone : "");
  var maps = data.maps || "";
  var fb = data.facebook || "";
  var address = data.address || "";
  var file = (location.pathname.replace(/\/+$/, "").split("/").pop() || "index.html").toLowerCase();
  if (!file || file === "adminbp") file = "index.html";
  if (file.indexOf(".") === -1) file += ".html";

  if (phone) {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.href = "tel:" + phone;
      if (/0\d[\d\s]{8,}/.test(a.textContent)) a.textContent = a.textContent.replace(/0\d[\d\s]{8,}/, display);
    });
  }
  if (zalo) document.querySelectorAll('a[href*="zalo.me"]').forEach(function (a) { a.href = zalo; });
  if (maps) {
    document.querySelectorAll('a[href*="maps"], a.sf-maps').forEach(function (a) {
      if (a.getAttribute("href")) a.href = maps;
    });
  }
  if (fb) document.querySelectorAll('a[href*="facebook.com"]').forEach(function (a) { a.href = fb; });
  if (data.mapsEmbed) {
    document.querySelectorAll(".dn-map iframe, iframe[title*='Maps'], iframe[title*='maps'], iframe[title*='Google']").forEach(function (f) {
      f.src = data.mapsEmbed;
    });
  }
  if (address) {
    document.querySelectorAll(".ticker-item").forEach(function (el) {
      el.innerHTML = el.innerHTML.replace(/Tổ 5,[^<]+Đồng Nai/g, address);
    });
  }
  var bn = document.querySelector(".brand-name");
  if (bn && data.brandLine1) bn.innerHTML = esc(data.brandLine1) + "<br />" + esc(data.brandLine2 || "");

  if (data.menu && data.menu.length) {
    var nav = document.querySelector("#menu-chinh");
    if (nav) {
      var current = file === "" ? "index.html" : file;
      var prefix = /\/(tin-tuc|bai-viet)\/.+/i.test(location.pathname) ? "../" : "";
      nav.innerHTML = data.menu.map(function (m) {
        var href = m.href || "";
        if (!/^https?:/i.test(href) && href.indexOf("../") !== 0) href = prefix + href;
        var on = (m.href || "").split("/").pop() === current ? ' class="on"' : "";
        return '<a href="' + esc(href) + '"' + on + ">" + esc(m.label) + "</a>";
      }).join("");
    }
  }

  var home = file === "index.html" || file === "" || location.pathname.endsWith("/");
  if (home && data.seoTitle) document.title = data.seoTitle;
  if (home && data.seoDesc) {
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", data.seoDesc);
  }

  var page = (data.pages || []).filter(function (p) { return (p.file || "").toLowerCase() === file; })[0];
  if (page) {
    var ph = document.querySelector(".page-hero h1");
    var pp = document.querySelector(".page-hero p:not(.crumb)");
    if (ph && page.title) ph.textContent = page.title;
    if (pp && page.desc) pp.textContent = page.desc;
    if (page.seoTitle) document.title = page.seoTitle;
  }

  var cap = document.querySelector(".hero-caption");
  if (cap && data.heroCaption) {
    cap.innerHTML = "<span>" + esc(data.heroCaption) + "</span><strong>" + esc(data.heroPlace || "") + "</strong>";
  }
  var h1 = document.querySelector(".intro h1");
  if (h1 && data.introTitle) h1.textContent = data.introTitle;
  var lead = document.querySelector(".intro .lead");
  if (lead && data.introLead) lead.textContent = data.introLead;
  if (data.introTags) {
    var tags = document.querySelector(".intro-tags");
    if (tags) {
      tags.innerHTML = data.introTags.split(",").map(function (t) {
        return "<li>" + esc(t.trim()) + "</li>";
      }).join("");
    }
  }

  var ih = document.querySelector(".issues-wrap .head h2");
  var il = document.querySelector(".issues-wrap .head p");
  if (ih && data.issuesHead) ih.textContent = data.issuesHead;
  if (il && data.issuesLead) il.textContent = data.issuesLead;
  if (data.issues) {
    document.querySelectorAll(".issues article strong").forEach(function (el, i) {
      if (data.issues[i]) el.textContent = data.issues[i];
    });
  }

  var sh = document.querySelector(".svc-wrap .head h2");
  var sl = document.querySelector(".svc-wrap .head p");
  if (sh && data.svcHead) sh.textContent = data.svcHead;
  if (sl && data.svcLead) sl.textContent = data.svcLead;

  var svc = document.querySelectorAll(".svc-card");
  if (svc.length && data.services) {
    svc.forEach(function (card, i) {
      var s = data.services[i];
      if (!s) return;
      var t = card.querySelector("h3");
      var p = card.querySelector("p");
      if (t) t.textContent = s.title;
      if (p) p.textContent = s.desc;
    });
  }

  if (data.process) {
    document.querySelectorAll(".road .step-card, .steps .step-card").forEach(function (card, i) {
      var s = data.process[i];
      if (!s) return;
      var t = card.querySelector("h3");
      var p = card.querySelector("p");
      if (t) t.textContent = s.title;
      if (p) p.textContent = s.desc;
    });
  }

  if (data.areas) {
    var areaLis = document.querySelectorAll(".area-copy ul li a");
    areaLis.forEach(function (a, i) {
      if (data.areas[i]) a.textContent = data.areas[i];
    });
  }

  var pk = document.querySelector(".price-kicker");
  var pt = document.querySelector(".price-copy h2");
  if (pk && data.priceKicker) pk.textContent = data.priceKicker;
  if (pt && data.priceTitle) pt.textContent = data.priceTitle;
  if (data.pricePoints) {
    document.querySelectorAll(".price-copy ul li").forEach(function (li, i) {
      if (data.pricePoints[i]) li.textContent = data.pricePoints[i];
    });
  }

  var wk = document.querySelector(".why .kicker");
  var wt = document.querySelector(".why h2");
  var wl = document.querySelector(".why .head p:last-of-type");
  if (wk && data.whyKicker) wk.textContent = data.whyKicker;
  if (wt && data.whyTitle) wt.textContent = data.whyTitle;
  if (wl && data.whyLead) wl.textContent = data.whyLead;
  if (data.why) {
    document.querySelectorAll(".why-grid article").forEach(function (art, i) {
      var w = data.why[i];
      if (!w) return;
      var t = art.querySelector("h3");
      var p = art.querySelector("p");
      if (t) t.textContent = w.title;
      if (p) p.textContent = w.desc;
    });
  }

  if (data.reviews) {
    document.querySelectorAll(".rev-grid article").forEach(function (art, i) {
      var r = data.reviews[i];
      if (!r) return;
      var n = art.querySelector("strong");
      var ps = art.querySelectorAll("p");
      var body = ps[ps.length - 1];
      if (n) n.textContent = r.name;
      if (body) body.textContent = r.text;
    });
  }

  var list = document.querySelector(".article-list");
  if (list && data.posts && data.posts.length) {
    list.innerHTML = data.posts.map(function (p) {
      return "<article id=\"" + esc(p.id || "") + "\"><time>" + esc(fmt(p.date)) + "</time><h2>" + esc(p.title) + "</h2><p>" + esc(p.body) + "</p></article>";
    }).join("");
  }

  var faqs = document.querySelectorAll(".faq details");
  if (faqs.length && data.faqs) {
    faqs.forEach(function (d, i) {
      var f = data.faqs[i];
      if (!f) return;
      var s = d.querySelector("summary");
      var p = d.querySelector("p");
      if (s) s.textContent = f.q;
      if (p) p.textContent = f.a;
    });
  }

  var bk = document.querySelector(".banner .kicker");
  var bt = document.querySelector(".banner h2");
  var bl = document.querySelector(".banner .lead-w");
  if (bk && data.bannerKicker) bk.textContent = data.bannerKicker;
  if (bt && data.bannerTitle) {
    bt.innerHTML = esc(data.bannerTitle) + "<br /><span>" + esc(data.bannerSub || "") + "</span>";
  }
  if (bl && data.bannerLead) bl.textContent = data.bannerLead;

  if (data.footerBrand) {
    var fbEl = document.querySelector(".foot-brand");
    if (fbEl) fbEl.textContent = data.footerBrand;
  }
  if (data.footerSub) {
    var fs = document.querySelector(".foot-sub");
    if (fs) fs.textContent = data.footerSub;
  }
  if (data.footerAbout) {
    var fa = document.querySelector(".foot-grid > div:first-child > p:not(.foot-social):not(.foot-sub)");
    if (fa) fa.textContent = data.footerAbout;
  }
  if (data.copyright) {
    var cp = document.querySelector(".copy");
    if (cp) cp.textContent = data.copyright;
  }

  var dock = document.querySelectorAll(".dock a");
  if (dock[0] && data.dockCall) dock[0].textContent = data.dockCall;
  if (dock[1] && data.dockZalo) dock[1].textContent = data.dockZalo;

  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  function fmt(d) {
    if (!d) return "";
    var p = String(d).split("-");
    if (p.length === 3) return p[2] + "/" + p[1] + "/" + p[0];
    return d;
  }
})();
