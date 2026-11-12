"""Splitst drukwerk in herkleurbare lagen.

Per kunstwerk komen er drie bestanden in tools/kunst/:
  <naam>.m1.webp  RGB = dekking van de rollen P (primary), S (secondary), L (licht)
  <naam>.m2.webp  RGB = dekking van A (accent), B (tweede accent), V (vast: logo's, zwart)
  <naam>.v.jpg    de originele pixels voor het vaste deel
De website mengt die lagen met de kleuren van een palet (js/herkleur.js).

Gebruik: python3 tools/lagen.py [naam ...]
"""
import re, subprocess, sys, json, os
import numpy as np
import pikepdf
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
BRON, UIT = 'bron', 'tools/kunst'
ROLLEN = 'PSLABV'

# Merkkleuren die alleen in de bewerkte pdf voorkomen.
MERK_P = (0, 140, 140)     # onder elk patroonvak -> primary
MERK_B = (255, 140, 0)     # vector-lime (Meis-badge) -> tweede accent
rg = lambda c: '%.4f %.4f %.4f rg' % tuple(v / 255 for v in c)

# Bronkleur -> rol. Dit zijn de kleuren die nu in drukwerk.af staan.
BRON_KLEUREN = {
    MERK_P: 'P', MERK_B: 'B',
    (0xFF, 0xFF, 0xC9): 'L', (0xF8, 0xFF, 0xE5): 'L', (0xF9, 0xFA, 0xE4): 'L',
    (0xFF, 0x48, 0xEC): 'S', (0xEF, 0x47, 0x6F): 'S', (0x73, 0xFF, 0x29): 'S',
    (0x47, 0x15, 0xFF): 'A',
}
BANNER_KLEUREN = {(0x55, 0xBE, 0x93): 'P', (0xEF, 0x47, 0x6F): 'S', (0xF9, 0xFA, 0xE4): 'L'}

# naam: (bronbestand, breedte in px, opties)
WERKEN = {
    'affiche':      ('Affiche.pdf', 1280, {'vector_lime_naar_B': True, 'alleen_papier': [(0, 0.052), (0.831, 1)]}),
    'prijslijst':   ('Prijslijst_Plein.pdf', 900, {}),
    'bonnetjes':    ('Prijslijst_Bonnetjes.pdf', 900, {}),
    'bekers':       ('Bekers_Bonnetjes.pdf', 1100, {}),
    'flyer':        ('Flyer_Algemeen.pdf', 720, {'alleen_papier': [(0.04, 0.075, 0.04, 0.96)]}),
    'flyer-helpers': ('Flyer_Helpers.pdf', 720, {'tekst_papier_naar_A': True, 'alleen_papier': [(0.04, 0.075, 0.04, 0.96)]}),
    'drankbon-licht': ('Drankbon_Licht.pdf', 520, {}),
    'drankbon-zwaar': ('Drankbon_Zwaar.pdf', 520, {}),
    'banner':       ('Banner_A2.png', 1600, {'kleuren': BANNER_KLEUREN}),
}


def bewerk_pdf(bron, doel, opties):
    """Zet de primary-merkkleur onder elk patroonvak en geeft vector-lime een eigen merkkleur."""
    pdf = pikepdf.open(bron)
    page = pdf.pages[0]
    c = page.Contents
    data = (b''.join(x.read_bytes() for x in c) if isinstance(c, pikepdf.Array) else c.read_bytes()).decode('latin1')

    def onder_patroon(m):
        x, y, w, h = (float(v) for v in m.group(1).split())
        groter = '%.3f %.3f %.3f %.3f re' % (x - 0.4, y - 0.4, w + 0.8, h + 0.8)
        return f'q\n{rg(MERK_P)}\n{groter}\nf\n{m.group(1)} re\nW* n\nq\n{m.group(2)}'
    # Een patroonvak: clip-rechthoek, dan een geschaalde afbeelding.
    data, n = re.subn(r'q\n([\d.\- ]+) re\nW\* n\nq\n([\d.\- ]+ cm\nq\n[\d.\- ]+ cm\n[\d. ]+ g\n/I\d+ Do)', onder_patroon, data)
    if opties.get('vector_lime_naar_B'):
        data = data.replace('0.45098 1 0.160784 rg', rg(MERK_B))
    if opties.get('tekst_papier_naar_A'):
        # papierkleur die geen rechthoek vult = (nu onzichtbare) tekst
        data = re.sub(r'1 1 0\.788235 rg\n(?![\d.\- ]+ re\n)', '0.278431 0.082353 1 rg\n', data)
    page.Contents = pdf.make_stream(data.encode('latin1'))
    pdf.save(doel)
    return n


