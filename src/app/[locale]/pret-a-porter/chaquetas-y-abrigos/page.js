/* Ruta: /pret-a-porter/chaquetas-y-abrigos — catálogo real, filtrado por
   categoria (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter/chaquetas-y-abrigos' });
}

export default async function ChaquetasYAbrigosPagina() {
  const t = await getTranslations();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'chaquetas-y-abrigos');

  return (
    <section className="seccion">
      <ProductHero
        imagen="/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-chaquetas-abrigos.webp"
        titulo={[t('catalogo.tituloTienda'), t('nav.submenus.tienda.coats')]}
      />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.coats"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
