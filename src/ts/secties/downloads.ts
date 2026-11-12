import { GROEPEN, ZIP, omvang, url } from '../data/kit';
import { bestand } from '../components/bestand';
import { kop } from './kop';

export const downloads = () => `
  <section class="o-sectie" id="downloads" aria-labelledby="downloads-titel">
    ${kop('downloads', 'Downloads', 'Alles in één map, of per bestand. Vrij te gebruiken voor communicatie over de Bosfeesten.')}
    <a class="c-knop c-knop--vol c-knop--groot" href="${url(ZIP)}" download>Download de volledige media kit <span class="c-knop__meta">ZIP · ${omvang(ZIP)}</span></a>
    <div class="c-downloads">
      ${GROEPEN.map((g) => `<div class="c-downloads__groep"><h3 class="c-downloads__titel">${g.titel}</h3>${g.bestanden.map((b) => bestand(b.pad, b.label)).join('')}</div>`).join('')}
    </div>
  </section>`;
