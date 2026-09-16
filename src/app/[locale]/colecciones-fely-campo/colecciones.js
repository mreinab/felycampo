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
   "backstage" (opcional, ver RunwayBackstage.jsx en la ficha de
   colección): fotos de backstage, entre la descripción y la cuadrícula
   de looks — cuadrícula editorial de 10 columnas, no se pinta si el
   array está vacío. Solo La Colección tiene reportaje de backstage
   real (carpeta .../fw27-lacoleccion/backstage) — el resto no lleva
   este campo todavía.
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
    imagen: `/img/collections/runway/fw27-lacoleccion/FelyCampo_${String(numero).padStart(2, '0')}.webp`,
    productos,
    descripcion,
  };
});

// Dreaming (SS26): 29 looks, una foto cada uno (ver ss26-dreaming/
// dreaming-info.xlsx — mapeo 1:1 look→archivo, sin variantes de
// front/back que elegir, a diferencia de otras colecciones con varias
// fotos por look). Sin productos/descripción de ejemplo todavía (eso
// es solo de La Colección, ver looksLaColeccion arriba).
const looksDreaming = Array.from({ length: 29 }, (_, indice) => {
  const numero = indice + 1;
  return {
    imagen: `/img/collections/runway/ss26-dreaming/FelyCampo_${String(numero).padStart(2, '0')}-scaled.webp`,
    productos: [],
  };
});

// Self World (AW26): mismo criterio que Dreaming — 26 looks, una foto
// cada uno (ver fw26-selfworld/selfworld-info.xlsx).
const looksSelfWorld = Array.from({ length: 26 }, (_, indice) => {
  const numero = indice + 1;
  return {
    imagen: `/img/collections/runway/fw26-selfworld/FelyCampo_${String(numero).padStart(2, '0')}-scaled.webp`,
    productos: [],
  };
});

// Lei Zu (SS25): 29 looks, una foto cada uno (ver ss25-leizu/leizu-
// info.xlsx) — a mano en vez de generado: dos nombres de archivo
// irregulares (Look 3 trae un guion suelto al final, "LOOK-3-.webp";
// Look 7 es el único en .jpg, no .webp, "LOOK-7-scaled.jpg"), tal cual
// se entregaron.
const looksLeiZu = [
  'LOOK-1.webp', 'LOOK-2.webp', 'LOOK-3-.webp', 'LOOK-4.webp', 'LOOK-5.webp',
  'LOOK-6.webp', 'LOOK-7-scaled.jpg', 'LOOK-8.webp', 'LOOK-9.webp', 'LOOK-10.webp',
  'LOOK-11.webp', 'LOOK-12.webp', 'LOOK-13.webp', 'LOOK-14.webp', 'LOOK-15.webp',
  'LOOK-16.webp', 'LOOK-17.webp', 'LOOK-18.webp', 'LOOK-19.webp', 'LOOK-20.webp',
  'LOOK-21.webp', 'LOOK-22.webp', 'LOOK-23.webp', 'LOOK-24.webp', 'LOOK-25.webp',
  'LOOK-26.webp', 'LOOK-27.webp', 'LOOK-28.webp', 'LOOK-29.webp',
].map((archivo) => ({
  imagen: `/img/collections/runway/ss25-leizu/${archivo}`,
  productos: [],
}));

