/* ============================================================
   NUESTROS TALLERES — Fely Campo. Ruta: /talleres-fely-campo
   (antes /sobre-fely/talleres — renombrada, ver Navbar.jsx).
   Server Component: cabecera (CabeceraSeccion, enCuadricula +
   alinear="start" — mismo combo "fila" que usa CuadriculaProductos en
   "grid", ver CuadriculaProductos.jsx) + cuadrícula de talleres (ver
   talleres.js). El único trocito interactivo (scroll del carrusel de
   imágenes con la rueda del ratón) vive aparte en
   @/components/ui/CarruselImagenes.jsx (Client Component, compartido
   con atelier-fiesta/AtelierDetalle.jsx), no aquí.
   ============================================================ */

import { CabeceraSeccion, CarruselImagenes } from '@/components/ui';
import { TALLERES } from './talleres';
import styles from './page.module.css';

// El único vídeo del carrusel (taller-inhouse, ver talleres.js) se
// distingue de las fotos por extensión — "medios" sigue siendo un
// array de strings (no {tipo, src} como en atelier-fiesta), así que
// no hace falta tocar el resto de talleres (todo fotos) para esto.
const esVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <section className="seccion">
      <div className="contenedor">
        <CabeceraSeccion
          titleKey="talleres.titulo"
          descriptionKey="talleres.intro"
          alinear="start"
          enCuadricula
        />

        {/* Un taller por fila (ver .grid): dentro de cada uno, el
            carrusel de fotos (.imagenes) va arriba y .info debajo,
            apilados en columna (ver .taller). Se pinta cada foto de
            taller.medios tal cual (sin recortar ni reciclar — eso era
            solo para el placeholder antiguo, ver historial), así que
            el taller con más fotos simplemente scrollea más.
            loading="lazy" en todas salvo la primera del primer
            taller (ya visible al cargar la página), para no forzar
            la descarga de todo el carrusel de golpe (ver
            .marco:nth-child en page.module.css para el "asoma el
            borde" de los últimos huecos). */}
        <ul className={styles.grid}>
          {TALLERES.map((taller, indiceTaller) => (
            <li key={taller.id} className={styles.taller}>
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
                    <p>{taller.liderazgo[locale]}</p>
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
          ))}
        </ul>
      </div>
    </section>
  );
}
