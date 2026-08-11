'use client';

/* ============================================================
   LISTA DE PRODUCTOS — Fely Campo (admin)
   Reutilizada por /admin/productos (todos) y las 3 subrutas por tipo
   (tipoFijo preseleccionado y oculto del filtro, spec 2.1). Filtros y
   búsqueda SÍ filtran de verdad sobre el array mock (es un simple
   Array.filter en cliente, no "lógica real" de backend) — mucho más
   convincente para enseñar que unos controles decorativos.
   Los datos se copian a estado local: así activar/desactivar o
   archivar en bloque se ve reflejado al momento, sin persistir tras
   recargar (no hay backend detrás todavía).
   ============================================================ */

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  PageHeader, TablaAdmin, EstadoBadge, FiltroBar, FiltroSelector, ModalOverlay, useToast,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { productosMock, tiposProducto, seccionesWeb, coleccionesMock } from '@/components/admin/mockData';
import FormularioProducto from './FormularioProducto';
import styles from './ListaProductos.module.css';

const ESTADOS = ['Todos', 'Borrador', 'Activo', 'Archivado'];

function etiquetaTipo(tipo) {
  return tiposProducto.find((t) => t.valor === tipo)?.etiqueta || tipo;
}

function etiquetaSeccion(tipo, seccionWeb) {
  return seccionesWeb[tipo]?.find((s) => s.valor === seccionWeb)?.etiqueta || seccionWeb;
}

function etiquetaColeccion(coleccion) {
  return coleccionesMock.find((c) => c.valor === coleccion)?.etiqueta || '—';
}

function stockTotal(producto) {
  if (!producto.tallas) return '—';
  return producto.tallas.reduce((total, t) => total + t.stock, 0);
}

function ListaProductos({ tipoFijo, titulo }) {
  const { mostrarToast } = useToast();
  const [productos, setProductos] = useState(productosMock);
  const [query, setQuery] = useState('');
  const [filtroTipo, setFiltroTipo] = useState(tipoFijo || 'Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [filtroColeccion, setFiltroColeccion] = useState('Todas');
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [nuevoAbierto, setNuevoAbierto] = useState(false);

  const filtrados = useMemo(() => {
    return productos.filter((p) => {
      if (tipoFijo && p.tipo !== tipoFijo) return false;
      if (!tipoFijo && filtroTipo !== 'Todos' && p.tipo !== filtroTipo) return false;
      if (filtroEstado !== 'Todos' && p.estado !== filtroEstado) return false;
      if (filtroColeccion !== 'Todas' && p.coleccion !== filtroColeccion) return false;
      if (query && !`${p.nombre} ${p.sku}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [productos, tipoFijo, filtroTipo, filtroEstado, filtroColeccion, query]);

  function alternarSeleccion(id) {
    setSeleccionadas((actual) => (actual.includes(id) ? actual.filter((s) => s !== id) : [...actual, id]));
  }

  function alternarTodas(marcar) {
    setSeleccionadas(marcar ? filtrados.map((p) => p.id) : []);
  }

  function aplicarEnBloque(cambio) {
    setProductos((actual) => actual.map((p) => (seleccionadas.includes(p.id) ? { ...p, ...cambio } : p)));
    mostrarToast('Cambios aplicados (demo)');
    setSeleccionadas([]);
  }

  function archivar(id) {
    setProductos((actual) => actual.map((p) => (p.id === id ? { ...p, estado: 'Archivado' } : p)));
    mostrarToast('Producto archivado (demo)');
  }

  function duplicar(producto) {
    mostrarToast(`"${producto.nombre}" duplicado (demo)`);
  }

  function crearProducto(producto) {
    setProductos((actual) => [producto, ...actual]);
    setNuevoAbierto(false);
  }

  return (
    <div>
      <PageHeader
        titulo={titulo}
        subtitulo={`${filtrados.length} producto${filtrados.length === 1 ? '' : 's'}`}
      >
        <Boton variante="solido" onClick={() => setNuevoAbierto(true)}>
          <Plus size={14} className={styles.iconoAnadir} />
          Añadir producto
        </Boton>
      </PageHeader>

      <FiltroBar>
        <Input etiqueta="Buscar" placeholder="Nombre o SKU" valor={query} onChange={(e) => setQuery(e.target.value)} />
        {!tipoFijo && (
          <FiltroSelector
            etiqueta="Tipo"
            valor={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            opciones={[{ valor: 'Todos', etiqueta: 'Todos' }, ...tiposProducto]}
          />
        )}
        <FiltroSelector
          etiqueta="Estado"
          valor={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          opciones={ESTADOS.map((e) => ({ valor: e, etiqueta: e }))}
        />
        <FiltroSelector
          etiqueta="Colección"
          valor={filtroColeccion}
          onChange={(e) => setFiltroColeccion(e.target.value)}
          opciones={[{ valor: 'Todas', etiqueta: 'Todas' }, ...coleccionesMock]}
        />
      </FiltroBar>

      {seleccionadas.length > 0 && (
        <div className={styles.bulkBar}>
          <span className={styles.bulkTexto}>{seleccionadas.length} seleccionados</span>
          <Boton variante="contorno" tamano="s" onClick={() => aplicarEnBloque({ estado: 'Activo' })}>Activar</Boton>
          <Boton variante="contorno" tamano="s" onClick={() => aplicarEnBloque({ estado: 'Borrador' })}>Desactivar</Boton>
        </div>
      )}

      <TablaAdmin
        seleccionables
        seleccionadas={seleccionadas}
        onToggleSeleccion={alternarSeleccion}
        onToggleTodas={alternarTodas}
        columnas={[
          { clave: 'imagen', etiqueta: '', render: (p) => (p.imagen ? <img src={p.imagen} alt="" className={styles.miniatura} /> : <span className={styles.miniatura} />) },
          { clave: 'nombre', etiqueta: 'Nombre' },
          { clave: 'tipo', etiqueta: 'Tipo', render: (p) => etiquetaTipo(p.tipo) },
          { clave: 'seccionWeb', etiqueta: 'Sección web', render: (p) => etiquetaSeccion(p.tipo, p.seccionWeb) },
          { clave: 'coleccion', etiqueta: 'Colección', render: (p) => etiquetaColeccion(p.coleccion) },
          { clave: 'precio', etiqueta: 'Precio', render: (p) => p.precio || '—' },
          { clave: 'stock', etiqueta: 'Stock', render: (p) => stockTotal(p) },
          { clave: 'estado', etiqueta: 'Estado', render: (p) => <EstadoBadge estado={p.estado} /> },
        ]}
        filas={filtrados}
        renderAcciones={(p) => (
          <div className={styles.filaAcciones}>
            <Boton variante="texto" href={`/admin/productos/${p.id}/editar`}>Editar</Boton>
            <Boton variante="texto" onClick={() => duplicar(p)}>Duplicar</Boton>
            <Boton variante="texto" onClick={() => archivar(p.id)}>Archivar</Boton>
          </div>
        )}
      />

      <ModalOverlay abierto={nuevoAbierto} onCerrar={() => setNuevoAbierto(false)}>
        <FormularioProducto tipoInicial={tipoFijo} onGuardado={crearProducto} />
      </ModalOverlay>
    </div>
  );
}

export default ListaProductos;
