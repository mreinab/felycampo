// CabeceraSeccion.jsx

'use client';

import { useTranslations } from 'next-intl';
import styles from './CabeceraSeccion.module.css';
import collectionTitleStyles from './CollectionTitle.module.css';

/**
 * Cabecera de sección: grupo título (subtítulo pequeño opcional +
 * título grande + descripción opcional, apilados) seguido de
 * contenido libre vía children, p.ej. un <Boton variante="flecha">.
 * Todo centrado en columna. No pinta nada de children si no hay.
 *
 * Reutilizada por CuadriculaProductos (children = Boton "Ver más" +
 * toggle de densidad) — antes tenía su propia copia de este layout.
 *
 * "alinear" ('end' por defecto): alineación vertical — 'end' pega
 * todo a la base, 'start' lo pega arriba (ej. páginas de catálogo de
 * Tienda/Atelier, con el toggle de densidad de CuadriculaProductos).
 *
 * "enCuadricula": usa la clase .cabeceraProductos (mismo CSS que
 * .cabecera) en vez de .cabecera — la pasa CuadriculaProductos, único
 * consumidor que la necesita distinguida en el DOM. Combinada con
 * alinear="start" (única combinación que usa CuadriculaProductos en
 * "grid"), la cabecera pasa a ser una fila de 3: "before", el grupo
 * título (70% de ancho en escritorio) y "children" — ver
 * .cabeceraProductos.cabeceraInicio en CabeceraSeccion.module.css.
 *
 * "before" (opcional): contenido libre ANTES del grupo título — solo
 * lo usa CuadriculaProductos en "grid" (el botón "Filtros").
 *
 * Uso:
 *   <CabeceraSeccion titleKey="cuadriculaProductos.novedades">
 *     <Boton variante="flecha" href="/coleccion">Ver colección</Boton>
 *   </CabeceraSeccion>
 */
function CabeceraSeccion({ subtitleKey, titleKey, descriptionKey, children, before, alinear = 'end', enCuadricula = false }) {
  const t = useTranslations();

  const claseCabecera = enCuadricula ? styles.cabeceraProductos : styles.cabecera;

  return (
    <div className={`${claseCabecera} ${alinear === 'start' ? styles.cabeceraInicio : ''}`}>
      {before}
      <div className={styles.tituloGrupo}>
        {subtitleKey && <h2 className={styles.subtitle}>{t(subtitleKey)}</h2>}
        <p className={collectionTitleStyles.titulo}>{t(titleKey)}</p>
        {descriptionKey && <p className={styles.descripcion}>{t(descriptionKey)}</p>}
      </div>
      {children}
    </div>
  );
}

export default CabeceraSeccion;
