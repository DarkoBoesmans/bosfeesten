// Kleurt een kunstwerk in met een palet.
// Elk werk heeft dekkingslagen per rol (zie tools/lagen.py):
//   m1 = P, S, L   m2 = A, B, vast   v = originele pixels voor het vaste deel (logo's, zwart)
import type { Rollen, Werk } from '../types';
import { rgb } from '../lib/kleur';

type Pixels = Uint8ClampedArray;
const cache = new Map<string, Promise<Pixels[]>>();

function laad(src: string) {
  return new Promise<HTMLImageElement>((ok, fout) => {
    const img = new Image();
    img.onload = () => ok(img);
    img.onerror = () => fout(new Error(`Kon ${src} niet laden.`));
    img.src = src;
  });
}

function pixels(img: HTMLImageElement, { b, h }: Werk): Pixels {
  const c = document.createElement('canvas');
  c.width = b; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, b, h).data;
}

function lagen(werk: Werk) {
  if (!cache.has(werk.naam)) {
    const basis = `assets/kunst/${werk.naam}`;
    cache.set(werk.naam, Promise.all([`${basis}.m1.webp`, `${basis}.m2.webp`, `${basis}.v.jpg`].map(laad))
      .then((imgs) => imgs.map((i) => pixels(i, werk))));
  }
  return cache.get(werk.naam)!;
}

export async function herkleur(canvas: HTMLCanvasElement, werk: Werk, kleuren: Rollen) {
  const [m1, m2, v] = (await lagen(werk)) as [Pixels, Pixels, Pixels];
  const [P, S, L, A, B] = (['P', 'S', 'L', 'A', 'B'] as const).map((r) => rgb(kleuren[r].druk));
  canvas.width = werk.b; canvas.height = werk.h;
  const ctx = canvas.getContext('2d')!;
  const uit = ctx.createImageData(werk.b, werk.h);
  const d = uit.data;
  for (let i = 0; i < d.length; i += 4) {
    const p = m1[i]!, s = m1[i + 1]!, l = m1[i + 2]!, a = m2[i]!, bb = m2[i + 1]!, vast = m2[i + 2]!;
    for (let k = 0; k < 3; k++) {
      d[i + k] = (p * P![k]! + s * S![k]! + l * L![k]! + a * A![k]! + bb * B![k]! + vast * v[i + k]!) / 255;
    }
    d[i + 3] = 255;
  }
  ctx.putImageData(uit, 0, 0);
}
