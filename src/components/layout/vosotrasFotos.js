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
  'fely-campo-novias-reales-01.webp',
  'fely-campo-novias-reales-02.webp',
  'fely-campo-novias-reales-03.webp',
  'fely-campo-novias-reales-04.webp',
  'fely-campo-novias-reales-05.webp',
  'fely-campo-novias-reales-06.webp',
  'fely-campo-novias-reales-07.webp',
  'fely-campo-novias-reales-08.webp',
  'fely-campo-novias-reales-09.webp',
  'fely-campo-novias-reales-10.webp',
  'fely-campo-novias-reales-11.webp',
  'fely-campo-novias-reales-12.webp',
  'fely-campo-novias-reales-13.webp',
  'fely-campo-novias-reales-14.webp',
  'fely-campo-novias-reales-15.webp',
  'fely-campo-novias-reales-16.webp',
  'fely-campo-novias-reales-17.webp',
].map((archivo) => [`${RUTA_FINALES}/${archivo}`]);

// Orden de la cuadrícula (de arriba a abajo/izquierda a derecha):
// pedido explícito para los primeros grupos (madrina con reseña,
// madrinas; 14 se bajó luego a la 2ª fila),
// el resto sigue el orden en que se fueron agrupando. Una entrada que
// empiece por '/' es ya la ruta completa de la foto (no sigue el patrón
// fely-campo-invitadas-reales-nuestras-XX-YY.webp), p. ej. la de madrinas.
export const FOTOS_INVITADAS = [
  [
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-madrina-review-1.webp`,
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-madrina-review-2.webp`,
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-madrina-review-1-1.webp`,
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-madrina-review-1-2.webp`,
  ],
  [`${RUTA_INVITADAS}/fely-campo-invitadas-reales-madrinas.webp`],
  // Quitados a petición de la cuadrícula: 11, 23, 07, 04 (casillas 4-7),
  // 16-02 (solo la foto interior, 16-01 sigue de portada), 25, 27, 28
  // (fila 4, columnas 1-3), 32 y 31 (las últimas). Las fotos siguen en
  // public/img/Clientes/CLIENTAS/.
  ['13-03', '13-01', '13-02'], // 13-03 de portada, a petición
  // 16, 19, 20, 14 y 21 (antes casillas 4-8) movidos al final, a petición.
  ['30-01', '30-02', '30-03'],
  [
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-vosotras-fiesta.webp`,
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-vosotras-fiesta-2.webp`,
  ],
  [`${RUTA_INVITADAS}/fely-campo-invitadas-reales-vosotras.webp`],
  [`${RUTA_INVITADAS}/fely-campo-invitadas-reales-vosotras-madrinas.webp`],
  [
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-vosotras-madrinas-look.webp`,
    `${RUTA_INVITADAS}/fely-campo-invitadas-reales-vosotras-madrinas-look-1-2.webp`,
  ],
  [`${RUTA_INVITADAS}/fely-campo-invitadas-reales-foto.webp`],
  // Carrusel de madrinas (look-1 de portada, a petición). Pedidas de la
  // 1 a la 14, pero en la carpeta solo están la 1, 12, 13 y 14 — añadir
  // aquí el número de las que falten (2-11) cuando se suban.
  [1, 12, 13, 14].map((n) => `${RUTA_INVITADAS}/fely-campo-invitadas-reales-vosotras-madrinas-look-${n}.webp`),
  // Antes casillas 4-8 — al final de la cuadrícula a petición, mismo orden.
  ['16-01'],
  ['19-01', '19-02'],
  ['20-05', '20-01', '20-02', '20-03'], // 20-05 de portada, a petición
  ['14-01'],
  ['21-01', '21-02'],
].map((grupo) => grupo.map((sufijo) => sufijo.startsWith('/') ? sufijo : `${RUTA_INVITADAS}/fely-campo-invitadas-reales-nuestras-${sufijo}.webp`));

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
  ].map((grupo) => grupo.map((sufijo) => `${RUTA_NOVIAS}/fely-campo-novias-reales-nuestras-${sufijo}.webp`)),
];

// Reseñas reales de clientas, por la foto de portada de su grupo (la
// primera del array en FOTOS_INVITADAS/FOTOS_NOVIAS). Se muestran en el
// lightbox de GaleriaVosotras.jsx, junto a las fotos. Texto literal de
// la clienta (no se traduce): mismo texto en es y en.
export const RESENAS_VOSOTRAS = {
  [`${RUTA_INVITADAS}/fely-campo-invitadas-reales-madrina-review-1.webp`]: {
    parrafos: [
      'Feliz y orgullosa siendo la madrina de la boda de mi hijo pequeño. Fue uno de los días más felices y entrañables de mi vida.',
      'Estoy muy agradecida a Fely que diseñó mi vestido, me sentí elegante, cómoda y, mal es decirlo, muy guapa. Admiro su trabajo y sobre todo su filosofía de trabajo. Un orgullo para Salamanca.',
      'La artífice fue Charo que, con su psicología para captar lo que la cliente quisiera, acierta totalmente en aconsejar. Es paciente, amable, cariñosa y supo ver desde el primer día lo que quería. No tengo palabras para agradecer su trato exquisito.',
    ],
  },
};
