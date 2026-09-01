// CuadriculaProductos.jsx

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LayoutGrid, Square } from 'lucide-react';
import TarjetaProducto from '../ecommerce/TarjetaProducto';
import TarjetaMedia from '../ecommerce/TarjetaMedia';
import { Boton, CabeceraSeccion } from '../ui';
import PanelFiltros from './PanelFiltros';
import styles from './CuadriculaProductos.module.css';

const LOTE_INICIAL = 8;
const LOTE_INCREMENTO = 8;
const ORDEN_TALLAS = ['XS', 'S', 'M', 'L', 'XL'];

// Los precios del catálogo se escriben "990 €"/"1.050 €" (punto como
// separador de miles, sin decimales) — quitar todo lo que no sea
// dígito basta para llegar al número entero en los dos casos.
function parsearPrecio(precio) {
  if (!precio) return 0;
  return parseInt(String(precio).replace(/[^\d]/g, ''), 10) || 0;
}

/**
 * Cuadrícula de productos, en dos disposiciones (prop "disposicion"):
 *
 * - "fila" (por defecto): banda en fila única — cada tarjeta reparte
 *   el ancho disponible a partes iguales (.item, flex:1) y se adapta
 *   sola al ancho de pantalla, sin arrastre ni flechas. Pensada para 4
 *   productos, recortados aquí si llegan más.
 * - "grid": catálogo completo de Tienda/Atelier — cuadrícula de 4
 *   columnas en escritorio (2 en móvil), con filtros (talla/color/
 *   precio), orden y paginación por scroll (ver más abajo).
 *
 * En ambos casos cada producto se muestra con TarjetaProducto en su
 * forma base — este componente no le pasa badge/precioRebajado, solo
 * lo que venga en cada objeto de "productos". Un objeto con "media:
 * true" rompe esa norma: se renderiza como TarjetaMedia (solo imagen/
 * gif/vídeo en bucle, sin nombre ni precio) en vez de TarjetaProducto,
 * y no lo tocan los filtros de talla/color/precio.
 *
 * "tituloKey" (opcional): activa la cabecera (CabeceraSeccion) —
 * subtítulo pequeño "tituloKey", título grande "coleccionKey" (si
 * falta, reusa tituloKey) y descripción opcional "descriptionKey". Sin
 * tituloKey no se pinta cabecera — pensado para sitios que ya traen su
 * propio título encima (ej. CuadriculaConTabs). "verMasHref" es el
 * destino del botón "flecha" en la accion (y no pinta el botón si
 * falta, aunque haya título).
 *
 * En "grid", la cabecera añade además un toggle de densidad en la
 * accion (4ª columna): icono "layout-grid" (activo por defecto, la
 * cuadrícula de 4 columnas normal) e icono "square", que la cambia a
 * 2 columnas centradas.
 *
 * También en "grid": debajo de la cabecera, una barra con el botón
 * "Filtros" (abre PanelFiltros, panel lateral con talla/color/precio +
 * ordenar por) y el recuento de resultados. "tallas"/"colores"/precio
 * disponibles para filtrar se calculan a partir de "productos" (no hay
 * lista fija). La cuadrícula solo pinta un lote inicial de 8 — al
 * acercarse al final (IntersectionObserver sobre un centinela después
 * de la cuadrícula) carga 8 más, con tarjetas-esqueleto (.skeleton)
 * mientras "llega" (simulado con un timeout — aquí no hay backend
 * real todavía).
 */
