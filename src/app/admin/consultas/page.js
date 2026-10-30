'use client';

/* ============================================================
   CITAS — listado. Las solicitudes del formulario de cita del front
   (/visita-fely-campo/cita), con los mismos campos que envía (ver
   citasMock en mockData.js), de la más reciente a la más antigua.
   Filtros por estado e idioma (el de la web desde la que se
   envió: ES/EN) + búsqueda por nombre, teléfono, email o ciudad.
   "Recibida" en dos líneas (fecha / hora) para que la columna sea
   estrecha; bajo el nombre, el teléfono tal cual lo escribió (con su
   prefijo de país si lo puso) y, si no hay, el email.
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
import { fechaCorta, IDIOMAS_CITA } from './citasFormato';
import BanderaIdioma from './BanderaIdioma';
import styles from './page.module.css';

function CitasContenido() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [filtroEstado, setFiltroEstado] = useState(searchParams.get('estado') || 'Todos');
  const [filtroIdioma, setFiltroIdioma] = useState('Todos');

  const filtradas = useMemo(() => {
    const texto = query.trim().toLowerCase();
    return citasMock
      .filter((c) => {
        if (filtroEstado !== 'Todos' && c.estado !== filtroEstado) return false;
        if (filtroIdioma !== 'Todos' && c.locale !== filtroIdioma) return false;
        if (texto && ![c.nombre, c.telefono, c.email, c.ciudad].some((campo) => campo.toLowerCase().includes(texto))) return false;
        return true;
      })
      .sort((a, b) => b.recibida.localeCompare(a.recibida));
  }, [filtroEstado, filtroIdioma, query]);

  const pendientes = citasMock.filter((c) => c.estado === 'Pendiente').length;
  const hayFiltros = filtroEstado !== 'Todos' || filtroIdioma !== 'Todos' || query !== '';

  function limpiarFiltros() {
    setQuery('');
    setFiltroEstado('Todos');
    setFiltroIdioma('Todos');
  }

  return (
    <div>
      <PageHeader titulo="Citas" subtitulo={`${filtradas.length} solicitudes · ${pendientes} pendientes`} />

      <FiltroBar onLimpiar={hayFiltros ? limpiarFiltros : undefined}>
        <Input etiqueta="Buscar" placeholder="Nombre, teléfono, email o ciudad" valor={query} onChange={(e) => setQuery(e.target.value)} />
        <FiltroSelector
          etiqueta="Estado"
          valor={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, ...ESTADOS_CITA.map((e) => ({ valor: e, etiqueta: e }))]}
        />
        <FiltroSelector
          etiqueta="Idioma"
          valor={filtroIdioma}
          onChange={(e) => setFiltroIdioma(e.target.value)}
          opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, ...IDIOMAS_CITA]}
        />
      </FiltroBar>

      <TablaAdmin
        columnas={[
          { clave: 'recibida', etiqueta: 'Recibida', render: (c) => {
            const [fecha, hora] = c.recibida.split('T');
            return (
              <div className={styles.recibida}>
                <span>{fechaCorta(fecha)}</span>
                <span className={styles.secundario}>{hora}</span>
              </div>
            );
          } },
          { clave: 'nombre', etiqueta: 'Clienta', render: (c) => (
            <div>
              <div>{c.nombre}</div>
              <div className={styles.secundario}>{c.telefono || c.email}</div>
            </div>
          ) },
          { clave: 'fechaBoda', etiqueta: 'Fecha del evento', render: (c) => fechaCorta(c.fechaBoda) },
          { clave: 'ciudad', etiqueta: 'Ciudad' },
          { clave: 'locale', etiqueta: 'Idioma', render: (c) => <BanderaIdioma locale={c.locale} /> },
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
