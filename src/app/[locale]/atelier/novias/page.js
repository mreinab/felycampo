/* Ruta: /atelier/novias — catálogo real de las 6 colecciones de Novia
   (ver noviaProductos.js): Introspección, Inside, Savia Novia, Bambú
   Novia, ME y Bride 27, cada una con sus looks reales (fotos, SKU,
   descripción y tags de su -info.xlsx en public/img/collections/
   novia/<coleccion>/). A diferencia del resto de Atelier (todavía con
   el catálogo de ejemplo genérico), esta sección ya no usa
   productosEjemplo. */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { noviaProductos } from '@/components/layout/noviaProductos';

// Colecciones de Novias, de la más reciente a la más antigua — mismo
// criterio que COLECCIONES_FIESTA en atelier/fiesta/page.js, y también
// el orden real en que aparecen los looks en la cuadrícula (ver
// noviaProductos.js).
const COLECCIONES_NOVIAS = [
  'Bride 27',
  'ME',
  'Bambú Novia',
  'Savia Novia',
  'Inside',
  'Introspección',
];

export default async function Pagina({ searchParams }) {
  // "?coleccion=" (ver FichaProductoAtelier.jsx, tags de colección):
  // solo se preselecciona si coincide EXACTO con una de las 6 reales —
  // cualquier otro valor de la URL se ignora en vez de intentar
  // adivinar una colección que no existe.
  const { coleccion } = await searchParams;
  const coleccionActiva = COLECCIONES_NOVIAS.includes(coleccion) ? coleccion : null;

  return (
    <section className="seccion">
      <ProductHero imagen="/img/landing/hero-atelier-novia-felycampo.jpg" />
      <CuadriculaProductos
        productos={noviaProductos}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.novias"
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarPrecio
        colecciones={COLECCIONES_NOVIAS}
        coleccionActiva={coleccionActiva}
        hrefBase="atelier/novias"
        estiloYSilueta
      />
    </section>
  );
}
