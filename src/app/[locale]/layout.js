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
import { Navbar, Footer, NewsletterModalGlobal, CookieConsent, BotonWhatsapp, Analitica } from '@/components/layout';
// Server Components (usan next-intl/server): importados directamente, no
// desde el barrel de layout, que también cargan Client Components.
import AteliersCita from '@/components/layout/AteliersCita';
import PedirCita from '@/components/layout/PedirCita';
import { SITE_URL, SITIO_INDEXABLE } from '@/lib/seo';
import { CarritoProvider } from '@/context/CarritoContext';
import { MiCuentaProvider } from '@/context/MiCuentaContext';
import { locales } from '@/i18n';
import { entradaPorSlug } from './podcast/blog';

// Páginas con su propio ProductHero (ver
// src/components/layout/ProductHero.jsx) — nacen con el Navbar
// transparente igual que home, pero con el logo a tamaño normal (ver
// "crecerLogo" más abajo). No se importa desde Navbar.jsx: es un
// Client Component, y solo sus componentes (no valores sueltos)
// cruzan de forma fiable la frontera a un Server Component como este
// layout — mantener en sync con SUBMENU_STRUCTURE.tienda.items de
// Navbar.jsx si cambian las categorías de Prêt-à-porter.
const RUTAS_CON_PRODUCT_HERO = [
  '/pret-a-porter',
  '/pret-a-porter/tops-y-camisetas',
  '/pret-a-porter/chaquetas-y-abrigos',
  '/pret-a-porter/faldas',
  '/pret-a-porter/pantalones',
  '/pret-a-porter/vestidos',
  '/atelier',
  '/atelier/novias',
  '/atelier/fiesta',
  '/puntos-de-venta-fely-campo',
  '/visita-fely-campo',
  '/atelier-fiesta/salamanca',
  '/atelier-fiesta/madrid',
  '/atelier-fiesta/oviedo',
  '/sobre-fely',
  '/responsabilidad',
  '/colecciones-fely-campo',
  '/podcast',
  '/talleres-fely-campo',
  '/ayuda/envios',
  '/ayuda/devoluciones',
  '/ayuda/contacto',
];

// Columnas de ateliers (AteliersCita, justo encima de la banda
// PedirCita) solo donde hay intención de visitar un atelier — a
// petición, también por SEO (enlaces internos a las fichas locales
// donde aportan, no repetidos en todo el sitio):
//   - home;
//   - hecho a medida (/atelier, /atelier/novias y /atelier/fiesta con
//     sus categorías y fichas): se prueba y se ajusta en el atelier.
// No en las fichas de cada atelier (/atelier-fiesta/[ciudad]), a
// petición, ni en /visita-fely-campo: ya es el directorio de los tres
// ateliers (mismos enlaces repetidos). Ni en páginas de contenido o
// tienda online (podcast, talleres, prêt-à-porter, runways…).
// PedirCita va en todas las páginas salvo el propio formulario de cita
// y sus confirmaciones (/visita-fely-campo/cita...).
function conAteliersCitaEn(ruta) {
  return (
    ruta === '/' ||
    ruta === '/atelier' ||
    ruta.startsWith('/atelier/novias') ||
    ruta.startsWith('/atelier/fiesta')
  );
}

