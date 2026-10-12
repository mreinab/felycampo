/* ============================================================
   BOTÓN FLOTANTE DE WHATSAPP — Fely Campo
   Fijo abajo a la derecha en todas las páginas (ver layout.js). Mismo
   número que "WhatsApp" en /ayuda/contacto (Atención Prêt-à-porter).
   Icono de trazo fino dibujado a mano (no el logo verde de WhatsApp)
   para ir con la línea del resto del sitio: cuadrado negro suave, icono en
   blanco, y al hover se aclara (ver BotonWhatsapp.module.css).
   ============================================================ */

import { useTranslations } from 'next-intl';
import styles from './BotonWhatsapp.module.css';

const TELEFONO = '34683703644';

export default function BotonWhatsapp() {
  const t = useTranslations('whatsappFlotante');
  const href = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(t('mensaje'))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.boton}
      aria-label={t('label')}
      title={t('label')}
    >
      <svg viewBox="2.9 2.9 18.2 18.2" className={styles.icono} aria-hidden="true">
        {/* Bocadillo: círculo abierto con la colita abajo a la izquierda. */}
        <path
          d="M3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 8 19.4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Auricular */}
        <path
          d="M9.2 7.8c-.3 0-.7.1-.9.5-.3.4-.8 1.1-.6 2.2.3 1.6 1.7 3.4 3.4 4.4 1.3.8 2.4 1 3.1.8.6-.2 1-.7 1.1-1.1.1-.3 0-.5-.2-.6l-1.5-.8c-.2-.1-.4 0-.5.1l-.6.7c-.1.1-.3.2-.5.1-.9-.4-1.8-1.2-2.3-2.1-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.4.1-.5l-.7-1.6c-.1-.3-.3-.4-.5-.4z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
