/* ============================================================
   DEVOLUCIONES — Fely Campo. Ruta: /ayuda/devoluciones
   Enlazada desde el footer ("Devoluciones", ver Footer.jsx) — antes no
   existía, el enlace era un placeholder "#". Mismo texto que ya vivía
   en el acordeón "Envíos y devoluciones" de la ficha de producto
   (namespace "producto".devolucionesTexto, ver tienda/[producto]/page.js)
   pero como página propia, con namespace propio "devoluciones" en vez
   de mezclarlo con las claves de ficha de producto.

   ProductHero arriba (mismo componente que Tienda/Atelier, con
   "entrada-suave" — global.css — para que se funda al montar) —
   registrada en RUTAS_CON_PRODUCT_HERO (../../layout.js). Título con
   el mismo estilo que CollectionTitle.module.css (.titulo, reutilizado
   tal cual como en CabeceraSeccion.jsx). El párrafo principal va
   justificado (no centrado: es el único texto largo de la página). */

import { getTranslations } from 'next-intl/server';
import { ProductHero } from '@/components/layout';
import collectionTitleStyles from '@/components/ui/CollectionTitle.module.css';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('devoluciones');

  return (
    <section>
      <ProductHero imagen="/img/felycampo-lacoleccion-3.webp" className="entrada-suave" />

      <div className="seccion contenedor">
        <h1 className={`${collectionTitleStyles.titulo} ${styles.titulo}`}>{t('titulo')}</h1>

        <p className={styles.texto}>
          {t.rich('texto', {
            email: (chunks) => <a href="mailto:info@felycampo.com" className="enlace-texto">{chunks}</a>,
            telefono: (chunks) => <a href="tel:+34683703644" className="enlace-texto">{chunks}</a>,
          })}
        </p>

        <div className={styles.lista}>
          <div className={styles.fila}>
            <span className={styles.etiqueta}>{t('gastosLabel')}</span>
            <span>{t('gastos')}</span>
          </div>
        </div>

        <p className={styles.masInfo}>
          {t.rich('masInfoTexto', {
            atencion: (chunks) => <a href={`/${locale}/ayuda/atencion-cliente`} className="enlace-texto">{chunks}</a>,
          })}
        </p>
      </div>
    </section>
  );
}
