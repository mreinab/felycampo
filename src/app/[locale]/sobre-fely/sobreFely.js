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
   editorial con las fotos de trayectoria que sí existen — ver "Hoy"
   más abajo — con el manifiesto poético intercalado en medio: su
   foto en columna izquierda + el poema en la derecha, misma fila —
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
   y uno o más párrafos. 2003 trae dos párrafos (el viaje a París + el
   arranque de la internacionalización que sigue de ese mismo hecho,
   sin año propio). Imágenes: 2 fotos reales de Fely Campo en
   public/img/about-felycampo/ (una en el hero, otra en "Hoy") +
   reciclado de fondo real ya usado en otras páginas (artesany.jpg —
   encaja literalmente con "taller de costura" de 1972 — atelier de
   Salamanca, taller-1, portadas de Runway/Novia) donde aún no hay
   foto de archivo propia para esa etapa, mismo criterio documentado
   en atelieres.js.

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
   historia de la firma. */

export const SOBRE_FELY = {
  // Hero de RunwayMediaLateral (ver page.js) — mismo campo "medios[0]"
  // que coleccion.medios en ../colecciones-fely-campo/colecciones.js,
  // aquí en plano (sin "tipo": RunwayMediaLateral pinta <img> por
  // defecto, solo <video> si medio.tipo === 'video').
  heroImagen: '/img/about-felycampo/fely-campo-conoce-a-la-disenadora.jpg',

  trayectoria: [
    {
      anio: { es: '1972', en: '1972' },
      imagen: '/img/artesany.jpg',
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
      imagen: '/img/collections/novia/Bride27-cover.webp',
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
      imagen: '/img/talleres/taller-1/IMG_9719.JPG',
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
      imagen: '/img/atelier/atelier-salamanca/tienda-salamanca.webp',
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
      imagen: '/img/collections/runway/FW23_diafonia-cover.webp',
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
      // Sin "imagen": la foto de archivo que traía este bloque
      // (Copia-de-Cabecera-Noticias-12.jpg) no existe en
      // public/img/about-felycampo/ — se quita en vez de dejar un
      // <img> roto en RunwayBackstage (ver "fotosBackstage" en
      // page.js, filtra las entradas sin imagen).
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
        'Fely Campo nace en Salamanca como firma de moda femenina en 1997. Especializada en colecciones de fiesta y novia, la firma ha logrado ser un referente en el sector, dentro y fuera de nuestras fronteras gracias al compromiso con la calidad y el diseño atemporal.',
        'Desde su fundación y manteniendo su sede en Salamanca, la firma fue llegando cada vez a más puntos de venta, a nivel nacional, hasta que en 2003 decide que es el momento de dar el paso a su expansión internacional.',
        'A partir de esa fecha y con las mismas constantes e ideales que las de su creadora: pasión, fuerza y trabajo, comienza el proceso de expansión de la firma. Actualmente cuenta con un equipo de 12 trabajadores y 22 mujeres costureras colaborando con la marca en los pueblos de Castilla y León, además posee casi 200 puntos de venta en el ámbito nacional e internacional.',
      ],
      en: [
        'Fely Campo was born in Salamanca as a womenswear label in 1997. Specialising in eveningwear and bridal collections, the firm has become a benchmark in the industry, both within and beyond our borders, thanks to its commitment to quality and timeless design.',
        "Since its founding, and while keeping its headquarters in Salamanca, the firm steadily reached more points of sale across Spain, until in 2003 it decided the time had come to take the step into international expansion.",
        "From that date on, and guided by the same constants and ideals as its creator — passion, strength and hard work — the firm's expansion process began. Today it has a team of 12 employees and 22 seamstresses collaborating with the brand in the villages of Castilla y León, and it now has almost 200 points of sale nationally and internationally.",
      ],
    },
  },

  manifiesto: {
    // Foto que acompaña al poema en RunwayBackstage (ver page.js,
    // prop "poema.imagenes" — admite una o dos, aquí solo una), la
    // que hacía de heroImagen antes de cambiarla por
    // fely-campo-conoce-a-la-disenadora.jpg, reaprovechada aquí en vez
    // de quedar sin usar.
    imagenesPoema: ['/img/about-felycampo/6738f8cc5cdea.jpeg'],
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
};
