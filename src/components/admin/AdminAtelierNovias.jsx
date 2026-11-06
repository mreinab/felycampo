'use client';

/* ============================================================
   ADMIN · COLECCIÓN NOVIAS — Fely Campo
   /admin/colecciones/novia: la misma pantalla que Colección Fiesta
   (AdminColeccionesAtelier.jsx) con lo propio de Novias: sin temporada y
   sin página de colección en la web (las colecciones publicadas salen en
   las cuadrículas de las páginas de categoría). Datos y reglas:
   AtelierNovias.jsx (estado) y lib/catalogoNovias.js (lo mismo que usa
   la web). Ver docs/admin-atelier-novias.md.
   ============================================================ */

import {
  ID_PREVIA_LOOK_NOVIAS, RUTA_FICHA_NOVIAS, descripcionAutomaticaNovia, nombreSugeridoLookNovia,
  validarColeccionNovia, validarLookNovia,
} from '@/lib/catalogoNovias';
import AdminColeccionesAtelier from './AdminColeccionesAtelier';
import { useAtelierNovias } from './AtelierNovias';

const CONFIG_NOVIAS = {
  base: '/admin/colecciones/novia',
  titulo: 'Colección Novias',
  rutaFicha: RUTA_FICHA_NOVIAS,
  idPrevia: ID_PREVIA_LOOK_NOVIAS,
  conTemporada: false,
  usarCatalogo: useAtelierNovias,
  nombreColeccion: (coleccion) => (coleccion.nombre || '').trim(),
  urlColeccion: null,
  nombreSugeridoLook: nombreSugeridoLookNovia,
  descripcionAutomatica: descripcionAutomaticaNovia,
  validarLook: validarLookNovia,
  validarColeccion: validarColeccionNovia,
  ayudaVisible: 'los looks de las publicadas salen en las páginas de categoría; los de las ocultas tienen su ficha igual',
};

function AdminAtelierNovias() {
  return <AdminColeccionesAtelier config={CONFIG_NOVIAS} />;
}

export default AdminAtelierNovias;
