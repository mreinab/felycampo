'use client';

/* ============================================================
   GALERÍA EDITABLE — Fely Campo (admin)
   Lista de fotos (y vídeos, si se permite) de una página: se añaden
   varias a la vez (clic o arrastrando), se reordenan arrastrando o con
   las flechas, se quitan, y cada una puede llevar su pie de foto en el
   idioma que se edita.
   Valor:
     conPie   → [{ src, pie: { es, en } }]   (fotos de Sobre Fely)
     sin pie  → ['ruta', 'ruta', …]          (carrusel de un taller)
   "papeles": lo que hace cada foto en la web según su posición
   (función (indice, total) → texto), p. ej. "Junto al texto".
   Las fotos se comprimen en el navegador (comprimirImagen) y, como en el
   resto del admin hasta que haya almacén de archivos, se guardan como
   URL temporal (blob). Los vídeos recién subidos llevan "#video" al final
   para reconocerlos (ver esVideoTaller en lib/talleres.js).
   ============================================================ */

import { useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, ImagePlus, Plus, X,
} from 'lucide-react';
import { faltaTexto } from '@/lib/previa';
import DragList from './DragList';
import { comprimirImagen } from './FormularioProducto';
import styles from './GaleriaEditable.module.css';

const MB = 1024 * 1024;
const MAXIMO_VIDEO_MB = 15;
const OTRO = { es: 'en', en: 'es' };