// The Way Here (AW25): 26 looks — cada uno trae varias fotos (3-6,
// ver fw25-thewayhere/thewayhere-info.xlsx), pero RunwayGaleria solo
// admite una imagen por look (ver RunwayGaleria.jsx: "imagen" en
// singular) así que aquí solo entra la primera — de cara, nunca de
// espalda, verificado a ojo (comparado el archivo "-1" con el último
// de la secuencia de cada look en varias colecciones: "-1" siempre es
// de frente). El look 9 es la excepción: no tiene archivo "-1", así
// que usa el siguiente disponible ("-2").
const looksTheWayHere = [
  'look1-1.webp', 'look2-1-scaled.webp', 'look3-1.webp', 'look4-1.webp', 'look5-1-scaled.webp',
  'look6-1-scaled.webp', 'look7-1-scaled.webp', 'look8-1.webp', 'look9-2.webp', 'look10-1-scaled.webp',
  'look11-1.webp', 'look12-1-scaled.webp', 'look13-1-scaled.webp', 'look14-1.webp', 'look15-1-scaled.webp',
  'look16-1.webp', 'look17-1-scaled.webp', 'look18-1-scaled.webp', 'look19-1-scaled.webp', 'look20-1.webp',
  'look21-1-scaled.webp', 'look22-1-scaled.webp', 'look23-1-scaled.webp', 'look24-1-scaled.webp', 'look25-1-scaled.webp',
  'look26-1-scaled.webp',
].map((archivo) => ({
  imagen: `/img/collections/runway/fw25-thewayhere/FelyCampo-Runways-Thewayhere-otono-invierno-2024-2025-${archivo}`,
  productos: [],
}));

// Zigurat (SS24): 26 looks — a diferencia de The Way Here, aquí SÍ es
// uniforme: cada look trae siempre un archivo "-1-scaled" de frente
// (verificado a ojo en el look 1), así que se genera igual que Dreaming/
// Self World en vez de listarlo a mano.
const looksZigurat = Array.from({ length: 26 }, (_, indice) => {
  const numero = indice + 1;
  return {
    imagen: `/img/collections/runway/ss24-zigurat/FelyCampo-Runways-Zigurat-primavera-verano-2024-look${numero}-1-scaled.webp`,
    productos: [],
  };
});

// Tempore (AW24): 27 looks — cada uno trae varias fotos de pasarela
// (normalmente "-1-scaled" a "-5-scaled", de frente a espalda, más
// alguna suelta sin relación de orden) además de recortes de prenda
// individual (chaleco/falda/vestido/etc., descartados aquí igual que
// en el resto de colecciones). A mano en vez de generado: el look 10
// no tiene archivo "-1" (empieza en "-2"), y los looks 25/26 pegan el
// número de foto directamente al número de look sin guion
// ("look251-scaled.webp" en vez de "look25-1-scaled.webp") — verificado
// tal cual existe en disco.
const looksTempore = [
  'look1-1-scaled.webp', 'look2-1-scaled.webp', 'look3-1-scaled.webp', 'look4-1-scaled.webp', 'look5-1-scaled.webp',
  'look6-1-scaled.webp', 'look7-1-scaled.webp', 'look8-1-scaled.webp', 'look9-1-scaled.webp', 'look10-2-scaled.webp',
  'look11-1-scaled.webp', 'look12-1-scaled.webp', 'look13-1-scaled.webp', 'look14-1-scaled.webp', 'look15-1-scaled.webp',
  'look16-1-scaled.webp', 'look17-1-scaled.webp', 'look18-1-scaled.webp', 'look19-1-scaled.webp', 'look20-1-scaled.webp',
  'look21-1-scaled.webp', 'look22-1-scaled.webp', 'look23-1-scaled.webp', 'look24-1-scaled.webp', 'look251-scaled.webp',
  'look261-scaled.webp', 'look27-1-scaled.webp',
].map((archivo) => ({
  imagen: `/img/collections/runway/fw24-tempore/FelyCampo-Runways-Tempore-Otono-invierno-2023-2024-${archivo}`,
  productos: [],
}));

