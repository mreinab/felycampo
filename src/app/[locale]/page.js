/* ============================================================
   HOME — de momento solo el HeroCarousel. Resto de secciones
   pendientes de diseño.
   ============================================================ */

import { HeroCarousel, CuadriculaProductos } from '@/components/layout';

const productosDestacados = [
  { imagen: '/img/styleguide/prod-tarjeta.webp', imagenHover: '/img/styleguide/prod-tarjeta-hover.webp', nombre: 'Falda Vera', precio: '420 €', colores: [{ hex: '#EED3E8', nombre: 'Rosa suave' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/styleguide/prod-tarjeta.webp', imagenHover: '/img/styleguide/prod-tarjeta-hover.webp', nombre: 'Vestido Aurora', precio: '890 €', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#23324A', nombre: 'Azul marino' }] },
  { imagen: '/img/styleguide/prod-tarjeta.webp', imagenHover: '/img/styleguide/prod-tarjeta-hover.webp', nombre: 'Vestido Sol', precio: '760 €', colores: [{ hex: '#6B705C', nombre: 'Verde oliva' }, { hex: '#C19A6B', nombre: 'Camel' }] },
  { imagen: '/img/styleguide/prod-tarjeta.webp', imagenHover: '/img/styleguide/prod-tarjeta-hover.webp', nombre: 'Falda Mora', precio: '480 €', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
];

const slidesHero = [
  {
    src: '/img/FW27-Hero3.mp4',
    tipo: 'video',
    titulo: 'Prêt-à-porter',
    ctaTexto: 'Explorar',
    ctaHref: '/pret-a-porter',
  },
  {
    src: '/img/FW27-Hero3.mp4',
    tipo: 'video',
    titulo: 'Atelier Novias',
    ctaTexto: 'Ver colección',
    ctaHref: '/atelier/novias',
  },
  {
    src: '/img/FW27-Hero3.mp4',
    tipo: 'video',
    titulo: 'FW27 New Arrivals',
    ctaTexto: 'Descubrir la colección',
    ctaHref: '/archivo/colecciones',
  },
];

export default async function Home({ params }) {
  const { locale } = await params;

  // Igual que en el Navbar (ver withLocale en Navbar.jsx): los hrefs
  // internos llevan el locale por delante para no perder el idioma
  // elegido al navegar.
  const slidesConLocale = slidesHero.map((slide) => ({
    ...slide,
    ctaHref: `/${locale}${slide.ctaHref}`,
  }));

  return (
    <>
      <HeroCarousel slides={slidesConLocale} />
      <CuadriculaProductos productos={productosDestacados} />
    </>
  );
}
