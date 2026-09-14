/* Ruta: /atelier/fiesta — catálogo real de la colección Furisode (ver
   furisodeProductos.js); el resto de colecciones del desplegable
   (COLECCIONES_FIESTA) sigue siendo solo visual, sin datos propios
   todavía, ver comentario "colecciones" en CuadriculaProductos.jsx. */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { furisodeProductos } from '@/components/layout/furisodeProductos';

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
        productos={furisodeProductos}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.fiesta"
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarPrecio
        colecciones={COLECCIONES_FIESTA}
        hrefBase="atelier/fiesta"
        estiloYSilueta
        esFiesta
      />
    </section>
  );
}
