// CuadriculaProductos.jsx

import TarjetaProducto from '../ecommerce/TarjetaProducto';
import TarjetaMedia from '../ecommerce/TarjetaMedia';
import { VerMasOverlay } from '../ui';
import styles from './CuadriculaProductos.module.css';

/**
 * Banda de productos a 60vh de alto, fila única en flex — cada tarjeta
 * reparte el ancho disponible a partes iguales (flex:1) y se adapta,
 * no hay columnas fijas por breakpoint. Pensada para 4 productos. Cada
 * uno se muestra con TarjetaProducto en su forma base — este componente
 * no le pasa badge/colores/precioRebajado, solo lo que venga en cada
 * objeto de "productos".
 *
 * Un objeto con "media: true" rompe esa norma: se renderiza como
 * TarjetaMedia (solo imagen/gif/vídeo en bucle, sin nombre ni precio)
 * en vez de TarjetaProducto — para variar el ritmo de la fila sin
 * que cuente como un producto más.
 *
 * "verMasHref" (opcional): añade un VerMasOverlay sobre el último
 * elemento — tercio derecho de esa tarjeta, enlaza al listado
 * completo de la colección, solo en desktop (ver VerMasOverlay).
 */
function CuadriculaProductos({ productos, verMasHref }) {
  const ultimoIndex = productos.length - 1;

  return (
    <div className={styles.cuadricula}>
      {productos.map((producto, index) => {
        const esUltimo = verMasHref && index === ultimoIndex;

        return (
          <div
            key={producto.nombre || producto.src}
            className={`${styles.item} ${esUltimo ? styles.itemConVerMas : ''}`}
          >
            {producto.media ? (
              <TarjetaMedia {...producto} />
            ) : (
              <TarjetaProducto {...producto} />
            )}
            {esUltimo && <VerMasOverlay href={verMasHref} />}
          </div>
        );
      })}
    </div>
  );
}

export default CuadriculaProductos;
