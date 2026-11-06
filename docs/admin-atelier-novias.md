# Admin · Colección Novias — guía para conectar la base de datos

**Estado (noviembre de 2026):** las colecciones y looks de Atelier Novias se editan desde `/admin/colecciones/novia`, con los mismos datos que enseña la web. Funciona igual que Colección Fiesta (`docs/admin-atelier-fiesta.md`), con la misma pantalla. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

| Pieza | Archivo |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/atelierNovias.js`: 6 colecciones y 74 looks, con cada campo explicado arriba del archivo. Generado desde el antiguo `components/layout/noviaProductos.js`, sin cambiar nada de lo publicado. |
| Lógica común web + admin | `src/lib/catalogoNovias.js`: look → producto, búsqueda con redirección, cuadrículas y validación. |
| Web | `components/layout/noviaProductos.js` (ahora lee de `catalogoNovias.js`), fichas `app/[locale]/atelier/novias/[producto]` (`FichaProductoAtelier.jsx`), páginas de categoría, `lib/atelierProductoSeo.js` y `app/sitemap.js`. |
| Admin | `components/admin/AdminAtelierNovias.jsx`, que es la pantalla común `AdminColeccionesAtelier.jsx` con la configuración de Novias, y su estado `AtelierNovias.jsx` (común: `CatalogoAtelier.jsx`). |

Se comprobó, comparando el HTML de fichas, páginas de categoría, `/atelier/novias` y el sitemap, que la web enseña lo mismo que antes.

## Diferencias con Fiesta

- **Sin temporada:** el nombre de la colección se ve tal cual («Bride 27», «ME»).
- **Colección publicada / oculta:**
  - los looks de las colecciones publicadas salen en las cuadrículas (las páginas de categoría de Novias); hoy, solo Bride 27;
  - los looks publicados de las colecciones ocultas siguen teniendo su ficha y están en el sitemap;
  - no hay página propia de cada colección.
- **El nombre propuesto** para un look nuevo sigue el patrón de su colección: «Look 15 - ME Bridal».
- **Etiquetas de estilo y silueta (`tags`):** se conservan para los filtros, pero no se editan en el admin.

## Vista previa

`/atelier/novias/<look>?previa=novias-look` pinta la ficha con el borrador del admin (`components/ecommerce/PreviaFichaAtelier.jsx`, el mismo de Fiesta). No se indexa.

## Al conectar la base de datos

Lo mismo que en Fiesta:
1. Cambiar `obtenerColeccionesNovias()` para que lea de la base de datos.
2. Las acciones de `CatalogoAtelier.jsx` llaman a la API. En el servidor, validar con `validarColeccionNovia` / `validarLookNovia`.
3. Subir las fotos (llegan como `blob:`) a WebP con nombre SEO, como `fely-campo-coleccion-novia-<coleccion>-look-N.webp`.
4. Revalidar la ficha, las páginas de categoría y el sitemap.

Si un look publicado cambia de nombre, su URL anterior se guarda en `slugsAnteriores` y la ficha la redirige con un 301 (`buscarProductoNovia`).
