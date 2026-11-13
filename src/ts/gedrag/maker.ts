// Postmaker: tekent een post, vierkant of story in de huisstijl op een canvas en biedt hem aan als PNG.
// De opbouw is dezelfde als de sjablonen uit tools/kit.py: kop met woordmerk, beeld in het midden, naam en datum onderaan.
const K = { indigo: '#4F3795', diep: '#3F2C7A', groen: '#60BC46', mandarijn: '#F5821F', creme: '#FAF6DE' };
const MATEN = { post: [1080, 1350], vierkant: [1080, 1080], story: [1080, 1920] } as const;

const laad = (src: string) => new Promise<HTMLImageElement>((ok, fout) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fout; i.src = src; });

/** Grootste lettergrootte waarbij de tekst binnen de breedte past. */
function passend(ctx: CanvasRenderingContext2D, tekst: string, font: (px: number) => string, max: number, start: number) {
  let px = start;
  ctx.font = font(px);
  while (ctx.measureText(tekst).width > max && px > 28) { px -= 2; ctx.font = font(px); }
  return px;
}

function blok(ctx: CanvasRenderingContext2D, tekst: string, x: number, y: number, h: number, vlak: string, letter: string, pad: number) {
  const w = ctx.measureText(tekst).width + pad * 2;
  ctx.fillStyle = vlak; ctx.beginPath(); ctx.roundRect(x, y, w, h, h * 0.12); ctx.fill();
  ctx.fillStyle = letter; ctx.textBaseline = 'middle'; ctx.fillText(tekst, x + pad, y + h / 2 + h * 0.04);
  return w;
}

