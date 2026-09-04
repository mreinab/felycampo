/* Placeholder — pendiente de maquetar. Ruta: /tienda/tops-y-camisetas */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/ecommerce/Categorias/camisa.webp" />
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.tops"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
    </section>
  );
}
