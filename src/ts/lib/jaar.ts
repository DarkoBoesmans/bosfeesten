// Bosfeesten valt altijd het tweede weekend van augustus. Na dat weekend toont de site het volgende jaar.
export function editie(vandaag = new Date()) {
  const j = vandaag.getFullYear();
  const eersteAug = new Date(j, 7, 1);
  const tweedeZaterdag = 1 + ((6 - eersteAug.getDay() + 7) % 7) + 7;
  const einde = new Date(j, 7, tweedeZaterdag + 2);
  return vandaag > einde ? j + 1 : j;
}
