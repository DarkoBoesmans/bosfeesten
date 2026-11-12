# Bosfeesten kleurkeuze

Drie kleurvoorstellen voor de huisstijl van Bosfeesten (Chiro Popov), getoond op de echte affiche, drankbonnen en website.
Live: https://darkoboesmans.github.io/bosfeesten/

## Stack

- TypeScript in `src/ts`, gebouwd met bun
- CSS in ITCSS-lagen (`src/css/settings` tot `utilities`), klassen in BEM
- Geen framework: elke view is een functie die HTML-tekst teruggeeft

## Mappen

| Map | Wat |
| --- | --- |
| `src/ts/data` | kleuren (CMYK eerst), combo's, drukwerk |
| `src/ts/views` | overzicht en huisstijl per combo (`#a`, `#b`, `#c`) |
| `src/ts/components` | drankbon, websitevoorbeeld, lightbox, teller, ... |
| `src/ts/render` | herkleuren van het drukwerk op een canvas |
| `assets/kunst` | kleurlagen uit drukwerk.af, gemaakt met `tools/lagen.py` |
| `tools` | Python-scripts om lagen en kleuren te maken |

## Werken

```sh
bun install
bun run build   # bouwt dist/
bun run check   # typecontrole
```

Kleur aanpassen: wijzig de CMYK in `src/ts/data/kleuren.ts` en reken de hex opnieuw uit met `tools/kleur.py`.
