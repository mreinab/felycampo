/* Datos de los talleres/proveedores con los que trabaja Fely Campo —
   ver page.js. Bilingüe por entrada ({es, en}), mismo criterio que
   "descripcion" en visita-fely-campo/ubicaciones.js.

   Solo el primer taller trae contenido real (texto proporcionado
   directamente); los otros 3 son placeholders explícitos — texto
   genérico + fotos de atelier/interior de public/img/talleres|atelier/
   ya usadas en visita-fely-campo o en la home — hasta que llegue el
   contenido real de cada uno.

   OJO con las imágenes: los dos .webp de public/img/talleres/ con
   nombre en hash (388bbd0..., c4fcfd2...) NO son fotos de taller —
   son AVIF de zapatos mal etiquetados con extensión .webp. No
   reutilizar aquí por error (ver historial: se usaron por error una
   vez y se corrigieron). */

const PLACEHOLDER_PARRAFO = {
  es: 'Contenido pendiente — texto y datos de este taller por recibir.',
  en: 'Content pending — this workshop’s text and details are still to come.',
};

export const TALLERES = [
  {
    id: 'taller-1',
    imagen: '/img/atelier/ateliernovia-lamedida-felycampo-2.webp',
    tipo: { es: 'Fabricante textil', en: 'Woven manufacturer' },
    distancia: { es: '17 km de nuestro estudio', en: '17 Km from our studio' },
    trabajadores: { es: 'Nº de trabajadoras 10', en: 'Nº workers 10' },
    liderazgo: { es: 'Negocio liderado por mujeres', en: 'Woman-lead business' },
    parrafos: {
      es: [
        'Esta proveedora lleva más de 37 años dedicada a la industria de la confección. Actualmente dirige un pequeño atelier, aunque lleno de luz. Cuenta con ocho costureras más y con su hijo, que se encarga principalmente de la logística, aunque también ayuda a rematar prendas cuando hace falta. Este taller está a 28 minutos en coche de nuestra sede, en una zona cultural en expansión.',
        'Colaborar con este atelier nos ha permitido crear prendas experimentales y de gran calidad, o como dice su propietaria, «hacer realidad los deseos de la diseñadora». Ella y las costureras cuentan con mucha experiencia y saben coser las sedas más finas y delicadas para que todo salga perfecto.',
        'El atelier no es solo una instalación de fabricación; es también un taller de desarrollo y producción. Este formato está desapareciendo poco a poco en España, y estamos muy orgullosas de habernos aliado con este tipo de empresas y de apoyarlas. Trabajan de una forma particular: no funcionan en cadena, sino que cada costurera confecciona la misma prenda de principio a fin. Aun así, se apoyan mutuamente, buscando siempre maneras de mejorar las prendas y su construcción.',
        'El lema de la propietaria para el atelier es el trabajo en equipo, y así se refleja en el ambiente de trabajo. Esta misma mentalidad está muy presente en el equipo de Paloma y en los otros pequeños talleres a los que recurre para externalizar algunas tareas, como el corte, el planchado, el lavado y el patronaje. Cada prenda que confecciona es un testimonio de su pasión.',
      ],
      en: [
        'This provider has been dedicated to the tailoring industry for over 37 years. She now runs a small—although full of light—atelier. She counts on eight other seamstresses and her son, who mainly takes care of logistics but will also help finish garments if needed. This atelier is located 28 minutes by car from our headquarters, in a growing cultural area.',
        'Partnering with this atelier has allowed us to create high-quality and experimental garments, as the owner says, "making the designer’s wishes come true." She and the seamstresses have a lot of experience and know how to sew the finest and most delicate silks to ensure everything comes out perfectly.',
        'The atelier is not just a manufacturing facility; it is also a development and production atelier. This format is slowly disappearing in Spain, and we are very proud to have partnered with and supported such companies. They work uniquely: they don’t work in an assembly line; instead, each seamstress produces the same garment from start to finish. However, they will offer mutual support to each other, always finding ways to improve garments and their construction.',
        'The owner’s motto towards the atelier is teamwork, which is reflected in the work environment. This mindset is also very present within Paloma’s team and the other small ateliers she supports to outsource some tasks such as cutting, ironing, washing, and pattern making. Every garment that she makes is a testament to her passion.',
      ],
    },
  },
  {
    id: 'taller-2',
    imagen: '/img/talleres/oviedo-atelier_fiesta_oviedo_felycampo_espacio_9-2048x1365.webp',
    tipo: { es: 'Taller — pendiente', en: 'Workshop — pending' },
    distancia: { es: '— km de nuestro estudio', en: '— Km from our studio' },
    trabajadores: { es: 'Nº de trabajadoras —', en: 'Nº workers —' },
    liderazgo: { es: '—', en: '—' },
    parrafos: { es: [PLACEHOLDER_PARRAFO.es], en: [PLACEHOLDER_PARRAFO.en] },
  },
  {
    id: 'taller-3',
    imagen: '/img/talleres/salamanca-ateliernovia-ateliernoviasalamanca-ubicacion-felycampo.webp',
    tipo: { es: 'Taller — pendiente', en: 'Workshop — pending' },
    distancia: { es: '— km de nuestro estudio', en: '— Km from our studio' },
    trabajadores: { es: 'Nº de trabajadoras —', en: 'Nº workers —' },
    liderazgo: { es: '—', en: '—' },
    parrafos: { es: [PLACEHOLDER_PARRAFO.es], en: [PLACEHOLDER_PARRAFO.en] },
  },
  {
    id: 'taller-4',
    imagen: '/img/talleres/madrid-atelier_madrid_fiesta_novia_medida.webp',
    tipo: { es: 'Taller — pendiente', en: 'Workshop — pending' },
    distancia: { es: '— km de nuestro estudio', en: '— Km from our studio' },
    trabajadores: { es: 'Nº de trabajadoras —', en: 'Nº workers —' },
    liderazgo: { es: '—', en: '—' },
    parrafos: { es: [PLACEHOLDER_PARRAFO.es], en: [PLACEHOLDER_PARRAFO.en] },
  },
];
