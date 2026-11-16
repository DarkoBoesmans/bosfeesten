import { kop } from './kop';

// Het echte drukwerk wordt nog gemaakt. Tot dan toont deze sectie wat er komt, onder elkaar.
// Wat er in drukwerk.af staat, met het formaat uit de drukbestanden van vorig jaar.
const VOLGT: [string, string, string][] = [
  ['Affiche', 'A2 staand', '420 × 594 mm'],
  ['Flyer algemeen en flyer helpers', 'A5 staand', '148 × 210 mm'],
  ['Flyer voorverkoop', 'A5 liggend', '210 × 148 mm'],
  ['Prijslijsten Plein, Meis, Fuif, Resto en Bonnetjes', 'A3 staand', '297 × 420 mm'],
  ['Bekers en bonnetjes', 'A3 liggend', '420 × 297 mm'],
  ['Drankbon licht en zwaar', 'Bonnetje', '50 × 30 mm'],
  ['Polsbandje', 'Strook', '350 × 15 mm'],
];

export const drukwerk = () => `
  <section class="c-hoofdstuk" id="drukwerk" aria-labelledby="drukwerk-titel">
    <div class="o-wrap">
      ${kop('drukwerk', 5, 'Drukwerk', 'Alles uit drukwerk.af, in de nieuwe kleuren. Het formaat staat er al bij; de drukklare PDF\'s volgen.')}
      <div class="c-binnenkort">
        <div class="c-binnenkort__kaart" data-toon>
          <p class="c-binnenkort__stempel">Binnenkort</p>
          <p class="c-binnenkort__titel">Het drukwerk komt eraan</p>
          <p class="c-binnenkort__tekst">Zodra de ontwerpen af zijn, staan de drukklare PDF's hier, met snijmarge en klaar om naar de drukker te sturen.</p>
        </div>
        <ol class="c-volgt" data-toon>
          ${VOLGT.map(([naam, formaat, maat], i) => `
          <li class="c-volgt__item">
            <span class="c-volgt__nr">${String(i + 1).padStart(2, '0')}</span>
            <span class="c-volgt__tekst"><b>${naam}</b>${formaat} · ${maat}</span>
            <span class="c-volgt__stempel">Volgt</span>
          </li>`).join('')}
        </ol>
      </div>
    </div>
  </section>`;
