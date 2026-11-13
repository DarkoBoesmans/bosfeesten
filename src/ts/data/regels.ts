// Alle regels voor communicatie rond de Bosfeesten, elk met de bron om ze na te kijken.
// Samengesteld in november 2026. Geen juridisch advies.
import type { Regel } from '../types';

const VLAIO_FLYER = { naam: 'VLAIO, flyeren en drukwerk', url: 'https://www.vlaio.be/nl/nieuws/flyeren-drukwerk-bedelen-wees-je-bewust-van-alle-regels' };
const UNIZO_VU = { naam: 'UNIZO, verantwoordelijke uitgever', url: 'https://www.unizo.be/ondernemersgids/juridisch/intellectuele-eigendom/intellectuele-eigendom-algemeen' };
const UNIZO_PRIJS = { naam: 'UNIZO, prijsaanduiding', url: 'https://www.unizo.be/ondernemersgids/bedrijfsvoering/marketing-en-verkoop/prijsaanduiding' };
const VLAIO_WEB = { naam: 'VLAIO, verplichte gegevens online', url: 'https://www.vlaio.be/nl/nieuws/website-facebookpagina-van-je-bedrijf-deze-gegevens-zijn-verplicht' };
const KBO = { naam: 'KBO Public Search (FOD Economie)', url: 'https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html' };
const FOTO = { naam: 'Sirius Legal, foto’s op sociale media', url: 'https://legalnews.be/privacy-gegevensbescherming/een-foto-posten-op-sociale-media-niet-zonder-geldige-rechtsgrond-sirius-legal/' };
const AALST_APV = { naam: 'Stad Aalst, algemene politieverordening', url: 'https://aalst.be/sites/default/files/2024-03/algemene_politieverordening_aalst.pdf' };
const AALST_EV = { naam: 'Stad Aalst, een evenement aanvragen', url: 'https://aalst.be/cultuur-sport-en-vrije-tijd/evenementen-en-activiteiten/zelf-een-evenement-organiseren/een' };
const AALST_ORG = { naam: 'Stad Aalst, zelf een evenement organiseren', url: 'https://aalst.be/cultuur-sport-en-vrije-tijd/evenementen-en-activiteiten/zelf-een-evenement-organiseren' };
const VLAIO_BORD = { naam: 'VLAIO, reclameborden en wegwijzers', url: 'https://www.vlaio.be/nl/nieuws/mag-ik-een-reclamebord-wegwijzer-naar-mijn-bedrijf-plaatsen' };
const ALCOHOL = { naam: 'Vlaanderen.be, verkoop van alcohol', url: 'https://www.vlaanderen.be/regels-voor-verkoop-van-alcohol' };
const RECLAME = { naam: 'Jubel, convenant alcoholreclame 2025', url: 'https://www.jubel.be/alcoholreclame-nieuwe-soft-law-regels-in-werking/' };

