/* ============================================================
   SOBRE FELY — Fely Campo. Ruta: /sobre-fely
   "Una vida entre telas": hero (HeroPagina — "Fely Campo" / "Una vida
   entre telas.") → 6 capítulos de biografía (ver "capitulos" en
   sobreFely.js: título + subtítulo + texto y sus fotos, cada uno con
   su disposición — mismo diseño sencillo que las secciones de
   AtelierDetalle, sin números ni tipografías propias) →
   cierre ("Una vida entre telas. Una historia que sigue.") → tarjeta
   del documental de las 54 cintas VHS (TarjetaEnlaceExterno).
   Sustituye a la maquetación anterior (RunwayDescripcion +
   RunwayBackstage con trayectoria por años y manifiesto, ver
   historial).

   Server Component — los títulos del hero salen de messages
   (getTranslations), el resto del texto de sobreFely.js. Cada bloque
   aparece con scroll vía <EnVista> (Client Component), mismo fundido+
   subida que el resto del sitio. */

import { getTranslations } from 'next-intl/server';
import { HeroPagina, TarjetaEnlaceExterno } from '@/components/layout';
import { EnVista } from '@/components/ui';
import { SOBRE_FELY } from './sobreFely';
import styles from './page.module.css';
import { metadataPagina } from '@/lib/seo';

const CLASE_DISPOSICION = {
  imagenIzquierda: styles.imagenIzquierda,
  imagenDerecha: styles.imagenDerecha,
  tira: styles.tira,
  columna: styles.columna,
};

// Foto + pie de imagen propio (si lo trae, ver "foto" en sobreFely.js).
// .marco es el recuadro de la foto; el pie va fuera de él, debajo.
function Figura({ foto, alt, locale }) {
  return (
    <EnVista as="figure" className={styles.figura}>
      <div className={styles.marco}>
        <img src={foto.src} alt={foto.pie ? foto.pie[locale] : alt} className={styles.imagen} loading="lazy" decoding="async" />
      </div>
      {foto.pie && <figcaption className={styles.pie}>{foto.pie[locale]}</figcaption>}
    </EnVista>
  );
}

function Capitulo({ capitulo, locale }) {
  const alt = `Fely Campo — ${capitulo.etiqueta[locale]}`;
  const clasesMedios = [
    styles.medios,
    capitulo.disposicion !== 'tira' && !capitulo.apiladas && capitulo.imagenes.length === 2 && styles.mediosPareja,
    capitulo.apiladas && styles.mediosApilados,
  ].filter(Boolean).join(' ');

  return (
    <article id={capitulo.id} className={`${styles.capitulo} ${CLASE_DISPOSICION[capitulo.disposicion]}`}>
      {/* Mismo tratamiento que las secciones de AtelierDetalle
          (.seccionTitulo/.seccionTexto en atelier-fiesta/page.module.css):
          título corto en mayúsculas + subtítulo + párrafos, sin números. */}
      <EnVista className={styles.texto}>
        <h2 className={styles.titulo}>{capitulo.etiqueta[locale]}</h2>
        <p className={styles.subtitulo}>{capitulo.titulo[locale]}</p>
        {capitulo.parrafos[locale].map((parrafo) => (
          <p key={parrafo} className={styles.parrafo}>{parrafo}</p>
        ))}
        {capitulo.cita && <p className={styles.cita}>{capitulo.cita[locale]}</p>}
      </EnVista>

      {/* Pie compartido (capitulo.pie): uno solo debajo de todas las
          fotos, en vez de repetirlo bajo cada una. */}
      <div className={styles.mediosBloque}>
        <div className={clasesMedios}>
          {capitulo.imagenes.map((foto) => (
            <Figura key={foto.src} foto={foto} alt={alt} locale={locale} />
          ))}
        </div>
        {capitulo.pie && <p className={styles.pie}>{capitulo.pie[locale]}</p>}
      </div>

      {capitulo.galeria && (
        <div className={styles.galeria}>
          {capitulo.galeria.map((foto) => (
            <Figura key={foto.src} foto={foto} alt={alt} locale={locale} />
          ))}
        </div>
      )}
    </article>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/sobre-fely' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations('sobreFely');
  const tHero = await getTranslations('heroPagina');
  const { capitulos, cierre, documental } = SOBRE_FELY;

  return (
    <section>
      {/* fijarEnMobile: efecto "pin" en mobile (ver HeroPagina.jsx) — el
          .contenido que sigue lleva fondo opaco para taparla. */}
      <HeroPagina
        imagen={SOBRE_FELY.heroImagen}
        alt="Fely Campo"
        titulo={t('tituloHero')}
        subtitulo={tHero('sobreFely')}
        fijarEnMobile
      />

      <div className={styles.contenido}>
        <div className={`contenedor ${styles.capitulos}`}>
          {capitulos.map((capitulo) => (
            <Capitulo key={capitulo.id} capitulo={capitulo} locale={locale} />
          ))}
        </div>

        <EnVista className={styles.cierre}>
          <h2 className={styles.cierreTitulo}>{cierre.titulo[locale]}</h2>
          {cierre.parrafos[locale].map((parrafo) => (
            <p key={parrafo} className={styles.cierreParrafo}>{parrafo}</p>
          ))}
        </EnVista>

        <div className="contenedor">
          <div className={styles.enlacesExternos}>
            <div className={styles.enlaceExternoDestacado}>
              <TarjetaEnlaceExterno
                href={documental.href}
                titulo={documental.titulo}
                meta={documental.meta[locale]}
                imagen={documental.imagen}
                alt={documental.titulo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
