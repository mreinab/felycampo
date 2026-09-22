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
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { fiestaProductos } from '@/components/layout/fiestaProductos';
import { encontrarCategoria } from '@/components/layout/estiloSiluetaGrupos';
import { parametrosCategoria, metadataCategoria, breadcrumbJsonLd } from '@/lib/atelierCategoriaSeo';

const ES_FIESTA = true;
const SECCION_KEY = 'nav.submenus.atelier.fiesta';
const SECCION_HREF = 'atelier/fiesta';

// Mismas colecciones que ../page.js (COLECCIONES_FIESTA) — ver
// comentario en atelier/novias/categoria/[categoria]/page.js.
const COLECCIONES_FIESTA = [
  'Primavera Verano 2027',
  'Primavera Verano 2026',
  'Primavera Verano 2025',
  'En Madrid',
  'A Walk',
  'Bambú',
  'Savia',
  'Miscelanea',
  'Essentielle',
  'Furisode',
];

const PRODUCTOS_FIESTA = fiestaProductos.filter((producto) => producto.coleccion !== 'Prêt-à-porter');

export function generateStaticParams() {
  return parametrosCategoria(ES_FIESTA);
}

export async function generateMetadata({ params }) {
  const { locale, categoria } = await params;
  const categoriaActiva = encontrarCategoria(categoria, { esFiesta: ES_FIESTA });
  return metadataCategoria({ locale, categoriaActiva, seccionKey: SECCION_KEY });
}

export default async function Pagina({ params }) {
  const { locale, categoria } = await params;
  const categoriaActiva = encontrarCategoria(categoria, { esFiesta: ES_FIESTA });
  if (!categoriaActiva) notFound();

  const jsonLd = await breadcrumbJsonLd({ locale, seccionKey: SECCION_KEY, seccionHref: SECCION_HREF, categoriaActiva });

  return (
    <section className="seccion">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductHero imagen="/img/invitadas-sección-FelyCampo.jpg" />
      <CuadriculaProductos
        productos={PRODUCTOS_FIESTA}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey={SECCION_KEY}
        descriptionKey="cuadriculaTabs.descripcion"
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
