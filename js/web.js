/* ═══════════════════════════════════════════════════════════════════════
   S'HORABAIXA · comportament

   Regles del manual que aquí es respecten:
   · cap revelat en fer scroll — el contingut hi és des del primer moment
   · cap carrusel automàtic — el lector mana
   · el moviment només serveix per explicar el pas del temps, mai per decorar
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
'use strict';
var $ = function (s, c) { return (c || document).querySelector(s); };
var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
var el = function (t, cl, h) { var n = document.createElement(t); if (cl) n.className = cl;
  if (h != null) n.innerHTML = h; return n; };


/* ── IMATGES · el navegador tria l'amplada, no nosaltres ──────────────────
   Cada <img data-im="CLAU" data-mida="800"> es converteix en un <picture>
   amb AVIF, WebP i JPEG de reserva, i amb totes les amplades disponibles.
   Així una targeta de 300 px baixa 18 KB en comptes d'1 MB.                */
function ampladesDe(clau) {
  /* VARIANTS ve de js/variants.js, que s'escriu al generar les imatges.
     Si per què sigui hi falta una clau, es torna només l'amplada que sabem
     segur que existeix: val més una imatge petita que cap imatge. */
  return (typeof VARIANTS !== 'undefined' && VARIANTS[clau]) ? VARIANTS[clau] : [480];
}
function fesPicture(el) {
  var clau = el.getAttribute('data-im');
  var mida = parseInt(el.getAttribute('data-mida') || '900', 10);
  var alt = el.getAttribute('alt') || '';
  var amples = ampladesDe(clau);
  function set(ext) {
    return amples.map(function (a) { return 'img/' + clau + '-' + a + '.' + ext + ' ' + a + 'w'; }).join(', ');
  }
  var p = document.createElement('picture');
  ['avif', 'webp'].forEach(function (ext) {
    var s = document.createElement('source');
    s.type = 'image/' + ext;
    s.srcset = set(ext);
    s.sizes = mida + 'px';
    p.appendChild(s);
  });
  var im = document.createElement('img');
  im.src = 'img/' + clau + '.jpg';
  im.alt = alt;
  im.loading = el.getAttribute('data-eager') ? 'eager' : 'lazy';
  im.decoding = 'async';
  p.appendChild(im);
  el.parentNode.replaceChild(p, el);
}
function pintaImatges(arrel) {
  [].slice.call((arrel || document).querySelectorAll('img[data-im]')).forEach(fesPicture);
}

/* ── LA POSTA REAL · Palafrugell, 41,917 N 3,163 E ────────────────────── */
var LAT = 41.9174, LON = 3.1628;

/* ── L'HORA DE LA COSTA BRAVA ─────────────────────────────────────────────
   Aquesta pàgina no diu quina hora és al visitant: diu quina hora és A LA
   COSTA BRAVA. És el que promet la marca —«venem una hora», aquella— i és
   l'única lectura que no menteix a ningú.

   Abans es barrejaven dues coses: el rellotge sortia de `getHours()`, o sigui
   del rellotge del visitant, i el sol es calculava sempre per a Palafrugell.
   Un visitant a Londres llegia «21:34 · l'hora blava» quan a la costa eren les
   22:34 i l'hora blava havia passat feia una hora; un de Nova York llegia
   «la tarda» amb la costa a plena nit. Ni el seu sol ni la nostra hora.

   El desplaçament horari es demana a l'Intl, que porta la base de dades de
   fusos del navegador. Abans es deduïa del dia de l'any amb
   `(n > 85 && n < 302) ? 2 : 1`, i això fallava cinc dies l'any: el 2026, del
   26 al 27 de març i del 25 al 27 d'octubre la pàgina donava sortida i posta
   amb UNA HORA DE MÉS. En una marca que va néixer de corregir hores falses,
   això no es podia quedar.                                                  */
var FUS = 'Europe/Madrid';
var _fmtCosta = null;
try {
  _fmtCosta = new Intl.DateTimeFormat('en-GB', { timeZone: FUS, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  _fmtCosta.formatToParts(new Date());
} catch (e) { _fmtCosta = null; }

function alaCosta(d) {
  /* Torna la data de calendari i el minut del dia A LA COSTA, i el
     desplaçament real d'aquell instant respecte de l'UTC (+1 o +2). */
  if (!_fmtCosta) {                    /* xarxa de seguretat: el rellotge d'aquí */
    return { any: d.getFullYear(), mes: d.getMonth() + 1, dia: d.getDate(),
             m: d.getHours() * 60 + d.getMinutes(), tz: -d.getTimezoneOffset() / 60 };
  }
  var p = {}, parts = _fmtCosta.formatToParts(d), i;
  for (i = 0; i < parts.length; i++) p[parts[i].type] = parts[i].value;
  var any = +p.year, mes = +p.month, dia = +p.day, hh = +p.hour, mm = +p.minute;
  var minut = Math.floor(d.getTime() / 6e4) * 6e4;
  return { any: any, mes: mes, dia: dia, m: hh * 60 + mm,
           tz: (Date.UTC(any, mes - 1, dia, hh, mm) - minut) / 36e5 };
}

function solDe(d) {
  /* NOAA. Torna la sortida i la posta del dia, en minuts des de mitjanit,
     en hora de la Costa Brava. */
  var c = alaCosta(d);
  var jd = (Date.UTC(c.any, c.mes - 1, c.dia) / 864e5) + 2440587.5;
  var t = (jd - 2451545) / 36525;
  var L0 = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360;
  var M = 357.52911 + t * (35999.05029 - 0.0001537 * t), Mr = M * Math.PI / 180;
  var C = Math.sin(Mr) * (1.914602 - t * (0.004817 + 0.000014 * t))
        + Math.sin(2 * Mr) * (0.019993 - 0.000101 * t) + Math.sin(3 * Mr) * 0.000289;
  var lam = (L0 + C - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * t) * Math.PI / 180)) * Math.PI / 180;
  var e = 23.439291 - t * 0.0130042;
  var er = (e + 0.00256 * Math.cos((125.04 - 1934.136 * t) * Math.PI / 180)) * Math.PI / 180;
  var decl = Math.asin(Math.sin(er) * Math.sin(lam));
  var y = Math.pow(Math.tan(er / 2), 2), L0r = L0 * Math.PI / 180;
  var eo = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  var eqt = 4 * (180 / Math.PI) * (y * Math.sin(2 * L0r) - 2 * eo * Math.sin(Mr)
          + 4 * eo * y * Math.sin(Mr) * Math.cos(2 * L0r)
          - 0.5 * y * y * Math.sin(4 * L0r) - 1.25 * eo * eo * Math.sin(2 * Mr));
  var latr = LAT * Math.PI / 180;
  var cosH = Math.cos(90.833 * Math.PI / 180) / (Math.cos(latr) * Math.cos(decl))
           - Math.tan(latr) * Math.tan(decl);
  cosH = Math.max(-1, Math.min(1, cosH));
  var H = Math.acos(cosH) * 180 / Math.PI;
  var migdia = 720 + 4 * (-LON) - eqt + c.tz * 60;         /* migdia solar */
  return { sortida: migdia - 4 * H, posta: migdia + 4 * H };
}

function hhmm(m) { m = Math.round(m); return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); }

/* La fase es decideix mirant els dos extrems del dia, no només la posta.
   `dt` són els minuts respecte de la posta i `ds` els minuts respecte de la
   sortida: negatius abans, positius després. */
/* Els noms de les franges són els del català, no els del màrqueting: matinada,
   albada, trenc d'alba, matí, migdia, tarda, horabaixa, entre dos llums, vespre
   i nit. Dos que val la pena no perdre:

     · «entre dos llums» és el crepuscle dit com es diu aquí, i serveix per als
       dos extrems del dia perquè literalment vol dir això —entre dues llums.
     · «s'horabaixa» és la franja que dona nom a la marca. El rellotge de la
       portada és el millor lloc per ensenyar-ho en comptes d'explicar-ho, i
       per això aquella franja porta també la variant empordanesa.

   `migdia` no es pot decidir amb el rellotge: es decideix amb el sol, que és el
   punt mig entre la sortida i la posta. Al juny això cau cap a dos quarts de
   dues, no a les dotze. */
