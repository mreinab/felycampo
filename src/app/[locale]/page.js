/* ============================================================
   HOME — de momento solo el HeroCarousel. Resto de secciones
   pendientes de diseño.
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { HeroCarousel, MediaBanner, SplitMedia, CuadriculaProductos, CuadriculaConTabs, BloqueSeccion, SectionClientsReview } from '@/components/layout';
import { CollectionTitle } from '@/components/ui';
import styles from './page.module.css';

const productosDestacados = [
  { imagen: '/img/ecommerce/27FW/FW27-Top-Look03.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look03.webp', nombre: 'Falda Vera', precio: '420 €', colores: [{ hex: '#EED3E8', nombre: 'Rosa suave' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/ecommerce/27FW/FW27-Dress-Look02.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look02.webp', nombre: 'Vestido Aurora', precio: '890 €', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#23324A', nombre: 'Azul marino' }] },
  { imagen: '/img/ecommerce/27FW/27fw-video.mp4', tipo: 'video', nombre: 'Vestido Sol', precio: '760 €', colores: [{ hex: '#6B705C', nombre: 'Verde oliva' }, { hex: '#C19A6B', nombre: 'Camel' }] },
  { imagen: '/img/ecommerce/27FW/FW27-Top-Look01.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look01.webp', nombre: 'Falda Mora', precio: '480 €', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
];

// Tabs de "Un look para cada ocasión": las 4 fotos de
// ecommerce/invitada, reordenadas por tab — de momento no hay
// catálogo real detrás de cada ocasión, solo el cambio de cuadrícula.
const productosInvitada = [
  { imagen: '/img/ecommerce/invitada/LOOK1_2-scaled.webp', nombre: 'Vestido Alba', precio: '620 €', colores: [{ hex: '#EFD9D0', nombre: 'Nude' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
  { imagen: '/img/ecommerce/invitada/LOOK9_1-scaled.webp', nombre: 'Vestido Iris', precio: '580 €', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#202020', nombre: 'Tinta' }] },
  { imagen: '/img/ecommerce/invitada/LOOK12_2-scaled.webp', nombre: 'Vestido Coral', precio: '650 €', colores: [{ hex: '#D96C5F', nombre: 'Coral' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/ecommerce/invitada/LOOK18_1-scaled.webp', nombre: 'Vestido Bruma', precio: '590 €', colores: [{ hex: '#B8C4C2', nombre: 'Gris verdoso' }, { hex: '#3A3A3A', nombre: 'Grafito' }] },
];

const productosPorOcasion = {
  diaBoda: [productosInvitada[0], productosInvitada[1], productosInvitada[2], productosInvitada[3]],
  nocheBoda: [productosInvitada[1], productosInvitada[2], productosInvitada[3], productosInvitada[0]],
  comunionesBautizo: [productosInvitada[2], productosInvitada[3], productosInvitada[0], productosInvitada[1]],
  bolsosFiesta: [productosInvitada[3], productosInvitada[0], productosInvitada[1], productosInvitada[2]],
};

const slidesHero = [
  {
    src: '/img/FW27-Hero3.mp4',
    tipo: 'video',
    titulo: 'Prêt-à-porter',
    ctaTexto: 'Explorar',
    ctaHref: '/pret-a-porter',
  },  
  {
    src: '/img/HERO-1.jpg',
    tipo: 'imagen',
    titulo: 'Prêt-à-porter',
    ctaTexto: 'Explorar',
    ctaHref: '/pret-a-porter',
  },
  {
    src: '/img/novias-sección-FelyCampo3.jpg',
    tipo: 'imagen',
    titulo: 'Bride 27',
    ctaTexto: 'Ver colección',
    ctaHref: '/atelier/novias',
  },
];

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations('visitaAtelier');

  // Igual que en el Navbar (ver withLocale en Navbar.jsx): los hrefs
  // internos llevan el locale por delante para no perder el idioma
  // elegido al navegar.
  const slidesConLocale = slidesHero.map((slide) => ({
    ...slide,
    ctaHref: `/${locale}${slide.ctaHref}`,
  }));

  return (
    <div className={styles.landing}>
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
      <CuadriculaProductos productos={productosDestacados} verMasHref={`/${locale}/archivo/colecciones`} />
      <SplitMedia
        variante="landing"
        items={[
          {
            src: '/img/novias-sección-FelyCampo2.jpg',
            tipo: 'imagen',
            tituloKey: 'splitMedia.item1.titulo',
            href: `/${locale}/atelier/novias`,
          },
          {
            src: '/img/invitadas-sección-FelyCampo.jpg',
            tipo: 'imagen',
            tituloKey: 'splitMedia.item2.titulo',
            href: `/${locale}/atelier/fiesta`,
          },
        ]}
      />
      <CuadriculaConTabs
        titleKey="cuadriculaTabs.titulo"
        tabs={[
          { key: 'diaBoda', labelKey: 'cuadriculaTabs.tabs.diaBoda', productos: productosPorOcasion.diaBoda, verMasHref: `/${locale}/archivo/colecciones` },
          { key: 'nocheBoda', labelKey: 'cuadriculaTabs.tabs.nocheBoda', productos: productosPorOcasion.nocheBoda, verMasHref: `/${locale}/archivo/colecciones` },
          { key: 'comunionesBautizo', labelKey: 'cuadriculaTabs.tabs.comunionesBautizo', productos: productosPorOcasion.comunionesBautizo, verMasHref: `/${locale}/archivo/colecciones` },
          { key: 'bolsosFiesta', labelKey: 'cuadriculaTabs.tabs.bolsosFiesta', productos: productosPorOcasion.bolsosFiesta, verMasHref: `/${locale}/archivo/colecciones` },
        ]}
      />
      <BloqueSeccion
        imagen="/img/artesany.jpg"
        tipo="imagen"
        titulo={t('titulo')}
        texto={t('texto')}
        enlace={t('enlace')}
        href={`/${locale}/visitenos/cita`}
      />
      <SectionClientsReview />
    </div>
  );
}
