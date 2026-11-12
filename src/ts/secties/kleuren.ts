import { ROLLEN } from '../data/kleuren';
import { cmykTekst, inkt, tekstOp } from '../lib/kleur';
import { bestand } from '../components/bestand';
import { kop } from './kop';

const kopie = (t: string) => `<button type="button" class="c-kopie" data-kopie="${t}" aria-label="Kopieer ${t}">${t}</button>`;

export const kleuren = () => `
  <section class="o-sectie" id="kleuren" aria-labelledby="kleuren-titel">
    ${kop('kleuren', 'Kleuren', 'Drie kleuren en crème. Gebruik in drukwerk altijd de CMYK-waarden; de schermversie is feller en bedoeld voor de website en sociale media. Klik op een waarde om ze te kopiëren.')}
    <div class="c-kleuren">
      ${ROLLEN.map(({ kleur: k, rol, deel, gebruik }) => `
      <article class="c-kleur">
        <div class="c-kleur__vlak" style="background:${k.druk};color:${tekstOp(k.druk)}">
          <span class="c-kleur__rol">${rol}${deel ? ` · ${deel}%` : ''}</span>
          <span class="c-kleur__naam">${k.naam}</span>
          <span class="c-kleur__scherm" style="background:${k.scherm};color:${tekstOp(k.scherm)}">Scherm</span>
        </div>
        <dl class="c-kleur__waarden">
          <div><dt>CMYK</dt><dd>${kopie(cmykTekst(k.cmyk))}</dd></div>
          <div><dt>Hex druk</dt><dd>${kopie(k.druk)}</dd></div>
          <div><dt>Hex scherm</dt><dd>${kopie(k.scherm)}</dd></div>
          <div><dt>Inkt</dt><dd>${inkt(k.cmyk)}%</dd></div>
        </dl>
        <p class="c-kleur__gebruik">${gebruik}</p>
      </article>`).join('')}
    </div>
    <div class="c-verhouding" role="img" aria-label="Verhouding: 60 procent Indigo, 30 procent Groen, 10 procent Mandarijn">
      ${ROLLEN.filter((r) => r.deel).map(({ kleur: k, deel }) => `<span style="flex:${deel};background:${k.druk};color:${tekstOp(k.druk)}">${deel}%</span>`).join('')}
    </div>
    <div class="c-bestanden">
      ${bestand('kleuren/bosfeesten-2027.ase', 'Stalen importeren')}
      ${bestand('kleuren/bosfeesten-2027-kleuren.txt', 'Alle waarden als tekst')}
    </div>
  </section>`;
