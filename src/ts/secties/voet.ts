import { FEEST } from '../data/feest';

export const voet = (jaar: number, nummer: number) => `
  <footer class="c-voet">
    <p class="c-voet__titel">Bos ${jaar} Feesten</p>
    <p>${nummer}ste editie · ${FEEST.dagen} ${jaar}</p>
    <p>${FEEST.organisator} · ${FEEST.adres} · ${FEEST.gemeente}</p>
    <p class="c-voet__klein">Huisstijl gekozen op 12 november 2026. Logo, patroon en ontwerpen: ${FEEST.organisator}.</p>
  </footer>`;
