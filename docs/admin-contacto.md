# Admin · Contacto y redes

**Estado (noviembre de 2026):** «Contacto y redes» (menú «Dónde encontrarnos», `/admin/contacto`) es el único sitio de la web para el contacto general y las redes sociales. Todavía **no hay base de datos**: lo publicado vive en memoria y se pierde al recargar.

## Qué se edita y dónde sale

| Bloque | Campos | Dónde sale |
|---|---|---|
| Email de contacto | email | El aviso de error de los formularios de cita y de solicitud de atelier (`errorEnvio` con `{email}` en `messages/*.json`) |
| Botón de WhatsApp | número, mensaje ya escrito (es/en) | El botón flotante de todas las páginas (`BotonWhatsapp.jsx`). En el admin, «Probar el botón» abre WhatsApp con lo escrito. |
| Redes sociales | Instagram, Facebook, YouTube, TikTok, Pinterest, LinkedIn (vacía = no sale) | La columna «Síguenos» del pie (`Footer.jsx`) y `sameAs` de la organización para Google (`lib/datosEstructurados.js`) |

No se puede publicar con un email mal escrito, un WhatsApp sin prefijo (+34…) o un enlace que no empiece por https://.

**Teléfono y horario generales: quitados el 2026-11-07**, junto con `/ayuda/atencion-cliente` y `/ayuda/envios` (hablaban de la tienda online, que no existe; ahora redirigen con 301 a Visítanos, ver `RUTAS_ELIMINADAS` en `src/proxy.js`). Eran el único sitio donde salían; cada atelier tiene sus teléfonos y su horario.

**Los ateliers** (dirección, teléfonos, WhatsApp, horario) tienen su propia página (ver `docs/admin-ateliers.md`). Sus puntos en el mapa toman de ahí la dirección y el teléfono (`sede` en `src/datos/puntosVenta.js`, `conDatosDeSede` en `lib/puntosVenta.js`): ya no hay dos copias.

## Piezas

| Pieza | Archivo |
|---|---|
| Datos | `src/datos/contacto.js` (`CONTACTO`), migrado de `BotonWhatsapp.jsx`, `Footer.jsx`, `lib/datosEstructurados.js`, `/ayuda/atencion-cliente` y `messages/*.json` (`whatsappFlotante.mensaje`, `atencionCliente.horario`, que se han quitado de ahí). |
| Reglas | `src/lib/contacto.js`: `obtenerContacto`, `REDES_SOCIALES`, `redesConEnlace`, `enlaceTelefono`, `enlaceWhatsapp`, `camposContacto`, `validarExtraContacto`. |
| Admin | `components/admin/AdminContacto.jsx`, ruta `app/admin/contacto/page.js`; estado en `Paginas.jsx` (id `contacto`). Sin vista previa: son datos que salen en todas las páginas. |

## Para conectar la base de datos

1. Un registro único con la forma de `CONTACTO`.
2. `obtenerContacto()` lee de él; la web no cambia (ojo: lo usan componentes de cliente como el pie y el botón de WhatsApp, así que hay que pasárselo desde el servidor o servirlo en una ruta pública).
3. «Guardar y publicar» llama a `guardar('contacto', datos)` de `Paginas.jsx`.

**No está aquí (a propósito):** el email al que llegan los formularios (`EMAIL_POR_DEFECTO` / variables de entorno en `lib/emailFormularios.js`) es configuración técnica del servidor.
