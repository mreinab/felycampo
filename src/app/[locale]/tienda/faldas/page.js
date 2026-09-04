/* Placeholder — pendiente de maquetar. Ruta: /tienda/faldas */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/ecommerce/Categorias/faldas.webp" />
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.faldas"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
    </section>
  );
}
