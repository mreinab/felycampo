import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // La barra final la quita src/proxy.js, no Next: así una URL de la web
  // anterior (WordPress, siempre con barra) llega al mapa de 301 de una
  // vez, sin un 308 previo — ver el paso 2 en proxy.js.
  skipTrailingSlashRedirect: true,

  // Redirecciones de la web anterior: ver src/lib/redirecciones301.js y
  // src/proxy.js (son ~800, por eso viven allí y no aquí). Aquí solo las
  // que el proxy no ve: rutas con punto (excluidas de su matcher) y
  // rutas nuevas con locale.
  //
  // /blog no existe todavía como página propia: redirige (temporal, 307
  // — permanent:false para que buscadores/navegadores no lo cacheen
  // como definitivo) a /podcast, que es donde vive el contenido de
  // momento (ver src/app/[locale]/podcast/blog.js). Quitar cuando haya
  // un /blog real.
  async redirects() {
    return [
      {
        source: '/:locale(es|en)/blog',
        destination: '/:locale/podcast',
        permanent: false,
      },
      // /about era un placeholder vacío que duplicaba /sobre-fely.
      {
        source: '/:locale(es|en)/about',
        destination: '/:locale/sobre-fely',
        statusCode: 301,
      },
      // Categorías de Atelier: antes en camelCase (/categoria/corteA), ahora
      // en minúsculas con guiones (/categoria/corte-a, ver slugCategoria en
      // estiloSiluetaGrupos.js).
      ...[['corteA', 'corte-a'], ['dosPiezas', 'dos-piezas'], ['alfombraRoja', 'alfombra-roja'], ['escoteEspalda', 'escote-espalda']]
        .map(([antes, ahora]) => ({
          source: `/:locale(es|en)/atelier/:seccion(novias|fiesta)/categoria/${antes}`,
          destination: `/:locale/atelier/:seccion/categoria/${ahora}`,
          statusCode: 301,
        })),
      // Sitemaps de WordPress (los que conoce Google Search Console).
      {
        source: '/:sitemap(wp-sitemap.*\\.xml|sitemap_index\\.xml)',
        destination: '/sitemap.xml',
        statusCode: 301,
      },
    ];
  },

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
