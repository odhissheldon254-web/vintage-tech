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

  /* drawn Vintage Air interface (an illustration, not a screenshot) */
  var MOCK = '<div class="mock" role="img" aria-label="Illustration of the Vintage Air workspace: boxes, a Kali shell and live vitals">' +
    '<div class="mock-bar"><svg class="v" viewBox="0 0 64 64"><path d="M14 16 L32 50 L50 16"/><circle cx="50" cy="50" r="5"/></svg><b>vintage <span>air</span></b>' +
    '<span class="search">Search or run a command  ⌃K</span><span class="led"></span></div>' +
    '<div class="mock-grid">' +
    '<div class="mp"><h4><i>01</i>Boxes</h4>' +
    '<div class="row"><span class="sq" style="background:#e95420"></span><b>Ubuntu Desktop</b><span class="on">● running</span></div>' +
    '<div class="row"><span class="sq" style="background:#367bf0"></span><b>Kali Desktop</b><span class="off">● paused</span></div>' +
    '<div class="row"><span class="sq" style="background:#5cc8ff"></span><b>Kali Terminal</b><span class="on">● running</span></div>' +
    '<div class="row"><span class="sq" style="background:#f08a4b"></span><b>Ubuntu Terminal</b><span class="off">● ready</span></div></div>' +
    '<div class="mp"><h4><i>02</i>Shell · kali-term</h4><div class="term" data-term></div></div>' +
    '<div class="mp mock-wide"><h4><i>03</i>Vitals · save points · journal</h4><svg class="spark" viewBox="0 0 400 46" preserveAspectRatio="none">' +
    '<path class="fill" d="M0 40 L30 34 L60 36 L90 22 L120 28 L150 18 L180 24 L210 12 L240 20 L270 14 L300 26 L330 16 L360 22 L400 10 L400 46 L0 46Z"/>' +
    '<path d="M0 40 L30 34 L60 36 L90 22 L120 28 L150 18 L180 24 L210 12 L240 20 L270 14 L300 26 L330 16 L360 22 L400 10"/></svg></div>' +
    "</div></div>";
  document.querySelectorAll("[data-mock]").forEach(function (m) { m.outerHTML = MOCK; });

  var LINES = [
    '<span class="p">┌──(root㉿kali)-[~]</span>',
    '<span class="p">└─#</span> <span class="k">apt install -y nmap</span>',
    '<span class="m">Setting up nmap … done</span>',
    '<span class="m"># Save point made in Boxes: “tools installed”</span>',
    '<span class="g">✓ saved · 101 MB · rewind any time</span>',
    '<span class="p">└─#</span> '
  ];
  document.querySelectorAll("[data-term]").forEach(function (t) {
    if (calm) { t.innerHTML = LINES.join("\n") + '<span class="cur"></span>'; return; }
    var i = 0;
    (function next() {
      t.innerHTML = LINES.slice(0, i).join("\n") + '<span class="cur"></span>';
      i += 1;
      setTimeout(i > LINES.length ? function () { i = 1; next(); } : next, i > LINES.length ? 3800 : 650);
    })();
  });

  /* reveal on scroll */
  var els = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !calm) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 4) * 60 + "ms"; io.observe(e); });
  } else els.forEach(function (e) { e.classList.add("in"); });
})();
