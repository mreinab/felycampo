# Admin · Runway — guía para conectar la base de datos

**Estado (noviembre de 2026):** las colecciones de pasarela se editan desde `/admin/colecciones/runway`, con los mismos datos que enseñan `/colecciones-fely-campo` (el listado) y `/runways-<slug>` (la página de cada una). Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

| Pieza | Archivo |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/runway.js`: 9 colecciones, con cada campo explicado arriba del archivo. Migrado tal cual desde el antiguo `app/[locale]/colecciones-fely-campo/colecciones.js`. |
| Reglas comunes web + admin | `src/lib/runway.js`: colección → lo que pinta la web, dirección, campos y validación. |
| Web | `colecciones-fely-campo/page.js` (listado), `runways/[coleccion]/page.js` (metadatos y migas) + `RunwayContenido.jsx` (lo que se ve, con vista previa) y `app/sitemap.js`. |
| Admin | `components/admin/AdminRunway.jsx` (listado y ficha) y `Runway.jsx` (estado; mantiene el submenú «Runway» del menú lateral). |

Se comprobó, comparando el HTML del listado y de varias colecciones en español y en inglés (y el sitemap), que la web enseña lo mismo que antes.

## Cómo funciona

- **Una ficha por colección,** con un bloque por cada parte de su página:
  - nombre y temporada (AW/SS + año);
  - portada;
  - texto (en inglés es opcional: si falta, se enseña el español);
  - backstage;
  - looks: una foto por look, con su texto opcional;
  - vídeo del desfile: propio o, si no hay, la foto con el enlace a YouTube.
- **Dirección:** `/runways-<slug>`. Se crea con el nombre al publicar y no cambia nunca. Una colección oculta o borrada no sale en el listado ni en el sitemap, y su dirección lleva al listado (301).
- **Productos de los looks:** hoy son de ejemplo (`productosEjemplo.js`, 3 looks de La Colección). Se conservan, pero no se editan. Se podrán vincular cuando Prêt-à-porter esté en el admin.
- **Vista previa:** `/runways-<slug>?previa=runway-<slug>` (o `/runways-nueva?previa=runway-nueva` para una nueva), sin indexar. Se actualiza sola mientras se edita.

## Al conectar la base de datos

1. **Lectura:** cambiar solo `obtenerColeccionesRunway()`.
2. **Escritura:** `guardar`, `alternar`, `borrar` y `reordenar` de `Runway.jsx` llaman a la API. En el servidor, validar con `camposColeccionRunway` (vía `validarCampos`) y `validarExtraRunway`, y calcular el slug de las nuevas con `slugRunway` contra todas.
3. **Fotos y vídeos:** llegan como `blob:`. Hay que subirlos con nombre SEO, como `fely-campo-pasarela-<slug>-look-NN.webp` y `-backstage-NN.webp`.
4. **Revalidar:** `/[locale]/colecciones-fely-campo`, `/runways-<slug>` y el sitemap.
