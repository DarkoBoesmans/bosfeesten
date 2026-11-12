import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

const oud = (jaar: string) => `<figure class="c-oudebon"><img src="assets/vorig/bon-${jaar}-licht.webp" alt="Lichte drankbon ${jaar}" width="500" height="301" loading="lazy"><img src="assets/vorig/bon-${jaar}-zwaar.webp" alt="Zware drankbon ${jaar}" width="500" height="301" loading="lazy"><figcaption>${jaar}</figcaption></figure>`;

export const bonnen = (jaar: number) => `
  <section class="o-sectie" id="bonnen" aria-labelledby="bonnen-titel">
    ${kop('bonnen', 'Drankbonnen', 'Lichte drank is Mandarijn, zware drank is Indigo. Het verschil zit ook in helderheid, dus ook in het donker aan de toog en voor wie kleurenblind is, zijn ze uit elkaar te houden.')}
    <div class="c-bonnen">
      <figure>${voorbeeld('bonnen/drankbon-licht.png', `Drankbon lichte drank ${jaar}`, 1618, 1000)}<figcaption>${bestand('bonnen/drankbon-licht.png', 'Lichte drank')}</figcaption></figure>
      <figure>${voorbeeld('bonnen/drankbon-zwaar.png', `Drankbon zware drank ${jaar}`, 1618, 1000)}<figcaption>${bestand('bonnen/drankbon-zwaar.png', 'Zware drank')}</figcaption></figure>
    </div>
    <div class="c-bonnen__oud">
      <p>Geen rood, roze, blauw of groen: zo valt een bon van een vorig jaar meteen op.</p>
      ${oud('2025')}${oud('2026')}
    </div>
  </section>`;
