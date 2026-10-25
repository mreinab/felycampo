/* ============================================================
   HOME — rediseño en curso. De momento solo el HeroCarousel y una
   sección (misma .seccion de CuadriculaProductos, reutilizada aquí
   directamente) con el SplitMedia de Atelier (Novia | Fiesta), sin
   cabecera. El resto de la landing anterior queda comentado más
   abajo, no borrado — a la espera de nuevo diseño.
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { HeroCarousel, SplitMedia /* , CuadriculaProductos, CarruselClientas, BloqueSeccion */ } from '@/components/layout';
// import { CabeceraSeccion } from '@/components/ui'; // sin cabecera por ahora, ver comentario más abajo
import { Boton, EnVista } from '@/components/ui';
import cuadriculaStyles from '@/components/layout/CuadriculaProductos.module.css';
import styles from './page.module.css';
import { metadataPagina, textosSeo } from '@/lib/seo';

// ---- Datos de las secciones comentadas más abajo — se quedan aquí
// tal cual por si se reactivan (ver bloque comentado en el return). ----
// 12 productos: suficientes para que la banda desborde el viewport en
// cualquier ancho de pantalla y se vea el scroll + la barra de
// progreso (con menos de eso, en desktop ancho las tarjetas caben
// enteras y no hay nada que arrastrar). Los 4 primeros SÍ son
// catálogo real (mismo nombre/precio/color que sus gemelos en
// tiendaProductos.js, para que TarjetaProducto enlace de verdad a su
// ficha vía slugify — Falda Sucre reutiliza directamente el producto
// ya existente, no uno nuevo). El resto sigue siendo placeholder sin
// catálogo real detrás (las últimas 4 repiten foto de las de arriba
// bajo un nombre distinto) — a sustituir en cuanto haya fotos reales.
// const productosDestacados = [
//   { imagen: '/img/ecommerce/vestido-producto-portada-felycampo.jpg', imagenHover: '/img/ecommerce/fely-campo-pret-a-porter-fw27-look-02.webp', nombre: 'Vestido Ciruela', precio: '700 €', colores: [{ hex: '#5A2A4A', nombre: 'Ciruela' }] },
//   { imagen: '/img/ecommerce/top-encaje-producto-portada-felycampo.jpg', imagenHover: '/img/ecommerce/fely-campo-pret-a-porter-fw27-look-01.webp', nombre: 'Top lencero', precio: '350 €', colores: [{ hex: '#111111', nombre: 'Negro' }] },
//   { imagen: '/img/ecommerce/falda-lana-producto-portada-felycampo.jpg', imagenHover: '/img/ecommerce/falda-lana-producto-portada-felycampo-video.mp4', tipoHover: 'video', nombre: 'Falda Sucre', precio: '450 €', colores: [{ hex: '#8C6A3F', nombre: 'Bronce' }] },
//   { imagen: '/img/ecommerce/chaqueta-producto-portada-felycampo.jpg', imagenHover: '/img/ecommerce/fely-campo-pret-a-porter-fw27-look-03.webp', nombre: 'Chaqueta', precio: '400 €', colores: [{ hex: '#4A4A48', nombre: 'Antracita' }] },
//   { imagen: '/img/ecommerce/LOOK1_2-scaled.webp', nombre: 'Vestido Alba', precio: '620 €', colores: [{ hex: '#EFD9D0', nombre: 'Nude' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
//   { imagen: '/img/ecommerce/LOOK9_1-scaled.webp', nombre: 'Vestido Iris', precio: '580 €', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#202020', nombre: 'Tinta' }] },
//   { imagen: '/img/ecommerce/LOOK12_2-scaled.webp', nombre: 'Vestido Coral', precio: '650 €', colores: [{ hex: '#D96C5F', nombre: 'Coral' }, { hex: '#F7F7F7', nombre: 'Blanco' }] },
//   { imagen: '/img/ecommerce/LOOK18_1-scaled.webp', nombre: 'Vestido Bruma', precio: '590 €', colores: [{ hex: '#B8C4C2', nombre: 'Gris verdoso' }, { hex: '#3A3A3A', nombre: 'Grafito' }] },
//   { imagen: '/img/ecommerce/FC-0_NEW.webp', nombre: 'Falda Estrella', precio: '440 €', colores: [{ hex: '#C19A6B', nombre: 'Camel' }, { hex: '#202020', nombre: 'Tinta' }] },
//   { imagen: '/img/ecommerce/FW27-Dress-Look02.jpg', imagenHover: '/img/ecommerce/fely-campo-pret-a-porter-fw27-look-02.webp', nombre: 'Vestido Nube', precio: '910 €', colores: [{ hex: '#F7F7F7', nombre: 'Blanco' }, { hex: '#EED3E8', nombre: 'Rosa suave' }] },
//   { imagen: '/img/ecommerce/LOOK1_2-scaled.webp', nombre: 'Vestido Eco', precio: '630 €', colores: [{ hex: '#F5F1EE', nombre: 'Crema' }, { hex: '#EFD9D0', nombre: 'Nude' }] },
//   { imagen: '/img/ecommerce/FC-1_NEW.webp', nombre: 'Falda Lumen', precio: '500 €', colores: [{ hex: '#F5F1EE', nombre: 'Crema' }, { hex: '#202020', nombre: 'Tinta' }] },
//   // FC-0..FC-3 (sin _NEW): añadidas como placeholder extra, sin
//   // sustituir a sus versiones _NEW de arriba.
//   { imagen: '/img/ecommerce/FC-0.webp', nombre: 'Falda Nova', precio: '440 €', colores: [{ hex: '#C19A6B', nombre: 'Camel' }, { hex: '#202020', nombre: 'Tinta' }] },
//   { imagen: '/img/ecommerce/FC-1.webp', nombre: 'Falda Cinta', precio: '500 €', colores: [{ hex: '#F5F1EE', nombre: 'Crema' }, { hex: '#202020', nombre: 'Tinta' }] },
//   { imagen: '/img/ecommerce/FC-2.webp', nombre: 'Vestido Alma', precio: '620 €', colores: [{ hex: '#EFD9D0', nombre: 'Nude' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
//   { imagen: '/img/ecommerce/FC-3.webp', nombre: 'Vestido Lino', precio: '590 €', colores: [{ hex: '#202020', nombre: 'Tinta' }, { hex: '#EED3E8', nombre: 'Rosa suave' }] },
//   // FC-4..FC-7: mismo criterio que FC-0..FC-3, placeholder extra.
//   { imagen: '/img/ecommerce/FC-4.webp', nombre: 'Falda Rocío', precio: '480 €', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
//   { imagen: '/img/ecommerce/FC-5.webp', nombre: 'Vestido Marea', precio: '640 €', colores: [{ hex: '#6E2635', nombre: 'Burdeos' }, { hex: '#F5F1EE', nombre: 'Crema' }] },
//   { imagen: '/img/ecommerce/FC-6.webp', nombre: 'Vestido Arena', precio: '600 €', colores: [{ hex: '#EFD9D0', nombre: 'Nude' }, { hex: '#202020', nombre: 'Tinta' }] },
//   { imagen: '/img/ecommerce/FC-7.webp', nombre: 'Falda Bruna', precio: '460 €', colores: [{ hex: '#6B7A8F', nombre: 'Azul piedra' }, { hex: '#C19A6B', nombre: 'Camel' }] },
// ];

