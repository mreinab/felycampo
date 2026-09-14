import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fichas de colección de Runway: la URL pública es /runways-{slug}
  // (ej. /runways-diafonia, sin barra) a petición directa del usuario,
  // pero Next.js no admite una carpeta de ruta dinámica con prefijo
  // literal pegado ("runways-[coleccion]" no es sintaxis válida — solo
  // "[param]" a secas). La página real vive en
  // src/app/[locale]/runways/[coleccion]/page.js (ruta normal, con
  // barra) y este rewrite traduce la URL pública a esa ruta interna
  // sin cambiar lo que ve el usuario en la barra de direcciones.
  async rewrites() {
    return [
      {
        source: '/:locale/runways-:coleccion',
        destination: '/:locale/runways/:coleccion',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
