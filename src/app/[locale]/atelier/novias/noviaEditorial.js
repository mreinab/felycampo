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
   El segundo usa una foto real de Bride 27.

   "backstage": fotos reales de Bride 27 (LOOK-*-scaled.webp, ver
   public/img/collections/novia/bride-27/) para RunwayBackstage — la
   misma cuadrícula editorial que ya usa La Colección en
   /runways-la-coleccion, aquí con looks de novia en vez de backstage
   de pasarela. Selección a mano de las fotos más fuertes/editoriales,
   sin repetir las dos ya usadas en "bloques". */

const RUTA_BRIDE_27 = '/img/collections/novia/bride-27';

export const NOVIA_EDITORIAL = {
  descripcion: {
    es: [
      'Cada novia llega con una historia distinta, con su propia manera de entender ese día.',
      'De ahí nace el vestido, nunca al revés: primero la escuchamos a ella, después cortamos la tela.',
    ],
    en: [
      'Every bride arrives with a different story, with her own way of understanding that day.',
      'The dress is born from it, never the other way around: first we listen to her, only then do we cut the fabric.',
    ],
  },

  bloques: [
    {
      imagen: '/img/novias-sección-FelyCampo4.jpg',
      titulo: {
        es: 'Una historia, un vestido',
        en: 'One story, one dress',
      },
      texto: {
        es: 'En el atelier el punto de partida nunca es el patrón: es la novia. Escuchamos quién es, cómo se mueve, qué quiere sentir el día de su boda, y desde ahí construimos cada pieza, a mano y a su medida.',
        en: 'In the atelier the starting point is never the pattern: it is the bride. We listen to who she is, how she moves, what she wants to feel on her wedding day, and from there we build every piece, by hand and to her measure.',
      },
    },
    {
      imagen: `${RUTA_BRIDE_27}/LOOK-8-scaled.webp`,
      titulo: {
        es: 'Hecho a mano, para ella',
        en: 'Handmade, for her',
      },
      texto: {
        es: 'Esa misma manera de trabajar da forma a cada colección: siluetas depuradas, tejidos nobles y un cuidado artesanal en cada costura, pensados para acompañar a la novia, no para imponerse sobre ella.',
        en: 'That same way of working shapes every collection: pared-back silhouettes, noble fabrics and artisanal care in every seam, made to accompany the bride, never to overshadow her.',
      },
    },
  ],

  backstage: [
    `${RUTA_BRIDE_27}/LOOK-2-scaled.webp`,
    `${RUTA_BRIDE_27}/LOOK-1.2-scaled.webp`,
    `${RUTA_BRIDE_27}/LOOK-16-scaled.webp`,
    `${RUTA_BRIDE_27}/LOOK-10-scaled.webp`,
    `${RUTA_BRIDE_27}/LOOK-4-scaled.webp`,
    `${RUTA_BRIDE_27}/LOOK-17-scaled.webp`,
    `${RUTA_BRIDE_27}/LOOK-13-1-scaled.webp`,
  ],
};
