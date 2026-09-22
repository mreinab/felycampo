/* ============================================================
   PODCAST — Fely Campo. Ruta: /podcast (antes /blog — a petición,
   la URL y la página se quedan solo con el/los episodios de podcast;
   el resto de contenido de blog.js (artículos/campañas) se deja
   comentado más abajo, no borrado, por si se recupera).
   BlogTarjetaPodcastDestacado (mismo diseño que llevaba en la
   cuadrícula de 2 columnas de antes — foto a sangre + botón de play,
   estilo Spotify) ahora a todo el ancho, centrada, sin la rejilla ni
   la posición fija de columna 2 que necesitaba al convivir con
   artículos (ver .podcastDestacado en page.module.css). Sigue siendo
   solo un enlace a /podcast/[slug] (ver [entrada]/page.js): no
   reproduce nada aquí.
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { BlogTarjetaPodcastDestacado /* , BlogTarjeta */ } from '@/components/layout';
import { BLOG_ENTRADAS } from './blog';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('blog');

  const entradasPodcast = BLOG_ENTRADAS.filter((entrada) => entrada.tipo === 'podcast');

  return (
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
  );
}
