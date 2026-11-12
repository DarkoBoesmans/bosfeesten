// Overzicht na de keuze: de gekozen combo eerst, schermvullend, daarna de andere voorstellen.
import type { Combo } from '../types';
import { KEUZE, OP_VOLGORDE, gekozen } from '../data/combos';
import { AFFICHE, VORIGE } from '../data/werken';
import { tekstOp } from '../lib/kleur';
import { kunst } from '../components/kunst';
import { bon } from '../components/bon';

const L = (c: Combo) => c.id.toUpperCase();
const isKeuze = (c: Combo) => c.id === KEUZE.id;

function dia(c: Combo, jaar: number) {
  const k = c.kleuren;
  return `<section class="c-dia" id="dia-${c.id}" aria-label="Combo ${L(c)}: ${c.naam}" style="--dia-p:${k.P.druk};--dia-tekst:${tekstOp(k.P.druk)};--dia-s:${k.S.druk}">
    <div class="c-dia__affiche">${kunst(AFFICHE, c)}</div>
    <div class="c-dia__info">
      <p class="c-dia__teller">${isKeuze(c) ? `Gekozen op ${KEUZE.datum}` : `Voorstel ${L(c)}, niet gekozen`}</p>
      <h2 class="c-dia__titel"><span class="c-dia__letter">${L(c)}</span>${c.naam}</h2>
      <ul class="c-dia__kleuren">
        ${[k.P, k.S, k.A].map((kl) => `<li><i style="background:${kl.druk}"></i>${kl.naam}</li>`).join('')}
      </ul>
      <div class="c-dia__bonnen">${bon('licht', c.bon.licht, c.bon.zwaar, jaar)}${bon('zwaar', c.bon.zwaar, c.bon.licht, jaar)}</div>
      <div class="c-dia__acties">
        <a class="c-dia__knop${isKeuze(c) ? ' c-dia__knop--vol' : ''}" href="#${c.id}">${isKeuze(c) ? 'Open de huisstijl' : 'Bekijk dit voorstel'} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>`;
}

export function overzicht(jaar: number) {
  const winnaar = gekozen();
  return `
  <main class="c-show" aria-label="Kleuren Bosfeesten ${jaar}">
    <div class="c-show__spoor" tabindex="0">${OP_VOLGORDE.map((c) => dia(c, jaar)).join('')}</div>
    <nav class="c-show__nav" aria-label="Combo kiezen">
      <button type="button" class="c-show__pijl" data-stap="-1" aria-label="Vorige combo">←</button>
      ${OP_VOLGORDE.map((c, i) => `<button type="button" class="c-show__letter" data-naar="${i}"${i === 0 ? ' aria-current="true"' : ''} style="--kleur:${c.kleuren.P.druk}" aria-label="Combo ${L(c)}${isKeuze(c) ? ', gekozen' : ''}">${L(c)}</button>`).join('')}
      <button type="button" class="c-show__pijl" data-stap="1" aria-label="Volgende combo">→</button>
      <button type="button" class="c-show__alles" data-alles>Alles naast elkaar ↓</button>
    </nav>
  </main>

  <section class="c-alle" id="alle" aria-labelledby="alle-titel">
    <header class="c-alle__kop">
      <h2 class="c-alle__titel" id="alle-titel">Bosfeesten ${jaar} wordt ${winnaar.naam}</h2>
      <p class="c-alle__uitleg">Gekozen op ${KEUZE.datum} uit vijf voorstellen. Klik een affiche om ze groot te zien.</p>
    </header>
    <div class="c-alle__raster">
      ${OP_VOLGORDE.map((c, i) => `
      <figure class="c-alle__item${isKeuze(c) ? ' c-alle__item--keuze' : ''}">
        <button type="button" class="c-alle__beeld" data-naar="${i}" aria-label="Combo ${L(c)} groot bekijken">${kunst(AFFICHE, c)}</button>
        <figcaption class="c-alle__naam"><b>${L(c)}</b> ${c.naam}${isKeuze(c) ? '<span class="c-alle__tag">Gekozen</span>' : ''}</figcaption>
      </figure>`).join('')}
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
