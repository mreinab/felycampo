// atelierProductoSeo.js
//
// generateMetadata compartido por las fichas de Atelier
// (/atelier/{novias,fiesta}/[producto]/page.js) — mismo catálogo y mismo
// slug que FichaProductoAtelier.jsx. Título único por look (nombre del
// look + colección ya vienen en "nombre", ej. "Look 1 - Bride 27").

import { noviaProductos } from '@/components/layout/noviaProductos';
import { fiestaProductos } from '@/components/layout/fiestaProductos';
import { slugify } from './slugify';
import { metadataPagina, recortar } from './seo';

const CATALOGOS = { novias: noviaProductos, fiesta: fiestaProductos };

const TEXTOS = {
  novias: {
    es: { tipo: 'Vestido de novia a medida', cierre: 'Vestido de novia diseñado y confeccionado a medida en el atelier de Fely Campo. Pide tu cita en Salamanca, Madrid u Oviedo.' },
    en: { tipo: 'Made-to-measure wedding dress', cierre: 'Wedding dress designed and made to measure at the Fely Campo atelier. Book your appointment in Salamanca, Madrid or Oviedo.' },
  },
  fiesta: {
    es: { tipo: 'Vestido de fiesta a medida', cierre: 'Vestido de fiesta e invitada hecho a medida en el atelier de Fely Campo. Pide tu cita en Salamanca, Madrid u Oviedo.' },
    en: { tipo: 'Made-to-measure evening dress', cierre: 'Evening and guest dress made to measure at the Fely Campo atelier. Book your appointment in Salamanca, Madrid or Oviedo.' },
  },
};

export function metadataProductoAtelier({ locale, slug, seccion }) {
  const producto = CATALOGOS[seccion]?.find((candidato) => slugify(candidato.nombre) === slug);
  if (!producto) return {};

  const textos = TEXTOS[seccion][locale] || TEXTOS[seccion].es;
  // "descripcion" real solo en algunas colecciones (ver noviaProductos.js)
  // y solo en español: en inglés, o si no hay, queda el texto de cierre.
  const descripcionPropia = locale === 'es' && typeof producto.descripcion === 'string' ? producto.descripcion : null;

  return metadataPagina({
    locale,
    ruta: `/atelier/${seccion}/${slug}`,
    titulo: `${producto.nombre} | ${textos.tipo} | Fely Campo`,
    descripcion: recortar(descripcionPropia ? `${descripcionPropia} ${textos.cierre}` : `${producto.nombre}. ${textos.cierre}`),
    imagen: producto.imagen,
  });
}
