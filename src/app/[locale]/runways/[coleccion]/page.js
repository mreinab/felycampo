/* Ruta DINÁMICA: ficha de cada colección de Runway.
   URL pública: /runways-diafonia, /runways-self-world,
   /runways-la-coleccion... (antes /colecciones-fely-campo/[slug]-
   [temporada] — renombrada a petición directa del usuario). Next.js no
   admite una carpeta "runways-[coleccion]" (segmento dinámico con
   prefijo literal pegado — solo admite "[param]" a secas), así que
   esta carpeta vive en /runways/[coleccion] (ruta normal, con barra) y
   un rewrite en next.config.mjs traduce /runways-:coleccion a
   /runways/:coleccion por debajo — la URL que ve el usuario nunca
   lleva la barra. El slug es "coleccion.slug" tal cual (ya no lleva la
   temporada al final, a diferencia del esquema anterior) — se busca
   ahí la colección para poder mostrar su nombre/temporada/medios/looks
   reales en vez de derivarlos del slug.

   Diseño: hero a 80vh a ancho completo (RunwayMediaLateral: el medio
   principal de la colección, vídeo o imagen, ahora a 100% de ancho —
   marcado data-navbar-hero para que el Navbar blanco/transparente de
   arriba se vuelva sólido al salir de él, igual que ProductHero en
   Tienda/Atelier) → .textoRow (nombre y temporada a tamaño h1, en fila
   y separados) + RunwayDescripcion (texto editorial), ambos dentro de
   un contenedor común a todo el ancho → RunwayBackstage (cuadrícula
   editorial de fotos de backstage, opcional — solo si la colección
   trae "backstage" en colecciones.js) → cuadrícula de looks
   (RunwayGaleria.jsx: rejilla + lightbox con miniaturas y productos
   vinculados al look activo, si hay) → RunwayVideoCierre (el vídeo de
   la colección, si existe — arranca solo al llegar a su punto en la
   página, sonido opcional). */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { HeroPagina, RunwayBackstage, RunwayDescripcion, RunwayGaleria, RunwayVideoCierre } from '@/components/layout';
import { COLECCIONES } from '../../colecciones-fely-campo/colecciones';
import { metadataPagina, recortar } from '@/lib/seo';
import styles from './page.module.css';

// Canonical = URL pública /runways-{slug} (la del rewrite de
// next.config.mjs), no la interna /runways/{slug}.
export async function generateMetadata({ params }) {
  const { locale, coleccion: slug } = await params;
  const coleccion = COLECCIONES.find((candidata) => candidata.slug === slug);
  if (!coleccion) return {};

  const esEs = locale === 'es';
  return metadataPagina({
    locale,
    ruta: `/runways-${slug}`,
    titulo: `${coleccion.nombre} ${coleccion.temporada} | ${esEs ? 'Colección de pasarela' : 'Runway collection'} Fely Campo`,
    descripcion: recortar(coleccion.descripcion),
    imagen: coleccion.medios?.[0]?.src,
  });
}

export default async function Coleccion({ params }) {
  const { coleccion: slug } = await params;
  const coleccion = COLECCIONES.find((candidata) => candidata.slug === slug);
  if (!coleccion) notFound();

  const medioHero = coleccion.medios[0];
  const t = await getTranslations('heroPagina');

  return (
    <section>
      <HeroPagina
        medio={medioHero}
        alt={coleccion.nombre}
        titulo={[coleccion.nombre, coleccion.temporada]}
        subtitulo={t('runway')}
      />

      <div className={styles.textoDescripcion}>
        <RunwayDescripcion texto={coleccion.descripcion} />
      </div>

      <div className="contenedor">
        <RunwayBackstage imagenes={coleccion.backstage} alt={coleccion.nombre} />
      </div>

      <div className={`${styles.galeria} contenedor`}>
        <RunwayGaleria looks={coleccion.looks} alt={coleccion.nombre} />
      </div>

      <RunwayVideoCierre src={coleccion.video} />
    </section>
  );
}
