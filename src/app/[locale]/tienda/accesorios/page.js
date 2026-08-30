/* Placeholder — pendiente de maquetar. Ruta: /tienda/accesorios */

import { CuadriculaProductos } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.accesorios"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
    </section>
  );
}
