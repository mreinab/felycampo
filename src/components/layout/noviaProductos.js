// noviaProductos.js
//
// Catálogo real de Atelier > Novias — sustituye a productosEjemplo.js en
// /atelier/novias y su ficha de producto (ver page.js, categoria/[categoria]/
// page.js y FichaProductoAtelier.jsx), mismo criterio que furisodeProductos.js
// en Atelier > Fiesta — a diferencia de esa colección (sin tags reales
// todavía), aquí sí hay "Tags (categoría)" y (en ME/Bride 27) "Descripción"
// reales en cada -info.xlsx de public/img/collections/novia/<coleccion>/, así
// que se leen tal cual en vez de inventar categorías (ver
// COMBOS_ESTILO_SILUETA en FichaProductoAtelier.jsx, que sigue de placeholder
// solo donde no hay tags reales, como Fiesta).
//
// Orden de colecciones: de la más reciente a la más antigua, igual que
// COLECCIONES_FIESTA en atelier/fiesta/page.js — Bride 27, ME, Bambú Novia,
// Savia Novia, Inside, Introspección; el array "productos" recorre las
// colecciones en ESE orden y cada una conserva el orden de mirada de su
// propio -info.xlsx (Look 1, Look 2...), así que el orden final del array es
// también el orden real de la cuadrícula (CuadriculaProductos no reordena en
// "recomendados", su opción por defecto).
//
// "nombre": tal cual la columna "Nombre" del excel ("Look 1 - Introspección
// Novia"...) — mismo criterio que furisodeProductos.js, da un slug único por
// look+colección con slugify() (ver /lib/slugify.js).
// "imagen"/"imagenHover"/"imagenes": el orden de la columna "Imágenes
// (archivos)" ya trae la foto de frente primero en cada look (comprobado a
// mano contra las fotos reales), así que esa primera foto es siempre la
// portada — igual que furisodeProductos.js.
// "sku": columna "SKU" del excel, mostrado en la ficha (ver InfoAtelier.jsx) —
// EXCEPCIÓN: Bride 27 no trae sku (su columna SKU en bride-27-info.xlsx es un
// error de arrastre de fórmula en la propia hoja, "23311 V" seguido de una
// cadena de "-1" que se acorta una unidad por fila — no son SKUs reales, así
// que se omite en vez de publicar un dato roto: sin "sku", InfoAtelier.jsx no
// pinta esa línea).
// "descripcion": columna "Descripción" tal cual en ME/Bride 27 (las dos
// colecciones que la traen); el resto no tiene esa columna en su excel, así
// que usan la misma plantilla genérica que furisodeProductos.js (colección +
// SKU, sin inventar un texto editorial que no viene del encargo).
// "tags": columna "Tags (categoría)" del excel, RECORTADA a solo las que
// realmente se pueden filtrar (ver PanelFiltros.jsx): las opciones de
// "Estilo y silueta" (estiloSiluetaGrupos.js) y el nombre de colección
// del propio look (ver "coleccion" más abajo, generado a partir de
// "nombreColeccion" — así que siempre coincide con una de las 6
// reales). Se quitan del excel el resto de vocabulario propio del
// encargo sin categoría equivalente (tejidos como "Encaje"/"Mikado"/
// "Tul", "Traje", la palabra genérica "Colección", "Novias" — ya
// estamos en Atelier > Novias, filtrar por eso no tiene sentido) y se
// corrige "Inside Introspection" (nombre previo a separar esa colección
// en "Inside" e "Introspección") a "Inside", su nombre actual.
// FichaProductoAtelier.jsx enlaza cada tag restante a su página de
// categoría (estilo/silueta) o a la cuadrícula filtrada por colección
// (ver ../ecommerce/FichaProductoAtelier.jsx y CuadriculaProductos.jsx).

const RUTA_BASE = '/img/collections/novia';

