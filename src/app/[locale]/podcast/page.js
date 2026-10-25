/* ============================================================
   PODCAST & BLOG — Fely Campo. Ruta: /podcast (antes /blog).
   Hero común (HeroPagina) arriba; debajo, ListadoPodcastBlog: una
   introducción de 80vh ("Podcast & Blog", texto y filtros "Ver todo" /
   "Blog" / "Podcast") y los episodios (BlogTarjetaPodcastDestacado,
   foto a sangre + play) y artículos (BlogTarjeta) de blog.js, que los
   filtros muestran u ocultan en la propia página. Cada tarjeta es solo
   un enlace a /podcast/[slug] (ver [entrada]/page.js): no reproduce
   nada aquí.
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { HeroPagina } from '@/components/layout';
import { BLOG_ENTRADAS } from './blog';
import ListadoPodcastBlog from './ListadoPodcastBlog';
import styles from './page.module.css';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/podcast' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');
  const tHero = await getTranslations('heroPagina');

  // Entradas ya preparadas para ListadoPodcastBlog (componente cliente):
  // textos en el idioma, href y meta (duración del episodio o fecha del
  // artículo). Artículos del más reciente al más antiguo.
  const formatoFecha = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const aTarjeta = (entrada) => ({
    href: `/${locale}/podcast/${entrada.slug}`,
    titulo: entrada.titulo[locale],
    extracto: entrada.resumen[locale],
    imagen: entrada.imagenCubierta,
    meta: entrada.tipo === 'podcast' ? entrada.duracion : formatoFecha.format(new Date(entrada.fecha)),
  });
  const podcasts = BLOG_ENTRADAS.filter((entrada) => entrada.tipo === 'podcast').map(aTarjeta);
  // Artículos de blog — comentados a petición: todavía no se publican.
  // Para recuperarlos, descomentar esto y quitar el "[]" de abajo (y
  // los filtros en ListadoPodcastBlog.jsx).
  // const articulos = BLOG_ENTRADAS
  //   .filter((entrada) => entrada.tipo !== 'podcast')
  //   .sort((a, b) => b.fecha.localeCompare(a.fecha))
  //   .map(aTarjeta);
  const articulos = [];

  return (
    <>
    {/* Hero común (HeroPagina), con la misma foto que "Podcast" en el
        submenú del Navbar. heroEncuadre: en mobile lleva el recorte a
        la derecha, sobre Fely (ver page.module.css). */}
    <HeroPagina
      imagen="/img/about-felycampo/fely-campo-sobre-fely-campo-madrid-moda-capital-podcast.webp"
      alt={tNav('submenus.elMundoDeFely.podcast')}
      titulo={tNav('submenus.elMundoDeFely.podcast')}
      subtitulo={tHero('podcast')}
      className={styles.heroEncuadre}
    />
    {/* Intro ("Podcast & Blog" + texto + filtros) y listado filtrable
        de episodios y artículos — ver ListadoPodcastBlog.jsx. */}
    <ListadoPodcastBlog
      podcasts={podcasts}
      articulos={articulos}
      textos={{
        introTitulo: t('introTitulo'),
        introTexto: t('introTexto'),
        filtroTodo: t('filtroTodo'),
        filtroBlog: t('filtroBlog'),
        filtroPodcast: t('filtroPodcast'),
        escucharEpisodio: t('escucharEpisodio'),
      }}
    />
    </>
  );
}
