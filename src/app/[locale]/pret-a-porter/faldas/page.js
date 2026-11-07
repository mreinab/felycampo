/* Ruta: /pret-a-porter/faldas — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { metadataPagina } from '@/lib/seo';
import { obtenerEditorialPretAPorter } from '@/lib/atelierEditorial';
import { textoEn } from '@/lib/previa';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter/faldas' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();
  // Foto y texto: editables en el admin (Prêt-à-porter › Página de la web
  // › Páginas de categoría).
  const { categorias } = obtenerEditorialPretAPorter();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'faldas');

  return (
    <section className="seccion">
      <ProductHero
        imagen={categorias.imagenes['faldas']}
        titulo={[t('catalogo.tituloTienda'), t('nav.submenus.tienda.faldas')]}
      />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.faldas"
        description={textoEn(categorias.texto, locale)}
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