// Nagare (SS23): 26 looks — casi todos tienen "-1.webp" de frente,
// salvo el 1 y el 16: su fila del info.xlsx incluye por error un
// archivo de OTRO look pegado sin guion ("look12.webp" es en realidad
// de look 12, no de look 1; "look161.webp" es ambiguo con look 16 —
// se descartan ambos por seguridad) así que caen a "-2.webp", también
// de frente (verificado a ojo). Recortes de prenda ("-mono",
// "-manguitos") descartados igual que en el resto de colecciones.
const looksNagare = [
  'look1-2.webp', 'look2-1.webp', 'look3-1.webp', 'look4-1.webp', 'look5-1.webp',
  'look6-1.webp', 'look7-1.webp', 'look8-1.webp', 'look9-1.webp', 'look10-1.webp',
  'look11-1.webp', 'look12-1.webp', 'look13-1.webp', 'look14-1.webp', 'look15-1.webp',
  'look16-2.webp', 'look17-1.webp', 'look18-1.webp', 'look19-1.webp', 'look20-1.webp',
  'look21-1.webp', 'look22-1.webp', 'look23-1.webp', 'look24-1.webp', 'look25-1.webp',
  'look26-1.webp',
].map((archivo) => ({
  imagen: `/img/collections/runway/ss23-nagare/FelyCampo-Runways-Nagare-primaveraverano-2023-${archivo}`,
  productos: [],
}));

// Diafonía (AW23): 25 looks — carpeta "Look-N_LookBook..." (sesión de
// estudio de Kristen Wicce, verificada a ojo: WEB-1 es de frente,
// WEB-4 es de espalda) más los recortes de prenda sueltos
// "FelyCampo-Runways-otonoinvierno-diafonia-lookN-{prenda}.jpg"
// (descartados, igual que en el resto de colecciones). Todos los
// looks usan "WEB-1", salvo dos nombres irregulares tal cual existen
// en disco: el look 2 es "WEB-83-1" (arrastra un número de sesión
// previo) y el look 17 es "WEB-1-" (guion suelto al final).
const looksDiafonia = [
  'Look-1_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-2_LookBook_Fely_Campo_Kristen_Wicce_WEB-83-1.webp',
  'Look-3_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-4_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-5_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-6_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-7_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-8_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-9_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-10_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-11_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-12_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-13_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-14_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-15_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-16_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-17_LookBook_Fely_Campo_Kristen_Wicce_WEB-1-.webp',
  'Look-18_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-19_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-20_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-21_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-22_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-23_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-24_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
  'Look-25_LookBook_Fely_Campo_Kristen_Wicce_WEB-1.webp',
].map((archivo) => ({
  imagen: `/img/collections/runway/fw23-diafonia/${archivo}`,
  productos: [],
}));

