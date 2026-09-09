// MapaPuntosVenta.jsx

'use client';

/* ============================================================
   MAPA DE PUNTOS DE VENTA — Fely Campo
   Mapa mínimo (Leaflet + teselas CARTO Positron, sin etiquetas de
   marca ni clustering) + filtro por país + listado accesible que
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
   - Los marcadores se crean una sola vez; el filtro por país solo
     añade/quita del mapa (addLayer/removeLayer), no recrea nada.
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

import { useEffect, useMemo, useRef, useState } from 'react';
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

function MapaPuntosVenta({ puntos = PUNTOS_VENTA, className }) {
  const t = useTranslations('puntosVenta');
  const contenedorRef = useRef(null);
  const mapaRef = useRef(null);
  const marcadoresRef = useRef(new Map());
  const [paisActivo, setPaisActivo] = useState(null);
  const [listo, setListo] = useState(false);

  const paises = useMemo(
    () => [...new Set(puntos.map((punto) => punto.pais))].sort((a, b) => a.localeCompare(b)),
    [puntos],
  );

  const puntosVisibles = paisActivo ? puntos.filter((punto) => punto.pais === paisActivo) : puntos;

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
      setListo(true);
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

  // Filtro por país: solo añade/quita capas del mapa ya creado, sin
  // recrear marcadores — ver comentario de cabecera.
  useEffect(() => {
    if (!listo || !mapaRef.current) return;
    const L_map = mapaRef.current;

    marcadoresRef.current.forEach((marcador, id) => {
      const punto = puntos.find((p) => p.id === id);
      const visible = !paisActivo || punto?.pais === paisActivo;
      if (visible && !L_map.hasLayer(marcador)) marcador.addTo(L_map);
      if (!visible && L_map.hasLayer(marcador)) L_map.removeLayer(marcador);
    });

    const reducirMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!paisActivo) {
      // "Todos": vuelve a la vista general centrada en Europa — sin
      // encuadrar a los 70 puntos, que arrastraría la vista hasta EEUU
      // por el único punto ahí (ver fantasy-bridal en puntosVenta.js).
      if (reducirMovimiento) L_map.setView(CENTRO_EUROPA, ZOOM_INICIAL);
      else L_map.flyTo(CENTRO_EUROPA, ZOOM_INICIAL, { duration: 0.6 });
    } else if (puntosVisibles.length > 0) {
      const limites = puntosVisibles.map((punto) => [punto.lat, punto.lng]);
      if (reducirMovimiento) L_map.fitBounds(limites, { padding: [32, 32], maxZoom: 12 });
      else L_map.flyToBounds(limites, { padding: [32, 32], maxZoom: 12 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paisActivo, listo]);

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

      <div className={styles.chips}>
        <button
          type="button"
          className={`${styles.chip} ${!paisActivo ? styles.chipActivo : ''}`}
          aria-pressed={!paisActivo}
          onClick={() => setPaisActivo(null)}
        >
          {t('todos')}
        </button>
        {paises.map((pais) => (
          <button
            key={pais}
            type="button"
            className={`${styles.chip} ${paisActivo === pais ? styles.chipActivo : ''}`}
            aria-pressed={paisActivo === pais}
            onClick={() => setPaisActivo((actual) => (actual === pais ? null : pais))}
          >
            {pais}
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        <div ref={contenedorRef} className={styles.mapa} role="presentation" aria-hidden="true" />

        <ul className={styles.lista} aria-label={t('titulo')}>
          {puntosVisibles.map((punto, indice) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapaPuntosVenta;
