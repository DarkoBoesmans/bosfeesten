# Bosfeesten media kit

Huisstijl en media kit van de Bosfeesten (Chiro Popov, Gijzegem): kleuren, logo, letters, patroon,
drukwerk, drankbonnen, sjablonen en een postmaker voor sociale media, alle regels met bronnen, en alle downloads.
Live: https://darkoboesmans.github.io/bosfeesten/

## Stack

- TypeScript in `src/ts`, gebouwd met bun. De pagina wordt bij het bouwen als vaste HTML gemaakt (`src/ts/pagina.ts`), zodat ze ook zonder JavaScript werkt.
- CSS in ITCSS-lagen (`src/css/settings` tot `utilities`), klassen in BEM.
- Geen framework: elke sectie in `src/ts/secties` is een functie die HTML-tekst teruggeeft.

## Mappen

| Map | Wat |
| --- | --- |
| `src/ts/data` | kleuren (CMYK eerst), feestgegevens en editie, lijst van downloads |
| `src/ts/secties` | één bestand per sectie van de pagina |
| `src/ts/components` | wegwijzer-navigatie, woordmerk, downloadknop, lightbox |
| `src/ts/gedrag` | wat beweegt: binnenschuiven, navigatie, logo-proef, postmaker |
| `src/ts/data/regels.ts` | alle regels voor drukwerk, flyers, pijlen en alcohol, elk met bron |
| `assets/kit` | alle downloads, gemaakt met `tools/kit.py` |
| `tools` | Python-scripts: kleurlagen uit drukwerk.af (`lagen.py`) en de media kit (`kit.py`) |

## Werken

```sh
bun install
bun run build          # bouwt dist/
bun run check          # typecontrole
python3 tools/kit.py   # maakt assets/kit opnieuw (na een kleur- of datumwijziging)
```

Elke push naar `main` bouwt en publiceert de site via GitHub Actions (Settings, Pages, Source: GitHub Actions).
Het jaartal en de editie (2023 was de 60ste) rekenen zichzelf uit; na het tweede weekend van augustus schuift alles een jaar op.
