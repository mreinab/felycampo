/* Ruta: /pret-a-porter/pantalones — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default function Pagina() {
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'pantalones');

  return (
    <section className="seccion">
      <ProductHero imagen="/img/hero-pages/hero-pages-pretaporter-pantalones.jpg" />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.pantalones"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
