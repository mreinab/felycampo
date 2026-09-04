// PanelFiltros.jsx

'use client';

/* ============================================================
   PANEL DE FILTROS — Fely Campo
   Panel lateral (PanelLateral, mismo mecanismo que el submenú del
   Navbar) con los filtros del catálogo — pensado para las páginas de
   Tienda/Atelier (CuadriculaProductos, disposicion="grid"), que es
   quien posee el estado y le pasa todo por props: este componente es
   puramente de presentación.
   Uso:
     <PanelFiltros
       abierto={filtrosAbiertos} onCerrar={() => setFiltrosAbiertos(false)}
       orden={orden} onCambiarOrden={setOrden}
       tallas={['XS','S','M']} tallasSeleccionadas={[]} onToggleTalla={...}
       familias={[{ id:'neutrals', etiqueta:'Neutros', muestras:['#111111','#FAFAF7'] }]}
       familiasSeleccionadas={[]} onToggleFamilia={...}
       precioMax={500} precioMaximo={1200} onCambiarPrecioMax={...}
       onLimpiar={...}
     />

   "ocultarPrecio" (Atelier Novias/Fiesta, ver CuadriculaProductos.jsx):
   sin precio en las tarjetas no tiene sentido ni "ordenar por" (dos de
   sus tres opciones son de precio) ni el rango de precio — se ocultan
   los dos.
   "colecciones"/"coleccionSeleccionada"/"onSeleccionarColeccion"
   (opcional): desplegable más, lista de nombres con selección única
   (mismo patrón .tab/.tabActivo que "ordenar por", no chips) — usado
   por Atelier (Novias/Fiesta) para filtrar por colección.
   "familias"/"familiasSeleccionadas"/"onToggleFamilia": el filtro de
   Color agrupa por familia (Neutros, Rojos y vinos...) en vez de por
   color suelto — mismo elemento .familiaChip (2 muestras + nombre) que
   FormularioProducto.jsx en el panel admin, recreado aquí porque ese
   vive en components/admin/ (solo el panel), no en components/layout/
   (sitio público). Selección múltiple, no única (ver CuadriculaProductos.jsx).

   "Ordenar por" vive dentro del Acordeon como una fila más (la última),
   no como bloque suelto arriba — mismo criterio de siempre (colapsado a
   un vistazo, un click para ver las opciones). .contenido/.listaScroll
   (ver PanelFiltros.module.css) siguen el mismo patrón que
   CarritoPanel.module.css: cabecera fija arriba, la lista de filtros
   scrollea en su propio hueco (flex:1) y .acciones queda siempre
   pegado abajo del todo, sin importar cuánto ocupe el acordeón.
   ============================================================ */

import { useTranslations } from 'next-intl';
import { X, SlidersHorizontal, Trash2 } from 'lucide-react';
import { PanelLateral, Boton, Acordeon, FilaAcordeon } from '../ui';
import styles from './PanelFiltros.module.css';

const ORDENES = ['recomendados', 'precioAsc', 'precioDesc'];

function PanelFiltros({
  abierto,
  onCerrar,
  orden,
  onCambiarOrden,
  tallas = [],
  tallasSeleccionadas = [],
  onToggleTalla,
  familias = [],
  familiasSeleccionadas = [],
  onToggleFamilia,
  colecciones = [],
  coleccionSeleccionada,
  onSeleccionarColeccion,
  ocultarPrecio = false,
  precioMax,
  precioMaximo,
  onCambiarPrecioMax,
  onLimpiar,
}) {
  const t = useTranslations('filtros');

  return (
    <PanelLateral abierto={abierto} onCerrar={onCerrar} lado="derecha" claseContenido={styles.contenido}>
      <div className={styles.cabecera}>
        <h2 className={styles.titulo}>
          <SlidersHorizontal size={16} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" />
          {t('titulo')}
        </h2>
        <button type="button" className={styles.cerrar} onClick={onCerrar} aria-label={t('cerrar')}>
          <X size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
        </button>
      </div>

      <div className={styles.listaScroll}>
        <Acordeon>
          {familias.length > 0 && (
            <FilaAcordeon titulo={t('color')} abiertoPorDefecto>
              <div className={styles.familiasGrid}>
                {familias.map(({ id, etiqueta, muestras }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={familiasSeleccionadas.includes(id)}
                    onClick={() => onToggleFamilia(id)}
                    className={`${styles.familiaChip} ${familiasSeleccionadas.includes(id) ? styles.familiaChipActiva : ''}`}
                  >
                    <span className={styles.familiaMuestras}>
                      {muestras.map((hex) => (
                        <span key={hex} className={styles.familiaMuestra} style={{ background: hex }} />
                      ))}
                    </span>
                    {etiqueta}
                  </button>
                ))}
              </div>
            </FilaAcordeon>
          )}

          {tallas.length > 0 && (
            <FilaAcordeon titulo={t('talla')}>
              <div className={styles.chips}>
                {tallas.map((talla) => (
                  <button
                    key={talla}
                    type="button"
                    className={`${styles.chip} ${tallasSeleccionadas.includes(talla) ? styles.chipActivo : ''}`}
                    aria-pressed={tallasSeleccionadas.includes(talla)}
                    onClick={() => onToggleTalla(talla)}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </FilaAcordeon>
          )}

          {colecciones.length > 0 && (
            <FilaAcordeon titulo={t('coleccion')}>
              <div className={styles.listaOrden}>
                {colecciones.map((nombre) => (
                  <button
                    key={nombre}
                    type="button"
                    className={`${styles.tab} ${coleccionSeleccionada === nombre ? styles.tabActivo : ''}`}
                    aria-pressed={coleccionSeleccionada === nombre}
                    onClick={() => onSeleccionarColeccion(nombre)}
                  >
                    {nombre}
                  </button>
                ))}
              </div>
            </FilaAcordeon>
          )}

          {!ocultarPrecio && (
            <FilaAcordeon titulo={t('precio')}>
              <div className={styles.precio}>
                <input
                  type="range"
                  min={0}
                  max={precioMaximo}
                  step={10}
                  value={precioMax}
                  onChange={(evento) => onCambiarPrecioMax(Number(evento.target.value))}
                  className={styles.rango}
                  aria-label={t('precio')}
                />
                <span className={styles.precioValor}>{t('hasta', { precio: `${precioMax} €` })}</span>
              </div>
            </FilaAcordeon>
          )}

          {!ocultarPrecio && (
            <FilaAcordeon titulo={t('ordenarPor')}>
              <div className={styles.listaOrden}>
                {ORDENES.map((valor) => (
                  <button
                    key={valor}
                    type="button"
                    className={`${styles.tab} ${orden === valor ? styles.tabActivo : ''}`}
                    aria-pressed={orden === valor}
                    onClick={() => onCambiarOrden(valor)}
                  >
                    {t(`orden.${valor}`)}
                  </button>
                ))}
              </div>
            </FilaAcordeon>
          )}
        </Acordeon>
      </div>

      <div className={styles.acciones}>
        <Boton variante="solido" tamano="full" onClick={onCerrar}>{t('verResultados')}</Boton>
        <Boton variante="contorno" onClick={onLimpiar} className={styles.limpiarBoton}>
          <Trash2 size={16} strokeWidth={1.5} aria-hidden="true" />
          {t('limpiar')}
        </Boton>
      </div>
    </PanelLateral>
  );
}

export default PanelFiltros;
