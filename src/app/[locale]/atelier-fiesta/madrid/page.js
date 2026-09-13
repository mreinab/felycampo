/* Ficha de atelier. Ruta: /atelier-fiesta/madrid — ver
   AtelierDetalle.jsx (plantilla compartida con /salamanca y /oviedo) y
   atelieres.js (contenido de esta ficha). */

import AtelierDetalle from '../AtelierDetalle';
import { ATELIERES } from '../atelieres';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return <AtelierDetalle datos={ATELIERES.madrid} locale={locale} />;
}
