import { CREME, GROEN, INDIGO, MANDARIJN } from '../data/kleuren';
import { LOGOS } from '../data/kit';
import { bestand } from '../components/bestand';
import { kop } from './kop';

const KEUZES = [INDIGO, GROEN, MANDARIJN, CREME];
const staal = (rol: 'voor' | 'achter', k: (typeof KEUZES)[number], aan: boolean) =>
  `<button type="button" class="c-proef__staal" style="--staal:${k.hex}" data-proef="${rol}" data-hex="${k.hex}" data-naam="${k.naam}" aria-pressed="${aan}">${k.naam}</button>`;

export const logo = () => `
  <section class="c-hoofdstuk o-wrap" id="logo" aria-labelledby="logo-titel">
    ${kop('logo', 2, 'Logo', 'De boom in de cirkel. Altijd in één kleur, met rondom minstens een kwart van zijn breedte vrij. Nooit kleiner dan 15 mm op papier of 48 px op een scherm. Probeer hieronder welke combinaties werken.')}
    <div class="c-proef" data-toon>
      <div class="c-proef__vlak" style="--proef-achter:${INDIGO.hex};--proef-voor:${CREME.hex}" data-proef-vlak>
        <span class="c-logo" role="img" aria-label="Bosfeesten-logo"></span>
        <p class="c-proef__oordeel" role="status" data-proef-oordeel>Crème op Indigo. De standaard.</p>
      </div>
      <div class="c-proef__keuze">
        <fieldset class="c-proef__rij"><legend>Logo</legend>${KEUZES.map((k) => staal('voor', k, k === CREME)).join('')}</fieldset>
        <fieldset class="c-proef__rij"><legend>Achtergrond</legend>${KEUZES.map((k) => staal('achter', k, k === INDIGO)).join('')}</fieldset>
        <ul class="c-lijst c-lijst--klein">
          <li>Gebruik het logo nooit uitgerekt, gedraaid, met een schaduw of met een rand.</li>
          <li>In het woordmerk staat de boom in de O van BOS.</li>
        </ul>
      </div>
    </div>
    <div class="c-bestanden" data-toon>
      ${LOGOS.flatMap((l) => [bestand(l.svg, `Logo ${l.naam}`), bestand(l.png, `Logo ${l.naam}`)]).join('')}
    </div>
  </section>`;
