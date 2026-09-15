/* Ruta: /pret-a-porter/tops-y-camisetas — catálogo real, filtrado por
   categoria (ver tiendaProductos.js). */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default function Pagina() {
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'tops-y-camisetas');

  return (
    <section className="seccion">
      <ProductHero imagen="/img/ecommerce/Categorias/camisa.webp" />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.tops"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
      />
    </section>
  );
}
