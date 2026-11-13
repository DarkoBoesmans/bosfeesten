import { HOOFDSTUKKEN } from '../components/nav';

/** Hoofdstukkop: een wegwijzerbordje met het nummer, de titel in Roboto Slab, een korte inleiding. */
export const kop = (id: string, nr: number, titel: string, tekst = '') => {
  const hex = HOOFDSTUKKEN.find(([h]) => h === id)?.[2].hex ?? '#F5821F';
  // Een crème bordje zou wegvallen op het crème papier: dat wordt Indigo met crème cijfers.
  const [kleur, letter] = hex === '#FAF6DE' ? ['#4F3795', '#FAF6DE'] : [hex, '#1E1538'];
  return `
      <header class="c-kop" data-toon>
        <p class="c-kop__nr" style="--bord:${kleur};--bord-letter:${letter}" aria-hidden="true">${String(nr).padStart(2, '0')}</p>
        <h2 class="c-kop__titel" id="${id}-titel">${titel}</h2>
        ${tekst ? `<p class="c-kop__tekst">${tekst}</p>` : ''}
      </header>`;
};
