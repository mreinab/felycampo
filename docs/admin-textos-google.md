# Admin · Textos de Google

**Estado (noviembre de 2026):** el título y la descripción con que sale cada página fija en Google (y al compartirla por WhatsApp o en redes) se editan desde «Textos de Google» (menú «Páginas de la web», `/admin/paginas/textos-google`). Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

## Qué se edita

28 páginas en 5 bloques (Inicio y Sobre Fely · Atelier y colecciones · Prêt-à-porter · Dónde encontrarnos · Ayuda y textos legales). Por cada página, en español e inglés:

| Campo | Dónde sale | Largo recomendado |
|---|---|---|
| Título (`title`) | `<title>`, la línea azul de Google, la pestaña del navegador, Open Graph y Twitter | 60 |
| Descripción (`description`) | `<meta name="description">`, el texto bajo el título en Google, Open Graph y Twitter | 160 |
| Título principal oculto (`h1`) | Solo en las páginas que empiezan con una foto y no tienen un título visible (inicio, Atelier, Vosotras, Prêt-à-porter): `<h1 class="sr-only">` | 90 |

Al lado de cada página, «Así se vería en Google»: una imitación aproximada del resultado (Google corta por ancho, no por letras). Pasarse del largo recomendado avisa, pero deja publicar. **No deja publicar** si falta un texto o si dos páginas tienen el mismo título o la misma descripción en el mismo idioma (`validarExtraSeo`).

**Fijos a propósito (no salen en el admin):** las páginas privadas (carrito, wishlist, mi cuenta) y las confirmaciones de cita. No salen en Google (noindex), pero siguen en `src/datos/seoTextos.js`.

**Se generan solos** a partir de sus propios datos, así que no están aquí: las fichas de producto (`lib/atelierProductoSeo.js` y `[producto]/page.js`), las categorías de Fiesta y Novias (`lib/atelierCategoriaSeo.js`), las colecciones de Runway y los artículos del blog.

## Piezas

| Pieza | Archivo |
|---|---|
| Datos | `src/datos/seoTextos.js` (`SEO_TEXTOS`): una entrada por ruta (sin idioma) con `title`, `description` y, a veces, `h1`, cada uno en `{ es, en }`. Migrado de `lib/seoTextos.js`, que antes guardaba `{ es: { title, … }, en: { … } }` (mismos textos, comprobado uno a uno). |
| Reglas | `src/lib/seoTextos.js`: `obtenerSeoTextos`, `GRUPOS_SEO` (las páginas del admin y su nombre), `camposSeo`, `validarExtraSeo`, `LARGO_TITULO`, `LARGO_DESCRIPCION`. |
| Web | `lib/seo.js`: `textosSeo(ruta, locale)` devuelve `{ title, description, h1 }` en ese idioma y `metadataPagina()` lo usa; las páginas no cambian. `app/sitemap.js` saca de ahí la lista de rutas fijas. |
| Admin | `components/admin/AdminTextosGoogle.jsx` (+ `.module.css`), ruta `app/admin/paginas/textos-google/page.js`; estado en `Paginas.jsx` (id `textos-google`). |

## Para conectar la base de datos

1. Un registro único con la forma de `SEO_TEXTOS` (o una fila por ruta).
2. `obtenerSeoTextos()` lee de él. `generateMetadata` ya se ejecuta en el servidor, así que no hace falta nada más en la web.
3. «Publicar» llama a `guardar('textos-google', datos)` de `Paginas.jsx`.
4. Ojo con la caché: si las páginas se generan estáticas, al publicar hay que revalidarlas (`revalidatePath`) para que Google vea el texto nuevo.
