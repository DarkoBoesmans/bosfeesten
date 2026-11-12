import type { Combo, Rol } from '../types';
import { COMBOS } from '../data/combos';
import { VOORBEELDEN, VORIGE } from '../data/werken';
import { KLEUREN } from '../data/kleuren';
import { contrast, cmykTekst, inkt, tekstOp } from '../lib/kleur';
import { kunst } from '../components/kunst';
import { bon } from '../components/bon';

const letter = (id: string) => id.toUpperCase();
const oordeel = (v: number) => (v >= 4.5 ? 'goed voor alle tekst' : v >= 3 ? 'goed voor grote tekst' : 'alleen voor grote titels');

const ROLLEN: { r: Rol; rol: string; gebruik: string }[] = [
  { r: 'P', rol: 'Primary · 60%', gebruik: 'Achtergrond van affiche en flyer, altijd onder het boompjespatroon.' },
  { r: 'S', rol: 'Secondary · 30%', gebruik: 'Boompjespatroon, rand rond de titel, jaartal en Meis-badge.' },
  { r: 'A', rol: 'Accent · 10%', gebruik: 'Datumblokken, uren, Plein-badge en knoppen op de site.' },
  { r: 'L', rol: 'Papier', gebruik: 'Papierkleur, titel "BOS FEESTEN" en tekst op gekleurde vlakken.' },
];

function kleurkaart(c: Combo, r: Rol, rol: string, gebruik: string) {
  const k = c.kleuren[r];
  const kopie = (t: string) => `<button type="button" class="c-kopie" data-kopie="${t}">${t}</button>`;
  return `<article class="c-kleur">
    <div class="c-kleur__vlak">
      <span class="c-kleur__druk" style="background:${k.druk};color:${tekstOp(k.druk)}"><span class="c-kleur__rol">${rol}</span><span class="c-kleur__naam">${k.naam}</span></span>
      <span class="c-kleur__scherm" style="background:${k.scherm};color:${tekstOp(k.scherm)}">scherm</span>
    </div>
    <dl class="c-kleur__waarden">
      <div><dt>CMYK</dt><dd>${kopie(cmykTekst(k.cmyk))}</dd></div>
      <div><dt>Hex druk</dt><dd>${kopie(k.druk)}</dd></div>
      <div><dt>Hex scherm</dt><dd>${kopie(k.scherm)}</dd></div>
      <div><dt>Inkt</dt><dd>${inkt(k.cmyk)}% totaal</dd></div>
    </dl>
    <p class="c-kleur__gebruik">${gebruik}</p>
    ${r === 'L' ? '' : `<p class="c-kleur__afstand">${k.graden}° van ${k.dichtst} op de kleurcirkel.</p>`}
  </article>`;
}