function fase(ds, dt, m, sortida, posta) {
  var migdia = (sortida + posta) / 2;

  if (ds < -100) return { k: 'nit',     n: 'la matinada' };
  if (ds <  -38) return { k: 'alba',    n: 'l’albada' };
  if (ds <   -6) return { k: 'alba',    n: 'entre dos llums',  v: 'el trenc d’alba' };
  if (ds <   45) return { k: 'sortida', n: 'sortida de sol' };

  if (dt < -100 && m < migdia - 60) return { k: 'dia',   n: 'el matí' };
  if (dt < -100 && m < migdia + 60) return { k: 'dia',   n: 'migdia' };
  if (dt < -150) return { k: 'tarda',    n: 'la tarda' };
  if (dt < -100) return { k: 'tarda',    n: 'la tarda que cau' };
  if (dt <  -28) return { k: 'or',       n: 'l’hora d’or' };
  if (dt <   -3) return { k: 'horabaixa',n: 's’horabaixa',     v: 'capvespre, a l’Empordà' };
  if (dt <    9) return { k: 'magica',   n: 'el minut zero' };
  if (dt <   30) return { k: 'blava',    n: 'entre dos llums' };
  if (dt <   62) return { k: 'blava',    n: 'l’hora blava' };
  if (dt <  135) return { k: 'vespre',   n: 'el vespre' };
  return               { k: 'nit',      n: 'plena nit' };
}

function ara() {
  var d = new Date();
  var s = solDe(d);
  /* el minut és el de la costa, no el del visitant: si no, el rellotge i el
     sol serien de dos llocs diferents i la fase sortiria falsa */
  var m = alaCosta(d).m;
  /* de matinada la referència vàlida és la sortida d'avui; passada la posta,
     la sortida de demà. Així mai no es compten mil dues-centes minuts. */
  var seguent = s.sortida;
  if (m > s.posta + 55) {
    var dema = new Date(d.getTime() + 864e5);
    seguent = solDe(dema).sortida + 1440;
  }
  var ds = m - s.sortida, dt = m - s.posta;
  return { d: d, m: m, sortida: s.sortida, posta: s.posta, seguent: seguent,
           ds: ds, dt: dt, f: fase(ds, dt, m, s.sortida, s.posta) };
}

/* ── EL COLOR DE L’HORA · continu ─────────────────────────────────────────
   Vuit ancoratges sobre l’eix dels minuts respecte de la posta. Entre dos
   ancoratges s’interpola en RGB lineal (no en sRGB directe: barrejar en sRGB
   enfosqueix el pas i hi apareixen grisos bruts pel mig).
   ─────────────────────────────────────────────────────────────────────── */
var ANCORES = [
  [-600, [245, 241, 233]],   /* migdia · Sal */
  [-240, [244, 238, 226]],   /* primera tarda */
  [-120, [242, 231, 206]],   /* la tarda que cau */
  [ -55, [242, 223, 192]],   /* hora d’or · Llum d’or */
  [ -18, [232, 187, 160]],   /* l’or que es refreda */
  [   4, [226, 160, 139]],   /* hora màgica · Rosa horabaixa */
  [  22, [156, 126, 146]],   /* el rosa refredat · Malva */
  [  42, [ 60,  90, 120]],   /* hora blava */
  [  70, [ 34,  56,  78]],   /* Blau vespre */
  [ 150, [ 27,  42,  56]]    /* Tinta · nit tancada */
];

function aLineal(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function aSrgb(c) { c = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(c * 255))); }

/* De matinada el color no es pot mesurar amb els minuts que falten a la
   posta: se n'ha de mesurar amb els que falten a la sortida. Aquesta funció
   tria l'eix correcte i, per tant, a les dotze de la nit la pàgina és fosca. */
function colorDelMoment(a) {
  if (a.ds < 80) {                      /* de la nit tancada fins ben sortit el sol */
    var t = Math.max(0, Math.min(1, (a.ds + 70) / 150));
    t = t * t * (3 - 2 * t);
    var nit = [27, 42, 56], dia = [245, 241, 233];
    var mig = [226, 160, 139];          /* l'alba passa pel mateix rosa que la posta */
    var c1 = t < 0.55 ? nit : mig, c2 = t < 0.55 ? mig : dia;
    var u = t < 0.55 ? t / 0.55 : (t - 0.55) / 0.45;
    return [0, 1, 2].map(function (k) {
      return aSrgb(aLineal(c1[k]) * (1 - u) + aLineal(c2[k]) * u);
    });
  }
  return colorDeLHora(a.dt);
}

function colorDeLHora(dt) {
  var i = 0;
  while (i < ANCORES.length - 2 && dt > ANCORES[i + 1][0]) i++;
  var a = ANCORES[i], b = ANCORES[i + 1];
  var t = Math.max(0, Math.min(1, (dt - a[0]) / (b[0] - a[0])));
  t = t * t * (3 - 2 * t);                       /* suavitzat: cap salt a les vores */
  return [0, 1, 2].map(function (k) {
    return aSrgb(aLineal(a[1][k]) * (1 - t) + aLineal(b[1][k]) * t);
  });
}

function lumRel(rgb) {
  var l = rgb.map(aLineal);
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
}
/* la tinta no es tria a ull: es calcula quin dels dos negres de la marca
   dona més contrast sobre aquest fons, i es comprova que passi 4,5:1 */
function tintaSobre(rgb) {
  var L = lumRel(rgb);
  var clar = (1.05) / (L + 0.05), fosc = (L + 0.05) / (lumRel([27, 42, 56]) + 0.05);
  return fosc >= clar ? { c: '#1B2A38', r: fosc, fosca: true }
                      : { c: '#F5F1E9', r: clar, fosca: false };
}
function hex(rgb) { return '#' + rgb.map(function (v) {
  return ('0' + v.toString(16)).slice(-2); }).join('').toUpperCase(); }

/* ── CÀRREGA · el fons pren el color de l’hora en què entres ──────────── */
(function loader() {
  var L = $('#loader'); if (!L) return;
  var a = ara();
  var fons = colorDelMoment(a);
  var t = tintaSobre(fons);
  L.style.background = hex(fons);
  $$('.ld-sol,.ld-lin', L).forEach(function (n) { n.style.background = t.c; });
  $('.ld-nom', L).style.color = t.c;

  /* EL SOL SEMPRE ES PON. Això no és decoració: és el logotip, el nom i el
     concepte alhora, i és l'única animació que la marca té de debò.

     Abans això es calculava com «on és el sol de veritat», i el resultat era
     que de les vuit del matí a un quart de vuit del vespre el factor donava
     zero i el disc no es movia gens: tot el dia laborable la portada carregava
     sense animació. Un actiu d'identitat no pot dependre de l'hora a què entri
     el visitant.

     Ara el gest és sempre el mateix i el que canvia és FINS ON arriba:
       · de dia          → baixa 30 px i es queda MIG POST, que és exactament
                           el símbol de la marca
       · cap a la posta  → va baixant
       · de nit          → baixa 66 px i desapareix del tot sota l'horitzó
     El disc fa 60 px d'alt, així que 30 px és la meitat justa. */
  var f = a.ds < 80 ? Math.max(0, Math.min(1, 1 - (a.ds + 70) / 150))
                    : Math.max(0, Math.min(1, (a.dt + 95) / 155));
  var sol = $('.ld-sol', L);
  if (sol) sol.style.setProperty('--baixa', (30 + 36 * f).toFixed(1) + 'px');

  var h = $('#ldHora');
  if (h) {
    h.style.color = t.c;
    h.textContent = frase(a);
  }
  setTimeout(function () { L.classList.add('p1'); }, 90);
  setTimeout(function () { L.classList.add('p2'); }, 620);
  setTimeout(function () { L.classList.add('p3'); }, 1600);
  setTimeout(function () { document.body.classList.add('carregat'); }, 2600);
})();

