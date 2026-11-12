export type Cmyk = [number, number, number, number];

export interface Kleur {
  naam: string;
  cmyk: Cmyk;
  /** CMYK zoals het gedrukt wordt, omgezet naar het scherm. */
  druk: string;
  /** Fellere versie voor website en sociale media. */
  scherm: string;
  dichtst: string;
  graden: number;
}

/** P achtergrond, S patroon en titelrand, A accent (Plein), B tweede accent (Meis), L papier. */
export type Rol = 'P' | 'S' | 'A' | 'B' | 'L';
export type Rollen = Record<Rol, Kleur>;

export interface Combo {
  id: string;
  naam: string;
  zin: string;
  harmonie: string;
  kleuren: Rollen;
  bon: { licht: Kleur; zwaar: Kleur };
}

export interface Werk {
  naam: string;
  titel: string;
  b: number;
  h: number;
}
