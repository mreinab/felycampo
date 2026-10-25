# Informe — revisión de textos y SEO (ES)

Documento fuente: "Revisión de textos y propuesta SEO", 22 octubre 2026.
Aplicado el 25 octubre 2026. Solo versión en español; la inglesa no se ha tocado.

**Git:** por decisión del equipo, cambios aplicados en el árbol de trabajo de `main`, sin rama
`seo/textos-es-2026-10` ni commits (había cambios de diseño sin commitear en los mismos archivos).

## 1. Claves modificadas (80)

Todas las claves de la lista se encontraron y se cambiaron por el texto "Nuevo" exacto.

### Metadatos — `src/lib/seoTextos.js`

| Ruta · clave | Línea |
| --- | --- |
| / · title | 22 |
| / · h1 (oculto) | 23 |
| / · description | 24 |
| /atelier · title | 36 |
| /atelier · h1 (oculto) | 37 |
| /atelier · description | 38 |
| /atelier/novias · title | 48 |
| /atelier/novias · description | 49 |
| /atelier/fiesta · title | 58 |
| /atelier/fiesta · description | 59 |
| /atelier/vosotras · title | 68 |
| /atelier/vosotras · h1 (oculto) | 69 |
| /atelier/vosotras · description | 70 |
| /atelier-fiesta/salamanca · title | 80 |
| /atelier-fiesta/salamanca · description | 81 |
| /atelier-fiesta/madrid · description | 91 |
| /atelier-fiesta/oviedo · description | 101 |
| /pret-a-porter · title | 112 |
| /pret-a-porter · h1 (oculto) | 113 |
| /pret-a-porter · description | 114 |
| /pret-a-porter/vestidos · title | 124 |
| /pret-a-porter/vestidos · description | 125 |
| /pret-a-porter/faldas · title | 134 |
| /pret-a-porter/faldas · description | 135 |
| /pret-a-porter/pantalones · title | 144 |
| /pret-a-porter/pantalones · description | 145 |
| /pret-a-porter/tops-y-camisetas · title | 154 |
| /pret-a-porter/tops-y-camisetas · description | 155 |
| /pret-a-porter/chaquetas-y-abrigos · title | 164 |
| /pret-a-porter/chaquetas-y-abrigos · description | 165 |
| /sobre-fely · title | 176 |
| /sobre-fely · description | 177 |
| /colecciones-fely-campo · title | 186 |
| /colecciones-fely-campo · description | 187 |
| /talleres-fely-campo · title | 196 |
| /talleres-fely-campo · description | 197 |
| /responsabilidad · title | 206 |
| /responsabilidad · description | 207 |
| /podcast · title | 216 |
| /podcast · description | 217 |
| /visita-fely-campo · title | 228 |
| /visita-fely-campo · description | 229 |
| /visita-fely-campo/cita · title | 238 |
| /visita-fely-campo/cita · description | 239 |
| /puntos-de-venta-fely-campo · title | 260 |
| /puntos-de-venta-fely-campo · description | 261 |
| /ayuda/atencion-cliente · title | 272 |
| /ayuda/contacto · title | 282 |
| /ayuda/contacto · description | 283 |

### Textos de página

