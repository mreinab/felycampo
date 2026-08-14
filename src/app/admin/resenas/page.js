'use client';

/* ============================================================
   RESEÑAS — listado (spec sección 6)
   Contenido independiente: no aparece en ningún sitio automáticamente,
   se selecciona luego a mano desde el bloque "Reseñas destacadas" en
   Diseño. Aquí solo se gestiona el contenido en sí.
   ============================================================ */

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, TablaAdmin, EstadoBadge, FiltroBar, FiltroSelector, Estrellas, useToast } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { resenasMock } from '@/components/admin/mockData';
import styles from './page.module.css';

export default function ResenasPage() {
  const { mostrarToast } = useToast();
  const [resenas, setResenas] = useState(resenasMock);
  const [query, setQuery] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todas');
  const [filtroValoracion, setFiltroValoracion] = useState('Todas');

  const filtradas = useMemo(() => resenas.filter((r) => {
    if (filtroEstado !== 'Todas' && r.estado !== filtroEstado) return false;
    if (filtroValoracion !== 'Todas' && String(r.valoracion) !== filtroValoracion) return false;
    if (query && !r.nombreCliente.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [resenas, filtroEstado, filtroValoracion, query]);

  const hayFiltros = filtroEstado !== 'Todas' || filtroValoracion !== 'Todas' || query !== '';

  function limpiarFiltros() {
    setQuery('');
    setFiltroEstado('Todas');
    setFiltroValoracion('Todas');
  }

  function alternarEstado(id) {
    setResenas((actual) => actual.map((r) => (r.id === id ? { ...r, estado: r.estado === 'Publicada' ? 'Oculta' : 'Publicada' } : r)));
    mostrarToast('Estado actualizado (demo)');
  }

  return (
    <div>
      <PageHeader titulo="Reseñas" subtitulo={`${filtradas.length} reseñas`}>
        <Boton variante="solido" href="/admin/resenas/nueva"><Plus size={14} /> Nueva reseña</Boton>
      </PageHeader>

      <FiltroBar onLimpiar={hayFiltros ? limpiarFiltros : undefined}>
        <Input etiqueta="Buscar" placeholder="Nombre del cliente" valor={query} onChange={(e) => setQuery(e.target.value)} />
        <FiltroSelector
          etiqueta="Estado"
          valor={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          opciones={[{ valor: 'Todas', etiqueta: 'Todas' }, { valor: 'Publicada', etiqueta: 'Publicada' }, { valor: 'Oculta', etiqueta: 'Oculta' }]}
        />
        <FiltroSelector
          etiqueta="Valoración"
          valor={filtroValoracion}
          onChange={(e) => setFiltroValoracion(e.target.value)}
          opciones={[{ valor: 'Todas', etiqueta: 'Todas' }, ...[5, 4, 3, 2, 1].map((n) => ({ valor: String(n), etiqueta: `${n} estrellas` }))]}
        />
      </FiltroBar>

      <TablaAdmin
        columnas={[
          { clave: 'nombreCliente', etiqueta: 'Cliente' },
          { clave: 'texto', etiqueta: 'Texto', render: (r) => <span className={styles.textoExtracto}>{r.texto}</span> },
          { clave: 'valoracion', etiqueta: 'Valoración', render: (r) => <Estrellas valor={r.valoracion} /> },
          { clave: 'fecha', etiqueta: 'Fecha' },
          { clave: 'estado', etiqueta: 'Estado', render: (r) => <EstadoBadge estado={r.estado} /> },
          { clave: 'usadaHome', etiqueta: 'En Home', render: (r) => (r.usadaHome ? 'Sí' : 'No') },
        ]}
        filas={filtradas}
        hrefFila={(r) => `/admin/resenas/${r.id}/editar`}
        renderAcciones={(r) => (
          <>
            <Boton variante="texto" href={`/admin/resenas/${r.id}/editar`}>Editar</Boton>{' '}
            <Boton variante="texto" onClick={() => alternarEstado(r.id)}>{r.estado === 'Publicada' ? 'Ocultar' : 'Publicar'}</Boton>
          </>
        )}
      />
    </div>
  );
}
