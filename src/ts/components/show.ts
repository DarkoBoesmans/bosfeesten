// Carrousel: horizontaal scrollen met scroll-snap, knoppen en pijltjestoetsen springen per affiche.
import { $, $$ } from '../lib/dom';

const spoor = () => $('.c-show__spoor');

export function huidige() {
  const s = spoor();
  return s ? Math.round(s.scrollLeft / s.clientWidth) : 0;
}

export function naar(i: number) {
  const s = spoor();
  if (!s) return;
  const n = s.children.length;
  const doel = (i + n) % n;
  s.scrollTo({ left: doel * s.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  $('.c-show')?.scrollIntoView({ block: 'start' });
}

export function volgScroll() {
  const s = spoor();
  if (!s) return;
  s.addEventListener('scroll', () => {
    const i = huidige();
    $$('.c-show__letter').forEach((b, j) => b.toggleAttribute('aria-current', i === j));
  }, { passive: true });
}
