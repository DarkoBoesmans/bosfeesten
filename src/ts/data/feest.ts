// Vaste gegevens van het feest. De editie telt mee met het jaar: 2023 was de 60ste.
export const FEEST = {
  organisator: 'Chiro Popov',
  adres: 'Eerste Bochtweg 1',
  gemeente: '9308 Gijzegem',
  dagen: '13, 14 & 15 augustus',
};

export function editie(vandaag = new Date()) {
  // Altijd het tweede weekend van augustus; na dat weekend gaat het over het volgende jaar.
  const j = vandaag.getFullYear();
  const eersteAug = new Date(j, 7, 1);
  const tweedeZaterdag = 1 + ((6 - eersteAug.getDay() + 7) % 7) + 7;
  const jaar = vandaag > new Date(j, 7, tweedeZaterdag + 2) ? j + 1 : j;
  return { jaar, nummer: 60 + (jaar - 2023) };
}
