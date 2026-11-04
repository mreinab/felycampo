# Auditoría SEO — Fely Campo (web nueva vs. documento SEO vs. felycampo.com)

Fecha: 4 de noviembre de 2026 · Rama/commit auditado: `main` = `2d38c1c`
Documento de referencia: "Revisión de textos y propuesta SEO" (22/10/2026). `SEO-TEXTOS-FELY-CAMPO.md` ya no está en el repo; se ha usado `docs/textos-web-seo.md` y `SEO-INFORME.md`.

**Método.** Auditoría de solo lectura (no se ha tocado código). `next build` + `next start` en local con la configuración del despliegue definitivo (`SITIO_INDEXABLE=true`, `NEXT_PUBLIC_SITE_URL=https://felycampo.com`, `NEXT_PUBLIC_GTM_ID=GTM-T2MJKZHT`, `NEXT_PUBLIC_META_PIXEL_ID=1258085321257704`). Se ha extraído del **HTML renderizado** de las **746 URLs del sitemap** (ES + EN): `<title>`, meta description, H1, canonical, robots, hreflang, Open Graph, Twitter Card, JSON-LD, `alt` de imágenes y etiquetas de medición. Las **801 URLs del sitemap actual de felycampo.com** (`wp-sitemap.xml`) se han probado una a una contra el servidor local, con y sin barra final. Lighthouse móvil (v12.6) sobre la web nueva en local y sobre felycampo.com.

Leyenda: ✅ correcto · ⚠️ mejorable / pendiente de confirmar · ❌ incorrecto o falta.

---

## 0. Estado tras las correcciones (rama `seo/fixes-auditoria`, 04/11/2026)

Verificado sobre una nueva compilación de producción (`next build` + `next start` con las variables definitivas), en el HTML renderizado y con `curl -I`. Un commit por punto.

| Punto | Estado | Commit | Comprobación |
|---|---|---|---|
| B1 Variables de Netlify | ⏳ las pone el cliente | — | Pendiente: tras el redespliegue, revisar `robots.txt` y la meta robots en producción |
| B2 facebook-domain-verification | ✅ | `2bba558` | `<meta name="facebook-domain-verification" content="52ua5uh83t9xk46o8js2214qt0aczn">` en todas las páginas |
| B3 Metas "undefined" | ✅ | `9484027`, `fd3f4c2` | 0 metas con "undefined". Ej.: «Vestido Ciruela en color ciruela, de la colección de prêt-à-porter de Fely Campo. …». En inglés, sin el color, porque solo existe en español |
| B4 Metas EN de colecciones | ✅ | `8e31889` | Propias por nombre y temporada (133–139 caracteres). Ej.: «Zigurat (SS24), a luxury ready-to-wear runway collection by Spanish designer Fely Campo. …» |
| M3 max-image-preview:large | ✅ | `0afdeb3` | Indexables: `index, follow, max-image-preview:large` (también en `googlebot`). Privadas: siguen con `noindex, nofollow` |
| M10 Teléfonos `tel:` | ✅ | `8012558` | `tel:+34923190053`, `+34659006257`, `+34985738346` y `+34661585404` en las 3 fichas y en /visita, con el mismo aspecto de texto |
| M11 H1 | ✅ | `7c07100` | «Colecciones y desfiles» (EN: «Collections and runway shows»), «Boutiques selectas» y «Prêt-à-porter Tops y Camisetas» (EN: «Tops & T-shirts»). Usan claves propias: el menú sigue con «Runway» y «Tops y Camisas» |
| M12 Una URL por colección | ✅ | `5435325` | `/es/runways/la-coleccion` y `/en/runways/dreaming` → 301 → `/…/runways-{slug}` (200) |
| M13 Cadenas de redirección | ✅ | `2eef2a4` | `/terminos-y-condiciones(/)` → 301 → `/es/legal/terminos`; `/contacto/` → 301 → `/es/visita-fely-campo`; `/lista-de-deseos/`, `/lost-password/` y `/mi-cuenta/lost-password/` → 301 → `/es/pret-a-porter` (el mismo destino que `/mi-cuenta/`); `/es/blog` y `/en/blog` → **301** → `/…/podcast`. Todos llegan a 200 en un salto |
| M1 Menú rastreable · M2 JSON-LD | ⏳ otra rama | — | Acordado hacerlo después |

---

## 1. Resumen ejecutivo

- **Se puede publicar** una vez resueltos 4 bloqueantes pequeños. El trabajo de base es muy sólido: los 23 titles y 22 de 23 metadescripciones del documento coinciden **carácter a carácter**; no hay ningún title duplicado en 746 URLs; canonical autorreferente y absoluto en el 100 %; hreflang es/en/x-default recíproco en el 100 %; un único H1 por página, y el oculto con `sr-only`.
- **Migración:** las **800 URLs indexadas** de felycampo.com redirigen con **301 directo a una página 200** (sin cadenas), con y sin barra final, y también en mayúsculas. Es el riesgo n.º 1 de una migración y está bien cubierto.
- **Bloquea la publicación:** (1) las variables de entorno de producción en Netlify (sin ellas, la web sale con `noindex` y `Disallow: /`, como ahora en staging); (2) la verificación de dominio de Facebook, que existe en la web actual y falta en la nueva; (3) tres fichas de prêt-à-porter con la meta "undefined …"; (4) la versión inglesa de las 9 colecciones de pasarela, que tiene la metadescripción en español.
- **Lo más importante a mejorar después:** la navegación principal no está en el HTML (los submenús solo se pintan al abrirlos), así que desde la home **no hay enlaces rastreables a /pret-a-porter, /podcast ni a las colecciones**. Tampoco hay JSON-LD de Organization, LocalBusiness ni Product. Falta `max-image-preview:large`, que la web actual sí tiene. Y el LCP en móvil es alto por imágenes de portada muy pesadas.
- **Rendimiento frente a la web actual:** la nueva puntúa **68** en Lighthouse móvil frente a **34–36** de la actual, con un TBT 4–6 veces menor. Pero el LCP es peor en la home y en Novias (ver §2, M5).

