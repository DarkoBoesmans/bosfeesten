import { kop } from './kop';

export const maker = (jaar: number) => `
  <section class="c-hoofdstuk c-maker" id="maker" aria-labelledby="maker-titel">
    <div class="o-wrap">
      ${kop('maker', 8, 'Maak je post', 'Vul een artiest, dag en uur in, kies eventueel een foto en download het beeld. Klaar voor Instagram of Facebook.')}
      <div class="c-maker__werk" data-maker data-jaar="${jaar}">
        <form class="c-maker__form" data-maker-form>
          <label class="c-veld"><span>Artiest of titel</span><input id="m-naam" name="naam" type="text" maxlength="40" value="Jouw artiest" autocomplete="off"></label>
          <div class="c-veld__rij">
            <label class="c-veld"><span>Dag</span><select id="m-dag" name="dag">
              <option value="Vrijdag 13 augustus">Vrijdag 13</option><option value="Zaterdag 14 augustus" selected>Zaterdag 14</option><option value="Zondag 15 augustus">Zondag 15</option>
            </select></label>
            <label class="c-veld"><span>Uur</span><input id="m-uur" name="uur" type="text" maxlength="8" value="21u00"></label>
          </div>
          <fieldset class="c-veld c-veld--keuze"><legend>Podium</legend>
            <label><input type="radio" name="podium" value="Meis" checked><span>Meis</span></label>
            <label><input type="radio" name="podium" value="Plein"><span>Plein</span></label>
          </fieldset>
          <fieldset class="c-veld c-veld--keuze"><legend>Formaat</legend>
            <label><input type="radio" name="formaat" value="post" checked><span>Post 1080 × 1350</span></label>
            <label><input type="radio" name="formaat" value="story"><span>Story 1080 × 1920</span></label>
          </fieldset>
          <label class="c-veld c-veld--foto"><span>Foto (optioneel)</span><input id="m-foto" name="foto" type="file" accept="image/*"></label>
          <button type="button" class="c-knop c-knop--vol" data-maker-download>Download als PNG</button>
          <p class="c-maker__noot">Je foto blijft op je eigen toestel; niets wordt opgestuurd.</p>
        </form>
        <div class="c-maker__voorbeeld"><canvas class="c-maker__canvas" width="1080" height="1350" data-maker-canvas role="img" aria-label="Voorbeeld van je post"></canvas></div>
      </div>
    </div>
  </section>`;
