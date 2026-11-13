export type Cmyk = [number, number, number, number];

export interface Kleur {
  naam: string;
  cmyk: Cmyk;
  /** Eén hexcode: de CMYK-kleur zoals ze gedrukt wordt, voor scherm en web. */
  hex: string;
}

export interface Bestand {
  /** Pad binnen assets/kit/. */
  pad: string;
  label: string;
}

export interface Regel {
  tekst: string;
  bron: { naam: string; url: string };
}
