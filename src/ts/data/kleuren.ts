// De vier kleuren van Bosfeesten 2027. CMYK is de bron (profiel U.S. Web Coated SWOP v2).
// Dezelfde waarden staan in tools/kit.py voor de downloads.
import type { Kleur } from '../types';

export const INDIGO: Kleur = { naam: 'Indigo', cmyk: [85, 95, 0, 0], druk: '#4F3795', scherm: '#5828B8' };
export const GROEN: Kleur = { naam: 'Groen', cmyk: [65, 0, 100, 0], druk: '#60BC46', scherm: '#37CB00' };
export const MANDARIJN: Kleur = { naam: 'Mandarijn', cmyk: [0, 60, 100, 0], druk: '#F5821F', scherm: '#FB8316' };
export const CREME: Kleur = { naam: 'Crème', cmyk: [2, 2, 14, 0], druk: '#FAF6DE', scherm: '#FFF8DC' };

export const ROLLEN = [
  { kleur: INDIGO, rol: 'Hoofdkleur', deel: 60, gebruik: 'Achtergrond van affiche, flyer en sociale media. Zware drankbon.' },
  { kleur: GROEN, rol: 'Tweede kleur', deel: 30, gebruik: 'Boompjespatroon, rand rond de titel, Meis-badge.' },
  { kleur: MANDARIJN, rol: 'Accent', deel: 10, gebruik: 'Jaartal, datumblokken, Plein-badge, knoppen. Lichte drankbon.' },
  { kleur: CREME, rol: 'Papier', deel: 0, gebruik: 'Papier, titel "BOS FEESTEN" en tekst op de gekleurde vlakken.' },
];
