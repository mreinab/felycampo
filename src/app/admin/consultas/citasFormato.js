// citasFormato.js
//
// Formato compartido por el listado y el detalle de Citas
// (/admin/consultas): fechas en español y nombre del atelier a partir
// de su id (ATELIERES_CITA, mismo origen que el formulario del front).

import { ATELIERES_CITA } from '@/lib/citaAtelier';

export function nombreAtelier(id) {
  return ATELIERES_CITA.find((a) => a.id === id)?.nombre ?? id;
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
