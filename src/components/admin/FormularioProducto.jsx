'use client';

/* ============================================================
   FORMULARIO DE PRODUCTO — Fely Campo (admin)
   Página única con secciones numeradas (spec 2.3), en vez de wizard:
   todo visible y editable a la vez, mejor para "editar" (no hay que
   re-navegar pasos por un solo campo). Los campos específicos
   dependen del tipo elegido — CAMPOS_TIPO decide qué renderizar, no
   una pila de "if tipo === ...".
   La categoría (antes "Sección web") ya no se elige aquí: se hereda
   del contexto de navegación — tipoInicial/categoriaInicial llegan
   fijados cuando el formulario se abre desde /admin/productos/[tipo]
   o desde un enlace de categoría del sidebar (spec: "the user already
   uploads the product on the section").
   Cambiar el tipo en modo edición pide confirmación explícita (spec:
   "should not be allowed without explicit confirmation") porque
   descarta los campos específicos del tipo anterior.
   ============================================================ */

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import {
  PageHeader, FormSeccion, DragList, SelectorIdioma, useToast,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import {
  tiposProducto, coleccionesMock, coloresMock, telasMock, tallasEstandar,
} from '@/components/admin/mockData';
import styles from './FormularioProducto.module.css';

// Compresión de imágenes al subir — evitar que fotos de móvil (varios MB,
// sin redimensionar) lleguen pesadas a la web pública. No dependemos de que
// el usuario elija bien el tamaño: se reescala a un máximo razonable y se
// reencoda en el cliente, sin bloquear la subida en ningún caso.
const IMAGEN_DIMENSION_MAXIMA = 2000;
const IMAGEN_CALIDAD_JPEG = 0.82;
const IMAGEN_AVISO_BYTES = 1.5 * 1024 * 1024;

function comprimirImagen(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => {
      const img = new Image();
      img.onload = () => {
        const escala = Math.min(1, IMAGEN_DIMENSION_MAXIMA / Math.max(img.width, img.height));
        const ancho = Math.round(img.width * escala);
        const alto = Math.round(img.height * escala);
        const canvas = document.createElement('canvas');
        canvas.width = ancho;
        canvas.height = alto;
        canvas.getContext('2d').drawImage(img, 0, 0, ancho, alto);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo comprimir la imagen'))),
          'image/jpeg',
          IMAGEN_CALIDAD_JPEG
        );
      };
      img.onerror = reject;
      img.src = lector.result;
    };
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
}

const CAMPOS_TIPO = {
  'pret-a-porter': {
    precio: { requerido: true, placeholder: '890 €' }, tallas: true, colores: true, telas: true, stock: true, boton: 'Añadir al carrito', coleccion: 'opcional',
  },
  atelier: {
    precio: { requerido: false, placeholder: 'Desde 980 €' }, tallas: false, colores: 'opcional', telas: 'opcional', stock: false, boton: 'Solicitar cita', coleccion: 'opcional',
  },
  archivo: {
    precio: false, tallas: false, colores: false, telas: false, stock: false, boton: false, coleccion: { requerido: true },
  },
};

