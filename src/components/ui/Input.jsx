'use client';

/* ============================================================
   INPUT — Fely Campo
   Uso: <Input etiqueta="Email" tipo="email" placeholder="nombre@email.com" />
   ============================================================ */

import styles from './Input.module.css';

/**
 * Campo de formulario estándar. Borde recto, sin radio.
 * "className" (opcional): clases extra en el propio <input>, además de
 * .input — para un ajuste puntual de un uso concreto (ej. el buscador
 * de código postal en MapaPuntosVenta.jsx, con solo borde inferior en
 * vez del borde completo de siempre) sin tocar el resto de usos.
 */
function Input({ etiqueta, tipo = 'text', placeholder, valor, onChange, nombre, tabIndex, className }) {
  return (
    <label className={styles.campo}>
      {etiqueta && <span className={styles.etiqueta}>{etiqueta}</span>}
      <input
        type={tipo}
        name={nombre}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        tabIndex={tabIndex}
        className={`${styles.input} ${className || ''}`}
      />
    </label>
  );
}

export default Input;
