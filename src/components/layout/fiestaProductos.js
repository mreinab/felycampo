// fiestaProductos.js
//
// Catálogo real de Atelier > Fiesta — sustituye a productosEjemplo.js (y a
// furisodeProductos.js, que se elimina: su contenido vive ahora aquí, dentro
// de la colección "furisode") en /atelier/fiesta y su ficha de producto (ver
// page.js, categoria/[categoria]/page.js y FichaProductoAtelier.jsx), mismo
// criterio y misma forma de objeto que noviaProductos.js en Atelier > Novias.
//
// Fuentes de datos, una por colección (todas en public/img/collections/fiesta/
// <coleccion>/):
// - Furisode: sin -info.xlsx — el usuario pegó la tabla (SKU, Look, Tags) en
//   el chat; las imágenes por look ya estaban resueltas de antes (mismo orden
//   que el furisodeProductos.js original, con la foto de frente primero).
// - Essentielle: ELIMINADA del catálogo (a petición). Antes: tampoco tiene -info.xlsx (y no existe "Look 1": ni en los
//   datos pegados por el usuario ni en las fotos de la carpeta — empieza en
//   Look 2) — mismo caso que Furisode, tabla pegada en el chat. Las imágenes
//   SÍ hay que agruparlas a mano por número de look a partir del propio
//   nombre de archivo (...look9-felycampo3.webp) y ordenarlas por su
//   prefijo numérico de subida (001, 002...): a diferencia del resto de
//   colecciones, aquí NO hay una columna "Imágenes (archivos)" que ya traiga
//   la foto de frente curada en primer lugar, así que el orden dentro de
//   cada look es solo una aproximación (el prefijo de subida), no una
//   curación real — candidata a la misma auditoría visual que ya se hizo en
//   noviaProductos.js si hace falta.
// - Miscelanea, Savia, Bambú, A Walk, En Madrid, Prêt-à-porter, Primavera
//   Verano 2025 y Primavera Verano 2026: cada una con su propio -info.xlsx
//   real (mismas columnas que en Novias: Look, Nombre, SKU, [Descripción],
//   Tags (categoría), Imágenes (archivos) — Prêt-à-porter es la excepción,
//   solo Nombre/Descripción/Imágenes, sin Look/SKU/Tags: son prendas de
//   temporada con nombre propio, no "looks" numerados de pasarela).
// - Primavera Verano 2027 (SS27): sin -info.xlsx y sin ninguna tabla — el
//   usuario pidió construirla igualmente (ver conversación) usando el SKU ya
//   codificado en el propio nombre de archivo (ej. "27006-127_01.jpg" ->
//   SKU "27006-127") como único dato real; sin tags ni descripción propia
//   hasta que llegue esa información.
//
// Orden de colecciones: de la más reciente a la más antigua (Primavera
// Verano 2027/SS27 primero, Furisode al final) — mismo criterio que
// noviaProductos.js y que el desplegable de colecciones ya existente en
// atelier/fiesta/page.js.
//
// "nombre": único en todo el catálogo (comprobado al generar este archivo) —
// dan el slug de la ficha de producto (slugify(), ver /lib/slugify.js).
// "sku": mostrado en la ficha (ver InfoAtelier.jsx) solo si no está vacío.
// "descripcion": la columna "Descripción" del excel tal cual cuando existe
// (Primavera Verano 2025 la trae completa; Prêt-à-porter solo en 13 de sus
// 27 prendas) — el resto usa la misma plantilla genérica que noviaProductos.js
// (colección + SKU), y sin SKU (Prêt-à-porter, SS27) se omite ese paréntesis.
// "tags": columna "Tags (categoría)" completa como array, o la tabla pegada
// en el chat (Furisode/Essentielle) — SS27 no tiene ninguna todavía.

const RUTA_BASE = '/img/collections/fiesta';

