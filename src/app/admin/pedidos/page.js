'use client';

/* ============================================================
   PEDIDOS — listado (spec sección 4). Solo Prêt-à-porter: Atelier
   genera consultas/citas (sección 5), Archivo no genera transacciones.
   ============================================================ */

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader, TablaAdmin, EstadoBadge, FiltroBar, FiltroSelector } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { pedidosMock } from '@/components/admin/mockData';

function PedidosContenido() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [filtroPago, setFiltroPago] = useState('Todos');
  const [filtroEnvio, setFiltroEnvio] = useState(searchParams.get('estadoEnvio') || 'Todos');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  const filtrados = useMemo(() => pedidosMock.filter((p) => {
    if (filtroPago !== 'Todos' && p.estadoPago !== filtroPago) return false;
    if (filtroEnvio !== 'Todos' && p.estadoEnvio !== filtroEnvio) return false;
    if (desde && p.fecha < desde) return false;
    if (hasta && p.fecha > hasta) return false;
    if (query && !`${p.id} ${p.cliente}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [filtroPago, filtroEnvio, desde, hasta, query]);

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
        <FiltroSelector
          etiqueta="Envío"
          valor={filtroEnvio}
          onChange={(e) => setFiltroEnvio(e.target.value)}
          opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, { valor: 'Procesando', etiqueta: 'Procesando' }, { valor: 'Enviado', etiqueta: 'Enviado' }, { valor: 'Entregado', etiqueta: 'Entregado' }]}
        />
        <Input etiqueta="Desde" tipo="date" valor={desde} onChange={(e) => setDesde(e.target.value)} />
        <Input etiqueta="Hasta" tipo="date" valor={hasta} onChange={(e) => setHasta(e.target.value)} />
      </FiltroBar>

      <TablaAdmin
        columnas={[
          { clave: 'id', etiqueta: 'Pedido' },
          { clave: 'cliente', etiqueta: 'Cliente' },
          { clave: 'fecha', etiqueta: 'Fecha' },
          { clave: 'total', etiqueta: 'Total' },
          { clave: 'estadoPago', etiqueta: 'Pago', render: (p) => <EstadoBadge estado={p.estadoPago} /> },
          { clave: 'estadoEnvio', etiqueta: 'Envío', render: (p) => <EstadoBadge estado={p.estadoEnvio} /> },
        ]}
        filas={filtrados}
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
