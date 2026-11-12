import type { Kleur } from '../types';
import { KLEUREN } from '../data/kleuren';

/**
 * Drankbon zoals in drukwerk.af, als SVG zodat hij op elke breedte klopt.
 * Vlak in de bonkleur, BOS FEESTEN in de andere bonkleur, jaartal in crème.
 */
export function bon(soort: 'licht' | 'zwaar', vlak: Kleur, letter: Kleur, jaar: number) {
  const label = soort === 'licht' ? 'Lichte drank' : 'Zware drank';
  const papier = KLEUREN.creme.druk;
  return `<svg class="c-bon" viewBox="0 0 1618 1000" role="img" aria-label="Drankbon ${label.toLowerCase()} ${jaar}: ${vlak.naam} met letters in ${letter.naam}">
    <rect width="1618" height="1000" fill="${vlak.druk}"/>
    <g class="c-bon__label" fill="${papier}" stroke="${letter.druk}">
      <text x="110" y="170">${label}</text>
      <text x="1508" y="900" text-anchor="end">${label}</text>
    </g>
    <g class="c-bon__titel">
      <text x="110" y="560" textLength="1398" lengthAdjust="spacingAndGlyphs"><tspan fill="${letter.druk}" stroke="${papier}">Bos</tspan><tspan fill="${papier}" stroke="${letter.druk}"> ${jaar}</tspan></text>
      <text x="110" y="790" textLength="1398" lengthAdjust="spacingAndGlyphs" fill="${letter.druk}" stroke="${papier}">Feesten</text>
    </g>
  </svg>`;
}
