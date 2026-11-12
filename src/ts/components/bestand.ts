import { omvang, soort, url } from '../data/kit';

/** Kleine webp-versie voor op de pagina (gemaakt door tools/kit.py). */
export const klein = (pad: string) => url(`voorbeeld/${pad.split('/').pop()!.replace(/\.\w+$/, '.webp')}`);

/** Downloadlink met bestandstype en grootte. */
export const bestand = (pad: string, label: string) =>
  `<a class="c-bestand" href="${url(pad)}" download>
    <span class="c-bestand__label">${label}</span>
    <span class="c-bestand__meta">${soort(pad)} · ${omvang(pad)}</span>
  </a>`;

/** Voorbeeldbeeld dat groot opent bij een klik. */
export const voorbeeld = (pad: string, alt: string, b: number, h: number) =>
  `<button type="button" class="c-voorbeeld" data-groot="${url(pad)}" data-alt="${alt}" aria-label="${alt} groot bekijken">
    <img src="${klein(pad)}" alt="${alt}" width="${b}" height="${h}" loading="lazy" decoding="async">
  </button>`;
