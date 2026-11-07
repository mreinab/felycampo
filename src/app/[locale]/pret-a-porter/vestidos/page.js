/* Ruta: /pret-a-porter/vestidos — catálogo real, filtrado por categoria
   (ver tiendaProductos.js). */

import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { metadataPagina } from '@/lib/seo';
import { obtenerEditorialPretAPorter } from '@/lib/atelierEditorial';
import { textoEn } from '@/lib/previa';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter/vestidos' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();
  // Foto y texto: editables en el admin (Prêt-à-porter › Página de la web
  // › Páginas de categoría).
  const { categorias } = obtenerEditorialPretAPorter();
  const productos = tiendaProductos.filter((producto) => producto.categoria === 'vestidos');

  return (
    <section className="seccion">
      <ProductHero
        imagen={categorias.imagenes['vestidos']}
        titulo={[t('catalogo.tituloTienda'), t('nav.submenus.tienda.vestidos')]}
      />
      <CuadriculaProductos
        productos={productos}
        disposicion="grid"
        tituloKey="catalogo.subtituloTienda"
        coleccionKey="nav.submenus.tienda.vestidos"
        description={textoEn(categorias.texto, locale)}
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
