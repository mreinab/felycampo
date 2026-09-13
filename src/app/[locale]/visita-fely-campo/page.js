/* ============================================================
   VISÍTENOS — Fely Campo. Ruta: /visita-fely-campo (namespace de
   traducciones "visitenos", sin cambiar — solo la URL es distinta).
   Server Component: ProductHero (misma cabecera visual que
   Tienda/Atelier/Puntos de venta — por eso esta ruta está en
   RUTAS_CON_PRODUCT_HERO en layout.js, así el Navbar nace
   transparente/claro igual que ahí) + ListadoUbicaciones.jsx (Client
   Component — cabecera + chips de ciudad + listado filtrado, ver ese
   archivo y ubicaciones.js) + MapaPuntosVenta al final.
   ============================================================ */

import { MapaPuntosVenta, ProductHero } from '@/components/layout';
import ListadoUbicaciones from './ListadoUbicaciones';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <>
      <section className="seccion">
        <ProductHero imagen="/img/atelier/ateliernovia-lamedida-felycampo-3.webp" />
      </section>

      <section className="seccion">
        <div className="contenedor">
          <ListadoUbicaciones locale={locale} />
        </div>
      </section>

      <section className="seccion" id="mapa-puntos-venta">
        <div className="contenedor">
          <MapaPuntosVenta />
        </div>
      </section>
    </>
  );
}
