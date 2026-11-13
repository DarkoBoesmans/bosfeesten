import { DRUKWERK } from '../data/kit';
import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

const MATEN: Record<string, [number, number]> = {
  'drukwerk/affiche.jpg': [849, 1200], 'drukwerk/flyer.jpg': [720, 1022],
  'drukwerk/prijslijst.jpg': [849, 1200], 'drukwerk/bonnetjes.jpg': [849, 1200],
};

export const drukwerk = () => `
  <section class="c-hoofdstuk" id="drukwerk" aria-labelledby="drukwerk-titel">
    <div class="o-wrap">${kop('drukwerk', 5, 'Drukwerk', 'Het drukwerk van dit jaar in de nieuwe kleuren. Sleep of scroll opzij. De echte drukbestanden komen hier later.')}</div>
    <ul class="c-tafel" data-sleep tabindex="0" aria-label="Drukwerk, opzij scrollen">
      ${DRUKWERK.map(({ pad, label }, i) => `<li class="c-tafel__item" style="--draai:${[-2, 1.5, -1, 2][i]}deg">${voorbeeld(pad, label, ...MATEN[pad]!)}<p class="c-tafel__naam">${label}</p>${bestand(pad, 'Voorbeeld')}</li>`).join('')}
      <li class="c-tafel__item c-tafel__item--later"><p>Drukbestanden<br>volgen</p></li>
    </ul>
  </section>`;
