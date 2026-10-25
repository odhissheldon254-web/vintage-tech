# Vintage Tech

A platform full of platforms. A cinema-themed marketplace of real, ready-built platforms, made in Nairobi.

Live: https://vintage.odhis.co.ke

## How it's made
Plain HTML, CSS and JavaScript. There's no build step. It's hosted free on GitHub Pages.

- `index.html`: the page
- `assets/styles.css`: the look (film grain, marquee, posters)
- `assets/app.js`: intro countdown, posters, trailers, forms
- `assets/data.js`: **everything listed on the site.** Edit this file to change listings, prices and contact.

## Rules for listings
- List only platforms that really exist. Never invent a listing, a studio or a price.
- `price: null` shows "Ask for a quote".
- While `contact.whatsapp` and `contact.email` are both `null`, the box office is closed and nothing is sent anywhere.

After editing, bump `?v=` on the script/style tags in `index.html` so phones load the new version.