/* La frase de l'hora. Sempre en relació amb l'extrem del dia més proper,
   i sempre en hores i minuts quan passa de noranta. */
function durada(m) {
  m = Math.round(Math.abs(m));
  if (m < 90) return m + ' minuts';
  var h = Math.floor(m / 60), r = m % 60;
  return h + ' h' + (r ? ' ' + r + ' min' : '');
}
function frase(a) {
  if (a.ds < -5)  return 'el sol surt d’aquí ' + durada(a.ds);
  if (a.ds < 50)  return 'el sol acaba de sortir';
  if (a.dt < -1)  return 'falten ' + durada(a.dt) + ' per a la posta';
  if (a.dt < 1)   return 'el sol toca l’aigua ara mateix';
  if (a.dt < 55)  return 'fa ' + durada(a.dt) + ' que el sol ha marxat';
  return 'el sol torna a sortir d’aquí ' + durada(a.seguent - a.m);
}

/* ── EL SEGELL D’ARA · al costat del de la fotografia ─────────────────────
   Mateixa tipografia, mateixa unitat de mesura i mateixa posició que el segell
   de l'arxiu. La pàgina sap quina hora és sense haver-ho de dir en gran.     */
(function ara_al_hero() {
  var e = $('#heroAra'); if (!e) return;
  /* el nom de la franja surt de fase() i no es torna a decidir aquí: abans
     n'hi havia una segona llista, més pobra, que deia «ple dia» de les nou del
     matí a les set del vespre i es menjava el migdia, la tarda i l'horabaixa */
  function tic() {
    var a = ara();
    e.innerHTML = 'Ara · ' + hhmm(a.m) + ' · <em>' + a.f.n + '</em>' +
      (a.f.v ? ' <span class="ha-var">· ' + a.f.v + '</span>' : '') + '<br>' +
      '<span class="ha-min">' + frase(a) + '</span>';
  }
  tic(); setInterval(tic, 30000);
})();

