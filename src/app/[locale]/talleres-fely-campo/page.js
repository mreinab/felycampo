/* ============================================================
   NUESTROS TALLERES — Fely Campo. Ruta: /talleres-fely-campo
   (antes /sobre-fely/talleres — renombrada, ver Navbar.jsx).
   Server Component: hero común (HeroPagina — "Nuestros talleres" + la
   primera línea de talleres.intro como subtítulo) + ListadoTalleres
   (cliente): intro (IntroSeccion, mismo esquema que /podcast — el lema
   de título, el resto de talleres.intro de texto y los filtros "Ver
   todo" + uno por taller) y la lista de talleres (ver talleres.js),
   filtrable en la propia página. El scroll del carrusel de imágenes
   con la rueda del ratón vive aparte en
   @/components/ui/CarruselImagenes.jsx (Client Component, compartido
   con atelier-fiesta/AtelierDetalle.jsx).
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { HeroPagina } from '@/components/layout';
import { CarruselImagenes } from '@/components/ui';
import { TALLERES } from './talleres';
import ListadoTalleres from './ListadoTalleres';
import styles from './page.module.css';
import { metadataPagina } from '@/lib/seo';

// El único vídeo del carrusel (taller-inhouse, ver talleres.js) se
// distingue de las fotos por extensión — "medios" sigue siendo un
// array de strings (no {tipo, src} como en atelier-fiesta), así que
// no hace falta tocar el resto de talleres (todo fotos) para esto.
const esVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/talleres-fely-campo' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('talleres');
  // talleres.intro = "frase corta\n\npárrafo": la frase va de subtítulo
  // del hero y de título de la intro, y el párrafo de texto de la intro.
  const [lema, ...resto] = t('intro').split('\n\n');

  // Un taller por fila (ver .grid): dentro de cada uno, el carrusel de
  // fotos (.imagenes) va arriba y .info debajo, apilados en columna
  // (ver .taller). Se pinta cada foto de taller.medios tal cual (sin
  // recortar ni reciclar — eso era solo para el placeholder antiguo,
  // ver historial), así que el taller con más fotos simplemente
  // scrollea más. loading="lazy" en todas salvo la primera del primer
  // taller (ya visible al cargar la página), para no forzar la
  // descarga de todo el carrusel de golpe (ver .marco:nth-child en
  // page.module.css para el "asoma el borde" de los últimos huecos).
  // Cada <li> se pinta aquí (servidor) y ListadoTalleres (cliente)
  // solo decide cuáles se ven según el filtro de la intro.
  const talleres = TALLERES.map((taller, indiceTaller) => ({
    id: taller.id,
    etiqueta: taller.tipo[locale],
    contenido: (
      <li className={styles.taller}>
        {/* Sin fotos todavía (taller.medios vacío, ver
            talleres.js): un único bloque gris en vez del
            carrusel — nada que scrollear, así que tampoco hace
            falta CarruselImagenes aquí. */}
        {taller.medios.length > 0 ? (
          <CarruselImagenes className={styles.imagenes}>
            {taller.medios.map((src, indiceMedio) => (
              <div key={indiceMedio} className={styles.marco}>
                {esVideo(src) ? (
                  <video src={src} className={styles.imagen} autoPlay muted loop playsInline />
                ) : (
                  <img
                    src={src}
                    alt=""
                    className={styles.imagen}
                    loading={indiceTaller === 0 && indiceMedio === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )}
              </div>
            ))}
          </CarruselImagenes>
        ) : (
          <div className={styles.imagenes}>
            <div className={styles.marcoVacio} aria-hidden="true" />
          </div>
        )}

        <div className={styles.info}>
          <div className={styles.infoContenido}>
            <div className={styles.meta}>
              <p>{taller.tipo[locale]}</p>
              <p>{taller.distancia[locale]}</p>
              {taller.liderazgo && <p>{taller.liderazgo[locale]}</p>}
              {taller.antiguedad && <p>{taller.antiguedad[locale]}</p>}
            </div>

            <div className={styles.texto}>
              {taller.parrafos[locale].map((parrafo, indice) => (
                <p key={indice}>{parrafo}</p>
              ))}
            </div>
          </div>
        </div>
      </li>
    ),
  }));

  return (
    <section className="seccion">
      <HeroPagina
        imagen="/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-taller-confeccion.webp"
        alt={t('titulo')}
        titulo={t('titulo')}
        subtitulo={lema}
      />

      {/* Intro (mismo esquema que /podcast: título = el lema, texto = el
          párrafo, filtros "Ver todo" + uno por taller) y la lista de
          talleres — ver ListadoTalleres.jsx. */}
      <ListadoTalleres
        titulo={lema}
        texto={resto.join('\n\n')}
        etiquetaTodo={t('filtroTodo')}
        talleres={talleres}
      />
    </section>
  );
}
