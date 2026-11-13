import { SOCIAAL } from '../data/kit';
import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

const STAPPEN = [
  ['Kies een sjabloon', 'De lege post of story is je basis: het woordmerk staat bovenaan, de datum onderaan, het midden is vrij.'],
  ['Zet je artiest erin', 'Een foto met een effen achtergrond werkt het best. Uitknippen kan gratis in Canva of met de knop “Achtergrond verwijderen” op je gsm.'],
  ['Naam groot, de rest klein', 'Artiestnaam in Roboto Slab extra vet en hoofdletters, in Crème. Dag en uur in een Mandarijn blokje, podium eronder.'],
  ['Eén accent', 'Mandarijn mag maar één keer per beeld terugkomen. De rest is Crème op Indigo.'],
  ['Houd de randen vrij', 'In een story blijft de bovenste en onderste 250 px leeg: daar staan je profielnaam en de antwoordbalk.'],
];

const item = ({ pad, label, maat }: { pad: string; label: string; maat: string }) => {
  const [b, h] = maat.split(' × ').map(Number) as [number, number];
  const vorm = b > h ? 'breed' : b === h ? 'vierkant' : 'hoog';
  return `<figure class="c-post c-post--${vorm}" data-toon>
        ${voorbeeld(pad, label, b, h)}
        <figcaption class="c-post__onder"><span class="c-post__naam">${label}</span><span class="c-post__maat">${b} × ${h} px</span>${bestand(pad, 'Download')}</figcaption>
      </figure>`;
};

export const sociaal = () => `
  <section class="c-hoofdstuk o-wrap" id="sociaal" aria-labelledby="sociaal-titel">
    ${kop('sociaal', 7, 'Sociale media', 'Elke post en story heeft dezelfde opbouw: een rand van boompjes, een vlak in Indigo, het woordmerk zo breed als het vlak en de drie dagen in blokken.')}
    <div class="c-sociaal">
      ${item(SOCIAAL[0]!)}
      <div class="c-stappen" data-toon>
        <h3 class="c-stappen__titel">Een artiest aankondigen</h3>
        <ol class="c-stappen__lijst">${STAPPEN.map(([t, u]) => `<li><b>${t}</b><span>${u}</span></li>`).join('')}</ol>
        <a class="c-knop c-knop--vol" href="#maker">Maak hem in de postmaker</a>
      </div>
    </div>
    <h3 class="c-sociaal__tussen" data-toon>Posts en stories</h3>
    <div class="c-sociaal c-sociaal--rij">${SOCIAAL.slice(1, 5).map(item).join('')}</div>
    <h3 class="c-sociaal__tussen" data-toon>Lege sjablonen</h3>
    <div class="c-sociaal c-sociaal--rij">${SOCIAAL.slice(5).map(item).join('')}
      <p class="c-sociaal__noot" data-toon>Kop en voet staan erin, het midden is vrij voor je artiest. Leg ze onder je foto in Canva, Affinity of Instagram zelf.</p>
    </div>
  </section>`;
