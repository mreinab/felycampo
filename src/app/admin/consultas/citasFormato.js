// citasFormato.js
//
// Formato compartido por el listado y el detalle de Citas
// (/admin/consultas): fechas en español e idioma. Sin atelier: el
// formulario ya no lo pregunta, lo decide el equipo al contactar.

// Idioma de la web desde la que se envió el formulario (locale).
export const IDIOMAS_CITA = [
  { valor: 'es', etiqueta: 'Español' },
  { valor: 'en', etiqueta: 'Inglés' },
];

export function nombreIdioma(locale) {
  return IDIOMAS_CITA.find((i) => i.valor === locale)?.etiqueta ?? locale;
}

// "2027-06-12" → "12 jun 2027"
export function fechaCorta(fecha) {
  if (!fecha) return '—';
  return new Date(`${fecha}T12:00:00`).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

// "2026-10-26T18:42" → "26 oct 2026, 18:42"
export function fechaHora(fechaHoraIso) {
  const [fecha, hora] = fechaHoraIso.split('T');
  return `${fechaCorta(fecha)}, ${hora}`;
}
