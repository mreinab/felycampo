'use client';

/* ============================================================
   RESEÑAS — listado (spec sección 6)
   Contenido independiente: no aparece en ningún sitio automáticamente,
   se selecciona luego a mano desde el bloque "Reseñas destacadas" en
   Diseño. Aquí solo se gestiona el contenido en sí.
   Producto reseñado por `productoId` (FK real, ver mockData.js) en vez
   de nombre en texto libre — permite mostrar SKU + foto del producto,
   no solo su nombre. Toggle tabla/rejilla igual que Pedidos/Consultas de
   precio/Producto: `List`/`LayoutGrid` en PageHeader, TablaAdmin o
   GridResenas debajo según `vista`.
   ============================================================ */

import { useMemo, useState } from 'react';
import { List, LayoutGrid, Plus } from 'lucide-react';
import {
  PageHeader, TablaAdmin, GridResenas, FiltroBar, FiltroSelector, Estrellas, useToast,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { resenasMock, productosMock } from '@/components/admin/mockData';
import styles from './page.module.css';

function productoDe(productoId) {
  return productosMock.find((p) => p.id === productoId);
}

export default function ResenasPage() {
  const { mostrarToast } = useToast();
  const [resenas, setResenas] = useState(resenasMock);
  const [vista, setVista] = useState('tabla');
  const [query, setQuery] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todas');
  const [filtroValoracion, setFiltroValoracion] = useState('Todas');

  // Más recientes primero (mismo criterio por defecto que Consultas de
  // precio) — sin esto, una reseña recién "enviada" (`nuevo: true`, ver
  // mockData.js) podía acabar enterrada al final de la tabla si el resto
  // del mock tenía fechas más antiguas insertadas antes en el array,
  // dejando el punto rosa de "nuevo" fuera de la vista sin hacer scroll.
  const filtradas = useMemo(() => resenas
    .filter((r) => {
      if (filtroEstado !== 'Todas' && r.estado !== filtroEstado) return false;
      if (filtroValoracion !== 'Todas' && String(r.valoracion) !== filtroValoracion) return false;
      if (query && !r.nombreCliente.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha)), [resenas, filtroEstado, filtroValoracion, query]);

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
        <div className={styles.vistaToggle} role="group" aria-label="Cambiar vista">
          <button
            type="button"
            className={`${styles.vistaBoton} ${vista === 'tabla' ? styles.vistaBotonActiva : ''}`}
            aria-pressed={vista === 'tabla'}
            aria-label="Vista de tabla"
            onClick={() => setVista('tabla')}
          >
            <List size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.vistaBoton} ${vista === 'rejilla' ? styles.vistaBotonActiva : ''}`}
            aria-pressed={vista === 'rejilla'}
            aria-label="Vista de rejilla"
            onClick={() => setVista('rejilla')}
          >
            <LayoutGrid size={16} aria-hidden="true" />
          </button>
        </div>
        <Boton variante="solido" href="/admin/resenas/nueva"><Plus size={14} /> Nueva reseña</Boton>
      </PageHeader>

      <FiltroBar onLimpiar={hayFiltros ? limpiarFiltros : undefined}>
        <Input etiqueta="Buscar" placeholder="Nombre del cliente" valor={query} onChange={(e) => setQuery(e.target.value)} />
        <FiltroSelector
          etiqueta="Estado"
          valor={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          opciones={[{ valor: 'Todas', etiqueta: 'Todas' }, { valor: 'Publicada', etiqueta: 'Publicada' }, { valor: 'Oculta', etiqueta: 'Oculta' }]}
          activo={filtroEstado !== 'Todas'}
        />
        <FiltroSelector
          etiqueta="Valoración"
          valor={filtroValoracion}
          onChange={(e) => setFiltroValoracion(e.target.value)}
          opciones={[{ valor: 'Todas', etiqueta: 'Todas' }, ...[5, 4, 3, 2, 1].map((n) => ({ valor: String(n), etiqueta: `${n} estrellas` }))]}
          activo={filtroValoracion !== 'Todas'}
        />
      </FiltroBar>

      {vista === 'tabla' ? (
        <TablaAdmin
          columnas={[
            {
              clave: 'imagen',
              etiqueta: '',
              render: (r) => (productoDe(r.productoId)?.imagen
                ? <img src={productoDe(r.productoId).imagen} alt="" className={styles.miniatura} />
                : <span className={styles.miniatura} />),
            },
            { clave: 'nombreCliente', etiqueta: 'Cliente' },
            { clave: 'sku', etiqueta: 'SKU', render: (r) => productoDe(r.productoId)?.sku || '—' },
            { clave: 'texto', etiqueta: 'Texto', render: (r) => <span className={styles.textoExtracto}>{r.texto}</span> },
            { clave: 'valoracion', etiqueta: 'Valoración', render: (r) => <Estrellas valor={r.valoracion} /> },
            { clave: 'fecha', etiqueta: 'Fecha' },
          ]}
          filas={filtradas}
          filaNueva={(r) => Boolean(r.nuevo)}
          hrefFila={(r) => `/admin/resenas/${r.id}/editar`}
          renderAcciones={(r) => (
            <>
              <Boton variante="texto" href={`/admin/resenas/${r.id}/editar`}>Editar</Boton>{' '}
              <Boton variante="texto" onClick={() => alternarEstado(r.id)}>{r.estado === 'Publicada' ? 'Ocultar' : 'Publicar'}</Boton>
            </>
          )}
        />
      ) : (
        <GridResenas filas={filtradas} hrefFila={(r) => `/admin/resenas/${r.id}/editar`} porPagina={12} />
      )}
    </div>
  );
}
