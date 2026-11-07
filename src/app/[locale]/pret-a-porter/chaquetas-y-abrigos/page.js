/* Ruta: /pret-a-porter/chaquetas-y-abrigos — catálogo real, filtrado por
   categoria (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { metadataPagina } from '@/lib/seo';
import { obtenerEditorialPretAPorter } from '@/lib/atelierEditorial';
import { textoEn } from '@/lib/previa';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter/chaquetas-y-abrigos' });
}

export default async function ChaquetasYAbrigosPagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();
  // Foto y texto: editables en el admin (Prêt-à-porter › Página de la web
  // › Páginas de categoría).
  const { categorias } = obtenerEditorialPretAPorter();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'chaquetas-y-abrigos');

  return (
    <section className="seccion">
      <ProductHero
        imagen={categorias.imagenes['chaquetas-y-abrigos']}
        titulo={[t('catalogo.tituloTienda'), t('nav.submenus.tienda.coats')]}
      />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.coats"
        description={textoEn(categorias.texto, locale)}
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