def ontmeng(img, kleuren, alleen_papier=()):
    """Geeft per pixel de dekking per rol (H x W x 6, som = 1)."""
    h, w, _ = img.shape
    px = img.reshape(-1, 3).astype(np.float32)
    bron = np.array(list(kleuren.keys()), np.float32)
    rol = np.array([ROLLEN.index(r) for r in kleuren.values()])
    uit = np.zeros((px.shape[0], 6), np.float32)

    d = np.stack([np.abs(px - b).max(1) for b in bron], 1)
    dichtst, afstand = d.argmin(1), d.min(1)
    hard = afstand <= 6
    uit[np.flatnonzero(hard), rol[dichtst[hard]]] = 1

    # Rest: beste mengsel van twee bronkleuren die in dit werk voorkomen (randen, transparantie).
    aanwezig = [i for i in range(len(bron)) if (hard & (dichtst == i)).mean() > 0.0004]
    rest = np.flatnonzero(~hard)
    if len(rest) and len(aanwezig) > 1:
        p = px[rest]
        beste = np.full(len(rest), 1e9, np.float32)
        keuze = np.zeros((len(rest), 3), np.float32)  # i, j, t
        for a in range(len(aanwezig)):
            for b in range(a + 1, len(aanwezig)):
                i, j = aanwezig[a], aanwezig[b]
                v = bron[j] - bron[i]
                t = np.clip(((p - bron[i]) @ v) / (v @ v), 0, 1)
                fout = np.abs(p - (bron[i] + t[:, None] * v)).max(1)
                beter = fout < beste
                beste[beter] = fout[beter]
                keuze[beter] = np.stack([np.full(beter.sum(), i), np.full(beter.sum(), j), t[beter]], 1)
        ok = beste <= 14
        r, k = rest[ok], keuze[ok]
        np.add.at(uit, (r, rol[k[:, 0].astype(int)]), 1 - k[:, 2])
        np.add.at(uit, (r, rol[k[:, 1].astype(int)]), k[:, 2])
    uit[uit.sum(1) < 0.5, 5] = 1  # niet te verklaren = vast (logo's, zwart, foto's)

    uit = uit.reshape(h, w, 6)
    # Zones met logo's: alleen exact papier wordt herkleurd, de rest blijft zoals het is.
    for y0, y1, *x in alleen_papier:  # optioneel ook x0, x1
        a, b = int(y0 * h), int(y1 * h)
        c, d = (int(x[0] * w), int(x[1] * w)) if x else (0, w)
        zone = uit[a:b, c:d]
        papier = (hard.reshape(h, w)[a:b, c:d]) & (rol[dichtst].reshape(h, w)[a:b, c:d] == 2)
        zone[:] = 0
        zone[papier, 2] = 1
        zone[~papier, 5] = 1
    return uit


def maak(naam):
    bestand, breedte, opties = WERKEN[naam]
    pad = os.path.join(BRON, bestand)
    schaal = 2  # render 2x zo groot, daarna verkleinen voor gladde randen
    if bestand.endswith('.pdf'):
        tmp = f'/tmp/lagen-{naam}.pdf'
        n = bewerk_pdf(pad, tmp, opties)
        subprocess.run(['pdftoppm', '-png', '-singlefile', '-scale-to-x', str(breedte * schaal), '-scale-to-y', '-1', tmp, f'/tmp/lagen-{naam}'], check=True)
        im = Image.open(f'/tmp/lagen-{naam}.png').convert('RGB')
    else:
        n = 0
        im = Image.open(pad).convert('RGB')
        im = im.resize((breedte * schaal, round(im.height * breedte * schaal / im.width)), Image.LANCZOS)
    hoogte = round(im.height / schaal)
    arr = np.asarray(im)
    lagen = ontmeng(arr, opties.get('kleuren', BRON_KLEUREN), opties.get('alleen_papier', ()))

    klein = lambda a: np.asarray(Image.fromarray(a).resize((breedte, hoogte), Image.BOX))
    m = [klein((lagen[:, :, i] * 255).round().astype(np.uint8)) for i in range(6)]
    Image.fromarray(np.dstack(m[0:3])).save(f'{UIT}/{naam}.m1.webp', lossless=True, method=4)
    Image.fromarray(np.dstack(m[3:6])).save(f'{UIT}/{naam}.m2.webp', lossless=True, method=4)
    vast = klein(arr).copy()
    vast[m[5] == 0] = 255
    Image.fromarray(vast).save(f'{UIT}/{naam}.v.jpg', quality=86)
    aandeel = {r: round(float(lagen[:, :, i].mean()) * 100, 1) for i, r in enumerate(ROLLEN)}
    print(f'{naam}: {breedte}x{hoogte}, {n} patroonvakken, aandeel {aandeel}')
    return {'b': breedte, 'h': hoogte, 'aandeel': aandeel}


if __name__ == '__main__':
    os.makedirs(UIT, exist_ok=True)
    namen = sys.argv[1:] or list(WERKEN)
    maten = {}
    if os.path.exists(f'{UIT}/maten.json'):
        maten = json.load(open(f'{UIT}/maten.json'))
    for naam in namen:
        maten[naam] = maak(naam)
    json.dump(maten, open(f'{UIT}/maten.json', 'w'), indent=1)
