/* ============================================================
   CONTACTO — Fely Campo. Ruta: /ayuda/contacto
   Enlazada desde el footer ("Contacto", ver Footer.jsx) — antes no
   existía, el enlace era un placeholder "#". Distinta de
   /ayuda/atencion-cliente (un único teléfono/horario, pensada como
   destino del acordeón de envíos de la ficha de producto): aquí hay
   dos departamentos con su propio teléfono ("Atención a tiendas" y
   "Atención Prêt-à-porter", contenido real del encargo) + Click &
   Collect + los párrafos de presentación de la firma (mismo tono que
   RunwayDescripcion, pero varios párrafos cortos en vez de uno largo
   con \n\n — t.raw('parrafos'), mismo patrón que
   SectionClientsReview.jsx para arrays en messages/{locale}.json).

   ProductHero arriba (mismo componente que Tienda/Atelier, con
   "entrada-suave" — global.css — para que se funda al montar, no de
   golpe: ver ProductHero.jsx) — registrada en RUTAS_CON_PRODUCT_HERO
   (../../layout.js) para que el Navbar arranque transparente aquí
   también. Título con el mismo estilo que CollectionTitle.module.css
   (.titulo, reutilizado tal cual como en CabeceraSeccion.jsx, no el
   componente entero porque este solo admite claves de traducción y
   aquí el texto ya viene resuelto de getTranslations) — ese .titulo no
   trae su propio centrado (vive normalmente dentro de .bloque en
   CollectionTitle.jsx), así que aquí se centra a mano en
   page.module.css. Los párrafos largos van justificados (no centrados:
   se leerían peor en varias líneas) — el resto (grupos de contacto) se
   queda centrado. */

import { getTranslations } from 'next-intl/server';
import { ProductHero } from '@/components/layout';
import collectionTitleStyles from '@/components/ui/CollectionTitle.module.css';
import styles from './page.module.css';

export default async function Pagina() {
  const t = await getTranslations('contacto');
  const parrafos = t.raw('parrafos');

  return (
    <section>
      <ProductHero imagen="/img/FelyCampo_AW2026_KristenWicce_ALTA-52.jpg" className="entrada-suave" />

      <div className="seccion contenedor">
        <h1 className={`${collectionTitleStyles.titulo} ${styles.titulo}`}>{t('titulo')}</h1>

        <div className={styles.grupos}>
          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('tiendasTitulo')}</p>
            <a href="tel:+34923190053" className="enlace-texto">+34 923 190 053</a>
            <p className={styles.horario}>{t('horario')}</p>
          </div>

          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('emailTitulo')}</p>
            <a href="mailto:info@felycampo.com" className="enlace-texto">info@felycampo.com</a>
          </div>

          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('pretaporterTitulo')}</p>
            <p className={styles.chat}>{t('chatOnline')}</p>
            <a href="tel:+34683703644" className="enlace-texto">+34 683 703 644</a>
            <p className={styles.horario}>{t('horario')}</p>
          </div>

          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('clickCollectTitulo')}</p>
            <a
              href="https://maps.app.goo.gl/rXUHfS5SdrVNNFJq7"
              target="_blank"
              rel="noopener noreferrer"
              className="enlace-texto"
            >
              {t('direccion')}
            </a>
          </div>
        </div>

        <div className={styles.parrafos}>
          {parrafos.map((parrafo, indice) => (
            <p key={indice}>{parrafo}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