| Clave | Archivo:línea |
| --- | --- |
| heroCarousel.descripcion | `messages/es.json:429` |
| collectionTitle.edicionMujer.description | `messages/es.json:436` |
| splitMedia.item1.titulo [OPCIONAL] | `messages/es.json:447` |
| splitMedia.item2.titulo [OPCIONAL] | `messages/es.json:452` |
| atelierIndex.visitanosDescripcion | `messages/es.json:463` |
| cuadriculaTabs.descripcion | `messages/es.json:480` |
| visitaAtelier.texto [CONFIRMAR] | `messages/es.json:588` |
| ATELIER_INDEX.novias.texto | `src/app/[locale]/atelier/atelierIndex.js:41` |
| ATELIER_INDEX.fiesta.texto | `src/app/[locale]/atelier/atelierIndex.js:53` |
| NOVIA_EDITORIAL.descripcion[0] | `src/app/[locale]/atelier/novias/noviaEditorial.js:37` |
| NOVIA_EDITORIAL.descripcion[1] | `src/app/[locale]/atelier/novias/noviaEditorial.js:38` |
| NOVIA_EDITORIAL.bloques[0].texto | `src/app/[locale]/atelier/novias/noviaEditorial.js:54` |
| NOVIA_EDITORIAL.bloques[1].texto | `src/app/[locale]/atelier/novias/noviaEditorial.js:65` |
| FIESTA_EDITORIAL.descripcion[0] | `src/app/[locale]/atelier/fiesta/fiestaEditorial.js:37` |
| FIESTA_EDITORIAL.descripcion[1] | `src/app/[locale]/atelier/fiesta/fiestaEditorial.js:38` |
| FIESTA_EDITORIAL.bloques[0].texto | `src/app/[locale]/atelier/fiesta/fiestaEditorial.js:55` |
| FIESTA_EDITORIAL.bloques[1].texto | `src/app/[locale]/atelier/fiesta/fiestaEditorial.js:67` |
| ATELIERES.salamanca.descripcion | `src/app/[locale]/atelier-fiesta/atelieres.js:80` |
| ATELIERES.salamanca.secciones[0].texto[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:95` |
| ATELIERES.salamanca.secciones[1].texto[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:110` |
| ATELIERES.madrid.descripcion | `src/app/[locale]/atelier-fiesta/atelieres.js:143` |
| ATELIERES.madrid.secciones[0].texto[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:155` |
| ATELIERES.madrid.secciones[1].texto[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:166` |
| ATELIERES.madrid.secciones[2].texto[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:175` |
| ATELIERES.madrid.secciones[3].texto[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:186` |
| ATELIERES.oviedo.descripcion[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:215` |
| ATELIERES.oviedo.descripcion[1] | `src/app/[locale]/atelier-fiesta/atelieres.js:216` |
| ATELIERES.oviedo.secciones[0].texto[1] | `src/app/[locale]/atelier-fiesta/atelieres.js:233` |
| ATELIERES.oviedo.secciones[1].texto[0] | `src/app/[locale]/atelier-fiesta/atelieres.js:246` |
| ATELIERES.oviedo.secciones[2].texto[1] | `src/app/[locale]/atelier-fiesta/atelieres.js:261` |
| COLECCIONES[la-coleccion].descripcion | `src/app/[locale]/colecciones-fely-campo/colecciones.js:245` |

## 2. Claves no encontradas o ambiguas

Ninguna clave quedó sin encontrar. Notas:

- **ATELIER_INDEX.novias.texto / fiesta.texto**: cambiados en `atelierIndex.js`, pero **no se ven en
  la web**. `/atelier` ya no importa `ATELIER_INDEX` (la página es ahora solo las dos imágenes con
  título y CTA, vía SplitMedia). Si se quiere que este texto cuente para SEO, habría que volver a
  mostrarlo en la página: decisión de diseño pendiente.

- **COLECCIONES[la-coleccion].descripcion** no tiene versión por idioma: es un único texto en
  español que se muestra también en `/en/runways/la-coleccion`. Al cambiarlo cambia también ahí.
- **Título por defecto del layout** (`src/app/[locale]/layout.js:90`) sigue siendo
  "Fely Campo | Vestidos de novia y fiesta a medida". Solo se usa en páginas sin title propio; no
  estaba en la lista, así que no se ha tocado.
- **splitMedia.item1/item2.label** siguen como "Atelier Novia"/"Atelier Fiesta"; solo se cambió
  `titulo`, como pide el documento.
- **[OPCIONAL] splitMedia** aplicados a petición del equipo. Conviene revisar en escritorio y móvil
  que "Vestidos de novia a medida" / "Vestidos de fiesta a medida" caben junto al CTA sobre la foto
  de la home.

## 3. Longitudes

Ningún title supera 60 caracteres (`/atelier/fiesta` llega justo a 60).
Metadescripciones por encima de ~155:

| Ruta | Longitud |
| --- | --- |
| /talleres-fely-campo | 174 |
| /sobre-fely | 166 |
| /responsabilidad | 162 |

`/atelier-fiesta/salamanca` queda justo en 155. Se han dejado como venían en el documento.

## 4. Pendientes [CONFIRMAR] con el cliente

1. **visitaAtelier.texto** (home): "más de cinco décadas" en lugar de "54 años".
2. **/atelier-fiesta/salamanca · meta description**: que en Salamanca se ofrece prêt-à-porter.
3. **/talleres-fely-campo · title**: que "confección artesanal" describe con precisión los talleres.
4. **/responsabilidad · title**: que el contenido acredita confección en España.

## 5. Teléfonos con pinta de marcador de posición (sin modificar)

| Teléfono | Archivo:línea |
| --- | --- |
| +34 923 000 000 (Salamanca) | `src/app/[locale]/visita-fely-campo/ubicaciones.js:19` |
| +34 910 000 000 (Madrid) | `src/app/[locale]/visita-fely-campo/ubicaciones.js:32` |
| +34 985 000 000 (Oviedo) | `src/app/[locale]/visita-fely-campo/ubicaciones.js:45` |
| +34 923 000 000 | `src/components/admin/mockData.js:1402` (datos de prueba del admin) |

Se muestran en las fichas de atelier y en /visita-fely-campo.

## 6. Comprobaciones finales

- [x] Cada ruta de la lista renderiza su nuevo `<title>` y `<meta name="description">` en local
  (`http://localhost:3000/es…`), y los H1 ocultos de `/`, `/atelier`, `/atelier/vosotras` y
  `/pret-a-porter` muestran el texto nuevo.
- [x] Ningún title ni metadescripción duplicados entre rutas (comprobado sobre todo `seoTextos.js`, ES).
- [x] `messages/es.json` sigue siendo JSON válido.
- [ ] **Build y lint sin ejecutar.** `npm run build` no se lanzó porque el servidor de desarrollo
  estaba en marcha sobre la misma carpeta `.next`. El proyecto no tiene configuración de ESLint
  (falta `eslint.config`). Las páginas compilan y responden 200 en desarrollo.
- [x] **Fichas de producto de prêt-à-porter** (`src/app/[locale]/pret-a-porter/[producto]/page.js:41-42`):
  title = `{nombre} | Prêt-à-porter Fely Campo`; description = descripción del producto + la frase
  fija "Diseñada y confeccionada en Salamanca. Compra online en Fely Campo.". Ninguna queda vacía,
  pero las 14 descripciones de `tiendaProductos.js` son de una sola línea (p. ej. "Falda Jeju a
  cuadros color gris."), así que la metadescripción resultante es corta y genérica. Además la frase
  fija afirma confección en Salamanca, justo el tipo de afirmación que el documento retira de las
  categorías: revisar con el cliente.

## 7. Pendientes para el cliente

- Teléfonos, direcciones y horarios reales de los tres ateliers (ver punto 5).
- Qué servicios ofrece cada atelier (novia, fiesta, invitada, prêt-à-porter).
- Afirmaciones de sostenibilidad y de producción en Salamanca/España (responsabilidad, talleres,
  fichas de producto).

## Recordatorio

Revisar la versión inglesa en una tarea aparte (equivalencia semántica, no traducción literal).
