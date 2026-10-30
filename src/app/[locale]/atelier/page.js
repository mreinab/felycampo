/* ============================================================
   ATELIER (índice: Novias + Fiesta) — Fely Campo. Ruta: /atelier
   Server Component: solo el SplitMedia variante="landing" (mismo
   bloque Novias/Fiesta que la home, ver page.js de la home —
   data-navbar-hero en el envoltorio para que Navbar sepa cuándo
   volverse sólido, ver RUTAS_CON_PRODUCT_HERO en ../layout.js y el
   criterio ya usado en ProductHero.jsx).
   Quitado a petición todo lo de debajo (RunwayDescripcion, los dos
   BloqueSeccion Novias/Fiesta y "Visítanos" con las tarjetas por
   sede) — sus datos siguen en atelierIndex.js y sus estilos en
   page.module.css por si se recuperan (ver historial de git).
   ============================================================ */

import { SplitMedia } from '@/components/layout';
import { metadataPagina, textosSeo } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/atelier' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <section>
      <h1 className="sr-only">{textosSeo('/atelier', locale).h1}</h1>
      <div data-navbar-hero>
        <SplitMedia
          variante="landing"
          items={[
            {
              src: '/img/fely-campo-web-splitimage-novias.webp',
              tipo: 'imagen',
              tituloKey: 'splitMedia.item1.titulo',
              ctaKey: 'splitMedia.item1.cta',
              href: `/${locale}/atelier/novias`,
            },
            {
              src: '/img/landing/fely-campo-portada-hero-landing-3-mobile-atelier-3.webp',
              tipo: 'imagen',
              tituloKey: 'splitMedia.item2.titulo',
              ctaKey: 'splitMedia.item2.cta',
              href: `/${locale}/atelier/fiesta`,
            },
          ]}
        />
      </div>
    </section>
  );
}
