/* ============================================================
   LAYOUT RAÍZ — envuelve todas las páginas.
   Aquí van el favicon y las fuentes — el equivalente en Next.js
   a los <link> del <head> de styleguide.html (que los necesita
   aparte, por ser un HTML independiente sin build).
   ============================================================ */

import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/styles/global.css';
import { Navbar, Footer } from '@/components/layout';
import { locales } from '@/i18n';

export const metadata = {
  title: 'Fely Campo · Moda de fiesta y novia',
  description: 'Firma de moda femenina fundada en Salamanca en 1997. Colecciones de fiesta y novia, prêt-à-porter y costura a medida.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23E92174'/%3E%3C/svg%3E",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  // Home transparente, el resto de páginas con el Navbar blanco de
  // siempre. El pathname no llega como prop al layout compartido — lo
  // inyecta middleware.js vía header (x-pathname) para no tener que
  // renderizar <Navbar /> a mano en cada una de las páginas.
  const pathname = (await headers()).get('x-pathname') ?? '';
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  return (
    <html lang={locale}>
      {/* La fuente Inter se carga vía @import en global.css (mismo criterio
          que styleguide.html) — si más adelante se prefiere optimizarla con
          next/font/google, este es el sitio donde se sustituiría. */}
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar transparent={isHome} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
