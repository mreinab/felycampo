# Admin · Blog & Podcast — guía para conectar la base de datos

**Estado (noviembre de 2026):** los artículos del blog y los episodios del podcast de `/blog` se editan desde `/admin/blog`, con los mismos datos que lee la web. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar (cada mensaje lo avisa con «demo»).

| Qué | Dónde |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/blog.js`: `ARTICULOS` y `EPISODIOS`, con la forma de cada campo explicada arriba del archivo |
| Reglas comunes a web y admin | `src/lib/blog.js` (lectura, slugs, bloques nuevos, campos y validación) |
| Web: listado | `app/[locale]/blog/page.js` + `ListadoPodcastBlog.jsx` |
| Web: artículo | `app/[locale]/blog/[entrada]/page.js` + `ArticuloContenido.jsx` → `components/layout/BlogArticulo.jsx` |
| Admin | `components/admin/AdminBlog.jsx` (listado y fichas), `EditorBloques.jsx` (cuerpo del artículo), `Blog.jsx` (estado) |

Los datos se migraron tal cual desde el antiguo `app/[locale]/blog/blog.js`: 5 artículos y 1 episodio. Se comprobó, comparando el HTML de las 14 páginas (listado, 5 artículos y la URL del episodio, en español y en inglés), que la web enseña exactamente lo mismo que antes. Los párrafos seguidos se juntaron en bloques «texto». La categoría, el autor y los datos del episodio que no se veían (notas, número, fecha) no se migraron, a petición.

## Cómo funciona

- **Artículo:** título, fecha, foto de portada y resumen (tarjeta del listado y Google), más el cuerpo en **bloques**:
  - `texto`: uno o varios párrafos. Se respetan los saltos de línea y los espacios (`white-space: pre-wrap`).
  - `subtitulo`.
  - `foto`: con pie opcional y `alt` opcional; si falta el `alt`, se usa el pie.
  - `fotos`: de 2 a 4, una al lado de otra.
  - `cita`: frase y quién la dice (opcional).
- **Episodio:** título, enlace (YouTube…), foto de portada y duración (texto libre). No tiene página propia: la tarjeta abre el enlace en una pestaña nueva.
- **Dirección (slug):** se crea del título en español al publicar por primera vez (`slugDesdeTitulo`) y **no cambia nunca**, aunque cambie el título, para no romper enlaces ni perder posiciones en Google. Artículos y episodios comparten el espacio de slugs.
- **Publicado / oculto:** un artículo oculto no sale en el listado ni en el sitemap y su URL lleva al blog (301). Borrar hace lo mismo, pero sin vuelta atrás.
- **Vista previa:**
  - de un artículo: `/blog/<slug>?previa=blog-<slug>`;
  - de un artículo nuevo: `/blog/nuevo?previa=blog-nuevo`. La página lo pinta con el borrador aunque aún no exista;
  - de un episodio: `/blog?previa=podcast-<slug>`, que cambia o añade su tarjeta.

  Se actualiza sola mientras se edita (ver `docs/admin-paginas.md`).

## Navegación y SEO de cada artículo (automático, sale de los datos)

- **Navegación:** el menú «Blog & Podcast» lleva a `/blog`. El listado pinta un enlace rastreable (`<a href>`, renderizado en el servidor) a cada artículo publicado, del más reciente al más antiguo.
- **Metadatos** (`generateMetadata` en `[entrada]/page.js`):
  - título «<título> | Blog Fely Campo» y descripción = resumen;
  - `canonical` y `hreflang` es / en / x-default;
  - Open Graph (`type: article`, imagen = portada) y Twitter.
- **Datos estructurados:** `BlogPosting` (titular, resumen, portada, fecha, idioma; la marca como autor y editor) y `BreadcrumbList` Fely Campo › Blog & Podcast › artículo. Ver `articuloBlog()` en `lib/datosEstructurados.js`.
- **Sitemap:** cada artículo publicado, en los dos idiomas y con `lastmod` = su fecha. Los ocultos y los borrados no salen, y su URL redirige (301) al blog.
- **Vista previa:** `noindex`, sin datos estructurados.

## Al conectar la base de datos

1. **Lectura:** cambiar solo `obtenerArticulos()` y `obtenerEpisodios()` en `lib/blog.js`.
2. **Escritura:** cada acción de `Blog.jsx` es una llamada a la API:
   - `guardarArticulo` / `guardarEpisodio` (crear con slug nuevo, o actualizar por slug);
   - `alternar…` (publicar / ocultar);
   - `borrar…`;
   - `reordenarEpisodios`.

   En el servidor, validar con `validarArticulo` / `validarEpisodio`, y calcular el slug de los nuevos con `slugDesdeTitulo` contra todos los existentes.
3. **Archivos:** las fotos nuevas llegan como URL temporal `blob:`. Hay que subirlas al almacén, pasarlas a WebP con nombre SEO (como las de `public/img/blog/NN-slug/`) y guardar la ruta definitiva.
   - **Ojo con la «ñ»:** un archivo guardado con la «ñ» en forma Unicode NFD no lo sirve Next.js (da 404). Normalizar los nombres a NFC o quitar los acentos.
4. **Publicar al momento:** tras guardar, `revalidatePath('/[locale]/blog')` y `revalidatePath('/[locale]/blog/<slug>')`, y el sitemap.
5. **Acceso:** el panel no tiene inicio de sesión. Es imprescindible antes de publicar de verdad.
