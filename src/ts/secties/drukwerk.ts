import { kop } from './kop';

// Het echte drukwerk wordt nog gemaakt. Tot dan toont deze sectie wat er komt, onder elkaar.
const VOLGT: [string, string][] = [
  ['Affiche', 'A2, voor ramen en uithangborden'],
  ['Flyer', 'A5, om uit te delen en in de bus te steken'],
  ['Prijslijst plein', 'Voor de toog en de kassa'],
  ['Prijslijst bonnetjes', 'Wat een lichte en een zware bon waard is'],
];

export const drukwerk = () => `
  <section class="c-hoofdstuk" id="drukwerk" aria-labelledby="drukwerk-titel">
    <div class="o-wrap">
      ${kop('drukwerk', 5, 'Drukwerk', 'Affiche, flyer en prijslijsten in de nieuwe kleuren. Ze worden nu gemaakt.')}
      <div class="c-binnenkort">
        <div class="c-binnenkort__kaart" data-toon>
          <p class="c-binnenkort__stempel">Binnenkort</p>
          <p class="c-binnenkort__titel">Het drukwerk komt eraan</p>
          <p class="c-binnenkort__tekst">Zodra de ontwerpen af zijn, staan de drukklare PDF's hier, met snijmarge en klaar om naar de drukker te sturen.</p>
        </div>
        <ol class="c-volgt" data-toon>
          ${VOLGT.map(([naam, uitleg], i) => `
          <li class="c-volgt__item">
            <span class="c-volgt__nr">${String(i + 1).padStart(2, '0')}</span>
            <span class="c-volgt__tekst"><b>${naam}</b>${uitleg}</span>
            <span class="c-volgt__stempel">Volgt</span>
          </li>`).join('')}
        </ol>
      </div>
    </div>
  </section>`;
