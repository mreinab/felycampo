'use client';

/* ============================================================
   TABLA ADMIN — Fely Campo
   Tabla genérica de listado: columnas configurables + checkbox de
   selección opcional (para acciones en bloque) + columna de acciones
   al final vía renderAcciones. No sabe nada de filtros/búsqueda —
   eso vive en cada página, esto solo pinta filas.
   Uso:
     <TablaAdmin
       columnas={[{ clave: 'nombre', etiqueta: 'Nombre' }]}
       filas={productos}
       claveFila={(fila) => fila.id}
       renderAcciones={(fila) => <Boton variante="texto">Editar</Boton>}
     />
   ============================================================ */

import styles from './TablaAdmin.module.css';

function TablaAdmin({
  columnas,
  filas,
  claveFila = (fila) => fila.id,
  seleccionables = false,
  seleccionadas = [],
  onToggleSeleccion,
  onToggleTodas,
  renderAcciones,
  vacio = 'No hay elementos que mostrar.',
}) {
  const todasSeleccionadas = seleccionables && filas.length > 0 && seleccionadas.length === filas.length;

  return (
    <div className={styles.contenedor}>
      <table className={styles.tabla}>
        <thead>
          <tr>
            {seleccionables && (
              <th className={styles.thCheckbox}>
                <input
                  type="checkbox"
                  checked={todasSeleccionadas}
                  onChange={() => onToggleTodas?.(!todasSeleccionadas)}
                  aria-label="Seleccionar todas las filas"
                />
              </th>
            )}
            {columnas.map((columna) => (
              <th key={columna.clave} className={styles.th}>{columna.etiqueta}</th>
            ))}
            {renderAcciones && <th className={styles.th}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 && (
            <tr>
              <td className={styles.vacio} colSpan={columnas.length + (seleccionables ? 1 : 0) + (renderAcciones ? 1 : 0)}>
                {vacio}
              </td>
            </tr>
          )}
          {filas.map((fila) => {
            const clave = claveFila(fila);
            const marcada = seleccionadas.includes(clave);
            return (
              <tr key={clave} className={styles.tr}>
                {seleccionables && (
                  <td className={styles.tdCheckbox}>
                    <input
                      type="checkbox"
                      checked={marcada}
                      onChange={() => onToggleSeleccion?.(clave)}
                      aria-label={`Seleccionar fila ${clave}`}
                    />
                  </td>
                )}
                {columnas.map((columna) => (
                  <td key={columna.clave} className={styles.td}>
                    {columna.render ? columna.render(fila) : fila[columna.clave]}
                  </td>
                ))}
                {renderAcciones && <td className={styles.td}>{renderAcciones(fila)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaAdmin;