---

## 2. Bloqueantes (❌) — arreglar antes de publicar

| # | Problema | Dónde | Solución propuesta |
|---|---|---|---|
| B1 | **Variables de entorno de producción.** Sin `SITIO_INDEXABLE=true` la web genera `<meta name="robots" content="noindex, nofollow">` en todas las páginas y `robots.txt` = `Disallow: /`. Es lo que sirve hoy felycampo.netlify.app (correcto para staging, desastroso en producción). Sin `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_META_PIXEL_ID` no se carga ni GTM ni el Pixel. | `src/lib/seo.js:29-30`, `src/app/robots.js`, `src/components/layout/Analitica.jsx`; panel de Netlify | En el contexto **Production** de Netlify: `SITIO_INDEXABLE=true`, `NEXT_PUBLIC_SITE_URL=https://felycampo.com`, `NEXT_PUBLIC_GTM_ID=GTM-T2MJKZHT`, `NEXT_PUBLIC_META_PIXEL_ID=1258085321257704`. Son de build (`robots.txt` es estático y `NEXT_PUBLIC_*` se incrusta al compilar), así que hay que **redesplegar** después de ponerlas. Verificado en local: con ellas, robots y metas salen bien. |
| B2 | **Falta la meta `facebook-domain-verification`** (`52ua5uh83t9xk46o8js2214qt0aczn`). La web actual la tiene en todas las páginas; sin ella se pierde la verificación del dominio en Meta Business (eventos del Pixel y anuncios). | `src/app/[locale]/layout.js` (metadata) | Añadir `other: { 'facebook-domain-verification': '52ua5uh83t9xk46o8js2214qt0aczn' }` al `metadata` del layout, o verificar por DNS (TXT) en Meta Business. |
| B3 | **Metadescripción "undefined …"** en 3 fichas × 2 idiomas: `vestido-ciruela`, `top-lencero` y `chaqueta` (`/es` y `/en`). Ejemplo: «undefined Diseñada y confeccionada en Salamanca. Compra online en Fely Campo.» (77 caracteres, y duplicada entre las tres). | `src/app/[locale]/pret-a-porter/[producto]/page.js:41` (genera la meta) + `src/components/layout/tiendaProductos.js:287, 301, 315` (los 3 productos sin `descripcion`) | Añadir `descripcion` a esos 3 productos y, en `page.js:41`, no concatenar si falta (`[producto.descripcion, sufijo].filter(Boolean).join(' ')`). |
| B4 | **Versión inglesa de las 9 colecciones de pasarela con la meta en español** (idéntica a la ES): `/en/runways-la-coleccion`, `-dreaming`, `-self-world`, `-lei-zu`, `-the-way-here`, `-zigurat`, `-tempore`, `-nagare`, `-diafonia`. Google lo trata como contenido duplicado entre idiomas y muestra un snippet en español a usuarios en inglés. | `src/app/[locale]/runways/[coleccion]/page.js` (metadata) + `colecciones.js` (solo hay `descripcion` en español) | Añadir `descripcion: { es, en }` en `colecciones.js` y usar la del idioma, o una descripción EN genérica por colección. |

---

## 3. Mejorables (⚠️) — ordenados por impacto

**M1. Navegación principal no rastreable (impacto alto en enlazado interno).**
En el HTML servido de la home solo hay 14 enlaces internos únicos. **No hay ningún enlace a `/pret-a-porter`, `/podcast`, `/atelier/vosotras`, `/talleres-fely-campo` ni a las colecciones** de pasarela. Las entradas existen en el Navbar (`src/components/layout/Navbar/Navbar.jsx`, `SUBMENU_STRUCTURE`), pero los paneles solo se montan al pasar el ratón o al tocar, y Google no interactúa. La web actual enlaza Atelier Novias, Atelier Fiesta, Colecciones, Runways, Blog y Puntos de venta desde el menú. Esto también juega en contra del objetivo del documento de dar **más peso al prêt-à-porter**: hoy la home no enlaza /pret-a-porter.
→ Renderizar siempre los enlaces de los submenús en el DOM (ocultos con CSS mientras están cerrados, no desmontados), o hacer que los elementos de primer nivel sean `<a href>`. Alternativa mínima: un bloque de enlaces en el footer con Prêt-à-porter, Podcast, Colecciones y los 3 ateliers.

**M2. Sin JSON-LD de entidad (Organization, LocalBusiness, Product).**
Solo hay `BreadcrumbList` en 80 páginas de categorías de Atelier. No hay `Organization` en la home, ni `ClothingStore`/`LocalBusiness` en las 3 fichas de atelier, ni `Product` en las fichas. (La web actual **tampoco** tiene JSON-LD, así que no se pierde nada; pero el documento lo espera y es la mejor palanca de SEO local.)
→ `Organization` (nombre, logo, `sameAs` Instagram/YouTube) en el layout de la home; `ClothingStore` con `address`, `telephone` y `geo` en `/atelier-fiesta/{ciudad}`, alimentado de `ubicaciones.js` para que coincida con lo visible. `Product` en las fichas **sin precio** (la web ya no muestra precios): con `name`, `image`, `brand` y `description`. `BreadcrumbList` en el resto de páginas internas.

