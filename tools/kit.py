"""Maakt de downloadbare media kit in assets/kit/ (logo's, kleuren, patroon, drukwerk, bonnen, sociale beelden, zip).

Gebruik: python3 tools/kit.py   (Playwright en Chromium moeten geïnstalleerd zijn)
"""
import base64, json, re, struct, sys, zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from proef import kleur_in  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
KIT = ROOT / 'assets' / 'kit'

KLEUREN = {  # naam: (cmyk, hex) -- zelfde waarden als src/ts/data/kleuren.ts
    'Indigo': ((85, 95, 0, 0), '#4F3795'),
    'Groen': ((65, 0, 100, 0), '#60BC46'),
    'Mandarijn': ((0, 60, 100, 0), '#F5821F'),
    'Crème': ((2, 2, 14, 0), '#FAF6DE'),
}
I, G, M, C = (KLEUREN[k][1] for k in ('Indigo', 'Groen', 'Mandarijn', 'Crème'))
PALET = dict(P=I, S=G, A=M, B=G, L=C)
JAAR, EDITIE = 2027, 64
DATUM, ADRES = '13 · 14 · 15 augustus', 'Eerste Bochtweg 1 · 9308 Gijzegem'

LOGO = (ROOT / 'assets/logo/logo-zwart.svg').read_text()
PATROON = (ROOT / 'tools/patroon-bron.svg').read_text()  # boompjestegel uit E:\Bosfeesten\2025\Drukwerk\Patroon.svg


def logo_svg(kleur):
    return LOGO.replace('<svg ', f'<svg fill="{kleur}" ', 1)


def patroon_svg(kleur, achter=None):
    s = re.sub(r'fill="#[0-9A-Fa-f]{6}"', f'fill="{kleur}"', PATROON)
    if achter:
        s = re.sub(r'(<svg[^>]*>)', rf'\1<rect width="526" height="526" fill="{achter}"/>', s, count=1)
    return s


def ase(kleuren):
    """Adobe Swatch Exchange met globale CMYK-stalen (Affinity: Stalen > Palet importeren)."""
    blokken = b''
    for naam, (cmyk, _hex) in kleuren.items():
        n = (naam + '\0').encode('utf-16-be')
        data = struct.pack('>H', len(n) // 2) + n + b'CMYK' + struct.pack('>4f', *[v / 100 for v in cmyk]) + struct.pack('>H', 0)
        blokken += struct.pack('>HI', 1, len(data)) + data
    return b'ASEF' + struct.pack('>HHI', 1, 0, len(kleuren)) + blokken


def data_uri(svg):
    return 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode()).decode()


FONTS = ''.join(
    f"@font-face{{font-family:'{fam}';font-weight:{w};src:url('{(ROOT / 'assets/fonts' / f).as_uri()}') format('woff2')}}"
    for fam, w, f in [('Hipstelvetica', 400, 'hipstelvetica.woff2'), ('Roboto Slab', 700, 'roboto-slab-latin-700-normal.woff2'), ('Roboto Slab', 800, 'roboto-slab-latin-800-normal.woff2'),
                      ('Poppins', 600, 'poppins-latin-600-normal.woff2'), ('Poppins', 500, 'poppins-latin-500-normal.woff2')])


