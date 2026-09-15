/* Ruta: /atelier/fiesta — catálogo real de las 11 colecciones de Fiesta
   (ver fiestaProductos.js): Primavera Verano 2027 (SS27), Primavera
   Verano 2026, Primavera Verano 2025, Prêt-à-porter, En Madrid, A
   Walk, Bambú, Savia, Miscelanea, Essentielle y Furisode, cada una con
   sus looks reales. Mismo criterio que atelier/novias/page.js. */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { fiestaProductos } from '@/components/layout/fiestaProductos';

// Colecciones de Fiesta, de la más reciente a la más antigua — mismo
// orden real en que aparecen los looks en la cuadrícula (ver
// fiestaProductos.js); ver también comentario de "colecciones" en
// CuadriculaProductos.jsx (filtra la cuadrícula de verdad).
const COLECCIONES_FIESTA = [
  'Primavera Verano 2027',
  'Primavera Verano 2026',
  'Primavera Verano 2025',
  'Prêt-à-porter',
  'En Madrid',
  'A Walk',
  'Bambú',
  'Savia',
  'Miscelanea',
  'Essentielle',
  'Furisode',
];

export default async function Pagina({ searchParams }) {
  // "?coleccion=" (ver comentario de novias/page.js): solo se
  // preselecciona si coincide exacto con una de las colecciones reales.
  const { coleccion } = await searchParams;
  const coleccionActiva = COLECCIONES_FIESTA.includes(coleccion) ? coleccion : null;

  return (
    <section className="seccion">
      <ProductHero imagen="/img/invitadas-sección-FelyCampo.jpg" />
      <CuadriculaProductos
        productos={fiestaProductos}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.fiesta"
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarPrecio
        colecciones={COLECCIONES_FIESTA}
        coleccionActiva={coleccionActiva}
        hrefBase="atelier/fiesta"
        estiloYSilueta
        esFiesta
      />
    </section>
  );
}
