/* ============================================================
   NUESTROS TALLERES — Fely Campo. Ruta: /talleres-fely-campo
   (antes /sobre-fely/talleres — renombrada, ver Navbar.jsx).
   Server Component: cabecera (CabeceraSeccion, enCuadricula +
   alinear="start" — mismo combo "fila" que usa CuadriculaProductos en
   "grid", ver CuadriculaProductos.jsx) + cuadrícula de talleres (ver
   talleres.js). Sin interactividad — no hace falta Client Component.
   ============================================================ */

import { CabeceraSeccion } from '@/components/ui';
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

        {/* 5 columnas en escritorio — cada taller ocupa 1 sola columna
            (hoy 4 talleres, así que la 5ª queda vacía; ver .grid). */}
        <ul className={styles.grid}>
          {TALLERES.map((taller) => (
            <li key={taller.id} className={styles.taller}>
              <div className={styles.marco}>
                <img src={taller.imagen} alt="" className={styles.imagen} />
              </div>

              <div className={styles.info}>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
