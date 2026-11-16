// Postmaker: artiest, line-up of aftellen, in drie formaten, altijd in huisstijl. Maakt ook het bijschrift voor Instagram.
import { K, MATEN, type Formaat, type Grond, blok, dagblokken, datumRij, grond, passend } from './maker-teken';

const laad = (src: string) => new Promise<HTMLImageElement>((ok, fout) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fout; i.src = src; });
const PODIUM_IN: Record<string, string> = { Meis: 'in de Meis', Plein: 'op het Plein' };
const HASHTAGS = (jaar: string) => `#bosfeesten #bosfeesten${jaar} #chiropopov #gijzegem`;

type Act = { uur: string; naam: string; podium: string };
/** "21u30 Lady Gwen (Meis)" wordt { uur, naam, podium }. */
const leesActs = (tekst: string): Act[] => tekst.split('\n').map((r) => r.trim()).filter(Boolean).slice(0, 8).map((r) => {
  const m = r.match(/^(\d{1,2}\s*[u:.h]\s*\d{2})?\s*(.*?)\s*(?:\((meis|plein)\))?$/i)!;
  const p = (m[3] ?? '').toLowerCase();
  return { uur: (m[1] ?? '').replace(/\s/g, ''), naam: m[2] ?? '', podium: p ? p[0]!.toUpperCase() + p.slice(1) : '' };
});

const dagenTot = (jaar: number) => {
  const nu = new Date(); nu.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((new Date(jaar, 7, 13).getTime() - nu.getTime()) / 86400000));
};

