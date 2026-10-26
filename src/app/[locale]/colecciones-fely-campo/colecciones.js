/* ============================================================
   RUNWAY — Fely Campo. Datos compartidos por la cuadrícula
   (page.js) y la plantilla de cada colección (../runways-[coleccion]/
   page.js). Las 9 colecciones de pasarela, de la más reciente (La
   Colección, AW27 — el mismo vídeo del Hero de la home) a la primera
   (Diafonía, AW23).

   "slug" es el nombre en kebab-case y ES la URL real de cada
   colección, tal cual — /runways-dreaming, /runways-la-coleccion...
   (antes /colecciones-fely-campo/[slug]-[temporada], con la temporada
   al final; antes de eso /archivo/runway/... — dos rutas renombradas
   a petición directa del usuario).
   Nota: estos slugs son propios de /runways-[coleccion] y NO
   coinciden con los que ya usa el "Destino del CTA" del admin bajo
   /archivo/colecciones/[coleccion] (ver paginasInternas en
   mockData.js) — son dos rutas/esquemas de URL distintos.

   RunwayTarjeta admite "medios" con 1 o 2 elementos (imagen o vídeo,
   ver RunwayTarjeta.jsx) — el "split" a dos columnas ya no tiene
   ningún ejemplo en uso (Self World y Zigurat lo usaban de forma
   temporal con fotos sueltas de fw27-lacoleccion, mientras no tenían
   fotos propias; ya llevan su propia portada, ver looks* más abajo),
   pero el componente lo sigue admitiendo si hace falta en el futuro.

   "looks" (ver RunwayGaleria.jsx en la ficha de colección): la
   cuadrícula de fotos individuales de la colección. Solo La Colección
   (AW27) tiene un reportaje real completo — las 34 fotos de
   fw27-lacoleccion, mismo criterio que looksLaColeccion en
   src/components/admin/mockData.js (Sección Colecciones del admin) —
   el resto de colecciones no tiene fotos propias por look todavía, así
   que su "cuadrícula" es solo su portada (mismo medios[0] de arriba).
   "productos" (opcional, por look): productos de productosEjemplo.js
   vinculados a ese look concreto — mismo campo `productosVinculados`
   que ya usa FormularioLook.jsx en el admin, aquí en plano porque el
   sitio público no comparte estado con el admin (sin backend real,
   cada uno con su propio mock). De momento solo 3 looks de La
   Colección llevan producto vinculado, a modo de EJEMPLO de cómo se ve
   el lightbox con 1, 2 y 3 prendas (looks 3, 12 y 20) — el resto no
   tiene ninguno todavía.
   "descripcion" (opcional, por look — no confundir con la descripcion
   de la colección más abajo): texto editorial corto del look, se
   muestra bajo "Look X" en el panel del lightbox (ver
   RunwayGaleria.jsx). Mismos 3 looks de EJEMPLO que "productos" —
   el resto no tiene todavía.

   "descripcion" (ver RunwayDescripcion.jsx en la ficha de colección):
   texto editorial a 50% de ancho debajo del hero — un único párrafo
   corrido (RunwayDescripcion no admite más de uno, mismo criterio que
   /sobre-fely y /atelier), así que los varios párrafos de encargo de
   cada colección se unen con espacios en vez de saltos de línea. Las
   9 colecciones ya llevan su texto real de encargo.
   "video" (opcional, ver RunwayVideoCierre.jsx): el vídeo de cierre al
   final de la ficha. Solo La Colección tiene vídeo propio (reutiliza
   el mismo FW27-Hero3.mp4 del hero) — el resto no lleva este campo
   todavía y esa sección simplemente no se pinta (ver `if (!src)` en
   RunwayVideoCierre.jsx).
   "videoEnlace" (opcional, ver "enlace" en RunwayVideoCierre.jsx): en
   vez de "video", una captura que enlaza al vídeo en YouTube — todas
   las colecciones salvo La Colección, que lleva su propio vídeo.
   "backstage" (opcional, ver RunwayBackstage.jsx en la ficha de
   colección): fotos de backstage, entre la descripción y la cuadrícula
   de looks — cuadrícula editorial de 10 columnas, no se pinta si el
   array está vacío. La Colección tiene su reportaje en
   .../fw27-lacoleccion/backstage; Dreaming, Self World, Lei Zu, The Way
   Here y Zigurat, en .../runway/bts/{temporada} (ver backstageDe).
   Tempore, Nagare y Diafonía no llevan este campo todavía.
   ============================================================ */

