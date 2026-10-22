// sitemap.xml — generado por Next.js (/sitemap.xml).
// Todas las páginas públicas indexables, en los dos idiomas, cada una con
// sus alternates hreflang (es/en/x-default). Fuera: privadas (carrito,
// wishlist, mi cuenta), confirmaciones de cita y /admin.
// Las rutas fijas salen de seoTextos.js (la misma lista que define sus
// títulos), así que una página nueva con title/description propios entra
// sola; las dinámicas, de sus propios archivos de datos.

import { locales, defaultLocale } from '@/i18n';
import { SITE_URL, rutaConLocale } from '@/lib/seo';
import { SEO_TEXTOS } from '@/lib/seoTextos';
import { slugify } from '@/lib/slugify';
import { parametrosCategoria } from '@/lib/atelierCategoriaSeo';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { noviaProductos } from '@/components/layout/noviaProductos';
import { fiestaProductos } from '@/components/layout/fiestaProductos';
import { COLECCIONES } from './[locale]/colecciones-fely-campo/colecciones';
import { BLOG_ENTRADAS } from './[locale]/podcast/blog';

const RUTAS_PRIVADAS = ['/carrito', '/wishlist', '/mi-cuenta/panel'];

// Prioridad orientativa: home y páginas de conversión (ateliers, cita)
// arriba; legales abajo.
function prioridad(ruta) {
  if (ruta === '/') return 1;
  if (ruta.startsWith('/atelier') || ruta === '/visita-fely-campo/cita' || ruta === '/visita-fely-campo') return 0.9;
  if (ruta.startsWith('/legal')) return 0.2;
  return 0.7;
}

function entrada(ruta, prioridadRuta = prioridad(ruta)) {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${rutaConLocale(l, ruta)}`]));
  languages['x-default'] = `${SITE_URL}${rutaConLocale(defaultLocale, ruta)}`;

  // Una <url> por idioma, todas con el mismo bloque de alternates.
  return locales.map((locale) => ({
    url: `${SITE_URL}${rutaConLocale(locale, ruta)}`,
    changeFrequency: 'monthly',
    priority: prioridadRuta,
    alternates: { languages },
  }));
}

export default function sitemap() {
  const fijas = Object.keys(SEO_TEXTOS)
    .filter((ruta) => !RUTAS_PRIVADAS.includes(ruta) && !ruta.includes('/confirmacion-'));

  const dinamicas = [
    ...tiendaProductos.map((p) => [`/pret-a-porter/${slugify(p.nombre)}`, 0.6]),
    ...noviaProductos.map((p) => [`/atelier/novias/${slugify(p.nombre)}`, 0.5]),
    ...fiestaProductos.map((p) => [`/atelier/fiesta/${slugify(p.nombre)}`, 0.5]),
    ...parametrosCategoria(false).map(({ categoria }) => [`/atelier/novias/categoria/${categoria}`, 0.6]),
    ...parametrosCategoria(true).map(({ categoria }) => [`/atelier/fiesta/categoria/${categoria}`, 0.6]),
    ...COLECCIONES.filter((c) => c.slug).map((c) => [`/runways-${c.slug}`, 0.6]),
    ...BLOG_ENTRADAS.map((e) => [`/podcast/${e.slug}`, 0.6]),
  ];

  // Sin duplicados (dos productos con el mismo nombre darían la misma URL).
  const vistas = new Set();
  return [...fijas.map((ruta) => [ruta]), ...dinamicas]
    .filter(([ruta]) => !vistas.has(ruta) && vistas.add(ruta))
    .flatMap(([ruta, p]) => entrada(ruta, p));
}
