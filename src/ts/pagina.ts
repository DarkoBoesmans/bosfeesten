// De volledige pagina als HTML-tekst. build.ts zet die bij het bouwen in index.html,
// zodat alles ook zonder JavaScript en voor zoekmachines leesbaar is.
import { editie } from './data/feest';
import { nav } from './components/nav';
import { lightbox } from './components/lightbox';
import { held } from './secties/held';
import { kleuren } from './secties/kleuren';
import { logo } from './secties/logo';
import { letters } from './secties/letters';
import { patroon } from './secties/patroon';
import { drukwerk } from './secties/drukwerk';
import { bonnen } from './secties/bonnen';
import { sociaal } from './secties/sociaal';
import { regels } from './secties/regels';
import { wettelijk } from './secties/wettelijk';
import { downloads } from './secties/downloads';
import { voet } from './secties/voet';

export function pagina(vandaag = new Date()) {
  const { jaar, nummer } = editie(vandaag);
  return {
    jaar,
    nummer,
    html: [
      nav(jaar),
      `<main id="inhoud">${held(jaar, nummer)}${kleuren()}${logo()}${letters(jaar)}${patroon()}${drukwerk()}${bonnen(jaar)}${sociaal()}${regels()}${wettelijk(jaar)}${downloads()}</main>`,
      voet(jaar, nummer),
      lightbox(),
    ].join(''),
  };
}
