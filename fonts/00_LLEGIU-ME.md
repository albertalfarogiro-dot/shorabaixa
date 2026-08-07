# Les fonts del web

Les dues famílies estan **auto-allotjades** i totes dues són
**SIL Open Font License 1.1**. Cap de les dues no té drets ni caducitat.

| | Família | Autor | Llicència | Eixos |
|---|---|---|---|---|
| Sans | **Jost\*** | Owen Earl · indestructible type | OFL 1.1 | `wght` 100–900 |
| Serif | **Bodoni Moda** | Owen Earl · indestructible type | OFL 1.1 | `wght` 400–900 · **`opsz` 6–96** |

## Per què hi són

Abans el sistema tipogràfic eren dues llistes de fonts **del sistema**: Gill Sans
(Monotype) i Bodoni MT / Didot (Monotype i Apple). El visitant de Windows sense
Office veia Segoe UI i el d'Android, Roboto i Noto Serif. **La marca es desmuntava
sola a la meitat dels dispositius**, que és incompatible amb una marca la tesi de
la qual és que tot es pot comprovar.

La llicència també bloquejava tres coses més: la marca figurativa **M2** de l'OEPM,
l'enviament del fitxer a proveïdors d'etiquetes i brodats, i els generadors
d'Instagram de `_PRODUCCIO`, que componen amb fonts del sistema.

## La OFL obliga a una cosa

Qui redistribueix els fitxers —i el web els redistribueix— **ha d'incloure-hi
l'avís de drets i la llicència**. Per això `OFL-jost.txt` i `OFL-bodonimoda.txt`
viuen en aquesta carpeta i **no s'han d'esborrar**.

La OFL **sí que permet fer-ne logotips** i convertir-los a corbes, sense reserva
de nom ni obligació de mantenir la llicència sobre el dibuix resultant. És el que
desbloqueja la M2.

## Els fitxers

Vuit `.woff2`, subconjunts `latin` i `latin-ext`, romana i cursiva. El navegador
**no baixa mai un subconjunt que no necessita**: en català només cau el `latin`,
que ja porta tots els diacrítics i el punt volat `·` (U+00B7), l'únic que fa
servir el web —458 vegades.

**Compte amb un caràcter:** el símbol de prima `′` (U+2032) **no existeix a cap de
les dues famílies**, ni tan sols a la versió completa. `lhora.html` el feia servir
als números grans i queia a la font del sistema; s'ha canviat per `’`, que sí que
hi és. Tampoc no hi ha `″`, `≤`, `Δ` ni `₀` — cap dels quals no surt al web, però
sí als documents i a les peces d'Instagram: **teniu-ho en compte quan es canviïn
els generadors de `_PRODUCCIO`.**

## Com es tornen a baixar

Fonts completes variables (per a Instagram, documents i vectorials):
`github.com/google/fonts/tree/main/ofl/jost` i `.../ofl/bodonimoda`.
