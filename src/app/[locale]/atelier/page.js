/* ============================================================
   ATELIER (índice: Novias + Fiesta) — Fely Campo. Ruta: /atelier
   Server Component: ProductHero (Navbar transparente/light, ver
   RUTAS_CON_PRODUCT_HERO en ../layout.js) + CabeceraSeccion standalone
   (mismas clases cabeceraProductos/cabeceraInicio que usa
   CuadriculaProductos en "grid", aquí sin cuadrícula detrás — ver
   CabeceraSeccion.jsx) + RunwayDescripcion (texto editorial de
   presentación) + dos BloqueSeccion en zigzag (Novias/Fiesta, el
   segundo "invertido" para que la foto cambie de lado) + los dos CTA
   comunes a ambos bloques (no uno por bloque) + "Conoce nuestros
   ateliers" (foto de Salamanca/Madrid/Oviedo, enlaza a su ficha real
   en /atelier-fiesta/[sede]) + CarruselClientas al final, mismo
   componente que la home. Contenido bilingüe en atelierIndex.js (texto
   largo y propio de esta página, no encaja en messages/{locale}.json).
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { ProductHero, RunwayDescripcion, BloqueSeccion, CarruselClientas } from '@/components/layout';
import { CabeceraSeccion, Boton, CollectionTitle } from '@/components/ui';
import { ATELIER_INDEX } from './atelierIndex';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('atelierIndex');

  return (
    <section>
      <ProductHero imagen={ATELIER_INDEX.heroImagen} />

      <CabeceraSeccion
        enCuadricula
        alinear="start"
        subtitleKey="atelierIndex.subtitulo"
        titleKey="atelierIndex.titulo"
      />

      <RunwayDescripcion texto={ATELIER_INDEX.descripcion[locale]} />

      <BloqueSeccion
        imagen={ATELIER_INDEX.novias.imagen}
        titulo={ATELIER_INDEX.novias.titulo[locale]}
        texto={ATELIER_INDEX.novias.texto[locale]}
      />

      <BloqueSeccion
        imagen={ATELIER_INDEX.fiesta.imagen}
        titulo={ATELIER_INDEX.fiesta.titulo[locale]}
        texto={ATELIER_INDEX.fiesta.texto[locale]}
        invertido
      />

      <div className={styles.botones}>
        <Boton variante="contorno" href={`/${locale}/colecciones-fely-campo`}>
          {t('conoceColeccion')}
        </Boton>
        <Boton variante="solido" href={`/${locale}/visita-fely-campo/cita`}>
          {t('pedirCita')}
        </Boton>
      </div>

      <div className={styles.ateliersSeccion}>
        <CollectionTitle titleKey="atelierIndex.conoceAteliers" />

        <div className={styles.ateliersGrid}>
          {ATELIER_INDEX.ateliers.map((atelier) => (
            <a
              key={atelier.id}
              href={`/${locale}/atelier-fiesta/${atelier.id}`}
              className={styles.atelierItem}
            >
              <div className={styles.atelierMarco}>
                <img src={atelier.imagen} alt={atelier.ciudad} className={styles.atelierImagen} />
              </div>
              <span className={styles.atelierCiudad}>{atelier.ciudad}</span>
            </a>
          ))}
        </div>
      </div>

      <CarruselClientas />
    </section>
  );
}