export const REGELGROEPEN: { titel: string; kort: string; regels: Regel[] }[] = [
  {
    titel: 'Op elk drukwerk',
    kort: 'Affiche, flyer, folder, prijslijst',
    regels: [
      { tekst: 'Vermeld een verantwoordelijke uitgever (V.U.): de naam en het thuisadres van een meerderjarige die in België woont. Een vereniging alleen is niet genoeg.', bron: VLAIO_FLYER },
      { tekst: 'Een vzw zet daar ook haar naam en het adres van haar zetel bij.', bron: VLAIO_FLYER },
      { tekst: 'Zonder V.U. riskeer je een boete van 26 tot 200 euro of 8 dagen tot 2 maanden cel.', bron: VLAIO_FLYER },
      { tekst: 'Prijzen voor bezoekers zijn altijd de totaalprijs, met btw en alle taksen, leesbaar en ondubbelzinnig.', bron: UNIZO_PRIJS },
    ],
  },
  {
    titel: 'Online',
    kort: 'Website, Instagram, Facebook',
    regels: [
      { tekst: 'Op een website of sociale media is geen V.U. nodig.', bron: UNIZO_VU },
      { tekst: 'Vermeld naam, adres en ondernemingsnummer van de organisator. Het nummer zoek je op naam op in de KBO.', bron: VLAIO_WEB },
      { tekst: 'Het ondernemingsnummer en de zetel van een vzw vind je gratis in KBO Public Search.', bron: KBO },
      { tekst: 'Een foto waarop iemand herkenbaar is, is een persoonsgegeven. Vraag toestemming om hem te posten, en bij minderjarigen die van de ouders.', bron: FOTO },
    ],
  },
  {
    titel: 'Flyers uitdelen',
    kort: 'Op straat en in de bus',
    regels: [
      { tekst: 'Niet onder de ruitenwisser of op geparkeerde auto’s, tenzij de burgemeester het toestaat.', bron: VLAIO_FLYER },
      { tekst: 'Wie uitdeelt, raapt weggegooide flyers meteen op. Anders ruimt de stad op en rekent ze de kosten aan.', bron: VLAIO_FLYER },
      { tekst: 'Uitdeler, helper, V.U. en organisator zijn samen aansprakelijk.', bron: VLAIO_FLYER },
      { tekst: 'Niet in brievenbussen met een sticker tegen reclame en niet bij leegstaande huizen. Altijd volledig in de bus.', bron: VLAIO_FLYER },
      { tekst: 'Veel gemeenten heffen een taks op reclamedrukwerk. Doe vooraf aangifte.', bron: VLAIO_FLYER },
    ],
  },
  {
    titel: 'Pijlen en borden in Aalst',
    kort: 'Bewegwijzering naar het feest',
    regels: [
      { tekst: 'Vraag het evenement aan bij de stad: 12 weken vooraf vanaf 500 bezoekers, 6 weken eronder.', bron: AALST_EV },
      { tekst: 'Voor pijlen heb je een vergunning nodig, minstens 2 weken vooraf aan te vragen. Je krijgt een referentiecode.', bron: AALST_APV },
      { tekst: 'Die referentiecode staat goed zichtbaar op de voorkant van elke pijl.', bron: AALST_APV },
      { tekst: 'Een pijl is hoogstens 30 × 75 cm.', bron: AALST_APV },
      { tekst: 'Ophangen ten vroegste 48 uur voor de start, weghalen binnen 48 uur na de laatste dag.', bron: AALST_APV },
      { tekst: 'Niet aan verkeerslichten, verkeersborden of straatmeubilair, en niet met nagels of krammen.', bron: AALST_APV },
      { tekst: 'Pijlen mogen niemand hinderen. Bij schade of een ongeval is de vergunninghouder aansprakelijk.', bron: AALST_APV },
      { tekst: 'Elke pijl die niet in orde is, kost 50 euro.', bron: AALST_ORG },
      { tekst: 'Borden langs gemeentewegen zijn niet toegelaten. Langs gewestwegen beslist het Agentschap Wegen en Verkeer; op privégrond vraag je de eigenaar.', bron: AALST_ORG },
      { tekst: 'Voor een vast reclamebord geldt de Vlaamse Publiciteitsverordening en heb je een toelating van de gemeente nodig.', bron: VLAIO_BORD },
      { tekst: 'Een reclamestoet op de openbare weg meld je minstens 8 dagen vooraf schriftelijk aan de burgemeester.', bron: AALST_APV },
      { tekst: 'Licht of logo’s projecteren op gevels mag alleen met schriftelijke toestemming van de burgemeester.', bron: AALST_APV },
    ],
  },
  {
    titel: 'Alcohol en sponsors',
    kort: 'Toog en reclame',
    regels: [
      { tekst: 'Geen alcohol schenken aan wie jonger is dan 16, geen sterke drank aan wie jonger is dan 18. Bij twijfel vraag je een identiteitskaart.', bron: ALCOHOL },
      { tekst: 'Reclame van een brouwer of drankmerk richt zich nooit op minderjarigen en toont niemand die jonger is (of lijkt) dan 25.', bron: RECLAME },
      { tekst: 'Zo’n reclame draagt de verplichte slogan van het convenant en komt niet op TikTok of Snapchat, noch binnen 150 m van een school.', bron: RECLAME },
    ],
  },
];
