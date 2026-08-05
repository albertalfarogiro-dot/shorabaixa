# S’Horabaixa

**No venem un lloc. Venem una hora.**

Web de la marca de roba d’estiu mediterrània S’Horabaixa. Col·lecció Costa Brava · S1,
de Sant Feliu a Begur.

> Hi ha una hora, cada dia, en què el Mediterrani es torna un altre lloc. Dura entre
> setanta i noranta minuts i no torna.

---

## Què és això

Una maqueta funcional, en català, sense dependències, sense muntador i sense cap
biblioteca externa: HTML, un full d’estil i tres fitxers de JavaScript.

| Pàgina | Què hi ha |
|---|---|
| `index.html` | La portada, el relat en set capítols i les dues meitats del dia |
| `manifest.html` | Les nou línies que no es reescriuen |
| `territori.html` | De Sant Feliu a Begur: els vuit llocs de la S1 |
| `cataleg.html` | El Fons, la Carta i les peces |
| `pacte.html` | Què t’enduus, sis promeses i el certificat que envelleix |
| `vivim.html` | Nou moments d’aquesta costa, del matí a la taula |
| `marca.html` | Els codis: símbol, color, veu i govern |
| `lhora.html` | L’arxiu, ordenat pel sol i no per la data |

## El que fa que no sigui una web qualsevol

- **La posta es calcula, no s’escriu.** Amb l’algorisme del NOAA per a Palafrugell
  (41,917 N · 3,163 E). Cada segell d’hora diu quants minuts li falten al sol.
- **La pàgina sap quina hora és.** El carregador, el rellotge i fins i tot el color de
  la barra d’estat del telèfon prenen la llum d’aquest minut.
- **Els noms de les franges són els del català**: matinada, albada, entre dos llums,
  migdia, s’horabaixa —capvespre, a l’Empordà—, el minut zero, l’hora blava, plena nit.
- **El color es tria pel minut, no per la pastilla.** A la fitxa de producte, el selector
  és una línia d’horitzó de −60 a +40 minuts respecte de la posta.
- **Al telèfon, la primera pantalla és l’hora**, i el catàleg s’ordena com un dia.
- **La tinta es calcula per contrast**, no es tria: cada fons resol la seva.

## Com es fa anar

No cal muntar res. Qualsevol servidor estàtic:

```bash
python3 -m http.server 8000
# i obrir http://localhost:8000
```

## Avís

**La tipografia depèn de Gill Sans i Bodoni del sistema.** En un visitant amb Windows o
Android encara no hi són i la composició cau a Arial i Georgia. Auto-allotjar les
webfonts és pendent i és previ a considerar això publicat de debò.

Les imatges de producte són projeccions: encara no hi ha peça física. Les del territori,
del relat i de l’arxiu són fotografies pròpies, amb el seu lloc i el seu minut.

---

© S’Horabaixa. Maqueta 2026.
