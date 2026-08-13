'use client';

/* ============================================================
   CONSULTAS DE PRECIO — listado. Atelier no lleva precio visible en
   la ficha pública: en su lugar hay un botón "Precio a consultar"
   que deja estos datos de contacto. Mismo patrón que /admin/consultas
   (spec sección 5), pero separado porque el origen es otro (el botón
   de precio, no el formulario de cita/consulta general) y porque no
   todo el que pregunta es cliente registrado.
   ============================================================ */

import { useMemo, useState } from 'react';
import {
  PageHeader, TablaAdmin, EstadoContactoBadge, OrigenProductoBadge, FiltroBar, FiltroSelector, TabsFiltro,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { consultasPrecioMock } from '@/components/admin/mockData';
import { CONFIG_ESTADO_CONTACTO, calcularEstadoContacto } from '@/components/admin/EstadoContactoBadge';
import styles from './page.module.css';

const OPCIONES_CONTACTO = [
  { valor: 'Todos', etiqueta: 'Todos' },
  ...Object.entries(CONFIG_ESTADO_CONTACTO).map(([valor, cfg]) => ({ valor, etiqueta: cfg.etiqueta, clase: cfg.clase })),
];

function calcularDias(fecha) {
  const inicio = new Date(`${fecha}T00:00:00`);
  return Math.floor((Date.now() - inicio.getTime()) / (1000 * 60 * 60 * 24));
}

function etiquetaDias(dias) {
  if (dias <= 0) return 'Hoy';
  if (dias === 1) return 'Hace 1 día';
  return `Hace ${dias} días`;
}

export default function ConsultasPrecioPage() {
  const [query, setQuery] = useState('');
  const [filtroContacto, setFiltroContacto] = useState('Todos');
  const [filtroCliente, setFiltroCliente] = useState('Todos');

  const filtradas = useMemo(() => consultasPrecioMock
    .filter((c) => {
      if (filtroContacto !== 'Todos' && calcularEstadoContacto(c.estado) !== filtroContacto) return false;
      if (filtroCliente === 'Registrados' && !c.clienteId) return false;
      if (filtroCliente === 'No registrados' && c.clienteId) return false;
      if (query && !`${c.nombre} ${c.producto}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha)), [filtroContacto, filtroCliente, query]);

  return (
    <div>
      <PageHeader titulo="Consultas de precio" subtitulo={`${filtradas.length} registros`} />

      <FiltroBar>
        <Input etiqueta="Buscar" placeholder="Nombre o producto" valor={query} onChange={(e) => setQuery(e.target.value)} />
        <FiltroSelector
          etiqueta="Cliente"
          valor={filtroCliente}
          onChange={(e) => setFiltroCliente(e.target.value)}
          opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, { valor: 'Registrados', etiqueta: 'Clientes registrados' }, { valor: 'No registrados', etiqueta: 'No registrados' }]}
        />
      </FiltroBar>

      <TabsFiltro opciones={OPCIONES_CONTACTO} valor={filtroContacto} onChange={setFiltroContacto} />

      <TablaAdmin
        columnas={[
          {
            clave: 'nombre',
            etiqueta: 'Nombre',
            render: (c) => (
              <span className={styles.nombreFila}>
                {c.nombre}
                {c.clienteId && <span className={styles.etiquetaCliente}>Cliente</span>}
              </span>
            ),
          },
          {
            clave: 'producto',
            etiqueta: 'Producto',
            render: (c) => (
              <div>
                <div className={styles.origenFila}><OrigenProductoBadge producto={c.producto} /></div>
                <div>{c.producto}</div>
              </div>
            ),
          },
          {
            clave: 'contacto',
            etiqueta: 'Contacto',
            render: (c) => (
              <div>
                <div>{c.email}</div>
                <div className={styles.telefono}>{c.telefono}</div>
              </div>
            ),
          },
          { clave: 'fecha', etiqueta: 'Fecha' },
          {
            clave: 'antiguedad',
            etiqueta: 'Recibida',
            render: (c) => {
              const dias = calcularDias(c.fecha);
              const urgente = dias >= 4 && calcularEstadoContacto(c.estado) === 'pendiente';
              return <span className={urgente ? styles.recibidaUrgente : undefined}>{etiquetaDias(dias)}</span>;
            },
          },
          { clave: 'estado', etiqueta: 'Estado', render: (c) => <EstadoContactoBadge estado={c.estado} /> },
        ]}
        filas={filtradas}
        hrefFila={(c) => `/admin/consultas-precio/${c.id}`}
        renderAcciones={(c) => <Boton variante="texto" href={`/admin/consultas-precio/${c.id}`}>Ver</Boton>}
      />
    </div>
  );
}
