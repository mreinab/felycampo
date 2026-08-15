'use client';

/* ============================================================
   ESCRIBIR RESEÑA — Fely Campo (público)
   Placeholder de UI para el flujo "cliente logueado deja una reseña"
   (estrellas + texto + foto) que alimentaría /admin/resenas — NO hay
   login real detrás (no existe todavía ningún sistema de cuentas de
   cliente en el sitio público), es un gate puramente visual que revela
   el formulario al pulsar. El envío tampoco persiste en ningún sitio:
   solo enseña el estado "enviada, pendiente de revisión", que es
   exactamente lo que pasaría con las reseñas nuevas en el admin
   (`estado: 'Oculta'` por defecto, ver mockData.js `resenasMock`).
   La lógica real (autenticación, subida de la foto a un storage, POST a
   un backend que cree la fila en `resenasMock`) queda para cuando exista
   ese backend — aquí solo el flujo visual completo.
   ============================================================ */

import { useState } from 'react';
import { Star, Upload } from 'lucide-react';
import styles from './EscribirResena.module.css';

const ESTRELLAS = [1, 2, 3, 4, 5];

function EscribirResena() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [enviada, setEnviada] = useState(false);
  const [valoracion, setValoracion] = useState(5);
  const [texto, setTexto] = useState('');
  const [foto, setFoto] = useState('');

  function subirFoto(archivo) {
    if (!archivo) return;
    setFoto(URL.createObjectURL(archivo));
  }

  function enviar(e) {
    e.preventDefault();
    if (!texto.trim()) return;
    setEnviada(true);
  }

  if (enviada) {
    return (
      <div className={styles.bloque}>
        <p className={styles.confirmacion}>
          ¡Gracias por tu reseña! Quedará pendiente de revisión antes de publicarse.
        </p>
      </div>
    );
  }

  if (!sesionIniciada) {
    return (
      <div className={styles.bloque}>
        <p className={styles.gateTexto}>¿Ya tienes cuenta? Inicia sesión para dejar tu reseña de este producto.</p>
        <button type="button" className={styles.gateBoton} onClick={() => setSesionIniciada(true)}>
          Iniciar sesión (demo)
        </button>
      </div>
    );
  }

  return (
    <form className={styles.bloque} onSubmit={enviar}>
      <p className={styles.titulo}>Escribe tu reseña</p>

      <div className={styles.estrellasFila}>
        {ESTRELLAS.map((n) => (
          <button
            key={n}
            type="button"
            className={styles.estrella}
            aria-label={`${n} estrellas`}
            onClick={() => setValoracion(n)}
          >
            <Star size={20} fill={n <= valoracion ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Cuéntanos qué te ha parecido…"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={4}
        required
      />

      <label className={styles.subirFoto}>
        {foto ? (
          <img src={foto} alt="" className={styles.fotoPreview} />
        ) : (
          <span className={styles.subirFotoVacio}>
            <Upload size={18} strokeWidth={1} aria-hidden="true" />
            Añadir una foto (opcional)
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className={styles.inputArchivo}
          onChange={(e) => subirFoto(e.target.files?.[0])}
        />
      </label>

      <button type="submit" className={styles.enviarBoton}>Enviar reseña</button>
    </form>
  );
}

export default EscribirResena;
