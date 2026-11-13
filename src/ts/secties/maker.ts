import { kop } from './kop';

const keuze = (naam: string, opties: [string, string][], gekozen: string) =>
  opties.map(([w, t]) => `<label><input type="radio" name="${naam}" value="${w}"${w === gekozen ? ' checked' : ''}><span>${t}</span></label>`).join('');

export const maker = (jaar: number) => `
  <section class="c-hoofdstuk c-maker" id="maker" aria-labelledby="maker-titel">
    <div class="o-wrap">
      ${kop('maker', 8, 'Maak je post', 'Typ een naam, kies dag, uur en podium, zet er een foto in en download het beeld. Alles gebeurt op je eigen toestel.')}
      <div class="c-maker__werk" data-maker data-jaar="${jaar}">
        <form class="c-maker__form" data-maker-form>
          <fieldset class="c-maker__groep">
            <legend>1 · Wie</legend>
            <label class="c-veld"><span>Artiest of titel</span><input name="naam" type="text" maxlength="40" value="Jouw artiest" autocomplete="off"></label>
            <label class="c-veld"><span>Extra regel <i>(optioneel)</i></span><input name="extra" type="text" maxlength="48" placeholder="Bv. live band, dj-set, mosselfestijn" autocomplete="off"></label>
          </fieldset>
          <fieldset class="c-maker__groep">
            <legend>2 · Wanneer en waar</legend>
            <div class="c-veld__rij">
              <label class="c-veld"><span>Dag</span><select name="dag">
                <option value="Vrijdag 13 augustus">Vrijdag 13</option><option value="Zaterdag 14 augustus" selected>Zaterdag 14</option><option value="Zondag 15 augustus">Zondag 15</option>
              </select></label>
              <label class="c-veld"><span>Uur</span><input name="uur" type="text" maxlength="8" value="21u00"></label>
            </div>
            <div class="c-veld c-veld--keuze"><span>Podium</span>${keuze('podium', [['Meis', 'Meis'], ['Plein', 'Plein'], ['', 'Geen']], 'Meis')}</div>
          </fieldset>
          <fieldset class="c-maker__groep">
            <legend>3 · Beeld</legend>
            <div class="c-veld c-veld--keuze"><span>Formaat</span>${keuze('formaat', [['post', 'Post 4:5'], ['vierkant', 'Vierkant'], ['story', 'Story 9:16']], 'post')}</div>
            <label class="c-veld c-veld--foto"><span>Foto</span><input name="foto" type="file" accept="image/*"></label>
            <div class="c-maker__foto" data-maker-foto hidden>
              <label class="c-veld c-veld--schuif"><span>Inzoomen</span><input name="zoom" type="range" min="1" max="3" step="0.01" value="1"></label>
              <label class="c-vink"><input name="vrij" type="checkbox"><span>Uitgeknipte foto, zonder kader op het bos</span></label>
              <p class="c-maker__tip">Sleep in het voorbeeld om de foto te verschuiven.</p>
            </div>
          </fieldset>
          <button type="button" class="c-knop c-knop--vol" data-maker-download>Download als PNG</button>
        </form>
        <div class="c-maker__voorbeeld">
          <canvas class="c-maker__canvas" width="1080" height="1350" data-maker-canvas role="img" aria-label="Voorbeeld van je post"></canvas>
          <p class="c-maker__maat" data-maker-maat>1080 × 1350 px</p>
        </div>
      </div>
    </div>
  </section>`;
