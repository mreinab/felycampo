// BlogArticulo.jsx

/* ============================================================
   ARTÍCULO DE BLOG — Fely Campo
   Ficha de una entrada de tipo "articulo" en /podcast/[entrada] (ver ese
   page.js) — LA plantilla del blog, en dos mitades:
   1) Cabecera calcada de la ficha de colección de Runway
      (/colecciones-fely-campo/la-coleccion-aw27, ver ese page.js/
      page.module.css): .hero a 80vh a ancho completo
      (RunwayMediaLateral con "imagenCubierta", data-navbar-hero para
      que el Navbar transparente/claro del sitio se vuelva sólido al
      salir de él — ver "esHeroBlog" en ../../app/[locale]/layout.js,
      que mira "entrada.tipo" en blog.js) + .textoDescripcion
      (.textoRow con título/fecha, mismo contenedor común a todo el
      ancho que en Runway). El enlace de "volver" va SOBRE el hero
      (solo icono, sin texto — mismo patrón que .volver en
      BlogPodcast.jsx), no dentro de .textoDescripcion: Runway no trae
      un enlace de vuelta de por sí, así que aquí se resuelve como en
      el resto de fichas de /podcast con hero a sangre. .metaHero, dentro
      de .textoRow, es solo la fecha — sin categoría ni autor, a
      propósito (entrada.categoria/entrada.autor siguen viviendo en
      blog.js para BlogTarjeta/otros usos, no se borran) — el mismo
      sitio que ocuparía "temporada" en la ficha
      de colección.
   2) El cuerpo, pensado para repetirse en cualquier post futuro como
      una secuencia de SECCIONES, cada una "texto, y debajo imágenes"
      (bloques "parrafo"/"titulo"/"cita" seguidos de un bloque
      "galeria" a 2/3/4 columnas, o una "imagen" suelta) — el mismo
      patrón una y otra vez a lo largo del artículo, con la fotografía
      editorial de Runway como referencia (aire generoso, texto
      justificado a columna estrecha —max-texto—, fotos con su propio
      ancho sin recortar): array "bloques" en cada entrada de blog.js,
      cada bloque decide su propio ancho (el texto siempre a
      --max-texto, las imágenes/galerías hasta --max-contenido).

   ---------- Tipos de bloque (JSDoc) ----------

   @typedef {Object} BloqueParrafo
   @property {'parrafo'} tipo
   @property {{es: string, en: string}} texto

   @typedef {Object} BloqueTitulo - subtítulo de sección (h2) dentro del artículo
   @property {'titulo'} tipo
   @property {{es: string, en: string}} texto

   @typedef {Object} BloqueCita - cita textual destacada (serif, --font-editorial)
   @property {'cita'} tipo
   @property {{es: string, en: string}} texto
   @property {{es: string, en: string}} [autor]

   @typedef {Object} BloqueImagen - foto suelta, ancho propio (hasta --max-contenido), con pie opcional
   @property {'imagen'} tipo
   @property {string} imagen
   @property {string} alt
   @property {{es: string, en: string}} [caption]

   @typedef {Object} ImagenGaleria
   @property {string} imagen
   @property {string} alt
   @property {{es: string, en: string}} [caption]

   @typedef {Object} BloqueGaleria - LA pieza "imágenes debajo del texto" del patrón repetible — cuadrícula de 2, 3 o 4 columnas
   @property {'galeria'} tipo
   @property {2 | 3 | 4} columnas
   @property {ImagenGaleria[]} imagenes

   @typedef {Object} BloqueVideo - MAQUETA VISUAL, sin vídeo real embebido (ver nota en el componente)
   @property {'video'} tipo
   @property {{es: string, en: string}} [caption]

   @typedef {BloqueParrafo | BloqueTitulo | BloqueCita | BloqueImagen | BloqueGaleria | BloqueVideo} Bloque

   ---------- Uso ----------
   Ver la entrada "mbfw-madrid-tempore" en blog.js para un ejemplo
   completo con los seis tipos de bloque, incluida "galeria" repetida
   varias veces siguiendo el patrón texto → imágenes:
     <BlogArticulo entrada={entrada} locale={locale} volverHref="/es/podcast" volverTexto="Volver al blog" />
   ============================================================ */

import RunwayMediaLateral from './RunwayMediaLateral';
import styles from './BlogArticulo.module.css';

