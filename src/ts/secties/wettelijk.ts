import { FEEST } from '../data/feest';
import { kop } from './kop';

const blok = (titel: string, punten: string[]) => `<div class="c-wet__blok"><h3 class="c-wet__kop">${titel}</h3><ul class="c-lijst">${punten.map((p) => `<li>${p}</li>`).join('')}</ul></div>`;

export const wettelijk = (jaar: number) => `
  <section class="o-sectie o-sectie--donker" id="wettelijk" aria-labelledby="wettelijk-titel">
    ${kop('wettelijk', 'Wat moet erop', 'De regels voor affiches, flyers en borden, voor wie drukwerk of borden maakt. Dit is een samenvatting, geen juridisch advies; kijk bij twijfel na bij de stad Aalst.')}
    <div class="c-wet">
      ${blok('Op elk drukwerk', [
        'De <b>verantwoordelijke uitgever</b> (V.U.): naam en woonplaats van een meerderjarige persoon die in België woont, met het thuisadres.',
        `Voor een vzw daarbij de naam en het adres van de zetel: <i>${FEEST.organisator}, ${FEEST.adres}, ${FEEST.gemeente}</i>.`,
        'Zonder V.U. riskeer je een boete van 26 tot 200 euro of 8 dagen tot 2 maanden cel.',
        'Op de website en sociale media is geen V.U. nodig.',
        'Prijzen voor bezoekers staan altijd inclusief btw.',
      ])}
      ${blok('Flyers uitdelen', [
        'Niet onder ruitenwissers van geparkeerde auto’s.',
        'Niet in brievenbussen met een sticker tegen reclame, en niet bij leegstaande huizen.',
        'Altijd volledig in de brievenbus, niet ernaast of half erin.',
        'Achtergelaten flyers ruim je meteen op. Uitdeler, V.U. en organisator zijn samen verantwoordelijk.',
      ])}
      ${blok('Borden en pijlen in Aalst', [
        'Vraag het evenement aan via het evenementenloket van de stad: 12 weken op voorhand vanaf 500 bezoekers, 6 weken eronder.',
        'Pijlen vermeld je in die aanvraag. Je krijgt een referentiecode die op elke pijl moet staan.',
        'Pijlen zijn hoogstens 30 × 75 cm, hangen niet aan verkeerslichten, verkeersborden of straatmeubilair, en hangen er ten vroegste 48 uur voor de start en ten laatste 48 uur na afloop.',
        'Elke pijl die niet in orde is, kost 50 euro.',
        'Borden langs gemeentewegen zijn niet toegelaten. Langs gewestwegen beslist het Agentschap Wegen en Verkeer; op privégrond heb je vooraf schriftelijke toestemming van de eigenaar nodig.',
      ])}
    </div>
    <p class="c-wet__noot">Gecontroleerd in november ${jaar - 1}. Regels kunnen veranderen.</p>
  </section>`;
