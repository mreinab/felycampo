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
    heroMedio: { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-foto-4.webp' },
    medioSuperior: { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-taller-confeccion.webp' },
    // Vídeo, foto, vídeo, foto (a petición: alternando vídeo y
    // foto) — solo 2 vídeos distintos: 20260826-143026_FoYiTknV.mp4 es
    // idéntico a _DCFGo89w.mp4 (mismo archivo), así que no se usa.
    imagenesTira: [
      { tipo: 'video', src: '/img/atelier/atelier-salamanca/20260428-125217_Z0JLEAAc.mp4' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-foto-2.webp' },
      { tipo: 'video', src: '/img/atelier/atelier-salamanca/20260826-143026_DCFGo89w.mp4' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-foto.webp' },
    ],
    descripcion: {
      es: 'En Salamanca, el atelier de Fely Campo está unido al corazón creativo de la firma. Aquí se encuentran el diseño, el patronaje y el cuidado de los tejidos, en un espacio donde el oficio y la esencia de Castilla forman parte de cada creación.',
      en: 'In Salamanca, the atelier lives alongside the creative heart of Fely Campo. A space where craft, precision and creation meet, with the essence of Castile as part of the world of the label.',
    },
    // "Nuestro equipo" (bloque intermedio) quitado a petición — quedan
    // solo estas dos, alternando de lado automáticamente por índice
    // (ver "indice % 2" en AtelierDetalle.jsx): sin el bloque de en
    // medio, "Asesoramiento personalizado" pasa de índice 2 a 1 y por
    // tanto al lado opuesto de "El Atelier", sin tocar el
    // componente.
    secciones: [
      {
        titulo: { es: 'El Atelier', en: 'The Atelier' },
        imagen: '/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-foto-3.webp',
        texto: {
          es: [
            'Visita nuestro atelier en Salamanca para descubrir las colecciones de Fely Campo, probar diseños y conocer de cerca la firma. Prendas de líneas atemporales, pensadas para permanecer más allá de cada temporada.',
          ],
          en: [
            'A space to discover Fely Campo, try on its collections and get to know the world of the label up close. Timeless designs and pieces that endure beyond each season.',
          ],
        },
      },
      {
        titulo: { es: 'Asesoramiento personalizado', en: 'Personalised styling' },
        // Foto del ajuste en directo (antes en "Nuestro equipo", libre
        // tras quitar esa sección) — momento de asesoramiento real, más
        // fiel al título que la foto de percha suelta que llevaba antes.
        imagen: "/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-fiesta-3.webp",
        texto: {
          es: [
            'Cada cita en el atelier comienza escuchándote. Nuestro equipo te asesora para encontrar el diseño, el corte, el color y el tejido que mejor encajan contigo, y valorar las posibles modificaciones de la prenda elegida.',
          ],
          en: [
            'Every appointment begins with you. Our team guides you to find the design, cut, colour and fabric that suit you best, and to consider the possible alterations to the chosen piece.',
          ],
        },
      },
      {
        titulo: { es: 'Encuentra tu vestido de novia', en: 'Find your wedding dress' },
        imagen: '/img/fely-campo-web-novias-seccion-3.webp',
        texto: {
          es: [
            'A través de una atención personalizada, te asesoramos en la elección de la silueta, los tejidos y los detalles para crear tu vestido de novia ideal.',
          ],
          en: [
            'Through personalised attention, we guide you in choosing the silhouette, fabrics and details to create your ideal wedding dress.',
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
      poster: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-showroom.webp',
    },
    // felycampo-atelier-madrid-showroom (a petición; antes
    // KristenWicce-3, que pasa a la sección "Novias").
    // ajustarAlto: foto vertical — se ve entera a 90vh de alto con su
    // ancho natural, en vez de recortada en la caja 16/9 (ver
    // .videoAjusteAlto en page.module.css).
    medioSuperior: { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-showroom.webp', ajustarAlto: true },
    // "unnamed (1).webp" quitada a petición (borrada de la carpeta) — el
    // resto de fotos de showroom-madrid/ ya está en uso en otro punto de
    // esta misma ficha (hero/medioSuperior/secciones), así que se queda
    // en 4 en vez de repetir alguna solo para completar 5.
    imagenesTira: [
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-medida-2.webp' },
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-sala-pruebas.webp' },
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-medida-fiesta-novia.webp' },
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-vestidos-fiesta.webp' },
    ],
    descripcion: {
      es: 'En la calle Jorge Juan, el atelier y showroom de Fely Campo en Madrid ofrece un espacio íntimo para descubrir la firma. En la cita, la diseñadora escucha tus necesidades y te asesora sobre el diseño, las proporciones y los tejidos para dar forma a una pieza que refleje tu personalidad.',
      en: 'Our Madrid atelier occupies a very special spot on Calle Jorge Juan. An intimate space, designed to discover the label in a close, personal way. There, you can meet the designer and define every detail, every proportion and every fabric to begin shaping a one-of-a-kind piece: a space where time stands still to dress each woman from her own essence.',
    },
    secciones: [
      {
        // Antes vivía aparte como bloque a dos columnas (ver comentario
        // de cabecera) — ahora es una sección más, misma imagen de la
        // sala de pruebas/diseño a medida que ya tenía.
        titulo: { es: 'A medida', en: 'Made-to-measure' },
        imagen: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-tomando-medidas.webp',
        texto: {
          es: [
            'En el atelier de Madrid, la diseñadora trabaja contigo para crear prendas a medida. El diseño nace de una conversación y se desarrolla cuidando la silueta, las proporciones y cada detalle.',
          ],
          en: [
            'With complicity as her goal, the designer creates made-to-measure, one-of-a-kind pieces designed especially for each woman.',
          ],
        },
      },
      {
        titulo: { es: 'Showroom', en: 'Showroom' },
        imagen: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-foto-2.webp',
        texto: {
          es: ['El showroom del atelier de Madrid reúne prendas representativas de Fely Campo y permite descubrir de cerca la identidad de la firma, construida a lo largo de más de cinco décadas dedicadas a la moda.'],
          en: ["The Showroom is the space within her Madrid Atelier where the designer displays many of the label's most iconic pieces. You'll immerse yourself in a universe of garments that reflect the soul and essence of their creator across her more than 50-year career in the world of fashion."],
        },
      },
      {
        titulo: { es: 'Novias', en: 'Bridal' },
        imagen: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-foto-3.webp',
        texto: {
          es: [
            'En el atelier de novias de Madrid, cada vestido se construye a medida a partir de la personalidad de la novia, sus preferencias y cómo desea sentirse el día de su boda. La elección de tejidos, las proporciones y los detalles dan forma al diseño.',
          ],
          en: [
            'At her Madrid Atelier, the designer offers a space to meet where every bride can imagine, build and shape her dream dress, made to measure and designed exclusively for her. Her personality, her sense of beauty, her feelings and the fabrics that move her set the starting point for every design.',
          ],
        },
      },
      {
        titulo: { es: 'Prêt-à-porter', en: 'Prêt-à-porter' },
        imagen: '/img/atelier/fely-campo-atelier-punto-venta-internacional.webp',
        texto: {
          es: ['El atelier de Madrid cuenta con un espacio dedicado al prêt-à-porter de lujo de Fely Campo: colecciones de diseño de autor que trasladan el patronaje, los tejidos y la identidad de la firma a la forma de vestir cotidiana.'],
          en: ["Fely Campo's Madrid Atelier has a space entirely dedicated to the luxury prêt-à-porter collections through which the designer has brought her design signature into everyday life."],
        },
      },
    ],
  },
  oviedo: {
    id: 'oviedo',
    heroMedio: { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-tienda-4-1.webp' },
    medioSuperior: { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.12.mp4' },
    // Reportaje propio (ver public/img/atelier/atelier-oviedo/) — igual
    // que Salamanca/Madrid, ya cubre toda la ficha (medioSuperior,
    // carrusel y las 4 secciones) — ya no queda nada reciclado de
    // taller-1/taller-2. Alterna imagen/vídeo en el carrusel (ver
    // "imagenesTira" en el comentario de cabecera) — 4 piezas: el vídeo
    // vídeo 10.18.07 quitado a petición (antes entre las dos fotos); su
    // hueco lo cubre espacio_1 entre los dos vídeos (sin repetir dentro del
    // carrusel, aunque es también la foto de la sección "El proceso").
    // espacio_3 (antes la 2ª) quitada también a petición — quedan 4.
    imagenesTira: [
      { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-foto-5.webp' },
      { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.15.mp4' },
      { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-fiesta-espacio-1.webp' },
      { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.10.mp4' },
    ],
    // Texto de encargo: la descripción va frase a frase (array, ver
    // RunwayDescripcion.jsx) y cada sección en dos párrafos cortos.
    descripcion: {
      es: [
        'En el corazón de Asturias, el atelier de Fely Campo en Oviedo es un espacio para descubrir vestidos de fiesta, diseños de novia y colecciones de la firma con asesoramiento personalizado.',
        'Desde 2015, el atelier de Fely Campo en Oviedo acompaña a cada mujer en la elección de una pieza especial, con atención a la silueta, los tejidos y cada detalle.',
      ],
      en: [
        'In the heart of Asturias, a space where fashion meets emotion.',
        'Since 2015, Fely Campo has accompanied every woman in choosing a special piece, caring for every silhouette, every fabric and every detail.',
      ],
    },
    secciones: [
      {
        // A petición: foto de Carlos donde se habla del equipo — las dos
        // frases del equipo vivían antes al final de "descripcion", se
        // mueven aquí para no repetirlas.
        titulo: { es: 'Nuestro equipo', en: 'Our Team' },
        imagen: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-carlos.webp',
        texto: {
          es: [
            'Asesoramiento personalizado por nuestro equipo de cuatro personas liderado por Carlos Albuixech.',
            'Nuestro equipo te ofrece asesoramiento personalizado para elegir la silueta, el color y los detalles que mejor encajan contigo y con la ocasión.',
          ],
          en: [
            'Personalised styling from our team of four, led by Carlos Albuixech.',
            'We listen to you to find the silhouette, the colour and the details that best speak of you.',
          ],
        },
      },
      {
        titulo: { es: 'El proceso', en: 'The Process' },
        imagen: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-fiesta-espacio-1.webp',
        texto: {
          es: [
            'Cada vestido de fiesta o diseño de novia requiere tiempo, oficio y una mirada precisa. En el atelier cuidamos el proceso para que cada detalle encuentre su lugar.',
            'Te acompañamos en cada prueba para que el vestido encuentre su forma definitiva: la tuya.',
          ],
          en: [
            'Behind every creation lies time, craft and a precise eye.',
            'We accompany you at every fitting so the dress finds its final shape: yours.',
          ],
        },
      },
      {
        titulo: { es: 'El espacio', en: 'The Space' },
        imagen: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-tienda-2.webp',
        texto: {
          es: [
            'Un lugar para descubrir Fely Campo de cerca.',
            'Visita el atelier de Fely Campo en Oviedo para conocer las colecciones, descubrir los tejidos de cerca y apreciar los detalles de cada diseño.',
          ],
          en: [
            'A place to discover Fely Campo up close.',
            'An intimate space to explore our collections, feel the fabrics and let yourself be carried away by the details.',
          ],
        },
      },
      {
        titulo: { es: 'Novia', en: 'Bridal' },
        imagen: '/img/atelier/atelier-oviedo/fely-campo-atelier-oviedo-fiesta-5.webp',
        texto: {
          es: [
            'Para un día que merece ser único.',
            'Creaciones pensadas para acompañarte con naturalidad, elegancia y personalidad desde el primer momento.',
          ],
          en: [
            'For a day that deserves to be unique.',
            'Creations designed to accompany you with naturalness, elegance and personality from the very first moment.',
          ],
        },
      },
    ],
  },
};
