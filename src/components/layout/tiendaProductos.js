// tiendaProductos.js
//
// Catálogo real de Tienda — sustituye a productosEjemplo.js en /tienda
// y sus 4 categorías (chaquetas-y-abrigos, faldas, tops-y-camisetas,
// vestidos) y en la ficha de producto (/tienda/[producto]/page.js),
// mismo criterio que noviaProductos.js/fiestaProductos.js en Atelier:
// se va rellenando producto a producto conforme hay fotos reales,
// nada de datos inventados.
//
// "categoria": slug de la categoría real (mismo segmento de URL que
// /tienda/<categoria>) — cada página de categoría filtra por esto de
// verdad en vez de enseñar el catálogo entero sin filtrar (placeholder
// de siempre en productosEjemplo.js). /tienda (portada) no filtra,
// enseña todas las categorías juntas.
// "precio": mismo formato que el resto del sitio ("450 €", sin
// decimales, punto como separador de miles en los que lleguen a mil) —
// parsearPrecio en CuadriculaProductos.jsx quita todo lo que no sea
// dígito, así que un decimal ("450,00 €") se leería como 45000.
// "colores"/"hex": aproximado a ojo desde la propia foto, no viene de
// una guía de color real todavía.
// "tallas" vs "tallasDisponibles": "tallas" es SIEMPRE el rango
// completo (TALLAS_DISPONIBLES, 36 a 64) — el selector de la ficha
// enseña todas las tallas de siempre, nunca solo un subconjunto.
// "tallasDisponibles" es la lista real de tallas que se pueden comprar
// de este producto en concreto; el resto del rango se enseña con
// opacidad reducida y lleva al flujo de "Avísame cuando esté
// disponible" en vez de añadir al carrito (ver tienda/[producto]/
// page.js, que calcula "agotadas" restando tallasDisponibles del
// rango completo).

import { TALLAS_DISPONIBLES } from '@/components/ecommerce/guiaTallasData';

export const tiendaProductos = [
  {
    nombre: 'Falda Basilea',
    categoria: 'faldas',
    precio: '450 €',
    descripcion: 'Falda Basilea estampada color verde esmeralda.',
    colores: [{ hex: '#0F6B4C', nombre: 'Verde esmeralda' }],
    tallas: TALLAS_DISPONIBLES,
    tallasDisponibles: [40, 42],
    imagen: '/img/ecommerce/faldas/falda-verde-felycampo-front.jpg',
    imagenHover: '/img/ecommerce/faldas/falda-verde-felycampo-back.jpg',
    imagenes: [
      '/img/ecommerce/faldas/falda-verde-felycampo-front.jpg',
      '/img/ecommerce/faldas/falda-verde-felycampo-back.jpg',
    ],
  },
];
