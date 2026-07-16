'use client';

/* ============================================================
   BOTÓN — Fely Campo
   Estilos en Boton.module.css (cascada real sobre los tokens
   de global.css). El componente solo decide QUÉ clases aplicar.
   Uso:
     <Boton>Comprar</Boton>
     <Boton variante="contorno">Ver colección</Boton>
     <Boton variante="rosa" tamano="full">Añadir a la cesta</Boton>
     <Boton variante="texto">Descubrir más</Boton>
   ============================================================ */

import styles from './Boton.module.css';

/**
 * Botón principal del sistema. 'solido' = acción principal (una
 * por pantalla). 'rosa' se reserva para CTAs de compra — no repetir más de
 * una vez por vista, pierde fuerza. 'contorno' = acción secundaria. 'texto'
 * = enlaces. Esquinas siempre rectas (radio 0).
 */
function Boton({
  children,
  variante = 'solido',
  tamano = 'm',
  onClick,
  type = 'button',
  desactivado = false,
  mayusculas = false,
}) {
  if (variante === 'texto') {
    const clase = mayusculas
      ? `${styles.texto} ${styles.textoMayusculas}`
      : styles.texto;
    return (
      <span
        onClick={desactivado ? undefined : onClick}
        className={clase}
      >
        {children}
      </span>
    );
  }

  // La variante "avisa" tiene un tamaño fijo — no se combina con .s/.m/.l/.full
  const clase = variante === 'avisa'
    ? `${styles.boton} ${styles.avisa}`
    : `${styles.boton} ${styles[variante]} ${styles[tamano]}`;

  return (
    <button type={type} onClick={onClick} disabled={desactivado} className={clase}>
      {children}
    </button>
  );
}

export default Boton;