const esVideoPorDefecto = (src) => /\.(mp4|webm|mov)(\?|#|$)/i.test(src) || /#video$/.test(src);

function GaleriaEditable({
  valor = [], onChange, idioma = 'es', conPie = false, permitirVideo = false, papeles, esVideo = esVideoPorDefecto,
  textoAnadir,
}) {
  const input = useRef(null);
  const [subiendo, setSubiendo] = useState(false);
  const [encima, setEncima] = useState(false);
  const [error, setError] = useState('');

  // Todo se trabaja como { src, pie } y se devuelve en el formato de entrada.
  const items = valor.map((item) => (typeof item === 'string' ? { src: item, pie: null } : item));
  const devolver = (lista) => onChange(conPie ? lista : lista.map((item) => item.src));

  async function anadir(archivos) {
    const lista = [...(archivos || [])].filter((archivo) => archivo.type.startsWith('image/') || (permitirVideo && archivo.type.startsWith('video/')));
    if (lista.length === 0) {
      setError(permitirVideo ? 'Elige fotos (JPG, PNG o WebP) o vídeos (MP4).' : 'Elige fotos (JPG, PNG o WebP).');
      return;
    }
    setSubiendo(true);
    setError('');
    const nuevas = [];
    const rechazados = [];
    for (const archivo of lista) {
      try {
        if (archivo.type.startsWith('video/')) {
          if (archivo.size > MAXIMO_VIDEO_MB * MB) {
            rechazados.push(`${archivo.name} (${Math.round(archivo.size / MB)} MB)`);
          } else {
            nuevas.push({ src: `${URL.createObjectURL(archivo)}#video`, pie: conPie ? { es: '', en: '' } : null });
          }
        } else {
          // eslint-disable-next-line no-await-in-loop
          const blob = await comprimirImagen(archivo);
          nuevas.push({ src: URL.createObjectURL(blob), pie: conPie ? { es: '', en: '' } : null });
        }
      } catch {
        rechazados.push(archivo.name);
      }
    }
    if (nuevas.length) devolver([...items, ...nuevas]);
    if (rechazados.length) {
      setError(`No se han podido subir: ${rechazados.join(', ')}. Los vídeos, como máximo ${MAXIMO_VIDEO_MB} MB.`);
    }
    setSubiendo(false);
    if (input.current) input.current.value = '';
  }

  function mover(indice, desplazamiento) {
    const destino = indice + desplazamiento;
    if (destino < 0 || destino >= items.length) return;
    const copia = [...items];
    [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
    devolver(copia);
  }

  function cambiarPie(indice, texto) {
    devolver(items.map((item, posicion) => (posicion === indice ? { ...item, pie: { ...item.pie, [idioma]: texto } } : item)));
  }

  const hayVideos = items.some((item) => esVideo(item.src));
  const recuento = `${items.length} ${hayVideos || permitirVideo ? (items.length === 1 ? 'elemento' : 'elementos') : (items.length === 1 ? 'foto' : 'fotos')}`;

  return (
    <div className={styles.galeria}>
      {/* Cabecera: recuento y «Añadir» siempre a la vista, aunque la fila
          sea más larga que el bloque. */}
      <div className={styles.cabecera}>
        <span className={styles.recuento}>{items.length ? recuento : 'Sin fotos'}</span>
        <button type="button" className={styles.anadirTexto} onClick={() => input.current?.click()} disabled={subiendo}>
          <Plus size={14} aria-hidden="true" />
          {textoAnadir || (permitirVideo ? 'Añadir fotos o vídeos' : 'Añadir fotos')}
        </button>
      </div>

      <div className={styles.fila}>
        {items.length > 0 && (
          <DragList
            items={items}
            claveItem={(item) => item.src}
            onReorder={devolver}
            orientacion="horizontal"
            renderItem={(item, indice) => {
              const video = esVideo(item.src);
              const pieFalta = conPie && faltaTexto(item.pie, idioma, false);
              return (
                <figure className={styles.foto}>
                  <div className={styles.marco}>
                    {video
                      ? <video src={item.src} className={styles.medio} muted loop playsInline autoPlay />
                      : <img src={item.src} alt="" className={styles.medio} draggable={false} />}
                    <span className={styles.numero}>{indice + 1}</span>
                    {video && <span className={styles.etiquetaVideo}>Vídeo</span>}
                    <div className={styles.acciones}>
                      <button type="button" className={styles.accion} onClick={() => mover(indice, -1)} disabled={indice === 0} aria-label="Mover a la izquierda">
                        <ChevronLeft size={14} aria-hidden="true" />
                      </button>
                      <button type="button" className={styles.accion} onClick={() => mover(indice, 1)} disabled={indice === items.length - 1} aria-label="Mover a la derecha">
                        <ChevronRight size={14} aria-hidden="true" />
                      </button>
                      <button type="button" className={styles.accion} onClick={() => devolver(items.filter((_, posicion) => posicion !== indice))} aria-label="Quitar">
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  {papeles && <figcaption className={styles.papel}>{papeles(indice, items.length)}</figcaption>}
                  {conPie && (
                    <input
                      className={`${styles.pie} ${pieFalta ? styles.pieFalta : ''}`}
                      value={item.pie?.[idioma] || ''}
                      placeholder={item.pie?.[OTRO[idioma]] ? `${idioma === 'en' ? 'ES' : 'EN'}: ${item.pie[OTRO[idioma]]}` : 'Pie de foto (opcional)'}
                      aria-label={`Pie de la foto ${indice + 1}`}
                      title={pieFalta ? 'Falta la traducción de este pie' : undefined}
                      onChange={(evento) => cambiarPie(indice, evento.target.value)}
                    />
                  )}
                </figure>
              );
            }}
          />
        )}

        <button
          type="button"
          className={`${styles.anadir} ${encima ? styles.encima : ''}`}
          onClick={() => input.current?.click()}
          onDragEnter={(evento) => { evento.preventDefault(); setEncima(true); }}
          onDragOver={(evento) => evento.preventDefault()}
          onDragLeave={() => setEncima(false)}
          onDrop={(evento) => { evento.preventDefault(); setEncima(false); anadir(evento.dataTransfer.files); }}
          disabled={subiendo}
        >
          <ImagePlus size={18} strokeWidth={1.5} aria-hidden="true" />
          <span>{subiendo ? 'Subiendo…' : (textoAnadir || (permitirVideo ? 'Añadir fotos o vídeos' : 'Añadir fotos'))}</span>
          <span className={styles.anadirAyuda}>Clic o arrastra aquí · varias a la vez</span>
        </button>
      </div>

      {items.length > 1 && <p className={styles.nota}>Arrastra para cambiar el orden.</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}

      <input
        ref={input}
        type="file"
        accept={permitirVideo ? 'image/*,video/mp4,video/webm' : 'image/*'}
        multiple
        hidden
        onChange={(evento) => anadir(evento.target.files)}
      />
    </div>
  );
}

export default GaleriaEditable;
