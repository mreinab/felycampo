// MediaBanner.jsx

'use client';

import { useTranslations } from 'next-intl';
import { Boton, ImageTitle } from '../ui';
import styles from './MediaBanner.module.css';

/**
 * Pieza editorial estática: una única imagen o vídeo a ancho completo
 * con texto superpuesto abajo, centrado — emparentada visualmente con
 * HeroCarousel pero sin carrusel ni barra de progreso.
 *
 * variante="etiqueta" (default): etiqueta en mayúsculas + CTA, blanco.
 * El CTA no lleva href propio (Boton sin href renderiza un <span>), así
 * que toda la pieza puede ser un único <a> clicable sin problema.
 * variante="imageTitle": la composición de ImageTitle (título + CTA)
 * en --color-tinta. ImageTitle exige href en su CTA y renderiza su
 * propio <a> — por eso aquí el contenedor pasa a ser un <div>, no un
 * <a>: la imagen deja de ser clicable por sí sola, solo el CTA
 * (enlace real) navega. Evita anidar <a> dentro de <a>.
 */
function MediaBanner({ src, tipo = 'imagen', labelKey, tituloKey, ctaKey, href, variante = 'etiqueta' }) {
  const t = useTranslations();
  const esImageTitle = variante === 'imageTitle';
  const Contenedor = esImageTitle ? 'div' : 'a';

  return (
    <Contenedor {...(esImageTitle ? {} : { href })} className={styles.banner}>
      {tipo === 'video' ? (
        <video src={src} className={styles.media} autoPlay muted loop playsInline />
      ) : (
        <img src={src} alt="" className={styles.media} />
      )}

      <div className={styles.contenido}>
        {esImageTitle ? (
          <ImageTitle
            titulo={t(tituloKey)}
            ctaTexto={t(ctaKey)}
            href={href}
            variante="oscuro"
          />
        ) : (
          <>
            <p className={styles.etiqueta}>{t(labelKey)}</p>
            <Boton variante="texto" className={styles.cta}>{t(ctaKey)}</Boton>
          </>
        )}
      </div>
    </Contenedor>
  );
}

export default MediaBanner;
