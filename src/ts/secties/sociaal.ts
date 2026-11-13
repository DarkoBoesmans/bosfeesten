import { SOCIAAL } from '../data/kit';
import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

const STAPPEN = [
  ['Kies een sjabloon', 'De lege post of story is je basis: rand van boompjes, Indigo vlak, logo onderaan.'],
  ['Zet je artiest erin', 'Een foto met een effen achtergrond werkt het best. Uitknippen kan gratis in Canva of met de knop “Achtergrond verwijderen” op je gsm.'],
  ['Naam groot, de rest klein', 'Artiestnaam in Roboto Slab extra vet en hoofdletters, in Crème. Dag en uur in een Mandarijn blokje, podium eronder.'],
  ['Eén accent', 'Mandarijn mag maar één keer per beeld terugkomen. De rest is Crème op Indigo.'],
  ['Houd de randen vrij', 'In een story blijft de bovenste en onderste 250 px leeg: daar staan je profielnaam en de antwoordbalk.'],
];

export const sociaal = () => `
  <section class="c-hoofdstuk o-wrap" id="sociaal" aria-labelledby="sociaal-titel">
    ${kop('sociaal', 7, 'Sociale media', 'Elke post en story heeft dezelfde opbouw: een rand van boompjes, een vlak in Indigo, het woordmerk of de boodschap in het midden.')}
    <div class="c-sociaal">
      ${SOCIAAL.map(({ pad, label, maat }) => {
        const [b, h] = maat.split(' × ').map(Number) as [number, number];
        const vorm = b > h ? 'breed' : b === h ? 'vierkant' : 'hoog';
        return `<figure class="c-sociaal__item c-sociaal__item--${vorm}" data-toon>${voorbeeld(pad, label, b, h)}<figcaption><span class="c-sociaal__maat">${label} · ${maat}</span>${bestand(pad, label)}</figcaption></figure>`;
      }).join('')}
      <div class="c-sociaal__item c-stappen" data-toon>
      <h3 class="c-stappen__titel">Een artiest aankondigen in 5 stappen</h3>
      <ol class="c-stappen__lijst">${STAPPEN.map(([t, u]) => `<li><b>${t}</b><span>${u}</span></li>`).join('')}</ol>
      <a class="c-knop c-knop--vol" href="#maker">Of maak hem hier meteen</a>
      </div>
    </div>
  </section>`;
