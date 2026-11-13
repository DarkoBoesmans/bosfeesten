/** Eén dialoog voor grote beelden. Sluit met Esc, de knop of een klik naast het beeld. */
export const lightbox = () => `<dialog class="c-lightbox" id="lightbox" aria-label="Vergroot beeld">
    <img class="c-lightbox__beeld" alt="" width="1200" height="1600">
    <button type="button" class="c-lightbox__sluit" data-sluit>Sluiten</button>
  </dialog>`;
