'use client';

/* ============================================================
   CITA — detalle. Todos los datos que la clienta envió desde el
   formulario de cita del front, con acceso directo a responder por
   email o llamar, historial de estado y notas internas del equipo.
   Datos de EJEMPLO (citasMock): cambiar estado y guardar notas solo
   muestran el aviso "(demo)" hasta que haya base de datos.
   ============================================================ */

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { PageHeader, BotonVolver, useToast } from '@/components/admin';
import { Boton } from '@/components/ui';
import { citasMock, ESTADOS_CITA } from '@/components/admin/mockData';
import { fechaCorta, fechaHora, nombreAtelier } from '../citasFormato';
import styles from './page.module.css';

export default function DetalleCitaPage({ params }) {
  const { id } = use(params);
  const cita = citasMock.find((c) => c.id === id);

  const { mostrarToast } = useToast();
  const [estado, setEstado] = useState(cita?.estado || 'Pendiente');
  const [notas, setNotas] = useState('');
  const [historial, setHistorial] = useState(
    cita ? [{ estado: 'Pendiente', fecha: fechaHora(cita.recibida) }] : []
  );

  if (!cita) notFound();

  function cambiarEstado(nuevo) {
    if (nuevo === estado) return;
    setEstado(nuevo);
    const ahora = new Date();
    const fecha = `${ahora.toISOString().slice(0, 10)}T${ahora.toTimeString().slice(0, 5)}`;
    setHistorial([...historial, { estado: nuevo, fecha: fechaHora(fecha) }]);
    mostrarToast(`Estado actualizado a "${nuevo}" (demo)`);
  }

  function guardarNotas() {
    mostrarToast('Notas internas guardadas (demo)');
  }

  const asuntoRespuesta = encodeURIComponent(`Tu cita en Fely Campo ${nombreAtelier(cita.atelier)}`);

  return (
    <div>
      <BotonVolver href="/admin/consultas" />
      <PageHeader
        titulo={cita.nombre}
        subtitulo={`Cita en ${nombreAtelier(cita.atelier)} · recibida el ${fechaHora(cita.recibida)}`}
      />

      <div className={styles.resumen}>
        <div>
          <p className={styles.resumenLabel}>Contacto</p>
          <p className={styles.resumenValor}><a href={`mailto:${cita.email}`}>{cita.email}</a></p>
          <p className={styles.resumenValor}><a href={`tel:${cita.telefono.replace(/\s/g, '')}`}>{cita.telefono}</a></p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Atelier</p>
          <p className={styles.resumenValor}>{nombreAtelier(cita.atelier)}</p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Fecha de la boda</p>
          <p className={styles.resumenValor}>{fechaCorta(cita.fechaBoda)}</p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Dónde vive</p>
          <p className={styles.resumenValor}>{cita.ciudad} ({cita.codigoPostal})</p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Idioma</p>
          <p className={styles.resumenValor}>{cita.locale === 'en' ? 'Inglés' : 'Español'}</p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Estado</p>
          <p className={styles.resumenValor}>{estado}</p>
        </div>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Mensaje</p>
        <p className={styles.mensaje}>{cita.mensaje || 'Sin mensaje.'}</p>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Acciones</p>
        <div className={styles.accionesFila}>
          <label>
            <span className={styles.etiquetaCampo}>Cambiar estado</span>
            <select className={styles.selectInput} value={estado} onChange={(e) => cambiarEstado(e.target.value)}>
              {ESTADOS_CITA.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}
            </select>
          </label>
          <Boton variante="contorno" href={`mailto:${cita.email}?subject=${asuntoRespuesta}`}>Responder por email</Boton>
          <Boton variante="contorno" href={`tel:${cita.telefono.replace(/\s/g, '')}`}>Llamar</Boton>
        </div>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Historial de estado</p>
        <ul className={styles.historial}>
          {historial.map((h, i) => (
            <li key={i} className={styles.historialFila}>
              <span>{h.fecha}</span>
              <span>{h.estado}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Notas internas</p>
        <textarea className={styles.notas} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Solo las ve el equipo" />
        <div>
          <Boton variante="contorno" tamano="s" onClick={guardarNotas}>Guardar notas</Boton>
        </div>
      </div>
    </div>
  );
}
