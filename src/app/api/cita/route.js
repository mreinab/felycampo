// POST /api/cita — solicitud de cita en atelier (formulario de
// /visita-fely-campo/cita). Valida los datos y envía dos emails vía
// Resend (API REST, sin dependencias):
//   1. Confirmación a la clienta, en su idioma.
//   2. Aviso al equipo del atelier elegido, con "Responder" apuntando a
//      la clienta.
// Si falla el aviso al atelier, responde error y el formulario lo enseña
// (no se registra la conversión) — ver el detalle al final de POST.
//
// Variables de entorno (ver .env.example):
//   RESEND_API_KEY          clave de Resend (dominio felycampo.com verificado allí)
//   CITA_EMAIL_REMITENTE    ej. "Fely Campo <citas@felycampo.com>"
//   CITA_EMAIL_SALAMANCA    destinatario(s) del aviso, separados por comas
//   CITA_EMAIL_MADRID
//   CITA_EMAIL_OVIEDO
// Sin RESEND_API_KEY: en desarrollo (next dev) no envía nada, escribe los
// emails en la consola del servidor y responde OK, para poder probar el
// flujo completo; en producción responde error 503.

import { ATELIERES_CITA, TIPOS_CITA } from '@/lib/citaAtelier';

const EMAIL_POR_DEFECTO = 'info@felycampo.com';
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function destinatariosAtelier(id) {
  const valor = process.env[`CITA_EMAIL_${id.toUpperCase()}`] || EMAIL_POR_DEFECTO;
  return valor.split(',').map((email) => email.trim()).filter(Boolean);
}

function escapar(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function texto(valor, max = 200) {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

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

function tabla(filas) {
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${filas
    .map(([k, v]) => `<tr><td style="color:#777;vertical-align:top">${escapar(k)}</td><td style="color:#111">${escapar(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;
}

const TEXTOS_CLIENTA = {
  es: {
    asunto: (atelier) => `Hemos recibido tu solicitud de cita — Fely Campo ${atelier}`,
    saludo: (nombre) => `Hola ${nombre},`,
    cuerpo: (tipo, atelier) => `Gracias por pedir tu cita${tipo ? ` de ${tipo === 'novia' ? 'novia' : 'invitada'}` : ''} en el atelier de Fely Campo en ${atelier}. El equipo del atelier te escribirá en breve para confirmar el día y la hora.`,
    resumen: 'Estos son los datos que nos has enviado:',
    firma: 'Un abrazo,<br>El equipo de Fely Campo',
    etiquetas: { atelier: 'Atelier', tipo: 'Tipo de cita', fecha: 'Fecha de la boda', telefono: 'Teléfono', mensaje: 'Mensaje' },
    tipos: { novia: 'Novia', invitada: 'Invitada' },
  },
  en: {
    asunto: (atelier) => `We have received your appointment request — Fely Campo ${atelier}`,
    saludo: (nombre) => `Hello ${nombre},`,
    cuerpo: (tipo, atelier) => `Thank you for requesting ${tipo ? `a ${tipo === 'novia' ? 'bridal' : 'guest'} appointment` : 'an appointment'} at the Fely Campo atelier in ${atelier}. The atelier team will be in touch shortly to confirm the day and time.`,
    resumen: 'These are the details you sent us:',
    firma: 'Warm regards,<br>The Fely Campo team',
    etiquetas: { atelier: 'Atelier', tipo: 'Appointment type', fecha: 'Wedding date', telefono: 'Phone', mensaje: 'Message' },
    tipos: { novia: 'Bride', invitada: 'Guest' },
  },
};

async function enviarEmail(email) {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) {
    console.info('[api/cita] RESEND_API_KEY sin configurar — email NO enviado:\n', JSON.stringify({ ...email, html: '(html omitido)' }, null, 2));
    return;
  }
  const respuesta = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.CITA_EMAIL_REMITENTE || `Fely Campo <${EMAIL_POR_DEFECTO}>`, ...email }),
  });
  if (!respuesta.ok) {
    throw new Error(`Resend ${respuesta.status}: ${await respuesta.text()}`);
  }
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === 'production') {
    console.error('[api/cita] Falta RESEND_API_KEY en producción.');
    return Response.json({ ok: false, error: 'no-configurado' }, { status: 503 });
  }

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
    atelier: ATELIERES_CITA.find((a) => a.id === datos.atelier),
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

  const valido = solicitud.atelier && fechaValida(solicitud.fechaBoda)
    && solicitud.nombre && EMAIL_VALIDO.test(solicitud.email) && solicitud.telefono
    && solicitud.codigoPostal && solicitud.ciudad && datos.aceptaLegal === true;
  if (!valido) return Response.json({ ok: false, error: 'datos' }, { status: 422 });

  const t = TEXTOS_CLIENTA[locale];
  const filasResumen = [
    [t.etiquetas.atelier, solicitud.atelier.nombre],
    ...(solicitud.tipo ? [[t.etiquetas.tipo, t.tipos[solicitud.tipo]]] : []),
    [t.etiquetas.fecha, fechaLegible(solicitud.fechaBoda, locale)],
    [t.etiquetas.telefono, solicitud.telefono],
    ...(solicitud.mensaje ? [[t.etiquetas.mensaje, solicitud.mensaje]] : []),
  ];

  const emailClienta = {
    to: [solicitud.email],
    subject: t.asunto(solicitud.atelier.nombre),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
<p>${escapar(t.saludo(solicitud.nombre))}</p>
<p>${escapar(t.cuerpo(solicitud.tipo, solicitud.atelier.nombre))}</p>
<p>${escapar(t.resumen)}</p>${tabla(filasResumen)}
<p>${t.firma}</p></div>`,
  };

  const tipoEs = solicitud.tipo ? (solicitud.tipo === 'novia' ? 'NOVIA' : 'INVITADA') : '';
  const emailAtelier = {
    to: destinatariosAtelier(solicitud.atelier.id),
    reply_to: solicitud.email,
    subject: `Nueva cita ${tipoEs ? `${tipoEs} ` : ''}— ${solicitud.atelier.nombre} — ${solicitud.nombre} (boda ${fechaLegible(solicitud.fechaBoda, 'es')})`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
<p>Nueva solicitud de cita desde felycampo.com. Responde a este email para escribir directamente a la clienta.</p>${tabla([
      ...(tipoEs ? [['Tipo', tipoEs]] : []),
      ['Atelier', solicitud.atelier.nombre],
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

  // Primero el aviso al atelier: es el que no se puede perder. Si falla,
  // error y la clienta puede reintentar. Si falla solo la confirmación a
  // la clienta, la solicitud ya está en manos del atelier — se da por
  // buena (reintentar duplicaría el aviso) y queda en el log.
  try {
    await enviarEmail(emailAtelier);
  } catch (error) {
    console.error('[api/cita] Error enviando el aviso al atelier:', error);
    return Response.json({ ok: false, error: 'envio' }, { status: 502 });
  }

  try {
    await enviarEmail(emailClienta);
  } catch (error) {
    console.error('[api/cita] Aviso al atelier enviado, pero falló la confirmación a la clienta:', error);
  }

  return Response.json({ ok: true });
}
