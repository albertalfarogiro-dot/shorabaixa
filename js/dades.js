/* ═══════════════════════════════════════════════════════════════════════
   S'HORABAIXA · dades del relat, del catàleg i del territori

   DOCTRINA DE NOMS (document 13):
   · El nom de la peça surt de L'HORA i del GEST. Mai d'un lloc.
     El lloc canvia cada sessió; l'hora és nostra i no caduca.
   · El lloc és un SEGELL: lloc · data · hora · coordenades, al nivell de
     precisió que l'evidència aguanta:
        lloc concret → passa els quatre filtres (evidència, unicitat, lliure, dible)
        municipi     → el GPS el confirma, la cala exacta no
        «un racó de la Costa Brava» → quan no en tenim prou certesa
   · Una peça, «el Racó», no dirà mai d'on és. A posta.

   Cada fase de llum ve del càlcul de la posta real d'aquell dia i d'aquell
   lloc (NOAA), no de l'hora del rellotge. Els minuts són els que falten
   al sol per entrar al mar.
   ═══════════════════════════════════════════════════════════════════════ */


/* ── LA COL·LECCIÓ ────────────────────────────────────────────────────────
   El catàleg no és una temporada: és un LLOC i una LLUM, seriats i numerats.
   Tot el que hi ha avui és la primera col·lecció, la Costa Brava · S1 —el
   bressol, de Sant Feliu a Begur. Cada racó nou del Mediterrani de parla
   catalana on anirem serà una col·lecció nova (S2, S3…), amb la seva llum,
   els seus colors i la seva tirada. La regla no canvia: només anomenem un
   lloc quan hi hem estat i n'hem mesurat la llum. Fins llavors, no en diem res. */
const COLLECCIO = {
  codi:  'S1',
  lloc:  'Costa Brava',
  nom:   'Costa Brava · S1',
  tram:  'De Sant Feliu a Begur',
  claim: 'El primer racó. La primera llum.',
  ordre: 1
};

/* ── EL RELAT · el ritme i el color de cada capítol ───────────────────────
   Cinc ritmes diferents perquè el lector no aprengui el patró al capítol IV,
   i una baixada de color que no retrocedeix: de la llum d'or a l'hora blava.
   El to de la tinta el calcula el JS a partir del fons, no es tria a mà. */
const CAPITOLS = [
  { ritme:'r-a',        fons:'#F2DFC0' },   /* llum d'or */
  { ritme:'r-b',        fons:'#E9D9B6' },   /* la llum que s'espesseix */
  { ritme:'r-a inv',    fons:'#DEC49B' },   /* sorra encesa */
  { ritme:'r-c',        fons:'#D9A87A' },   /* or baix */
  { ritme:'r-a',        fons:'#9F5C3A' },   /* coral fosc · 4,6:1 amb la tinta clara */
  { ritme:'r-e',        fons:'#826478' },   /* malva fosc · 4,6:1 amb la tinta clara */
  { ritme:'r-e',        fons:'#3C5A78' }    /* hora blava */
];

/* ── EL RELAT ─────────────────────────────────────────────────────────── */
const RELAT = [
  { n:'I',   t:'La llum es gira',
    im:'img/OR_calma.jpg', seg:'Illots de Sant Jordi, Sant Antoni de Calonge · 18:43 · −51 min',
    tx:'Hi ha un moment, cap a les set, en què la llum deixa de caure a plom i comença a '+
       'venir de costat. No ho anuncia ningú. Simplement, de sobte, tot té una ombra llarga '+
       'i tothom mira cap al mateix cantó.' },
  { n:'II',  t:'Surts de l’aigua',
    im:'img/MAT_peu.jpg', seg:'Un racó de la Costa Brava · 10:50',
    tx:'El granit encara crema una mica. Poses el peu damunt de la tovallola perquè la sorra '+
       'no s’enganxi i, mentre t’asseques, entens que ja no tornaràs a l’aigua. Ningú no ho diu '+
       'en veu alta, però tothom ho sap alhora: el dia acaba de canviar de direcció.' },
  { n:'III', t:'Et vesteixes damunt de la pell molla',
    im:'img/OR_esquena.jpg', seg:'s’Alguer, Palamós · 19:46 · −54 min',
    tx:'I aquí és on gairebé tota la roba d’estiu falla. La que aguanta la sal no aguanta '+
       'la taula, i la que aguanta la taula no la pots mullar. Nosaltres fem la que fa les dues coses.' },
  { n:'IV',  t:'Puges pel camí de ronda',
    im:'img/TUN_barques.jpg', seg:'Sa Tuna, Begur · 19:01 · −66 min',
    tx:'Un pi, una paret de pedra seca, i el mar cada cop més avall. El camí no és una ruta: '+
       'és el que separa la platja del sopar, i dura exactament el que has de trigar a assecar-te.' },
  { n:'V',   t:'Arribes al poble amb la sal a sobre',
    im:'img/CAL_voltes.jpg', seg:'Port Bo, Calella de Palafrugell · 18:39 · −81 min',
    tx:'Les voltes fan ombra abans que el sol se’n vagi, i sota les voltes la roba es refreda. '+
       'No t’has canviat. No cal.' },
  { n:'VI',  t:'El sol toca l’aigua',
    im:'img/MAGICA.jpg', seg:'Illots de Sant Jordi, Sant Antoni de Calonge · 19:35 · posta exacta',
    tx:'Dura el temps d’una respiració i tothom calla sense haver-ho acordat. Aquesta és del '+
       'minut zero —la posta era a les 19:34 i la fotografia és de les 19:35— i en tot l’arxiu '+
       'no n’hi ha cap altra. Ho hem intentat moltes vegades. No és cosa de tenir paciència: '+
       'és cosa de ser-hi.' },
  { n:'VII', t:'I encara queda llum',
    im:'img/BLAVA.jpg', seg:'Un racó de la Costa Brava · 20:49 · +22 min',
    tx:'El sol ja no hi és i el cel encara fa de llum. La roba clara es veu més que de dia i '+
       'les faroles del poble s’encenen d’una en una. Gairebé tothom ja ha marxat: aquesta part '+
       'és per als que es queden.' }
];


