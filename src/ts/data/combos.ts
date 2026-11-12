// De drie voorstellen. Elk palet heeft drie merkkleuren die geen tinten van elkaar zijn, plus crème.
// Drankbonnen: licht = de lichtste merkkleur, zwaar = de donkerste. Zo voelt "licht" ook licht aan.
import type { Combo } from '../types';
import { KLEUREN as K } from './kleuren';

export const COMBOS: Combo[] = [
  {
    id: 'a',
    naam: 'Limoen & Mandarijn',
    zin: 'Zonnig en luid. Een lichte affiche, fris groen met oranje en een diepblauwe tegenkleur.',
    harmonie: 'Split-complementair: Ultramarijn met de twee buren van zijn tegenkleur, Limoen en Mandarijn.',
    kleuren: { P: K.limoen, S: K.mandarijn, A: K.ultra, B: K.mandarijn, L: K.creme },
    bon: { licht: K.limoen, zwaar: K.ultra },
  },
  {
    id: 'b',
    naam: 'Druif & Limoen',
    zin: 'Nachtfeest. Diep paars met fel groen patroon en oranje als vonk.',
    harmonie: 'Complementair paar (Druif en Limoen staan tegenover elkaar) met Mandarijn als warm accent.',
    kleuren: { P: K.druif, S: K.limoen, A: K.mandarijn, B: K.limoen, L: K.creme },
    bon: { licht: K.limoen, zwaar: K.druif },
  },
  {
    id: 'c',
    naam: 'Ultramarijn & Lila',
    zin: 'Koel en dromerig. Blauw en lila naast elkaar, oranje als tegengewicht.',
    harmonie: 'Twee koele buren (Ultramarijn en Lila) met hun tegenkleur Mandarijn.',
    kleuren: { P: K.ultra, S: K.lila, A: K.mandarijn, B: K.lila, L: K.creme },
    bon: { licht: K.lila, zwaar: K.ultra },
  },
];