**M3. Falta `max-image-preview:large`.**
La web actual lo tiene en todas las páginas (`<meta name='robots' content='max-image-preview:large'>`). La nueva, en modo indexable, no emite meta robots. Sin esa directiva, Google puede limitar el tamaño de las imágenes en Discover y en los resultados.
→ En `metadataPagina` (`src/lib/seo.js`), para páginas indexables: `robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } }`.

**M4. La 404 ya no existe: todo redirige.**
Por petición del cliente (04/11), cualquier URL desconocida se redirige con un 308 al nivel superior (`/es/no-existe` → `/es`), y los slugs de ficha inexistentes van a su listado. Ventaja: ningún usuario ve un error. Riesgo: Google trata las redirecciones masivas a la home como **soft 404**, y una URL basura enlazada desde fuera nunca desaparece del índice.
→ Mantenerlo para patrones conocidos y devolver un 404 real (con la página bonita, que sigue en `src/app/[locale]/not-found.js`) para lo demás. Si no, al menos usar 301 y vigilar el informe de "soft 404" de Search Console.

**M5. Rendimiento móvil: LCP alto por imágenes de portada pesadas.**

| Página (móvil, Lighthouse simulado) | Rendimiento | LCP | CLS | TBT | Peso total |
|---|---|---|---|---|---|
| Nueva `/es` | 68 | 12,9 s | 0 | 320 ms | 4,3 MB |
| Nueva `/es/atelier/novias` | 68 | 42,7 s | 0 | 290 ms | 11,2 MB |
| Nueva `/es/pret-a-porter` | 68 | 19,3 s | 0 | 310 ms | 6,6 MB |
| Actual `felycampo.com/` | 34 | 8,9 s | 0 | 1.850 ms | 8,1 MB |
| Actual `/atelier-novias/` | 36 | 20,2 s | 0 | 1.360 ms | 7,5 MB |

La portada de Novias pesa 3,3 MB (4480 px, sustituida hoy) y se sirve igual a móvil y escritorio. En la home, el LCP es el logo, que entra con animación. Ninguna imagen usa `srcset`/`sizes`.
→ Variantes responsive (`<picture>`/`srcset` o `next/image`) para las portadas, con una versión de ~1200 px para móvil, sin tocar la calidad de la de escritorio. `fetchpriority="high"` en la imagen de portada. Que la animación de entrada del logo y del hero no retrase el primer pintado.

**M6. Titles largos (> 60 caracteres): 422 URLs.**
Son casi todas fichas de Atelier, con el patrón «{Look} | Vestido de novia a medida | Fely Campo». Además, 3 fichas de ciudad en inglés (65–68 caracteres) y 5 artículos del podcast (65–83). Los 23 titles del documento cumplen.
→ En fichas de Atelier, acortar el sufijo («{Look} | Novia a medida | Fely Campo»). En el podcast, quitar «| Blog Fely Campo» cuando el title ya pasa de 55.

**M7. Metadescripciones fuera de 120–160 caracteres: 116 URLs.**
Las más visibles:
- Más largas que el máximo, pero son los textos del propio documento: `/es/sobre-fely` (166), `/es/talleres-fely-campo` (174) y `/es/responsabilidad` (162). Se cortarán en el snippet.
- Fichas de prêt-à-porter generadas (85–117).
- Legales (80–107).
- Versión inglesa de /pret-a-porter y categorías (100–118).

→ Confirmar con el cliente si se recortan las 3 del documento. Para las fichas, ampliar la plantilla con categoría y color.

**M8. Metadescripciones duplicadas en fichas generadas (15 grupos).**
- 18 fichas de novia comparten «Vestido Novia nueva colección 26/27 …».
- 14 fichas de la sección Fiesta comparten «Pieza de la colección Prêt-à-porter, Fiesta. Colores y tallas disponibles próximamente…». Además, esta meta habla de *tallas*, que ya no se muestran.
- 3 fichas de fiesta comparten «RAYA DIPLOMATICA ANCHA / RAYA DIPLOMATICA FINA …», en mayúsculas.
- 2 fichas de fiesta comparten la de brocado.

→ Las metas de ficha deberían incluir el nombre del look. Revisar y corregir las de `fiestaProductos.js` y `noviaProductos.js`.

**M9. "Compra online" en metas de prêt-à-porter, cuando ya no hay envíos ni devoluciones.**
El cliente ha confirmado hoy que no habrá envíos ni devoluciones. Sin embargo, la meta de `/pret-a-porter`, la de sus 5 categorías y la de todas las fichas terminan en «Compra online». La versión inglesa dice «Shop online». `/ayuda/envios` sigue publicada y en el sitemap. → Ver pendientes del cliente (P1).

**M10. Teléfonos de los ateliers sin enlace `tel:`.**
En `/atelier-fiesta/{ciudad}` y `/visita-fely-campo` los teléfonos son texto plano. En el mapa de `/puntos-de-venta-fely-campo` sí llevan enlace con `+34`, y el de atención al cliente también (`tel:+34683703644`).
→ Envolverlos en `<a href="tel:+34…">` (`AtelierDetalle.jsx:77`, `ListadoUbicaciones.jsx:74`).

**M11. H1 visibles cortos o poco descriptivos.**
- `/colecciones-fely-campo` → «Runway»: no coincide con el title, que habla de «Colecciones de moda y desfiles».
- `/puntos-de-venta-fely-campo` → «Boutique Selectas»: falta concordancia, debería ser «Boutiques selectas».
- `/podcast` → «Podcast».
- Las categorías de prêt-à-porter dicen «Prêt-à-porter Tops y Camisas», cuando la URL y el title dicen «camisetas».

Son coherentes en tema, pero un H1 más descriptivo sumaría: por ejemplo, «Colecciones y desfiles», «Boutiques selectas» o «Blog y podcast».