/* ── LES DUES MEITATS DEL DIA ─────────────────────────────────────────────
   Les dues fotografies son del mateix punt: l'Escull de les Cigales, a
   Sant Antoni de Calonge. Una de les 12:02 i l'altra de les 19:49, amb
   set hores i quaranta-set minuts pel mig. Es l'argument sencer de la marca
   en dues imatges: la peca ha de sobreviure la primera per ser-hi a la segona. */
const MEITATS = {
  solida: { t:'La meitat sòlida', h:'12:02', im:'img/VIU_roca.jpg',
    seg:'Escull de les Cigales, Sant Antoni de Calonge · 2 d’agost · 12:02',
    tx:'Dura vuit hores i la llum cau a plom. És on la peça es mulla, s’omple de sorra '+
       'i es queda la sal a dins. No és bonica i no la fotografia ningú, però és la que '+
       'la posa a prova. Aquí una camisa barata ja ha perdut el color.' },
  fragil: { t:'La meitat fràgil', h:'19:49', im:'img/TAR_silueta.jpg',
    seg:'Escull de les Cigales, Sant Antoni de Calonge · 14 d’agost · 19:49 · −61 min',
    tx:'Dura setanta minuts i no torna. La llum es gira, tot es fa llarg, i la mateixa peça '+
       'que has castigat tot el dia s’ha de poder seure a taula com si res. La fragilitat '+
       'no és de la roba: és de l’hora.' }
};

/* ── LA LLUM DEL DIA, SENCERA ───────────────────────────────────────────────────── */
const LLUMS = [
  { clau:'plom',   nom:'La llum de plom', im:'img/DIA_plata.jpg',
    min:'de migdia a −90 minuts', seg:'Cala dels Capellans, Sant Antoni de Calonge · 03.08.2026 · 10:56',
    tx:'La que no surt a cap catàleg. Cau a plom, aplana el mar i el deixa de color de plom '+
       'i de plata. És la llum que castiga la roba, i per això la marca no la nega: la fa servir '+
       'per triar les fibres.',
    tons:['#AEB8B4','#DCD8CE','#C9BCA4'] },
  { clau:'or',     nom:'Hora d’or',    im:'img/HERO.jpg',
    min:'de −55 a −5 minuts', seg:'Cap Roig, Calonge i Sant Antoni · 29.09.2023 · 19:28',
    tx:'El sol encara hi és però ja no crema. Tot es torna llarg: les ombres, les converses, '+
       'la roba. És l’hora que fa que la peça hagi de ser càlida i mat, mai brillant.',
    tons:['#E3A93E','#C8802F','#E27A54'] },
  { clau:'magica', nom:'Hora màgica',  im:'img/MAGICA.jpg',
    min:'de −5 a +20 minuts', seg:'Illots de Sant Jordi, Sant Antoni de Calonge · 29.09.2023 · 19:35',
    tx:'El sol toca l’aigua i s’hi enfonsa. Dura vint-i-cinc minuts i no torna. D’aquí surten '+
       'el rosa i el malva, els dos colors que la marca no deixa competir amb res.',
    tons:['#E2A08B','#9C7E92','#E27A54'] },
  { clau:'blava',  nom:'Hora blava',   im:'img/BLAVA.jpg',
    min:'de +20 a +55 minuts', seg:'Un racó de la Costa Brava · 29.08.2024 · 20:49',
    tx:'El sol ja no hi és i el cel encara fa de llum. És quan la roba clara es veu més que de dia '+
       'i quan les faroles del poble s’encenen d’una en una.',
    tons:['#3C5A78','#22384E','#1B2A38'] }
];

/* ── EL SISTEMA DE COLOR ──────────────────────────────────────────────────
   Els vuit colors no s'han triat: s'han mesurat. Cada un surt d'una regio
   concreta d'una fotografia concreta de l'arxiu, promitjant nomes la banda
   central de lluminositat —es descarta l'ombra fonda i el reflex cremat— i
   convertit a CIELAB, que es el valor que enten un tintorer.
   El Fons no te data: es permanent. La Carta si, i es tanca quan s'esgota. */