def sjabloon(b, h, leeg=False):
    """Zelfde opbouw als de Facebook-banner van 2026: patroonrand, vlak in het midden, titel."""
    k = min(b, h)
    tegel = round(k / 3)
    titel = f'''
      <p class="boven">vzw Chiro Popov presenteert</p>
      <p class="titel"><span>Bos</span> <span class="jaar">{JAAR}</span><br><span>Feesten</span></p>
      <p class="editie">{EDITIE}ste editie</p>
      <p class="datum">{DATUM}</p>
      <p class="adres">{ADRES}</p>'''
    logo = f'<img class="logo" src="{data_uri(logo_svg(C))}" alt="">'
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}
      *{{margin:0;box-sizing:border-box}}
      body{{width:{b}px;height:{h}px;background:{I} url("{data_uri(patroon_svg(G))}") 0 0/{tegel}px;display:grid;place-items:center;overflow:hidden}}
      .vlak{{width:calc(100% - {k * .16}px);height:calc(100% - {k * .16}px);background:{I};border-radius:{k * .04}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:{k * .022}px;text-align:center;color:{C};padding:{k * .05}px}}
      .boven,.adres{{font:600 {k * .026}px/1.2 Poppins;text-transform:uppercase;letter-spacing:.14em}}
      .titel{{font:400 {k * .15}px/.92 Hipstelvetica;text-transform:uppercase;color:{C};-webkit-text-stroke:{k * .012}px {G};paint-order:stroke fill;margin:{k * .01}px 0}}
      .jaar{{color:{M};-webkit-text-stroke-color:{C}}}
      .editie{{font:800 {k * .03}px/1 'Roboto Slab';text-transform:uppercase;letter-spacing:.04em;background:{M};color:{I};padding:{k * .012}px {k * .022}px}}
      .datum{{font:700 {k * .052}px/1.1 'Roboto Slab'}}
      .logo{{width:{k * .2}px;height:auto}}
      .vlak.leeg{{justify-content:flex-end}}
    </style></head><body><div class="vlak{' leeg' if leeg else ''}">{logo if leeg else titel}</div></body></html>'''


def profiel(z):
    return f'''<!doctype html><html><body style="margin:0;width:{z}px;height:{z}px;background:{I};display:grid;place-items:center">
      <img src="{data_uri(logo_svg(C))}" style="width:{z * .72}px"></body></html>'''


def bon_svg(soort):
    vlak, letter = (M, I) if soort == 'licht' else (I, M)
    label = 'Lichte drank' if soort == 'licht' else 'Zware drank'
    return f'''<!doctype html><html><head><style>{FONTS}body{{margin:0}}
      .l{{font:700 74px 'Roboto Slab';text-transform:uppercase;letter-spacing:3px;stroke-width:10px;paint-order:stroke fill;stroke-linejoin:round}}
      .t{{font:400 300px Hipstelvetica;text-transform:uppercase;stroke-width:18px;paint-order:stroke fill;stroke-linejoin:round}}</style></head><body>
      <svg width="1618" height="1000" viewBox="0 0 1618 1000"><rect width="1618" height="1000" fill="{vlak}"/>
      <g class="l" fill="{C}" stroke="{letter}"><text x="110" y="170">{label}</text><text x="1508" y="900" text-anchor="end">{label}</text></g>
      <g class="t"><text x="110" y="560" textLength="1398" lengthAdjust="spacingAndGlyphs"><tspan fill="{letter}" stroke="{C}">Bos</tspan><tspan fill="{C}" stroke="{letter}"> {JAAR}</tspan></text>
      <text x="110" y="790" textLength="1398" lengthAdjust="spacingAndGlyphs" fill="{letter}" stroke="{C}">Feesten</text></g></svg></body></html>'''


def main():
    from playwright.sync_api import sync_playwright
    for d in ('logo', 'kleuren', 'patroon', 'drukwerk', 'bonnen', 'sociaal'):
        (KIT / d).mkdir(parents=True, exist_ok=True)
    lijst = []

    def schrijf(pad, data):
        p = KIT / pad
        p.write_bytes(data) if isinstance(data, bytes) else p.write_text(data)
        lijst.append(pad)

    logos = {'creme': C, 'indigo': I, 'groen': G, 'zwart': '#000000', 'wit': '#FFFFFF'}
    for n, kl in logos.items():
        schrijf(f'logo/bosfeesten-logo-{n}.svg', logo_svg(kl))
    schrijf('kleuren/bosfeesten-2027.ase', ase(KLEUREN))
    schrijf('kleuren/bosfeesten-2027-kleuren.txt', '\n'.join(
        f'{n:<10} CMYK {c[0]} {c[1]} {c[2]} {c[3]}   hex {h}' for n, (c, h) in KLEUREN.items()) + '\n')
    schrijf('patroon/bosfeesten-patroon-indigo.svg', patroon_svg(G, I))
    schrijf('patroon/bosfeesten-patroon-transparant.svg', patroon_svg(G))
    for naam in ('affiche', 'flyer', 'prijslijst', 'bonnetjes'):
        im = kleur_in(naam, PALET).convert('RGB')
        im.save(KIT / f'drukwerk/{naam}.jpg', quality=88, optimize=True, progressive=True)
        lijst.append(f'drukwerk/{naam}.jpg')

    with sync_playwright() as pw:
        br = pw.chromium.launch()

        def shot(html, b, h, pad, transparant=False):
            p = br.new_page(viewport={'width': b, 'height': h})
            tmp = ROOT / '.kit-tmp.html'  # via een bestand, zodat file://-lettertypes laden
            tmp.write_text(html)
            p.goto(tmp.as_uri())
            p.evaluate('document.fonts.ready')
            p.wait_for_timeout(150)
            p.screenshot(path=str(KIT / pad), omit_background=transparant)
            p.close()
            lijst.append(pad)

        for n, kl in logos.items():
            shot(f'<body style="margin:0"><img src="{data_uri(logo_svg(kl))}" width="2048" height="2048"></body>', 2048, 2048,
                 f'logo/bosfeesten-logo-{n}.png', True)
        shot(f'<body style="margin:0;background:{I} url({data_uri(patroon_svg(G))}) 0 0/1024px"></body>', 2048, 2048,
             'patroon/bosfeesten-patroon-indigo.png')
        for s in ('licht', 'zwaar'):
            shot(bon_svg(s), 1618, 1000, f'bonnen/drankbon-{s}.png')
        for naam, b, h, leeg in [('instagram-post-staand', 1080, 1350, False), ('instagram-post-vierkant', 1080, 1080, False),
                                 ('instagram-story', 1080, 1920, False), ('facebook-evenement', 1920, 1005, False),
                                 ('instagram-post-leeg', 1080, 1350, True), ('instagram-story-leeg', 1080, 1920, True)]:
            shot(sjabloon(b, h, leeg), b, h, f'sociaal/{naam}.png')
        shot(profiel(1080), 1080, 1080, 'sociaal/profielfoto.png')
        br.close()
        (ROOT / '.kit-tmp.html').unlink(missing_ok=True)

    # Kleine webp-versies om op de site te tonen; de downloads blijven op volle grootte.
    from PIL import Image
    (KIT / 'voorbeeld').mkdir(exist_ok=True)
    for pad in lijst:
        if pad.split('/')[0] in ('drukwerk', 'bonnen', 'sociaal'):
            im = Image.open(KIT / pad).convert('RGB')
            im.thumbnail((900, 1200))
            im.save(KIT / 'voorbeeld' / (Path(pad).stem + '.webp'), quality=82)
            if pad == 'drukwerk/affiche.jpg':  # kleiner beeld voor bovenaan de pagina
                held = Image.open(KIT / pad).convert('RGB'); held.thumbnail((600, 848))
                held.save(KIT / 'voorbeeld' / 'affiche-held.webp', quality=80)

    with zipfile.ZipFile(KIT / 'bosfeesten-2027-mediakit.zip', 'w', zipfile.ZIP_DEFLATED) as z:
        for pad in lijst:
            z.write(KIT / pad, f'Bosfeesten {JAAR}/{pad}')
        z.writestr(f'Bosfeesten {JAAR}/lettertypes.txt',
                   'Hipstelvetica (titels): gratis via https://www.graphicpear.com/hipstelvetica-font/\n'
                   'Roboto Slab (datums, prijzen) en Poppins (tekst): gratis via Google Fonts\n')
    grootte = {p: (KIT / p).stat().st_size for p in lijst + ['bosfeesten-2027-mediakit.zip']}
    (KIT / 'kit.json').write_text(json.dumps(grootte, indent=1))
    print(len(lijst), 'bestanden, zip', round(grootte['bosfeesten-2027-mediakit.zip'] / 1e6, 1), 'MB')


if __name__ == '__main__':
    main()
