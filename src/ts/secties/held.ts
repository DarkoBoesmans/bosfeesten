import { FEEST } from '../data/feest';
import { ZIP, omvang, url } from '../data/kit';
import { woordmerk } from '../components/woordmerk';

const loop = (jaar: number, nummer: number) =>
  Array.from({ length: 8 }, () => `<span>${FEEST.dagen} ${jaar}</span><span aria-hidden="true">✳</span><span>${nummer}ste editie</span><span aria-hidden="true">✳</span><span>Gijzegem</span><span aria-hidden="true">✳</span>`).join('');

export const held = (jaar: number, nummer: number) => `
  <section class="c-held" id="top" aria-labelledby="held-titel" data-held>
    <div class="c-held__inhoud">
      <p class="c-held__boven">${FEEST.organisator} · huisstijl en media kit</p>
      <h1 class="c-held__titel" id="held-titel">${woordmerk(jaar, 'c-woordmerk--groot')}</h1>
      <p class="c-held__editie"><span>${nummer}ste</span> editie</p>
      <p class="c-held__uitleg">Alles om over de Bosfeesten te communiceren, op één plek. Kleuren, logo, het boompjespatroon, sjablonen voor je posts en de regels voor drukwerk.</p>
      <div class="c-held__acties">
        <a class="c-knop c-knop--vol" href="${url(ZIP)}" download>Download de media kit <span class="c-knop__meta">${omvang(ZIP)}</span></a>
        <a class="c-knop" href="#maker">Maak meteen een post</a>
      </div>
    </div>
    <button type="button" class="c-held__affiche" data-groot="${url('drukwerk/affiche.jpg')}" data-alt="Affiche Bosfeesten ${jaar}" aria-label="Affiche groot bekijken">
      <img src="${url('voorbeeld/affiche-held.webp')}" alt="Affiche Bosfeesten ${jaar}: Indigo met groen boompjespatroon en het volledige programma" width="600" height="848" fetchpriority="high">
    </button>
    <div class="c-held__band" aria-hidden="true"><div class="c-held__loop">${loop(jaar, nummer)}</div></div>
  </section>`;
