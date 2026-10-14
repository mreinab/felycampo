// vosotrasFotos.js

/* ============================================================
   FOTOS DE CLIENTAS — Fely Campo
   Fotos reales agrupadas a mano (carpeta public/img/Clientes/CLIENTAS/
   y su subcarpeta novias/), compartidas por GaleriaVosotras.jsx
   (/atelier/vosotras) y CarruselClientas.jsx (home/atelier) para que
   ambas muestren las mismas fotos/agrupaciones en vez de mantener dos
   copias. Cada array interior es UN grupo de fotos que a simple vista
   parecen de la misma clienta/misma boda — ver comentario de cabecera
   de GaleriaVosotras.jsx para más contexto de cómo se agruparon.
   ============================================================ */

const RUTA_INVITADAS = '/img/Clientes/CLIENTAS';
const RUTA_NOVIAS = '/img/Clientes/CLIENTAS/novias';
const RUTA_FINALES = '/img/Clientes/CLIENTAS/finales';

// Fotos nuevas de novias (carpeta finales/, a petición): cada una es su
// propia casilla (no se agrupan) y van las primeras de la pestaña
// Novias, por delante de los grupos antiguos.
const NOVIAS_FINALES = [
  '_MG_9830_1.jpg',
  '_MG_9858_ByN.jpg',
  '631d2890-aeb6-469c-a502-3ca1b57acf47.jpg',
  '8b393a07-01c3-48ad-baa6-363f0e5421c9.jpg',
  '8c8b3cc3-c0a2-4e89-8e4d-f716fb297f41.jpg',
  'BODA-ESTEFANIA_ADRIAN07166.jpg',
  'Captura de pantalla 2026-01-31 a las 21.32.36.png',
  'f7eb2328-1a1d-42a8-b318-84555ae88b05.jpg',
  'IMG_6067.jpg',
  'IMG_6068.jpg',
  'IMG_6071.jpg',
  'IMG-20260922-WA0007.jpg',
  'PHOTO-2025-10-16-13-35-59 6.jpg',
  'PHOTO-2025-10-16-13-55-08 2.jpg',
  'PHOTO-2025-10-16-13-55-09 2.jpg',
  'Unknown.jpeg',
  'WhatsApp Image 2026-08-11 at 17.48.25 (1).jpeg',
].map((archivo) => [`${RUTA_FINALES}/${archivo}`]);

// Orden de la cuadrícula (de arriba a abajo/izquierda a derecha):
// pedido explícito para los primeros grupos (madrina con reseña,
// madrinas, 14, 11, 23, 07),
// el resto sigue el orden en que se fueron agrupando. Una entrada que
// empiece por '/' es ya la ruta completa de la foto (no sigue el patrón
// nuestras-invitadas-felycampo-XX-YY), p. ej. madrinas-felycampo.jpg.
export const FOTOS_INVITADAS = [
  [
    `${RUTA_INVITADAS}/madrina-felycampo-review (1).jpeg`,
    `${RUTA_INVITADAS}/madrina-felycampo-review (2).jpeg`,
    `${RUTA_INVITADAS}/madrina-felycampo-review-1 (1).jpeg`,
    `${RUTA_INVITADAS}/madrina-felycampo-review-1 (2).jpeg`,
  ],
  [`${RUTA_INVITADAS}/madrinas-felycampo.jpg`],
  ['14-01'],
  // Quitados a petición de la cuadrícula: 11, 23, 07, 04 (casillas 4-7),
  // 16-02 (solo la foto interior, 16-01 sigue de portada), 25, 27, 28
  // (fila 4, columnas 1-3), 32 y 31 (las últimas). Las fotos siguen en
  // public/img/Clientes/CLIENTAS/.
  ['13-01', '13-02', '13-03'],
  ['16-01'],
  ['19-01', '19-02'],
  ['20-05', '20-01', '20-02', '20-03'], // 20-05 de portada, a petición
  ['21-01', '21-02'],
  ['30-01', '30-02', '30-03'],
].map((grupo) => grupo.map((sufijo) => sufijo.startsWith('/') ? sufijo : `${RUTA_INVITADAS}/nuestras-invitadas-felycampo-${sufijo}.${sufijo === '30-01' ? 'png' : 'jpg'}`));

export const FOTOS_NOVIAS = [
  ...NOVIAS_FINALES,
  ...[
    ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07', '01-08'],
    ['03-01'],
    ['04-01', '04-02'],
    // 05 (fila 1, columna 4) quitado a petición — fotos siguen en novias/.
    ['09-01', '09-02', '09-03', '09-04'],
    ['10-01', '10-02'],
    ['13-01', '13-02', '13-03'],
  ].map((grupo) => grupo.map((sufijo) => `${RUTA_NOVIAS}/nuestras-novias-felycampo-${sufijo}.jpg`)),
];

// Reseñas reales de clientas, por la foto de portada de su grupo (la
// primera del array en FOTOS_INVITADAS/FOTOS_NOVIAS). Se muestran en el
// lightbox de GaleriaVosotras.jsx, junto a las fotos. Texto literal de
// la clienta (no se traduce): mismo texto en es y en.
export const RESENAS_VOSOTRAS = {
  [`${RUTA_INVITADAS}/madrina-felycampo-review (1).jpeg`]: {
    parrafos: [
      'Feliz y orgullosa siendo la madrina de la boda de mi hijo pequeño. Fue uno de los días más felices y entrañables de mi vida.',
      'Estoy muy agradecida a Fely que diseñó mi vestido, me sentí elegante, cómoda y, mal es decirlo, muy guapa. Admiro su trabajo y sobre todo su filosofía de trabajo. Un orgullo para Salamanca.',
      'La artífice fue Charo que, con su psicología para captar lo que la cliente quisiera, acierta totalmente en aconsejar. Es paciente, amable, cariñosa y supo ver desde el primer día lo que quería. No tengo palabras para agradecer su trato exquisito.',
    ],
  },
};
