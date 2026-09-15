/* Ruta: /pret-a-porter/pantalones — catálogo real, filtrado por categoria
   (ver tiendaProductos.js).
   "imagen" del ProductHero: sin foto editorial propia todavía (las
   otras categorías sí la tienen en Categorias/, ver faldas.webp/
   vestido.webp/chaqueta.webp/camisa.webp) — de momento la portada del
   propio producto real (MBO2724, ver tiendaProductos.js) hace de hero,
   a sustituir por una foto editorial en cuanto exista. */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default function Pagina() {
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'pantalones');

  return (
    <section className="seccion">
      <ProductHero imagen="/img/ecommerce/pantalones/MBO2724-pantalon-raya-front.jpg" />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.pantalones"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
      />
    </section>
  );
}
