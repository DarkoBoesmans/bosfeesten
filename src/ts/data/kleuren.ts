// De vier kleuren van Bosfeesten 2027. CMYK is de bron (profiel U.S. Web Coated SWOP v2),
// de hex is diezelfde kleur op het scherm. Dezelfde waarden staan in tools/kit.py.
import type { Kleur } from '../types';

export const INDIGO: Kleur = { naam: 'Indigo', cmyk: [85, 95, 0, 0], hex: '#4F3795' };
export const GROEN: Kleur = { naam: 'Groen', cmyk: [65, 0, 100, 0], hex: '#60BC46' };
export const MANDARIJN: Kleur = { naam: 'Mandarijn', cmyk: [0, 60, 100, 0], hex: '#F5821F' };
export const CREME: Kleur = { naam: 'Crème', cmyk: [2, 2, 14, 0], hex: '#FAF6DE' };
export const ZWART: Kleur = { naam: 'Zwart', cmyk: [0, 0, 0, 100], hex: '#1D1D1B' };

export const ROLLEN = [
  { kleur: INDIGO, staal: 'Primary', deel: 60, gebruik: 'De grond onder alles: affiche, flyer, sociale media. En de zware drankbon.' },
  { kleur: GROEN, staal: 'Secondary', deel: 30, gebruik: 'Het boompjespatroon, de rand rond de titel en de Meis-badge.' },
  { kleur: MANDARIJN, staal: 'Accent', deel: 10, gebruik: 'Het jaartal, datumblokken, de Plein-badge. En de lichte drankbon.' },
  { kleur: CREME, staal: 'Wit', deel: 0, gebruik: 'Het papier, de titel en alle tekst op een gekleurd vlak.' },
];

/** De vijf globale stalen zoals ze in Affinity heten, voor de staalkaart onder de banden. */
export const STAALKAART = [
  { kleur: INDIGO, staal: 'Primary' },
  { kleur: GROEN, staal: 'Secondary' },
  { kleur: MANDARIJN, staal: 'Accent' },
  { kleur: CREME, staal: 'Wit' },
  { kleur: ZWART, staal: 'Black' },
];
