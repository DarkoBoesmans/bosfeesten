// Gedrag van de media kit. De HTML wordt bij het bouwen gemaakt (pagina.ts); dit maakt ze levendig.
import { toast } from './components/toast';
import { toon } from './gedrag/toon';
import { wijzer } from './gedrag/wijzer';
import { aanwijzer } from './gedrag/aanwijzer';
import { proef } from './gedrag/proef';
import { sleep } from './gedrag/sleep';
import { maker } from './gedrag/maker';

toon();
addEventListener('load', () => setTimeout(() => document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((i) => (i.loading = 'eager')), 400));
wijzer();
aanwijzer('[data-held], [data-patroon]');
proef();
sleep();
maker().catch(() => toast('De postmaker kon niet laden. Herlaad de pagina.'));

const lightbox = document.getElementById('lightbox') as HTMLDialogElement | null;

document.addEventListener('click', async (e) => {
  const doel = e.target as Element;
  const groot = doel.closest<HTMLElement>('[data-groot]');
  if (groot && lightbox) {
    const img = lightbox.querySelector('img')!;
    img.src = groot.dataset.groot!; img.alt = groot.dataset.alt ?? '';
    lightbox.showModal();
    return;
  }
  if (lightbox?.open && (doel === lightbox || doel.closest('[data-sluit]'))) { lightbox.close(); return; }
  const kopie = doel.closest<HTMLElement>('[data-kopie]');
  if (kopie) {
    try { await navigator.clipboard.writeText(kopie.dataset.kopie!); toast(`Gekopieerd: ${kopie.dataset.kopie}`); }
    catch { toast('Kopiëren lukt hier niet. Selecteer de tekst zelf.'); }
  }
});
