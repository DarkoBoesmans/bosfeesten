import { COMBOS } from '../data/combos';
import { AFFICHE, VORIGE } from '../data/werken';
import { kunst } from '../components/kunst';
import { stalen } from '../components/stalen';
import { teller } from '../components/teller';
import { bon } from '../components/bon';

const letter = (id: string) => id.toUpperCase();

export function overzicht(jaar: number) {
  return `
  <header class="c-kop">
    <p class="c-kop__boven">Chiro Popov · Bosfeesten ${jaar}</p>
    <h1 class="c-kop__titel">Welke kleuren worden het?</h1>
    <p class="c-kop__tekst">Vijf voorstellen op de echte affiche en de drankbonnen. Klik op een combo voor de huisstijl en het drukwerk.</p>
    <div class="c-regel">
      <span class="c-regel__tekst">Niet opnieuw:</span>
      ${VORIGE.map((v) => `<span class="c-regel__jaar">${v.jaar} ${v.kleuren.map((k) => `<i style="background:${k}"></i>`).join('')}</span>`).join('')}
    </div>
  </header>
  <main class="o-drie">
    ${COMBOS.map((c) => `
    <article class="c-combo" aria-labelledby="titel-${c.id}">
      <header class="c-combo__kop">
        <span class="c-combo__letter" style="background:${c.bon.zwaar.druk};color:${c.kleuren.L.druk}">${letter(c.id)}</span>
        <div>
          <h2 class="c-combo__naam" id="titel-${c.id}">${c.naam}</h2>
          <p class="c-combo__zin">${c.zin}</p>
        </div>
      </header>
      <a class="c-combo__beeld" href="#${c.id}" aria-label="Huisstijl en drukwerk van combo ${letter(c.id)}">${kunst(AFFICHE, c)}</a>
      <div class="c-combo__bonnen">
        ${bon('licht', c.bon.licht, c.bon.zwaar, jaar)}
        ${bon('zwaar', c.bon.zwaar, c.bon.licht, jaar)}
      </div>
      ${stalen(c)}
      <div class="c-combo__voet">
        ${teller(c)}
        <a class="c-knop" href="#${c.id}">Huisstijl en drukwerk</a>
      </div>
    </article>`).join('')}
  </main>
  <section class="c-vorig" aria-labelledby="vorig-titel">
    <h2 class="c-vorig__titel" id="vorig-titel">De vorige twee jaren</h2>
    <div class="c-vorig__rij">
      ${VORIGE.map((v) => `
      <figure class="c-vorig__jaar">
        <button type="button" class="c-vorig__knop" data-groot="assets/vorig/${v.jaar}-groot.jpg" data-alt="${v.alt}" aria-label="Affiche ${v.jaar} groot bekijken">
          <img src="assets/vorig/${v.jaar}.jpg" alt="${v.alt}" width="700" height="990" loading="lazy">
        </button>
        <div class="c-vorig__bonnen">
          <img src="assets/vorig/bon-${v.jaar}-licht.webp" alt="Drankbon lichte drank ${v.jaar}" width="500" height="301" loading="lazy">
          <img src="assets/vorig/bon-${v.jaar}-zwaar.webp" alt="Drankbon zware drank ${v.jaar}" width="500" height="301" loading="lazy">
        </div>
        <figcaption>${v.jaar}</figcaption>
      </figure>`).join('')}
      <div class="c-vorig__tekst">
        <p>2025 had een blauwe lichte bon en een rode zware. In 2026 werd rood-roze net de lichte bon. Daarom gebruikt geen enkel voorstel nog rood, roze, hemelsblauw of mint, en is de lichte bon altijd de lichtste kleur.</p>
        <p>Alle kleuren zijn eerst in CMYK gekozen. Stemmen worden alleen in deze browser geteld.</p>
        <button type="button" class="c-knop c-knop--rand" data-wis>Stemmen op nul</button>
      </div>
    </div>
  </section>`;
}
