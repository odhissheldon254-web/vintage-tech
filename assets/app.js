/* Vintage Tech — the projectionist */
(function () {
  "use strict";

  var VT = window.VT;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STATUS = { live: "Now live", private: "Private screening", build: "In production" };
  var studioName = function (id) {
    var s = VT.studios.filter(function (x) { return x.id === id; })[0];
    return s ? s.name : "Independent";
  };
  var boxOfficeOpen = !!(VT.contact.whatsapp || VT.contact.email);

  /* ---------- Act 0: the leader ---------- */
  var seen = false;
  try { seen = sessionStorage.getItem("vt.leader") === "1"; } catch (e) {}

  function roll() {
    var leader = $("#leader");
    leader.classList.add("gone");
    document.body.classList.remove("intro-on");
    document.body.classList.add("rolling");
    try { sessionStorage.setItem("vt.leader", "1"); } catch (e) {}
    setTimeout(function () { leader.remove(); }, 700);
  }

  if (seen || calm) {
    roll();
  } else {
    var n = 3, num = $("#leaderNum"), leader = $("#leader"), done = false;
    var finish = function () { if (!done) { done = true; roll(); } };
    var tick = setInterval(function () {
      n -= 1;
      if (n > 0) { num.textContent = n; return; }
      clearInterval(tick);
      leader.classList.add("card");
      setTimeout(finish, 1500);
    }, 1000);
    $("#leaderSkip").addEventListener("click", function () { clearInterval(tick); finish(); });
    document.addEventListener("keydown", function k(e) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        document.removeEventListener("keydown", k); clearInterval(tick); finish();
      }
    });
  }

  /* ---------- nav goes solid on scroll ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("solid", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- the marquee board ---------- */
  var titles = VT.platforms.map(function (p) { return p.title; });
  var mt = $("#marqueeTitles"), mi = 0;
  var liveCount = VT.platforms.filter(function (p) { return p.status === "live"; }).length;
  $("#marqueeCount").textContent = VT.platforms.length + " features · " + liveCount + " live now · " + VT.studios.length + " studio" + (VT.studios.length === 1 ? "" : "s");
  function flip() {
    mt.innerHTML = '<span class="flip">' + esc(titles[mi % titles.length]) + "</span>";
    mi += 1;
  }
  flip();
  if (!calm) setInterval(flip, 2400);

  /* ---------- film strip ---------- */
  var frames = VT.platforms.map(function (p) {
    return '<div class="frame" style="--f1:' + p.palette[0] + ";--f2:" + p.palette[1] + ";--f3:" + p.palette[2] + '">' +
      esc(p.title) + "<small>" + esc(p.genre) + "</small></div>";
  }).join("");
  $("#stripTrack").innerHTML = frames + frames + frames + frames; // two identical halves loop seamlessly

  /* ---------- posters ---------- */
  function posterHTML(p, tag) {
    return "<" + tag + ' class="poster" data-id="' + esc(p.id) + '" style="--p1:' + p.palette[0] + ";--p2:" + p.palette[1] + ";--p3:" + p.palette[2] + '"' +
      (tag === "button" ? ' type="button" aria-label="' + esc(p.title + ": " + p.tagline) + ' Watch the trailer."' : "") + ">" +
      '<span class="stamp ' + p.status + '">' + STATUS[p.status] + "</span>" +
      '<span class="p-presents">' + esc(studioName(p.studio)) + " presents</span>" +
      '<span class="p-glyph" aria-hidden="true">' + esc(p.glyph) + "</span>" +
      '<span class="p-title">' + esc(p.title) + "</span>" +
      '<span class="p-tag">' + esc(p.tagline) + "</span>" +
      '<span class="p-billing">A ' + esc(studioName(p.studio)) + " production · " + esc(p.genre) + " · " + esc(p.features.length) + " features · Made in Nairobi</span>" +
      "</" + tag + ">";
  }

  var genre = "All";
  function renderFilters() {
    var used = VT.genres.filter(function (g) { return VT.platforms.some(function (p) { return p.genre === g; }); });
    $("#filters").innerHTML = ["All"].concat(used).map(function (g) {
      return '<button class="chip" type="button" data-g="' + esc(g) + '" aria-pressed="' + (g === genre) + '">' + esc(g) + "</button>";
    }).join("");
  }

  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;

  function renderPosters() {
    var list = VT.platforms.filter(function (p) { return genre === "All" || p.genre === genre; });
    var box = $("#posters");
    box.innerHTML = list.map(function (p) { return posterHTML(p, "button"); }).join("");
    $("#empty").hidden = list.length > 0;
    Array.prototype.forEach.call(box.children, function (el, i) {
      el.style.transitionDelay = (i % 4) * 90 + "ms";
      if (io && !calm) io.observe(el); else el.classList.add("in");
    });
  }

  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    genre = b.getAttribute("data-g");
    renderFilters();
    renderPosters();
  });

  // tilt toward the pointer, like a poster in light
  if (!calm && window.matchMedia("(hover: hover)").matches) {
    $("#posters").addEventListener("pointermove", function (e) {
      var el = e.target.closest(".poster");
      if (!el) return;
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = "rotateY(" + (x * 12) + "deg) rotateX(" + (-y * 12) + "deg) translateZ(10px)";
    });
    $("#posters").addEventListener("pointerout", function (e) {
      var el = e.target.closest(".poster");
      if (el && !el.contains(e.relatedTarget)) el.style.transform = "";
    });
  }

  /* ---------- the trailer ---------- */
  var dlg = $("#trailer");
  function requestLink(p) {
    var msg = "Hi Vintage Tech, I'd like a quote for " + p.title + ".";
    if (VT.contact.whatsapp) return "https://wa.me/" + VT.contact.whatsapp + "?text=" + encodeURIComponent(msg);
    return "mailto:" + VT.contact.email + "?subject=" + encodeURIComponent("Quote: " + p.title) + "&body=" + encodeURIComponent(msg);
  }

  function openTrailer(id) {
    var p = VT.platforms.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    $("#trPoster").innerHTML = posterHTML(p, "div");
    $("#trMeta").textContent = STATUS[p.status] + " · " + p.genre + " · " + studioName(p.studio);
    $("#trTitle").textContent = p.title;
    $("#trTag").textContent = p.tagline;
    $("#trStory").textContent = p.story;
    $("#trFeatures").innerHTML = p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
    $("#trPrice").textContent = p.price ? "KES " + Number(p.price).toLocaleString("en-KE") : "Ask for a quote";
    $("#trNote").textContent = "";

    var acts = "";
    if (p.link) acts += '<a class="btn btn-ghost" href="' + esc(p.link) + '" target="_blank" rel="noopener">Watch the demo ↗</a>';
    else if (p.status === "private") acts += '<span class="btn btn-ghost" aria-disabled="true">Demo on request</span>';
    if (boxOfficeOpen) acts += '<a class="btn btn-ticket" href="' + esc(requestLink(p)) + '" target="_blank" rel="noopener">Get this platform</a>';
    else acts += '<button class="btn btn-ticket" type="button" data-closed>Get this platform</button>';
    $("#trActions").innerHTML = acts;

    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    try { history.replaceState(null, "", "#" + p.id); } catch (e) {}
  }

  function closeTrailer() {
    if (dlg.open) dlg.close();
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
  }

  $("#posters").addEventListener("click", function (e) {
    var el = e.target.closest(".poster");
    if (el) openTrailer(el.getAttribute("data-id"));
  });
  $("#trClose").addEventListener("click", closeTrailer);
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) closeTrailer(); // tap outside the screen
    if (e.target.closest("[data-closed]")) {
      $("#trNote").textContent = "The box office opens very soon. Check back in a few days to book this one.";
    }
  });
  dlg.addEventListener("cancel", function () {
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
  });

  /* ---------- studio application ---------- */
  $("#studioForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, note = $("#formNote");
    var d = { studio: f.studio.value.trim(), platform: f.platform.value.trim(), demo: f.demo.value.trim(), about: f.about.value.trim() };
    if (!d.studio || !d.platform || !d.about) { note.textContent = "Fill in your name, the platform and what it does."; return; }
    if (d.demo && !/^https?:\/\/\S+\.\S+/.test(d.demo)) { note.textContent = "The demo link should start with https://"; return; }
    if (!boxOfficeOpen) {
      note.textContent = "Studio applications open soon. Nothing was sent, so keep your details and come back.";
      return;
    }
    var msg = "Studio application\nStudio: " + d.studio + "\nPlatform: " + d.platform + "\nDemo: " + (d.demo || "none") + "\nWhat it does: " + d.about;
    var url = VT.contact.whatsapp
      ? "https://wa.me/" + VT.contact.whatsapp + "?text=" + encodeURIComponent(msg)
      : "mailto:" + VT.contact.email + "?subject=" + encodeURIComponent("Studio application: " + d.platform) + "&body=" + encodeURIComponent(msg);
    window.open(url, "_blank", "noopener");
    note.textContent = "Opening your app to send it. We review every studio by hand.";
  });

  $("#studioRoll").innerHTML = "On our screens: " + VT.studios.map(function (s) {
    return "<b>" + esc(s.name) + "</b>" + (s.verified ? " ✓" : "");
  }).join(" · ") + " · Your studio next";

  /* ---------- credits ---------- */
  var credits = [["A Vintage Tech picture", "A Platform Full of Platforms"]]
    .concat(VT.platforms.map(function (p) { return [p.genre, p.title]; }))
    .concat([["Filmed on location in", "Nairobi, Kenya"], ["Studios", VT.studios.map(function (s) { return s.name; }).join(", ")], ["Coming soon", "Your platform"]]);
  $("#creditsRoll").innerHTML = '<div class="roll">' + credits.map(function (c) {
    return "<dl><dt>" + esc(c[0]) + "</dt><dd>" + esc(c[1]) + "</dd></dl>";
  }).join("") + "</div>";
  $("#year").textContent = new Date().getFullYear();

  renderFilters();
  renderPosters();

  // deep link: vintage.odhis.co.ke/#sosick opens that trailer
  var hash = location.hash.slice(1);
  if (hash && VT.platforms.some(function (p) { return p.id === hash; })) {
    setTimeout(function () { openTrailer(hash); }, seen || calm ? 300 : 4800);
  }
})();
