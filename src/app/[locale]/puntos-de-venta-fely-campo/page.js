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

   Debajo del mapa, a petición: cabecera "Fely Campo y Guffanti:
   presencia internacional" (CabeceraSeccion, solo título — ver
   "puntosVenta.internacionalTitulo" en messages/{locale}.json) + una
   tarjeta editorial para el Showroom Milán (nombre y texto en
   "puntosVenta.showroomNombre/showroomTexto"), mismo diseño de
   .tarjeta que las sedes de visita-fely-campo/ListadoUbicaciones.jsx
   (foto 50% + info 50%, con EnVista para el fundido al entrar en
   scroll).
   margin-bottom en la propia sección (ver .seccionMilan) para separar
   del Footer, que si no quedaba pegado justo debajo. */

import { getTranslations } from 'next-intl/server';
import { MapaPuntosVenta, ProductHero } from '@/components/layout';
import { CabeceraSeccion, EnVista } from '@/components/ui';
import styles from './page.module.css';
import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/puntos-de-venta-fely-campo' });
}

export default async function Pagina() {
  const t = await getTranslations('puntosVenta');

  return (
    <>
      <section className="seccion">
        <ProductHero
          imagen="/img/atelier/atelier-salamanca/fely-campo-atelier-salamanca-foto-4.webp"
          titulo={t('tituloHero')}
          subtitulo={t('subtituloHero')}
        />
      </section>

      <section className="seccion" id="mapa-puntos-venta">
        <div className="contenedor">
          <MapaPuntosVenta />
        </div>
      </section>

      <section className={`seccion ${styles.seccionMilan}`}>
        <CabeceraSeccion
          titleKey="puntosVenta.internacionalTitulo"
          alinear="start"
        />

        <EnVista as="article" className={styles.tarjeta}>
          <div className={styles.galeria}>
            <img
              src="/img/atelier/fely-campo-atelier-punto-venta-internacional-2.webp"
              alt={t('showroomNombre')}
              className={styles.foto}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className={styles.fila}>
            <p className={styles.nombre}>{t('showroomNombre')}</p>
            <p className={styles.textoRelleno}>{t('showroomTexto')}</p>
          </div>
        </EnVista>
      </section>
    </>
  );
}
