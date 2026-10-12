# Newsletter → Substack — hoja de ruta

**Objetivo:** cuando alguien escribe su email en la newsletter de la web, queda suscrito automáticamente a **https://felycampo.substack.com**, sin salir de la web.

**Estado:** pendiente. Se hará cuando la web se publique oficialmente. Hoy los formularios solo **simulan** el envío: no guardan ni mandan el email a ningún sitio.

---

## Lo que hay que saber antes de empezar

- **Substack no tiene API oficial para suscribir.** Se usa el endpoint interno que usa el propio formulario de Substack:
  `POST https://felycampo.substack.com/api/v1/free`
  No está documentado: puede cambiar o bloquearse sin aviso. Por eso conviene tener un respaldo (paso 4).
- **La llamada tiene que hacerse desde el servidor**, no desde el navegador: Substack bloquea las peticiones de otros dominios (CORS).
- **Hosting:** hoy la web está en Netlify y en el futuro tendrá hosting y dominio propios. El hosting nuevo tiene que poder ejecutar las API routes de Next.js (servidor Node). Un export estático no vale. Cambiar el dominio de la web no afecta a nada de esto.
- Substack manda su propio email de bienvenida/confirmación al suscriptor. Eso no se controla desde la web.

---

## Pasos

### 1. Crear el endpoint `src/app/api/newsletter/route.js`

Recibe `{ email }`, lo valida y lo reenvía a Substack.

```js
// src/app/api/newsletter/route.js
const SUBSTACK_URL = process.env.SUBSTACK_URL; // https://felycampo.substack.com

export async function POST(request) {
  const { email } = await request.json().catch(() => ({}));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'email-invalido' }, { status: 400 });
  }

  const res = await fetch(`${SUBSTACK_URL}/api/v1/free`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'embed' }),
  });

  if (!res.ok) {
    console.error('Substack respondió', res.status, await res.text());
    return Response.json({ ok: false, error: 'substack' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
```

### 2. Variable de entorno

En el panel del hosting (Netlify → *Site configuration → Environment variables*, o el que toque en el hosting nuevo) y en `.env.local` para desarrollo:

```
SUBSTACK_URL=https://felycampo.substack.com
```

Si algún día Substack se conecta a un dominio propio (por ejemplo `newsletter.felycampo.com`), solo hay que cambiar esta variable.

### 3. Conectar los dos formularios

Hoy hay dos formularios con una función falsa `suscribirNewsletter` que solo espera 500 ms:

- `src/components/layout/Footer.jsx` (arriba del todo)
- `src/components/layout/NewsletterModal.jsx` (arriba del todo)

Sustituir la función falsa en los dos por esta. El `try/catch` y los estados *cargando / éxito / error* que ya tienen siguen sirviendo tal cual:

```js
const suscribirNewsletter = async (correo) => {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: correo }),
  });
  if (!res.ok) throw new Error('newsletter');
};
```

Mejor aún: moverla a un solo archivo (por ejemplo `src/lib/newsletter.js`) e importarla desde los dos, para no tenerla duplicada.

### 4. Respaldo (recomendado)

Como el endpoint de Substack no es oficial, guardar también cada email en otro sitio para no perder ninguno si un día falla. Se añade dentro del `route.js` del paso 1, antes o después de llamar a Substack. Opciones, de más simple a más completa:

- **Google Sheets:** una fila por alta. Gratis y fácil de importar luego a Substack (*Settings → Import subscribers*, acepta CSV).
- **Email de aviso** con cada alta (Resend, SendGrid…).
- **Base de datos propia**, cuando exista. El panel `/admin/newsletter` ya tiene la tabla diseñada, pero hoy usa datos de ejemplo (`newsletterMock` en `src/components/admin/mockData.js`).

Pendiente de decidir con Fely cuál se usa.

### 5. Probar antes de publicar

1. Suscribir un email de prueba propio desde el Footer y desde el modal.
2. Comprobar que aparece en Substack → *Subscribers*.
3. Comprobar que, si Substack falla (por ejemplo con `SUBSTACK_URL` mal puesta a propósito), la web muestra el mensaje de error y no un "gracias" falso.
4. Borrar el email de prueba de Substack.

---

## Si deja de funcionar

Lo más probable es que Substack haya cambiado o bloqueado el endpoint. Mira los logs del servidor (el `console.error` del paso 1). Mientras se arregla, los emails siguen guardándose en el respaldo del paso 4 y se pueden importar a mano en Substack.

**Plan B estable:** al enviar el formulario, redirigir a `https://felycampo.substack.com/subscribe?email=EMAIL`. Es oficial y no se rompe, pero el usuario sale de la web y tiene que confirmar allí.
