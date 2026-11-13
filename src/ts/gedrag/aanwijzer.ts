// Volgt de muis met twee CSS-variabelen (-1 tot 1). CSS doet de rest: de affiche kantelt, het bos waait mee.
export function aanwijzer(selector: string) {
  if (matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0'); });
  });
}
