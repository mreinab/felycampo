/* Placeholder — pendiente de maquetar. Ruta: /atelier/fiesta */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

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
      />
    </section>
  );
}
