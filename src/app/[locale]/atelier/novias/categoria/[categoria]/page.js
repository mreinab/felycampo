/* Ruta DINÁMICA: listado de Novias filtrado por una categoría de
   "Estilo y silueta" — /atelier/novias/categoria/romantico...
   El parámetro llega en params.categoria (uno de las opciones de
   GRUPOS_ESTILO_SILUETA, ver estiloSiluetaGrupos.js). Vive en
   "categoria/[categoria]" y no directamente en "[categoria]" porque
   "novias/" ya tiene un segmento dinámico propio ([producto], ver
   ../[producto]/page.js) — Next.js no admite dos nombres de segmento
   dinámico distintos al mismo nivel.

   A diferencia de ../page.js (listado normal, sin categoría), esta
   página SÍ es indexable por categoría de verdad: generateStaticParams
   la pre-renderiza para cada opción válida, generateMetadata le da
   título/descripción propios, y pasa "categoriaActiva" a
   CuadriculaProductos por prop (no por hash de URL) para que la miga
   de pan + título de categoría salgan ya en el HTML servido. Enlazada
   desde los tags de categoría de FichaProductoAtelier.jsx. Sigue sin
   filtrar la cuadrícula de verdad (mismo placeholder de
   "estiloYSilueta" que ../page.js — ver CuadriculaProductos.jsx).

   Mismo criterio que ../page.js: la web pública deja de listar las 6
   colecciones de Novia y se queda solo con Bride 27 (noviaProductos.js
   NO se toca, sigue con las 6 completas para /admin y las fichas de
   producto) — aquí se filtra "productos" igual que allí, y ya no hace
   falta el desplegable "Colección" de PanelFiltros (una sola opción no
   aporta nada), así que tampoco se pasa "colecciones". */

import { permanentRedirect, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos, ProductHero } from '@/components/layout';
import { productosListadoNovias } from '@/lib/catalogoNovias';
import { encontrarCategoria } from '@/components/layout/estiloSiluetaGrupos';
import { parametrosCategoria, metadataCategoria, breadcrumbJsonLd } from '@/lib/atelierCategoriaSeo';
import { obtenerEditorialNovias } from '@/lib/atelierEditorial';
import { textoEn } from '@/lib/previa';

const ES_FIESTA = false;
const SECCION_KEY = 'nav.submenus.atelier.novias';
const SECCION_HREF = 'atelier/novias';

// Looks de las colecciones publicadas (hoy solo Bride 27, ver datos/atelierNovias.js).
const PRODUCTOS_BRIDE_27 = productosListadoNovias();

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
  if (!categoriaActiva) permanentRedirect(`/${locale}/atelier/novias`); // slug inexistente: al listado (ninguna URL en 404)
  // Sin ninguna colección de Novias publicada (hoy, a petición), las páginas
  // de categoría no se enseñan: al listado, con redirección TEMPORAL (volverán
  // cuando se publique alguna colección en el admin).
  if (PRODUCTOS_BRIDE_27.length === 0) redirect(`/${locale}/atelier/novias`);

  const t = await getTranslations();
  // Foto y texto: editables en el admin (Colección Novias › Página de la
  // web › Páginas de categoría).
  const { categorias } = obtenerEditorialNovias();
  const jsonLd = await breadcrumbJsonLd({ locale, seccionKey: SECCION_KEY, seccionHref: SECCION_HREF, categoriaActiva });

  return (
    <section className="seccion">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductHero
        imagen={categorias.imagen}
        titulo={[t(SECCION_KEY), t(`filtros.estiloYSilueta.grupos.${categoriaActiva.grupo}.opciones.${categoriaActiva.opcion}`)]}
      />
      <CuadriculaProductos
        productos={PRODUCTOS_BRIDE_27}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey={SECCION_KEY}
        description={textoEn(categorias.texto, locale)}
        ocultarPrecio
        hrefBase={SECCION_HREF}
        estiloYSilueta
        categoriaActiva={categoriaActiva}
      />
    </section>
  );
}
