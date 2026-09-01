// CabeceraSeccion.jsx

'use client';

import { useTranslations } from 'next-intl';
import styles from './CabeceraSeccion.module.css';
import collectionTitleStyles from './CollectionTitle.module.css';

/**
 * Cabecera de sección en grid de 4 columnas: grupo título (subtítulo
 * pequeño opcional + título grande + descripción opcional, apilados)
 * en la 1ª columna, contenido libre en la "accion" (2ª a 4ª) — vía
 * children, p.ej. un <Boton variante="flecha"> o una fila de tabs.
 * No pinta la accion si no hay children.
 *
 * "accionAncha": la accion ocupa 3 columnas (2ª a 4ª) en vez de 1
 * (4ª) — para contenido que necesita más sitio que un botón suelto
 * (ej. una fila de tabs).
 *
 * Reutilizada por CuadriculaProductos (accion = Boton "Ver más") y
 * por CollectionTitle variante "tabs" (accion = fila de tabs,
 * accionAncha) — antes cada uno tenía su propia copia de este layout.
 *
 * "alinear" ('end' por defecto): alineación vertical del grid — 'end'
 * pega todo a la base (título y acción comparten línea base), 'start'
 * lo pega arriba (ej. páginas de catálogo de Tienda/Atelier, con el
 * toggle de densidad de CuadriculaProductos en la accion).
 *
 * "enCuadricula": usa la clase .cabeceraProductos (mismo CSS que
 * .cabecera) en vez de .cabecera — la pasa CuadriculaProductos, único
 * consumidor que la necesita distinguida en el DOM.
 *
 * Uso:
 *   <CabeceraSeccion titleKey="cuadriculaProductos.novedades">
 *     <Boton variante="flecha" href="/coleccion">Ver colección</Boton>
 *   </CabeceraSeccion>
 */
function CabeceraSeccion({ subtitleKey, titleKey, descriptionKey, children, accionAncha = false, alinear = 'end', enCuadricula = false }) {
  const t = useTranslations();

  const claseCabecera = enCuadricula ? styles.cabeceraProductos : styles.cabecera;

  return (
    <div className={`${claseCabecera} ${alinear === 'start' ? styles.cabeceraInicio : ''}`}>
      <div className={styles.tituloGrupo}>
        {subtitleKey && <h2 className={styles.subtitle}>{t(subtitleKey)}</h2>}
        <p className={collectionTitleStyles.titulo}>{t(titleKey)}</p>
        {descriptionKey && <p className={styles.descripcion}>{t(descriptionKey)}</p>}
      </div>
      {children && (
        <div className={`${styles.accion} ${accionAncha ? styles.accionAncha : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default CabeceraSeccion;
