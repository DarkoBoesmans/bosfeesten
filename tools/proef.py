"""Kleurt een kunstwerk in met een palet (zelfde rekenwijze als js/herkleur.js). Voor snelle proefjes."""
import sys, numpy as np
from PIL import Image
sys.path.insert(0, 'tools')
from kleur import cmyk_naar_hex, rgb


def kleur_in(naam, palet):
    m1 = np.asarray(Image.open(f'assets/kunst/{naam}.m1.webp').convert('RGB'), np.float32) / 255
    m2 = np.asarray(Image.open(f'assets/kunst/{naam}.m2.webp').convert('RGB'), np.float32) / 255
    v = np.asarray(Image.open(f'assets/kunst/{naam}.v.jpg').convert('RGB'), np.float32)
    uit = m2[:, :, 2:3] * v
    for i, r in enumerate('PSL'):
        uit += m1[:, :, i:i + 1] * np.array(rgb(palet[r]), np.float32)
    for i, r in enumerate('AB'):
        uit += m2[:, :, i:i + 1] * np.array(rgb(palet[r]), np.float32)
    return Image.fromarray(uit.round().clip(0, 255).astype(np.uint8))


def vel(naam, paletten, hoogte=900, per_rij=4):
    ims = []
    for p in paletten:
        im = kleur_in(naam, p)
        ims.append(im.resize((round(im.width * hoogte / im.height), hoogte), Image.LANCZOS))
    rijen = [ims[i:i + per_rij] for i in range(0, len(ims), per_rij)]
    b = max(sum(i.width + 12 for i in r) for r in rijen)
    sheet = Image.new('RGB', (b, len(rijen) * (hoogte + 12)), '#777')
    for y, r in enumerate(rijen):
        x = 0
        for im in r:
            sheet.paste(im, (x, y * (hoogte + 12)))
            x += im.width + 12
    return sheet
