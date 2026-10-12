/* ============================================================
   FOOTER — Fely Campo
   ============================================================ */

'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Boton from '@/components/ui/Boton';
import styles from './Footer.module.css';

// Simulación — sustituir por la llamada real al endpoint de newsletter
// cuando exista backend. Deja el try/catch de handleSubmitNewsletter
// listo para propagar un error real.
const suscribirNewsletter = (correo) => new Promise((resolve) => setTimeout(resolve, 500));

/**
 * Pie de página de toda la web pública. 4 columnas + newsletter.
 */
function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

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

  const handleSubmitNewsletter = (e) => {
    e.preventDefault();
    enviarNewsletter();
  };

  // Mismo helper que usa el Navbar para anteponer el locale a las rutas
  // internas (ej. el enlace a la política de privacidad).
  const withLocale = (href) => `/${locale}${href}`;


  // "Atención cliente" quitada (a petición) — "Contacto" pasa al final
  // de "Fely Campo", que cierra con "Pedir cita" ("Nuestros talleres" fuera); las páginas legales, antes solo en la barra de
  // abajo, tienen ahora su propia columna "Información".
  const columnas = [
    { titulo: 'Fely Campo', enlaces: ['Historia', 'Puntos de venta', 'Contacto', 'Pedir cita'] },
    { titulo: 'Síguenos', enlaces: ['Instagram', 'YouTube'] },
    { titulo: 'Información', enlaces: ['Términos y condiciones', 'Política de cookies', 'Política de privacidad'] },
  ];

  // Enlaces reales de las 3 columnas (el resto — de momento solo
  // "Instagram"/"YouTube" — siguen siendo placeholders "#", ver el <a>
  // más abajo) — por etiqueta en vez del nombre técnico de cada ruta.
  const RUTAS_COLUMNAS = {
    'Contacto': '/ayuda/contacto',
    'Historia': '/sobre-fely',
    'Pedir cita': '/visita-fely-campo/cita',
    'Puntos de venta': '/puntos-de-venta-fely-campo',
    'Términos y condiciones': '/legal/terminos',
    'Política de cookies': '/legal/cookies',
    'Política de privacidad': '/legal/privacidad',
  };
  const hrefColumna = (enlace) => (RUTAS_COLUMNAS[enlace] ? withLocale(RUTAS_COLUMNAS[enlace]) : '#');

  return (
    <footer className={styles.footer}>
      {/* Logo a la mitad de escala que antes (era 100% del ancho del
          footer) — firma de marca discreta, primero en el footer en
          vez de la pieza a pantalla completa que era. */}
      <img src="/img/logo/logo-felycampo.png" alt="Fely Campo" className={styles.footerLogo} />

      <div className={styles.contenido}>
        <div className={styles.grid}>
          <div className={styles.columnas}>
            {columnas.map((col) => (
              <div key={col.titulo}>
                <h3 className={styles.titulo}>{col.titulo}</h3>
                <ul className={styles.lista}>
                  {col.enlaces.map((e) => (
                    <li key={e}><a href={hrefColumna(e)} className={styles.enlace}>{e}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Segundo bloque de la fila (35%) — en mobile sube por delante
              de las columnas (order:-1), es lo que más importa aquí. */}
          <div className={styles.newsletter}>
            <p className={styles.titulo}>Newsletter</p>
            <div className={styles.filaNewsletter}>
              <form className={styles.formNewsletter} onSubmit={handleSubmitNewsletter}>
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </form>
              {/* Debajo del input, a todo su ancho: sin fondo, texto oscuro y
                  borde (variante "contorno"). */}
              <Boton
                variante="contorno"
                tamano="full"
                type="button"
                onClick={enviarNewsletter}
                desactivado={estado === 'cargando' || email.trim().length === 0}
                className={styles.botonEnviar}
              >
                {t('newsletter.suscribirse')}
              </Boton>
            </div>
            {estado === 'exito' && (
              <p className={`${styles.estado} ${styles.estadoExito}`} role="status">
                {t('newsletter.exito')}
              </p>
            )}
            {estado === 'error' && (
              <p className={`${styles.estado} ${styles.estadoError}`} role="alert">
                {t('newsletter.error')}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
