/* ============================================================
   Términos y Condiciones de Uso — Fely Campo. Ruta: /legal/terminos
   Texto en español e inglés — ver ../textos/terminos.js.
   Maquetación común: ../TextoLegal.jsx.
   ============================================================ */

import { metadataPagina } from '@/lib/seo';
import TextoLegal from '../TextoLegal';
import { TERMINOS } from '../textos/terminos';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/legal/terminos' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  return <TextoLegal texto={TERMINOS} locale={locale} />;
}
