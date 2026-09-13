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
   dos campos separados por tipo. Salamanca/Oviedo: imagen en el hero,
   vídeo debajo. Madrid: al revés — vídeo en el hero, imagen
   (horizontal) debajo, ver su reportaje propio en
   public/img/atelier/showroom-madrid/.

   "imagenesTira": Salamanca y Madrid ya tienen reportaje propio (ver
   public/img/atelier/atelier-salamanca/ y showroom-madrid/) — Oviedo
   todavía no, así que sigue reciclando el fondo real de taller
   (public/img/talleres/taller-1/ y taller-2/, incluidos los vídeos de
   taller-2, ver talleres.js) que ya usa /talleres-fely-campo. Ese
   reciclado es placeholder puro, igual que ese archivo: sustituir por
   el reportaje real de Oviedo en cuanto exista.

   Ubicación + "Pedir cita" (ver AtelierDetalle.jsx, cierre de la
   página antes de .imagenes): no vive aquí — se resuelve ahí mismo
   buscando "datos.id" en visita-fely-campo/ubicaciones.js (UBICACIONES),
   fuente única de la dirección real de cada sede, ya usada también por
   ListadoUbicaciones.jsx — así no se duplica la dirección en dos sitios
   que podrían desincronizarse. */

const heroImagenes = {
  oviedo: '/img/talleres/oviedo-atelier_fiesta_oviedo_felycampo_espacio_9-2048x1365.webp',
};

