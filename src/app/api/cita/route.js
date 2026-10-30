// POST /api/cita — solicitud de cita en atelier (formulario de
// /visita-fely-campo/cita). Valida los datos y envía dos emails vía
// Resend (API REST, sin dependencias):
//   1. Confirmación a la clienta, en su idioma.
//   2. Aviso al equipo (un único email: el formulario ya no pregunta el
//      atelier, lo decide el equipo al contactar), con "Responder"
//      apuntando a la clienta.
// Si falla el aviso al equipo, responde error y el formulario lo enseña
// (no se registra la conversión) — ver el detalle al final de POST.
// Envío, variables de entorno y modo sin clave: ver lib/emailFormularios.js
// (compartido con /api/consulta-vestido).

import { TIPOS_CITA } from '@/lib/citaAtelier';
import {
  EMAIL_VALIDO, destinatariosEquipo, enviarEmail, escapar, faltaConfiguracion, tabla, texto,
} from '@/lib/emailFormularios';

const ORIGEN = 'api/cita';

// Fecha "AAAA-MM-DD" válida y no pasada.
function fechaValida(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;
  const dia = new Date(`${fecha}T00:00:00Z`);
  if (Number.isNaN(dia.getTime()) || dia.toISOString().slice(0, 10) !== fecha) return false;
  const hoy = new Date().toISOString().slice(0, 10);
  return fecha >= hoy;
}

function fechaLegible(fecha, locale) {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

const TEXTOS_CLIENTA = {
  es: {
    asunto: 'Hemos recibido tu solicitud de cita — Fely Campo',
    saludo: (nombre) => `Hola ${nombre},`,
    cuerpo: (tipo) => `Gracias por pedir tu cita${tipo ? ` de ${tipo === 'novia' ? 'novia' : 'invitada'}` : ''} en Fely Campo. Nuestro equipo te escribirá en breve para concretar el atelier, el día y la hora.`,
    resumen: 'Estos son los datos que nos has enviado:',
    firma: 'Un abrazo,<br>El equipo de Fely Campo',
    etiquetas: { tipo: 'Tipo de cita', fecha: 'Fecha de la boda', telefono: 'Teléfono', mensaje: 'Mensaje' },
    tipos: { novia: 'Novia', invitada: 'Invitada' },
  },
  en: {
    asunto: 'We have received your appointment request — Fely Campo',
    saludo: (nombre) => `Hello ${nombre},`,
    cuerpo: (tipo) => `Thank you for requesting ${tipo ? `a ${tipo === 'novia' ? 'bridal' : 'guest'} appointment` : 'an appointment'} at Fely Campo. Our team will be in touch shortly to arrange the atelier, day and time.`,
    resumen: 'These are the details you sent us:',
    firma: 'Warm regards,<br>The Fely Campo team',
    etiquetas: { tipo: 'Appointment type', fecha: 'Wedding date', telefono: 'Phone', mensaje: 'Message' },
    tipos: { novia: 'Bride', invitada: 'Guest' },
  },
};

export async function POST(request) {
  const sinConfigurar = faltaConfiguracion(ORIGEN);
  if (sinConfigurar) return sinConfigurar;

  let datos;
  try {
    datos = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'json' }, { status: 400 });
  }

  // Campo trampa para bots (oculto en el formulario): si viene relleno,
  // se responde OK sin enviar nada.
  if (texto(datos.web)) return Response.json({ ok: true });

  const locale = datos.locale === 'en' ? 'en' : 'es';
  const solicitud = {
    // Opcional: el formulario ya no pregunta si es de novia o invitada.
    tipo: TIPOS_CITA.includes(datos.tipo) ? datos.tipo : null,
    fechaBoda: texto(datos.fechaBoda, 10),
    nombre: texto(datos.nombreCompleto, 120),
    email: texto(datos.email, 160),
    telefono: texto(datos.telefono, 40),
    codigoPostal: texto(datos.codigoPostal, 12),
    ciudad: texto(datos.ciudad, 80),
    mensaje: texto(datos.mensaje, 2000),
  };

  const valido = fechaValida(solicitud.fechaBoda)
    && solicitud.nombre && EMAIL_VALIDO.test(solicitud.email) && solicitud.telefono
    && solicitud.codigoPostal && solicitud.ciudad && datos.aceptaLegal === true;
  if (!valido) return Response.json({ ok: false, error: 'datos' }, { status: 422 });

  const t = TEXTOS_CLIENTA[locale];
  const filasResumen = [
    ...(solicitud.tipo ? [[t.etiquetas.tipo, t.tipos[solicitud.tipo]]] : []),
    [t.etiquetas.fecha, fechaLegible(solicitud.fechaBoda, locale)],
    [t.etiquetas.telefono, solicitud.telefono],
    ...(solicitud.mensaje ? [[t.etiquetas.mensaje, solicitud.mensaje]] : []),
  ];

  const emailClienta = {
    to: [solicitud.email],
    subject: t.asunto,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
<p>${escapar(t.saludo(solicitud.nombre))}</p>
<p>${escapar(t.cuerpo(solicitud.tipo))}</p>
<p>${escapar(t.resumen)}</p>${tabla(filasResumen)}
<p>${t.firma}</p></div>`,
  };

  const tipoEs = solicitud.tipo ? (solicitud.tipo === 'novia' ? 'NOVIA' : 'INVITADA') : '';
  const emailEquipo = {
    to: destinatariosEquipo(),
    reply_to: solicitud.email,
    subject: `Nueva cita ${tipoEs ? `${tipoEs} ` : ''}— ${solicitud.nombre} (boda ${fechaLegible(solicitud.fechaBoda, 'es')})`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
<p>Nueva solicitud de cita desde felycampo.com. Responde a este email para escribir directamente a la clienta.</p>${tabla([
      ...(tipoEs ? [['Tipo', tipoEs]] : []),
      ['Fecha de la boda', fechaLegible(solicitud.fechaBoda, 'es')],
      ['Nombre', solicitud.nombre],
      ['Email', solicitud.email],
      ['Teléfono', solicitud.telefono],
      ['Código postal', solicitud.codigoPostal],
      ['Ciudad', solicitud.ciudad],
      ['Idioma', locale.toUpperCase()],
      ['Mensaje', solicitud.mensaje || '—'],
    ])}</div>`,
  };

  // Primero el aviso al equipo: es el que no se puede perder. Si falla,
  // error y la clienta puede reintentar. Si falla solo la confirmación a
  // la clienta, la solicitud ya está en manos del equipo — se da por
  // buena (reintentar duplicaría el aviso) y queda en el log.
  try {
    await enviarEmail(emailEquipo, ORIGEN);
  } catch (error) {
    console.error('[api/cita] Error enviando el aviso al equipo:', error);
    return Response.json({ ok: false, error: 'envio' }, { status: 502 });
  }

  try {
    await enviarEmail(emailClienta, ORIGEN);
  } catch (error) {
    console.error('[api/cita] Aviso al equipo enviado, pero falló la confirmación a la clienta:', error);
  }

  return Response.json({ ok: true });
}
