// Laat elementen met data-toon binnenschuiven zodra ze in beeld komen. Zonder JS of met minder beweging staat alles er meteen.
export function toon() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-toon]')];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-toon');
  const io = new IntersectionObserver((items) => {
    for (const it of items) if (it.isIntersecting) { it.target.classList.add('is-getoond'); io.unobserve(it.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
}