// Agrupa cada tramo consecutivo de bloques "titulo"/"parrafo" en un
// único <div> (.seccion) — un "titulo" y sus "parrafo" siguientes
// forman una sección de texto, no elementos sueltos en .cuerpo. El
// resto de tipos ("cita"/"imagen"/"galeria"/"video") no se agrupan:
// cierran la sección abierta y quedan sueltos, tal cual.
function agruparEnSecciones(bloques) {
  const items = [];
  let seccionActual = null;

  bloques.forEach((bloque) => {
    if (bloque.tipo === 'titulo' || bloque.tipo === 'parrafo') {
      if (!seccionActual) {
        seccionActual = { seccion: true, bloques: [] };
        items.push(seccionActual);
      }
      seccionActual.bloques.push(bloque);
    } else {
      seccionActual = null;
      items.push(bloque);
    }
  });

  return items;
}

function BloqueParrafo({ bloque, locale }) {
  return <p className={styles.parrafo}>{bloque.texto[locale]}</p>;
}

function BloqueTitulo({ bloque, locale }) {
  return <h2 className={styles.tituloSeccion}>{bloque.texto[locale]}</h2>;
}

function BloqueCita({ bloque, locale }) {
  return (
    <blockquote className={styles.cita}>
      <p>{bloque.texto[locale]}</p>
      {bloque.autor && <cite className={styles.citaAutor}>{bloque.autor[locale]}</cite>}
    </blockquote>
  );
}

function BloqueImagen({ bloque, locale }) {
  return (
    <figure className={styles.imagenBloque}>
      <img src={bloque.imagen} alt={bloque.alt} />
      {bloque.caption && <figcaption className={styles.imagenCaption}>{bloque.caption[locale]}</figcaption>}
    </figure>
  );
}

// La pieza "imágenes debajo del texto" del patrón repetible — 2, 3 o
// 4 columnas (bloque.columnas), cada imagen con su propio pie opcional.
function BloqueGaleria({ bloque, locale }) {
  const claseColumnas = styles[`galeria${bloque.columnas}`] || styles.galeria3;

  return (
    <div className={`${styles.galeria} ${claseColumnas}`}>
      {bloque.imagenes.map((item, indice) => (
        <figure key={indice} className={styles.galeriaItem}>
          <img src={item.imagen} alt={item.alt} />
          {item.caption && <figcaption className={styles.imagenCaption}>{item.caption[locale]}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

// MAQUETA VISUAL, sin vídeo real: no hay archivos de vídeo propios
// para incrustar en el proyecto — un <iframe> real (ej. YouTube/Vimeo)
// se sustituiría aquí sin tocar el resto de la plantilla.
function BloqueVideo({ bloque, locale }) {
  return (
    <div className={styles.video} aria-hidden="true">
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path d="M0 0L20 12L0 24V0Z" fill="currentColor" />
      </svg>
      {bloque.caption && <p className={styles.videoCaption}>{bloque.caption[locale]}</p>}
    </div>
  );
}

function BlogArticulo({ entrada, locale, volverHref, volverTexto }) {
  const { imagenCubierta, titulo, fecha, bloques } = entrada;

  const fechaLegible = new Date(fecha).toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={styles.pagina}>
      <div className={styles.hero} data-navbar-hero>
        <a href={volverHref} className={styles.volver} aria-label={volverTexto}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
            <path d="M8 1L1 8L8 15M1 8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        </a>
        <RunwayMediaLateral medio={{ src: imagenCubierta }} alt={titulo[locale]} />
      </div>

      <div className={styles.textoDescripcion}>
        <div className={styles.textoRow}>
          <h1 className={styles.tituloHero}>{titulo[locale]}</h1>
          <p className={styles.metaHero}>{fechaLegible}</p>
        </div>
      </div>

      <div className={`${styles.cuerpo} contenedor`}>
        {agruparEnSecciones(bloques).map((item, indice) => {
          if (item.seccion) {
            return (
              <div key={indice} className={styles.seccion}>
                {item.bloques.map((bloque, i) => (
                  bloque.tipo === 'titulo'
                    ? <BloqueTitulo key={i} bloque={bloque} locale={locale} />
                    : <BloqueParrafo key={i} bloque={bloque} locale={locale} />
                ))}
              </div>
            );
          }

          switch (item.tipo) {
            case 'cita':
              return <BloqueCita key={indice} bloque={item} locale={locale} />;
            case 'imagen':
              return <BloqueImagen key={indice} bloque={item} locale={locale} />;
            case 'galeria':
              return <BloqueGaleria key={indice} bloque={item} locale={locale} />;
            case 'video':
              return <BloqueVideo key={indice} bloque={item} locale={locale} />;
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}

export default BlogArticulo;
