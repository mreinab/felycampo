/* Ruta DINÁMICA: listado de Fiesta filtrado por una categoría de
   "Estilo y silueta" — /atelier/fiesta/categoria/romantico... Mismo
   criterio que atelier/novias/categoria/[categoria]/page.js (ver los
   comentarios ahí) — aquí además acepta las opciones del grupo
   "ocasion" (soloFiesta: true en GRUPOS_ESTILO_SILUETA), que Novias no
   tiene sentido que sirva.

   Sin "Prêt-à-porter" en COLECCIONES_FIESTA (no pertenece a este
   listado de colecciones de Fiesta, a petición explícita) — mismo
   criterio que ../page.js. fiestaProductos.js NO se toca (sigue con
   las 11 completas, catálogo real que también alimenta
   /admin/colecciones/fiesta), aquí solo se filtra lo que se enseña. */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, HeroPagina } from '@/components/layout';
import { fiestaProductos } from '@/components/layout/fiestaProductos';
import { encontrarCategoria } from '@/components/layout/estiloSiluetaGrupos';
import { parametrosCategoria, metadataCategoria, breadcrumbJsonLd } from '@/lib/atelierCategoriaSeo';

const ES_FIESTA = true;
const SECCION_KEY = 'nav.submenus.atelier.fiesta';
const SECCION_HREF = 'atelier/fiesta';

// Mismas colecciones que ../page.js (COLECCIONES_FIESTA) — ver
// comentario en atelier/novias/categoria/[categoria]/page.js.
const COLECCIONES_FIESTA = [
  // '27_Eclat', // comentada a petición (ver fiestaProductos.js)
  '26_Opaline',
  "25_L'Allure",
  'En Madrid',
  'A Walk',
  'Bambú',
  'Savia',
  'Miscelanea',
  'Furisode',
];

const PRODUCTOS_FIESTA = fiestaProductos.filter((producto) => producto.coleccion !== 'Prêt-à-porter');

export function generateStaticParams() {
  return parametrosCategoria(ES_FIESTA);
}

export async function generateMetadata({ params }) {
  const { locale, categoria } = await params;
  const categoriaActiva = encontrarCategoria(categoria, { esFiesta: ES_FIESTA });
  return metadataCategoria({ locale, categoriaActiva, seccionKey: SECCION_KEY, seccionHref: SECCION_HREF });
}

export default async function Pagina({ params }) {
  const { locale, categoria } = await params;
  const categoriaActiva = encontrarCategoria(categoria, { esFiesta: ES_FIESTA });
  if (!categoriaActiva) notFound();

  const t = await getTranslations();
  const jsonLd = await breadcrumbJsonLd({ locale, seccionKey: SECCION_KEY, seccionHref: SECCION_HREF, categoriaActiva });

  return (
    <section className="seccion">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Mismo hero que ../../page.js (HeroPagina: Navbar transparente
          encima vía data-navbar-hero + velo degradado), sin la
          introducción editorial. */}
      <HeroPagina
        imagen="/img/landing/fely-campo-portada-hero-landing-3-mobile-atelier-3.webp"
        alt={t(SECCION_KEY)}
        titulo={[t(SECCION_KEY), t(`filtros.estiloYSilueta.grupos.${categoriaActiva.grupo}.opciones.${categoriaActiva.opcion}`)]}
        subtitulo={t('heroPagina.atelierFiesta')}
      />
      <CuadriculaProductos
        productos={PRODUCTOS_FIESTA}
        disposicion="grid"
        // Cabecera con la categoría de título y miga de pan (Atelier >
        // Fiesta), pero sin el botón de filtros ni el cambio de columnas
        // (ocultarControles) — a petición.
        tituloKey="nav.links.atelier"
        coleccionKey={SECCION_KEY}
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarControles
        ocultarPrecio
        colecciones={COLECCIONES_FIESTA}
        hrefBase={SECCION_HREF}
        estiloYSilueta
        esFiesta
        categoriaActiva={categoriaActiva}
      />
    </section>
  );
}
