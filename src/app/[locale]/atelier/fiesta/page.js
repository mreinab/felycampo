/* Placeholder — pendiente de maquetar. Ruta: /atelier/fiesta */

import { CuadriculaProductos } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloFelyCampo"
        coleccionKey="nav.submenus.atelier.fiesta"
        descriptionKey="cuadriculaTabs.descripcion"
      />
    </section>
  );
}
