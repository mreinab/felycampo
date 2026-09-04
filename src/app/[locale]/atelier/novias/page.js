/* Placeholder — pendiente de maquetar. Ruta: /atelier/novias */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

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
      />
    </section>
  );
}
