import { $ } from '../lib/dom';

/** Eén dialoog voor grote beelden. Sluit met Esc, de knop of een klik naast het beeld. */
export const lightbox = () => `<dialog class="c-lightbox" id="lightbox" aria-label="Vergroot beeld">
    <img class="c-lightbox__beeld" alt="">
    <button type="button" class="c-lightbox__sluit" data-sluit>Sluiten</button>
  </dialog>`;

export function openLightbox(src: string, alt: string) {
  const dlg = $<HTMLDialogElement>('#lightbox');
  const img = dlg && $<HTMLImageElement>('.c-lightbox__beeld', dlg);
  if (!dlg || !img) return;
  img.src = src; img.alt = alt;
  dlg.showModal();
}

export function sluitLightbox(doel: Element) {
  const dlg = $<HTMLDialogElement>('#lightbox');
  if (dlg?.open && (doel === dlg || doel.closest('[data-sluit]'))) dlg.close();
}
