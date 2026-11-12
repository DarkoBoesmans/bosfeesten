// Router (#a, #b, #c) en klikgedrag. Alles wordt als HTML-tekst opgebouwd: KISS, geen framework.
import { COMBOS } from './data/combos';
import { AFFICHE, VOORBEELDEN } from './data/werken';
import { $, $$ } from './lib/dom';
import { editie } from './lib/jaar';
import { wis } from './lib/stemmen';
import { herkleur } from './render/herkleur';
import { overzicht } from './views/overzicht';
import { huisstijl } from './views/huisstijl';
import { toast } from './components/toast';
import { lightboxMarkup, openLightbox, sluitLightbox } from './components/lightbox';
import { hoofdknop, huidige, naar, volgScroll } from './components/show';
import { ongedaan, stemOp, toonRonde, volgende } from './components/ronde';

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
  volgScroll();
  toonRonde();
}

async function kopieer(tekst: string) {
  try { await navigator.clipboard.writeText(tekst); toast(`Gekopieerd: ${tekst}`); }
  catch { toast('Kopiëren lukt hier niet. Selecteer de tekst zelf.'); }
}

addEventListener('hashchange', () => { teken(); scrollTo(0, 0); inhoud.focus({ preventScroll: true }); });

document.addEventListener('click', (e) => {
  const doel = e.target as Element;
  const knop = doel.closest<HTMLElement>('[data-stem]');
  if (knop) { stemOp(knop.dataset.stem!); hoofdknop(huidige())?.focus(); return; }
  if (doel.closest('[data-ongedaan]')) { ongedaan(); hoofdknop(huidige())?.focus(); return; }
  if (doel.closest('[data-volgende]')) { volgende(); naar(0, true); return; }
  const sprong = doel.closest<HTMLElement>('[data-naar]');
  if (sprong) { naar(Number(sprong.dataset.naar), true); return; }
  const stap = doel.closest<HTMLElement>('[data-stap]');
  if (stap) { naar(huidige() + Number(stap.dataset.stap)); return; }
  if (doel.closest('[data-alles]')) { $('#alle')?.scrollIntoView({ behavior: 'smooth' }); return; }
  const uitslag = doel.closest<HTMLElement>('[data-uitslag]');
  if (uitslag) {
    const aan = document.body.classList.toggle('toon-uitslag');
    uitslag.textContent = aan ? 'Verberg de stemmen' : 'Toon de stemmen';
    return;
  }
  if (doel.closest('[data-wis]')) { wis(); volgende(); toast('Stemmen staan op nul.'); return; }
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

document.addEventListener('keydown', (e) => {
  if (location.hash.length > 1 || e.altKey || e.ctrlKey || e.metaKey || $<HTMLDialogElement>('#lightbox')?.open) return;
  const binnen = !!(document.activeElement && document.activeElement.closest('.c-show'));
  const naarMet = (i: number) => { e.preventDefault(); naar(i, binnen || document.activeElement === document.body); };
  if (e.key === 'ArrowRight') naarMet(huidige() + 1);
  else if (e.key === 'ArrowLeft') naarMet(huidige() - 1);
  else {
    const i = COMBOS.findIndex((c) => c.id === e.key.toLowerCase());
    if (i >= 0) naarMet(i);
  }
});
