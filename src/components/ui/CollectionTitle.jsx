// CollectionTitle.jsx

'use client';

import { useTranslations } from 'next-intl';
import styles from './CollectionTitle.module.css';
import CabeceraSeccion from './CabeceraSeccion';

/**
 * Cabecera de colección: etiqueta opcional + título + descripción
 * opcional, todo centrado. No recibe los textos directamente sino sus
 * claves de traducción (messages/{locale}.json) — así el mismo
 * componente sirve para distintas colecciones sin hardcodear nada aquí.
 * Uso:
 *   <CollectionTitle
 *     labelKey="collectionTitle.edicionMujer.label"
 *     titleKey="collectionTitle.edicionMujer.title"
 *     descriptionKey="collectionTitle.edicionMujer.description"
 *   />
 *   <CollectionTitle titleKey="cuadriculaTabs.titulo" /> (sin etiqueta)
 *
 * variante="tabs": delega el layout en CabeceraSeccion (grupo título a
 * la izquierda, fila de tabs como "accion" ancha a la derecha) —
 * ignora labelKey, pero sí admite subtitleKey/descriptionKey (ver
 * CabeceraSeccion). Es un componente controlado: no guarda qué tab
 * está activo, lo recibe por props (activo/onSelectTab) — quien lo use
 * (ej. CuadriculaConTabs) es quien decide qué hacer al cambiar de tab.
 *   <CollectionTitle
 *     variante="tabs"
 *     subtitleKey="cuadriculaTabs.subtitulo"
 *     titleKey="cuadriculaTabs.titulo"
 *     descriptionKey="cuadriculaTabs.descripcion"
 *     tabs={[{ key: 'diaBoda', labelKey: 'cuadriculaTabs.tabs.diaBoda' }]}
 *     activo={0}
 *     onSelectTab={setActivo}
 *   />
 */
function CollectionTitle({ labelKey, titleKey, subtitleKey, descriptionKey, variante = 'default', tabs, activo, onSelectTab }) {
  const t = useTranslations();
  const esTabs = variante === 'tabs';

  if (esTabs) {
    return (
      <CabeceraSeccion subtitleKey={subtitleKey} titleKey={titleKey} descriptionKey={descriptionKey} accionAncha>
        <div className={styles.tabs} role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activo === index}
              onClick={() => onSelectTab(index)}
              className={`${styles.tab} ${activo === index ? styles.activa : ''}`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>
      </CabeceraSeccion>
    );
  }

  return (
    <div className={styles.bloque}>
      {labelKey && <p className={styles.etiqueta}>{t(labelKey)}</p>}
      <p className={styles.titulo}>{t(titleKey)}</p>
      {descriptionKey && <p className={styles.descripcion}>{t(descriptionKey)}</p>}
    </div>
  );
}

export default CollectionTitle;