const COLECCIONES = [
  {
    id: "bride-27",
    carpeta: "bride-27",
    nombreColeccion: "Bride 27",
    looks: [
      { nombre: "Look 1 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-1.webp","fely-campo-coleccion-novia-bride-27-look-1-2.webp","fely-campo-coleccion-novia-bride-27-look-1-3.webp"] },
      { nombre: "Look 2 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-2.webp"] },
      { nombre: "Look 3 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-3.webp"] },
      { nombre: "Look 4 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-4.webp","fely-campo-coleccion-novia-bride-27-look-4-2.webp"] },
      { nombre: "Look 5 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-5.webp","fely-campo-coleccion-novia-bride-27-look-5-2.webp"] },
      { nombre: "Look 6 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-6.webp"] },
      { nombre: "Look 7 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-7.webp","fely-campo-coleccion-novia-bride-27-look-7-2.webp"] },
      { nombre: "Look 8 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-8.webp"] },
      { nombre: "Look 9 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-9.webp"] },
      { nombre: "Look 10 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-10.webp","fely-campo-coleccion-novia-bride-27-look-10-2.webp","fely-campo-coleccion-novia-bride-27-look-10-3.webp"] },
      { nombre: "Look 11 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-11.webp","fely-campo-coleccion-novia-bride-27-look-11-2.webp"] },
      { nombre: "Look 12 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-12.webp"] },
      { nombre: "Look 13 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-13-1.webp","fely-campo-coleccion-novia-bride-27-look-13-2.webp"] },
      { nombre: "Look 14 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-14-1.webp"] },
      { nombre: "Look 15 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-15-1.webp","fely-campo-coleccion-novia-bride-27-look-15-2-1.webp"] },
      { nombre: "Look 16 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-16-3.webp","fely-campo-coleccion-novia-bride-27-look-16-2.webp","fely-campo-coleccion-novia-bride-27-look-16.webp"] },
      { nombre: "Look 17 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-17.webp","fely-campo-coleccion-novia-bride-27-look-17-2.webp"] },
      { nombre: "Look 18 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["fely-campo-coleccion-novia-bride-27-look-19.webp"] },
    ],
  },
  {
    id: "me",
    carpeta: "me",
    nombreColeccion: "ME",
    looks: [
      { nombre: "Look 1 - ME Bridal", sku: "23303 V", descripcion: "Vestido de líneas lápiz, con detalle pieza corsé en cintura. Escote en espalda cuadrado pronunciado. Detalle de manga abullonada en satén azul.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-1-2.webp","fely-campo-coleccion-novia-me-look-1-1.webp","fely-campo-coleccion-novia-me-look-1-3.webp","fely-campo-coleccion-novia-me-look-1-4.webp"] },
      { nombre: "Look 2 - ME Bridal", sku: "23308 V", descripcion: "Vestido de línea recta inspiración años 20, con detalles de banda encaje en cuerpo, falda tableada con ligeros recogidos. Detalle de botones y caídas con satén azul.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-2-1.webp","fely-campo-coleccion-novia-me-look-2-2.webp"] },
      { nombre: "Look 3 - ME Bridal", sku: "23303 V C", descripcion: "Vestido de líneas lápiz, con detalle pieza corsé en cintura. Escote en espalda cuadrado pronunciado. Detalle de manga abullonada en satén azul. Capa en gasa de Seda", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-3-2.webp","fely-campo-coleccion-novia-me-look-3-3.webp","fely-campo-coleccion-novia-me-look-3-4.webp","fely-campo-coleccion-novia-me-look-3-1.webp"] },
      { nombre: "Look 4 - ME Bridal", sku: "23301 A - 23304 V", descripcion: "Abrigo de manga japonesa abullonadas, con detalle de escote en espalda con cuello al bies, colas cuadradas. Combinado con vestido de satén con brillo de silueta lápiz con espalda volada.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-4-3.webp","fely-campo-coleccion-novia-me-look-4-2.webp","fely-campo-coleccion-novia-me-look-4-4.webp","fely-campo-coleccion-novia-me-look-4-1.webp"] },
      { nombre: "Look 5 - ME Bridal", sku: "23305 V F", descripcion: "Conjunto 3 piezas de cuerpo de encaje, con manga abullonada y abertura en espalda. Combinación de raso y falda de tafetán en línea A con grandes godets.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-5-2.webp","fely-campo-coleccion-novia-me-look-5-4.webp","fely-campo-coleccion-novia-me-look-5-3.webp","fely-campo-coleccion-novia-me-look-5-1.webp"] },
      { nombre: "Look 6 - ME Bridal", sku: "23304 V", descripcion: "Vestido de escote recto, con tirante fino, de líneas puras con detalle de escote espalda separada, Confeccionado en raso de seda.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-6-2.webp","fely-campo-coleccion-novia-me-look-6-1.webp","fely-campo-coleccion-novia-me-look-6-4.webp","fely-campo-coleccion-novia-me-look-6-3.webp"] },
      { nombre: "Look 7 - ME Bridal", sku: "23310 V", descripcion: "Vestido de línea A, con esote bañera, hombros al descubiertos, manga larga. En delantero detalle abullonado en satén, en espalda escote cuadrado. Confeccionado en crep.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-7-4.webp","fely-campo-coleccion-novia-me-look-7-3.webp","fely-campo-coleccion-novia-me-look-7-1.webp","fely-campo-coleccion-novia-me-look-7-6.webp","fely-campo-coleccion-novia-me-look-7-2.webp","fely-campo-coleccion-novia-me-look-7-5.webp"] },
      { nombre: "Look 8 - ME Bridal", sku: "23MB25 V", descripcion: "Vestido de largos asimétricos, corto por delante y con cola. Escote cuadrado muy pronunciado en espalda, confeccionado en tafetán con textura y detalle de pedrería con perlas en delantero. Manguitos con caídas largas.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-83.webp","fely-campo-coleccion-novia-me-look-82.webp","fely-campo-coleccion-novia-me-look-81.webp"] },
      { nombre: "Look 9 - ME Bridal", sku: "23302 V", descripcion: "Vestido línea A, con manga larga, y escote pronunciado en espalda. Confeccionado en raso con flores brocadas, con detalle de botones en espalda en satén azul.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-94.webp","fely-campo-coleccion-novia-me-look-92.webp","fely-campo-coleccion-novia-me-look-91.webp","fely-campo-coleccion-novia-me-look-93.webp"] },
      { nombre: "Look 10 - ME Bridal", sku: "23307 A - 23306 V", descripcion: "Abrigo de líneas geométricas, con cuello chimenea, y abertura pronunciada en espalda con colas. Combinado con vestido de saten tafetanado, de falda tableada.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-103.webp","fely-campo-coleccion-novia-me-look-101.webp","fely-campo-coleccion-novia-me-look-102.webp"] },
      { nombre: "Look 11 - ME Bridal", sku: "23314 C - 23309 V", descripcion: "Vestido de silueta sirena, confeccionado en crep. Con hombro metido y escote delantero a pico. Detalle de tul bordado en flores de perlas y lentejuelas en cuerpo. Capa confeccionada en crep, con gran vuelo.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-111.webp","fely-campo-coleccion-novia-me-look-112.webp","fely-campo-coleccion-novia-me-look-113.webp"] },
      { nombre: "Look 12 - ME Bridal", sku: "23306 V", descripcion: "Vestido entallado en cuerpo, con falda de vuelo tableada. Detalle de cinturón lazos a altura de cadera. Confeccionado en satén tafetaneado.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-122.webp","fely-campo-coleccion-novia-me-look-121.webp","fely-campo-coleccion-novia-me-look-123.webp"] },
      { nombre: "Look 13 - ME Bridal", sku: "23MB22 V", descripcion: "Vestido midi, silueta A, con cancán pronunciado en falda, de tules. Escote en espalda. Confeccionado a mano en red de pedrería y perlas.", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-132.webp","fely-campo-coleccion-novia-me-look-131.webp","fely-campo-coleccion-novia-me-look-133.webp"] },
      { nombre: "Look 14 - ME Bridal", sku: "23311 V", descripcion: "Vestido baby doll, confeccionado en tul y encaje de red con tonos holográficos. Escotes cuadrados pronunciados. Detalle de guantes abullonados", tags: ["ME"], imagenes: ["fely-campo-coleccion-novia-me-look-142.webp","fely-campo-coleccion-novia-me-look-143.webp","fely-campo-coleccion-novia-me-look-144.webp","fely-campo-coleccion-novia-me-look-141.webp"] },
    ],
  },
  {
    id: "bambu",
    carpeta: "bambu",
    nombreColeccion: "Bambú Novia",
    looks: [
      { nombre: "Look 1 - Bambú Novia", sku: "N0001", descripcion: "", tags: ["Bambú Novia","Diferente","Escote espalda","Fluido","Manga","Romántico","Sirena"], imagenes: ["fely-campo-coleccion-novia-bambu-look-1-2.webp","fely-campo-coleccion-novia-bambu-look-1-3.webp","fely-campo-coleccion-novia-bambu-look-1.webp"] },
      { nombre: "Look 2 - Bambú Novia", sku: "22204 V", descripcion: "", tags: ["Bambú Novia","Clásico","Escote espalda","Fluido","Manga","Minimal","Recto"], imagenes: ["fely-campo-coleccion-novia-bambu-look-2.webp","fely-campo-coleccion-novia-bambu-look-2-2.webp"] },
      { nombre: "Look 3 - Bambú Novia", sku: "22202 V", descripcion: "", tags: ["Bambú Novia","Clásico","Princesa","Romántico"], imagenes: ["fely-campo-coleccion-novia-bambu-look-3.webp","fely-campo-coleccion-novia-bambu-look-3-2.webp"] },
      { nombre: "Look 4 - Bambú Novia", sku: "20187 V", descripcion: "", tags: ["Bambú Novia","Cola","Corte A","Diferente","Dos piezas","Escote espalda","Fluido","Lencero","Minimal","Sirena"], imagenes: ["fely-campo-coleccion-novia-bambu-look-4.webp","fely-campo-coleccion-novia-bambu-look-4-3.webp","fely-campo-coleccion-novia-bambu-look-4-2.webp"] },
      { nombre: "Look 5 - Bambú Novia", sku: "14210 V", descripcion: "", tags: ["Bambú Novia","Diferente","Escote espalda","Sirena"], imagenes: ["fely-campo-coleccion-novia-bambu-look-5.webp","fely-campo-coleccion-novia-bambu-look-5-3.webp","fely-campo-coleccion-novia-bambu-look-5-2.webp"] },
      { nombre: "Look 6 - Bambú Novia", sku: "19184 P", descripcion: "", tags: ["Bambú Novia","Corte A","Diferente","Dos piezas","Fluido","Manga","Minimal","Recto"], imagenes: ["fely-campo-coleccion-novia-bambu-look-6-2.webp","fely-campo-coleccion-novia-bambu-look-6-3.webp","fely-campo-coleccion-novia-bambu-look-6-4.webp","fely-campo-coleccion-novia-bambu-look-6.webp"] },
      { nombre: "Look 7 - Bambú Novia", sku: "22201 V", descripcion: "", tags: ["Bambú Novia","Clásico","Cola","Dos piezas","Escote espalda","Fluido","Lencero","Minimal","Recto","Romántico","Sirena"], imagenes: ["fely-campo-coleccion-novia-bambu-look-7.webp","fely-campo-coleccion-novia-bambu-look-7-2.webp"] },
      { nombre: "Look 8 - Bambú Novia", sku: "20172 V", descripcion: "", tags: ["Bambú Novia","Cola","Diferente","Dos piezas","Escote espalda","Princesa","Romántico"], imagenes: ["fely-campo-coleccion-novia-bambu-look-8.webp","fely-campo-coleccion-novia-bambu-look-8-3.webp","fely-campo-coleccion-novia-bambu-look-8-4.webp","fely-campo-coleccion-novia-bambu-look-8-2.webp"] },
      { nombre: "Look 9 - Bambú Novia", sku: "20183 V", descripcion: "", tags: ["Bambú Novia","Clásico","Manga","Princesa"], imagenes: ["fely-campo-coleccion-novia-bambu-look-9.webp","fely-campo-coleccion-novia-bambu-look-9-2.webp"] },
      { nombre: "Look 10 - Bambú Novia", sku: "19184 C _ 19161 P", descripcion: "", tags: ["Bambú Novia","Clásico","Diferente","Dos piezas","Escote espalda","Fluido","Lencero","Manga","Minimal"], imagenes: ["fely-campo-coleccion-novia-bambu-look-10.webp","fely-campo-coleccion-novia-bambu-look-10-2.webp"] },
      { nombre: "Look 11 - Bambú Novia", sku: "20210 V", descripcion: "", tags: ["Bambú Novia","Clásico","Fluido","Manga","Midi","Minimal","Recto"], imagenes: ["fely-campo-coleccion-novia-bambu-look-11.webp"] },
      { nombre: "Look 12 - Bambú Novia", sku: "20115 V", descripcion: "", tags: ["Bambú Novia","Cola","Corte A","Diferente","Midi"], imagenes: ["fely-campo-coleccion-novia-bambu-look-12.webp","fely-campo-coleccion-novia-bambu-look-12-3.webp","fely-campo-coleccion-novia-bambu-look-12-2.webp","fely-campo-coleccion-novia-bambu-look-12-4.webp"] },
      { nombre: "Look 13 - Bambú Novia", sku: "N0013", descripcion: "", tags: ["Bambú Novia"], imagenes: ["fely-campo-coleccion-novia-bambu-look-13.webp","fely-campo-coleccion-novia-bambu-look-13-2.webp"] },
    ],
  },
  {
    id: "savia",
    carpeta: "savia",
    nombreColeccion: "Savia Novia",
    looks: [
      { nombre: "Look 1 - Savia Novia", sku: "N0041", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-1-2.webp","fely-campo-coleccion-novia-savia-look-1.webp"] },
      { nombre: "Look 2 - Savia Novia", sku: "N0042", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-2.webp","fely-campo-coleccion-novia-savia-look-2-2.webp"] },
      { nombre: "Look 3 - Savia Novia", sku: "N0043", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-3-2.webp","fely-campo-coleccion-novia-savia-look-3.webp"] },
      { nombre: "Look 4 - Savia Novia", sku: "N0044", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-4.webp","fely-campo-coleccion-novia-savia-look-4-2.webp"] },
      { nombre: "Look 5 - Savia Novia", sku: "N0045", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-5.webp","fely-campo-coleccion-novia-savia-look-5-2.webp"] },
      { nombre: "Look 6 - Savia Novia", sku: "N0046", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-6.webp","fely-campo-coleccion-novia-savia-look-6-2.webp"] },
      { nombre: "Look 7 - Savia Novia", sku: "N0047", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-7.webp","fely-campo-coleccion-novia-savia-look-7-2.webp"] },
      { nombre: "Look 8 - Savia Novia", sku: "N0048", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-8-2.webp","fely-campo-coleccion-novia-savia-look-8.webp"] },
      { nombre: "Look 9 - Savia Novia", sku: "N0049", descripcion: "", tags: ["Savia Novia"], imagenes: ["fely-campo-coleccion-novia-savia-look-9.webp","fely-campo-coleccion-novia-savia-look-10-2.webp"] },
    ],
  },
  {
    id: "inside",
    carpeta: "inside",
    nombreColeccion: "Inside",
    looks: [
      { nombre: "Look 1 - Inside Introspection Novia", sku: "17130 N", descripcion: "", tags: ["Clásico","Cola","Diferente","Escote espalda","Fluido","Inside","Lencero","Manga","Minimal","Princesa","Recto","Romántico"], imagenes: ["fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-1-2.webp","fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-1.webp"] },
      { nombre: "Look 2 - Inside Introspection Novia", sku: "20211 V", descripcion: "", tags: ["Clásico","Escote espalda","Inside","Minimal","Princesa"], imagenes: ["fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-2-2.webp","fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-2.webp"] },
      { nombre: "Look 3 - Inside Introspection Novia", sku: "20209 V", descripcion: "", tags: ["Cola","Diferente","Fluido","Inside","Manga","Minimal","Recto","Sirena"], imagenes: ["fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-3.webp"] },
      { nombre: "Look 4 - Inside Introspection Novia", sku: "20208 V", descripcion: "", tags: ["Clásico","Cola","Fluido","Inside","Minimal","Sirena"], imagenes: ["fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-4.webp"] },
      { nombre: "Look 5 - Inside Introspection Novia", sku: "N0018", descripcion: "", tags: ["Inside"], imagenes: ["fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-5-1.webp"] },
      { nombre: "Look 6 - Inside Introspection Novia", sku: "17351 A _ 29350 F", descripcion: "", tags: ["Dos piezas","Inside","Mangas","Midi","Minimal","Recto"], imagenes: ["fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-6-2-1.webp","fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-6-1.webp"] },
      { nombre: "Look 7 - Inside Introspection Novia", sku: "20178 V", descripcion: "", tags: ["Inside","Lencero","Recto","Romántico"], imagenes: ["fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-7-2-1.webp","fely-campo-coleccion-novia-inside-insideintrospectionnovia-look-7-1.webp"] },
    ],
  },
  {
    id: "introspeccion",
    carpeta: "introspeccion",
    nombreColeccion: "Introspección",
    looks: [
      { nombre: "Look 1 - Introspección Novia", sku: "N0028", descripcion: "", tags: ["Introspección"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-1-1.webp","fely-campo-coleccion-novia-introspeccion-look-1-3.webp","fely-campo-coleccion-novia-introspeccion-look-1.webp"] },
      { nombre: "Look 2 - Introspección Novia", sku: "N0029", descripcion: "", tags: ["Introspección"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-2-3.webp","fely-campo-coleccion-novia-introspeccion-look-2-4.webp","fely-campo-coleccion-novia-introspeccion-look-2-2.webp","fely-campo-coleccion-novia-introspeccion-look-2.webp"] },
      { nombre: "Look 3 - Introspección Novia", sku: "20151", descripcion: "", tags: ["Clásico","Cola","Escote espalda","Fluido","Introspección","Lencero","Manga","Princesa","Romántico","Sirena"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-3-3.webp","fely-campo-coleccion-novia-introspeccion-look-3-2.webp","fely-campo-coleccion-novia-introspeccion-look-3.webp"] },
      { nombre: "Look 4 - Introspección Novia", sku: "20142 V", descripcion: "", tags: ["Clásico","Cola","Corte A","Introspección"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-4-3.webp","fely-campo-coleccion-novia-introspeccion-look-4-4.webp","fely-campo-coleccion-novia-introspeccion-look-4.webp","fely-campo-coleccion-novia-introspeccion-look-4-2.webp"] },
      { nombre: "Look 5 - Introspección Novia", sku: "20121 V", descripcion: "", tags: ["Clásico","Escote espalda","Fluido","Introspección","Manga","Romántico","Sirena"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-5.webp","fely-campo-coleccion-novia-introspeccion-look-5-2.webp","fely-campo-coleccion-novia-introspeccion-look-5-3.webp","fely-campo-coleccion-novia-introspeccion-look-5-4.webp"] },
      { nombre: "Look 6 - Introspección Novia", sku: "20195 C _ 20140 V", descripcion: "", tags: ["Cola","Diferente","Dos piezas","Introspección","Manga","Princesa","Romántico"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-6-3.webp","fely-campo-coleccion-novia-introspeccion-look-6-2.webp","fely-campo-coleccion-novia-introspeccion-look-6.webp"] },
      { nombre: "Look 7 - Introspección Novia", sku: "20148 V", descripcion: "", tags: ["Cola","Fluido","Introspección","Manga","Recto","Romántico"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-7-4.webp","fely-campo-coleccion-novia-introspeccion-look-7-3.webp","fely-campo-coleccion-novia-introspeccion-look-7.webp","fely-campo-coleccion-novia-introspeccion-look-7-2.webp"] },
      { nombre: "Look 8 - Introspección Novia", sku: "20141 F _ 20192 T", descripcion: "", tags: ["Clásico","Diferente","Dos piezas","Fluido","Introspección","Recto","Romántico"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-8.webp","fely-campo-coleccion-novia-introspeccion-look-8-2.webp"] },
      { nombre: "Look 9 - Introspección Novia", sku: "20118 V", descripcion: "", tags: ["Clásico","Corte A","Fluido","Introspección","Manga","Minimal"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-9-2.webp","fely-campo-coleccion-novia-introspeccion-look-9-3.webp","fely-campo-coleccion-novia-introspeccion-look-9.webp"] },
      { nombre: "Look 10 - Introspección Novia", sku: "20163 V _ 20163-F F", descripcion: "", tags: ["Clásico","Cola","Dos piezas","Escote espalda","Introspección","Lencero","Princesa"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-10-3.webp","fely-campo-coleccion-novia-introspeccion-look-10-4.webp","fely-campo-coleccion-novia-introspeccion-look-10.webp","fely-campo-coleccion-novia-introspeccion-look-10-2.webp"] },
      { nombre: "Look 11 - Introspección Novia", sku: "20134 V", descripcion: "", tags: ["Clásico","Fluido","Introspección","Recto","Romántico"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-11-3.webp","fely-campo-coleccion-novia-introspeccion-look-11-4.webp","fely-campo-coleccion-novia-introspeccion-look-11.webp","fely-campo-coleccion-novia-introspeccion-look-11-2.webp"] },
      { nombre: "Look 12 - Introspección Novia", sku: "20112 T _ 20135 V", descripcion: "", tags: ["Clásico","Corte A","Dos piezas","Fluido","Introspección","Princesa","Romántico"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-12.webp","fely-campo-coleccion-novia-introspeccion-look-12-2-2.webp","fely-campo-coleccion-novia-introspeccion-look-12-3.webp","fely-campo-coleccion-novia-introspeccion-look-12-2.webp"] },
      { nombre: "Look 13 - Introspección Novia", sku: "N0040", descripcion: "", tags: ["Clásico","Cola","Introspección","Manga","Princesa"], imagenes: ["fely-campo-coleccion-novia-introspeccion-look-13-3.webp","fely-campo-coleccion-novia-introspeccion-look-13.webp","fely-campo-coleccion-novia-introspeccion-look-13-2.webp"] },
    ],
  },
];

export const noviaProductos = COLECCIONES.flatMap(({ carpeta, nombreColeccion, looks }) => looks.map((look) => {
  const rutas = look.imagenes.map((archivo) => `${RUTA_BASE}/${carpeta}/${archivo}`);
  return {
    nombre: look.nombre,
    sku: look.sku || undefined,
    imagen: rutas[0],
    imagenHover: rutas[1] || rutas[0],
    imagenes: rutas,
    descripcion: look.descripcion || `Pieza de la colección ${nombreColeccion}, Novias${look.sku ? ` (SKU ${look.sku})` : ''}. Colores y tallas disponibles próximamente.`,
    tags: look.tags,
    coleccion: nombreColeccion,
  };
}));
