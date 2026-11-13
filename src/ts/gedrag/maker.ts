// Postmaker: tekent een post of story in de huisstijl op een canvas en biedt hem aan als PNG.
const K = { indigo: '#4F3795', groen: '#60BC46', mandarijn: '#F5821F', creme: '#FAF6DE' };

function laad(src: string) {
  return new Promise<HTMLImageElement>((ok, fout) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fout; i.src = src; });
}

function afgerond(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
}

/** Tekst die smaller wordt tot ze past. */
function passend(ctx: CanvasRenderingContext2D, tekst: string, font: (px: number) => string, max: number, start: number) {
  let px = start;
  do { ctx.font = font(px); px -= 4; } while (ctx.measureText(tekst).width > max && px > 24);
  return px + 4;
}

export async function maker() {
  const doos = document.querySelector<HTMLElement>('[data-maker]');
  const canvas = doos?.querySelector<HTMLCanvasElement>('[data-maker-canvas]');
  const form = doos?.querySelector<HTMLFormElement>('[data-maker-form]');
  if (!doos || !canvas || !form) return;
  const ctx = canvas.getContext('2d')!;
  const jaar = doos.dataset.jaar!;
  const [tegel, logo] = await Promise.all([laad('assets/kit/patroon/bosfeesten-patroon-transparant.svg'), laad('assets/kit/logo/bosfeesten-logo-creme.svg')]);
  await Promise.all(['400 10px Hipstelvetica', '800 10px "Roboto Slab"', '700 10px "Roboto Slab"', '600 10px Poppins'].map((f) => document.fonts.load(f)));
  let foto: HTMLImageElement | null = null;

  function teken() {
    const d = new FormData(form!);
    const story = d.get('formaat') === 'story';
    const W = 1080, H = story ? 1920 : 1350;
    canvas!.width = W; canvas!.height = H;
    const rand = 86, binnen = { x: rand, y: rand, w: W - 2 * rand, h: H - 2 * rand };

    // Grond en boompjesrand
    ctx.fillStyle = K.indigo; ctx.fillRect(0, 0, W, H);
    const t = document.createElement('canvas'); t.width = t.height = 340;
    t.getContext('2d')!.drawImage(tegel, 0, 0, 340, 340);
    ctx.fillStyle = ctx.createPattern(t, 'repeat')!; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = K.indigo; afgerond(ctx, binnen.x, binnen.y, binnen.w, binnen.h, 40); ctx.fill();

    // Woordmerk bovenaan
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    const top = binnen.y + (story ? 210 : 130);
    ctx.font = '400 92px Hipstelvetica';
    const bos = 'BOS ', jr = jaar;
    const bw = ctx.measureText(bos).width, jw = ctx.measureText(jr).width, x0 = W / 2 - (bw + jw) / 2;
    ctx.textAlign = 'left'; ctx.lineWidth = 14;
    ctx.strokeStyle = K.groen; ctx.strokeText(bos, x0, top); ctx.fillStyle = K.creme; ctx.fillText(bos, x0, top);
    ctx.strokeStyle = K.creme; ctx.strokeText(jr, x0 + bw, top); ctx.fillStyle = K.mandarijn; ctx.fillText(jr, x0 + bw, top);
    ctx.textAlign = 'center';
    ctx.strokeStyle = K.groen; ctx.strokeText('FEESTEN', W / 2, top + 88); ctx.fillStyle = K.creme; ctx.fillText('FEESTEN', W / 2, top + 88);

    // Foto of logo
    const fy = top + 140, fh = story ? 860 : 560, fw = binnen.w - 120, fx = W / 2 - fw / 2;
    ctx.save(); afgerond(ctx, fx, fy, fw, fh, 28); ctx.clip();
    if (foto) {
      const s = Math.max(fw / foto.width, fh / foto.height);
      ctx.drawImage(foto, fx + (fw - foto.width * s) / 2, fy + (fh - foto.height * s) / 2, foto.width * s, foto.height * s);
    } else {
      ctx.fillStyle = '#3F2C7A'; ctx.fillRect(fx, fy, fw, fh);
      const z = fh * 0.62; ctx.globalAlpha = 0.9; ctx.drawImage(logo, W / 2 - z / 2, fy + (fh - z) / 2, z, z); ctx.globalAlpha = 1;
    }
    ctx.restore();
    ctx.lineWidth = 10; ctx.strokeStyle = K.groen; afgerond(ctx, fx, fy, fw, fh, 28); ctx.stroke();

    // Naam
    const naam = String(d.get('naam') || 'Jouw artiest').toUpperCase();
    const ny = fy + fh + (story ? 170 : 130);
    passend(ctx, naam, (px) => `800 ${px}px "Roboto Slab"`, binnen.w - 100, 112);
    ctx.fillStyle = K.creme; ctx.fillText(naam, W / 2, ny);

    // Dag, uur en podium
    const info = `${d.get('dag')} · ${d.get('uur')}`.toUpperCase();
    ctx.font = '700 40px "Roboto Slab"';
    const iw = ctx.measureText(info).width + 56, iy = ny + 46;
    ctx.fillStyle = K.mandarijn; ctx.fillRect(W / 2 - iw / 2, iy, iw, 70);
    ctx.fillStyle = K.indigo; ctx.fillText(info, W / 2, iy + 49);
    const podium = String(d.get('podium')).toUpperCase();
    ctx.font = '600 30px Poppins'; ctx.fillStyle = podium === 'MEIS' ? K.groen : K.creme;
    ctx.fillText(`PODIUM ${podium}`, W / 2, iy + 130);

    // Voet
    ctx.font = '600 26px Poppins'; ctx.fillStyle = K.creme; ctx.globalAlpha = 0.85;
    ctx.fillText('13 · 14 · 15 AUGUSTUS  ·  EERSTE BOCHTWEG 1, GIJZEGEM', W / 2, binnen.y + binnen.h - (story ? 200 : 60));
    ctx.globalAlpha = 1;
  }

  form.addEventListener('input', teken);
  form.addEventListener('change', async (e) => {
    const veld = e.target as HTMLInputElement;
    if (veld.type === 'file' && veld.files?.[0]) {
      const url = URL.createObjectURL(veld.files[0]);
      try { foto = await laad(url); } catch { foto = null; }
      teken();
    }
  });
  doos.querySelector('[data-maker-download]')?.addEventListener('click', () => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      const naam = String(new FormData(form).get('naam') || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      a.href = URL.createObjectURL(blob); a.download = `bosfeesten-${jaar}-${naam}.png`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  });
  teken();
}
