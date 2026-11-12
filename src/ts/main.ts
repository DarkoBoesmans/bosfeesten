// Gedrag van de media kit: beelden vergroten en waarden kopiëren. De HTML zelf wordt bij het bouwen gemaakt (pagina.ts).
import { openLightbox, sluitLightbox } from './components/lightbox';
import { toast } from './components/toast';

async function kopieer(tekst: string) {
  try { await navigator.clipboard.writeText(tekst); toast(`Gekopieerd: ${tekst}`); }
  catch { toast('Kopiëren lukt hier niet. Selecteer de tekst zelf.'); }
}

document.addEventListener('click', (e) => {
  const doel = e.target as Element;
  const groot = doel.closest<HTMLElement>('[data-groot]');
  if (groot) { openLightbox(groot.dataset.groot!, groot.dataset.alt ?? ''); return; }
  const kopie = doel.closest<HTMLElement>('[data-kopie]');
  if (kopie) { kopieer(kopie.dataset.kopie!); return; }
  sluitLightbox(doel);
});
