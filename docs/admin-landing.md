# Admin · Landing — guía para conectar la base de datos

**Estado (noviembre de 2026):** `/admin/landing` cambia las fotos, el vídeo, los textos (español e inglés) y los enlaces de la home (`/`) con los mismos datos que lee la web. Igual que Atelier Fiesta (ver `docs/admin-atelier-fiesta.md`), todavía **no hay base de datos**: los cambios viven en memoria y se pierden al recargar.

## Qué se edita

Todo está documentado campo a campo en la cabecera de `src/datos/landing.js`. En resumen:

| Bloque | Campos |
|---|---|
| Portada (hero) | foto de ordenador, foto de móvil (opcional), vídeo de ordenador, vídeo de móvil (opcional), frase, texto del botón, enlace |
| Bloque Atelier | para Novias y para Fiesta: foto, título, texto del botón, enlace |
| Descubre a Fely | foto, título, cita (`*texto*` = cursiva), texto del botón, enlace |

- **Textos:** siempre `{ es, en }`, los dos obligatorios. El admin avisa, sin bloquear, si superan `LARGO_RECOMENDADO`.
- **Enlaces:** rutas sin idioma (`/sobre-fely`). La web les pone `/es` o `/en` delante. Solo se pueden elegir las de `paginasEnlaceLanding()` (páginas fijas más las colecciones de Fiesta visibles), y `validarLanding` lo comprueba. Si se añade una página nueva a la web, hay que añadirla ahí.
- Estos textos ya no salen de `messages/*.json`. Las claves `heroCarousel`, `splitMedia.item1/2`, `descubreFely` y `citaFelyLanding` siguen ahí, porque el editor antiguo de `/admin/diseno` y las stories las usan.

## Dónde está cada cosa

- `src/datos/landing.js`: los valores actuales. **Sustituto provisional de la base de datos.**
- `src/lib/landing.js`: `obtenerLanding()`, `slidesHeroLanding()` y `validarLanding()`, que comparten la web y el admin.
- `src/app/[locale]/page.js` → `components/layout/MediosLanding.jsx`: la home, que lee de `lib/landing.js` (y pinta la vista previa).
- `src/components/admin/AdminLanding.jsx` (bloques de la página sobre el editor común `EditorPagina.jsx`, ver `docs/admin-paginas.md`); estado en `Paginas.jsx` (`usePagina`); campos: `CampoMedio.jsx` (una foto o un vídeo), `CampoTexto.jsx` (texto en el idioma que se edita, con contador) y `SelectorEnlace.jsx` (desplegable de páginas).

## Vídeo de móvil

Si hay `hero.videoMovil`, `HeroCarousel` pone dos `<source>` (`media="(max-width: 768px)"` y el resto), y el navegador descarga solo uno. Si no lo hay, un único `src`, como siempre.

## Vista previa (como en WordPress)

Arriba a la derecha del editor están **Vista previa** y **Guardar y publicar** (en gris claro, «Publicar», mientras no hay cambios). «Vista previa» guarda el borrador en el `localStorage` del navegador (`fc_previa_landing`) y abre la home real con `?previa=landing` en una pestaña propia, que se reutiliza si ya está abierta. `components/layout/MediosLanding.jsx` pinta ese borrador con una barra negra de «Vista previa · sin publicar». Un visitante con `?previa=landing` pero sin borrador en su navegador ve lo publicado. Cuando haya base de datos, conviene que la vista previa lea un borrador guardado en el servidor y exija sesión de admin, para que las fotos subidas se vean también desde otro dispositivo.

## Al conectar la base de datos

1. **Lectura:** `obtenerLanding()` debe leer de la base de datos (es un único registro).
2. **Escritura:** `guardar(id, datos)` en `Paginas.jsx` debe llamar a la API. Valida también en el servidor con `validarLanding()`.
3. **Archivos:** hoy `CampoMedio.jsx` guarda una URL temporal `blob:`. Las fotos ya llegan comprimidas (`comprimirImagen`). Hay que subirlas al almacén, convertirlas a WebP y guardar la ruta definitiva. Los vídeos se suben tal cual, con los límites de `LIMITES_VIDEO` (`lib/landing.js`): ordenador, máximo 15 MB (aviso a partir de 10); móvil, máximo 8 MB (aviso a partir de 5). El admin no deja subir los que pasan del máximo, y avisa si duran más de 30 s, si miden más de lo que se ve (1920 px en ordenador, 1080 px en móvil) o si tienen la orientación equivocada. **El servidor debe rechazar también los que pasen del máximo**, porque el control del navegador se puede saltar. Lo ideal es que además los recomprima (H.264, 1080p o 720p en móvil, sin audio), con ffmpeg o con un servicio como Mux o Cloudinary.
4. **Publicar al momento:** tras guardar, `revalidatePath('/[locale]', 'page')`.
5. **Acceso:** igual que el resto del panel, hace falta inicio de sesión antes de que pueda publicar.
