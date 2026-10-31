/* Vintage Tech: small behaviours. Pages work without this file; it only adds polish. */
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* nav: edge line on scroll + phone menu */
  var nav = $("#nav"), btn = $("#menuBtn");
  if (nav) {
    var edge = function () { nav.classList.toggle("edge", scrollY > 8); };
    addEventListener("scroll", edge, { passive: true }); edge();
  }
  if (btn) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); } });
  }
  document.querySelectorAll("[data-year]").forEach(function (y) { y.textContent = new Date().getFullYear(); });

  /* catalogue filters */
  var chips = document.querySelectorAll(".fchip");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      var f = c.getAttribute("data-f");
      chips.forEach(function (x) { x.setAttribute("aria-pressed", String(x === c)); });
      document.querySelectorAll("#catalogue .prod").forEach(function (p) { p.classList.toggle("hide", f !== "all" && p.getAttribute("data-status") !== f); });
    });
  });

  /* reveal on scroll */
  var els = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !calm) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 4) * 60 + "ms"; io.observe(e); });
  } else els.forEach(function (e) { e.classList.add("in"); });
})();
