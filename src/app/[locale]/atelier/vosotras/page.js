/* Placeholder — pendiente de maquetar. Ruta: /atelier/vosotras
   A diferencia de /atelier/novias y /atelier/fiesta (catálogo de
   producto vía CuadriculaProductos), esta sección enseña a la
   comunidad: fotos de clientas + sus reseñas, no productos en venta —
   ver GaleriaVosotras.jsx. Misma cabecera que Novias/Fiesta para que
   las tres secciones de Atelier compartan estructura, pero sin
   CuadriculaProductos/PanelFiltros (no hay talla/color/precio que
   filtrar aquí, ni CabeceraSeccion "enCuadricula" — no hay botón de
   filtros ni toggle de densidad que alojar en su fila). Sin ProductHero
   tampoco (a diferencia de Novias/Fiesta) — esta página no necesita ni
   su envoltorio ni el Navbar transparente que trae consigo (no está en
   RUTAS_CON_PRODUCT_HERO, ver layout.js), así que el Navbar se queda
   con su aspecto normal (logo oscuro) desde el principio.

   La CabeceraSeccion (subtítulo/título/descripción) y el toggle
   "Invitadas"/"Novias" que filtra la cuadrícula viven dentro de
   GaleriaVosotras.jsx, no aquí — mismo criterio que CuadriculaProductos,
   que también resuelve su propia cabecera a partir de props en vez de
   que la página la monte aparte. */

import { GaleriaVosotras } from '@/components/layout';
import { metadataPagina, textosSeo } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/atelier/vosotras' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  return (
    <section className="seccion">
      <h1 className="sr-only">{textosSeo('/atelier/vosotras', locale).h1}</h1>
      <GaleriaVosotras
        titleKey="nav.submenus.atelier.vosotras"
        descriptionKey="vosotras.descripcion"
        margenSuperiorAmplio
      />
    </section>
  );
}
