// puntoCercano.js
//
// Sugerencia de "punto más cercano" en la ficha de una cita: localiza a la
// clienta con su código postal y ciudad (lo único de ubicación que pide el
// formulario) en OpenStreetMap (Nominatim, gratis y sin clave) y busca el
// punto de PUNTOS_VENTA — ateliers propios y boutiques, la misma lista del
// mapa — más cercano en línea recta. A Nominatim solo se envían el código
// postal y la ciudad, nunca nombre, email ni teléfono. Su política de uso
// pide como máximo 1 petición por segundo: aquí hay una por ficha abierta
// (y se guarda en memoria para no repetirla al volver a la misma ficha).

import { PUNTOS_VENTA } from '@/components/layout/puntosVenta';

const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const cache = new Map();

export const ATELIERES_PROPIOS = PUNTOS_VENTA.filter((p) => p.id.startsWith('fely-campo'));
export const BOUTIQUES = PUNTOS_VENTA.filter((p) => !p.id.startsWith('fely-campo'));

// Boutiques agrupadas por país (para los <optgroup> de "Atelier asignado"),
// España primero y el resto por orden alfabético.
export function boutiquesPorPais() {
  const grupos = {};
  for (const b of BOUTIQUES) (grupos[b.pais] ||= []).push(b);
  return Object.entries(grupos).sort(([a], [b]) => (a === 'España' ? -1 : b === 'España' ? 1 : a.localeCompare(b, 'es')));
}

export function puntoPorId(id) {
  return PUNTOS_VENTA.find((p) => p.id === id);
}

function distanciaKm(a, b) {
  const rad = (g) => (g * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

async function buscar(parametros) {
  const url = `${NOMINATIM}?${new URLSearchParams({ format: 'jsonv2', limit: '1', addressdetails: '1', 'accept-language': 'es', ...parametros })}`;
  const respuesta = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!respuesta.ok) throw new Error(`Nominatim ${respuesta.status}`);
  const [resultado] = await respuesta.json();
  return resultado;
}

// Devuelve { lugar: { lat, lng, nombre }, punto, km } o null si no se ha
// podido localizar. Prueba de más a menos preciso: código postal + ciudad,
// los dos como texto libre y, por último, solo la ciudad.
export async function puntoMasCercano({ codigoPostal, ciudad }) {
  const clave = `${codigoPostal}|${ciudad}`;
  if (cache.has(clave)) return cache.get(clave);

  const intentos = [
    codigoPostal && ciudad && { postalcode: codigoPostal, city: ciudad },
    codigoPostal && ciudad && { q: `${codigoPostal} ${ciudad}` },
    ciudad && { q: ciudad },
  ].filter(Boolean);

  let resultado;
  for (const parametros of intentos) {
    resultado = await buscar(parametros);
    if (resultado) break;
  }
  if (!resultado) {
    cache.set(clave, null);
    return null;
  }

  const direccion = resultado.address || {};
  const lugar = {
    lat: Number(resultado.lat),
    lng: Number(resultado.lon),
    nombre: [direccion.city || direccion.town || direccion.village || direccion.municipality, direccion.state || direccion.province, direccion.country]
      .filter(Boolean).join(', ') || resultado.display_name,
  };
  const [punto, km] = PUNTOS_VENTA
    .map((p) => [p, distanciaKm(lugar, p)])
    .sort((a, b) => a[1] - b[1])[0];

  const sugerencia = { lugar, punto, km: Math.round(km) };
  cache.set(clave, sugerencia);
  return sugerencia;
}