/* ── EL RELAT · set capítols, composició alternada ───────────────────── */
(function relat() {
  var c = $('#capitols');
  if (!c || typeof RELAT === 'undefined' || typeof CAPITOLS === 'undefined') return;

  /* La tinta de cada capítol es calcula del seu fons, no es tria. Abans això
     volia dir escollir entre Vespre i Sal i després abaixar-los l'opacitat per
     als segells; el resultat era que el segell del capítol IV es quedava a
     4,0:1 i el del V a 3,6:1. Ara es resol cada paper per separat —titular,
     cos, segell, accent— movent només la lluminositat de la paleta fins que
     arriba al contrast que li toca, i es passen a la secció com a variables,
     que és el mateix que fa el full d'estil amb les bandes fixes. */
  function _l(v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
  function _lum(c) {
    return 0.2126 * _l(parseInt(c.substr(1, 2), 16)) +
           0.7152 * _l(parseInt(c.substr(3, 2), 16)) +
           0.0722 * _l(parseInt(c.substr(5, 2), 16));
  }
  function _rat(a, b) {
    var x = _lum(a), y = _lum(b), hi = Math.max(x, y), lo = Math.min(x, y);
    return (hi + 0.05) / (lo + 0.05);
  }
  function _hls(c) {                                  /* hex → [h,l,s] */
    var r = parseInt(c.substr(1, 2), 16) / 255, g = parseInt(c.substr(3, 2), 16) / 255,
        b = parseInt(c.substr(5, 2), 16) / 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0;
    if (mx !== mn) {
      var d = mx - mn;
      s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [h, l, s];
  }
  function _hex(h, l, s) {
    function f(p, q, t) {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    var r, g, b;
    if (!s) { r = g = b = l; }
    else {
      var q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
      r = f(p, q, h + 1 / 3); g = f(p, q, h); b = f(p, q, h - 1 / 3);
    }
    return '#' + [r, g, b].map(function (v) {
      return ('0' + Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16)).slice(-2);
    }).join('').toUpperCase();
  }
  function _resol(base, fons, obj) {
    var p = _hls(base), avall = _lum(fons) > .18;
    var millor = base, millorR = _rat(base, fons);
    for (var i = 0; i <= 400; i++) {
      var l = avall ? (400 - i) / 400 : i / 400;
      var c = _hex(p[0], l, p[2]), q = _rat(c, fons);
      if (q > millorR) { millor = c; millorR = q; }
      if (avall && l <= p[1] && q >= obj) return c;
      if (!avall && l >= p[1] && q >= obj) return c;
    }
    return millor;
  }
  var CLARS = { i1: '#1B2A38', i2: '#3A342D', i3: '#6E6459', i4: '#8A7F71', ia: '#BB4920' };
  var FOSCS = { i1: '#F5F1E9', i2: '#F5F1E9', i3: '#C9BCA4', i4: '#9A8B7A', ia: '#E2A08B' };
  var OBJ = { i1: 7.0, i2: 6.0, i3: 4.8, i4: 4.6, ia: 4.8 };
  function tinta(fons) {
    var b = _lum(fons) > .18 ? CLARS : FOSCS, o = {};
    for (var k in OBJ) o[k] = _resol(b[k], fons, OBJ[k]);
    return o;
  }

  RELAT.forEach(function (r, i) {
    var cf = CAPITOLS[i] || CAPITOLS[CAPITOLS.length - 1];
    var ti = tinta(cf.fons);
    var s = el('section', 'cap ' + cf.ritme);
    s.style.background = cf.fons;
    for (var k in ti) s.style.setProperty('--' + k, ti[k]);
    s.style.color = ti.i2;

    var mitja = r.video
      ? '<video autoplay muted loop playsinline poster="' + r.poster + '"></video>'
      : '<img data-im="' + r.im.replace('img/', '').replace('.jpg', '') +
        '" data-mida="' + (cf.ritme.indexOf('r-e') === 0 ? 1400 :
                           cf.ritme === 'r-c' ? 480 : 900) + '" alt="' +
        r.seg.replace(/"/g, '') + '">';

    var tx = '<div class="cap-tx">' +
      '<span class="cap-num serif">' + r.n + '</span>' +
      '<h3>' + r.t + '</h3><p>' + r.tx + '</p>' +
      '<span class="cap-seg">' + r.seg + '</span></div>';

    if (cf.ritme === 'r-d') {
      s.innerHTML = tx;                                   /* només text */
    } else if (cf.ritme.indexOf('r-e') === 0) {
      s.innerHTML = '<div class="cap-im">' + mitja + '</div><div class="cap-vel"></div>' + tx;
    } else {
      s.innerHTML = '<div class="cap-im">' + mitja + '</div>' + tx;
    }
    /* el segell i el número ja prenen la tinta de la secció: no se'ls hi posa
       opacitat a sobre, que era el que els deixava per sota del llindar */
    c.appendChild(s);
  });
  pintaImatges(c);
})();

/* ── LES TRES LLUMS ──────────────────────────────────────────────────── */
(function llums() {
  var g = $('#llumsGrid');
  if (g && typeof LLUMS !== 'undefined') {
    LLUMS.forEach(function (l) {
      var n = el('article', 'llum-c');
      n.innerHTML =
        '<div class="llum-im"><img src="' + l.im + '" alt="' + l.nom + '" loading="lazy"></div>' +
        '<div class="llum-tons">' + l.tons.map(function (t) {
          return '<i style="background:' + t + '"></i>'; }).join('') + '</div>' +
        '<h3 class="serif">' + l.nom + '</h3>' +
        '<p class="llum-min stamp">' + l.min + '</p>' +
        '<p class="llum-tx">' + l.tx + '</p>' +
        '<p class="llum-seg stamp">' + l.seg + '</p>';
      g.appendChild(n);
    });
  }
  if (!$('#rellotge')) return;
  function tic() {
    var a = ara();
    $('#rellotge').textContent = hhmm(a.m);
    $('#estat').textContent = a.f.n;
    var p = $('#postaAvui');
    if (p) p.innerHTML = 'Avui el sol surt a les <b>' + hhmm(a.sortida) +
      '</b> i entra a l’aigua a les <b>' + hhmm(a.posta) + '</b><br>' +
      '<span class="pa-frase">' + frase(a) + '</span>';

    /* la secció es tenyeix del color d’aquest minut i la tinta es recalcula.
       De dia gairebé no es nota; a partir de les nou la pàgina es fa fosca
       sola, que és exactament el que fa el cel a fora. */
    var s = document.getElementById('llums');
    if (s) {
      var fons = colorDelMoment(a), t = tintaSobre(fons);
      s.style.background = hex(fons);
      s.classList.toggle('nocturn', !t.fosca);
      $('#estat').style.color = t.fosca ? '#C8802F' : '#E2A08B';
      /* LA MERIDIANA · el dia sencer, de mitjanit a mitjanit.
         El dia és un cicle de 24 hores i la barra l'ha de dir sencer: nit
         tancada, l'alba passant pel mateix rosa que la posta, el pla clar del
         migdia amb el sol més vertical, la baixada de la tarda, l'horabaixa i
         la nit un altre cop. Per això es pinta amb colorDelMoment(), que és la
         mateixa funció que dona el color de la pàgina i que ja tria l'eix bo
         —minuts des de la sortida al matí, minuts fins a la posta al vespre—.
         Dues coses que s'havien fet malament abans:
           · el degradat original era decoratiu i repartia els colors de manera
             uniforme, i per això a les quatre de la tarda ja ensenyava coral;
           · el primer arranjament el va lligar a colorDeLHora(dt), que només
             modela el vespre, i a més retallava la barra de sortida a posta:
             la nit i l'alba no hi sortien i el migdia no quedava al centre. */
      var lin = document.querySelector('.meridiana-linia');
      if (lin && !lin.dataset.pintada) {
        var parades = [], N = 96;              /* un punt cada quart d'hora */
        for (var k = 0; k <= N; k++) {
          var minut = k * (1440 / N);
          var c = colorDelMoment({ ds: minut - a.sortida, dt: minut - a.posta });
          parades.push(hex(c) + ' ' + (k / N * 100).toFixed(2) + '%');
        }
        lin.style.background = 'linear-gradient(90deg,' + parades.join(',') + ')';
        lin.dataset.pintada = '1';
      }

      /* la meridiana recorre el dia sencer: de la sortida a la posta i més enllà */
      var g = document.getElementById('meridiana');
      if (g) {
        /* la barra va de mitjanit a mitjanit, o sigui que el marcador és
           simplement el minut del dia sobre 1.440 */
        var f = a.m / 1440;
        /* es reté mig punt a cada punta: l'etiqueta «ara» va centrada damunt
           del marcador i, enganxada a la vora, es talla per la meitat. */
        g.style.left = (Math.max(0.6, Math.min(99.4, f * 100))).toFixed(2) + '%';
      }
    }
  }
  tic(); setInterval(tic, 20000);
})();

/* ── EL TERRITORI ────────────────────────────────────────────────────── */
(function territori() {
  var ll = $('#terrLlista'); if (!ll || typeof LLOCS === 'undefined') return;
  LLOCS.forEach(function (c, i) {
    var li = el('li');
    var b = el('button', (i === 0 ? 'on' : '') + (c.nivell === 'secret' ? ' secret' : ''), c.nom);
    b.onclick = function () {
      $$('button', ll).forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on'); pinta(c);
    };
    li.appendChild(b); ll.appendChild(li);
  });
  function pinta(c) {
    $('#terrImg').src = c.im; $('#terrImg').alt = c.nom + ', ' + c.mun;
    $('#terrNom').textContent = c.nom;
    $('#terrMun').textContent = c.mun;
    $('#terrCoord').textContent = c.coord;
    $('#terrQuan').textContent = c.quan + (c.min && c.min !== '—' ? ' · ' + c.min : '');
    $('#terrTx').textContent = c.tx;
    /* Abans això obria la fitxa de la peça. Mentre el catàleg estigui vetllat
       no hi ha fitxa que obrir, i una fletxa que no porta enlloc és pitjor que
       no tenir-ne: es queda el nom, sense promesa de clic. */
    var a = $('#terrLink');
    a.textContent = c.peca;
    a.removeAttribute('href');
    a.classList.add('terr-inert');
    a.onclick = null;
  }
  pinta(LLOCS[0]);
})();

/* ── ELS CODIS, a la portada ─────────────────────────────────────────── */
(function codis() {
  var u = $('#marcaCodis'); if (!u || typeof CODIS === 'undefined') return;
  CODIS.forEach(function (c) {
    u.appendChild(el('li', '', '<span class="mc-n stamp">' + c.n + '</span>' +
      '<span class="mc-t">' + c.t + '</span>'));
  });
})();

/* ── L’ARXIU de la portada ───────────────────────────────────────────── */
(function arxiu() {
  var g = $('#arxiuGrid'); if (!g) return;
  var A = [['MAGICA', 'Illots de Sant Jordi', '19:35', 'posta exacta'],
           ['BLAVA', 'Un racó de la Costa Brava', '20:49', '+22 min'],
           ['OR_grua', 'Far de Palamós', '20:08', '−13 min'],
           ['OR_port', 'Sant Joan de Palamós', '19:55', '−10 min'],
           ['HERO', 'Cap Roig, Calonge', '19:28', '−6 min'],
           ['OR_moreta', 'Cala Moreta, Begur', '19:36', '−31 min'],
           ['TUN_barques', 'Sa Tuna, Begur', '19:01', '−66 min'],
           ['CAL_carrer', 'Port Bo, Calella', '18:41', '−79 min'],
           ['DIA_xelida', 'Aigua Xelida, Palafrugell', '18:47', '−135 min']];
  A.forEach(function (a) {
    g.appendChild(el('figure', '',
      '<img src="img/' + a[0] + '.jpg" alt="' + a[1] + '" loading="lazy">' +
      '<figcaption>' + a[1] + ' · ' + a[2] + ' <em>' + a[3] + '</em></figcaption>'));
  });
})();

/* ── COM VIVIM (pàgina interior) ─────────────────────────────────────── */
(function vivim() {
  var g = $('#momentsGrid'); if (!g || typeof MOMENTS === 'undefined') return;
  /* quines escenes ocupen les dues columnes ho decideix la mateixa escena
     (m.ample), no la seva posició: les amples són les que expliquen que aquí
     la gent hi és junta, i han de ser les que paren la lectura */
  MOMENTS.forEach(function (m, i) {
    var n = el('article', 'mom' + (m.ample ? ' ample' : ''));
    var mitja = m.video
      ? '<video autoplay muted loop playsinline poster="' + m.poster + '"><source src="' + m.video + '" type="video/mp4"></video>'
      : '<img src="' + m.im + '" alt="' + m.t + '" loading="lazy">';
    n.innerHTML = '<div class="mom-im">' + mitja + '</div>' +
      '<h3 class="serif">' + m.t + '</h3><p>' + m.tx + '</p>' +
      '<p class="mom-seg stamp">' + m.seg + '</p>';
    g.appendChild(n);
  });
})();

/* ── LA MARCA (pàgina interior) ──────────────────────────────────────── */
(function marca() {
  var p = $('#paletaGrid');
  if (p && typeof PALETA !== 'undefined') {
    PALETA.forEach(function (g) {
      var n = el('div', 'pal-g');
      n.innerHTML = '<h4 class="stamp">' + g.g + '</h4><div class="pal-c">' +
        g.c.map(function (c) {
          return '<div class="pal-t"><span style="background:' + c[1] + '"></span>' +
                 '<b>' + c[0] + '</b><i>' + c[1] + '</i></div>'; }).join('') + '</div>';
      p.appendChild(n);
    });
  }
  var c = $('#codisLlista');
  if (c && typeof CODIS !== 'undefined') {
    CODIS.forEach(function (x) {
      c.appendChild(el('article', 'codi', '<span class="codi-n serif">' + x.n + '</span>' +
        '<h3 class="serif">' + x.t + '</h3><p>' + x.tx + '</p>'));
    });
  }
  var f = $('#filtresLlista');
  if (f && typeof FILTRES_MARCA !== 'undefined') {
    FILTRES_MARCA.forEach(function (x, i) {
      f.appendChild(el('li', '', '<span class="fm-n stamp">0' + (i + 1) + '</span>' +
        '<b class="serif">' + x[0] + '</b><span>' + x[1] + '</span>'));
    });
  }
})();


/* ── EL MANIFEST (pàgina interior) ───────────────────────────────────── */
(function manifest() {
  var g = $('#manifestLlista'); if (!g || typeof MANIFEST === 'undefined') return;
  MANIFEST.forEach(function (t, i) {
    g.appendChild(el('li', 'mf',
      '<span class="mf-n stamp">' + ('0' + (i + 1)).slice(-2) + '</span>' +
      '<p class="serif mf-t">' + t + '</p>'));
  });
})();


/* ── EL COLOR · el Fons i la Carta ───────────────────────────────────── */
(function color() {
  var g = $('#fonsGrid');
  if (g && typeof FONS !== 'undefined') {
    FONS.forEach(function (c) {
      g.appendChild(el('article', 'fc',
        '<div class="fc-im"><img src="' + c.im + '" alt="D\u2019on surt el color ' + c.nom + '" loading="lazy">' +
          '<span class="fc-mostra" style="background:' + c.hex + '"></span></div>' +
        '<h4>' + c.nom + '</h4>' +
        '<p class="fc-dades stamp">' + c.hex + ' · L a b ' + c.lab + '</p>' +
        '<p class="fc-tx">' + c.tx + '</p>'));
    });
  }
  var tira = $('#cartaTira');
  if (tira && typeof CARTA !== 'undefined') {
    CARTA.colors.forEach(function (c) {
      tira.appendChild(el('article', 'ct',
        '<div class="ct-im"><img src="' + c.im + '" alt="D\u2019on surt ' + c.nom + '" loading="lazy">' +
          '<span class="ct-mostra" style="background:' + c.hex + '"></span></div>' +
        '<p class="ct-hora stamp">' + c.hora + '</p>' +
        '<h4 class="serif">' + c.nom + '</h4>' +
        '<p class="ct-org stamp">' + c.lloc + '<br>' + c.quan + ' · <em>' + c.min + '</em></p>'));
    });
  }
  var k = $('#cartaGrid');
  if (k && typeof CARTA !== 'undefined') {
    if ($('#cartaAny')) $('#cartaAny').textContent = CARTA.any;
    if ($('#cartaTitol')) $('#cartaTitol').textContent = CARTA.titol;
    if ($('#cartaIntro')) $('#cartaIntro').textContent = CARTA.intro;
    CARTA.colors.forEach(function (c) {
      k.appendChild(el('article', 'kc',
        '<div class="kc-im"><img src="' + c.im + '" alt="D\u2019on surt el color ' + c.nom + '" loading="lazy"></div>' +
        '<div class="kc-mostra" style="background:' + c.hex + '"></div>' +
        '<div class="kc-tx">' +
          '<p class="kc-hora stamp">' + c.hora + '</p>' +
          '<h4 class="serif">' + c.nom + '</h4>' +
          '<p class="kc-org stamp">' + c.lloc + '<br>' + c.quan + ' · <em>' + c.min + '</em></p>' +
          '<p>' + c.tx + '</p>' +
          '<p class="kc-dades stamp">' + c.hex + ' · CIELAB ' + c.lab + '</p>' +
          /* abans aquí hi anava la llista de peces que portaven aquest color.
             Ja no n'hi ha: tots els colors es poden demanar a totes les peces
             menys al cabàs, que és de palma i no es tenyeix. */
          '<p class="kc-peces">A qualsevol peça del catàleg, ' +
          'excepte el Racó.</p>' +
        '</div>'));
    });
  }
})();

/* ── EL CATÀLEG ──────────────────────────────────────────────────────── */
var TALLES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'], talla = 'M', actual = null;
(function cataleg() {
  var g = $('#graella'), f = $('#filtres');
  if (!g || typeof PRODUCTES === 'undefined') return;
  /* a la portada no hi ha filtres i només se n'ensenyen quatre: una per família.
     El catàleg sencer viu a cataleg.html */
  var tria = g.classList.contains('tria');
  if (tria) {
    ['vuit', 'ultima', 'fons', 'granit'].forEach(function (id) {
      var p = PRODUCTES.filter(function (x) { return x.id === id; })[0];
      if (p) g.appendChild(targeta(p));
    });
    return;
  }
  var cats = [['tot', 'Tot'], ['dona', 'Dona'], ['home', 'Home'],
              ['unisex', 'Unisex'], ['casa', 'Casa i platja']];
  if (f) cats.forEach(function (c, i) {
    var b = el('button', i === 0 ? 'on' : '', c[1]);
    b.onclick = function () {
      $$('button', f).forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on'); pinta(c[0]);
    };
    f.appendChild(b);
  });
  function pinta(cat) {
    g.innerHTML = '';
    PRODUCTES.filter(function (p) { return cat === 'tot' || p.cat === cat; })
      .forEach(function (p) { g.appendChild(targeta(p)); });
  }
  pinta('tot');
})();

/* la targeta de producte, una de sola per a la portada i per al catàleg */
function targeta(p) {
  var n = el('article', 'prod prod-vel' + (p.secret ? ' secreta' : ''));
  n.innerHTML =
    '<div class="prod-im"><img data-im="' + p.im.replace('img/','').replace('.jpg','') +
      '" data-mida="480" alt="' + p.nom + '">' +
      '<span class="prod-etq">' + p.etq + '</span>' +
      (p.hora !== '—' ? '<span class="prod-hora stamp">' + p.hora + '</span>' : '') +
      '<span class="prod-prop"><b>Properament</b><i>Estiu del 2027</i></span></div>' +
    '<h3 class="prod-nm">' + p.nom + '</h3>' +
    '<p class="prod-mt">' + p.tipus + '</p>' +
    '<p class="prod-seg">' + p.seg.split(' · ')[0] + '</p>' +
    '<div class="prod-cols">' + pastilles(p) + '</div>';
  pintaImatges(n);
  return n;
}

/* pastilles de color: els del Fons i, si en té, el de la Carta amb un filet */
function hexDe(nom) {
  var t = (typeof FONS !== 'undefined' ? FONS : []).filter(function (c) { return c.nom === nom; })[0];
  if (t) return t.hex;
  var k = (typeof CARTA !== 'undefined' ? CARTA.colors : []).filter(function (c) { return c.nom === nom; })[0];
  return k ? k.hex : '#C9BCA4';
}
function pastilles(p) {
  var h = (p.colors || []).map(function (n) {
    return '<i title="' + n + '" style="background:' + hexDe(n) + '"></i>'; }).join('');
  /* la Carta ha passat de ser un color per peça a ser-hi tota: des del 2026
     qualsevol peça es pot demanar en qualsevol color, i l'única excepció és
     el cabàs, que és de palma i no es tenyeix */
  (p.carta || []).forEach(function (n) {
    h += '<i class="dedata" title="' + n + ' · Carta 2027" style="background:' +
         hexDe(n) + '"></i>';
  });
  return h;
}

/* ── LA FITXA ────────────────────────────────────────────────────────── */
/* ── LA TRIA DEL COLOR ───────────────────────────────────────────────────
   No es tria un color: es tria un minut del vespre, i el color n'és la
   conseqüència. És literalment la tesi de la marca —«no venem un lloc, venem
   una hora»— convertida en interfície.

   La línia va de −60 a +40 minuts respecte de la posta. Mentre t'hi mous, la
   franja de cel es pinta amb la mateixa corba que fa servir la portada, així
   que la llum canvia de veritat i no per decoració.

   I el detall que ho tanca: ELS CINC COLORS DEL FONS NO SÓN A LA LÍNIA. No hi
   poden ser, perquè no pertanyen a cap minut: són permanents. Van a part, en
   un bloc quiet. Sense explicar res, la interfície ensenya la diferència entre
   el Fons i la Carta, que és l'arquitectura sencera del negoci.

   Accessibilitat: el control és un <input type="range"> natiu —teclat i
   lector de pantalla de sèrie— amb aria-valuetext escrit en paraules, i a més
   cada color de la Carta és un botó que s'hi pot arribar tabulant. La versió
   accessible no és una versió pobra: és la mateixa.                        */
var colorTriat = null;

/* Quina tinta va damunt d'un color donat en hexadecimal: la que hi contrasti,
   calculada amb la lluminància relativa de la WCAG i no a ull.
   Ull amb el nom: ja hi ha una tintaSobre() més amunt que rep un array RGB i
   que fan servir el carregador i el hero. Aquesta és la versió d'hexadecimal
   i ha de tenir un nom propi; si es diguessin igual, la segona guanya i les
   altres dues es trenquen. */
function tintaSobreHex(hex) {
  var r = parseInt(hex.substr(1, 2), 16), g = parseInt(hex.substr(3, 2), 16),
      b = parseInt(hex.substr(5, 2), 16);
  var L = 0.2126 * aLineal(r) + 0.7152 * aLineal(g) + 0.0722 * aLineal(b);
  return L > 0.38 ? 'rgba(27,42,56,.72)' : 'rgba(245,241,233,.86)';
}

function minutEnLletra(dt) {
  if (dt === 0) return 'la posta exacta';
  var n = Math.abs(dt);
  return n + (n === 1 ? ' minut ' : ' minuts ') + (dt < 0 ? 'abans de la posta' : 'després de la posta');
}

function triaDeColor(p) {
  var c = $('#fTria'); if (!c) return;
  c.innerHTML = ''; colorTriat = null;

  var carta = (typeof CARTA !== 'undefined' ? CARTA.colors : []).filter(function (k) {
    return (p.carta || []).indexOf(k.nom) >= 0;
  });
  var fons = (typeof FONS !== 'undefined' ? FONS : []).filter(function (k) {
    return (p.colors || []).indexOf(k.nom) >= 0;
  });

  /* ── LA CARTA · la línia del vespre ───────────────────────────────── */
  if (carta.length) {
    var MIN = -60, MAX = 40;
    var box = el('div', 'tria-carta');
    box.innerHTML =
      '<p class="tria-tit stamp">La Carta ' + CARTA.any + ' · el color d’un minut</p>' +
      /* DUES SUPERFÍCIES I NO UNA, i l'ordre importa: a dalt el TINT, que és
         el color real de la peça, i a sota una franja fina amb LA LLUM
         d'aquell minut. Van separades i etiquetades perquè la primera versió
         pintava la llum a la superfície gran i es llegia com si fos el color
         del teixit: a +22 min la llum és malva i la peça és blava. Ensenyar un
         color que no és el color trenca la promesa 04 i la regla 7. */
      '<div class="tria-tint" id="triaTint"><span class="tt-etq stamp"></span></div>' +
      '<div class="tria-llum" id="triaCel"><span class="tl-etq stamp">la llum d’aquest minut</span></div>' +
      '<div class="tria-linia">' +
        '<input type="range" id="triaR" min="' + MIN + '" max="' + MAX + '" step="1" ' +
               'value="' + carta[0].dt + '" aria-label="El minut del vespre">' +
        '<div class="tria-punts" id="triaPunts" aria-hidden="true"></div>' +
      '</div>' +
      '<div class="tria-eix stamp"><span>−60 min</span><span>la posta</span><span>+40 min</span></div>' +
      '<div class="tria-caps" id="triaCaps"></div>' +
      '<div class="tria-segell" id="triaSeg"></div>';
    c.appendChild(box);

    var R = $('#triaR', box), cel = $('#triaCel', box), seg = $('#triaSeg', box);
    var tint = $('#triaTint', box);
    var punts = $('#triaPunts', box), caps = $('#triaCaps', box);

    carta.forEach(function (k) {
      var pc = ((k.dt - MIN) / (MAX - MIN) * 100).toFixed(2) + '%';
      var d = el('i', 'tp'); d.style.left = pc; d.style.background = k.hex;
      d.dataset.nom = k.nom; punts.appendChild(d);

      var b = el('button', 'trc', '<i style="background:' + k.hex + '"></i>' +
        '<b>' + k.nom + '</b><span>' + k.min + '</span>');
      b.type = 'button';
      b.onclick = function () { R.value = k.dt; pinta(); };
      caps.appendChild(b);
    });

    function pinta() {
      var v = parseInt(R.value, 10);

      /* sempre hi ha un color triat: el més proper. Deixar-ne cap seria fer
         que arrossegar fos una manera de perdre la selecció.
         I NO S'INTERPOLA entre colors: entre l'Ambre i la Rosa no hi ha cap
         tint, perquè no hi ha cap fotografia que el sostingui. Inventar-lo
         seria fabricar un color, que és justament el que no fem. */
      var k = carta.reduce(function (a, b) {
        return Math.abs(b.dt - v) < Math.abs(a.dt - v) ? b : a; });
      colorTriat = k;
      var lluny = Math.abs(k.dt - v);

      /* el tint real de la peça. La tinta de l'etiqueta no es tria: es calcula
         del propi tint, com fa la resta del lloc. Sobre el Blava o el Nit una
         etiqueta fosca no es veuria. */
      tint.style.background = k.hex;
      var e = $('.tt-etq', tint);
      e.textContent = k.nom + ' · el tint';
      e.style.color = tintaSobreHex(k.hex);
      /* i, a part, la llum d'aquell minut: la mateixa corba que la portada */
      var rgb = colorDeLHora(v);
      cel.style.background = 'rgb(' + rgb.join(',') + ')';

      $$('.tp', punts).forEach(function (d) { d.classList.toggle('on', d.dataset.nom === k.nom); });
      $$('.trc', caps).forEach(function (b) { b.classList.toggle('on', b.textContent.indexOf(k.nom) === 0); });

      seg.innerHTML =
        '<p class="ts-nom serif">' + k.nom + '</p>' +
        '<p class="ts-org stamp">' + k.lloc + ' · ' + k.quan + '</p>' +
        (lluny > 6
          ? '<p class="ts-buit">Ets a ' + minutEnLletra(v) + ', i aquest minut no té color. ' +
            'De tot l’arxiu només en tenim tres que en tinguin. El més proper és aquest.</p>'
          : '<p class="ts-hex stamp">' + k.hex + ' · CIELAB ' + k.lab + '</p>');

      R.setAttribute('aria-valuetext', minutEnLletra(v) + '. Color: ' + k.nom +
        (lluny > 6 ? ', que és el més proper' : '') + '.');
    }
    R.oninput = pinta;
    pinta();
  }

  /* ── EL FONS · fora de la línia, i per un motiu ───────────────────── */
  if (fons.length) {
    var bf = el('div', 'tria-fons');
    bf.innerHTML = '<p class="tria-tit stamp">El Fons · sempre disponibles</p>' +
      '<div class="tf-cols">' + fons.map(function (k) {
        return '<button type="button" class="tf" data-nom="' + k.nom + '">' +
               '<i style="background:' + k.hex + '"></i><b>' + k.nom + '</b></button>';
      }).join('') + '</div>' +
      '<p class="tf-nota">Aquests no són a la línia, i no hi poden ser: ' +
      '<em>no pertanyen a cap minut</em>. No tenen data perquè no caduquen.</p>';
    c.appendChild(bf);

    $$('.tf', bf).forEach(function (b) {
      b.onclick = function () {
        var k = fons.filter(function (x) { return x.nom === b.dataset.nom; })[0];
        colorTriat = k;
        $$('.tf', bf).forEach(function (y) { y.classList.remove('on'); });
        b.classList.add('on');
        $$('.tp', c).forEach(function (d) { d.classList.remove('on'); });
        $$('.trc', c).forEach(function (y) { y.classList.remove('on'); });
        var tt = $('#triaTint', c);
        if (tt) { tt.style.background = k.hex;
                  var e2 = $('.tt-etq', tt);
                  e2.textContent = k.nom + ' · el tint';
                  e2.style.color = tintaSobreHex(k.hex); }
        var s = $('#triaSeg', c);
        if (s) s.innerHTML = '<p class="ts-nom serif">' + k.nom + '</p>' +
          '<p class="ts-org stamp">Del Fons · sense data</p>' +
          '<p class="ts-hex stamp">' + k.hex + ' · CIELAB ' + k.lab + '</p>';
      };
    });
  }

  /* el Racó: ni línia ni gamma. Es diu, no es dissimula. */
  if (!carta.length && fons.length <= 1) {
    c.innerHTML = '<p class="tf-nota" style="margin:0">' +
      (p.colors || []).join(' · ') + '. És l’única peça del catàleg que no es tenyeix.</p>';
  }
}

function obreFitxa(id) {
  if (typeof PRODUCTES === 'undefined') return;
  var p = PRODUCTES.filter(function (x) { return x.id === id; })[0];
  if (!p || !$('#fitxa')) return;
  actual = p; talla = 'M';
  $('#fImg').src = p.im; $('#fImg').alt = p.nom;
  $('#fTipus').textContent = p.tipus + (p.hora !== '—' ? ' · ' + p.hora : '');
  $('#fNom').textContent = p.nom;
  $('#fPerque').textContent = p.perque;
  $('#fDv').textContent = p.dv;
  $('#fPreu').textContent = p.preu + ' €';
  var t = $('#fTalles'); t.innerHTML = '';
  /* hi ha peces que no tenen talla —el cabàs— i ensenyar-los-en una fila
     buida de XS a XXL és dir una cosa que no és certa */
  var ambTalles = p.talles !== false;
  var llista = Array.isArray(p.talles) ? p.talles : TALLES;
  talla = llista.indexOf('M') >= 0 ? 'M' : llista[Math.floor(llista.length / 2)];
  t.style.display = ambTalles ? '' : 'none';
  (ambTalles ? llista : []).forEach(function (x) {
    var b = el('button', x === talla ? 'on' : '', x);
    b.onclick = function () { talla = x; $$('button', t).forEach(function (y) { y.classList.remove('on'); }); b.classList.add('on'); };
    t.appendChild(b);
  });
  var dl = $('#fDl'); dl.innerHTML = '';
  Object.keys(p.fitxa).forEach(function (k) {
    dl.appendChild(el('dt', '', k)); dl.appendChild(el('dd', '', p.fitxa[k]));
  });
  triaDeColor(p);
  $('#fCura').textContent = p.cura;
  $('#fSeg').textContent = p.seg;
  /* si la imatge és del lloc i no de la peça, es diu a la fitxa. No es
     dissimula: la marca no pot demanar confiança i alhora fer veure que té
     una fotografia que no té. */
  var notes = [];
  if (p.imNota) notes.push(p.imNota);
  if (p.nota) notes.push(p.nota);
  $('#fNota').innerHTML = notes.join('<br><br>');
  $('#fNota').style.display = notes.length ? 'block' : 'none';
  actualitzaEscriu();
  $('#fitxa').classList.add('obert');
  document.body.style.overflow = 'hidden';
}
$$('[data-tanca]').forEach(function (b) {
  b.onclick = function () { $('#fitxa').classList.remove('obert'); document.body.style.overflow = ''; };
});
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  if ($('#fitxa')) $('#fitxa').classList.remove('obert');
  if ($('#calaix')) $('#calaix').classList.remove('obert');
  document.body.style.overflow = '';
});

/* ── L'HORA, A LA MÀ · la primera pantalla del telèfon ───────────────────
   Escriu l'hora, el nom de la franja i quant li falta al sol, i pinta el fons
   amb la llum d'aquest minut. No hi ha res més: al telèfon, a la roca i a les
   vuit del vespre, això és el que la marca té per dir.                     */
(function horaAMa() {
  var s = $('#horaMa'); if (!s) return;
  function tic() {
    var a = ara();
    $('#hmHora').textContent = hhmm(a.m);
    $('#hmFranja').textContent = a.f.n + (a.f.v ? '' : '');
    $('#hmMin').textContent = frase(a).charAt(0).toUpperCase() + frase(a).slice(1) +
      (a.f.v ? ' · ' + a.f.v : '');
    var rgb = colorDelMoment(a);
    s.style.background = 'rgb(' + rgb.join(',') + ')';
    /* tintaSobre() torna {c, r, fosca}: la tinta que hi contrasta i la ràtio */
    var ti = tintaSobre(rgb);
    ['#hmHora','#hmFranja'].forEach(function (q) { $(q).style.color = ti.c; });
    $('#hmMin').style.color = ti.fosca ? 'rgba(27,42,56,.72)' : 'rgba(245,241,233,.78)';
    $$('.hm-lloc,.hm-peu .stamp', s).forEach(function (n) {
      n.style.color = ti.fosca ? 'rgba(27,42,56,.6)' : 'rgba(245,241,233,.62)'; });
    var h = $('.hm-hor', s); if (h) h.style.background = ti.c;
    setTimeout(tic, 30000);
  }
  tic();
})();


/* ── EL DESPLAÇAMENT ÉS EL DIA · catàleg, al telèfon ─────────────────────
   El catàleg era una graella: tot alhora, pla, com un magatzem. Tota la web
   argumenta que el dia té dues meitats i que hi ha una hora que ho decideix
   tot, i el catàleg ho contradeia amb la maqueta.

   Al telèfon, doncs, les peces s'ordenen per l'hora a què comencen a servir
   —dada que ja hi era, a `p.hora`, i que fins ara només es feia servir com una
   etiqueta petita— i cada tram porta la llum d'aquella hora al darrere.
   Baixar deixa de ser recórrer un llistat i passa a ser avançar el dia.

   No és decoració: és l'única mena de moviment que el manual permet, el que
   explica el pas del temps. I es desactiva amb prefers-reduced-motion.     */
(function catalegComUnDia() {
  var g = $('#graella');
  if (!g || g.classList.contains('tria') || typeof PRODUCTES === 'undefined') return;
  if (!matchMedia('(max-width:860px)').matches) return;

  /* de quina hora arrenca cada peça, en minuts des de mitjanit */
  function inici(p) {
    var m = (p.hora || '').match(/^(\d{1,2}):(\d{2})/);
    return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : 12 * 60;
  }
  /* i quants minuts li falten a la posta en un dia d'estiu tipus (21:00) */
  function dt(min) { return min - 21 * 60; }

  var trams = [
    [0,      11 * 60 + 30, 'El matí',        'la peça encara no ha treballat'],
    [11 * 60 + 30, 18 * 60, 'La meitat sòlida', 'sal, sorra i llum a plom'],
    [18 * 60, 20 * 60 + 30, 'S’horabaixa',   'de l’aigua a la taula'],
    [20 * 60 + 30, 24 * 60, 'La nit que arriba', 'i encara queda llum']
  ];

  var ordre = PRODUCTES.slice().sort(function (a, b) { return inici(a) - inici(b); });
  g.innerHTML = '';
  g.classList.add('graella-dia');

  trams.forEach(function (tr) {
    var dins = ordre.filter(function (p) {
      var i = inici(p); return i >= tr[0] && i < tr[1];
    });
    if (!dins.length) return;
    var rgb = colorDeLHora(dt((tr[0] + tr[1]) / 2));
    var cap = el('div', 'dia-cap');
    cap.style.background = 'rgb(' + rgb.join(',') + ')';
    var tinta = tintaSobre(rgb);
    cap.innerHTML = '<span class="dc-h stamp">' + hhmm(tr[0]) + '</span>' +
      '<b class="serif">' + tr[2] + '</b>' +
      '<span class="dc-tx">' + tr[3] + '</span>';
    cap.style.color = tinta.c;
    g.appendChild(cap);
    dins.forEach(function (p) { g.appendChild(targeta(p)); });
  });

  /* els filtres per família deixen de tenir sentit si l'ordre és el dia */
  var f = $('#filtres'); if (f) f.style.display = 'none';
})();


/* ── LA BARRA D'ESTAT DEL TELÈFON ────────────────────────────────────────
   theme-color pinta la barra del navegador al mòbil. Aquí no s'hi posa un
   color de marca fix: s'hi posa LA LLUM D'ARA, la mateixa que calcula el
   rellotge. Al migdia el telèfon es veu de color Sal i a mitjanit, de Tinta.

   És el detall que fa que tenir aquesta pàgina oberta al mòbil sigui una cosa
   i no una altra: el marc del telèfon deixa de ser del navegador i passa a ser
   de l'hora que hi ha a fora. No costa res i no ho fa ningú.               */
(function barraDEstat() {
  var m = document.querySelector('meta[name=theme-color]');
  if (!m) return;
  (function tic() {
    var rgb = colorDelMoment(ara());
    m.setAttribute('content', '#' + rgb.map(function (v) {
      return ('0' + v.toString(16)).slice(-2); }).join(''));
    setTimeout(tic, 60000);
  })();
})();

/* ── EL MENÚ DE MÀ ───────────────────────────────────────────────────────
   La llista es genera de la navegació que ja hi ha al capçal, així que no hi
   pot haver dues llistes que divergeixin. I porta el rellotge a sota: al
   telèfon, saber quina hora és i quant li falta al sol és el que la marca
   té per dir, i és l'únic lloc on cap sencer.                              */
(function menuDeMa() {
  var b = $('#obreMenu'), m = $('#menu'), ll = $('#menuLlista');
  if (!b || !m || !ll) return;

  var origen = $('header nav ul');
  if (origen) {
    $$('a', origen).forEach(function (a) {
      var li = el('li');
      var n = a.cloneNode(true);
      if (a.getAttribute('href').indexOf(location.pathname.split('/').pop()) === 0)
        n.setAttribute('aria-current', 'page');
      li.appendChild(n); ll.appendChild(li);
    });
  }

  function obre(si) {
    b.setAttribute('aria-expanded', si ? 'true' : 'false');
    if (si) { m.hidden = false; requestAnimationFrame(function () { m.classList.add('obert'); }); }
    else { m.classList.remove('obert'); setTimeout(function () { m.hidden = true; }, 600); }
    document.body.style.overflow = si ? 'hidden' : '';
    if (si) { var a = $('a', ll); if (a) a.focus(); }
  }
  b.onclick = function () { obre(b.getAttribute('aria-expanded') !== 'true'); };
  $$('a', ll).forEach(function (a) { a.onclick = function () { obre(false); }; });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') { obre(false); b.focus(); }
  });

  var ara_ = $('#menuAra');
  if (ara_) {
    (function tic() {
      var a = ara();
      ara_.innerHTML = hhmm(a.m) + ' · ' + a.f.n + '<br>' + frase(a);
      setTimeout(tic, 30000);
    })();
  }
})();

