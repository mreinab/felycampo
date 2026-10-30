// citaAtelier.js
//
// Datos compartidos del formulario de cita (/visita-fely-campo/cita) entre
// la página (cliente) y la API que lo procesa (src/app/api/cita/route.js):
// tipos de cita y página de confirmación. El formulario ya no pregunta el
// atelier (lo decide el equipo al contactar), así que ya no hay lista de
// ateliers aquí. El email que recibe los avisos NO vive aquí (este archivo
// llega al navegador) — lo lee la API de variables de entorno, ver
// .env.example.

export const TIPOS_CITA = ['novia', 'invitada'];

// Página de confirmación tras enviar el formulario. Sin tipo (el
// formulario ya no lo pregunta), la genérica; con tipo, las antiguas de
// novia/invitada, que se mantienen para enlaces ya existentes.
export function rutaConfirmacionCita(tipo) {
  return tipo ? `/visita-fely-campo/cita/confirmacion-${tipo}` : '/visita-fely-campo/cita/confirmacion';
}
