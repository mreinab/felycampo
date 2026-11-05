# Admin · Atelier Fiesta — guía para conectar la base de datos

**Estado (noviembre de 2026):** `/admin/colecciones/fiesta` ya edita colecciones y looks de Fiesta con **los mismos datos que enseña la web** (`/atelier/fiesta`, sus fichas, el sitemap y los datos SEO). Todavía **no hay base de datos**: los cambios del admin viven en memoria y se pierden al recargar (avisado en cada mensaje "(demo…)").

El objetivo es que el equipo pueda cambiar el contenido sin programador. Para eso, al conectar la base de datos solo hay que tocar **dos puntos**; el resto ya está preparado.

---

## 1. Dónde está cada cosa

| Pieza | Archivo | Qué hace |
|---|---|---|
| Datos | `src/datos/atelierFiesta.js` | Colecciones y looks. **Sustituto provisional de la base de datos.** Generado a partir del catálogo que tenía la web (199 looks publicados, comprobados uno a uno: cero diferencias). |
| Lógica común | `src/lib/catalogoFiesta.js` | Funciones que usan la web **y** el admin: nombre interno de colección, URL de un look, texto automático, transformación look → producto, validación… |
| Web | `components/layout/fiestaProductos.js`, `app/[locale]/atelier/fiesta/page.js`, `.../categoria/[categoria]/page.js`, `components/ecommerce/FichaProductoAtelier.jsx`, `lib/atelierProductoSeo.js`, `app/sitemap.js` | Leen de `catalogoFiesta.js`. |
| Admin (estado) | `components/admin/AtelierFiesta.jsx` | Estado compartido en todo el panel + acciones `guardarColeccion`, `reordenarColecciones`, `guardarLook`, `eliminarLook`. Mantiene al día el submenú "Fiesta" del menú lateral. |
| Admin (pantallas) | `components/admin/AdminAtelierFiesta.jsx`, `FormularioColeccionFiesta.jsx`, `FormularioLookFiesta.jsx`, `FotosOrdenables.jsx` | Listado de colecciones (reordenable), looks de una colección, formularios. |

## 2. Modelo de datos

Los campos están documentados en la cabecera de `src/datos/atelierFiesta.js`. Resumen:

**colecciones_fiesta**: `id`, `temporada` ("26" o vacío), `nombre` ("Opaline"), `visible` (sale en el listado de /atelier/fiesta), `portada` (solo admin), `carpeta`, `posicion` (orden en la web).

**looks_fiesta**: `id`, `coleccion_id`, `posicion`, `nombre` ("Look 6 26_Opaline", tal cual: **da la URL**), `sku` (texto libre, opcional), `publicado` (false = borrador, no sale en ningún sitio), `descripcion_es`, `descripcion_en` (vacías = texto automático), `imagenes` (lista ordenada: 1.ª tarjeta y ficha, 2.ª al pasar el ratón; mínimo una), `slugs_anteriores` (URLs antiguas a redirigir).

Reglas que ya aplica el código y que conviene repetir en la base de datos:
- El **nombre interno** de una colección es `temporada_nombre` ("26_Opaline") o solo `nombre` si no tiene temporada. Lo usan el filtro de colección y los enlaces `?coleccion=`. En la web el número no se ve ("Opaline").
- La **URL** de un look es `slugify(nombre)`. Única en todo Fiesta, incluidas las `slugs_anteriores` (ver `validarLookFiesta`).
- Si se **renombra un look publicado**, su URL anterior se añade a `slugs_anteriores` (`guardarLook` en `AtelierFiesta.jsx`) y la ficha la redirige con un 301 (`buscarProductoFiesta`). No hace falta tocar `redirecciones301.js`.
- Una colección **oculta** no sale en el listado ni en el filtro, pero sus looks **publicados** siguen teniendo ficha y estando en el sitemap (es el caso de Prêt-à-porter). Eclat está oculta y con todos sus looks en borrador.
- Los nombres de look **no siguen un único patrón** ("Look 1 26_Opaline", "Look 1 - En Madrid", "Look 60 – A Walk", "Look 1 Furisode Fiesta"…). Por eso se guardan tal cual y no se generan: generarlos cambiaría títulos y URLs ya indexados.

## 3. Qué cambiar al conectar la base de datos

1. **Lectura (web):** `obtenerColeccionesFiesta()` en `src/lib/catalogoFiesta.js` debe leer de la base de datos en vez de importar `datos/atelierFiesta.js`. El resto de funciones son puras y siguen valiendo. Si la lectura pasa a ser asíncrona, las páginas que llaman a `coleccionesVisiblesFiesta()` / `productosListadoFiesta()` / `productosFiesta()` / `buscarProductoFiesta()` son Server Components y pueden hacer `await`. `fiestaProductos.js` (export síncrono) se puede sustituir por llamadas directas.
2. **Escritura (admin):** las cuatro acciones de `AtelierFiesta.jsx` (`guardarColeccion`, `reordenarColecciones`, `guardarLook`, `eliminarLook`) deben llamar a la API y, si va bien, actualizar el estado. Validar también en el servidor con `validarColeccionFiesta` / `validarLookFiesta`.
3. **Fotos:** hoy `FotosOrdenables.jsx` comprime en el navegador (`comprimirImagen`, JPEG máx. 2000 px) y guarda una URL temporal `blob:`. Hay que subir el archivo al almacén, convertir a WebP y guardar la ruta definitiva, con un nombre SEO como el de las fotos actuales (`fely-campo-coleccion-fiesta-<coleccion>-...webp`).
4. **Publicar al momento:** tras guardar, revalidar `/[locale]/atelier/fiesta`, la ficha del look (y la URL anterior si cambió) y `/sitemap.xml` (`revalidatePath`).
5. **Migración:** cargar `src/datos/atelierFiesta.js` en la base de datos tal cual (el orden de los arrays es la `posicion`).
6. **Acceso:** el panel no tiene inicio de sesión. Es imprescindible antes de que el admin pueda publicar (el botón "Cerrar sesión" de la barra superior ya está, sin lógica).

## 4. Lo que el admin no pide (a propósito)

Etiquetas de estilo y silueta, colores, tejidos y composición, productos vinculados y la lista de prendas con nombre: la web no los muestra hoy. Se decidió dejarlos fuera del formulario de look de Fiesta.
