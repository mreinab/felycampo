// guiaTallasData.js
//
// Tabla de medidas Fely Campo (cm) — solo los números y el orden de
// las columnas; las etiquetas/textos ("Pecho", "Rodea el busto...")
// viven en messages/{locale}.json bajo "guiaTallas.medidas.<clave>"
// (mismo criterio que clientsReview.resenas: contenido de la app,
// traducido, no datos). Un único valor por medida (ya no "real"/
// "patrón" — la tabla mostraba siempre "patrón", así que se simplifica
// a un solo número por talla/medida).

export const CLAVES_MEDIDAS = ['pecho', 'cintura', 'cadera'];

const MEDIDAS_POR_TALLA = {
  36: { pecho: 86, cintura: 69, cadera: 90 },
  38: { pecho: 90, cintura: 73, cadera: 94 },
  40: { pecho: 94, cintura: 77, cadera: 98 },
  42: { pecho: 98, cintura: 81, cadera: 102 },
  44: { pecho: 102, cintura: 85, cadera: 106 },
  46: { pecho: 106, cintura: 89, cadera: 110 },
  48: { pecho: 110, cintura: 94, cadera: 114 },
  50: { pecho: 114, cintura: 99, cadera: 118 },
  52: { pecho: 118, cintura: 104, cadera: 122 },
  54: { pecho: 122, cintura: 109, cadera: 126 },
  56: { pecho: 126, cintura: 114, cadera: 130 },
  58: { pecho: 130, cintura: 119, cadera: 134 },
  60: { pecho: 134, cintura: 124, cadera: 138 },
  62: { pecho: 138, cintura: 129, cadera: 142 },
  64: { pecho: 142, cintura: 134, cadera: 146 },
};

export const TALLAS_MEDIDAS = Object.entries(MEDIDAS_POR_TALLA).map(([talla, medidas]) => ({
  talla: Number(talla),
  ...medidas,
}));

// cm -> in, 1 decimal.
export function convertirMedida(valorCm, unidad) {
  if (valorCm === null || valorCm === undefined) return null;
  if (unidad === 'in') return Math.round((valorCm / 2.54) * 10) / 10;
  return valorCm;
}

export function formatearMedida(valor) {
  if (valor === null || valor === undefined) return '—';
  return Number.isInteger(valor) ? String(valor) : valor.toFixed(1);
}
