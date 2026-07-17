// SplitMedia.jsx

'use client';

import { useTranslations } from 'next-intl';
import { Boton, ImageTitle } from '../ui';
import styles from './SplitMedia.module.css';

/**
 * Dos piezas editoriales lado a lado (imagen o vídeo), cada una con
 * su propio href — independientes entre sí. En móvil pasan a una
 * columna (ver SplitMedia.module.css). Recibe exactamente 2 items.
 *
 * Las dos variantes se posicionan igual (abajo, centrado) — solo
 * cambia el color del texto:
 * variante="etiqueta" (default): etiqueta + CTA en blanco. El CTA no
 * lleva href propio (Boton sin href renderiza un <span>), así que
 * cada pieza puede ser un único <a> clicable sin problema.
 * variante="imageTitle": la composición de ImageTitle (título + CTA)
 * en --color-tinta. ImageTitle exige href en su CTA y renderiza su
 * propio <a> — por eso aquí cada pieza pasa a ser un <div>, no un
 * <a>: la imagen deja de ser clicable por sí sola, solo el CTA
 * (enlace real) navega. Evita anidar <a> dentro de <a>.
 */
function SplitMedia({ items, variante = 'etiqueta' }) {
  const t = useTranslations();
  const esImageTitle = variante === 'imageTitle';
  const Pieza = esImageTitle ? 'div' : 'a';

  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <Pieza key={index} {...(esImageTitle ? {} : { href: item.href })} className={styles.pieza}>
          {item.tipo === 'video' ? (
            <video src={item.src} className={styles.media} autoPlay muted loop playsInline />
          ) : (
            <img src={item.src} alt="" className={styles.media} />
          )}

          <div className={styles.contenido}>
            {esImageTitle ? (
              <ImageTitle
                titulo={t(item.tituloKey)}
                ctaTexto={t(item.ctaKey)}
                href={item.href}
                variante="oscuro"
              />
            ) : (
              <>
                <p className={styles.etiqueta}>{t(item.labelKey)}</p>
                <Boton variante="texto" className={styles.cta}>{t(item.ctaKey)}</Boton>
              </>
            )}
          </div>
        </Pieza>
      ))}
    </div>
  );
}

export default SplitMedia;
