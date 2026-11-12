import { CREME, GROEN, INDIGO, MANDARIJN } from '../data/kleuren';
import { LOGOS } from '../data/kit';
import type { Kleur } from '../types';
import { bestand } from '../components/bestand';
import { kop } from './kop';

const tegel = (voor: Kleur, achter: Kleur, mag: boolean, uitleg: string, extra = '') => `
      <figure class="c-logotegel${mag ? '' : ' c-logotegel--niet'}">
        <div class="c-logotegel__vlak" style="background:${achter.druk}">
          <span class="c-logo${extra}" style="--logo-kleur:${voor.druk}" role="img" aria-label="Logo in ${voor.naam} op ${achter.naam}"></span>
        </div>
        <figcaption><b>${mag ? 'Wel' : 'Niet'}</b> ${uitleg}</figcaption>
      </figure>`;

export const logo = () => `
  <section class="o-sectie" id="logo" aria-labelledby="logo-titel">
    ${kop('logo', 'Logo', 'Het boomlogo is altijd in één kleur. Laat rondom minstens een kwart van zijn breedte vrij, en gebruik het nooit kleiner dan 15 mm op papier of 48 px op een scherm.')}
    <div class="c-logos">
      ${tegel(CREME, INDIGO, true, 'Crème op Indigo. De standaard.')}
      ${tegel(INDIGO, CREME, true, 'Indigo op Crème, voor papier en sponsorvlakken.')}
      ${tegel(INDIGO, MANDARIJN, true, 'Indigo op Mandarijn, voor kleine badges.')}
      ${tegel(GROEN, CREME, false, 'Groen op Crème: te weinig contrast.')}
      ${tegel(CREME, INDIGO, false, 'uitgerekt, gedraaid of vervormd.', ' c-logo--uitgerekt')}
      ${tegel(MANDARIJN, GROEN, false, 'Mandarijn op Groen: de kleuren vechten.')}
    </div>
    <div class="c-bestanden">
      ${LOGOS.flatMap((l) => [bestand(l.svg, `Logo ${l.naam}`), bestand(l.png, `Logo ${l.naam}`)]).join('')}
    </div>
  </section>`;
