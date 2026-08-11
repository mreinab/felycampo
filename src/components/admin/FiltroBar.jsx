import styles from './FiltroBar.module.css';

/**
 * Fila de filtros/búsqueda encima de una TablaAdmin. Es solo un
 * contenedor con estilo — cada página decide qué controles mete
 * (Input de búsqueda + <Selector> de filtro) y su propio estado.
 */
function FiltroBar({ children }) {
  return <div className={styles.barra}>{children}</div>;
}

function Selector({ etiqueta, valor, onChange, opciones }) {
  return (
    <label className={styles.select}>
      {etiqueta && <span className={styles.selectEtiqueta}>{etiqueta}</span>}
      <select className={styles.selectInput} value={valor} onChange={onChange}>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>{opcion.etiqueta}</option>
        ))}
      </select>
    </label>
  );
}

export { Selector };
export default FiltroBar;
