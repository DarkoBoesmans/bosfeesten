// Horizontale strook die je met de muis kan slepen (aanraakschermen scrollen vanzelf).
export function sleep() {
  document.querySelectorAll<HTMLElement>('[data-sleep]').forEach((el) => {
    let x = 0, start = 0, bezig = false, versleept = false;
    el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; bezig = true; versleept = false; x = e.clientX; start = el.scrollLeft; el.classList.add('is-slepen'); });
    addEventListener('pointermove', (e) => { if (!bezig) return; const d = e.clientX - x; if (Math.abs(d) > 4) versleept = true; el.scrollLeft = start - d; });
    addEventListener('pointerup', () => { bezig = false; el.classList.remove('is-slepen'); });
    el.addEventListener('click', (e) => { if (versleept) { e.stopPropagation(); e.preventDefault(); versleept = false; } }, true);
  });
}
