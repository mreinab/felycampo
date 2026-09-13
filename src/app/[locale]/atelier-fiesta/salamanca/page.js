/* Ficha de atelier. Ruta: /atelier-fiesta/salamanca — ver
   AtelierDetalle.jsx (plantilla compartida con /madrid y /oviedo) y
   atelieres.js (contenido de esta ficha). */

import AtelierDetalle from '../AtelierDetalle';
import { ATELIERES } from '../atelieres';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return <AtelierDetalle datos={ATELIERES.salamanca} locale={locale} />;
}
