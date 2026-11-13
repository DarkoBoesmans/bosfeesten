// Bouwt dist/: de pagina als vaste HTML, TypeScript naar js/main.js, ITCSS naar css/main.css, plus assets.
import { cp, rm, writeFile, readFile } from 'node:fs/promises';
import { pagina } from './src/ts/pagina';

const SITE = 'https://darkoboesmans.github.io/bosfeesten/';
await rm('dist', { recursive: true, force: true });

for (const [entry, map] of [['src/ts/main.ts', 'dist/js'], ['src/css/main.css', 'dist/css']] as const) {
  const uit = await Bun.build({ entrypoints: [entry], outdir: map, minify: true, target: 'browser', external: ['*.woff2', '*.svg'] });
  if (!uit.success) { console.error(uit.logs); process.exit(1); }
}

const { jaar, nummer, html } = pagina();
const sjabloon = (await readFile('index.html', 'utf8')).replaceAll('{{jaar}}', String(jaar)).replaceAll('{{nummer}}', String(nummer));
await writeFile('dist/index.html', sjabloon.replace('<!--pagina-->', html));
await writeFile('dist/404.html', sjabloon.replace('<!--pagina-->', `<main id="main" class="c-niet-gevonden">
  <div class="c-niet-gevonden__kaart">
    <p class="c-niet-gevonden__code">404</p>
    <h1 class="c-niet-gevonden__titel">Verdwaald in het bos</h1>
    <p>Deze pagina bestaat niet. Volg het bordje terug naar de wei: daar staat alles van de Bosfeesten op één plek.</p>
    <a class="c-niet-gevonden__bord" href="${SITE}">Naar de media kit</a>
  </div></main>`).replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="/bosfeesten/">\n<meta name="robots" content="noindex">').replace(/<title>[^<]*<\/title>/, `<title>Verdwaald in het bos · Bosfeesten ${jaar}</title>`));
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE}</loc></url></urlset>\n`);
await cp('assets', 'dist/assets', { recursive: true });
console.log(`dist/ klaar: Bosfeesten ${jaar}, ${nummer}ste editie`);
