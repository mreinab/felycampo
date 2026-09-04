/* Placeholder — pendiente de maquetar. Ruta: /tienda/zapatos */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/ecommerce/Categorias/zapatos.webp" />
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.zapatos"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
    </section>
  );
}
