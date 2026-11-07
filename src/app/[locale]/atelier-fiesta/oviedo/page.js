/* Ficha de atelier. Ruta: /atelier-fiesta/oviedo — ver
   AtelierDetalle.jsx (plantilla compartida con /salamanca y /madrid) y
   src/datos/ateliers.js (contenido de esta ficha, editable en el admin). */

import AtelierDetalle from '../AtelierDetalle';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/atelier-fiesta/oviedo' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;

  return <AtelierDetalle id="oviedo" locale={locale} />;
}
