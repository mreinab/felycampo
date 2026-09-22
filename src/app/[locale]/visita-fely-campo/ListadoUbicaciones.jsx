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
   Cada tarjeta abre con una mini-galería de 2-3 fotos propias de la
   sede (ver .galeria en page.module.css y FOTOS_POR_CIUDAD/fotosDe más
   abajo) que ciclan con cross-fade al hover — CarruselFotos, ui/,
   mismo componente que ResenasClientes/GaleriaVosotras — en vez de una
   sola foto fija. Cada tarjeta aparece con scroll (<EnVista>,
   @/components/ui) — no se llama useEnVista a mano aquí porque el hook
   no puede invocarse dentro del .map de abajo. */

import { useTranslations } from 'next-intl';
import { CabeceraSeccion, CarruselFotos, EnVista } from '@/components/ui';
import { UBICACIONES } from './ubicaciones';
import styles from './page.module.css';

// Fotos propias de cada sede (antes reciclaban un fondo común de
// public/img/talleres/, ver ubicaciones.js) — 2-3 por ciudad, mismo
// reportaje que ya usan sus fichas de /atelier-fiesta/[ciudad]. Ciclan
// con cross-fade al hover vía CarruselFotos (ui/, compartido con
// ResenasClientes/GaleriaVosotras) en vez de una sola foto fija — ver
// .galeria/.marco en page.module.css (position:relative +
// overflow:hidden va en .marco, no en .galeria — ver el porqué ahí).
const FOTOS_POR_CIUDAD = {
  Salamanca: [
    '/img/atelier/atelier-salamanca/fely-campo-salamanca.jpg',
    '/img/atelier/atelier-salamanca/ateliernovia-lamedida-felycampo-2.webp',
    '/img/atelier/atelier-salamanca/20221222185015_relacionada2.jpg',
  ],
  Madrid: [
    '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_pretaporter-3-1024x683.jpg',
    '/img/atelier/showroom-madrid/felycampo-atelier-madrid.webp',
    '/img/atelier/showroom-madrid/fely_campo_atelier_madrid_showroom-3.jpg',
  ],
  Oviedo: [
    '/img/atelier/atelier-oviedo/atelier-fiesta-oviedo-0.jpg',
    '/img/atelier/atelier-oviedo/atelier_fiesta_oviedo_felycampo_5-2048x1365.webp',
  ],
};

function fotosDe(ciudad) {
  return FOTOS_POR_CIUDAD[ciudad];
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

          return (
            <li key={ubicacion.id}>
              <EnVista as="article" className={styles.tarjeta}>
                <div className={styles.galeria}>
                  <div className={styles.marco}>
                    <CarruselFotos fotos={fotosDe(ubicacion.ciudad)} />
                  </div>

                  {/* Mobile/tablet (ver media query en page.module.css):
                      tira con swipe nativo en vez del cross-fade al
                      hover de arriba, que no tiene mucho sentido en
                      táctil puro. */}
                  <div className={styles.galeriaMovil}>
                    {fotosDe(ubicacion.ciudad).map((foto) => (
                      <img key={foto} src={foto} alt="" className={styles.fotoMovil} />
                    ))}
                  </div>
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

                    {/* Justo debajo de la dirección (no al final, tras
                        teléfono/WhatsApp) — a petición, para que el
                        horario se lea junto a dónde está la sede. */}
                    <p className={styles.horario}>
                      {ubicacion.horario ? ubicacion.horario[locale] : t('showroomNota')}
                    </p>

                    <p className={styles.telefono}>{lineaContacto}</p>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsapp}
                    >
                      {t('whatsapp')}: {ubicacion.whatsapp}
                    </a>

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
              </EnVista>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ListadoUbicaciones;
