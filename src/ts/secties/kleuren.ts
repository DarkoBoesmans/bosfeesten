import { ROLLEN } from '../data/kleuren';
import { cmykTekst, inkt, tekstOp } from '../lib/kleur';
import { bestand } from '../components/bestand';
import { kop } from './kop';

const kopie = (t: string, label: string) => `<button type="button" class="c-band__waarde" data-kopie="${t}"><span class="c-band__label">${label}</span>${t}<span class="c-band__kopie" aria-hidden="true">Kopieer</span></button>`;

export const kleuren = () => `
  <section class="c-hoofdstuk" id="kleuren" aria-labelledby="kleuren-titel">
    <div class="o-wrap">${kop('kleuren', 1, 'Kleuren', 'Drie kleuren en crème, niet meer. Typ in drukwerk altijd de CMYK in; de hex is dezelfde kleur voor scherm en web. Klik op een waarde om ze te kopiëren.')}</div>
    <div class="c-banden">
      ${ROLLEN.map(({ kleur: k, staal, deel, gebruik }, i) => `
      <article class="c-band" style="--band:${k.hex};--band-tekst:${tekstOp(k.hex)};--i:${i}" aria-label="${k.naam}">
        <div class="c-band__kop">
          <p class="c-band__staal">Staal “${staal}”${deel ? ` · ${deel}%` : ''}</p>
          <h3 class="c-band__naam">${k.naam}</h3>
        </div>
        <p class="c-band__gebruik">${gebruik}</p>
        <div class="c-band__waarden">
          ${kopie(cmykTekst(k.cmyk), 'CMYK')}
          ${kopie(k.hex, 'Hex')}
          <p class="c-band__inkt"><span class="c-band__label">Inkt</span>${inkt(k.cmyk)}%</p>
        </div>
      </article>`).join('')}
    </div>
    <div class="o-wrap">
      <div class="c-verhouding" role="img" aria-label="Verhouding 60 procent Indigo, 30 procent Groen, 10 procent Mandarijn" data-toon>
        ${ROLLEN.filter((r) => r.deel).map(({ kleur: k, deel }) => `<span style="--deel:${deel};background:${k.hex};color:${tekstOp(k.hex)}">${deel}%<span class="c-verhouding__naam">&nbsp;${k.naam}</span></span>`).join('')}
      </div>
      <div class="c-bestanden" data-toon>
        ${bestand('kleuren/bosfeesten-2027.ase', 'Stalen voor Affinity, Illustrator en Canva')}
        ${bestand('kleuren/bosfeesten-2027-kleuren.txt', 'Alle waarden als tekst')}
      </div>
    </div>
  </section>`;
