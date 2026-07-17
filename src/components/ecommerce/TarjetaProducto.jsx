/* ============================================================
   TARJETA DE PRODUCTO — Fely Campo (e-commerce)
   Referente: styleguide.html #producto (.sg-prod).
   Uso:
     <TarjetaProducto imagen="/img/aurora.jpg" imagenHover="/img/aurora-2.jpg"
        nombre="Vestido Aurora" precio="890 €" badge="Novia"
        colores={[{ hex: '#EED3E8', nombre: 'Rosa suave' }]} />
     <TarjetaProducto nombre="Vestido Nube" precio="690 €" agotado />
     <TarjetaProducto imagen="/img/aurora.mp4" tipo="video"
        imagenHover="/img/aurora-2.mp4" tipoHover="video"
        nombre="Vestido Aurora" precio="890 €" />
   ============================================================ */

import styles from './TarjetaProducto.module.css';
import { Etiqueta, BotonGuardar, Boton } from '../ui';

/**
 * Tarjeta de producto de e-commerce. Sin badge = producto
 * normal. Con 'precioRebajado' = muestra precio tachado + nuevo precio en rosa.
 * "imagen"/"imagenHover" admiten vídeo — tipo/tipoHover ('imagen' por
 * defecto | 'video') deciden si cada una se renderiza como <img> o
 * como <video autoPlay muted loop playsInline>, independientemente
 * una de la otra (ej. imagen base + vídeo en hover).
 */
function TarjetaProducto({
  imagen,
  imagenHover,
  tipo = 'imagen',
  tipoHover = 'imagen',
  nombre,
  precio,
  precioRebajado,
  badge,
  badgeVariante = 'tinta',
  colores = [],
  agotado = false,
  alt,
}) {
  const coloresVisibles = colores.slice(0, 3);
  const coloresRestantes = colores.length - coloresVisibles.length;

  return (
    <article className={styles.tarjeta}>
      <div className={styles.marco}>
        {badge && (
          <span className={styles.badge}>
            <Etiqueta variante={badgeVariante}>{badge}</Etiqueta>
          </span>
        )}

        <span className={styles.wishlist}>
          <BotonGuardar />
        </span>

        <div className={styles.recorte}>
          {imagen && (
            tipo === 'video' ? (
              <video
                src={imagen}
                className={`${styles.imagen} ${styles.imagenBase}`}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={imagen}
                alt={alt || nombre}
                className={`${styles.imagen} ${styles.imagenBase}`}
              />
            )
          )}
          {imagenHover && (
            tipoHover === 'video' ? (
              <video
                src={imagenHover}
                className={`${styles.imagen} ${styles.imagenHover}`}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={imagenHover}
                alt=""
                className={`${styles.imagen} ${styles.imagenHover}`}
              />
            )
          )}
        </div>
      </div>

      <div className={styles.encabezado}>
        <p className={styles.nombre}>{nombre}</p>

        <div className={styles.precios}>
          {precioRebajado ? (
            <>
              <span className={styles.antes}>{precio}</span>
              <span className={styles.ahora}>{precioRebajado}</span>
            </>
          ) : (
            <span className={styles.precio}>{precio}</span>
          )}
        </div>
      </div>

      {agotado ? (
        <div className={styles.accion}>
          <Boton variante="avisa">Avísame cuando esté disponible</Boton>
        </div>
      ) : (
        coloresVisibles.length > 0 && (
          <div className={styles.colores}>
            {coloresVisibles.map(({ hex, nombre: nombreColor }) => (
              <span
                key={nombreColor}
                className={styles.punto}
                style={{ background: hex }}
                title={nombreColor}
              />
            ))}
            {coloresRestantes > 0 && (
              <span className={styles.mas}>+{coloresRestantes}</span>
            )}
          </div>
        )
      )}
    </article>
  );
}

export default TarjetaProducto;
