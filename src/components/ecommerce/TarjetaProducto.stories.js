import TarjetaProducto from './TarjetaProducto';

const IMG = '/img/styleguide/prod-tarjeta.webp';
const IMG_HOVER = '/img/styleguide/prod-tarjeta-hover.webp';

const coloresAurora = [
  { hex: '#EED3E8', nombre: 'Rosa suave' },
  { hex: '#F7F7F7', nombre: 'Blanco' },
];

const coloresSol = [
  { hex: '#6E2635', nombre: 'Burdeos' },
  { hex: '#23324A', nombre: 'Azul marino' },
  { hex: '#6B705C', nombre: 'Verde oliva' },
  { hex: '#C19A6B', nombre: 'Camel' },
];

export default {
  title: 'Ecommerce/TarjetaProducto',
  component: TarjetaProducto,
  argTypes: {
    imagen: {
      control: 'text',
      description: 'URL de la imagen base del producto.',
    },
    imagenHover: {
      control: 'text',
      description: 'URL de la imagen que se revela con fundido al pasar el cursor (opcional).',
    },
    nombre: {
      control: 'text',
      description: 'Nombre del producto.',
    },
    precio: {
      control: 'text',
      description: 'Precio a mostrar. Si hay precioRebajado, este se muestra tachado.',
    },
    precioRebajado: {
      control: 'text',
      description: 'Si tiene valor, muestra precio tachado + este precio en rosa.',
    },
    badge: {
      control: 'text',
      description: 'Texto del badge en la esquina superior izquierda de la imagen (ej. "Novia", "-20%", "Agotado"). Sin badge = producto normal.',
    },
    badgeVariante: {
      control: 'select',
      options: ['tinta', 'rosa', 'velo', 'agotado'],
      description: 'Color del badge — normalmente rosa para descuentos, agotado para sin stock, tinta/velo para el resto.',
    },
    colores: {
      description: 'Array de { hex, nombre } con los colores disponibles. Se muestran como puntos al hacer hover (máx. 3 + "+N"). Se ignora si agotado es true.',
    },
    agotado: {
      control: 'boolean',
      description: 'Si es true, sustituye la fila de colores por el botón "Avísame cuando esté disponible", siempre visible.',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo de la imagen — si se omite, usa el nombre del producto.',
    },
  },
};

export const Variantes = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 160px)', gap: '16px' }}>
      <TarjetaProducto
        imagen={IMG}
        imagenHover={IMG_HOVER}
        nombre="Vestido Aurora"
        precio="890 €"
        badge="Novia"
        colores={coloresAurora}
      />
      <TarjetaProducto imagen={IMG} imagenHover={IMG_HOVER} nombre="Falda Vera" precio="420 €" />
      <TarjetaProducto
        imagen={IMG}
        imagenHover={IMG_HOVER}
        nombre="Vestido Lía"
        precio="1.150 €"
        precioRebajado="920 €"
        badge="-20%"
        badgeVariante="rosa"
      />
      <TarjetaProducto
        imagen={IMG}
        imagenHover={IMG_HOVER}
        nombre="Vestido Sol"
        precio="760 €"
        colores={coloresSol}
      />
    </div>
  ),
};

export const ConBadge = {
  args: { imagen: IMG, imagenHover: IMG_HOVER, nombre: 'Vestido Aurora', precio: '890 €', badge: 'Novia' },
};

export const ConRebaja = {
  args: {
    imagen: IMG,
    imagenHover: IMG_HOVER,
    nombre: 'Vestido Lía',
    precio: '1.150 €',
    precioRebajado: '920 €',
    badge: '-20%',
    badgeVariante: 'rosa',
  },
};

export const ConColores = {
  args: { imagen: IMG, imagenHover: IMG_HOVER, nombre: 'Vestido Sol', precio: '760 €', colores: coloresSol },
};

export const Agotado = {
  args: { imagen: IMG, imagenHover: IMG_HOVER, nombre: 'Vestido Nube', precio: '690 €', badge: 'Agotado', badgeVariante: 'agotado', agotado: true },
};