**M12. URLs duplicadas de colecciones.**
`/es/runways/la-coleccion` y `/es/runways-la-coleccion` responden las dos con 200: hay una reescritura en `next.config.mjs`. El canonical de ambas apunta a `/es/runways-la-coleccion`, así que no rompe nada, pero es mejor una sola URL.
→ Un 301 de `/:locale/runways/:slug` a `/:locale/runways-:slug`.

**M13. Redirecciones con cadena o con código temporal (fuera del sitemap actual).**
- `/lista-de-deseos/`, `/lost-password/`, `/mi-cuenta/lost-password/` y `/terminos-y-condiciones/` hacen 308 → 307 → 308 → 200 y acaban en `/es`, cuando deberían ir a su equivalente.
- `/contacto/` hace 308 → 307 → 301 hasta `/es/visita-fely-campo`.
- `/es/blog` hace un **307** a `/es/podcast` (`next.config.mjs`, `permanent: false`).

→ Añadir esas 5 rutas al mapa exacto `REDIRECCIONES_301`: `/terminos-y-condiciones` → `/es/legal/terminos`, `/contacto` → `/es/visita-fely-campo` y las de cuenta → `/es`. Poner `permanent: true` en `/:locale/blog`.

**M14. Contenido del blog antiguo no migrado.**
De los 19 artículos del blog actual, **5** tienen artículo equivalente en `/podcast/…`. Los otros 14 redirigen con 301 a la sección más afín (por ejemplo, `/vestidos-de-invitada-de-boda/` → `/es/atelier/fiesta`). No se pierde el enlace, pero sí el contenido que posicionaba por esas búsquedas.
→ Revisar en Search Console cuáles tienen clics, y migrar esos artículos.

**M15. Fichas antiguas de WooCommerce.**
De las 680 URLs de `/producto/…`, 286 van a su ficha equivalente, 235 a la colección de pasarela del look y 160 al listado de su sección. Es razonable, pero esas 160 son redirecciones "genéricas" que Google puede tratar como soft 404 si eran productos con tráfico.

**M16. GTM en `<body>` en vez de `<head>`, y posible Pixel duplicado.**
El snippet de GTM y el `<noscript>` están en las 746 páginas y con Consent Mode v2 (`denied` por defecto, Pixel solo tras aceptar Marketing): ✅. Pero el script queda al inicio de `<body>`, no en `<head>` como recomienda Google. Es aceptable con `next/script`. Además, en la web actual el Pixel está **también** incrustado aparte de GTM.
→ Confirmar que el contenedor GTM-T2MJKZHT **no** dispara también el Pixel, para no contar cada PageView dos veces.

**M17. Verificación de Google Search Console.**
La web actual no usa meta `google-site-verification`, así que probablemente verifica por DNS o archivo. La nueva tampoco la tiene.
→ Confirmar el método. Si es un archivo `google*.html`, copiarlo a `public/`.

**M18. Imágenes con `alt` vacío: 10.180 de 20.074.**
Ninguna imagen carece del atributo `alt`. Las de `alt=""` son decorativas o están repetidas en carruseles (válido para accesibilidad), pero muchas son fotos de producto y de galería, que podrían posicionar en Google Imágenes. La web actual usa alts descriptivos como «diseñadora de moda Fely Campo Salamanca».
→ Dar `alt` descriptivo al menos a la primera foto de cada ficha y a las de las galerías de los ateliers. El logo sí tiene `alt="Fely Campo"` y enlaza a la home ✅.

**M19. www y http.**
Hoy `www.felycampo.com` y `http://felycampo.com` redirigen con 301 a `https://felycampo.com/`.
→ Al apuntar el dominio a Netlify, configurar `felycampo.com` como dominio principal y `www` como alias con redirección, para mantener ese comportamiento. Es configuración del hosting y no se puede probar en local.

**M20. Imágenes antiguas `/wp-content/uploads/…`.**
Dan 404, porque el proxy excluye las rutas con extensión. Es aceptable si no hay tráfico de Google Imágenes.
→ Mirar en Search Console (búsqueda de imágenes) y, si hay tráfico, redirigir las principales.

---

## 4. Pendiente de confirmar con el cliente

Lista lista para enviar:

1. **Venta online.** Se ha quitado "Envíos y devoluciones" porque no habrá envíos ni devoluciones. ¿Se puede seguir diciendo «Compra online» en las metas de prêt-à-porter? ¿Qué hacemos con `/ayuda/envios` y `/ayuda/atencion-cliente`? (Ver M9.)
2. **«Diseñado & confeccionado en Salamanca desde 1997»** y «Diseñada y confeccionada en Salamanca» (metas de fichas; en inglés, «made in Salamanca»). El documento pedía no prometerlo sin confirmar. Además, /talleres-fely-campo habla también de talleres de la sierra de Castilla y León. ¿Toda la confección se hace en Salamanca?
3. **Sostenibilidad.** `/responsabilidad` lleva la etiqueta «Manifiesto sostenible» y el texto «moda de autor 100 % hecha en España» y «slow fashion». ¿Está confirmado? (En `/runways-la-coleccion` no se han encontrado afirmaciones de sostenibilidad.)
4. **«Más de 50 años»** en dos textos del podcast (`blog.js:101`, `blog.js:411`), frente a «más de cinco décadas» en el resto. Son equivalentes; ¿se unifica?
5. **Oviedo.** El title es «Atelier de novia y fiesta **a medida** en Oviedo», pero la ficha dice «Espacio dedicado a colecciones de fiesta. Además de contar con una sección de colecciones de novia», y la web actual indica que el diseño de novia a medida con Fely solo se hace en Salamanca y Madrid. Propuesta: **«Atelier de fiesta y novia en Oviedo | Fely Campo»** (48 caracteres).
6. **Salamanca.** La meta menciona «colecciones prêt-à-porter». La ficha dice que cuenta con una sección de la línea prêt-à-porter: ¿confirmado?
7. **Formulario de cita sin elegir atelier.** Fue una decisión del cliente (un solo email de equipo). La web actual sí deja elegir atelier, y el documento lo pedía. Coherencia: la meta de `/visita-fely-campo/cita` ya se adaptó y no dice «Elige atelier». ¿Se mantiene así?
8. **Direcciones.** Según el cliente, son «C/ Laguna Negra 17» (el PDF decía 17-19) y «C/ Gil de Jaz 15». Ojo: el mapa embebido de la web actual usa «Gil de Jaz 5». Conviene revisar que la ficha de **Google Business Profile** de Oviedo diga 15.
9. **Teléfono de Madrid y Salamanca.** El móvil +34 659 00 62 57 es el mismo para Madrid y para Salamanca. ¿Correcto?
10. **Verificación de Search Console.** ¿Se hace por DNS o por archivo HTML? (Ver M17.)
11. **GTM.** ¿El contenedor dispara también el Pixel de Meta? (Ver M16.)

