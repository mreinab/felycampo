'use client';

/* ============================================================
   ACORDEÓN — Fely Campo
   Lista de filas expandibles de forma independiente entre sí
   (no es un acordeón exclusivo: pueden estar varias abiertas a
   la vez). Pensado para bloques de producto: Details, Materials
   and care, Size and fit, Shipping and returns...
   Uso:
     <Acordeon>
       <FilaAcordeon titulo="Details">
         <p>Corte relajado, tejido jacquard con flores en relieve.</p>
       </FilaAcordeon>
       <FilaAcordeon titulo="Materials and care">
         <p>100% algodón.</p>
         <p>Lavado a mano, no usar secadora.</p>
       </FilaAcordeon>
     </Acordeon>
   ============================================================ */

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Acordeon.module.css';

function FilaAcordeon({ titulo, children, abiertoPorDefecto = false }) {
  const [abierto, setAbierto] = useState(abiertoPorDefecto);
  const contenidoId = useId();

  return (
    <div className={styles.fila}>
      <button
        type="button"
        className={styles.cabecera}
        aria-expanded={abierto}
        aria-controls={contenidoId}
        onClick={() => setAbierto((valor) => !valor)}
      >
        <span className={styles.titulo}>{titulo}</span>
        <ChevronDown
          aria-hidden="true"
          className={`${styles.icono} ${abierto ? styles.iconoAbierto : ''}`}
        />
      </button>
      <div
        id={contenidoId}
        className={`${styles.contenido} ${abierto ? styles.contenidoAbierto : ''}`}
        aria-hidden={!abierto}
      >
        <div className={styles.contenidoInner}>
          <div className={styles.contenidoTexto}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function Acordeon({ children }) {
  return <div className={styles.lista}>{children}</div>;
}

export { FilaAcordeon };
export default Acordeon;
