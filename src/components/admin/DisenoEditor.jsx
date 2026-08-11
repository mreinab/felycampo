'use client';

/* ============================================================
   EDITOR DE DISEÑO — Fely Campo (admin)
   Una fila de acordeón por bloque REAL de la landing (mismo orden que
   src/app/[locale]/page.js — ver disenoMock), cada una independiente.
   El admin nunca sube nada "a ciegas": todo lo que elige (imagen,
   producto, reseña) ya existe en el sistema — de ahí el PickerDrawer
   centralizado (un único panel lateral reconfigurado por bloque, en
   vez de 8 instancias montadas a la vez).
   ============================================================ */

import { useState } from 'react';
import {
  Image as ImageIcon, Type, ShoppingBag, Star, LayoutGrid, Columns2, FileText, Film, Plus, X,
} from 'lucide-react';
import { Acordeon, FilaAcordeon, Boton, Input } from '../ui';
import { PageHeader, PickerDrawer, DragList, SelectorIdioma } from './index';
import { productosMock, resenasMock, paginasInternas, bancoImagenes, bancoVideos, disenoMock } from './mockData';
import styles from './DisenoEditor.module.css';

const ICONOS_KIND = {
  hero: Film,
  text: Type,
  media: ImageIcon,
  productRow: ShoppingBag,
  mediaSplit: Columns2,
  productRowTabs: LayoutGrid,
  mediaText: FileText,
  reviews: Star,
};

const TITULOS_KIND = {
  hero: 'Hero — carrusel',
  text: 'Bloque de texto',
  media: 'Imagen + CTA',
  productRow: 'Fila de producto',
  mediaSplit: 'Dos imágenes',
  productRowTabs: 'Fila de producto con tabs',
  mediaText: 'Imagen + texto',
  reviews: 'Reseñas destacadas',
};

const BANCO_MEDIA = [
  ...bancoImagenes.map((src) => ({ src, tipo: 'imagen' })),
  ...bancoVideos.map((src) => ({ src, tipo: 'video' })),
];

function renderMediaPicker(item) {
  return item.tipo === 'video'
    ? <video src={item.src} className={styles.pickerImagen} muted />
    : <img src={item.src} alt="" className={styles.pickerImagen} />;
}

function elegirMediaUnico({ abrirPicker, actual, onElegido }) {
  abrirPicker({
    titulo: 'Elegir imagen o vídeo',
    items: BANCO_MEDIA,
    claveItem: (item) => item.src,
    seleccionInicial: actual ? [actual] : [],
    max: 1,
    renderItem: renderMediaPicker,
    onConfirmar: (seleccion) => {
      const elegido = BANCO_MEDIA.find((item) => item.src === seleccion[0]);
      if (elegido) onElegido(elegido);
    },
  });
}

function miniaturasDe(bloque) {
  switch (bloque.kind) {
    case 'hero':
      return bloque.slides.filter((s) => s.tipo === 'imagen').map((s) => s.src).slice(0, 3);
    case 'media':
      return bloque.tipo === 'imagen' ? [bloque.src] : [];
    case 'productRow':
      return bloque.productoIds.map((id) => productosMock.find((p) => p.id === id)?.imagen).filter(Boolean).slice(0, 3);
    case 'mediaSplit':
      return bloque.items.filter((i) => i.tipo === 'imagen').map((i) => i.src);
    case 'productRowTabs':
      return (bloque.tabs[0]?.productoIds || []).map((id) => productosMock.find((p) => p.id === id)?.imagen).filter(Boolean).slice(0, 3);
    case 'mediaText':
      return [bloque.imagen];
    case 'reviews':
      return bloque.resenaIds.map((id) => resenasMock.find((r) => r.id === id)?.foto).filter(Boolean).slice(0, 3);
    default:
      return [];
  }
}

function SelectorMedia({ src, tipo, onAbrir }) {
  return (
    <div className={styles.imagenPrevia}>
      {tipo === 'video' ? (
        <video src={src} className={styles.imagenPreviaMiniatura} muted />
      ) : (
        <img src={src} alt="" className={styles.imagenPreviaMiniatura} />
      )}
      <Boton variante="contorno" tamano="s" onClick={onAbrir}>Cambiar imagen/vídeo</Boton>
    </div>
  );
}

function SelectorDestino({ etiqueta = 'Destino', valor, onChange }) {
  return (
    <label className={styles.campoAncho}>
      <span className={styles.etiquetaCampo}>{etiqueta}</span>
      <select className={styles.selectInput} value={valor} onChange={onChange}>
        {paginasInternas.map((p) => <option key={p.valor} value={p.valor}>{p.etiqueta}</option>)}
      </select>
    </label>
  );
}

