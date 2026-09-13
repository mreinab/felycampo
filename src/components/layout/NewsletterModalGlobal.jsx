// NewsletterModalGlobal.jsx

'use client';

/* ============================================================
   POPUP NEWSLETTER — disparo automático — Fely Campo
   Envoltorio que abre NewsletterModal.jsx solo al llegar a la web,
   mismo criterio de montaje global que CarritoPanel/MiCuentaModal
   (ver Navbar.jsx) pero con estado propio en vez de un Context — nada
   más lo abre desde fuera. Vive en el layout raíz (ver
   src/app/[locale]/layout.js), montado solo en home ("isHome") — es
   un placeholder de captación, no un popup a repetir en cada página.

   No aparece al instante (antes se abría con el propio montaje, nada
   más cargar) — un retraso (RETRASO_MS) deja que la visitante vea la
   home un momento antes de interrumpirla, mismo criterio que cualquier
   popup de captación "profesional". Tampoco vuelve a aparecer en la
   misma sesión una vez cerrado (sessionStorage, con el mismo try/catch
   de CarritoContext.jsx por si el navegador lo bloquea/está en modo
   privado): "isHome" se vuelve a cumplir cada vez que se vuelve a la
   home dentro de la sesión, y sin esto reaparecería cada una de esas
   veces. sessionStorage, no localStorage: solo esta sesión, no cada
   visita para siempre — vuelve a aparecer en la siguiente. */

import { useEffect, useState } from 'react';
import NewsletterModal from './NewsletterModal';

const CLAVE_STORAGE = 'fc_newsletter_popup_visto';
const RETRASO_MS = 4000;

function NewsletterModalGlobal() {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    let yaVisto = false;
    try {
      yaVisto = window.sessionStorage.getItem(CLAVE_STORAGE) === '1';
    } catch {
      // sessionStorage no disponible — se comporta como si no se
      // hubiera visto todavía, nunca rompe el popup.
    }
    if (yaVisto) return;

    const temporizador = setTimeout(() => setAbierto(true), RETRASO_MS);
    return () => clearTimeout(temporizador);
  }, []);

  const cerrar = () => {
    setAbierto(false);
    try {
      window.sessionStorage.setItem(CLAVE_STORAGE, '1');
    } catch {
      // ver comentario de arriba — sin persistencia, solo no vuelve a
      // aparecer dentro de este mismo montaje.
    }
  };

  return <NewsletterModal abierto={abierto} onCerrar={cerrar} />;
}

export default NewsletterModalGlobal;
