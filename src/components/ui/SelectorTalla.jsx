'use client';

/* ============================================================
   SELECTOR DE TALLA — Fely Campo
   Uso:
     const [talla, setTalla] = useState(null);
     <SelectorTalla tallas={['XS','S','M','L']} agotadas={['XL']}
                     seleccionada={talla} onSelect={setTalla} />
   ============================================================ */

import styles from './SelectorTalla.module.css';

/**
 * Selector de talla de producto. Las tallas en el array
 * 'agotadas' se muestran tachadas y deshabilitadas.
 */
function SelectorTalla({ tallas = [], agotadas = [], seleccionada, onSelect, tabIndex }) {
  return (
    <div className={styles.lista}>
      {tallas.map((t) => {
        const agotada = agotadas.includes(t);
        const activa = seleccionada === t;
        const clase = [
          styles.talla,
          agotada && styles.agotada,
          activa && !agotada && styles.activa,
        ].filter(Boolean).join(' ');

        return (
          <button key={t} type="button" disabled={agotada} onClick={() => onSelect(t)} className={clase} tabIndex={tabIndex}>
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default SelectorTalla;