export async function maker() {
  const doos = document.querySelector<HTMLElement>('[data-maker]');
  const canvas = doos?.querySelector<HTMLCanvasElement>('[data-maker-canvas]');
  const form = doos?.querySelector<HTMLFormElement>('[data-maker-form]');
  if (!doos || !canvas || !form) return;
  const ctx = canvas.getContext('2d')!;
  const jaar = doos.dataset.jaar!;
  const maat = doos.querySelector<HTMLElement>('[data-maker-maat]');
  const fotoPaneel = doos.querySelector<HTMLElement>('[data-maker-foto]');
  const [tegel, logo] = await Promise.all([laad('assets/kit/patroon/bosfeesten-patroon-transparant.svg'), laad('assets/kit/logo/bosfeesten-logo-creme.svg')]);
  await Promise.all(['400 10px Hipstelvetica', '800 10px "Roboto Slab"', '700 10px "Roboto Slab"', '600 10px Poppins'].map((f) => document.fonts.load(f)));

  let foto: HTMLImageElement | null = null;
  const schuif = { x: 0, y: 0 }; // verschuiving van de foto, -1 tot 1
  let zone = { x: 0, y: 0, w: 1, h: 1 };

  function woordmerk(x: number, y: number, px: number) {
    ctx.font = `400 ${px}px Hipstelvetica`; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round'; ctx.lineWidth = px * 0.15;
    const bos = 'BOS ', bw = ctx.measureText(bos).width, jw = ctx.measureText(jaar).width, fw = ctx.measureText('FEESTEN').width;
    const x0 = x - (bw + jw) / 2, l1 = y + px * 0.76, l2 = l1 + px * 0.9;
    ctx.textAlign = 'left';
    ctx.strokeStyle = K.groen; ctx.strokeText(bos, x0, l1); ctx.fillStyle = K.creme; ctx.fillText(bos, x0, l1);
    ctx.strokeStyle = K.creme; ctx.strokeText(jaar, x0 + bw, l1); ctx.fillStyle = K.mandarijn; ctx.fillText(jaar, x0 + bw, l1);
    ctx.strokeStyle = K.groen; ctx.strokeText('FEESTEN', x - fw / 2, l2); ctx.fillStyle = K.creme; ctx.fillText('FEESTEN', x - fw / 2, l2);
    return px * 1.85;
  }

  function teken() {
    const d = new FormData(form!);
    const soort = (d.get('formaat') as keyof typeof MATEN) || 'post';
    const [W, H] = MATEN[soort];
    canvas!.width = W; canvas!.height = H;
    if (maat) maat.textContent = `${W} × ${H} px`;
    const k = Math.min(W, H), rand = Math.round(k * 0.075);
    const p = { x: rand, y: rand, w: W - 2 * rand, h: H - 2 * rand };
    const veilig = soort === 'story' ? Math.round(H * 0.12) : Math.round(k * 0.05);
    const midden = W / 2, binnenW = p.w - k * 0.1;

    // Grond: boompjesrand en een Indigo vlak
    ctx.fillStyle = K.indigo; ctx.fillRect(0, 0, W, H);
    const t = document.createElement('canvas'); t.width = t.height = Math.round(k / 3);
    t.getContext('2d')!.drawImage(tegel, 0, 0, t.width, t.height);
    ctx.fillStyle = ctx.createPattern(t, 'repeat')!; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = K.indigo; ctx.beginPath(); ctx.roundRect(p.x, p.y, p.w, p.h, k * 0.035); ctx.fill();

    // Kop
    let boven = p.y + veilig;
    boven += woordmerk(midden, boven, (p.w * 0.5) / 4.4) + k * 0.04;

    // Voet, van onder naar boven opgebouwd zodat niets overlapt
    let onder = p.y + p.h - veilig;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = `600 ${k * 0.026}px Poppins`; ctx.fillStyle = K.creme;
    ctx.fillText('EERSTE BOCHTWEG 1 · 9308 GIJZEGEM', midden, onder);
    onder -= k * 0.026 + k * 0.035;

    const chipH = k * 0.072;
    ctx.textAlign = 'left';
    const datum = `${String(d.get('dag'))} · ${String(d.get('uur') || '')}`.toUpperCase().replace(/ · $/, '');
    const podium = String(d.get('podium') || '');
    const pad = k * 0.024;
    // Datum en podium samen moeten binnen het vlak passen: anders worden de letters kleiner.
    let cpx = k * 0.038, dw = 0, pw = 0;
    do {
      ctx.font = `800 ${cpx}px "Roboto Slab"`;
      dw = ctx.measureText(datum).width + pad * 2;
      pw = podium ? ctx.measureText(podium.toUpperCase()).width + pad * 2 + k * 0.016 : 0;
      cpx -= 1;
    } while (dw + pw > binnenW && cpx > 16);
    let cx = midden - (dw + pw) / 2;
    cx += blok(ctx, datum, cx, onder - chipH, chipH, K.mandarijn, K.indigo, pad) + k * 0.016;
    if (podium) blok(ctx, podium.toUpperCase(), cx, onder - chipH, chipH, podium === 'Meis' ? K.groen : K.creme, K.indigo, pad);
    onder -= chipH + k * 0.035;

    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const extra = String(d.get('extra') || '').trim();
    if (extra) {
      passend(ctx, extra, (px) => `700 ${px}px "Roboto Slab"`, binnenW, k * 0.044);
      ctx.fillStyle = K.creme; ctx.fillText(extra, midden, onder);
      onder -= k * 0.044 + k * 0.022;
    }
    const naam = String(d.get('naam') || 'Jouw artiest').toUpperCase();
    const npx = passend(ctx, naam, (px) => `800 ${px}px "Roboto Slab"`, binnenW, k * 0.13);
    ctx.fillStyle = K.creme; ctx.fillText(naam, midden, onder);
    onder -= npx * 0.78 + k * 0.045;

    // Beeld in de ruimte die overblijft
    zone = { x: p.x + k * 0.05, y: boven, w: p.w - k * 0.1, h: Math.max(k * 0.15, onder - boven) };
    const vrij = d.get('vrij') === 'on';
    const r = k * 0.028;
    if (foto && vrij) {
      const s = Math.min(zone.w / foto.width, zone.h / foto.height) * Number(d.get('zoom') || 1);
      const fw = foto.width * s, fh = foto.height * s;
      ctx.save(); ctx.beginPath(); ctx.rect(p.x, p.y, p.w, onder + k * 0.02 - p.y); ctx.clip();
      ctx.drawImage(foto, zone.x + (zone.w - fw) / 2 + schuif.x * zone.w * 0.5, zone.y + zone.h - fh + schuif.y * zone.h * 0.5, fw, fh);
      ctx.restore();
    } else {
      ctx.save(); ctx.beginPath(); ctx.roundRect(zone.x, zone.y, zone.w, zone.h, r); ctx.clip();
      if (foto) {
        const s = Math.max(zone.w / foto.width, zone.h / foto.height) * Number(d.get('zoom') || 1);
        const fw = foto.width * s, fh = foto.height * s;
        const ox = Math.max(0, fw - zone.w) / 2, oy = Math.max(0, fh - zone.h) / 2;
        ctx.drawImage(foto, zone.x + (zone.w - fw) / 2 + schuif.x * ox, zone.y + (zone.h - fh) / 2 + schuif.y * oy, fw, fh);
      } else {
        ctx.fillStyle = K.diep; ctx.fillRect(zone.x, zone.y, zone.w, zone.h);
        const z = Math.min(zone.w, zone.h) * 0.62;
        ctx.drawImage(logo, midden - z / 2, zone.y + (zone.h - z) / 2, z, z);
      }
      ctx.restore();
      ctx.lineWidth = k * 0.009; ctx.strokeStyle = K.groen; ctx.beginPath(); ctx.roundRect(zone.x, zone.y, zone.w, zone.h, r); ctx.stroke();
    }
  }

  form.addEventListener('input', teken);
  form.addEventListener('change', async (e) => {
    const veld = e.target as HTMLInputElement;
    if (veld.type === 'file' && veld.files?.[0]) {
      try { foto = await laad(URL.createObjectURL(veld.files[0])); } catch { foto = null; }
      schuif.x = schuif.y = 0;
      if (fotoPaneel) fotoPaneel.hidden = !foto;
      canvas.classList.toggle('heeft-foto', !!foto);
      teken();
    }
  });

  // Foto verschuiven door te slepen in het voorbeeld
  let sleep: { x: number; y: number; sx: number; sy: number } | null = null;
  canvas.addEventListener('pointerdown', (e) => {
    if (!foto) return;
    canvas.setPointerCapture(e.pointerId);
    sleep = { x: e.clientX, y: e.clientY, sx: schuif.x, sy: schuif.y };
    canvas.classList.add('is-slepen');
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!sleep) return;
    const r = canvas.getBoundingClientRect(), schaal = canvas.width / r.width;
    const bx = ((e.clientX - sleep.x) * schaal) / (zone.w / 2), by = ((e.clientY - sleep.y) * schaal) / (zone.h / 2);
    schuif.x = Math.max(-1, Math.min(1, sleep.sx + bx)); schuif.y = Math.max(-1, Math.min(1, sleep.sy + by));
    teken();
  });
  const los = () => { sleep = null; canvas.classList.remove('is-slepen'); };
  canvas.addEventListener('pointerup', los); canvas.addEventListener('pointercancel', los);

  doos.querySelector('[data-maker-download]')?.addEventListener('click', () => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      const d = new FormData(form);
      const naam = String(d.get('naam') || 'post').toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      a.href = URL.createObjectURL(blob); a.download = `bosfeesten-${jaar}-${naam}-${d.get('formaat')}.png`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  });
  teken();
}
