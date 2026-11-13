/** Hoofdstukkop: nummer, titel in Roboto Slab, korte inleiding. */
export const kop = (id: string, nr: number, titel: string, tekst = '') => `
      <header class="c-kop" data-toon>
        <p class="c-kop__nr" aria-hidden="true">${String(nr).padStart(2, '0')}</p>
        <h2 class="c-kop__titel" id="${id}-titel">${titel}</h2>
        ${tekst ? `<p class="c-kop__tekst">${tekst}</p>` : ''}
      </header>`;
