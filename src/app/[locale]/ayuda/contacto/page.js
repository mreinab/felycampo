/* ============================================================
   CONTACTO — Fely Campo. Ruta: /ayuda/contacto
   Enlazada desde el footer ("Contacto", ver Footer.jsx). Mismo esquema
   que el resto de páginas interiores:
   1. Hero común (ProductHero → HeroPagina): foto a pantalla completa con
      "Contacto" abajo a la izquierda, en blanco.
   2. Los cuatro grupos de contacto (tiendas, email, prêt-à-porter,
      Click & Collect) en fila, con el mismo diseño, tamaños y colores
      que las columnas del footer (ver Footer.module.css), y un CTA a
      "Pedir cita" debajo. Los párrafos de presentación que iban entre
      el hero y los grupos se quitaron a petición ("contacto.parrafos"
      sigue en messages/, sin usar).
   "WhatsApp" (antes "Chat online", texto plano sin acción) enlaza al
   WhatsApp del mismo número de Prêt-à-porter, debajo de su horario.
   Distinta de /ayuda/atencion-cliente (un único teléfono/horario,
   destino del acordeón de envíos de la ficha de producto).
   ============================================================ */

import { getTranslations } from 'next-intl/server';
import { ProductHero } from '@/components/layout';
import { Boton } from '@/components/ui';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('contacto');
  const tCita = await getTranslations('pedirCitaLanding');

  return (
    <section>
      <ProductHero imagen="/img/ContacPage-Hero-FelyCampo.jpg" titulo={t('titulo')} className="entrada-suave" />

      <div className={styles.contacto}>
        <div className={styles.grupos}>
          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('tiendasTitulo')}</p>
            <a href="tel:+34923190053" className={styles.enlace}>+34 923 190 053</a>
            <p className={styles.horario}>{t('horario')}</p>
          </div>

          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('emailTitulo')}</p>
            <a href="mailto:info@felycampo.com" className={styles.enlace}>info@felycampo.com</a>
          </div>

          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('pretaporterTitulo')}</p>
            <a href="tel:+34683703644" className={styles.enlace}>+34 683 703 644</a>
            <p className={styles.horario}>{t('horario')}</p>
            <a
              href="https://wa.me/34683703644"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.enlace}
            >
              {t('whatsapp')}
            </a>
          </div>

          <div className={styles.grupo}>
            <p className={styles.grupoTitulo}>{t('clickCollectTitulo')}</p>
            <a
              href="https://maps.app.goo.gl/rXUHfS5SdrVNNFJq7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.enlace}
            >
              {t('direccion')}
            </a>
          </div>
        </div>

        <div className={styles.cta}>
          {/* Mismo botón que "Suscribirse" del footer: contorno, 40px de
              alto, sin relleno al hover. */}
          <Boton
            variante="contorno"
            tamano="full"
            href={`/${locale}/visita-fely-campo/cita`}
            className={styles.ctaBoton}
          >
            {tCita('cta')}
          </Boton>
        </div>
      </div>
    </section>
  );
}
