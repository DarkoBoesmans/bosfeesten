// Bouwt dist/: TypeScript naar js/main.js, ITCSS naar css/main.css, en kopieert html en assets.
import { cp, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });

for (const [entry, map] of [['src/ts/main.ts', 'dist/js'], ['src/css/main.css', 'dist/css']] as const) {
  const uit = await Bun.build({ entrypoints: [entry], outdir: map, minify: true, target: 'browser', external: ['*.woff2', '*.svg'] });
  if (!uit.success) { console.error(uit.logs); process.exit(1); }
}

await cp('index.html', 'dist/index.html');
await cp('assets', 'dist/assets', { recursive: true, filter: (p) => !p.endsWith('maten.json') });
console.log('dist/ klaar');
