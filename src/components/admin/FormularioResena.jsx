'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader, FormSeccion, PickerDrawer, Estrellas, useToast } from './index';
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
  const [productoRelacionado, setProductoRelacionado] = useState(resenaExistente?.productoRelacionado || '');
  const [estado, setEstado] = useState(resenaExistente?.estado || 'Oculta');
  const [pickerAbierto, setPickerAbierto] = useState(false);
  const [seleccionTemp, setSeleccionTemp] = useState([]);

  function guardar(estadoFinal) {
    mostrarToast(estadoFinal === 'Publicada' ? 'Reseña publicada (demo)' : 'Reseña guardada (demo)');
    router.push('/admin/resenas');
  }

  return (
    <div>
      <PageHeader titulo={resenaExistente ? 'Editar reseña' : 'Nueva reseña'} />

      <FormSeccion numero={1} titulo="Contenido de la reseña">
        <Input etiqueta='Nombre del cliente (o "Anónimo")' valor={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
        <label>
          <span className={styles.etiquetaCampo}>Valoración</span>
          <Estrellas valor={valoracion} onChange={setValoracion} />
        </label>
        <div className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>Texto de la reseña</span>
          <textarea className={styles.textarea} value={texto} onChange={(e) => setTexto(e.target.value)} />
        </div>
      </FormSeccion>

      <FormSeccion numero={2} titulo="Datos adicionales" descripcion="Opcionales — foto y producto relacionado.">
        <div className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>Foto (opcional)</span>
          <div className={styles.foto}>
            {foto ? <img src={foto} alt="" className={styles.fotoMiniatura} /> : <span className={styles.fotoMiniatura} />}
            <Boton variante="contorno" tamano="s" onClick={() => { setSeleccionTemp(foto ? [foto] : []); setPickerAbierto(true); }}>
              {foto ? 'Cambiar foto' : 'Elegir foto'}
            </Boton>
            {foto && <Boton variante="texto" onClick={() => setFoto('')}>Quitar</Boton>}
          </div>
        </div>
        <label className={styles.campoAncho}>
          <span className={styles.etiquetaCampo}>Producto relacionado (opcional)</span>
          <select className={styles.selectInput} value={productoRelacionado} onChange={(e) => setProductoRelacionado(e.target.value)}>
            <option value="">Ninguno</option>
            {productosMock.map((p) => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
          </select>
        </label>
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
