/* ============================================================
   SOBRE FELY — Fely Campo. Ruta: /sobre-fely
   Mismo diseño que la ficha de colección de Runway
   (/colecciones-fely-campo/la-coleccion-aw27, ver
   ../colecciones-fely-campo/[coleccion]/page.js), contenido de
   biografía en vez de colección — ver sobreFely.js para el porqué de
   cada campo y qué se queda fuera (RunwayGaleria/RunwayVideoCierre).

   Hero a 80vh a ancho completo (RunwayMediaLateral, data-navbar-hero
   para que el Navbar transparente se vuelva sólido al salir de él,
   mismo mecanismo que en la ficha de colección) → .textoRow ("Fely
   Campo" / "La Diseñadora", mismo tratamiento nombre/temporada que la
   ficha de colección) + RunwayDescripcion (historia de la firma,
   unida en un único párrafo corrido — RunwayDescripcion solo admite
   un "texto") → RunwayBackstage (cuadrícula editorial con la foto de
   cada etapa de la trayectoria, ver sobreFely.js — con el manifiesto
   poético intercalado en medio: sus fotos en columna izquierda + el
   poema en la derecha, misma fila
   — prop "poema" con "imagenes"/"indice", tratado como una imagen más
   de la cuadrícula, ver ese componente) → tarjeta del documental
   (TarjetaEnlaceExterno) — la biografía en texto corrido que vivía
   debajo se quitó a petición (ver historial), "trayectoria" en
   sobreFely.js se sigue usando solo para las fotos de RunwayBackstage.

   Server Component — "sobreFely.eyebrow" ("La Diseñadora"/"The
   Designer") se resuelve con getTranslations (versión servidor de
   next-intl), igual que "atelierFiesta"/"visitenos" en
   AtelierDetalle.jsx; el resto (biografía y manifiesto) es texto largo
   propio de la página y vive en sobreFely.js. */

import { getTranslations } from 'next-intl/server';
import { RunwayBackstage, RunwayDescripcion, RunwayMediaLateral, TarjetaEnlaceExterno } from '@/components/layout';
import { SOBRE_FELY } from './sobreFely';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('sobreFely');

  const descripcion = SOBRE_FELY.historia.texto[locale].join(' ');
  const fotosBackstage = SOBRE_FELY.trayectoria.map((entrada) => entrada.imagen).filter(Boolean);

  return (
    <section>
      <div className={styles.hero} data-navbar-hero>
        <RunwayMediaLateral medio={{ src: SOBRE_FELY.heroImagen }} alt="Fely Campo" />
      </div>

      <div className={styles.textoDescripcion}>
        <div className={styles.textoRow}>
          <p className={styles.nombre}>Fely Campo</p>
          <p className={styles.temporada}>{t('eyebrow')}</p>
        </div>

        <RunwayDescripcion texto={descripcion} />
      </div>

      <div className="contenedor">
        <RunwayBackstage
          imagenes={fotosBackstage}
          poema={{
            texto: SOBRE_FELY.manifiesto.texto[locale],
            imagenes: SOBRE_FELY.manifiesto.imagenesPoema,
            indice: 3,
          }}
          alt="Fely Campo"
        />
      </div>

      <div className="contenedor">
        <div className={styles.enlacesExternos}>
          <div className={styles.enlaceExternoDestacado}>
            <TarjetaEnlaceExterno
              href={SOBRE_FELY.documental.href}
              titulo={SOBRE_FELY.documental.titulo}
              meta={SOBRE_FELY.documental.meta[locale]}
              imagen={SOBRE_FELY.documental.imagen}
              alt={SOBRE_FELY.documental.titulo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
