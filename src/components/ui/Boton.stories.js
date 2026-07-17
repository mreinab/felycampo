import Boton from './Boton';

export default {
  title: 'UI/Boton',
  component: Boton,
  argTypes: {
    variante: {
      control: 'select',
      options: ['solido', 'contorno', 'rosa', 'texto', 'texto-crema', 'avisa'],
      description: 'Sólido = acción principal. Rosa = solo CTA de compra, máximo una por pantalla. Contorno = acción secundaria. Texto = enlaces. Texto-crema = enlace en --color-crema, para fondos oscuros/imágenes. Avisa = tamaño fijo compacto, para "avísame cuando esté disponible".',
    },
    tamano: {
      control: 'select',
      options: ['s', 'm', 'l', 'full'],
      description: 'Solo aplica a las variantes solido/contorno/rosa — la variante avisa ignora este control (tamaño fijo).',
    },
    desactivado: {
      control: 'boolean',
      description: 'Deshabilita el botón e ignora los clics.',
    },
    mayusculas: {
      control: 'boolean',
      description: 'Solo aplica con variante="texto": pone el texto en mayúsculas (ej. enlaces legales) y fija el hover en tinta.',
    },
    onClick: {
      description: 'Evento que se dispara al hacer clic (ignorado si desactivado es true).',
    },
  },
};

export const Variantes = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Boton variante="solido">Comprar</Boton>
      <Boton variante="contorno">Ver colección</Boton>
      <Boton variante="rosa">Añadir a la cesta</Boton>
      <Boton variante="texto">Descubre más</Boton>
    </div>
  ),
};

export const Tamanos = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Boton tamano="s">Pequeño</Boton>
      <Boton tamano="m">Mediano</Boton>
      <Boton tamano="l">Grande</Boton>
    </div>
  ),
};

export const Desactivado = {
  args: { children: 'No disponible', desactivado: true },
};

export const Avisa = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <Boton variante="avisa">Avísame cuando esté disponible</Boton>
    </div>
  ),
};

export const TextoMayusculas = {
  args: { variante: 'texto', mayusculas: true, children: 'Términos y condiciones' },
};

export const TextoCrema = {
  args: { variante: 'texto-crema', children: 'Descubre más' },
  render: (args) => (
    <div style={{ background: '#1a1a1a', padding: '32px', display: 'inline-block' }}>
      <Boton {...args} />
    </div>
  ),
};
