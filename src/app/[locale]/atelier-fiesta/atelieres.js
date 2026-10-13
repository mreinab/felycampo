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
    heroMedio: { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/atelier-salamanca-felycampo.jpg' },
    medioSuperior: { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/felycampo-salamanca-atelier.webp' },
    // Vídeo, foto, vídeo, foto, foto (a petición: alternando vídeo y
    // foto) — solo 2 vídeos distintos: 20260826-143026_FoYiTknV.mp4 es
    // idéntico a _DCFGo89w.mp4 (mismo archivo), así que no se usa.
    imagenesTira: [
      { tipo: 'video', src: '/img/atelier/atelier-salamanca/20260428-125217_Z0JLEAAc.mp4' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/buscador_tiendas.webp' },
      { tipo: 'video', src: '/img/atelier/atelier-salamanca/20260826-143026_DCFGo89w.mp4' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/WhatsApp Image 2026-08-25 at 14.05.40.jpeg' },
      { tipo: 'imagen', src: '/img/atelier/atelier-salamanca/WhatsApp Image 2026-08-25 at 14.06.29.jpeg' },
    ],
    descripcion: {
      es: 'En Salamanca, el atelier convive con el corazón creativo de Fely Campo. Un espacio donde oficio, precisión y creación se encuentran, con la esencia de Castilla como parte del universo de la firma.',
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
        imagen: '/img/atelier/atelier-salamanca/atelier-salamanca-.jpeg',
        texto: {
          es: [
            'Un espacio para descubrir Fely Campo, probar sus colecciones y conocer de cerca el universo de la firma. Diseños atemporales y piezas que permanecen más allá de cada temporada.',
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
        imagen: "/img/atelier/atelier-salamanca/atelier-fiesta-salamanca-felycampo (3).jpg",
        texto: {
          es: [
            'Cada cita comienza contigo. Nuestro equipo te acompaña para encontrar el diseño, corte, color y tejido que mejor encajen contigo, y valorar las posibles modificaciones de la pieza elegida.',
          ],
          en: [
            'Every appointment begins with you. Our team guides you to find the design, cut, colour and fabric that suit you best, and to consider the possible alterations to the chosen piece.',
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
      poster: '/img/atelier/showroom-madrid/felycampo-atelier-madrid-showroom.jpg',
    },
    // felycampo-atelier-madrid-showroom (a petición; antes
    // KristenWicce-3, que pasa a la sección "Novias").
    // ajustarAlto: foto vertical — se ve entera a 90vh de alto con su
    // ancho natural, en vez de recortada en la caja 16/9 (ver
    // .videoAjusteAlto en page.module.css).
    medioSuperior: { tipo: 'imagen', src: '/img/atelier/showroom-madrid/felycampo-atelier-madrid-showroom.jpg', ajustarAlto: true },
    // "unnamed (1).webp" quitada a petición (borrada de la carpeta) — el
    // resto de fotos de showroom-madrid/ ya está en uso en otro punto de
    // esta misma ficha (hero/medioSuperior/secciones), así que se queda
    // en 4 en vez de repetir alguna solo para completar 5.
    imagenesTira: [
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_medida-2.jpg' },
      { tipo: 'imagen', src: '/img/atelier/showroom-madrid/felycampo-atelier-madrid.webp' },
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
        imagen: '/img/atelier/showroom-madrid/fely-tomando medidas-felycampo.JPG',
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
        imagen: '/img/atelier/showroom-madrid/felycmapo-atelier-madrid-2.jpg',
        texto: {
          es: ['El Showroom es el lugar dentro de su Atelier en Madrid donde la diseñadora expone muchas de las prendas más icónicas de la firma. Te sumergirás en un universo de piezas que reflejan el alma y la esencia de su creadora durante sus más de 50 años de trayectoria en el mundo de la moda.'],
          en: ["The Showroom is the space within her Madrid Atelier where the designer displays many of the label's most iconic pieces. You'll immerse yourself in a universe of garments that reflect the soul and essence of their creator across her more than 50-year career in the world of fashion."],
        },
      },
      {
        titulo: { es: 'Novias', en: 'Bridal' },
        imagen: '/img/atelier/showroom-madrid/FelyCampo_ATELIER_KristenWicce-3.jpg',
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
    heroMedio: { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/TIENDA FELY-4 (1).jpg' },
    medioSuperior: { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.12.mp4' },
    // Reportaje propio (ver public/img/atelier/atelier-oviedo/) — igual
    // que Salamanca/Madrid, ya cubre toda la ficha (medioSuperior,
    // carrusel y las 3 secciones) — ya no queda nada reciclado de
    // taller-1/taller-2. Alterna imagen/vídeo en el carrusel (ver
    // "imagenesTira" en el comentario de cabecera) — 4 piezas: el vídeo
    // vídeo 10.18.07 quitado a petición (antes entre las dos fotos); su
    // hueco lo cubre espacio_1 entre los dos vídeos (sin repetir dentro del
    // carrusel, aunque es también la foto de la sección "El proceso").
    imagenesTira: [
      { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/5-copia-2048x1365.jpg' },
      { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_espacio_3-scaled.webp' },
      { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.15.mp4' },
      { tipo: 'imagen', src: '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_espacio_1-scaled.webp' },
      { tipo: 'video', src: '/img/atelier/atelier-oviedo/WhatsApp Video 2026-09-11 at 10.18.10.mp4' },
    ],
    // Texto de encargo: la descripción va frase a frase (array, ver
    // RunwayDescripcion.jsx) y cada sección en dos párrafos cortos.
    descripcion: {
      es: [
        'En el corazón de Asturias, un espacio donde la moda se encuentra con la emoción.',
        'Desde 2015, Fely Campo acompaña a cada mujer en la elección de una pieza especial, cuidando cada silueta, cada tejido y cada detalle.',
        'Asesoramiento personalizado por nuestro equipo de cuatro personas liderado por Carlos Albuixech.',
        'Te escuchamos para encontrar la silueta, el color y los detalles que mejor hablan de ti.',
      ],
      en: [
        'In the heart of Asturias, a space where fashion meets emotion.',
        'Since 2015, Fely Campo has accompanied every woman in choosing a special piece, caring for every silhouette, every fabric and every detail.',
        'Personalised styling from our team of four, led by Carlos Albuixech.',
        'We listen to you to find the silhouette, the colour and the details that best speak of you.',
      ],
    },
    secciones: [
      {
        titulo: { es: 'El proceso', en: 'The Process' },
        imagen: '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_espacio_1-scaled.webp',
        texto: {
          es: [
            'Detrás de cada creación hay tiempo, oficio y una mirada precisa.',
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
        imagen: '/img/atelier/atelier-oviedo/Tienda oviedo (2) - copia.jpg',
        texto: {
          es: [
            'Un lugar para descubrir Fely Campo de cerca.',
            'Un espacio íntimo donde conocer nuestras colecciones, tocar los tejidos y dejarse llevar por los detalles.',
          ],
          en: [
            'A place to discover Fely Campo up close.',
            'An intimate space to explore our collections, feel the fabrics and let yourself be carried away by the details.',
          ],
        },
      },
      {
        titulo: { es: 'Novia', en: 'Bridal' },
        imagen: '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_5-2048x1365.webp',
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
