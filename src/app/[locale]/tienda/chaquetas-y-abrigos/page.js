/* Ruta: /tienda/chaquetas-y-abrigos — cuadrícula de abrigos FW27. */

import { CuadriculaProductos } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function ChaquetasYAbrigosPagina() {
  return (
    <section className="seccion">
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.coats"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
    </section>
  );
}
