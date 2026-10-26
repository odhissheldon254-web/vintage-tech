#!/usr/bin/env python3
"""Builds every Vintage Tech page from tools/products.json.

    python3 tools/build.py

Edit products.json (or the words below), run this, commit, push. The generated HTML is
committed so GitHub Pages can serve it as-is, and it works even with JavaScript off.
"""
import html
import json
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "tools" / "products.json").read_text())
SITE = "https://vintage.odhis.co.ke"
V = {"css": 4, "js": 5}  # bump when site.css / site.js change, so phones fetch the new files
STATUS = {"ready": "Ready", "build": "In build", "soon": "Coming soon"}
WA = DATA["contact"]["whatsapp"]
EMAIL = DATA["contact"]["email"]
e = lambda s: html.escape(str(s), quote=True)


def wa(msg):
    return f"https://wa.me/{WA}?text={quote('Hi Vintage Tech, ' + msg)}"


def cta_label(p):
    return "Get a quote" if p["status"] == "ready" else "Join the waitlist"


def cta_msg(p):
    return f"I'd like a quote for {p['name']}." if p["status"] == "ready" else f"please add me to the waitlist for {p['name']}."


LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><path class="v" d="M14 16 L32 50 L50 16"/><circle class="d" cx="50" cy="50" r="5"/></svg>'


# ------------------------------------------------------------------ shell
def page(path, title, desc, body, active="", og="og.jpg", air=False, extra_head=""):
    depth = path.count("/") - (1 if path.endswith("/") else 0)
    up = "../" * depth if depth else ""
    canon = SITE + "/" + path.lstrip("/").replace("index.html", "")
    theme = "#0a0b0d" if air else "#f5f4ef"
    links = [("products/", "Products", "products"), ("air/", "Vintage Air", "air"), ("how/", "How it works", "how"), ("about/", "About", "about")]
    nav = "".join(f'<a href="{up}{h}"{" aria-current=\"page\"" if k == active else ""}>{t}</a>' for h, t, k in links)
    brand = '<b>vintage <span>air</span></b>' if air else '<b>vintage <span>tech</span></b>'
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{e(title)}</title>
  <meta name="description" content="{e(desc)}">
  <meta name="theme-color" content="{theme}">
  <link rel="canonical" href="{canon}">
  <meta property="og:title" content="{e(title)}">
  <meta property="og:description" content="{e(desc)}">
  <meta property="og:url" content="{canon}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="{SITE}/assets/{og}?v=4">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="{up}favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="{up}manifest.webmanifest">
  <link rel="apple-touch-icon" href="{up}assets/icon-192.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>document.documentElement.classList.add("js")</script>
  <link rel="stylesheet" href="{up}assets/site.css?v={V['css']}">{extra_head}
</head>
<body{' class="air"' if air else ''}>
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav" id="nav">
    <div class="wrap">
      <a class="logo" href="{up or './'}" aria-label="Vintage Tech home">{LOGO}{brand}</a>
      <nav class="nav-links" id="navLinks" aria-label="Main">{nav}<a class="m-only" href="{wa("I'd like to talk about a platform for my business.")}" target="_blank" rel="noopener">Get a quote on WhatsApp →</a></nav>
      <a class="btn nav-cta" href="{wa("I'd like to talk about a platform for my business.")}" target="_blank" rel="noopener">Get a quote</a>
      <button class="menu" id="menuBtn" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="Menu"><span></span><span></span></button>
    </div>
  </header>
  <main id="main">
{body}
  </main>
{band(up, air)}
  <footer class="foot">
    <div class="wrap">
      <a class="logo" href="{up or './'}">{LOGO}<b>vintage <span>tech</span></b></a>
      <a href="{up}products/">Products</a><a href="{up}air/">Vintage Air</a><a href="{up}how/">How it works</a><a href="{up}about/">About</a><a href="{up}privacy.html">Privacy</a>
      <span>© <span data-year>2026</span> Vintage Tech · Nairobi</span>
    </div>
  </footer>
  <script src="{up}assets/site.js?v={V['js']}" defer></script>
