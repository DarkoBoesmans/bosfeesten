// Alle merkkleuren. CMYK is de bron (profiel U.S. Web Coated SWOP v2),
// 'druk' is die CMYK op het scherm, 'scherm' is een fellere versie voor website en sociale media.
// 'dichtst' en 'graden': de dichtste kleur van 2025/2026 op de kleurcirkel (OKLCH).
import type { Kleur } from '../types';

export const KLEUREN = {
  limoen: { naam: 'Limoen', cmyk: [35, 0, 100, 0], druk: '#B2D334', scherm: '#C9F022', dichtst: 'geel 2025', graden: 26 },
  mandarijn: { naam: 'Mandarijn', cmyk: [0, 60, 100, 0], druk: '#F5821F', scherm: '#FB8316', dichtst: 'rood 2025', graden: 29 },
  ultra: { naam: 'Ultramarijn', cmyk: [90, 80, 0, 0], druk: '#364FA2', scherm: '#2D49CD', dichtst: 'blauw 2025', graden: 36 },
  druif: { naam: 'Druif', cmyk: [70, 90, 0, 0], druk: '#6D3F99', scherm: '#7D29BE', dichtst: 'roze 2026', graden: 66 },
  lila: { naam: 'Lila', cmyk: [35, 50, 0, 0], druk: '#A888BF', scherm: '#B785D9', dichtst: 'roze 2026', graden: 60 },
  indigo: { naam: 'Indigo', cmyk: [85, 95, 0, 0], druk: '#4F3795', scherm: '#5828B8', dichtst: 'blauw 2025', graden: 58 },
  groen: { naam: 'Groen', cmyk: [65, 0, 100, 0], druk: '#60BC46', scherm: '#37CB00', dichtst: 'mint 2026', graden: 28 },
  creme: { naam: 'Crème', cmyk: [2, 2, 14, 0], druk: '#FAF6DE', scherm: '#FFF8DC', dichtst: 'geel 2025', graden: 4 },
} satisfies Record<string, Kleur>;
