// Drukwerk uit drukwerk.af dat herkleurd kan worden (lagen gemaakt met tools/lagen.py).
import type { Werk } from '../types';

export const AFFICHE: Werk = { naam: 'affiche', titel: 'Affiche A2', b: 1280, h: 1810 };

export const VOORBEELDEN: Werk[] = [
  AFFICHE,
  { naam: 'flyer', titel: 'Flyer A5', b: 720, h: 1022 },
  { naam: 'prijslijst', titel: 'Prijslijst', b: 900, h: 1273 },
  { naam: 'bonnetjes', titel: 'Prijslijst bonnetjes', b: 900, h: 1273 },
];

export const VORIGE = [
  { jaar: '2025', kleuren: ['#FF5252', '#FFD600', '#40C4FF'], alt: 'Affiche Bosfeesten 2025: rood met geel patroon, blauwe en rode badges' },
  { jaar: '2026', kleuren: ['#4DBD97', '#EF476F', '#1F9AA9', '#FFC43E'], alt: 'Affiche Bosfeesten 2026: mintgroen met roze patroon, teal en gele accenten' },
];
