// CollectionTitle.jsx

'use client';

import { useTranslations } from 'next-intl';
import styles from './CollectionTitle.module.css';

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
 * variante="tabs": solo título + fila de tabs debajo, dentro del mismo
 * bloque — ignora labelKey/descriptionKey. Es un componente
 * controlado: no guarda qué tab está activo, lo recibe por props
 * (activo/onSelectTab) — quien lo use (ej. CuadriculaConTabs) es quien
 * decide qué hacer al cambiar de tab.
 *   <CollectionTitle
 *     variante="tabs"
 *     titleKey="cuadriculaTabs.titulo"
 *     tabs={[{ key: 'diaBoda', labelKey: 'cuadriculaTabs.tabs.diaBoda' }]}
 *     activo={0}
 *     onSelectTab={setActivo}
 *   />
 */
function CollectionTitle({ labelKey, titleKey, descriptionKey, variante = 'default', tabs, activo, onSelectTab }) {
  const t = useTranslations();
  const esTabs = variante === 'tabs';

  return (
    <div className={styles.bloque}>
      {!esTabs && labelKey && <p className={styles.etiqueta}>{t(labelKey)}</p>}
      <p className={styles.titulo}>{t(titleKey)}</p>
      {!esTabs && descriptionKey && <p className={styles.descripcion}>{t(descriptionKey)}</p>}

      {esTabs && (
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
      )}
    </div>
  );
}

export default CollectionTitle;
