'use client';

/* ============================================================
   FORMULARIO DE RESEÑA — Fely Campo (admin)
   El producto reseñado ya no es un <select> de nombre en texto libre
   (misma relación frágil que ya se corrigió en otros sitios del panel,
   ver docs/adminpanel.md sección 7 punto 4) — ahora es un vínculo real
   por id, con buscador propio, mismo lenguaje visual que "Vincular a
   Runway / Novia / Fiesta" (FormularioProducto.jsx) / "Productos
   vinculados" (FormularioLook.jsx): search + lista de resultados con
   miniatura+SKU, tarjeta de vínculo activo con botón "Quitar vínculo".
   ============================================================ */

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Link2, X } from 'lucide-react';
import {
  PageHeader, FormSeccion, PickerDrawer, Estrellas, useToast,
} from './index';
import { Boton, Input } from '../ui';
import { productosMock, bancoImagenes } from './mockData';
import styles from './FormularioResena.module.css';

function FormularioResena({ resenaExistente }) {
  const router = useRouter();
  const { mostrarToast } = useToast();

  const [nombreCliente, setNombreCliente] = useState(resenaExistente?.nombreCliente || '');
  const [texto, setTexto] = useState(resenaExistente?.texto || '');
  const [valoracion, setValoracion] = useState(resenaExistente?.valoracion || 5);
  const [foto, setFoto] = useState(resenaExistente?.foto || '');
  // Sin control de edición todavía: por defecto "Oculta" — una reseña
  // (llegue desde donde llegue, ver mockData.js) no se publica sola, hay
  // que revisarla primero.
  const [estado, setEstado] = useState(resenaExistente?.estado || 'Oculta');
  const [pickerAbierto, setPickerAbierto] = useState(false);
  const [seleccionTemp, setSeleccionTemp] = useState([]);

  const [productoVinculado, setProductoVinculado] = useState(() => {
    const producto = productosMock.find((p) => p.id === resenaExistente?.productoId);
    return producto ? {
      id: producto.id, nombre: producto.nombre, sku: producto.sku, imagen: producto.imagen,
    } : null;
  });
  const [buscarProducto, setBuscarProducto] = useState('');

  const resultadosProducto = useMemo(() => {
    const q = buscarProducto.trim().toLowerCase();
    if (!q) return productosMock;
    return productosMock.filter((p) => p.nombre.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
  }, [buscarProducto]);

  function vincularProducto(producto) {
    setProductoVinculado({
      id: producto.id, nombre: producto.nombre, sku: producto.sku, imagen: producto.imagen,
    });
  }

  function guardar(estadoFinal) {
    mostrarToast(estadoFinal === 'Publicada' ? 'Reseña publicada (demo)' : 'Reseña guardada (demo)');
    router.push('/admin/resenas');
  }

  return (
    <div>
      <PageHeader titulo={resenaExistente ? 'Editar reseña' : 'Nueva reseña'} />

      <FormSeccion numero={1} titulo="Contenido de la reseña">
        {/* Sin "Anónimo" como opción — toda reseña viene de una clienta con
            cuenta (ver mockData.js resenasMock), no hay reseña anónima. */}
        <Input etiqueta="Nombre del cliente" valor={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
        <label>
          <span className={styles.etiquetaCampo}>Valoración</span>
          <Estrellas valor={valoracion} onChange={setValoracion} />
        </label>
        <div className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>Texto de la reseña</span>
          <textarea className={styles.textarea} value={texto} onChange={(e) => setTexto(e.target.value)} />
        </div>
      </FormSeccion>

      <FormSeccion numero={2} titulo="Producto reseñado" descripcion="Opcional — conecta la reseña con el producto real (SKU y foto incluidos).">
        <div className={styles.campoAncho}>
          {productoVinculado ? (
            <div className={styles.vinculoActual}>
              {productoVinculado.imagen ? (
                <img src={productoVinculado.imagen} alt="" className={styles.vinculoActualImagen} />
              ) : <span className={styles.vinculoActualImagen} />}
              <div className={styles.vinculoActualTexto}>
                <span className={styles.vinculoActualNombre}>{productoVinculado.nombre}</span>
                <span className={styles.vinculoActualSub}>{productoVinculado.sku}</span>
              </div>
              <Boton variante="contorno-rosa" tamano="s" onClick={() => setProductoVinculado(null)}>
                <X size={14} />
                Quitar vínculo
              </Boton>
            </div>
          ) : (
            <p className={styles.vinculoVacio}>Sin vincular todavía — busca por nombre o SKU del producto.</p>
          )}

          <div className={styles.vinculoBuscador}>
            <Search size={16} className={styles.vinculoBuscadorIcono} aria-hidden="true" />
            <input
              type="text"
              className={styles.vinculoBuscadorInput}
              placeholder="Buscar por nombre o SKU…"
              value={buscarProducto}
              onChange={(e) => setBuscarProducto(e.target.value)}
            />
          </div>

          <div className={styles.vinculoLista}>
            {resultadosProducto.length === 0 ? (
              <p className={styles.vinculoVacio}>Sin resultados.</p>
            ) : resultadosProducto.map((p) => {
              const activo = productoVinculado?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.vinculoFila} ${activo ? styles.vinculoFilaActiva : ''}`}
                  onClick={() => vincularProducto(p)}
                >
                  {p.imagen ? (
                    <img src={p.imagen} alt="" className={styles.vinculoFilaImagen} />
                  ) : <span className={styles.vinculoFilaImagen} />}
                  <span className={styles.vinculoFilaTexto}>
                    <span className={styles.vinculoFilaNombre}>{p.nombre}</span>
                    <span className={styles.vinculoFilaSub}>{p.sku}</span>
                  </span>
                  {activo && <Link2 size={14} className={styles.vinculoFilaCheck} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </FormSeccion>

      <FormSeccion numero={3} titulo="Datos adicionales" descripcion="Opcionales — foto de la clienta y estado de publicación.">
        <div className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>Foto de la clienta (opcional)</span>
          <div className={styles.foto}>
            {foto ? <img src={foto} alt="" className={styles.fotoMiniatura} /> : <span className={styles.fotoMiniatura} />}
            <Boton variante="contorno" tamano="s" onClick={() => { setSeleccionTemp(foto ? [foto] : []); setPickerAbierto(true); }}>
              {foto ? 'Cambiar foto' : 'Elegir foto'}
            </Boton>
            {foto && <Boton variante="texto" onClick={() => setFoto('')}>Quitar</Boton>}
          </div>
        </div>
        <label className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>Estado</span>
          <select className={styles.selectInput} value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="Oculta">Oculta (no seleccionable en Diseño)</option>
            <option value="Publicada">Publicada (disponible en Diseño)</option>
          </select>
        </label>
      </FormSeccion>

      <div className={styles.acciones}>
        <Boton variante="contorno" onClick={() => guardar(estado)}>Guardar</Boton>
        <Boton variante="solido" onClick={() => guardar('Publicada')}>Publicar</Boton>
      </div>

      <PickerDrawer
        abierto={pickerAbierto}
        onCerrar={() => setPickerAbierto(false)}
        titulo="Elegir foto"
        items={bancoImagenes}
        claveItem={(src) => src}
        seleccionados={seleccionTemp}
        max={1}
        onToggle={(src) => setSeleccionTemp([src])}
        renderItem={(src) => <img src={src} alt="" className={styles.pickerFoto} />}
        onConfirmar={() => setFoto(seleccionTemp[0] || '')}
        columnas={3}
      />
    </div>
  );
}

export default FormularioResena;
