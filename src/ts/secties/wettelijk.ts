import { REGELGROEPEN } from '../data/regels';
import { kop } from './kop';

export const wettelijk = () => `
  <section class="c-hoofdstuk c-wet" id="wettelijk" aria-labelledby="wettelijk-titel">
    <div class="o-wrap">
      ${kop('wettelijk', 9, 'Regels en wet', 'Wat er op drukwerk moet, hoe je flyers uitdeelt, waar pijlen mogen hangen en wat er geldt voor alcohol. Elke regel heeft zijn bron. Samengesteld in november 2026, geen juridisch advies: kijk bij twijfel na bij de stad Aalst.')}
      <div class="c-wet__groepen">
        ${REGELGROEPEN.map((g, i) => `
        <details class="c-wet__groep" data-toon${i === 0 ? ' open' : ''}>
          <summary class="c-wet__kop"><span class="c-wet__titel">${g.titel}</span><span class="c-wet__kort">${g.kort} · ${g.regels.length} regels</span></summary>
          <ol class="c-wet__regels">
            ${g.regels.map((r) => `<li class="c-wet__regel"><p>${r.tekst}</p><a class="c-wet__bron" href="${r.bron.url}" rel="noopener">${r.bron.naam} ↗</a></li>`).join('')}
          </ol>
        </details>`).join('')}
      </div>
      <aside class="c-wet__vu" data-toon>
        <h3>Zo zet je de V.U. op de affiche</h3>
        <p class="c-wet__voorbeeld">V.U.: Voornaam Naam, Straat 1, 9308 Gijzegem<br>Organisatie: Chiro Popov vzw, adres van de zetel</p>
        <p>“Chiro Popov” alleen is niet genoeg: de V.U. is een persoon met een thuisadres in België.</p>
      </aside>
    </div>
  </section>`;
