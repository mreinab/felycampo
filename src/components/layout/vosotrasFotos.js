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

// Orden de la cuadrícula (de arriba a abajo/izquierda a derecha):
// pedido explícito para los primeros 4 grupos (14, 11, 23, 07), el
// resto sigue el orden en que se fueron agrupando.
export const FOTOS_INVITADAS = [
  ['14-01'],
  ['11-01', '11-02', '11-03', '11-04'],
  ['23-01'],
  ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06'],
  ['04-01', '04-02', '04-03'],
  ['13-01', '13-02', '13-03'],
  ['16-01', '16-02'],
  ['19-01', '19-02'],
  ['20-01', '20-02', '20-03'],
  ['21-01', '21-02'],
  ['25-01', '25-02', '25-03', '25-04', '25-05'],
  ['27-01', '27-02'],
  ['28-01'],
  ['30-01', '30-02', '30-03'],
  ['31-01'],
  ['32-01', '32-02'],
].map((grupo) => grupo.map((sufijo) => `${RUTA_INVITADAS}/nuestras-invitadas-felycampo-${sufijo}.${sufijo === '30-01' ? 'png' : 'jpg'}`));

export const FOTOS_NOVIAS = [
  ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07', '01-08'],
  ['03-01'],
  ['04-01', '04-02'],
  ['05-01', '05-02', '05-03', '05-04', '05-05'],
  ['09-01', '09-02', '09-03', '09-04'],
  ['10-01', '10-02'],
  ['13-01', '13-02', '13-03'],
].map((grupo) => grupo.map((sufijo) => `${RUTA_NOVIAS}/nuestras-novias-felycampo-${sufijo}.jpg`));
