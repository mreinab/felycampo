# Admin · Prêt-à-porter — guía para conectar la base de datos

**Estado (noviembre de 2026):** los productos de la tienda se editan desde `/admin/productos/pret-a-porter`, con los mismos datos que enseñan `/pret-a-porter`, sus 5 categorías y la ficha de cada producto. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

| Pieza | Archivo |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/pretAPorter.js`: 17 productos, con cada campo explicado arriba del archivo. Migrado tal cual desde el antiguo `components/layout/tiendaProductos.js`. |
| Reglas comunes web + admin | `src/lib/pretAPorter.js`: producto → lo que pinta la web, búsqueda con redirección, campos y validación. |
| Web | `components/layout/tiendaProductos.js` (ahora lee de `lib/pretAPorter.js`; lo usan el listado, las categorías, el carrito, la wishlist y el sitemap) y la ficha `app/[locale]/pret-a-porter/[producto]`: `page.js` + `FichaTiendaCuerpo.jsx` (lo que se ve) + `PreviaFichaTienda.jsx` (vista previa). |
| Admin | `components/admin/AdminPretAPorter.jsx` (listado reordenable con pestañas por categoría, y ficha; en el menú, en «Páginas de la web › Colecciones»), `PretAPorter.jsx` (estado; mantiene el submenú del menú lateral) y `SelectorColores.jsx`. |

Se comprobó, comparando el HTML del listado, de dos categorías y de cuatro fichas en español y en inglés (y el sitemap), que la web enseña lo mismo que antes.

## Qué se edita (solo lo que enseña la web)

- **Nombre** (da la URL), **categoría** (de las 5) y **referencia** (no se ve; va a los datos para Google).
- **Fotos:** la 1.ª en la tarjeta y la ficha, la 2.ª al pasar el ratón.
- **Descripción** en español e inglés. En inglés vacía = la española.
- **Colores,** de la biblioteca de colores del admin (`lib/paletaColores.js`).
- **Foto de pasarela** (opcional) y si va delante o detrás del producto.

**Precio y tallas disponibles** siguen en los datos, porque los usa el carrito, pero la web no los enseña (sin venta online, a petición) y no se editan.

Si se cambia el nombre de un producto publicado, su URL anterior se guarda en `slugsAnteriores` y la ficha la redirige con un 301 (`buscarProductoPretAPorter`).

**Orden:** el de los datos es el de la web, tanto en `/pret-a-porter` como en cada categoría y en los relacionados. Se cambia arrastrando en el admin, en «Todos» o dentro de una categoría; en ese caso, solo se recolocan entre sí los de esa categoría (`reordenar` en `PretAPorter.jsx`). Al conectar la base de datos, guardar una `posicion` por producto.

**Foto de pasarela** (`fotoPasarela`): la foto de desfile que sale junto al producto solo en `/pret-a-porter`, delante o detrás de él. Antes eran listas fijas por nombre en `pret-a-porter/page.js` (`ORDEN_CUADRICULA`, `FOTOS_PASARELA`). Ahora es un dato de cada producto, así que se mueve con él.

## Vista previa

`/pret-a-porter/<producto>?previa=pret-a-porter-producto` pinta la ficha con el borrador del admin. No se indexa.

## Al conectar la base de datos

1. **Lectura:** cambiar solo `obtenerProductosPretAPorter()`.
2. **Escritura:** `guardar`, `alternar` y `borrar` de `PretAPorter.jsx` llaman a la API. En el servidor, validar con `camposProductoPretAPorter` (vía `validarCampos`) y `validarExtraProducto`.
3. **Fotos:** llegan como `blob:`. Hay que subirlas a WebP con nombre SEO, como `fely-campo-pret-a-porter-<categoria>-<producto>-front.webp`.
4. **Revalidar** el listado, la categoría, la ficha (y la URL anterior si cambió) y el sitemap.
