'use client';

/* ============================================================
   BOTÓN GUARDAR (wishlist) — Fely Campo
   Icono de guardar en tinta, con tooltip "Añadir a wishlist".
   Referente: styleguide.html #botones (icono .wishlist-tag) —
   el trazo es tinta siempre, y se rellena en tinta al activarse
   (la nota en prosa del styleguide dice "gris 700", pero el CSS
   real de esa misma página usa --tinta; seguimos el CSS).
   ============================================================ */

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import styles from './BotonGuardar.module.css';

function BotonGuardar({ guardado: guardadoProp, onToggle }) {
  const [guardadoInterno, setGuardadoInterno] = useState(false);
  const guardado = guardadoProp ?? guardadoInterno;

  const alternar = () => {
    const siguiente = !guardado;
    setGuardadoInterno(siguiente);
    onToggle?.(siguiente);
  };

  return (
    <span className={styles.tooltip}>
      <button
        type="button"
        aria-pressed={guardado}
        aria-label="Añadir a wishlist"
        title="Añadir a wishlist"
        onClick={alternar}
        className={styles.boton}
      >
        <Bookmark
          aria-hidden="true"
          className={styles.icono}
          fill={guardado ? 'currentColor' : 'none'}
          strokeWidth={1}
        />
      </button>
      <span className={styles.tooltipTexto}>Añadir a wishlist</span>
    </span>
  );
}

export default BotonGuardar;