const FONS = [
  { nom:'Sal',         hex:'#D4C9B4', lab:'81,3 · 0,3 · 11,6',  im:'img/COLOR_sal.jpg',
    tx:'La calç d\u2019una paret de Calella a les set. La base de tot el sistema.' },
  { nom:'Lli cru',     hex:'#D6BBA5', lab:'77,7 · 6,0 · 14,7',  im:'img/COLOR_lli.jpg',
    tx:'La sorra seca, lluny de l\u2019aigua. La fibra abans de tenyir-la.' },
  { nom:'Verd de pi',  hex:'#6E7563', lab:'48,2 · \u22126,2 · 9,0', im:'img/COLOR_pi.jpg',
    tx:'La massa de pins de sobre Sa Tuna, a Begur. \u00c9s l\u2019\u00fanic verd de la gamma i ' +
       'hi \u00e9s per un motiu: aquesta costa \u00e9s tan de pineda com de granit.' },
  { nom:'Roca',        hex:'#655E57', lab:'40,3 · 1,3 · 4,9',   im:'img/COLOR_roca.jpg',
    tx:'El granit de la Cala dels Capellans, mesurat al sol del mat\u00ed.' },
  { nom:'Nit',         hex:'#0F161F', lab:'7,1 · \u22120,4 · \u22126,9',  im:'img/COLOR_nit.jpg',
    tx:'El mar a l\u2019hora blava, quan ja no s\u2019hi veu el fons. El negre trencat: mai #000000.' }
];


const CARTA = {
  any:'2027', titol:'Tres postes',
  intro:'Els colors d\u2019aquest any no s\u2019han triat en una reuni\u00f3: s\u2019han mesurat. ' +
        'Cada un surt d\u2019una fotografia concreta de l\u2019arxiu, amb el seu lloc i el seu minut. ' +
        'Els tres s\u00f3n el mateix vespre vist en tres moments \u2014vint-i-un minuts abans, el ' +
        'minut zero i vint-i-dos minuts despr\u00e9s\u2014, i per aix\u00f2 van en aquest ordre.',
  colors:[
    { nom:'Ambre 20:39', hex:'#CDAA7C', lab:'71,7 · 6,5 · 28,5', im:'img/COLOR_ambre.jpg', dt:-21,
      lloc:'Sant Joan de Palam\u00f3s',
      quan:'15 de maig de 2025 · 20:39', min:'\u221221 min', hora:'El cam\u00ed',
      tx:'El cel d\u2019or vint-i-un minuts abans que el sol toqui l\u2019aigua, quan la llum ja ' +
         'arriba de costat i el teixit s\u2019enc\u00e8n. \u00c9s el moment que dona nom a l\u2019hora ' +
         'd\u2019or i el primer dels tres.' },
    { nom:'Rosa 19:35', hex:'#E6BEA8', lab:'79,9 · 11,2 · 16,5', im:'img/COLOR_rosa.jpg', dt:0,
      lloc:'Illots de Sant Jordi, Sant Antoni de Calonge',
      quan:'29 de setembre de 2023 · 19:35', min:'posta exacta', hora:'La taula',
      tx:'La franja de cel just damunt de l\u2019aigua, al minut zero. De vuitanta-cinc ' +
         'fotografies de l\u2019arxiu nom\u00e9s n\u2019hi ha una d\u2019aquest minut, i per tant ' +
         'nom\u00e9s hi ha una manera de tornar a treure aquest color: anar-hi i esperar-se.' },
    { nom:'Blava 20:49', hex:'#4A7B92', lab:'49,2 · \u22129,8 · \u221217,7', im:'img/COLOR_blava.jpg', dt:22,
      lloc:'Un rac\u00f3 de la Costa Brava',
      quan:'29 d\u2019agost de 2024 · 20:49', min:'+22 min', hora:'La nit que arriba',
      tx:'El cel vint-i-dos minuts despr\u00e9s que el sol hagi marxat. Tamb\u00e9 n\u2019hi ha una sola ' +
         'fotografia a tot l\u2019arxiu, i tampoc no es pot repetir.' }
  ]
};


/* ── EL CATÀLEG · les peces permanents ──────────────────────────────────
   Cap peça no porta nom de cala: un nom de lloc depen de la fotografia amb
   que es va presentar, i la fotografia canvia cada sessio. Els noms surten
   de l'hora i del gest. El lloc passa a ser un segell d'origen. */