// "Un look para cada ocasión": las 4 fotos de ecommerce/invitada — de
// momento no hay catálogo real detrás de la ocasión, solo esta fila
// fija (antes tenía tabs para rotar entre ocasiones, quitados por no
// ser necesarios).
// const productosOcasion = [
//   { imagen: '/img/collections/novia/bride-27/fely-campo-coleccion-novia-bride-27-look-2.webp', nombre: 'Look 2 - Bride 27' },
//   { imagen: '/img/collections/novia/bride-27/fely-campo-coleccion-novia-bride-27-look-8.webp', nombre: 'Look 8 - Bride 27' },
//   { imagen: '/img/collections/fiesta/ss27-coleccion/27052-461_02.jpg', nombre: 'Look 23 SS27' },
//   { imagen: '/img/collections/fiesta/ss27-coleccion/27069_01.jpg', nombre: 'Look 30 SS27' },
// ];

const slidesHero = [
  {
    src: '/img/landing/fely-campo-portada-hero-landing.webp',
    srcMobile: '/img/landing/fely-campo-portada-hero-landing-mobile.webp',
    tipo: 'imagen',
    ctaHref: '/sobre-fely',
  },
  {
    // Mismo vídeo en mobile y escritorio — sin recorte propio. Antes
    // FW27-Hero3.mp4 (que sigue en Runway/colecciones), cambiado a
    // petición.
    src: '/img/hero-main-felycampo.mp4',
    tipo: 'video',
    ctaHref: '/sobre-fely',
  },
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/' });
}

