/* ============================================================
   BLOQUE DE SECCIÓN (imagen + texto) — Fely Campo
   Uso:
     <BloqueSeccion imagen="/img/atelier.jpg" titulo="Visita el atelier"
        texto="Costura a medida en Salamanca." enlace="Descubrir más"
        invertido={false} />
   ============================================================ */

import styles from './BloqueSeccion.module.css';
import { Boton } from '../ui';

/**
 * Bloque editorial imagen+texto, reutilizado en varias
 * páginas (About, Atelier, colecciones). 'invertido' cambia el lado de la imagen.
 */
function BloqueSeccion({ imagen, titulo, texto, enlace, invertido = false }) {
  return (
    <section className={styles.seccion}>
      <div className={`${styles.marco} ${invertido ? styles.invertido : ''}`}>
        {imagen && <img src={imagen} alt={titulo} className={styles.imagen} />}
      </div>

      <div className={invertido ? styles.textoInvertido : ''}>
        <h2 className={styles.titulo}>{titulo}</h2>
        <p className={styles.texto}>{texto}</p>
        {enlace && <Boton variante="texto">{enlace}</Boton>}
      </div>
    </section>
  );
}

export default BloqueSeccion;
