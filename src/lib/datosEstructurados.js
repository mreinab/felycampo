/* Datos estructurados (JSON-LD, schema.org) — auditoría SEO M2.
   Un generador por tipo; las páginas los pintan con <JsonLd datos={...} />
   (components/ui/JsonLd.jsx). Todo sale de los mismos datos que se ven en
   la página (ubicaciones.js, catálogos, seoTextos), para que el JSON-LD
   nunca contradiga lo visible — Google penaliza esa discrepancia.
   - organizacion(): Organization (home) — logo y redes del footer.
   - sitioWeb(): WebSite (home).
   - tiendaAtelier(): ClothingStore por atelier — dirección y teléfono de
     ubicaciones.js, idénticos a los de la ficha y /visita-fely-campo.
   - producto(): Product SIN "offers": la web no muestra precios ni
     tallas (decisión del cliente), así que no se declara precio ni
     disponibilidad. Válido como schema; sin offers no opta a resultado
     enriquecido de producto, y no debe inventarse.
   - migas(): BreadcrumbList.
   Las URLs son siempre absolutas sobre SITE_URL (felycampo.com). */

import { SITE_URL, NOMBRE_MARCA, urlAbsoluta } from '@/lib/seo';

const ID_ORGANIZACION = `${SITE_URL}/#organizacion`;
const ID_SITIO = `${SITE_URL}/#sitio`;
const LOGO = '/img/logo/fely-campo-logo.webp';

// Mismas redes que el footer (Footer.jsx, RUTAS_COLUMNAS).
const REDES = [
  'https://www.instagram.com/felycampo/',
  'https://www.facebook.com/fely.campo',
  'https://www.youtube.com/channel/UCQeHEIrbwpFjAYtoGfzRUaA',
];

const absoluta = (ruta) => (!ruta ? undefined : /^https?:\/\//.test(ruta) ? ruta : urlAbsoluta(ruta));

export function organizacion() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ID_ORGANIZACION,
    name: NOMBRE_MARCA,
    url: SITE_URL,
    logo: absoluta(LOGO),
    sameAs: REDES,
  };
}

export function sitioWeb({ locale }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ID_SITIO,
    name: NOMBRE_MARCA,
    url: SITE_URL,
    inLanguage: locale === 'es' ? 'es-ES' : 'en-GB',
    publisher: { '@id': ID_ORGANIZACION },
  };
}

// ubicacion: entrada de visita-fely-campo/ubicaciones.js —
// direccion: ['C/ Laguna Negra 17', '37008 Salamanca'], telefonos: [...].
export function tiendaAtelier({ ubicacion, nombre, url, imagen }) {
  const [calle, ...resto] = ubicacion.direccion;
  const [, codigoPostal, localidad] = (resto.join(' ').match(/^(\d{5})\s+(.+)$/) || []);
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${absoluta(url)}#atelier`,
    name: nombre,
    url: absoluta(url),
    image: absoluta(imagen),
    telephone: ubicacion.telefonos?.[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: calle,
      postalCode: codigoPostal,
      addressLocality: localidad || ubicacion.ciudad,
      addressCountry: 'ES',
    },
    parentOrganization: { '@id': ID_ORGANIZACION },
  };
}

export function producto({ nombre, descripcion, imagenes = [], sku, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: nombre,
    description: descripcion || undefined,
    image: imagenes.filter(Boolean).map(absoluta),
    sku: sku || undefined,
    url: absoluta(url),
    brand: { '@type': 'Brand', name: NOMBRE_MARCA },
  };
}

// tramos: [{ nombre, ruta }] — el último (la página actual) puede ir sin
// ruta: Google no exige "item" en él.
export function migas(tramos) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: tramos.map(({ nombre, ruta }, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: nombre,
      ...(ruta ? { item: absoluta(ruta) } : {}),
    })),
  };
}