export async function maker() {
  const doos = document.querySelector<HTMLElement>('[data-maker]');
  const canvas = doos?.querySelector<HTMLCanvasElement>('[data-maker-canvas]');
  const form = doos?.querySelector<HTMLFormElement>('[data-maker-form]');
  if (!doos || !canvas || !form) return;
  const ctx = canvas.getContext('2d')!;
  const jaar = doos.dataset.jaar!;
  const maat = doos.querySelector<HTMLElement>('[data-maker-maat]');
  const tekstVak = doos.querySelector<HTMLElement>('[data-maker-tekst]');
  const fotoPaneel = doos.querySelector<HTMLElement>('[data-maker-foto]');
  const [tegel, logo] = await Promise.all([laad('assets/kit/patroon/bosfeesten-patroon-transparant.svg'), laad('assets/kit/logo/bosfeesten-logo-creme.svg')]);
  await Promise.all(['400 10px Hipstelvetica', '800 10px "Roboto Slab"', '700 10px "Roboto Slab"', '600 10px Poppins'].map((f) => document.fonts.load(f)));

  let foto: HTMLImageElement | null = null;
  const schuif = { x: 0, y: 0 };
  let zone = { x: 0, y: 0, w: 1, h: 1 };
  const veld = (n: string) => String(new FormData(form).get(n) ?? '');

  function artiest(g: Grond) {
    const { k, midden, binnenW } = g;
    let onder = g.onder;
    const datum = `${veld('dag')} · ${veld('uur')}`.toUpperCase().replace(/ · $/, '');
    onder -= datumRij(ctx, g, datum, veld('podium'), onder) + k * 0.035;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = K.creme;
    const extra = veld('extra').trim();
    if (extra) { passend(ctx, extra, (px) => `700 ${px}px "Roboto Slab"`, binnenW, k * 0.044); ctx.fillText(extra, midden, onder); onder -= k * 0.066; }
    const naam = (veld('naam') || 'Jouw artiest').toUpperCase();
    const npx = passend(ctx, naam, (px) => `800 ${px}px "Roboto Slab"`, binnenW, k * 0.13);
    ctx.fillText(naam, midden, onder);
    onder -= npx * 0.78 + k * 0.045;

    zone = { x: g.paneel.x + k * 0.05, y: g.boven, w: binnenW, h: Math.max(k * 0.15, onder - g.boven) };
    const r = k * 0.028;
    if (foto && veld('vrij') === 'on') {
      const s = Math.min(zone.w / foto.width, zone.h / foto.height) * Number(veld('zoom') || 1);
      const fw = foto.width * s, fh = foto.height * s;
      ctx.save(); ctx.beginPath(); ctx.rect(g.paneel.x, g.paneel.y, g.paneel.w, onder + k * 0.02 - g.paneel.y); ctx.clip();
      ctx.drawImage(foto, zone.x + (zone.w - fw) / 2 + schuif.x * zone.w * 0.5, zone.y + zone.h - fh + schuif.y * zone.h * 0.5, fw, fh);
      ctx.restore();
      return;
    }
    ctx.save(); ctx.beginPath(); ctx.roundRect(zone.x, zone.y, zone.w, zone.h, r); ctx.clip();
    if (foto) {
      const s = Math.max(zone.w / foto.width, zone.h / foto.height) * Number(veld('zoom') || 1);
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

  function lineup(g: Grond) {
    const { k, midden, binnenW } = g;
    const acts = leesActs(veld('acts'));
    // Dag als titel
    ctx.font = `800 ${k * 0.05}px "Roboto Slab"`;
    const dag = veld('dag').toUpperCase();
    const dh = k * 0.085, dw = ctx.measureText(dag).width + k * 0.06;
    blok(ctx, dag, midden - dw / 2, g.boven, dh, K.mandarijn, K.indigo, k * 0.03);
    const top = g.boven + dh + k * 0.04, ruimte = g.onder - top;
    if (!acts.length) return;
    // Alle rijen even hoog en met dezelfde lettergrootte; het blok staat verticaal in het midden van de vrije ruimte.
    const rij = Math.min(k * 0.16, ruimte / acts.length);
    const links = g.paneel.x + k * 0.05, rechts = links + binnenW;
    ctx.font = `800 ${rij * 0.28}px "Roboto Slab"`;
    const uw = acts.some((a) => a.uur) ? ctx.measureText('00u00').width + k * 0.03 : 0;
    ctx.font = `800 ${rij * 0.2}px "Roboto Slab"`;
    const bw = Math.max(0, ...acts.map((a) => (a.podium ? ctx.measureText(a.podium.toUpperCase()).width + k * 0.04 : 0)));
    const naamPx = Math.min(...acts.map((a) => passend(ctx, a.naam.toUpperCase(), (px) => `800 ${px}px "Roboto Slab"`, binnenW - uw - bw - k * 0.03, rij * 0.42)));
    const start = top + (ruimte - rij * acts.length) / 2;
    acts.forEach((a, i) => {
      const y = start + i * rij, m = y + rij / 2;
      ctx.strokeStyle = 'rgba(96,188,70,0.55)'; ctx.lineWidth = 2;
      if (i) { ctx.beginPath(); ctx.moveTo(links, y); ctx.lineTo(rechts, y); ctx.stroke(); }
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      ctx.font = `800 ${rij * 0.28}px "Roboto Slab"`; ctx.fillStyle = K.mandarijn;
      if (a.uur) ctx.fillText(a.uur, links, m);
      if (a.podium) {
        ctx.font = `800 ${rij * 0.2}px "Roboto Slab"`;
        const w = ctx.measureText(a.podium.toUpperCase()).width + k * 0.04;
        blok(ctx, a.podium.toUpperCase(), rechts - w, m - rij * 0.19, rij * 0.38, a.podium === 'Meis' ? K.groen : K.creme, K.indigo, k * 0.02);
      }
      ctx.font = `800 ${naamPx}px "Roboto Slab"`; ctx.fillStyle = K.creme; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(a.naam.toUpperCase(), links + uw, m + rij * 0.02);
    });
  }

  function aftellen(g: Grond) {
    const { k, midden, binnenW } = g;
    let onder = g.onder;
    if (canvas!.width === canvas!.height) {
      // Vierkant heeft weinig hoogte: de dagen als één regel, zodat het getal groot kan blijven.
      onder -= datumRij(ctx, g, `13, 14 & 15 AUGUSTUS ${jaar}`, '', onder) + k * 0.04;
    } else onder -= dagblokken(ctx, g, onder, 0.8) + k * 0.05;
    const teaser = veld('teaser').trim();
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = K.creme;
    if (teaser) { passend(ctx, teaser, (px) => `700 ${px}px "Roboto Slab"`, binnenW, k * 0.048); ctx.fillText(teaser, midden, onder); onder -= k * 0.08; }
    // Opbouw: NOG, het getal, DAGEN. Het getal krijgt wat overblijft, het geheel staat in het midden.
    const n = dagenTot(Number(jaar));
    const ruimte = onder - g.boven, lab = k * 0.05, tussen = k * 0.03;
    const npx = passend(ctx, String(n), (px) => `800 ${px}px "Roboto Slab"`, binnenW, Math.min((ruimte - 2 * lab - 2 * tussen) / 0.74, k * 0.5));
    const totaal = lab + tussen + npx * 0.74 + tussen + lab;
    const y = g.boven + (ruimte - totaal) / 2;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = `800 ${lab}px "Roboto Slab"`; ctx.fillStyle = K.groen; ctx.fillText('NOG', midden, y + lab);
    ctx.font = `800 ${npx}px "Roboto Slab"`; ctx.fillStyle = K.creme; ctx.fillText(String(n), midden, y + lab + tussen + npx * 0.74);
    ctx.font = `800 ${lab}px "Roboto Slab"`; ctx.fillStyle = K.groen; ctx.fillText(n === 1 ? 'DAG' : 'DAGEN', midden, y + totaal);
  }

  function bijschrift() {
    const modus = veld('modus');
    const adres = `13, 14 & 15 augustus ${jaar} · Eerste Bochtweg 1, Gijzegem`;
    if (modus === 'lineup') {
      const rijen = leesActs(veld('acts')).map((a) => `${a.uur ? a.uur + ' ' : ''}${a.naam}${a.podium ? ` (${a.podium})` : ''}`).join('\n');
      return `Dit is de line-up van ${veld('dag').toLowerCase()} op de Bosfeesten ${jaar}:\n\n${rijen}\n\n${adres}\n${HASHTAGS(jaar)}`;
    }
    if (modus === 'aftellen') {
      const n = dagenTot(Number(jaar)), teaser = veld('teaser').trim();
      return `Nog ${n} ${n === 1 ? 'dag' : 'dagen'} tot de Bosfeesten ${jaar}!${teaser ? ' ' + teaser + '.' : ''}\n\n${adres}\n${HASHTAGS(jaar)}`;
    }
    const naam = veld('naam') || 'Jouw artiest', podium = PODIUM_IN[veld('podium')] ?? '';
    const extra = veld('extra').trim();
    return `${naam} staat op ${veld('dag').toLowerCase()}${veld('uur') ? ' om ' + veld('uur') : ''}${podium ? ' ' + podium : ''} op de Bosfeesten ${jaar}!${extra ? ' ' + extra + '.' : ''}\n\n${adres}\n${HASHTAGS(jaar)}`;
  }

  function teken(soort = (veld('formaat') as Formaat) || 'post') {
    const [W, H] = MATEN[soort];
    canvas!.width = W; canvas!.height = H;
    const g = grond(ctx, soort, tegel, jaar);
    ({ artiest, lineup, aftellen } as Record<string, (g: Grond) => void>)[veld('modus') || 'artiest']!(g);
  }

  function ververs() {
    const modus = veld('modus');
    form!.querySelectorAll<HTMLElement>('[data-voor]').forEach((el) => { el.hidden = !el.dataset.voor!.split(' ').includes(modus); });
    const [W, H] = MATEN[(veld('formaat') as Formaat) || 'post'];
    if (maat) maat.textContent = `${W} × ${H}`;
    if (tekstVak) tekstVak.textContent = bijschrift();
    teken();
  }

  form.addEventListener('input', ververs);
  form.addEventListener('change', async (e) => {
    const v = e.target as HTMLInputElement;
    if (v.type === 'file' && v.files?.[0]) {
      try { foto = await laad(URL.createObjectURL(v.files[0])); } catch { foto = null; }
      schuif.x = schuif.y = 0;
      if (fotoPaneel) fotoPaneel.hidden = !foto;
      canvas.classList.toggle('heeft-foto', !!foto);
    }
    ververs();
  });

  // Foto verschuiven door te slepen in het voorbeeld
  let greep: { x: number; y: number; sx: number; sy: number } | null = null;
  canvas.addEventListener('pointerdown', (e) => {
    if (!foto || veld('modus') !== 'artiest') return;
    canvas.setPointerCapture(e.pointerId);
    greep = { x: e.clientX, y: e.clientY, sx: schuif.x, sy: schuif.y };
    canvas.classList.add('is-slepen');
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!greep) return;
    const r = canvas.getBoundingClientRect(), schaal = canvas.width / r.width;
    schuif.x = Math.max(-1, Math.min(1, greep.sx + ((e.clientX - greep.x) * schaal) / (zone.w / 2)));
    schuif.y = Math.max(-1, Math.min(1, greep.sy + ((e.clientY - greep.y) * schaal) / (zone.h / 2)));
    teken();
  });
  const los = () => { greep = null; canvas.classList.remove('is-slepen'); };
  canvas.addEventListener('pointerup', los); canvas.addEventListener('pointercancel', los);

  const bewaar = (soort: Formaat) => new Promise<void>((klaar) => {
    teken(soort);
    canvas.toBlob((blob) => {
      if (blob) {
        const a = document.createElement('a');
        const naam = (veld('modus') === 'artiest' ? veld('naam') : veld('modus')).toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'post';
        a.href = URL.createObjectURL(blob); a.download = `bosfeesten-${jaar}-${naam}-${soort}.png`; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      }
      klaar();
    }, 'image/png');
  });
  doos.querySelector('[data-maker-download]')?.addEventListener('click', () => bewaar((veld('formaat') as Formaat) || 'post'));
  doos.querySelector('[data-maker-alles]')?.addEventListener('click', async () => {
    for (const s of Object.keys(MATEN) as Formaat[]) { await bewaar(s); await new Promise((r) => setTimeout(r, 350)); }
    teken();
  });
  doos.querySelector('[data-maker-bijschrift]')?.addEventListener('click', (e) => {
    const knop = e.currentTarget as HTMLButtonElement;
    navigator.clipboard?.writeText(bijschrift()).then(() => { knop.textContent = 'Gekopieerd'; setTimeout(() => { knop.textContent = 'Kopieer'; }, 1600); }, () => {});
  });
  ververs();
}
