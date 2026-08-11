'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { PageHeader, TablaAdmin, EstadoTimeline, useToast } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { pedidosMock } from '@/components/admin/mockData';
import styles from './page.module.css';

const PASOS_ENVIO = ['Recibido', 'Confirmado', 'Enviado', 'Entregado'];
const INDICE_PASO = { Procesando: 1, Enviado: 2, Entregado: 3 };

export default function DetallePedidoPage({ params }) {
  const { id } = use(params);
  const pedidoOriginal = pedidosMock.find((p) => p.id === id);

  // Hooks siempre incondicionales (regla de hooks): el guard notFound()
  // va después de declararlos todos, no antes.
  const { mostrarToast } = useToast();
  const [pedido, setPedido] = useState(pedidoOriginal || null);
  const [notas, setNotas] = useState(pedidoOriginal?.notasInternas || '');
  const [tracking, setTracking] = useState(pedidoOriginal?.tracking || '');

  if (!pedidoOriginal) notFound();

  function cambiarEstadoEnvio(nuevo) {
    setPedido({ ...pedido, estadoEnvio: nuevo });
    mostrarToast(`Estado de envío actualizado a "${nuevo}" (demo)`);
  }

  function guardarNotas() {
    mostrarToast('Notas internas guardadas (demo)');
  }

  function marcarEnviado() {
    setPedido({ ...pedido, estadoEnvio: 'Enviado', tracking });
    mostrarToast('Pedido marcado como enviado (demo)');
  }

  function reembolsar() {
    setPedido({ ...pedido, estadoPago: 'Fallido' });
    mostrarToast('Reembolso procesado (demo)');
  }

  return (
    <div>
      <PageHeader titulo={`Pedido ${pedido.id}`} subtitulo={pedido.cliente} />

      <div className={styles.resumen}>
        <div>
          <p className={styles.resumenLabel}>Cliente</p>
          <p className={styles.resumenValor}>{pedido.cliente}</p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Fecha</p>
          <p className={styles.resumenValor}>{pedido.fecha}</p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Total</p>
          <p className={styles.resumenValor}>{pedido.total}</p>
        </div>
        <div>
          <p className={styles.resumenLabel}>Dirección de envío</p>
          <p className={styles.resumenValor}>{pedido.direccionEnvio}</p>
        </div>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Estado del pedido</p>
        <EstadoTimeline pasos={PASOS_ENVIO} activo={INDICE_PASO[pedido.estadoEnvio]} />
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Artículos</p>
        <TablaAdmin
          columnas={[
            { clave: 'producto', etiqueta: 'Producto' },
            { clave: 'talla', etiqueta: 'Talla' },
            { clave: 'color', etiqueta: 'Color' },
            { clave: 'cantidad', etiqueta: 'Cantidad' },
            { clave: 'precio', etiqueta: 'Precio' },
          ]}
          filas={pedido.items}
          claveFila={(item) => `${item.producto}-${item.talla}-${item.color}`}
        />
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Notas internas</p>
        <p className={styles.etiquetaCampo}>Visibles solo para el equipo, no para la clienta.</p>
        <textarea className={styles.notas} value={notas} onChange={(e) => setNotas(e.target.value)} />
        <div>
          <Boton variante="contorno" tamano="s" onClick={guardarNotas}>Guardar notas</Boton>
        </div>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Acciones</p>
        <div className={styles.accionesFila}>
          <label>
            <span className={styles.etiquetaCampo}>Cambiar estado de envío</span>
            <select className={styles.selectInput} value={pedido.estadoEnvio} onChange={(e) => cambiarEstadoEnvio(e.target.value)}>
              <option value="Procesando">Procesando</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregado">Entregado</option>
            </select>
          </label>
          <Input etiqueta="Nº de seguimiento" valor={tracking} onChange={(e) => setTracking(e.target.value)} />
          <Boton variante="contorno" onClick={marcarEnviado}>Marcar como enviado</Boton>
          <Boton variante="contorno" onClick={reembolsar}>Reembolsar</Boton>
        </div>
      </div>
    </div>
  );
}
