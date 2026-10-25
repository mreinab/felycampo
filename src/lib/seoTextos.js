// seoTextos.js
//
// <title>, meta description y (solo donde la página no tiene un título
// visible que haga de H1: home, Atelier, Vosotras, Prêt-à-porter,
// carrito, wishlist)
// "h1" — que se pinta con .sr-only, ver global.css — de cada página fija, por ruta (sin locale)
// e idioma — lo lee metadataPagina() en seo.js. Un único archivo para
// revisarlos todos de un vistazo y comprobar que no se repite ninguno.
//
// Criterio:
//   - title: ~50-60 caracteres, palabra clave primero y marca al final
//     ("… | Fely Campo"). Cada atelier lleva su ciudad.
//   - description: ~140-160 caracteres, qué hay en la página + llamada a
//     la acción. Ninguna se repite entre páginas.
// Las páginas dinámicas (fichas de producto, runways, entradas del blog,
// categorías de Atelier) generan los suyos a partir de sus propios datos
// — ver generateMetadata en cada page.js.

export const SEO_TEXTOS = {
  '/': {
    es: {
      title: 'Fely Campo | Moda de autor, novia y fiesta',
      h1: 'Fely Campo: moda de autor, vestidos de novia y fiesta en Salamanca, Madrid y Oviedo',
      description: 'Moda de autor hecha en España. Vestidos de novia y fiesta a medida en Salamanca, Madrid y Oviedo, y prêt-à-porter de Fely Campo. Descubre la firma.',
    },
    en: {
      title: 'Fely Campo | Made-to-measure bridal and eveningwear',
      h1: 'Fely Campo: made-to-measure bridal and evening gowns in Salamanca, Madrid and Oviedo',
      description: 'Spanish fashion house born in Salamanca: made-to-measure bridal and evening gowns at our ateliers in Salamanca, Madrid and Oviedo, plus ready-to-wear online.',
    },
  },

  // ---------- Atelier ----------
  '/atelier': {
    es: {
      title: 'Atelier de vestidos de novia y fiesta a medida | Fely Campo',
      h1: 'Atelier de vestidos de novia y fiesta a medida',
      description: 'Descubre los ateliers de Fely Campo para vestidos de novia y fiesta a medida. Asesoramiento personalizado y atención con cita previa en tres ciudades.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier | Fely Campo',
      h1: 'Made-to-measure bridal and evening atelier',
      description: 'Discover the Fely Campo atelier: bridal and evening gowns designed and made to measure, with one-to-one styling by appointment.',
    },
  },
  '/atelier/novias': {
    es: {
      title: 'Vestidos de novia a medida en atelier | Fely Campo',
      description: 'Descubre los vestidos de novia a medida de Fely Campo. Diseños cuidados, tejidos seleccionados y asesoramiento personal en el atelier. Pide tu cita.',
    },
    en: {
      title: 'Made-to-measure wedding dresses | Fely Campo Atelier',
      description: 'Wedding dresses designed and made to measure at the Fely Campo atelier. Explore our bridal collections and book your appointment.',
    },
  },
  '/atelier/fiesta': {
    es: {
      title: 'Vestidos de fiesta, madrina e invitada a medida | Fely Campo',
      description: 'Vestidos de fiesta a medida para madrinas e invitadas de boda. Descubre los diseños de Fely Campo y reserva una cita personalizada en el atelier.',
    },
    en: {
      title: 'Made-to-measure evening and guest dresses | Fely Campo',
      description: 'Evening, mother-of-the-bride and wedding guest dresses made to measure at the Fely Campo atelier. Explore the collections and book a visit.',
    },
  },
  '/atelier/vosotras': {
    es: {
      title: 'Novias e invitadas reales con vestidos Fely Campo',
      h1: 'Novias e invitadas reales con diseños Fely Campo',
      description: 'Descubre fotografías reales de novias e invitadas que eligieron Fely Campo para sus ocasiones especiales. Inspírate con sus vestidos y sus historias.',
    },
    en: {
      title: 'Fely Campo brides and guests | Our women',
      h1: 'Fely Campo brides and guests',
      description: 'Brides and guests who wore Fely Campo on their special day. Real photos of our clients in their made-to-measure dresses.',
    },
  },
  '/atelier-fiesta/salamanca': {
    es: {
      title: 'Atelier de novia y fiesta en Salamanca | Fely Campo',
      description: 'Visita el atelier de Fely Campo en Salamanca para descubrir vestidos de novia y fiesta, colecciones prêt-à-porter y asesoramiento personalizado. Pide cita.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier in Salamanca | Fely Campo',
      description: 'Fely Campo atelier and workshop in Salamanca: made-to-measure bridal and evening gowns, personal styling and showroom. Visit us by appointment.',
    },
  },
  '/atelier-fiesta/madrid': {
    es: {
      title: 'Atelier de novia y fiesta a medida en Madrid | Fely Campo',
      description: 'Descubre el atelier y showroom de Fely Campo en Madrid. Vestidos de novia y fiesta a medida, además de prêt-à-porter de lujo. Reserva tu cita.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier in Madrid | Fely Campo',
      description: 'Fely Campo atelier and showroom in Madrid, on Calle Jorge Juan: made-to-measure bridal and evening gowns. Book your appointment.',
    },
  },
  '/atelier-fiesta/oviedo': {
    es: {
      title: 'Atelier de novia y fiesta a medida en Oviedo | Fely Campo',
      description: 'Visita el atelier de Fely Campo en Oviedo para descubrir vestidos de fiesta, novia e invitada y recibir asesoramiento personalizado. Pide tu cita.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier in Oviedo | Fely Campo',
      description: 'Fely Campo atelier in central Oviedo: made-to-measure bridal, evening and guest dresses plus ready-to-wear. We see you by appointment.',
    },
  },

  // ---------- Prêt-à-porter ----------
  '/pret-a-porter': {
    es: {
      title: 'Prêt-à-porter de lujo para mujer | Fely Campo',
      h1: 'Prêt-à-porter de lujo para mujer de Fely Campo',
      description: 'Descubre el prêt-à-porter de lujo de Fely Campo: vestidos, faldas, pantalones, tops, chaquetas y abrigos de diseño de autor. Compra online.',
    },
    en: {
      title: "Women's ready-to-wear | Fely Campo online shop",
      h1: "Fely Campo women's ready-to-wear",
      description: 'Shop Fely Campo ready-to-wear online: dresses, skirts, trousers, tops and coats designed and made in Salamanca, Spain.',
    },
  },
  '/pret-a-porter/vestidos': {
    es: {
      title: 'Vestidos de mujer de diseño de autor | Fely Campo',
      description: 'Descubre vestidos de mujer de Fely Campo, con patronaje cuidado y tejidos seleccionados para el día a día y ocasiones especiales. Compra online.',
    },
    en: {
      title: "Women's dresses | Fely Campo ready-to-wear",
      description: 'Fely Campo ready-to-wear dresses for everyday and special occasions, made in Salamanca. Shop online.',
    },
  },
  '/pret-a-porter/faldas': {
    es: {
      title: 'Faldas de mujer de diseño de autor | Fely Campo',
      description: 'Explora las faldas de Fely Campo en tejidos seleccionados y siluetas cuidadas. Descubre la colección de prêt-à-porter y compra online.',
    },
    en: {
      title: "Women's skirts | Fely Campo ready-to-wear",
      description: 'Fely Campo skirts in carefully chosen fabrics, printed and plain, designed and made in Salamanca. Explore the collection online.',
    },
  },
  '/pret-a-porter/pantalones': {
    es: {
      title: 'Pantalones de mujer de diseño de autor | Fely Campo',
      description: 'Descubre pantalones de mujer de Fely Campo, con patronaje propio y acabados cuidados. Encuentra piezas para combinar y compra online.',
    },
    en: {
      title: "Women's trousers | Fely Campo ready-to-wear",
      description: "Fely Campo women's trousers with in-house pattern cutting and atelier finishes, made in Salamanca. Shop online.",
    },
  },
  '/pret-a-porter/tops-y-camisetas': {
    es: {
      title: 'Tops y camisetas de mujer | Prêt-à-porter Fely Campo',
      description: 'Descubre tops, blusas y camisetas de Fely Campo, diseñados para combinar con las prendas de la colección de prêt-à-porter. Compra online.',
    },
    en: {
      title: "Women's tops and T-shirts | Fely Campo",
      description: 'Fely Campo ready-to-wear tops, blouses and T-shirts, designed in Salamanca to pair with the rest of the collection. Shop online.',
    },
  },
  '/pret-a-porter/chaquetas-y-abrigos': {
    es: {
      title: 'Chaquetas y abrigos de mujer | Prêt-à-porter Fely Campo',
      description: 'Descubre chaquetas y abrigos de mujer de Fely Campo, con tejidos seleccionados, líneas cuidadas y patronaje de atelier. Compra online.',
    },
    en: {
      title: "Women's jackets and coats | Fely Campo",
      description: "Fely Campo women's jackets and coats in fine fabrics with atelier pattern cutting, made in Salamanca. Shop online.",
    },
  },

  // ---------- Marca ----------
  '/sobre-fely': {
    es: {
      title: 'Fely Campo: historia de una diseñadora de moda española',
      description: 'Descubre la trayectoria de Fely Campo, diseñadora de moda española: una historia nacida en Salamanca entre telas, oficio artesanal y más de cinco décadas de creación.',
    },
    en: {
      title: 'Fely Campo, the designer | Our story',
      description: 'The story of Fely Campo: from the girl with the needle in Salamanca to a bridal, evening and ready-to-wear label with ateliers in three cities.',
    },
  },
  '/colecciones-fely-campo': {
    es: {
      title: 'Colecciones de moda y desfiles de Fely Campo',
      description: 'Explora las colecciones de moda de autor de Fely Campo y sus desfiles de pasarela. Descubre los tejidos, siluetas, inspiración y vídeos de cada colección.',
    },
    en: {
      title: 'Runway collections and shows | Fely Campo',
      description: 'Every Fely Campo runway collection, from Diafonía to La Colección: looks, backstage and videos from each show.',
    },
  },
  '/talleres-fely-campo': {
    es: {
      title: 'Talleres de confección artesanal en Salamanca | Fely Campo',
      description: 'Conoce cómo se confeccionan las prendas de Fely Campo en Salamanca y en talleres de la sierra de Castilla y León, donde el oficio y las manos expertas dan forma a cada pieza.',
    },
    en: {
      title: 'Our workshops in Salamanca | Fely Campo',
      description: "Meet Fely Campo's workshops: the Salamanca atelier and two small workshops in the sierra where skilled hands make every piece.",
    },
  },
  '/responsabilidad': {
    es: {
      title: 'Moda responsable y confección en España | Fely Campo',
      description: 'Descubre el compromiso de Fely Campo con la confección en España, el oficio artesanal y la elección consciente de tejidos para crear prendas cuidadas y duraderas.',
    },
    en: {
      title: 'Responsible fashion and local production | Fely Campo',
      description: "Fely Campo's commitment to responsible fashion: local production in Salamanca, artisan craft, chosen fabrics and garments made to last.",
    },
  },
  '/podcast': {
    es: {
      title: 'Blog y podcast de moda: el universo Fely Campo',
      description: 'Lee artículos y escucha conversaciones sobre moda de autor, vestidos de novia y fiesta, prêt-à-porter y el oficio artesanal detrás de Fely Campo.',
    },
    en: {
      title: 'Fashion blog and podcast | Fely Campo',
      description: 'Articles and podcast episodes from Fely Campo about wedding, guest and mother-of-the-bride dresses and the craft of the atelier.',
    },
  },

  // ---------- Visítanos ----------
  '/visita-fely-campo': {
    es: {
      title: 'Ateliers de moda en Salamanca, Madrid y Oviedo | Fely Campo',
      description: 'Encuentra los ateliers y el showroom de Fely Campo en Salamanca, Madrid y Oviedo. Consulta las ubicaciones y solicita una cita para novia o fiesta.',
    },
    en: {
      title: 'Ateliers in Salamanca, Madrid and Oviedo | Fely Campo',
      description: 'Visit the Fely Campo ateliers and showroom in Salamanca, Madrid and Oviedo. Addresses, opening hours and appointments for brides and guests.',
    },
  },
  '/visita-fely-campo/cita': {
    es: {
      title: 'Pedir cita en el atelier de Fely Campo | Novia y fiesta',
      description: 'Solicita tu cita en Fely Campo para encontrar tu vestido de novia o de fiesta. Elige atelier y cuéntanos qué buscas; nuestro equipo contactará contigo.',
    },
    en: {
      title: 'Book an atelier appointment | Bride and guest | Fely Campo',
      description: 'Book your appointment at the Fely Campo atelier in Salamanca, Madrid or Oviedo for your wedding or guest dress. We confirm by email.',
    },
  },
  '/visita-fely-campo/cita/confirmacion': {
    es: { title: 'Cita solicitada | Fely Campo', description: 'Hemos recibido tu solicitud de cita en el atelier de Fely Campo.' },
    en: { title: 'Appointment requested | Fely Campo', description: 'We have received your appointment request at the Fely Campo atelier.' },
  },
  '/visita-fely-campo/cita/confirmacion-novia': {
    es: { title: 'Cita de novia solicitada | Fely Campo', description: 'Hemos recibido tu solicitud de cita de novia en el atelier de Fely Campo.' },
    en: { title: 'Bridal appointment requested | Fely Campo', description: 'We have received your bridal appointment request at the Fely Campo atelier.' },
  },
  '/visita-fely-campo/cita/confirmacion-invitada': {
    es: { title: 'Cita de invitada solicitada | Fely Campo', description: 'Hemos recibido tu solicitud de cita de invitada en el atelier de Fely Campo.' },
    en: { title: 'Guest appointment requested | Fely Campo', description: 'We have received your guest appointment request at the Fely Campo atelier.' },
  },
  '/puntos-de-venta-fely-campo': {
    es: {
      title: 'Dónde comprar Fely Campo | Boutiques y puntos de venta',
      description: 'Encuentra dónde comprar Fely Campo en boutiques seleccionadas. Consulta los puntos de venta disponibles y localiza el establecimiento más cercano.',
    },
    en: {
      title: 'Stockists and boutiques | Fely Campo',
      description: 'Find Fely Campo at selected boutiques in Spain, Europe and the United States. Stockist map and postcode search.',
    },
  },

  // ---------- Ayuda ----------
  '/ayuda/atencion-cliente': {
    es: {
      title: 'Atención al cliente de Fely Campo | Ayuda',
      description: 'Teléfono, email y horario de atención al cliente de Fely Campo, y recogida en tienda (Click & Collect) en Salamanca.',
    },
    en: {
      title: 'Customer service | Fely Campo',
      description: 'Fely Campo customer service phone, email and opening hours, plus Click & Collect at our Salamanca store.',
    },
  },
  '/ayuda/contacto': {
    es: {
      title: 'Contacto Fely Campo | Tienda online y ateliers',
      description: 'Contacta con Fely Campo para consultas sobre prêt-à-porter, pedidos, boutiques y ateliers. Encuentra las vías de atención y solicita información.',
    },
    en: {
      title: 'Contact | Fely Campo',
      description: 'Contact Fely Campo: ready-to-wear support, stockist enquiries, WhatsApp and online chat. Atelier at C/ Laguna Negra 17-19, Salamanca.',
    },
  },
  '/ayuda/envios': {
    es: {
      title: 'Envíos a España y la UE | Fely Campo',
      description: 'Plazos, zonas y seguimiento de los envíos de Fely Campo. Preparamos cada pedido a mano en Salamanca y enviamos a España y a la Unión Europea.',
    },
    en: {
      title: 'Shipping to Spain and the EU | Fely Campo',
      description: 'Fely Campo delivery times, shipping zones and tracking. Each order is hand-packed in Salamanca and shipped to Spain and the European Union.',
    },
  },
  '/ayuda/devoluciones': {
    es: {
      title: 'Devoluciones y cambios | Fely Campo',
      description: 'Cómo devolver o cambiar un pedido de Fely Campo: 14 días naturales desde la recepción, gastos de devolución y pasos a seguir.',
    },
    en: {
      title: 'Returns and exchanges | Fely Campo',
      description: 'How to return or exchange a Fely Campo order: 14 days from delivery, return costs and the steps to follow.',
    },
  },

  // ---------- Legal ----------
  '/legal/aviso-legal': {
    es: { title: 'Aviso legal | Fely Campo', description: 'Aviso legal de felycampo.com: titular del sitio web, datos de contacto y condiciones de uso.' },
    en: { title: 'Legal notice | Fely Campo', description: 'Legal notice for felycampo.com: website owner, contact details and terms of use.' },
  },
  '/legal/privacidad': {
    es: { title: 'Política de privacidad | Fely Campo', description: 'Cómo trata Fely Campo tus datos personales: finalidades, base legal, plazos de conservación y tus derechos.' },
    en: { title: 'Privacy policy | Fely Campo', description: 'How Fely Campo handles your personal data: purposes, legal basis, retention periods and your rights.' },
  },
  '/legal/cookies': {
    es: { title: 'Política de cookies | Fely Campo', description: 'Qué cookies usa felycampo.com, para qué sirven y cómo cambiar tus preferencias en cualquier momento.' },
    en: { title: 'Cookie policy | Fely Campo', description: 'Which cookies felycampo.com uses, what they are for and how to change your preferences at any time.' },
  },
  '/legal/terminos': {
    es: { title: 'Términos y condiciones de compra | Fely Campo', description: 'Condiciones generales de compra en la tienda online de Fely Campo: pedidos, pagos, envíos y devoluciones.' },
    en: { title: 'Terms and conditions of sale | Fely Campo', description: 'General terms of sale for the Fely Campo online shop: orders, payment, shipping and returns.' },
  },

  // ---------- Privadas (noindex) ----------
  '/carrito': {
    es: { h1: 'Tu carrito', title: 'Tu carrito | Fely Campo', description: 'Revisa los productos de tu carrito en la tienda online de Fely Campo.' },
    en: { h1: 'Your bag', title: 'Your bag | Fely Campo', description: 'Review the items in your Fely Campo shopping bag.' },
  },
  '/wishlist': {
    es: { h1: 'Tu wishlist', title: 'Tu wishlist | Fely Campo', description: 'Las prendas de Fely Campo que has guardado en tu lista de deseos.' },
    en: { h1: 'Your wishlist', title: 'Your wishlist | Fely Campo', description: 'The Fely Campo pieces you have saved to your wishlist.' },
  },
  '/mi-cuenta/panel': {
    es: { title: 'Mi cuenta | Fely Campo', description: 'Tus pedidos, reseñas y datos de cliente de Fely Campo.' },
    en: { title: 'My account | Fely Campo', description: 'Your Fely Campo orders, reviews and account details.' },
  },
};
