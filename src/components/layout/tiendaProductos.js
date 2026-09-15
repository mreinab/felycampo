// tiendaProductos.js
//
// Catálogo real de Prêt-à-porter — sustituye a productosEjemplo.js en
// /pret-a-porter y sus 5 categorías (chaquetas-y-abrigos, faldas,
// pantalones, tops-y-camisetas, vestidos) y en la ficha de producto
// (/pret-a-porter/[producto]/page.js),
// mismo criterio que noviaProductos.js/fiestaProductos.js en Atelier:
// se va rellenando producto a producto conforme hay fotos reales,
// nada de datos inventados.
//
// "categoria": slug de la categoría real (mismo segmento de URL que
// /pret-a-porter/<categoria>) — cada página de categoría filtra por
// esto de verdad en vez de enseñar el catálogo entero sin filtrar
// (placeholder de siempre en productosEjemplo.js). /pret-a-porter
// (portada) no filtra, enseña todas las categorías juntas.
// "precio": mismo formato que el resto del sitio ("450 €", sin
// decimales, punto como separador de miles en los que lleguen a mil) —
// parsearPrecio en CuadriculaProductos.jsx quita todo lo que no sea
// dígito, así que un decimal ("450,00 €") se leería como 45000.
// "colores": nombre/hex tomados tal cual de coloresMock (ver
// components/admin/mockData.js — la misma biblioteca de color que usa
// el panel admin) escogiendo el más parecido a ojo a la foto real, no
// un hex inventado suelto — así el mismo nombre de color se lee igual
// en todo el sitio.
// "tallas" vs "tallasDisponibles": "tallas" es SIEMPRE el rango
// completo (TALLAS_DISPONIBLES, 36 a 64) — el selector de la ficha
// enseña todas las tallas de siempre, nunca solo un subconjunto.
// "tallasDisponibles" es la lista real de tallas que se pueden comprar
// de este producto en concreto; el resto del rango se enseña con
// opacidad reducida y lleva al flujo de "Avísame cuando esté
// disponible" en vez de añadir al carrito (ver pret-a-porter/[producto]/
// page.js, que calcula "agotadas" restando tallasDisponibles del
// rango completo).

import { TALLAS_DISPONIBLES } from '@/components/ecommerce/guiaTallasData';

