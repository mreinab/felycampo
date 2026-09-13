/* Datos de /blog. La mayoría son entradas de relleno para poder
   maquetar y revisar el diseño (ver respuesta del cliente a la
   pregunta de diseño), con fotos reales ya usadas en otras páginas
   del sitio (Runway/talleres/manifiesto) en vez de imágenes rotas —
   se sustituyen por contenido real más adelante sin tocar el diseño.
   "mbfw-madrid-tempore" es distinta: texto real de encargo (crónica
   de la 77ª MBFWMadrid, tal cual la mandó el cliente, con typos de
   temporada del original normalizados a "23/24"), usada como ejemplo
   completo de BlogArticulo en su forma "bloques" — ver esa entrada
   para los seis tipos de bloque en uso (fotos son placeholder, el
   texto no), en particular "galeria" repetida varias veces: EL patrón
   a seguir en cualquier post futuro es texto (uno o más "parrafo"/
   "titulo"/"cita") seguido de una "galeria" de 2, 3 o 4 columnas, una
   y otra vez — no fotos sueltas ("imagen") intercaladas entre cada
   párrafo como en un primer borrador de esta entrada. OJO con
   cualquier imagen nueva de
   about-felycampo/: hay un archivo (elmundodefelycampo-ladiseñadora-
   felycampo.webp) guardado en disco con la "ñ" en forma Unicode NFD,
   que Next.js no sirve (404 pese a "existir") — evitarlo.

   Tres tipos de entrada en un único listado ("tipo": "articulo" |
   "podcast" | "campana", ver page.js) — misma cuadrícula editorial
   que /colecciones-fely-campo, con una pestaña Todo/Blog/Podcast para
   filtrar (querystring ?tipo=, sin JS: ver page.js — "campana" cae
   dentro de "Todo", sin pestaña propia: de momento es una plantilla
   puntual, no una categoría habitual del blog). Cada entrada enlaza a
   /blog/[slug], que renderiza BlogArticulo, BlogPodcast o BlogCampana
   según "tipo" (ver [entrada]/page.js) — layouts propios, no una
   copia de la ficha de colección de Runway (mismos tokens de diseño,
   maquetado distinto en cada uno: lectura larga / reproductor +
   notas del episodio / historia de campaña a pantalla completa).

   "articulo": LA plantilla del blog, pensada para repetirse en
   cualquier post futuro — "bloques" es un array ORDENADO, cada uno
   tipado por su "tipo": "parrafo" | "titulo" (subtítulo de sección) |
   "cita" (destacada, serif) | "imagen" (foto suelta con pie opcional)
   | "galeria" (2/3/4 columnas de fotos, la pieza "imágenes debajo del
   texto" del patrón repetible) | "video" (maqueta visual, sin vídeo
   real) — ver los @typedef de BlogArticulo.jsx para la forma exacta
   de cada uno. "autor" es opcional (byline en la cabecera, junto a
   categoría/fecha).

   "podcast": sin "cuerpo" largo — "notas" son las notas del episodio
   (1-2 párrafos) + "duracion" e "invitada" (opcional) para la cabecera
   del reproductor (todavía sin audio real, ver BlogPodcast.jsx).

   "campana": sin "cuerpo" — todo el contenido de la plantilla vive en
   "campana.creditos" + "campana.bloques" (ver los @typedef de
   BlogCampana.jsx para la forma exacta de cada tipo de bloque:
   "split" | "hero" | "texto-sobre-imagen" | "texto-centrado"). Los
   "ctaHref" de este ejemplo apuntan a /tienda (catálogo general) en
   vez de a una ficha de producto concreta — productosEjemplo.js no
   tiene productos con nombre real que enlazar de forma fiable. */

