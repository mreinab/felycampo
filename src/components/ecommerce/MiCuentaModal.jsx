// MiCuentaModal.jsx

'use client';

/* ============================================================
   MODAL DE MI CUENTA — Fely Campo
   Iniciar sesión / crear cuenta como modal a pantalla completa (no
   una página aparte) — se abre desde "Mi cuenta" en el Navbar
   (escritorio y menú móvil) y desde el aviso de /carrito, todos vía
   useMiCuenta() (MiCuentaContext.jsx): así no se ve ni el Navbar ni el
   Footer detrás mientras está abierto, a diferencia de una página
   normal. Vive montado una sola vez en Navbar.jsx (mismo criterio que
   CarritoPanel), "abierta" viene del contexto — igual mecanismo de
   apertura/cierre que GaleriaProductoLightbox.jsx (foco en cerrar,
   scroll de fondo bloqueado, Escape cierra), sin pista de imágenes:
   aquí el contenido es el propio formulario.

   Layout 50%/50% (foto a la izquierda, formulario a la derecha, ver
   MiCuentaModal.module.css) — en mobile la foto pasa a ser una franja
   fija arriba. Dos pestañas alternan qué formulario se pinta a la
   derecha, mismo subrayado que .navLink/.navLinkActivo del propio
   Navbar (cada consumidor de ese patrón lo replica en su propio CSS
   module, igual criterio que .submenuLink en
   NavbarPanelLateralContent.module.css) — cada apertura empieza en
   "login".

   PLACEHOLDER a propósito, a petición: solo diseño, sin lógica de
   autenticación todavía (eso es trabajo del programador que conecte
   esto a un backend real). Los campos son inputs sueltos sin estado
   (ni value/onChange) y los dos "submit" (formulario + Google) llevan
   preventDefault — mismo criterio que .panelProductoAnadir en
   RunwayGaleria.jsx — solo para que clicarlos no recargue la página,
   no implementan ningún envío de verdad.
   Registro: nombre completo + fecha de nacimiento + email, nada más (a
   petición) — sin contraseña aquí; login: email + contraseña.
   Uso:
     <MiCuentaModal />
   ============================================================ */

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Input, Boton } from '../ui';
import { useMiCuenta } from '@/context/MiCuentaContext';
import styles from './MiCuentaModal.module.css';

// "G" de Google, mismos cuatro colores de marca de siempre — icono
// suelto embebido (Lucide no trae logos de marca).
function IconoGoogle() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  );
}

function MiCuentaModal() {
  const t = useTranslations('miCuenta');
  const { abierta, cerrar } = useMiCuenta();
  const cerrarRef = useRef(null);
  const [modo, setModo] = useState('login');
  const esLogin = modo === 'login';
  const tabIndexInteractivo = abierta ? 0 : -1;

  // Foco en cerrar + sin scroll de la página detrás mientras está
  // abierto — mismo criterio que GaleriaProductoLightbox/RunwayGaleria.
  useEffect(() => {
    if (!abierta) return undefined;
    const enfocadoAntes = document.activeElement;
    cerrarRef.current?.focus();
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const alTeclado = (evento) => {
      if (evento.key === 'Escape') cerrar();
    };
    document.addEventListener('keydown', alTeclado);

    return () => {
      document.removeEventListener('keydown', alTeclado);
      document.body.style.overflow = overflowPrevio;
      enfocadoAntes?.focus?.();
    };
  }, [abierta, cerrar]);

  // Cada apertura empieza en "login" — igual criterio que resetear la
  // talla en GaleriaProductoLightbox al abrir.
  useEffect(() => {
    if (abierta) setModo('login');
  }, [abierta]);

  return (
    <div className={`${styles.modal} ${abierta ? styles.abierta : ''}`} aria-hidden={!abierta}>
      <button
        ref={cerrarRef}
        type="button"
        className={styles.cerrar}
        onClick={cerrar}
        aria-label={t('cerrar')}
        tabIndex={tabIndexInteractivo}
      >
        <X size={28} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
      </button>

      <div className={styles.layout}>
        <div className={styles.imagenPanel}>
          <img src="/img/felycampo-lacoleccion.webp" alt="" className={styles.imagen} />
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formContenedor}>
            <div className={styles.tabs}>
              <button
                type="button"
                className={`${styles.tab} ${esLogin ? styles.tabActivo : ''}`}
                onClick={() => setModo('login')}
                tabIndex={tabIndexInteractivo}
              >
                {t('tabLogin')}
              </button>
              <button
                type="button"
                className={`${styles.tab} ${!esLogin ? styles.tabActivo : ''}`}
                onClick={() => setModo('registro')}
                tabIndex={tabIndexInteractivo}
              >
                {t('tabRegistro')}
              </button>
            </div>

            <div className={styles.cabecera}>
              <h1 className={styles.titulo}>{esLogin ? t('tituloLogin') : t('tituloRegistro')}</h1>
              <p className={styles.subtitulo}>{esLogin ? t('subtituloLogin') : t('subtituloRegistro')}</p>
            </div>

            <form className={styles.form} onSubmit={(evento) => evento.preventDefault()}>
              {esLogin ? (
                <>
                  <Input etiqueta={t('email')} tipo="email" nombre="email" placeholder={t('emailPlaceholder')} tabIndex={tabIndexInteractivo} />
                  <Input etiqueta={t('password')} tipo="password" nombre="password" tabIndex={tabIndexInteractivo} />
                </>
              ) : (
                <>
                  <Input etiqueta={t('nombreCompleto')} tipo="text" nombre="nombreCompleto" placeholder={t('nombreCompletoPlaceholder')} tabIndex={tabIndexInteractivo} />
                  <Input etiqueta={t('fechaNacimiento')} tipo="date" nombre="fechaNacimiento" tabIndex={tabIndexInteractivo} />
                  <Input etiqueta={t('email')} tipo="email" nombre="email" placeholder={t('emailPlaceholder')} tabIndex={tabIndexInteractivo} />
                </>
              )}

              <Boton variante="solido" tamano="full" type="submit" tabIndex={tabIndexInteractivo}>
                {esLogin ? t('enviarLogin') : t('enviarRegistro')}
              </Boton>
            </form>

            <div className={styles.separador}>
              <span className={styles.separadorLinea} aria-hidden="true" />
              <span className={styles.separadorTexto}>{t('separador')}</span>
              <span className={styles.separadorLinea} aria-hidden="true" />
            </div>

            <button
              type="button"
              className={styles.googleBtn}
              onClick={(evento) => evento.preventDefault()}
              tabIndex={tabIndexInteractivo}
            >
              <IconoGoogle />
              {t('google')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiCuentaModal;
