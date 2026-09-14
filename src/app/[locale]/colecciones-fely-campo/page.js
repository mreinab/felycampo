/* ============================================================
   RUNWAY — Fely Campo. Ruta: /colecciones-fely-campo (antes
   /archivo/runway — renombrada). Cuadrícula editorial de las 9
   colecciones de pasarela (ver colecciones.js, datos compartidos con
   la ficha de cada colección). Cada tarjeta enlaza a la ficha de su
   colección en /runways-[slug] (ver ../runways-[coleccion]/page.js —
   ruta hermana, no anidada bajo esta, a petición directa del usuario;
   ej. /runways-dreaming, /runways-diafonia).
   ============================================================ */

import { RunwayTarjeta } from '@/components/layout';
import { COLECCIONES } from './colecciones';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <section className={`${styles.pagina} contenedor`}>
      <div className={styles.grid}>
        {COLECCIONES.map((coleccion) => (
          <RunwayTarjeta
            key={coleccion.slug}
            href={`/${locale}/runways-${coleccion.slug}`}
            nombre={coleccion.nombre}
            temporada={coleccion.temporada}
            medios={coleccion.medios}
          />
        ))}
      </div>
    </section>
  );
}
