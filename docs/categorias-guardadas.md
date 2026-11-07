# Páginas de categoría guardadas

**Quitadas de la web el 2026-11-07** (a petición: ningún botón ni enlace de la web llevaba a ellas). Aquí queda todo lo que tenían escrito por si se vuelven a usar. El código completo de las páginas está en el commit `c9a1934` (`git show c9a1934:<ruta>`):

- `src/app/[locale]/atelier/fiesta/categoria/[categoria]/page.js`
- `src/app/[locale]/atelier/novias/categoria/[categoria]/page.js`
- `src/app/[locale]/pret-a-porter/{vestidos,faldas,pantalones,tops-y-camisetas,chaquetas-y-abrigos}/page.js`
- `src/lib/atelierCategoriaSeo.js` (títulos y descripciones de Google de las categorías de Atelier)

**Lo que sigue en la web:** los filtros de Fiesta y Novias (silueta, largo, estilo…) siguen funcionando dentro de cada página, con los mismos nombres (`GRUPOS_ESTILO_SILUETA` en `src/components/layout/estiloSiluetaGrupos.js`, textos en `messages/*.json` → `filtros.estiloYSilueta`). Las prendas de Prêt-à-porter siguen teniendo su categoría (se usa en el admin para agruparlas).

**Redirecciones:** las direcciones antiguas que llevaban a cada categoría (de la web de WordPress) ahora van a la página general de su sección (Fiesta, Novias o Prêt-à-porter), y las propias direcciones de categoría también (`src/proxy.js`). Si se recuperan las páginas, hay que devolver esas redirecciones a su categoría (la lista está abajo, en cada una).

## Atelier: cabecera común de las páginas de categoría

### Fiesta
- Foto: `/img/landing/fely-campo-portada-hero-landing-3-mobile-atelier-3.webp`
- Frase sobre la foto:
- es: Vestidos de fiesta e invitada, hechos a medida.
- en: Made-to-measure evening and guest dresses.
- Texto encima de los looks:
- es: Descubre nuestros vestidos de novia y de fiesta en el atelier. Reserva tu cita para recibir asesoramiento personalizado y encontrar la silueta, el tejido y los detalles que mejor encajan contigo.
- en: Book your appointment and enjoy a unique day at the Atelier. Experience personalized guidance from our designer.

### Novias
- Foto: `/img/fely-campo-web-novias-seccion-3.webp`
- Texto encima de los looks:
- es: Descubre nuestros vestidos de novia y de fiesta en el atelier. Reserva tu cita para recibir asesoramiento personalizado y encontrar la silueta, el tejido y los detalles que mejor encajan contigo.
- en: Book your appointment and enjoy a unique day at the Atelier. Experience personalized guidance from our designer.

### Textos de Google (los mismos para todas, con el nombre de la categoría y de la sección)
- Título: es «{categoria} · {seccion} · Atelier | Fely Campo» · en «{categoria} · {seccion} · Atelier | Fely Campo»
- Descripción: es «Vestidos de estilo {categoria} en la colección {seccion} del Atelier de Fely Campo. Cita personalizada con nuestra diseñadora.» · en «{categoria} style dresses in the {seccion} Atelier collection by Fely Campo. Personalized fitting with our designer.»

## Atelier: las categorías

`/atelier/fiesta/categoria/<slug>` y `/atelier/novias/categoria/<slug>`. Las de «Ocasión» eran solo de Fiesta.

