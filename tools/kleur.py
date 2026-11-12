"""Kleurhulpjes: CMYK (SWOP) -> hex, OKLCH-tint, contrast."""
import math
from PIL import Image, ImageCms

# Vervanger voor "U.S. Web Coated (SWOP) v2" (CGATS TR 001, CC0, uit compact-icc-profiles).
_SWOP = ImageCms.buildTransform('tools/swop-compatibel.icc', ImageCms.createProfile('sRGB'), 'CMYK', 'RGB', renderingIntent=1)


def cmyk_naar_hex(c, m, y, k):
    px = Image.new('CMYK', (1, 1), tuple(round(v * 2.55) for v in (c, m, y, k)))
    return '#%02X%02X%02X' % _SWOP.apply(px).getpixel((0, 0))


def rgb(hex_):
    return tuple(int(hex_[i:i + 2], 16) for i in (1, 3, 5))


def _lin(c):
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def oklch(hex_):
    r, g, b = (_lin(v) for v in rgb(hex_))
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
    a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
    b2 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    return L, math.hypot(a, b2), math.degrees(math.atan2(b2, a)) % 360


def contrast(a, b):
    lum = lambda h: sum(w * _lin(v) for w, v in zip((0.2126, 0.7152, 0.0722), rgb(h)))
    x, y = sorted((lum(a), lum(b)), reverse=True)
    return (x + 0.05) / (y + 0.05)


def tintverschil(a, b):
    d = abs(oklch(a)[2] - oklch(b)[2]) % 360
    return min(d, 360 - d)
