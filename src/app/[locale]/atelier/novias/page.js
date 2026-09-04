/* Placeholder — pendiente de maquetar. Ruta: /atelier/novias */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

// Colecciones de Novias, de la más reciente a la más antigua — mismo
// criterio que COLECCIONES_FIESTA en atelier/fiesta/page.js.
const COLECCIONES_NOVIAS = [
  'Bride 27',
  'ME',
  'Bambú Novia',
  'Savia Novia',
  'Inside',
  'Introspección',
];

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/novias-sección-FelyCampo3.jpg" />
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.novias"
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarPrecio
        colecciones={COLECCIONES_NOVIAS}
        hrefBase="atelier/novias"
      />
    </section>
  );
}
