import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';
import { REDIRECCIONES_301 } from './lib/redirecciones301';

// URLs antiguas (WordPress) que no estaban en el sitemap — productos o
// categorías que ya se habían despublicado, feeds, archivos del blog... —
// por prefijo, después del mapa exacto de redirecciones301.js. Mejor un
// 301 a la sección más cercana que un 404.
const REGLAS_PREFIJO = [
  [/^\/producto\//, '/es/atelier'],
  [/^\/categoria-producto\/(novias|tendencias-novia|estilos-novia|siluetas-novia)(\/|$)/, '/es/atelier/novias'],
  [/^\/categoria-producto\/(fiesta|tendencias-fiesta|estilos-fiesta|siluetas-fiesta)(\/|$)/, '/es/atelier/fiesta'],
  [/^\/categoria-producto\//, '/es/atelier'],
  [/^\/(category|tag|author)\//, '/es/podcast'],
  [/^\/(feed|comments\/feed)$/, '/es/podcast'],
  [/^\/(tienda|shop|carrito|cart|mi-cuenta|my-account|finalizar-compra|checkout)$/, '/es/pret-a-porter'],
];

// 301 de la web anterior: null si "pathname" no es una URL antigua. Las
// rutas nuevas siempre empiezan por un locale (/es, /en), así que nunca
// chocan con las antiguas, que no lo llevaban.
// La raíz "/" queda fuera aunque esté en el mapa: es la misma URL en la
// web nueva y next-intl la resuelve al idioma del navegador (un 301 fijo
// a /es mandaría a todo el mundo al español para siempre).
function destinoAntiguo(pathname) {
  const ruta = (pathname.replace(/\/+$/, '') || '/').toLowerCase();
  if (ruta === '/') return null;
  if (REDIRECCIONES_301[ruta]) return REDIRECCIONES_301[ruta];
  if (locales.some((locale) => ruta === `/${locale}` || ruta.startsWith(`/${locale}/`))) return null;
  const regla = REGLAS_PREFIJO.find(([patron]) => patron.test(ruta));
  return regla ? regla[1] : null;
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export default function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // 1) Web anterior → 301 directo a la nueva, en un solo salto (sin pasar
  //    antes por la redirección de idioma de next-intl ni por la de barra
  //    final). Los parámetros de WordPress (?p=, ?add-to-cart=...) no
  //    significan nada aquí, así que no se arrastran.
  const destino = destinoAntiguo(pathname);
  if (destino) {
    return NextResponse.redirect(new URL(destino, request.url), 301);
  }

  // 2) Barra final: las URLs de WordPress la llevaban siempre; las nuevas
  //    no. Con skipTrailingSlashRedirect (next.config.mjs) Next ya no la
  //    quita por su cuenta — se hace aquí, DESPUÉS del paso 1, para que
  //    una URL antigua con barra no dé dos saltos (308 + 301).
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // new URL(request.url), no request.nextUrl.clone(): NextURL vuelve a
    // añadir la barra al serializar si la petición la traía (bucle).
    const url = new URL(request.url);
    url.pathname = pathname.replace(/\/+$/, '');
    return NextResponse.redirect(url, 308);
  }

  const response = intlMiddleware(request);

  // Expone el pathname a Server Components (layout.js) vía header, para
  // que puedan decidir cosas como el Navbar transparente en home sin
  // tener que renderizar <Navbar /> por separado en cada página.
  //
  // response.headers.set(...) por sí solo NO basta: eso solo añade el
  // header a la respuesta que ve el navegador, no al request que llega
  // al render. Hay que reenviarlo también como REQUEST header con el
  // protocolo x-middleware-request-*/x-middleware-override-headers (el
  // mismo que usa internamente NextResponse.next({request:{headers}}),
  // y que next-intl ya usa para pasar el locale resuelto) — si no, en
  // runtimes que separan el middleware del render en procesos distintos
  // (p.ej. Netlify: Edge Function -> función origin) el header nunca
  // llega y `headers().get('x-pathname')` sale null en producción,
  // aunque en `next dev` sí funcione.
  const existingOverrides = response.headers.get('x-middleware-override-headers');
  const overrides = existingOverrides ? existingOverrides.split(',') : [];

  response.headers.set('x-pathname', pathname);
  response.headers.set('x-middleware-request-x-pathname', pathname);
  response.headers.set(
    'x-middleware-override-headers',
    [...new Set([...overrides, 'x-pathname'])].join(',')
  );

  return response;
}

export const config = {
  // Corre en todo salvo assets estáticos, _next y api.
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
