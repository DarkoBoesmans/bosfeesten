import type { Cmyk } from '../types';

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminantie = (hex: string) => {
  const [r, g, b] = rgb(hex).map(lin) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG-contrast tussen twee kleuren, 1 tot 21. */
export function contrast(a: string, b: string) {
  const [x, y] = [luminantie(a), luminantie(b)].sort((p, q) => q - p) as [number, number];
  return (x + 0.05) / (y + 0.05);
}

export const tekstOp = (hex: string) => (contrast(hex, '#1E1538') > contrast(hex, '#FFFFFF') ? '#1E1538' : '#FFFFFF');
export const cmykTekst = ([c, m, y, k]: Cmyk) => `C${c} M${m} Y${y} K${k}`;
export const inkt = (cmyk: Cmyk) => cmyk.reduce((s, v) => s + v, 0);
export const rgbTekst = (hex: string) => rgb(hex).join(' ');
