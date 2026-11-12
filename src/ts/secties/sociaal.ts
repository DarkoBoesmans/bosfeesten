import { SOCIAAL } from '../data/kit';
import { bestand, voorbeeld } from '../components/bestand';
import { kop } from './kop';

export const sociaal = () => `
  <section class="o-sectie" id="sociaal" aria-labelledby="sociaal-titel">
    ${kop('sociaal', 'Sociale media', 'Elke post, story en cover heeft dezelfde opbouw: een rand van boompjes, een vlak in Indigo en de titel in het midden. Gebruik de lege versies voor line-up, nieuws of oproepen.')}
    <div class="c-sociaal">
      ${SOCIAAL.map(({ pad, label, maat }) => {
        const [b, h] = maat.split(' × ').map(Number) as [number, number];
        return `<figure class="c-sociaal__item c-sociaal__item--${b > h ? 'breed' : b === h ? 'vierkant' : 'hoog'}">${voorbeeld(pad, label, b, h)}<figcaption><span class="c-sociaal__maat">${maat}</span>${bestand(pad, label)}</figcaption></figure>`;
      }).join('')}
    </div>
    <ul class="c-lijst c-lijst--kolommen">
      <li>Houd in een story de bovenste en onderste 250 px vrij: daar staan profielnaam en antwoordbalk.</li>
      <li>Eén accent per beeld: Mandarijn voor het jaartal of een datum, niet voor alles.</li>
      <li>Foto's krijgen geen filter in de merkkleuren; zet ze in het Indigo vlak met een rand van boompjes.</li>
      <li>Schrijf zoals je praat: kort, warm en in het Nederlands. Datum en plaats altijd volledig.</li>
    </ul>
  </section>`;
