# Vintage Tech

The shop window for Vintage Tech, a Nairobi software studio. Live at https://odhis.co.ke

## Pages
| Path | What |
|---|---|
| `/` | Home: hero, products, Vintage Air, how buying works |
| `/products/` | The catalogue, with Ready / In build filters |
| `/products/<id>/` | One page per product: phone illustration, features, FAQ, WhatsApp quote |
| `/how/` | How buying works, three levels, honest FAQ |
| `/about/` | Who Vintage Tech is |
| `/air/` | Vintage Air, the flagship workshop (dark) |

## How to change things
Everything comes from **`tools/products.json`** (products, features, FAQs, WhatsApp, email).

```
python3 tools/build.py      # regenerates every page + assets/data.js
git add -A && git commit -m "..." && git push
```
The Vintage Air page content lives in `tools/air-body.html`. Shared look: `assets/site.css`. Small behaviours: `assets/site.js` (pages work without it).

Share images per product: `node tools/og.js <path-to-node_modules-with-puppeteer-core>` renders `tools/og/*.html` to `assets/og-<id>.jpg`.

## Rules
- Only list real products. `ready` = running for a real client. `build` = being made. Prices are quotes until set.
- Phone screens on product pages are **illustrations** and are labelled as such.
- After changing `site.css` or `site.js`, bump the numbers in `V = {...}` at the top of `tools/build.py`.
