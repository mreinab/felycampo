// GaleriaProductoLightbox.jsx

'use client';

/* ============================================================
   LIGHTBOX DE GALERÍA DE PRODUCTO — Fely Campo
   Pantalla completa (fade suave al abrir/cerrar) con las imágenes de
   GaleriaProducto más grandes: misma banda con scroll horizontal +
   scroll-snap, más una franja de miniaturas a la izquierda, centrada
   verticalmente, para saltar entre ellas. Mantiene el logo en el mismo
   sitio que el Navbar real (mismo alto de fila, 76px, mismo logo/tamaño)
   pero sin el resto del header — es su propia cabecera mínima, no el
   Navbar de verdad (viven
   en sitios distintos del árbol, sin forma de ocultar uno desde el
   otro sin acoplarlos).
   Uso:
     <GaleriaProductoLightbox
       imagenes={['/a.jpg', '/b.jpg']} alt="Vestido Aurora"
       abierta={abierta} indiceActivo={indice}
       onCambiarIndice={setIndice} onCerrar={() => setAbierta(false)}
     />
   ============================================================ */

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { SelectorColor, SelectorTalla, Boton, BotonGuardar } from '../ui';
import styles from './GaleriaProductoLightbox.module.css';

function GaleriaProductoLightbox({
  imagenes = [],
  alt,
  abierta,
  indiceActivo,
  onCambiarIndice,
  onCerrar,
  nombre,
  precio,
  colores = [],
  tallas = [],
}) {
  const t = useTranslations('producto');
  const locale = useLocale();
  const pistaRef = useRef(null);
  const cerrarRef = useRef(null);
  const [color, setColor] = useState(colores[0]?.nombre ?? null);
  const [talla, setTalla] = useState(null);
  const [mostrarTallas, setMostrarTallas] = useState(false);

  // Cada apertura empieza de cero — sin esto, reabrir el lightbox en
  // otro producto (o en el mismo tras elegir talla) heredaría la talla
  // ya escogida y el selector de tallas seguiría desplegado.
  useEffect(() => {
    if (!abierta) return;
    setTalla(null);
    setMostrarTallas(false);
  }, [abierta]);

  const alClicComprar = () => {
    if (!mostrarTallas) {
      setMostrarTallas(true);
      return;
    }
    // Sin backend real todavía (ver FichaProductoAcciones) — el botón
    // solo llega aquí habiendo talla elegida, listo para conectar el
    // "añadir a la cesta" de verdad más adelante.
  };

  // Al abrir: foco en el botón cerrar, sin scroll de la página detrás.
  // Escape cierra — igual que atraparFoco de PanelLateral, pero
  // repetido aquí porque esto no es un drawer (PanelLateral desliza
  // desde un borde, esto ocupa toda la pantalla y tiene su propia
  // franja de miniaturas).
  useEffect(() => {
    if (!abierta) return undefined;
    const enfocadoAntes = document.activeElement;
    cerrarRef.current?.focus();
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const alTeclado = (evento) => {
      if (evento.key === 'Escape') onCerrar?.();
    };
    document.addEventListener('keydown', alTeclado);

    return () => {
      document.removeEventListener('keydown', alTeclado);
      document.body.style.overflow = overflowPrevio;
      enfocadoAntes?.focus?.();
    };
  }, [abierta, onCerrar]);

  // Al abrir, salta de golpe (sin "smooth") a la imagen que se clicó
  // en la galería — el barrido solo se ve al navegar ya dentro.
  // .item ocupa el 100% de .pista (ver GaleriaProductoLightbox.module.css),
  // así que ese es el ancho real de un "paso" entre imágenes.
  useEffect(() => {
    if (!abierta) return;
    const nodo = pistaRef.current;
    if (!nodo) return;
    nodo.scrollTo({ left: indiceActivo * nodo.clientWidth, behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierta]);

  const irAIndice = (indice) => {
    const nodo = pistaRef.current;
    if (!nodo) return;
    nodo.scrollTo({ left: indice * nodo.clientWidth, behavior: 'smooth' });
    onCambiarIndice(indice);
  };

  // Arrastrar/hacer scroll directamente sobre la pista (no solo clicar
  // una miniatura) también actualiza cuál está activa.
  const alScroll = () => {
    const nodo = pistaRef.current;
    if (!nodo || nodo.clientWidth === 0) return;
    const indice = Math.round(nodo.scrollLeft / nodo.clientWidth);
    if (indice !== indiceActivo) onCambiarIndice(indice);
  };

  // Cualquier gesto de rueda/trackpad pasa a la imagen siguiente/anterior
  // de golpe (como clicar una miniatura), sin importar si el eje que
  // reporta el navegador es vertical (rueda de ratón normal) u horizontal
  // (trackpad, shift+rueda) — el signo del eje dominante decide la
  // dirección. Cooldown de 500ms: un solo gesto de trackpad dispara
  // muchos eventos "wheel" seguidos: sin él, un swipe saltaría varias
  // imágenes de golpe en vez de una.
  const ruedaEnCooldownRef = useRef(false);

  const alRueda = (evento) => {
    evento.preventDefault();
    if (ruedaEnCooldownRef.current) return;

    const delta = Math.abs(evento.deltaX) > Math.abs(evento.deltaY) ? evento.deltaX : evento.deltaY;
    if (Math.abs(delta) < 10) return;

    const siguiente = indiceActivo + (delta > 0 ? 1 : -1);
    if (siguiente < 0 || siguiente >= imagenes.length) return;

    ruedaEnCooldownRef.current = true;
    irAIndice(siguiente);
    setTimeout(() => { ruedaEnCooldownRef.current = false; }, 500);
  };

  if (imagenes.length === 0) return null;

  const tabIndexInteractivo = abierta ? 0 : -1;

  return (
    <div className={`${styles.lightbox} ${abierta ? styles.abierta : ''}`} aria-hidden={!abierta}>
      <div className={styles.cabecera}>
        <a href={`/${locale}`} className={styles.logoLink} tabIndex={tabIndexInteractivo}>
          <img src="/img/logo/logo-felycampo.png" alt="Fely Campo" className={styles.logo} />
        </a>
        <button
          ref={cerrarRef}
          type="button"
          className={styles.cerrar}
          onClick={onCerrar}
          aria-label={t('galeriaCerrar')}
          tabIndex={tabIndexInteractivo}
        >
          <X size={40} strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" />
        </button>
      </div>

      <div ref={pistaRef} className={styles.pista} onScroll={alScroll} onWheel={alRueda}>
        {imagenes.map((src) => (
          <div key={src} className={styles.item}>
            <img src={src} alt={alt} className={styles.imagen} />
          </div>
        ))}
      </div>

      {imagenes.length > 1 && (
        <div className={styles.miniaturas}>
          {imagenes.map((src, indice) => (
            <button
              key={src}
              type="button"
              className={`${styles.miniatura} ${indice === indiceActivo ? styles.miniaturaActiva : ''}`}
              onClick={() => irAIndice(indice)}
              aria-label={String(indice + 1)}
              aria-current={indice === indiceActivo}
              tabIndex={tabIndexInteractivo}
            >
              <img src={src} alt="" className={styles.miniaturaImagen} />
            </button>
          ))}
        </div>
      )}

      {nombre && (
        <div className={styles.panelInfo}>
          <BotonGuardar variante="compacto" tabIndex={tabIndexInteractivo} />

          <div className={styles.panelCabecera}>
            <p className={styles.panelNombre}>{nombre}</p>
            {precio && <p className={styles.panelPrecio}>{precio}</p>}
          </div>

          {colores.length > 0 && (
            <SelectorColor colores={colores} seleccionado={color} onSelect={setColor} tabIndex={tabIndexInteractivo} />
          )}

          {mostrarTallas && tallas.length > 0 && (
            <SelectorTalla tallas={tallas} seleccionada={talla} onSelect={setTalla} tabIndex={tabIndexInteractivo} />
          )}

          <Boton
            variante="solido"
            tamano="full"
            onClick={alClicComprar}
            desactivado={mostrarTallas && tallas.length > 0 && !talla}
            tabIndex={tabIndexInteractivo}
          >
            {t('anadirCesta')}
          </Boton>
        </div>
      )}
    </div>
  );
}

export default GaleriaProductoLightbox;
