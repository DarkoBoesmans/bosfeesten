// Router (#a, #b, #c) en klikgedrag. Alles wordt als HTML-tekst opgebouwd: KISS, geen framework.
import { COMBOS } from './data/combos';
import { AFFICHE, VOORBEELDEN } from './data/werken';
import { $, $$ } from './lib/dom';
import { editie } from './lib/jaar';
import { stem, wis } from './lib/stemmen';
import { herkleur } from './render/herkleur';
import { overzicht } from './views/overzicht';
import { huisstijl } from './views/huisstijl';
import { toast } from './components/toast';
import { lightboxMarkup, openLightbox, sluitLightbox } from './components/lightbox';

const inhoud = $('#inhoud')!;
const jaar = editie();
const WERKEN = new Map([AFFICHE, ...VOORBEELDEN].map((w) => [w.naam, w]));

function teken() {
  const combo = COMBOS.find((c) => c.id === location.hash.slice(1));
  inhoud.innerHTML = (combo ? huisstijl(combo, jaar) : overzicht(jaar)) + lightboxMarkup();
  document.title = combo ? `Combo ${combo.id.toUpperCase()} · ${combo.naam} · Bosfeesten ${jaar}` : `Bosfeesten ${jaar} Kleurkeuze`;
  for (const cv of $$<HTMLCanvasElement>('canvas[data-werk]', inhoud)) {
    const c = COMBOS.find((x) => x.id === cv.dataset.combo)!;
    herkleur(cv, WERKEN.get(cv.dataset.werk!)!, c.kleuren).catch((e: Error) => toast(e.message));
  }
}

async function kopieer(tekst: string) {
  try { await navigator.clipboard.writeText(tekst); toast(`Gekopieerd: ${tekst}`); }
  catch { toast('Kopiëren lukt hier niet. Selecteer de tekst zelf.'); }
}

addEventListener('hashchange', () => { teken(); scrollTo(0, 0); inhoud.focus({ preventScroll: true }); });

document.addEventListener('click', (e) => {
  const doel = e.target as Element;
  const knop = doel.closest<HTMLElement>('[data-stem]');
  if (knop) {
    stem(knop.dataset.stem!, Number(knop.dataset.delta));
    const y = scrollY;
    teken(); scrollTo(0, y);
    $(`[data-stem="${knop.dataset.stem}"][data-delta="${knop.dataset.delta}"]`)?.focus();
    return;
  }
  if (doel.closest('[data-wis]')) { wis(); teken(); toast('Stemmen staan op nul.'); return; }
  const groot = doel.closest<HTMLElement>('[data-groot]');
  if (groot) { openLightbox(groot.dataset.groot!, groot.dataset.alt ?? ''); return; }
  const vergroot = doel.closest<HTMLElement>('[data-vergroot]');
  if (vergroot) {
    const cv = $<HTMLCanvasElement>('canvas', vergroot);
    if (cv) openLightbox(cv.toDataURL('image/jpeg', 0.92), cv.getAttribute('aria-label') ?? '');
    return;
  }
  const kopie = doel.closest<HTMLElement>('[data-kopie]');
  if (kopie) { kopieer(kopie.dataset.kopie!); return; }
  sluitLightbox(e);
});

teken();
