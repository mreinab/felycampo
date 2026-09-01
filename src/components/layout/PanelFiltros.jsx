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
       colores={[{ hex:'#202020', nombre:'Tinta' }]} coloresSeleccionados={[]} onToggleColor={...}
       precioMax={500} precioMaximo={1200} onCambiarPrecioMax={...}
       onLimpiar={...} totalResultados={12}
     />
   ============================================================ */

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
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
  colores = [],
  coloresSeleccionados = [],
  onToggleColor,
  precioMax,
  precioMaximo,
  onCambiarPrecioMax,
  onLimpiar,
  totalResultados = 0,
}) {
  const t = useTranslations('filtros');

  return (
    <PanelLateral abierto={abierto} onCerrar={onCerrar}>
      <div className={styles.cabecera}>
        <h2 className={styles.titulo}>{t('titulo')}</h2>
        <button type="button" className={styles.cerrar} onClick={onCerrar} aria-label={t('cerrar')}>
          <X size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
        </button>
      </div>

      <div className={styles.seccionOrden}>
        <span className={styles.etiquetaSeccion}>{t('ordenarPor')}</span>
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
      </div>

      <Acordeon>
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

        {colores.length > 0 && (
          <FilaAcordeon titulo={t('color')}>
            <div className={styles.chips}>
              {colores.map(({ hex, nombre }) => (
                <button
                  key={nombre}
                  type="button"
                  title={nombre}
                  aria-label={nombre}
                  aria-pressed={coloresSeleccionados.includes(nombre)}
                  onClick={() => onToggleColor(nombre)}
                  className={`${styles.swatchBoton} ${coloresSeleccionados.includes(nombre) ? styles.swatchActivo : ''}`}
                >
                  <span className={styles.swatch} style={{ background: hex }} />
                </button>
              ))}
            </div>
          </FilaAcordeon>
        )}

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
      </Acordeon>

      <div className={styles.acciones}>
        <Boton variante="contorno-rosa" onClick={onLimpiar}>{t('limpiar')}</Boton>
        <Boton variante="solido" tamano="full" onClick={onCerrar}>{t('verResultados', { total: totalResultados })}</Boton>
      </div>
    </PanelLateral>
  );
}

export default PanelFiltros;
