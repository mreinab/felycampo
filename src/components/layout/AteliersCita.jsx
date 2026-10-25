// AteliersCita.jsx
//
// Tres columnas pegadas (Salamanca, Madrid, Oviedo) justo encima de la
// banda PedirCita (que va pegada al footer): cada una con la foto de su atelier, velo oscuro en
// degradado y el rótulo "Atelier {ciudad} & Showroom" arriba con
// "Conoce más" abajo. Toda la pieza es un único <a> a la ficha de su
// atelier (Boton sin href = <span>). Lo pinta [locale]/layout.js solo
// donde hay intención de visitar un atelier (ver conAteliersCitaEn).

import { getLocale, getTranslations } from 'next-intl/server';
import { Boton, EnVista } from '../ui';
import { ATELIERES } from '@/app/[locale]/atelier-fiesta/atelieres';
import styles from './AteliersCita.module.css';

// Foto = la del hero de su propia ficha (/atelier-fiesta/[id], ver
// atelieres.js) salvo que la entrada traiga la suya (Madrid, a
// petición: su hero es vídeo).
const ATELIERES_CITA = [
  { id: 'salamanca' },
  { id: 'madrid', imagen: '/img/atelier/showroom-madrid/fely-campo-atelier-madrid-foto-2.webp' },
  { id: 'oviedo' },
].map(({ id, imagen }) => ({
  id,
  imagen: imagen ?? ATELIERES[id].heroMedio.src,
}));

// "separado" (opcional): más aire en blanco encima (ver .separado en el
// CSS) — en /atelier, para separar la sección de las fotos de arriba.
export default async function AteliersCita({ separado = false }) {
  const locale = await getLocale();
  const tPedirCita = await getTranslations('pedirCitaLanding');
  const tAtelierFiesta = await getTranslations('atelierFiesta');

  return (
    <section className={`${styles.ateliersCita} ${separado ? styles.separado : ''}`}>
      {ATELIERES_CITA.map(({ id, imagen }) => (
        <EnVista
          key={id}
          as="a"
          href={`/${locale}/atelier-fiesta/${id}`}
          className={styles.atelierCita}
        >
          <img src={imagen} alt="" className={styles.atelierCitaImagen} />
          <div className={styles.atelierCitaContenido}>
            <p className={styles.atelierCitaTitulo}>
              Atelier {tAtelierFiesta(`${id}.titulo`)}
              {/* Salto solo en mobile — en escritorio el título va en una línea (ver .saltoMovil). */}
              {' '}<br className={styles.saltoMovil} />
              &amp; Showroom
            </p>
            <Boton variante="texto" className={styles.atelierCitaCta}>{tPedirCita('ctaAtelier')}</Boton>
          </div>
        </EnVista>
      ))}
    </section>
  );
}
