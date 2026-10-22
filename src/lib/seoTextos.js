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
      title: 'Fely Campo | Vestidos de novia y fiesta a medida',
      h1: 'Fely Campo: vestidos de novia y fiesta a medida en Salamanca, Madrid y Oviedo',
      description: 'Firma de moda nacida en Salamanca: vestidos de novia y de fiesta a medida en nuestros ateliers de Salamanca, Madrid y Oviedo, y prêt-à-porter online.',
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
      title: 'Atelier de novia y fiesta a medida | Fely Campo',
      h1: 'Atelier de novia y fiesta a medida',
      description: 'Descubre el atelier de Fely Campo: vestidos de novia y de fiesta diseñados y confeccionados a medida, con asesoramiento personal y cita previa.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier | Fely Campo',
      h1: 'Made-to-measure bridal and evening atelier',
      description: 'Discover the Fely Campo atelier: bridal and evening gowns designed and made to measure, with one-to-one styling by appointment.',
    },
  },
  '/atelier/novias': {
    es: {
      title: 'Vestidos de novia a medida | Atelier Fely Campo',
      description: 'Vestidos de novia diseñados y confeccionados a medida en el atelier de Fely Campo. Conoce nuestras colecciones de novia y pide tu cita.',
    },
    en: {
      title: 'Made-to-measure wedding dresses | Fely Campo Atelier',
      description: 'Wedding dresses designed and made to measure at the Fely Campo atelier. Explore our bridal collections and book your appointment.',
    },
  },
  '/atelier/fiesta': {
    es: {
      title: 'Vestidos de fiesta e invitada a medida | Fely Campo',
      description: 'Vestidos de fiesta, madrina e invitada de boda hechos a medida en el atelier de Fely Campo. Descubre las colecciones y reserva tu cita.',
    },
    en: {
      title: 'Made-to-measure evening and guest dresses | Fely Campo',
      description: 'Evening, mother-of-the-bride and wedding guest dresses made to measure at the Fely Campo atelier. Explore the collections and book a visit.',
    },
  },
  '/atelier/vosotras': {
    es: {
      title: 'Novias e invitadas Fely Campo | Vosotras',
      h1: 'Novias e invitadas Fely Campo',
      description: 'Novias e invitadas que han llevado Fely Campo en el día más especial. Fotos reales de nuestras clientas y sus vestidos hechos a medida.',
    },
    en: {
      title: 'Fely Campo brides and guests | Our women',
      h1: 'Fely Campo brides and guests',
      description: 'Brides and guests who wore Fely Campo on their special day. Real photos of our clients in their made-to-measure dresses.',
    },
  },
  '/atelier-fiesta/salamanca': {
    es: {
      title: 'Atelier de novia y fiesta a medida en Salamanca | Fely Campo',
      description: 'Atelier y taller de Fely Campo en Salamanca: vestidos de novia y de fiesta a medida, asesoramiento personal y showroom. Visítanos con cita previa.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier in Salamanca | Fely Campo',
      description: 'Fely Campo atelier and workshop in Salamanca: made-to-measure bridal and evening gowns, personal styling and showroom. Visit us by appointment.',
    },
  },
  '/atelier-fiesta/madrid': {
    es: {
      title: 'Atelier de novia y fiesta a medida en Madrid | Fely Campo',
      description: 'Atelier y showroom de Fely Campo en Madrid, en la calle Jorge Juan: vestidos de novia y de fiesta a medida. Pide tu cita previa.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier in Madrid | Fely Campo',
      description: 'Fely Campo atelier and showroom in Madrid, on Calle Jorge Juan: made-to-measure bridal and evening gowns. Book your appointment.',
    },
  },
  '/atelier-fiesta/oviedo': {
    es: {
      title: 'Atelier de novia y fiesta a medida en Oviedo | Fely Campo',
      description: 'Atelier de Fely Campo en el centro de Oviedo: vestidos de novia, fiesta e invitada a medida y prêt-à-porter. Te atendemos con cita previa.',
    },
    en: {
      title: 'Made-to-measure bridal and evening atelier in Oviedo | Fely Campo',
      description: 'Fely Campo atelier in central Oviedo: made-to-measure bridal, evening and guest dresses plus ready-to-wear. We see you by appointment.',
    },
  },

  // ---------- Prêt-à-porter ----------
  '/pret-a-porter': {
    es: {
      title: 'Prêt-à-porter de mujer | Tienda online Fely Campo',
      h1: 'Prêt-à-porter de mujer Fely Campo',
      description: 'Compra online el prêt-à-porter de Fely Campo: vestidos, faldas, pantalones, tops y abrigos diseñados y confeccionados en Salamanca.',
    },
    en: {
      title: "Women's ready-to-wear | Fely Campo online shop",
      h1: "Fely Campo women's ready-to-wear",
      description: 'Shop Fely Campo ready-to-wear online: dresses, skirts, trousers, tops and coats designed and made in Salamanca, Spain.',
    },
  },
  '/pret-a-porter/vestidos': {
    es: {
      title: 'Vestidos de mujer | Prêt-à-porter Fely Campo',
      description: 'Vestidos de prêt-à-porter de Fely Campo para el día a día y para ocasiones especiales, confeccionados en Salamanca. Compra online.',
    },
    en: {
      title: "Women's dresses | Fely Campo ready-to-wear",
      description: 'Fely Campo ready-to-wear dresses for everyday and special occasions, made in Salamanca. Shop online.',
    },
  },
  '/pret-a-porter/faldas': {
    es: {
      title: 'Faldas de mujer | Prêt-à-porter Fely Campo',
      description: 'Faldas de Fely Campo en tejidos seleccionados, estampadas y lisas, diseñadas y confeccionadas en Salamanca. Descubre la colección online.',
    },
    en: {
      title: "Women's skirts | Fely Campo ready-to-wear",
      description: 'Fely Campo skirts in carefully chosen fabrics, printed and plain, designed and made in Salamanca. Explore the collection online.',
    },
  },
  '/pret-a-porter/pantalones': {
    es: {
      title: 'Pantalones de mujer | Prêt-à-porter Fely Campo',
      description: 'Pantalones de mujer de Fely Campo con patronaje propio y acabados de atelier, confeccionados en Salamanca. Compra online.',
    },
    en: {
      title: "Women's trousers | Fely Campo ready-to-wear",
      description: "Fely Campo women's trousers with in-house pattern cutting and atelier finishes, made in Salamanca. Shop online.",
    },
  },
  '/pret-a-porter/tops-y-camisetas': {
    es: {
      title: 'Tops y camisetas de mujer | Fely Campo',
      description: 'Tops, blusas y camisetas de prêt-à-porter de Fely Campo, diseñados en Salamanca para combinar con el resto de la colección. Compra online.',
    },
    en: {
      title: "Women's tops and T-shirts | Fely Campo",
      description: 'Fely Campo ready-to-wear tops, blouses and T-shirts, designed in Salamanca to pair with the rest of the collection. Shop online.',
    },
  },
  '/pret-a-porter/chaquetas-y-abrigos': {
    es: {
      title: 'Chaquetas y abrigos de mujer | Fely Campo',
      description: 'Chaquetas y abrigos de mujer de Fely Campo, con tejidos nobles y patronaje de atelier, confeccionados en Salamanca. Compra online.',
    },
    en: {
      title: "Women's jackets and coats | Fely Campo",
      description: "Fely Campo women's jackets and coats in fine fabrics with atelier pattern cutting, made in Salamanca. Shop online.",
    },
  },

  // ---------- Marca ----------
  '/sobre-fely': {
    es: {
      title: 'Fely Campo, la diseñadora | Historia de la firma',
      description: 'La historia de Fely Campo: de la niña de la aguja en Salamanca a una firma de novia, fiesta y prêt-à-porter con ateliers en tres ciudades.',
    },
    en: {
      title: 'Fely Campo, the designer | Our story',
      description: 'The story of Fely Campo: from the girl with the needle in Salamanca to a bridal, evening and ready-to-wear label with ateliers in three cities.',
    },
  },
  '/colecciones-fely-campo': {
    es: {
      title: 'Colecciones y desfiles de pasarela | Fely Campo',
      description: 'Todas las colecciones de pasarela de Fely Campo, de Diafonía a La Colección: looks, backstage y vídeos de cada desfile.',
    },
    en: {
      title: 'Runway collections and shows | Fely Campo',
      description: 'Every Fely Campo runway collection, from Diafonía to La Colección: looks, backstage and videos from each show.',
    },
  },
  '/talleres-fely-campo': {
    es: {
      title: 'Nuestros talleres en Salamanca | Fely Campo',
      description: 'Conoce los talleres de Fely Campo: el atelier de Salamanca y dos pequeños talleres de la sierra donde manos expertas confeccionan cada pieza.',
    },
    en: {
      title: 'Our workshops in Salamanca | Fely Campo',
      description: "Meet Fely Campo's workshops: the Salamanca atelier and two small workshops in the sierra where skilled hands make every piece.",
    },
  },
  '/responsabilidad': {
    es: {
      title: 'Moda responsable y producción local | Fely Campo',
      description: 'El compromiso de Fely Campo con una moda responsable: producción local en Salamanca, oficio artesano, tejidos seleccionados y prendas para durar.',
    },
    en: {
      title: 'Responsible fashion and local production | Fely Campo',
      description: "Fely Campo's commitment to responsible fashion: local production in Salamanca, artisan craft, chosen fabrics and garments made to last.",
    },
  },
  '/podcast': {
    es: {
      title: 'Blog y podcast de moda | Fely Campo',
      description: 'Artículos y episodios del podcast de Fely Campo sobre vestidos de novia, invitada, madrina y el oficio del atelier.',
    },
    en: {
      title: 'Fashion blog and podcast | Fely Campo',
      description: 'Articles and podcast episodes from Fely Campo about wedding, guest and mother-of-the-bride dresses and the craft of the atelier.',
    },
  },

  // ---------- Visítanos ----------
  '/visita-fely-campo': {
    es: {
      title: 'Ateliers en Salamanca, Madrid y Oviedo | Fely Campo',
      description: 'Visita los ateliers y el showroom de Fely Campo en Salamanca, Madrid y Oviedo. Direcciones, horarios y cita previa para novia e invitada.',
    },
    en: {
      title: 'Ateliers in Salamanca, Madrid and Oviedo | Fely Campo',
      description: 'Visit the Fely Campo ateliers and showroom in Salamanca, Madrid and Oviedo. Addresses, opening hours and appointments for brides and guests.',
    },
  },
  '/visita-fely-campo/cita': {
    es: {
      title: 'Pide cita en el atelier | Novia e invitada | Fely Campo',
      description: 'Reserva tu cita en el atelier de Fely Campo en Salamanca, Madrid u Oviedo para tu vestido de novia o de invitada. Te confirmamos por email.',
    },
    en: {
      title: 'Book an atelier appointment | Bride and guest | Fely Campo',
      description: 'Book your appointment at the Fely Campo atelier in Salamanca, Madrid or Oviedo for your wedding or guest dress. We confirm by email.',
    },
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
      title: 'Puntos de venta y boutiques | Fely Campo',
      description: 'Encuentra Fely Campo en boutiques seleccionadas de España, Europa y Estados Unidos. Mapa de puntos de venta y búsqueda por código postal.',
    },
    en: {
      title: 'Stockists and boutiques | Fely Campo',
      description: 'Find Fely Campo at selected boutiques in Spain, Europe and the United States. Stockist map and postcode search.',
    },
  },

  // ---------- Ayuda ----------
  '/ayuda/atencion-cliente': {
    es: {
      title: 'Atención al cliente | Fely Campo',
      description: 'Teléfono, email y horario de atención al cliente de Fely Campo, y recogida en tienda (Click & Collect) en Salamanca.',
    },
    en: {
      title: 'Customer service | Fely Campo',
      description: 'Fely Campo customer service phone, email and opening hours, plus Click & Collect at our Salamanca store.',
    },
  },
  '/ayuda/contacto': {
    es: {
      title: 'Contacto | Fely Campo',
      description: 'Contacta con Fely Campo: atención prêt-à-porter, atención a tiendas, WhatsApp y chat online. Atelier en C/ Laguna Negra 17-19, Salamanca.',
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
