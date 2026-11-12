import type { Combo, Werk } from '../types';

/** Canvas dat main.ts invult met het herkleurde werk. */
export const kunst = (werk: Werk, combo: Combo) =>
  `<canvas class="c-kunst" data-werk="${werk.naam}" data-combo="${combo.id}" width="${werk.b}" height="${werk.h}"
    role="img" aria-label="${werk.titel} in combo ${combo.id.toUpperCase()}, ${combo.naam}"></canvas>`;
