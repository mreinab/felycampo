/* ============================================================
   HOME — de momento solo el HeroCarousel. Resto de secciones
   pendientes de diseño.
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { HeroCarousel, SplitMedia, CuadriculaProductos, CuadriculaConTabs, SectionClientsReview, SectionCompromiso } from '@/components/layout';
import styles from './page.module.css';

// 12 productos: suficientes para que la banda desborde el viewport en
// cualquier ancho de pantalla y se vea el scroll + la barra de
// progreso (con menos de eso, en desktop ancho las tarjetas caben
// enteras y no hay nada que arrastrar). Como no hay catálogo real
// detrás todavía (mismo caso que productosInvitada/productosPorOcasion
// más abajo), las últimas 4 repiten foto de las 8 de arriba bajo un
// nombre distinto — a sustituir en cuanto haya 12 fotos reales.
const productosDestacados = [
  { imagen: '/img/ecommerce/27FW/FW27-Top-Look03.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look03.webp', nombre: 'Falda Vera', precio: '420 €', colores: [{ hex: '#EED3E8', nombre: 'Rosa suave' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/ecommerce/27FW/FW27-Dress-Look02.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look02.webp', nombre: 'Vestido Aurora', precio: '890 €', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#23324A', nombre: 'Azul marino' }] },
  { imagen: '/img/ecommerce/27FW/27fw-video.mp4', tipo: 'video', nombre: 'Vestido Sol', precio: '760 €', colores: [{ hex: '#6B705C', nombre: 'Verde oliva' }, { hex: '#C19A6B', nombre: 'Camel' }] },
  { imagen: '/img/ecommerce/27FW/FW27-Top-Look01.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look01.webp', nombre: 'Falda Mora', precio: '480 €', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
  { imagen: '/img/ecommerce/Invitada/LOOK1_2-scaled.webp', nombre: 'Vestido Alba', precio: '620 €', colores: [{ hex: '#EFD9D0', nombre: 'Nude' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
  { imagen: '/img/ecommerce/Invitada/LOOK9_1-scaled.webp', nombre: 'Vestido Iris', precio: '580 €', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#202020', nombre: 'Tinta' }] },
  { imagen: '/img/ecommerce/Invitada/LOOK12_2-scaled.webp', nombre: 'Vestido Coral', precio: '650 €', colores: [{ hex: '#D96C5F', nombre: 'Coral' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/ecommerce/Invitada/LOOK18_1-scaled.webp', nombre: 'Vestido Bruma', precio: '590 €', colores: [{ hex: '#B8C4C2', nombre: 'Gris verdoso' }, { hex: '#3A3A3A', nombre: 'Grafito' }] },
  { imagen: '/img/ecommerce/FC-0.webp', nombre: 'Falda Estrella', precio: '440 €', colores: [{ hex: '#C19A6B', nombre: 'Camel' }, { hex: '#202020', nombre: 'Tinta' }] },
  { imagen: '/img/ecommerce/27FW/FW27-Dress-Look02.jpg', imagenHover: '/img/ecommerce/27FW/FW27-Look02.webp', nombre: 'Vestido Nube', precio: '910 €', colores: [{ hex: '#F7F7F7', nombre: 'Blanco' }, { hex: '#EED3E8', nombre: 'Rosa suave' }] },
  { imagen: '/img/ecommerce/Invitada/LOOK1_2-scaled.webp', nombre: 'Vestido Eco', precio: '630 €', colores: [{ hex: '#F5F1EE', nombre: 'Crema' }, { hex: '#EFD9D0', nombre: 'Nude' }] },
  { imagen: '/img/ecommerce/FC-1.webp', nombre: 'Falda Lumen', precio: '500 €', colores: [{ hex: '#F5F1EE', nombre: 'Crema' }, { hex: '#202020', nombre: 'Tinta' }] },
];

// Tabs de "Un look para cada ocasión": las 4 fotos de
// ecommerce/invitada, reordenadas por tab — de momento no hay
// catálogo real detrás de cada ocasión, solo el cambio de cuadrícula.
const productosInvitada = [
  { imagen: '/img/ecommerce/FC-2.webp', nombre: 'Vestido Alba', precio: '620 €', colores: [{ hex: '#EFD9D0', nombre: 'Nude' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
  { imagen: '/img/ecommerce/invitada/LOOK9_1-scaled.webp', nombre: 'Vestido Iris', precio: '580 €', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#202020', nombre: 'Tinta' }] },
  { imagen: '/img/ecommerce/invitada/LOOK12_2-scaled.webp', nombre: 'Vestido Coral', precio: '650 €', colores: [{ hex: '#D96C5F', nombre: 'Coral' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
  { imagen: '/img/ecommerce/invitada/LOOK18_1-scaled.webp', nombre: 'Vestido Bruma', precio: '590 €', colores: [{ hex: '#B8C4C2', nombre: 'Gris verdoso' }, { hex: '#3A3A3A', nombre: 'Grafito' }] },
];

const productosPorOcasion = {
  diaBoda: [productosInvitada[0], productosInvitada[1], productosInvitada[2], productosInvitada[3]],
  nocheBoda: [productosInvitada[1], productosInvitada[2], productosInvitada[3], productosInvitada[0]],
  comunionesBautizo: [productosInvitada[2], productosInvitada[3], productosInvitada[0], productosInvitada[1]],
};

const slidesHero = [
  {
    // Temporal: sustituye el vídeo mientras dura la campaña de abrigos.
    src: '/img/FW27-Hero3.mp4',
    tipo: 'video',
    titulo: 'Prêt-à-porter',
    ctaHref: '/tienda',
  },
  {
    src: '/img/HERO-2.jpg',
    tipo: 'imagen',
    titulo: 'Prêt-à-porter',
    ctaHref: '/tienda',
  },
  {
    src: '/img/novias-sección-FelyCampo3.jpg',
    tipo: 'imagen',
    titulo: 'Collection Bride 27',
    ctaHref: '/atelier/novias',
  },
];

export default async function Home({ params }) {
  const { locale } = await params;
  const tHero = await getTranslations('heroCarousel');
  const tCompromiso = await getTranslations('compromiso');

  // Igual que en el Navbar (ver withLocale en Navbar.jsx): los hrefs
  // internos llevan el locale por delante para no perder el idioma
  // elegido al navegar. Mismo CTA ("Ver más"/"Discover more") en los
  // tres slides — no cada uno con su propio texto.
  const slidesConLocale = slidesHero.map((slide) => ({
    ...slide,
    ctaTexto: tHero('cta'),
    ctaHref: `/${locale}${slide.ctaHref}`,
  }));

  return (
    <div className={styles.landing}>
      <HeroCarousel slides={slidesConLocale} />
      <CuadriculaProductos
        productos={productosDestacados}
        coleccionKey="cuadriculaProductos.coleccion"
        tituloKey="cuadriculaProductos.novedades"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        verMasHref={`/${locale}/archivo/colecciones`}
      />
      <SplitMedia
        variante="landing"
        items={[
          {
            src: '/img/novias-sección-FelyCampo2.jpg',
            tipo: 'imagen',
            tituloKey: 'splitMedia.item1.titulo',
            ctaKey: 'splitMedia.item1.cta',
            href: `/${locale}/atelier/novias`,
          },
          {
            src: '/img/invitadas-sección-FelyCampo.jpg',
            tipo: 'imagen',
            tituloKey: 'splitMedia.item2.titulo',
            ctaKey: 'splitMedia.item2.cta',
            href: `/${locale}/atelier/fiesta`,
          },
        ]}
      />
      <CuadriculaConTabs
        titleKey="cuadriculaTabs.titulo"
        subtitleKey="cuadriculaTabs.subtitulo"
        descriptionKey="cuadriculaTabs.descripcion"
        tabs={[
          { key: 'diaBoda', labelKey: 'cuadriculaTabs.tabs.diaBoda', productos: productosPorOcasion.diaBoda, verMasHref: `/${locale}/archivo/colecciones` },
          { key: 'nocheBoda', labelKey: 'cuadriculaTabs.tabs.nocheBoda', productos: productosPorOcasion.nocheBoda, verMasHref: `/${locale}/archivo/colecciones` },
          { key: 'comunionesBautizo', labelKey: 'cuadriculaTabs.tabs.comunionesBautizo', productos: productosPorOcasion.comunionesBautizo, verMasHref: `/${locale}/archivo/colecciones` },
        ]}
      />
      <SectionClientsReview />
      <SectionCompromiso
        imagen="/img/atelier/ateliernovia-lamedida-felycampo-2.mp4"
        tipo="video"
        texto={tCompromiso('texto')}
        subtitulo={tCompromiso('subtitulo')}
      />
    </div>
  );
}