import { productosEjemplo } from '@/components/layout/productosEjemplo';

const looksLaColeccion = Array.from({ length: 34 }, (_, indice) => {
  const numero = indice + 1;
  const productos = numero === 3 ? [productosEjemplo[0]]
    : numero === 12 ? [productosEjemplo[1], productosEjemplo[2]]
      : numero === 20 ? [productosEjemplo[3], productosEjemplo[4], productosEjemplo[5]]
        : [];
  const descripcion = numero === 3
    ? 'Satén y tweed en diálogo: la chaqueta estructurada suaviza su caída sobre una falda de movimiento fluido.'
    : numero === 12
      ? 'Brocado y paillettes para la noche, con accesorios que permiten transformar el look del día a la noche.'
      : numero === 20
        ? 'Tres piezas que se combinan entre sí: prueba de cómo se ve el panel con un trío de productos vinculados.'
        : undefined;
  return {
    imagen: `/img/collections/runway/fw27-lacoleccion/fely-campo-pasarela-la-coleccion-look-${String(numero).padStart(2, '0')}.webp`,
    productos,
    descripcion,
  };
});

// Resto de colecciones: una foto por look, de frente, ya renombradas en
// disco con el mismo patrón (fely-campo-pasarela-{slug}-look-NN.webp,
// numeradas por orden de look). Antes cada colección tenía su lista a
// mano por nombres de archivo irregulares (LOOK-3-.webp, look251-scaled,
// WEB-83-1…); al renombrar las fotos a este patrón ya no hace falta.
// Sin productos/descripción de ejemplo (eso es solo de La Colección).
function looksDe(carpeta, slug, total) {
  return Array.from({ length: total }, (_, indice) => ({
    imagen: `/img/collections/runway/${carpeta}/fely-campo-pasarela-${slug}-look-${String(indice + 1).padStart(2, '0')}.webp`,
    productos: [],
  }));
}

// Backstage de cada colección en /img/collections/runway/bts/{temporada},
// con el mismo patrón numerado (fely-campo-pasarela-{slug}-backstage-NN.webp).
function backstageDe(carpeta, slug, total) {
  return Array.from({ length: total }, (_, indice) => `/img/collections/runway/bts/${carpeta}/fely-campo-pasarela-${slug}-backstage-${String(indice + 1).padStart(2, '0')}.webp`);
}

const looksDreaming =looksDe('ss26-dreaming', 'dreaming', 29);
const looksSelfWorld = looksDe('fw26-selfworld', 'self-world', 26);
const looksLeiZu = looksDe('ss25-leizu', 'lei-zu', 29);
const looksTheWayHere = looksDe('fw25-thewayhere', 'the-way-here', 26);
const looksZigurat = looksDe('ss24-zigurat', 'zigurat', 26);
const looksTempore = looksDe('fw24-tempore', 'tempore', 27);
const looksNagare = looksDe('ss23-nagare', 'nagare', 26);
const looksDiafonia = looksDe('fw23-diafonia', 'diafonia', 25);

