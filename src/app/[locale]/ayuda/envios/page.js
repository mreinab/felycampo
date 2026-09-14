/* ============================================================
   ENVÍOS — Fely Campo. Ruta: /ayuda/envios
   Enlazada desde el footer ("Envíos", ver Footer.jsx) — antes no
   existía, el enlace era un placeholder "#". Mismo patrón simple que
   /ayuda/atencion-cliente (título + lista de filas etiqueta/valor,
   ver ese page.module.css) — namespace propio "envios" en
   messages/{locale}.json en vez de reutilizar "atencionCliente" (esta
   página es sobre el envío en sí, no sobre cómo contactar).

   ProductHero arriba (mismo componente que Tienda/Atelier, con
   "entrada-suave" — global.css — para que se funda al montar) —
   registrada en RUTAS_CON_PRODUCT_HERO (../../layout.js). Título con
   el mismo estilo que CollectionTitle.module.css (.titulo, reutilizado
   tal cual como en CabeceraSeccion.jsx). El párrafo introductorio va
   justificado (no centrado: es el único texto largo de la página). */

import { getTranslations } from 'next-intl/server';
import { ProductHero } from '@/components/layout';
import collectionTitleStyles from '@/components/ui/CollectionTitle.module.css';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('envios');

  return (
    <section>
      <ProductHero imagen="/img/felycampo-lacoleccion-3.webp" className="entrada-suave" />

      <div className="seccion contenedor">
        <h1 className={`${collectionTitleStyles.titulo} ${styles.titulo}`}>{t('titulo')}</h1>

        <p className={styles.intro}>{t('texto')}</p>

        <div className={styles.lista}>
          <div className={styles.fila}>
            <span className={styles.etiqueta}>{t('entregaLabel')}</span>
            <span>{t('entrega')}</span>
          </div>

          <div className={styles.fila}>
            <span className={styles.etiqueta}>{t('zonaLabel')}</span>
            <span>{t('zona')}</span>
          </div>

          <div className={styles.fila}>
            <span className={styles.etiqueta}>{t('seguimientoLabel')}</span>
            <span>{t('seguimiento')}</span>
          </div>
        </div>

        <p className={styles.dudas}>
          {t.rich('dudasTexto', {
            email: (chunks) => <a href="mailto:info@felycampo.com" className="enlace-texto">{chunks}</a>,
            atencion: (chunks) => <a href={`/${locale}/ayuda/atencion-cliente`} className="enlace-texto">{chunks}</a>,
          })}
        </p>
      </div>
    </section>
  );
}
