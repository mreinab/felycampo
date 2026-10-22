/* Ficha de atelier. Ruta: /atelier-fiesta/oviedo — ver
   AtelierDetalle.jsx (plantilla compartida con /salamanca y /madrid) y
   atelieres.js (contenido de esta ficha). */

import AtelierDetalle from '../AtelierDetalle';
import { ATELIERES } from '../atelieres';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/atelier-fiesta/oviedo' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;

  return <AtelierDetalle datos={ATELIERES.oviedo} locale={locale} />;
}
