import { kop } from './kop';

const rij = (klasse: string, voorbeeld: string, naam: string, uitleg: string, bron: string) => `
      <div class="c-letters__rij">
        <p class="c-letters__voorbeeld c-letters__voorbeeld--${klasse}">${voorbeeld}</p>
        <div class="c-letters__uitleg"><p><b>${naam}</b> ${uitleg}</p><p class="c-letters__bron">${bron}</p></div>
      </div>`;

export const letters = (jaar: number) => `
  <section class="o-sectie" id="letters" aria-labelledby="letters-titel">
    ${kop('letters', 'Lettertypes', 'Drie lettertypes, elk met één taak. Alle drie zijn gratis.')}
    <div class="c-letters">
      ${rij('titel', `Bos ${jaar} Feesten`, 'Hipstelvetica', 'Altijd in hoofdletters. Titel, jaartal, badges en knoppen. Grote titels krijgen een rand in Groen.', 'Gratis, ook voor commercieel gebruik: <a href="https://www.graphicpear.com/hipstelvetica-font/" rel="noopener">graphicpear.com</a>')}
      ${rij('slab', '13 augustus · 21u00 · € 2,50', 'Roboto Slab vet', 'Datums, uren en prijzen.', 'Gratis via <a href="https://fonts.google.com/specimen/Roboto+Slab" rel="noopener">Google Fonts</a>')}
      ${rij('tekst', 'Optocht met de muziekkapel, mosselfestijn en een volle wei aan de Eerste Bochtweg.', 'Poppins', 'Normaal of medium. Programma, uitleg en alle andere tekst.', 'Gratis via <a href="https://fonts.google.com/specimen/Poppins" rel="noopener">Google Fonts</a>')}
    </div>
  </section>`;
