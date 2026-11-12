import type { Combo } from '../types';
import { tekstOp } from '../lib/kleur';

/** Strook met de drie merkkleuren en crème, breedte volgens 60 / 30 / 10. */
export function stalen({ id, kleuren: k }: Combo) {
  const rij = [[k.P, 6], [k.S, 3], [k.A, 1.6], [k.L, 1.6]] as const;
  return `<ul class="c-stalen" aria-label="Kleuren van combo ${id.toUpperCase()}">
    ${rij.map(([kl, w]) => `<li class="c-stalen__staal" style="flex:${w};background:${kl.druk};color:${tekstOp(kl.druk)}">${kl.naam}</li>`).join('')}
  </ul>`;
}
