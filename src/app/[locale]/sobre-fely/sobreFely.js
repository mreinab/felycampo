/* Datos de /sobre-fely — biografía "Trayectoria" (1972 → hoy) +
   manifiesto poético de marca (presentación de colección en Ibiza).
   Bilingüe por campo ({es, en}), mismo criterio que "secciones" en
   ../atelier-fiesta/atelieres.js — texto largo y propio de esta
   página, no encaja en el formato de clave corta de
   messages/{locale}.json (ver "sobreFely.eyebrow" en page.js para lo
   poco que sí vive ahí).

   Texto de encargo tal cual (biografía en primera persona de Fely
   Campo + manifiesto), salvo el manifiesto: venía pegado dos veces
   (con restos de un chat de WhatsApp intercalados, tipo "[18:11,
   12/8/2026] Ionela Valencia:" — no es contenido de página, se
   descarta) — se usa la segunda versión, algo más condensada.

   Página maquetada copiando el diseño de la ficha de colección de
   Runway (/colecciones-fely-campo/la-coleccion-aw27, ver
   [coleccion]/page.js) — mismos componentes de layout/, contenido de
   biografía en vez de colección: RunwayMediaLateral (hero), .textoRow
   (nombre/temporada → "Fely Campo"/"La Diseñadora", ver page.js) +
   RunwayDescripcion (historia de la firma, unida en un único párrafo
   — ahí es siempre un texto corrido) + RunwayBackstage (cuadrícula
   editorial con la foto de cada etapa de la trayectoria — con el
   manifiesto poético intercalado en medio: sus fotos en columna
   izquierda + el poema en la derecha, misma fila —
   prop "poema" de RunwayBackstage, ver ese componente) + la
   biografía completa en
   texto corrido debajo (.biografia, un bloque por
   año/etapa — ver ese componente en page.module.css). Sin
   RunwayGaleria ni RunwayVideoCierre: el lightbox de RunwayGaleria
   pinta "Look {numero}" (ver messages/{locale}.json
   "producto.lookNumero", cadena fija, no configurable por prop) — no
   encaja sobre fotos de una biografía, y no hay vídeo de cierre
   propio todavía.

   "trayectoria": un bloque por año/etapa, cada uno con su año, imagen
   (opcional) y uno o más párrafos. 2003 trae dos párrafos (el viaje a
   París + el arranque de la internacionalización que sigue de ese
   mismo hecho, sin año propio). Imágenes: todas salen de
   public/img/about-felycampo/ a petición directa del usuario (nada
   reciclado de otras páginas, a diferencia del criterio de
   atelieres.js) — la carpeta trae más fotos de las que hacían falta
   aquí (de podcast, revista y una entrevista en vídeo, todas con
   texto/logos superpuestos, ver "enlacesExternos" más abajo) que se
   descartan para esta cuadrícula editorial, que solo lleva foto
   limpia. Solo hay 6 fotos limpias para 9 huecos (hero + 6 años + 2
   del poema) y cada una se usa una única vez en toda la página (a
   petición directa del usuario, sin repetir ninguna) — así que 1972,
   1975 y 1995 se quedan sin "imagen" (mismo criterio que ya traía
   "Hoy" antes de tener foto propia: RunwayBackstage/fotosBackstage
   filtra las entradas sin imagen, ver page.js, no deja un <img>
   roto ni un hueco vacío en la cuadrícula).

   "historia": "texto" — historia de la firma (fundación en 1997,
   expansión nacional e internacional desde 2003, cifras actuales de
   equipo/puntos de venta), un párrafo por elemento del array, unido
   en RunwayDescripcion en un único párrafo corrido igual que el resto
   de textos de ese componente (ver page.js).

   "manifiesto": "texto" (un párrafo por línea/estrofa tal como venía
   puntuado el original, va como prop "poema.texto" de RunwayBackstage
   — ver page.js) + "imagenesPoema", las dos fotos reales de Fely Campo
   que acompañan al poema en su misma fila de la cuadrícula (columna
   izquierda, apiladas; el poema cae en la derecha — ver
   RunwayBackstage.jsx/.module.css), no sueltas entre el resto de fotos
   de trayectoria. El poema ya no va corrido en RunwayDescripcion —
   así se veía en el primer maquetado de la página, antes de sumar la
   historia de la firma.

   "enlacesExternos": tarjetas de podcast/prensa al final de la página
   (ver page.js), incluyendo el resto de fotos de about-felycampo/ que
   no encajaban en la cuadrícula editorial de trayectoria por llevar
   texto/logo superpuesto (ver ese comentario más arriba) — aquí ese
   texto ya no estorba, la tarjeta entera es un enlace de salida a la
   aparición real (vídeo/pódcast/prensa), no una foto de archivo. */

