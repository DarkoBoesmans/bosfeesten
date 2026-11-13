// Logo-proef: kies een kleur voor logo en achtergrond, en lees of de combinatie mag.
import { contrast } from '../lib/kleur';

const STANDAARD: Record<string, string> = {
  'Crème/Indigo': 'Crème op Indigo. De standaard.',
  'Indigo/Crème': 'Indigo op Crème. Voor papier en sponsorvlakken.',
  'Indigo/Mandarijn': 'Indigo op Mandarijn. Goed voor kleine badges.',
  'Indigo/Groen': 'Indigo op Groen. Mag, voor de Meis-badge.',
};

export function proef() {
  const vlak = document.querySelector<HTMLElement>('[data-proef-vlak]');
  const oordeel = document.querySelector<HTMLElement>('[data-proef-oordeel]');
  if (!vlak || !oordeel) return;
  const keuze = { voor: { hex: '#FAF6DE', naam: 'Crème' }, achter: { hex: '#4F3795', naam: 'Indigo' } };

  document.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('[data-proef]');
    if (!b) return;
    const rol = b.dataset.proef as 'voor' | 'achter';
    keuze[rol] = { hex: b.dataset.hex!, naam: b.dataset.naam! };
    document.querySelectorAll(`[data-proef="${rol}"]`).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    vlak.style.setProperty('--proef-voor', keuze.voor.hex);
    vlak.style.setProperty('--proef-achter', keuze.achter.hex);
    const sleutel = `${keuze.voor.naam}/${keuze.achter.naam}`;
    const c = contrast(keuze.voor.hex, keuze.achter.hex);
    const tekst = keuze.voor.hex === keuze.achter.hex ? 'Onzichtbaar. Kies twee verschillende kleuren.'
      : STANDAARD[sleutel] ?? (c < 3 ? `${keuze.voor.naam} op ${keuze.achter.naam}: te weinig contrast (${c.toFixed(1).replace('.', ',')} : 1). Niet doen.` : `${keuze.voor.naam} op ${keuze.achter.naam}: leesbaar, maar de kleuren vechten. Liever niet.`);
    oordeel.textContent = tekst;
    vlak.classList.toggle('is-fout', !(sleutel in STANDAARD));
    vlak.classList.remove('is-wissel'); void vlak.offsetWidth; vlak.classList.add('is-wissel');
  });
}