function CuadriculaProductos({ productos, verMasHref, tituloKey, coleccionKey, descriptionKey, botonTextKey = 'cuadriculaProductos.shopNow', disposicion = 'fila' }) {
  const t = useTranslations();

  const esGrid = disposicion === 'grid';
  const [columnas, setColumnas] = useState(4);
  const esCompacta = esGrid && columnas === 2;

  // ---------- Filtros / orden (solo "grid") ----------
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [orden, setOrden] = useState('recomendados');
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);
  const [coloresSeleccionados, setColoresSeleccionados] = useState([]);

  const tallasDisponibles = useMemo(() => {
    if (!esGrid) return [];
    const encontradas = new Set();
    productos.forEach((producto) => (producto.tallas || []).forEach((talla) => encontradas.add(talla)));
    return ORDEN_TALLAS.filter((talla) => encontradas.has(talla));
  }, [productos, esGrid]);

  const coloresDisponibles = useMemo(() => {
    if (!esGrid) return [];
    const vistos = new Map();
    productos.forEach((producto) => (producto.colores || []).forEach(({ hex, nombre }) => {
      if (!vistos.has(nombre)) vistos.set(nombre, hex);
    }));
    return Array.from(vistos, ([nombre, hex]) => ({ nombre, hex }));
  }, [productos, esGrid]);

  const precioMaximoDisponible = useMemo(() => {
    if (!esGrid) return 0;
    const maximo = productos.reduce((acumulado, producto) => Math.max(acumulado, parsearPrecio(producto.precio)), 0);
    return Math.ceil(maximo / 50) * 50;
  }, [productos, esGrid]);

  const [precioMax, setPrecioMax] = useState(precioMaximoDisponible);

  // El techo del rango depende de "productos" (cambia entre páginas) —
  // sin esto, una página con precios más baratos que la anterior
  // arrancaría con el filtro de precio ya aplicado sin que nadie lo tocara.
  useEffect(() => {
    setPrecioMax(precioMaximoDisponible);
  }, [precioMaximoDisponible]);

  const hayFiltrosActivos = tallasSeleccionadas.length > 0
    || coloresSeleccionados.length > 0
    || precioMax < precioMaximoDisponible;

  const alternarEnLista = (lista, valor) => (
    lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]
  );

  const limpiarFiltros = () => {
    setTallasSeleccionadas([]);
    setColoresSeleccionados([]);
    setPrecioMax(precioMaximoDisponible);
  };

  // Lista filtrada + ordenada — base tanto del recuento de resultados
  // como de la paginación por scroll de más abajo.
  const productosOrdenados = useMemo(() => {
    if (!esGrid) return productos;

    const filtrados = productos.filter((producto) => {
      if (producto.media) return true;
      const pasaTalla = tallasSeleccionadas.length === 0
        || (producto.tallas || []).some((talla) => tallasSeleccionadas.includes(talla));
      const pasaColor = coloresSeleccionados.length === 0
        || (producto.colores || []).some(({ nombre }) => coloresSeleccionados.includes(nombre));
      const pasaPrecio = parsearPrecio(producto.precio) <= precioMax;
      return pasaTalla && pasaColor && pasaPrecio;
    });

    if (orden === 'precioAsc') return [...filtrados].sort((a, b) => parsearPrecio(a.precio) - parsearPrecio(b.precio));
    if (orden === 'precioDesc') return [...filtrados].sort((a, b) => parsearPrecio(b.precio) - parsearPrecio(a.precio));
    return filtrados;
  }, [productos, esGrid, tallasSeleccionadas, coloresSeleccionados, precioMax, orden]);

  // ---------- Paginación por scroll (solo "grid") ----------
  const [visibles, setVisibles] = useState(LOTE_INICIAL);
  const [cargandoMas, setCargandoMas] = useState(false);
  const centinelaRef = useRef(null);

  // Cambiar filtros/orden reinicia la paginación — si no, un filtro más
  // estricto podría dejar "visibles" apuntando más allá del final.
  useEffect(() => {
    setVisibles(LOTE_INICIAL);
  }, [tallasSeleccionadas, coloresSeleccionados, precioMax, orden]);

  useEffect(() => {
    if (!esGrid || cargandoMas || visibles >= productosOrdenados.length) return undefined;
    const nodo = centinelaRef.current;
    if (!nodo || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) setCargandoMas(true);
    });
    observer.observe(nodo);
    return () => observer.disconnect();
  }, [esGrid, cargandoMas, visibles, productosOrdenados.length]);

  // El "cargando" simula la petición al backend real que sustituirá a
  // este catálogo de ejemplo — sin el retardo, el lote siguiente
  // aparece de golpe y la animación de carga (.skeleton) ni se ve.
  useEffect(() => {
    if (!cargandoMas) return undefined;
    const temporizador = setTimeout(() => {
      setVisibles((actual) => Math.min(actual + LOTE_INCREMENTO, productosOrdenados.length));
      setCargandoMas(false);
    }, 500);
    return () => clearTimeout(temporizador);
  }, [cargandoMas, productosOrdenados.length]);

  // "fila" está pensada para 4 productos (ver arriba), recortados aquí
  // si llegan más; "grid" pagina por scroll sobre la lista ya filtrada/
  // ordenada.
  const productosVisibles = esGrid ? productosOrdenados.slice(0, visibles) : productos.slice(0, 4);
  const quedanMas = esGrid && visibles < productosOrdenados.length;
  const loteCargando = Math.min(LOTE_INCREMENTO, productosOrdenados.length - visibles);

  const claseCuadricula = esGrid
    ? (esCompacta ? styles.cuadriculaGridCompacta : styles.cuadriculaGrid)
    : styles.cuadricula;
  const claseItem = esGrid ? styles.itemGrid : styles.item;

  const accion = (
    <>
      {verMasHref && <Boton variante="flecha" href={verMasHref}>{t(botonTextKey)}</Boton>}
      {esGrid && (
        <div className={styles.toggleVista}>
          <button
            type="button"
            className={`${styles.toggleBoton} ${columnas === 4 ? styles.toggleBotonActivo : ''}`}
            aria-pressed={columnas === 4}
            aria-label={t('cuadriculaProductos.vistaCuadricula')}
            title={t('cuadriculaProductos.vistaCuadricula')}
            onClick={() => setColumnas(4)}
          >
            <LayoutGrid size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
          </button>
          <button
            type="button"
            className={`${styles.toggleBoton} ${columnas === 2 ? styles.toggleBotonActivo : ''}`}
            aria-pressed={columnas === 2}
            aria-label={t('cuadriculaProductos.vistaCompacta')}
            title={t('cuadriculaProductos.vistaCompacta')}
            onClick={() => setColumnas(2)}
          >
            <Square size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
          </button>
        </div>
      )}
    </>
  );

  return (
    <section className={styles.seccion}>
      {tituloKey && (
        <CabeceraSeccion
          subtitleKey={tituloKey}
          titleKey={coleccionKey || tituloKey}
          descriptionKey={descriptionKey}
          alinear={esGrid ? 'start' : 'end'}
          enCuadricula
        >
          {(verMasHref || esGrid) && accion}
        </CabeceraSeccion>
      )}

      {esGrid && (
        <div className={styles.barraFiltros}>
          <button type="button" className={styles.filtrosBoton} onClick={() => setFiltrosAbiertos(true)}>
            {t('cuadriculaProductos.filtros')}
            {hayFiltrosActivos && <span className={styles.filtrosPunto} aria-hidden="true" />}
          </button>
          <span className={styles.resultados}>
            {t('cuadriculaProductos.resultados', { total: productosOrdenados.length })}
          </span>
        </div>
      )}

      <div className={claseCuadricula}>
        {productosVisibles.map((producto) => (
          <div key={producto.nombre || producto.src} className={claseItem}>
            {producto.media ? (
              <TarjetaMedia {...producto} />
            ) : (
              <TarjetaProducto {...producto} coloresSiempreVisibles={esGrid} />
            )}
          </div>
        ))}

        {cargandoMas && Array.from({ length: loteCargando }, (_, indice) => (
          <div key={`skeleton-${indice}`} className={claseItem}>
            <div className={styles.skeleton} aria-hidden="true" />
          </div>
        ))}
      </div>

      {quedanMas && (
        <div ref={centinelaRef} className={styles.centinela} aria-hidden="true" />
      )}
      {cargandoMas && (
        <p className={styles.cargandoTexto} role="status">{t('cuadriculaProductos.cargandoMas')}</p>
      )}

      {esGrid && (
        <PanelFiltros
          abierto={filtrosAbiertos}
          onCerrar={() => setFiltrosAbiertos(false)}
          orden={orden}
          onCambiarOrden={setOrden}
          tallas={tallasDisponibles}
          tallasSeleccionadas={tallasSeleccionadas}
          onToggleTalla={(talla) => setTallasSeleccionadas((actual) => alternarEnLista(actual, talla))}
          colores={coloresDisponibles}
          coloresSeleccionados={coloresSeleccionados}
          onToggleColor={(color) => setColoresSeleccionados((actual) => alternarEnLista(actual, color))}
          precioMax={precioMax}
          precioMaximo={precioMaximoDisponible}
          onCambiarPrecioMax={setPrecioMax}
          onLimpiar={limpiarFiltros}
          totalResultados={productosOrdenados.length}
        />
      )}
    </section>
  );
}

export default CuadriculaProductos;
