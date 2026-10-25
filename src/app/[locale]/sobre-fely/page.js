/* ============================================================
   SOBRE FELY — Fely Campo. Ruta: /sobre-fely
   "Una vida entre telas": hero (HeroPagina — "Fely Campo" / "Una vida
   entre telas.") → 6 capítulos de biografía (ver "capitulos" en
   sobreFely.js: título + subtítulo + texto y sus fotos, sobre el grid
   de 24 columnas de Descubre a Fely, foto alternando de lado — sin
   números ni tipografías propias) →
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

// Capítulo sobre el grid de 24 columnas (mismo esquema que Descubre a
// Fely en la landing, ver page.module.css): foto principal en una
// mitad y texto en la otra, dos columnas de separación, alternando de
// lado por capítulo ("invertido" en los pares). Fotos extra: una sola
// va debajo del texto, en su misma columna; dos o más, en filas de dos
// debajo (una por mitad), igual que la galería. Todas a su proporción.
function Capitulo({ capitulo, indice, locale }) {
  const alt = `Fely Campo — ${capitulo.etiqueta[locale]}`;
  const [principal, ...extras] = capitulo.imagenes;
  const extraJuntoAlTexto = extras.length === 1 ? extras[0] : null;
  const extrasEnFila = extras.length >= 2 ? extras : [];
  // Pie compartido (capitulo.pie): uno solo, debajo de la última de
  // las "imagenes" (no de la galería), en vez de repetirlo en cada una.
  const pie = capitulo.pie && <p className={styles.pie}>{capitulo.pie[locale]}</p>;

  return (
    <article
      id={capitulo.id}
      className={`${styles.capitulo} ${indice % 2 === 1 ? styles.invertido : ''}`}
    >
      <div className={styles.principal}>
        <Figura foto={principal} alt={alt} locale={locale} />
        {extras.length === 0 && pie}
      </div>

      <div className={styles.lado}>
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

        {extraJuntoAlTexto && (
          <div className={styles.extraTexto}>
            <Figura foto={extraJuntoAlTexto} alt={alt} locale={locale} />
            {pie}
          </div>
        )}
      </div>

      {extrasEnFila.length > 0 && (
        <div className={styles.pareja}>
          {extrasEnFila.map((foto) => (
            <Figura key={foto.src} foto={foto} alt={alt} locale={locale} />
          ))}
          {pie && <div className={styles.parejaPie}>{pie}</div>}
        </div>
      )}

      {capitulo.galeria && (
        <div className={styles.pareja}>
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
          .contenido que sigue lleva fondo opaco para taparla.
          heroEncuadre: en mobile centra el recorte en Fely (ver
          page.module.css). */}
      <HeroPagina
        imagen={SOBRE_FELY.heroImagen}
        alt="Fely Campo"
        titulo={t('tituloHero')}
        subtitulo={tHero('sobreFely')}
        fijarEnMobile
        className={styles.heroEncuadre}
      />

      <div className={styles.contenido}>
        <div className={`contenedor ${styles.capitulos}`}>
          {capitulos.map((capitulo, indice) => (
            <Capitulo key={capitulo.id} capitulo={capitulo} indice={indice} locale={locale} />
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
