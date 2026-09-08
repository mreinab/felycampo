/* ============================================================
   VISÍTENOS — Fely Campo. Ruta: /visita-fely-campo (namespace de
   traducciones "visitenos", sin cambiar — solo la URL es distinta).
   Server Component mínimo: envuelve a ListadoUbicaciones.jsx (Client
   Component — cabecera + chips de ciudad + listado filtrado, ver ese
   archivo y ubicaciones.js). Sin ProductHero a propósito — Navbar
   normal (sólido), no transparente/claro como en Tienda/Atelier (ver
   "/visita-fely-campo" ya fuera de RUTAS_CON_PRODUCT_HERO en layout.js).
   ============================================================ */

import { MapaPuntosVenta } from '@/components/layout';
import ListadoUbicaciones from './ListadoUbicaciones';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <>
      <section className="seccion">
        <div className="contenedor">
          <ListadoUbicaciones locale={locale} />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <MapaPuntosVenta />
        </div>
      </section>
    </>
  );
}
