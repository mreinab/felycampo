# Admin · Páginas de la web — guía para conectar la base de datos

**Estado (noviembre de 2026):** tres páginas se editan desde el admin con el mismo editor y con los mismos datos que lee la web. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar (cada mensaje lo avisa con «demo»).

| Página | Admin | Datos | Reglas y campos | Lo pinta |
|---|---|---|---|---|
| Inicio (`/`) | `/admin/landing` | `src/datos/landing.js` | `src/lib/landing.js` | `components/layout/MediosLanding.jsx` |
| Sobre Fely (`/sobre-fely`) | `/admin/paginas/sobre-fely` | `src/datos/sobreFely.js` | `src/lib/sobreFely.js` | `app/[locale]/sobre-fely/SobreFelyContenido.jsx` |
| Nuestros talleres (`/talleres-fely-campo`) | `/admin/paginas/talleres` | `src/datos/talleres.js` | `src/lib/talleres.js` | `app/[locale]/talleres-fely-campo/TalleresContenido.jsx` |

Cada archivo de `src/datos/` explica campo a campo lo que guarda. Sobre Fely y Talleres se migraron tal cual desde sus antiguos `sobreFely.js` / `talleres.js` y desde `messages/*.json` (títulos de los hero y entradilla de Talleres). Se comprobó texto a texto y foto a foto, en español y en inglés, que la web enseña lo mismo que antes.

## Cómo está hecho

- **Editor común:** `components/admin/EditorPagina.jsx`. Incluye la barra con el estado, el selector Español | English con los textos que faltan, Descartar, Vista previa y Guardar y publicar. También el índice de bloques y una tarjeta por bloque. Cada página (`AdminLanding.jsx`, `AdminSobreFely.jsx`, `AdminTalleres.jsx`) solo le pasa:
  - sus **bloques**;
  - una función **campos(datos)**, en `lib/<pagina>.js`, que dice qué campos hay, de qué tipo y cuáles son obligatorios.
- **Campos:** `CampoTexto`, que admite textos de varios párrafos (lista por idioma, separados por una línea en blanco); `CampoMedio` (una foto o un vídeo); `GaleriaEditable` (varias fotos o vídeos, reordenables y con pie); `SelectorEnlace` (páginas internas); `CampoUrl` (direcciones externas).
- **Validación:** `lib/camposPagina.js`, compartida por las tres páginas. Calcula qué falta en cada idioma, qué bloque está incompleto y los errores antes de publicar. Los textos opcionales (pies de foto, «quién lo lleva») solo cuentan como pendientes si están en un idioma y no en el otro.
- **Estado del admin:** `components/admin/Paginas.jsx`, con `usePagina(id)` que devuelve `{ publicado, guardar }`.
- **Vista previa:** `lib/previa.js` y `components/layout/usePrevia.js`. El editor guarda el borrador en `localStorage` (`fc_previa_<id>`) y abre la página con `?previa=<id>`. La página lo pinta con la barra negra «Vista previa» (`BarraPrevia.jsx`). Un visitante sin borrador en su navegador ve siempre lo publicado. Una vez abierta, la vista previa se actualiza sola con cada cambio del editor.

## Al conectar la base de datos

1. **Lectura:** cambiar solo `obtenerLanding()`, `obtenerSobreFely()` y `obtenerTalleres()` para que lean de la base de datos. Cada página es un único registro con la forma de su archivo de `src/datos/`.
2. **Escritura:** `guardar(id, datos)` en `Paginas.jsx` debe llamar a la API. En el servidor hay que validar con `validarLanding` / `validarSobreFely` / `validarTalleres`, las mismas reglas que usa el editor.
3. **Archivos:** las fotos y los vídeos nuevos llegan como URL temporal `blob:`. Los vídeos de una galería llevan `#video` al final para reconocerlos. Hay que subirlos al almacén, pasar las fotos a WebP con un nombre SEO como el de las actuales y guardar la ruta definitiva. Límites de vídeo: 15 MB en galerías y en la portada de ordenador, 8 MB en la de móvil (ver `docs/admin-landing.md`).
4. **Publicar al momento:** tras guardar, `revalidatePath` de la página (`/[locale]`, `/[locale]/sobre-fely`, `/[locale]/talleres-fely-campo`).
5. **Vista previa entre dispositivos:** hoy solo funciona en el navegador donde está abierto el editor. Con base de datos, conviene guardar el borrador en el servidor y que la vista previa exija sesión de admin.
6. **Acceso:** el panel no tiene inicio de sesión. Es imprescindible antes de que se pueda publicar.

## Capítulos y talleres: añadir, mover y quitar

Bajo cada capítulo (Historia de Fely) y cada taller (Nuestros talleres) están los botones comunes de `ControlesLista.jsx`: Subir, Bajar, «Añadir … debajo» y «Quitar …» (con confirmación; tiene que quedar al menos uno). Los cambios van al borrador: nada sale hasta «Guardar y publicar» y «Descartar» los deshace. En la web se colocan solos (los capítulos alternan de lado por su posición; cada taller nuevo tiene su botón de filtro). Un capítulo o taller nuevo recibe un id fijo (`capitulo-…`, `taller-…`) que no cambia al moverlo. `EditorPagina` recibe `bloques` como función del borrador, así el índice de la izquierda cambia al momento. Lo mismo en las secciones de los ateliers y en los bloques de foto + texto de Novias y Fiesta.

## Lo que no se edita (a propósito)

- **Más de 6 fotos por capítulo** en Sobre Fely (la principal y las de las filas de dos), a petición: `MAXIMO_FOTOS_CAPITULO` en `lib/sobreFely.js`. Cada capítulo tiene una sola lista de fotos; la antigua «galería» se unió a ella. El servidor debe validarlo igual (`validarSobreFely`). Si sobra una foto en una fila de dos, la web la centra.
- **Los textos SEO (title / description)**, que siguen en `lib/seo.js`.
- **«Ver todo»**, el filtro de Talleres, que sigue en `messages`.
