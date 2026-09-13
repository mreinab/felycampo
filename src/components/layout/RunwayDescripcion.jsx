// RunwayDescripcion.jsx

'use client';

/* ============================================================
   DESCRIPCIÓN DE COLECCIÓN — Fely Campo
   Texto editorial, debajo del hero de cada ficha de colección (ver
   /colecciones-fely-campo/[coleccion]/page.js) — vive junto a .textoRow dentro
   de un contenedor común a 70% de ancho (.textoDescripcion en
   page.module.css), sin ancho propio. Mismo criterio de repetición
   que RunwayMediaLateral: solo cambia el texto (coleccion.descripcion,
   ver colecciones.js).
   Uso:
     <RunwayDescripcion texto={coleccion.descripcion} />
   "className" opcional, se suma a .texto — para overrides puntuales
   de una sola página (ej. /atelier), no cambia el resto de usos.
   'use client' por useEnVista: el párrafo aparece con scroll (ver
   .al-scroll/.en-vista en global.css), no de golpe al cargar. */

import styles from './RunwayDescripcion.module.css';
import useEnVista from '@/hooks/useEnVista';

function RunwayDescripcion({ texto, className }) {
  const [ref, enVista] = useEnVista();

  if (!texto) return null;

  return (
    <div className={styles.descripcion}>
      <p ref={ref} className={`${styles.texto} ${className || ''} al-scroll ${enVista ? 'en-vista' : ''}`}>
        {texto}
      </p>
    </div>
  );
}

export default RunwayDescripcion;
