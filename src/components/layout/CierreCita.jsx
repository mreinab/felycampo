/* ============================================================
   CierreCita — Fely Campo
   Banda "Pedir cita" justo antes del Footer, en todas las páginas
   que no traen ya su propio CTA al formulario de cita
   (/visita-fely-campo/cita). Se pinta una sola vez desde
   [locale]/layout.js, no página a página.

   Diseño: centrado, sin caja ni fondo propio, entre dos hairlines —
   etiqueta pequeña en mayúsculas, una frase a --text-body-lg y el
   enlace subrayado (Boton "texto"), mismo lenguaje que el resto de
   CTAs de la web. Entra con scroll (EnVista).

   RUTAS_SIN_CIERRE: prefijos (sin locale) donde NO se pinta — páginas
   que ya llevan su propio "Pedir cita" (fichas de atelier, visita,
   contacto, el propio formulario) o donde no pinta nada (carrito,
   cuenta, legales).
   ============================================================ */

'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Boton, EnVista } from '../ui';
import styles from './CierreCita.module.css';

const RUTAS_SIN_CIERRE = [
  '/atelier-fiesta',
  '/visita-fely-campo',
  '/ayuda/contacto',
  '/carrito',
  '/mi-cuenta',
  '/legal',
];

function CierreCita() {
  const locale = useLocale();
  const t = useTranslations('cierreCita');
  const pathname = usePathname() ?? '';
  const ruta = pathname.replace(new RegExp(`^/${locale}`), '') || '/';

  if (RUTAS_SIN_CIERRE.some((prefijo) => ruta === prefijo || ruta.startsWith(`${prefijo}/`))) return null;

  return (
    <section className={styles.cierre}>
      <EnVista className={styles.contenido}>
        <p className={styles.etiqueta}>{t('etiqueta')}</p>
        <p className={styles.texto}>{t('texto')}</p>
        <Boton variante="texto" href={`/${locale}/visita-fely-campo/cita`}>{t('cta')}</Boton>
      </EnVista>
    </section>
  );
}

export default CierreCita;
