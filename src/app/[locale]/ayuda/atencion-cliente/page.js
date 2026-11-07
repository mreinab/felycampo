/* Ruta: /ayuda/atencion-cliente
   Destino del enlace "Más información en Atención al cliente" del
   acordeón "Envíos y devoluciones" de la ficha de producto (ver
   tienda/[producto]/page.js) — mismos datos de contacto que ahí,
   namespace compartido "atencionCliente" en messages/{locale}.json (solo
   los rótulos). Email, teléfono y horario: lib/contacto.js; la dirección,
   la del atelier de Salamanca (lib/ateliers.js). Editables en el admin. */

import { getTranslations } from 'next-intl/server';
import styles from './page.module.css';
import { metadataPagina } from '@/lib/seo';
import { enlaceMapa, obtenerSede, ubicacionDe } from '@/lib/ateliers';
import { enlaceTelefono, obtenerContacto } from '@/lib/contacto';
import { textoEn } from '@/lib/previa';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/ayuda/atencion-cliente' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('atencionCliente');
  const contacto = obtenerContacto();
  const salamanca = ubicacionDe(obtenerSede('salamanca'));

  return (
    <section className="seccion contenedor">
      <h1 className={styles.titulo}>{t('titulo')}</h1>

      <div className={styles.lista}>
        <div className={styles.fila}>
          <span className={styles.etiqueta}>{t('emailLabel')}</span>
          <a href={`mailto:${contacto.email}`} className="enlace-texto">{contacto.email}</a>
        </div>

        <div className={styles.fila}>
          <span className={styles.etiqueta}>{t('telefonoLabel')}</span>
          <a href={enlaceTelefono(contacto.telefono)} className="enlace-texto">{contacto.telefono}</a>
        </div>

        <div className={styles.fila}>
          <span className={styles.etiqueta}>{t('horarioLabel')}</span>
          <span>{textoEn(contacto.horario, locale)}</span>
        </div>

        <div className={styles.fila}>
          <span className={styles.etiqueta}>{t('clickCollectLabel')}</span>
          <span>{t('clickCollect')}</span>
        </div>

        <div className={styles.fila}>
          <span className={styles.etiqueta}>{t('direccionLabel')}</span>
          <a
            href={enlaceMapa(salamanca)}
            target="_blank"
            rel="noopener noreferrer"
            className="enlace-texto"
          >
            {salamanca.direccion.join(', ')}
          </a>
        </div>
      </div>
    </section>
  );
}
