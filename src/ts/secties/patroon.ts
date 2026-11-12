import { bestand } from '../components/bestand';
import { kop } from './kop';

export const patroon = () => `
  <section class="o-sectie o-sectie--donker" id="patroon" aria-labelledby="patroon-titel">
    <div class="c-patroon" aria-hidden="true"></div>
    <div class="c-patroon__inhoud">
      ${kop('patroon', 'Patroon', 'De boompjes zijn het herkenningsteken van de Bosfeesten. Ze staan altijd in Groen op Indigo.')}
      <ul class="c-lijst">
        <li>Altijd als rand of achtergrond, nooit op Crème: daar komen tekst, programma en sponsors.</li>
        <li>Niet draaien, uitrekken of van grootte veranderen binnen één ontwerp.</li>
        <li>Tekst staat nooit rechtstreeks op het patroon, altijd op een vlak in Indigo of Crème.</li>
      </ul>
      <div class="c-bestanden">
        ${bestand('patroon/bosfeesten-patroon-indigo.svg', 'Tegel op Indigo')}
        ${bestand('patroon/bosfeesten-patroon-transparant.svg', 'Tegel zonder achtergrond')}
        ${bestand('patroon/bosfeesten-patroon-indigo.png', 'Patroon 2048 px')}
      </div>
    </div>
  </section>`;
