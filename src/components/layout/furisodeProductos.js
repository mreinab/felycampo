// furisodeProductos.js
//
// Catálogo real de la colección "Furisode" (Atelier > Fiesta) — sustituye
// a productosEjemplo.js SOLO en /atelier/fiesta y su ficha de producto
// (ver page.js y FichaProductoAtelier.jsx): a diferencia del resto de
// Atelier (todavía con el catálogo de ejemplo genérico), esta colección
// ya tiene fotos y SKUs reales entregados, así que no tiene sentido
// enseñar "Producto de ejemplo 01" encima. Deliberadamente NO reutiliza
// looksFurisode de components/admin/mockData.js — son dos catálogos
// independientes (el admin es el archivo editorial de la colección, este
// es el escaparate público), incluso si hoy comparten las mismas fotos.
//
// "nombre" sigue el patrón "Look N Furisode Fiesta" a propósito: con el
// mismo slugify() que ya usan TarjetaProducto/FichaProductoAtelier, da la
// URL /atelier/fiesta/look-19-furisode-fiesta (nombre visible en la
// ficha == el mismo texto, no hay título "bonito" aparte todavía).
//
// Sin "precio"/"colores"/"tallas": la página ya pasa ocultarPrecio, y
// colores/tallas de cada pieza se añadirán más adelante (ver aviso en
// "descripcion") — sin inventar datos que todavía no existen.
const RUTA_FURISODE = '/img/collections/fiesta/furisode';

