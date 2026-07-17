import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export default function middleware(request) {
  const response = intlMiddleware(request);
  // Expone el pathname a Server Components (layout.js) vía header, para
  // que puedan decidir cosas como el Navbar transparente en home sin
  // tener que renderizar <Navbar /> por separado en cada página.
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

export const config = {
  // Corre en todo salvo assets estáticos, _next y api.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
