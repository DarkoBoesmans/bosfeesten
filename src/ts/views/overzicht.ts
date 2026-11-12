// Overzicht: één combo per scherm om de laptop mee rond te geven, daaronder alle affiches naast elkaar.
import type { Combo } from '../types';
import { COMBOS } from '../data/combos';
import { AFFICHE, VORIGE } from '../data/werken';
import { tekstOp } from '../lib/kleur';
import { aantal } from '../lib/stemmen';
import { kunst } from '../components/kunst';
import { bon } from '../components/bon';

const L = (c: Combo) => c.id.toUpperCase();

function dia(c: Combo, i: number, jaar: number) {
  const k = c.kleuren;
  return `<section class="c-dia" id="dia-${c.id}" aria-label="Combo ${L(c)}: ${c.naam}" style="--dia-p:${k.P.druk};--dia-tekst:${tekstOp(k.P.druk)};--dia-s:${k.S.druk}">
    <div class="c-dia__affiche">${kunst(AFFICHE, c)}</div>
    <div class="c-dia__info">
      <p class="c-dia__teller">${i + 1} / ${COMBOS.length}</p>
      <h2 class="c-dia__titel"><span class="c-dia__letter">${L(c)}</span>${c.naam}</h2>
      <ul class="c-dia__kleuren">
        ${[k.P, k.S, k.A].map((kl) => `<li><i style="background:${kl.druk}"></i>${kl.naam}</li>`).join('')}
      </ul>
      <div class="c-dia__bonnen">${bon('licht', c.bon.licht, c.bon.zwaar, jaar)}${bon('zwaar', c.bon.zwaar, c.bon.licht, jaar)}</div>
      <div class="c-dia__acties">
        <button type="button" class="c-dia__stem" data-stem="${c.id}" data-delta="1">Stem op ${L(c)}</button>
        <button type="button" class="c-dia__terug" data-stem="${c.id}" data-delta="-1" hidden>Stem ongedaan maken</button>
        <a class="c-dia__meer" href="#${c.id}">Huisstijl en drukwerk →</a>
      </div>
    </div>
  </section>`;
}

export function overzicht(jaar: number) {
  return `
  <main class="c-show" aria-label="Kleurvoorstellen Bosfeesten ${jaar}">
    <div class="c-show__spoor" tabindex="0">${COMBOS.map((c, i) => dia(c, i, jaar)).join('')}</div>
    <nav class="c-show__nav" aria-label="Combo kiezen">
      <button type="button" class="c-show__pijl" data-stap="-1" aria-label="Vorige combo">←</button>
      ${COMBOS.map((c, i) => `<button type="button" class="c-show__letter" data-naar="${i}"${i === 0 ? ' aria-current="true"' : ''} style="--kleur:${c.kleuren.P.druk}">${L(c)}</button>`).join('')}
      <button type="button" class="c-show__pijl" data-stap="1" aria-label="Volgende combo">→</button>
      <button type="button" class="c-show__alles" data-alles>Alles naast elkaar ↓</button>
    </nav>
  </main>

  <section class="c-alle" id="alle" aria-labelledby="alle-titel">
    <header class="c-alle__kop">
      <h2 class="c-alle__titel" id="alle-titel">Bosfeesten ${jaar}: welke kleuren?</h2>
      <p class="c-alle__uitleg">Klik een affiche om ze groot te zien en te stemmen. Geen rood, roze, hemelsblauw of mint: die waren van 2025 en 2026.</p>
    </header>
    <div class="c-alle__raster">
      ${COMBOS.map((c, i) => `
      <figure class="c-alle__item">
        <button type="button" class="c-alle__beeld" data-naar="${i}" aria-label="Combo ${L(c)} groot bekijken">${kunst(AFFICHE, c)}</button>
        <figcaption class="c-alle__naam"><b>${L(c)}</b> ${c.naam}<span class="c-alle__stemmen" data-telling="${c.id}">${aantal(c.id)}</span></figcaption>
      </figure>`).join('')}
    </div>
    <div class="c-alle__uitslag">
      <button type="button" class="c-knop" data-uitslag>Toon de stemmen</button>
      <button type="button" class="c-knop c-knop--rand" data-wis>Stemmen op nul</button>
    </div>
  </section>

  <section class="c-vorig" aria-labelledby="vorig-titel">
    <h2 class="c-vorig__titel" id="vorig-titel">Zo zag het er de vorige jaren uit</h2>
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
      <p class="c-vorig__tekst">In 2025 was blauw de lichte bon en rood de zware. In 2026 werd rood-roze net de lichte. Daarom is de lichte bon nu altijd een lichte kleur en de zware altijd de donkerste.</p>
    </div>
  </section>`;
}