---

## 5. Comprobaciones por bloque

### A. Titles, H1 y metas (ES)

| Ruta | title | meta | H1 | canonical | indexable |
|---|---|---|---|---|---|
| / | ✅ 42 | ✅ 147 | ✅ oculto (sr-only) | ✅ | ✅ |
| /atelier | ✅ 59 | ✅ 150 | ✅ oculto | ✅ | ✅ |
| /atelier/novias | ✅ 50 | ✅ 148 | ✅ «Atelier Novias» | ✅ | ✅ |
| /atelier/fiesta | ✅ 60 | ✅ 145 | ✅ «Atelier Fiesta» | ✅ | ✅ |
| /atelier/vosotras | ✅ 49 | ✅ 149 | ✅ oculto | ✅ | ✅ |
| /atelier-fiesta/salamanca | ✅ 51 | ✅ 155 | ✅ «Atelier Salamanca» | ✅ | ✅ |
| /atelier-fiesta/madrid | ✅ 57 | ✅ 142 | ✅ «Atelier & Showroom Madrid» | ✅ | ✅ |
| /atelier-fiesta/oviedo | ⚠️ 57 (ver P5) | ✅ 146 | ✅ «Atelier Oviedo» | ✅ | ✅ |
| /visita-fely-campo | ✅ 59 | ✅ 147 | ✅ «Nuestros Ateliers» | ✅ | ✅ |
| /visita-fely-campo/cita | ✅ 55 | ⚠️ 136, sin «Elige atelier» (decisión del cliente, P7) | ✅ «Pide tu cita» | ✅ | ✅ |
| /sobre-fely | ✅ 55 | ⚠️ 166 (> 160) | ✅ «Fely Campo» | ✅ | ✅ |
| /colecciones-fely-campo | ✅ 44 | ✅ 154 | ⚠️ «Runway» (M11) | ✅ | ✅ |
| /talleres-fely-campo | ✅ 58 | ⚠️ 174 (> 160) | ✅ «Nuestros talleres» | ✅ | ✅ |
| /responsabilidad | ✅ 52 | ⚠️ 162 (> 160) | ✅ | ✅ | ✅ |
| /puntos-de-venta-fely-campo | ✅ 54 | ✅ 146 | ⚠️ «Boutique Selectas» (M11) | ✅ | ✅ |
| /pret-a-porter | ✅ 45 | ✅ 139 | ✅ oculto | ✅ | ✅ |
| /pret-a-porter/vestidos | ✅ 49 | ✅ 144 | ✅ | ✅ | ✅ |
| /pret-a-porter/faldas | ✅ 47 | ✅ 134 | ✅ | ✅ | ✅ |
| /pret-a-porter/chaquetas-y-abrigos | ✅ 55 | ✅ 134 | ✅ | ✅ | ✅ |
| /pret-a-porter/pantalones | ✅ 51 | ✅ 133 | ✅ | ✅ | ✅ |
| /pret-a-porter/tops-y-camisetas | ✅ 52 | ✅ 137 | ⚠️ «… Tops y Camisas» | ✅ | ✅ |
| /podcast | ✅ 46 | ✅ 145 | ⚠️ «Podcast» | ✅ | ✅ |
| /ayuda/atencion-cliente | ✅ 41 | ⚠️ 116 (< 120) | ✅ | ✅ | ✅ |
| /ayuda/contacto | — eliminada el 04/11 (301 → `/es/visita-fely-campo`) | — | — | — | — |

- ✅ Un solo `<title>` y una sola meta description en las 746 URLs. Ninguna página está sin title ni sin meta.
- ✅ El H1 oculto usa `.sr-only` (clip + 1 px, `src/styles/global.css:451`), no `display:none`. Exactamente **un H1** en las 746 URLs.
- ✅ Las páginas sin H1 oculto tienen un H1 visible coherente con su title (los matices, en M11).
- ✅ Versión inglesa: los 373 titles EN son propios (ninguno igual al ES). `lang` correcto en todas, y `og:locale` en `es_ES`/`en_GB`. ❌ Excepción: las metas de las 9 colecciones (B4).
- ✅ Títulos cortos de la home: «Vestidos de Novia a Medida» / «Vestidos de Fiesta a Medida» aplicados (`splitMedia.item1/2.titulo`). En la web van en Title Case; el documento los escribía en minúscula. No lo he podido revisar visualmente en móvil.

### B. Criterios del documento

