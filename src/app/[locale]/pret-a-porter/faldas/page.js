/* Ruta: /pret-a-porter/faldas — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';

export default async function Pagina() {
  const t = await getTranslations();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'faldas');

  return (
    <section className="seccion">
      <ProductHero
        imagen="/img/hero-pages/hero-pages-pretaporter-faldas.jpg"
        titulo={[t('catalogo.tituloTienda'), t('nav.submenus.tienda.faldas')]}
      />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.faldas"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