/* ── PROPERAMENT ──────────────────────────────────────────────────────
   Aquí hi havia una cistella amb total en euros i un botó de reservar.
   Amb el web obert al domini propi allò prometia una compra que no
   existeix: no hi ha peça, no hi ha estoc i no hi ha cobrament. La
   cistella es guarda sencera a _ARXIU/RESERVA_CATALEG_2026-08-06/ i
   tornarà el dia que hi hagi producte i passarel·la.
   Mentrestant l'única acció possible és escriure'ns, i el correu ja surt
   amb el nom de la peça posat: és l'única dada que ens interessa. */
function actualitzaEscriu() {
  var fe = $('#fEscriu');
  if (!fe || !actual) return;
  fe.href = 'mailto:hola@shorabaixa.com' +
    '?subject=' + encodeURIComponent('Interès per ' + actual.nom) +
    '&body=' + encodeURIComponent(
      'Hola,\n\nHe vist ' + actual.nom + ' al catàleg i en voldria saber més.\n\n');
}

/* ── LA CARTA ────────────────────────────────────────────────────────── */
/* El formulari deia «Apuntat» i llençava el correu: un web estàtic no pot
   guardar res enlloc. Fins que hi hagi servei de llista, obre el correu del
   visitant amb el missatge escrit. El que s'envia, s'envia de debò. */
