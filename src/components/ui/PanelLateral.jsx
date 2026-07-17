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
  children,
  sobreNavbar = false,
  onMouseEnter,
  onMouseLeave,
  onCerrar,
}) {
  const clase = [
    styles.panel,
    abierto && styles.abierto,
    sobreNavbar && styles.sobreNavbar,
  ].filter(Boolean).join(' ');

  const claseOverlay = [
    styles.overlay,
    abierto && styles.abierto,
    sobreNavbar && styles.sobreNavbar,
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Capa oscura para centrar la atención en el panel — comparte
          transición/estado con el panel pero es un elemento hermano
          (así su opacidad no se hereda al contenido). Clic la cierra. */}
      <div className={claseOverlay} aria-hidden="true" onClick={abierto ? onCerrar : undefined} />
      <div
        className={clase}
        aria-hidden={!abierto}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={styles.contenido}>{children}</div>
      </div>
    </>
  );
}

export default PanelLateral;
