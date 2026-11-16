import { FEEST } from '../data/feest';
import { ZIP, omvang, url } from '../data/kit';

const KAART = 'https://www.google.com/maps/search/?api=1&query=Eerste+Bochtweg+1+9308+Gijzegem';
const PORTFOLIO = 'https://darkoboesmans.github.io/';

// Elk bordje: richting, kleur, titel, kleine regel eronder, link.
const BORDEN: { kant: 'links' | 'rechts'; kleur: string; titel: string; onder: string; href: string; extra?: string }[] = [
  { kant: 'links', kleur: 'var(--creme)', titel: 'Terug naar boven', onder: '01 Kleuren', href: '#top' },
  { kant: 'rechts', kleur: 'var(--mandarijn)', titel: 'Media kit downloaden', onder: `ZIP · ${omvang(ZIP)}`, href: url(ZIP), extra: 'download' },
  { kant: 'links', kleur: 'var(--groen)', titel: 'Maak je post', onder: 'Artiest, line-up of aftellen', href: '#maker' },
  { kant: 'rechts', kleur: 'var(--creme)', titel: 'Route naar de wei', onder: 'Eerste Bochtweg 1, Gijzegem', href: KAART, extra: 'target="_blank" rel="noopener"' },
];

/** Voet: links het feest in één zin, rechts een wegwijzerpaal met vier bordjes die zachtjes in de wind bewegen. */
export const voet = (jaar: number, nummer: number) => `
  <footer class="c-voet">
    <div class="c-voet__binnen">
      <div class="c-voet__feest">
        <span class="c-voet__logo" aria-hidden="true"></span>
        <p class="c-voet__datum">${FEEST.dagen} ${jaar}</p>
        <p class="c-voet__plaats">${FEEST.adres}, ${FEEST.gemeente}<br>${nummer}ste editie van ${FEEST.organisator}</p>
      </div>
      <nav class="c-paal" aria-label="Verder">
        ${BORDEN.map((b, i) => `
        <a class="c-paal__bord c-paal__bord--${b.kant}" href="${b.href}" ${b.extra ?? ''} style="--bord:${b.kleur};--i:${i}">
          <span class="c-paal__titel">${b.titel}</span><span class="c-paal__onder">${b.onder}</span>
        </a>`).join('')}
        <span class="c-paal__grond" aria-hidden="true"></span>
      </nav>
    </div>
    <p class="c-voet__colofon">Huisstijl gekozen op 12 november 2026 door de ploeg van ${FEEST.organisator}. Logo, patroon en ontwerpen: <a href="${PORTFOLIO}">Darko Boesmans</a>. Letters: Hipstelvetica (Graphic Pear), Roboto Slab en Poppins (Google Fonts).</p>
  </footer>`;
