import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export const config = {
  // Corre en todo salvo assets estáticos, _next y api.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
