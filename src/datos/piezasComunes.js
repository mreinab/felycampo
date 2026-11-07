// piezasComunes.js
//
// Lo que sale en muchas páginas a la vez: las fotos del menú de la web, la
// banda «Pedir cita» (antes del pie), las tarjetas «Atelier … & Showroom»
// (encima de esa banda, en algunas páginas) y la ventana de la newsletter.
// Lo edita «Menú, Pedir cita y newsletter» en el admin. Lectura y reglas:
// src/lib/piezasComunes.js. Ver docs/admin-piezas-comunes.md.
// Migrado tal cual de Navbar.jsx (SUBMENU_STRUCTURE), PedirCita.module.css,
// AteliersCita.jsx, NewsletterModal.jsx y messages/*.json
// (pedirCitaLanding, newsletterPopup.titulo / subtitulo).
//
//   menu.<desplegable>.portada  la foto grande que se ve al abrir el
//                               desplegable (y en el menú del móvil)
//   menu.<desplegable>.<enlace> la que se ve al pasar el ratón por ese enlace
//   menu.movil                  la portada del menú del móvil, antes de
//                               abrir ningún desplegable
//   ateliersCita.<sede>         '' = la foto de portada de ese atelier

export const PIEZAS_COMUNES = {
  menu: {
    atelier: {
      portada: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-sala-pruebas.webp',
      salamanca: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-foto-4.webp',
      madrid: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-showroom.webp',
      oviedo: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-tienda-4-1.webp',
      vosotras: '/img/Clientes/CLIENTAS/finales/fely-campo-novias-reales-10.webp',
    },
    colecciones: {
      portada: '/img/landing/fely-campo-portada-hero-atelier-novia.webp',
      fiesta: '/img/landing/fely-campo-portada-hero-landing-3-mobile-atelier-3.webp',
      novias: '/img/landing/fely-campo-portada-hero-atelier-novia.webp',
      pretaporter: '/img/fely-campo-menu-pret-a-porter.webp',
      runway: '/img/hero-pages/submenu/fely-campo-menu-pasarela.webp',
    },
    elMundoDeFely: {
      portada: '/img/about-felycampo/fely-campo-sobre-fely-campo-madrid-moda-capital-podcast.webp',
      historia: '/img/about-felycampo/fely-campo-sobre-fely-campo-conoce-a-disenadora.jpg',
      podcast: '/img/about-felycampo/fely-campo-sobre-fely-campo-madrid-moda-capital-podcast.webp',
      talleres: '/img/talleres/inhouse/ateliernovia-lamedida-felycampo-2.webp',
    },
    puntosDeVenta: {
      portada: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-fiesta-3.webp',
      propios: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-fiesta-3.webp',
      externos: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-foto-4.webp',
    },
    movil: '/img/hero-pages/fely-campo-menu-pret-a-porter-portada.webp',
  },
  pedirCita: {
    imagen: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-sala-pruebas.webp',
    titulo: { es: 'Te esperamos en nuestros ateliers', en: 'See you at our ateliers' },
    boton: { es: 'Pide tu cita', en: 'Book your appointment' },
  },
  ateliersCita: {
    salamanca: '',
    madrid: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-foto-2.webp',
    oviedo: '',
    boton: { es: 'Conoce más', en: 'Discover more' },
  },
  newsletter: {
    imagen: '/img/fely-campo-newsletter-coleccion-fw27.webp',
    titulo: { es: 'Únete a Fely Campo', en: 'Join Fely Campo' },
    subtitulo: {
      es: 'Suscríbete a nuestra newsletter para tener acceso anticipado a ofertas especiales, novedades y estar conectada con nuestra comunidad.',
      en: 'Sign up to our newsletter for first access to special offers, limited collections, new arrivals and to stay connected with our community.',
    },
  },
};
