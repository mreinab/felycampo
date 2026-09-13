/* ============================================================
   BLOG — Fely Campo. Ruta: /blog
   Calco literal de /colecciones-fely-campo (ver ese page.js): sin
   cabecera de página, directo a la cuadrícula de 2 columnas (ver
   page.module.css) — BlogTarjeta.jsx en vez de RunwayTarjeta.jsx
   (mismo .marco a 16/9 + texto centrado debajo, con un extracto de
   más, ver ese componente). Tres tipos de entrada mezclados sin
   distinción visual entre ellos ("articulo"/"podcast"/"campana", ver
   blog.js). Cada tarjeta enlaza a /blog/[slug] (ver [entrada]/page.js,
   que decide BlogArticulo, BlogPodcast o BlogCampana según "tipo").

   "entrada.destacado" (ver blog.js, un único episodio de podcast de
   momento) se pinta con BlogTarjetaPodcastDestacado en vez de
   BlogTarjeta — mantiene su diseño propio (foto a sangre + botón de
   play, estilo Spotify), pero a diferencia del resto de tarjetas
   ocupa toda su celda (sin el tope de 550px de .grid > a: va en un
   <div>, no un <a>, ver .celdaPodcast en page.module.css) fija en la
   fila 1, columna 2. Sigue siendo solo un enlace a la ficha del
   episodio: no reproduce nada aquí.
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { BlogTarjeta, BlogTarjetaPodcastDestacado } from '@/components/layout';
import { BLOG_ENTRADAS } from './blog';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('blog');

  const formatoFecha = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className={`${styles.pagina} contenedor`}>
      <div className={styles.grid}>
        {BLOG_ENTRADAS.map((entrada) => {
          const meta = entrada.tipo === 'podcast' ? entrada.duracion : formatoFecha.format(new Date(entrada.fecha));

          if (entrada.destacado) {
            return (
              <div key={entrada.slug} className={styles.celdaPodcast}>
                <BlogTarjetaPodcastDestacado
                  href={`/${locale}/blog/${entrada.slug}`}
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
              href={`/${locale}/blog/${entrada.slug}`}
              titulo={entrada.titulo[locale]}
              extracto={entrada.resumen[locale]}
              meta={meta}
              imagen={entrada.imagenCubierta}
              alt={entrada.titulo[locale]}
            />
          );
        })}
      </div>
    </section>
  );
}
