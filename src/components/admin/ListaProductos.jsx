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

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import {
  PageHeader, TablaAdmin, EstadoPublicacionBadge, FiltroBar, FiltroSelector, TabsFiltro, ModalOverlay, BotonVolver, useToast, useCategorias,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import {
  productosMock, tiposProducto, coleccionesMock, codigoTemporada,
} from '@/components/admin/mockData';
import { calcularEstadoPublicacion, CONFIG_ESTADO_PUBLICACION } from './EstadoPublicacionBadge';
import FormularioProducto from './FormularioProducto';
import styles from './ListaProductos.module.css';

const OPCIONES_PUBLICACION = [
  { valor: 'Todos', etiqueta: 'Todos' },
  ...Object.entries(CONFIG_ESTADO_PUBLICACION).map(([valor, cfg]) => ({ valor, etiqueta: cfg.etiqueta, clase: cfg.clase })),
];

function etiquetaTipo(tipo) {
  return tiposProducto.find((t) => t.valor === tipo)?.etiqueta || tipo;
}

function etiquetaColeccion(coleccion) {
  return coleccionesMock.find((c) => c.valor === coleccion)?.etiqueta || '—';
}

function stockTotal(producto) {
  if (!producto.tallas) return '—';
  return producto.tallas.reduce((total, t) => total + t.stock, 0);
}

function ListaProductosContenido({
  tipoFijo, titulo, agruparPorCategoria = false, iconoCategoria: IconoCategoria, imagenesCategoria, slugRuta,
}) {
  // La URL de la ruta puede diferir del valor interno de `tipo` (p.ej.
  // runway usa slugRuta="runway" pero tipoFijo sigue siendo "archivo",
  // ver docs/adminpanel.md sección 5) — slugRuta cae a tipoFijo cuando
  // coinciden, como en pret-a-porter/atelier.
  const rutaTipo = slugRuta || tipoFijo;
  const { mostrarToast } = useToast();
  const { categorias } = useCategorias();
  const searchParams = useSearchParams();
  const categoriaFija = searchParams.get('categoria') || '';
  const [productos, setProductos] = useState(productosMock);
  const [query, setQuery] = useState('');
  const [filtroTipo, setFiltroTipo] = useState(tipoFijo || 'Todos');
  const [filtroPublicacion, setFiltroPublicacion] = useState('Todos');
  const [filtroColeccion, setFiltroColeccion] = useState('Todas');
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [nuevoAbierto, setNuevoAbierto] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [filtroTemporada, setFiltroTemporada] = useState('Todas');

  const categoriaActual = categoriaFija ? categorias[tipoFijo]?.find((c) => c.id === categoriaFija) : null;

  function etiquetaCategoria(tipo, categoriaId) {
    return categorias[tipo]?.find((c) => c.id === categoriaId)?.nombre || '—';
  }

  const filtrados = useMemo(() => {
    return productos.filter((p) => {
      if (tipoFijo && p.tipo !== tipoFijo) return false;
      if (!tipoFijo && filtroTipo !== 'Todos' && p.tipo !== filtroTipo) return false;
      if (categoriaFija && p.categoriaId !== categoriaFija) return false;
      if (filtroPublicacion !== 'Todos' && calcularEstadoPublicacion(p.estado) !== filtroPublicacion) return false;
      if (filtroColeccion !== 'Todas' && p.coleccion !== filtroColeccion) return false;
      if (query && !`${p.nombre} ${p.sku}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [productos, tipoFijo, categoriaFija, filtroTipo, filtroPublicacion, filtroColeccion, query]);

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

  function borrarEnBloque() {
    if (!window.confirm(`¿Seguro que quieres borrar ${seleccionadas.length} producto${seleccionadas.length === 1 ? '' : 's'}?`)) return;
    if (!window.confirm('Esta acción no se puede deshacer. ¿Confirmas el borrado?')) return;
    setProductos((actual) => actual.filter((p) => !seleccionadas.includes(p.id)));
    mostrarToast('Productos eliminados (demo)');
    setSeleccionadas([]);
  }

  function duplicar(producto) {
    mostrarToast(`"${producto.nombre}" duplicado (demo)`);
  }

  function crearProducto(producto) {
    setProductos((actual) => [producto, ...actual]);
    setNuevoAbierto(false);
  }

  function abrirEdicion(producto) {
    setProductoEnEdicion(producto);
  }

  function guardarEdicion(producto) {
    setProductos((actual) => actual.map((p) => (p.id === producto.id ? producto : p)));
    setProductoEnEdicion(null);
  }

  if (agruparPorCategoria && !categoriaFija) {
    const todasLasCategorias = (categorias[tipoFijo] || []).filter((c) => c.visible);
    const hayTemporadas = todasLasCategorias.some((c) => c.temporada);
    const categoriasVisibles = hayTemporadas && filtroTemporada !== 'Todas'
      ? todasLasCategorias.filter((c) => codigoTemporada(c.temporada).startsWith(filtroTemporada))
      : todasLasCategorias;
    return (
      <div>
        <PageHeader
          titulo={titulo}
          subtitulo={`${categoriasVisibles.length} categoría${categoriasVisibles.length === 1 ? '' : 's'} — elige una para ver sus productos`}
        >
          {hayTemporadas && (
            <div className={styles.temporadaSelector}>
              {[
                { valor: 'Todas', etiqueta: 'Todas', clase: '' },
                { valor: 'AW', etiqueta: 'Autumn Winter', clase: styles.temporadaBotonAw },
                { valor: 'SS', etiqueta: 'Spring Summer', clase: styles.temporadaBotonSs },
              ].map(({ valor, etiqueta, clase }) => (
                <button
                  key={valor}
                  type="button"
                  className={`${styles.temporadaBoton} ${clase} ${filtroTemporada === valor ? styles.temporadaBotonActivo : ''}`}
                  aria-pressed={filtroTemporada === valor}
                  onClick={() => setFiltroTemporada(valor)}
                >
                  {etiqueta}
                </button>
              ))}
            </div>
          )}
        </PageHeader>
        <div className={`${styles.categoriasGrid} ${imagenesCategoria ? styles.categoriasGridImagenes : ''}`}>
          {categoriasVisibles.map((cat) => (imagenesCategoria ? (
            <Link
              key={cat.id}
              href={`/admin/productos/${rutaTipo}?categoria=${cat.id}`}
              className={styles.categoriaTarjetaImagen}
            >
              <div className={styles.categoriaImagenWrap}>
                {imagenesCategoria[cat.id] ? (
                  <img src={imagenesCategoria[cat.id]} alt="" className={styles.categoriaImagen} />
                ) : <div className={styles.categoriaImagenVacia} />}
                {cat.temporada && (
                  <span className={`${styles.categoriaBadge} ${codigoTemporada(cat.temporada).startsWith('AW') ? styles.categoriaBadgeAw : styles.categoriaBadgeSs}`}>
                    {codigoTemporada(cat.temporada)}
                  </span>
                )}
              </div>
              <div className={styles.categoriaInfoFila}>
                <span className={styles.categoriaNombre}>{cat.nombre}</span>
                <span className={styles.categoriaContador}>
                  {productos.filter((p) => p.tipo === tipoFijo && p.categoriaId === cat.id).length}
                </span>
              </div>
            </Link>
          ) : (
            <Link key={cat.id} href={`/admin/productos/${rutaTipo}?categoria=${cat.id}`} className={styles.categoriaTarjeta}>
              {IconoCategoria && <IconoCategoria className={styles.categoriaIcono} aria-hidden="true" />}
              <span className={styles.categoriaNombre}>{cat.nombre}</span>
            </Link>
          )))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {agruparPorCategoria && (
        <BotonVolver href={`/admin/productos/${rutaTipo}`}>Categorías</BotonVolver>
      )}
      <PageHeader
        titulo={categoriaActual ? `${titulo} — ${categoriaActual.nombre}` : titulo}
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
          etiqueta="Colección"
          valor={filtroColeccion}
          onChange={(e) => setFiltroColeccion(e.target.value)}
          opciones={[{ valor: 'Todas', etiqueta: 'Todas' }, ...coleccionesMock]}
        />
      </FiltroBar>

      <TabsFiltro opciones={OPCIONES_PUBLICACION} valor={filtroPublicacion} onChange={setFiltroPublicacion} />

      {seleccionadas.length > 0 && (
        <div className={styles.bulkBar}>
          <span className={styles.bulkTexto}>{seleccionadas.length} seleccionados</span>
          <Boton variante="contorno" tamano="s" className={styles.bulkPublicar} onClick={() => aplicarEnBloque({ estado: 'Activo' })}>Publicar</Boton>
          <Boton variante="contorno" tamano="s" className={styles.bulkDesactivar} onClick={() => aplicarEnBloque({ estado: 'Archivado' })}>Archivar</Boton>
          <Boton variante="contorno" tamano="s" className={styles.bulkBorrar} onClick={borrarEnBloque}>Borrar</Boton>
          <button type="button" className={styles.bulkCerrar} aria-label="Deseleccionar todo" onClick={() => setSeleccionadas([])}>
            <X size={16} />
          </button>
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
          { clave: 'categoria', etiqueta: 'Categoría', render: (p) => etiquetaCategoria(p.tipo, p.categoriaId) },
          { clave: 'coleccion', etiqueta: 'Colección', render: (p) => etiquetaColeccion(p.coleccion) },
          { clave: 'precio', etiqueta: 'Precio', render: (p) => p.precio || '—' },
          { clave: 'stock', etiqueta: 'Stock', render: (p) => stockTotal(p) },
          { clave: 'estado', etiqueta: 'Estado', render: (p) => <EstadoPublicacionBadge estado={p.estado} /> },
        ]}
        filas={filtrados}
        onClickFila={abrirEdicion}
        renderAcciones={(p) => (
          <div className={styles.filaAcciones}>
            <Boton variante="texto" onClick={() => abrirEdicion(p)}>Editar</Boton>
            <Boton variante="texto" onClick={() => duplicar(p)}>Duplicar</Boton>
          </div>
        )}
      />

      <ModalOverlay abierto={nuevoAbierto} onCerrar={() => setNuevoAbierto(false)}>
        <FormularioProducto tipoInicial={tipoFijo} categoriaInicial={categoriaFija || undefined} onGuardado={crearProducto} />
      </ModalOverlay>

      <ModalOverlay abierto={!!productoEnEdicion} onCerrar={() => setProductoEnEdicion(null)}>
        <FormularioProducto productoExistente={productoEnEdicion} onGuardado={guardarEdicion} />
      </ModalOverlay>
    </div>
  );
}

function ListaProductos(props) {
  return (
    <Suspense fallback={null}>
      <ListaProductosContenido {...props} />
    </Suspense>
  );
}

export default ListaProductos;