export function huisstijl(c: Combo, jaar: number) {
  const k = c.kleuren;
  const creme = KLEUREN.creme.druk;
  const merk = [k.P, k.S, k.A];
  return `<div class="o-pagina">
  <nav class="c-pad" aria-label="Combo's">
    <a class="c-pad__link c-pad__link--terug" href="#">Alle combo's</a>
    ${COMBOS.map((x) => `<a class="c-pad__link" href="#${x.id}"${x.id === c.id ? ' aria-current="page"' : ''}><i style="background:${x.kleuren.P.druk}"></i><i style="background:${x.kleuren.S.druk}"></i><i style="background:${x.kleuren.A.druk}"></i>${letter(x.id)} · ${x.naam}</a>`).join('')}
  </nav>
  <main>
    <header class="c-held" style="background:${k.P.druk};color:${tekstOp(k.P.druk)}">
      <div class="c-held__tekst">
        <p class="c-held__letter">${letter(c.id)}</p>
        <h1 class="c-held__titel">${c.naam}</h1>
        <p class="c-held__zin">${c.zin}</p>
        <p class="c-held__harmonie">${c.harmonie}</p>
        <p class="c-held__jaar">Huisstijl Bosfeesten ${jaar}</p>
      </div>
      <div class="c-held__bonnen">
        ${bon('licht', c.bon.licht, c.bon.zwaar, jaar)}
        ${bon('zwaar', c.bon.zwaar, c.bon.licht, jaar)}
      </div>
    </header>

    <section class="o-sectie" aria-labelledby="vb-titel">
      <h2 class="c-sectie-titel" id="vb-titel">Drukwerk in deze kleuren</h2>
      <p class="c-sectie-tekst">Rechtstreeks uit drukwerk.af, automatisch herkleurd. Opmaak en teksten zijn die van nu. Klik om groot te bekijken.</p>
      <div class="c-voorbeelden">
        ${VOORBEELDEN.map((w) => `<figure class="c-voorbeeld"><button type="button" class="c-voorbeeld__knop" data-vergroot aria-label="${w.titel} groot bekijken">${kunst(w, c)}</button><figcaption>${w.titel}</figcaption></figure>`).join('')}
      </div>
    </section>

    <section class="o-sectie" aria-labelledby="kleuren-titel">
      <h2 class="c-sectie-titel" id="kleuren-titel">Kleuren</h2>
      <p class="c-sectie-tekst">Typ in drukwerk.af de CMYK-waarden in de hoofdstalen. "Hex scherm" is de fellere versie voor de website, Instagram en Facebook. Klik op een waarde om ze te kopiëren.</p>
      <div class="c-kleuren">${ROLLEN.map(({ r, rol, gebruik }) => kleurkaart(c, r, rol, gebruik)).join('')}</div>
    </section>

    <section class="o-sectie o-gulden" aria-labelledby="bon-titel">
      <div>
        <h2 class="c-sectie-titel" id="bon-titel">Drankbonnen</h2>
        <ul class="c-lijst">
          <li>Lichte drank is ${c.bon.licht.naam}, de lichtste kleur. Zware drank is ${c.bon.zwaar.naam}, de donkerste.</li>
          <li>Het verschil zit ook in helderheid, dus aan de toog in het donker en voor kleurenblinden blijven ze uit elkaar te houden.</li>
          <li>Geen rood, roze, hemelsblauw of mint, zodat een bon van vorig jaar meteen opvalt.</li>
        </ul>
      </div>
      <div>
        <h3 class="c-sectie-titel c-sectie-titel--klein">Vorige jaren</h3>
        <div class="c-oudebonnen">
          ${VORIGE.map((v) => `<figure><img src="assets/vorig/bon-${v.jaar}-licht.webp" alt="Lichte drankbon ${v.jaar}" width="500" height="301" loading="lazy"><img src="assets/vorig/bon-${v.jaar}-zwaar.webp" alt="Zware drankbon ${v.jaar}" width="500" height="301" loading="lazy"><figcaption>${v.jaar}: licht links, zwaar rechts</figcaption></figure>`).join('')}
        </div>
      </div>
    </section>

    <section class="o-sectie o-gulden" aria-labelledby="regels-titel">
      <div>
        <h2 class="c-sectie-titel" id="regels-titel">Verhouding en regels</h2>
        <div class="c-verhouding" role="img" aria-label="Verhouding 60 procent ${k.P.naam}, 30 procent ${k.S.naam}, 10 procent ${k.A.naam}">
          ${merk.map((kl, i) => `<span style="flex:${[60, 30, 10][i]};background:${kl.druk};color:${tekstOp(kl.druk)}">${[60, 30, 10][i]}</span>`).join('')}
        </div>
        <ul class="c-lijst">
          <li>Het boompjespatroon staat in ${k.S.naam} op ${k.P.naam}, nooit op ${k.L.naam}.</li>
          <li>De titel "BOS FEESTEN" is ${k.L.naam} met een rand in ${k.S.naam}.</li>
          <li>Lange tekst staat in ${c.bon.zwaar.naam} op ${k.L.naam}.</li>
          <li>Plein krijgt ${k.A.naam}, Meis krijgt ${k.B.naam}.</li>
          <li>Logo's van sponsors blijven in hun eigen kleuren op ${k.L.naam}.</li>
        </ul>
      </div>
      <div>
        <h3 class="c-sectie-titel c-sectie-titel--klein">Lettertypes</h3>
        <p class="c-letter c-letter--titel">Hipstelvetica</p>
        <p class="c-letter__uitleg">Titels, logo, badges</p>
        <p class="c-letter c-letter--slab">Roboto Slab 13 Augustus</p>
        <p class="c-letter__uitleg">Datums, uren en prijzen</p>
        <p class="c-letter">Poppins voor alle andere tekst</p>
        <h3 class="c-sectie-titel c-sectie-titel--klein">Crème tekst lezen</h3>
        <dl class="c-contrast">
          ${merk.map((kl) => { const v = contrast(creme, kl.druk); return `<div><dt><i style="background:${kl.druk}"></i>op ${kl.naam}</dt><dd>${v.toFixed(1)}:1, ${oordeel(v)}</dd></div>`; }).join('')}
        </dl>
      </div>
    </section>

    <nav class="c-verder" aria-label="Andere combo's">
      ${COMBOS.filter((x) => x.id !== c.id).map((x) => `<a class="c-verder__link" href="#${x.id}" style="background:${x.kleuren.P.druk};color:${tekstOp(x.kleuren.P.druk)}"><span>Combo ${letter(x.id)}</span>${x.naam}</a>`).join('')}
    </nav>
  </main></div>`;
}
