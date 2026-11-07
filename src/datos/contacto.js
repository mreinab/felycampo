// contacto.js
//
// Los datos de contacto generales de Fely Campo y sus redes sociales: un
// único sitio para toda la web. Lo edita «Contacto y redes» en el admin.
// Lectura y reglas: src/lib/contacto.js. Ver docs/admin-contacto.md.
// Migrado de donde estaban repartidos: el número de BotonWhatsapp.jsx, las
// redes de Footer.jsx y lib/datosEstructurados.js, el email y el teléfono de
// /ayuda/atencion-cliente, y el mensaje de WhatsApp y el horario de
// messages/*.json (whatsappFlotante.mensaje, atencionCliente.horario).
// (Los datos de cada atelier, con su dirección y teléfonos, están aparte:
// src/datos/ateliers.js.)
//
//   email            el email de contacto (Atención al cliente, avisos de
//                    error de los formularios, Envíos).
//   telefono         el teléfono de Atención al cliente.
//   horario          el horario de Atención al cliente.
//   whatsapp         el número del botón flotante de WhatsApp.
//   mensajeWhatsapp  el texto con el que se abre la conversación.
//   redes            el enlace de cada red ('' = no sale en el pie).

export const CONTACTO = {
  email: 'info@felycampo.com',
  telefono: '+34 659 00 62 57',
  horario: { es: 'Lun - Vie: 8:00 - 16:00', en: 'Mon - Fri: 8:00 AM - 4:00 PM' },
  whatsapp: '+34 659 00 62 57',
  mensajeWhatsapp: {
    es: 'Hola, me gustaría recibir información sobre Fely Campo.',
    en: 'Hello, I would like some information about Fely Campo.',
  },
  redes: {
    instagram: 'https://www.instagram.com/felycampo/',
    facebook: 'https://www.facebook.com/fely.campo',
    youtube: 'https://www.youtube.com/channel/UCQeHEIrbwpFjAYtoGfzRUaA',
    tiktok: '',
    pinterest: '',
    linkedin: '',
  },
};