export const SOBRE_FELY = {
  // Hero de RunwayMediaLateral (ver page.js) — mismo campo "medios[0]"
  // que coleccion.medios en ../colecciones-fely-campo/colecciones.js,
  // aquí en plano (sin "tipo": RunwayMediaLateral pinta <img> por
  // defecto, solo <video> si medio.tipo === 'video').
  heroImagen: '/img/about-felycampo/fely-campo-conoce-a-la-disenadora.jpg',

  trayectoria: [
    {
      anio: { es: '1972', en: '1972' },
      // Sin "imagen": cada foto limpia de about-felycampo/ se usa una
      // sola vez en toda la página (a petición directa del usuario) y
      // las 6 disponibles ya se reparten entre el hero, 1981, 2003,
      // "Hoy" y las 2 del poema (ver comentario de "trayectoria" más
      // arriba) — no queda ninguna libre para 1972/1975/1995, así que
      // se quitan en vez de repetir una imagen (mismo criterio que
      // "Hoy" ya usaba antes de tener foto propia).
      texto: {
        es: [
          'Eran las 7:00 de la mañana de un frío día de otoño. Yo tenía 13 años cuando mi madre me llevó a un taller de costura en Salamanca. Ninguna de las dos podía imaginar el impacto que aquello tendría en mi vida. Allí comencé a aprender mi oficio, un aprendizaje que nunca he dejado de cultivar. Pero, más importante aún, fue mi puerta de entrada al mundo de la moda, un universo que me apasionó desde el primer momento, me fascinó y sigue haciéndolo hoy.',
        ],
        en: [
          "It was 7:00 on a cold autumn morning. I was 13 years old when my mother took me to a sewing workshop in Salamanca. Neither of us could have imagined the impact that day would have on my life. That's where I began to learn my craft, a craft I have never stopped cultivating. But, more importantly, it was my gateway into the world of fashion — a universe that captivated me from the very first moment, that fascinated me then and still does today.",
        ],
      },
    },
    {
      anio: { es: '1975', en: '1975' },
      texto: {
        es: [
          'Con 16 años diseñé mi primer vestido de novia para una vecina que también tenía 16 años. Empezaba a descubrir cómo, a través de los tejidos y el diseño, podía expresar quién era y proyectarme al mundo. Sin embargo, aún me quedaba camino por recorrer antes de poder dar plena libertad al impulso creativo que llevaba dentro.',
        ],
        en: [
          'At 16, I designed my first wedding dress for a neighbour who was also 16. I was beginning to discover how, through fabric and design, I could express who I was and project myself into the world. Even so, I still had a long way to go before I could give full freedom to the creative impulse I carried inside me.',
        ],
      },
    },
    {
      anio: { es: '1981', en: '1981' },
      imagen: '/img/about-felycampo/elmundodefelycampo-ladisenadora-felycampo.webp',
      texto: {
        es: [
          'Abrí la Academia de Corte y Confección, que en 1986 se transformó en una Escuela de Diseño. Recuerdo la emoción de llegar el primer día y ver, por primera vez, mi nombre en la puerta. Fue una etapa apasionante, llena de desfiles, profesores inspiradores y, sobre todo, mucha creatividad.',
        ],
        en: [
          'I opened the Academia de Corte y Confección, which in 1986 became a fashion design school. I remember the thrill of arriving on the first day and seeing my name on the door for the very first time. It was an exciting stage, full of runway shows, inspiring teachers and, above all, a great deal of creativity.',
        ],
      },
    },
    {
      anio: { es: '1995', en: '1995' },
      texto: {
        es: [
          'Ese recorrido me llevó a abrir mi primera tienda Fely Campo, dedicada a la moda femenina. A través de los tejidos, el diseño y una manera muy personal de vestir, comencé a conectar con mi comunidad. Poco a poco fui creando una clientela que buscaba elegancia, frescura y un estilo diferente al de los demás. Así comenzó el crecimiento de la firma Fely Campo en España.',
        ],
        en: [
          'That path led me to open my first Fely Campo store, devoted to womenswear. Through fabric, design and a very personal way of dressing, I began to connect with my community. Little by little I built a clientele in search of elegance, freshness and a style different from everyone else\'s. That\'s how the growth of the Fely Campo label in Spain began.',
        ],
      },
    },
    {
      anio: { es: '2003', en: '2003' },
      imagen: '/img/about-felycampo/PM26_Fely_Campo_0934.jpg',
      texto: {
        es: [
          'Preparé una colección, la metí en dos maletas y viajé a la feria Who\'s Next de París. Pasara lo que pasara, sabía que sería una experiencia de aprendizaje. El tercer día de mi primera participación, una tienda de Kuwait realizó un pedido. Fue suficiente para regresar. Y volví durante siete colecciones consecutivas.',
          'Ese fue el inicio de la internacionalización de la marca Fely Campo. Creé un atelier independiente en Salamanca para responder al aumento del trabajo. También empecé a participar en la Barcelona Bridal Fashion Week —feria en la que sigo presente hoy en día—, y mis diseños llamaron la atención tanto de uno de los showrooms italianos más importantes de Milán como de uno de los representantes más reconocidos de la industria de la moda británica.',
        ],
        en: [
          "I put together a collection, packed it into two suitcases and travelled to the Who's Next trade fair in Paris. Whatever happened, I knew it would be a learning experience. On the third day of my first participation, a shop from Kuwait placed an order. That was enough to make me go back. And I did, for seven collections running.",
          "That was the start of Fely Campo's international expansion. I set up an independent atelier in Salamanca to keep pace with the growing workload. I also began taking part in Barcelona Bridal Fashion Week — a fair where I'm still present today — and my designs caught the attention of one of Milan's leading Italian showrooms, as well as one of the most respected names in the British fashion industry.",
        ],
      },
    },
    {
      anio: { es: 'Hoy', en: 'Today' },
      imagen: '/img/about-felycampo/fely-campo-portada.webp',
      texto: {
        es: [
          'Fely Campo está presente en toda Europa, con colecciones que se distribuyen en España, Italia, Reino Unido e Irlanda, Francia, Bélgica, Suiza y Alemania. Mantengo la tienda original de Salamanca y otra en Oviedo, además de los ateliers especializados en moda nupcial y de fiesta en Salamanca y Madrid. El trabajo constante, la pasión por los tejidos y el diseño bien elaborado, unidos al espíritu emprendedor propio de una Serrano, me han permitido construir un universo al que he dedicado toda mi vida.',
        ],
        en: [
          'Fely Campo is present throughout Europe, with collections distributed in Spain, Italy, the United Kingdom and Ireland, France, Belgium, Switzerland and Germany. I still keep the original store in Salamanca and another in Oviedo, alongside the ateliers specialising in bridal and eveningwear in Salamanca and Madrid. Constant work, a passion for fabric and well-crafted design, together with the entrepreneurial spirit of a true Serrano, have allowed me to build a universe to which I have devoted my entire life.',
        ],
      },
    },
  ],

  historia: {
    texto: {
      es: [
        'Con 54 años de trayectoria, Fely Campo está profundamente ligada a la tierra charra, de piedra, luz y oficio. Especializada en fiesta, novia y prêt-à-porter, Fely Campo crea piezas desde el patronaje, la elección de tejidos y el conocimiento de unas manos que entienden como un oficio que se transmite y permanece.',
        'Desde su fundación y manteniendo su sede en Salamanca, la firma fue llegando cada vez a más puntos de venta, a nivel nacional, hasta que en 2015 decide que es el momento de dar el paso a su expansión internacional.',
        'A partir de esa fecha y con las mismas constantes e ideales que las de su creadora: pasión, fuerza y trabajo, comienza el proceso de expansión de la firma. Actualmente cuenta con un equipo de 12 trabajadores y varias asociaciones de mujeres costureras colaborando con la marca en los pueblos de la sierra de Castilla y León, además, posee casi 200 puntos de venta en el ámbito nacional e internacional.',
      ],
      en: [
        'With 54 years of history, Fely Campo is deeply rooted in the Charra land of Salamanca, of stone, light and craft. Specialising in occasion wear, bridal and prêt-à-porter, Fely Campo creates pieces from the pattern-making, the choice of fabrics and the knowledge of hands that understand it as a craft passed down and enduring.',
        "Since its founding, and while keeping its headquarters in Salamanca, the firm steadily reached more points of sale across Spain, until in 2015 it decided the time had come to take the step into international expansion.",
        "From that date on, and guided by the same constants and ideals as its creator — passion, strength and hard work — the firm's expansion process began. Today it has a team of 12 employees and several associations of seamstresses collaborating with the brand in the villages of the Sierra de Castilla y León, and it now has almost 200 points of sale nationally and internationally.",
      ],
    },
  },

  manifiesto: {
    // Fotos que acompañan al poema en RunwayBackstage (ver page.js,
    // prop "poema.imagenes").
    imagenesPoema: [
      '/img/about-felycampo/6738f8cc5cdea.jpeg',
      '/img/about-felycampo/elegir-fely-27.jpeg',
    ],
    texto: {
      es: [
        'La austeridad y la oscuridad de la sierra de Salamanca se doblegan ante la luz que atraviesa la negrura.',
        'La luz del sol. La luz de la vida.',
        'Una luz que no se queda atrás, que atraviesa la dureza de la piedra y encuentra siempre el camino.',
        'Fely Campo es esa luz impertinente.',
        'Fuerte. Tenaz. Incansable.',
        'Una mujer que no pide permiso para brillar. Que rompe esquemas sociales y visuales, y proyecta para sí misma y para las mujeres la posibilidad de un mundo diferente.',
        'Y es así como crea.',
        'Para la mujer de ahora. Para la que fue ayer. Para la que será mañana.',
        'Enraizada en Salamanca y trabajando en comunidad, cada prenda nace de un patronaje excepcional, tejidos únicos y las manos de mujeres que confeccionan en los talleres de la sierra, transformando el oficio en una oportunidad para construir un futuro propio.',
        'La colección que hoy llega a Ibiza habla en blanco y negro.',
        'Luz y oscuridad. Fuerza y calma. El equilibrio perfecto, atravesado por un dorado vibrante que representa el impulso, la valentía y el hambre por ser y crear.',
        'Piezas concebidas para durar toda una vida.',
        'En el armario por su belleza.',
        'Y en el corazón de quien las lleva por su historia.',
        'De mujeres.',
        'Para mujeres.',
        'Por las mujeres.',
      ],
      en: [
        'The austerity and darkness of the Sierra de Salamanca yield before the light that cuts through the black.',
        'The light of the sun. The light of life.',
        'A light that never falls behind, that cuts through the hardness of stone and always finds its way.',
        'Fely Campo is that defiant light.',
        'Strong. Tenacious. Tireless.',
        'A woman who asks no permission to shine. Who breaks social and visual conventions, and opens up — for herself and for women — the possibility of a different world.',
        'And that is how she creates.',
        'For the woman she is today. For the one she was yesterday. For the one she will be tomorrow.',
        'Rooted in Salamanca and working in community, every garment is born of exceptional patternmaking, singular fabrics and the hands of women who sew in the workshops of the sierra, turning a craft into an opportunity to build a future of their own.',
        'The collection arriving in Ibiza today speaks in black and white.',
        'Light and darkness. Strength and calm. The perfect balance, cut through by a vibrant gold that stands for drive, courage and the hunger to be and to create.',
        'Pieces conceived to last a lifetime.',
        'In the wardrobe, for their beauty.',
        'And in the heart of the woman who wears them, for their story.',
        'A story of women.',
        'For women.',
        'By women.',
      ],
    },
  },

  // Tarjetas de podcast/prensa al final de la página (ver page.js,
  // TarjetaEnlaceExterno — mismo diseño que BlogTarjetaPodcastDestacado
  // de /blog, pero enlazando fuera del sitio). "titulo" no lleva
  // traducción (nombre propio del programa/episodio, igual que
  // "nombre" de UBICACIONES en visita-fely-campo/ubicaciones.js).
  enlacesExternos: [
    {
      // (Pendiente) falta el enlace real del vídeo — de momento apunta a
      // "#" para no dejar un <a> sin destino.
      href: '#',
      titulo: 'Madrid, Capital de Moda',
      meta: { es: 'Entrevista en vídeo', en: 'Video interview' },
      imagen: '/img/about-felycampo/madrid-moda-de-capital-felycampo-podcast.jpg',
    },
    {
      href: 'https://www.youtube.com/watch?v=daejHVPhdJM',
      titulo: 'Haz que pase ¡Emprende!',
      meta: { es: 'Pódcast', en: 'Podcast' },
      imagen: '/img/about-felycampo/haz-que-pase-felycampo-podcast.jpg',
    },
  ],

  // Aparición en prensa escrita — debajo de "enlacesExternos" en vez de
  // dentro de esa cuadrícula de 2 columnas (ver page.js): a diferencia
  // del vídeo/pódcast, aquí "icono" de TarjetaEnlaceExterno es
  // "revista" en vez de "play" (ver ese componente).
  prensaDestacada: {
    href: 'https://www.theworldkats.com/2023/09/Fely-Campo-Fashion-Designer-Interview.html',
    titulo: 'The World Kats',
    meta: { es: 'Revista', en: 'Magazine' },
    imagen: '/img/about-felycampo/magazine-fely-campo-entrevista.jpg',
  },
};
