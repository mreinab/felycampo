'use client';

/* ============================================================
   FORMULARIO DE PRODUCTO — Fely Campo (admin)
   Página única con secciones numeradas 1-4 (spec 2.3), en vez de
   wizard: todo visible y editable a la vez, mejor para "editar" (no
   hay que re-navegar pasos por un solo campo). Los pasos 2 y 4
   dependen del tipo elegido en el paso 1 — CAMPOS_TIPO decide qué
   renderizar, no una pila de "if tipo === ...".
   Cambiar el tipo en modo edición pide confirmación explícita (spec:
   "should not be allowed without explicit confirmation") porque
   descarta los campos específicos del tipo anterior.
   ============================================================ */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import {
  PageHeader, FormSeccion, DragList, PickerDrawer, SelectorIdioma, useToast,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import {
  tiposProducto, seccionesWeb, bancoImagenes, coleccionesMock, coloresMock, telasMock, tallasEstandar,
} from '@/components/admin/mockData';
import styles from './FormularioProducto.module.css';

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

function FormularioProducto({ productoExistente, tipoInicial, onGuardado }) {
  const router = useRouter();
  const { mostrarToast } = useToast();

  const [tipo, setTipo] = useState(productoExistente?.tipo || tipoInicial || '');
  const [seccionWeb, setSeccionWeb] = useState(productoExistente?.seccionWeb || '');
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

  const [picker, setPicker] = useState(null);
  const [seleccionTemp, setSeleccionTemp] = useState([]);

  function abrirPicker(config) {
    setSeleccionTemp(config.seleccionInicial || []);
    setPicker(config);
  }

  const campos = CAMPOS_TIPO[tipo];
  const seccionInfo = seccionesWeb[tipo]?.find((s) => s.valor === seccionWeb);

  function cambiarTipo(nuevoTipo) {
    if (productoExistente && tipo && nuevoTipo !== tipo) {
      const confirmado = window.confirm(
        'Cambiar el tipo de producto descarta los campos específicos del tipo actual (precio, tallas, colección...). ¿Quieres continuar?'
      );
      if (!confirmado) return;
    }
    setTipo(nuevoTipo);
    setSeccionWeb('');
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

  function guardar(estadoFinal) {
    setEstado(estadoFinal);
    mostrarToast(estadoFinal === 'Activo' ? 'Producto publicado (demo)' : 'Borrador guardado (demo)');

    if (onGuardado) {
      onGuardado({
        id: productoExistente?.id || `p${Date.now()}`,
        tipo,
        seccionWeb,
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

      <FormSeccion numero={1} titulo="Tipo de producto" descripcion="Determina qué campos y sección web aplican — no se puede cambiar sin confirmación una vez creado.">
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

      {tipo && (
        <>
          <FormSeccion numero={2} titulo="Sección web" descripcion="Decide la URL automática de publicación — nunca texto libre.">
            <label className={styles.campoAncho}>
              <span className={styles.etiquetaCampo}>Sección</span>
              <select className={styles.selectInput} value={seccionWeb} onChange={(e) => setSeccionWeb(e.target.value)}>
                <option value="">Selecciona una sección</option>
                {seccionesWeb[tipo].map((s) => (
                  <option key={s.valor} value={s.valor}>{s.etiqueta}</option>
                ))}
              </select>
            </label>
            {seccionInfo && (
              <p className={styles.publicacion}>Se publicará en: {seccionInfo.ruta}</p>
            )}
          </FormSeccion>

          <FormSeccion numero={3} titulo="Datos comunes" descripcion="Nombre y descripción necesitan versión en los dos idiomas del sitio.">
            <div className={styles.campoAncho}>
              <SelectorIdioma idioma={idioma} onChange={setIdioma} />
            </div>
            <Input
              etiqueta={`Nombre (${idioma.toUpperCase()})`}
              valor={nombre[idioma]}
              onChange={(e) => setNombre({ ...nombre, [idioma]: e.target.value })}
            />
            <label>
              <span className={styles.etiquetaCampo}>Estado</span>
              <select className={styles.selectInput} value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="Borrador">Borrador</option>
                <option value="Activo">Activo</option>
                <option value="Archivado">Archivado</option>
              </select>
            </label>
            <div className={styles.campoAncho}>
              <span className={styles.etiquetaCampo}>{`Descripción corta (${idioma.toUpperCase()})`}</span>
              <textarea
                className={styles.textarea}
                value={descripcion[idioma]}
                onChange={(e) => setDescripcion({ ...descripcion, [idioma]: e.target.value })}
              />
            </div>

            <div className={styles.galeria}>
              <span className={styles.etiquetaCampo}>Imágenes (mínimo 1, recomendado 3-6, arrastra para reordenar)</span>
              {imagenes.length > 0 && (
                <div className={styles.imagenesGrid}>
                  <DragList
                    items={imagenes.map((src) => ({ src }))}
                    claveItem={(item) => item.src}
                    onReorder={(nuevo) => setImagenes(nuevo.map((i) => i.src))}
                    renderItem={(item) => (
                      <div className={styles.imagenItem}>
                        <img src={item.src} alt="" className={styles.imagenMiniatura} />
                        <span>{item.src.split('/').pop()}</span>
                        <Boton
                          variante="texto"
                          className={styles.imagenQuitar}
                          onClick={() => setImagenes(imagenes.filter((s) => s !== item.src))}
                        >
                          Quitar
                        </Boton>
                      </div>
                    )}
                  />
                </div>
              )}
              <Boton
                variante="contorno"
                tamano="s"
                onClick={() => abrirPicker({
                  titulo: 'Elegir imágenes',
                  items: bancoImagenes,
                  claveItem: (src) => src,
                  seleccionInicial: imagenes,
                  renderItem: (src) => <img src={src} alt="" className={styles.pickerImagen} />,
                  onConfirmar: (seleccion) => setImagenes(seleccion),
                })}
              >
                <Plus size={14} /> Añadir imagen
              </Boton>
            </div>
          </FormSeccion>

          <FormSeccion numero={4} titulo="Campos específicos" descripcion={`Solo lo relevante para ${tiposProducto.find((t) => t.valor === tipo).etiqueta}.`}>
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
            <Boton variante="contorno" onClick={() => guardar('Borrador')}>Guardar borrador</Boton>
            <Boton variante="solido" disabled={!seccionWeb} onClick={() => guardar('Activo')}>Publicar</Boton>
          </div>
        </>
      )}

      {picker && (
        <PickerDrawer
          abierto
          onCerrar={() => setPicker(null)}
          titulo={picker.titulo}
          items={picker.items}
          claveItem={picker.claveItem}
          seleccionados={seleccionTemp}
          onToggle={(clave) => setSeleccionTemp((actual) => (actual.includes(clave) ? actual.filter((c) => c !== clave) : [...actual, clave]))}
          renderItem={picker.renderItem}
          onConfirmar={() => picker.onConfirmar(seleccionTemp)}
          columnas={2}
        />
      )}
    </div>
  );
}

export default FormularioProducto;
