export type Cmyk = [number, number, number, number];

export interface Kleur {
  naam: string;
  cmyk: Cmyk;
  /** CMYK zoals het gedrukt wordt, omgezet naar het scherm. */
  druk: string;
  /** Fellere versie voor website en sociale media. */
  scherm: string;
}

export interface Bestand {
  /** Pad binnen assets/kit/. */
  pad: string;
  label: string;
}
