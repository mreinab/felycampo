/* ============================================================
   Política de Cookies — Fely Campo. Ruta: /legal/cookies
   Texto en español e inglés — ver ../textos/cookies.js.
   Maquetación común: ../TextoLegal.jsx.
   ============================================================ */

import { metadataPagina } from '@/lib/seo';
import TextoLegal from '../TextoLegal';
import { COOKIES } from '../textos/cookies';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/legal/cookies' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  return <TextoLegal texto={COOKIES} locale={locale} />;
}