- ✅ **Ningún title repetido** entre las 746 URLs, incluidas fichas y colecciones generadas. ⚠️ Hay **15 grupos de metas repetidas**, todos en fichas o colecciones generadas (B3, B4, M8).
- ⚠️ **Peso del prêt-à-porter:** está en la meta de la home y tiene H1, title y meta propios en /pret-a-porter. Pero la home **no enlaza** a /pret-a-porter en el HTML (M1).
- ✅/⚠️ **Canibalización:** «vestidos de novia a medida» se concentra en /atelier/novias, y «fiesta / madrina / invitada» en /atelier/fiesta. /atelier («novia y fiesta a medida») hace de hub, lo cual es razonable. Riesgo menor: las ~400 fichas de Atelier repiten «Vestido de novia a medida» o «Vestido de fiesta a medida» en el title (M6).
- ✅/⚠️ **SEO local:** cada ficha de ciudad lleva su ciudad en el title, el H1 y la meta. Oviedo está pendiente (P5).
- ⚠️ **Promesas sin confirmar:** quedan «confeccionado en Salamanca» (P2), «Manifiesto sostenible» (P3) y «más de 50 años» en 2 textos del podcast (P4). No hay «54 años». «Más de cinco décadas» aparece en 5 sitios ✅.
- ✅ No he detectado cambios en textos funcionales: botones, formularios, cookies, legales y capítulos en primera persona de /sobre-fely. (Los cambios de hoy en fichas y en /sobre-fely los pidió el cliente expresamente.)

### C. Pendientes del documento

**C.1 Teléfonos y direcciones**
- ✅ No quedan teléfonos de relleno publicados. Las únicas apariciones de `000 000` son los placeholders de los campos de formulario («+34 600 000 000») y datos de prueba del admin (`mockData.js:1395`), que no se ven en la web.
- ✅ Los datos coinciden con los confirmados por el cliente el 04/11:
  - Salamanca: C/ Laguna Negra 17, +34 923 19 00 53 · +34 659 00 62 57.
  - Madrid: C/ Jorge Juan 29, 1º Derecha, +34 659 00 62 57.
  - Oviedo: C/ Gil de Jaz 15, +34 985 73 83 46 · +34 661 58 54 04.

  Discrepancias para revisar en Google Business Profile: P8.
- ✅ La misma dirección en la ficha de ciudad, /visita-fely-campo, /puntos-de-venta y atención al cliente (solo la de Salamanca). No hay JSON-LD donde comprobarlo (M2), y el footer no muestra direcciones.
- ⚠️ `tel:`: los enlaces que existen usan `+34`, pero en las fichas de atelier y en /visita los teléfonos no son enlace (M10).

**C.2 Servicios por atelier:** Oviedo ⚠️ (P5) · Salamanca ⚠️ (P6) · formulario sin elegir atelier ⚠️ (P7).

**C.3 Resto**
- Fichas generadas: ver B3, M7 y M8.
- ✅ La versión inglesa existe, con hreflang `es`, `en` y `x-default` recíproco y URLs absolutas en las 746 URLs.
- La sostenibilidad queda marcada para el cliente (P3).

### D. Lo que no se puede perder respecto a felycampo.com

**D.2 Medición y verificación**

| Elemento | Web actual | Web nueva (con variables de producción) |
|---|---|---|
| GTM-T2MJKZHT + `<noscript>` | ✅ | ✅ en las 746 URLs (en `<body>`, M16) |
| Meta Pixel 1258085321257704 | ✅ (aparte de GTM) | ✅ solo tras aceptar Marketing (M16: confirmar que no se duplica en GTM) |
| Consent Mode v2 | — | ✅ `denied` por defecto, `update` al aceptar |
| facebook-domain-verification | ✅ | ❌ falta (B2) |
| Verificación de Search Console | sin meta (¿DNS?) | sin meta (M17) |

**D.3 Técnico**

| Punto | Estado |
|---|---|
| Canonical autorreferente y absoluto, dominio `https://felycampo.com` sin www | ✅ 746/746 |
| `max-image-preview:large` | ⚠️ falta (M3); la web actual lo tiene |
| Sin `noindex` ni `Disallow: /` en producción | ⚠️ depende de B1. Con `SITIO_INDEXABLE=true`: ✅ `Allow: /`, `Disallow: /admin` y `/api/`, sitemap anunciado |
| `sitemap.xml` solo con URLs 200 indexables | ✅ 746 URLs, todas 200, sin carrito/wishlist/cuenta; `/wp-sitemap.xml` y `/sitemap_index.xml` → 301 a `/sitemap.xml` |
| 404 personalizada con código 404 real | ⚠️ ya no se devuelve 404: todo redirige (M4) |
| Open Graph + Twitter Card | ✅ `og:title`, `og:description`, `og:image`, `og:url` y `twitter:card` en las 746 URLs |
| JSON-LD | ⚠️ solo `BreadcrumbList` en 80 categorías (M2); la web actual no tiene ninguno |
| `alt` en imágenes | ✅ ninguna sin atributo · ⚠️ 10.180 con `alt=""` (M18) |
| Logo enlaza a la home con `alt` | ✅ |
| Navegación principal rastreable | ⚠️ (M1) |
| Rendimiento | ⚠️ (M5): mejor puntuación global y TBT que la actual, pero peor LCP |

---

## 6. Mapa de redirecciones (URL antigua → nueva → estado)

Las **801 URLs** de `wp-sitemap.xml` (24 páginas, 19 artículos, 680 productos, 69 categorías de producto, 5 categorías del blog, 4 autores) responden **301 → 200** en un solo salto, con barra final (801/801) y sin ella (800/800). El mapa vive en `src/lib/redirecciones301.js` y lo aplica `src/proxy.js`. Muestra de las rutas del documento:

