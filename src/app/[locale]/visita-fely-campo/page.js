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
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <>
      <section className="seccion">
        <ProductHero imagen="/img/atelier/showroom-madrid/FelyCampo_ATELIER_KristenWicce-3.jpg" className="hero-arriba" />
      </section>

      {/* .seccionUbicaciones (ver page.module.css): en mobile el hero de
          arriba es position:fixed (ProductHero.module.css) — esta es la
          sección que le sigue en el flujo, necesita fondo opaco +
          posicionada + z-index por encima para taparlo al hacer scroll
          (mismo mecanismo que .seccionGrid en Tienda). */}
      <section className={`seccion ${styles.seccionUbicaciones}`}>
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
