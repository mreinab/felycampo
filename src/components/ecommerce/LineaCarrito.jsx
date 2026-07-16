'use client';

/* ============================================================
   LÍNEA DE CARRITO — Fely Campo (e-commerce)
   Uso:
     <LineaCarrito imagen="/img/aurora.jpg" nombre="Vestido Aurora"
        talla="M" precio="890 €" cantidad={1}
        onCantidad={(n) => ...} onQuitar={() => ...} />
   ============================================================ */

import styles from './LineaCarrito.module.css';
import { SelectorCantidad } from '../ui';

/**
 * Fila de producto dentro del carrito, con selector de
 * cantidad integrado y opción de quitar.
 */
function LineaCarrito({ imagen, nombre, talla, precio, cantidad, onCantidad, onQuitar }) {
  return (
    <div className={styles.linea}>
      <div className={styles.marco}>
        {imagen && <img src={imagen} alt={nombre} className={styles.imagen} />}
      </div>

      <div className={styles.info}>
        <div>
          <div className={styles.cabecera}>
            <p className={styles.nombre}>{nombre}</p>
            <button onClick={onQuitar} className={styles.quitar}>Quitar</button>
          </div>
          {talla && <p className={styles.talla}>Talla: {talla}</p>}
        </div>

        <div className={styles.pie}>
          <SelectorCantidad valor={cantidad} onChange={onCantidad} />
          <span className={styles.precio}>{precio}</span>
        </div>
      </div>
    </div>
  );
}

export default LineaCarrito;