const DATOS_FURISODE = [
  { sku: '18101 V', imagenes: ['022coleccionesfiesta-furisodefiesta-look1-felycampo2-1.webp', '023coleccionesfiesta-furisodefiesta-look1-felycampo-1.webp'] },
  { sku: '18102 F / 18103 T', imagenes: ['043coleccionesfiesta-furisodefiesta-look2-felycampo2-1.webp', '044coleccionesfiesta-furisodefiesta-look2-felycampo-1.webp'] },
  { sku: '18104 V', imagenes: ['050coleccionesfiesta-furisodefiesta-look3-felycampo-1.webp'] },
  { sku: '18105', imagenes: ['052coleccionesfiesta-furisodefiesta-look4-felycampo-1.webp'] },
  { sku: '18106 V', imagenes: ['053coleccionesfiesta-furisodefiesta-look5-felycampo2-1.webp', '054coleccionesfiesta-furisodefiesta-look5-felycampo-1.webp'] },
  { sku: '18107 V', imagenes: ['055coleccionesfiesta-furisodefiesta-look6-felycampo2-1.webp', '056coleccionesfiesta-furisodefiesta-look6-felycampo-1.webp'] },
  { sku: '18108 V', imagenes: ['057coleccionesfiesta-furisodefiesta-look7-felycampo2-1.webp', '058coleccionesfiesta-furisodefiesta-look7-felycampo-1.webp'] },
  { sku: '18109 V', imagenes: ['059coleccionesfiesta-furisodefiesta-look8-felycampo2-1.webp', '060coleccionesfiesta-furisodefiesta-look8-felycampo-1.webp'] },
  { sku: '18110 V', imagenes: ['061coleccionesfiesta-furisodefiesta-look9-felycampo2-1.webp', '062coleccionesfiesta-furisodefiesta-look9-felycampo-1.webp'] },
  { sku: '18111 V / 18112 T', imagenes: ['001coleccionesfiesta-furisodefiesta-look10-felycampo2.webp', '002coleccionesfiesta-furisodefiesta-look10-felycampo.webp'] },
  { sku: '18114 T / 18115 F', imagenes: ['003coleccionesfiesta-furisodefiesta-look11-felycampo2.webp', '004coleccionesfiesta-furisodefiesta-look11-felycampo.webp'] },
  { sku: '18116 T / 18117 F', imagenes: ['005coleccionesfiesta-furisodefiesta-look12-felycampo2-1.webp', '006coleccionesfiesta-furisodefiesta-look12-felycampo-1.webp'] },
  { sku: '18118 V', imagenes: ['007coleccionesfiesta-furisodefiesta-look13-felycampo2-1.webp', '008coleccionesfiesta-furisodefiesta-look13-felycampo3-1.webp', '009coleccionesfiesta-furisodefiesta-look13-felycampo-1.webp'] },
  { sku: '18119 V', imagenes: ['010coleccionesfiesta-furisodefiesta-look14-felycampo2-1.webp', '011coleccionesfiesta-furisodefiesta-look14-felycampo-1.webp'] },
  { sku: '18120 F / 18121 T', imagenes: ['012coleccionesfiesta-furisodefiesta-look15-felycampo2-1.webp', '013coleccionesfiesta-furisodefiesta-look15-felycampo-1.webp'] },
  { sku: '18125 V', imagenes: ['014coleccionesfiesta-furisodefiesta-look16-felycampo2-1.webp', '015coleccionesfiesta-furisodefiesta-look16-felycampo-1.webp'] },
  { sku: '18126 V', imagenes: ['016coleccionesfiesta-furisodefiesta-look17-felycampo2-1.webp', '017coleccionesfiesta-furisodefiesta-look17-felycampo-1.webp'] },
  { sku: '18129 V', imagenes: ['018coleccionesfiesta-furisodefiesta-look18-felycampo2-1.webp', '019coleccionesfiesta-furisodefiesta-look18-felycampo-1.webp'] },
  { sku: '18130 V', imagenes: ['020coleccionesfiesta-furisodefiesta-look19-felycampo2-1.webp', '021coleccionesfiesta-furisodefiesta-look19-felycampo-1 (1).webp'] },
  { sku: '18131 V', imagenes: ['024coleccionesfiesta-furisodefiesta-look20-felycampo2.webp', '025coleccionesfiesta-furisodefiesta-look20-felycampo.webp'] },
  { sku: '18132 V', imagenes: ['026coleccionesfiesta-furisodefiesta-look21-felycampo2.webp', '027coleccionesfiesta-furisodefiesta-look21-felycampo.webp'] },
  { sku: '18133 V / 18134 T', imagenes: ['028coleccionesfiesta-furisodefiesta-look22-felycampo2.webp', '029coleccionesfiesta-furisodefiesta-look22-felycampo.webp'] },
  { sku: '18136 V', imagenes: ['030coleccionesfiesta-furisodefiesta-look23-felycampo2.webp', '031coleccionesfiesta-furisodefiesta-look23-felycampo.webp'] },
  { sku: '18137 V', imagenes: ['032coleccionesfiesta-furisodefiesta-look24-felycampo2-1.webp', '033coleccionesfiesta-furisodefiesta-look24-felycampo-1.webp'] },
  { sku: '18138 T / 18139 F', imagenes: ['034coleccionesfiesta-furisodefiesta-look25-felycampo2-1.webp', '035coleccionesfiesta-furisodefiesta-look25-felycampo-1.webp'] },
  { sku: '18140 V', imagenes: ['036coleccionesfiesta-furisodefiesta-look26-felycampo2-1.webp', '037coleccionesfiesta-furisodefiesta-look26-felycampo-1.webp'] },
  { sku: '18141 V', imagenes: ['038coleccionesfiesta-furisodefiesta-look27-felycampo2-1.webp', '039coleccionesfiesta-furisodefiesta-look27-felycampo-1.webp'] },
  { sku: '18145 V', imagenes: ['040coleccionesfiesta-furisodefiesta-look28-felycampo2-1.webp', '041coleccionesfiesta-furisodefiesta-look28-felycampo-1.webp'] },
  { sku: '18146 V', imagenes: ['042coleccionesfiesta-furisodefiesta-look29-felycampo-1.webp'] },
  { sku: '18147 V', imagenes: ['045coleccionesfiesta-furisodefiesta-look30-felycampo2-1.webp', '046coleccionesfiesta-furisodefiesta-look30-felycampo-1.webp'] },
  { sku: '18148 V', imagenes: ['047coleccionesfiesta-furisodefiesta-look31-felycampo2-1.webp', '048coleccionesfiesta-furisodefiesta-look31-felycampo-1.webp'] },
];

export const furisodeProductos = DATOS_FURISODE.map(({ sku, imagenes }, indice) => {
  const rutas = imagenes.map((archivo) => `${RUTA_FURISODE}/${archivo}`);
  return {
    nombre: `Look ${indice + 1} Furisode Fiesta`,
    imagen: rutas[0],
    imagenHover: rutas[1],
    imagenes: rutas,
    descripcion: `Pieza de la colección Furisode, Fiesta (SKU ${sku}). Colores y tallas disponibles próximamente.`,
  };
});
