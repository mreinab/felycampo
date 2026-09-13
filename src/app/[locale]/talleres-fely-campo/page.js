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

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <section className="seccion">
      <div className="contenedor">
        <CabeceraSeccion
          subtitleKey="talleres.eyebrow"
          titleKey="talleres.titulo"
          descriptionKey="talleres.intro"
          alinear="start"
          enCuadricula
        />

        {/* Un taller por fila (ver .grid): dentro de cada uno, el
            carrusel de medios (.imagenes) va arriba y .info debajo,
            apilados en columna (ver .taller). 6 huecos, ciclando
            taller.medios (fotos y, a partir de taller-2, algún vídeo
            en autoplay — ver talleres.js) — el último solo se ve
            parcialmente en escritorio, como pista de que se puede
            seguir scrolleando (ver .marco:nth-child en
            page.module.css). */}
        <ul className={styles.grid}>
          {TALLERES.map((taller) => (
            <li key={taller.id} className={styles.taller}>
              <CarruselImagenes className={styles.imagenes}>
                {[0, 1, 2, 3, 4, 5].map((indice) => {
                  const medio = taller.medios[indice % taller.medios.length];
                  return (
                    <div key={indice} className={styles.marco}>
                      {medio.tipo === 'video' ? (
                        <video src={medio.src} className={styles.imagen} autoPlay muted loop playsInline />
                      ) : (
                        <img src={medio.src} alt="" className={styles.imagen} />
                      )}
                    </div>
                  );
                })}
              </CarruselImagenes>

              <div className={styles.info}>
                <div className={styles.infoContenido}>
                  <div className={styles.meta}>
                    <p>{taller.tipo[locale]}</p>
                    <p>{taller.distancia[locale]}</p>
                    <p>{taller.trabajadores[locale]}</p>
                    <p>{taller.liderazgo[locale]}</p>
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
