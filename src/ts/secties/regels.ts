import { CREME, GROEN, INDIGO, MANDARIJN } from '../data/kleuren';
import { contrast } from '../lib/kleur';
import { kop } from './kop';

const oordeel = (v: number) => (v >= 4.5 ? 'goed voor alle tekst' : v >= 3 ? 'goed voor grote tekst' : 'alleen grote titels met rand');

export const regels = () => `
  <section class="o-sectie" id="regels" aria-labelledby="regels-titel">
    ${kop('regels', 'Wel en niet')}
    <div class="c-welniet">
      <div><h3 class="c-welniet__kop">Wel</h3><ul class="c-lijst">
        <li>De titel "BOS FEESTEN" in Crème met een rand in Groen, het jaartal in Mandarijn.</li>
        <li>Lange tekst in Indigo op Crème.</li>
        <li>Plein krijgt Mandarijn, Meis krijgt Groen.</li>
        <li>Sponsorlogo's in hun eigen kleuren op Crème.</li>
      </ul></div>
      <div><h3 class="c-welniet__kop">Niet</h3><ul class="c-lijst c-lijst--niet">
        <li>Andere kleuren, tinten of verlopen toevoegen.</li>
        <li>Kleine tekst in Crème op Groen of Mandarijn.</li>
        <li>Groen als groot vlak: van ver lijkt dat op het mintgroen van 2026.</li>
        <li>Kleuren van 2025 of 2026 hergebruiken.</li>
      </ul></div>
    </div>
    <dl class="c-contrast" aria-label="Leesbaarheid van Crème tekst">
      ${[INDIGO, GROEN, MANDARIJN].map((k) => { const v = contrast(CREME.druk, k.druk); return `<div><dt><i style="background:${k.druk}"></i>Crème op ${k.naam}</dt><dd>${v.toFixed(1).replace('.', ',')} : 1, ${oordeel(v)}</dd></div>`; }).join('')}
    </dl>
  </section>`;
