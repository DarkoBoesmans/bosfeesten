import { FEEST } from '../data/feest';
import { woordmerk } from '../components/woordmerk';

export const voet = (jaar: number, nummer: number) => `
  <footer class="c-voet">
    <div class="c-voet__bos" aria-hidden="true"></div>
    <div class="c-voet__inhoud">
      <a class="c-voet__merk" href="#top">${woordmerk(jaar, 'c-woordmerk--voet')}</a>
      <dl class="c-voet__feiten">
        <div><dt>Wanneer</dt><dd>${FEEST.dagen} ${jaar}</dd></div>
        <div><dt>Waar</dt><dd>${FEEST.adres}<br>${FEEST.gemeente}</dd></div>
        <div><dt>Wie</dt><dd>${FEEST.organisator}<br>${nummer}ste editie</dd></div>
      </dl>
      <p class="c-voet__colofon">Huisstijl gekozen op 12 november 2026 door de ploeg. Logo, patroon en ontwerpen: ${FEEST.organisator}. Hipstelvetica via Graphic Pear.</p>
      <a class="c-voet__boven" href="#top">Terug naar boven ↑</a>
    </div>
  </footer>`;
