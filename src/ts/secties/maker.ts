import { kop } from './kop';

const keuze = (naam: string, opties: [string, string][], gekozen: string) =>
  opties.map(([w, t]) => `<label><input type="radio" name="${naam}" value="${w}"${w === gekozen ? ' checked' : ''}><span>${t}</span></label>`).join('');

const MODI: [string, string, string][] = [
  ['artiest', 'Artiest', 'Eén act met foto, dag, uur en podium'],
  ['lineup', 'Line-up', 'Alle acts van één dag onder elkaar'],
  ['aftellen', 'Aftellen', 'Hoeveel dagen nog tot de Bosfeesten'],
  ['vrij', 'Eigen post', 'Vrij spel: kies zelf wat erop komt'],
];
const DAGEN: [string, string, string][] = [['13', 'vr', 'Vrijdag'], ['14', 'za', 'Zaterdag'], ['15', 'zo', 'Zondag']];

export const maker = (jaar: number) => `
  <section class="c-hoofdstuk c-maker" id="maker" aria-labelledby="maker-titel">
    <div class="o-wrap">
      ${kop('maker', 8, 'Maak je post', 'Kies wat je wil aankondigen, vul het in en download het beeld. Kleuren, letters en logo staan vast, dus elke post is meteen in huisstijl. Alles gebeurt op je eigen toestel.')}
      <div class="c-maker__werk" data-maker data-jaar="${jaar}">
        <form class="c-maker__form" data-maker-form>
          <fieldset class="c-maker__groep">
            <legend><span class="c-stap" aria-hidden="true">1</span>Wat maak je?</legend>
            <div class="c-modus">${MODI.map(([w, t, u], i) => `<label><input type="radio" name="modus" value="${w}"${i === 0 ? ' checked' : ''}><span><b>${t}</b>${u}</span></label>`).join('')}</div>
          </fieldset>

          <fieldset class="c-maker__groep" data-voor="artiest">
            <legend><span class="c-stap" aria-hidden="true">2</span>Wie</legend>
            <label class="c-veld"><span>Artiest of titel</span><input name="naam" type="text" maxlength="40" value="Jouw artiest" autocomplete="off"></label>
            <label class="c-veld"><span>Extra regel <i>(optioneel)</i></span><input name="extra" type="text" maxlength="48" placeholder="Bv. live band, dj-set, mosselfestijn" autocomplete="off"></label>
          </fieldset>

          <fieldset class="c-maker__groep" data-voor="lineup" hidden>
            <legend><span class="c-stap" aria-hidden="true">2</span>Wie speelt er</legend>
            <label class="c-veld"><span>Eén act per regel: uur, naam en eventueel (Meis) of (Plein)</span>
              <textarea name="acts" rows="6" spellcheck="false">20u00 Artiest 1 (Plein)
21u30 Artiest 2 (Meis)
23u00 Artiest 3 (Meis)
01u00 Artiest 4 (Plein)</textarea></label>
          </fieldset>

          <fieldset class="c-maker__groep" data-voor="vrij" hidden>
            <legend><span class="c-stap" aria-hidden="true">2</span>Inhoud</legend>
            <label class="c-veld"><span>Tekst boven de afbeelding</span><textarea name="bovenschrift" rows="2" maxlength="90" placeholder="Typ hier je tekst"></textarea></label>
            <div class="c-schakels">
              <span class="c-schakels__titel">Wat staat erop?</span>
              ${[['toon_logo', 'Logo', true], ['toon_editie', 'Editie', true], ['toon_tekst', 'Tekst', true], ['toon_datum', 'Datum', true], ['toon_adres', 'Adres', false]]
                .map(([n, t, aan]) => `<label class="c-schakel"><input type="checkbox" name="${n}"${aan ? ' checked' : ''}><span>${t}</span></label>`).join('')}
            </div>
          </fieldset>

          <fieldset class="c-maker__groep" data-voor="aftellen" hidden>
            <legend><span class="c-stap" aria-hidden="true">2</span>Teaser</legend>
            <label class="c-veld"><span>Extra regel <i>(optioneel)</i></span><input name="teaser" type="text" maxlength="48" placeholder="Bv. de line-up komt deze vrijdag" autocomplete="off"></label>
          </fieldset>

          <fieldset class="c-maker__groep" data-voor="artiest lineup">
            <legend><span class="c-stap" aria-hidden="true">3</span>Wanneer</legend>
            <div class="c-dagen">${DAGEN.map(([n, k, lang]) => `<label><input type="radio" name="dag" value="${lang} ${n} augustus"${n === '14' ? ' checked' : ''}><span><b>${n}</b>${k}</span></label>`).join('')}</div>
            <div class="c-veld__rij" data-voor="artiest">
              <label class="c-veld"><span>Uur</span><input name="uur" type="text" maxlength="8" value="21u00"></label>
              <div class="c-veld c-veld--keuze"><span>Podium</span>${keuze('podium', [['Meis', 'Meis'], ['Plein', 'Plein'], ['', 'Geen']], 'Meis')}</div>
            </div>
          </fieldset>

          <fieldset class="c-maker__groep">
            <legend><span class="c-stap" aria-hidden="true">4</span>Beeld</legend>
            <div class="c-veld c-veld--keuze"><span>Formaat</span>${keuze('formaat', [['post', 'Post 4:5'], ['vierkant', 'Vierkant'], ['story', 'Story 9:16']], 'post')}</div>
            <div data-voor="artiest vrij">
              <label class="c-foto"><input name="foto" type="file" accept="image/*" class="c-foto__invoer"><span class="c-foto__knop">Kies een foto</span><span class="c-foto__naam" data-maker-bestand>Nog geen foto gekozen</span></label>
              <div class="c-maker__foto" data-maker-foto hidden>
                <label class="c-veld c-veld--schuif"><span>Inzoomen</span><input name="zoom" type="range" min="1" max="3" step="0.01" value="1"></label>
                <label class="c-vink"><input name="vrij" type="checkbox"><span>Uitgeknipte foto, zonder kader op het bos</span></label>
                <p class="c-maker__tip">Sleep in het voorbeeld om de foto te verschuiven.</p>
              </div>
            </div>
          </fieldset>
        </form>

        <div class="c-maker__rechts">
          <div class="c-maker__voorbeeld">
            <canvas class="c-maker__canvas" width="1080" height="1350" data-maker-canvas role="img" aria-label="Voorbeeld van je post"></canvas>
          </div>
          <div class="c-maker__acties">
            <button type="button" class="c-knop c-knop--vol" data-maker-download>Download als PNG <span class="c-knop__meta" data-maker-maat>1080 × 1350</span></button>
            <button type="button" class="c-knop c-knop--licht" data-maker-alles>Alle 3 formaten</button>
          </div>
          <div class="c-bijschrift">
            <div class="c-bijschrift__kop"><p>Bijschrift voor Instagram</p><button type="button" class="c-bijschrift__knop" data-maker-bijschrift>Kopieer</button></div>
            <p class="c-bijschrift__tekst" data-maker-tekst></p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