export const COLECCIONES = [
  {
    slug: 'la-coleccion',
    nombre: 'La Colección',
    temporada: 'AW27',
    medios: [{ src: '/img/collections/runway/fw27-lacoleccion/backstage/fely-campo-pasarela-la-coleccion-backstage-hero-2.webp' }],
    looks: looksLaColeccion,
    descripcion: 'La Colección de Fely Campo explora la riqueza de los tejidos y el diálogo entre satén, tweed y brocados. Los abrigos de formas envolventes y las prendas de prêt-à-porter de lujo combinan estructura y movimiento, con una paleta que va del beige al negro y matices de rosa viejo. Diseños versátiles, concebidos para acompañar distintas ocasiones y perdurar temporada tras temporada.',
    video: '/img/landing/FW27-Hero3.mp4',
    backstage: [
      '/img/collections/runway/fw27-lacoleccion/backstage/fely-campo-pasarela-la-coleccion-backstage-aw2026-30.webp',
      '/img/collections/runway/fw27-lacoleccion/backstage/fely-campo-pasarela-la-coleccion-backstage-aw2026-183.webp',
      '/img/collections/runway/fw27-lacoleccion/backstage/fely-campo-pasarela-la-coleccion-backstage-aw2026-48.webp',
      '/img/collections/runway/fw27-lacoleccion/backstage/fely-campo-pasarela-la-coleccion-backstage-aw2026-58.webp',
      '/img/collections/runway/fw27-lacoleccion/backstage/fely-campo-pasarela-la-coleccion-backstage-aw2026-79.webp',
      '/img/collections/runway/fw27-lacoleccion/backstage/fely-campo-pasarela-la-coleccion-backstage-framae-studio-036.webp',
    ],
  },
  {
    slug: 'dreaming',
    nombre: 'Dreaming',
    temporada: 'SS26',
    medios: [{ src: '/img/collections/runway/ss26-dreaming/fely-campo-pasarela-dreaming-portada.webp' }],
    looks: looksDreaming,
    backstage: backstageDe('ss26', 'dreaming', 12),
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=MaS501w4LJU',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-dreaming-video-desfile.webp',
      titulo: 'Dreaming SS26 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: 'Soñar es un espacio no lineal sin pasado, presente ni futuro. Atemporal, donde el caos de las tendencias es una irrelevancia pasajera, donde la realidad es moldeada por quien sueña. Soñar es dar voz a la imaginación, permitir que la creatividad y el conocimiento se unan, dar a la realidad una forma que existe en un ahora atemporal. La pasión que impulsa a soñar creativamente es la realidad de una mujer. En esta colección, Fely Campo ha apostado no por el espectáculo, sino por la mujer, por una mujer cuya belleza se refleja en los estilos de esta colección, por una mujer que reconoce que el estilo va más allá del capricho de una tendencia. Con estos tejidos, Fely Campo ha diseñado una colección que una mujer puede llevar.',
  },
  {
    slug: 'self-world',
    nombre: 'Self World',
    temporada: 'AW26',
    medios: [{ src: '/img/collections/runway/fw26-selfworld/fely-campo-pasarela-self-world-selfworld-portada.webp' }],
    looks: looksSelfWorld,
    backstage: backstageDe('aw26', 'self-world', 14),
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=bwjJ_fofbtI',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-self-world-video-desfile.webp',
      titulo: 'Self World AW26 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: 'Self <>World. Interacción entre el «yo» (self) y el «mundo» (world). Conexión continua entre nuestra identidad interna y el entorno que nos rodea. He elegido este título para esta colección porque la moda es una declaración íntima: un reflejo de cómo deseamos que el mundo nos contemple y de cómo, a su vez, el mundo nos contempla. Durante los últimos dos siglos, la moda se ha democratizado, convirtiéndose en un lenguaje universal que nos permite expresar tanto nuestro estilo individual como nuestro sentido de pertenencia. El exterior se convierte en un espejo del yo interior, una danza de formas, texturas y colores que revela quiénes somos y, a veces, quiénes anhelamos ser. Este proceso ha liberado los límites del color, la tela y el diseño, dándonos la libertad de transformarnos sin traicionar la esencia que llevamos dentro, respetando las sensibilidades culturales que compartimos hoy. Pero, ante todo, esta colección honra la sostenibilidad. Intento crear diseños que trasciendan lo efímero y la urgencia de lo nuevo por lo nuevo, prendas que irradien elegancia y estilo, no solo hoy, sino también en el mañana. Cada estilo de diseño ha sido creado para que cada mujer, sin importar quién sea, se enfrente al mundo con ropa elegante y elaborada que refleje la belleza interna inherente de cada mujer. «La belleza está en los ojos de quien la contempla, ya sea en los tuyos o en los míos». Este es un homenaje a las texturas y a la magia de las superposiciones. Desde la dulzura envolvente del tweed y la calidez aterciopelada hasta el destello sutil del satén y las aplicaciones en relieve, cada material evoca épocas y estilos que resuenan en armonía. El terciopelo se entrelaza con lentejuelas y bordados, creando piezas que seducen al tacto y deslumbran por su riqueza y opulencia. Los tejidos pesados, como el tweed y la lana, dialogan en contraste con la ligereza etérea de la seda y otros textiles ligeros, logrando un equilibrio sublime entre estructura y fluidez.',
  },
  {
    slug: 'lei-zu',
    nombre: 'Lei Zu',
    temporada: 'SS25',
    medios: [{ src: '/img/collections/runway/ss25-leizu/fely-campo-pasarela-lei-zu-leizu-portada.webp' }],
    looks: looksLeiZu,
    backstage: backstageDe('ss25', 'lei-zu', 15),
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=cQgrWdOdB5g',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-lei-zu-video-desfile.webp',
      titulo: 'Lei Zu SS25 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: 'Atravesar una ruta insospechada: la delicia de recorrer la ruta de la seda ondulante bajo nuestros pies, acompañados de la luz de un cimbreante sol, recorriendo el hilo que envuelve una historia de leyenda y misterio. Fely Campo presenta "Lei Zu" como una colección de prêt-à-porter de lujo que nos habla de su viaje desde Europa a China. "Lei Zu" es un paseo estético a través de 25 sofisticados looks que parten del magistral uso del tweed hasta los patrones más livianos protagonizados por las sedas artesanales chinas traídas por la diseñadora en su reciente viaje a Guangzhou, entremezclándose con los volúmenes de los tafetanes, la esencialidad de los linos, los brocados estampados y la sutileza de las organzas y tules bordados con paillets. En todo su recorrido "Lei Zu" es una oda absoluta a la riqueza del tejido que alcanza su máxima expresión gracias a las siluetas y el cuidado de los cortes. Las superposiciones de piezas, los volúmenes generados por el tafetán, los cortes de las siluetas sastre más estructuradas se hacen protagonistas de las primeras etapas de ese camino en tweeds y trajes de lino que se van deconstruyendo para mostrarnos figuras más lenceras y sensuales con vestidos camiseros y maxi kaftanes de encajes hasta llegar al hipnótico movimiento de los vestidos de las colas de los vestidos más vaporosos. "Lei Zu" acaricia la mirada de quien la observa con tonalidades empolvadas: cristalinos azules, nacarados blancos, suaves lilas y cálidos beige que se sorprenden con la acidez de las limas y los radiantes pistachos. Un elogio a la luz para alcanzar al final del camino el ansiado titilar de pinceladas doradas sobre las negras sedas chinas. "Lei Zu" no es solo una colección. Ni siquiera es una leyenda. Es un viaje al origen de la moda. Es la historia que ya cautivó a Baricco transformada en prendas. Es la magia de transitar la ruta de la seda.',
  },
  {
    slug: 'the-way-here',
    nombre: 'The Way Here',
    temporada: 'AW25',
    medios: [{ src: '/img/collections/runway/fw25-thewayhere/fely-campo-pasarela-the-way-here-thewayhere-portada.webp' }],
    looks: looksTheWayHere,
    backstage: backstageDe('fw25', 'the-way-here', 10),
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=GbinWsFsM_U',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-the-way-here-video-desfile.webp',
      titulo: 'The Way Here AW25 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: '"Una decisión de mi madre me puso por primera vez ante una aguja y un dedal… Sin saberlo, aquel día comenzó a hilvanarse mi vida. Y con ella, esta colección." "The Way Here", el camino hasta aquí, da título a la colección más personal de Fely Campo, vinculada a la emoción y el pensamiento resultado de los 50 años que lleva dedicada a este oficio. En definitiva, su amor por la moda. Un amor y un camino que se materializa en esta colección de prêt-à-porter de lujo. Un viaje creativo hacia el interior, que se erige desde las tonalidades de su color fetiche, el negro: azabache, grafito, antracita, humo, ébano, para envolverse con el fulgor brillante de los tonos fuego y caldero, que se inundan de frescura con las distintas tonalidades verdes. La luminosidad del plata y el dorado junto al crema le otorgan el toque de madurez y sobriedad a la paleta de color de esta colección. Un recorrido a través de la variedad de tejidos: los cálidos paños, los atrevidos lamés, los esenciales tafetanes, los mágicos brocados y las novedosas organzas, fusionan la pasión terrenal con la más experimental de su trayectoria. The Way Here muestra, en su puesta en escena, personal, delicada, enérgica… una nueva perspectiva, en la que se palpa mi pasión, para sentir el tacto de la tela. 26 looks que han viajado para nacer tras estos 50 años: un itinerario que florece a través de líneas más sencillas, con la delicadeza del amor que va brotando, pero con la pasión imparable que te empuja a crear; un amor que avanza y te hipnotiza a través de siluetas que con cada look se tornan más sofisticadas, mostrando la mirada profunda de la diseñadora al conocimiento del oficio, donde el patrón cobra una importancia vital. En palabras de Fely Campo: "The Way Here es la celebración, el crecimiento y la pulsión creativa de 50 años dedicada a la búsqueda de la belleza a través del tejido, del patrón, de mi bien más preciado. En definitiva, mi vida."',
  },
  {
    slug: 'zigurat',
    nombre: 'Zigurat',
    temporada: 'SS24',
    medios: [{ src: '/img/collections/runway/ss24-zigurat/fely-campo-pasarela-zigurat-portada.webp' }],
    looks: looksZigurat,
    backstage: backstageDe('ss24', 'zigurat', 11),
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=daA5Br3dQ9Q',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-zigurat-video-desfile.webp',
      titulo: 'Zigurat SS24 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: 'Hedonismo, libertad, opulencia, nostalgia y glamour. Esta colección de prêt-à-porter de lujo emerge en Cuba: Fely Campo nos invita a escalar un "Zigurat" de emociones a través de 26 looks que se empapan del ritmo Decó. El Art Decó viste esta colección de patrones puros, que se construyen con la limpieza y sobriedad de los edificios más caprichosos de la Habana. Siluetas y cortes geométricos se entrelazan con tejidos inspirados en el lenguaje ornamental art decó: brocados inundados de juegos visuales 3D con motivos naturales y geométricos; mosaicos orgánicos que se contraponen junto a la verticalidad de las líneas del otomán y los tweeds más arriesgados. Frente a la calma voluminosa de los tafetanes surgen las formas sinuosas de los rasos en movimiento. Los colores rinden homenaje a la vibrante esencia de Cuba y al esplendor del Art Decó. La paleta cromática es diversa, abarcando desde tonos neón y metalizados hasta tonalidades suaves y luminosas. El blanco, como hilo conductor, brilla en conjunto con los vibrantes matices de rosa, azul y amarillo. El uso magistral de tonos metálicos en plata y dorado añade un toque de lujo y sofisticación a la colección. Las siluetas se inspiran en patrones geométricos y cortes rectos característicos del Art Decó. Los escotes cuadrados, los vestidos de siluetas sueltas y los adornos de líneas aportan una estética nítida y elegante. Detalles como mangas con cintas y faldas con volúmenes completan la visión única de Fely Campo. La colaboración artística es un pilar fundamental en esta colección. El artista plástico Álvaro García-Miguel ha creado una pintura digital exclusiva que fusiona el Art Decó con el expresionismo, reflejando la esencia misma de la colección. La realizadora 3D Cami Alberti ha dado vida a los espacios cubanos y ha permitido una inmersión en la obra de Álvaro, fusionando lo terrenal con lo tecnológico. La música, compuesta especialmente para el desfile por Jorge Gamarra (miembro del equipo de Cami Alberti), fusiona ritmos cubanos ancestrales con toques electrónicos, capturando la vitalidad de la cultura y la esencia de la firma. La pieza "Zigurat", coreografiada por el destacado creador de danza española Jose Manuel Buzón e interpretada por 7 talentosos bailarines de la Compañía de Danza Ballet de Cámara de Madrid, perteneciente a la Fundación de la Danza «Alicia Alonso», se entrelaza de manera espectacular con la colección y cierra el desfile en un deslumbrante acto. Contraste, formas, estructura, cromatismo, ornamentos. "Zigurat" crea un universo sentimental que seduce y atraviesa esta propuesta de moda viva e intensa de la diseñadora Fely Campo.',
  },
  {
    slug: 'tempore',
    nombre: 'Tempore',
    temporada: 'AW24',
    medios: [{ src: '/img/collections/runway/fw24-tempore/fely-campo-pasarela-tempore-portada.webp' }],
    looks: looksTempore,
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=NWm1CwpaMm4',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-tempore-video-desfile.webp',
      titulo: 'Tempore AW24 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: 'Mañana, tarde y noche. Tres momentos, tres ritmos, tres emociones pero, sobre todo, un día cualquiera. Tempore explora la fascinación que siento por las imágenes cotidianas que transitan en la vida de una mujer. "Con esta colección pretendo reflejar lo sensorial del acto de vestirse a diario: aquello con lo que te vistes cambia la forma en que te sientes", asegura Fely Campo. Una colección de 27 looks que, en su puesta en escena, adquiere la estructura poética de un Sijô coreano, para crear una narración sobre el día a día que impacta en lo instantáneo, a través de tres tiempos, tres frases, tres composiciones en continuo movimiento: la primera, un boceto sutil de la mañana, casi una helada en el amanecer, las primeras siluetas del día con tejidos tan esenciales como el paño o el tweed que florecen amarillos y cálidos en el cénit; la segunda, las tonalidades magentas y granates crean patrones vibrantes, las prendas adquieren volúmenes que contrastan con piezas más entalladas, el día fluye para observar, admirar y sentir tactos diversos como el tweed, el paño, los rasos, el tafetán y las gasas; la tercera, un centelleo sobre la oscuridad, una melodía de emociones atraviesa el armario femenino, un giro hacia los contrastes absolutos que llegan con la noche, los volúmenes se teatralizan. Tempore es una propuesta sensorial para una mujer que seduce en su día a día, que apuesta por la moda de autor y que desea prendas versátiles. Una mujer que entiende la moda como forma de expresión. Tempore nace como tres colecciones, tres imágenes seductoras, tres maneras de entender la belleza que, como un parpadeo, aparecen y desaparecen construyendo la moda de cada momento.',
  },
  {
    slug: 'nagare',
    nombre: 'Nagare',
    temporada: 'SS23',
    medios: [{ src: '/img/collections/runway/ss23-nagare/fely-campo-pasarela-nagare-portada.webp' }],
    looks: looksNagare,
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=pltWOtS6Yjo',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-nagare-video-desfile.webp',
      titulo: 'Nagare SS23 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: 'Una incansable búsqueda de la belleza. Así es como entiendo el fluir de la moda de principio a fin; un lenguaje que se mueve incansable y en el que encuentro el equilibrio entre la belleza y el ruido de nuestra forma de vida actual. En "Nagare" la sensualidad empapa el ritmo urbano de ciudades como Madrid, Tokio o Nueva York, sorprendentes urbes en plena vibración con las que aludo a nociones tales como la vorágine, la vibración y la pulsión, pero que también evocan quietud, sutileza y deseo, a través de tejidos y patrones que desean participar de ese bullicio. Una colección de prêt-à-porter de lujo con la que quiero representar el movimiento de nuestro ritmo de vida actual. Patrones que aman la sutileza; tejidos que se tornan vulnerables al ruido, al vaivén, al fluir, en definitiva, al movimiento de la mujer que vive con ellos. Con "Nagare" quiero crear una imagen sensorial contemporánea sobre el concepto de la fluidez, con prendas dúctiles y versátiles que reflejan el sentir de la mujer actual que busca moda de autor española, consciente de la necesidad de consumir moda sostenible. Una colección que refleje el "Nagare" de nuestro tiempo: un ballet clásico que fluye con el sonido de la ruidosa ciudad. "Nagare" es para mí una pulsión, una antítesis de lo rígido, la búsqueda de la belleza en pleno movimiento.',
  },
  {
    slug: 'diafonia',
    nombre: 'Diafonía',
    temporada: 'AW23',
    medios: [{ src: '/img/collections/runway/fw23-diafonia/fely-campo-pasarela-diafonia-portada.webp' }],
    looks: looksDiafonia,
    videoEnlace: {
      href: 'https://www.youtube.com/watch?v=RUXSKobgKIA&t=3s',
      imagen: '/img/collections/runway/bts/fely-campo-pasarela-diafonia-video-desfile.webp',
      titulo: 'Diafonía AW23 - Desfile',
      meta: { es: 'Ver el desfile completo en YouTube', en: 'Watch the full show on YouTube' },
    },
    descripcion: 'Con esta colección de prêt-à-porter de lujo os proponemos un viaje, a través de un contrapunto de sensaciones, al admirar la sobrecogedora belleza de los balcones de las Arribes. Quien se haya asomado alguna vez a este paraje, habrá sentido esa salvaje caricia y la contundente delicadeza del sonido de ese paisaje. Los sentimientos encontrados se armonizan en looks que exponen el contraste de texturas. Las escenas más íntimas, la búsqueda de la belleza sutil y sensible, suena a través de finos rasos, transparencias, tejidos vaporosos y delicados reflejos que se abren paso sobre la fuerza de un paisaje más abrupto, compuesto por prendas de abrigo de tacto firme y tenaz como la lana. Las líneas de la colección más sobrias se componen de volúmenes sastre y oversize, trasladándonos con audacia a la magnitud de las texturas pétreas. Prendas que se comportan como una coraza, bajo las que el acoplamiento de una diafonía descubre una segunda línea más íntima, con una estética lencera, sensual y delicada. Un contrapunto de estéticas que plantea una visión de la moda versátil y atemporal. Diafonía construye un armario femenino que refleja la dureza y la delicadeza de un paisaje inspirador, a través de la contraposición de estéticas. En definitiva, una vertiginosa manera de acercarse al foco de toda la inspiración de Fely Campo: la mujer, su carácter, sus contradicciones, sus contrastes y su manera de sentir el momento actual; acompañada del sonido electromagnético de la diafonía para recorrer el incansable camino hacia la búsqueda de la belleza.',
  },
];
