// NewsletterModal.jsx

'use client';

/* ============================================================
   POPUP NEWSLETTER — Fely Campo
   Modal de captación (ver ui/Modal.jsx), distinto del formulario de
   newsletter que ya vive en el pie de página (ver Footer.jsx,
   t('footer.newsletter.*')) — este es la variante "popup" a pantalla
   completa, con foto de marca a la izquierda. La columna de texto
   reutiliza aquí el mismo bloque input+botón+consentimiento del
   footer (mismas traducciones "footer.newsletter.*", mismo mecanismo
   de placeholder sin backend real: suscribirNewsletter simula la
   llamada, ver Footer.jsx) en vez del botón "Apúntate" que solo
   cerraba el popup.
   Uso:
     <NewsletterModal abierto={abierto} onCerrar={() => setAbierto(false)} />
   ============================================================ */

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Modal, Boton } from '../ui';
import styles from './NewsletterModal.module.css';

// Misma simulación que Footer.jsx — sustituir por la llamada real al
// endpoint de newsletter cuando exista backend.
const suscribirNewsletter = (correo) => new Promise((resolve) => setTimeout(resolve, 500));

function NewsletterModal({ abierto, onCerrar, imagen = '/img/styleguide/prod-tarjeta.webp' }) {
  const t = useTranslations('newsletterPopup');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const withLocale = (href) => `/${locale}${href}`;

  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState(null); // null | 'cargando' | 'exito' | 'error'

  const enviarNewsletter = async () => {
    setEstado('cargando');
    try {
      await suscribirNewsletter(email);
      setEstado('exito');
      setEmail('');
    } catch {
      setEstado('error');
    }
  };

  const handleSubmitNewsletter = (evento) => {
    evento.preventDefault();
    enviarNewsletter();
  };

  return (
    <Modal abierto={abierto} onCerrar={onCerrar} className={styles.panel} classNameContenido={styles.contenidoModal}>
      <div className={styles.contenido}>
        <div className={styles.columnaImagen}>
          <img src={imagen} alt="" className={styles.imagen} />
        </div>
        <div className={styles.columnaTexto}>
          <h2 className={styles.titulo}>{t('titulo')}</h2>
          <div className={styles.filaNewsletterWrap}>
            <div className={styles.filaNewsletter}>
              <form className={styles.formNewsletter} onSubmit={handleSubmitNewsletter}>
                <input
                  type="email"
                  placeholder="nombre@email.com"
                  className={styles.input}
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  required
                />
              </form>
              <Boton
                variante="solido"
                tamano="s"
                type="button"
                onClick={enviarNewsletter}
                desactivado={estado === 'cargando' || email.trim().length === 0}
                className={styles.botonEnviar}
              >
                {tFooter('newsletter.enviar')}
              </Boton>
            </div>
            {estado === 'exito' && (
              <p className={`${styles.estado} ${styles.estadoExito}`} role="status">
                {tFooter('newsletter.exito')}
              </p>
            )}
            {estado === 'error' && (
              <p className={`${styles.estado} ${styles.estadoError}`} role="alert">
                {tFooter('newsletter.error')}
              </p>
            )}
            <p className={styles.consentimiento}>
              <a href={withLocale('/legal/privacidad')} className={styles.consentimientoEnlace}>
                {tFooter('newsletter.politicaEnlace')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NewsletterModal;
