import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

const oud = (jaar: string) => `<figure class="c-oud"><div class="c-oud__paar"><img src="assets/vorig/bon-${jaar}-licht.webp" alt="Lichte drankbon ${jaar}" width="500" height="301" loading="lazy"><img src="assets/vorig/bon-${jaar}-zwaar.webp" alt="Zware drankbon ${jaar}" width="500" height="301" loading="lazy"></div><figcaption><s>${jaar}</s> Ongeldig</figcaption></figure>`;

export const bonnen = (jaar: number) => `
  <section class="c-hoofdstuk o-wrap" id="bonnen" aria-labelledby="bonnen-titel">
    ${kop('bonnen', 6, 'Drankbonnen', 'Licht is licht, zwaar is donker. Zo herken je ze ook in het donker aan de toog, en ook als je kleurenblind bent.')}
    <div class="c-bonnen">
      <figure class="c-bon" data-toon>${voorbeeld('bonnen/drankbon-licht.png', `Drankbon lichte drank ${jaar}`, 1618, 1000)}<figcaption><b>Lichte drank</b> Mandarijn, letters in Indigo${bestand('bonnen/drankbon-licht.png', 'Lichte drank')}</figcaption></figure>
      <figure class="c-bon c-bon--zwaar" data-toon>${voorbeeld('bonnen/drankbon-zwaar.png', `Drankbon zware drank ${jaar}`, 1618, 1000)}<figcaption><b>Zware drank</b> Indigo, letters in Mandarijn${bestand('bonnen/drankbon-zwaar.png', 'Zware drank')}</figcaption></figure>
    </div>
    <div class="c-bonnen__oud" data-toon>
      <p>Geen rood, roze, blauw of groen meer. Een bon van vorig jaar valt meteen op.</p>
      ${oud('2025')}${oud('2026')}
    </div>
  </section>`;
