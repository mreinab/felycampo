/* Placeholder — pendiente de maquetar. Ruta: /atelier/novias */

import { CuadriculaProductos } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloFelyCampo"
        coleccionKey="nav.submenus.atelier.novias"
        descriptionKey="cuadriculaTabs.descripcion"
      />
    </section>
  );
}
