/* ============================================================
   RUNWAY — Fely Campo. Ruta: /colecciones-fely-campo (antes
   /archivo/runway — renombrada). Cuadrícula editorial de las 9
   colecciones de pasarela (ver colecciones.js, datos compartidos con
   la ficha de cada colección). Cada tarjeta enlaza a la ficha de su
   colección en /runways-[slug] (ver ../runways-[coleccion]/page.js —
   ruta hermana, no anidada bajo esta, a petición directa del usuario;
   ej. /runways-dreaming, /runways-diafonia).
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { HeroPagina, RunwayTarjeta } from '@/components/layout';
import { COLECCIONES } from './colecciones';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <>
    {/* Hero común (HeroPagina): portada de la colección más reciente
        (La Colección FW27, primera de COLECCIONES). */}
    <HeroPagina
      imagen={COLECCIONES[0].medios[0].src}
      alt={t('nav.submenus.colecciones.runway')}
      titulo={t('nav.submenus.colecciones.runway')}
      subtitulo={t('heroPagina.runwayArchivo')}
    />
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
    </>
  );
}
