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
      { nombre: "Look 1 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-1-scaled.webp","LOOK-1.2-scaled.webp","LOOK-1.3-scaled.webp"] },
      { nombre: "Look 2 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-2-scaled.webp"] },
      { nombre: "Look 3 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-3-scaled.webp"] },
      { nombre: "Look 4 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-4-scaled.webp","LOOK-4.2-scaled.webp"] },
      { nombre: "Look 5 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-5-scaled.webp","LOOK-5.2-scaled.webp"] },
      { nombre: "Look 6 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-6-scaled.webp"] },
      { nombre: "Look 7 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-7-scaled.webp","LOOK-7.2-scaled.webp"] },
      { nombre: "Look 8 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-8-scaled.webp"] },
      { nombre: "Look 9 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-9-scaled.webp"] },
      { nombre: "Look 10 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-10-scaled.webp","LOOK-10.2-scaled.webp","LOOK-10.3-scaled.webp"] },
      { nombre: "Look 11 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-11-scaled.webp","LOOK-11.2-scaled.webp"] },
      { nombre: "Look 12 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-12-scaled.webp"] },
      { nombre: "Look 13 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-13-1-scaled.webp","LOOK-13.2-scaled.webp"] },
      { nombre: "Look 14 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-14-1-scaled.webp"] },
      { nombre: "Look 15 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-15-1-scaled.webp","LOOK-15.2-1-scaled.webp"] },
      { nombre: "Look 16 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-16.3-scaled.webp","LOOK-16.2-scaled.webp","LOOK-16-scaled.webp"] },
      { nombre: "Look 17 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-17-scaled.webp","LOOK-17.2-scaled.webp"] },
      { nombre: "Look 18 - Bride 27", sku: "", descripcion: "Vestido Novia nueva colección 26/27", tags: ["Bride 27"], imagenes: ["LOOK-19-scaled.webp"] },
    ],
  },
  {
    id: "me",
    carpeta: "me",
    nombreColeccion: "ME",
    looks: [
      { nombre: "Look 1 - ME Bridal", sku: "23303 V", descripcion: "Vestido de líneas lápiz, con detalle pieza corsé en cintura. Escote en espalda cuadrado pronunciado. Detalle de manga abullonada en satén azul.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-1-2.webp","Fely-Campo-Colecciones-Novia-ME-Look-1-1.webp","Fely-Campo-Colecciones-Novia-ME-Look-1-3.webp","Fely-Campo-Colecciones-Novia-ME-Look-1-4.webp"] },
      { nombre: "Look 2 - ME Bridal", sku: "23308 V", descripcion: "Vestido de línea recta inspiración años 20, con detalles de banda encaje en cuerpo, falda tableada con ligeros recogidos. Detalle de botones y caídas con satén azul.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-2-1.webp","Fely-Campo-Colecciones-Novia-ME-Look-2-2.webp"] },
      { nombre: "Look 3 - ME Bridal", sku: "23303 V C", descripcion: "Vestido de líneas lápiz, con detalle pieza corsé en cintura. Escote en espalda cuadrado pronunciado. Detalle de manga abullonada en satén azul. Capa en gasa de Seda", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-3-2.webp","Fely-Campo-Colecciones-Novia-ME-Look-3-3.webp","Fely-Campo-Colecciones-Novia-ME-Look-3-4.webp","Fely-Campo-Colecciones-Novia-ME-Look-3-1.webp"] },
      { nombre: "Look 4 - ME Bridal", sku: "23301 A - 23304 V", descripcion: "Abrigo de manga japonesa abullonadas, con detalle de escote en espalda con cuello al bies, colas cuadradas. Combinado con vestido de satén con brillo de silueta lápiz con espalda volada.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-4-3.webp","Fely-Campo-Colecciones-Novia-ME-Look-4-2.webp","Fely-Campo-Colecciones-Novia-ME-Look-4-4.webp","Fely-Campo-Colecciones-Novia-ME-Look-4-1.webp"] },
      { nombre: "Look 5 - ME Bridal", sku: "23305 V F", descripcion: "Conjunto 3 piezas de cuerpo de encaje, con manga abullonada y abertura en espalda. Combinación de raso y falda de tafetán en línea A con grandes godets.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-5-2.webp","Fely-Campo-Colecciones-Novia-ME-Look-5-4.webp","Fely-Campo-Colecciones-Novia-ME-Look-5-3.webp","Fely-Campo-Colecciones-Novia-ME-Look-5-1.webp"] },
      { nombre: "Look 6 - ME Bridal", sku: "23304 V", descripcion: "Vestido de escote recto, con tirante fino, de líneas puras con detalle de escote espalda separada, Confeccionado en raso de seda.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-6-2-.webp","Fely-Campo-Colecciones-Novia-ME-Look-6-1-.webp","Fely-Campo-Colecciones-Novia-ME-Look-6-4.webp","Fely-Campo-Colecciones-Novia-ME-Look-6-3.webp"] },
      { nombre: "Look 7 - ME Bridal", sku: "23310 V", descripcion: "Vestido de línea A, con esote bañera, hombros al descubiertos, manga larga. En delantero detalle abullonado en satén, en espalda escote cuadrado. Confeccionado en crep.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-7-4-.webp","Fely-Campo-Colecciones-Novia-ME-Look-7-3-.webp","Fely-Campo-Colecciones-Novia-ME-Look-7-1-.webp","Fely-Campo-Colecciones-Novia-ME-Look-7-6-.webp","Fely-Campo-Colecciones-Novia-ME-Look-7-2-.webp","Fely-Campo-Colecciones-Novia-ME-Look-7-5-.webp"] },
      { nombre: "Look 8 - ME Bridal", sku: "23MB25 V", descripcion: "Vestido de largos asimétricos, corto por delante y con cola. Escote cuadrado muy pronunciado en espalda, confeccionado en tafetán con textura y detalle de pedrería con perlas en delantero. Manguitos con caídas largas.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-83.webp","Fely-Campo-Colecciones-Novia-ME-Look-82.webp","Fely-Campo-Colecciones-Novia-ME-Look-81.webp"] },
      { nombre: "Look 9 - ME Bridal", sku: "23302 V", descripcion: "Vestido línea A, con manga larga, y escote pronunciado en espalda. Confeccionado en raso con flores brocadas, con detalle de botones en espalda en satén azul.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-94.webp","Fely-Campo-Colecciones-Novia-ME-Look-92.webp","Fely-Campo-Colecciones-Novia-ME-Look-91.webp","Fely-Campo-Colecciones-Novia-ME-Look-93.webp"] },
      { nombre: "Look 10 - ME Bridal", sku: "23307 A - 23306 V", descripcion: "Abrigo de líneas geométricas, con cuello chimenea, y abertura pronunciada en espalda con colas. Combinado con vestido de saten tafetanado, de falda tableada.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-103.webp","Fely-Campo-Colecciones-Novia-ME-Look-101.webp","Fely-Campo-Colecciones-Novia-ME-Look-102.webp"] },
      { nombre: "Look 11 - ME Bridal", sku: "23314 C - 23309 V", descripcion: "Vestido de silueta sirena, confeccionado en crep. Con hombro metido y escote delantero a pico. Detalle de tul bordado en flores de perlas y lentejuelas en cuerpo. Capa confeccionada en crep, con gran vuelo.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-111.webp","Fely-Campo-Colecciones-Novia-ME-Look-112.webp","Fely-Campo-Colecciones-Novia-ME-Look-113.webp"] },
      { nombre: "Look 12 - ME Bridal", sku: "23306 V", descripcion: "Vestido entallado en cuerpo, con falda de vuelo tableada. Detalle de cinturón lazos a altura de cadera. Confeccionado en satén tafetaneado.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-122.webp","Fely-Campo-Colecciones-Novia-ME-Look-121.webp","Fely-Campo-Colecciones-Novia-ME-Look-123.webp"] },
      { nombre: "Look 13 - ME Bridal", sku: "23MB22 V", descripcion: "Vestido midi, silueta A, con cancán pronunciado en falda, de tules. Escote en espalda. Confeccionado a mano en red de pedrería y perlas.", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-132.webp","Fely-Campo-Colecciones-Novia-ME-Look-131.webp","Fely-Campo-Colecciones-Novia-ME-Look-133.webp"] },
      { nombre: "Look 14 - ME Bridal", sku: "23311 V", descripcion: "Vestido baby doll, confeccionado en tul y encaje de red con tonos holográficos. Escotes cuadrados pronunciados. Detalle de guantes abullonados", tags: ["ME"], imagenes: ["Fely-Campo-Colecciones-Novia-ME-Look-142.webp","Fely-Campo-Colecciones-Novia-ME-Look-143.webp","Fely-Campo-Colecciones-Novia-ME-Look-144.webp","Fely-Campo-Colecciones-Novia-ME-Look-141.webp"] },
    ],
  },
  {
    id: "bambu",
    carpeta: "bambu",
    nombreColeccion: "Bambú Novia",
    looks: [
      { nombre: "Look 1 - Bambú Novia", sku: "N0001", descripcion: "", tags: ["Bambú Novia","Diferente","Escote espalda","Fluido","Manga","Romántico","Sirena"], imagenes: ["010coleccionesnovia-bambunovia-look1-felycampo-2.webp","011coleccionesnovia-bambunovia-look1-felycampo-3.webp","012coleccionesnovia-bambunovia-look1-felycampo.webp"] },
      { nombre: "Look 2 - Bambú Novia", sku: "22204 V", descripcion: "", tags: ["Bambú Novia","Clásico","Escote espalda","Fluido","Manga","Minimal","Recto"], imagenes: ["014coleccionesnovia-bambunovia-look2-felycampo.webp","013coleccionesnovia-bambunovia-look2-felycampo-2.webp"] },
      { nombre: "Look 3 - Bambú Novia", sku: "22202 V", descripcion: "", tags: ["Bambú Novia","Clásico","Princesa","Romántico"], imagenes: ["016coleccionesnovia-bambunovia-look3-felycampo.webp","015coleccionesnovia-bambunovia-look3-felycampo-2.webp"] },
      { nombre: "Look 4 - Bambú Novia", sku: "20187 V", descripcion: "", tags: ["Bambú Novia","Cola","Corte A","Diferente","Dos piezas","Escote espalda","Fluido","Lencero","Minimal","Sirena"], imagenes: ["019coleccionesnovia-bambunovia-look4-felycampo.webp","018coleccionesnovia-bambunovia-look4-felycampo-3.webp","017coleccionesnovia-bambunovia-look4-felycampo-2.webp"] },
      { nombre: "Look 5 - Bambú Novia", sku: "14210 V", descripcion: "", tags: ["Bambú Novia","Diferente","Escote espalda","Sirena"], imagenes: ["022coleccionesnovia-bambunovia-look5-felycampo.webp","021coleccionesnovia-bambunovia-look5-felycampo3.webp","020coleccionesnovia-bambunovia-look5-felycampo2.webp"] },
      { nombre: "Look 6 - Bambú Novia", sku: "19184 P", descripcion: "", tags: ["Bambú Novia","Corte A","Diferente","Dos piezas","Fluido","Manga","Minimal","Recto"], imagenes: ["023coleccionesnovia-bambunovia-look6-felycampo-2.webp","024coleccionesnovia-bambunovia-look6-felycampo-3.webp","025coleccionesnovia-bambunovia-look6-felycampo-4.webp","026coleccionesnovia-bambunovia-look6-felycampo.webp"] },
      { nombre: "Look 7 - Bambú Novia", sku: "22201 V", descripcion: "", tags: ["Bambú Novia","Clásico","Cola","Dos piezas","Escote espalda","Fluido","Lencero","Minimal","Recto","Romántico","Sirena"], imagenes: ["028coleccionesnovia-bambunovia-look7-felycampo.webp","027coleccionesnovia-bambunovia-look7-felycampo-2.webp"] },
      { nombre: "Look 8 - Bambú Novia", sku: "20172 V", descripcion: "", tags: ["Bambú Novia","Cola","Diferente","Dos piezas","Escote espalda","Princesa","Romántico"], imagenes: ["032coleccionesnovia-bambunovia-look8-felycampo.webp","030coleccionesnovia-bambunovia-look8-felycampo3.webp","031coleccionesnovia-bambunovia-look8-felycampo4.webp","029coleccionesnovia-bambunovia-look8-felycampo2.webp"] },
      { nombre: "Look 9 - Bambú Novia", sku: "20183 V", descripcion: "", tags: ["Bambú Novia","Clásico","Manga","Princesa"], imagenes: ["034coleccionesnovia-bambunovia-look9-felycampo.webp","033coleccionesnovia-bambunovia-look9-felycampo-2.webp"] },
      { nombre: "Look 10 - Bambú Novia", sku: "19184 C _ 19161 P", descripcion: "", tags: ["Bambú Novia","Clásico","Diferente","Dos piezas","Escote espalda","Fluido","Lencero","Manga","Minimal"], imagenes: ["002coleccionesnovia-bambunovia-look10-felycampo.webp","001coleccionesnovia-bambunovia-look10-felycampo2.webp"] },
      { nombre: "Look 11 - Bambú Novia", sku: "20210 V", descripcion: "", tags: ["Bambú Novia","Clásico","Fluido","Manga","Midi","Minimal","Recto"], imagenes: ["003coleccionesnovia-bambunovia-look11-felycampo.webp"] },
      { nombre: "Look 12 - Bambú Novia", sku: "20115 V", descripcion: "", tags: ["Bambú Novia","Cola","Corte A","Diferente","Midi"], imagenes: ["007coleccionesnovia-bambunovia-look12-felycampo.webp","005coleccionesnovia-bambunovia-look12-felycampo3.webp","004coleccionesnovia-bambunovia-look12-felycampo-2.webp","006coleccionesnovia-bambunovia-look12-felycampo4.webp"] },
      { nombre: "Look 13 - Bambú Novia", sku: "N0013", descripcion: "", tags: ["Bambú Novia"], imagenes: ["009coleccionesnovia-bambunovia-look13-felycampo.webp","008coleccionesnovia-bambunovia-look13-felycampo2.webp"] },
    ],
  },
  {
    id: "savia",
    carpeta: "savia",
    nombreColeccion: "Savia Novia",
    looks: [
      { nombre: "Look 1 - Savia Novia", sku: "N0041", descripcion: "", tags: ["Savia Novia"], imagenes: ["002coleccionesnovia-savia-novia-look1-felycampo-2.webp","003coleccionesnovia-savia-novia-look1-felycampo.webp"] },
      { nombre: "Look 2 - Savia Novia", sku: "N0042", descripcion: "", tags: ["Savia Novia"], imagenes: ["005coleccionesnovia-savia-novia-look2-felycampo.webp","004coleccionesnovia-savia-novia-look2-felycampo2.webp"] },
      { nombre: "Look 3 - Savia Novia", sku: "N0043", descripcion: "", tags: ["Savia Novia"], imagenes: ["006coleccionesnovia-savia-novia-look3-felycampo2.webp","007coleccionesnovia-savia-novia-look3-felycampo.webp"] },
      { nombre: "Look 4 - Savia Novia", sku: "N0044", descripcion: "", tags: ["Savia Novia"], imagenes: ["009coleccionesnovia-savia-novia-look4-felycampo.webp","008coleccionesnovia-savia-novia-look4-felycampo2.webp"] },
      { nombre: "Look 5 - Savia Novia", sku: "N0045", descripcion: "", tags: ["Savia Novia"], imagenes: ["011coleccionesnovia-savia-novia-look5-felycampo.webp","010coleccionesnovia-savia-novia-look5-felycampo2.webp"] },
      { nombre: "Look 6 - Savia Novia", sku: "N0046", descripcion: "", tags: ["Savia Novia"], imagenes: ["013coleccionesnovia-savia-novia-look6-felycampo.webp","012coleccionesnovia-savia-novia-look6-felycampo2.webp"] },
      { nombre: "Look 7 - Savia Novia", sku: "N0047", descripcion: "", tags: ["Savia Novia"], imagenes: ["015coleccionesnovia-savia-novia-look7-felycampo.webp","014coleccionesnovia-savia-novia-look7-felycampo2.webp"] },
      { nombre: "Look 8 - Savia Novia", sku: "N0048", descripcion: "", tags: ["Savia Novia"], imagenes: ["016coleccionesnovia-savia-novia-look8-felycampo2.webp","017coleccionesnovia-savia-novia-look8-felycampo.webp"] },
      { nombre: "Look 9 - Savia Novia", sku: "N0049", descripcion: "", tags: ["Savia Novia"], imagenes: ["018coleccionesnovia-savia-novia-look9-felycampo.webp","001coleccionesnovia-savia-novia-look10-felycampo2.webp"] },
    ],
  },
  {
    id: "inside",
    carpeta: "inside",
    nombreColeccion: "Inside",
    looks: [
      { nombre: "Look 1 - Inside Introspection Novia", sku: "17130 N", descripcion: "", tags: ["Clásico","Cola","Diferente","Escote espalda","Fluido","Inside","Lencero","Manga","Minimal","Princesa","Recto","Romántico"], imagenes: ["001coleccionesnovia-insideintrospectionnovia-look1-felycampo2.webp","002coleccionesnovia-insideintrospectionnovia-look1-felycampo.webp"] },
      { nombre: "Look 2 - Inside Introspection Novia", sku: "20211 V", descripcion: "", tags: ["Clásico","Escote espalda","Inside","Minimal","Princesa"], imagenes: ["003coleccionesnovia-insideintrospectionnovia-look2-felycampo-2.webp","004coleccionesnovia-insideintrospectionnovia-look2-felycampo.webp"] },
      { nombre: "Look 3 - Inside Introspection Novia", sku: "20209 V", descripcion: "", tags: ["Cola","Diferente","Fluido","Inside","Manga","Minimal","Recto","Sirena"], imagenes: ["005coleccionesnovia-insideintrospectionnovia-look3-felycampo.webp"] },
      { nombre: "Look 4 - Inside Introspection Novia", sku: "20208 V", descripcion: "", tags: ["Clásico","Cola","Fluido","Inside","Minimal","Sirena"], imagenes: ["006coleccionesnovia-insideintrospectionnovia-look4-felycampo.webp"] },
      { nombre: "Look 5 - Inside Introspection Novia", sku: "N0018", descripcion: "", tags: ["Inside"], imagenes: ["007coleccionesnovia-insideintrospectionnovia-look5-felycampo-1.webp"] },
      { nombre: "Look 6 - Inside Introspection Novia", sku: "17351 A _ 29350 F", descripcion: "", tags: ["Dos piezas","Inside","Mangas","Midi","Minimal","Recto"], imagenes: ["008coleccionesnovia-insideintrospectionnovia-look6-felycampo-2-1.webp","009coleccionesnovia-insideintrospectionnovia-look6-felycampo-1.webp"] },
      { nombre: "Look 7 - Inside Introspection Novia", sku: "20178 V", descripcion: "", tags: ["Inside","Lencero","Recto","Romántico"], imagenes: ["010coleccionesnovia-insideintrospectionnovia-look7-felycampo-2-1.webp","011coleccionesnovia-insideintrospectionnovia-look7-felycampo-1.webp"] },
    ],
  },
  {
    id: "introspeccion",
    carpeta: "introspeccion",
    nombreColeccion: "Introspección",
    looks: [
      { nombre: "Look 1 - Introspección Novia", sku: "N0028", descripcion: "", tags: ["Introspección"], imagenes: ["016coleccionesnovia-introspeccionnovia-look1-felycampo1.webp","017coleccionesnovia-introspeccionnovia-look1-felycampo3.webp","018coleccionesnovia-introspeccionnovia-look1-felycampo.webp"] },
      { nombre: "Look 2 - Introspección Novia", sku: "N0029", descripcion: "", tags: ["Introspección"], imagenes: ["019coleccionesnovia-introspeccionnovia-look2-felycampo-3.webp","020coleccionesnovia-introspeccionnovia-look2-felycampo-4.webp","021coleccionesnovia-introspeccionnovia-look2-felycampo2.webp","022coleccionesnovia-introspeccionnovia-look2-felycampo.webp"] },
      { nombre: "Look 3 - Introspección Novia", sku: "20151", descripcion: "", tags: ["Clásico","Cola","Escote espalda","Fluido","Introspección","Lencero","Manga","Princesa","Romántico","Sirena"], imagenes: ["024coleccionesnovia-introspeccionnovia-look3-felycampo-3.webp","023coleccionesnovia-introspeccionnovia-look3-felycampo-2.webp","025coleccionesnovia-introspeccionnovia-look3-felycampo.webp"] },
      { nombre: "Look 4 - Introspección Novia", sku: "20142 V", descripcion: "", tags: ["Clásico","Cola","Corte A","Introspección"], imagenes: ["028coleccionesnovia-introspeccionnovia-look4-felycampo3.webp","026coleccionesnovia-introspeccionnovia-look4-felycampo-4.webp","029coleccionesnovia-introspeccionnovia-look4-felycampo.webp","027coleccionesnovia-introspeccionnovia-look4-felycampo2.webp"] },
      { nombre: "Look 5 - Introspección Novia", sku: "20121 V", descripcion: "", tags: ["Clásico","Escote espalda","Fluido","Introspección","Manga","Romántico","Sirena"], imagenes: ["033coleccionesnovia-introspeccionnovia-look5-felycampo.webp","030coleccionesnovia-introspeccionnovia-look5-felycampo2.webp","031coleccionesnovia-introspeccionnovia-look5-felycampo3.webp","032coleccionesnovia-introspeccionnovia-look5-felycampo4.webp"] },
      { nombre: "Look 6 - Introspección Novia", sku: "20195 C _ 20140 V", descripcion: "", tags: ["Cola","Diferente","Dos piezas","Introspección","Manga","Princesa","Romántico"], imagenes: ["034coleccionesnovia-introspeccionnovia-look6-felycampo-3.webp","035coleccionesnovia-introspeccionnovia-look6-felycampo2.webp","036coleccionesnovia-introspeccionnovia-look6-felycampo.webp"] },
      { nombre: "Look 7 - Introspección Novia", sku: "20148 V", descripcion: "", tags: ["Cola","Fluido","Introspección","Manga","Recto","Romántico"], imagenes: ["039coleccionesnovia-introspeccionnovia-look7-felycampo4.webp","038coleccionesnovia-introspeccionnovia-look7-felycampo3.webp","040coleccionesnovia-introspeccionnovia-look7-felycampo.webp","037coleccionesnovia-introspeccionnovia-look7-felycampo2.webp"] },
      { nombre: "Look 8 - Introspección Novia", sku: "20141 F _ 20192 T", descripcion: "", tags: ["Clásico","Diferente","Dos piezas","Fluido","Introspección","Recto","Romántico"], imagenes: ["042coleccionesnovia-introspeccionnovia-look8-felycampo.webp","041coleccionesnovia-introspeccionnovia-look8-felycampo2.webp"] },
      { nombre: "Look 9 - Introspección Novia", sku: "20118 V", descripcion: "", tags: ["Clásico","Corte A","Fluido","Introspección","Manga","Minimal"], imagenes: ["043coleccionesnovia-introspeccionnovia-look9-felycampo-2.webp","044coleccionesnovia-introspeccionnovia-look9-felycampo-3.webp","045coleccionesnovia-introspeccionnovia-look9-felycampo.webp"] },
      { nombre: "Look 10 - Introspección Novia", sku: "20163 V _ 20163-F F", descripcion: "", tags: ["Clásico","Cola","Dos piezas","Escote espalda","Introspección","Lencero","Princesa"], imagenes: ["001coleccionesnovia-introspeccionnovia-look10-felycampo-3.webp","002coleccionesnovia-introspeccionnovia-look10-felycampo-4.webp","004coleccionesnovia-introspeccionnovia-look10-felycampo.webp","003coleccionesnovia-introspeccionnovia-look10-felycampo2.webp"] },
      { nombre: "Look 11 - Introspección Novia", sku: "20134 V", descripcion: "", tags: ["Clásico","Fluido","Introspección","Recto","Romántico"], imagenes: ["006coleccionesnovia-introspeccionnovia-look11-felycampo-3.webp","007coleccionesnovia-introspeccionnovia-look11-felycampo-4.webp","008coleccionesnovia-introspeccionnovia-look11-felycampo.webp","005coleccionesnovia-introspeccionnovia-look11-felycampo-2.webp"] },
      { nombre: "Look 12 - Introspección Novia", sku: "20112 T _ 20135 V", descripcion: "", tags: ["Clásico","Corte A","Dos piezas","Fluido","Introspección","Princesa","Romántico"], imagenes: ["012coleccionesnovia-introspeccionnovia-look12-felycampo.webp","011coleccionesnovia-introspeccionnovia-look12-felycampo2.webp","010coleccionesnovia-introspeccionnovia-look12-felycampo-3.webp","009coleccionesnovia-introspeccionnovia-look12-felycampo-2.webp"] },
      { nombre: "Look 13 - Introspección Novia", sku: "N0040", descripcion: "", tags: ["Clásico","Cola","Introspección","Manga","Princesa"], imagenes: ["014coleccionesnovia-introspeccionnovia-look13-felycampo3.webp","015coleccionesnovia-introspeccionnovia-look13-felycampo.webp","013coleccionesnovia-introspeccionnovia-look13-felycampo2.webp"] },
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
