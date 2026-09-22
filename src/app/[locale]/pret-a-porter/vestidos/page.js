/* Ruta: /pret-a-porter/vestidos — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default function Pagina() {
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'vestidos');

  return (
    <section className="seccion">
      <ProductHero imagen="/img/hero-pages/hero-pages-pretaporter-vestidos.jpg" />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.vestidos"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
