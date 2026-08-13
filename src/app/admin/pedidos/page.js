'use client';

/* ============================================================
   PEDIDOS — listado (spec sección 4). Solo Prêt-à-porter: Atelier
   genera consultas/citas (sección 5), Archivo no genera transacciones.
   ============================================================ */

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StickyNote } from 'lucide-react';
import {
  PageHeader, TablaAdmin, EstadoBadge, EstadoPedidoBadge, FiltroBar, FiltroSelector, TabsFiltro,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { pedidosMock, productosMock } from '@/components/admin/mockData';
import { CONFIG_ESTADO_PEDIDO } from '@/components/admin/EstadoPedidoBadge';
import styles from './page.module.css';

const OPCIONES_ESTADO_PEDIDO = [
  { valor: 'Todos', etiqueta: 'Todos' },
  ...Object.entries(CONFIG_ESTADO_PEDIDO).map(([valor, cfg]) => ({ valor, etiqueta: cfg.etiqueta, clase: cfg.clase })),
];

function imagenesPedido(pedido) {
  return (pedido.items || [])
    .map((item) => productosMock.find((p) => p.nombre === item.producto)?.imagen)
    .filter(Boolean);
}

function PedidosContenido() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [filtroPago, setFiltroPago] = useState('Todos');
  const [filtroEnvio, setFiltroEnvio] = useState(searchParams.get('estadoEnvio') || 'Todos');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [ordenFecha, setOrdenFecha] = useState('reciente');

  const filtrados = useMemo(() => pedidosMock
    .filter((p) => {
      if (filtroPago !== 'Todos' && p.estadoPago !== filtroPago) return false;
      if (filtroEnvio !== 'Todos' && p.estadoEnvio !== filtroEnvio) return false;
      if (desde && p.fecha < desde) return false;
      if (hasta && p.fecha > hasta) return false;
      if (query && !`${p.id} ${p.cliente}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => (ordenFecha === 'reciente' ? b.fecha.localeCompare(a.fecha) : a.fecha.localeCompare(b.fecha))),
  [filtroPago, filtroEnvio, desde, hasta, query, ordenFecha]);

  return (
    <div>
      <PageHeader titulo="Pedidos" subtitulo={`${filtrados.length} pedidos`} />

      <FiltroBar>
        <Input etiqueta="Buscar" placeholder="Pedido o cliente" valor={query} onChange={(e) => setQuery(e.target.value)} />
        <FiltroSelector
          etiqueta="Pago"
          valor={filtroPago}
          onChange={(e) => setFiltroPago(e.target.value)}
          opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, { valor: 'Pendiente', etiqueta: 'Pendiente' }, { valor: 'Pagado', etiqueta: 'Pagado' }, { valor: 'Fallido', etiqueta: 'Fallido' }]}
        />
        <Input etiqueta="Desde" tipo="date" valor={desde} onChange={(e) => setDesde(e.target.value)} />
        <Input etiqueta="Hasta" tipo="date" valor={hasta} onChange={(e) => setHasta(e.target.value)} />
        <FiltroSelector
          etiqueta="Fecha"
          valor={ordenFecha}
          onChange={(e) => setOrdenFecha(e.target.value)}
          opciones={[{ valor: 'reciente', etiqueta: 'Más recientes' }, { valor: 'antiguo', etiqueta: 'Más antiguos' }]}
        />
      </FiltroBar>

      <TabsFiltro opciones={OPCIONES_ESTADO_PEDIDO} valor={filtroEnvio} onChange={setFiltroEnvio} />

      <TablaAdmin
        columnas={[
          {
            clave: 'id',
            etiqueta: 'Pedido',
            render: (p) => (
              <span className={styles.idFila}>
                {p.id}
                {p.notasInternas && (
                  <span className={styles.notaIcono} tabIndex={0} aria-label={`Nota interna: ${p.notasInternas}`}>
                    <StickyNote size={14} aria-hidden="true" />
                    <span className={styles.notaTooltip} role="tooltip">{p.notasInternas}</span>
                  </span>
                )}
              </span>
            ),
          },
          {
            clave: 'imagen',
            etiqueta: '',
            render: (p) => {
              const imagenes = imagenesPedido(p);
              return imagenes.length > 0 ? (
                <span className={styles.miniaturaFila}>
                  <img src={imagenes[0]} alt="" className={styles.miniatura} />
                  {imagenes.length > 1 && <span className={styles.miniaturaExtra}>{`+${imagenes.length - 1}`}</span>}
                </span>
              ) : <span className={styles.miniatura} />;
            },
          },
          { clave: 'cliente', etiqueta: 'Cliente' },
          { clave: 'fecha', etiqueta: 'Fecha' },
          { clave: 'total', etiqueta: 'Total' },
          { clave: 'estadoPago', etiqueta: 'Pago', render: (p) => <EstadoBadge estado={p.estadoPago} /> },
          { clave: 'estadoEnvio', etiqueta: 'Estado', render: (p) => <EstadoPedidoBadge estado={p.estadoEnvio} /> },
        ]}
        filas={filtrados}
        hrefFila={(p) => `/admin/pedidos/${p.id}`}
        renderAcciones={(p) => <Boton variante="texto" href={`/admin/pedidos/${p.id}`}>Ver</Boton>}
      />
    </div>
  );
}

export default function PedidosPage() {
  return (
    <Suspense fallback={null}>
      <PedidosContenido />
    </Suspense>
  );
}
