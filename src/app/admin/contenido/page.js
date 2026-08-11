'use client';

/* ============================================================
   CONTENIDO — spec sección 8. Textos/bloques fijos de páginas clave
   (About, Visítanos, Ayuda). Solo contenido — sin editar estructura.
   ============================================================ */

import { useState } from 'react';
import { PageHeader, PickerDrawer, useToast } from '@/components/admin';
import { Acordeon, FilaAcordeon, Boton } from '@/components/ui';
import { contenidoMock, bancoImagenes } from '@/components/admin/mockData';
import styles from './page.module.css';

function EditorBloque({ bloque, actualizar }) {
  const [previa, setPrevia] = useState(false);
  const [pickerAbierto, setPickerAbierto] = useState(false);
  const [seleccionTemp, setSeleccionTemp] = useState([]);

  return (
    <div className={styles.editor}>
      <div className={styles.campos}>
        <label>
          <span>Título</span>
          <input
            className={styles.inputTitulo}
            value={bloque.titulo}
            onChange={(e) => actualizar({ titulo: e.target.value })}
          />
        </label>
        <label>
          <span>Texto</span>
          <textarea className={styles.textarea} value={bloque.texto} onChange={(e) => actualizar({ texto: e.target.value })} />
        </label>
      </div>

      <Boton
        variante="contorno"
        tamano="s"
        onClick={() => { setSeleccionTemp(bloque.imagen ? [bloque.imagen] : []); setPickerAbierto(true); }}
      >
        {bloque.imagen ? 'Cambiar imagen' : 'Añadir imagen (opcional)'}
      </Boton>
      {' '}
      <Boton variante="texto" onClick={() => setPrevia((v) => !v)}>{previa ? 'Ocultar vista previa' : 'Vista previa'}</Boton>

      {previa && (
        <div className={styles.previa}>
          {bloque.imagen && <img src={bloque.imagen} alt="" className={styles.previaImagen} />}
          <p className={styles.previaTitulo}>{bloque.titulo}</p>
          <p className={styles.previaTexto}>{bloque.texto}</p>
        </div>
      )}

      <PickerDrawer
        abierto={pickerAbierto}
        onCerrar={() => setPickerAbierto(false)}
        titulo="Elegir imagen"
        items={bancoImagenes}
        claveItem={(src) => src}
        seleccionados={seleccionTemp}
        max={1}
        onToggle={(src) => setSeleccionTemp([src])}
        renderItem={(src) => <img src={src} alt="" className={styles.pickerImagen} />}
        onConfirmar={() => actualizar({ imagen: seleccionTemp[0] || '' })}
        columnas={2}
      />
    </div>
  );
}

export default function ContenidoPage() {
  const { mostrarToast } = useToast();
  const [paginas, setPaginas] = useState(contenidoMock);

  function actualizarBloque(pagina, bloqueId, cambios) {
    setPaginas((actual) => actual.map((p) => (
      p.pagina !== pagina ? p : { ...p, bloques: p.bloques.map((b) => (b.id === bloqueId ? { ...b, ...cambios } : b)) }
    )));
    mostrarToast('Cambios guardados (demo)');
  }

  return (
    <div className={styles.pagina}>
      <PageHeader titulo="Contenido" subtitulo="Textos y bloques de páginas fijas del sitio público" />
      <Acordeon>
        {paginas.map((pagina) => (
          <FilaAcordeon key={pagina.pagina} titulo={<span className={styles.cabecera}>{pagina.pagina}</span>}>
            {pagina.bloques.map((bloque) => (
              <EditorBloque
                key={bloque.id}
                bloque={bloque}
                actualizar={(cambios) => actualizarBloque(pagina.pagina, bloque.id, cambios)}
              />
            ))}
          </FilaAcordeon>
        ))}
      </Acordeon>
    </div>
  );
}