function SelectorProductos({ productoIds, onChange, abrirPicker, max = 4 }) {
  const seleccionados = productoIds.map((id) => productosMock.find((p) => p.id === id)).filter(Boolean);

  function elegir() {
    abrirPicker({
      titulo: 'Elegir productos',
      items: productosMock,
      claveItem: (p) => p.id,
      seleccionInicial: productoIds,
      max,
      renderItem: (p) => <img src={p.imagen} alt="" className={styles.pickerImagen} />,
      onConfirmar: (seleccion) => onChange(seleccion),
    });
  }

  return (
    <div>
      {seleccionados.length > 0 && (
        <div className={styles.productos}>
          <DragList
            items={seleccionados}
            claveItem={(p) => p.id}
            onReorder={(nuevo) => onChange(nuevo.map((p) => p.id))}
            renderItem={(p) => (
              <div className={styles.productoChip}>
                <img src={p.imagen} alt="" className={styles.productoChipImg} />
                <span className={styles.productoChipNombre}>{p.nombre}</span>
                <Boton variante="texto" onClick={() => onChange(productoIds.filter((id) => id !== p.id))}>Quitar</Boton>
              </div>
            )}
          />
        </div>
      )}
      <Boton variante="contorno" tamano="s" onClick={elegir}>
        Elegir productos ({seleccionados.length}/{max})
      </Boton>
    </div>
  );
}

// ---------- Editores por tipo de bloque ----------

function EditorTexto({ bloque, actualizar }) {
  const [idioma, setIdioma] = useState('es');
  return (
    <div className={styles.editor}>
      <div className={styles.campoAncho}><SelectorIdioma idioma={idioma} onChange={setIdioma} /></div>
      <div className={styles.campos}>
        <Input
          etiqueta={`Etiqueta (${idioma.toUpperCase()})`}
          valor={bloque.etiqueta[idioma]}
          onChange={(e) => actualizar({ etiqueta: { ...bloque.etiqueta, [idioma]: e.target.value } })}
        />
        <Input
          etiqueta={`Título (${idioma.toUpperCase()})`}
          valor={bloque.titulo[idioma]}
          onChange={(e) => actualizar({ titulo: { ...bloque.titulo, [idioma]: e.target.value } })}
        />
        <div className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>{`Descripción (${idioma.toUpperCase()})`}</span>
          <textarea
            className={styles.textarea}
            value={bloque.descripcion[idioma]}
            onChange={(e) => actualizar({ descripcion: { ...bloque.descripcion, [idioma]: e.target.value } })}
          />
        </div>
      </div>
    </div>
  );
}

function EditorMedia({ bloque, actualizar, abrirPicker }) {
  return (
    <div className={styles.editor}>
      <SelectorMedia
        src={bloque.src}
        tipo={bloque.tipo}
        onAbrir={() => elegirMediaUnico({ abrirPicker, actual: bloque.src, onElegido: (m) => actualizar({ src: m.src, tipo: m.tipo }) })}
      />
      <div className={styles.campos}>
        <Input etiqueta="Título" valor={bloque.titulo} onChange={(e) => actualizar({ titulo: e.target.value })} />
        <Input etiqueta="Texto del CTA" valor={bloque.ctaTexto} onChange={(e) => actualizar({ ctaTexto: e.target.value })} />
        <SelectorDestino etiqueta="Destino del CTA" valor={bloque.destino} onChange={(e) => actualizar({ destino: e.target.value })} />
      </div>
    </div>
  );
}

function EditorProductRow({ bloque, actualizar, abrirPicker }) {
  return (
    <div className={styles.editor}>
      <SelectorProductos productoIds={bloque.productoIds} onChange={(ids) => actualizar({ productoIds: ids })} abrirPicker={abrirPicker} max={4} />
      <div className={styles.campos}>
        <SelectorDestino etiqueta='Destino de "Ver más"' valor={bloque.verMasDestino} onChange={(e) => actualizar({ verMasDestino: e.target.value })} />
      </div>
    </div>
  );
}

