import { NextIntlClientProvider } from 'next-intl';
import Navbar from './Navbar';
import messages from '../../../../messages/es.json';

export default {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export const Principal = {};

export const Transparente = {
  args: { transparent: true },
  render: (args) => (
    <div style={{ background: 'linear-gradient(135deg, #E92174, #1a1a1a)', minHeight: '1600px' }}>
      <Navbar {...args} />
    </div>
  ),
};
