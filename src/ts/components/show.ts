// Carrousel: horizontaal scrollen met scroll-snap. Knoppen, pijltjes en de letters A tot E springen per affiche.
// Dia's buiten beeld zijn inert, zodat Tab nooit in een onzichtbare dia belandt.
import { $, $$ } from '../lib/dom';

const spoor = () => $('.c-show__spoor');
const dias = () => $$('.c-dia');

export function huidige() {
  const s = spoor();
  return s ? Math.round(s.scrollLeft / s.clientWidth) : 0;
}

function markeer(i: number) {
  dias().forEach((d, j) => d.toggleAttribute('inert', j !== i));
  $$('.c-show__letter').forEach((b, j) => b.toggleAttribute('aria-current', j === i));
}

/** Eerste bruikbare knop van een dia (stemknop, of "Volgende persoon" na een stem). */
export function hoofdknop(i: number) {
  return $$<HTMLButtonElement>('.c-dia')[i]?.querySelector<HTMLElement>('.c-dia__acties:not([hidden]) .c-dia__knop, .c-dia__klaar:not([hidden]) .c-dia__knop') ?? null;
}

export function naar(i: number, focus = false) {
  const s = spoor();
  if (!s) return;
  const n = dias().length;
  const doel = (i + n) % n;
  markeer(doel);
  const zacht = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  s.scrollTo({ left: doel * s.clientWidth, behavior: zacht ? 'smooth' : 'auto' });
  $('.c-show')?.scrollIntoView({ block: 'start', behavior: zacht ? 'smooth' : 'auto' });
  if (focus) hoofdknop(doel)?.focus({ preventScroll: true });
}

export function volgScroll() {
  const s = spoor();
  if (!s) return;
  markeer(huidige());
  let t = 0;
  s.addEventListener('scroll', () => { clearTimeout(t); t = window.setTimeout(() => markeer(huidige()), 120); }, { passive: true });
}