export const ATELIERES = {
  salamanca: {
    id: 'salamanca',
    // Reportaje propio (ver public/img/atelier/atelier-salamanca/) —
    // igual que Madrid con showroom-madrid/, ya no hace falta reciclar
    // el fondo de taller-1/ para esta ficha (ver comentario de cabecera).
    heroMedio: { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/atelier-fiesta-salamanca-felycampo (1).jpg' },
    medioSuperior: { tipo: 'video', src: '/img/talleres/taller-2/MVI_9790.MP4' },
    imagenesTira: [
      '/img/atelier/atelier-salamanca/tienda-salamanca.webp',
      '/img/atelier/atelier-salamanca/atelier-fiesta-salamanca-felycampo (1).jpg',
      '/img/atelier/atelier-salamanca/fely-campo-salamanca.jpg',
      '/img/atelier/atelier-salamanca/atelier-fiesta-salamanca-felycampo (3).jpg',
      '/img/atelier/atelier-salamanca/atelierfiesta-atelierfiestasalamanca-felycampo-10.webp',
    ],
    descripcion: {
      es: "En Salamanca, el atelier convive con el corazón creativo de la firma. Charo, que lleva 15 años con la firma, te atenderá con todo detalle. Completamente acristalado, el espacio se abre a dos universos que forman parte de la identidad de Fely Campo: a un lado, los campos dorados de Castilla; al otro, el taller, donde cada día tejidos, patrones y manos expertas dan forma a las colecciones. Desde el atelier puede contemplarse el ritmo real de la maison: el proceso, el oficio y la precisión que existen detrás de cada pieza. Un lugar donde paisaje y creación conviven, y donde la esencia de Castilla entra directamente en el universo de Fely Campo.",
      en: "In Salamanca, the atelier lives alongside the creative heart of the label. Charo, who has been with the label for 15 years, will take care of every detail for you. Fully glazed, the space opens onto two worlds that are part of Fely Campo's identity: on one side, the golden fields of Castile; on the other, the workshop, where every day fabrics, patterns and expert hands give shape to the collections. From the atelier, you can see the real rhythm of the maison: the process, the craft and the precision behind every piece. A place where landscape and creation coexist, and where the essence of Castile enters directly into the world of Fely Campo.",
    },
    secciones: [
      {
        titulo: { es: 'Experiencia única', en: 'A Unique Experience' },
        imagen: '/img/atelier/atelier-salamanca/atelier-fiesta-salamanca-felycampo (3).jpg',
        texto: {
          es: [
            'En nuestro Atelier Fiesta en Salamanca podrás vivir la magia de Fely Campo. Un lugar donde disfrutar del universo de la firma, en el que cada rincón y cada detalle está diseñado para que vivas una experiencia única en la que encontrar tu vestido para un evento. Hay un carácter atemporal en nuestros diseños, por lo que también podrás probarte los icónicos modelos de colecciones previas que siguen enamorando.',
            'En Fely Campo Atelier Fiesta Salamanca, y bajo un clima de absoluta complicidad, te acompañaremos durante todo el proceso de la búsqueda del vestido perfecto para ti.',
          ],
          en: [
            "At our Atelier Fiesta in Salamanca you can experience the magic of Fely Campo — a place to enjoy the world of the label, where every corner and every detail is designed for you to live a unique experience as you find your dress for any occasion. There's a timeless character to our designs, so you can also try on the iconic pieces from previous collections that continue to captivate.",
            "At Fely Campo Atelier Fiesta Salamanca, in an atmosphere of absolute complicity, we'll be by your side throughout the search for the perfect dress for you.",
          ],
        },
      },
      {
        titulo: { es: 'Nuestro equipo', en: 'Our Team' },
        imagen: '/img/atelier/atelier-salamanca/fely-campo-salamanca.jpg',
        texto: {
          es: [
            'Recibirás la atención de un equipo que está deseando compartir contigo la búsqueda del look que te haga sentir cómoda y espectacular.',
            'Charo García Cruz es la pieza clave del equipo Atelier de Fiesta Fely Campo Salamanca, con una amplia experiencia en el sector de la moda. Lleva años escuchando a las mujeres que visitan nuestro espacio, para ayudarlas a encontrar la prenda perfecta para cada evento.',
            'Ella y todo el equipo Fely Campo Fiesta Salamanca están deseando conocerte.',
          ],
          en: [
            "You'll be looked after by a team who can't wait to share with you the search for the look that makes you feel comfortable and spectacular.",
            'Charo García Cruz is the key figure of the Fely Campo Atelier Fiesta Salamanca team, with extensive experience in the fashion industry. For years she has listened to the women who visit our space, helping them find the perfect piece for every occasion.',
            "She and the whole Fely Campo Fiesta Salamanca team can't wait to meet you.",
          ],
        },
      },
      {
        // Texto de encargo (4 párrafos) resumido a 2.
        titulo: { es: 'Asesoramiento personalizado', en: 'Personalised styling' },
        imagen: '/img/atelier/atelier-salamanca/atelierfiesta-atelierfiestasalamanca-felycampo-10.webp',
        texto: {
          es: [
            'De la mano de nuestro equipo tendrás un asesoramiento personalizado desde la primera cita: se sentarán contigo, te escucharán y buscarán junto a ti ese diseño de nuestras colecciones con el que te sientas identificada y segura, recomendándote los cortes, colores y tejidos que más favorecen tu silueta y asesorándote sobre las modificaciones posibles dentro del diseño elegido.',
            'Una vez elijas tu vestido y aceptes el presupuesto, comienza el proceso de las siguientes citas: te probarás el vestido en el tejido, color y talla elegidos, y en las pruebas siguientes el equipo terminará de adaptarlo a tu cuerpo y de pulir cada detalle de tu look. En nuestro Atelier Fiesta en Salamanca contamos además con una selección de zapatos y tocados que podemos adaptar a los colores que necesites.',
          ],
          en: [
            "With the help of our team you'll receive personalised guidance from the very first appointment: they'll sit down with you, listen, and search together for the design from our collections you feel most like yourself and most confident in, recommending the cuts, colours and fabrics that best flatter your silhouette and advising you on the changes possible within the chosen design.",
            "Once you choose your dress and approve the quote, the process of further appointments begins: you'll try on the dress in the fabric, colour and size you chose, and at the following fittings the team will finish adapting it to your body and polishing every detail of your look. At our Atelier Fiesta in Salamanca we also have a selection of shoes and headpieces we can adapt to the colours you need.",
          ],
        },
      },
    ],
  },
  madrid: {
    id: 'madrid',
    heroMedio: { tipo: 'video', src: '/img/atelier/showroom-madrid/fely_campo_atelier_madrid.mp4' },
    // pretaporter-3-1024x683: la única de las 6 explícitamente
    // horizontal (1024x683 en el propio nombre de archivo) — encaja
    // mejor que las demás (de retrato) en la caja apaisada de .video.
    medioSuperior: { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_pretaporter-3-1024x683.jpg' },
    imagenesTira: [
      '/img/atelier/showroom-madrid/atelier_madrid_fiesta_novia_medida_2.webp',
      '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_showroom-3.jpg',
    ],
    descripcion: {
      es: 'Nuestro atelier de Madrid ocupa un emplazamiento muy especial en la calle Jorge Juan, en pleno Barrio de Salamanca. Una elección que no es casual: Fely Campo nació en Salamanca y, de algún modo, la diseñadora continúa en Salamanca incluso cuando está en Madrid. El atelier es un espacio íntimo, pensado para descubrir la firma de una forma cercana y personal. Está atendido de manera permanente y, una vez a la semana, Fely Campo recibe personalmente las citas de diseño a medida. Un encuentro con la diseñadora en el que cada detalle, cada proporción y cada tejido comienzan a dar forma a una pieza única: un espacio donde el tiempo se detiene para vestir a cada mujer desde su propia esencia.',
      en: "Our Madrid atelier occupies a very special spot on Calle Jorge Juan, in the heart of Barrio de Salamanca. It's no coincidence: Fely Campo was born in Salamanca, and in a way, the designer stays close to Salamanca even while in Madrid. The atelier is an intimate space, designed to discover the label in a close, personal way. It's permanently staffed, and once a week Fely Campo herself receives made-to-measure design appointments. A meeting with the designer where every detail, every proportion and every fabric begins to take the shape of a one-of-a-kind piece: a space where time stands still to dress each woman from her own essence.",
    },
    secciones: [
      {
        // Antes vivía aparte como bloque a dos columnas (ver comentario
        // de cabecera) — ahora es una sección más, misma imagen de la
        // sala de pruebas/diseño a medida que ya tenía.
        titulo: { es: 'A medida', en: 'Made-to-measure' },
        imagen: '/img/atelier/showroom-madrid/atelier_medida_madrid_fiesta_novia_felycampo.webp',
        texto: {
          es: [
            'Fely Campo busca crear una experiencia de absoluta complicidad con cada persona que decide crear el vestido perfecto junto a ella. Este espacio dentro del Atelier de Madrid es el lugar donde la diseñadora realiza el diseño a medida de piezas únicas e irrepetibles pensadas especialmente para cada mujer.',
          ],
          en: [
            'Fely Campo seeks to create an experience of absolute complicity with each person who decides to create the perfect dress alongside her. This space within the Madrid Atelier is where the designer creates made-to-measure, one-of-a-kind pieces designed especially for each woman.',
          ],
        },
      },
      {
        titulo: { es: 'Showroom', en: 'Showroom' },
        imagen: '/img/atelier/showroom-madrid/15.jpg',
        texto: {
          es: ["El Showroom de Fely Campo es el lugar dentro de su Atelier en Madrid donde la diseñadora expone muchas de las prendas más icónicas de la firma. Piezas que reflejan el alma y la esencia de su creadora durante sus 50 años de trayectoria en el mundo de la moda. Un lugar donde poder sumergirte en el mundo Fely Campo a través de vestidos e historia propias que reflejan el alma creadora de su diseñadora y toda la filosofía de la firma. Además de las últimas novedades y las colecciones al completo que la diseñadora presenta en la pasarela Mercedes Benz Fashion Week Madrid cada temporada."],
          en: ["The Fely Campo Showroom is the space within her Madrid Atelier where the designer displays many of the label's most iconic pieces — garments that reflect the soul and essence of their creator across her 50-year career in fashion. A place to immerse yourself in the Fely Campo world through dresses and stories of their own that reflect the designer's creative spirit and the full philosophy of the label, alongside the latest releases and the complete collections she presents on the Mercedes Benz Fashion Week Madrid runway each season."],
        },
      },
      {
        // Texto de encargo (4 párrafos) resumido a 1 — misma idea, sin
        // repetir cada matiz por extenso.
        titulo: { es: 'Novias', en: 'Bridal' },
        imagen: '/img/novias-sección-FelyCampo4.jpg',
        texto: {
          es: [
            'Fely Campo concibe cada vestido de novia como una historia íntima, un proceso de creación compartido con la mujer que lo llevará en uno de los días más importantes de su vida. En su Atelier de Madrid, la diseñadora ofrece un espacio de encuentro donde cada novia puede imaginar, construir y dar forma a su vestido soñado, hecho a medida y pensado exclusivamente para ella: su personalidad, su forma de vivir la belleza, sus sensaciones y los tejidos que la emocionan marcan el punto de partida de cada diseño, en una primera cita donde Fely Campo escucha con atención antes de empezar, junto a su equipo, un proceso de creación absolutamente personal.',
          ],
          en: [
            "Fely Campo sees every bridal gown as an intimate story, a creative process shared with the woman who will wear it on one of the most important days of her life. At her Madrid Atelier, the designer offers a space to meet where every bride can imagine, build and shape her dream dress, made to measure and designed exclusively for her: her personality, her sense of beauty, her feelings and the fabrics that move her set the starting point for every design, in a first appointment where Fely Campo listens closely before beginning, together with her team, a deeply personal creative process.",
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
    heroMedio: { tipo: 'imagen', src: heroImagenes.oviedo },
    medioSuperior: { tipo: 'video', src: '/img/talleres/taller-2/MVI_9853.MP4' },
    imagenesTira: [
      '/img/talleres/taller-2/IMG_9881.JPG',
      '/img/talleres/taller-2/IMG_9884.JPG',
      '/img/talleres/taller-2/IMG_9888.JPG',
    ],
    descripcion: {
      es: 'Desde 2015, un universo de moda y emoción en el corazón de Asturias. En pleno centro de Oviedo, corazón neurálgico de Asturias, nace nuestro espacio como punto de encuentro para quienes entienden la moda como una forma de expresión, de personalidad y de emoción. Porque el verdadero lujo no es llevar un vestido: es sentir que fue creado para ti. Aquí, cada mujer encuentra mucho más que un vestido, encuentra una manera única de sentirse ella misma. Un universo de tejidos, colores, texturas y siluetas en el que cada detalle importa, porque no existen dos mujeres iguales, ni dos sueños que puedan vestirse de la misma manera. Por eso, nuestro equipo de cuatro personas personaliza cada ilusión, cada deseo y cada sueño, cuidando cada elección para crear una propuesta que hable de ti y solo de ti. Desde la primera cita hasta el último detalle, nuestro compromiso es ofrecer una experiencia cercana, exclusiva y cuidadosamente personalizada, combinando la esencia de la alta costura con una mirada fresca, actual y joven.',
      en: "Since 2015, a world of fashion and emotion in the heart of Asturias. Right in the centre of Oviedo, the beating heart of Asturias, our space was born as a meeting point for those who understand fashion as a form of expression, of personality and of emotion. Because true luxury isn't wearing a dress: it's feeling that it was made for you. Here, every woman finds far more than a dress — she finds a unique way of feeling like herself. A world of fabrics, colours, textures and silhouettes where every detail matters, because no two women are alike, and no two dreams can be dressed the same way. That's why our team of four people personalises every hope, every wish and every dream, taking care with each choice to create a proposal that speaks of you, and only you. From the first appointment to the very last detail, our commitment is to offer a warm, exclusive and carefully personalised experience, combining the essence of haute couture with a fresh, contemporary, youthful outlook.",
    },
    secciones: [
      {
        // Texto de encargo (3 párrafos) resumido a 2.
        titulo: { es: 'Asesoramiento personalizado', en: 'Personalised styling' },
        imagen: '/img/talleres/taller-1/IMG_9742.JPG',
        texto: {
          es: [
            'El equipo Fely Campo Oviedo te acompañará durante toda la búsqueda del vestido para tu evento. Desde la primera cita tendrás un asesoramiento personalizado: escucharán tus necesidades y te ayudarán a encontrar esa pieza de nuestras colecciones de fiesta con la que te veas espectacular y refleje tu personalidad, reformulando juntos el diseño de colección —el tejido, las modificaciones y el color que resalte tu silueta natural.',
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
        imagen: '/img/talleres/taller-2/IMG_9844.JPG',
        texto: {
          es: ['En el corazón de Oviedo, se encuentra la fachada acristalada del Atelier Fiesta Fely Campo. Un espacio abierto a la ciudad, a través de un escaparate único que muestra las creaciones de la diseñadora.'],
          en: ["In the heart of Oviedo stands the glass façade of the Fely Campo Atelier Fiesta. A space open to the city, through a unique shop window that showcases the designer's creations."],
        },
      },
      {
        titulo: { es: 'Novia', en: 'Bridal' },
        imagen: '/img/talleres/taller-1/IMG_9760.JPG',
        texto: {
          es: ['El Atelier Fiesta Oviedo cuenta con una estudiada selección de vestidos nupciales. Se trata de un rincón donde podrás disfrutar de las colecciones de novia que la diseñadora propone cada temporada. Un lugar perfecto para vivir el instante mágico de encontrar tu vestido de novia, de poder sentir el tacto de nuestras colecciones.'],
          en: ["Atelier Fiesta Oviedo has a carefully curated selection of bridal gowns. It's a corner where you can discover the bridal collections the designer presents each season — the perfect place to live the magical moment of finding your wedding dress, to feel the touch of our collections."],
        },
      },
    ],
  },
};
