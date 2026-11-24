// Tekenwerk voor de postmaker. Elke vorm deelt dezelfde grond (boompjesrand, Indigo vlak, woordmerk bovenaan, adres onderaan);
// daartussen tekent artiest, lineup of aftellen zijn eigen inhoud. Alles wordt van onder naar boven opgebouwd zodat niets overlapt.
export const K = { indigo: '#4F3795', diep: '#3F2C7A', groen: '#60BC46', mandarijn: '#F5821F', creme: '#FAF6DE' };
export const MATEN = { post: [1080, 1350], vierkant: [1080, 1080], story: [1080, 1920] } as const;
export type Formaat = keyof typeof MATEN;

export type Vak = { x: number; y: number; w: number; h: number };
export type Grond = { k: number; midden: number; binnenW: number; boven: number; onder: number; paneel: Vak };

/** Grootste lettergrootte waarbij de tekst binnen de breedte past. */
export function passend(ctx: CanvasRenderingContext2D, tekst: string, font: (px: number) => string, max: number, start: number) {
  let px = start;
  ctx.font = font(px);
  while (ctx.measureText(tekst).width > max && px > 18) { px -= 2; ctx.font = font(px); }
  return px;
}

/** Een afgerond blokje met tekst erin; geeft de breedte terug. */
export function blok(ctx: CanvasRenderingContext2D, tekst: string, x: number, y: number, h: number, vlak: string, letter: string, pad: number) {
  const w = ctx.measureText(tekst).width + pad * 2;
  ctx.fillStyle = vlak; ctx.beginPath(); ctx.roundRect(x, y, w, h, h * 0.12); ctx.fill();
  ctx.fillStyle = letter; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(tekst, x + pad, y + h / 2 + h * 0.04);
  return w;
}

/** Het woordmerk: BOS en FEESTEN crème met groene rand, het jaartal omgekeerd (groen met crème rand). */
function woordmerk(ctx: CanvasRenderingContext2D, jaar: string, x: number, y: number, px: number) {
  ctx.font = `400 ${px}px Hipstelvetica`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.lineJoin = 'round'; ctx.lineWidth = px * 0.15;
  const bos = 'BOS ', bw = ctx.measureText(bos).width, jw = ctx.measureText(jaar).width, fw = ctx.measureText('FEESTEN').width;
  const x0 = x - (bw + jw) / 2, l1 = y + px * 0.76, l2 = l1 + px * 0.9;
  const lijn = (t: string, tx: number, ty: number, rand: string, vul: string) => { ctx.strokeStyle = rand; ctx.strokeText(t, tx, ty); ctx.fillStyle = vul; ctx.fillText(t, tx, ty); };
  lijn(bos, x0, l1, K.groen, K.creme);
  lijn(jaar, x0 + bw, l1, K.creme, K.groen);
  lijn('FEESTEN', x - fw / 2, l2, K.groen, K.creme);
  return px * 1.85;
}

/** Grond voor elk beeld; geeft de vrije ruimte tussen kop en voet terug. */
export function grond(ctx: CanvasRenderingContext2D, soort: Formaat, tegel: HTMLImageElement, jaar: string, adres = true, logo = true, rand = true): Grond {
  const [W, H] = MATEN[soort];
  const k = Math.min(W, H);
  const r = rand ? Math.round(k * 0.075) : 0;
  const paneel = { x: r, y: r, w: W - 2 * r, h: H - 2 * r };
  const veilig = soort === 'story' ? Math.round(H * 0.12) : Math.round(k * 0.05);
  const midden = W / 2;

  ctx.fillStyle = K.indigo; ctx.fillRect(0, 0, W, H);
  const t = document.createElement('canvas'); t.width = t.height = Math.round(k / 3);
  t.getContext('2d')!.drawImage(tegel, 0, 0, t.width, t.height);
  if (rand) { ctx.fillStyle = ctx.createPattern(t, 'repeat')!; ctx.fillRect(0, 0, W, H); }
  ctx.fillStyle = K.indigo; ctx.beginPath(); ctx.roundRect(paneel.x, paneel.y, paneel.w, paneel.h, k * 0.035); ctx.fill();

  const boven = logo ? paneel.y + veilig + woordmerk(ctx, jaar, midden, paneel.y + veilig, (paneel.w * 0.5) / 4.4) + k * 0.04 : paneel.y + veilig;
  const onderAdres = paneel.y + paneel.h - veilig;
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.font = `600 ${k * 0.026}px Poppins`; ctx.fillStyle = K.creme;
  if (!adres) return { k, midden, binnenW: paneel.w - k * 0.1, boven, onder: onderAdres, paneel };
  ctx.fillText('EERSTE BOCHTWEG 1 · 9308 GIJZEGEM', midden, onderAdres);
  return { k, midden, binnenW: paneel.w - k * 0.1, boven, onder: onderAdres - k * 0.026 - k * 0.035, paneel };
}

/** Rij met datumblok (en podium), gecentreerd, onderaan op y. Geeft de hoogte terug. */
export function datumRij(ctx: CanvasRenderingContext2D, g: Grond, datum: string, podium: string, y: number) {
  const { k, midden, binnenW } = g;
  const h = k * 0.072, pad = k * 0.024, tussen = k * 0.016;
  let px = k * 0.038, dw = 0, pw = 0;
  do {
    ctx.font = `800 ${px}px "Roboto Slab"`;
    dw = ctx.measureText(datum).width + pad * 2;
    pw = podium ? ctx.measureText(podium.toUpperCase()).width + pad * 2 + tussen : 0;
    px -= 1;
  } while (dw + pw > binnenW && px > 16);
  let x = midden - (dw + pw) / 2;
  x += blok(ctx, datum, x, y - h, h, K.mandarijn, K.indigo, pad) + tussen;
  if (podium) blok(ctx, podium.toUpperCase(), x, y - h, h, podium === 'Meis' ? K.groen : K.creme, K.indigo, pad);
  return h;
}

/** De drie dagen als blokken, zoals op de sjablonen. Geeft de hoogte terug. */
export function dagblokken(ctx: CanvasRenderingContext2D, g: Grond, yOnder: number, schaal = 1) {
  const { k, midden } = g;
  const w = k * 0.2 * schaal, h = k * 0.2 * schaal, tussen = k * 0.022;
  const x0 = midden - (w * 3 + tussen * 2) / 2, y = yOnder - h;
  [['13', 'VRIJDAG'], ['14', 'ZATERDAG'], ['15', 'ZONDAG']].forEach(([n, d], i) => {
    const x = x0 + i * (w + tussen);
    ctx.fillStyle = i === 1 ? K.mandarijn : K.creme; ctx.beginPath(); ctx.roundRect(x, y, w, h, k * 0.012); ctx.fill();
    ctx.fillStyle = K.indigo; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = `800 ${h * 0.55}px "Roboto Slab"`; ctx.fillText(n!, x + w / 2, y + h * 0.62);
    ctx.font = `600 ${h * 0.12}px Poppins`; ctx.fillText(d!, x + w / 2, y + h * 0.86);
  });
  return h;
}

/** Breekt tekst af op woorden zodat elke regel binnen de breedte past. */
export function regels(ctx: CanvasRenderingContext2D, tekst: string, max: number) {
  const uit: string[] = [];
  let regel = '';
  for (const woord of tekst.split(/\s+/).filter(Boolean)) {
    const proef = regel ? `${regel} ${woord}` : woord;
    if (ctx.measureText(proef).width > max && regel) { uit.push(regel); regel = woord; } else regel = proef;
  }
  if (regel) uit.push(regel);
  return uit;
}
