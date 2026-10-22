// Solo metadata: page.js es un Client Component ('use client') y no
// puede exportar generateMetadata — ver metadataPagina en src/lib/seo.js.
// Página privada: noindex y fuera del sitemap.

import { metadataPagina } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/mi-cuenta/panel', indexar: false });
}

export default function Layout({ children }) {
  return children;
}
