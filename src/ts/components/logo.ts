import type { Kleur } from '../types';

/** Logo in een merkkleur: het zwarte logo als masker, de kleur als vulling. */
export const logo = (kleur: Kleur, extra = '') =>
  `<span class="c-logo${extra}" style="--logo-kleur:${kleur.druk}" role="img" aria-label="Bosfeesten-logo in ${kleur.naam}"></span>`;

/** Tegel met het logo op een achtergrond, voor de logoregels. */
export function logoTegel(voor: Kleur, achter: Kleur, mag: boolean, uitleg: string, extra = '') {
  return `<figure class="c-logotegel${mag ? '' : ' c-logotegel--niet'}">
    <div class="c-logotegel__vlak" style="background:${achter.druk}">${logo(voor, extra)}</div>
    <figcaption><b>${mag ? 'Zo' : 'Niet zo'}</b> ${uitleg}</figcaption>
  </figure>`;
}
