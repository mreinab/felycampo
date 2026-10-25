/* Ruta: /pret-a-porter/pantalones — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter/pantalones' });
}

export default async function Pagina() {
  const t = await getTranslations();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'pantalones');

  return (
    <section className="seccion">
      <ProductHero
        imagen="/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-pantalones.webp"
        titulo={[t('catalogo.tituloTienda'), t('nav.submenus.tienda.pantalones')]}
      />
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
