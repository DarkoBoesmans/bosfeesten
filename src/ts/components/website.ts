import type { Combo } from '../types';
import { tekstOp } from '../lib/kleur';

/** Klein voorbeeld van de Bosfeesten-site in de schermkleuren van een combo. */
export function website({ kleuren: k, bon: b }: Combo, jaar: number) {
  const stijl = [
    `--web-p:${k.P.scherm}`, `--web-s:${k.S.scherm}`, `--web-a:${k.A.scherm}`, `--web-b:${k.B.scherm}`,
    `--web-l:${k.L.scherm}`, `--web-donker:${b.zwaar.scherm}`, `--web-op-a:${tekstOp(k.A.scherm)}`, `--web-op-b:${tekstOp(k.B.scherm)}`,
  ].join(';');
  const rij = (uur: string, wat: string, waar: 'Plein' | 'Meis') =>
    `<li class="c-web__rij"><time class="c-web__uur">${uur}</time><span class="c-web__wat">${wat}</span><span class="c-web__tag c-web__tag--${waar.toLowerCase()}">${waar}</span></li>`;
  return `<div class="c-web" style="${stijl}" role="img" aria-label="Voorbeeld van de website in deze kleuren">
    <div class="c-web__balk"><span class="c-web__logo">Bosfeesten</span><span class="c-web__menu">Programma · Tickets · Helpen</span></div>
    <div class="c-web__held">
      <p class="c-web__titel">Bos ${jaar}<br>Feesten</p>
      <p class="c-web__datum">13, 14 &amp; 15 augustus · Gijzegem</p>
      <span class="c-web__knop">Koop tickets</span>
    </div>
    <ul class="c-web__programma">
      ${rij('17u30', 'Optocht Muziekkapel', 'Plein')}${rij('21u00', "DJ's Nack &amp; Rif", 'Meis')}${rij('23u00', 'DJ Duivenmelker', 'Meis')}
    </ul>
  </div>`;
}
