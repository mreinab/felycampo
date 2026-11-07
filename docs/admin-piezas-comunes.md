# Admin · Menú, Pedir cita y newsletter

**Estado (noviembre de 2026):** las piezas que salen en muchas páginas a la vez se editan desde «Menú, Pedir cita y newsletter» (menú «Páginas de la web», justo debajo de Página de inicio; `/admin/paginas/piezas-comunes`). Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

## Qué se edita y dónde sale

| Bloque | Campos | Dónde sale |
|---|---|---|
| Fotos del menú | Por cada apartado (Sobre Fely, Atelier, Colecciones, Dónde encontrar Fely Campo): la «Foto grande» y una por enlace. Además, la «Foto de entrada» del menú del móvil. | El menú de la web (`Navbar.jsx`): la foto grande es la primera tarjeta del desplegable y la portada del apartado en el móvil; la de cada enlace se ve al pasar el ratón. La segunda tarjeta del desplegable repite la foto de su enlace. |
| Banda «Pedir cita» | Foto de fondo, título y botón (es/en) | Antes del pie, en casi todas las páginas (`PedirCita.jsx`, foto con parallax en `PedirCitaFondo.jsx` vía `--foto-pedir-cita`). Si el título lleva un punto (o una coma), lo de detrás va a la segunda línea. |
| Tarjetas de los ateliers | Una foto por atelier (opcional) y el texto del botón (es/en) | Las tarjetas «Atelier … & Showroom» encima de la banda (`AteliersCita.jsx`). Sin foto propia sale la de portada del atelier; **Madrid la necesita** porque su portada es un vídeo (el admin no deja publicarla vacía). |
| Ventana de la newsletter | Foto, título y texto (es/en) | La ventana que abre «Newsletter» en el pie (`NewsletterModal.jsx`). |

Sin vista previa: son piezas de todas las páginas; «Ver la página publicada» abre la de inicio.

## Piezas

| Pieza | Archivo |
|---|---|
| Datos | `src/datos/piezasComunes.js` (`PIEZAS_COMUNES`), migrado tal cual de `Navbar.jsx` (`SUBMENU_STRUCTURE`), `PedirCita.module.css`, `AteliersCita.jsx`, `NewsletterModal.jsx` y `messages/*.json` (`pedirCitaLanding` y `newsletterPopup.titulo` / `subtitulo`, que se han quitado de ahí). |
| Reglas | `src/lib/piezasComunes.js`: `obtenerPiezasComunes`, `DESPLEGABLES_MENU` (apartados y enlaces con su nombre en la web), `camposPiezasComunes`. Las fotos de las tarjetas de los ateliers se validan en el propio editor (dependen de la portada de cada atelier, `lib/ateliers.js`; así el menú, que es de cliente, no carga los datos de los ateliers). |
| Admin | `components/admin/AdminPiezasComunes.jsx` (+ `.module.css`), ruta `app/admin/paginas/piezas-comunes/page.js`; estado en `Paginas.jsx` (id `piezas-comunes`). |

## Para conectar la base de datos

1. Un registro único con la forma de `PIEZAS_COMUNES`.
2. `obtenerPiezasComunes()` lee de él; la web no cambia. Ojo: el menú y la newsletter son componentes de cliente, así que hay que pasárselo desde el servidor (por ejemplo desde `[locale]/layout.js`) o servirlo en una ruta pública.
3. «Publicar» llama a `guardar('piezas-comunes', datos)` de `Paginas.jsx`.
4. Las fotos subidas son URL temporales (blob) hasta que haya almacén de archivos, como en el resto del admin (ver `docs/admin-landing.md`).

**No está aquí (a propósito):** los nombres de los enlaces del menú y su orden, que son la estructura de la web (`messages/*.json`, `navbar`).
