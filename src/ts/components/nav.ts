import { ZIP, omvang, url } from '../data/kit';

export const SECTIES = [
  ['kleuren', 'Kleuren'], ['logo', 'Logo'], ['letters', 'Letters'], ['patroon', 'Patroon'],
  ['drukwerk', 'Drukwerk'], ['bonnen', 'Bonnen'], ['sociaal', 'Sociale media'], ['regels', 'Regels'], ['downloads', 'Downloads'],
] as const;

export const nav = (jaar: number) => `<header class="c-nav">
    <a class="c-nav__merk" href="#top" aria-label="Bosfeesten ${jaar}, naar boven"><span class="c-nav__logo" aria-hidden="true"></span>Bosfeesten ${jaar}</a>
    <nav class="c-nav__links" aria-label="Onderdelen">
      ${SECTIES.map(([id, label]) => `<a class="c-nav__link" href="#${id}">${label}</a>`).join('')}
    </nav>
    <a class="c-nav__zip" href="${url(ZIP)}" download>Alles downloaden <span>ZIP · ${omvang(ZIP)}</span></a>
  </header>`;
