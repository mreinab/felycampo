/* Ruta DINÁMICA: ficha de un producto de Atelier — Fiesta.
   /atelier/fiesta/vestido-aurora... El parámetro llega en
   params.producto — el slug de "nombre" (ver src/lib/slugify.js), mismo
   algoritmo que usa TarjetaProducto para enlazar aquí (hrefBase=
   "atelier/fiesta", ver ../page.js). Plantilla compartida con
   atelier/novias/[producto]/page.js — ver FichaProductoAtelier.jsx: a
   propósito NO es la misma ficha que /pret-a-porter/[producto] (sin precio ni
   carrito).
   Vista previa del admin: con ?previa=fiesta-look se pinta el borrador
   del look que se está editando (PreviaFichaFiesta.jsx), exista o no
   todavía; sin indexar. */

import { FichaProductoAtelier } from '@/components/ecommerce';
import { textosFichaAtelier } from '@/components/ecommerce/FichaProductoAtelier';
import { metadataProductoAtelier } from '@/lib/atelierProductoSeo';
import { ID_PREVIA_LOOK_FIESTA, productosFiesta } from '@/lib/catalogoFiesta';
import { PARAMETRO_PREVIA } from '@/lib/previa';
import dynamic from 'next/dynamic';

// Solo se carga al abrir la vista previa (no pesa en las fichas normales).
const PreviaFichaFiesta = dynamic(() => import('./PreviaFichaFiesta'));

export async function generateMetadata({ params, searchParams }) {
  const { locale, producto: slug } = await params;
  if ((await searchParams)?.[PARAMETRO_PREVIA] === ID_PREVIA_LOOK_FIESTA) {
    return { robots: { index: false, follow: false } };
  }
  return metadataProductoAtelier({ locale, slug, seccion: 'fiesta' });
}

export default async function Pagina({ params, searchParams }) {
  const { locale, producto: slug } = await params;
  if ((await searchParams)?.[PARAMETRO_PREVIA] === ID_PREVIA_LOOK_FIESTA) {
    return <PreviaFichaFiesta locale={locale} textos={await textosFichaAtelier(locale)} publicados={productosFiesta()} />;
  }
  return <FichaProductoAtelier slug={slug} seccion="fiesta" locale={locale} />;
}
