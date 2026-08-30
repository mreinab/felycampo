// productosEjemplo.js
//
// Catálogo de ejemplo compartido por TODAS las páginas "pendientes de
// maquetar" del Navbar (submenús Tienda y Atelier) — pensado para
// previsualizar la cuadrícula de producto (CuadriculaProductos,
// disposicion="grid"): su paginación por scroll y el panel de filtros
// (talla/color/precio + ordenar por) necesitan más de 12 productos y
// variedad real de datos para poder probarse, así que "tallas"/
// "colores"/"precio" no son solo decorativos aquí, PanelFiltros los
// usa de verdad. Es también la fuente de datos de la ficha de
// producto (/tienda/[producto]/page.js, que busca por el slug del
// nombre — ver src/lib/slugify.js) — TarjetaProducto enlaza a esa
// ficha con el mismo slug, así que los dos lados tienen que leer de
// aquí, no de copias sueltas por página (antes /tienda/chaquetas-y-
// abrigos tenía su propio array separado; ya no).

const IMAGENES = [
  {
    imagen: '/img/ecommerce/27FW/Coat-Look-1.jpg',
    colores: [
      { hex: '#202020', nombre: 'Tinta' },
      { hex: '#C19A6B', nombre: 'Camel' },
      { hex: '#6E2635', nombre: 'Burdeos' },
      { hex: '#F7F7F7', nombre: 'Blanco' },
    ],
  },
  { imagen: '/img/ecommerce/27FW/Coat-Look-2.jpg', colores: [{ hex: '#23324A', nombre: 'Azul marino' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
  { imagen: '/img/ecommerce/27FW/Coat-Look-3.jpg', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#202020', nombre: 'Tinta' }] },
  { imagen: '/img/ecommerce/27FW/Coat-Look-4.jpg', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  // FC-0..FC-4: fotos reales (no de la 27FW), para que al menos parte
  // del catálogo de ejemplo deje de repetir siempre las mismas 4.
  { imagen: '/img/ecommerce/FC-0.webp', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
  { imagen: '/img/ecommerce/FC-1.webp', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#C19A6B', nombre: 'Camel' }] },
  { imagen: '/img/ecommerce/FC-2.webp', colores: [{ hex: '#23324A', nombre: 'Azul marino' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/ecommerce/FC-3.webp', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#EED3E8', nombre: 'Rosa suave' }] },
  { imagen: '/img/ecommerce/FC-4.webp', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
];

const PRECIOS = ['990 €', '1.050 €', '1.120 €', '980 €', '850 €', '1.250 €'];

const TALLAS = [
  ['S', 'M', 'L'],
  ['XS', 'S', 'M'],
  ['M', 'L', 'XL'],
  ['XS', 'S', 'M', 'L', 'XL'],
];

const DESCRIPCION = 'Pieza confeccionada con los mismos acabados artesanales de siempre, pensada para acompañar cada ocasión con la calidad y el cuidado que caracterizan a Fely Campo.';

export const productosEjemplo = Array.from({ length: 24 }, (_, indice) => {
  const base = IMAGENES[indice % IMAGENES.length];
  // Galería de la ficha de producto (GaleriaProducto): 3 fotos de
  // ejemplo, no una única foto por producto — mismo pool de 4
  // imágenes de ejemplo, empezando en un punto distinto por producto.
  const imagenes = [0, 1, 2].map((salto) => IMAGENES[(indice + salto) % IMAGENES.length].imagen);
  return {
    ...base,
    imagenes,
    // Segunda foto de la propia galería, reutilizada como hover de
    // TarjetaProducto en la cuadrícula (ver .imagenHover en
    // TarjetaProducto.module.css) — así la tarjeta de listado y la
    // ficha muestran una foto consistente entre sí, sin datos sueltos.
    imagenHover: imagenes[1],
    nombre: `Producto de ejemplo ${String(indice + 1).padStart(2, '0')}`,
    precio: PRECIOS[indice % PRECIOS.length],
    tallas: TALLAS[indice % TALLAS.length],
    descripcion: DESCRIPCION,
  };
});