var mf = $('#mail');
if (mf) mf.onsubmit = function (e) {
  e.preventDefault();
  var c = ($('#correu') && $('#correu').value || '').trim();
  window.location.href = 'mailto:hola@shorabaixa.com' +
    '?subject=' + encodeURIComponent('La carta') +
    '&body=' + encodeURIComponent('Hola,\n\nApunteu-me a la carta' +
      (c ? ' en aquesta adreça: ' + c : '') + '.\n\n');
  $('#mailOk').textContent = 'S’obre el teu correu amb el missatge escrit. Envia’l i ja està.';
};

/* ── PROGRÉS I CAPÇALERA ─────────────────────────────────────────────── */
(function scroll() {
  var barra = $('#progres span'), cap = $('#cap');
  /* Abans aquí hi havia tres identificadors escrits a mà —portes, pacte,
     carta— que només existeixen a la portada. A les pàgines interiors la
     capçalera es tornava clara de seguida, just quan té a sota la capçalera
     de pàgina, que és blau vespre. Ara no es pregunta com es diu la secció:
     es mira quina superfície té a sota i si és fosca. */
  function esFosca(n) {
    var L = 0;
    while (n && n !== document.body) {
      var b = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      if (b && (b.length < 4 || parseFloat(b[3]) > .6)) {
        function l(v) { v /= 255; return v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }
        L = .2126 * l(+b[0]) + .7152 * l(+b[1]) + .0722 * l(+b[2]);
        return L < .18;
      }
      if (n.querySelector && n.querySelector(':scope > .cap-im, :scope > .ps-im, :scope > .hero-im')) return true;
      n = n.parentElement;
    }
    return false;
  }
  function upd() {
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    if (barra) barra.style.width = (p * 100) + '%';
    if (!cap) return;
    var alt = cap.offsetHeight || 60;
    cap.style.pointerEvents = 'none';
    var sota = document.elementFromPoint(innerWidth / 2, alt + 6);
    cap.style.pointerEvents = '';
    cap.classList.toggle('fosc', !!sota && esFosca(sota));
  }
  addEventListener('scroll', upd, { passive: true });
  addEventListener('resize', upd); upd();
})();

pintaImatges();
/* les pàgines que generen imatges pel seu compte han de poder pintar-les:
   sense això, la galeria del territori es queda amb els <img data-im> crus */
window.pintaImatges = pintaImatges;
window.obreFitxa = obreFitxa;
})();
