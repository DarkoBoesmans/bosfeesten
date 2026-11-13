import { kop } from './kop';
import { woordmerk } from '../components/woordmerk';

export const letters = (jaar: number) => `
  <section class="c-hoofdstuk o-wrap" id="letters" aria-labelledby="letters-titel">
    ${kop('letters', 3, 'Letters', 'Drie lettertypes, elk met één taak. Alle drie gratis.')}
    <div class="c-letters">
      <article class="c-letter c-letter--merk" data-toon>
        <div class="c-letter__proef">${woordmerk(jaar)}</div>
        <div class="c-letter__uitleg">
          <h3>Hipstelvetica</h3>
          <p>Alleen voor het woordmerk “BOS ${jaar} FEESTEN”. Nergens anders: geen titels, geen knoppen.</p>
          <a href="https://www.graphicpear.com/hipstelvetica-font/" rel="noopener">Gratis bij Graphic Pear ↗</a>
        </div>
      </article>
      <article class="c-letter c-letter--slab" data-toon>
        <div class="c-letter__proef"><span class="c-letter__groot">Zaterdag 14 augustus</span><span class="c-letter__klein">21u00 · Meis · € 2,50</span></div>
        <div class="c-letter__uitleg">
          <h3>Roboto Slab</h3>
          <p>Titels, datums, uren en prijzen. Extra vet voor titels, vet voor datums.</p>
          <a href="https://fonts.google.com/specimen/Roboto+Slab" rel="noopener">Gratis bij Google Fonts ↗</a>
        </div>
      </article>
      <article class="c-letter c-letter--tekst" data-toon>
        <div class="c-letter__proef"><p>Drie dagen feest in de wei aan de Eerste Bochtweg. Optocht met de muziekkapel, mosselen, en tot laat dansen in de Meis.</p></div>
        <div class="c-letter__uitleg">
          <h3>Poppins</h3>
          <p>Alle lopende tekst: programma, uitleg, onderschriften.</p>
          <a href="https://fonts.google.com/specimen/Poppins" rel="noopener">Gratis bij Google Fonts ↗</a>
        </div>
      </article>
    </div>
  </section>`;
