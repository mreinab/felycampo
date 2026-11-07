# Admin · Cabeceras y textos de entrada de las páginas

**Estado (noviembre de 2026):** la foto de cabecera y los textos de entrada de las páginas que son sobre todo un listado se editan desde el admin, con vista previa. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

| Página de la web | Dónde se edita | Qué |
|---|---|---|
| `/blog` | Blog & Podcast › «Página de la web (fotos y textos)» | Cabecera (foto, título, subtítulo) e introducción |
| `/atelier/vosotras` | Vosotras › «Página de la web» | Título y texto |
| `/colecciones-fely-campo` | Runway › «Página de la web» | Cabecera |
| `/visita-fely-campo` | Dónde encontrarnos › Página Visítanos | Cabecera e introducción |
| `/puntos-de-venta-fely-campo` | Puntos de venta › «Página de la web» | Cabecera, título y texto del mapa (también al final de Visítanos) y «presencia internacional» (título y tarjeta del Showroom de Milán) |
| `/atelier/fiesta/categoria/…`, `/atelier/novias/categoria/…` | Colección Fiesta / Novias › Página de la web › «Páginas de categoría» | Foto, (frase en Fiesta) y texto encima de los looks |
| `/pret-a-porter/<categoría>` | Prêt-à-porter › Página de la web › «Páginas de categoría» | Una foto por categoría y el texto encima de las prendas |
| `/atelier-fiesta/<sede>` | Cada atelier › Portada | Además de ciudad y etiqueta, la frase bajo la ciudad |

Como en Fiesta, Novias y Prêt-à-porter, la pestaña «Página de la web» es la que se abre al entrar en cada sección; el listado tiene su propia dirección (`/admin/blog?tipo=articulos`, `/admin/vosotras?pestana=invitadas`, `/admin/colecciones/runway?vista=colecciones`, `/admin/puntos-de-venta?vista=puntos`) y a ella vuelven los botones de volver.

## Piezas

| Pieza | Archivo |
|---|---|
| Datos | `src/datos/cabeceras.js` (Blog, Vosotras, Runway, Visítanos, Puntos de venta); `categorias` en `src/datos/atelierEditorial.js` (Fiesta, Novias, Prêt-à-porter); `subtitulo` en `src/datos/ateliers.js`. Migrados de las fotos fijas de cada `page.js` y de `messages/*.json` (las claves que ya no se usan se han quitado). |
| Reglas | `src/lib/cabeceras.js` (`PAGINAS_CABECERA`: bloques y campos de cada página, `camposCabecera`). |
| Web | `components/layout/CabeceraPagina.jsx`: `<CabeceraPagina id>` (vista previa `?previa=cabecera-<id>`), `<HeroCabecera>`, `useTextoCabecera(id)`. `CabeceraSeccion` y `CuadriculaProductos` aceptan `title` / `description` ya escritos. |
| Admin | `components/admin/AdminCabecera.jsx` (editor común), `PestanasPagina` en `ListadoAdmin.jsx`; Visítanos en `app/admin/paginas/visitanos`. |

Las páginas de categoría no tienen vista previa propia (salen en muchas direcciones): se ven al publicar.
