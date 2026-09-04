/* Placeholder — pendiente de maquetar. Ruta: /tienda/vestidos */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/ecommerce/Categorias/vestido.webp" />
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.vestidos"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
    </section>
  );
}
