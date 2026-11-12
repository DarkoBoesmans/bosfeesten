// Huisstijl per combo. Voor de gekozen combo is dit de volledige huisstijl, ook als afdrukversie.
import type { Combo, Rol } from '../types';
import { COMBOS, KEUZE, OP_VOLGORDE, gekozen } from '../data/combos';
import { AFFICHE, VOORBEELDEN, VORIGE } from '../data/werken';
import { KLEUREN } from '../data/kleuren';
import { contrast, cmykTekst, inkt, tekstOp } from '../lib/kleur';
import { kunst } from '../components/kunst';
import { bon } from '../components/bon';
import { logoTegel } from '../components/logo';

const letter = (id: string) => id.toUpperCase();
const oordeel = (v: number) => (v >= 4.5 ? 'goed voor alle tekst' : v >= 3 ? 'goed voor grote tekst' : 'alleen voor grote titels met rand');

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
  </article>`;
}

const sectie = (id: string, titel: string, inhoud: string, tekst = '') => `
    <section class="o-sectie c-sectie" aria-labelledby="${id}">
      <h2 class="c-sectie-titel" id="${id}">${titel}</h2>
      ${tekst ? `<p class="c-sectie-tekst">${tekst}</p>` : ''}
      ${inhoud}
    </section>`;

export function huisstijl(c: Combo, jaar: number) {
  const k = c.kleuren;
  const creme = KLEUREN.creme;
  const merk = [k.P, k.S, k.A];
  const keuze = c.id === KEUZE.id;
  const winnaar = gekozen();
  const donker = c.bon.zwaar;

  return `<div class="o-pagina">
  <nav class="c-pad" aria-label="Combo's">
    <a class="c-pad__link c-pad__link--terug" href="#">Overzicht</a>
    ${OP_VOLGORDE.map((x) => `<a class="c-pad__link" href="#${x.id}"${x.id === c.id ? ' aria-current="page"' : ''}><i style="background:${x.kleuren.P.druk}"></i><i style="background:${x.kleuren.S.druk}"></i><i style="background:${x.kleuren.A.druk}"></i>${letter(x.id)} · ${x.naam}${x.id === KEUZE.id ? ' (gekozen)' : ''}</a>`).join('')}
  </nav>
  ${keuze ? '' : `<p class="c-melding">Dit voorstel is niet gekozen. De huisstijl van Bosfeesten ${jaar} is <a href="#${winnaar.id}">${letter(winnaar.id)} · ${winnaar.naam}</a>.</p>`}
  <main>
    <header class="c-held" style="background:${k.P.druk};color:${tekstOp(k.P.druk)}">
      <div class="c-held__tekst">
        <p class="c-held__letter">${letter(c.id)}</p>
        <h1 class="c-held__titel">${c.naam}</h1>
        <p class="c-held__zin">${c.zin}</p>
        <p class="c-held__harmonie">${c.harmonie}</p>
        <p class="c-held__jaar">${keuze ? `Huisstijl Bosfeesten ${jaar} · gekozen op ${KEUZE.datum}` : `Voorstel voor Bosfeesten ${jaar}`}</p>
        ${keuze ? '<button type="button" class="c-held__print" data-print>Afdrukken of bewaren als pdf</button>' : ''}
      </div>
      <div class="c-held__bonnen">
        ${bon('licht', c.bon.licht, c.bon.zwaar, jaar)}
        ${bon('zwaar', c.bon.zwaar, c.bon.licht, jaar)}
      </div>
    </header>

    ${sectie('vb-titel', 'Drukwerk', `<div class="c-voorbeelden">
        ${VOORBEELDEN.map((w) => `<figure class="c-voorbeeld"><button type="button" class="c-voorbeeld__knop" data-vergroot aria-label="${w.titel} groot bekijken">${kunst(w, c)}</button><figcaption>${w.titel}</figcaption></figure>`).join('')}
      </div>`, 'Rechtstreeks uit drukwerk.af, automatisch herkleurd. Opmaak en teksten zijn die van nu. Klik om groot te bekijken.')}

    ${sectie('kleuren-titel', 'Kleuren', `<div class="c-kleuren">${ROLLEN.map(({ r, rol, gebruik }) => kleurkaart(c, r, rol, gebruik)).join('')}</div>
      <div class="c-verhouding" role="img" aria-label="Verhouding 60 procent ${k.P.naam}, 30 procent ${k.S.naam}, 10 procent ${k.A.naam}">
        ${merk.map((kl, i) => `<span style="flex:${[60, 30, 10][i]};background:${kl.druk};color:${tekstOp(kl.druk)}">${[60, 30, 10][i]}% ${kl.naam}</span>`).join('')}
      </div>`, 'Gebruik in drukwerk.af altijd de CMYK-waarden. "Hex scherm" is de fellere versie voor de website, Instagram en Facebook. Klik op een waarde om ze te kopiëren.')}

    ${sectie('logo-titel', 'Logo', `<div class="c-logos">
        ${logoTegel(creme, k.P, true, `${creme.naam} op ${k.P.naam}: de standaard.`)}
        ${logoTegel(k.P, creme, true, `${k.P.naam} op ${creme.naam}: op papier en sponsorvlakken.`)}
        ${logoTegel(donker, k.A, true, `${donker.naam} op ${k.A.naam}: op kleine badges.`)}
        ${logoTegel(k.S, creme, false, `${k.S.naam} op ${creme.naam}: te weinig contrast.`)}
        ${logoTegel(creme, k.P, false, 'uitgerekt of vervormd.', ' c-logo--uitgerekt')}
        ${logoTegel(k.A, k.S, false, `${k.A.naam} op ${k.S.naam}: de kleuren vechten.`)}
      </div>
      <ul class="c-lijst">
        <li>Laat rond het logo een vrije rand van minstens een kwart van zijn breedte.</li>
        <li>Gebruik het logo altijd in één kleur, nooit met een schaduw, verloop of omlijning.</li>
        <li>In de titel staat het logo in de O van BOS, in de kleur van het patroon.</li>
      </ul>
      <p class="c-downloads">Logobestanden: <a href="assets/logo/logo-zwart.svg" download>logo zwart (svg)</a> · <a href="assets/logo/logo-wit.svg" download>logo wit (svg)</a></p>`)}

    ${sectie('letter-titel', 'Lettertypes', `<div class="c-letters">
        <div class="c-letters__rij"><p class="c-letters__voorbeeld c-letters__voorbeeld--titel">Bos ${jaar} Feesten</p><p class="c-letters__uitleg"><b>Hipstelvetica</b>, altijd in hoofdletters. Titels, jaartal, badges en knoppen. Grote titels krijgen een rand in ${k.S.naam}.</p></div>
        <div class="c-letters__rij"><p class="c-letters__voorbeeld c-letters__voorbeeld--slab">13, 14 &amp; 15 Augustus · 21u00 · € 2,50</p><p class="c-letters__uitleg"><b>Roboto Slab</b> vet. Datums, uren en prijzen.</p></div>
        <div class="c-letters__rij"><p class="c-letters__voorbeeld c-letters__voorbeeld--tekst">Optocht Muziekkapel, Mosselfestijn, DJ's en een volle wei aan de Eerste Bochtweg in Gijzegem.</p><p class="c-letters__uitleg"><b>Poppins</b> normaal of medium. Alle andere tekst, programma en uitleg.</p></div>
      </div>`)}

    ${sectie('patroon-titel', 'Patroon', `<div class="o-gulden">
        <div class="c-patroon">${kunst(AFFICHE, c)}</div>
        <ul class="c-lijst">
          <li>Het boompjespatroon staat altijd in ${k.S.naam} op ${k.P.naam}.</li>
          <li>Nooit op ${creme.naam}: daar komen tekst, programma en sponsors.</li>
          <li>Niet draaien, uitrekken of van grootte veranderen binnen één stuk drukwerk.</li>
          <li>Tekst komt nooit rechtstreeks op het patroon, altijd in een vlak in ${creme.naam} of ${k.A.naam}.</li>
        </ul>
      </div>`)}

    ${sectie('bon-titel', 'Drankbonnen', `<div class="o-gulden">
        <ul class="c-lijst">
          <li>Lichte drank is ${c.bon.licht.naam} met letters in ${c.bon.zwaar.naam}. Zware drank is ${c.bon.zwaar.naam} met letters in ${c.bon.licht.naam}.</li>
          <li>Het jaartal staat altijd in ${creme.naam}.</li>
          <li>Het verschil zit ook in helderheid, dus aan de toog in het donker en voor kleurenblinden blijven ze uit elkaar te houden.</li>
          <li>Geen rood, roze, hemelsblauw, mint of groen: zo valt een bon van 2025 of 2026 meteen op.</li>
        </ul>
        <div class="c-oudebonnen">
          <figure>${bon('licht', c.bon.licht, c.bon.zwaar, jaar)}${bon('zwaar', c.bon.zwaar, c.bon.licht, jaar)}<figcaption><b>${jaar}</b>: licht links, zwaar rechts</figcaption></figure>
          ${VORIGE.map((v) => `<figure><img src="assets/vorig/bon-${v.jaar}-licht.webp" alt="Lichte drankbon ${v.jaar}" width="500" height="301" loading="lazy"><img src="assets/vorig/bon-${v.jaar}-zwaar.webp" alt="Zware drankbon ${v.jaar}" width="500" height="301" loading="lazy"><figcaption>${v.jaar}: licht links, zwaar rechts</figcaption></figure>`).join('')}
        </div>
      </div>`)}

    ${sectie('regels-titel', 'Wel en niet', `<div class="c-welniet">
        <div><h3 class="c-welniet__kop">Wel</h3><ul class="c-lijst">
          <li>Titel "BOS FEESTEN" in ${creme.naam} met een rand in ${k.S.naam}.</li>
          <li>Lange tekst in ${donker.naam} op ${creme.naam}.</li>
          <li>Plein krijgt ${k.A.naam}, Meis krijgt ${k.B.naam}.</li>
          <li>Sponsorlogo's in hun eigen kleuren op ${creme.naam}.</li>
        </ul></div>
        <div><h3 class="c-welniet__kop">Niet</h3><ul class="c-lijst c-lijst--niet">
          <li>Andere kleuren toevoegen, ook geen tinten of verlopen van de merkkleuren.</li>
          <li>Kleine tekst in ${creme.naam} op ${k.S.naam} of ${k.A.naam}: te weinig contrast.</li>
          <li>${k.S.naam} als groot vlak: van ver lijkt dat op vorig jaar.</li>
          <li>Kleuren van 2025 of 2026 hergebruiken.</li>
        </ul></div>
      </div>
      <dl class="c-contrast">
        ${merk.map((kl) => { const v = contrast(creme.druk, kl.druk); return `<div><dt><i style="background:${kl.druk}"></i>${creme.naam} tekst op ${kl.naam}</dt><dd>${v.toFixed(1)}:1, ${oordeel(v)}</dd></div>`; }).join('')}
      </dl>`)}

    <nav class="c-verder" aria-label="Andere combo's">
      ${COMBOS.filter((x) => x.id !== c.id).map((x) => `<a class="c-verder__link" href="#${x.id}" style="background:${x.kleuren.P.druk};color:${tekstOp(x.kleuren.P.druk)}"><span>${x.id === KEUZE.id ? 'Gekozen' : `Voorstel ${letter(x.id)}`}</span>${x.naam}</a>`).join('')}
    </nav>
  </main></div>`;
}
