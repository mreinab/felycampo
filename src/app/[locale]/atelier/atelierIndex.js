/* Contenido de /atelier (índice: Novias + Fiesta) — ver page.js.
   Bilingüe por campo ({es, en}), mismo criterio que "descripcion" en
   visita-fely-campo/ubicaciones.js y "secciones" en
   atelier-fiesta/atelieres.js: texto largo y propio de esta página, no
   encaja en el formato de clave corta de messages/{locale}.json.

   "descripcion": texto de RunwayDescripcion (párrafo justificado, con
   saltos de párrafo reales vía "\n\n" — ver white-space:pre-line en
   RunwayDescripcion.module.css). Son los dos primeros párrafos de
   "fiesta.texto" (mismo copy, reutilizado a propósito).

   "novias.texto": RESUMEN del texto original del encargo (bastante más
   largo, ver historial de conversación) — se pidió explícitamente
   resumir sin perder la esencia (complicidad novia/diseñadora desde la
   primera cita, el "toile" como boceto real del vestido en Salamanca/
   Madrid, el equipo Fely Campo en Oviedo, y la colección de temporada
   disponible también en el Atelier Fiesta Oviedo y en punto de venta
   multimarca) para que quepa en un BloqueSeccion (mismo formato/
   longitud que "fiesta.texto" y que visitaAtelier.texto en la home).

   "fiesta.texto": texto íntegro del encargo (sin resumir, a diferencia
   de "novias"), solo se retira el título repetido ("XPERIENCIA ATELIER
   FIESTA...", ya es "fiesta.titulo") y la línea final en mayúsculas
   ("DESCUBRE EN PROFUNDIDAD CADA UNO DE ELLOS", ya cubierta por el CTA
   "Pide cita" del propio BloqueSeccion).

   "ateliers": mismas 3 fotos por sede que IMAGEN_POR_UBICACION en
   visita-fely-campo/cita/page.js — cada una enlaza a su ficha real
   (/atelier-fiesta/[sede], ver AtelierDetalle.jsx). "ciudad" es en
   realidad el nombre completo de la sede ("Atelier Salamanca", no solo
   "Salamanca" — Madrid es showroom además de atelier, de ahí "Atelier
   & Showroom Madrid"), sin traducir (UBICACIONES en ubicaciones.js
   tampoco traduce sus nombres). */

export const ATELIER_INDEX = {
  descripcion: {
    es: 'La mujer es el centro de todas nuestras creaciones y en los Ateliers de Fiesta Fely Campo de Madrid, Salamanca y de Oviedo, vivirás una experiencia única y personalizada, en la que nuestro equipo te hará descubrir el vestido con el que sentirte segura y especial.\n\nEspacios exclusivos con un ambiente diseñado para ti, donde vivirás la magia de la experiencia Fely Campo.',
    en: 'Women are at the heart of everything we create, and at the Fely Campo Fiesta Ateliers in Madrid, Salamanca and Oviedo you\'ll live a unique, personalised experience, guided by our team to discover the dress that makes you feel confident and special.\n\nExclusive spaces with an atmosphere designed just for you, where you\'ll experience the magic of Fely Campo.',
  },

  novias: {
    imagen: '/img/atelier/ateliernovia-lamedida-felycampo-3.webp',
    titulo: {
      es: 'Atelier Novias',
      en: 'Bridal Atelier',
    },
    texto: {
      es: 'En los Ateliers de Novia Fely Campo, cada vestido nace de una complicidad única entre la novia y la diseñadora: en la primera cita compartís ideas, tejidos y siluetas, y el diseño se moldea contigo, no solo para ti. En Salamanca y Madrid, la creación pasa por el vestido único hecho a medida y por el imprescindible "toile", el primer boceto real de tu vestido; en Oviedo es el equipo Fely Campo quien te acompaña en ese mismo proceso. Cada temporada, la firma presenta además una colección de novia atemporal y artesanal, disponible también en el Atelier Fiesta de Oviedo y en la red de puntos de venta Fely Campo.',
      en: 'At the Fely Campo Bridal Ateliers, every dress is born from a unique complicity between the bride and the designer: in the first appointment you share ideas, fabrics and silhouettes, and the design is shaped with you, not just for you. In Salamanca and Madrid, the process runs through a fully made-to-measure gown and the essential "toile", the first real sketch of your dress; in Oviedo, it\'s the Fely Campo team who guides you through that same journey. Each season the house also presents a timeless, handcrafted bridal collection, also available at the Oviedo Atelier Fiesta and through the Fely Campo stockist network.',
    },
  },

  fiesta: {
    imagen: '/img/invitadas-sección-FelyCampo.jpg',
    titulo: {
      es: 'Atelier Fiesta',
      en: 'Fiesta Atelier',
    },
    texto: {
      es: 'La mujer es el centro de todas nuestras creaciones y en los Ateliers de Fiesta Fely Campo de Madrid, Salamanca y de Oviedo, vivirás una experiencia única y personalizada, en la que nuestro equipo te hará descubrir el vestido con el que sentirte segura y especial.\n\nEspacios exclusivos con un ambiente diseñado para ti, donde vivirás la magia de la experiencia Fely Campo.\n\nEn ellos, contarás con la complicidad de nuestros estilistas personales, te escucharán y te guiarán en la búsqueda de ese vestido. En la primera cita descubrirás nuestras colecciones, te las probarás, elegirás tu modelo, lo reformularéis y reconstruiréis a tu gusto, elegiréis los tejidos, los detalles… En las siguientes citas terminaremos de adaptar el vestido a tu cuerpo, y te asesoraremos para completar tu estilismo, creando el look perfecto para tu evento.',
      en: 'Women are at the heart of everything we create, and at the Fely Campo Fiesta Ateliers in Madrid, Salamanca and Oviedo you\'ll live a unique, personalised experience, guided by our team to discover the dress that makes you feel confident and special.\n\nExclusive spaces with an atmosphere designed just for you, where you\'ll experience the magic of Fely Campo.\n\nOur personal stylists will listen to you and guide your search: in the first appointment you\'ll discover our collections, try them on, choose your style, rework and rebuild it to your taste, and pick your fabrics and details. In the following appointments we\'ll finish fitting the dress to your body and help you complete your look for your event.',
    },
  },

  ateliers: [
    { id: 'salamanca', ciudad: 'Atelier Salamanca', imagen: '/img/talleres/salamanca-ateliernovia-ateliernoviasalamanca-ubicacion-felycampo.webp' },
    { id: 'madrid', ciudad: 'Atelier & Showroom Madrid', imagen: '/img/talleres/madrid-atelier_madrid_fiesta_novia_medida.webp' },
    { id: 'oviedo', ciudad: 'Atelier Oviedo', imagen: '/img/talleres/oviedo-atelier_fiesta_oviedo_felycampo_espacio_9-2048x1365.webp' },
  ],
};
