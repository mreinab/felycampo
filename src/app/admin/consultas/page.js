'use client';

/* ============================================================
   CITAS — listado. Las solicitudes del formulario de cita del front
   (/visita-fely-campo/cita), con los mismos campos que envía (ver
   citasMock en mockData.js), de la más reciente a la más antigua.
   Filtros por atelier y estado + búsqueda por nombre, email o ciudad.
   Antes "Consultas / Citas" con consultasMock (consultas genéricas con
   producto relacionado, que el front no tiene) — sustituido a petición
   para adaptar el admin a lo que se usa de verdad.
   Datos de EJEMPLO hasta que /api/cita guarde las solicitudes.
   ============================================================ */

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader, TablaAdmin, EstadoBadge, FiltroBar, FiltroSelector } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { citasMock, ESTADOS_CITA } from '@/components/admin/mockData';
import { ATELIERES_CITA } from '@/lib/citaAtelier';
import { fechaCorta, fechaHora, nombreAtelier } from './citasFormato';
import styles from './page.module.css';

function CitasContenido() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [filtroAtelier, setFiltroAtelier] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState(searchParams.get('estado') || 'Todos');

  const filtradas = useMemo(() => {
    const texto = query.trim().toLowerCase();
    return citasMock
      .filter((c) => {
        if (filtroAtelier !== 'Todos' && c.atelier !== filtroAtelier) return false;
        if (filtroEstado !== 'Todos' && c.estado !== filtroEstado) return false;
        if (texto && ![c.nombre, c.email, c.ciudad].some((campo) => campo.toLowerCase().includes(texto))) return false;
        return true;
      })
      .sort((a, b) => b.recibida.localeCompare(a.recibida));
  }, [filtroAtelier, filtroEstado, query]);

  const pendientes = citasMock.filter((c) => c.estado === 'Pendiente').length;
  const hayFiltros = filtroAtelier !== 'Todos' || filtroEstado !== 'Todos' || query !== '';

  function limpiarFiltros() {
    setQuery('');
    setFiltroAtelier('Todos');
    setFiltroEstado('Todos');
  }

  return (
    <div>
      <PageHeader titulo="Citas" subtitulo={`${filtradas.length} solicitudes · ${pendientes} pendientes`} />

      <FiltroBar onLimpiar={hayFiltros ? limpiarFiltros : undefined}>
        <Input etiqueta="Buscar" placeholder="Nombre, email o ciudad" valor={query} onChange={(e) => setQuery(e.target.value)} />
        <FiltroSelector
          etiqueta="Atelier"
          valor={filtroAtelier}
          onChange={(e) => setFiltroAtelier(e.target.value)}
          opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, ...ATELIERES_CITA.map((a) => ({ valor: a.id, etiqueta: a.nombre }))]}
        />
        <FiltroSelector
          etiqueta="Estado"
          valor={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, ...ESTADOS_CITA.map((e) => ({ valor: e, etiqueta: e }))]}
        />
      </FiltroBar>

      <TablaAdmin
        columnas={[
          { clave: 'recibida', etiqueta: 'Recibida', render: (c) => fechaHora(c.recibida) },
          { clave: 'nombre', etiqueta: 'Clienta', render: (c) => (
            <div>
              <div>{c.nombre}</div>
              <div className={styles.clienteEmail}>{c.email}</div>
            </div>
          ) },
          { clave: 'atelier', etiqueta: 'Atelier', render: (c) => nombreAtelier(c.atelier) },
          { clave: 'fechaBoda', etiqueta: 'Fecha de la boda', render: (c) => fechaCorta(c.fechaBoda) },
          { clave: 'ciudad', etiqueta: 'Ciudad' },
          { clave: 'estado', etiqueta: 'Estado', render: (c) => <EstadoBadge estado={c.estado} /> },
        ]}
        filas={filtradas}
        hrefFila={(c) => `/admin/consultas/${c.id}`}
        renderAcciones={(c) => <Boton variante="texto" href={`/admin/consultas/${c.id}`}>Ver</Boton>}
      />
    </div>
  );
}

export default function CitasPage() {
  return (
    <Suspense fallback={null}>
      <CitasContenido />
    </Suspense>
  );
}
