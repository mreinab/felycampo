// CuadriculaConTabs.jsx

'use client';

import { useState } from 'react';
import { CollectionTitle } from '../ui';
import CuadriculaProductos from './CuadriculaProductos';
import styles from './CuadriculaConTabs.module.css';

/**
 * CollectionTitle en variante="tabs" (título + fila de tabs) + una
 * CuadriculaProductos que cambia según el tab activo. Cada tab trae su
 * propia lista de "productos" (misma forma que CuadriculaProductos) —
 * este componente no filtra ni valida nada, solo enseña la del tab
 * seleccionado y guarda cuál está activo.
 * "verMasHref" en cada tab (opcional): pasado tal cual a la
 * CuadriculaProductos del tab activo — VerMasOverlay sobre su última
 * tarjeta.
 * Uso:
 *   <CuadriculaConTabs
 *     titleKey="cuadriculaTabs.titulo"
 *     tabs={[
 *       { key: 'diaBoda', labelKey: 'cuadriculaTabs.tabs.diaBoda', productos: [...], verMasHref: '/coleccion' },
 *       { key: 'nocheBoda', labelKey: 'cuadriculaTabs.tabs.nocheBoda', productos: [...] },
 *     ]}
 *   />
 */
function CuadriculaConTabs({ titleKey, tabs }) {
  const [activo, setActivo] = useState(0);

  return (
    <div className={styles.contenedor}>
      <CollectionTitle
        variante="tabs"
        titleKey={titleKey}
        tabs={tabs}
        activo={activo}
        onSelectTab={setActivo}
      />
      <CuadriculaProductos productos={tabs[activo].productos} verMasHref={tabs[activo].verMasHref} />
    </div>
  );
}

export default CuadriculaConTabs;
