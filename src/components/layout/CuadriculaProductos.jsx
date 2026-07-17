// CuadriculaProductos.jsx

import TarjetaProducto from '../ecommerce/TarjetaProducto';
import styles from './CuadriculaProductos.module.css';

/**
 * Banda de productos a 60vh de alto, fila única en flex — cada tarjeta
 * reparte el ancho disponible a partes iguales (flex:1) y se adapta,
 * no hay columnas fijas por breakpoint. Pensada para 4 productos. Cada
 * uno se muestra con TarjetaProducto en su forma base — este componente
 * no le pasa badge/colores/precioRebajado, solo lo que venga en cada
 * objeto de "productos".
 */
function CuadriculaProductos({ productos }) {
  return (
    <div className={styles.cuadricula}>
      {productos.map((producto) => (
        <div key={producto.nombre} className={styles.item}>
          <TarjetaProducto {...producto} />
        </div>
      ))}
    </div>
  );
}

export default CuadriculaProductos;
