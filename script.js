(function () {
  var slides = document.querySelectorAll(".hero-slider .slide");
  var dots = document.querySelectorAll(".hero-slider .dots button");
  var i = 0;
  var timer;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (el, idx) {
      el.classList.toggle("is-on", idx === i);
    });
    dots.forEach(function (el, idx) {
      el.classList.toggle("on", idx === i);
    });
  }

  function play() {
    clearInterval(timer);
    timer = setInterval(function () {
      show(i + 1);
    }, 5000);
  }

  var prev = document.querySelector(".hero-slider .prev");
  var next = document.querySelector(".hero-slider .next");
  if (prev) prev.addEventListener("click", function () { show(i - 1); play(); });
  if (next) next.addEventListener("click", function () { show(i + 1); play(); });
  dots.forEach(function (dot, idx) {
    dot.addEventListener("click", function () { show(idx); play(); });
  });

  var nav = document.querySelector(".nav");
  var menuBtn = document.querySelector(".menu-btn");
  var scrim = document.querySelector(".nav-scrim");
  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("is-open");
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    if (scrim) scrim.classList.remove("is-on");
    document.body.classList.remove("nav-open");
  }
  function openMenu() {
    nav.classList.add("is-open");
    menuBtn.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    if (scrim) scrim.classList.add("is-on");
    document.body.classList.add("nav-open");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
  }
  if (scrim) scrim.addEventListener("click", closeMenu);
  var navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (a) { a.classList.remove("on"); });
      link.classList.add("on");
      closeMenu();
    });
  });

  var filters = document.querySelectorAll(".filters button");
  var figs = document.querySelectorAll(".mosaic figure");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("on"); });
      btn.classList.add("on");
      var key = btn.getAttribute("data-filter");
      figs.forEach(function (fig) {
        var show = key === "all" || fig.getAttribute("data-cat") === key;
        fig.classList.toggle("is-off", !show);
      });
    });
  });

  if (slides.length) play();

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var road = document.querySelector(".road");
  var process = document.querySelector(".process");
  if (road) {
    if ("IntersectionObserver" in window && process) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            road.classList.add("is-in");
            io.disconnect();
          }
        });
      }, { threshold: 0.28, rootMargin: "0px 0px -8% 0px" });
      io.observe(process);
    } else {
      road.classList.add("is-in");
    }
  }

  var bookForm = document.getElementById("book-form");
  if (bookForm) {
    bookForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(bookForm);
      var when = String(data.get("when") || "").replace("T", " ");
      var lines = [
        "Đặt lịch hẹn cứu hộ Trung Hiếu",
        "Họ tên: " + data.get("name"),
        "SĐT: " + data.get("phone"),
        "Loại xe: " + data.get("vehicle"),
        "Thời gian: " + when,
        "Địa điểm / ghi chú: " + data.get("note")
      ];
      var text = lines.join("\n");
      var status = document.getElementById("book-status");
      function done(ok) {
        if (!status) return;
        status.hidden = false;
        status.textContent = ok
          ? "Đã copy nội dung. Dán vào Zalo để gửi lịch hẹn — Trung Hiếu sẽ xác nhận lại."
          : "Mở Zalo và gửi các thông tin vừa điền. Trung Hiếu sẽ xác nhận lại trước khi đến.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }).catch(function () { done(false); });
      } else {
        done(false);
      }
      window.open("https://zalo.me/0343387868", "_blank", "noopener");
    });
  }
})();