</body>
</html>
"""


def band(up, air):
    return f"""  <section class="band{' dark' if air else ''}">
    <div class="wrap band-in rv">
      <div>
        <p class="kicker">Let's talk</p>
        <h2>Tell us about your business.</h2>
        <p>One WhatsApp conversation is enough to know which product fits and what it would cost.</p>
      </div>
      <div class="band-cta">
        <a class="btn lime big" href="{wa("I'd like to talk about a platform for my business.")}" target="_blank" rel="noopener">Chat on WhatsApp <span class="arr">→</span></a>
        <p class="mono small">+{WA[:3]} {WA[3:6]} {WA[6:9]} {WA[9:]} · <a href="mailto:{e(EMAIL)}">{e(EMAIL)}</a></p>
      </div>
    </div>
  </section>"""


# ------------------------------------------------------------------ drawn phone mock-ups (illustrations)
def phone(p, screen):
    return f"""<div class="phone" style="--a:{p['accent']}" role="img" aria-label="Illustration of {e(p['name'])} on a phone">
  <div class="phone-notch"></div>
  <div class="screen">{screen}</div>
</div>"""


MOCKS = {
    "duka": """<div class="s-top"><b>Duka</b><span>🛒 2</span></div>
<div class="s-hero">New in: <b>denim jackets</b></div>
<div class="s-grid">
  <div class="s-item"><i style="background:#ffd1df"></i><b>Denim jacket</b><span>KES 1,200</span></div>
  <div class="s-item"><i style="background:#d6e4ff"></i><b>Cargo pants</b><span>KES 950</span></div>
  <div class="s-item"><i style="background:#ffe9b8"></i><b>Hoodie</b><span>KES 1,500</span></div>
  <div class="s-item"><i style="background:#d8f5e1"></i><b>Sneakers</b><span>KES 2,800</span></div>
</div>
<div class="s-plug">✓ Verified seller · 5 checks</div>
<div class="s-btn">Deliver to Westlands →</div>""",
    "office": """<div class="s-top"><b>Today</b><span>Tue</span></div>
<div class="s-card hot"><small>10:00 · in 15 min</small><b>Meeting · Wanjiru K.</b><span>Life cover review</span></div>
<div class="s-card"><small>13:30</small><b>Call · Otieno M.</b><span>Send education quote</span></div>
<div class="s-card"><small>16:00</small><b>Visit · Akinyi S.</b><span>Sign medical form</span></div>
<div class="s-todo">☐ Follow up 3 quotes</div>
<div class="s-voice"><span class="mic">●</span> “meeting na Baraka kesho saa nne”</div>""",
    "campus": """<div class="s-top"><b>Free now</b><span>11:00</span></div>
<div class="rooms">
  <span class="r free">LH 1</span><span class="r">LH 2</span><span class="r free">C 101</span>
  <span class="r">C 102</span><span class="r free">P 204</span><span class="r">P 205</span>
  <span class="r">G 14</span><span class="r free">G 16</span><span class="r free">M 03</span>
</div>
<div class="s-card"><small>C 101 · seats 80</small><b>Free until 13:00</b><span>Next: SCH 201</span></div>
<div class="s-btn">Check in to C 101</div>""",
    "remember": """<div class="s-top wa"><b>Mama Njeri Salon</b><span>business</span></div>
<div class="chat">
  <p class="day">Today</p>
  <p class="msg out">Happy birthday, Achieng! 🎂 Wishing you a beautiful year. Your next braid is 20% off this week. Mama Njeri Salon<small>08:00 ✓✓</small></p>
  <p class="msg in">Asante sana! 😍 I'll come Saturday<small>08:14</small></p>
</div>
<div class="s-sent">✓ 3 wishes sent this morning</div>""",
}


# ------------------------------------------------------------------ pieces
def prod_card(p, up, big=False):
    feats = "".join(f"<li>{e(f[0])}</li>" for f in p["features"][:4])
    proof = f'<a href="{e(p["proof"]["url"])}" target="_blank" rel="noopener">{e(p["proof"]["label"])} ↗</a>' if p["proof"]["url"] else e(p["proof"]["label"])
    return f"""<article class="prod rv" data-status="{p['status']}" style="--a:{p['accent']}">
  <a class="prod-link" href="{up}products/{p['id']}/" aria-label="{e(p['name'])}: details"></a>
  <div class="prod-top"><span class="prod-ic">{e(p['name'][0])}</span><span class="chip {p['status']}">{STATUS[p['status']]}</span></div>
  <h3>{e(p['name'])}</h3><p class="line">{e(p['line'])}</p><p class="for">For: {e(p['for'])}</p>
  <ul>{feats}</ul>
  <div class="prod-foot"><span class="price"><small>Price</small>Quote</span><span class="more">Details <span class="arr">→</span></span></div>
  <p class="proofline">{proof}</p>
