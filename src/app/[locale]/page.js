/* ============================================================
   HOME — de momento solo el HeroCarousel. Resto de secciones
   pendientes de diseño.
   ============================================================ */

import { HeroCarousel, MediaBanner, SplitMedia, CuadriculaProductos, BloqueSeccion } from '@/components/layout';
import { CollectionTitle } from '@/components/ui';

const productosDestacados = [
  { imagen: '/img/ecommerce/27FW/FW27-Top-Look03.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look03.webp', nombre: 'Falda Vera', precio: '420 €', colores: [{ hex: '#EED3E8', nombre: 'Rosa suave' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/ecommerce/27FW/FW27-Dress-Look02.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look02.webp', nombre: 'Vestido Aurora', precio: '890 €', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#23324A', nombre: 'Azul marino' }] },
  { imagen: '/img/ecommerce/27FW/27fw-video.mp4', tipo: 'video', nombre: 'Vestido Sol', precio: '760 €', colores: [{ hex: '#6B705C', nombre: 'Verde oliva' }, { hex: '#C19A6B', nombre: 'Camel' }] },
  { imagen: '/img/ecommerce/27FW/FW27-Top-Look01.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look01.webp', nombre: 'Falda Mora', precio: '480 €', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
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
    src: '/img/27fw-banner.jpg',
    tipo: 'imagen',
    titulo: 'FW27 New Arrivals',
    ctaTexto: 'Ver colección',
    ctaHref: '/atelier/novias',
  },
  {
    src: '/img/FW27-Hero3.mp4',
    tipo: 'video',
    titulo: 'FW27 New Arrivals',
    ctaTexto: 'Descubre la colección',
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
      <CollectionTitle
        labelKey="collectionTitle.edicionMujer.label"
        titleKey="collectionTitle.edicionMujer.title"
        descriptionKey="collectionTitle.edicionMujer.description"
      />
      <MediaBanner
        src="/img/FW27-Hero.jpg"
        tipo="imagen"
        tituloKey="mediaBanner.titulo"
        ctaKey="mediaBanner.cta"
        href={`/${locale}/archivo/colecciones`}
        variante="imageTitle"
      />
      <CuadriculaProductos productos={productosDestacados} />
      <BloqueSeccion
        imagen="/img/novias-sección-FelyCampo.jpg"
        titulo="Atelier Novia"
        texto="Reserva tu cita y vive un día único en el Atelier Novia Fely Campo en Salamanca o en Madrid. Disfruta del asesoramiento personalizado de nuestra diseñadora"
        enlace="Reserva tu cita"
      />
      {/* <SplitMedia
        items={[
          {
            src: '/img/novias-sección-FelyCampo.jpg',
            tipo: 'imagen',
            labelKey: 'splitMedia.item1.label',
            ctaKey: 'splitMedia.item1.cta',
            href: `/${locale}/atelier/novias`,
          },
          {
            src: '/img/invitadas-sección-FelyCampo.jpg',
            tipo: 'imagen',
            labelKey: 'splitMedia.item2.label',
            ctaKey: 'splitMedia.item2.cta',
            href: `/${locale}/atelier/fiesta`,
          },
        ]}
      /> */}
    </>
  );
}
