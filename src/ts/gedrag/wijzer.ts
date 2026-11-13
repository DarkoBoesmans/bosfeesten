// Wegwijzer-navigatie: openen en sluiten op kleine schermen, en tonen in welk hoofdstuk je bent.
import { HOOFDSTUKKEN } from '../components/nav';

export function wijzer() {
  const nav = document.getElementById('wijzer');
  const knop = nav?.querySelector<HTMLButtonElement>('[data-menu]');
  const teller = nav?.querySelector<HTMLElement>('[data-teller]');
  if (!nav || !knop) return;

  const zet = (open: boolean) => { knop.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); document.body.classList.toggle('menu-open', open); };
  knop.addEventListener('click', () => zet(knop.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) zet(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { zet(false); knop.focus(); } });

  const pijlen = new Map(HOOFDSTUKKEN.map(([id]) => [id, nav.querySelector<HTMLElement>(`[data-hoofdstuk="${id}"]`)]));
  const io = new IntersectionObserver((items) => {
    for (const it of items) {
      if (!it.isIntersecting) continue;
      const id = it.target.id;
      pijlen.forEach((a, k) => a?.toggleAttribute('aria-current', k === id));
      const i = HOOFDSTUKKEN.findIndex(([h]) => h === id);
      if (teller && i >= 0) teller.textContent = `${String(i + 1).padStart(2, '0')} / ${HOOFDSTUKKEN.length}`;
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  HOOFDSTUKKEN.forEach(([id]) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
