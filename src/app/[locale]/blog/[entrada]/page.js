/* Ruta DINÁMICA: ficha de una entrada de blog, bajo /blog (antes
   /blog — ver page.js del índice para el porqué del cambio de URL).
   /blog/manifiesto-coleccion-ibiza, /blog/podcast-01-crear-sin-pedir-permiso,
   /blog/campana-fw27-la-coleccion...
   Busca la entrada por slug en ../blog.js (nombre de archivo sin
   cambiar, es solo el módulo de datos) y renderiza BlogArticulo,
   BlogPodcast o BlogCampana según "entrada.tipo" — tres layouts
   propios (ver esos componentes en components/layout/), no una única
   ficha genérica: un artículo se lee, un episodio se escucha, una
   campaña se recorre a pantalla completa — cabeceras y datos propios
   de cada uno. */

import { permanentRedirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { BlogArticulo, BlogCampana } from '@/components/layout';
import { entradaPorSlug } from '../blog';
import { metadataPagina, recortar } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale, entrada: slug } = await params;
  const entrada = entradaPorSlug(slug);
  if (!entrada) return {};

  const titulo = entrada.titulo?.[locale] || entrada.titulo?.es;
  return metadataPagina({
    locale,
    ruta: `/blog/${slug}`,
    titulo: `${titulo} | Blog Fely Campo`,
    descripcion: recortar(entrada.resumen?.[locale] || entrada.resumen?.es),
    imagen: entrada.imagenCubierta,
    tipo: 'article',
  });
}

export default async function Entrada({ params }) {
  const { locale, entrada: slug } = await params;
  const entrada = entradaPorSlug(slug);
  if (!entrada) permanentRedirect(`/${locale}/blog`); // slug inexistente: al listado (ninguna URL en 404)

  // Los episodios de podcast ya no tienen ficha (quitada a petición,
  // 2026-11-04): la tarjeta del listado enlaza a YouTube.
  if (entrada.tipo === 'podcast') permanentRedirect(`/${locale}/blog`);

  const t = await getTranslations('blog');
  const volverHref = `/${locale}/blog`;

  if (entrada.tipo === 'campana') {
    return (
      <BlogCampana
        creditos={entrada.campana.creditos}
        bloques={entrada.campana.bloques}
        locale={locale}
        ctaTexto={t('shopHere')}
        volverHref={volverHref}
        volverTexto={t('volver')}
      />
    );
  }

  return <BlogArticulo entrada={entrada} locale={locale} volverHref={volverHref} volverTexto={t('volver')} />;
}