| Grupo | Categoría (es / en) | Slug | Solo Fiesta | Direcciones antiguas que llevaban aquí |
|---|---|---|---|---|
| Ocasión | Alfombra roja / Red carpet | `alfombra-roja` | sí | `/categoria-producto/estilos-fiesta/alfombra-roja → Fiesta` |
| Ocasión | Noche / Evening | `noche` | sí | `/categoria-producto/siluetas-fiesta/noche-fiesta → Fiesta` |
| Ocasión | Tarde / Afternoon | `tarde` | sí | — |
| Ocasión | Día / Day | `dia` | sí | — |
| Silueta | Corte A / A-line | `corte-a` |  | `/categoria-producto/siluetas-fiesta/corte-a-fiesta → Fiesta`<br>`/categoria-producto/siluetas-novia/corte-a → Novias` |
| Silueta | Recto / Straight | `recto` |  | `/categoria-producto/siluetas-fiesta/recto-fiesta → Fiesta`<br>`/categoria-producto/siluetas-novia/recto → Novias` |
| Silueta | Sirena / Mermaid | `sirena` |  | `/categoria-producto/siluetas-fiesta/sirena-fiesta → Fiesta`<br>`/categoria-producto/siluetas-novia/sirena → Novias` |
| Silueta | Princesa / Ballgown | `princesa` |  | `/categoria-producto/siluetas-novia/princesa → Novias` |
| Volumen | Dos piezas / Two-piece | `dos-piezas` |  | `/categoria-producto/siluetas-fiesta/dos-piezas-fiesta → Fiesta`<br>`/categoria-producto/siluetas-novia/dos-piezas → Novias` |
| Largo | Corto / Short | `corto` |  | `/categoria-producto/tendencias-fiesta/corto → Fiesta` |
| Largo | Midi / Midi | `midi` |  | `/categoria-producto/tendencias-fiesta/midi-tendencias-fiesta → Fiesta`<br>`/categoria-producto/tendencias-novia/midi → Novias` |
| Largo | Largo / Long | `largo` |  | `/categoria-producto/tendencias-fiesta/largo → Fiesta` |
| Largo | Cola / Train | `cola` |  | `/categoria-producto/tendencias-novia/cola → Novias` |
| Estilo | Minimal / Minimal | `minimal` |  | `/categoria-producto/estilos-fiesta/minimal-estilos-fiesta → Fiesta`<br>`/categoria-producto/estilos-novia/minimal → Novias` |
| Estilo | Lencero / Slip dress | `lencero` |  | `/categoria-producto/estilos-fiesta/lencero-estilos-fiesta → Fiesta`<br>`/categoria-producto/estilos-novia/lencero → Novias` |
| Estilo | Diferente / Unconventional | `diferente` |  | `/categoria-producto/estilos-fiesta/diferente-estilos-fiesta → Fiesta`<br>`/categoria-producto/estilos-novia/diferente → Novias` |
| Estilo | Clásico / Classic | `clasico` |  | `/categoria-producto/estilos-fiesta/clasico-estilos-fiesta → Fiesta`<br>`/categoria-producto/estilos-novia/clasico → Novias` |
| Estilo | Romántico / Romantic | `romantico` |  | `/categoria-producto/estilos-novia/romantico → Novias` |
| Detalles | Asimétrico / Asymmetric | `asimetrico` |  | `/categoria-producto/tendencias-fiesta/asimetrico → Fiesta` |
| Detalles | Escote espalda / Open back | `escote-espalda` |  | `/categoria-producto/tendencias-fiesta/escote-espalda-tendencias-fiesta → Fiesta`<br>`/categoria-producto/tendencias-novia/escote-espalda → Novias` |
| Detalles | Fluido / Flowy | `fluido` |  | `/categoria-producto/tendencias-fiesta/fluido-tendencias-fiesta → Fiesta`<br>`/categoria-producto/tendencias-novia/fluido → Novias` |
| Detalles | Mangas / Manga / Sleeves | `mangas` |  | `/categoria-producto/tendencias-fiesta/mangas → Fiesta`<br>`/categoria-producto/tendencias-novia/manga → Novias` |

## Prêt-à-porter

Texto común encima de las prendas:
- es: Piezas nuevas de temporada, pensadas para acompañar cada ocasión con la misma artesanía de siempre.
- en: New pieces for the season, crafted with the same care for every occasion.

| Categoría | Dirección | Foto de cabecera | Título de Google (es / en) | Descripción de Google (es / en) |
|---|---|---|---|---|
| Vestidos / Dresses | `/pret-a-porter/vestidos` | `/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-vestidos.webp` | Vestidos de mujer de diseño de autor | Fely Campo / Women's dresses | Fely Campo ready-to-wear | Descubre vestidos de mujer de Fely Campo, con patronaje cuidado y tejidos seleccionados para el día a día y ocasiones especiales. Consúltanos. / Fely Campo ready-to-wear dresses for everyday and special occasions, made in Salamanca. Ask us about any piece. |
| Faldas / Skirts | `/pret-a-porter/faldas` | `/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-faldas.webp` | Faldas de mujer de diseño de autor | Fely Campo / Women's skirts | Fely Campo ready-to-wear | Explora las faldas de Fely Campo en tejidos seleccionados y siluetas cuidadas. Descubre la colección de prêt-à-porter y consúltanos. / Fely Campo skirts in carefully chosen fabrics, printed and plain, designed and made in Salamanca. Explore the collection online. |
| Pantalones / Trousers | `/pret-a-porter/pantalones` | `/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-pantalones.webp` | Pantalones de mujer de diseño de autor | Fely Campo / Women's trousers | Fely Campo ready-to-wear | Descubre pantalones de mujer de Fely Campo, con patronaje propio y acabados cuidados. Encuentra piezas para combinar y consúltanos. / Fely Campo women's trousers with in-house pattern cutting and atelier finishes, made in Salamanca. Ask us about any piece. |
| Tops y Camisas / Tops & Shirts | `/pret-a-porter/tops-y-camisetas` | `/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-tops-camisas.webp` | Tops y camisetas de mujer | Prêt-à-porter Fely Campo / Women's tops and T-shirts | Fely Campo | Descubre tops, blusas y camisetas de Fely Campo, diseñados para combinar con las prendas de la colección de prêt-à-porter. Consúltanos. / Fely Campo ready-to-wear tops, blouses and T-shirts, designed in Salamanca to pair with the rest of the collection. Ask us about any piece. |
| Chaquetas y Abrigos / Coats & Jackets | `/pret-a-porter/chaquetas-y-abrigos` | `/img/hero-pages/fely-campo-cabecera-hero-pages-pretaporter-chaquetas-abrigos.webp` | Chaquetas y abrigos de mujer | Prêt-à-porter Fely Campo / Women's jackets and coats | Fely Campo | Descubre chaquetas y abrigos de mujer de Fely Campo, con tejidos seleccionados, líneas cuidadas y patronaje de atelier. Consúltanos. / Fely Campo women's jackets and coats in fine fabrics with atelier pattern cutting, made in Salamanca. Ask us about any piece. |
