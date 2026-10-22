/* Placeholder — pendiente de maquetar. Ruta: /legal/privacidad */

import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/legal/privacidad' });
}

export default function Pagina() {
  return (
    <section className="seccion contenedor">
      <p className="text-caption uppercase text-gris-500 mb-16">Fely Campo</p>
      <h1>Política de privacidad</h1>
      <p className="text-gris-500 mt-24 texto-legible">
        Página pendiente de maquetar. La ruta ya existe y navega.
      </p>
    </section>
  );
}
