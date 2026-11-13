import { FEEST } from '../data/feest';
import { ZIP, omvang, url } from '../data/kit';

const KAART = 'https://www.google.com/maps/search/?api=1&query=Eerste+Bochtweg+1+9308+Gijzegem';

/** Voet: een echte wegwijzerpaal met drie bordjes, en de feiten op een rij. */
export const voet = (jaar: number, nummer: number) => `
  <footer class="c-voet">
    <div class="c-voet__binnen">
      <div class="c-voet__feest">
        <span class="c-voet__logo" aria-hidden="true"></span>
        <p class="c-voet__datum">${FEEST.dagen} ${jaar}</p>
        <p class="c-voet__plaats">${FEEST.adres}, ${FEEST.gemeente}<br>${nummer}ste editie van ${FEEST.organisator}</p>
      </div>
      <nav class="c-paal" aria-label="Verder">
        <a class="c-paal__bord c-paal__bord--links" href="#top" style="--bord:var(--creme)">Terug naar boven</a>
        <a class="c-paal__bord c-paal__bord--rechts" href="${url(ZIP)}" download style="--bord:var(--mandarijn)">Media kit downloaden <small>${omvang(ZIP)}</small></a>
        <a class="c-paal__bord c-paal__bord--links" href="${KAART}" target="_blank" rel="noopener" style="--bord:var(--groen)">Route naar de wei</a>
      </nav>
    </div>
    <p class="c-voet__colofon">Huisstijl gekozen op 12 november 2026 door de ploeg van ${FEEST.organisator}. Logo, patroon en ontwerpen: ${FEEST.organisator}. Letters: Hipstelvetica (Graphic Pear), Roboto Slab en Poppins (Google Fonts).</p>
  </footer>`;
