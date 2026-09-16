/* Ruta: /pret-a-porter/chaquetas-y-abrigos — catálogo real, filtrado por
   categoria (ver tiendaProductos.js). */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default function ChaquetasYAbrigosPagina() {
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'chaquetas-y-abrigos');

  return (
    <section className="seccion">
      <ProductHero imagen="/img/hero-pages/hero-pages-pretaporter-chaquetas-y-abrigos.jpg" />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.coats"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
      />
    </section>
  );
}
