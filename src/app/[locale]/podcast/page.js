/* ============================================================
   PODCAST — Fely Campo. Ruta: /podcast (antes /blog — a petición,
   la URL y la página se quedan solo con el/los episodios de podcast;
   el resto de contenido de blog.js (artículos/campañas) se deja
   comentado más abajo, no borrado, por si se recupera).
   Hero común (HeroPagina) arriba, y debajo BlogTarjetaPodcastDestacado
   (foto a sangre + botón de play, estilo Spotify) ocupando una de las
   dos columnas de .gridPodcast (50% del ancho), ver page.module.css. Sigue siendo
   solo un enlace a /podcast/[slug] (ver [entrada]/page.js): no
   reproduce nada aquí.
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { BlogTarjetaPodcastDestacado, HeroPagina /* , BlogTarjeta */ } from '@/components/layout';
import { BLOG_ENTRADAS } from './blog';
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

  const entradasPodcast = BLOG_ENTRADAS.filter((entrada) => entrada.tipo === 'podcast');

  return (
    <>
    {/* Hero común (HeroPagina), con la misma foto que "Podcast" en el
        submenú del Navbar. */}
    <HeroPagina
      imagen="/img/about-felycampo/madrid-moda-de-capital-felycampo-podcast.jpg"
      alt={tNav('submenus.elMundoDeFely.podcast')}
      titulo={tNav('submenus.elMundoDeFely.podcast')}
      subtitulo={tHero('podcast')}
    />
    <section className={`${styles.pagina} contenedor`}>
      <div className={styles.gridPodcast}>
        {entradasPodcast.map((entrada) => (
          <div key={entrada.slug} className={styles.podcastDestacado}>
            <BlogTarjetaPodcastDestacado
              href={`/${locale}/podcast/${entrada.slug}`}
              titulo={entrada.titulo[locale]}
              meta={entrada.duracion}
              imagen={entrada.imagenCubierta}
              alt={entrada.titulo[locale]}
              textoBoton={t('escucharEpisodio')}
            />
          </div>
        ))}
      </div>

      {/* Comentado a petición — artículos/campañas de blog.js, antes en
          la misma cuadrícula de 2 columnas que el podcast (ver
          historial si hiciera falta recuperar esto).
      <div className={styles.grid}>
        {BLOG_ENTRADAS.map((entrada) => {
          const formatoFecha = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
          const meta = entrada.tipo === 'podcast' ? entrada.duracion : formatoFecha.format(new Date(entrada.fecha));

          if (entrada.destacado) {
            return (
              <div key={entrada.slug} className={styles.celdaPodcast}>
                <BlogTarjetaPodcastDestacado
                  href={`/${locale}/podcast/${entrada.slug}`}
                  titulo={entrada.titulo[locale]}
                  meta={meta}
                  imagen={entrada.imagenCubierta}
                  alt={entrada.titulo[locale]}
                  textoBoton={t('escucharEpisodio')}
                />
              </div>
            );
          }

          return (
            <BlogTarjeta
              key={entrada.slug}
              href={`/${locale}/podcast/${entrada.slug}`}
              titulo={entrada.titulo[locale]}
              extracto={entrada.resumen[locale]}
              meta={meta}
              imagen={entrada.imagenCubierta}
              alt={entrada.titulo[locale]}
            />
          );
        })}
      </div>
      ---- fin comentado ---- */}
    </section>
    </>
  );
}
