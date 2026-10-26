/* Vintage Tech: shop window */
(function () {
  "use strict";
  var VT = window.VT || { products: [], contact: {} };
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var STATUS = { ready: "Ready", build: "In build", soon: "Coming soon" };
  var open = !!(VT.contact.whatsapp || VT.contact.email);
  function reach(subject) {
    var msg = "Hi Vintage Tech, " + subject;
    if (VT.contact.whatsapp) return "https://wa.me/" + VT.contact.whatsapp + "?text=" + encodeURIComponent(msg);
    if (VT.contact.email) return "mailto:" + VT.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(msg);
    return null;
  }

  /* nav edge */
  var nav = $("#nav");
  if (nav) { var edge = function () { nav.classList.toggle("edge", scrollY > 8); }; addEventListener("scroll", edge, { passive: true }); edge(); }
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* fanned stack: three products + Vintage Air */
  var stack = $("#stack");
  if (stack) {
    var p = VT.products.slice(0, 3), cls = ["c1", "c2", "c3"];
    stack.innerHTML = p.map(function (x, i) {
      return '<div class="card ' + cls[i] + '"><i style="background:' + x.accent + '"></i><b>' + esc(x.name) + "</b><span>" + esc(x.line) + "</span><em>" + STATUS[x.status] + "</em></div>";
    }).join("") + '<div class="card air"><i style="background:#c8ff2e"></i><b>Vintage Air</b><span>The workshop we build it all in.</span><em>Flagship</em></div>';
  }

  /* proof strip */
  var proof = $("#proof");
  if (proof) {
    var live = VT.products.filter(function (x) { return x.status === "ready" && x.proof && x.proof.url; });
    proof.innerHTML += live.map(function (x) {
      return '<a href="' + esc(x.proof.url) + '" target="_blank" rel="noopener"><span class="dot"></span>' + esc(x.name) + " · " + esc(x.proof.url.replace(/^https?:\/\//, "")) + " ↗</a>";
    }).join("");
    var lc = $("#liveCount"); if (lc) lc.textContent = live.length;
  }

  /* product cards */
  var grid = $("#productGrid");
  if (grid) {
    grid.innerHTML = VT.products.map(function (x) {
      var proofLine = x.proof ? (x.proof.url ? '<a href="' + esc(x.proof.url) + '" target="_blank" rel="noopener">' + esc(x.proof.label) + " ↗</a>" : esc(x.proof.label)) : "";
      var price = x.price ? "KES " + Number(x.price).toLocaleString("en-KE") : "Quote";
      var href = reach(x.status === "ready" ? "I'd like a quote for " + x.name + "." : "please add me to the waitlist for " + x.name + ".");
      var btn = href
        ? '<a class="btn" href="' + esc(href) + '" target="_blank" rel="noopener">' + (x.status === "ready" ? "Get a quote" : "Join the waitlist") + "</a>"
        : '<a class="btn" href="#contact" data-closed aria-disabled="true">' + (x.status === "ready" ? "Get a quote" : "Join the waitlist") + "</a>";
      return '<article class="prod rv"><div class="prod-top"><span class="prod-ic" style="background:' + x.accent + '">' + esc(x.name.charAt(0)) + '</span><span class="chip ' + x.status + '">' + STATUS[x.status] + "</span></div>" +
        "<h3>" + esc(x.name) + '</h3><p class="line">' + esc(x.line) + '</p><p class="for">For: ' + esc(x.for) + "</p>" +
        "<ul>" + x.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        '<div class="prod-foot"><span class="price"><small>Price</small>' + price + "</span>" + btn + "</div>" +
        '<p class="proofline">' + proofLine + "</p></article>";
    }).join("");
  }

  /* contact */
  var cta = $("#contactCta");
  if (cta) {
    var h = reach("I'd like to talk about a platform for my business.");
    cta.innerHTML = h ? '<a class="btn lime" href="' + esc(h) + '" target="_blank" rel="noopener">' + (VT.contact.whatsapp ? "Chat on WhatsApp" : "Send an email") + ' <span class="arr">→</span></a>'
      : '<a class="btn lime" href="#contact" data-closed aria-disabled="true">Contact opens soon</a>';
    $("#contactBox").innerHTML = h
      ? "<b>We usually reply quickly on WhatsApp</b>Tell us your business, your town and what you want it to do." +
        (VT.contact.whatsapp ? '<br><br>WhatsApp <a href="https://wa.me/' + esc(VT.contact.whatsapp) + '" target="_blank" rel="noopener">+' + esc(VT.contact.whatsapp.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4")) + "</a>" : "") +
        (VT.contact.email ? '<br>or email <a href="mailto:' + esc(VT.contact.email) + '">' + esc(VT.contact.email) + "</a>" : "")
      : "<b>The box office opens soon</b>Contact details are being set up. In the meantime, open a live demo above to see what we build.";
  }
  var airCta = $("#airCta");
  if (airCta) {
    var ah = reach("I'd like early access to Vintage Air.");
    airCta.innerHTML = ah ? '<a class="btn" href="' + esc(ah) + '" target="_blank" rel="noopener">Ask for early access <span class="arr">→</span></a>'
      : '<a class="btn" href="#soon" data-closed aria-disabled="true">Early access opens soon</a>';
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-closed]");
    if (!c) return;
    e.preventDefault();
    var n = $("#contactNote") || $("#airNote");
    if (n) { n.textContent = "Contact opens very soon. Check back in a few days."; n.parentNode.scrollIntoView({ behavior: "smooth", block: "center" }); }
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
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(e); });
  } else els.forEach(function (e) { e.classList.add("in"); });
})();
