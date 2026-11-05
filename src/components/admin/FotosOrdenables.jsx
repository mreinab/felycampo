'use client';

/* ============================================================
   FOTOS ORDENABLES — Fely Campo (admin)
   Subida de varias fotos a la vez + reordenar arrastrando (o con las
   flechas, para teclado) + quitar. Cada miniatura dice qué papel tiene
   en la web según su posición (ver "papeles"): en un look de Fiesta,
   la 1.ª es la de la tarjeta y la ficha, la 2.ª la que aparece al pasar
   el ratón.
   Las fotos se comprimen en el navegador (comprimirImagen de
   FormularioProducto.jsx) y se guardan como URL temporal (blob) — igual
   que el resto del admin hasta que haya almacén de fotos: ver
   docs/admin-atelier-fiesta.md.
   Uso:
     <FotosOrdenables fotos={imagenes} onChange={setImagenes}
       papeles={['Principal', 'Al pasar el ratón']} />
   ============================================================ */

import { useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, ImagePlus, X,
} from 'lucide-react';
import DragList from './DragList';
import { comprimirImagen } from './FormularioProducto';
import styles from './FotosOrdenables.module.css';

function FotosOrdenables({ fotos, onChange, papeles = [], alt = '' }) {
  const input = useRef(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');

  async function anadir(archivos) {
    const lista = [...archivos].filter((archivo) => archivo.type.startsWith('image/'));
    if (lista.length === 0) return;
    setSubiendo(true);
    setError('');
    try {
      const nuevas = [];
      for (const archivo of lista) {
        // eslint-disable-next-line no-await-in-loop
        const blob = await comprimirImagen(archivo);
        nuevas.push(URL.createObjectURL(blob));
      }
      onChange([...fotos, ...nuevas]);
    } catch {
      setError('No se ha podido leer alguna de las fotos. Prueba con JPG, PNG o WebP.');
    }
    setSubiendo(false);
    if (input.current) input.current.value = '';
  }

  function mover(indice, desplazamiento) {
    const destino = indice + desplazamiento;
    if (destino < 0 || destino >= fotos.length) return;
    const copia = [...fotos];
    [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
    onChange(copia);
  }

  return (
    <div className={styles.fotos}>
      {fotos.length > 0 && (
        <DragList
          items={fotos}
          claveItem={(src) => src}
          onReorder={onChange}
          orientacion="horizontal"
          renderItem={(src, indice) => (
            <figure className={styles.foto}>
              <img src={src} alt={alt} className={styles.imagen} draggable={false} />
              <figcaption className={styles.pie}>
                <span className={styles.numero}>{indice + 1}</span>
                <span className={styles.papel}>{papeles[indice] || ''}</span>
              </figcaption>
              <div className={styles.acciones}>
                <button type="button" className={styles.accion} onClick={() => mover(indice, -1)} disabled={indice === 0} aria-label="Mover a la izquierda">
                  <ChevronLeft size={14} aria-hidden="true" />
                </button>
                <button type="button" className={styles.accion} onClick={() => mover(indice, 1)} disabled={indice === fotos.length - 1} aria-label="Mover a la derecha">
                  <ChevronRight size={14} aria-hidden="true" />
                </button>
                <button type="button" className={styles.accion} onClick={() => onChange(fotos.filter((_, i) => i !== indice))} aria-label="Quitar foto">
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            </figure>
          )}
        />
      )}

      <button
        type="button"
        className={styles.subir}
        onClick={() => input.current?.click()}
        onDragOver={(evento) => evento.preventDefault()}
        onDrop={(evento) => { evento.preventDefault(); anadir(evento.dataTransfer.files); }}
        disabled={subiendo}
      >
        <ImagePlus size={20} strokeWidth={1.5} aria-hidden="true" />
        <span>{subiendo ? 'Subiendo…' : 'Añadir fotos'}</span>
        <span className={styles.ayuda}>Arrastra aquí o haz clic · puedes elegir varias</span>
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(evento) => anadir(evento.target.files)}
      />
      {fotos.length > 1 && <p className={styles.nota}>Arrastra las fotos para cambiar el orden.</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

export default FotosOrdenables;
