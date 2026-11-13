import { bestand } from '../components/bestand';
import { kop } from './kop';

export const patroon = () => `
  <section class="c-hoofdstuk c-patroon" id="patroon" aria-labelledby="patroon-titel" data-patroon>
    <div class="c-patroon__bos" aria-hidden="true"></div>
    <div class="c-patroon__kaart" data-toon>
      ${kop('patroon', 4, 'Patroon', 'De boompjes zijn het herkenningsteken. Beweeg over het bos.')}
      <ul class="c-lijst">
        <li>Altijd Groen op Indigo, als rand of als achtergrond.</li>
        <li>Nooit op Crème: daar komen tekst, programma en sponsors.</li>
        <li>Niet draaien, uitrekken of van grootte wisselen binnen één ontwerp.</li>
        <li>Tekst staat nooit los op het patroon, altijd op een vlak.</li>
      </ul>
      <div class="c-bestanden">
        ${bestand('patroon/bosfeesten-patroon-indigo.svg', 'Tegel op Indigo')}
        ${bestand('patroon/bosfeesten-patroon-transparant.svg', 'Tegel zonder achtergrond')}
        ${bestand('patroon/bosfeesten-patroon-indigo.png', 'Patroon, 2048 px')}
      </div>
    </div>
  </section>`;
