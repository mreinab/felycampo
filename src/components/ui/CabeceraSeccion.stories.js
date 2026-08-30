import { NextIntlClientProvider } from 'next-intl';
import CabeceraSeccion from './CabeceraSeccion';
import Boton from './Boton';
import messages from '../../../messages/es.json';

export default {
  title: 'UI/CabeceraSeccion',
  component: CabeceraSeccion,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

// Accion por defecto (1 columna, la 4ª) — un botón suelto. Mismo uso
// que la cabecera de CuadriculaProductos.
export const ConBoton = {
  args: {
    subtitleKey: 'cuadriculaProductos.novedades',
    titleKey: 'cuadriculaProductos.coleccion',
    descriptionKey: 'cuadriculaProductos.novedadesDescripcion',
  },
  render: (args) => (
    <CabeceraSeccion {...args}>
      <Boton variante="flecha" href="#">Ver colección</Boton>
    </CabeceraSeccion>
  ),
};

// accionAncha (3 columnas, 2ª a 4ª) — contenido que necesita más
// sitio que un botón, ej. una fila de tabs. Mismo uso que
// CollectionTitle variante "tabs".
export const AccionAncha = {
  args: {
    subtitleKey: 'cuadriculaTabs.subtitulo',
    titleKey: 'cuadriculaTabs.titulo',
    descriptionKey: 'cuadriculaTabs.descripcion',
    accionAncha: true,
  },
  render: (args) => (
    <CabeceraSeccion {...args}>
      <Boton variante="flecha" href="#">Ver todo</Boton>
    </CabeceraSeccion>
  ),
};

// Sin accion (sin children) — solo el grupo título, sin la columna de
// la derecha.
export const SoloTitulo = {
  args: {
    subtitleKey: 'cuadriculaProductos.novedades',
    titleKey: 'cuadriculaProductos.coleccion',
  },
};
