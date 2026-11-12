/** Sectiekop: titel en een korte inleiding. */
export const kop = (id: string, titel: string, tekst = '') => `
      <header class="c-kop">
        <h2 class="c-kop__titel" id="${id}-titel">${titel}</h2>
        ${tekst ? `<p class="c-kop__tekst">${tekst}</p>` : ''}
      </header>`;
