import { ZIP, omvang, url } from '../data/kit';
import { INDIGO, GROEN, MANDARIJN, CREME } from '../data/kleuren';

/** De hoofdstukken. De navigatie zijn wegwijzers, zoals de pijlen die naar het feest wijzen. */
export const HOOFDSTUKKEN = [
  ['kleuren', 'Kleuren', MANDARIJN],
  ['logo', 'Logo', GROEN],
  ['letters', 'Letters', CREME],
  ['patroon', 'Patroon', GROEN],
  ['drukwerk', 'Drukwerk', MANDARIJN],
  ['bonnen', 'Drankbonnen', CREME],
  ['sociaal', 'Sociale media', MANDARIJN],
  ['maker', 'Maak je post', GROEN],
  ['wettelijk', 'Regels en wet', CREME],
  ['downloads', 'Downloads', MANDARIJN],
] as const;

const pijl = ([id, label, kleur]: (typeof HOOFDSTUKKEN)[number], i: number) =>
  `<li><a class="c-wijzer__pijl" href="#${id}" style="--pijl:${kleur.hex}" data-hoofdstuk="${id}"><span class="c-wijzer__nr">${String(i + 1).padStart(2, '0')}</span>${label}</a></li>`;

export const nav = (jaar: number) => `
  <nav class="c-wijzer" id="wijzer" aria-label="Hoofdstukken">
    <div class="c-wijzer__knop-houder"><button type="button" class="c-wijzer__knop" aria-expanded="false" aria-controls="wijzer-lijst" data-menu>
      <span class="c-wijzer__knop-tekst">Inhoud</span><span class="c-wijzer__teller" data-teller>01 / ${HOOFDSTUKKEN.length}</span>
    </button></div>
    <div class="c-wijzer__paneel" id="wijzer-lijst">
      <a class="c-wijzer__merk" href="#top"><span class="c-wijzer__logo" aria-hidden="true"></span>Bosfeesten ${jaar}</a>
      <ol class="c-wijzer__lijst">${HOOFDSTUKKEN.map(pijl).join('')}</ol>
      <div class="c-wijzer__zip-houder"><a class="c-wijzer__zip" href="${url(ZIP)}" download style="--pijl:${INDIGO.hex}"><b>Alles downloaden</b><span>ZIP · ${omvang(ZIP)}</span></a></div>
    </div>
  </nav>`;