export const tiendaProductos = [
  {
    nombre: 'Falda Basilea',
    categoria: 'faldas',
    precio: '450 €',
    descripcion: 'Falda Basilea estampada color verde esmeralda.',
    colores: [{ hex: '#0F5C43', nombre: 'Esmeralda' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [40, 42],
    imagen: '/img/ecommerce/faldas/falda-verde-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/faldas/falda-verde-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/faldas/falda-verde-felycampo-front.jpg',
      '/img/ecommerce/faldas/falda-verde-felycampo-back.jpg',
    ],
  },
  {
    nombre: 'Falda Lhasa',
    categoria: 'faldas',
    sku: 'MBO3740',
    precio: '450 €',
    descripcion: 'Falda Lhasa a cuadros color marrón bronce.',
    colores: [{ hex: '#8C6A3F', nombre: 'Bronce' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38],
    imagen: '/img/ecommerce/faldas/falda-cuadros-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/faldas/falda-cuadros-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/faldas/falda-cuadros-felycampo-front.jpg',
      '/img/ecommerce/faldas/falda-cuadros-felycampo-back.jpg',
    ],
  },
  {
    nombre: 'Chaqueta Samarcanda',
    categoria: 'chaquetas-y-abrigos',
    sku: 'MBO3739',
    precio: '600 €',
    descripcion: 'Chaqueta Samarcanda a cuadros marrón y negro.',
    colores: [{ hex: '#4B3621', nombre: 'Chocolate' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38],
    imagen: '/img/ecommerce/chaquetas-y-abrigos/MBO3739-chaquetacuadros-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/chaquetas-y-abrigos/MBO3739-chaquetacuadros-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/chaquetas-y-abrigos/MBO3739-chaquetacuadros-felycampo-front.jpg',
      '/img/ecommerce/chaquetas-y-abrigos/MBO3739-chaquetacuadros-felycampo-back.jpg',
    ],
  },
  {
    nombre: 'Vestido Largo Chicago',
    categoria: 'vestidos',
    sku: 'MBO2752',
    precio: '450 €',
    descripcion: 'Vestido Largo Chicago de manga larga en encaje negro.',
    colores: [{ hex: '#111111', nombre: 'Negro' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38, 44],
    imagen: '/img/ecommerce/vestidos/MBO2752-vestidolargo-encaje-front.jpg',
    imagenHover: '/img/ecommerce/vestidos/MBO2752-vestidolargo-encaje-back.jpg',
    imagenes: [
      '/img/ecommerce/vestidos/MBO2752-vestidolargo-encaje-front.jpg',
      '/img/ecommerce/vestidos/MBO2752-vestidolargo-encaje-back.jpg',
    ],
  },
  {
    nombre: 'Falda Sucre',
    categoria: 'faldas',
    sku: 'MBO2702',
    precio: '450 €',
    descripcion: 'Falda Sucre con abertura color marrón.',
    colores: [{ hex: '#8C6A3F', nombre: 'Bronce' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38],
    imagen: '/img/ecommerce/faldas/MBO2702-falda-abertura-sucre-front.jpg',
    imagenHover: '/img/ecommerce/faldas/MBO2702-falda-abertura-sucre-back.jpg',
    imagenes: [
      '/img/ecommerce/faldas/MBO2702-falda-abertura-sucre-front.jpg',
      '/img/ecommerce/faldas/MBO2702-falda-abertura-sucre-back.jpg',
    ],
  },
  {
    nombre: 'Pantalón Goree',
    categoria: 'pantalones',
    sku: 'MBO2724',
    precio: '450 €',
    descripcion: 'Pantalón Goree a rayas color antracita.',
    colores: [{ hex: '#4A4A48', nombre: 'Antracita' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38, 40, 42],
    imagen: '/img/ecommerce/pantalones/MBO2724-pantalon-raya-front.jpg',
    imagenHover: '/img/ecommerce/pantalones/MBO2724-pantalon-raya-back.jpg',
    imagenes: [
      '/img/ecommerce/pantalones/MBO2724-pantalon-raya-front.jpg',
      '/img/ecommerce/pantalones/MBO2724-pantalon-raya-back.jpg',
    ],
  },
  {
    nombre: 'Chaqueta Sucre',
    categoria: 'chaquetas-y-abrigos',
    precio: '550 €',
    descripcion: 'Chaqueta Sucre de lana color marrón.',
    colores: [{ hex: '#8C6A3F', nombre: 'Bronce' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38],
    imagen: '/img/ecommerce/chaquetas-y-abrigos/chaquetalanamarron-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/chaquetas-y-abrigos/chaquetalanamarron-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/chaquetas-y-abrigos/chaquetalanamarron-felycampo-front.jpg',
      '/img/ecommerce/chaquetas-y-abrigos/chaquetalanamarron-felycampo-back.jpg',
    ],
  },
  {
    nombre: 'Abrigo Corto',
    categoria: 'chaquetas-y-abrigos',
    precio: '550 €',
    descripcion: 'Abrigo corto color morado.',
    colores: [{ hex: '#3E2A44', nombre: 'Berenjena' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38],
    imagen: '/img/ecommerce/chaquetas-y-abrigos/abrigo-corto-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/chaquetas-y-abrigos/abrigo-corto-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/chaquetas-y-abrigos/abrigo-corto-felycampo-front.jpg',
      '/img/ecommerce/chaquetas-y-abrigos/abrigo-corto-felycampo-back.jpg',
    ],
  },
  {
    nombre: 'Chaqueta Aranjuez',
    categoria: 'chaquetas-y-abrigos',
    sku: 'MBO2749',
    precio: '550 €',
    descripcion: 'Chaqueta Aranjuez de paillette color dorado.',
    colores: [{ hex: '#C6A664', nombre: 'Oro / Champán' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38],
    imagen: '/img/ecommerce/chaquetas-y-abrigos/chaqueta-aranjuez-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/chaquetas-y-abrigos/chaqueta-aranjuez-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/chaquetas-y-abrigos/chaqueta-aranjuez-felycampo-front.jpg',
      '/img/ecommerce/chaquetas-y-abrigos/chaqueta-aranjuez-felycampo-back.jpg',
    ],
  },
  {
    // Disponible en gris y azul, pero solo hay reportaje fotográfico del
    // gris todavía — la ficha no cambia de foto al elegir color (ver
    // FichaProductoAcciones.jsx), así que el azul se enseña como opción
    // real de todas formas, con las mismas fotos de momento.
    nombre: 'Falda Jeju',
    categoria: 'faldas',
    precio: '450 €',
    descripcion: 'Falda Jeju a cuadros color gris.',
    colores: [
      { hex: '#A8A29A', nombre: 'Gris piedra' },
      { hex: '#1F2A44', nombre: 'Azul marino' },
    ],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38, 42],
    imagen: '/img/ecommerce/faldas/jeju-falda-cuadros-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/faldas/jeju-falda-cuadros-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/faldas/jeju-falda-cuadros-felycampo-front.jpg',
      '/img/ecommerce/faldas/jeju-falda-cuadros-felycampo-back.jpg',
    ],
  },
  {
    // Sin foto de espalda todavía — GaleriaProducto ya sabe tratar una
    // única imagen (alineada a la derecha, ajustada a la altura, ver
    // GaleriaProducto.module.css ".pistaUnica"), así que "imagenHover"
    // se omite en vez de repetir la misma foto sin más.
    nombre: 'Top Ubud',
    categoria: 'tops-y-camisetas',
    sku: 'MBO2723',
    precio: '350 €',
    descripcion: 'Top Ubud de cuerpo pellizcado color rojo y negro.',
    colores: [{ hex: '#111111', nombre: 'Negro' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [42],
    imagen: '/img/ecommerce/tops-y-camisas/top-ubud-felycampo-front.jpg',
    imagenes: [
      '/img/ecommerce/tops-y-camisas/top-ubud-felycampo-front.jpg',
    ],
  },
  {
    nombre: 'Abrigo Copenhague',
    categoria: 'chaquetas-y-abrigos',
    precio: '600 €',
    descripcion: 'Abrigo Copenhague de lana color rosa palo.',
    colores: [{ hex: '#D9B8B2', nombre: 'Rosa palo' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [38],
    imagen: '/img/ecommerce/chaquetas-y-abrigos/abrigo-lana-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/chaquetas-y-abrigos/abrigo-lana-felycampo-back.jpg',
    // Foto con modelo al final, ver comentario de la conversación —
    // front/back primero (mismo criterio que el resto del catálogo),
    // la de modelo cierra la galería en vez de abrirla.
    imagenes: [
      '/img/ecommerce/chaquetas-y-abrigos/abrigo-lana-felycampo-front.jpg',
      '/img/ecommerce/chaquetas-y-abrigos/abrigo-lana-felycampo-back.jpg',
      '/img/ecommerce/chaquetas-y-abrigos/abrigo-lana-felycampo-model.jpg',
    ],
  },
  {
    // Disponible en más colores de los que hay reportaje fotográfico
    // (solo rosa, el de "imagen"/"imagenes" abajo) — mismo caso que
    // Falda Jeju más arriba. "Blanco y negro"/"Azul y plata"/"Azul
    // metálico" no tienen equivalente de un solo tono en coloresMock
    // (mockData.js): se deja el tono más parecido a ojo.
    nombre: 'Top Encaje París',
    categoria: 'tops-y-camisetas',
    sku: 'MBO2746',
    precio: '350 €',
    descripcion: 'Top Encaje París de encaje en diversos colores.',
    colores: [
      { hex: '#B03060', nombre: 'Fucsia' },
      { hex: '#6E1E2B', nombre: 'Burdeos' },
      { hex: '#111111', nombre: 'Negro' },
      { hex: '#CFCCC6', nombre: 'Gris perla' },
      { hex: '#C4C7CC', nombre: 'Plata' },
      { hex: '#1E4D4A', nombre: 'Petróleo' },
      { hex: '#4A6B8A', nombre: 'Denim' },
      { hex: '#1F2A44', nombre: 'Azul marino' },
    ],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [42],
    imagen: '/img/ecommerce/tops-y-camisas/top-encaje-rosa-front.jpg',
    imagenHover: '/img/ecommerce/tops-y-camisas/top-encaje-rosa-back.jpg',
    imagenes: [
      '/img/ecommerce/tops-y-camisas/top-encaje-rosa-front.jpg',
      '/img/ecommerce/tops-y-camisas/top-encaje-rosa-back.jpg',
    ],
  },
  {
    nombre: 'Vestido Zahara',
    categoria: 'vestidos',
    sku: '27119',
    precio: '300 €',
    descripcion: 'Vestido Zahara plisado color verde botella.',
    colores: [{ hex: '#14342B', nombre: 'Verde botella' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [40],
    imagen: '/img/ecommerce/tops-y-camisas/vestido-plisado-felycampo-front.jpg',
    imagenes: [
      '/img/ecommerce/tops-y-camisas/vestido-plisado-felycampo-front.jpg',
    ],
  },
];
