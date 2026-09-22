/* Contenido editorial de /pret-a-porter, antes de la cuadrícula (ver
   page.js) — mismo criterio que noviaEditorial.js/fiestaEditorial.js
   (ver ahí el detalle completo del patrón): texto largo y propio de
   esta página, bilingüe por campo ({es, en}), no encaja en
   messages/{locale}.json.

   Mismo patrón que /atelier/novias y /atelier/fiesta: dos BloqueSeccion
   en zigzag + un RunwayBackstage de fotos fuertes, aquí ANTES de la
   cuadrícula de producto real (a diferencia de esas dos páginas, aquí
   la cuadrícula sigue viva al final — no se comenta, ver page.js).
   Fotos "de decoración" (a petición explícita, selección cerrada): la
   mayoría de public/img/collections/fiesta/pret-a-porter/ (lookbook de
   estudio KristenWicce, WEB-*, y editorial de la colección
   Otoño-Invierno 24/25, LOOK-*), más dos de
   public/img/collections/runway/fw27-lacoleccion/ (pasarela de La
   Colección FW27). Texto en general del prêt-à-porter, sin nombrar
   ninguna colección/temporada de las fotos.

   "descripcion": frases cortas para RunwayDescripcion (array) — la
   entrada a la sección, antes de los bloques.

   "bloques": dos BloqueSeccion en zigzag (invertido alterna por índice
   en page.js).

   "backstage": selección a mano de fotos fuertes/editoriales para
   RunwayBackstage, sin repetir las dos ya usadas en "bloques". */

const RUTA = '/img/collections/fiesta/pret-a-porter';
const RUTA_FW27 = '/img/collections/runway/fw27-lacoleccion';

export const PRET_A_PORTER_EDITORIAL = {
  descripcion: {
    es: [
      'La misma firma, para el día a día.',
      'El mismo cuidado, ahora listo para llevar.',
    ],
    en: [
      'The same house, for everyday life.',
      'The same care, now ready to wear.',
    ],
  },

  bloques: [
    {
      imagen: `${RUTA}/FelyCampo_pretaporter_otono_invierno_24_25_LOOK-9-4-2.jpg`,
      titulo: {
        es: 'Vestir sin esperar',
        en: 'Dressing without waiting',
      },
      texto: {
        es: 'La colección prêt-à-porter recoge la misma manera de construir cada prenda, pero lista para llevar: patrones estudiados, tejidos con carácter y un punto de diseño que no pasa desapercibido.',
        en: 'The ready-to-wear collection carries the same way of building every garment, but ready to wear: carefully studied patterns, fabrics with character and a point of design that never goes unnoticed.',
      },
    },
    {
      imagen: `${RUTA_FW27}/FelyCampo_19.webp`,
      titulo: {
        es: 'Color y volumen, todos los días',
        en: 'Color and volume, every day',
      },
      texto: {
        es: 'Abrigos con volumen, colores que se atreven y detalles hechos a mano: prendas pensadas para salir del taller ya con personalidad propia.',
        en: 'Coats with volume, colors that dare and hand-finished details: garments designed to leave the workshop already full of personality.',
      },
    },
  ],

  backstage: [
    `${RUTA}/FelyCampo_pretaporter_otono_invierno_24_25_LOOK-8-3-1.jpg`,
    `${RUTA_FW27}/FelyCampo_08.webp`,
    `${RUTA}/FelyCampo_pretaporter_otono_invierno_24_25_LOOK-2-3-1.jpg`,
    `${RUTA}/FelyCampo_Lookbook_KristenWicce_WEB-28.webp`,
    `${RUTA}/FelyCampo_pretaporter_otono_invierno_24_25_LOOK-13-1-1.jpg`,
    `${RUTA}/FelyCampo_pretaporter_otono_invierno_24_25_LOOK-16-1-1.jpg`,
  ],
};