function EditorMediaSplit({ bloque, actualizar, abrirPicker }) {
  function actualizarItem(id, cambios) {
    actualizar({ items: bloque.items.map((i) => (i.id === id ? { ...i, ...cambios } : i)) });
  }
  return (
    <div className={styles.editor}>
      <div className={styles.doble}>
        {bloque.items.map((item) => (
          <div key={item.id}>
            <SelectorMedia
              src={item.src}
              tipo={item.tipo}
              onAbrir={() => elegirMediaUnico({ abrirPicker, actual: item.src, onElegido: (m) => actualizarItem(item.id, m) })}
            />
            <Input etiqueta="Título" valor={item.titulo} onChange={(e) => actualizarItem(item.id, { titulo: e.target.value })} />
            <SelectorDestino valor={item.destino} onChange={(e) => actualizarItem(item.id, { destino: e.target.value })} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorProductRowTabs({ bloque, actualizar, abrirPicker }) {
  function actualizarTab(id, cambios) {
    actualizar({ tabs: bloque.tabs.map((t) => (t.id === id ? { ...t, ...cambios } : t)) });
  }
  function quitarTab(id) {
    actualizar({ tabs: bloque.tabs.filter((t) => t.id !== id) });
  }
  function anadirTab() {
    actualizar({ tabs: [...bloque.tabs, { id: `t${Date.now()}`, nombre: 'Nuevo tab', productoIds: [], verMasDestino: paginasInternas[0].valor }] });
  }
  return (
    <div className={styles.editor}>
      <Input etiqueta="Título de la sección" valor={bloque.titulo} onChange={(e) => actualizar({ titulo: e.target.value })} />
      <DragList
        items={bloque.tabs}
        claveItem={(t) => t.id}
        onReorder={(nuevo) => actualizar({ tabs: nuevo })}
        renderItem={(tab) => (
          <div className={styles.tab}>
            <div className={styles.tabCabecera}>
              <Input etiqueta="Nombre del tab" valor={tab.nombre} onChange={(e) => actualizarTab(tab.id, { nombre: e.target.value })} />
              <Boton variante="texto" onClick={() => quitarTab(tab.id)}><X size={14} /></Boton>
            </div>
            <SelectorProductos productoIds={tab.productoIds} onChange={(ids) => actualizarTab(tab.id, { productoIds: ids })} abrirPicker={abrirPicker} max={4} />
          </div>
        )}
      />
      <Boton variante="contorno" tamano="s" onClick={anadirTab}><Plus size={14} /> Añadir tab</Boton>
    </div>
  );
}

function EditorMediaText({ bloque, actualizar, abrirPicker }) {
  return (
    <div className={styles.editor}>
      <SelectorMedia
        src={bloque.imagen}
        tipo="imagen"
        onAbrir={() => elegirMediaUnico({ abrirPicker, actual: bloque.imagen, onElegido: (m) => actualizar({ imagen: m.src }) })}
      />
      <div className={styles.campos}>
        <Input etiqueta="Título" valor={bloque.titulo} onChange={(e) => actualizar({ titulo: e.target.value })} />
        <Input etiqueta="Texto del enlace" valor={bloque.enlaceTexto} onChange={(e) => actualizar({ enlaceTexto: e.target.value })} />
        <div className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>Texto</span>
          <textarea className={styles.textarea} value={bloque.texto} onChange={(e) => actualizar({ texto: e.target.value })} />
        </div>
        <SelectorDestino etiqueta="Destino del enlace" valor={bloque.destino} onChange={(e) => actualizar({ destino: e.target.value })} />
      </div>
    </div>
  );
}

function EditorReviews({ bloque, actualizar, abrirPicker }) {
  const publicadas = resenasMock.filter((r) => r.estado === 'Publicada');
  const seleccionadas = bloque.resenaIds.map((id) => resenasMock.find((r) => r.id === id)).filter(Boolean);

  function elegir() {
    abrirPicker({
      titulo: 'Elegir reseñas',
      items: publicadas,
      claveItem: (r) => r.id,
      seleccionInicial: bloque.resenaIds,
      max: bloque.maximo,
      renderItem: (r) => (
        <div className={styles.reseñaCard}>
          {r.foto ? <img src={r.foto} alt="" className={styles.reseñaFoto} /> : <span className={styles.reseñaFoto} />}
          <div className={styles.reseñaTexto}>
            <p className={styles.reseñaNombre}>{r.nombreCliente}</p>
            <p className={styles.reseñaExtracto}>{r.texto}</p>
          </div>
        </div>
      ),
      onConfirmar: (seleccion) => actualizar({ resenaIds: seleccion }),
    });
  }

  return (
    <div className={styles.editor}>
      {seleccionadas.length > 0 && (
        <div className={styles.productos}>
          {seleccionadas.map((r) => (
            <div key={r.id} className={styles.productoChip}>
              {r.foto ? <img src={r.foto} alt="" className={styles.productoChipImg} /> : <span className={styles.productoChipImg} />}
              <span className={styles.productoChipNombre}>{r.nombreCliente} — {r.texto}</span>
              <Boton variante="texto" onClick={() => actualizar({ resenaIds: bloque.resenaIds.filter((id) => id !== r.id) })}>Quitar</Boton>
            </div>
          ))}
        </div>
      )}
      <Boton variante="contorno" tamano="s" onClick={elegir}>
        Elegir reseñas ({seleccionadas.length}/{bloque.maximo})
      </Boton>
    </div>
  );
}

const EDITORES = {
  hero: EditorHero,
  text: EditorTexto,
  media: EditorMedia,
  productRow: EditorProductRow,
  mediaSplit: EditorMediaSplit,
  productRowTabs: EditorProductRowTabs,
  mediaText: EditorMediaText,
  reviews: EditorReviews,
};

function EditorHero({ bloque, actualizar, abrirPicker }) {
  function actualizarSlide(id, cambios) {
    actualizar({ slides: bloque.slides.map((s) => (s.id === id ? { ...s, ...cambios } : s)) });
  }
  function quitarSlide(id) {
    actualizar({ slides: bloque.slides.filter((s) => s.id !== id) });
  }
  function anadirSlide() {
    actualizar({
      slides: [...bloque.slides, {
        id: `s${Date.now()}`, src: bancoImagenes[0], tipo: 'imagen', titulo: '', ctaTexto: '', destino: paginasInternas[0].valor,
      }],
    });
  }
  return (
    <div className={styles.editor}>
      <DragList
        items={bloque.slides}
        claveItem={(s) => s.id}
        onReorder={(nuevo) => actualizar({ slides: nuevo })}
        renderItem={(slide) => (
          <div className={styles.tarjetaSlide}>
            <div className={styles.slideCabecera}>
              <span className={styles.slideTitulo}>Slide</span>
              <Boton variante="texto" onClick={() => quitarSlide(slide.id)}><X size={14} /></Boton>
            </div>
            <SelectorMedia
              src={slide.src}
              tipo={slide.tipo}
              onAbrir={() => elegirMediaUnico({ abrirPicker, actual: slide.src, onElegido: (m) => actualizarSlide(slide.id, m) })}
            />
            <div className={styles.campos}>
              <Input etiqueta="Título" valor={slide.titulo} onChange={(e) => actualizarSlide(slide.id, { titulo: e.target.value })} />
              <Input etiqueta="Texto del CTA" valor={slide.ctaTexto} onChange={(e) => actualizarSlide(slide.id, { ctaTexto: e.target.value })} />
              <SelectorDestino etiqueta="Destino del CTA" valor={slide.destino} onChange={(e) => actualizarSlide(slide.id, { destino: e.target.value })} />
            </div>
          </div>
        )}
      />
      <Boton variante="contorno" tamano="s" onClick={anadirSlide}><Plus size={14} /> Añadir slide</Boton>
    </div>
  );
}

function DisenoEditor() {
  const [bloques, setBloques] = useState(disenoMock);
  const [picker, setPicker] = useState(null);
  const [seleccionTemp, setSeleccionTemp] = useState([]);

  function actualizarBloque(id, cambios) {
    setBloques((actual) => actual.map((b) => (b.id === id ? { ...b, ...cambios } : b)));
  }

  function abrirPicker(config) {
    setSeleccionTemp(config.seleccionInicial || []);
    setPicker(config);
  }

  return (
    <div className={styles.pagina}>
      <PageHeader
        titulo="Diseño"
        subtitulo="Composición de la página de inicio — cada fila es un bloque real de la landing, en el mismo orden."
      />
      <Acordeon>
        {bloques.map((bloque) => {
          const Editor = EDITORES[bloque.kind];
          const Icono = ICONOS_KIND[bloque.kind];
          return (
            <FilaAcordeon
              key={bloque.id}
              titulo={(
                <span className={styles.cabecera}>
                  <Icono className={styles.cabeceraIcono} aria-hidden="true" />
                  <span className={styles.cabeceraTextos}>
                    <span className={styles.cabeceraLabel}>{bloque.label}</span>
                    <span className={styles.cabeceraTipo}>{TITULOS_KIND[bloque.kind]}</span>
                  </span>
                  <span className={styles.miniaturas}>
                    {miniaturasDe(bloque).map((src, i) => <img key={i} src={src} alt="" className={styles.miniatura} />)}
                  </span>
                </span>
              )}
            >
              <Editor bloque={bloque} actualizar={(cambios) => actualizarBloque(bloque.id, cambios)} abrirPicker={abrirPicker} />
            </FilaAcordeon>
          );
        })}
      </Acordeon>

      {picker && (
        <PickerDrawer
          abierto
          onCerrar={() => setPicker(null)}
          titulo={picker.titulo}
          items={picker.items}
          claveItem={picker.claveItem}
          seleccionados={seleccionTemp}
          onToggle={(clave) => setSeleccionTemp((actual) => {
            if (picker.max === 1) return [clave];
            return actual.includes(clave) ? actual.filter((c) => c !== clave) : [...actual, clave];
          })}
          max={picker.max}
          renderItem={picker.renderItem}
          onConfirmar={() => picker.onConfirmar(seleccionTemp)}
          columnas={2}
        />
      )}
    </div>
  );
}

export default DisenoEditor;