export default async function Home({ params }) {
  const { locale } = await params;
  const tHero = await getTranslations('heroCarousel');
  const tCitaFely = await getTranslations('citaFelyLanding');
  const tDescubreFely = await getTranslations('descubreFely');
  // const tVisitaAtelier = await getTranslations('visitaAtelier'); // BloqueSeccion comentado más abajo

  // Igual que en el Navbar (ver withLocale en Navbar.jsx): los hrefs
  // internos llevan el locale por delante para no perder el idioma
  // elegido al navegar. Misma descripción y CTA en los dos slides — no cada
  // uno con su propio texto.
  const slidesConLocale = slidesHero.map((slide) => ({
    ...slide,
    entradilla: tHero('entradilla'),
    descripcion: tHero('descripcion'),
    ctaTexto: tHero('cta'),
    ctaHref: `/${locale}${slide.ctaHref}`,
  }));

  return (
    <div className={styles.landing}>
      <h1 className="sr-only">{textosSeo('/', locale).h1}</h1>
      <HeroCarousel slides={slidesConLocale} />

      {/* Misma .seccion que usaba CuadriculaProductos (reutilizada tal
          cual, ver CuadriculaProductos.module.css) — aquí solo con el
          SplitMedia de Atelier (Novia | Fiesta), sin cabecera ni
          cuadrícula de productos. */}
      <section className={cuadriculaStyles.seccion}>
        {/* Comentada a petición — no hace falta la cabecera aquí.
        <CabeceraSeccion
          subtitleKey="cuadriculaProductos.coleccion"
          titleKey="cuadriculaProductos.novedades"
          descriptionKey="cuadriculaProductos.novedadesDescripcion"
        />
        */}
        <SplitMedia
          variante="landing"
          items={[
            {
              src: '/img/fely-campo-web-splitimage-novias.webp',
              tipo: 'imagen',
              tituloKey: 'splitMedia.item1.titulo',
              ctaKey: 'splitMedia.item1.cta',
              href: `/${locale}/atelier/novias`,
            },
            {
              src: '/img/landing/fely-campo-portada-hero-landing-3-mobile-atelier-3.webp',
              tipo: 'imagen',
              tituloKey: 'splitMedia.item2.titulo',
              ctaKey: 'splitMedia.item2.cta',
              href: `/${locale}/atelier/fiesta`,
            },
          ]}
        />
      </section>

      {/* "Descubre a Fely" — misma estructura y estilos que las
          tarjetas de /visita-fely-campo (.tarjeta/.fila/.info/.acciones
          de su page.module.css, ver ListadoUbicaciones.jsx): a la
          izquierda el título y debajo la cita de Fely, con el botón a
          /sobre-fely como último elemento; a la derecha la foto de Fely
          (fely-campo-sobre-fely-campo-elegir-27.webp). Aparece con scroll (<EnVista>). */}
      <section className={styles.descubreFely}>
        <EnVista as="article" className={styles.descubreFelyTarjeta}>
          <div className={styles.descubreFelyGaleria}>
            <img src="/img/about-felycampo/fely-campo-sobre-fely-campo-elegir-27.webp" alt="Fely Campo" className={styles.descubreFelyImagen} />
          </div>

          <div className={styles.descubreFelyFila}>
            {/* Texto y botón juntos en un mismo bloque, centrado en vertical
                en la columna (ver .descubreFelyBloque). */}
            <div className={styles.descubreFelyBloque}>
              <div className={styles.descubreFelyInfo}>
                <p className={styles.descubreFelyTitulo}>{tDescubreFely('titulo')}</p>
                <blockquote className={styles.descubreFelyCita}>
                  <p>{tCitaFely.rich('texto', { em: (chunks) => <em>{chunks}</em> })}</p>
                </blockquote>
              </div>

              <div className={styles.descubreFelyAcciones}>
                {/* Enlace subrayado (Boton "texto"), no el botón con borde
                    de visita-fely-campo — a petición. */}
                <Boton variante="texto" href={`/${locale}/sobre-fely`}>{tDescubreFely('cta')}</Boton>
              </div>
            </div>
          </div>
        </EnVista>
      </section>

      {/* ---- Comentado a petición (rediseño de landing en curso) ----
      <CuadriculaProductos
        productos={productosDestacados}
        coleccionKey="cuadriculaProductos.coleccion"
        tituloKey="cuadriculaProductos.novedades"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
      />
      <SplitMedia
        variante="landing"
        items={[
          {
            src: '/img/landing/vestidos-felycampo-landing.jpg',
            tipo: 'imagen',
            tituloKey: 'splitMediaCategorias.item1.titulo',
            ctaKey: 'splitMediaCategorias.item1.cta',
            href: `/${locale}/pret-a-porter/vestidos`,
          },
          {
            src: '/img/landing/chaquetas-felycampo-landing.jpg',
            tipo: 'imagen',
            tituloKey: 'splitMediaCategorias.item2.titulo',
            ctaKey: 'splitMediaCategorias.item2.cta',
            href: `/${locale}/pret-a-porter/chaquetas-y-abrigos`,
          },
        ]}
      />
      <CuadriculaProductos
        productos={productosOcasion}
        tituloKey="cuadriculaTabs.subtitulo"
        coleccionKey="cuadriculaTabs.titulo"
        descriptionKey="cuadriculaTabs.descripcion"
        botonTextKey="cuadriculaTabs.reservarCita"
        verMasHref={`/${locale}/visita-fely-campo/cita`}
        ocultarPrecio
      />
      <BloqueSeccion
        imagen="/img/landing/landing-section-about-fely.jpg"
        titulo={tVisitaAtelier('titulo')}
        texto={tVisitaAtelier('texto')}
        enlace={tVisitaAtelier('enlace')}
        href={`/${locale}/atelier-fiesta/${id}`}
      />
      <CarruselClientas />
      ---- fin comentado ---- */}
    </div>
  );
}
