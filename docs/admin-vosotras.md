# Admin · Vosotras — guía para conectar la base de datos

**Estado (noviembre de 2026):** las fotos de clientas y sus reseñas de `/atelier/vosotras` se editan desde `/admin/vosotras`, con los mismos datos que lee la web. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar (cada mensaje lo avisa con «demo»).

| Qué | Dónde |
|---|---|
| Datos (sustituto de la base de datos) | `src/datos/vosotras.js` (`VOSOTRAS`: `invitadas`, `novias`, `resenas`), con cada campo explicado arriba del archivo |
| Reglas comunes a web y admin | `src/lib/vosotras.js` |
| Web | `components/layout/GaleriaVosotras.jsx`, que lee de `lib/vosotras.js` y admite la vista previa |
| Compatibilidad | `components/layout/vosotrasFotos.js`: da los datos con la forma antigua a `CarruselClientas.jsx` y al inicio del admin |
| Admin | `components/admin/AdminVosotras.jsx` (listado y fichas) y `Vosotras.jsx` (estado) |

Se migró tal cual desde el antiguo `vosotrasFotos.js`: 18 looks de Invitadas, 23 de Novias y 2 reseñas. Se comprobó, comparando el HTML de las dos pestañas en español y en inglés, que la web enseña exactamente lo mismo que antes.

## Cómo funciona

- **Look:** las fotos de una clienta (la primera es la portada de su casilla) en una pestaña, Invitadas o Novias. El orden de la lista es el de la cuadrícula.
- **Reseña:**
  - quién la escribe ({es, en});
  - el texto de la casilla, que se intercala entre las fotos de Invitadas, una cada dos filas, en el orden de la lista, con «(...)» al final;
  - y, opcionalmente, el look de la clienta. Con look, al pulsar la casilla se abren sus fotos, y junto a ellas se lee la reseña entera.

  Los textos de la clienta se publican tal cual en los dos idiomas.
- **Ocultar / borrar:** un look o una reseña ocultos no salen en la web. Al borrar un look, su reseña se queda, pero sin fotos.
- **Vista previa:** `/atelier/vosotras?previa=vosotras`, con la página entera y el look o la reseña que se edita ya dentro. Se actualiza sola mientras se edita.

## Al conectar la base de datos

1. **Lectura:** cambiar solo `obtenerVosotras()` en `lib/vosotras.js`. `vosotrasFotos.js` y la web se adaptan solos.
2. **Escritura:** cada acción de `Vosotras.jsx` es una llamada a la API:
   - `guardarLook` (con la pestaña);
   - `guardarResena`;
   - `alternar…`;
   - `borrar…`;
   - `reordenar…`.

   En el servidor, validar con `validarLook` / `validarResena`.
3. **Fotos:** llegan como URL temporal `blob:`. Hay que subirlas al almacén, pasarlas a WebP con nombre SEO (como las de `public/img/Clientes/CLIENTAS/`) y guardar la ruta definitiva.
4. **Publicar al momento:** tras guardar, `revalidatePath('/[locale]/atelier/vosotras')`.
