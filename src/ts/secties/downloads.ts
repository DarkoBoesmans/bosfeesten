import { GROEPEN, ZIP, omvang, url } from '../data/kit';
import { bestand } from '../components/bestand';
import { kop } from './kop';

export const downloads = () => `
  <section class="c-hoofdstuk o-wrap" id="downloads" aria-labelledby="downloads-titel">
    ${kop('downloads', 10, 'Downloads', 'Alles in één map, of per bestand. Vrij te gebruiken voor communicatie over de Bosfeesten.')}
    <a class="c-zip" href="${url(ZIP)}" download data-toon>
      <span class="c-zip__titel">Volledige media kit</span>
      <span class="c-zip__meta">ZIP · ${omvang(ZIP)} · ${GROEPEN.reduce((n, g) => n + g.bestanden.length, 0)} bestanden</span>
      <span class="c-zip__pijl" aria-hidden="true">↓</span>
    </a>
    <div class="c-downloads">
      ${GROEPEN.map((g) => `<div class="c-downloads__groep" data-toon><h3 class="c-downloads__titel">${g.titel}</h3>${g.bestanden.map((b) => bestand(b.pad, b.label)).join('')}</div>`).join('')}
    </div>
  </section>`;
