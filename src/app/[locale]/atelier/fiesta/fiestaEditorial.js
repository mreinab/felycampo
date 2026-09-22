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

const RUTA_SS26 = '/img/collections/fiesta/primavera-verano-26';
const RUTA_SS25 = '/img/collections/fiesta/primavera-verano-25';

export const FIESTA_EDITORIAL = {
  descripcion: {
    es: [
      'Cada fiesta pide su propio vestido, su propia manera de brillar.',
      'En el atelier trabajamos esa versión única, pieza a pieza, hasta encontrarla.',
    ],
    en: [
      'Every occasion calls for its own dress, its own way of shining.',
      'In the atelier we work on that one version, piece by piece, until we find it.',
    ],
  },

  bloques: [
    {
      imagen: `${RUTA_SS25}/LOOK16_1-scaled.webp`,
      titulo: {
        es: 'Un vestido, una noche',
        en: 'One dress, one night',
      },
      texto: {
        es: 'Cada pieza de fiesta nace de una ocasión concreta: una boda, una gala, una cena que se recuerda. Escuchamos qué momento va a vivir cada clienta y construimos el vestido a su alrededor.',
        en: 'Every evening piece is born from a specific occasion: a wedding, a gala, a dinner worth remembering. We listen to the moment each client is about to live and build the dress around it.',
      },
    },
    {
      imagen: `${RUTA_SS26}/FELYCAMPO_KristenWicce_2526_ALTA-14-scaled.jpg`,
      titulo: {
        es: 'El detalle que se nota',
        en: 'The detail that shows',
      },
      texto: {
        es: 'Tejidos nobles, siluetas trabajadas a mano y un acabado artesanal en cada costura: la misma manera de trabajar detrás de cada pieza de fiesta.',
        en: 'Noble fabrics, hand-worked silhouettes and an artisanal finish in every seam: the same way of working behind every evening piece.',
      },
    },
  ],

  backstage: [
    `${RUTA_SS25}/LOOK27_2-scaled.webp`,
    `${RUTA_SS26}/FELYCAMPO_KristenWicce_2526_ALTA-50-scaled.jpg`,
    `${RUTA_SS25}/LOOK13_2-scaled.webp`,
    `${RUTA_SS25}/LOOK12_1-scaled.webp`,
  ],
};
