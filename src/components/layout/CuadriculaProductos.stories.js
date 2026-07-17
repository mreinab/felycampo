import { NextIntlClientProvider } from 'next-intl';
import CuadriculaProductos from './CuadriculaProductos';
import messages from '../../../messages/es.json';

const IMG = '/img/styleguide/prod-tarjeta.webp';
const IMG_HOVER = '/img/styleguide/prod-tarjeta-hover.webp';

const NOMBRES = ['Falda Vera', 'Vestido Aurora', 'Vestido Sol', 'Falda Mora'];

const coloresPorProducto = [
  [{ hex: '#EED3E8', nombre: 'Rosa suave' }, { hex: '#F7F7F7', nombre: 'Blanco' }],
  [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#23324A', nombre: 'Azul marino' }],
  [{ hex: '#6B705C', nombre: 'Verde oliva' }, { hex: '#C19A6B', nombre: 'Camel' }],
  [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#F5F1EE', nombre: 'Crema' }],
];

const productosBase = NOMBRES.map((nombre, index) => ({
  imagen: IMG,
  imagenHover: IMG_HOVER,
  nombre,
  precio: `${420 + index * 60} €`,
  colores: coloresPorProducto[index],
}));

export default {
  title: 'Layout/CuadriculaProductos',
  component: CuadriculaProductos,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export const Principal = {
  args: {
    productos: productosBase,
  },
};
