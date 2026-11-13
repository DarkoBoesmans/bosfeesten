import { DRUKWERK } from '../data/kit';
import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

const MATEN: Record<string, [number, number]> = {
  'drukwerk/affiche.jpg': [849, 1200], 'drukwerk/flyer.jpg': [720, 1022],
  'drukwerk/prijslijst.jpg': [849, 1200], 'drukwerk/bonnetjes.jpg': [849, 1200],
};

export const drukwerk = () => `
  <section class="c-hoofdstuk" id="drukwerk" aria-labelledby="drukwerk-titel">
    <div class="o-wrap">${kop('drukwerk', 5, 'Drukwerk', 'Het drukwerk van dit jaar in de nieuwe kleuren. Sleep of scroll opzij om alles te zien. Klik op een stuk om het groot te bekijken.')}</div>
    <ul class="c-tafel" data-sleep tabindex="0" aria-label="Drukwerk, opzij scrollen">
      ${DRUKWERK.map(({ pad, label }, i) => `<li class="c-tafel__item" style="--draai:${[-2, 1.5, -1, 2][i]}deg">${voorbeeld(pad, label, ...MATEN[pad]!)}<p class="c-tafel__naam">${label}</p>${bestand(pad, 'Voorbeeld')}</li>`).join('')}
      <li class="c-tafel__item c-tafel__item--later" style="--draai:-1.5deg">
        <div class="c-later">
          <p class="c-later__stempel">Volgt</p>
          <p class="c-later__titel">Drukklare bestanden</p>
          <p class="c-later__tekst">PDF's met snijmarge, klaar voor de drukker. Ze komen op deze plek zodra de affiche en de flyer af zijn.</p>
        </div>
        <p class="c-tafel__naam">Drukbestanden</p>
      </li>
    </ul>
  </section>`;
