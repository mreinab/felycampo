/* Confirmación de cita de invitada — Ruta: /visita-fely-campo/cita/confirmacion-invitada
   Destino del formulario de cita (../page.js) tras un envío correcto.
   Ver ../ConfirmacionCita.jsx. */

import { metadataPagina } from '@/lib/seo';
import ConfirmacionCita from '../ConfirmacionCita';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/visita-fely-campo/cita/confirmacion-invitada', indexar: false });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  return <ConfirmacionCita locale={locale} tipo="invitada" />;
}
