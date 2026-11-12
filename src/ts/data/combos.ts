// De voorstellen. Elk palet heeft drie merkkleuren die geen tinten van elkaar zijn, plus crème.
// Drankbonnen: licht = een lichte kleur, zwaar = de donkerste. Nooit groen of rood als bon,
// want de zware bon van 2026 was mint en die van 2025 rood.
import type { Combo } from '../types';
import { KLEUREN as K } from './kleuren';

export const COMBOS: Combo[] = [
  {
    id: 'a',
    naam: 'Limoen & Mandarijn',
    zin: 'Zonnig en luid. Een lichte affiche, fris groen met oranje en een diepblauwe tegenkleur.',
    harmonie: 'Jullie inspiratie blauw, limoen, rood, met mandarijn in plaats van rood (rood was 2025). Split-complementair rond Ultramarijn.',
    kleuren: { P: K.limoen, S: K.mandarijn, A: K.ultra, B: K.mandarijn, L: K.creme },
    bon: { licht: K.limoen, zwaar: K.ultra },
  },
  {
    id: 'b',
    naam: 'Ultramarijn & Limoen',
    zin: 'Diepblauwe affiche met een fel groen patroon en oranje als vonk.',
    harmonie: 'Zelfde drie kleuren als A, maar donker. Split-complementair rond Ultramarijn.',
    kleuren: { P: K.ultra, S: K.limoen, A: K.mandarijn, B: K.limoen, L: K.creme },
    bon: { licht: K.limoen, zwaar: K.ultra },
  },
  {
    id: 'c',
    naam: 'Lila & Limoen',
    zin: 'Zacht en zomers. Lila met limoen en een oranje accent.',
    harmonie: 'Complementair paar (Lila en Limoen staan tegenover elkaar) met Mandarijn als warm accent.',
    kleuren: { P: K.lila, S: K.limoen, A: K.mandarijn, B: K.limoen, L: K.creme },
    bon: { licht: K.limoen, zwaar: K.lila },
  },
  {
    id: 'd',
    naam: 'Indigo & Groen',
    zin: 'Jullie triade oranje, paars, groen. Donker paarsblauw met groen patroon.',
    harmonie: 'Triade: Mandarijn, Indigo en Groen liggen bijna op gelijke afstand op de kleurcirkel.',
    kleuren: { P: K.indigo, S: K.groen, A: K.mandarijn, B: K.groen, L: K.creme },
    bon: { licht: K.mandarijn, zwaar: K.indigo },
  },
  {
    id: 'e',
    naam: 'Groen & Indigo',
    zin: 'Dezelfde triade, maar licht: groene affiche met indigo patroon.',
    harmonie: 'Triade: Mandarijn, Indigo en Groen. Let op: een groene affiche volgt op de mintgroene van 2026.',
    kleuren: { P: K.groen, S: K.indigo, A: K.mandarijn, B: K.indigo, L: K.creme },
    bon: { licht: K.mandarijn, zwaar: K.indigo },
  },
];
