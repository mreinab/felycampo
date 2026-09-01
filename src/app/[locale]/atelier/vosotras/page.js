/* Placeholder — pendiente de maquetar. Ruta: /atelier/vosotras */

import { CuadriculaProductos } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.vosotras"
        descriptionKey="cuadriculaTabs.descripcion"
      />
    </section>
  );
}
