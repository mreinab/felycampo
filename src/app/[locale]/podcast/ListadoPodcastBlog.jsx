// ListadoPodcastBlog.jsx

'use client';

/* ============================================================
   INTRO + LISTADO DE /podcast — Fely Campo
   Introducción (IntroSeccion: título "Podcast & Blog", texto y
   filtros) y, debajo, los episodios de podcast y los artículos de
   blog. Componente cliente porque los filtros ("Ver todo" / "Blog" /
   "Podcast") muestran u ocultan cada bloque en la propia página, sin
   navegar. page.js (servidor) le pasa las entradas ya preparadas
   (textos en el idioma, fecha formateada, href) y las etiquetas. */

import { useState } from 'react';
// Import directo (no desde el índice de @/components/layout): el índice
// también exporta componentes de servidor (PedirCita...) que no pueden
// entrar en un componente cliente.
import BlogTarjeta from '@/components/layout/BlogTarjeta';
import BlogTarjetaPodcastDestacado from '@/components/layout/BlogTarjetaPodcastDestacado';
import IntroSeccion from '@/components/layout/IntroSeccion';
import styles from './page.module.css';

function ListadoPodcastBlog({ podcasts, articulos, textos }) {
  const [filtro, setFiltro] = useState('todo');
  const verPodcast = filtro !== 'blog';
  const verBlog = filtro !== 'podcast';

  // Filtros comentados a petición mientras no haya artículos de blog
  // publicados (ver "articulos" en page.js) — sin ellos, "Blog"
  // quedaría vacío. Recuperar junto con los artículos, pasándolos a
  // IntroSeccion como filtros={filtros}.
  // const filtros = [
  //   { id: 'todo', etiqueta: textos.filtroTodo },
  //   { id: 'blog', etiqueta: textos.filtroBlog },
  //   { id: 'podcast', etiqueta: textos.filtroPodcast },
  // ];

  return (
    <>
      <IntroSeccion
        titulo={textos.introTitulo}
        texto={textos.introTexto}
        activo={filtro}
        onCambiar={setFiltro}
      />

      <section className={`${styles.pagina} contenedor`}>
        {verPodcast && podcasts.length > 0 && (
          <div className={styles.gridPodcast}>
            {podcasts.map((entrada) => (
              <div key={entrada.href} className={styles.podcastDestacado}>
                <BlogTarjetaPodcastDestacado
                  href={entrada.href}
                  titulo={entrada.titulo}
                  meta={entrada.meta}
                  imagen={entrada.imagen}
                  alt={entrada.titulo}
                  textoBoton={textos.escucharEpisodio}
                />
              </div>
            ))}
          </div>
        )}

        {verBlog && articulos.length > 0 && (
          <div className={styles.gridBlog}>
            {articulos.map((entrada) => (
              <BlogTarjeta
                key={entrada.href}
                href={entrada.href}
                titulo={entrada.titulo}
                extracto={entrada.extracto}
                meta={entrada.meta}
                imagen={entrada.imagen}
                alt={entrada.titulo}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ListadoPodcastBlog;
