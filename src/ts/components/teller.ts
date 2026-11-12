import type { Combo } from '../types';
import { aantal, hoogste } from '../lib/stemmen';

export function teller({ id }: Combo) {
  const n = aantal(id);
  const letter = id.toUpperCase();
  const voorop = n > 0 && n === hoogste();
  return `<div class="c-teller${voorop ? ' c-teller--voorop' : ''}">
    <button type="button" class="c-teller__knop" data-stem="${id}" data-delta="-1" aria-label="Eén stem minder voor combo ${letter}">−</button>
    <output class="c-teller__aantal" aria-label="Stemmen voor combo ${letter}">${n}</output>
    <button type="button" class="c-teller__knop" data-stem="${id}" data-delta="1" aria-label="Eén stem meer voor combo ${letter}">+</button>
    <span class="c-teller__label">stemmen</span>
  </div>`;
}
