// ProductHero.jsx

/* ============================================================
   PRODUCT HERO — Fely Campo
   Cabecera visual de 50vh a ancho completo (imagen de fondo, cover y
   centrada) usada en páginas de listado de producto (Tienda/Atelier)
   antes de la cuadrícula — sin texto ni CTA, solo ambientación.
   Uso:
     <ProductHero imagen="/img/ecommerce/Categorias/vestido.webp" />
   ============================================================ */

import styles from './ProductHero.module.css';

/**
 * data-navbar-hero: marca este bloque para que Navbar (ver
 * Navbar.jsx) sepa cuándo volverse sólido — mientras esté en el
 * viewport, el header se mantiene transparente con el logo pequeño y
 * los enlaces en blanco; en cuanto se scrollea fuera de él, pasa al
 * navbar normal. Mismo criterio (IntersectionObserver) que ya usa
 * Navbar.jsx para saber cuándo el Footer entra en pantalla.
 */
function ProductHero({ imagen, alt = '' }) {
  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${imagen})` }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      data-navbar-hero
    />
  );
}

export default ProductHero;
