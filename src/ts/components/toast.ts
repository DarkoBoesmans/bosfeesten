let timer = 0;
export function toast(tekst: string) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = tekst;
  clearTimeout(timer);
  timer = window.setTimeout(() => (t.textContent = ''), 2500);
}
