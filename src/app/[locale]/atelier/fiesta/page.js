/* Placeholder — pendiente de maquetar. Ruta: /atelier/fiesta */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

// Colecciones de Fiesta, de la más reciente a la más antigua — ver
// comentario de "colecciones" en CuadriculaProductos.jsx (de momento
// solo alimentan el desplegable de PanelFiltros, no filtran de verdad).
const COLECCIONES_FIESTA = [
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

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/invitadas-sección-FelyCampo.jpg" />
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.fiesta"
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarPrecio
        colecciones={COLECCIONES_FIESTA}
        hrefBase="atelier/fiesta"
      />
    </section>
  );
}
