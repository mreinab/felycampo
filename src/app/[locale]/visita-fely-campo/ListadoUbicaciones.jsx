// ListadoUbicaciones.jsx

'use client';

/* ============================================================
   LISTADO DE UBICACIONES — VISÍTENOS — Fely Campo
   Chips de ciudad (Salamanca/Madrid/Oviedo, ver PanelFiltros.module.css
   .chips/.chip/.chipActivo — mismo elemento, reutilizado aquí en vez
   de recrearlo) + listado filtrado. Client Component aparte de page.js
   (Server Component) porque el filtro necesita estado — ver
   ubicaciones.js para "ciudad" en cada dato.
   Selección única con toggle: clicar la ciudad ya activa la
   deselecciona (vuelve a "todas"), igual que los chips de
   PanelFiltros — no hay chip "Todas" aparte, ese estado es
   "ciudadActiva === null".
   CabeceraSeccion vive aquí (no en page.js) para poder pasarle los
   chips como "children" — así quedan dentro de
   .cabeceraProductos.cabeceraInicio, no como hermano suelto debajo.
   Cada tarjeta abre con una foto/vídeo (ver .galeria en
   page.module.css), sacada del fondo común de public/img/talleres/ —
   ver MEDIOS_TALLERES/medioDe más abajo. */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CabeceraSeccion } from '@/components/ui';
import { UBICACIONES } from './ubicaciones';
import styles from './page.module.css';

const CIUDADES = ['Salamanca', 'Madrid', 'Oviedo'];

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
  const [ciudadActiva, setCiudadActiva] = useState(null);

  const ubicacionesVisibles = ciudadActiva
    ? UBICACIONES.filter((ubicacion) => ubicacion.ciudad === ciudadActiva)
    : UBICACIONES;

  return (
    <>
      <CabeceraSeccion
        subtitleKey="visitenos.eyebrow"
        titleKey="visitenos.titulo"
        descriptionKey="visitenos.intro"
        alinear="start"
        enCuadricula
        className={styles.cabeceraColumna}
      >
        <div className={styles.chips}>
          {CIUDADES.map((ciudad) => (
            <button
              key={ciudad}
              type="button"
              className={`${styles.chip} ${ciudadActiva === ciudad ? styles.chipActivo : ''}`}
              aria-pressed={ciudadActiva === ciudad}
              onClick={() => setCiudadActiva((actual) => (actual === ciudad ? null : ciudad))}
            >
              {ciudad}
            </button>
          ))}
          {/* No filtra nada (no es un "ciudadActiva" más) — ancla al
              MapaPuntosVenta de más abajo (ver id="mapa-puntos-venta"
              en page.js); scroll-behavior:smooth ya es global (ver
              global.css), no hace falta JS. */}
          <a href="#mapa-puntos-venta" className={styles.chip}>
            {t('verMapa')}
          </a>
        </div>
      </CabeceraSeccion>

      <ul className={styles.lista}>
        {ubicacionesVisibles.map((ubicacion) => {
          // Un solo teléfono → "Telf"; dos → "Telf" (fijo) y "Móvil" —
          // seguido de "WhatsApp", cada uno en su propia línea.
          const etiquetasTelefono = [t('telf'), t('movil')];
          const lineaContacto = [
            ...ubicacion.telefonos.map((telefono, indiceTelefono) => `${etiquetasTelefono[indiceTelefono] || t('telf')}: ${telefono}`),
            `${t('whatsapp')}: ${ubicacion.whatsapp}`,
          ].join('\n');

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

                    <p className={styles.horario}>
                      {ubicacion.horario ? ubicacion.horario[locale] : t('showroomNota')}
                    </p>

                    <p className={styles.descripcion}>{ubicacion.descripcion[locale]}</p>
                  </div>

                  <div className={styles.acciones}>
                    {/* href="#" — a la espera de los enlaces reales (Maps/WhatsApp por sede). */}
                    <a href="#" target="_blank" rel="noopener noreferrer" className={styles.accionBtnContorno}>
                      {t('verMapa')}
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className={styles.accionBtnContorno}>
                      {t('whatsapp')}
                    </a>
                    {/* "Pedir cita" va la última de la fila a propósito. */}
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
