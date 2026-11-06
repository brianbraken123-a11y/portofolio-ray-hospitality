/* Ryan Hidayat Taylor — interaksi halaman
   Prinsip: kalau JS gagal, halaman tetap terbaca semua. */

(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. fade-up saat masuk viewport (sekali jalan) ---------- */

  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function revealAll() {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
    document.querySelectorAll(".job").forEach(function (el) { el.classList.add("is-in"); });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    revealables.forEach(function (el) { io.observe(el); });

    // jaring pengaman: apa pun yang terjadi, konten tidak boleh tetap kosong
    window.setTimeout(revealAll, 2500);
  }

  /* ---------- 2. count-up angka kunci ---------- */

  var counts = Array.prototype.slice.call(document.querySelectorAll(".count"));

  function runCount(el) {
    var target = parseInt(el.getAttribute("data-to"), 10) || 0;
    var duration = 900;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // ease-out
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * target));
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = String(target);
    }

    window.requestAnimationFrame(step);
  }

  if (reduceMotion) {
    counts.forEach(function (el) {
      el.textContent = el.getAttribute("data-to");
    });
  } else if ("IntersectionObserver" in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        countIO.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    counts.forEach(function (el) { countIO.observe(el); });
  } else {
    counts.forEach(function (el) {
      el.textContent = el.getAttribute("data-to");
    });
  }

  /* ---------- 3. garis timeline "tergambar" saat scroll ---------- */

  var timeline = document.getElementById("timeline");
  var fill = timeline ? timeline.querySelector(".timeline__fill") : null;

  if (timeline && fill && !reduceMotion) {
    var ticking = false;

    function updateTimeline() {
      var rect = timeline.getBoundingClientRect();
      var vh = window.innerHeight || doc.clientHeight;
      var anchor = vh * 0.55; // garis sampai sejajar 55% tinggi layar
      var progress = (anchor - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      fill.style.setProperty("--fill", progress.toFixed(3));
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateTimeline);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateTimeline();
  } else if (fill) {
    fill.style.setProperty("--fill", 1);
  }
})();
