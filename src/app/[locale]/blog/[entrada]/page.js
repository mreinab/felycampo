/* Ruta DINÁMICA: ficha de una entrada de blog.
   /blog/manifiesto-coleccion-ibiza, /blog/podcast-01-crear-sin-pedir-permiso,
   /blog/campana-fw27-la-coleccion...
   Busca la entrada por slug en ../blog.js y renderiza BlogArticulo,
   BlogPodcast o BlogCampana según "entrada.tipo" — tres layouts
   propios (ver esos componentes en components/layout/), no una única
   ficha genérica: un artículo se lee, un episodio se escucha, una
   campaña se recorre a pantalla completa — cabeceras y datos propios
   de cada uno. */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { BlogArticulo, BlogCampana, BlogPodcast } from '@/components/layout';
import { entradaPorSlug } from '../blog';

export default async function Entrada({ params }) {
  const { locale, entrada: slug } = await params;
  const entrada = entradaPorSlug(slug);
  if (!entrada) notFound();

  const t = await getTranslations('blog');
  const volverHref = `/${locale}/blog`;

  if (entrada.tipo === 'podcast') {
    return (
      <BlogPodcast
        entrada={entrada}
        locale={locale}
        volverHref={volverHref}
        volverTexto={t('volver')}
        textoEpisodio={t('episodio')}
        textoCon={t('con')}
      />
    );
  }

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
