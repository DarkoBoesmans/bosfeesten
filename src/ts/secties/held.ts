import { FEEST } from '../data/feest';
import { ZIP, omvang, url } from '../data/kit';
import { klein } from '../components/bestand';

export const held = (jaar: number, nummer: number) => `
  <section class="c-held" id="top" aria-labelledby="held-titel">
    <div class="c-held__vlak">
      <p class="c-held__boven">${FEEST.organisator} presenteert</p>
      <h1 class="c-held__titel" id="held-titel"><span>Bos</span> <span class="c-held__jaar">${jaar}</span><br><span>Feesten</span></h1>
      <p class="c-held__editie">${nummer}ste editie</p>
      <p class="c-held__datum">${FEEST.dagen} ${jaar}</p>
      <p class="c-held__adres">${FEEST.adres} · ${FEEST.gemeente}</p>
      <p class="c-held__uitleg">Huisstijl en media kit. Logo, kleuren, patroon, sjablonen voor sociale media en de regels voor drukwerk: alles wat je nodig hebt om over de Bosfeesten te communiceren.</p>
      <div class="c-held__acties">
        <a class="c-knop c-knop--vol" href="${url(ZIP)}" download>Download de media kit <span class="c-knop__meta">${omvang(ZIP)}</span></a>
        <a class="c-knop" href="#kleuren">Bekijk de huisstijl</a>
      </div>
    </div>
    <button type="button" class="c-held__affiche" data-groot="${url('drukwerk/affiche.jpg')}" data-alt="Affiche Bosfeesten ${jaar}" aria-label="Affiche groot bekijken">
      <img src="${klein('drukwerk/affiche.jpg')}" alt="Affiche Bosfeesten ${jaar}: Indigo met groen boompjespatroon en het volledige programma" width="849" height="1200" fetchpriority="high">
    </button>
  </section>`;