export const BLOG_ENTRADAS = [
  {
    slug: 'manifiesto-coleccion-ibiza',
    tipo: 'articulo',
    fecha: '2026-06-12',
    imagenCubierta: '/img/collections/runway/fw27-lacoleccion/backstage/HERO-2.jpg',
    categoria: { es: 'Runway', en: 'Runway' },
    titulo: {
      es: 'El manifiesto detrás de la colección de Ibiza',
      en: 'The manifesto behind the Ibiza collection',
    },
    resumen: {
      es: 'Luz y oscuridad, fuerza y calma: cómo un poema escrito antes de cortar el primer patrón terminó definiendo toda la colección.',
      en: 'Light and darkness, strength and calm: how a poem written before the first pattern was cut ended up defining the whole collection.',
    },
    bloques: [
      {
        tipo: 'parrafo',
        texto: {
          es: 'Antes de que se cortara un solo patrón, ya existía un texto. Fely lo escribió una noche, de un tirón, después de volver de la sierra de Salamanca con la cabeza llena de piedra, luz y telares. Ese texto —más cerca del verso que de la nota de prensa habitual— se convirtió en la brújula de toda la colección que después se presentó en Ibiza.',
          en: 'Before a single pattern was cut, the text already existed. Fely wrote it one night, in one sitting, after coming back from the Sierra de Salamanca with her head full of stone, light and looms. That text — closer to verse than to the usual press note — became the compass for the whole collection that was later presented in Ibiza.',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: '"No quería ilustrar una temporada de moda", cuenta. "Quería que cada prenda respondiera a una pregunta muy concreta: ¿qué pasa cuando la luz atraviesa algo duro?". De ahí el blanco y negro como punto de partida, y el dorado como el único color que se permitió entrar, siempre como un destello, nunca como protagonista.',
          en: '"I didn\'t want to illustrate a fashion season," she says. "I wanted every garment to answer one very specific question: what happens when light cuts through something hard?" That\'s where black and white came from as a starting point, and gold as the only colour allowed in, always as a flash, never as the lead.',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'El resultado en pasarela fue literal: patronaje excepcional, tejidos únicos y la firma de las mujeres que cosen en los talleres de la sierra, transformando un oficio centenario en una manera propia de sostener el futuro. Cada pieza, pensada para durar toda una vida — en el armario por su belleza, y en quien la lleva por su historia.',
          en: 'On the runway, the result was literal: exceptional patternmaking, singular fabrics, and the signature of the women who sew in the workshops of the sierra, turning a century-old craft into their own way of holding up the future. Every piece made to last a lifetime — in the wardrobe for its beauty, and in the person who wears it for its story.',
        },
      },
    ],
  },
  {
    slug: 'oficio-costureras-castilla-y-leon',
    tipo: 'articulo',
    fecha: '2026-05-04',
    imagenCubierta: '/img/talleres/taller-1/IMG_9719.JPG',
    categoria: { es: 'Oficio', en: 'Craft' },
    titulo: {
      es: 'Dentro del taller: el oficio de las costureras de Castilla y León',
      en: 'Inside the workshop: the craft of the seamstresses of Castilla y León',
    },
    resumen: {
      es: 'Veintidós mujeres, repartidas en varios pueblos de la sierra, cosen cada temporada de Fely Campo. Esta es la historia de ese equipo.',
      en: 'Twenty-two women, spread across several villages in the sierra, sew every Fely Campo season. This is the story of that team.',
    },
    bloques: [
      {
        tipo: 'parrafo',
        texto: {
          es: 'La primera vez que Fely entró en un taller de costura tenía 13 años. Más de cincuenta años después, la firma sigue trabajando con talleres de esa misma comarca — ahora un equipo de 22 mujeres costureras que confeccionan cada colección a mano, en los pueblos donde han vivido siempre.',
          en: 'The first time Fely walked into a sewing workshop she was 13 years old. More than fifty years later, the firm still works with workshops from that same area — now a team of 22 seamstresses who make every collection by hand, in the villages where they have always lived.',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'No es un gesto nostálgico: es una decisión de calidad. El patronaje de cada prenda se ajusta y revisa en persona, temporada tras temporada, en una relación que en algunos casos lleva más de una década. "Se nota en la prenda", dice Fely. "Se nota en cómo cae, en cómo dura".',
          en: 'It isn\'t a nostalgic gesture: it\'s a quality decision. Each garment\'s pattern is fitted and checked in person, season after season, in relationships that in some cases go back more than a decade. "You can feel it in the garment," Fely says. "You can feel it in how it falls, in how it lasts."',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Este artículo abre una serie que iremos publicando en el blog: retratos del equipo detrás de cada colección, taller a taller, para poner nombre y cara a un trabajo que casi siempre queda oculto detrás de la etiqueta.',
          en: "This piece opens a series we'll be publishing on the blog: portraits of the team behind every collection, workshop by workshop, to put a name and a face to work that almost always stays hidden behind the label.",
        },
      },
    ],
  },
  {
    slug: 'de-salamanca-a-paris-primera-maleta',
    tipo: 'articulo',
    fecha: '2026-03-18',
    imagenCubierta: '/img/about-felycampo/fely-campo-conoce-a-la-disenadora.jpg',
    categoria: { es: 'Historia', en: 'History' },
    titulo: {
      es: 'De Salamanca a París: la primera maleta de Fely Campo',
      en: 'From Salamanca to Paris: Fely Campo\'s first suitcase',
    },
    resumen: {
      es: 'En 2003 Fely metió una colección entera en dos maletas y viajó a la feria Who\'s Next. No sabía que ese viaje cambiaría la firma para siempre.',
      en: 'In 2003 Fely packed an entire collection into two suitcases and travelled to the Who\'s Next trade fair. She didn\'t know that trip would change the firm forever.',
    },
    bloques: [
      {
        tipo: 'parrafo',
        texto: {
          es: 'Han pasado más de veinte años, pero Fely todavía recuerda el peso exacto de esas dos maletas. Dentro iba una colección completa, pensada para una tienda de Salamanca, que de pronto se veía frente a los compradores internacionales de una de las ferias más importantes de París.',
          en: "More than twenty years have gone by, but Fely still remembers the exact weight of those two suitcases. Inside was a complete collection, designed for a shop in Salamanca, suddenly facing the international buyers of one of Paris's most important trade fairs.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'El tercer día, una tienda de Kuwait hizo un pedido. Fue suficiente para volver. Y volvió, durante siete colecciones seguidas, hasta que Who\'s Next dejó de ser un experimento y se convirtió en la puerta de entrada a la expansión internacional de la marca.',
          en: "On the third day, a shop from Kuwait placed an order. That was enough to make her go back. And she did, for seven collections running, until Who's Next stopped being an experiment and became the gateway to the brand's international expansion.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Hoy Fely Campo se distribuye en España, Italia, Reino Unido e Irlanda, Francia, Bélgica, Suiza y Alemania. Pero todo, cuenta Fely entre risas, "empezó con dos maletas y muchísimos nervios".',
          en: 'Today Fely Campo is distributed in Spain, Italy, the United Kingdom and Ireland, France, Belgium, Switzerland and Germany. But it all, Fely says with a laugh, "started with two suitcases and an awful lot of nerves."',
        },
      },
    ],
  },
  {
    slug: 'podcast-01-crear-sin-pedir-permiso',
    tipo: 'podcast',
    // Episodio destacado de la cuadrícula de /blog (ver page.js,
    // BlogTarjetaPodcastDestacado) — tarjeta a pantalla completa estilo
    // Spotify (portada + título + botón), no un reproductor real:
    // enlaza a la ficha del episodio (BlogPodcast, con su propia
    // maqueta de reproductor, ver ese componente). Solo un episodio
    // puede llevar "destacado" — page.js no contempla más de uno.
    destacado: true,
    fecha: '2026-04-22',
    // Nota: NO la foto de about-felycampo con "ñ" en el nombre de
    // archivo (elmundodefelycampo-ladiseñadora-felycampo.webp) — ese
    // archivo está guardado en disco con la "ñ" en forma NFD (Unicode
    // "n" + tilde combinante, ver about-felycampo/README si se añade
    // uno) y el servidor de Next.js no la sirve: 404 en dev pese a
    // "existir" (mismo motivo, muy probablemente, por el que se quitó
    // de /sobre-fely a petición del cliente). Evitar esa ruta en
    // cualquier imagen nueva hasta que se renombre el archivo en disco
    // a ASCII.
    imagenCubierta: '/img/collections/runway/fw27-lacoleccion/backstage/FRAMAE_STUDIO_FELY_CAMPO_036.jpg',
    categoria: { es: 'Podcast', en: 'Podcast' },
    episodio: 1,
    duracion: '34 min',
    titulo: {
      es: 'Crear sin pedir permiso',
      en: 'Creating without asking permission',
    },
    resumen: {
      es: 'Fely Campo habla del taller de costura donde empezó todo, del salto a París y de qué significa hoy dirigir su propia firma.',
      en: 'Fely Campo talks about the sewing workshop where it all began, the leap to Paris, and what it means today to run her own label.',
    },
    notas: {
      es: [
        'En el primer episodio de El mundo de Fely Campo, la propia diseñadora se sienta a repasar su trayectoria: los 13 años en el taller de costura de Salamanca, la apertura de su primera tienda y el momento en que decidió que su firma tenía que salir de España.',
        'Una conversación sin guion sobre el oficio, la comunidad de mujeres que cose cada colección y lo que significa, después de más de cinco décadas, seguir eligiendo la moda cada mañana.',
      ],
      en: [
        "In the first episode of El mundo de Fely Campo, the designer herself sits down to look back at her journey: the years at 13 at the sewing workshop in Salamanca, opening her first store, and the moment she decided her label had to step outside Spain.",
        "An unscripted conversation about the craft, the community of women who sew every collection, and what it means, after more than five decades, to keep choosing fashion every morning.",
      ],
    },
  },
  {
    slug: 'podcast-02-manos-detras-de-cada-prenda',
    tipo: 'podcast',
    fecha: '2026-05-20',
    imagenCubierta: '/img/talleres/taller-2/IMG_9844.JPG',
    categoria: { es: 'Podcast', en: 'Podcast' },
    episodio: 2,
    duracion: '41 min',
    invitada: { es: 'Equipo de costura de Castilla y León', en: 'The sewing team of Castilla y León' },
    titulo: {
      es: 'Las manos detrás de cada prenda',
      en: 'The hands behind every garment',
    },
    resumen: {
      es: 'Tres costureras del equipo de Fely Campo cuentan cómo es coser una colección entera a mano, temporada tras temporada.',
      en: 'Three seamstresses from the Fely Campo team talk about what it takes to hand-sew an entire collection, season after season.',
    },
    notas: {
      es: [
        'Rara vez se escucha esta parte de la historia: en este episodio, tres mujeres del equipo de costura de la sierra de Salamanca cuentan cómo llegaron al oficio, cómo es un día de trabajo en temporada alta y qué prenda de las que han cosido recuerdan con más cariño.',
        'Una charla íntima grabada en uno de los talleres, con el ruido de fondo de las máquinas de coser que normalmente solo escuchan ellas.',
      ],
      en: [
        "This side of the story is rarely heard: in this episode, three women from the sewing team in the Sierra de Salamanca talk about how they came to the craft, what a working day looks like during peak season, and which garment they've sewn that they remember most fondly.",
        'An intimate conversation recorded inside one of the workshops, with the background hum of sewing machines that usually only they get to hear.',
      ],
    },
  },
  {
    // Tercer tipo de entrada: "campana" — renderiza BlogCampana.jsx
    // (ver components/layout/, plantilla editorial reutilizable de
    // "historia de campaña"). Todo lo que consume ese componente vive
    // en "campana" abajo: "creditos" (overlay fijo) + "bloques"
    // (array ordenado, cada uno tipado por su propio "tipo" — ver los
    // @typedef de BlogCampana.jsx para el detalle de cada forma).
    // "ctaHref" de cada bloque apunta a /tienda en vez de a una ficha
    // de producto concreta: los productos de ejemplo del catálogo
    // (productosEjemplo.js) no tienen nombres reales que enlazar de
    // forma fiable — se sustituye por el enlace real cuando haya
    // contenido de encargo.
    slug: 'campana-fw27-la-coleccion',
    tipo: 'campana',
    fecha: '2026-02-10',
    imagenCubierta: '/img/collections/runway/fw27-lacoleccion/FelyCampo_04.webp',
    categoria: { es: 'Campaña', en: 'Campaign' },
    titulo: {
      es: 'La Colección, FW27 — campaña completa',
      en: 'La Colección, FW27 — full campaign',
    },
    resumen: {
      es: 'Luz y oscuridad, atravesadas por un dorado vibrante: recorre la campaña completa de La Colección, look a look.',
      en: 'Light and darkness, cut through by a vibrant gold: walk through the full La Colección campaign, look by look.',
    },
    campana: {
      creditos: {
        equipo: [
          { rol: { es: 'Fotografía', en: 'Photography' }, nombre: 'Kristen Wicce' },
          { rol: { es: 'Ayudante', en: 'Assistant' }, nombre: 'Marta Rubio' },
          { rol: { es: 'Maquillaje', en: 'Make-up' }, nombre: 'Sara Domínguez' },
          { rol: { es: 'Modelo', en: 'Model' }, nombre: 'Elena Vázquez' },
        ],
        meta: [
          { etiqueta: { es: 'Look', en: 'Look' }, valor: '04' },
          { etiqueta: { es: 'Temporada', en: 'Season' }, valor: 'FW27' },
          { etiqueta: { es: 'Localización', en: 'Location' }, valor: 'Salamanca' },
        ],
        pie: {
          es: 'Vestido de la campaña — disponible en la Colección FW27',
          en: 'Dress featured in the campaign — available in the FW27 Collection',
        },
        productoHref: '/tienda',
      },
      bloques: [
        {
          tipo: 'split',
          imagenProducto: '/img/ecommerce/FC-3.webp',
          altProducto: 'Fely Campo — La Colección FW27',
          ctaHref: '/tienda',
          imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_09.webp',
          alt: 'Fely Campo — La Colección FW27',
        },
        {
          tipo: 'hero',
          imagen: '/img/collections/runway/fw27-lacoleccion/backstage/HERO-2.jpg',
          alt: 'Fely Campo — La Colección FW27, backstage',
        },
        {
          tipo: 'texto-sobre-imagen',
          imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_14.webp',
          alt: 'Fely Campo — La Colección FW27',
          texto: {
            es: [
              'Cada temporada nace de una pregunta muy simple: ¿qué pasa cuando la luz atraviesa algo duro? La Colección FW27 responde con blanco y negro como punto de partida, y un dorado vibrante que se permite entrar solo como un destello.',
              'Patronaje excepcional, tejidos únicos y la firma de las mujeres que cosen en los talleres de la sierra de Salamanca — la misma comunidad de siempre, en cada prenda.',
            ],
            en: [
              'Every season starts from one simple question: what happens when light cuts through something hard? The FW27 Collection answers with black and white as a starting point, and a vibrant gold allowed in only as a flash.',
              'Exceptional patternmaking, singular fabrics, and the signature of the women who sew in the workshops of the Sierra de Salamanca — the same community as always, in every garment.',
            ],
          },
          ctaHref: '/tienda',
          imagenSecundaria: '/img/collections/runway/fw27-lacoleccion/FelyCampo_19.webp',
          altSecundaria: 'Fely Campo — La Colección FW27',
        },
        {
          tipo: 'texto-centrado',
          texto: {
            es: [
              'Piezas concebidas para durar toda una vida — en el armario por su belleza, y en el corazón de quien las lleva por su historia. La Colección FW27 ya está disponible en todos nuestros puntos de venta y en el atelier de Salamanca.',
            ],
            en: [
              'Pieces conceived to last a lifetime — in the wardrobe for their beauty, and in the heart of the woman who wears them for their story. The FW27 Collection is now available at all our points of sale and at the Salamanca atelier.',
            ],
          },
          ctaHref: '/tienda',
        },
      ],
    },
  },
  {
    slug: 'mbfw-madrid-tempore',
    tipo: 'articulo',
    fecha: '2026-02-18',
    imagenCubierta: '/img/collections/runway/fw27-lacoleccion/FelyCampo_03.webp',
    categoria: { es: 'Desfile', en: 'Fashion Show' },
    autor: { es: 'Equipo Fely Campo', en: 'Fely Campo Team' },
    titulo: {
      es: 'Los secretos detrás de una pasarela de moda: nuestra experiencia en Mercedes-Benz Fashion Week Madrid',
      en: 'The secrets behind a fashion show: our experience at Mercedes-Benz Fashion Week Madrid',
    },
    resumen: {
      es: 'Backstage, fitting, front row y Kissing Room: así vivimos nuestra 77ª edición en Mercedes-Benz Fashion Week Madrid con la colección TEMPORE.',
      en: 'Backstage, fitting, front row and the Kissing Room: this is how we experienced our 77th Mercedes-Benz Fashion Week Madrid with the TEMPORE collection.',
    },
    bloques: [
      {
        tipo: 'parrafo',
        texto: {
          es: 'El pasado mes tuvo lugar la 77º Edición de la Pasarela MBFWMadrid, del 15 al 19 de febrero, con el apoyo del Ayuntamiento de Madrid a través de su programa Madrid Capital de Moda, y nuestra firma, como desde hace ya algunas temporadas, pudo estar de nuevo presente con nuestra última colección de prêt-à-porter de lujo.',
          en: 'Last month saw the 77th edition of the MBFWMadrid runway, held from 15 to 19 February with the support of Madrid City Council through its Madrid Capital de Moda programme, and our firm, as it has for several seasons now, was once again present with our latest luxury prêt-à-porter collection.',
        },
      },
      {
        tipo: 'imagen',
        imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_05.webp',
        alt: 'Fely Campo en Mercedes-Benz Fashion Week Madrid',
        caption: { es: 'Foto: Gus Geijo', en: 'Photo: Gus Geijo' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Mercedes-Benz Fashion Week Madrid es la gran pasarela de la moda de España, se trata del evento por excelencia y el gran exponente de la moda de autor de nuestro país.',
          en: "Mercedes-Benz Fashion Week Madrid is Spain's great fashion runway — the event above all others, the leading showcase for Spanish designer fashion.",
        },
      },
      {
        tipo: 'imagen',
        imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_10.webp',
        alt: 'Fely Campo, 77º Edición Mercedes-Benz Fashion Week Madrid',
        caption: {
          es: 'Fely Campo, 77º Edición Mercedes-Benz Fashion Week Madrid',
          en: 'Fely Campo, 77th edition of Mercedes-Benz Fashion Week Madrid',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Como te contamos en nuestro post "Nagare SS2023: Un espectáculo sensorial" y como viene siendo habitual desde que participamos en esta pasarela, presentamos nuestra última colección de la línea "prêt-à-porter de lujo" de la diseñadora Fely Campo: TEMPORE.',
          en: 'As we told you in our post "Nagare SS2023: A Sensorial Show", and as has become customary since we started taking part in this runway, we presented the latest collection in designer Fely Campo\'s "luxury prêt-à-porter" line: TEMPORE.',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Pero esta edición ha sido aún si cabe más especial que la anterior, porque no solo pudimos presentar nuestra última colección, sino que L\'Oréal nos hizo partícipes de la fuerza femenina sobre la pasarela con Desfila Tu Valía.',
          en: "But this edition was even more special than the last, because we didn't just get to present our latest collection — L'Oréal also made us part of the show of female strength on the runway with Desfila Tu Valía.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Si no quieres perderte ningún detalle de lo que significó para nuestra directora creativa estar en esta edición en la pasarela, sigue leyendo.',
          en: "If you don't want to miss a single detail of what it meant for our creative director to be on the runway this season, keep reading.",
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'Nuestra colección: TEMPORE O/I 23/24', en: 'Our collection: TEMPORE FW 23/24' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'El pasado 18 de febrero volvimos a la gran cita de la moda española. En esta ocasión con una propuesta para el Otoño-Invierno 2023/2024, titulada TEMPORE, una colección que transcurre por la mañana, la tarde y la noche, por tres momentos, tres ritmos, tres emociones pero, sobre todo, por un día cualquiera.',
          en: 'On 18 February we returned to Spanish fashion\'s great appointment. This time with a proposal for Autumn-Winter 2023/2024 titled TEMPORE, a collection that moves through morning, afternoon and night — three moments, three rhythms, three emotions, but above all, an ordinary day.',
        },
      },
      {
        tipo: 'imagen',
        imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_12.webp',
        alt: 'TEMPORE — Fely Campo',
        caption: { es: 'Foto: Hugo Camera', en: 'Photo: Hugo Camera' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Tempore explora la fascinación que Fely Campo siente por las imágenes cotidianas que transitan en la vida de una mujer.',
          en: 'Tempore explores Fely Campo\'s fascination with the everyday images that run through a woman\'s life.',
        },
      },
      {
        tipo: 'cita',
        texto: {
          es: 'Con esta colección pretendo reflejar lo sensorial del acto de vestirse a diario, creo que aquello con lo que te vistes cambia la forma en que te sientes.',
          en: 'With this collection I want to reflect the sensory side of getting dressed every day — I believe what you wear changes how you feel.',
        },
        autor: { es: 'Fely Campo, diseñadora', en: 'Fely Campo, designer' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Una colección de 27 looks que, en su puesta en escena, adquiere la estructura poética de un Sijô coreano para crear una narración sobre el día a día que impacta en lo instantáneo, a través de tres tiempos, tres frases, tres composiciones en continuo movimiento.',
          en: 'A collection of 27 looks that, in its staging, takes on the poetic structure of a Korean Sijo to build a narrative about everyday life with an instant impact, told across three movements, three phrases, three compositions in constant motion.',
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'La mañana', en: 'Morning' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Un boceto sutil de la mañana, casi una helada en el amanecer, las primeras siluetas del día con tejidos tan esenciales como el paño o el tweed que florecen amarillos y cálidos en el cenit.',
          en: 'A subtle sketch of morning, almost a frost at dawn — the day\'s first silhouettes in essential fabrics like wool cloth and tweed, blooming warm and yellow by midday.',
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'La tarde', en: 'Afternoon' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Las tonalidades magentas y granates crean patrones vibrantes y las prendas adquieren volúmenes que contrastan con piezas más entalladas en tejidos como el tweed, el paño, los rasos, el tafetán y las gasas.',
          en: 'Magenta and garnet tones create vibrant patterns and the garments take on volumes that contrast with more fitted pieces in fabrics like tweed, wool cloth, satin, taffeta and chiffon.',
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'La noche', en: 'Night' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'La tercera, un centelleo en la oscuridad, una melodía de emociones atraviesa el armario femenino para teatralizar los volúmenes. Cabe destacar el vestido creado en colaboración con la artista Mónica de Vega, quien ha realizado un dibujo abstracto en pintura sobre seda inspirado en el concepto de la colección.',
          en: 'The third movement, a flicker in the dark: a melody of emotions runs through the female wardrobe to dramatise its volumes. Worth a special mention is the dress created in collaboration with artist Mónica de Vega, who painted an abstract silk design inspired by the concept of the collection.',
        },
      },
      {
        // Patrón repetible del template: texto (las tres secciones de
        // arriba) → imágenes debajo, en columnas (ver BlogArticulo.jsx,
        // bloque "galeria") — las tres fotos de mañana/tarde/noche
        // juntas en una sola fila de 3 columnas, en vez de una foto
        // suelta después de cada párrafo.
        tipo: 'galeria',
        columnas: 3,
        imagenes: [
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_14.webp',
            alt: 'TEMPORE — La mañana',
            caption: { es: 'La mañana. Foto: Hugo Camera', en: 'Morning. Photo: Hugo Camera' },
          },
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_16.webp',
            alt: 'TEMPORE — La tarde',
            caption: { es: 'La tarde. Foto: Hugo Camera', en: 'Afternoon. Photo: Hugo Camera' },
          },
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_18.webp',
            alt: 'TEMPORE — La noche',
            caption: { es: 'La noche. Foto: Hugo Cámera', en: 'Night. Photo: Hugo Camera' },
          },
        ],
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Si quieres ver la colección al completo, visita nuestra página Runway, dedicada a la colección Tempore.',
          en: 'If you\'d like to see the full collection, visit our Runway page, dedicated to the Tempore collection.',
        },
      },
      {
        tipo: 'titulo',
        texto: { es: "L'Oréal: Desfila tu Valía", en: "L'Oréal: Desfila tu Valía" },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'L\'Oréal Paris decidió apostar por el empoderamiento femenino y subir a la pasarela la belleza natural de la mujer a través del desfile "Desfila Tu Valía", toda una declaración de intenciones que partía de su conocido eslogan "Porque Nosotras lo Valemos".',
          en: 'L\'Oréal Paris chose to champion female empowerment and bring women\'s natural beauty onto the runway with the "Desfila Tu Valía" show — a real statement of intent, built around its well-known slogan "Because We\'re Worth It".',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Y como no podía ser de otra manera, nos sumamos a su propuesta de participar como una de las marcas lideradas por mujeres creadoras de moda española, apoyando la causa junto a otras diseñadoras españolas y mujeres que se subieron a la pasarela como: Isabel Sanchís, Ágatha Ruiz de la Prada y Tete by Odette, con prendas que vistieron a rostros como Nieves Álvarez, Andrea Garte, Neus Bermejo, Álvaro Plantón, Lola Lolita y Miriam Saiz, que defendieron la naturalidad y la diversidad sobre la pasarela. Todas esas personalidades, junto a todo un equipo de maquilladores y peluqueros, crearon los looks firmados por L\'Oréal Paris haciendo brillar ese mensaje de empoderamiento y diversidad.',
          en: 'And naturally, we joined the initiative as one of the brands led by women shaping Spanish fashion, supporting the cause alongside other Spanish designers and women who walked the runway, including Isabel Sanchís, Ágatha Ruiz de la Prada and Tete by Odette, with garments worn by faces such as Nieves Álvarez, Andrea Garte, Neus Bermejo, Álvaro Plantón, Lola Lolita and Miriam Saiz, who championed naturalness and diversity on the catwalk. All of these personalities, together with a full team of make-up artists and hairstylists, created the looks signed by L\'Oréal Paris, bringing that message of empowerment and diversity to life.',
        },
      },
      {
        // Patrón repetible: texto (los dos párrafos de arriba) →
        // imágenes debajo, en columnas.
        tipo: 'galeria',
        columnas: 3,
        imagenes: [
          {
            imagen: '/img/ecommerce/FC-5.webp',
            alt: 'Andrea Garte, vestido rojo colección Nagare SS23',
            caption: {
              es: 'Andrea Garte, junto a Lola Lolita. Foto: Constantino Quero Simons',
              en: 'Andrea Garte, with Lola Lolita. Photo: Constantino Quero Simons',
            },
          },
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_23.webp',
            alt: "Foto de familia, desfile L'Oréal Desfila Tu Valía",
            caption: {
              es: "Foto de familia, desfile L'Oréal Desfila Tu Valía",
              en: "Group photo, L'Oréal Desfila Tu Valía show",
            },
          },
          {
            imagen: '/img/ecommerce/FC-8.webp',
            alt: 'Lucía López, Inés Mocho y Miriam Sainz, vestidas de la colección Nagare SS23',
            caption: {
              es: 'Lucía López, Inés Mocho y Miriam Sainz',
              en: 'Lucía López, Inés Mocho and Miriam Sainz',
            },
          },
        ],
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Una tarde que se quedará grabada en nuestro recuerdo y en la que agradecemos a L\'Oréal Paris, a MBFWMadrid y en especial a Andrea Garte, Miriam Saiz Díaz, Lucía López e Inês Mocho, por lucir con fuerza y autenticidad nuestros vestidos de la colección Nagare SS23 en la pasarela dedicada al empoderamiento femenino.',
          en: 'An afternoon that will stay with us — our thanks to L\'Oréal Paris, to MBFWMadrid and especially to Andrea Garte, Miriam Saiz Díaz, Lucía López and Inês Mocho, for wearing our Nagare SS23 dresses with such strength and authenticity on a runway dedicated to female empowerment.',
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'Secretos del backstage', en: 'Backstage secrets' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Un desfile no es solo lo que se ve desde la pasarela, para nosotros comienza mucho antes de que lo pueda ver el espectador. ¡No sabes lo que es un desfile hasta que lo vives desde dentro! Y es que en el backstage, detrás de bambalinas, hay todo un entramado de trabajo de distintos equipos, perfectamente organizado, en los días previos al show, para transmitir en 15 minutos todo lo que conlleva una colección.',
          en: "A fashion show isn't only what you see from the runway — for us it begins long before the audience can see anything. You don't know what a show really is until you live it from the inside! Backstage, behind the curtains, there's an entire web of work from different teams, perfectly organised in the days before the show, to convey everything a collection carries in just 15 minutes.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Como ya os hemos contado anteriormente, en nuestro post "Pasarelas de moda", cada desfile tiene unos pasos de trabajo muy importantes para que todo salga bien. Pero hoy queremos hablaros de todo el trabajo y los secretos del backstage que hay detrás de nuestra última colección, sigue leyendo y adéntrate con nosotros en el behind the scenes de Tempore.',
          en: 'As we\'ve told you before, in our post "Fashion Runways", every show follows some very important steps for everything to go well. But today we want to tell you about all the work and the backstage secrets behind our latest collection — keep reading and step with us into the behind the scenes of Tempore.',
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'El fitting de un desfile', en: 'The fitting of a fashion show' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Probablemente uno de los momentos que más interés genera de los preparativos previos al desfile es: ¿qué es un fitting? Para resumir su definición podemos decir que es la prueba de vestuario, pero en ella se toman muchas decisiones esenciales para el desfile: es aquí donde probamos la colección sobre las modelos que la vestirán, donde decidimos cuál es el vestido idóneo para cada modelo, si es necesario algún arreglo, donde les explicamos cómo defenderla, cómo moverla, la actitud que tendrá la colección, y el estilismo general.',
          en: "Probably one of the moments that sparks the most curiosity in the run-up to a show is: what is a fitting? To put it simply, it's the wardrobe rehearsal, but it's where many essential decisions for the show get made: this is where we try the collection on the models who will wear it, where we decide which dress suits each model best, whether anything needs altering, where we explain how to carry it, how to move in it, the attitude the collection will have, and the overall styling.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Antes de llegar a Ifema, ya tenemos una primera idea y boceto sobre quién llevará cada prenda, ya que alrededor de un mes antes del desfile, siempre tenemos una reunión online con la directora de casting de MBFWMadrid, en la que hablamos sobre el look que le queremos dar a la colección, la presencia que queremos que tenga en escena, le damos detalles sobre las prendas, los tejidos, y ella siempre hace un trabajo excepcional sobre nuestro casting.',
          en: "Before we even get to Ifema, we already have a first idea and sketch of who will wear each garment, because about a month before the show we always have an online meeting with MBFWMadrid's casting director, where we talk about the look we want for the collection, the presence we want it to have on stage, and give her details about the garments and fabrics — she always does exceptional work on our casting.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Gracias a esa reunión, hacemos un trabajo previo de selección en nuestro atelier Fely Campo, para que cuando llegamos a nuestro vestuario de Ifema sea mucho más ágil, pero aún así siempre hay cambios de última hora: pequeños ajustes a las prendas, cambios de orden, asignación de accesorios, decidimos qué modelos tendrán cambio… Y sobre todo, organizar el vestuario para que el desfile sea muy fluido. En definitiva, preparar todo para el directo, que son 15 minutos en los que todo tiene que estar muy claro.',
          en: "Thanks to that meeting, we do a first round of selection at our Fely Campo atelier so that, once we reach our wardrobe area at Ifema, everything moves much faster — but there are always last-minute changes: small adjustments to garments, reordering, assigning accessories, deciding which models will have a costume change... and above all, organising the wardrobe so the show runs smoothly. In short, getting everything ready for the live moment — 15 minutes in which everything has to be crystal clear.",
        },
      },
      {
        // Patrón repetible: texto (secretos del backstage + el fitting)
        // → imágenes debajo, en columnas (2 esta vez, no siempre 3/4).
        tipo: 'galeria',
        columnas: 2,
        imagenes: [
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-30.jpg',
            alt: 'Backstage TEMPORE',
            caption: { es: 'Foto: Kristen Wice', en: 'Photo: Kristen Wice' },
          },
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-48.jpg',
            alt: 'Fitting TEMPORE',
            caption: { es: 'Foto: Kristen Wice', en: 'Photo: Kristen Wice' },
          },
        ],
      },
      {
        tipo: 'titulo',
        texto: { es: 'Los secretos de belleza en MBFW Madrid', en: 'Beauty secrets at MBFW Madrid' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Por todos es sabido que MBFWMadrid cuenta con los mejores equipos de maquillaje y peluquería para crear la belleza de los shows de los diseñadores. Todo el equipo L\'Oréal, con Beatriz Matallana y José Belmonte como directores de peluquería y maquillaje respectivamente, ayuda a crear el mejor look para cada desfile. La prueba de maquillaje y peluquería en Cool Producciones, semanas antes, es donde podemos charlar sobre nuestra idea y ellos nos aconsejan sobre lo que representará mejor nuestro concepto dentro de la pasarela.',
          en: "It's well known that MBFWMadrid has the best hair and make-up teams to create the beauty of each designer's show. The whole L'Oréal team, with Beatriz Matallana and José Belmonte as hair and make-up directors respectively, helps craft the best look for every show. The hair and make-up trial at Cool Producciones, weeks beforehand, is where we get to talk through our idea and they advise us on what will best represent our concept on the runway.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'En esta ocasión optamos por un pelo efecto mojado, muy en tendencia y aparentemente muy sencillo, pero que dejara el protagonismo a los cuellos abullonados de las prendas de la colección, con un toque muy especial: unos cuantos mechones que recorrían la cara de las modelos, como si fueran puestos por el viento de la ciudad sobre la que caminan.',
          en: "This time we opted for a wet-look hairstyle, very much on trend and deceptively simple, but designed to leave the spotlight on the collection's voluminous collars — with one special touch: a few loose strands framing the models' faces, as if placed there by the wind of the city they walk through.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'A este look tan fresco lo acompañó un maquillaje muy natural, una piel jugosa que dejaba el protagonismo a unos pómulos rosados, con algún efecto metalizado, y un labio mordido. El toque especial llegaba con la noche, la tercera parte de TEMPORE, que se presentó con un cambio de maquillaje que intensificó la mirada con un divertido toque de color metalizado en el lacrimal. ¡Todo un espectáculo ver cómo el equipo de maquillaje hacía el cambio de look en tan solo unos segundos a pie de backstage!',
          en: 'This fresh look was paired with a very natural make-up: dewy skin that left the spotlight on rosy cheekbones, a touch of metallic shimmer, and a bitten-lip effect. The special touch arrived with night, the third movement of TEMPORE, presented with a make-up change that intensified the eyes with a playful pop of metallic colour on the inner corner. Quite a sight, watching the make-up team pull off the look change in just seconds, right there backstage!',
        },
      },
      {
        // Patrón repetible: texto (los secretos de belleza) →
        // imágenes debajo, en columnas (3 esta vez).
        tipo: 'galeria',
        columnas: 3,
        imagenes: [
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-58.jpg',
            alt: 'Backstage — belleza TEMPORE',
            caption: { es: 'Foto: Kristen Wice', en: 'Photo: Kristen Wice' },
          },
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-79.jpg',
            alt: 'Backstage — maquillaje TEMPORE',
            caption: { es: 'Foto: Kristen Wice', en: 'Photo: Kristen Wice' },
          },
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-183.jpg',
            alt: 'Backstage TEMPORE',
            caption: { es: 'Foto: Kristen Wice', en: 'Photo: Kristen Wice' },
          },
        ],
      },
      {
        tipo: 'titulo',
        texto: { es: 'La importancia del equipo', en: 'The importance of the team' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'En definitiva, todas las personas que están detrás del backstage —organización, fotógrafos, peluqueros, redactores, maquilladores, equipo del diseñador, vestidores, RRPP, estilistas, seguridad…— todos y cada uno de nosotros nos convertimos en un gran equipo durante esa semana.',
          en: 'In the end, everyone behind the backstage — organisers, photographers, hairstylists, writers, make-up artists, the designer\'s own team, dressers, PR, stylists, security... every single one of us becomes one big team during that week.',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Es imprescindible, dentro del ambiente frenético y de trabajo a contrarreloj, que el compañerismo y el buen rollo impregnen todos esos momentos de estrés. Y es que, para lo que cualquier espectador puede parecer el caos, todo está calculado al milímetro para que salga a la perfección.',
          en: "It's essential that, within the frantic, against-the-clock atmosphere, camaraderie and good spirits run through every one of those stressful moments. Because what might look like chaos to any spectator is actually calculated down to the millimetre so it all comes off perfectly.",
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'Nuestro desfile: TEMPORE O/I 23/24', en: 'Our show: TEMPORE FW 23/24' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'La presentación de TEMPORE partía de la idea de representar un día cualquiera en la vida de una mujer a través de los tres momentos esenciales del día. Por lo que creamos una ciudad 3D algo surrealista, creada por la artista Camila Alberti, que nos ayudó a ubicar a la mujer en cada momento del día. Fue una presentación en tres tiempos, por lo que la colección se estructuraba como tres colecciones diferentes que, al final, formaban una única colección; en ellos se pudo ver la importancia de las influencias de la cultura asiática que siempre recorre de algún modo las colecciones de la diseñadora Fely Campo, en esta ocasión a través de una presentación en tiempos.',
          en: "TEMPORE's presentation started from the idea of portraying an ordinary day in a woman's life through its three essential moments. So we created a somewhat surreal 3D city, made by artist Camila Alberti, which helped us place the woman within each moment of the day. It was a presentation in three movements, so the collection was structured as three different collections that, in the end, formed a single one; within them you could see the influence of Asian culture that somehow always runs through designer Fely Campo's collections — this time, through a presentation told in movements.",
        },
      },
      {
        tipo: 'video',
        caption: {
          es: 'Desfile completo Tempore Otoño-Invierno 23/24 en MBFWMadrid',
          en: 'Full Tempore Autumn-Winter 23/24 show at MBFWMadrid',
        },
      },
      {
        tipo: 'titulo',
        texto: { es: 'Front Row: los invitados', en: 'Front Row: the guests' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'Este desfile fue aún más especial en esta ocasión por todo el público que lo presenció y vivió la puesta en escena de la colección, y no solo desde las gradas, sino también desde su casa a través del directo desde la web de MBFWMADRID o a través de nuestras redes sociales.',
          en: 'This show was made even more special by the audience who witnessed and experienced the staging of the collection — not only from the seats, but also from home, through the live stream on the MBFWMADRID website or through our own social media.',
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'El front-row de TEMPORE AW23/24 contó con la presencia del embajador de Reino Unido, Hugh Elliot, y su esposa María Antonia Elliot; Gustavo Andrés Martín Martín, magistrado en el Juzgado de Primera Instancia de Marcas UE de España; la directora general de Consumo y Comercio de la Junta de Castilla y León, María Pettit; el alcalde de Salamanca, Carlos García Carbayo; el alcalde de Oviedo, Alfredo Canteli; y también con numerosas amigas de la marca como Laura Dosouto, Cristina Mata, Brisa Fenoy, Cecilia Gómez, Mar Montoro, Laura Rouder, Guadalupe Lancho, Iris Alonso, Paloma Cuanda, Alexia Rivas, Lola Muñoz, Cintia Lund y Cristina Porta, entre otras.',
          en: "TEMPORE AW23/24's front row included the UK Ambassador, Hugh Elliot, and his wife María Antonia Elliot; Gustavo Andrés Martín Martín, judge at Spain's EU Trade Mark Court of First Instance; the Director General for Consumer Affairs and Trade of the Junta de Castilla y León, María Pettit; the mayor of Salamanca, Carlos García Carbayo; the mayor of Oviedo, Alfredo Canteli; and numerous friends of the brand including Laura Dosouto, Cristina Mata, Brisa Fenoy, Cecilia Gómez, Mar Montoro, Laura Rouder, Guadalupe Lancho, Iris Alonso, Paloma Cuanda, Alexia Rivas, Lola Muñoz, Cintia Lund and Cristina Porta, among others.",
        },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'La emoción y la implicación del público se pudo sentir en el ambiente: cómo se dejaron sumergir por la colección y la puesta en escena, y luego nos lo contaron en el Kissing Room. ¿Qué aún no sabes qué es el Kissing Room de MBFWMADRID? Pues no te pierdas la última parte de nuestro post, en la que te lo contamos.',
          en: "You could feel the audience's emotion and involvement in the air — how they let themselves be drawn into the collection and its staging, and later told us all about it in the Kissing Room. Still don't know what MBFWMADRID's Kissing Room is? Don't miss the last part of this post, where we tell you all about it.",
        },
      },
      {
        // Patrón repetible: texto (las dos secciones del front row) →
        // imágenes debajo, en columnas.
        tipo: 'galeria',
        columnas: 3,
        imagenes: [
          {
            imagen: '/img/ecommerce/FC-9.webp',
            alt: 'Guadalupe Lancho',
            caption: {
              es: 'Guadalupe Lancho. Foto: Constantino Quero Simons',
              en: 'Guadalupe Lancho. Photo: Constantino Quero Simons',
            },
          },
          {
            imagen: '/img/ecommerce/FC-10.webp',
            alt: 'Brisa Fenoy',
            caption: {
              es: 'Brisa Fenoy. Foto: Constantino Quero Simons',
              en: 'Brisa Fenoy. Photo: Constantino Quero Simons',
            },
          },
          {
            imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_27.webp',
            alt: 'Embajador de Reino Unido junto a Fely Campo',
            caption: {
              es: 'Hugh Elliot, Mª Antonia Elliot y Gustavo Andrés Martín Martín junto a Fely Campo',
              en: 'Hugh Elliot, María Antonia Elliot and Gustavo Andrés Martín Martín with Fely Campo',
            },
          },
        ],
      },
      {
        tipo: 'titulo',
        texto: { es: 'Kissing room', en: 'Kissing room' },
      },
      {
        tipo: 'parrafo',
        texto: {
          es: 'El Kissing Room, la sala de los besos: el lugar donde los invitados pueden transmitir sus impresiones a la diseñadora. El lugar donde celebrar y disfrutar del trabajo realizado, después de meses de desvelo, de tensión. Podemos compartir con todos nuestros invitados sus impresiones sobre TEMPORE, una colección muy especial a la que dedicamos meses de trabajo y en la que pusimos nuestro corazón para intentar superarnos.',
          en: "The Kissing Room, the room of kisses: the place where guests get to share their impressions with the designer. The place to celebrate and enjoy the work done, after months of sleepless nights and tension. It's where we get to hear from all our guests what they thought of TEMPORE, a very special collection we devoted months of work to, and into which we poured our hearts trying to outdo ourselves.",
        },
      },
      {
        tipo: 'imagen',
        imagen: '/img/collections/runway/fw27-lacoleccion/FelyCampo_31.webp',
        alt: 'Laura Do Souto junto a Fely Campo',
        caption: {
          es: 'Laura Do Souto junto a Fely Campo. Foto: Constantino Quero Simons',
          en: 'Laura Do Souto with Fely Campo. Photo: Constantino Quero Simons',
        },
      },
    ],
  },
];

export function entradaPorSlug(slug) {
  return BLOG_ENTRADAS.find((entrada) => entrada.slug === slug);
}
