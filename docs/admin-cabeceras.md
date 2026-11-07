# Admin · Cabeceras y textos de entrada de las páginas

**Estado (noviembre de 2026):** la foto de cabecera y los textos de entrada de las páginas que son sobre todo un listado se editan desde el admin, con vista previa. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

| Página de la web | Dónde se edita | Qué |
|---|---|---|
| `/blog` | Blog & Podcast › «Página de la web (fotos y textos)» | Cabecera (foto, título, subtítulo) e introducción |
| `/atelier/vosotras` | Vosotras › «Página de la web» | Título y texto |
| `/colecciones-fely-campo` | Runway › «Página de la web» | Cabecera |
| `/visita-fely-campo` | Dónde encontrarnos › Página Visítanos | Cabecera e introducción |
| `/puntos-de-venta-fely-campo` | Puntos de venta › «Página de la web» | Cabecera, título y texto del mapa (también al final de Visítanos) y «presencia internacional» (título y tarjeta del Showroom de Milán) |
| `/atelier-fiesta/<sede>` | Cada atelier › Portada | Además de ciudad y etiqueta, la frase bajo la ciudad |

Como en Fiesta, Novias y Prêt-à-porter, la pestaña «Página de la web» es la que se abre al entrar en cada sección; el listado tiene su propia dirección (`/admin/blog?tipo=articulos`, `/admin/vosotras?pestana=invitadas`, `/admin/colecciones/runway?vista=colecciones`, `/admin/puntos-de-venta?vista=puntos`) y a ella vuelven los botones de volver.

## Piezas

| Pieza | Archivo |
|---|---|
| Datos | `src/datos/cabeceras.js` (Blog, Vosotras, Runway, Visítanos, Puntos de venta); `subtitulo` en `src/datos/ateliers.js`. Migrados de las fotos fijas de cada `page.js` y de `messages/*.json` (las claves que ya no se usan se han quitado). |
| Reglas | `src/lib/cabeceras.js` (`PAGINAS_CABECERA`: bloques y campos de cada página, `camposCabecera`). |
| Web | `components/layout/CabeceraPagina.jsx`: `<CabeceraPagina id>` (vista previa `?previa=cabecera-<id>`), `<HeroCabecera>`, `useTextoCabecera(id)`. `CabeceraSeccion` y `CuadriculaProductos` aceptan `title` / `description` ya escritos. |
| Admin | `components/admin/AdminCabecera.jsx` (editor común), `PestanasPagina` en `ListadoAdmin.jsx`; Visítanos en `app/admin/paginas/visitanos`. |

Las páginas de categoría (`/atelier/fiesta/categoria/…`, `/atelier/novias/categoria/…` y `/pret-a-porter/<categoría>`) se quitaron el 2026-11-07: ningún enlace de la web llevaba a ellas. Lo que tenían escrito está en `docs/categorias-guardadas.md`.
