# Admin · Ateliers (Salamanca, Madrid, Oviedo)

**Estado (noviembre de 2026):** cada atelier tiene su página en el admin, en el menú «Dónde encontrarnos»: **Atelier Salamanca**, **Showroom Madrid** y **Atelier Oviedo** (`/admin/ateliers/<id>`). Desde ahí se edita su página de la web (`/atelier-fiesta/<id>`) y sus datos de contacto, con el editor común (`EditorPagina.jsx`): Español | English, vista previa en vivo (`?previa=sede-<id>`) y «Guardar y publicar». Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

## Qué se edita

| Bloque | En la web |
|---|---|
| Portada | Ciudad («Salamanca») y lo que va antes («Atelier», «Atelier & Showroom»); también salen en las tarjetas «Atelier … & Showroom» (`AteliersCita.jsx`). Foto o vídeo a todo el ancho. En vídeo, opcionales: otro vídeo para el móvil y la imagen mientras carga. Encuadre centrado o pegado arriba. |
| Presentación | El texto bajo la portada (una línea en blanco separa frases). |
| Foto o vídeo grande | Bajo la presentación. Una foto vertical puede verse «Entera» (`ajustarAlto`). |
| Sección 1…N | Foto + título + texto, alternando de lado solas. Se **añaden** («Añadir una sección debajo»), se **mueven** (Subir / Bajar) y se **quitan** (con confirmación; «Descartar» las recupera hasta publicar). El índice de la izquierda cambia al momento (`EditorPagina` acepta `bloques` como función del borrador). |
| Fotos del final | Fotos y vídeos, reordenables, hasta 10. En escritorio: hasta 5 en una fila; con más, en filas de 3 (6 fotos), 4 (7-8) o 5 (9-10) — reglas `:has()` de `.imagenes` en `atelier-fiesta/page.module.css`, sin tocar el HTML. En móvil, carrusel. |
| Dirección y contacto | Nombre de la sede, dirección (2 líneas), teléfono y segundo teléfono, WhatsApp, horario (vacío = «Showroom con cita previa») el texto de su tarjeta y sus fotos (hasta 6, pasan solas). **Sale también en `/visita-fely-campo` y en el formulario de cita.** |

Todo lo que se ve de cada sede sale de sus datos: la ciudad y la etiqueta se sacaron de `messages/*.json` (`atelierFiesta`, borrado) y las fotos de la tarjeta de Visítanos de `ListadoUbicaciones.jsx`. Solo `ciudad` (nombre interno) y la dirección de la página (`/atelier-fiesta/<id>`) son fijos.

## Piezas

| Pieza | Archivo |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/ateliers.js` (`SEDES`). Migrado tal cual de los antiguos `atelier-fiesta/atelieres.js` (la página) y `visita-fely-campo/ubicaciones.js` (el contacto). |
| Reglas | `src/lib/ateliers.js`: `obtenerSede`, `obtenerSedes`, `ubicacionDe` (el contacto con la forma de antes), `obtenerUbicaciones`, `enlaceMapa`, `camposSede`. |
| Web | `atelier-fiesta/AtelierDetalle.jsx` (servidor: datos para Google) + `AtelierContenido.jsx` (cliente, con vista previa). `visita-fely-campo/ListadoUbicaciones.jsx`, `AteliersCita.jsx`, `lib/citaAtelier.js` leen de `lib/ateliers.js`. |
| Admin | `components/admin/AdminAtelierSede.jsx`, ruta `app/admin/ateliers/[id]/page.js`. El estado está en `Paginas.jsx` (ids `sede-salamanca`, `sede-madrid`, `sede-oviedo`). |

## Para conectar la base de datos

1. Una tabla (o documento) por sede con la forma de `SEDES.<id>`.
2. `obtenerSede(id)` / `obtenerSedes()` leen de ella; la web no cambia.
3. «Guardar y publicar» llama a `guardar(id, datos)` de `Paginas.jsx`: ahí va la llamada a la API (validar con `validarCampos(camposSede(datos))` también en el servidor).
4. Las fotos y vídeos subidos son URLs temporales (`blob:`) hasta que haya almacén de archivos (ver `docs/admin-landing.md`).
