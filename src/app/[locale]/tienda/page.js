/* Ruta: /tienda — catálogo real (ver tiendaProductos.js), todas las
   categorías juntas sin filtrar (cada una tiene su propia página, ver
   tienda/{categoria}/page.js). */

import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default function Pagina() {
  return (
    <section className="seccion">
      <ProductHero imagen="/img/FW27-HERO.webp" />
      <CuadriculaProductos
        productos={tiendaProductos}
        disposicion="grid"
        tituloKey="catalogo.subtituloFelyCampo"
        coleccionKey="catalogo.tituloTienda"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
      />
    </section>
  );
}
