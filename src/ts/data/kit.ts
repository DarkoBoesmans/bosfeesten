// Alle downloads uit assets/kit/ (gemaakt met tools/kit.py). kit.json geeft de bestandsgroottes.
import grootte from '../../../assets/kit/kit.json';
import type { Bestand } from '../types';

export const ZIP = 'bosfeesten-2027-mediakit.zip';
export const url = (pad: string) => `assets/kit/${pad}`;
export const omvang = (pad: string) => {
  const b = (grootte as Record<string, number>)[pad] ?? 0;
  return b >= 1e6 ? `${(b / 1e6).toFixed(1).replace('.', ',')} MB` : `${Math.max(1, Math.round(b / 1e3))} kB`;
};
export const soort = (pad: string) => pad.split('.').pop()!.toUpperCase();

export const LOGOS = ['creme', 'indigo', 'groen', 'zwart', 'wit'].map((n) => ({
  naam: n === 'creme' ? 'Crème' : n[0]!.toUpperCase() + n.slice(1),
  svg: `logo/bosfeesten-logo-${n}.svg`,
  png: `logo/bosfeesten-logo-${n}.png`,
}));

export const SOCIAAL = [
  { pad: 'sociaal/facebook-evenement.png', label: 'Facebook-evenement', maat: '1920 × 1005' },
  { pad: 'sociaal/instagram-post-vierkant.png', label: 'Vierkante post', maat: '1080 × 1080' },
  { pad: 'sociaal/instagram-post-staand.png', label: 'Instagram-post', maat: '1080 × 1350' },
  { pad: 'sociaal/instagram-story.png', label: 'Story', maat: '1080 × 1920' },
  { pad: 'sociaal/profielfoto.png', label: 'Profielfoto', maat: '1080 × 1080' },
  { pad: 'sociaal/instagram-post-leeg.png', label: 'Lege post', maat: '1080 × 1350' },
  { pad: 'sociaal/instagram-story-leeg.png', label: 'Lege story', maat: '1080 × 1920' },
];

export const DRUKWERK = [
  { pad: 'drukwerk/affiche.jpg', label: 'Affiche A2' },
  { pad: 'drukwerk/flyer.jpg', label: 'Flyer A5' },
  { pad: 'drukwerk/prijslijst.jpg', label: 'Prijslijst' },
  { pad: 'drukwerk/bonnetjes.jpg', label: 'Prijslijst bonnetjes' },
];

export const GROEPEN: { titel: string; bestanden: Bestand[] }[] = [
  { titel: 'Logo', bestanden: LOGOS.flatMap((l) => [{ pad: l.svg, label: `Logo ${l.naam}` }, { pad: l.png, label: `Logo ${l.naam}` }]) },
  { titel: 'Kleuren', bestanden: [
    { pad: 'kleuren/bosfeesten-2027.ase', label: 'Stalen voor Affinity, Illustrator, Canva' },
    { pad: 'kleuren/bosfeesten-2027-kleuren.txt', label: 'CMYK- en hexwaarden' },
  ] },
  { titel: 'Patroon', bestanden: [
    { pad: 'patroon/bosfeesten-patroon-indigo.svg', label: 'Patroontegel op Indigo' },
    { pad: 'patroon/bosfeesten-patroon-transparant.svg', label: 'Patroontegel zonder achtergrond' },
    { pad: 'patroon/bosfeesten-patroon-indigo.png', label: 'Patroon op Indigo, 2048 px' },
  ] },
  { titel: 'Sociale media', bestanden: SOCIAAL.map(({ pad, label }) => ({ pad, label })) },
  { titel: 'Drukwerk (voorbeeld, geen drukbestand)', bestanden: DRUKWERK },
  { titel: 'Drankbonnen', bestanden: [
    { pad: 'bonnen/drankbon-licht.png', label: 'Drankbon lichte drank' },
    { pad: 'bonnen/drankbon-zwaar.png', label: 'Drankbon zware drank' },
  ] },
];