function FormularioProducto({
  productoExistente, tipoInicial, categoriaInicial, onGuardado,
}) {
  const router = useRouter();
  const { mostrarToast } = useToast();

  const tipoFijado = Boolean(tipoInicial) && !productoExistente;
  const ocultarSeccionTipo = tipoFijado || Boolean(productoExistente);
  const [tipo, setTipo] = useState(productoExistente?.tipo || tipoInicial || '');
  const [categoriaId, setCategoriaId] = useState(productoExistente?.categoriaId || categoriaInicial || '');
  const [idioma, setIdioma] = useState('es');
  const [nombre, setNombre] = useState({ es: productoExistente?.nombre || '', en: '' });
  const [descripcion, setDescripcion] = useState({ es: productoExistente?.descripcionCorta || '', en: '' });
  const [imagenes, setImagenes] = useState(productoExistente?.imagenes || []);
  const [estado, setEstado] = useState(productoExistente?.estado || 'Borrador');
  const [precio, setPrecio] = useState(productoExistente?.precio || '');
  const [tallas, setTallas] = useState(productoExistente?.tallas || []);
  const [colorIds, setColorIds] = useState(productoExistente?.colorIds || []);
  const [telaIds, setTelaIds] = useState(productoExistente?.telaIds || []);
  const [coleccion, setColeccion] = useState(productoExistente?.coleccion || '');

  const inputArchivoRef = useRef(null);

  async function agregarImagenes(archivos) {
    const lista = Array.from(archivos || []);
    if (!lista.length) return;

    let pesoOriginal = 0;
    let pesoComprimido = 0;
    let algunaPesada = false;

    const nuevas = await Promise.all(lista.map(async (archivo) => {
      pesoOriginal += archivo.size;
      let blobFinal;
      try {
        blobFinal = await comprimirImagen(archivo);
      } catch {
        blobFinal = archivo;
      }
      pesoComprimido += blobFinal.size;
      if (blobFinal.size > IMAGEN_AVISO_BYTES) algunaPesada = true;
      return URL.createObjectURL(blobFinal);
    }));

    setImagenes((actual) => [...actual, ...nuevas]);

    const enMb = (bytes) => (bytes / (1024 * 1024)).toFixed(1);
    const resumen = `Imágenes optimizadas: ${enMb(pesoOriginal)} MB → ${enMb(pesoComprimido)} MB (demo)`;
    mostrarToast(algunaPesada ? `${resumen}. Alguna sigue pesando bastante — considera recortarla.` : resumen);
  }

  const campos = CAMPOS_TIPO[tipo];
  const idiomasCompletados = ['es', 'en'].filter((cod) => nombre[cod]?.trim() && descripcion[cod]?.trim());

  function cambiarTipo(nuevoTipo) {
    if (productoExistente && tipo && nuevoTipo !== tipo) {
      const confirmado = window.confirm(
        'Cambiar el tipo de producto descarta los campos específicos del tipo actual (precio, tallas, colección...). ¿Quieres continuar?'
      );
      if (!confirmado) return;
    }
    setTipo(nuevoTipo);
    setCategoriaId('');
  }

  function alternarTalla(talla) {
    setTallas((actual) => (
      actual.some((f) => f.talla === talla)
        ? actual.filter((f) => f.talla !== talla)
        : [...actual, { talla, stock: 0 }]
    ));
  }

  function cambiarStockTalla(talla, stock) {
    setTallas((actual) => actual.map((f) => (f.talla === talla ? { ...f, stock } : f)));
  }

  const MENSAJE_GUARDADO = {
    Activo: 'Producto publicado (demo)',
    Programado: 'Guardado para publicar más tarde — no visible en la web todavía (demo)',
    Borrador: 'Borrador guardado (demo)',
  };

  function guardar(estadoFinal) {
    setEstado(estadoFinal);
    mostrarToast(MENSAJE_GUARDADO[estadoFinal]);

    if (onGuardado) {
      onGuardado({
        id: productoExistente?.id || `p${Date.now()}`,
        tipo,
        categoriaId,
        nombre: nombre.es,
        descripcionCorta: descripcion.es,
        imagen: imagenes[0] || '',
        imagenes,
        ...(campos.precio && { precio }),
        ...(campos.tallas && { tallas }),
        ...(campos.colores && { colorIds }),
        ...(campos.telas && { telaIds }),
        ...(campos.coleccion && { coleccion }),
        estado: estadoFinal,
        sku: productoExistente?.sku || `FC-NEW-${Date.now().toString().slice(-4)}`,
      });
      return;
    }

    router.push(tipo ? `/admin/productos/${tipo}` : '/admin/productos');
  }

  return (
    <div>
      <PageHeader
        titulo={productoExistente ? `Editar: ${productoExistente.nombre}` : 'Nuevo producto'}
        subtitulo={productoExistente ? `SKU ${productoExistente.sku}` : 'Completa los pasos en orden'}
      />

      <FormSeccion
        numero={1}
        titulo="Imágenes"
        descripcion="Mínimo 1, recomendado 3-6 — arrastra para reordenar."
        accion={imagenes.length > 0 && (
          <Boton variante="solido" onClick={() => inputArchivoRef.current?.click()}>
            <Upload size={14} />
            Subir otra imagen
          </Boton>
        )}
      >
        <div className={styles.galeria}>
          <div className={styles.subirCaja}>
            {imagenes.length === 0 ? (
              <button type="button" className={styles.subirVacio} onClick={() => inputArchivoRef.current?.click()}>
                <Upload size={22} strokeWidth={1} className={styles.subirIcono} aria-hidden="true" />
                <span>Añadir imagen</span>
              </button>
            ) : (
              <div className={styles.imagenesScroll}>
                <DragList
                  items={imagenes.map((src) => ({ src }))}
                  claveItem={(item) => item.src}
                  onReorder={(nuevo) => setImagenes(nuevo.map((i) => i.src))}
                  orientacion="horizontal"
                  renderItem={(item, indice) => (
                    <div className={styles.imagenItem}>
                      <img src={item.src} alt="" className={styles.imagenMiniatura} />
                      {indice === 0 && <span className={styles.imagenEtiqueta}>Portada</span>}
                      {indice === 1 && <span className={styles.imagenEtiqueta}>Contra portada</span>}
                      <button
                        type="button"
                        className={styles.imagenQuitar}
                        aria-label="Quitar imagen"
                        onClick={() => setImagenes(imagenes.filter((s) => s !== item.src))}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                />
              </div>
            )}
          </div>
          <p className={styles.subirHint}>
            Se optimizan automáticamente al subirlas. Recomendado: menos de 500 KB, formato WebP/JPEG.
          </p>
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

      {!ocultarSeccionTipo && (
        <FormSeccion numero={2} titulo="Tipo de producto" descripcion="Determina qué campos y categorías aplican — no se puede cambiar sin confirmación una vez creado.">
          <div className={styles.tipoGrid}>
            {tiposProducto.map((opcion) => (
              <button
                key={opcion.valor}
                type="button"
                className={`${styles.tipoOpcion} ${tipo === opcion.valor ? styles.tipoOpcionActiva : ''}`}
                onClick={() => cambiarTipo(opcion.valor)}
              >
                {opcion.etiqueta}
              </button>
            ))}
          </div>
        </FormSeccion>
      )}

      {tipo && (
        <>
          <FormSeccion numero={ocultarSeccionTipo ? 2 : 3} titulo="Datos comunes" descripcion="Nombre y descripción necesitan versión en los dos idiomas del sitio.">
            <div className={styles.campoAncho}>
              <SelectorIdioma idioma={idioma} onChange={setIdioma} completados={idiomasCompletados} />
            </div>
            <Input
              etiqueta={`Nombre (${idioma.toUpperCase()})`}
              valor={nombre[idioma]}
              onChange={(e) => setNombre({ ...nombre, [idioma]: e.target.value })}
            />
            <div className={styles.campoAncho}>
              <span className={styles.etiquetaCampo}>{`Descripción corta (${idioma.toUpperCase()})`}</span>
              <textarea
                className={styles.textarea}
                value={descripcion[idioma]}
                onChange={(e) => setDescripcion({ ...descripcion, [idioma]: e.target.value })}
              />
            </div>
          </FormSeccion>

          <FormSeccion numero={ocultarSeccionTipo ? 3 : 4} titulo="Campos específicos" descripcion={`Solo lo relevante para ${tiposProducto.find((t) => t.valor === tipo).etiqueta}.`}>
            {campos.precio && (
              <Input
                etiqueta={`Precio${campos.precio.requerido ? '' : ' (opcional)'}`}
                placeholder={campos.precio.placeholder}
                valor={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            )}

            {campos.coleccion && (
              <label>
                <span className={styles.etiquetaCampo}>{`Colección${campos.coleccion.requerido ? '' : ' (opcional)'}`}</span>
                <select className={styles.selectInput} value={coleccion} onChange={(e) => setColeccion(e.target.value)}>
                  <option value="">Selecciona una colección</option>
                  {coleccionesMock.map((c) => (
                    <option key={c.valor} value={c.valor}>{c.etiqueta}</option>
                  ))}
                </select>
              </label>
            )}

            {campos.boton && <p className={styles.publicacion}>Botón principal en ficha: «{campos.boton}»</p>}

            {campos.tallas && (
              <div className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Tallas y stock — toca una talla para activarla</span>
                <div className={styles.tallasGrid}>
                  {tallasEstandar.map((t) => {
                    const fila = tallas.find((f) => f.talla === t);
                    const activa = Boolean(fila);
                    return (
                      <div key={t} className={`${styles.tallaBox} ${activa ? styles.tallaBoxActiva : ''}`}>
                        <button type="button" className={styles.tallaBoton} onClick={() => alternarTalla(t)}>
                          {t}
                        </button>
                        {activa && (
                          <input
                            type="number"
                            min={0}
                            className={styles.tallaStock}
                            value={fila.stock}
                            onChange={(e) => cambiarStockTalla(t, Number(e.target.value))}
                            aria-label={`Stock talla ${t}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {campos.colores && (
              <div className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Colores{campos.colores === 'opcional' ? ' (opcional)' : ''} — toca un color para activarlo</span>
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
            )}

            {campos.telas && (
              <div className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Telas{campos.telas === 'opcional' ? ' (opcional)' : ''} — toca una tela para activarla</span>
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
            )}
          </FormSeccion>

          <div className={styles.acciones}>
            <Boton variante="contorno" className={styles.accionBorrador} onClick={() => guardar('Borrador')}>Guardar borrador</Boton>
            <Boton variante="contorno" className={styles.accionProgramado} onClick={() => guardar('Programado')}>Publicar más tarde</Boton>
            <Boton variante="solido" className={styles.accionPublicar} onClick={() => guardar('Activo')}>Publicar</Boton>
          </div>
        </>
      )}
    </div>
  );
}

export default FormularioProducto;
