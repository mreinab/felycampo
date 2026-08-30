// GuiaTallas.jsx

'use client';

/* ============================================================
   GUÍA DE TALLAS ("Medidas") — Fely Campo
   Panel lateral desde la derecha (PanelLateral, lado="derecha",
   atraparFoco) con la tabla de medidas del cuerpo — referencia visual:
   el modal de guía de tallas de Mango, pero sin sus tabs "Artículo"/
   "Cuerpo" (aquí solo hay medidas de cuerpo).
   Uso:
     const [abierta, setAbierta] = useState(false);
     <button onClick={() => setAbierta(true)}>Guía de tallas</button>
     <GuiaTallas abierto={abierta} onCerrar={() => setAbierta(false)} />
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { PanelLateral } from '../ui';
import { CLAVES_MEDIDAS, TALLAS_MEDIDAS, convertirMedida, formatearMedida } from './guiaTallasData';
import styles from './GuiaTallas.module.css';

function GuiaTallas({ abierto, onCerrar }) {
  const t = useTranslations('guiaTallas');
  const [unidad, setUnidad] = useState('cm');
  const [vista, setVista] = useState('real');
  const [tallaSeleccionada, setTallaSeleccionada] = useState(TALLAS_MEDIDAS[0].talla);

  return (
    <PanelLateral abierto={abierto} onCerrar={onCerrar} lado="derecha" atraparFoco>
      <div className={styles.cabecera}>
        <h2 className={styles.titulo}>{t('titulo')}</h2>
        <button type="button" className={styles.cerrar} onClick={onCerrar} aria-label={t('cerrar')}>
          <X size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
        </button>
      </div>

      <section className={styles.seccionTabla}>
        <div className={styles.filaControles}>
          <span className={styles.etiquetaSeccion}>{t('europa')}</span>
          <div className={styles.toggle}>
            <button
              type="button"
              aria-pressed={unidad === 'cm'}
              className={`${styles.tab} ${unidad === 'cm' ? styles.tabActivo : ''}`}
              onClick={() => setUnidad('cm')}
            >
              {t('unidadCm')}
            </button>
            <button
              type="button"
              aria-pressed={unidad === 'in'}
              className={`${styles.tab} ${unidad === 'in' ? styles.tabActivo : ''}`}
              onClick={() => setUnidad('in')}
            >
              {t('unidadIn')}
            </button>
          </div>
        </div>

        <div className={styles.chips} role="radiogroup" aria-label={t('talla')}>
          {TALLAS_MEDIDAS.map(({ talla }) => (
            <button
              key={talla}
              type="button"
              role="radio"
              aria-checked={tallaSeleccionada === talla}
              className={`${styles.chip} ${tallaSeleccionada === talla ? styles.chipActivo : ''}`}
              onClick={() => setTallaSeleccionada(talla)}
            >
              {talla}
            </button>
          ))}
        </div>

        <div className={styles.toggle}>
          <button
            type="button"
            aria-pressed={vista === 'real'}
            className={`${styles.tab} ${vista === 'real' ? styles.tabActivo : ''}`}
            onClick={() => setVista('real')}
          >
            {t('vistaReal')}
          </button>
          <button
            type="button"
            aria-pressed={vista === 'patron'}
            className={`${styles.tab} ${vista === 'patron' ? styles.tabActivo : ''}`}
            onClick={() => setVista('patron')}
          >
            {t('vistaPatron')}
          </button>
        </div>

        <div className={styles.tablaScroll}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th scope="col" className={styles.thMedida} />
                {TALLAS_MEDIDAS.map(({ talla }) => (
                  <th
                    key={talla}
                    scope="col"
                    className={`${styles.th} ${talla === tallaSeleccionada ? styles.columnaActiva : ''}`}
                  >
                    {talla}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLAVES_MEDIDAS.map((clave) => (
                <tr key={clave}>
                  <th scope="row" className={styles.thMedida}>{t(`medidas.${clave}.etiqueta`)}</th>
                  {TALLAS_MEDIDAS.map((fila) => {
                    const valor = convertirMedida(fila[clave][vista], unidad);
                    return (
                      <td
                        key={fila.talla}
                        className={`${styles.td} ${fila.talla === tallaSeleccionada ? styles.columnaActiva : ''}`}
                      >
                        {formatearMedida(valor)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.disclaimer}>{t('disclaimer')}</p>
      </section>

      <section className={styles.seccionMedir}>
        <h3 className={styles.subtitulo}>{t('comoMedir')}</h3>
        {/* Placeholder — a sustituir por la ilustración real del cuerpo
            con cada medida señalada. */}
        <img src="/img/guia-tallas/como-medir.svg" alt="" className={styles.ilustracion} />
        <ol className={styles.listaMedir}>
          {CLAVES_MEDIDAS.map((clave) => (
            <li key={clave}>
              <strong>{t(`medidas.${clave}.etiqueta`)}</strong> — {t(`medidas.${clave}.texto`)}
            </li>
          ))}
        </ol>
      </section>
    </PanelLateral>
  );
}

export default GuiaTallas;
