# Admin · Página de Novias y Página de Fiesta (parte editorial)

**Estado (noviembre de 2026):** las fotos y los textos de `/atelier/novias` y `/atelier/fiesta` (todo menos los looks) se editan desde la pestaña **«Página de la web (fotos y textos)»** de Colección Novias y Colección Fiesta en el admin. Es la primera pestaña y la que se abre al entrar (`/admin/colecciones/novia`, `/admin/colecciones/fiesta`). Las colecciones están en la segunda (`?vista=colecciones`), y a ella llevan los botones de volver de las colecciones y los looks. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

| Pieza | Archivo |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/atelierEditorial.js`: `EDITORIAL_NOVIAS` y `EDITORIAL_FIESTA`. Migrado tal cual desde los antiguos `atelier/novias/noviaEditorial.js` y `atelier/fiesta/fiestaEditorial.js`, y la frase de la portada desde `messages/*.json` (`heroPagina.atelierNovias` / `atelierFiesta`, que ya no se usan ahí). |
| Reglas | `src/lib/atelierEditorial.js` (campos, galería → `RunwayBackstage`, reconocer vídeos). |
| Web | `atelier/novias/NoviasContenido.jsx` y `atelier/fiesta/FiestaContenido.jsx` (con vista previa: `?previa=atelier-novias` / `?previa=atelier-fiesta`). En Fiesta, `page.js` sigue haciendo la cuadrícula de looks y se la pasa ya hecha. |
| Admin | `components/admin/AdminEditorialAtelier.jsx` (editor común `EditorPagina.jsx`). Las pestañas Colecciones / Página de la web están en `AdminColeccionesAtelier.jsx` (`config.pagina`). El estado es `Paginas.jsx`, como Página de inicio o Historia de Fely. |

Se comprobó, comparando el HTML de `/atelier/novias` y `/atelier/fiesta` en español y en inglés (también con `?coleccion=`), que la web enseña lo mismo que antes.

## Qué se edita

- **Portada:** foto y frase (el título, «Atelier Novias» / «Atelier Fiesta», es fijo).
- **Introducción:** párrafos en español e inglés.
- **Pestañas** (solo Fiesta): los nombres de «Así trabajamos» y «Colección fiesta».
- **Bloques:** foto **o vídeo** (se elige) con su título y su texto, en zigzag. Son los que hay; no se añaden ni se quitan.
- **Galería final:** fotos y vídeos, reordenables. Un vídeo se reconoce por su extensión (`.mp4`), o por `#video` si se acaba de subir.

## Al conectar la base de datos

1. Cambiar `obtenerEditorialNovias()` / `obtenerEditorialFiesta()`.
2. `guardar(id, datos)` de `Paginas.jsx` llama a la API. En el servidor, validar con `validarCampos(camposEditorial(datos))`.
3. Subir fotos y vídeos (llegan como `blob:`) con nombre SEO y revalidar `/[locale]/atelier/novias` y `/[locale]/atelier/fiesta`.

## Bloques de foto + texto: añadir, mover y quitar

Bajo cada bloque están Subir, Bajar, «Añadir un bloque debajo» y «Quitar este bloque» (`ControlesLista.jsx`, con confirmación). Pueden quedar cero: entonces sale un bloque con «Añadir un bloque». En la web alternan de lado solos por su posición. Un bloque nuevo recibe un id fijo (`bloque-…`, `nuevoBloqueEditorial` en `lib/atelierEditorial.js`).

## Prêt-à-porter

Lo mismo para `/pret-a-porter`, pero más corto: el **carrusel de la portada** (fotos de pasarela recortadas que pasan solas; mínimo una) y la **descripción** bajo el título. Se edita en la pestaña **«Página de la web (fotos y textos)»** de Prêt-à-porter (`/admin/productos/pret-a-porter`, la que se abre al entrar); los productos están en la segunda (`?vista=productos`).

| Pieza | Archivo |
|---|---|
| Datos | `EDITORIAL_PRET_A_PORTER` en `src/datos/atelierEditorial.js` (migrado de `pret-a-porter/pretAPorterEditorial.js` y del carrusel fijo de `page.js`; los dos bloques de foto + texto, desactivados, no se migraron). |
| Web | `pret-a-porter/PretAPorterCabecera.jsx` (vista previa: `?previa=pret-a-porter-pagina`). |
| Admin | `components/admin/AdminPaginaPretAPorter.jsx`; pestañas en `AdminPretAPorter.jsx`. |