const PRODUCTES = [
  { id:'vuit', nom:'Camisa de les Vuit', cat:'unisex', tipus:'Camisa', preu:155,
    im:'img/IA_vuit.jpg', imTipus:'producte', etq:'Fons', hora:'11:00 → 22:00',
    dv:'Coll cubà obert, sense passadors. Prou fina per portar-la damunt de la pell molla, ' +
       'prou seriosa per anar a sopar. Dos talls: recte i afuat.',
    perque:'Les vuit és l’hora en què surts sense haver-te canviat. El coll obert i el cos ample hi són perquè no ho hagis de fer.',
    fitxa:{'Fibra':'Lli 100% europeu','Gramatge':'165 g/m²','Teixit a':'Europa · per tancar',
           'Cosit a':'Catalunya o Portugal · per tancar','Acabat':'Tenyit en peça','Talls':'Recte i afuat','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Renta-la a mà i estén-la a l\u2019ombra. Les arrugues formen part.',
    seg:'Port Bo, Calella de Palafrugell · 13.09.2024 · 18:39 · 41,8886 N 3,1848 E' },

  { id:'bany', nom:'Camisa de Bany', cat:'unisex', tipus:'Camisa', preu:135,
    im:'img/IA_camisabany.jpg', imTipus:'producte', etq:'Fons', hora:'11:00 → 21:00',
    dv:'Gasa de cotó doble, ampla i de mànega tres quarts. Es porta damunt del banyador o ' +
       'directament damunt de la pell, i es comparteix.',
    perque:'És la que et poses moll, abans d’eixugar-te. Gasa doble i mànega tres quarts: tapa sense enganxar-se i s’asseca a sobre teu.',
    fitxa:{'Fibra':'Cotó orgànic GOTS','Gramatge':'130 g/m²','Teixit a':'Europa · per tancar','Cosit a':'Catalunya o Portugal · per tancar',
           'Acabat':'Gasa doble arrugada','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Renta-la a 30° i no la planxis: el relleu és la peça.',
    seg:'Tamariu, Palafrugell · 01.05.2025 · 18:51 · 41,9178 N 3,2091 E' },

  { id:'ronda', nom:'Pantaló de Ronda', cat:'unisex', tipus:'Pantaló', preu:155,
    im:'img/IA_ronda.jpg', imTipus:'producte', etq:'Fons', hora:'10:00 → 23:00',
    dv:'Ample, cordó pla de cotó i elàstic posterior dissimulat. Sense cremallera: vint-i-quatre ' +
       'segons per posar-te\u2019l i tot un vespre per treure-te\u2019l.',
    perque:'Del camí de ronda, que és el que separa la platja del sopar. Cordó pla i sense cremallera: te’l poses amb els peus plens de sorra.',
    fitxa:{'Fibra':'Lli 100% europeu','Gramatge':'200 g/m²','Teixit a':'Europa · per tancar',
           'Cosit a':'Catalunya o Portugal · per tancar','Cintura':'Cordó pla, sense cremallera','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Renta\u2019l a mà. El lli s\u2019estova cada estiu.',
    seg:'Sant Feliu de Guíxols · 18.04.2025 · 18:13 · 41,7875 N 3,0453 E' },

  { id:'curt', nom:'Curt de Ronda', cat:'unisex', tipus:'Pantaló', preu:115,
    im:'img/IA_curt.jpg', imTipus:'producte', etq:'Fons', hora:'10:00 → 21:00',
    dv:'El mateix patró del Pantaló de Ronda, tallat a mig cuixa. Mateixa cintura de cordó, ' +
       'mateix lli, mateixes butxaques.',
    perque:'El mateix camí, quan fa massa calor per anar llarg. Mateix cordó i mateix gest, un pam menys de tela.',
    fitxa:{'Fibra':'Lli 100% europeu','Gramatge':'200 g/m²','Teixit a':'Europa · per tancar',
           'Cosit a':'Catalunya o Portugal · per tancar','Llargada':'Mig cuixa','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Renta\u2019l a mà. El lli s\u2019estova cada estiu.',
    seg:'Aigua Xelida, Palafrugell · 17.05.2025 · 18:47 · 41,9222 N 3,2172 E' },

  { id:'granit', nom:'Tovallola de Granit', cat:'casa', tipus:'Casa', preu:80,
    im:'img/MAT_ratlla.jpg', imTipus:'producte', etq:'Fons', hora:'tot el dia',
    dv:'Fouta de 100 × 180 amb ratlla to sobre to i flocs curts. Pesa poc, s\u2019asseca de ' +
       'pressa i serveix de mantellina a taula o de xal a l\u2019horabaixa.',
    perque:'Perquè sota la tovallola sempre hi ha el mateix: granit. És plana i prima per això —s’estén damunt de la roca i no se n’endú la sorra.',
    fitxa:{'Fibra':'Cotó orgànic','Mida':'100 × 180 cm','Teixit a':'Europa · per tancar','Acabat':'Flocs curts',
           'Etiqueta':'Teixida, cosida a 5 cm de la cantonada','Pes':'320 g'},
    talles:false,                      /* mida fixa, no talla */
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Renta-la amb aigua freda. Cada rentat la fa més tova.',
    seg:'Cala dels Capellans, Sant Antoni de Calonge · 04.08.2026 · 10:50 · 41,8365 N 3,0936 E' },

  { id:'xal', nom:'Xal de les Deu', cat:'casa', tipus:'Casa', preu:85,
    im:'img/IA_xal.jpg', imTipus:'producte', etq:'Peça de l\u2019any', hora:'20:00 → 00:00',
    dv:'110 × 190 de gasa de cotó. La capa de l\u2019hora blava: quan refresca, va a les ' +
       'espatlles damunt de la mateixa roba que portaves a la platja. També serveix de pareo.',
    perque:'Les deu és quan refresca i ningú no vol tornar a casa a buscar res. Per això va a la bossa des de les set, i per això pesa el que pesa.',
    fitxa:{'Fibra':'Cotó orgànic GOTS','Mida':'110 × 190 cm','Teixit a':'Europa · per tancar',
           'Acabat':'Vora enrotllada a mà','Pes':'180 g'},
    talles:false,                      /* mida fixa, no talla */
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Renta\u2019l a mà i no el planxis.',
    seg:'Port Bo, Calella de Palafrugell · 13.09.2024 · 18:35 · 41,8886 N 3,1848 E',
    nota:'És la peça de l\u2019any 2027: en Rosa 19:35 se\u2019n fan 180 i es numeren a ' +
         'l\u2019etiqueta. Quan s\u2019acabin, la tirada es tanca i no es torna a fer.' },

  { id:'raco', nom:'el Racó', cat:'casa', tipus:'Casa', preu:60, secret:true,
    im:'img/IA_raco.jpg', imTipus:'producte', etq:'Ofici', hora:'—',
    dv:'Cabàs de palma natural teixida en un taller d\u2019espart, amb nanses de cuir vegetal. ' +
       'Prou gran per a tovallola i llibre. 38 × 34 × 16.',
    perque:'Del que diem quan no volem dir el lloc: «un racó de la Costa Brava». És l’única peça que porta per nom una discreció, i l’única que no es tenyeix.',
    fitxa:{'Matèria':'Palma natural teixida','Nanses':'Cuir vegetal','Fet a':'Taller d\u2019espart',
           'Mida':'38 × 34 × 16 cm','Marcatge':'Etiqueta de cuir cosida al centre','Pes':'480 g'},
    /* l'\u00fanica excepci\u00f3 de tot el cat\u00e0leg: la palma teixida no es tenyeix, i
       tenyir-la seria fer veure que \u00e9s una altra cosa */
    talles:false,                       /* un cabàs no té talla */
    colors:['Palma natural'], carta:null,
    cura:'Si es mulla, deixa\u2019l assecar obert i a l\u2019ombra.',
    seg:'Un racó de la Costa Brava · 04.08.2026 · 10:51',
    nota:'Aquí hi hauria d\u2019anar una coordenada. No hi anirà. Qui hi ha estat, la reconeix.' },

  /* La Sandàlia de les Set s'ha tret del catàleg el 7 d'agost del 2026
     (doc 18 · decisió D1, explicada al doc 19 §4.5): el calçat no és una peça
     de roba amb sola, és una indústria a part —forma per número, MOQ per
     número i fàbriques diferents—. La fitxa es conserva a _ARXIU. */
  { id:'ultima', nom:'Vestit d\u2019Última Llum', cat:'dona', tipus:'Vestit', preu:205,
    im:'img/IA_vestit.jpg', imTipus:'producte', etq:'Fons', hora:'18:00 → 23:00',
    dv:'Llarg, de tirant ample i caiguda recta. Esquena descoberta i davant cobert: es porta ' +
       'damunt del banyador i es queda per sopar.',
    perque:'Pels vint-i-cinc minuts que la marca ven i que no tornen. Cau, no s’aguanta: a aquesta hora la roba ha de fer el mateix que el cel.',
    fitxa:{'Fibra':'Lli fi rentat','Gramatge':'140 g/m²','Teixit a':'Europa · per tancar',
           'Cosit a':'Catalunya o Portugal · per tancar','Silueta':'Recta, no marca','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Renta\u2019l a mà i penja\u2019l moll: s\u2019estira sol.',
    seg:'Cala Moreta, Begur · 09.09.2024 · 19:36 · 41,9778 N 3,2097 E' },

  { id:'marea', nom:'Banyador de Marea', cat:'dona', tipus:'Bany', preu:115,
    im:'img/IA_marea.jpg', imTipus:'producte', etq:'Fons', hora:'09:00 → 21:00',
    dv:'Una peça, escot quadrat, esquena creuada i doble capa. Sosté sense semblar ortopèdic, ' +
       'i fins a la XXL des del primer dia.',
    perque:'Puja i baixa, com l’aigua. I com el cos, que no és el mateix cada estiu. Talla alta i esquena sencera: subjecta sense estrènyer.',
    fitxa:{'Fibra':'Poliamida reciclada','Gramatge':'200 g/m² doble capa',
           'Tirants':'Amples i regulables','Acabat':'Mat, sense brillantor',
           'Marcatge':'Etiqueta teixida interior','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Esbandeix-lo amb aigua dolça i asseca\u2019l a l\u2019ombra.',
    seg:'Sant Antoni de Calonge · 02.08.2026 · 12:02 · 41,8326 N 3,0922 E' },

  { id:'sal', nom:'Bikini de Sal', cat:'dona', tipus:'Bany', preu:105,
    im:'img/IA_bikini.jpg', imTipus:'producte', etq:'Fons', hora:'09:00 → 20:00',
    dv:'Top d\u2019aro suau i braga de talle mitjà, tots dos de doble capa i acabat mat. Es ven ' +
       'per conjunt, però les talles es trien per separat.',
    perque:'La sal és el que et queda a la pell quan surts, i el que ha d’aguantar el teixit. Doble capa, perquè un bikini es jutja moll i no sec.',
    fitxa:{'Fibra':'Poliamida reciclada','Gramatge':'190 g/m² doble capa',
           'Top':'Aro suau, tirant regulable','Braga':'Talle mitjà, cobertura mitjana',
           'Acabat':'Mat','Talles':'XS–XXL, per separat'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Esbandeix-lo amb aigua dolça i asseca\u2019l a l\u2019ombra.',
    seg:'Cala dels Capellans, Sant Antoni de Calonge · 04.08.2026 · 10:53 · 41,8365 N 3,0936 E' },

  { id:'fons', nom:'Banyador de Fons', cat:'home', tipus:'Bany', preu:95,
    im:'img/OR_esquena.jpg', imTipus:'lloc', imNota:'Encara no tenim aquesta peça fotografiada. Això és s’Alguer, que és d’on ve el seu nom i on es farà la sessió.', etq:'Fons', hora:'09:00 → 21:00',
    dv:'Curt, 15 cm d\u2019entrecama. Teixit mat i llis, sense estampat: es pot portar sota una ' +
       'camisa oberta a taula sense que sembli que véns de la platja.',
    perque:'Aigua fonda, i res a ensenyar. També és del Fons del catàleg: no marxarà cap estiu, i el podràs reposar igual d’aquí a cinc.',
    fitxa:{'Fibra':'Poliamida reciclada','Gramatge':'190 g/m²','Entrecama':'15 cm',
           'Forro':'Reciclat','Butxaques':'Dues laterals i una posterior amb ullet','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Esbandeix-lo amb aigua dolça i asseca\u2019l a l\u2019ombra.',
    seg:'s\u2019Alguer, Palamós · 21.08.2023 · 19:46 · 41,8617 N 3,1512 E' },

  { id:'garbi', nom:'Banyador de Garbí', cat:'home', tipus:'Bany', preu:105,
    im:'img/ALG_dalt.jpg', imTipus:'lloc', imNota:'Encara no tenim aquesta peça fotografiada. Això és s’Alguer, que és el lloc que li correspon.', etq:'Fons', hora:'09:00 → 21:00',
    dv:'Llarg, 22 cm d\u2019entrecama, just sobre el genoll. Mateix teixit i mateix acabat mat ' +
       'que el de Fons, per a qui no vol anar curt.',
    perque:'El garbí és el vent de mar de la tarda: bufa quan encara ets a l’aigua. I quan surts, aquest s’asseca abans que arribis a la tovallola.',
    fitxa:{'Fibra':'Poliamida reciclada','Gramatge':'190 g/m²','Entrecama':'22 cm',
           'Forro':'Reciclat','Butxaques':'Dues laterals i una posterior amb ullet','Talles':'XS–XXL'},
    colors:['Sal','Lli cru','Verd de pi','Roca','Nit'], carta:['Ambre 20:39','Rosa 19:35','Blava 20:49'],
    cura:'Esbandeix-lo amb aigua dolça i asseca\u2019l a l\u2019ombra.',
    seg:'s\u2019Alguer, Palamós · 14.09.2024 · 19:03 · 41,8617 N 3,1512 E' }
];

/* ── EL TERRITORI · nou llocs, tots amb fotografia i coordenades pròpies ── */
const LLOCS = [
  { nom:'Port Bo', mun:'Calella de Palafrugell', coord:'41,8886 N · 3,1848 E',
    quan:'13 de setembre · 18:39', min:'−81 min', im:'img/CAL_voltes.jpg', nivell:'lloc',
    tx:'Les voltes fan ombra abans que el sol se’n vagi. És l’únic lloc de la costa on pots '+
       'passar de l’aigua a una taula sense sortir del mateix carrer.',
    peca:'Camisa de les Vuit', pid:'vuit' },

  { nom:'s’Alguer', mun:'Palamós', coord:'41,8617 N · 3,1512 E',
    quan:'21 d’agost · 19:46', min:'−54 min', im:'img/OR_esquena.jpg', nivell:'lloc',
    tx:'Barraques de pescadors damunt la roca, sense carretera. Aquí no hi ha res a fer i '+
       'per això s’hi està tan bé.',
    peca:'Banyador de Fons', pid:'fons' },

  { nom:'Cala Moreta', mun:'Begur', coord:'41,9778 N · 3,2097 E',
    quan:'9 de setembre · 19:36', min:'−31 min', im:'img/OR_moreta.jpg', nivell:'lloc',
    tx:'La roca vermella encesa per l’última llum, i la sorra que la retorna. Trenta-un minuts '+
       'abans que el sol entri a l’aigua.',
    peca:'Vestit d’Última Llum', pid:'ultima' },

  { nom:'Sa Tuna', mun:'Begur', coord:'41,9598 N · 3,2296 E',
    quan:'9 de setembre · 19:06', min:'−61 min', im:'img/TUN_barques.jpg', nivell:'lloc',
    tx:'Cases blanques al voltant d’una cala, i barques a l’aigua encara. La postal existeix; '+
       'el que no existeix és la pressa.',
    peca:'Camisa de Bany', pid:'bany' },

  { nom:'Aigua Xelida', mun:'Palafrugell', coord:'41,9222 N · 3,2172 E',
    quan:'17 de maig · 18:47', min:'−135 min', im:'img/DIA_xelida.jpg', nivell:'lloc',
    tx:'Dues parets de roca i un pas d’aigua fonda entremig. Probablement el nom més bonic '+
       'de la costa: aigua gelada, dit com es deia abans.',
    peca:'Pantaló de Ronda', pid:'ronda' },

  { nom:'Cala dels Capellans', mun:'Sant Antoni de Calonge', coord:'41,8365 N · 3,0936 E',
    quan:'4 d’agost · 10:52', min:'matí', im:'img/MAT_granit.jpg', nivell:'lloc',
    tx:'Granit rosat, aigua que hi entra i en surt, i cap sorra. És d’aquí que surt el color '+
       'de la tovallola, i la idea que sota tot plegat sempre hi ha pedra.',
    peca:'Tovallola de Granit', pid:'granit' },

  { nom:'Far de Palamós', mun:'Sant Joan de Palamós', coord:'41,8415 N · 3,1291 E',
    quan:'1 de setembre · 20:08', min:'−13 min', im:'img/OR_grua.jpg', nivell:'lloc',
    tx:'El port de treball amb les grues retallades contra la posta. Aquí no hi ha postal: '+
       'hi ha ofici, que és el que volem que tingui la roba.',
    peca:'Camisa de les Vuit', pid:'vuit' },

  { nom:'Cap Roig', mun:'Calonge i Sant Antoni', coord:'41,8265 N · 3,0830 E',
    quan:'29 de setembre · 19:28', min:'−6 min', im:'img/HERO.jpg', nivell:'lloc',
    tx:'L’illot amb el pi, sis minuts abans de la posta. És la fotografia que hi havia abans '+
       'que hi hagués marca. No la de Calella: la de Calonge, que és una altra.',
    peca:'Banyador de Marea', pid:'marea' },

  { nom:'el Racó', mun:'Un racó de la Costa Brava', coord:'—',
    quan:'4 d’agost · 10:51', min:'—', im:'img/MAT_peu2.jpg', nivell:'secret',
    tx:'Aquí hi hauria d’anar un nom i unes coordenades. No hi aniran. Tothom d’aquí té una '+
       'cala que no diu, i no dir-la també és una manera d’estimar-la.',
    peca:'el Racó', pid:'raco' }
];

/* ── COM VIVIM · moments, no models ───────────────────────────────────── */
const MOMENTS = [
  { t:'Al matí aquesta costa encara no és de ningú',
    im:'img/DIA_ocell.jpg', seg:'Cala dels Capellans, Sant Antoni de Calonge · 10:08',
    tx:'Un ocell damunt d’un còdol i el mar pla com un full. A aquesta hora hi ha quatre '+
       'persones i totes es coneixen de vista. Hi ha dies que el pla és no tenir-ne.' },

  { t:'S’hi baixa a peu, i això ja tria qui hi va',
    im:'img/ALG_dalt.jpg', seg:'s’Alguer, Palamós · 19:03 · −56 min',
    tx:'Vint minuts de camí i una baixada de pedra. Qui hi arriba porta poca cosa: una '+
       'tovallola, un llibre i una camisa per després. Els que hi van cada any ja saben '+
       'en quina roca seu cadascú.' },

  { t:'Flotar és la manera més barata de no dir res',
    video:'video/flotar.mp4', poster:'video/flotar.jpg', ample:true,
    seg:'Un racó de la Costa Brava · migdia',
    tx:'De cara amunt, les orelles sota l’aigua, el so que desapareix. Al costat hi ha algú '+
       'fent exactament el mateix i no cal dir-s’ho. Deu segons així i el dia ja ha valgut la pena.' },

  { t:'Les cases són blanques perquè es tornen la llum',
    im:'img/CAL_balco.jpg', seg:'Port Bo, Calella de Palafrugell · 18:35 · −85 min',
    tx:'Les façanes retornen la llum del carrer quan el sol ja és baix. Per això aquí es viu '+
       'a fora fins tard, i per això la nostra paleta ve d’aquesta paret i no d’una tendència.' },

  { t:'Es torna amb sal a la pell, i sense pressa',
    im:'img/VIU_tamariu.jpg', seg:'Tamariu, Palafrugell · 19:43',
    tx:'La roba d’estiu que funciona és la que aguanta la sal sense fer-se malbé i sense '+
       'fer-te sentir que vas de platja quan ja no hi ets.' },

  { t:'I al final tothom mira cap al mateix cantó',
    im:'img/OR_port.jpg', ample:true, seg:'Sant Joan de Palamós · 19:55 · −10 min',
    tx:'No hi ha res a fer, i és el que es fa. Deu minuts. És l’únic moment del dia en què un '+
       'poble sencer mira cap a la mateixa banda sense que ningú ho hagi organitzat. Després '+
       'la gent es gira i se’n va a sopar.' },

  { t:'La barca és de treball, no de cap altra cosa',
    im:'img/CAL_barca.jpg', seg:'Port Bo, Calella de Palafrugell · 18:36 · −84 min',
    tx:'Blau i vermell damunt la sorra, i encara surt. És el que fa que això no sigui Eivissa. '+
       'Els que la treuen tenen l’edat de la gent per a qui fem la roba.' },

  { t:'Un carrer que baixa i acaba on acaben tots',
    im:'img/CAL_carrer.jpg', seg:'Port Bo, Calella de Palafrugell · 18:41',
    tx:'A Calella no et pots perdre: si baixes, arribes. Aquests pobles estan fets perquè '+
       'tothom acabi al mateix punt a la mateixa hora sense haver de quedar.' },

  { t:'I a les nou, les taules',
    im:'img/CAL_taules.jpg', ample:true, seg:'Port Bo, Calella de Palafrugell · 18:33 · −87 min',
    tx:'Ningú s’ha canviat: tothom porta el que portava a la platja, però assecat. Hi ha avis, '+
       'hi ha criatures i hi ha qui ha vingut caminant des de la cala. Això és exactament el '+
       'problema que la marca resol —i és, també, per a qui el resol.' }
];


/* ── ELS CODIS DE LA MARCA ────────────────────────────────────────────── */
const PALETA = [
  { g:'La llum que queda', c:[
    ['Sal','#F5F1E9'],['Lli','#E6DCC7'],['Llum d’or','#F2DFC0'],['Verd de pi','#6E7563']] },
  { g:'L’hora d’or', c:[
    ['Or','#E3A93E'],['Ambre','#C8802F'],['Coral','#E27A54'],['Terracota','#BE6440']] },
  { g:'L’hora màgica', c:[
    ['Rosa horabaixa','#E2A08B'],['Malva','#9C7E92'],['Escuma','#DCD8CE'],['Plata','#AEB8B4']] },
  { g:'L’hora blava', c:[
    ['Blau migjorn','#4A7C96'],['Hora blava','#3C5A78'],['Vespre','#22384E'],['Tinta','#1B2A38']] }
];

const CODIS = [
  { n:'01', t:'El sol mig post',
    tx:'El símbol és mig cercle i una línia. No és una posta: és el moment exacte en què el '+
       'sol i l’aigua es toquen. Es fa amb dues tintes i mai amb color.' },
  { n:'02', t:'Dues tintes, mai una tercera',
    tx:'A cada suport hi ha un fons i una tinta. Si una peça necessita tres colors per '+
       'funcionar, la peça està mal resolta.' },
  { n:'03', t:'Cap ombra, cap cantonada arrodonida',
    tx:'Res no flota ni es fa el tou. La geometria és seca perquè la llum ja fa la feina de '+
       'suavitzar-ho tot.' },
  { n:'04', t:'Un sol accent per pàgina',
    tx:'El color s’administra com la llum: si tot brilla, no brilla res. Un accent, i la resta '+
       'en la família del lli.' },
  { n:'05', t:'La fotografia porta l’hora',
    tx:'Cada imatge diu on és, quin dia i quants minuts li falten al sol. Si no ho podem dir, '+
       'diem «un racó de la Costa Brava». Mai ens l’inventem.' },
  { n:'06', t:'Pensada per a una hora, feta per a tot el dia',
    tx:'L’horabaixa és d’on ve la marca, no l’horari de la roba. Cada peça es posa al matí i '+
       'es treu de nit; el que fa l’última hora de llum és marcar el llistó. Si una peça no hi '+
       'arriba digna, no la fem.' },
  { n:'07', t:'Marcatge to sobre to',
    tx:'La marca no es llegeix des de l’altra punta de la platja. Va teixida, o brodada del '+
       'mateix color, o a dins.' }
];

const FILTRES_MARCA = [
  ['Podria ser d’Eivissa?', 'Si la resposta és sí, no és nostre. Aquí hi ha pins, granit i vent de garbí, no palmeres.'],
  ['Es veu l’hora?', 'Si la imatge podria ser de qualsevol moment del dia, no entra.'],
  ['Hi ha més d’un accent de color?', 'Si n’hi ha dos, en sobra un.'],
  ['Passa el test de les dues hores?', 'La peça ha de servir de les set a les nou sense passar per casa.'],
  ['Es podria dir en veu alta a taula?', 'Si el text fa vergonya llegit en veu alta, es reescriu.']
];

/* ── EL MANIFEST ───────────────────────────────────────────────────────
   Nou línies fixes. No es reescriuen, no es tradueixen a l'engròs i no
   s'hi afegeix res: si algun dia calgués una desena, és que una de les
   nou ha deixat de ser certa. Van a l'interior de la tapa de la capsa,
   al dors del certificat i a la primera pàgina de qualsevol dossier.
──────────────────────────────────────────────────────────────────────── */
const MANIFEST = [
  'No venem un lloc. Venem una hora.',
  'Hi ha una hora, cada dia, en què el Mediterrani es torna un altre lloc. '+
    'Dura entre setanta i noranta minuts i no torna.',
  'Les formes no caduquen. El color té data.',
  'Cap color sense una fotografia que el sostingui, amb el lloc i el minut.',
  'L’única cosa que brilla és el que està moll.',
  'La roba bona és la que desapareix.',
  'Fem poques coses i les fem durar. La pressa és d’una altra marca.',
  'El que no sabem, no ho diem. Quan no en tenim prou certesa, diem '+
    '«un racó de la Costa Brava».',
  'Nosaltres no hi serem el dia que te la posis. L’hora, sí.'
];