const COLECCIONES = [
  // 27_Eclat (SS27) comentada a petición: fuera de la cuadrícula de
  // /atelier/fiesta (y de sus fichas/admin, que leen este mismo array).
  // Las fotos siguen en public/img/collections/fiesta/ss27-coleccion/ —
  // para recuperarla, descomentar el bloque.
//   {
//     id: "ss27-coleccion",
//     carpeta: "ss27-coleccion",
//     nombreColeccion: "27_Eclat",
//     looks: [
//       { nombre: "Look 1 27_Eclat", sku: "27006-127", descripcion: "", tags: [], imagenes: ["27006-127_03.jpg","27006-127_04.jpg","27006-127_01.jpg","27006-127_02.jpg"] },
//       { nombre: "Look 2 27_Eclat", sku: "27007-330", descripcion: "", tags: [], imagenes: ["27007-330_02.jpg","27007-330_03.jpg","27007-330_01.jpg","27007-330_04.jpg"] },
//       { nombre: "Look 3 27_Eclat", sku: "27008", descripcion: "", tags: [], imagenes: ["27008_01.jpg","27008_02.jpg","27008_03.jpg"] },
//       { nombre: "Look 4 27_Eclat", sku: "27010-653", descripcion: "", tags: [], imagenes: ["27010-653_01.jpg","27010-653_02.jpg","27010-653_03.jpg"] },
//       { nombre: "Look 5 27_Eclat", sku: "27012-330", descripcion: "", tags: [], imagenes: ["27012-330_01.jpg","27012-330_02.jpg","27012-330_03.jpg"] },
//       { nombre: "Look 6 27_Eclat", sku: "27015-544", descripcion: "", tags: [], imagenes: ["27015-544_01.jpg","27015-544_02.jpg","27015-544_03.jpg"] },
//       { nombre: "Look 7 27_Eclat", sku: "27016-210", descripcion: "", tags: [], imagenes: ["27016-210_01.jpg","27016-210_02.jpg","27016-210_03.jpg"] },
//       { nombre: "Look 8 27_Eclat", sku: "27020-458", descripcion: "", tags: [], imagenes: ["27020-458_02.jpg","27020-458_01.jpg","27020-458_03.jpg"] },
//       { nombre: "Look 9 27_Eclat", sku: "27020-77", descripcion: "", tags: [], imagenes: ["27020-77_02.jpg","27020-77_03.jpg","27020-77_01.jpg","27020-77_04.jpg"] },
//       { nombre: "Look 10 27_Eclat", sku: "27021-544", descripcion: "", tags: [], imagenes: ["27021-544_01.jpg","27021-544_02.jpg","27021-544_03.jpg"] },
//       { nombre: "Look 11 27_Eclat", sku: "27026-461", descripcion: "", tags: [], imagenes: ["27026-461_01.jpg","27026-461_02.jpg","27026-461_03.jpg"] },
//       { nombre: "Look 12 27_Eclat", sku: "27028-130", descripcion: "", tags: [], imagenes: ["27028-130_04.jpg","27028-130_01.jpg","27028-130_03.jpg","27028-130_02.jpg"] },
//       { nombre: "Look 13 27_Eclat", sku: "27029-595", descripcion: "", tags: [], imagenes: ["27029-595_01.jpg","27029-595_02.jpg","27029-595_03.jpg"] },
//       { nombre: "Look 14 27_Eclat", sku: "27030-458", descripcion: "", tags: [], imagenes: ["27030-458_01.jpg","27030-458_02.jpg","27030-458_03.jpg"] },
//       { nombre: "Look 15 27_Eclat", sku: "27031-330", descripcion: "", tags: [], imagenes: ["27031-330_01.jpg","27031-330_02.jpg","27031-330_03.jpg"] },
//       { nombre: "Look 16 27_Eclat", sku: "27033-595", descripcion: "", tags: [], imagenes: ["27033-595_02.jpg","27033-595_03.jpg","27033-595_01.jpg"] },
//       { nombre: "Look 17 27_Eclat", sku: "27034-77", descripcion: "", tags: [], imagenes: ["27034-77_02.jpg","27034-77_01.jpg","27034-77_03.jpg"] },
//       { nombre: "Look 18 27_Eclat", sku: "27035-149", descripcion: "", tags: [], imagenes: ["27035-149_01.jpg","27035-149_02.jpg","27035-149_03.jpg","27035-149_04.jpg"] },
//       { nombre: "Look 19 27_Eclat", sku: "27039-544", descripcion: "", tags: [], imagenes: ["27039-544_01.jpg","27039-544_02.jpg","27039-544_03.jpg"] },
//       { nombre: "Look 20 27_Eclat", sku: "27042-273", descripcion: "", tags: [], imagenes: ["27042-273_03.jpg","27042-273_01.jpg","27042-273_02.jpg"] },
//       { nombre: "Look 21 27_Eclat", sku: "27044-343", descripcion: "", tags: [], imagenes: ["27044-343_03.jpg","27044-343_01.jpg","27044-343_02.jpg"] },
//       { nombre: "Look 22 27_Eclat", sku: "27045-149", descripcion: "", tags: [], imagenes: ["27045-149_01.jpg","27045-149_02.jpg","27045-149_03.jpg"] },
//       { nombre: "Look 23 27_Eclat", sku: "27052-461", descripcion: "", tags: [], imagenes: ["27052-461_01.jpg","27052-461_02.jpg","27052-461_03.jpg"] },
//       { nombre: "Look 24 27_Eclat", sku: "27055", descripcion: "", tags: [], imagenes: ["27055_03.jpg","27055_01.jpg","27055_02.jpg"] },
//       { nombre: "Look 25 27_Eclat", sku: "27059-595", descripcion: "", tags: [], imagenes: ["27059-595_01.jpg","27059-595_02.jpg","27059-595_03.jpg"] },
//       { nombre: "Look 26 27_Eclat", sku: "27061-599", descripcion: "", tags: [], imagenes: ["27061-599_01.jpg","27061-599_02.jpg","27061-599_03.jpg"] },
//       { nombre: "Look 27 27_Eclat", sku: "27062-599", descripcion: "", tags: [], imagenes: ["27062-599_01.jpg","27062-599_02.jpg","27062-599_03.jpg"] },
//       { nombre: "Look 28 27_Eclat", sku: "27064-77", descripcion: "", tags: [], imagenes: ["27064-77_01.jpg","27064-77_02.jpg"] },
//       { nombre: "Look 29 27_Eclat", sku: "27065-597", descripcion: "", tags: [], imagenes: ["27065-597_02.jpg","27065-597_03.jpg","27065-597_01.jpg"] },
//       { nombre: "Look 30 27_Eclat", sku: "27069", descripcion: "", tags: [], imagenes: ["27069_03.jpg","27069_01.jpg","27069_02.jpg"] },
//       { nombre: "Look 31 27_Eclat", sku: "27070-382", descripcion: "", tags: [], imagenes: ["27070-382_01.jpg","27070-382_02.jpg","27070-382_03.jpg"] },
//       { nombre: "Look 32 27_Eclat", sku: "27073-458", descripcion: "", tags: [], imagenes: ["27073-458_01.jpg","27073-458_02.jpg","27073-458_03.jpg"] },
//       { nombre: "Look 33 27_Eclat", sku: "27074-458", descripcion: "", tags: [], imagenes: ["27074-458_01.jpg","27074-458_02.jpg","27074-458_03.jpg"] },
//       { nombre: "Look 34 27_Eclat", sku: "27076-77", descripcion: "", tags: [], imagenes: ["27076-77_01.jpg","27076-77_02.jpg","27076-77_03.jpg"] },
//       { nombre: "Look 35 27_Eclat", sku: "27084", descripcion: "", tags: [], imagenes: ["27084_01.jpg","27084_02.jpg","27084_03.jpg"] },
//       { nombre: "Look 36 27_Eclat", sku: "27091-610", descripcion: "", tags: [], imagenes: ["27091-610_01.jpg","27091-610_02.jpg","27091-610_03.jpg"] },
//       { nombre: "Look 37 27_Eclat", sku: "27190", descripcion: "", tags: [], imagenes: ["27190_01.jpg","27190_02.jpg","27190_03.jpg"] },
//     ],
//   },
  {
    id: "primavera-verano-26",
    carpeta: "primavera-verano-26",
    nombreColeccion: "26_Opaline",
    looks: [
      { nombre: "Look 1 26_Opaline", sku: "10001", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-13.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-14.webp"] },
      { nombre: "Look 2 26_Opaline", sku: "10002", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-17.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-16.webp"] },
      { nombre: "Look 3 26_Opaline", sku: "10003", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-20.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-19.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-26.webp"] },
      { nombre: "Look 4 26_Opaline", sku: "10004", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-28.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-26.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-22.webp"] },
      { nombre: "Look 5 26_Opaline", sku: "10005", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-29.webp"] },
      { nombre: "Look 6 26_Opaline", sku: "10006", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-45.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-46.webp"] },
      { nombre: "Look 7 26_Opaline", sku: "10007", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-48.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-46.webp"] },
      { nombre: "Look 8 26_Opaline", sku: "10008", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-51.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-50.webp"] },
      { nombre: "Look 9 26_Opaline", sku: "10009", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-54.webp"] },
      { nombre: "Look 10 26_Opaline", sku: "100010", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-65.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-66.webp"] },
      { nombre: "Look 11 26_Opaline", sku: "100011", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-68.webp"] },
      { nombre: "Look 12 26_Opaline", sku: "100012", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-71.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-72.webp"] },
      { nombre: "Look 13 26_Opaline", sku: "100013", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-73.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-72.webp"] },
      { nombre: "Look 14 26_Opaline", sku: "100014", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-83.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-80.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-82.webp"] },
      { nombre: "Look 15 26_Opaline", sku: "100015", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-90.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-88.webp"] },
      { nombre: "Look 16 26_Opaline", sku: "100016", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-93.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-94.webp"] },
      { nombre: "Look 17 26_Opaline", sku: "100017", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-95.webp"] },
      { nombre: "Look 18 26_Opaline", sku: "100018", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-98.webp"] },
      { nombre: "Look 19 26_Opaline", sku: "100019", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-100.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-101.webp"] },
      { nombre: "Look 20 26_Opaline", sku: "100020", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-103.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-104.webp"] },
      { nombre: "Look 21 26_Opaline", sku: "100021", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-108.webp"] },
      { nombre: "Look 22 26_Opaline", sku: "100022", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-110.webp"] },
      { nombre: "Look 23 26_Opaline", sku: "100023", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-111.webp"] },
      { nombre: "Look 24 26_Opaline", sku: "100024", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-115.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-113.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-116.webp"] },
      { nombre: "Look 25 26_Opaline", sku: "100025", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-5.webp"] },
      { nombre: "Look 26 26_Opaline", sku: "100026", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-8.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-7.webp"] },
      { nombre: "Look 27 26_Opaline", sku: "100027", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-11.webp"] },
      { nombre: "Look 28 26_Opaline", sku: "100028", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-31.webp"] },
      { nombre: "Look 29 26_Opaline", sku: "100029", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-35.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-36.webp"] },
      { nombre: "Look 30 26_Opaline", sku: "100030", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-37.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-38.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-39.webp"] },
      { nombre: "Look 31 26_Opaline", sku: "100030-1", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-62.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-57.webp"] },
      { nombre: "Look 32 26_Opaline", sku: "100030-1-1", descripcion: "", tags: ["Fiesta","26_Opaline"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-26-2526-59.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-57.webp","fely-campo-coleccion-fiesta-primavera-verano-26-2526-58.webp"] },
    ],
  },
  {
    id: "primavera-verano-25",
    carpeta: "primavera-verano-25",
    nombreColeccion: "25_L'Allure",
    looks: [
      { nombre: "Look 1 25_L'Allure", sku: "25001/450-25002/420", descripcion: "Vestido largo en satén beirut con chaqueta con tejido organza.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-1-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-1-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-1-3.webp"] },
      { nombre: "Look 2 25_L'Allure", sku: "25003/457-20105/463-25014/456", descripcion: "Vestido largo en crep satén con chaqueta de encaje o capelina en jacquart de rosas.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-2-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-2-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-2-3.webp"] },
      { nombre: "Look 3 25_L'Allure", sku: "25005/330-25007/330", descripcion: "Conjunto pantalón y casaca confeccionados en raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-3-1.webp"] },
      { nombre: "Look 4 25_L'Allure", sku: "25006/459-25007/455-25054/455", descripcion: "Conjunto pantalón y top confeccionado en lamé plisado con abrigo a juego de lino lurex.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-4-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-4-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-4-3.webp"] },
      { nombre: "Look 5 25_L'Allure", sku: "25008/330-25046/330", descripcion: "Vestido largo con capa confeccionado en raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-5-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-5-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-5-3.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-5-4.webp"] },
      { nombre: "Look 6 25_L'Allure", sku: "25008/209-25007/457-25055/457-25041/456", descripcion: "Conjunto de pantalón y top confeccionados en satén con capa en gasa o chaleco con tejido jacquart con rosas.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-6-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-6-3.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-6-2.webp"] },
      { nombre: "Look 7 25_L'Allure", sku: "25009/330-25053/330", descripcion: "Falda larga con tejido raso a una cara y chaqueta a juego confeccionada en raso a una cara con pedrería.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-7-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-7-2.webp"] },
      { nombre: "Look 8 25_L'Allure", sku: "25010/459-25026/458", descripcion: "Vestido largo con tejido raso toscana y chaqueta a juego confeccionada en jacquart acolchado.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-8-1.webp"] },
      { nombre: "Look 9 25_L'Allure", sku: "25011/461", descripcion: "Vestido largo con tejido brocado rosas.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-9-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-9-2.webp"] },
      { nombre: "Look 10 25_L'Allure", sku: "25012/330-25016/330", descripcion: "Vestido con chaqueta confeccionados en raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-10-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-10-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-10-3.webp"] },
      { nombre: "Look 11 25_L'Allure", sku: "25013/449-25015/210-25024/210", descripcion: "Vestido con tejido de crep grueso con capelina a juego tambien en crep grueso o abrigo confeccionado con relieve geom.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-11-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-11-2.webp"] },
      { nombre: "Look 12 25_L'Allure", sku: "25017/9646-25018/420-25034/420", descripcion: "Vestido con tejido de mikado con capelina a juego o abrigo confeccionados en organza.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-12-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-12-3.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-12-2.webp"] },
      { nombre: "Look 13 25_L'Allure", sku: "25019/460-25058/460", descripcion: "Vestido con capelina a juego en tejido jacquart liso brillo.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-13-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-13-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-13-3.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-13-4.webp"] },
      { nombre: "Look 14 25_L'Allure", sku: "25020/330-25021/330", descripcion: "Falda larga y top confeccionados en raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-14-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-14-2.webp"] },
      { nombre: "Look 15 25_L'Allure", sku: "25022/460-25023/460", descripcion: "Vestido largo y chaqueta en tejido jacquart liso brillo.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-15-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-15-1.webp"] },
      { nombre: "Look 16 25_L'Allure", sku: "25025/77-25049/77", descripcion: "Vestido largo y chaqueta en raso doble cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-16-2.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-16-1.webp"] },
      { nombre: "Look 17 25_L'Allure", sku: "25027/330-25028/330", descripcion: "Conjunto falda y chaqueta en raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-17-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-17-2.webp"] },
      { nombre: "Look 18 25_L'Allure", sku: "25029/9609", descripcion: "Vestido largo confeccionado en jacquard film.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-18-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-18-2.webp"] },
      { nombre: "Look 19 25_L'Allure", sku: "25030/77-25007/77", descripcion: "Conjunto pantalón y casaca confeccionado en raso doble cara y la casaca con pluma.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-20-1.webp"] },
      { nombre: "Look 20 25_L'Allure", sku: "25031/221-25007/221", descripcion: "Conjunto pantalón y casaca confeccionado en crep fino.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-21-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-21-2.webp"] },
      { nombre: "Look 21 25_L'Allure", sku: "25032/330-25007/330", descripcion: "Conjunto pantalón y casaca en raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-22-1.webp"] },
      { nombre: "Look 22 25_L'Allure", sku: "25033/453", descripcion: "Vestido largo con estampado acuarela.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-23-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-23-2.webp"] },
      { nombre: "Look 23 25_L'Allure", sku: "25035/251-25044/451", descripcion: "Vestido largo con tejido lamé tweed raya y abrigo confeccionada con tweed flores con efecto envejecido.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-24-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-24-2.webp"] },
      { nombre: "Look 24 25_L'Allure", sku: "25036/454-25047/437", descripcion: "Vestido largo con estampado de flores y chaqueta confeccionada con organza.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-25-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-25-2.webp"] },
      { nombre: "Look 25 25_L'Allure", sku: "25037/330", descripcion: "Vestido largo confeccionado con tejido raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-26-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-26-2.webp"] },
      { nombre: "Look 26 25_L'Allure", sku: "25038/330-25007/330", descripcion: "Conjunto pantalón y casaca con tejido raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-27-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-27-2.webp"] },
      { nombre: "Look 27 25_L'Allure", sku: "25039/221-25007/221", descripcion: "Conjunto pantalón y chaqueta en crep fino.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-28-1.webp"] },
      { nombre: "Look 28 25_L'Allure", sku: "25040/461", descripcion: "Vestido largo con tejido de brocado rosas.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-29-1.webp"] },
      { nombre: "Look 29 25_L'Allure", sku: "25043/452", descripcion: "Vestido largo con tejido organza relieve.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-30-1.webp"] },
      { nombre: "Look 30 25_L'Allure", sku: "25045/330", descripcion: "Vestido largo con tejido raso a una cara y pedrería.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-31-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-31-2.webp"] },
      { nombre: "Look 31 25_L'Allure", sku: "25048/471-25051/330", descripcion: "Vestido largo con tejido raso a una cara y chaqueta de pedrería.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-32-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-32-2.webp"] },
      { nombre: "Look 32 25_L'Allure", sku: "25050/210-25052/420", descripcion: "Vestido largo con tejido crep grueso y chaleco en organza.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-33-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-33-2.webp"] },
      { nombre: "Look 33 25_L'Allure", sku: "25057/461", descripcion: "Vestido largo con tejido brocado rosas.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-34-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-34-2.webp"] },
      { nombre: "Look 34 25_L'Allure", sku: "25059/330", descripcion: "Vestido largo de raso a una cara.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-35-1.webp","fely-campo-coleccion-fiesta-primavera-verano-25-look-35-2.webp"] },
      { nombre: "Look 35 25_L'Allure", sku: "25060/462-25061/462-25007/462", descripcion: "Conjunto pantalón y top con abrigo en lamé degradado.", tags: ["Fiesta","25_L'Allure"], imagenes: ["fely-campo-coleccion-fiesta-primavera-verano-25-look-36-1.webp"] },
    ],
  },
  {
    id: "pret-a-porter",
    carpeta: "pret-a-porter",
    nombreColeccion: "Prêt-à-porter",
    looks: [
      { nombre: "CHAQUETÓN OVERSIZE", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-21-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-21-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-21-2-1.webp"] },
      { nombre: "PANTALÓN PALAZZO", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-15-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-15-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-15-3-2.webp"] },
      { nombre: "PANTALÓN ANCHO RAYA DIPLOMATICA", sku: "", descripcion: "RAYA DIPLOMATICA ANCHA / RAYA DIPLOMATICA FINA", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-7-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-7-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-7-11-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-11-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-11-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-11-3-2.webp"] },
      { nombre: "ABRIGO CRUZADO", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-3-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-4-2.webp"] },
      { nombre: "PANTALÓN ANCHO BOLSILLOS", sku: "", descripcion: "CUADROS ROJOS", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-3-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-3-3-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-3-2-1.webp"] },
      { nombre: "TOP PICHI", sku: "", descripcion: "JACQUARD EFECTO ONDAS", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-12-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-12-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-12-3-2.webp"] },
      { nombre: "FALDA TAFETÁN EFECTO PAPEL", sku: "", descripcion: "TAFETÁN EFECTO PAPEL PLATA / TAFETÁN EFECTO PAPEL DORADO", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-5-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-5-4-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-13-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-13-2-2.webp"] },
      { nombre: "PANTALÓN PITILLO LANA", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-1-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-1-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-1-3-2.webp"] },
      { nombre: "FALDA MIDI BOLSILLOS PLASTÓN", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-21-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-21-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-21-3-1.webp"] },
      { nombre: "TOP TWEED BOLSILLOS", sku: "", descripcion: "VERDE / FUCSIA / GRANATE", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-18-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-18-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-18-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-18-4-1.webp"] },
      { nombre: "FALDA TAFETÁN", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-4-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-3-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-2-2.webp"] },
      { nombre: "PANTALÓN FLUIDO TERCIOPELO", sku: "", descripcion: "TERCIPOELO LAMÉ VERDE", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-16-4-1.webp"] },
      { nombre: "ABRIGO CRUZADO LANA", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-15-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-15-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-15-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-10-1-3.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-10-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-10-11-2.webp"] },
      { nombre: "ABRIGO OVERSIZE SASTRE", sku: "", descripcion: "JASPEADO MARRON", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-14-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-14-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-14-3-2.webp"] },
      { nombre: "ABRIGO SASTRE", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-13-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-2-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-3-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-4-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-13-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-13-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-17-4-1.webp"] },
      { nombre: "PANTALÓN CAMPANA", sku: "", descripcion: "JACQUARD EFECTO OLAS ARENA", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-12-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-12-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-12-3-1.webp"] },
      { nombre: "CASACA LARGA RAYA DIPLOMÁTICA", sku: "", descripcion: "RAYA DIPLOMATICA ANCHA / RAYA DIPLOMATICA FINA", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-11-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-11-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-11-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-11-4-1.webp"] },
      { nombre: "FALDA MIDI TERCIPELO", sku: "", descripcion: "TERCIOPELO-LAME-AZUL", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-10-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-10-1-2.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-10-11-1.webp"] },
      { nombre: "FALDA TAFETÁN ESTAMPADA", sku: "", descripcion: "TAFETAN-ESTAMPADO-CUADROS-PLATA-NEGRO-AZUL / TAFETAN-ESTAMPADO-METEORA-MORADO", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-9-4-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-14-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-14-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-14-3-1.webp"] },
      { nombre: "CHAQUETÓN CUELLO ABULLONADO", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-8-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-8-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-8-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-8-104-1.webp"] },
      { nombre: "CHAQUETA RAYA DIPLOMÁTICA", sku: "", descripcion: "RAYA DIPLOMATICA ANCHA / RAYA DIPLOMATICA FINA", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-7-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-7-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-7-11-1-1.webp"] },
      { nombre: "ABRIGO MANGA JAPONESA", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-6-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-6-2-1.webp"] },
      { nombre: "ABRIGO OVERSIZE VOLANTES", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-5-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-5-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-5-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-5-4-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-5-5-1.webp"] },
      { nombre: "ABRIGO VOLANTE TABLAS", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-4-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-4-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-4-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-4-look-13-1-1.webp"] },
      { nombre: "ABRIGO OVERSIZE", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-2-2-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-2-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-2-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-2-4-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-2-5-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-19-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-19-2-1.webp"] },
      { nombre: "CAPA LANA", sku: "", descripcion: "", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-1-1-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-1-3-1.webp","fely-campo-coleccion-fiesta-pret-a-porter-otono-invierno-24-25-look-1-2-1.webp"] },
      { nombre: "TRENCH CUADRO ESCOCÉS", sku: "", descripcion: "ROJO / VERDE", tags: [], imagenes: ["fely-campo-coleccion-fiesta-pret-a-porter-foto-29.webp","fely-campo-coleccion-fiesta-pret-a-porter-foto-28.webp","fely-campo-coleccion-fiesta-pret-a-porter-foto-30.webp"] },
    ],
  },
  {
    id: "en-madrid",
    carpeta: "en-madrid",
    nombreColeccion: "En Madrid",
    looks: [
      { nombre: "Look 1 - En Madrid", sku: "24MB38 T _ 24MB37 F", descripcion: "", tags: ["Alfombra roja","Asimétrico","Corto","Diferente","Dos piezas","En Madrid","Escote Espalda","Fiesta","Fluido","Largo","Lencero","Minimal","Noche"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-1-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-1-7.webp"] },
      { nombre: "Look 2 - En Madrid", sku: "24042 V", descripcion: "", tags: ["Alfombra roja","Asimétrico","Corte A","Corto","Diferente","En Madrid","Escote Espalda","Fiesta","Fluido","Largo","Mangas"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-2-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-2-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-2-3.webp","fely-campo-coleccion-fiesta-en-madrid-look-2-4.webp"] },
      { nombre: "Look 3 - En Madrid", sku: "24031 T _ 24030 P", descripcion: "", tags: ["Asimétrico","Diferente","Dos piezas","En Madrid","Escote Espalda","Fiesta","Fluido","Largo","Lencero","Mangas"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-3-1.webp"] },
      { nombre: "Look 4 - En Madrid", sku: "24082 T _ 24030 P", descripcion: "", tags: ["Alfombra roja","Diferente","Dos piezas","En Madrid","Escote Espalda","Fiesta","Fluido","Largo","Minimal"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-4-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-4-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-4-3.webp","fely-campo-coleccion-fiesta-en-madrid-look-4-5.webp","fely-campo-coleccion-fiesta-en-madrid-look-4-9.webp"] },
      { nombre: "Look 6 - En Madrid", sku: "24026 V", descripcion: "", tags: ["Clásico","En Madrid","Escote Espalda","Fiesta","Fluido","Largo","Lencero","Mangas","Minimal","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-6-1.webp"] },
      { nombre: "Look 8 - En Madrid", sku: "24055V", descripcion: "", tags: ["Asimétrico","Corto","Diferente","En Madrid","Escote Espalda","Fiesta","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-8-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-8-3.webp"] },
      { nombre: "Look 9 - En Madrid", sku: "24023 V", descripcion: "", tags: ["Alfombra roja","Diferente","En Madrid","Fiesta","Fluido","Largo","Mangas","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-9-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-9-4.webp"] },
      { nombre: "Look 10 - En Madrid", sku: "24053 V", descripcion: "", tags: ["Alfombra roja","En Madrid","Escote Espalda","Fiesta","Largo","Minimal","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-10-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-10-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-10-3.webp"] },
      { nombre: "Look 11 - En Madrid", sku: "24014 V", descripcion: "", tags: ["Clásico","Diferente","En Madrid","Fiesta","Mangas","Midi","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-11-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-11-2.webp"] },
      { nombre: "Look 12 - En Madrid", sku: "24056 V _ 24058 CH", descripcion: "", tags: ["Asimétrico","Clásico","Corte A","Dos piezas","En Madrid","Fiesta","Largo","Mangas"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-12-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-12-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-12-6.webp"] },
      { nombre: "Look 13 - En Madrid", sku: "24040 A_24030 P_24041 T", descripcion: "", tags: ["Diferente","Dos piezas","En Madrid","Fiesta","Fluido","Largo","Lencero","Mangas","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-13-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-13-5.webp"] },
      { nombre: "Look 15 - En Madrid", sku: "24006 V", descripcion: "", tags: ["Clásico","Corte A","En Madrid","Fiesta","Fluido","Lencero","Mangas","Midi","Minimal"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-15-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-15-2.webp"] },
      { nombre: "Look 16 - En Madrid", sku: "24038 V", descripcion: "", tags: ["Clásico","Diferente","En Madrid","Fiesta","Fluido","Lencero","Mangas","Midi","Recto","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-16-1.webp"] },
      { nombre: "Look 18 - En Madrid", sku: "24038 CH_24039 V", descripcion: "", tags: ["Clásico","Diferente","Dos piezas","En Madrid","Fiesta","Fluido","Mangas","Midi","Minimal","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-18-1.webp"] },
      { nombre: "Look 20 - En Madrid", sku: "24001 V_ 24021 CH", descripcion: "", tags: ["Clásico","Corto","Dos piezas","En Madrid","Fiesta","Fluido","Mangas","Minimal","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-20-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-20-5.webp"] },
      { nombre: "Look 22 - En Madrid", sku: "24007 V_24012 CH", descripcion: "", tags: ["Clásico","Dos piezas","En Madrid","Fiesta","Mangas","Midi","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-22-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-22-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-22-3.webp"] },
      { nombre: "Look 26 - En Madrid", sku: "24054 V", descripcion: "", tags: ["Clásico","Diferente","En Madrid","Fiesta","Midi","Minimal","Recto","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-26-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-26-3.webp"] },
      { nombre: "Look 27 - En Madrid", sku: "22090 V (2)", descripcion: "", tags: ["Asimétrico","Corte A","Diferente","En Madrid","Fiesta","Fluido","Mangas","Midi"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-27-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-27-2.webp"] },
      { nombre: "Look 29 - En Madrid", sku: "24MB16 V (2)", descripcion: "", tags: ["Alfombra roja","Asimétrico","Corte A","Diferente","En Madrid","Escote Espalda","Fiesta","Largo","Mangas"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-29-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-29-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-29-3.webp","fely-campo-coleccion-fiesta-en-madrid-look-29-4.webp","fely-campo-coleccion-fiesta-en-madrid-look-29-5.webp","fely-campo-coleccion-fiesta-en-madrid-look-29-6.webp"] },
      { nombre: "Look 30 - En Madrid", sku: "18101-6 V", descripcion: "", tags: ["Clásico","Diferente","En Madrid","Fiesta","Mangas","Midi","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-30-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-30-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-30-3.webp"] },
      { nombre: "Look 31 - En Madrid", sku: "17113 V_24011 A", descripcion: "", tags: ["Asimétrico","Clásico","Corte A","Corto","Dos piezas","En Madrid","Fiesta","Mangas","Mikado","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-31-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-31-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-31-3.webp"] },
      { nombre: "Look 32 - En Madrid", sku: "24065 V", descripcion: "", tags: ["Alfombra roja","Asimétrico","Clásico","Corte A","En Madrid","Escote Espalda","Fiesta","Fluido","Largo","Lencero","Minimal","Noche","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-32-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-32-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-32-3.webp","fely-campo-coleccion-fiesta-en-madrid-look-32-4.webp","fely-campo-coleccion-fiesta-en-madrid-look-32-5.webp"] },
      { nombre: "Look 34 - En Madrid", sku: "24016 V_ 20162 SH-1", descripcion: "", tags: ["Diferente","Dos piezas","En Madrid","Fiesta","Fluido","Largo","Lencero","Mangas","Minimal"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-34-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-34-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-34-4.webp","fely-campo-coleccion-fiesta-en-madrid-look-34-3.webp"] },
      { nombre: "Look 36 - En Madrid", sku: "24083 C_24030 P", descripcion: "", tags: ["Alfombra roja","Corte A","Diferente","Dos piezas","En Madrid","Escote Espalda","Fiesta","Fluido","Largo","Mangas","Minimal","Recto"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-36-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-36-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-36-3.webp"] },
      { nombre: "Look 41 - En Madrid", sku: "22016 V (3)", descripcion: "", tags: ["Asimétrico","Clásico","Corte A","Corto","Diferente","En Madrid","Escote Espalda","Fiesta","Mangas","Midi","Mikado","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-41-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-41-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-41-3.webp","fely-campo-coleccion-fiesta-en-madrid-look-41-4.webp"] },
      { nombre: "Look 42 - En Madrid", sku: "24020 C_24030 P", descripcion: "", tags: ["Diferente","Dos piezas","En Madrid","Fiesta","Fluido","Largo","Mangas"], imagenes: ["fely-campo-coleccion-fiesta-en-madrid-look-42-1.webp","fely-campo-coleccion-fiesta-en-madrid-look-42-2.webp","fely-campo-coleccion-fiesta-en-madrid-look-42-3.webp","fely-campo-coleccion-fiesta-en-madrid-look-42-4.webp"] },
    ],
  },
  {
    id: "a-walk",
    carpeta: "a-walk",
    nombreColeccion: "A Walk",
    looks: [
      { nombre: "Look 60 – A Walk", sku: "23026 V - 23027 CH", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-601.webp"] },
      { nombre: "Look 56 – A Walk", sku: "14203 V - 22440 SH", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-561.webp","fely-campo-coleccion-fiesta-a-walk-look-562.webp","fely-campo-coleccion-fiesta-a-walk-look-563.webp"] },
      { nombre: "Look 52 – A Walk", sku: "23014 V - 23015 A", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-521.webp","fely-campo-coleccion-fiesta-a-walk-look-522.webp","fely-campo-coleccion-fiesta-a-walk-look-523.webp"] },
      { nombre: "Look 51 – A Walk", sku: "22419 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-511.webp","fely-campo-coleccion-fiesta-a-walk-look-512.webp","fely-campo-coleccion-fiesta-a-walk-look-513.webp"] },
      { nombre: "Look 47 – A Walk", sku: "17129-6 V - 22096 CH", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-471.webp","fely-campo-coleccion-fiesta-a-walk-look-472.webp"] },
      { nombre: "Look 46 – A Walk", sku: "22428 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-461.webp","fely-campo-coleccion-fiesta-a-walk-look-462.webp","fely-campo-coleccion-fiesta-a-walk-look-463.webp"] },
      { nombre: "Look 45 – A Walk", sku: "23048 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-451.webp","fely-campo-coleccion-fiesta-a-walk-look-452.webp","fely-campo-coleccion-fiesta-a-walk-look-453.webp"] },
      { nombre: "Look 40 – A Walk", sku: "23056 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-401.webp","fely-campo-coleccion-fiesta-a-walk-look-402.webp"] },
      { nombre: "Look 39 – A Walk", sku: "23031 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-391.webp","fely-campo-coleccion-fiesta-a-walk-look-392.webp"] },
      { nombre: "Look 38 – A Walk", sku: "23055 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-381.webp","fely-campo-coleccion-fiesta-a-walk-look-382.webp"] },
      { nombre: "Look 37 – A Walk", sku: "23029 V - 23028 A", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-371.webp","fely-campo-coleccion-fiesta-a-walk-look-372.webp","fely-campo-coleccion-fiesta-a-walk-look-373.webp"] },
      { nombre: "Look 35 – A Walk", sku: "22090 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-351.webp","fely-campo-coleccion-fiesta-a-walk-look-352.webp"] },
      { nombre: "Look 34 – A Walk", sku: "23057 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-341.webp","fely-campo-coleccion-fiesta-a-walk-look-342.webp"] },
      { nombre: "Look 28 – A Walk", sku: "23020 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-281.webp","fely-campo-coleccion-fiesta-a-walk-look-282.webp"] },
      { nombre: "Look 25 – A Walk", sku: "23022 CH -23021 F", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-251.webp","fely-campo-coleccion-fiesta-a-walk-look-252.webp"] },
      { nombre: "Look 24 – A Walk", sku: "23041 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-241.webp","fely-campo-coleccion-fiesta-a-walk-look-242.webp"] },
      { nombre: "Look 21 – A Walk", sku: "22402 F 22420 CH", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-211.webp","fely-campo-coleccion-fiesta-a-walk-look-212.webp"] },
      { nombre: "Look 16 – A Walk", sku: "23053 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-161.webp","fely-campo-coleccion-fiesta-a-walk-look-162.webp"] },
      { nombre: "Look 13 – A Walk", sku: "23051 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-131.webp","fely-campo-coleccion-fiesta-a-walk-look-132.webp"] },
      { nombre: "Look 12 – A Walk", sku: "22401 V -22431 A", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-121.webp","fely-campo-coleccion-fiesta-a-walk-look-122.webp","fely-campo-coleccion-fiesta-a-walk-look-123.webp","fely-campo-coleccion-fiesta-a-walk-look-124.webp","fely-campo-coleccion-fiesta-a-walk-look-125.webp"] },
      { nombre: "Look 10 – A Walk", sku: "22092 F - 22096 CH", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-101.webp","fely-campo-coleccion-fiesta-a-walk-look-102.webp","fely-campo-coleccion-fiesta-a-walk-look-103.webp"] },
      { nombre: "Look 8 – A Walk", sku: "23066 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-81.webp","fely-campo-coleccion-fiesta-a-walk-look-82.webp","fely-campo-coleccion-fiesta-a-walk-look-83.webp"] },
      { nombre: "Look 7 – A Walk", sku: "23061 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-71.webp","fely-campo-coleccion-fiesta-a-walk-look-72.webp","fely-campo-coleccion-fiesta-a-walk-look-73.webp"] },
      { nombre: "Look 6 – A Walk", sku: "23063 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-61.webp","fely-campo-coleccion-fiesta-a-walk-look-62.webp","fely-campo-coleccion-fiesta-a-walk-look-63.webp"] },
      { nombre: "Look 5 – A Walk", sku: "23062 T - 23034 P", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-51.webp","fely-campo-coleccion-fiesta-a-walk-look-52.webp","fely-campo-coleccion-fiesta-a-walk-look-53.webp"] },
      { nombre: "Look 4 – A Walk", sku: "23033 A - 23034 P -23035 T", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-41.webp","fely-campo-coleccion-fiesta-a-walk-look-42.webp","fely-campo-coleccion-fiesta-a-walk-look-43.webp","fely-campo-coleccion-fiesta-a-walk-look-44.webp","fely-campo-coleccion-fiesta-a-walk-look-45.webp","fely-campo-coleccion-fiesta-a-walk-look-46.webp","fely-campo-coleccion-fiesta-a-walk-look-47.webp","fely-campo-coleccion-fiesta-a-walk-look-48.webp"] },
      { nombre: "Look 3 – A Walk", sku: "23054 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-31.webp","fely-campo-coleccion-fiesta-a-walk-look-32.webp","fely-campo-coleccion-fiesta-a-walk-look-33.webp","fely-campo-coleccion-fiesta-a-walk-look-34.webp","fely-campo-coleccion-fiesta-a-walk-look-35.webp"] },
      { nombre: "Look 2 – A Walk", sku: "23023 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-21.webp","fely-campo-coleccion-fiesta-a-walk-look-23.webp","fely-campo-coleccion-fiesta-a-walk-look-22.webp","fely-campo-coleccion-fiesta-a-walk-look-24.webp","fely-campo-coleccion-fiesta-a-walk-look-25.webp","fely-campo-coleccion-fiesta-a-walk-look-26.webp"] },
      { nombre: "Look 1 – A Walk", sku: "23065 V", descripcion: "", tags: ["A Walk","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-a-walk-look-11.webp","fely-campo-coleccion-fiesta-a-walk-look-12.webp","fely-campo-coleccion-fiesta-a-walk-look-13.webp"] },
    ],
  },
  {
    id: "bambu",
    carpeta: "bambu",
    nombreColeccion: "Bambú",
    looks: [
      { nombre: "Look 49 – Bambú Fiesta", sku: "22045 A _ 22046 V", descripcion: "", tags: ["Bambú","Clásico","Colección","Dos piezas","Fiesta","Mangas","Midi","Minimal","Recto"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-49-1.webp","fely-campo-coleccion-fiesta-bambu-look-49-2-1.webp"] },
      { nombre: "Look 48 – Bambú Fiesta", sku: "22027 V", descripcion: "", tags: ["Asimétrico","Bambú","Colección","Corte A","Corto","Diferente","Dos piezas","Fiesta","Fluido","Lencero","Mangas","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-48-1.webp","fely-campo-coleccion-fiesta-bambu-look-48-2-1.webp"] },
      { nombre: "Look 47 – Bambú Fiesta", sku: "20103 V", descripcion: "", tags: ["Alfombra roja","Asimétrico","Bambú","Colección","Diferente","Fiesta","Fluido","Mangas","Midi","Noche","Recto","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-47-2-1.webp","fely-campo-coleccion-fiesta-bambu-look-47-3-1.webp","fely-campo-coleccion-fiesta-bambu-look-47-1.webp"] },
      { nombre: "Look 46 – Bambú Fiesta", sku: "F0046", descripcion: "", tags: ["Bambú","Colección","Fiesta"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-46-3-1.webp","fely-campo-coleccion-fiesta-bambu-look-46-2-1.webp","fely-campo-coleccion-fiesta-bambu-look-46-1.webp"] },
      { nombre: "Look 45 – Bambú Fiesta", sku: "22074 V", descripcion: "", tags: ["Bambú","Clásico","Colección","Fiesta","Fluido","Largo","Lencero","Mangas","Noche","Recto"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-45-1.webp","fely-campo-coleccion-fiesta-bambu-look-45-2-1.webp","fely-campo-coleccion-fiesta-bambu-look-45-3-1.webp"] },
      { nombre: "Look 44 – Bambú Fiesta", sku: "20113", descripcion: "", tags: ["Alfombra roja","Bambú","Colección","Diferente","Escote Espalda","Fiesta","Fluido","Largo","Minimal","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-44-1.webp","fely-campo-coleccion-fiesta-bambu-look-44-2-1.webp"] },
      { nombre: "Look 24 – Bambú Fiesta", sku: "22017 V", descripcion: "", tags: ["Alfombra roja","Asimétrico","Bambú","Colección","Corte A","Corto","Diferente","Escote Espalda","Fiesta","Largo","Noche"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-24.webp","fely-campo-coleccion-fiesta-bambu-look-24-2.webp"] },
      { nombre: "Look 20 – Bambú Fiesta", sku: "16117 T_22004 F", descripcion: "", tags: ["Asimétrico","Bambú","Colección","Diferente","Fiesta","Fluido","Lencero","Midi","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-20.webp"] },
      { nombre: "Look 19 – Bambú Fiesta", sku: "16117 T_22007 P_22041A", descripcion: "", tags: ["Bambú","Colección","Diferente","Dos piezas","Fiesta","Fluido","Lencero","Midi","Recto"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-19.webp"] },
      { nombre: "Look 17 – Bambú Fiesta", sku: "22041 A_ 22057 T_22059 F", descripcion: "", tags: ["Bambú","Clásico","Colección","Dos piezas","Fiesta","Fluido","Lencero","Mangas","Midi","Minimal","Noche","Recto","Romántico"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-17.webp","fely-campo-coleccion-fiesta-bambu-look-17-2.webp"] },
      { nombre: "Look 11 – Bambú Fiesta", sku: "22005 F _ 22011 T", descripcion: "", tags: ["Bambú","Colección","Diferente","Dos piezas","Fiesta","Fluido","Midi","Minimal","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-11.webp","fely-campo-coleccion-fiesta-bambu-look-11-2.webp"] },
      { nombre: "Look 8 – Bambú Fiesta", sku: "22021 T_ 22022 P", descripcion: "", tags: ["Asimétrico","Bambú","Colección","Corte A","Dos piezas","Fiesta","Largo","Mangas","Midi","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-8.webp","fely-campo-coleccion-fiesta-bambu-look-8-2.webp"] },
      { nombre: "Look 2 – Bambú Fiesta", sku: "22038 T - 22058 F", descripcion: "", tags: ["Alfombra roja","Bambú","Colección","Diferente","Escote Espalda","Fiesta","Fluido","Largo","Lencero","Mangas","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-bambu-look-2.webp","fely-campo-coleccion-fiesta-bambu-look-2-2.webp"] },
    ],
  },
  {
    id: "savia",
    carpeta: "savia",
    nombreColeccion: "Savia",
    looks: [
      { nombre: "Look 17 – Savia Fiesta", sku: "F0134", descripcion: "", tags: ["Colección","Diferente","Fiesta","Fluido","Largo","Savia","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-17.webp","fely-campo-coleccion-fiesta-savia-look-17-2.webp"] },
      { nombre: "Look 15 – Savia Fiesta", sku: "21316 A _ 21320 V", descripcion: "", tags: ["Clásico","Colección","Diferente","Dos piezas","Escote Espalda","Fiesta","Mangas","Recto","Savia","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-15.webp","fely-campo-coleccion-fiesta-savia-look-15-3.webp","fely-campo-coleccion-fiesta-savia-look-15-2.webp"] },
      { nombre: "Look 14 – Savia Fiesta", sku: "21306 V _ 21313 A", descripcion: "", tags: ["Colección","Corte A","Diferente","Dos piezas","Fiesta","Mangas","Midi","Savia"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-14-2.webp","fely-campo-coleccion-fiesta-savia-look-14-3.webp","fely-campo-coleccion-fiesta-savia-look-14.webp"] },
      { nombre: "Look 13 – Savia Fiesta", sku: "F0130", descripcion: "", tags: ["Colección","Corte A","Diferente","Fiesta","Midi","Mikado","Savia"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-13.webp","fely-campo-coleccion-fiesta-savia-look-13-2.webp"] },
      { nombre: "Look 12 – Savia Fiesta", sku: "21332 V", descripcion: "", tags: ["Clásico","Colección","Diferente","Escote Espalda","Fiesta","Mangas","Midi","Recto","Savia"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-12.webp","fely-campo-coleccion-fiesta-savia-look-12-2.webp"] },
      { nombre: "Look 11 – Savia Fiesta", sku: "21330 V _ 21313 A", descripcion: "", tags: ["Colección","Corte A","Diferente","Dos piezas","Fiesta","Largo","Mangas","Savia","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-11-2.webp","fely-campo-coleccion-fiesta-savia-look-11-3.webp","fely-campo-coleccion-fiesta-savia-look-11.webp"] },
      { nombre: "Look 9 – Savia Fiesta", sku: "21333 V _ 21503 A", descripcion: "", tags: ["Colección","Dos piezas","Fiesta","Fluido","Mangas","Savia","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-9.webp"] },
      { nombre: "Look 8 – Savia Fiesta", sku: "21314 V", descripcion: "", tags: ["Clásico","Colección","Corte A","Fiesta","Midi","Savia"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-8-2.webp","fely-campo-coleccion-fiesta-savia-look-8-3.webp","fely-campo-coleccion-fiesta-savia-look-8.webp"] },
      { nombre: "Look 6 – Savia Fiesta", sku: "21336 V", descripcion: "", tags: ["Asimétrico","Clásico","Colección","Corte A","Fiesta","Fluido","Mangas","Recto","Savia"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-6-2.webp","fely-campo-coleccion-fiesta-savia-look-6.webp"] },
      { nombre: "Look 5 – Savia Fiesta", sku: "21334 V", descripcion: "", tags: ["Colección","Corto","Diferente","Escote Espalda","Fiesta","Largo","Savia","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-5.webp","fely-campo-coleccion-fiesta-savia-look-5-3.webp","fely-campo-coleccion-fiesta-savia-look-5-2.webp","fely-campo-coleccion-fiesta-savia-look-5-4.webp"] },
      { nombre: "Look 4 – Savia Fiesta", sku: "21502 V _ 21503 AO _ 21313 A", descripcion: "", tags: ["Colección","Corte A","Dos piezas","Escote Espalda","Fiesta","Mangas","Midi","Savia","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-4-2.webp","fely-campo-coleccion-fiesta-savia-look-4.webp","fely-campo-coleccion-fiesta-savia-look-4-4.webp","fely-campo-coleccion-fiesta-savia-look-4-3.webp"] },
      { nombre: "Look 3 – Savia Fiesta", sku: "21501 V", descripcion: "", tags: ["Alfombra roja","Colección","Diferente","Escote Espalda","Fiesta","Fluido","Largo","Lencero","Mangas","Minimal","Noche","Recto","Savia"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-3-2.webp","fely-campo-coleccion-fiesta-savia-look-3.webp","fely-campo-coleccion-fiesta-savia-look-3-3.webp"] },
      { nombre: "Look 2 – Savia Fiesta", sku: "21504 F _ 21321 A _ 21323 CH", descripcion: "", tags: ["Colección","Corte A","Dos piezas","Fiesta","Fluido","Largo","Lencero","Mangas","Noche","Savia","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-2-2.webp","fely-campo-coleccion-fiesta-savia-look-2-3.webp","fely-campo-coleccion-fiesta-savia-look-2.webp"] },
      { nombre: "Look 1 – Savia Fiesta", sku: "21505 V", descripcion: "", tags: ["Colección","Corte A","Diferente","Fiesta","Mangas","Midi","Noche","Savia"], imagenes: ["fely-campo-coleccion-fiesta-savia-look-1-2.webp","fely-campo-coleccion-fiesta-savia-look-1.webp","fely-campo-coleccion-fiesta-savia-look-1-3.webp"] },
    ],
  },
  {
    id: "miscelanea",
    carpeta: "miscelanea",
    nombreColeccion: "Miscelanea",
    looks: [
      { nombre: "Look 33 – Miscelanea Fiesta", sku: "20717 V _ 20718 CH", descripcion: "", tags: ["Colección","Dos piezas","Escote Espalda","Fiesta","Mangas","Midi","Minimal","Miscelanea","Recto"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-33.webp","fely-campo-coleccion-fiesta-miscelanea-look-33-6.webp","fely-campo-coleccion-fiesta-miscelanea-look-33-2.webp","fely-campo-coleccion-fiesta-miscelanea-look-33-4.webp","fely-campo-coleccion-fiesta-miscelanea-look-33-5.webp","fely-campo-coleccion-fiesta-miscelanea-look-33-3.webp"] },
      { nombre: "Look 30 – Miscelanea Fiesta", sku: "20719 A", descripcion: "", tags: ["Colección","Corte A","Dos piezas","Fiesta","Mangas","Mikado","Miscelanea"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-30.webp","fely-campo-coleccion-fiesta-miscelanea-look-30-2.webp"] },
      { nombre: "Look 28 – Miscelanea Fiesta", sku: "20725 V", descripcion: "", tags: ["Colección","Corte A","Diferente","Fiesta","Mangas","Mikado","Miscelanea"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-28.webp","fely-campo-coleccion-fiesta-miscelanea-look-28-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-28-2.webp"] },
      { nombre: "Look 18 – Miscelanea Fiesta", sku: "20709 V _ 20710 A", descripcion: "", tags: ["Colección","Corto","Diferente","Dos piezas","Fiesta","Mangas","Mikado","Miscelanea","Recto"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-18-2.webp","fely-campo-coleccion-fiesta-miscelanea-look-19.webp","fely-campo-coleccion-fiesta-miscelanea-look-18.webp","fely-campo-coleccion-fiesta-miscelanea-look-19-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-19-2.webp"] },
      { nombre: "Look 15 – Miscelanea Fiesta", sku: "20705 V _ 20706 CH", descripcion: "", tags: ["Asimétrico","Clásico","Colección","Diferente","Dos piezas","Fiesta","Mangas","Midi","Mikado","Miscelanea","Recto","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-15.webp","fely-campo-coleccion-fiesta-miscelanea-look-15-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-15-2.webp"] },
      { nombre: "Look 14 – Miscelanea Fiesta", sku: "20704 V", descripcion: "", tags: ["Clásico","Colección","Fiesta","Mangas","Midi","Miscelanea","Recto"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-14-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-14-2.webp","fely-campo-coleccion-fiesta-miscelanea-look-14.webp"] },
      { nombre: "Look 4 – Miscelanea Fiesta", sku: "20139 V _ 20166 CH", descripcion: "", tags: ["Clásico","Colección","Diferente","Dos piezas","Escote Espalda","Fiesta","Fluido","Mangas","Midi","Miscelanea","Recto"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-4-6.webp","fely-campo-coleccion-fiesta-miscelanea-look-4.webp","fely-campo-coleccion-fiesta-miscelanea-look-4-5.webp","fely-campo-coleccion-fiesta-miscelanea-look-4-4.webp","fely-campo-coleccion-fiesta-miscelanea-look-4-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-4-2.webp"] },
      { nombre: "Look 3 – Miscelanea Fiesta", sku: "20711 V _ 20162 C", descripcion: "", tags: ["Asimétrico","Clásico","Colección","Diferente","Dos piezas","Escote Espalda","Fiesta","Mikado","Miscelanea","Recto","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-3-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-3-4.webp","fely-campo-coleccion-fiesta-miscelanea-look-3-2.webp"] },
      { nombre: "Look 1 – Miscelanea Fiesta", sku: "14130 V", descripcion: "", tags: ["Alfombra roja","Asimétrico","Colección","Corto","Diferente","Escote Espalda","Fiesta","Largo","Miscelanea","Noche","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-miscelanea-look-1-2.webp","fely-campo-coleccion-fiesta-miscelanea-look-1-3.webp","fely-campo-coleccion-fiesta-miscelanea-look-1.webp","fely-campo-coleccion-fiesta-miscelanea-look-1-5.webp","fely-campo-coleccion-fiesta-miscelanea-look-1-4.webp"] },
    ],
  },
  {
    id: "furisode",
    carpeta: "furisode",
    nombreColeccion: "Furisode",
    looks: [
      { nombre: "Look 1 Furisode Fiesta", sku: "18101 V", descripcion: "", tags: ["Colección","Diferente","Fiesta","Furisode","Mangas","Midi","Mikado","Recto","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-1-1.webp","fely-campo-coleccion-fiesta-furisode-look-1-2-1.webp"] },
      { nombre: "Look 2 Furisode Fiesta", sku: "18102 F / 18103 T", descripcion: "", tags: ["Colección","Diferente","Dos piezas","Escote Espalda","Fiesta","Furisode","Largo","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-2-1.webp","fely-campo-coleccion-fiesta-furisode-look-2-2-1.webp"] },
      { nombre: "Look 3 Furisode Fiesta", sku: "18104 V", descripcion: "", tags: ["Clásico","Colección","Escote Espalda","Fiesta","Furisode","Midi","Mikado","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-3-1.webp"] },
      { nombre: "Look 4 Furisode Fiesta", sku: "18105", descripcion: "", tags: ["Clásico","Colección","Corto","Fiesta","Furisode","Midi","Mikado","Recto"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-4-1.webp"] },
      { nombre: "Look 11 Furisode Fiesta", sku: "18114 T / 18115 F", descripcion: "", tags: ["Colección","Diferente","Dos piezas","Fiesta","Furisode","Midi","Noche","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-11.webp","fely-campo-coleccion-fiesta-furisode-look-11-2.webp"] },
      { nombre: "Look 12 Furisode Fiesta", sku: "18116 T / 18117 F", descripcion: "", tags: ["Alfombra roja","Colección","Diferente","Fiesta","Fluido","Furisode","Largo","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-12-1.webp","fely-campo-coleccion-fiesta-furisode-look-12-2-1.webp"] },
      { nombre: "Look 14 Furisode Fiesta", sku: "18119 V", descripcion: "", tags: ["Colección","Diferente","Fiesta","Furisode","Midi","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-14-1.webp","fely-campo-coleccion-fiesta-furisode-look-14-2-1.webp"] },
      { nombre: "Look 15 Furisode Fiesta", sku: "18120 F / 18121 T", descripcion: "", tags: ["Colección","Diferente","Dos piezas","Fiesta","Furisode","Midi","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-15-1.webp","fely-campo-coleccion-fiesta-furisode-look-15-2-1.webp"] },
      { nombre: "Look 16 Furisode Fiesta", sku: "18125 V", descripcion: "", tags: ["Alfombra roja","Colección","Fiesta","Fluido","Furisode","Largo","Minimal","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-16-1.webp","fely-campo-coleccion-fiesta-furisode-look-16-2-1.webp"] },
      { nombre: "Look 17 Furisode Fiesta", sku: "18126 V", descripcion: "", tags: ["Colección","Escote Espalda","Fiesta","Fluido","Furisode","Largo","Lencero","Noche","Recto"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-17-1.webp","fely-campo-coleccion-fiesta-furisode-look-17-2-1.webp"] },
      { nombre: "Look 24 Furisode Fiesta", sku: "18137 V", descripcion: "", tags: ["Alfombra roja","Clásico","Colección","Escote Espalda","Fiesta","Fluido","Furisode","Largo","Noche","Sirena"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-24-1.webp","fely-campo-coleccion-fiesta-furisode-look-24-2-1.webp"] },
      { nombre: "Look 25 Furisode Fiesta", sku: "18138 T / 18139 F", descripcion: "", tags: ["Colección","Diferente","Dos piezas","Fiesta","Furisode","Largo","Mikado","Noche","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-25-1.webp","fely-campo-coleccion-fiesta-furisode-look-25-2-1.webp"] },
      { nombre: "Look 29 Furisode Fiesta", sku: "18146 V", descripcion: "", tags: ["Clásico","Colección","Fiesta","Furisode","Midi","Mikado","Recto"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-29-1.webp"] },
      { nombre: "Look 30 Furisode Fiesta", sku: "18147 V", descripcion: "", tags: ["Asimétrico","Colección","Corte A","Diferente","Escote Espalda","Fiesta","Furisode","Midi","Mikado","Minimal","Volumen"], imagenes: ["fely-campo-coleccion-fiesta-furisode-look-30-2-1.webp","fely-campo-coleccion-fiesta-furisode-look-30-1.webp"] },
    ],
  },
];

export const fiestaProductos = COLECCIONES.flatMap(({ carpeta, nombreColeccion, looks }) => looks.map((look) => {
  const rutas = look.imagenes.map((archivo) => `${RUTA_BASE}/${carpeta}/${archivo}`);
  // En la tarjeta (TarjetaProducto "titulo"/"subtitulo"): "Look N" arriba
  // y la colección debajo, más pequeña — en vez de todo en una línea
  // ("Look 3 27_Eclat"). "nombre" completo se mantiene: da el slug de la
  // ficha. Sin "Look N" (ej. prendas de Prêt-à-porter) no se parte.
  const numeroLook = look.nombre.match(/^Look \d+/);
  return {
    nombre: look.nombre,
    titulo: numeroLook ? numeroLook[0] : undefined,
    subtitulo: numeroLook ? nombreColeccion : undefined,
    sku: look.sku || undefined,
    imagen: rutas[0],
    imagenHover: rutas[1] || rutas[0],
    imagenes: rutas,
    descripcion: look.descripcion || `Pieza de la colección ${nombreColeccion}, Fiesta${look.sku ? ` (SKU ${look.sku})` : ''}. Colores y tallas disponibles próximamente.`,
    tags: look.tags && look.tags.length > 0 ? look.tags : undefined,
    coleccion: nombreColeccion,
  };
}));
