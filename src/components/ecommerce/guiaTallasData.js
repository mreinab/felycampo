// guiaTallasData.js
//
// Tabla de medidas Fely Campo 2020 (cm) — solo los números y el orden
// de las columnas; las etiquetas/textos ("Pecho", "Rodea el busto...")
// viven en messages/{locale}.json bajo "guiaTallas.medidas.<clave>"
// (mismo criterio que clientsReview.resenas: contenido de la app,
// traducido, no datos). Cada medida trae "real" (cuerpo) y "patron"
// (prenda). La talla 64 no tiene Cadera alta / Cont. brazo tomadas —
// null, se pinta como "—" y no se convierte a pulgadas (ver
// convertirMedida).

export const CLAVES_MEDIDAS = ['pecho', 'cintura', 'cadera', 'caderaAlta', 'contBrazo'];

export const TALLAS_MEDIDAS = [
  { talla: 36, pecho: { real: 86, patron: 88 }, cintura: { real: 69, patron: 71 }, cadera: { real: 90, patron: 92 }, caderaAlta: { real: 83, patron: 85 }, contBrazo: { real: 28.3, patron: 30.3 } },
  { talla: 38, pecho: { real: 90, patron: 92 }, cintura: { real: 73, patron: 75 }, cadera: { real: 94, patron: 96 }, caderaAlta: { real: 87, patron: 89 }, contBrazo: { real: 29.7, patron: 31.7 } },
  { talla: 40, pecho: { real: 94, patron: 96 }, cintura: { real: 77, patron: 79 }, cadera: { real: 98, patron: 100 }, caderaAlta: { real: 91, patron: 93 }, contBrazo: { real: 31.1, patron: 33.1 } },
  { talla: 42, pecho: { real: 98, patron: 100 }, cintura: { real: 81, patron: 83 }, cadera: { real: 102, patron: 104 }, caderaAlta: { real: 95, patron: 97 }, contBrazo: { real: 33.9, patron: 35.9 } },
  { talla: 44, pecho: { real: 102, patron: 104 }, cintura: { real: 85, patron: 87 }, cadera: { real: 106, patron: 108 }, caderaAlta: { real: 99, patron: 101 }, contBrazo: { real: 35.3, patron: 37.3 } },
  { talla: 46, pecho: { real: 106, patron: 108 }, cintura: { real: 89, patron: 91 }, cadera: { real: 110, patron: 112 }, caderaAlta: { real: 107.5, patron: 109.5 }, contBrazo: { real: 36.7, patron: 38.7 } },
  { talla: 48, pecho: { real: 110, patron: 112 }, cintura: { real: 94, patron: 96 }, cadera: { real: 114, patron: 116 }, caderaAlta: { real: 112, patron: 114 }, contBrazo: { real: 38.1, patron: 40.1 } },
  { talla: 50, pecho: { real: 114, patron: 116 }, cintura: { real: 99, patron: 101 }, cadera: { real: 118, patron: 120 }, caderaAlta: { real: 116.5, patron: 118.5 }, contBrazo: { real: 39.5, patron: 41.5 } },
  { talla: 52, pecho: { real: 118, patron: 120 }, cintura: { real: 104, patron: 106 }, cadera: { real: 122, patron: 124 }, caderaAlta: { real: 121, patron: 123 }, contBrazo: { real: 40.9, patron: 42.9 } },
  { talla: 54, pecho: { real: 122, patron: 124 }, cintura: { real: 109, patron: 111 }, cadera: { real: 126, patron: 128 }, caderaAlta: { real: 125.5, patron: 127.5 }, contBrazo: { real: 42.3, patron: 44.3 } },
  { talla: 56, pecho: { real: 126, patron: 128 }, cintura: { real: 114, patron: 116 }, cadera: { real: 130, patron: 132 }, caderaAlta: { real: 130, patron: 132 }, contBrazo: { real: 43.7, patron: 45.7 } },
  { talla: 58, pecho: { real: 130, patron: 132 }, cintura: { real: 119, patron: 121 }, cadera: { real: 134, patron: 136 }, caderaAlta: { real: 134.5, patron: 136.5 }, contBrazo: { real: 45.1, patron: 47.1 } },
  { talla: 60, pecho: { real: 134, patron: 136 }, cintura: { real: 124, patron: 126 }, cadera: { real: 138, patron: 140 }, caderaAlta: { real: 139, patron: 141 }, contBrazo: { real: 46.5, patron: 48.5 } },
  { talla: 62, pecho: { real: 138, patron: 140 }, cintura: { real: 129, patron: 131 }, cadera: { real: 142, patron: 144 }, caderaAlta: { real: 143.5, patron: 145.5 }, contBrazo: { real: 47.9, patron: 49.9 } },
  { talla: 64, pecho: { real: 142, patron: 144 }, cintura: { real: 134, patron: 136 }, cadera: { real: 146, patron: 148 }, caderaAlta: { real: null, patron: null }, contBrazo: { real: null, patron: null } },
];

// cm -> in, 1 decimal — null (talla 64, Cadera alta/Cont. brazo) se
// deja tal cual, nunca se convierte.
export function convertirMedida(valorCm, unidad) {
  if (valorCm === null || valorCm === undefined) return null;
  if (unidad === 'in') return Math.round((valorCm / 2.54) * 10) / 10;
  return valorCm;
}

export function formatearMedida(valor) {
  if (valor === null || valor === undefined) return '—';
  return Number.isInteger(valor) ? String(valor) : valor.toFixed(1);
}
