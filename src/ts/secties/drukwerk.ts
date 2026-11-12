import { DRUKWERK } from '../data/kit';
import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

const MATEN: Record<string, [number, number]> = {
  'drukwerk/affiche.jpg': [1280, 1810], 'drukwerk/flyer.jpg': [720, 1022],
  'drukwerk/prijslijst.jpg': [900, 1273], 'drukwerk/bonnetjes.jpg': [900, 1273],
};

export const drukwerk = () => `
  <section class="o-sectie" id="drukwerk" aria-labelledby="drukwerk-titel">
    ${kop('drukwerk', 'Drukwerk', 'Het drukwerk van dit jaar in de nieuwe kleuren. Dit zijn voorbeelden voor op het scherm; de drukbestanden blijven bij de ploeg.')}
    <div class="c-raster">
      ${DRUKWERK.map(({ pad, label }) => `<figure class="c-raster__item">${voorbeeld(pad, label, ...MATEN[pad]!)}<figcaption>${bestand(pad, label)}</figcaption></figure>`).join('')}
    </div>
  </section>`;
