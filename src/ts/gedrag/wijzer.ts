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

  // Op gsm schuift de Inhoud-knop weg tijdens het lezen (naar beneden scrollen) en komt terug bij omhoog scrollen.
  // In de held staat de knop nog niet (daar zou hij over de affiche vallen); daarna altijd.
  let vorige = scrollY;
  const voet = document.querySelector('footer');
  const zet_weg = (y: number, _omlaag: boolean) => {
    const voetInBeeld = !!voet && voet.getBoundingClientRect().top < innerHeight * 0.85;
    // Weg in de held, bij de voet en tijdens het naar beneden lezen; terug zodra je omhoog scrollt.
    nav.classList.toggle('is-weg', y < innerHeight * 0.6 || voetInBeeld || (_omlaag && y > 200));
    nav.classList.toggle('is-voet', voetInBeeld);
  };
  zet_weg(scrollY, false);
  const voortgang = () => nav.style.setProperty('--voortgang', String(Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))));
  voortgang();
  addEventListener('scroll', () => {
    voortgang();
    const y = scrollY;
    if (Math.abs(y - vorige) < 8) return;
    zet_weg(y, y > vorige);
    vorige = y;
  }, { passive: true });

  const pijlen = new Map(HOOFDSTUKKEN.map(([id]) => [id, nav.querySelector<HTMLElement>(`[data-hoofdstuk="${id}"]`)]));
  const io = new IntersectionObserver((items) => {
    for (const it of items) {
      if (!it.isIntersecting) continue;
      const id = it.target.id;
      const nieuw = [...pijlen].find(([k]) => k === id)?.[1];
      if (nieuw && !nieuw.hasAttribute('aria-current')) {
        // Nieuw hoofdstuk: dat bordje zwaait uit, op gsm zwaait de Inhoud-knop mee.
        for (const el of [nieuw, knop]) { el.classList.remove('is-zwaai'); void el.offsetWidth; el.classList.add('is-zwaai'); }
      }
      pijlen.forEach((a, k) => a?.toggleAttribute('aria-current', k === id));
      const i = HOOFDSTUKKEN.findIndex(([h]) => h === id);
      if (teller && i >= 0) teller.textContent = `${String(i + 1).padStart(2, '0')} / ${HOOFDSTUKKEN.length}`;
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  HOOFDSTUKKEN.forEach(([id]) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
