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

   Debajo del mapa, a petición: cabecera "Boutiques internacionales"
   (CabeceraSeccion, mismo componente que el resto del sitio —
   contextualiza por qué Milán tiene aquí su propia tarjeta, ver
   "puntosVenta.internacionalTitulo/internacionalIntro" en
   messages/{locale}.json) + una tarjeta editorial para el Showroom
   Milán, mismo diseño de .tarjeta que las sedes de
   visita-fely-campo/ListadoUbicaciones.jsx (foto 50% + info 50%, con
   EnVista para el fundido al entrar en scroll) — aquí sin foto/
   dirección/teléfono reales todavía: bloque gris en vez de galería y
   un párrafo de relleno (lorem ipsum, en rojo a propósito, ver
   .textoRelleno en page.module.css) hasta que haya contenido real.
   margin-bottom en la propia sección (ver .seccionMilan) para separar
   del Footer, que si no quedaba pegado justo debajo. */

import { MapaPuntosVenta, ProductHero } from '@/components/layout';
import { CabeceraSeccion, EnVista } from '@/components/ui';
import styles from './page.module.css';

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

      <section className={`seccion ${styles.seccionMilan}`}>
        <CabeceraSeccion
          titleKey="puntosVenta.internacionalTitulo"
          descriptionKey="puntosVenta.internacionalIntro"
          alinear="start"
        />

        <EnVista as="article" className={styles.tarjeta}>
          <div className={styles.galeria}>
            <div className={styles.marcoVacio} aria-hidden="true" />
          </div>

          <div className={styles.fila}>
            <p className={styles.nombre}>Showroom Milan</p>
            <p className={styles.textoRelleno}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </EnVista>
      </section>
    </>
  );
}
