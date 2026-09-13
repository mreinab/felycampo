// BlogTarjetaPodcastDestacado.jsx

/* ============================================================
   TARJETA DESTACADA DE PODCAST — Fely Campo
   Celda especial de la cuadrícula de /blog (ver page.js, prop
   "entrada.destacado" en blog.js) — foto a sangre (cubre toda la
   celda, no "imagen arriba + texto debajo" como BlogTarjeta), degradado
   oscuro abajo para legibilidad y, encima, el botón de "play" seguido
   del nombre del podcast + episodio/duración — inspirado en las
   tarjetas de podcast de Spotify. El botón NO reproduce nada aquí (no
   hay audio real, ver BlogPodcast.jsx): es un enlace más a la ficha
   del episodio, igual que el resto de la tarjeta.
   .titulo es fijo — "Entre telas y palabras: El Podcast", el nombre
   de la serie, no el de este episodio en concreto — igual en todos
   los episodios, no viene de blog.js (mismo criterio que "Fely Campo"
   en el resto de "alt" del sitio). El título del episodio ("titulo",
   prop) se cuela en .meta junto a la duración en vez de perderse, y
   sigue usándose en el aria-label del enlace.
   Uso:
     <BlogTarjetaPodcastDestacado
       href="/es/blog/podcast-01-crear-sin-pedir-permiso"
       titulo="Crear sin pedir permiso"
       meta="34 min"
       imagen="/img/..."
       alt="..."
       textoBoton="Escuchar episodio"
     />
   ============================================================ */

import styles from './BlogTarjetaPodcastDestacado.module.css';

function BlogTarjetaPodcastDestacado({ href, titulo, meta, imagen, alt, textoBoton }) {
  return (
    <a href={href} className={styles.tarjeta} aria-label={`${textoBoton}: ${titulo}`}>
      <img src={imagen} alt={alt} className={styles.imagen} />
      <div className={styles.degradado} aria-hidden="true" />
      <div className={styles.contenido}>
        <span className={styles.boton} aria-hidden="true">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M0 0L16 9L0 18V0Z" fill="currentColor" />
          </svg>
        </span>
        <p className={styles.titulo}>Entre telas y palabras: El Podcast</p>
        <p className={styles.meta}>
          {titulo}
          {meta && ` · ${meta}`}
        </p>
      </div>
    </a>
  );
}

export default BlogTarjetaPodcastDestacado;
