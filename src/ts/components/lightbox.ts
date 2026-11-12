import { $ } from '../lib/dom';

/** Eén dialoog voor grote beelden. Sluit met Esc, de knop of een klik naast het beeld. */
export function lightboxMarkup() {
  return `<dialog class="c-lightbox" id="lightbox" aria-label="Vergroot beeld">
    <img class="c-lightbox__beeld" alt="">
    <button type="button" class="c-lightbox__sluit" data-sluit>Sluiten</button>
  </dialog>`;
}

export function openLightbox(src: string, alt: string) {
  const dlg = $<HTMLDialogElement>('#lightbox');
  const img = $<HTMLImageElement>('.c-lightbox__beeld', dlg ?? document);
  if (!dlg || !img) return;
  img.src = src; img.alt = alt;
  dlg.showModal();
}

export function sluitLightbox(e: MouseEvent) {
  const dlg = $<HTMLDialogElement>('#lightbox');
  if (dlg?.open && (e.target === dlg || (e.target as Element).closest('[data-sluit]'))) dlg.close();
}
