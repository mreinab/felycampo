// MediaLink.jsx

import styles from './MediaLink.module.css';

/**
 * Enlace grande imagen + texto: toda la tarjeta es clicable. Genérico,
 * sin lógica de navegación (no sabe de locales, menús ni rutas) — quien
 * lo use decide el href y controla su tamaño desde fuera (por defecto
 * se reparte a partes iguales dentro de cualquier contenedor flex).
 */
function MediaLink({ href, image, label }) {
  return (
    <a href={href} className={styles.card}>
      <img src={image} alt="" className={styles.image} />
      <p className={styles.label}>{label}</p>
    </a>
  );
}

export default MediaLink;