| URL actual | Destino | Estado |
|---|---|---|
| /atelier-novias/ | /es/atelier/novias | ✅ 301 |
| /atelier-fiesta/ (exacta) | /es/atelier/fiesta | ✅ 301 · `/es/atelier-fiesta/{salamanca,madrid,oviedo}` intactas (200) |
| /atelier-madrid/ | /es/atelier-fiesta/madrid | ✅ 301 |
| /la-firma/ | /es/sobre-fely | ✅ 301 |
| /colecciones/ · /desfiles/ | /es/colecciones-fely-campo | ✅ 301 |
| /runways-{la-coleccion, dreaming, self-world, lei-zu, the-way-here, zigurat, tempore, nagare, diafonia}/ | /es/runways-{slug} | ✅ 301 (9/9) |
| /blog/ | /es/podcast | ✅ 301 |
| artículos del blog (19) | 5 a su artículo en /es/podcast/…; 14 a la sección afín | ✅ 301 · ⚠️ contenido no migrado (M14) |
| /puntos-de-venta/ | /es/puntos-de-venta-fely-campo | ✅ 301 |
| /categoria-producto/pret-a-porter/ | /es/pret-a-porter | ✅ 301 |
| /categoria-producto/novias/ (+ subcategorías) | /es/atelier/novias | ✅ 301 |
| /categoria-producto/fiesta/ (+ subcategorías) | /es/atelier/fiesta | ✅ 301 |
| /categoria-producto/ofertas-flash/ | /es/atelier | ✅ 301 (el destino lo decide el cliente) |
| /producto/* (680) | 286 a su ficha · 235 a su colección · 160 al listado | ✅ 301 · ⚠️ M15 |
| /producto/inexistente/ | /es/atelier | ✅ 301 (regla por prefijo) |
| /mi-cuenta/ · /tienda/ · /carrito/ · /finalizar-compra/ | /es/pret-a-porter | ✅ 301 |
| /lista-de-deseos/ · /lost-password/ · /mi-cuenta/lost-password/ | /es | ⚠️ cadena 308 → 307 → 308 (M13) |
| /aviso-legal/ | /es/legal/aviso-legal | ✅ 301 |
| /politica-de-privacidad/ | /es/legal/privacidad | ✅ 301 |
| /politica-de-cookies/ | /es/legal/cookies | ✅ 301 |
| /terminos-y-condiciones-de-uso/ | /es/legal/terminos | ✅ 301 |
| /terminos-y-condiciones/ | /es (debería ir a /es/legal/terminos) | ⚠️ cadena (M13) |
| /contacto/ | /es/visita-fely-campo | ⚠️ cadena 308 → 307 → 301 (M13) |
| /feed/ | /es/podcast | ✅ 301 |
| /ATELIER-NOVIAS/ (mayúsculas) | /es/atelier/novias | ✅ 301 |
| /wp-content/uploads/… | — | ⚠️ 404 (M20) |
| /es/ayuda/contacto · /es/ayuda/devoluciones (quitadas el 04/11) | /es/visita-fely-campo · /es/ayuda/atencion-cliente | ✅ 301 |
| /es/blog | /es/podcast | ⚠️ 307 temporal (M13) |
| www.felycampo.com · http:// | https://felycampo.com | ✅ hoy en el hosting actual · ⚠️ replicar en Netlify (M19) |

---

## 7. Gestión interna (que nada interno acabe en Google)

Verificado el 04/11/2026 sobre dos compilaciones: la de **producción** (`SITIO_INDEXABLE=true`) y la de **staging**, sin la variable, como en los deploy previews y branch deploys. En las dos, con `curl -I`.

### 7.1 Inventario

**Rutas internas o privadas**

| Ruta | Qué es |
|---|---|
| `/admin` y 33 subrutas (`/admin/consultas`, `/consultas-precio`, `/pedidos`, `/clientes`, `/productos`, `/stock`, `/metricas`, `/settings`, `/blog`, `/vosotras`, `/resenas`, `/newsletter`, `/materiales`, `/colecciones`, `/diseno`…) | Panel de gestión |
| `/api/cita` · `/api/consulta-vestido` | API de formularios (solo POST) |
| `/{es,en}/carrito` · `/wishlist` · `/mi-cuenta/panel` | Páginas privadas o transaccionales |
| `/{es,en}/visita-fely-campo/cita/confirmacion`, `-novia`, `-invitada` | Confirmaciones de cita |

No hay rutas de previsualización, borradores, login de gestión ni páginas de pruebas. `storybook-static/` está en la raíz del repo, no en `public/`, así que no se publica.

**Archivos en `public/` que no debían ser públicos**

- ❌→✅ **22 hojas `-info.xlsx`** del catálogo (Look, Nombre, **SKU**, Descripción, Tags, Imágenes) en `public/img/collections/…`. Se podían descargar desde la web, y hoy todavía desde felycampo.netlify.app. **Movidas a `docs/catalogo-fuente/`** en el commit `e8aef00`, porque la web no las usa. Ahora dan 404.
- ⚠️ Sin subir a git, y por tanto no publicados: `public/video/` (vídeos originales de Madrid, 97 MB, con audio) y `public/img/collections/runway/bts/fw25/no-do-not use (1|2).jpg`. Hay que **no hacerles commit**: sacarlos de `public/` o añadirlos a `.gitignore`.
- El resto de `public/` son imágenes, vídeos y favicons de la web (y un `.jfif` usado como imagen).

### 7.2 Acceso (autenticación en el servidor)

- ❌ **Pendiente (decisión del cliente, 04/11): `/admin` no tiene autenticación.** Responde 200 con todo el panel a cualquiera que conozca la URL. Que no esté enlazado no basta. Mientras no haya autenticación, la cabecera `noindex` (7.3) evita que se indexe, pero **no evita que alguien lo vea**. Opciones propuestas: HTTP Basic en el middleware con credenciales en variables de entorno; protección de Netlify (según el plan); o desactivar `/admin` en producción mientras sea una maqueta.
- ✅ La API solo acepta POST: GET da 405 y no expone datos.
- ⚠️ Mientras no haya autenticación, los chunks de JavaScript del admin (`/_next/static/chunks/…`) son descargables por quien abra `/admin`, y contienen los datos de prueba de `mockData.js`. Son datos ficticios (`@example.com`), pero conviene que no estén en un despliegue público.

### 7.3 noindex de verdad (`X-Robots-Tag`)

Implementado en `next.config.mjs` (`headers()`) y `src/proxy.js`, commits `cc8ffbc` y `78c485d`. Vale para cualquier respuesta, incluidos los errores:

| Petición (producción) | Estado | X-Robots-Tag |
|---|---|---|
| `/admin`, `/admin/consultas` | 200 | `noindex, nofollow` ✅ |
| `/admin/no-existe` | 404 | `noindex, nofollow` ✅ |
| `/api/cita` (GET) | 405 | `noindex, nofollow` ✅ |
| `/api/cita` (POST) | 503 en local, sin clave de email | `noindex, nofollow` ✅ |
| `/api/no-existe` | 404 | `noindex, nofollow` ✅ |
| `/es/carrito`, `/es/wishlist`, `/es/mi-cuenta/panel` | 200 | `noindex, nofollow` ✅ (además de la meta) |
| `/es/visita-fely-campo/cita/confirmacion…` | 200 | `noindex, nofollow` ✅ |
| `/es` y páginas públicas | 200 | — (indexables) ✅ |
| `/robots.txt`, `/sitemap.xml` | 200 | — ✅ |

`robots.txt` sigue con `Disallow: /admin` y `Disallow: /api/`. **Ojo:** con `Disallow`, Google no rastrea esas URLs y por tanto **no llega a ver** la cabecera `noindex`. Si alguien enlaza `/admin` desde fuera, la URL podría aparecer en Google sin contenido. La protección real es la autenticación (7.2). Una vez esté, recomiendo quitar `Disallow: /admin`, para que Google vea el `noindex` y la descarte.

### 7.4 Sitemap y enlaces

- ✅ `sitemap.xml`: 0 rutas internas (ni `/admin`, ni `/api`, ni carrito, wishlist, cuenta o confirmaciones).
- ✅ Ninguna página pública (home ES/EN, Atelier, Prêt-à-porter, fichas, Visítanos, Sobre Fely, Podcast) enlaza a `/admin` ni a `/api`, ni en el HTML ni en el JSON-LD.

### 7.5 Datos de prueba en el JavaScript público

- ❌→✅ **`mockData.js` acababa en el JavaScript de las páginas públicas.** El chunk que cargaba la cuadrícula de productos llevaba clientas, emails `@example.com`, direcciones de envío y pedidos de prueba. La cuadrícula solo importaba de ahí la paleta de colores para los filtros, pero el bundler incluía el módulo entero. **Corregido** en el commit `e79908f`: la paleta vive ahora en `src/lib/paletaColores.js`, y `mockData.js` la reexporta para el admin.
- Comprobación en los 24 scripts que cargan 23 páginas públicas: «@example.com», «Lucía Hernández Prieto», «direccionEnvio», «Calle Serrano 45», «telasMock» y «pedidosMock» aparecen **0 veces**. La paleta sí sigue llegando a los filtros. Los datos de prueba solo quedan en 3 chunks del admin, que no carga ninguna página pública (ver 7.2).

### 7.6 Netlify

- ✅ **Staging, deploy previews y branch deploys, noindex siempre.** Compilado sin `SITIO_INDEXABLE`: `X-Robots-Tag: noindex, nofollow` en **todas** las respuestas (páginas, imágenes, `robots.txt`, `sitemap.xml`, admin, API), `<meta name="robots" content="noindex, nofollow">` y `robots.txt` = `Disallow: /`.
- ✅ **`netlify.toml`** (nuevo) fuerza `SITIO_INDEXABLE="false"` en los contextos `deploy-preview` y `branch-deploy`, aunque alguien la ponga por error en "All contexts". `SITIO_INDEXABLE=true` va **solo** en el contexto Production, desde el panel. *Hay que comprobarlo en el primer deploy preview*: según la documentación de Netlify, las variables de `netlify.toml` ganan a las del panel en su contexto.
- ✅ **Producción en `*.netlify.app`.** Con la build de producción y la cabecera `Host: felycampo.netlify.app`, todas las respuestas (páginas, imágenes y `robots.txt`) llevan `X-Robots-Tag: noindex, nofollow`. Solo se indexará felycampo.com, y el canonical apunta siempre ahí. Alternativa más estricta, si se prefiere: redirigir `felycampo.netlify.app` a `felycampo.com` desde el panel de Netlify (Domain management) una vez el dominio esté activo.

### 7.7 Pendiente de comprobar en producción

Cuando el cliente ponga las variables y se redespliegue:
1. `curl https://felycampo.com/robots.txt`: debe mostrar `Allow: /` y `Sitemap: https://felycampo.com/sitemap.xml`.
2. `curl -s https://felycampo.com/es | grep robots`: debe mostrar `index, follow, max-image-preview:large`.
3. `curl -I https://felycampo.com/admin`: debe llevar `X-Robots-Tag: noindex, nofollow`.
4. `curl -I https://felycampo.netlify.app/es`: debe llevar `X-Robots-Tag: noindex, nofollow`.
5. El primer deploy preview debe salir con `noindex` y `Disallow: /`.
