import { NextIntlClientProvider } from 'next-intl';
import BotonGuardar from './BotonGuardar';
import messages from '../../../messages/es.json';

export default {
  title: 'UI/BotonGuardar',
  component: BotonGuardar,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export const Interactivo = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <BotonGuardar />
    </div>
  ),
};
