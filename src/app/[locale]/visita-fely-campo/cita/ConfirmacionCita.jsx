// ConfirmacionCita.jsx

/* Pantalla de "solicitud enviada" del formulario de cita (./page.js),
   compartida por ./confirmacion-novia y ./confirmacion-invitada — una
   URL por tipo para que GTM/Meta puedan medir cada conversión también
   por URL (ver src/lib/analitica.js). Mismo diseño que tenía antes la
   confirmación dentro del propio formulario (.confirmacion/.dondeIntro
   de page.module.css). noindex: ver generateMetadata en cada page.js. */

import { getTranslations } from 'next-intl/server';
import { Boton } from '@/components/ui';
import styles from './page.module.css';

async function ConfirmacionCita({ locale, tipo }) {
  const t = await getTranslations({ locale, namespace: 'pedirCitaAtelier' });
  const esNovia = tipo === 'novia';

  return (
    <div className={styles.pagina}>
      <div className={styles.formContenedor}>
        <div className={styles.confirmacion}>
          <h1 className={styles.titulo}>{t(esNovia ? 'confirmacionNoviaTitulo' : 'confirmacionInvitadaTitulo')}</h1>
          <p className={styles.dondeIntro}>{t(esNovia ? 'confirmacionNoviaTexto' : 'confirmacionInvitadaTexto')}</p>
          <Boton variante="contorno" href={`/${locale}`}>{t('volverInicio')}</Boton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmacionCita;
