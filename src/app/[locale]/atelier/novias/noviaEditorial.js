/* Contenido editorial de /atelier/novias, antes del catálogo (ver
   page.js) — mismo criterio que atelierIndex.js/atelieres.js: texto
   largo y propio de esta página, bilingüe por campo ({es, en}), no
   encaja en messages/{locale}.json.

   A petición explícita: la página deja de enseñar las 6 colecciones
   de Novia (Bride 27, ME, Bambú Novia, Savia Novia, Inside,
   Introspección — siguen intactas en noviaProductos.js, catálogo real
   que también alimenta /admin/colecciones/novia) y pasa a mostrar solo
   la última, Bride 27, precedida de una sección de storytelling: cómo
   se trabaja con cada novia en el atelier, antes de la cuadrícula de
   looks. Mismo patrón que /atelier-fiesta/salamanca (BloqueSeccion en
   zigzag) + el backstage de /runways-la-coleccion (RunwayBackstage,
   fotos fuertes sin recortar).

   "descripcion": frases cortas para RunwayDescripcion (array, ver
   soporte de array ahí) — la entrada a la sección, antes de los
   bloques.

   "bloques": dos BloqueSeccion en zigzag (invertido alterna por índice
   en page.js). El primero usa la misma foto editorial que ya ilustra
   "Novias" en Madrid (atelieres.js) y en /atelier (atelierIndex.js) —
   reutilizada aquí a propósito, mismo criterio que esas dos páginas.
   El segundo usa una foto de public/img/collections/novia/novias-page/.

   "backstage": el resto de fotos de novias-page/ para RunwayBackstage —
   la misma cuadrícula editorial que ya usa La Colección en
   /runways-la-coleccion, sin repetir la ya usada en
   "bloques". */

// Fotos propias de la página (a petición): segundo bloque + backstage.
const RUTA_NOVIAS_PAGE = '/img/collections/novia/novias-page';

export const NOVIA_EDITORIAL = {
  descripcion: {
    es: [
      'Cada novia llega con una historia distinta y una manera propia de imaginar el día de su boda. Escucharla es el primer paso para crear su vestido de novia a medida.',
      'De esa historia nace el vestido de novia: primero escuchamos a quien lo llevará; después elegimos los tejidos, trabajamos el patrón y damos forma a cada detalle.',
    ],
    en: [
      'Every bride arrives with a different story, with her own way of understanding that day.',
      'The dress is born from it, never the other way around: first we listen to her, only then do we cut the fabric.',
    ],
  },

  bloques: [
    {
      imagen: '/img/Clientes/fely-campo-invitadas-reales-novias-atelier.webp',
      titulo: {
        es: 'Una historia, un vestido',
        en: 'One story, one dress',
      },
      texto: {
        es: 'En nuestro atelier de novias, el punto de partida nunca es el patrón: es la mujer que llevará el vestido. Escuchamos quién es, cómo se mueve y qué quiere sentir el día de su boda. A partir de ahí, trabajamos el diseño, los tejidos y cada detalle para crear un vestido de novia a medida.',
        en: 'In the atelier the starting point is never the pattern: it is the bride. We listen to who she is, how she moves, what she wants to feel on her wedding day, and from there we build every piece, by hand and to her measure.',
      },
    },
    {
      imagen: `${RUTA_NOVIAS_PAGE}/fely-campo-atelier-novias-vestido-novia-02.webp`,
      titulo: {
        es: 'Hecho a mano, para ella',
        en: 'Handmade, for her',
      },
      texto: {
        es: 'Esa misma forma de trabajar define nuestras colecciones de novia: siluetas depuradas, tejidos nobles y cuidado artesanal en cada costura. Diseños pensados para acompañar a cada mujer con naturalidad, sin imponerse sobre ella.',
        en: 'That same way of working shapes every collection: pared-back silhouettes, noble fabrics and artisanal care in every seam, made to accompany the bride, never to overshadow her.',
      },
    },
  ],

  // Las 11 fotos restantes de novias-page/ (FELYCAMPO NOVIAS0033 va en
  // el segundo bloque; el hero de page.js sigue con su foto de siempre).
  backstage: [
    'fely-campo-atelier-novias-vestido-novia-05.webp',
    'fely-campo-atelier-novias-vestido-novia-06.webp',
    'fely-campo-atelier-novias-vestido-novia-07.webp',
    'fely-campo-atelier-novias-vestido-novia-08.webp',
    'fely-campo-atelier-novias-vestido-novia-09.webp',
    'fely-campo-atelier-novias-vestido-novia-10.webp',
    'fely-campo-atelier-novias-vestido-novia-11.webp',
    'fely-campo-atelier-novias-vestido-novia-12.webp',
    'fely-campo-atelier-novias-vestido-novia-01.webp',
    'fely-campo-atelier-novias-vestido-novia-03.webp',
    'fely-campo-atelier-novias-vestido-novia-04.webp',
  ].map((archivo) => `${RUTA_NOVIAS_PAGE}/${archivo}`),
};
