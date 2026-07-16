'use client';

/* ============================================================
   SELECTOR DE COLOR — Fely Campo
   Uso:
     <SelectorColor colores={[{ hex: '#EED3E8', nombre: 'Rosa suave' }]}
       seleccionado="Rosa suave" onSelect={setColor} />
   ============================================================ */

import styles from './SelectorColor.module.css';

function SelectorColor({ colores = [], seleccionado, onSelect }) {
  return (
    <div className={styles.selector}>
      <span className={styles.actual}>{seleccionado}</span>
      <div className={styles.swatches}>
        {colores.map(({ hex, nombre }) => (
          <button
            key={nombre}
            type="button"
            title={nombre}
            aria-label={nombre}
            aria-pressed={seleccionado === nombre}
            onClick={() => onSelect(nombre)}
            className={`${styles.swatch} ${seleccionado === nombre ? styles.activo : ''}`}
            style={{ background: hex }}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectorColor;
