// ListadoUbicaciones.jsx

'use client';

/* ============================================================
   LISTADO DE UBICACIONES — VISÍTENOS — Fely Campo
   Client Component aparte de page.js (Server Component) solo porque
   necesitaba estado para el filtro de ciudad — ya sin él (solo 3
   ubicaciones, una por ciudad, ver ubicaciones.js), sigue siendo
   Client Component por si vuelve a necesitarlo, pero de momento es
   un listado sin más.
   CabeceraSeccion vive aquí (no en page.js) por si en el futuro vuelve
   a necesitar pasarle contenido como "children" (chips, filtros...).
   Cada tarjeta abre con una foto/vídeo (ver .galeria en
   page.module.css), sacada del fondo común de public/img/talleres/ —
   ver MEDIOS_TALLERES/medioDe más abajo. */

import { useTranslations } from 'next-intl';
import { CabeceraSeccion } from '@/components/ui';
import { UBICACIONES } from './ubicaciones';
import styles from './page.module.css';

// Fondo común de fotos de talleres (public/img/talleres/) — sin imagen
// propia por sede todavía (ver ubicaciones.js), cada tarjeta saca la
// suya de aquí por ciudad. Placeholders: los tres únicos archivos
// nombrados con la ciudad (el resto del fondo son hash sin identificar).
const MEDIOS_POR_CIUDAD = {
  Salamanca: { src: '/img/talleres/salamanca-ateliernovia-ateliernoviasalamanca-ubicacion-felycampo.webp', tipo: 'imagen' },
  Madrid: { src: '/img/talleres/madrid-atelier_madrid_fiesta_novia_medida.webp', tipo: 'imagen' },
  Oviedo: { src: '/img/talleres/oviedo-atelier_fiesta_oviedo_felycampo_espacio_9-2048x1365.webp', tipo: 'imagen' },
};

function medioDe(ciudad) {
  return MEDIOS_POR_CIUDAD[ciudad];
}

function ListadoUbicaciones({ locale }) {
  const t = useTranslations('visitenos');

  return (
    <>
      <CabeceraSeccion
        subtitleKey="visitenos.eyebrow"
        titleKey="visitenos.titulo"
        descriptionKey="visitenos.intro"
        alinear="start"
        enCuadricula
        className={styles.cabeceraColumna}
      />

      <ul className={styles.lista}>
        {UBICACIONES.map((ubicacion) => {
          // Un solo teléfono → "Telf"; dos → "Telf" (fijo) y "Móvil" —
          // cada uno en su propia línea. WhatsApp va aparte (ver
          // .whatsapp más abajo): es un enlace real a wa.me, no texto
          // plano como los teléfonos.
          const etiquetasTelefono = [t('telf'), t('movil')];
          const lineaContacto = ubicacion.telefonos
            .map((telefono, indiceTelefono) => `${etiquetasTelefono[indiceTelefono] || t('telf')}: ${telefono}`)
            .join('\n');
          const whatsappHref = `https://wa.me/${ubicacion.whatsapp.replace(/\D/g, '')}`;

          const medio = medioDe(ubicacion.ciudad);

          return (
            <li key={ubicacion.id}>
              <article className={styles.tarjeta}>
                <div className={styles.galeria}>
                  {medio.tipo === 'video' ? (
                    <video src={medio.src} className={styles.celda} autoPlay muted loop playsInline />
                  ) : (
                    <img src={medio.src} alt="" className={styles.celda} />
                  )}
                </div>

                <div className={styles.fila}>
                  <div className={styles.info}>
                    <p className={styles.nombre}>{ubicacion.nombre}</p>

                    <address className={styles.direccionWrap}>
                      {/* href="#" — a la espera del enlace real de Maps por sede, ver .acciones más abajo. */}
                      <a href="#" target="_blank" rel="noopener noreferrer" className={styles.direccion}>
                        {ubicacion.direccion.join('\n')}
                      </a>
                    </address>

                    <p className={styles.telefono}>{lineaContacto}</p>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsapp}
                    >
                      {t('whatsapp')}: {ubicacion.whatsapp}
                    </a>

                    <p className={styles.horario}>
                      {ubicacion.horario ? ubicacion.horario[locale] : t('showroomNota')}
                    </p>

                    <p className={styles.descripcion}>
                      {ubicacion.descripcion[locale]}{' '}
                      <a href={`/${locale}/atelier-fiesta/${ubicacion.ciudad.toLowerCase()}`} className={styles.conoceMas}>
                        {t('conoceMas')}
                      </a>
                    </p>
                  </div>

                  <div className={styles.acciones}>
                    <a
                      href={`/${locale}/visita-fely-campo/cita?ubicacion=${ubicacion.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.accionBtn}
                    >
                      {t('pedirCita')}
                    </a>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ListadoUbicaciones;
