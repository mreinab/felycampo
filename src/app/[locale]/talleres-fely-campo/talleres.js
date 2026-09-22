/* Datos de los talleres/proveedores con los que trabaja Fely Campo —
   ver page.js. Bilingüe por entrada ({es, en}), mismo criterio que
   "descripcion" en visita-fely-campo/ubicaciones.js.

   3 talleres: Béjar (taller-1) y Tamames (taller-2), reales, más
   "taller-inhouse" (nuestro taller principal, añadido a petición) —
   ya con reportaje propio (MEDIOS_TALLER_INHOUSE), pero todavía con
   texto de relleno (parrafos en lorem ipsum) a la espera del real. Los
   párrafos de Béjar/Tamames ya son el texto real (de encargo, recibido
   el 2026-09-14) — antes reutilizaban el de Tamames como relleno
   temporal, marcado con "(Pendiente)". "antiguedad" (Béjar/Tamames,
   no en taller-inhouse todavía): años reales pendientes de confirmar,
   "X" de relleno mientras tanto.

   MEDIOS: sin vídeos ni gif (a petición directa del usuario, no le
   gustaban en el carrusel — se han borrado también los .mp4 que
   había en public/img/talleres/{bejar,tamares}/, solo quedan fotos).
   Las fotos están reexportadas a .webp, ancho máximo 1600px, calidad
   78 (las originales eran JPG de hasta 20MP/~2MB — de foto de
   cámara, no pensadas para web). Varias venían giradas 90° sin
   metadato EXIF de orientación (el "Orientation" tag no estaba
   presente), así que además de comprimir hubo que rotarlas a mano
   una a una (no todas necesitaban lo mismo, ver historial de
   conversión). Reduce el peso de esta carpeta en más de un 90% sin
   pérdida apreciable de calidad a los tamaños en los que se muestran
   (ver .marco en page.module.css). */

// Taller inhouse: 5 fotos + 1 vídeo reales, en
// public/img/talleres/inhouse/ — el vídeo va en 2ª posición (ver
// "esVideo" en page.js, que lo distingue de las fotos por extensión).
const MEDIOS_TALLER_INHOUSE = [
  '/img/talleres/inhouse/rbksom_blobid1671730782555.jpg',
  '/img/talleres/inhouse/artesany-2.mp4',
  '/img/talleres/inhouse/ateliernovia-lamedida-felycampo-2.webp',
  '/img/talleres/inhouse/WhatsApp Image 2026-08-25 at 14.06.07.jpeg',
  '/img/talleres/inhouse/WhatsApp Image 2026-08-25 at 14.06.12.jpeg',
  '/img/talleres/inhouse/WhatsApp Image 2026-08-25 at 14.06.29.jpeg',
];

// Taller 1 (Béjar): 6 fotos reales, en public/img/talleres/bejar/.
const MEDIOS_TALLER_1 = [
  '/img/talleres/bejar/bejar-taller-felycampo-01.webp',
  '/img/talleres/bejar/bejar-taller-felycampo-02.webp',
  '/img/talleres/bejar/bejar-taller-felycampo-03.webp',
  '/img/talleres/bejar/bejar-taller-felycampo-04.webp',
  '/img/talleres/bejar/bejar-taller-felycampo-05.webp',
  '/img/talleres/bejar/bejar-taller-felycampo-06.webp',
];

// Taller 2 (Tamames): 8 fotos reales, en public/img/talleres/tamares/
// (nombre de carpeta tal cual lo subió el usuario, con esa grafía).
const MEDIOS_TALLER_2 = [
  '/img/talleres/tamares/00-taller.webp',
  '/img/talleres/tamares/01-taller.webp',
  '/img/talleres/tamares/02-taller.webp',
  '/img/talleres/tamares/03-taller.webp',
  '/img/talleres/tamares/04-taller.webp',
  '/img/talleres/tamares/05-taller.webp',
  '/img/talleres/tamares/06-taller.webp',
  '/img/talleres/tamares/07-taller.webp',
];

