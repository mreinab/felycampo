/* ============================================================
   POLÍTICA DE COOKIES — Fely Campo. Ruta: /legal/cookies
   Enlazada desde CookieConsent.jsx (aviso de cookies del pie de
   ventana) — a diferencia del resto de páginas de /legal (placeholders
   "pendiente de maquetar", sin locale), esta SÍ es bilingüe: la enlaza
   directamente un componente que ya lo es, así que dejarla solo en
   español para una visitante en inglés sería inconsistente. Mismo
   patrón visual que esos placeholders (clases "seccion contenedor",
   "texto-legible", etc., ver global.css) — contenido real en vez del
   texto "pendiente de maquetar".
   Categorías (Necesarias/Analíticas/Marketing) calcadas de las que
   ofrece CookieConsent.jsx al personalizar — mismos nombres, para que
   la política describa exactamente lo que el aviso deja elegir. */

const CONTENIDO = {
  es: {
    eyebrow: 'Fely Campo',
    titulo: 'Política de cookies',
    intro: 'Esta página explica qué son las cookies, cuáles usamos en felycampo.com y cómo puedes gestionarlas.',
    secciones: [
      {
        titulo: '¿Qué es una cookie?',
        texto: 'Una cookie es un pequeño archivo que se guarda en tu navegador al visitar un sitio web. Sirve para recordar información entre páginas o entre visitas — por ejemplo, el contenido de tu cesta o tus preferencias de idioma.',
      },
      {
        titulo: 'Cookies que usamos',
        texto: 'Agrupamos nuestras cookies en tres categorías. Puedes elegir cuáles aceptar desde el aviso de cookies (el botón "Personalizar") en cualquier momento.',
      },
      {
        titulo: 'Necesarias',
        texto: 'Imprescindibles para que el sitio funcione: mantener tu sesión iniciada, recordar el contenido de tu cesta o guardar tu elección sobre cookies. No se pueden desactivar porque el sitio no funcionaría sin ellas.',
      },
      {
        titulo: 'Analíticas',
        texto: 'Nos ayudan a entender cómo se usa el sitio (páginas visitadas, tiempo de permanencia) para poder mejorarlo. Solo se activan si las aceptas.',
      },
      {
        titulo: 'Marketing',
        texto: 'Se usan para mostrarte publicidad relevante de Fely Campo dentro y fuera de nuestro sitio. Solo se activan si las aceptas.',
      },
      {
        titulo: 'Cómo cambiar tu elección',
        texto: 'Puedes aceptar, rechazar o personalizar tu elección en cualquier momento borrando las cookies de tu navegador para esta web — el aviso volverá a aparecer en tu siguiente visita. También puedes bloquear o eliminar cookies desde la configuración de tu propio navegador, aunque eso puede afectar al funcionamiento de partes del sitio.',
      },
    ],
  },
  en: {
    eyebrow: 'Fely Campo',
    titulo: 'Cookie policy',
    intro: 'This page explains what cookies are, which ones we use on felycampo.com, and how you can manage them.',
    secciones: [
      {
        titulo: 'What is a cookie?',
        texto: 'A cookie is a small file saved on your browser when you visit a website. It is used to remember information between pages or between visits — for example, the contents of your bag or your language preferences.',
      },
      {
        titulo: 'Cookies we use',
        texto: 'We group our cookies into three categories. You can choose which ones to accept from the cookie banner (the "Customise" button) at any time.',
      },
      {
        titulo: 'Necessary',
        texto: 'Essential for the site to work: keeping you signed in, remembering the contents of your bag, or saving your cookie choice. These cannot be switched off, as the site would not work without them.',
      },
      {
        titulo: 'Analytics',
        texto: 'Help us understand how the site is used (pages visited, time spent) so we can improve it. Only activated if you accept them.',
      },
      {
        titulo: 'Marketing',
        texto: 'Used to show you relevant Fely Campo advertising on and off our site. Only activated if you accept them.',
      },
      {
        titulo: 'How to change your choice',
        texto: 'You can accept, reject or customise your choice at any time by clearing this site\'s cookies from your browser — the banner will appear again on your next visit. You can also block or delete cookies from your browser settings, though this may affect how parts of the site work.',
      },
    ],
  },
};

export default async function Pagina({ params }) {
  const { locale } = await params;
  const contenido = CONTENIDO[locale] ?? CONTENIDO.es;

  return (
    <section className="seccion contenedor">
      <p className="text-caption uppercase text-gris-500 mb-16">{contenido.eyebrow}</p>
      <h1>{contenido.titulo}</h1>
      <p className="text-gris-500 mt-24 texto-legible">{contenido.intro}</p>

      {contenido.secciones.map((bloque) => (
        <div key={bloque.titulo} className="mt-24 texto-legible">
          <h2>{bloque.titulo}</h2>
          <p className="text-gris-500 mt-8">{bloque.texto}</p>
        </div>
      ))}
    </section>
  );
}
