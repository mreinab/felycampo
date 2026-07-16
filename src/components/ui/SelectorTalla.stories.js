import { useState } from 'react';
import SelectorTalla from './SelectorTalla';

export default {
  title: 'UI/SelectorTalla',
  component: SelectorTalla,
  argTypes: {
    tallas: {
      description: 'Array con todas las tallas disponibles a mostrar, ej. ["XS","S","M","L","XL"].',
    },
    agotadas: {
      description: 'Array con las tallas sin stock — se muestran tachadas y deshabilitadas.',
    },
    seleccionada: {
      control: 'text',
      description: 'Talla actualmente seleccionada (controla qué botón se marca como activo).',
    },
    onSelect: {
      description: 'Evento que se dispara al elegir una talla no agotada.',
    },
  },
};

export const Interactivo = {
  render: () => {
    const [talla, setTalla] = useState('S');
    return (
      <SelectorTalla
        tallas={['XS', 'S', 'M', 'L', 'XL']}
        agotadas={['XL']}
        seleccionada={talla}
        onSelect={setTalla}
      />
    );
  },
};
