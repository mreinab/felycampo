/* Ruta: /pret-a-porter/coats — cuadrícula de abrigos FW27. */

import { CuadriculaProductos } from '@/components/layout';

const abrigos = [
  { imagen: '/img/ecommerce/27FW/Coat-Look-1.jpg', nombre: 'Abrigo Invierno 01', precio: '990 €', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#C19A6B', nombre: 'Camel' }] },
  { imagen: '/img/ecommerce/27FW/Coat-Look-2.jpg', nombre: 'Abrigo Invierno 02', precio: '1.050 €', colores: [{ hex: '#23324A', nombre: 'Azul marino' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
  { imagen: '/img/ecommerce/27FW/Coat-Look-3.jpg', nombre: 'Abrigo Invierno 03', precio: '1.120 €', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#202020', nombre: 'Tinta' }] },
  { imagen: '/img/ecommerce/27FW/Coat-Look-4.jpg', nombre: 'Abrigo Invierno 04', precio: '980 €', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
];

export default function CoatsPagina() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <p className="text-caption uppercase text-gris-500 mb-16">Prêt-à-porter</p>
        <h1>Coats</h1>
      </div>
      <CuadriculaProductos productos={abrigos} />
    </section>
  );
}