export const COLECCIONES = [
  {
    slug: 'la-coleccion',
    nombre: 'La Colección',
    temporada: 'AW27',
    medios: [{ src: '/img/collections/runway/fw27-lacoleccion/backstage/HERO-2.jpg' }],
    looks: looksLaColeccion,
    descripcion: 'Esta colección celebra la riqueza de los tejidos y la elegancia de sus combinaciones. Desde la suavidad y el brillo del satén hasta la textura envolvente del tweed y los brocados, cada material aporta carácter y sofisticación. Los paillettes y la paleta que va del beige al negro, con delicados toques de rosa viejo, añaden un juego de luces y matices que atraen la mirada y enriquecen cada prenda. Los abrigos se presentan con formas envolventes y el prêt-à-porter se caracteriza por su versatilidad, capaz de transformarse del día a la noche con pequeños cambios en los accesorios. Todos los tejidos han sido seleccionados por su calidad y sostenibilidad, asegurando que las prendas puedan disfrutarse temporada tras temporada, de un armario a otro, con elegancia y conciencia.',
    video: '/img/landing/FW27-Hero3.mp4',
    backstage: [
      '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-30.jpg',
      '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-183.jpg',
      '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-48.jpg',
      '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-58.jpg',
      '/img/collections/runway/fw27-lacoleccion/backstage/FelyCampo_AW2026_KristenWicce_ALTA-79.jpg',
      '/img/collections/runway/fw27-lacoleccion/backstage/FRAMAE_STUDIO_FELY_CAMPO_036.jpg',
    ],
  },
  {
    slug: 'dreaming',
    nombre: 'Dreaming',
    temporada: 'SS26',
    medios: [{ src: '/img/collections/runway/ss26-dreaming/dreaming-cover.jpg' }],
    looks: looksDreaming,
    descripcion: 'Soñar es un espacio no lineal sin pasado, presente ni futuro. Atemporal, donde el caos de las tendencias es una irrelevancia pasajera, donde la realidad es moldeada por quien sueña. Soñar es dar voz a la imaginación, permitir que la creatividad y el conocimiento se unan, dar a la realidad una forma que existe en un ahora atemporal. La pasión que impulsa a soñar creativamente es la realidad de una mujer. En esta colección, Fely Campo ha apostado no por el espectáculo, sino por la mujer, por una mujer cuya belleza se refleja en los estilos de esta colección, por una mujer que reconoce que el estilo va más allá del capricho de una tendencia. Con estos tejidos, Fely Campo ha diseñado una colección que una mujer puede llevar.',
  },
  {
    slug: 'self-world',
    nombre: 'Self World',
    temporada: 'AW26',
    medios: [{ src: '/img/collections/runway/fw26-selfworld/selfworld-cover.jpg' }],
    looks: looksSelfWorld,
    descripcion: 'Self <>World. Interacción entre el «yo» (self) y el «mundo» (world). Conexión continua entre nuestra identidad interna y el entorno que nos rodea. He elegido este título para esta colección porque la moda es una declaración íntima: un reflejo de cómo deseamos que el mundo nos contemple y de cómo, a su vez, el mundo nos contempla. Durante los últimos dos siglos, la moda se ha democratizado, convirtiéndose en un lenguaje universal que nos permite expresar tanto nuestro estilo individual como nuestro sentido de pertenencia. El exterior se convierte en un espejo del yo interior, una danza de formas, texturas y colores que revela quiénes somos y, a veces, quiénes anhelamos ser. Este proceso ha liberado los límites del color, la tela y el diseño, dándonos la libertad de transformarnos sin traicionar la esencia que llevamos dentro, respetando las sensibilidades culturales que compartimos hoy. Pero, ante todo, esta colección honra la sostenibilidad. Intento crear diseños que trasciendan lo efímero y la urgencia de lo nuevo por lo nuevo, prendas que irradien elegancia y estilo, no solo hoy, sino también en el mañana. Cada estilo de diseño ha sido creado para que cada mujer, sin importar quién sea, se enfrente al mundo con ropa elegante y elaborada que refleje la belleza interna inherente de cada mujer. «La belleza está en los ojos de quien la contempla, ya sea en los tuyos o en los míos». Este es un homenaje a las texturas y a la magia de las superposiciones. Desde la dulzura envolvente del tweed y la calidez aterciopelada hasta el destello sutil del satén y las aplicaciones en relieve, cada material evoca épocas y estilos que resuenan en armonía. El terciopelo se entrelaza con lentejuelas y bordados, creando piezas que seducen al tacto y deslumbran por su riqueza y opulencia. Los tejidos pesados, como el tweed y la lana, dialogan en contraste con la ligereza etérea de la seda y otros textiles ligeros, logrando un equilibrio sublime entre estructura y fluidez.',
  },
  {
    slug: 'lei-zu',
    nombre: 'Lei Zu',
    temporada: 'SS25',
    medios: [{ src: '/img/collections/runway/ss25-leizu/leizu-cover.jpg' }],
    looks: looksLeiZu,
    descripcion: 'Atravesar una ruta insospechada: la delicia de recorrer la ruta de la seda ondulante bajo nuestros pies, acompañados de la luz de un cimbreante sol, recorriendo el hilo que envuelve una historia de leyenda y misterio. Fely Campo presenta "Lei Zu" como una colección de prêt-à-porter de lujo que nos habla de su viaje desde Europa a China. "Lei Zu" es un paseo estético a través de 25 sofisticados looks que parten del magistral uso del tweed hasta los patrones más livianos protagonizados por las sedas artesanales chinas traídas por la diseñadora en su reciente viaje a Guangzhou, entremezclándose con los volúmenes de los tafetanes, la esencialidad de los linos, los brocados estampados y la sutileza de las organzas y tules bordados con paillets. En todo su recorrido "Lei Zu" es una oda absoluta a la riqueza del tejido que alcanza su máxima expresión gracias a las siluetas y el cuidado de los cortes. Las superposiciones de piezas, los volúmenes generados por el tafetán, los cortes de las siluetas sastre más estructuradas se hacen protagonistas de las primeras etapas de ese camino en tweeds y trajes de lino que se van deconstruyendo para mostrarnos figuras más lenceras y sensuales con vestidos camiseros y maxi kaftanes de encajes hasta llegar al hipnótico movimiento de los vestidos de las colas de los vestidos más vaporosos. "Lei Zu" acaricia la mirada de quien la observa con tonalidades empolvadas: cristalinos azules, nacarados blancos, suaves lilas y cálidos beige que se sorprenden con la acidez de las limas y los radiantes pistachos. Un elogio a la luz para alcanzar al final del camino el ansiado titilar de pinceladas doradas sobre las negras sedas chinas. "Lei Zu" no es solo una colección. Ni siquiera es una leyenda. Es un viaje al origen de la moda. Es la historia que ya cautivó a Baricco transformada en prendas. Es la magia de transitar la ruta de la seda.',
  },
  {
    slug: 'the-way-here',
    nombre: 'The Way Here',
    temporada: 'AW25',
    medios: [{ src: '/img/collections/runway/fw25-thewayhere/thewayhere-cover.jpg' }],
    looks: looksTheWayHere,
    descripcion: '"Una decisión de mi madre me puso por primera vez ante una aguja y un dedal… Sin saberlo, aquel día comenzó a hilvanarse mi vida. Y con ella, esta colección." "The Way Here", el camino hasta aquí, da título a la colección más personal de Fely Campo, vinculada a la emoción y el pensamiento resultado de los 50 años que lleva dedicada a este oficio. En definitiva, su amor por la moda. Un amor y un camino que se materializa en esta colección de prêt-à-porter de lujo. Un viaje creativo hacia el interior, que se erige desde las tonalidades de su color fetiche, el negro: azabache, grafito, antracita, humo, ébano, para envolverse con el fulgor brillante de los tonos fuego y caldero, que se inundan de frescura con las distintas tonalidades verdes. La luminosidad del plata y el dorado junto al crema le otorgan el toque de madurez y sobriedad a la paleta de color de esta colección. Un recorrido a través de la variedad de tejidos: los cálidos paños, los atrevidos lamés, los esenciales tafetanes, los mágicos brocados y las novedosas organzas, fusionan la pasión terrenal con la más experimental de su trayectoria. The Way Here muestra, en su puesta en escena, personal, delicada, enérgica… una nueva perspectiva, en la que se palpa mi pasión, para sentir el tacto de la tela. 26 looks que han viajado para nacer tras estos 50 años: un itinerario que florece a través de líneas más sencillas, con la delicadeza del amor que va brotando, pero con la pasión imparable que te empuja a crear; un amor que avanza y te hipnotiza a través de siluetas que con cada look se tornan más sofisticadas, mostrando la mirada profunda de la diseñadora al conocimiento del oficio, donde el patrón cobra una importancia vital. En palabras de Fely Campo: "The Way Here es la celebración, el crecimiento y la pulsión creativa de 50 años dedicada a la búsqueda de la belleza a través del tejido, del patrón, de mi bien más preciado. En definitiva, mi vida."',
  },
  {
    slug: 'zigurat',
    nombre: 'Zigurat',
    temporada: 'SS24',
    medios: [{ src: '/img/collections/runway/ss24-zigurat/zigurat-cover.jpg' }],
    looks: looksZigurat,
    descripcion: 'Hedonismo, libertad, opulencia, nostalgia y glamour. Esta colección de prêt-à-porter de lujo emerge en Cuba: Fely Campo nos invita a escalar un "Zigurat" de emociones a través de 26 looks que se empapan del ritmo Decó. El Art Decó viste esta colección de patrones puros, que se construyen con la limpieza y sobriedad de los edificios más caprichosos de la Habana. Siluetas y cortes geométricos se entrelazan con tejidos inspirados en el lenguaje ornamental art decó: brocados inundados de juegos visuales 3D con motivos naturales y geométricos; mosaicos orgánicos que se contraponen junto a la verticalidad de las líneas del otomán y los tweeds más arriesgados. Frente a la calma voluminosa de los tafetanes surgen las formas sinuosas de los rasos en movimiento. Los colores rinden homenaje a la vibrante esencia de Cuba y al esplendor del Art Decó. La paleta cromática es diversa, abarcando desde tonos neón y metalizados hasta tonalidades suaves y luminosas. El blanco, como hilo conductor, brilla en conjunto con los vibrantes matices de rosa, azul y amarillo. El uso magistral de tonos metálicos en plata y dorado añade un toque de lujo y sofisticación a la colección. Las siluetas se inspiran en patrones geométricos y cortes rectos característicos del Art Decó. Los escotes cuadrados, los vestidos de siluetas sueltas y los adornos de líneas aportan una estética nítida y elegante. Detalles como mangas con cintas y faldas con volúmenes completan la visión única de Fely Campo. La colaboración artística es un pilar fundamental en esta colección. El artista plástico Álvaro García-Miguel ha creado una pintura digital exclusiva que fusiona el Art Decó con el expresionismo, reflejando la esencia misma de la colección. La realizadora 3D Cami Alberti ha dado vida a los espacios cubanos y ha permitido una inmersión en la obra de Álvaro, fusionando lo terrenal con lo tecnológico. La música, compuesta especialmente para el desfile por Jorge Gamarra (miembro del equipo de Cami Alberti), fusiona ritmos cubanos ancestrales con toques electrónicos, capturando la vitalidad de la cultura y la esencia de la firma. La pieza "Zigurat", coreografiada por el destacado creador de danza española Jose Manuel Buzón e interpretada por 7 talentosos bailarines de la Compañía de Danza Ballet de Cámara de Madrid, perteneciente a la Fundación de la Danza «Alicia Alonso», se entrelaza de manera espectacular con la colección y cierra el desfile en un deslumbrante acto. Contraste, formas, estructura, cromatismo, ornamentos. "Zigurat" crea un universo sentimental que seduce y atraviesa esta propuesta de moda viva e intensa de la diseñadora Fely Campo.',
  },
  {
    slug: 'tempore',
    nombre: 'Tempore',
    temporada: 'AW24',
    medios: [{ src: '/img/collections/runway/fw24-tempore/tempore-cover.jpg' }],
    looks: looksTempore,
    descripcion: 'Mañana, tarde y noche. Tres momentos, tres ritmos, tres emociones pero, sobre todo, un día cualquiera. Tempore explora la fascinación que siento por las imágenes cotidianas que transitan en la vida de una mujer. "Con esta colección pretendo reflejar lo sensorial del acto de vestirse a diario: aquello con lo que te vistes cambia la forma en que te sientes", asegura Fely Campo. Una colección de 27 looks que, en su puesta en escena, adquiere la estructura poética de un Sijô coreano, para crear una narración sobre el día a día que impacta en lo instantáneo, a través de tres tiempos, tres frases, tres composiciones en continuo movimiento: la primera, un boceto sutil de la mañana, casi una helada en el amanecer, las primeras siluetas del día con tejidos tan esenciales como el paño o el tweed que florecen amarillos y cálidos en el cénit; la segunda, las tonalidades magentas y granates crean patrones vibrantes, las prendas adquieren volúmenes que contrastan con piezas más entalladas, el día fluye para observar, admirar y sentir tactos diversos como el tweed, el paño, los rasos, el tafetán y las gasas; la tercera, un centelleo sobre la oscuridad, una melodía de emociones atraviesa el armario femenino, un giro hacia los contrastes absolutos que llegan con la noche, los volúmenes se teatralizan. Tempore es una propuesta sensorial para una mujer que seduce en su día a día, que apuesta por la moda de autor y que desea prendas versátiles. Una mujer que entiende la moda como forma de expresión. Tempore nace como tres colecciones, tres imágenes seductoras, tres maneras de entender la belleza que, como un parpadeo, aparecen y desaparecen construyendo la moda de cada momento.',
  },
  {
    slug: 'nagare',
    nombre: 'Nagare',
    temporada: 'SS23',
    medios: [{ src: '/img/collections/runway/ss23-nagare/nagare-cover.jpg' }],
    looks: looksNagare,
    descripcion: 'Una incansable búsqueda de la belleza. Así es como entiendo el fluir de la moda de principio a fin; un lenguaje que se mueve incansable y en el que encuentro el equilibrio entre la belleza y el ruido de nuestra forma de vida actual. En "Nagare" la sensualidad empapa el ritmo urbano de ciudades como Madrid, Tokio o Nueva York, sorprendentes urbes en plena vibración con las que aludo a nociones tales como la vorágine, la vibración y la pulsión, pero que también evocan quietud, sutileza y deseo, a través de tejidos y patrones que desean participar de ese bullicio. Una colección de prêt-à-porter de lujo con la que quiero representar el movimiento de nuestro ritmo de vida actual. Patrones que aman la sutileza; tejidos que se tornan vulnerables al ruido, al vaivén, al fluir, en definitiva, al movimiento de la mujer que vive con ellos. Con "Nagare" quiero crear una imagen sensorial contemporánea sobre el concepto de la fluidez, con prendas dúctiles y versátiles que reflejan el sentir de la mujer actual que busca moda de autor española, consciente de la necesidad de consumir moda sostenible. Una colección que refleje el "Nagare" de nuestro tiempo: un ballet clásico que fluye con el sonido de la ruidosa ciudad. "Nagare" es para mí una pulsión, una antítesis de lo rígido, la búsqueda de la belleza en pleno movimiento.',
  },
  {
    slug: 'diafonia',
    nombre: 'Diafonía',
    temporada: 'AW23',
    medios: [{ src: '/img/collections/runway/fw23-diafonia/diafonia-cover.jpg' }],
    looks: looksDiafonia,
    descripcion: 'Con esta colección de prêt-à-porter de lujo os proponemos un viaje, a través de un contrapunto de sensaciones, al admirar la sobrecogedora belleza de los balcones de las Arribes. Quien se haya asomado alguna vez a este paraje, habrá sentido esa salvaje caricia y la contundente delicadeza del sonido de ese paisaje. Los sentimientos encontrados se armonizan en looks que exponen el contraste de texturas. Las escenas más íntimas, la búsqueda de la belleza sutil y sensible, suena a través de finos rasos, transparencias, tejidos vaporosos y delicados reflejos que se abren paso sobre la fuerza de un paisaje más abrupto, compuesto por prendas de abrigo de tacto firme y tenaz como la lana. Las líneas de la colección más sobrias se componen de volúmenes sastre y oversize, trasladándonos con audacia a la magnitud de las texturas pétreas. Prendas que se comportan como una coraza, bajo las que el acoplamiento de una diafonía descubre una segunda línea más íntima, con una estética lencera, sensual y delicada. Un contrapunto de estéticas que plantea una visión de la moda versátil y atemporal. Diafonía construye un armario femenino que refleja la dureza y la delicadeza de un paisaje inspirador, a través de la contraposición de estéticas. En definitiva, una vertiginosa manera de acercarse al foco de toda la inspiración de Fely Campo: la mujer, su carácter, sus contradicciones, sus contrastes y su manera de sentir el momento actual; acompañada del sonido electromagnético de la diafonía para recorrer el incansable camino hacia la búsqueda de la belleza.',
  },
];
