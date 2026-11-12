// Stemronde: iedereen stemt één keer. Na een stem zijn alle stemknoppen dicht tot "Volgende persoon".
import { $$ } from '../lib/dom';
import { aantal, stem } from '../lib/stemmen';

let gekozen: string | null = null;

/** Zet alle dia's in de juiste stand (ook na opnieuw tekenen). */
export function toonRonde() {
  for (const dia of $$('.c-dia')) {
    dia.querySelector<HTMLElement>('.c-dia__acties')!.hidden = gekozen !== null;
    dia.querySelector<HTMLElement>('.c-dia__klaar')!.hidden = gekozen === null;
    const b = dia.querySelector<HTMLElement>('[data-gekozen]');
    if (b) b.textContent = gekozen?.toUpperCase() ?? '';
  }
  $$('[data-telling]').forEach((el) => (el.textContent = String(aantal(el.dataset.telling!))));
}

export function stemOp(id: string) {
  if (gekozen) return;
  stem(id, 1);
  gekozen = id;
  toonRonde();
}

export function ongedaan() {
  if (!gekozen) return;
  stem(gekozen, -1);
  gekozen = null;
  toonRonde();
}

export function volgende() {
  gekozen = null;
  toonRonde();
}
