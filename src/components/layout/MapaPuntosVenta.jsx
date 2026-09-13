// MapaPuntosVenta.jsx

'use client';

/* ============================================================
   MAPA DE PUNTOS DE VENTA — Fely Campo
   Mapa mínimo (Leaflet + teselas CARTO Positron, sin etiquetas de
   marca ni clustering) + listado accesible agrupado por país (España
   primero, resto por cercanía real, ver "paises" más abajo) que
   sincroniza con los marcadores. Pensado para reutilizarse tal cual
   en /puntos-de-venta-fely-campo además de al final de
   /visita-fely-campo (ver "puntos" más abajo).

   Por qué así:
   - Leaflet se importa dentro de useEffect (dynamic import), nunca en
     el cuerpo del módulo: su bundle toca `window` al cargar, y este
     componente igual se renderiza primero en el servidor aunque sea
     'use client' — importarlo antes de montar rompería el SSR.
   - Marcadores como L.circleMarker (SVG, sin iconos de imagen): evita
     el problema clásico de los iconos por defecto de Leaflet con
     bundlers, y mantiene el peso al mínimo con ~70 puntos.
   - Todos los marcadores se crean y se añaden al mapa una sola vez, al
     montar — sin filtro que los esconda/muestre después.
   - El mapa lleva aria-hidden: el listado de abajo (botones reales,
     focusables) es el camino accesible por teclado a cada punto —
     clicarlo mueve el mapa (flyTo) y abre su popup.
   - matchMedia('prefers-reduced-motion') desactiva el flyTo animado
     en favor de un salto directo (setView), mismo criterio que el
     resto del sitio (ver CuadriculaProductos.module.css).
   - Guarda contra el doble-montaje de Strict Mode en desarrollo
     (mapContainer._leaflet_id) para no reventar con "Map container is
     already initialized".
   ============================================================ */

import { useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { CabeceraSeccion } from '@/components/ui';
import { PUNTOS_VENTA } from './puntosVenta';
import styles from './MapaPuntosVenta.module.css';
import 'leaflet/dist/leaflet.css';

const CENTRO_EUROPA = [47, 8];
const ZOOM_INICIAL = 4;

// Aún no hay foto por punto de venta (ver puntosVenta.js) — 3
// fotos de atelier ya usadas en visita-fely-campo/ListadoUbicaciones.jsx,
// repetidas en bucle según la posición en el listado (ver puntoBtn
// más abajo), a modo de marcador de posición.
const IMAGENES_PLACEHOLDER = [
  '/img/talleres/salamanca-ateliernovia-ateliernoviasalamanca-ubicacion-felycampo.webp',
  '/img/talleres/madrid-atelier_madrid_fiesta_novia_medida.webp',
  '/img/talleres/oviedo-atelier_fiesta_oviedo_felycampo_espacio_9-2048x1365.webp',
];

// Coordenadas aproximadas (capital) de cada país presente en
// puntosVenta.js — usadas SOLO para ordenar los países por cercanía a
// España (ver "paises" más abajo), no para el mapa en sí. Con pocos
// puntos por país, el centroide de sus propias tiendas queda sesgado
// (ej. el único punto de Francia está en Verlinghem, cerca de Bélgica,
// muy al norte del país — con su centroide de tiendas, Francia salía
// más lejos que Suiza). La capital real evita ese sesgo. Un país que no
// esté aquí (nuevo en puntosVenta.js) cae al centroide de sus tiendas
// como respaldo, ver "centroPais" más abajo — nunca rompe, solo pierde
// la precisión extra.
const CAPITALES_APROX = {
  España: { lat: 40.4168, lng: -3.7038 },
  Francia: { lat: 48.8566, lng: 2.3522 },
  Suiza: { lat: 46.9480, lng: 7.4474 },
  Luxemburgo: { lat: 49.6117, lng: 6.1319 },
  'Reino Unido': { lat: 51.5074, lng: -0.1278 },
  Bélgica: { lat: 50.8503, lng: 4.3517 },
  Italia: { lat: 41.9028, lng: 12.4964 },
  Irlanda: { lat: 53.3498, lng: -6.2603 },
  Austria: { lat: 48.2082, lng: 16.3738 },
  Alemania: { lat: 52.5200, lng: 13.4050 },
  'Estados Unidos': { lat: 38.9072, lng: -77.0369 },
};

// Código ISO 3166-1 alpha-2 de cada país — solo para el nombre de
// archivo del banderín circular (ver .listaGrupoBandera en
// MapaPuntosVenta.module.css). SVGs 1x1 (recorte cuadrado, pensado para
// clip circular por CSS) sacados una vez del paquete flag-icons a
// public/img/flags/ — no es una dependencia del proyecto, solo los 11
// SVG que hacían falta, así no arrastra el paquete entero a producción.
const CODIGO_PAIS = {
  España: 'es',
  Francia: 'fr',
  Suiza: 'ch',
  Luxemburgo: 'lu',
  'Reino Unido': 'gb',
  Bélgica: 'be',
  Italia: 'it',
  Irlanda: 'ie',
  Austria: 'at',
  Alemania: 'de',
  'Estados Unidos': 'us',
};

function MapaPuntosVenta({ puntos = PUNTOS_VENTA, className }) {
  const t = useTranslations('puntosVenta');
  const contenedorRef = useRef(null);
  const mapaRef = useRef(null);
  const marcadoresRef = useRef(new Map());

  // Orden de países — no alfabético: España primero, luego el resto de
  // más cerca a más lejos (distancia real, haversine, entre el
  // centroide de España y el de cada país — reutiliza el lat/lng que ya
  // trae cada punto, sin mantener una lista de países a mano que se
  // quedaría corta en cuanto se añada uno nuevo a puntosVenta.js).
  // Alimenta los grupos del listado de abajo (ver "gruposVisibles").
  const paises = useMemo(() => {
    const porPais = new Map();
    puntos.forEach((punto) => {
      if (!porPais.has(punto.pais)) porPais.set(punto.pais, []);
      porPais.get(punto.pais).push(punto);
    });

    const centroideTiendas = (lista) => {
      const suma = lista.reduce((acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }), { lat: 0, lng: 0 });
      return { lat: suma.lat / lista.length, lng: suma.lng / lista.length };
    };

    const centroPais = (pais) => CAPITALES_APROX[pais] || centroideTiendas(porPais.get(pais));

    const distanciaKm = (a, b) => {
      const R = 6371;
      const aRad = Math.PI / 180;
      const dLat = (b.lat - a.lat) * aRad;
      const dLng = (b.lng - a.lng) * aRad;
      const sen = Math.sin(dLat / 2) ** 2
        + Math.cos(a.lat * aRad) * Math.cos(b.lat * aRad) * Math.sin(dLng / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(sen));
    };

    const centroEspana = centroPais('España');

    return [...porPais.keys()].sort((a, b) => {
      if (a === 'España') return -1;
      if (b === 'España') return 1;
      return distanciaKm(centroEspana, centroPais(a)) - distanciaKm(centroEspana, centroPais(b));
    });
  }, [puntos]);

  // Agrupa el listado por país en el mismo orden que "paises" — un
  // grupo por país con su propio título (ver .listaGrupoTitulo).
  const gruposVisibles = useMemo(
    () => paises
      .map((pais) => ({ pais, puntos: puntos.filter((punto) => punto.pais === pais) }))
      .filter((grupo) => grupo.puntos.length > 0),
    [paises, puntos],
  );

  useEffect(() => {
    let cancelado = false;

    async function montar() {
      if (!contenedorRef.current || contenedorRef.current._leaflet_id) return;

      const L = (await import('leaflet')).default;
      if (cancelado) return;

      const mapa = L.map(contenedorRef.current, {
        center: CENTRO_EUROPA,
        zoom: ZOOM_INICIAL,
        minZoom: 2,
        maxZoom: 17,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // Teselas estándar de OpenStreetMap — sin API key ni cuenta de
      // por medio (CARTO Positron dejó de servir su capa gratuita sin
      // key). Se desatura por CSS (ver .mapa :global(.leaflet-tile-pane)
      // en MapaPuntosVenta.module.css) para acercarla al resto del sitio.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapa);

      // Marcador cuadrado: Leaflet no tiene un "squareMarker" (circleMarker
      // solo dibuja círculos), así que es un L.marker con un divIcon —
      // un <span> cuadrado por CSS (ver .marcador en
      // MapaPuntosVenta.module.css), sin imagen de icono de por medio.
      const icono = L.divIcon({
        className: styles.marcador,
        iconSize: [9, 9],
        iconAnchor: [4.5, 4.5],
        popupAnchor: [0, -4],
      });

      puntos.forEach((punto) => {
        const marcador = L.marker([punto.lat, punto.lng], { icon: icono });

        const lineasDireccion = punto.direccion.join('<br>');
        const contacto = [
          punto.telefono && `<a href="tel:${punto.telefono.replace(/[^+\d]/g, '')}">${punto.telefono}</a>`,
          punto.email && `<a href="mailto:${punto.email}">${punto.email}</a>`,
        ].filter(Boolean).join('<br>');
        const enlaceDirecciones = `https://www.google.com/maps/dir/?api=1&destination=${punto.lat},${punto.lng}`;

        marcador.bindPopup(
          `<p class="${styles.popupNombre}">${punto.nombre}</p>` +
          `<p class="${styles.popupTexto}">${lineasDireccion}</p>` +
          (contacto ? `<p class="${styles.popupTexto}">${contacto}</p>` : '') +
          `<a class="${styles.popupEnlace}" href="${enlaceDirecciones}" target="_blank" rel="noopener noreferrer">${t('direcciones')}</a>`,
          { closeButton: true },
        );

        marcadoresRef.current.set(punto.id, marcador);
        marcador.addTo(mapa);
      });

      mapaRef.current = mapa;
    }

    montar();

    return () => {
      cancelado = true;
      if (mapaRef.current) {
        mapaRef.current.remove();
        mapaRef.current = null;
      }
      marcadoresRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function irAPunto(punto) {
    const marcador = marcadoresRef.current.get(punto.id);
    if (!mapaRef.current || !marcador) return;

    const reducirMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducirMovimiento) {
      mapaRef.current.setView([punto.lat, punto.lng], 13);
    } else {
      mapaRef.current.flyTo([punto.lat, punto.lng], 13, { duration: 0.6 });
    }
    marcador.openPopup();
  }

  return (
    <div className={`${styles.seccion} ${className || ''}`}>
      <CabeceraSeccion
        subtitleKey="puntosVenta.eyebrow"
        titleKey="puntosVenta.titulo"
        descriptionKey="puntosVenta.intro"
        alinear="start"
      />

      <div className={styles.layout}>
        <div ref={contenedorRef} className={styles.mapa} role="presentation" aria-hidden="true" />

        <div className={styles.lista} aria-label={t('titulo')}>
          {gruposVisibles.map((grupo) => (
            <section key={grupo.pais} className={styles.listaGrupo}>
              <h3 className={styles.listaGrupoTitulo}>
                {CODIGO_PAIS[grupo.pais] && (
                  <img
                    src={`/img/flags/${CODIGO_PAIS[grupo.pais]}.svg`}
                    alt=""
                    aria-hidden="true"
                    className={styles.listaGrupoBandera}
                  />
                )}
                {grupo.pais}
              </h3>
              <ul className={styles.listaGrupoItems}>
                {grupo.puntos.map((punto) => {
                  const indice = puntos.indexOf(punto);
                  return (
                    <li key={punto.id}>
                      <button type="button" className={styles.puntoBtn} onClick={() => irAPunto(punto)}>
                        <img
                          src={IMAGENES_PLACEHOLDER[indice % IMAGENES_PLACEHOLDER.length]}
                          alt=""
                          aria-hidden="true"
                          className={styles.puntoImagen}
                        />
                        <span className={styles.puntoTextos}>
                          <span className={styles.puntoNombre}>{punto.nombre}</span>
                          <span className={styles.puntoTexto}>{punto.direccion.join('\n')}</span>
                          {(punto.telefono || punto.email) && (
                            <span className={styles.puntoTexto}>
                              {[punto.telefono, punto.email].filter(Boolean).join('\n')}
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapaPuntosVenta;
