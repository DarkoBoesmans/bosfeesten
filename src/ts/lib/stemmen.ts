// Stemmenteller voor wie presenteert. Bewaard in deze browser, werkt ook zonder opslag.
const SLEUTEL = 'bf-stemmen';

let stemmen: Record<string, number> = {};
try { stemmen = JSON.parse(localStorage.getItem(SLEUTEL) ?? '{}'); } catch { /* lege teller */ }

const bewaar = () => { try { localStorage.setItem(SLEUTEL, JSON.stringify(stemmen)); } catch { /* alleen in geheugen */ } };

export const aantal = (id: string) => stemmen[id] ?? 0;
export const hoogste = () => Math.max(0, ...Object.values(stemmen));
export function stem(id: string, delta: number) { stemmen[id] = Math.max(0, aantal(id) + delta); bewaar(); }
export function wis() { stemmen = {}; bewaar(); }
