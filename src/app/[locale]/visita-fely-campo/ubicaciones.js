/* Datos de los 4 ateliers/showroom — ver ListadoUbicaciones.jsx.
   "ciudad" alimenta los chips de filtro (Salamanca/Madrid/Oviedo) ahí
   mismo. Sin imagen propia por sede: la galería de cada tarjeta sale
   del fondo común de public/img/talleres/ (ver MEDIOS_TALLERES en
   ListadoUbicaciones.jsx). Nombre, dirección y teléfonos no llevan
   traducción (mismo texto en cualquier idioma); horario y descripción
   sí ({es, en}, mismo criterio bilingüe que disenoMock en
   components/admin/mockData.js). "horario: null" (Madrid) se resuelve
   con la nota "showroomNota" en su lugar. */

export const UBICACIONES = [
  {
    id: 'salamanca-novias',
    ciudad: 'Salamanca',
    nombre: 'Atelier Novias Salamanca',
    direccion: ['C/ Laguna Negra 17-19', '37008 Salamanca'],
    telefonos: ['+34 923 000 000', '+34 683 703 644'],
    whatsapp: '+34 683 703 644',
    horario: { es: 'Lun - Vie: 09:30 - 17:30', en: 'Mon - Fri: 9:30am - 5:30pm' },
    descripcion: {
      es: 'Espacio dedicado enteramente a la novia.',
      en: 'Bridal atelier: fittings, pattern-making and made-to-measure gowns.',
    },
  },
  {
    id: 'salamanca-fiesta',
    ciudad: 'Salamanca',
    nombre: 'Atelier Fiesta Salamanca',
    direccion: ['C/ Toro 32', '37002 Salamanca'],
    telefonos: ['+34 923 111 222'],
    whatsapp: '+34 611 222 333',
    horario: { es: 'Lun - Vie: 09:30 - 17:30', en: 'Mon - Fri: 9:30am - 5:30pm' },
    descripcion: {
      es: 'Espacio dedicado a colecciones de fiesta. Además de contar con una sección de nuestra línea pret-a-porter.',
      en: 'Eveningwear atelier: statement pieces for special occasions.',
    },
  },
  {
    id: 'oviedo',
    ciudad: 'Oviedo',
    nombre: 'Atelier Oviedo',
    direccion: ['C/ Uría 12', '33003 Oviedo'],
    telefonos: ['+34 985 000 000'],
    whatsapp: '+34 622 333 444',
    horario: { es: 'Lun - Sáb: 10:30 - 14:00 y 17:00 - 20:30', en: 'Mon - Sat: 10:30am - 2pm & 5pm - 8:30pm' },
    descripcion: {
      es: 'Espacio dedicado a colecciones de fiesta. Además de contar con una sección de colecciones de novia.',
      en: 'Boutique and atelier in central Oviedo: ready-to-wear and made-to-order pieces.',
    },
  },
  {
    id: 'madrid',
    ciudad: 'Madrid',
    nombre: 'Showroom Madrid',
    direccion: ['C/ Jorge Juan 12', '28001 Madrid'],
    telefonos: ['+34 910 000 000'],
    whatsapp: '+34 633 444 555',
    horario: null,
    descripcion: {
      es: 'Espacio Showroom y Atelier a medida. Cuenta con las últimas colecciones de prêt-à-porter de lujo presentadas en Mercedes Benz Fashion Week Madrid, además de espacios dedicados para las colecciones de novia y fiesta.',
      en: 'Discover the full collection in an intimate space, in the heart of the Golden Mile.',
    },
  },
];
