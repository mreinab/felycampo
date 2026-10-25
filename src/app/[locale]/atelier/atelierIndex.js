/* Contenido de /atelier (índice: Novias + Fiesta) — ver page.js.
   Bilingüe por campo ({es, en}), mismo criterio que "descripcion" en
   visita-fely-campo/ubicaciones.js y "secciones" en
   atelier-fiesta/atelieres.js: texto largo y propio de esta página, no
   encaja en el formato de clave corta de messages/{locale}.json.

   "descripcion": texto de RunwayDescripcion, frase corta a propósito
   (antes reutilizaba los dos primeros párrafos de "fiesta.texto", ya
   no — encargo explícito de acortar los tres textos de esta página).

   "novias.texto"/"fiesta.texto": una sola frase editorial cada uno
   (antes párrafos largos con el detalle del proceso en cada sede) —
   mismo encargo de arriba, el detalle real vive en las páginas propias
   de Novias/Fiesta (/atelier/novias, /atelier/fiesta), este bloque es
   solo la puerta de entrada.

   "ateliers": mismas 3 fotos por sede que IMAGEN_POR_UBICACION en
   visita-fely-campo/cita/page.js — cada una enlaza a su ficha real
   (/atelier-fiesta/[sede], ver AtelierDetalle.jsx). "ciudad" es en
   realidad el nombre completo de la sede ("Atelier Salamanca", no solo
   "Salamanca" — Madrid es showroom además de atelier, de ahí "Atelier
   & Showroom Madrid"), sin traducir (UBICACIONES en ubicaciones.js
   tampoco traduce sus nombres). */

export const ATELIER_INDEX = {
  // Array (no un único string): cada frase entra por separado, una
  // detrás de otra — ver el soporte de "texto" como array en
  // RunwayDescripcion.jsx, pensado a propósito para este caso.
  descripcion: {
    es: ['Donde todo empieza.', 'Donde nada termina.', 'Donde tú pones nuestro punto final.'],
    en: ['Where it all begins.', 'Where nothing ends.', 'Where you have the final word.'],
  },

  novias: {
    imagen: '/img/landing/atelier-novia-info-felycampo.jpg',
    titulo: {
      es: 'Atelier Novias',
      en: 'Bridal Atelier',
    },
    texto: {
      es: 'Diseñamos vestidos de novia a medida desde la escucha, la complicidad y el cuidado de cada detalle. El vestido toma forma contigo, a partir de tu historia y de cómo deseas sentirte.',
      en: 'Complicity as our goal, desire as our mould, precision as our consequence.',
    },
  },

  fiesta: {
    imagen: '/img/landing/atelier-fiesta-info-felycampo.jpg',
    titulo: {
      es: 'Atelier Fiesta',
      en: 'Fiesta Atelier',
    },
    texto: {
      es: 'Creamos vestidos de fiesta a medida a partir de tus ideas, la ocasión y la forma en que quieres sentirte. Un proceso compartido para cuidar cada detalle.',
      en: 'We listen to you: our process becomes yours, a shared journey to create that dress, that image, down to the last detail of your ideas.',
    },
  },

  ateliers: [
    // Misma foto que el heroMedio (o su poster, si es vídeo) de la ficha
    // real de cada sede en atelier-fiesta/atelieres.js — reciclada aquí
    // a propósito para que la tarjeta anticipe la misma imagen de
    // cabecera que verá la visitante al entrar. Sustituyen a las de
    // /img/talleres/, que ya no existen en el repo.
    { id: 'salamanca', ciudad: 'Atelier Salamanca', imagen: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-taller-confeccion.webp' },
    { id: 'madrid', ciudad: 'Atelier & Showroom Madrid', imagen: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-vestidos-fiesta.webp' },
    { id: 'oviedo', ciudad: 'Atelier Oviedo', imagen: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-fiesta-espacio-1.webp' },
  ],
};
