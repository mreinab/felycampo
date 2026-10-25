/* Contenido editorial de /atelier/fiesta, antes de la cuadrícula (ver
   page.js) — mismo criterio que noviaEditorial.js (ver ahí el detalle
   completo del patrón): texto largo y propio de esta página, bilingüe
   por campo ({es, en}), no encaja en messages/{locale}.json.

   Mismo patrón que /atelier/novias: dos BloqueSeccion en zigzag +
   un RunwayBackstage de fotos fuertes, en vez de ir directa a la
   cuadrícula de looks. Fotos "de decoración" (a petición explícita, 6
   en total, lista cerrada — no cualquier foto de las dos carpetas):
   Primavera Verano 2026 (campaña de estudio, KristenWicce) y
   Primavera Verano 2025 (editorial), sin nombrar ninguna colección en
   el texto — habla en general del oficio, no de una colección
   concreta (mismo criterio que noviaEditorial.js tras la corrección de
   "Bride 27"). Orden mezclado a propósito (a petición explícita, no en
   el orden en que se pidieron) entre las dos carpetas.

   "descripcion": frases cortas para RunwayDescripcion (array) — la
   entrada a la sección, antes de los bloques.

   "bloques": dos BloqueSeccion en zigzag (invertido alterna por índice
   en page.js) — las 2 primeras de las 6 fotos.

   "backstage": las 4 fotos restantes de las 6, para RunwayBackstage. */

/* Medios cambiados a petición por los de
   public/img/collections/fiesta/introduccion/ (4 fotos + 3 vídeos,
   todos verticales), alternando foto y vídeo a lo largo de toda la
   introducción en vez de agruparlos: bloque 1 foto → bloque 2 vídeo →
   backstage: foto ByN a todo el ancho, fila vídeo + foto, vídeo solo,
   foto ByN a todo el ancho de cierre. "tipo" en cada bloque y
   {tipo, src} en backstage (ver BloqueSeccion.jsx / RunwayBackstage.jsx). */
const RUTA_INTRO = '/img/collections/fiesta/introduccion';

export const FIESTA_EDITORIAL = {
  descripcion: {
    es: [
      'Cada ocasión merece su propio vestido de fiesta: una boda, una celebración o una noche que permanece en la memoria. Diseñamos para que cada mujer encuentre su forma de estar y sentirse.',
      'En el atelier, cada vestido de fiesta se trabaja pieza a pieza, a partir de la ocasión, tus preferencias y el asesoramiento de nuestro equipo.',
    ],
    en: [
      'Every occasion calls for its own dress, its own way of shining.',
      'In the atelier we work on that one version, piece by piece, until we find it.',
    ],
  },

  bloques: [
    {
      tipo: 'imagen',
      imagen: `${RUTA_INTRO}/fely-campo-atelier-fiesta-foto-03.webp`,
      titulo: {
        es: 'Un vestido, una noche',
        en: 'One dress, one night',
      },
      texto: {
        es: 'Cada vestido de fiesta nace de una ocasión concreta: una boda, una gala o una celebración especial. Escuchamos qué momento vas a vivir y trabajamos el diseño a partir de tus preferencias, cuidando la silueta, los tejidos y los detalles.',
        en: 'Every evening piece is born from a specific occasion: a wedding, a gala, a dinner worth remembering. We listen to the moment each client is about to live and build the dress around it.',
      },
    },
    {
      tipo: 'video',
      imagen: `${RUTA_INTRO}/felycampo-fiesta-media (1).mp4`,
      titulo: {
        es: 'El detalle que se nota',
        en: 'The detail that shows',
      },
      texto: {
        es: 'Tejidos nobles, siluetas cuidadas y acabados artesanales definen nuestros vestidos de fiesta. Cada costura refleja una manera de trabajar que pone el oficio y la atención al detalle en el centro.',
        en: 'Noble fabrics, hand-worked silhouettes and an artisanal finish in every seam: the same way of working behind every evening piece.',
      },
    },
  ],

  // Sin FelyCampo_ATELIER_KristenWicce-11.jpg, a petición: esa foto
  // queda solo en el hero de la página.
  backstage: [
    { tipo: 'video', src: `${RUTA_INTRO}/felycampo-fiesta-media (2).mp4` },
    { tipo: 'imagen', src: `${RUTA_INTRO}/fely-campo-atelier-fiesta-aw2026-162.webp` },
    { tipo: 'video', src: `${RUTA_INTRO}/felycampo-fiesta-media (3).mp4` },
    { tipo: 'imagen', src: `${RUTA_INTRO}/fely-campo-atelier-fiesta-aw2026-164.webp` },
  ],
};
