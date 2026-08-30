import { useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import CollectionTitle from './CollectionTitle';
import messages from '../../../messages/es.json';

export default {
  title: 'UI/CollectionTitle',
  component: CollectionTitle,
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
    labelKey: 'collectionTitle.edicionMujer.label',
    titleKey: 'collectionTitle.edicionMujer.title',
    descriptionKey: 'collectionTitle.edicionMujer.description',
  },
};

export const SinDescripcion = {
  args: {
    labelKey: 'collectionTitle.edicionMujer.label',
    titleKey: 'collectionTitle.edicionMujer.title',
  },
};

export const ConTabs = {
  render: (args) => {
    const [activo, setActivo] = useState(0);
    return <CollectionTitle {...args} activo={activo} onSelectTab={setActivo} />;
  },
  args: {
    variante: 'tabs',
    subtitleKey: 'cuadriculaTabs.subtitulo',
    titleKey: 'cuadriculaTabs.titulo',
    descriptionKey: 'cuadriculaTabs.descripcion',
    tabs: [
      { key: 'diaBoda', labelKey: 'cuadriculaTabs.tabs.diaBoda' },
      { key: 'nocheBoda', labelKey: 'cuadriculaTabs.tabs.nocheBoda' },
      { key: 'comunionesBautizo', labelKey: 'cuadriculaTabs.tabs.comunionesBautizo' },
    ],
  },
};

