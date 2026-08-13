'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { StickyNote } from 'lucide-react';
import {
  PageHeader, TablaAdmin, EstadoTimeline, BotonVolver, useToast,
} from '@/components/admin';
import { Boton } from '@/components/ui';
import { pedidosMock, productosMock, coloresMock } from '@/components/admin/mockData';
import { CONFIG_ESTADO_PEDIDO } from '@/components/admin/EstadoPedidoBadge';
import styles from './page.module.css';

const PASOS_ENVIO = ['Recibido', 'Confirmado', 'Enviado', 'Entregado'];
const INDICE_PASO = { Procesando: 1, Enviado: 2, Entregado: 3 };
const ESTADOS_ENVIO_ORDEN = ['Procesando', 'Enviado', 'Entregado'];

function imagenProducto(nombre) {
  return productosMock.find((p) => p.nombre === nombre)?.imagen || '';
}

function colorHex(nombre) {
  return coloresMock.find((c) => c.nombre === nombre)?.hex || '';
}

export default function DetallePedidoPage({ params }) {
  const { id } = use(params);
  const pedidoOriginal = pedidosMock.find((p) => p.id === id);

  // Hooks siempre incondicionales (regla de hooks): el guard notFound()
  // va después de declararlos todos, no antes.
  const { mostrarToast } = useToast();
  const [pedido, setPedido] = useState(pedidoOriginal || null);
  const [notas, setNotas] = useState(pedidoOriginal?.notasInternas || '');

  if (!pedidoOriginal) notFound();

  function cambiarEstadoEnvio(nuevo) {
    setPedido({ ...pedido, estadoEnvio: nuevo });
    mostrarToast(`Estado actualizado a "${CONFIG_ESTADO_PEDIDO[nuevo].etiqueta}" (demo)`);
  }

  function guardarNotas() {
    mostrarToast('Notas internas guardadas (demo)');
  }

  function cambiarTracking(valor) {
    setPedido({ ...pedido, tracking: valor });
  }

  return (
    <div>
      <BotonVolver href="/admin/pedidos" />
      <PageHeader titulo={`Pedido ${pedido.id}`} subtitulo={pedido.cliente}>
        <div className={styles.estadoSelector}>
          {ESTADOS_ENVIO_ORDEN.map((valor) => {
            const { etiqueta, clase } = CONFIG_ESTADO_PEDIDO[valor];
            const activo = pedido.estadoEnvio === valor;
            return (
              <button
                key={valor}
                type="button"
                className={`${styles.estadoBoton} ${styles[clase]} ${activo ? styles.estadoBotonActivo : ''}`}
                aria-pressed={activo}
                onClick={() => cambiarEstadoEnvio(valor)}
              >
                {etiqueta}
              </button>
            );
          })}
        </div>
      </PageHeader>

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
        <div>
          <p className={styles.resumenLabel}>Nº de seguimiento</p>
          <input
            type="text"
            className={styles.resumenInput}
            value={pedido.tracking}
            onChange={(e) => cambiarTracking(e.target.value)}
            placeholder="—"
          />
        </div>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Artículos</p>
        <TablaAdmin
          columnas={[
            {
              clave: 'imagen',
              etiqueta: '',
              render: (item) => (imagenProducto(item.producto)
                ? <img src={imagenProducto(item.producto)} alt="" className={styles.itemImagen} />
                : <span className={styles.itemImagen} />),
            },
            { clave: 'producto', etiqueta: 'Producto' },
            { clave: 'talla', etiqueta: 'Talla' },
            {
              clave: 'color',
              etiqueta: 'Color',
              render: (item) => (
                <span className={styles.colorFila}>
                  {colorHex(item.color) && <span className={styles.colorPunto} style={{ background: colorHex(item.color) }} aria-hidden="true" />}
                  {item.color}
                </span>
              ),
            },
            { clave: 'cantidad', etiqueta: 'Cantidad' },
            { clave: 'precio', etiqueta: 'Precio' },
          ]}
          filas={pedido.items}
          claveFila={(item) => `${item.producto}-${item.talla}-${item.color}`}
        />
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>
          Notas internas
          {notas && (
            <span className={styles.notaIcono} tabIndex={0} aria-label={`Nota interna: ${notas}`}>
              <StickyNote size={14} aria-hidden="true" />
              <span className={styles.notaTooltip} role="tooltip">{notas}</span>
            </span>
          )}
        </p>
        <p className={styles.etiquetaCampo}>Visibles solo para el equipo, no para la clienta.</p>
        <textarea className={styles.notas} value={notas} onChange={(e) => setNotas(e.target.value)} />
        <div>
          <Boton variante="contorno" tamano="s" onClick={guardarNotas}>Guardar notas</Boton>
        </div>
      </div>

      <div className={styles.bloque}>
        <p className={styles.bloqueTitulo}>Estado del pedido</p>
        <EstadoTimeline pasos={PASOS_ENVIO} activo={INDICE_PASO[pedido.estadoEnvio]} />
      </div>
    </div>
  );
}
