# Admin · Puntos de venta (el mapa)

**Estado (noviembre de 2026):** «Puntos de venta» en el menú «Dónde encontrarnos» del admin (`/admin/puntos-de-venta`) gestiona los puntos del mapa de `/puntos-de-venta-fely-campo` (y del final de `/visita-fely-campo`). Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

## Cómo funciona

- **Listado** con buscador (nombre, ciudad, calle, teléfono o email; sin importar tildes) y filtro «País» (España primero, luego de más a menos puntos), como en Citas o Consultas. En «Todos los países» sale agrupado por país. Cada fila: ver en la web, ocultar / mostrar en el mapa (el ojo), editar y borrar. Los **3 ateliers propios** no se pueden borrar (el reparto de citas, `admin/consultas/puntoCercano.js`, cuenta con ellos); sí ocultar y editar.
- **Nuevo punto de venta** / **editar**: el editor común (`EditorPagina.jsx`) con tres bloques:
  - **Datos**: nombre, país (los que ya hay o «Otro país…»), dirección en dos líneas, teléfono y email (opcionales).
  - **Dónde está**: un mapa pequeño (`SelectorUbicacion.jsx`). «Buscar la dirección en el mapa» coloca el punto solo; si no acierta, se pincha en el mapa o se arrastra el marcador. No hace falta saber coordenadas.
  - **Foto** (opcional): la miniatura del listado; sin foto, sale una de respaldo.
- **Vista previa**: abre el mapa de la web con el borrador y el punto editado ya abierto (`?previa=puntos-venta`).
- No se puede publicar sin nombre, país, dirección y sitio en el mapa, con un email mal escrito o con un nombre que ya existe.

## Piezas

| Pieza | Archivo |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/puntosVenta.js` (`PUNTOS_VENTA`), migrado del antiguo `components/layout/puntosVenta.js` con dos campos nuevos: `foto` (antes se deducía del id) y `publicado`. |
| Reglas | `src/lib/puntosVenta.js`: `obtenerPuntosVenta`, `puntosPublicados`, `paisesDe`, `nuevoPunto`, `slugPunto`, `limpiarPunto`, `camposPunto`, `validarExtraPunto`. |
| Web | `components/layout/MapaPuntosVenta.jsx`: solo los publicados con sitio en el mapa; los marcadores se vuelven a pintar si cambian (vista previa); los textos del popup se escapan. |
| Admin | `components/admin/AdminPuntosVenta.jsx`, `PuntosVenta.jsx` (estado), `SelectorUbicacion.jsx`; ruta `app/admin/puntos-de-venta/page.js`. |

## Para conectar la base de datos

1. Una tabla `puntos_venta` con la forma de cada entrada de `PUNTOS_VENTA`.
2. `obtenerPuntosVenta()` lee de ella; la web no cambia.
3. `guardar`, `alternar` y `borrar` de `PuntosVenta.jsx` son las llamadas a la API (validar también en el servidor con `camposPunto` + `validarExtraPunto`).
4. **Buscador de direcciones:** `SelectorUbicacion.jsx` usa Nominatim (el buscador gratuito de OpenStreetMap) desde el navegador, sin clave. Su política de uso limita a ~1 búsqueda por segundo y no admite uso masivo: para el uso del admin (una búsqueda al crear un punto) basta. Si algún día se quiere otro (Google, Mapbox…), solo cambia la función `buscar` de ese archivo.
