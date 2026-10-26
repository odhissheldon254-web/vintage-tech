// Renders tools/og/*.html to assets/og-<id>.jpg.  Needs puppeteer-core + Chrome:
//   node tools/og.js /path/to/node_modules
const path = require('path'), fs = require('fs');
const p = require(path.join(process.argv[2], 'puppeteer-core'));
(async () => {
  const b = await p.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', args: ['--no-sandbox'] });
  const pg = await b.newPage(); await pg.setViewport({ width: 1200, height: 630 });
  for (const f of fs.readdirSync(path.join(__dirname, 'og'))) {
    await pg.goto('file://' + path.join(__dirname, 'og', f), { waitUntil: 'load', timeout: 90000 });
    await pg.evaluate(() => document.fonts.ready);
    const out = path.join(__dirname, '..', 'assets', 'og-' + f.replace('.html', '.jpg'));
    await pg.screenshot({ path: out, type: 'jpeg', quality: 86 }); console.log('rendered', path.basename(out));
  }
  await b.close();
})();
