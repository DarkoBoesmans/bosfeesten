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
import { huidige, naar, volgScroll } from './components/show';
import { aantal } from './lib/stemmen';

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
}

function stemKnop(knop: HTMLElement) {
  const id = knop.dataset.stem!;
  const delta = Number(knop.dataset.delta);
  stem(id, delta);
  $$(`[data-telling="${id}"]`).forEach((el) => (el.textContent = String(aantal(id))));
  const dia = knop.closest('.c-dia');
  const hoofd = $<HTMLButtonElement>('.c-dia__stem', dia ?? document);
  const terug = $<HTMLButtonElement>('.c-dia__terug', dia ?? document);
  if (!hoofd || !terug) return;
  hoofd.textContent = delta > 0 ? 'Gestemd. Geef de laptop door.' : `Stem op ${id.toUpperCase()}`;
  hoofd.disabled = delta > 0;
  terug.hidden = delta < 0;
  if (delta > 0) setTimeout(() => { hoofd.textContent = `Stem op ${id.toUpperCase()}`; hoofd.disabled = false; terug.hidden = true; }, 4000);
}

async function kopieer(tekst: string) {
  try { await navigator.clipboard.writeText(tekst); toast(`Gekopieerd: ${tekst}`); }
  catch { toast('Kopiëren lukt hier niet. Selecteer de tekst zelf.'); }
}

addEventListener('hashchange', () => { teken(); scrollTo(0, 0); inhoud.focus({ preventScroll: true }); });

document.addEventListener('click', (e) => {
  const doel = e.target as Element;
  const knop = doel.closest<HTMLElement>('[data-stem]');
  if (knop) { stemKnop(knop); return; }
  const sprong = doel.closest<HTMLElement>('[data-naar]');
  if (sprong) { naar(Number(sprong.dataset.naar)); return; }
  const stap = doel.closest<HTMLElement>('[data-stap]');
  if (stap) { naar(huidige() + Number(stap.dataset.stap)); return; }
  if (doel.closest('[data-alles]')) { $('#alle')?.scrollIntoView({ behavior: 'smooth' }); return; }
  const uitslag = doel.closest<HTMLElement>('[data-uitslag]');
  if (uitslag) {
    const aan = document.body.classList.toggle('toon-uitslag');
    uitslag.textContent = aan ? 'Verberg de stemmen' : 'Toon de stemmen';
    return;
  }
  if (doel.closest('[data-wis]')) { wis(); $$('[data-telling]').forEach((el) => (el.textContent = '0')); toast('Stemmen staan op nul.'); return; }
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
  if (location.hash.length > 1 || (e.target as Element).closest('input, textarea') || $<HTMLDialogElement>('#lightbox')?.open) return;
  if (e.key === 'ArrowRight') naar(huidige() + 1);
  if (e.key === 'ArrowLeft') naar(huidige() - 1);
});
