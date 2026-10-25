/* Ruta: /pret-a-porter/vestidos — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter/vestidos' });
}

export default async function Pagina() {
  const t = await getTranslations();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'vestidos');

  return (
    <section className="seccion">
      <ProductHero
        imagen="/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-vestidos.webp"
        titulo={[t('catalogo.tituloTienda'), t('nav.submenus.tienda.vestidos')]}
      />
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