export const TALLERES = [
  {
    // Nuevo, a petición — texto todavía de relleno (lorem ipsum) hasta
    // que llegue el contenido real, pero ya con reportaje propio (ver
    // MEDIOS_TALLER_INHOUSE arriba). Primero en la lista: es "nuestro
    // taller principal", antes de los dos de la sierra.
    id: 'taller-inhouse',
    medios: MEDIOS_TALLER_INHOUSE,
    tipo: { es: 'TALLER INHOUSE', en: 'IN-HOUSE WORKSHOP' },
    distancia: { es: 'Nuestro taller principal', en: 'Our main workshop' },
    liderazgo: { es: 'Liderado por X', en: 'Led by X' },
    parrafos: {
      es: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ],
      en: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ],
    },
  },
  {
    id: 'taller-1',
    imagen: '/img/talleres/bejar/bejar-taller-felycampo-01.webp',
    medios: MEDIOS_TALLER_1,
    tipo: { es: 'Taller I', en: 'Workshop I' },
    distancia: { es: '72 km desde nuestro taller en Salamanca', en: '72 km from our workshop in Salamanca' },
    liderazgo: { es: 'Liderado por Blanca', en: 'Led by Blanca' },
    // (Pendiente) años reales — "X" de relleno hasta que se confirme.
    antiguedad: { es: 'X años trabajando con nosotros', en: 'X years working with us' },
    parrafos: {
      es: [
        'Su historia con la costura inició cuando ella cumple 12 años, cuando su madre la llevó a aprender con una modista. A los 16, cuando antaño se podía empezar a trabajar, entró en una fábrica y desde entonces coser se convirtió en su manera de estar en el mundo: es lo que ama, lo que conoce y lo que sigue haciendo, cada día, con la misma entrega.',
        'Después de pasar por distintas fábricas y ver cómo fueron cerrando una tras otra, hace 13 años abrió su propio taller. Fue entonces cuando comenzó también su historia con Fely Campo, una relación construida puntada a puntada, desde el oficio, la constancia y el amor por hacer las cosas bien.',
        'Su lugar de trabajo habla de ella. Está lleno de plantas y flores, de fotos de sus mascotas y de su familia, de dos canarios en la ventana rodeados de verde, y de frases sobre la historia de la moda que cubren las paredes. Un taller lleno de vida, donde la costura no es solo un oficio, sino una forma de habitar el tiempo.',
      ],
      en: [
        'Her story with sewing began when she turned 12, when her mother took her to learn from a dressmaker. At 16 — back when you could start working at that age — she joined a factory, and from then on sewing became her way of being in the world: it’s what she loves, what she knows, and what she still does, every day, with the same dedication.',
        'After working in several factories and watching them close down one after another, she opened her own workshop 13 years ago. That was also when her story with Fely Campo began — a relationship built stitch by stitch, out of craft, perseverance and a love of doing things well.',
        'Her workshop speaks of her. It’s full of plants and flowers, photos of her pets and her family, two canaries by the window surrounded by greenery, and quotes about the history of fashion covering the walls. A workshop full of life, where sewing isn’t just a craft but a way of inhabiting time.',
      ],
    },
  },
  {
    id: 'taller-2',
    imagen: '/img/talleres/tamares/00-taller.webp',
    medios: MEDIOS_TALLER_2,
    tipo: { es: 'Taller II', en: 'Workshop II' },
    distancia: { es: '54 km desde nuestro taller en Salamanca', en: '54 km from our workshop in Salamanca' },
    liderazgo: { es: 'Liderado por María José', en: 'Led by María José' },
    // (Pendiente) años reales — "X" de relleno hasta que se confirme.
    antiguedad: { es: 'X años trabajando con nosotros', en: 'X years working with us' },
    parrafos: {
      es: [
        'En Tamames, el tiempo se mide con experiencia y sueños cumplidos.',
        'María José lleva 44 años dedicándose a la costura. Amalia, 25. Isabel, 36. Amalia e Isabel son hermanas, y las tres comparten mucho más que un oficio. Realmente es una pasión.',
        'Hace 35 años trabajaban juntas en un pequeño taller de la misma calle para otros costureros. Desde su ventana veían, justo enfrente, el espacio que algún día imaginaron como propio. Un lugar más grande, más suyo, donde continuar haciendo aquello que sabían hacer con las manos y con el corazón.',
        'Un día cruzaron la calle.',
        'Desde entonces, aquel taller soñado se convirtió en su lugar de trabajo. Y desde hace 19 años, también forma parte de la historia de Fely Campo. En los tablones de corcho conviven pequeñas estampas religiosas, que colecciona Amalia, con una fotografía de David Bustamante, el favorito de María José. Pequeños gestos que han acumulado por el paso de los años y hablan de ellas, convirtiendo el espacio de trabajo en algo íntimo y propio.',
        'Tres mujeres, décadas de oficio y una manera de entender la costura que no se aprende deprisa. Se transmite, se perfecciona y se conserva.',
      ],
      en: [
        'In Tamames, time is measured in experience and dreams come true.',
        'María José has been sewing for 44 years. Amalia, 25. Isabel, 36. Amalia and Isabel are sisters, and the three of them share much more than a craft — it’s truly a passion.',
        'Thirty-five years ago they worked together in a small workshop on the same street, for other tailors. From their window they could see, right across the street, the space they once imagined as their own: somewhere bigger, more theirs, where they could keep doing what they knew how to do with their hands and their heart.',
        'One day they crossed the street.',
        'Since then, that dreamed-of workshop became their workplace. And for the past 19 years, it has also been part of Fely Campo’s story. On the corkboards, small religious prints collected by Amalia sit alongside a photo of David Bustamante, María José’s favourite. Small details gathered over the years that speak of who they are, turning the workspace into something intimate and their own.',
        'Three women, decades of craft, and a way of understanding sewing that isn’t learned quickly. It’s passed down, refined, and kept alive.',
      ],
    },
  },
];
