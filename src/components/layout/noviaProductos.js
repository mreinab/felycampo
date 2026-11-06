// noviaProductos.js
//
// Catálogo de Atelier > Novias con la forma de "producto" que esperan la
// ficha (FichaProductoAtelier.jsx), las cuadrículas, el sitemap y los datos
// SEO: todos los looks publicados, colección a colección y por su número.
//
// Los datos ya no viven aquí: están en src/datos/atelierNovias.js
// (editables desde /admin/colecciones/novia) y se leen con
// lib/catalogoNovias.js. Este archivo se mantiene para quien ya lo importa.

import { productosNovias } from '@/lib/catalogoNovias';

export const noviaProductos = productosNovias();
