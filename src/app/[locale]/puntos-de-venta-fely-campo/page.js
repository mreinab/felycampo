/* ============================================================
   PUNTOS DE VENTA — Fely Campo. Ruta: /puntos-de-venta-fely-campo
   (destino del submenú "Puntos de venta" de Visítanos, ver Navbar.jsx
   — antes apuntaba a /visita-fely-campo por duplicado con el enlace
   padre). Server Component mínimo: ProductHero (misma cabecera visual
   que Tienda/Atelier — por eso esta ruta está en RUTAS_CON_PRODUCT_HERO
   en layout.js, así el Navbar nace transparente/claro igual que ahí) +
   MapaPuntosVenta, que ya traía pensada esta ruta como segundo
   consumidor (ver comentario en ese componente) y trae su propia
   CabeceraSeccion — sin otra encima aquí, sería redundante.
   ============================================================ */

import { MapaPuntosVenta, ProductHero } from '@/components/layout';

export default function Pagina() {
  return (
    <>
      <section className="seccion">
        <ProductHero imagen="/img/styleguide/punto-venta.webp" />
      </section>

      <section className="seccion" id="mapa-puntos-venta">
        <div className="contenedor">
          <MapaPuntosVenta />
        </div>
      </section>
    </>
  );
}
