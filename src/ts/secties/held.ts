import { FEEST } from '../data/feest';
import { ZIP, omvang, url } from '../data/kit';
import { woordmerk } from '../components/woordmerk';

const loop = (jaar: number, nummer: number) =>
  Array.from({ length: 8 }, () => `<span>${FEEST.dagen} ${jaar}</span><span aria-hidden="true">✳</span><span>${nummer}ste editie</span><span aria-hidden="true">✳</span><span>Gijzegem</span><span aria-hidden="true">✳</span>`).join('');

// De drie dagen zoals op de affiche: groot getal in een blok, maand en weekdag ernaast, afwisselend groen en mandarijn.
const DAGEN: [string, string, string][] = [['13', 'Vrijdag', 'groen'], ['14', 'Zaterdag', 'mandarijn'], ['15', 'Zondag', 'groen']];

export const held = (jaar: number, nummer: number) => `
  <section class="c-held" id="top" aria-labelledby="held-titel" data-held>
    <div class="c-held__inhoud">
      <p class="c-held__boven">${FEEST.organisator} · huisstijl en media kit · ${nummer}ste editie</p>
      <h1 class="c-held__titel" id="held-titel">${woordmerk(jaar, 'c-woordmerk--groot')}</h1>
      <p class="c-held__uitleg">Alles om over de Bosfeesten te communiceren, op één plek: kleuren, logo, het boompjespatroon, sjablonen voor je posts en de regels voor drukwerk.</p>
      <div class="c-held__acties">
        <a class="c-knop c-knop--vol" href="${url(ZIP)}" download>Download de media kit <span class="c-knop__meta">${omvang(ZIP)}</span></a>
        <a class="c-knop" href="#maker">Maak meteen een post</a>
      </div>
    </div>
    <ol class="c-held__dagen" aria-label="De drie dagen">
      ${DAGEN.map(([n, dag, kleur], i) => `
      <li class="c-dag c-dag--${kleur}" style="--i:${i}">
        <span class="c-dag__nr">${n}</span>
        <span class="c-dag__tekst"><b>${dag}</b><span>augustus</span></span>
      </li>`).join('')}
    </ol>
    <div class="c-held__band" aria-hidden="true"><div class="c-held__loop">${loop(jaar, nummer)}</div></div>
  </section>`;
