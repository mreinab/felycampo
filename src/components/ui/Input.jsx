'use client';

/* ============================================================
   INPUT — Fely Campo
   Uso: <Input etiqueta="Email" tipo="email" placeholder="nombre@email.com" />
   ============================================================ */

import styles from './Input.module.css';

/**
 * Campo de formulario estándar. Borde recto, sin radio.
 */
function Input({ etiqueta, tipo = 'text', placeholder, valor, onChange, nombre }) {
  return (
    <label className={styles.campo}>
      {etiqueta && <span className={styles.etiqueta}>{etiqueta}</span>}
      <input
        type={tipo}
        name={nombre}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </label>
  );
}

export default Input;
