/* Ruta: /pret-a-porter/faldas — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter/faldas' });
}

export default async function Pagina() {
  const t = await getTranslations();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'faldas');

  return (
    <section className="seccion">
      <ProductHero
        imagen="/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-faldas.webp"
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
