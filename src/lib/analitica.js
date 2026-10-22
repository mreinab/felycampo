// analitica.js
//
// Eventos de conversión — los recogen GTM (vía dataLayer) y el píxel de
// Meta (si la usuaria aceptó Marketing, ver components/layout/Analitica.jsx).
// Llamar SOLO desde el cliente y solo después de que el envío haya ido
// bien en el servidor, para no contar conversiones fallidas.
//
// En GTM: crear un activador "Evento personalizado" = cita_enviada y usar
// las variables de capa de datos tipo_cita (novia|invitada) y atelier
// (salamanca|madrid|oviedo) para separar las conversiones. Alternativa
// equivalente: activador por URL de página de confirmación
// (/visita-fely-campo/cita/confirmacion-novia | -invitada).

export function registrarConversionCita({ tipo, atelier }) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'cita_enviada', tipo_cita: tipo, atelier });

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Schedule', { content_category: tipo, content_name: atelier });
  }
}
