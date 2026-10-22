// citaAtelier.js
//
// Datos compartidos del formulario de cita (/visita-fely-campo/cita) entre
// la página (cliente) y la API que lo procesa (src/app/api/cita/route.js):
// ateliers que se pueden elegir y tipos de cita. Los emails del equipo de
// cada atelier NO viven aquí (este archivo llega al navegador) — los lee la
// API de variables de entorno, ver .env.example.

export const ATELIERES_CITA = [
  { id: 'salamanca', nombre: 'Salamanca' },
  { id: 'madrid', nombre: 'Madrid' },
  { id: 'oviedo', nombre: 'Oviedo' },
];

export const TIPOS_CITA = ['novia', 'invitada'];

// Página de confirmación de cada tipo (una por tipo, para poder medir
// las conversiones de novia e invitada por separado también por URL).
export function rutaConfirmacionCita(tipo) {
  return `/visita-fely-campo/cita/confirmacion-${tipo}`;
}
