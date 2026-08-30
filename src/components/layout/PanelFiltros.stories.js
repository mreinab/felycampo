import { useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import PanelFiltros from './PanelFiltros';
import messages from '../../../messages/es.json';

const COLORES = [
  { hex: '#202020', nombre: 'Tinta' },
  { hex: '#C19A6B', nombre: 'Camel' },
  { hex: '#6E2635', nombre: 'Burdeos' },
  { hex: '#F7F7F7', nombre: 'Blanco' },
  { hex: '#23324A', nombre: 'Azul marino' },
];

export default {
  title: 'Layout/PanelFiltros',
  component: PanelFiltros,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

// Interactivo — mismo estado que le da CuadriculaProductos en las
// páginas de catálogo (Tienda/Atelier), aquí a mano para poder
// abrir/cerrar el panel y probar los filtros en Storybook.
export const Interactivo = {
  render: () => {
    function Demo() {
      const [abierto, setAbierto] = useState(true);
      const [orden, setOrden] = useState('recomendados');
      const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);
      const [coloresSeleccionados, setColoresSeleccionados] = useState([]);
      const [precioMax, setPrecioMax] = useState(1200);

      const alternar = (lista, valor) => (
        lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]
      );

      return (
        <>
          <button type="button" onClick={() => setAbierto(true)} style={{ margin: 24 }}>
            Abrir filtros
          </button>
          <PanelFiltros
            abierto={abierto}
            onCerrar={() => setAbierto(false)}
            orden={orden}
            onCambiarOrden={setOrden}
            tallas={['XS', 'S', 'M', 'L', 'XL']}
            tallasSeleccionadas={tallasSeleccionadas}
            onToggleTalla={(talla) => setTallasSeleccionadas((actual) => alternar(actual, talla))}
            colores={COLORES}
            coloresSeleccionados={coloresSeleccionados}
            onToggleColor={(color) => setColoresSeleccionados((actual) => alternar(actual, color))}
            precioMax={precioMax}
            precioMaximo={1200}
            onCambiarPrecioMax={setPrecioMax}
            onLimpiar={() => {
              setTallasSeleccionadas([]);
              setColoresSeleccionados([]);
              setPrecioMax(1200);
            }}
            totalResultados={12}
          />
        </>
      );
    }

    return <Demo />;
  },
};
