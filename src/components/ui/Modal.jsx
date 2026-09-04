'use client';

/* ============================================================
   MODAL — Fely Campo
   Diálogo centrado a pantalla completa (a diferencia de PanelLateral,
   que desliza anclado a un borde) — mismo patrón que ModalOverlay.jsx
   del panel admin (components/admin/), recreado aquí porque ese vive
   solo en el panel, no en el sitio público. Fondo oscuro como
   elemento hermano del panel (nunca el mismo nodo): así su opacidad
   no se hereda al contenido, mismo criterio que PanelLateral.
   Uso:
     <Modal abierto={abierto} onCerrar={() => setAbierto(false)}>
       contenido
     </Modal>
   ============================================================ */

import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

function Modal({ abierto, onCerrar, children }) {
  useEffect(() => {
    if (!abierto) return undefined;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(evento) {
      if (evento.key === 'Escape') onCerrar();
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflowPrevio;
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <>
      <div className={styles.overlay} aria-hidden="true" onClick={onCerrar} />
      <div className={styles.contenedor}>
        <div className={styles.panel} role="dialog" aria-modal="true">
          <button type="button" className={styles.cerrar} onClick={onCerrar} aria-label="Cerrar">
            <X size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
          </button>
          <div className={styles.contenido}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
