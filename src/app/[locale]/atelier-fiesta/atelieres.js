/* Datos de las 3 fichas de atelier — ver AtelierDetalle.jsx (plantilla
   compartida por salamanca/page.js, madrid/page.js y oviedo/page.js).
   Bilingüe por campo ({es, en}), mismo criterio que "descripcion" en
   visita-fely-campo/ubicaciones.js y "parrafos" en
   talleres-fely-campo/talleres.js — texto largo y propio de cada ficha,
   no encaja en el formato de clave corta de messages/{locale}.json
   (reservado para microcopy reutilizable, ver "atelierFiesta.eyebrow"
   en AtelierDetalle.jsx para lo poco que sí vive ahí).

   "descripcion": el texto completo de la ficha (todo lo dado por
   encargo, un único bloque) — va en RunwayDescripcion, mismo criterio
   de párrafo justificado único que usan las fichas de colección de
   Runway (ver LOREM_IPSUM en ../colecciones-fely-campo/colecciones.js:
   tampoco lleva saltos de párrafo internos).

   "secciones": bloques imagen + texto en zigzag (ver .seccion en
   page.module.css — .seccionInvertida en índices impares invierte el
   lado, ver AtelierDetalle.jsx), cada uno con su propio título y uno o
   más párrafos ("texto" es un array, no un string — un párrafo por
   <p>, mismo criterio que "descripcion" de arriba pero repetido tantas
   veces como haga falta). Único contenido "de cuerpo" de la ficha
   aparte de la descripción de cabecera — ya no hay un bloque aparte a
   dos columnas (se quitó: quedaba desequilibrado frente al resto,
   siempre en el mismo lado, sin el zigzag de estos). Textos largos
   (Salamanca "Asesoramiento personalizado", Madrid "Novias") vienen
   resumidos del encargo original — ver comentario en cada uno.

   "heroMedio"/"medioSuperior": el hero (ver .hero en AtelierDetalle.jsx)
   y el elemento a sangre parcial justo debajo de RunwayDescripcion
   (ver .video en page.module.css — el nombre de la clase se queda,
   pero ya admite imagen O vídeo) son cada uno un {tipo, src}, igual
   forma que "medio" en RunwayMediaLateral.jsx — así cualquiera de los
   dos puede ser imagen o vídeo según lo que tenga cada atelier, sin
   dos campos separados por tipo. Si tipo es 'video', admite además un
   "poster" opcional (frame de reserva mientras carga o si no llega a
   reproducirse — ver RunwayMediaLateral.jsx; Madrid es el único con
   vídeo en el hero, así que el único que lo usa por ahora). Salamanca:
   imagen en ambos (hero y elemento inferior), todo de su propio
   reportaje. Oviedo: imagen en el hero, vídeo debajo — igual que
   Salamanca, todo de su propio reportaje (ver
   public/img/atelier/atelier-oviedo/). Madrid: al revés — vídeo en el
   hero, imagen (horizontal) debajo, ver su
   reportaje propio en public/img/atelier/showroom-madrid/.

   "imagenesTira": array de {tipo, src} (mismo shape que
   "heroMedio"/"medioSuperior" de arriba, no un array de src sueltos)
   para poder mezclar imagen y vídeo — ver el bucle en
   AtelierDetalle.jsx, que renderiza <video autoPlay muted loop> o
   <img> según el tipo de cada uno. Las 3 fichas ya tienen reportaje
   propio (ver public/img/atelier/atelier-salamanca/, showroom-madrid/
   y atelier-oviedo/) — Oviedo es la única que alterna imagen/vídeo por
   ahora (sus vídeos vienen comprimidos, ver los -original.mp4 al lado
   de cada uno con el archivo tal cual llegó).

   Ubicación + "Pedir cita" (ver AtelierDetalle.jsx, cierre de la
   página antes de .imagenes): no vive aquí — se resuelve ahí mismo
   buscando "datos.id" en visita-fely-campo/ubicaciones.js (UBICACIONES),
   fuente única de la dirección real de cada sede, ya usada también por
   ListadoUbicaciones.jsx — así no se duplica la dirección en dos sitios
   que podrían desincronizarse. */