// Valores por defecto de SEO para todo el sitio — cada página pone los
// suyos (title, description, canonical, hreflang) con metadataPagina()
// de src/lib/seo.js. Aquí solo: dominio base (para que las URLs
// relativas de Open Graph salgan absolutas), plantilla de título para
// las pocas páginas que no lo fijan, y el noindex GLOBAL mientras
// SITIO_INDEXABLE no sea "true" (entorno de pruebas) — gana a cualquier
// "index" de una página concreta porque esas nunca lo declaran en
// positivo, solo el noindex de las privadas.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fely Campo | Vestidos de novia y fiesta a medida',
    template: '%s | Fely Campo',
  },
  description: 'Firma de moda femenina nacida en Salamanca. Vestidos de novia y fiesta a medida en Salamanca, Madrid y Oviedo, y prêt-à-porter online.',
  ...(SITIO_INDEXABLE ? {} : { robots: { index: false, follow: false } }),
  // Favicon: F negra sobre blanco por defecto; en modo oscuro del
  // navegador/sistema, la versión invertida (F blanca sobre negro). PNG,
  // no WebP: Safari no admite favicons WebP.
  icons: {
    icon: [
      { url: '/img/logo/FelyCampo-logo-favicon-blanco.png', type: 'image/png', sizes: '512x512' },
      { url: '/img/logo/FelyCampo-logo-favicon.png', type: 'image/png', sizes: '512x512', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/img/logo/FelyCampo-logo-favicon-blanco.png',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  // Home transparente (con el logo creciendo), páginas de listado de
  // producto (Tienda + categorías, Atelier/novias y /fiesta) también
  // transparentes pero con el logo a tamaño normal — llevan su propio
  // ProductHero debajo (ver layout.js más abajo/Navbar.jsx) — el
  // resto de páginas con el Navbar blanco de siempre. El pathname no
  // llega como prop al layout compartido — lo inyecta middleware.js
  // vía header (x-pathname) para no tener que renderizar <Navbar />
  // a mano en cada una de las páginas.
  const pathname = (await headers()).get('x-pathname') ?? '';
  const rutaSinLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  const isHome = rutaSinLocale === '/';
  const tieneProductHero = RUTAS_CON_PRODUCT_HERO.includes(rutaSinLocale);
  // Ficha de colección de Runway (/runways-[coleccion], ruta dinámica
  // con el prefijo "runways-" en el propio nombre de carpeta — no
  // puede vivir en RUTAS_CON_PRODUCT_HERO, que solo hace match
  // exacto): mismo Navbar transparente que Tienda/Atelier, con su
  // propio hero marcado data-navbar-hero (ver runways-[coleccion]/
  // page.js).
  const esFichaRunway = rutaSinLocale.startsWith('/runways-');
  // Igual que "esFichaRunway": páginas de categoría de Atelier
  // (/atelier/{novias,fiesta}/categoria/[categoria], ruta dinámica —
  // ver ese page.js) llevan el mismo ProductHero que ../page.js, así
  // que necesitan el mismo Navbar transparente.
  const esCategoriaAtelier = /^\/atelier\/(novias|fiesta)\/categoria\//.test(rutaSinLocale);
  // Ficha de entrada de blog (/podcast/[slug], ruta dinámica — antes
  // /blog, ver podcast/page.js para el porqué del cambio de URL; igual
  // que esFichaRunway, no puede vivir en RUTAS_CON_PRODUCT_HERO):
  // "articulo" y "podcast" llevan foto a sangre con data-navbar-hero
  // (ver BlogArticulo.jsx/BlogPodcast.jsx) — "campana" no (gestiona su
  // propio Navbar sólido con un offset interno, ver BlogCampana.jsx),
  // así que hace falta mirar el dato real de blog.js, no solo el
  // prefijo de la URL.
  const matchBlog = rutaSinLocale.match(/^\/podcast\/([^/]+)$/);
  const tipoBlog = matchBlog && entradaPorSlug(matchBlog[1])?.tipo;
  const esHeroBlog = tipoBlog === 'articulo' || tipoBlog === 'podcast';

  // /pret-a-porter (solo la página principal, no sus categorías ni
  // fichas): hero sin velo y con texto en tinta (ver pret-a-porter/
  // page.js), así que el Navbar transparente también va en oscuro.
  const esPretAPorter = rutaSinLocale === '/pret-a-porter';

  const conAteliersCita = conAteliersCitaEn(rutaSinLocale);
  const conPedirCita = !rutaSinLocale.startsWith('/visita-fely-campo/cita');

  return (
    <html lang={locale}>
      {/* La fuente Inter se carga vía @import en global.css (mismo criterio
          que styleguide.html) — si más adelante se prefiere optimizarla con
          next/font/google, este es el sitio donde se sustituiría. */}
      <body>
        <Analitica />
        <NextIntlClientProvider messages={messages}>
          <CarritoProvider>
            <MiCuentaProvider>
              <Navbar
                transparent={isHome || tieneProductHero || esFichaRunway || esCategoriaAtelier || esHeroBlog}
                crecerLogo={isHome}
                textoOscuro={esPretAPorter}
              />
              <main>{children}</main>
              {/* AteliersCita encima de PedirCita: la banda de cita va siempre
                  justo antes del footer. */}
              {conAteliersCita && (
                <AteliersCita separado={rutaSinLocale === '/atelier'} />
              )}
              {conPedirCita && <PedirCita separado={rutaSinLocale.startsWith('/atelier-fiesta/')} />}
              <Footer />
              {isHome && <NewsletterModalGlobal />}
              <BotonWhatsapp />
              <CookieConsent />
            </MiCuentaProvider>
          </CarritoProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
