// Solo metadata: page.js es un Client Component ('use client') y no
// puede exportar generateMetadata — ver metadataPagina en src/lib/seo.js.

import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/visita-fely-campo/cita' });
}

export default function Layout({ children }) {
  return children;
}
