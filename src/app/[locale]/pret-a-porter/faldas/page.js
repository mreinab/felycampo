/* Ruta: /pret-a-porter/faldas — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default function Pagina() {
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'faldas');

  return (
    <section className="seccion">
      <ProductHero imagen="/img/ecommerce/Categorias/faldas.webp" />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.faldas"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
      />
    </section>
  );
}