export const ATELIERES = {
  salamanca: {
    id: 'salamanca',
    // Reportaje propio (ver public/img/atelier/atelier-salamanca/) —
    // igual que Madrid con showroom-madrid/, ya no hace falta reciclar
    // el fondo de taller-1/ para esta ficha (ver comentario de cabecera).
    heroMedio: { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/felycampo-salamnca-atelier.webp' },
    medioSuperior: { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/rbksom_blobid1671730782555.jpg' },
    imagenesTira: [
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/buscador_tiendas.webp' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/WhatsApp Image 2026-08-25 at 14.05.40.jpeg' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/WhatsApp Image 2026-08-25 at 14.06.29.jpeg' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/WhatsApp Image 2026-08-25 at 14.06.07.jpeg' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/WhatsApp Image 2026-08-25 at 14.06.12.jpeg' },
    ],
    descripcion: {
      es: 'En Salamanca, el atelier convive con el corazón creativo de la firma. El proceso, el oficio y la precisión que existen detrás de cada pieza se plasman en un lugar donde paisaje y creación conviven, y donde la esencia de Castilla entra directamente en el universo de Fely Campo.',
      en: 'In Salamanca, the atelier lives alongside the creative heart of the label. The process, the craft and the precision behind every piece take shape in a place where landscape and creation coexist, and where the essence of Castile enters directly into the world of Fely Campo.',
    },
    // "Nuestro equipo" (bloque intermedio) quitado a petición — quedan
    // solo estas dos, alternando de lado automáticamente por índice
    // (ver "indice % 2" en AtelierDetalle.jsx): sin el bloque de en
    // medio, "Asesoramiento personalizado" pasa de índice 2 a 1 y por
    // tanto al lado opuesto de "Experiencia única", sin tocar el
    // componente.
    secciones: [
      {
        titulo: { es: 'Experiencia única', en: 'A Unique Experience' },
        imagen: '/img/atelier/atelier-salamanca/fely-campo-salamanca.jpg',
        texto: {
          es: [
            'En nuestro Atelier Fiesta en Salamanca podrás vivir la magia de Fely Campo. Un lugar donde disfrutar del universo de la firma, en el que cada rincón y cada detalle está diseñado para que vivas una experiencia única. Hay un carácter atemporal en nuestros diseños, por lo que también podrás probarte los icónicos modelos de colecciones previas que siguen enamorando.',
          ],
          en: [
            "At our Atelier Fiesta in Salamanca you can experience the magic of Fely Campo. A place to enjoy the world of the label, where every corner and every detail is designed for you to live a unique experience. There's a timeless character to our designs, so you can also try on the iconic pieces from previous collections that continue to captivate.",
          ],
        },
      },
      {
        titulo: { es: 'Asesoramiento personalizado', en: 'Personalised styling' },
        // Foto del ajuste en directo (antes en "Nuestro equipo", libre
        // tras quitar esa sección) — momento de asesoramiento real, más
        // fiel al título que la foto de percha suelta que llevaba antes.
        imagen: "/img/atelier/atelier-salamanca/atelier-fiesta-salamanca-felycampo (3).jpg",
        texto: {
          es: [
            'De la mano de nuestro equipo tendrás un asesoramiento personalizado desde la primera cita, te escucharán y buscarán junto a ti ese diseño de nuestras colecciones con el que te sientas identificada y segura, recomendándote los cortes, colores y tejidos que más favorezcan a tu silueta y te asesorarán sobre las modificaciones posibles dentro del diseño elegido.',
          ],
          en: [
            "With the help of our team you'll receive personalised guidance from the very first appointment: they'll listen and search together with you for the design from our collections that makes you feel like yourself and confident, recommending the cuts, colours and fabrics that best flatter your silhouette, and advising you on the possible modifications within the chosen design.",
          ],
        },
      },
    ],
  },
  madrid: {
    id: 'madrid',
    heroMedio: {
      tipo: 'video',
      src: '/img/atelier/showroom-madrid/fely_campo_atelier_madrid.mp4',
      poster: '/img/atelier/showroom-madrid/FelyCampo_ATELIER_KristenWicce-3.jpg',
    },
    // pretaporter-3-1024x683: la única de las 6 explícitamente
    // horizontal (1024x683 en el propio nombre de archivo) — encaja
    // mejor que las demás (de retrato) en la caja apaisada de .video.
    medioSuperior: { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_pretaporter-3-1024x683.jpg' },
    // "unnamed (1).webp" quitada a petición (borrada de la carpeta) — el
    // resto de fotos de showroom-madrid/ ya está en uso en otro punto de
    // esta misma ficha (hero/medioSuperior/secciones), así que se queda
    // en 4 en vez de repetir alguna solo para completar 5.
    imagenesTira: [
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_medida-2.jpg' },
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/FelyCampo_ATELIER_KristenWicce-3.jpg' },
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/atelier_medida_madrid_fiesta_novia_felycampo.webp' },
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/felycampo-atelier-madrid.jpg' },
    ],
    descripcion: {
      es: 'Nuestro atelier de Madrid ocupa un emplazamiento muy especial en la calle Jorge Juan. Un espacio íntimo, pensado para descubrir la firma de una forma cercana y personal. Allí, podrás encontrarte con la diseñadora y definir cada detalle, cada proporción y cada tejido para comenzar a dar forma a una pieza única: un espacio donde el tiempo se detiene para vestir a cada mujer desde su propia esencia.',
      en: 'Our Madrid atelier occupies a very special spot on Calle Jorge Juan. An intimate space, designed to discover the label in a close, personal way. There, you can meet the designer and define every detail, every proportion and every fabric to begin shaping a one-of-a-kind piece: a space where time stands still to dress each woman from her own essence.',
    },
    secciones: [
      {
        // Antes vivía aparte como bloque a dos columnas (ver comentario
        // de cabecera) — ahora es una sección más, misma imagen de la
        // sala de pruebas/diseño a medida que ya tenía.
        titulo: { es: 'A medida', en: 'Made-to-measure' },
        imagen: '/img/atelier/showroom-madrid/felycampo-atelier-madrid.webp',
        texto: {
          es: [
            'Con la complicidad como objetivo, la diseñadora realiza el diseño a medida de piezas únicas e irrepetibles pensadas especialmente para cada mujer.',
          ],
          en: [
            'With complicity as her goal, the designer creates made-to-measure, one-of-a-kind pieces designed especially for each woman.',
          ],
        },
      },
      {
        titulo: { es: 'Showroom', en: 'Showroom' },
        imagen: '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_showroom-3.jpg',
        texto: {
          es: ['El Showroom es el lugar dentro de su Atelier en Madrid donde la diseñadora expone muchas de las prendas más icónicas de la firma. Te sumergirás en un universo de piezas que reflejan el alma y la esencia de su creadora durante sus más de 50 años de trayectoria en el mundo de la moda.'],
          en: ["The Showroom is the space within her Madrid Atelier where the designer displays many of the label's most iconic pieces. You'll immerse yourself in a universe of garments that reflect the soul and essence of their creator across her more than 50-year career in the world of fashion."],
        },
      },
      {
        titulo: { es: 'Novias', en: 'Bridal' },
        imagen: '/img/novias-sección-FelyCampo4.jpg',
        texto: {
          es: [
            'En su Atelier de Madrid, la diseñadora ofrece un espacio de encuentro donde cada novia puede imaginar, construir y dar forma a su vestido soñado, hecho a medida y pensado exclusivamente para ella. Su personalidad, su forma de vivir la belleza, sus sensaciones y los tejidos que la emocionan marcan el punto de partida de cada diseño.',
          ],
          en: [
            'At her Madrid Atelier, the designer offers a space to meet where every bride can imagine, build and shape her dream dress, made to measure and designed exclusively for her. Her personality, her sense of beauty, her feelings and the fabrics that move her set the starting point for every design.',
          ],
        },
      },
      {
        titulo: { es: 'Prêt-à-porter', en: 'Prêt-à-porter' },
        imagen: '/img/atelier/showroom-madrid/atelier_madrid_fiesta_novia_medida_2.webp',
        texto: {
          es: ['El Atelier de Madrid de Fely Campo cuenta con un espacio dedicado por completo a las colecciones de prêt-à-porter de lujo con las que la diseñadora ha trasladado su sello de diseño al día a día.'],
          en: ["Fely Campo's Madrid Atelier has a space entirely dedicated to the luxury prêt-à-porter collections through which the designer has brought her design signature into everyday life."],
        },
      },
    ],
  },
  oviedo: {
    id: 'oviedo',
    heroMedio: { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/atelier-fiesta-oviedo-0.jpg' },
    medioSuperior: { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.12.mp4' },
    // Reportaje propio (ver public/img/atelier/atelier-oviedo/) — igual
    // que Salamanca/Madrid, ya cubre toda la ficha (medioSuperior,
    // carrusel y las 3 secciones) — ya no queda nada reciclado de
    // taller-1/taller-2. Alterna imagen/vídeo en el carrusel (ver
    // "imagenesTira" en el comentario de cabecera) — el último par es
    // vídeo/vídeo en vez de imagen/vídeo porque espacio_2-scaled.webp
    // (la imagen que iba ahí) se borró de la carpeta fuera de sesión;
    // sustituir por una foto en cuanto haya una nueva.
    imagenesTira: [
      { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/5-copia-2048x1365.jpg' },
      { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.07.mp4' },
      { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_espacio_3-scaled.webp' },
      { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.15.mp4' },
      { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.10.mp4' },
    ],
    descripcion: {
      es: 'Desde 2015, un universo de moda y emoción en el corazón de Asturias. En pleno centro de Oviedo, corazón neurálgico de Asturias, nace nuestro espacio como punto de encuentro para quienes entienden la moda como una forma de expresión, de personalidad y de emoción. Porque el verdadero lujo no es llevar un vestido: es sentir que fue creado para ti. Aquí, cada mujer encuentra mucho más que un vestido, encuentra una manera única de sentirse ella misma. Un universo de tejidos, colores, texturas y siluetas en el que cada detalle importa, porque no existen dos mujeres iguales, ni dos sueños que puedan vestirse de la misma manera. Por eso, nuestro equipo de cuatro personas personaliza cada ilusión, cada deseo y cada sueño, cuidando cada elección para crear una propuesta que hable de ti y solo de ti. Desde la primera cita hasta el último detalle, nuestro compromiso es ofrecer una experiencia cercana, exclusiva y cuidadosamente personalizada, combinando la esencia de la alta costura con una mirada fresca, actual y joven.',
      en: "Since 2015, a world of fashion and emotion in the heart of Asturias. Right in the centre of Oviedo, the beating heart of Asturias, our space was born as a meeting point for those who understand fashion as a form of expression, of personality and of emotion. Because true luxury isn't wearing a dress: it's feeling that it was made for you. Here, every woman finds far more than a dress — she finds a unique way of feeling like herself. A world of fabrics, colours, textures and silhouettes where every detail matters, because no two women are alike, and no two dreams can be dressed the same way. That's why our team of four people personalises every hope, every wish and every dream, taking care with each choice to create a proposal that speaks of you, and only you. From the first appointment to the very last detail, our commitment is to offer a warm, exclusive and carefully personalised experience, combining the essence of haute couture with a fresh, contemporary, youthful outlook.",
    },
    secciones: [
      {
        // Texto de encargo (3 párrafos) resumido a 2.
        titulo: { es: 'Asesoramiento personalizado', en: 'Personalised styling' },
        imagen: '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_espacio_1-scaled.webp',
        texto: {
          es: [
            'El equipo Fely Campo Oviedo, liderado por Carlos Albuixech, te acompañará durante toda la búsqueda del vestido para tu evento. Desde la primera cita tendrás un asesoramiento personalizado: escucharán tus necesidades y te ayudarán a encontrar esa pieza de nuestras colecciones de fiesta con la que te veas espectacular y refleje tu personalidad, reformulando juntos el diseño de colección —el tejido, las modificaciones y el color que resalte tu silueta natural.',
            'En las siguientes citas te probarás tu vestido tal y como lo elegiste, y el equipo de profesionales terminará de adaptarlo a tu silueta mientras te asesora en cada detalle del look. En el Atelier Fiesta Oviedo contamos además con una selección de complementos que podrás personalizar para dar ese toque sutil y sugerente a tu estilismo.',
          ],
          en: [
            "The Fely Campo Oviedo team will accompany you throughout the search for your dress, whatever the occasion. From the very first appointment you'll receive personalised styling: they'll listen to what you need and help you find the piece from our eveningwear collections that makes you look spectacular and reflects your personality, reworking a collection design together — the fabric, the changes and the colour that flatters your natural silhouette.",
            'At the following appointments you\'ll try on your dress just as you chose it, and our team of professionals will finish adapting it to your silhouette while advising you on every detail of the look. At Atelier Fiesta Oviedo we also have a selection of accessories you can personalise to add that subtle, alluring finishing touch to your style.',
          ],
        },
      },
      {
        titulo: { es: 'Espacio', en: 'The Space' },
        imagen: '/img/atelier/atelier-oviedo/oviedo-felycampo-atelier.webp',
        texto: {
          es: ['En el corazón de Oviedo, se encuentra la fachada acristalada del Atelier Fiesta Fely Campo. Un espacio abierto a la ciudad, a través de un escaparate único que muestra las creaciones de la diseñadora.'],
          en: ["In the heart of Oviedo stands the glass façade of the Fely Campo Atelier Fiesta. A space open to the city, through a unique shop window that showcases the designer's creations."],
        },
      },
      {
        titulo: { es: 'Novia', en: 'Bridal' },
        imagen: '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_5-2048x1365.webp',
        texto: {
          es: ['El Atelier Fiesta Oviedo cuenta con una estudiada selección de vestidos nupciales. Se trata de un rincón donde podrás disfrutar de las colecciones de novia que la diseñadora propone cada temporada. Un lugar perfecto para vivir el instante mágico de encontrar tu vestido de novia, de poder sentir el tacto de nuestras colecciones.'],
          en: ["Atelier Fiesta Oviedo has a carefully curated selection of bridal gowns. It's a corner where you can discover the bridal collections the designer presents each season — the perfect place to live the magical moment of finding your wedding dress, to feel the touch of our collections."],
        },
      },
    ],
  },
};
