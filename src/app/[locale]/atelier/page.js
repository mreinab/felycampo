/* ============================================================
   ATELIER (índice: Novias + Fiesta) — Fely Campo. Ruta: /atelier
   Server Component: hero SplitMedia variante="landing" (mismo bloque
   Novias/Fiesta que la home, ver page.js de la home — data-navbar-hero
   en el envoltorio para que Navbar sepa cuándo volverse sólido, ver
   RUTAS_CON_PRODUCT_HERO en ../layout.js y el criterio ya usado en
   ProductHero.jsx) + RunwayDescripcion (texto editorial de
   presentación) + dos BloqueSeccion en zigzag (Novias/Fiesta, el
   segundo "invertido" para que la foto cambie de lado), cada uno con
   su propio CTA "Pedir cita" (enlace/href de BloqueSeccion) +
   cabecera "Visítanos" (CabeceraSeccion, mismo patrón que
   ListadoUbicaciones.jsx en visita-fely-campo/ — .cabeceraColumna en
   page.module.css) + tarjetas por sede (foto de Salamanca/Madrid/
   Oviedo — foto y ciudad enlazan a su ficha real en
   /atelier-fiesta/[sede]; debajo, la propia dirección es el enlace a
   Google Maps —dirección de UBICACIONES en
   ../visita-fely-campo/ubicaciones.js por id, mismo patrón de URL que
   MapaPuntosVenta.jsx— sin CTA propio por tarjeta, quitado a
   petición). CarruselClientas (mismo componente que la home) comentado
   a petición — sin fotos de clientas justo antes del Footer.
   Contenido bilingüe en atelierIndex.js (texto largo y propio de esta
   página, no encaja en messages/{locale}.json).
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { SplitMedia, RunwayDescripcion, BloqueSeccion /* , CarruselClientas */ } from '@/components/layout';
import { CabeceraSeccion } from '@/components/ui';
import { ATELIER_INDEX } from './atelierIndex';
import { UBICACIONES } from '../visita-fely-campo/ubicaciones';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('atelierIndex');

  return (
    <section>
      <div data-navbar-hero>
        <SplitMedia
          variante="landing"
          items={[
            {
              src: '/img/novias-sección-FelyCampo2.jpg',
              tipo: 'imagen',
              tituloKey: 'splitMedia.item1.titulo',
              ctaKey: 'splitMedia.item1.cta',
              href: `/${locale}/atelier/novias`,
            },
            {
              src: '/img/invitadas-sección-FelyCampo.jpg',
              tipo: 'imagen',
              tituloKey: 'splitMedia.item2.titulo',
              ctaKey: 'splitMedia.item2.cta',
              href: `/${locale}/atelier/fiesta`,
            },
          ]}
        />
      </div>

      <RunwayDescripcion texto={ATELIER_INDEX.descripcion[locale]} className={styles.descripcionTexto} />

      <BloqueSeccion
        imagen={ATELIER_INDEX.novias.imagen}
        titulo={ATELIER_INDEX.novias.titulo[locale]}
        texto={ATELIER_INDEX.novias.texto[locale]}
        enlace={t('pedirCita')}
        href={`/${locale}/visita-fely-campo/cita`}
      />

      <BloqueSeccion
        imagen={ATELIER_INDEX.fiesta.imagen}
        titulo={ATELIER_INDEX.fiesta.titulo[locale]}
        texto={ATELIER_INDEX.fiesta.texto[locale]}
        enlace={t('pedirCita')}
        href={`/${locale}/visita-fely-campo/cita`}
        invertido
      />

      <div className={styles.ateliersSeccion}>
        <CabeceraSeccion
          titleKey="atelierIndex.visitanosTitulo"
          descriptionKey="atelierIndex.visitanosDescripcion"
          alinear="start"
          enCuadricula
          className={styles.cabeceraColumna}
        />

        <div className={styles.ateliersGrid}>
          {ATELIER_INDEX.ateliers.map((atelier) => {
            // Misma dirección que ya muestra ListadoUbicaciones.jsx
            // (UBICACIONES, mismo id) — evita duplicarla a mano aquí.
            const ubicacion = UBICACIONES.find((u) => u.id === atelier.id);
            const mapsHref = ubicacion
              ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ubicacion.direccion.join(', '))}`
              : undefined;

            return (
              <div key={atelier.id} className={styles.atelierItem}>
                <a href={`/${locale}/atelier-fiesta/${atelier.id}`} className={styles.atelierEnlaceImagen}>
                  <div className={styles.atelierMarco}>
                    <img src={atelier.imagen} alt={atelier.ciudad} className={styles.atelierImagen} />
                  </div>
                  <span className={styles.atelierCiudad}>{atelier.ciudad}</span>
                </a>

                {ubicacion && (
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.atelierDireccion}
                  >
                    {ubicacion.direccion.join('\n')}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Comentado a petición — sin fotos de clientas justo antes del Footer.
      <CarruselClientas />
      */}
    </section>
  );
}
