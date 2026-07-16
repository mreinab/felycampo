'use client';

/**
 * Panel lateral deslizante — mecanismo reutilizable, anclado al borde
 * izquierdo, ancho fijo (nunca se ajusta al contenido). Se usa en dos
 * sitios dentro de Navbar: el submenú de escritorio (hover) y el menú
 * móvil (hamburguesa) — mismo deslizamiento, contenido distinto.
 *
 * Importante: este componente permanece SIEMPRE montado; "abierto" solo
 * cambia la clase que mueve el transform. Si se desmontara al cerrar,
 * la transición de salida no se vería (desaparecería de golpe).
 */

import styles from './PanelLateral.module.css';

function PanelLateral({
  abierto,
  onCerrar,
  children,
  mostrarCerrar = false,
  sobreNavbar = false,
  onMouseEnter,
  onMouseLeave,
}) {
  const clase = [
    styles.panel,
    abierto && styles.abierto,
    sobreNavbar && styles.sobreNavbar,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={clase}
      aria-hidden={!abierto}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {mostrarCerrar && (
        <button
          type="button"
          className={styles.botonCerrar}
          onClick={onCerrar}
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      )}
      <div className={styles.contenido}>{children}</div>
    </div>
  );
}

export default PanelLateral;
