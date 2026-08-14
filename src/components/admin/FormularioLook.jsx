'use client';

/* ============================================================
   FORMULARIO DE LOOK — Fely Campo (admin)
   Alta/edición de un look dentro de una colección con `numeroLooks`
   (Runway/Novia/Fiesta, ver ListaProductos.jsx "Vista de looks"). Mismo
   espíritu que FormularioColeccion: placeholder de diseño, no lógica
   real — un look no es un producto de `productosMock`, vive solo dentro
   de `categoriasMock[tipo][].looks` (array disperso, un hueco por look
   sin editar todavía). Reutiliza comprimirImagen() de
   FormularioProducto.jsx, igual que FormularioColeccion.

   Mismas 3 secciones que FormularioProducto (Imágenes / Datos comunes
   con ES-EN / Campos específicos), tratando el look como un mini-
   producto: Nombre/Descripción con SelectorIdioma (mismo límite conocido
   que FormularioProducto — solo se guarda `.es`, ver docs/adminpanel.md
   sección 5), Colores/Telas del mismo look con los mismos selectores de
   chip que un producto (sin precio/tallas/stock: un look no es
   inventario vendible).
   ============================================================ */

import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { PageHeader, FormSeccion, SelectorIdioma } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { coloresMock, telasMock } from '@/components/admin/mockData';
import { comprimirImagen } from './FormularioProducto';
import styles from './FormularioLook.module.css';

function nombreInicial(look, numero) {
  if (!look?.nombre) return { es: `Look ${numero}`, en: '' };
  if (typeof look.nombre === 'string') return { es: look.nombre, en: '' };
  return { es: look.nombre.es || `Look ${numero}`, en: look.nombre.en || '' };
}

function descripcionInicial(look) {
  if (!look?.descripcion) return { es: '', en: '' };
  if (typeof look.descripcion === 'string') return { es: look.descripcion, en: '' };
  return { es: look.descripcion.es || '', en: look.descripcion.en || '' };
}

function FormularioLook({
  numero, look, onGuardado,
}) {
  const [idioma, setIdioma] = useState('es');
  const [nombre, setNombre] = useState(() => nombreInicial(look, numero));
  const [descripcion, setDescripcion] = useState(() => descripcionInicial(look));
  const [colorIds, setColorIds] = useState(look?.colorIds || []);
  const [telaIds, setTelaIds] = useState(look?.telaIds || []);
  const [imagenes, setImagenes] = useState(look?.imagenes || []);
  const [subiendo, setSubiendo] = useState(false);
  const inputArchivoRef = useRef(null);

  const idiomasCompletados = ['es', 'en'].filter((cod) => nombre[cod]?.trim() && descripcion[cod]?.trim());

  async function agregarImagenes(archivos) {
    const lista = Array.from(archivos || []);
    if (!lista.length) return;
    setSubiendo(true);
    const nuevas = await Promise.all(lista.map(async (archivo) => {
      let blobFinal;
      try {
        blobFinal = await comprimirImagen(archivo);
      } catch {
        blobFinal = archivo;
      }
      return URL.createObjectURL(blobFinal);
    }));
    setImagenes((actual) => [...actual, ...nuevas]);
    setSubiendo(false);
  }

  function quitarImagen(src) {
    setImagenes((actual) => actual.filter((s) => s !== src));
  }

  function guardar() {
    if (!nombre.es.trim()) return;
    onGuardado({
      nombre: nombre.es.trim(),
      descripcion: descripcion.es.trim() || undefined,
      colorIds,
      telaIds,
      imagenes,
    });
  }

  return (
    <div>
      <PageHeader titulo={`Editar ${nombre.es.trim() || `Look ${numero}`}`} subtitulo="Imágenes, datos y campos específicos del look" />

      <FormSeccion numero={1} titulo="Imágenes" descripcion="Foto(s) de este look.">
        <div className={styles.seccionAncha}>
          {imagenes.length === 0 ? (
            <button type="button" className={styles.subirVacio} onClick={() => inputArchivoRef.current?.click()}>
              <Upload size={22} strokeWidth={1} aria-hidden="true" />
              <span>{subiendo ? 'Optimizando…' : 'Añadir imágenes'}</span>
            </button>
          ) : (
            <div className={styles.galeria}>
              {imagenes.map((src) => (
                <div key={src} className={styles.imagenItem}>
                  <img src={src} alt="" className={styles.imagenMiniatura} />
                  <button type="button" className={styles.imagenQuitar} aria-label="Quitar imagen" onClick={() => quitarImagen(src)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button type="button" className={styles.imagenAnadir} onClick={() => inputArchivoRef.current?.click()}>
                <Upload size={18} strokeWidth={1} aria-hidden="true" />
                <span>{subiendo ? 'Optimizando…' : 'Añadir'}</span>
              </button>
            </div>
          )}
          <input
            ref={inputArchivoRef}
            type="file"
            accept="image/*"
            multiple
            className={styles.inputArchivo}
            onChange={(e) => {
              agregarImagenes(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
      </FormSeccion>

      <FormSeccion numero={2} titulo="Datos comunes" descripcion="Nombre y descripción necesitan versión en los dos idiomas del sitio.">
        <div className={styles.seccionAncha}>
          <SelectorIdioma idioma={idioma} onChange={setIdioma} completados={idiomasCompletados} />
        </div>
        <Input
          etiqueta={`Nombre (${idioma.toUpperCase()})`}
          valor={nombre[idioma]}
          onChange={(e) => setNombre({ ...nombre, [idioma]: e.target.value })}
          placeholder={`Look ${numero}`}
        />
        <div className={styles.seccionAncha}>
          <span className={styles.etiqueta}>{`Descripción (${idioma.toUpperCase()})`}</span>
          <textarea
            className={styles.textarea}
            value={descripcion[idioma]}
            onChange={(e) => setDescripcion({ ...descripcion, [idioma]: e.target.value })}
            placeholder="Composición, detalles del styling, notas de producción…"
            rows={3}
          />
        </div>
      </FormSeccion>

      <FormSeccion numero={3} titulo="Campos específicos" descripcion="Colores y telas del look — no lleva precio, tallas ni stock: no es inventario vendible.">
        <div className={styles.seccionAncha}>
          <span className={styles.etiqueta}>Colores — toca un color para activarlo</span>
          <div className={styles.coloresGrid}>
            {coloresMock.map((c) => {
              const activo = colorIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`${styles.colorChip} ${activo ? styles.colorChipActivo : ''}`}
                  onClick={() => setColorIds(activo ? colorIds.filter((id) => id !== c.id) : [...colorIds, c.id])}
                >
                  <span className={styles.colorPunto} style={{ background: c.hex }} />
                  {c.nombre}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.seccionAncha}>
          <span className={styles.etiqueta}>Telas — toca una tela para activarla</span>
          <div className={styles.telasGrid}>
            {telasMock.map((t) => {
              const activo = telaIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.telaChip} ${activo ? styles.telaChipActivo : ''}`}
                  onClick={() => setTelaIds(activo ? telaIds.filter((id) => id !== t.id) : [...telaIds, t.id])}
                >
                  <span className={styles.telaChipNombre}>{t.nombre}</span>
                  <span className={styles.telaChipComposicion}>{t.composicion}</span>
                </button>
              );
            })}
          </div>
        </div>
      </FormSeccion>

      <div className={styles.acciones}>
        <Boton onClick={guardar} desactivado={!nombre.es.trim()}>Guardar look</Boton>
      </div>
    </div>
  );
}

export default FormularioLook;
