/* Placeholder — pendiente de maquetar. Ruta: /tienda */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/FW27-HERO.webp" />
      <CuadriculaProductos
        productos={productosEjemplo}
        disposicion="grid"
        tituloKey="catalogo.subtituloFelyCampo"
        coleccionKey="catalogo.tituloTienda"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
    </section>
  );
}