</article>"""


def stack_html():
    p = DATA["products"][:3]
    cls = ["c1", "c2", "c3"]
    cards = "".join(f'<div class="card {c}"><i style="background:{x["accent"]}"></i><b>{e(x["name"])}</b><span>{e(x["line"])}</span><em>{STATUS[x["status"]]}</em></div>' for x, c in zip(p, cls))
    return cards + '<div class="card air"><i style="background:#c8ff2e"></i><b>Vintage Air</b><span>The workshop we build it all in.</span><em>Flagship</em></div>'


AIR_MOCK = '<div data-mock></div>'


# ------------------------------------------------------------------ pages
def home():
    live = [p for p in DATA["products"] if p["status"] == "ready" and p["proof"]["url"]]
    proof = "".join(f'<a href="{e(p["proof"]["url"])}" target="_blank" rel="noopener"><span class="dot"></span>{e(p["name"])} · {e(p["proof"]["label"])} ↗</a>' for p in live)
    cards = "".join(prod_card(p, "") for p in DATA["products"])
    body = f"""    <section class="hero">
      <div class="wrap">
        <div>
          <p class="kicker">Software studio · Nairobi, Kenya</p>
          <h1>Software that runs <span class="serif">real</span> <span class="hl">businesses.</span></h1>
          <p class="lede">Vintage Tech builds ready-made platforms: online shops that deliver, private offices for agents, campus boards and WhatsApp bots. Pick one, and we fit it to how your business already works.</p>
          <div class="cta">
            <a class="btn" href="products/">See the products <span class="arr">→</span></a>
            <a class="btn line" href="air/">Meet Vintage Air</a>
          </div>
          <p class="hero-meta"><span><b>{len(live)}</b> products live for real clients</span><span><b>WhatsApp</b>-first</span><span>Built in <b>Nairobi</b></span></p>
        </div>
        <div class="stack" aria-hidden="true">{stack_html()}</div>
      </div>
    </section>
    <div class="proof"><div class="wrap"><span>Running right now:</span>{proof}</div></div>
    <section class="sec">
      <div class="wrap">
        <div class="sec-head rv">
          <div><p class="kicker">What we make</p><h2>Products you can own.</h2></div>
          <p><b>Ready</b> means it already runs for a real client, so yours is mostly setup. <b>In build</b> means it's being made now. Tap any product for the full story.</p>
        </div>
        <div class="products">{cards}</div>
        <p class="center rv"><a class="btn line" href="products/">Compare all products <span class="arr">→</span></a></p>
      </div>
    </section>
    <section class="airblock rv">
      <div class="inner">
        <div>
          <p class="kicker">Flagship · Vintage Air</p>
          <h2>The workshop where we <span class="a">build it all.</span></h2>
          <p>Vintage Air is our own workspace: sealed Ubuntu and Kali boxes, real terminals in the browser, save points and a memory guard, all on an ordinary 8 GB laptop.</p>
          <ul class="ticks"><li>Test anything without touching your main system</li><li>Rewind any box to a save point in seconds</li><li>Built for everyday laptops and expensive data</li></ul>
          <a class="btn lime" href="air/">Explore Vintage Air <span class="arr">→</span></a>
        </div>
        {AIR_MOCK}
      </div>
    </section>
    <section class="sec">
      <div class="wrap">
        <div class="sec-head rv">
          <div><p class="kicker">How buying works</p><h2>Three steps. <span class="serif">No surprises.</span></h2></div>
          <p>You talk to the person who builds it. You own your address and your data. <a href="how/">The full details →</a></p>
        </div>
        {steps()}
      </div>
    </section>"""
    return page("index.html", "Vintage Tech — Software that runs real businesses",
                "Vintage Tech is a Nairobi software studio: ready-built online shops, agent offices, campus boards and WhatsApp bots, plus Vintage Air, the workshop we build them in.", body)


def steps():
    return """<ol class="steps rv">
          <li class="step"><h3>Pick a product</h3><p>Open a live demo where there is one, and tell us what your business does today.</p></li>
          <li class="step"><h3>We make it yours</h3><p>Your name, colours, prices and rules. It fits how you already work, so nobody has to change for the software.</p></li>
          <li class="step"><h3>Go live</h3><p>On your own address. Fixes and new features continue after launch, and M-PESA can be added where you need it.</p></li>
        </ol>"""


def products_page():
    cards = "".join(prod_card(p, "../") for p in DATA["products"])
    counts = {k: sum(1 for p in DATA["products"] if p["status"] == k) for k in STATUS}
    chips = '<button class="fchip" data-f="all" aria-pressed="true">All <span>' + str(len(DATA["products"])) + "</span></button>" + "".join(
        f'<button class="fchip" data-f="{k}" aria-pressed="false">{v} <span>{counts[k]}</span></button>' for k, v in STATUS.items() if counts[k])
    body = f"""    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">The catalogue</p>
        <h1>Products you can <span class="serif">own.</span></h1>
        <p class="lede">Every product is built from an engine that already runs somewhere real. Pick one, and we make it yours.</p>
        <div class="filters" role="group" aria-label="Filter products">{chips}</div>
      </div>
    </section>
    <section class="sec tight">
      <div class="wrap"><div class="products" id="catalogue">{cards}</div></div>
    </section>
    <section class="sec tight">
      <div class="wrap">
        <div class="legend-box rv">
          <div><span class="chip ready">Ready</span><p>Already running for a real client. Yours is mostly setup and branding.</p></div>
          <div><span class="chip build">In build</span><p>Being made now. Join the waitlist to be first, or to shape it.</p></div>
          <div><span class="chip">Quote</span><p>Every business is different, so you get a clear price before any work starts.</p></div>
        </div>
      </div>
    </section>"""
    return page("products/index.html", "Products — Vintage Tech",
                "Duka, The Office, Campus Board and Remember: ready-built platforms from Vintage Tech, Nairobi.", body, active="products")


def product_page(p):
    others = [x for x in DATA["products"] if x["id"] != p["id"]]
    feats = "".join(f'<div class="feat-i rv"><b>{e(t)}</b><p>{e(d)}</p></div>' for t, d in p["features"])
    faq = "".join(f"<details class=\"rv\"><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in p["faq"])
    proof = (f'<a class="btn line" href="{e(p["proof"]["url"])}" target="_blank" rel="noopener">See it live ↗</a>' if p["proof"]["url"] else "")
    other_cards = "".join(f'<a class="mini rv" href="../{x["id"]}/" style="--a:{x["accent"]}"><span class="prod-ic">{e(x["name"][0])}</span><span><b>{e(x["name"])}</b><small>{e(x["line"])}</small></span><span class="chip {x["status"]}">{STATUS[x["status"]]}</span></a>' for x in others)
    body = f"""    <section class="p-hero" style="--a:{p['accent']}">
      <div class="wrap p-hero-in">
        <div>
          <a class="crumb" href="../">← All products</a>
          <div class="p-title"><span class="prod-ic big">{e(p['name'][0])}</span><span class="chip {p['status']}">{STATUS[p['status']]}</span></div>
          <h1>{e(p['name'])}</h1>
          <p class="p-line">{e(p['line'])}</p>
          <p class="lede">{e(p['pitch'])}</p>
          <div class="cta">
            <a class="btn" href="{wa(cta_msg(p))}" target="_blank" rel="noopener">{cta_label(p)} on WhatsApp <span class="arr">→</span></a>
            {proof}
          </div>
          <p class="hero-meta"><span>For: <b>{e(p['for'])}</b></span></p>
        </div>
        <div class="p-visual">{phone(p, MOCKS[p['id']])}<p class="caption mono">Illustration · {e(p['proof']['note'])}</p></div>
      </div>
    </section>
    <section class="sec">
      <div class="wrap">
        <div class="sec-head rv"><div><p class="kicker">What you get</p><h2>Everything in {e(p['name'])}.</h2></div><p>The same engine that's {('running for a real client today' if p['status'] == 'ready' else 'being built right now')}, fitted to your business.</p></div>
        <div class="feat-grid" style="--a:{p['accent']}">{feats}</div>
      </div>
    </section>
    <section class="sec tight">
      <div class="wrap two">
        <div class="rv"><p class="kicker">Questions</p><h2 class="h2">Good to know.</h2><p class="muted">Anything else? Ask on WhatsApp. A real person answers.</p></div>
        <div class="faq">{faq}</div>
      </div>
    </section>
    <section class="sec tight">
      <div class="wrap">
        <p class="kicker rv">Also from Vintage Tech</p>
        <div class="minis">{other_cards}</div>
      </div>
    </section>"""
    return page(f"products/{p['id']}/index.html", f"{p['name']} — {p['line']} · Vintage Tech",
                f"{p['name']} by Vintage Tech: {p['pitch']}", body, active="products", og=f"og-{p['id']}.jpg")


def how_page():
    faq = [
        ("How much does it cost?", "Every price is a quote, because every business is different. You get a clear number, and what it includes, before any work starts."),
        ("How do I pay?", "We agree the price and the payment steps together before work begins. M-PESA is fine."),
        ("Who owns the site and the data?", "You do. Your address, your content and your customers' data are yours. We set things up in your name wherever we can."),
        ("How long does it take?", "A Ready product is mostly setup and branding, so it's quick. Custom work takes longer. Your quote includes a date."),
        ("What happens after launch?", "Fixes and small changes continue. New features are quoted separately, so there are no surprise bills."),
        ("Is my customers' data safe?", "Data is locked to your account, and we follow Kenya's Data Protection Act, 2019. We never sell or share it."),
    ]
    faq_html = "".join(f"<details class=\"rv\"><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in faq)
    body = f"""    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">How it works</p>
        <h1>Simple to buy. <span class="serif">Yours to keep.</span></h1>
        <p class="lede">No jargon and no surprise bills. You talk to the person who builds it, from the first message to launch day and after.</p>
      </div>
    </section>
    <section class="sec tight"><div class="wrap">{steps()}</div></section>
    <section class="sec tight">
      <div class="wrap">
        <div class="sec-head rv"><div><p class="kicker">Three ways to buy</p><h2>Pick your level.</h2></div><p>Most businesses start with Starter and grow into Custom.</p></div>
        <div class="tiers big rv">
          <div class="tier"><span class="t-n">01</span><b>Starter</b><span>The product as it is, with your name, colours and content. Fastest to launch.</span><ul><li>Your branding</li><li>Your content and prices</li><li>Launch support</li></ul></div>
          <div class="tier hi"><span class="t-n">02</span><b>Custom</b><span>Shaped around how your business really works.</span><ul><li>Everything in Starter</li><li>Your workflow, fees and team</li><li>Extra features you need</li></ul></div>
          <div class="tier"><span class="t-n">03</span><b>Full build</b><span>Something new, built from our engines for you alone.</span><ul><li>A product made for you</li><li>Your own server if needed</li><li>M-PESA and integrations</li></ul></div>
        </div>
      </div>
    </section>
    <section class="sec tight">
      <div class="wrap two">
        <div class="rv"><p class="kicker">Questions</p><h2 class="h2">The honest answers.</h2></div>
        <div class="faq">{faq_html}</div>
      </div>
    </section>"""
    return page("how/index.html", "How it works — Vintage Tech", "How buying from Vintage Tech works: three steps, three levels, and honest answers about price, ownership and support.", body, active="how")


def about_page():
    body = """    <section class="page-hero">
      <div class="wrap narrow">
        <p class="kicker">About</p>
        <h1>A Nairobi studio that ships <span class="serif">real</span> software.</h1>
        <p class="lede">Vintage Tech builds platforms for the way Kenyan businesses actually work: on phones, over WhatsApp, with data bundles that run out. Every product starts as something built for a real client, then becomes a product others can own.</p>
      </div>
    </section>
    <section class="sec tight">
      <div class="wrap">
        <div class="principles">
          <div class="pr rv"><span class="mono">01</span><h3>Real before shiny</h3><p>We only sell what works. "Ready" means it runs for a real client today. Everything else is honestly marked "In build".</p></div>
          <div class="pr rv"><span class="mono">02</span><h3>You own it</h3><p>Your address, your content, your customers. We set things up in your name, and your data is never sold.</p></div>
          <div class="pr rv"><span class="mono">03</span><h3>Built for here</h3><p>Phone-first, WhatsApp-first, light on data. Made for Nairobi streets and campus Wi-Fi, not Silicon Valley.</p></div>
          <div class="pr rv"><span class="mono">04</span><h3>One person you can reach</h3><p>You talk to whoever builds it, on WhatsApp, before and after launch.</p></div>
        </div>
      </div>
    </section>
    <section class="sec tight">
      <div class="wrap two">
        <div class="rv"><p class="kicker">How we build</p><h2 class="h2">In our own workshop.</h2></div>
        <div class="rv"><p class="lede-sm">Everything is made in <a href="../air/">Vintage Air</a>, the workspace we built for ourselves: sealed test systems, save points and a calm screen for focus. It lets us try things safely and ship faster, on an ordinary laptop.</p>
        <p class="lede-sm">See what we've shipped: <a href="https://sosick.odhis.co.ke" target="_blank" rel="noopener">Sosick ↗</a> and <a href="https://agiza.odhis.co.ke" target="_blank" rel="noopener">Agiza ↗</a>, both live in Nairobi.</p></div>
      </div>
    </section>"""
    return page("about/index.html", "About — Vintage Tech", "Vintage Tech is a Nairobi software studio building phone-first, WhatsApp-first platforms for real businesses.", body, active="about")


def air_page():
    src = (ROOT / "tools" / "air-body.html").read_text()
    return page("air/index.html", "Vintage Air — The workshop for builders",
                "Vintage Air by Vintage Tech: sealed Ubuntu and Kali boxes, real terminals in your browser, save points and a memory guard. Made for everyday 8 GB laptops.",
                src, active="air", og="og-air.jpg", air=True)


def write(rel, text):
    f = ROOT / rel
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(text)
    print("built", rel)


if __name__ == "__main__":
    write("index.html", home())
    write("products/index.html", products_page())
    for p in DATA["products"]:
        write(f"products/{p['id']}/index.html", product_page(p))
    write("how/index.html", how_page())
    write("about/index.html", about_page())
    write("air/index.html", air_page())
    # the small file the browser reads (contact only; pages already have the links baked in)
    write("assets/data.js", "/* Generated by tools/build.py from tools/products.json. Do not edit by hand. */\nwindow.VT = " +
          json.dumps({"contact": DATA["contact"]}, indent=2) + ";\n")


# ------------------------------------------------------------------ share-image templates (rendered by tools/og.js)
def og_template(p):
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/site.css">
<style>
  html,body{{margin:0;width:1200px;height:630px;overflow:hidden;background:#f5f4ef;color:#0d0e10}}
  .og{{position:relative;width:1200px;height:630px;padding:70px 76px;box-sizing:border-box;--a:{p['accent']}}}
  .og::before{{content:"";position:absolute;right:-120px;top:-160px;width:820px;height:820px;background:radial-gradient(closest-side,color-mix(in srgb,var(--a) 30%,transparent),transparent 70%)}}
  .og .logo{{position:relative;color:#0d0e10}} .og .logo svg{{width:40px;height:40px}} .og .logo b{{font-size:28px}}
  .og h1{{position:relative;margin:70px 0 0;font:600 128px/.9 "Space Grotesk";letter-spacing:-.055em}}
  .og .l{{position:relative;margin:16px 0 0;width:560px;font:400 46px/1.1 "Instrument Serif";font-style:italic;color:#2a2d33}}
  .og .meta{{position:absolute;left:76px;bottom:64px;display:flex;gap:14px;align-items:center;font:500 20px/1 "JetBrains Mono";color:#62676f}}
  .og .chip{{font-size:16px;padding:8px 14px}}
  .og .p-visual{{position:absolute;right:96px;top:40px}} .og .phone{{width:270px;transform:rotate(-6deg)}}
</style></head><body><div class="og">
<span class="logo">{LOGO}<b>vintage <span>tech</span></b></span>
<h1>{e(p['name'])}</h1><p class="l">{e(p['line'])}</p>
<div class="meta"><span class="chip {p['status']}">{STATUS[p['status']]}</span><span>vintage.odhis.co.ke/products/{p['id']}</span></div>
<div class="p-visual">{phone(p, MOCKS[p['id']])}</div>
</div></body></html>"""


if __name__ == "__main__":
    for p in DATA["products"]:
        write(f"tools/og/{p['id']}.html", og_template(p))
