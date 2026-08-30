// GaleriaProducto.jsx

'use client';

/* ============================================================
   GALERÍA DE PRODUCTO — Fely Campo
   Banda horizontal con scroll-snap (arrastre táctil/trackpad, o la
   rueda del ratón — vertical se traduce a horizontal en .pista) +
   flechas para avanzar una imagen. Cada imagen ocupa el 80% del
   ancho de la galería (sin gap) para que, al llegar a cualquier
   posición encajada, se vea siempre una imagen completa y un 25% de
   la siguiente asomando. Clicar una imagen abre GaleriaProductoLightbox
   a pantalla completa, en la misma posición.
   nombre/precio/colores/tallas solo se usan en el lightbox, para el
   panel de compra rápida sobre la imagen.
   Uso:
     <GaleriaProducto imagenes={['/a.jpg', '/b.jpg']} alt="Vestido Aurora"
        nombre="Vestido Aurora" precio="890 €"
        colores={[{ hex: '#EED3E8', nombre: 'Rosa suave' }]} tallas={['S','M','L']} />
   ============================================================ */

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GaleriaProductoLightbox from './GaleriaProductoLightbox';
import styles from './GaleriaProducto.module.css';

function GaleriaProducto({ imagenes = [], alt, nombre, precio, colores = [], tallas = [] }) {
  const t = useTranslations('producto');
  const pistaRef = useRef(null);
  const [puedeAnterior, setPuedeAnterior] = useState(false);
  const [puedeSiguiente, setPuedeSiguiente] = useState(imagenes.length > 1);
  const [lightboxAbierta, setLightboxAbierta] = useState(false);
  const [indiceActivo, setIndiceActivo] = useState(0);

  const actualizarFlechas = () => {
    const nodo = pistaRef.current;
    if (!nodo) return;
    setPuedeAnterior(nodo.scrollLeft > 8);
    setPuedeSiguiente(nodo.scrollLeft < nodo.scrollWidth - nodo.clientWidth - 8);
  };

  useEffect(() => {
    actualizarFlechas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagenes.length]);

  // Ya no se puede desplazar un % fijo del ancho de la pista: desde que
  // .imagenBoton mide fit-content (ver GaleriaProducto.module.css), cada
  // botón tiene un ancho distinto según el aspect-ratio de su foto, así
  // que se salta directo al offsetLeft real del botón siguiente/anterior
  // — el mismo punto donde el scroll-snap ya asienta al arrastrar a mano.
  const desplazar = (direccion) => {
    const nodo = pistaRef.current;
    if (!nodo) return;
    const botones = Array.from(nodo.children);
    const actual = nodo.scrollLeft;
    const objetivo = direccion > 0
      ? botones.find((boton) => boton.offsetLeft > actual + 8)
      : [...botones].reverse().find((boton) => boton.offsetLeft < actual - 8);
    if (!objetivo) return;
    nodo.scrollTo({ left: objetivo.offsetLeft, behavior: 'smooth' });
  };

  // La rueda del ratón suele traer solo movimiento vertical (deltaY) —
  // se traduce a scroll horizontal para poder hojear la galería sin
  // depender de un trackpad. Si el gesto ya viene horizontal (deltaX,
  // trackpad/touchpad), se deja pasar tal cual.
  const alRueda = (evento) => {
    if (Math.abs(evento.deltaY) <= Math.abs(evento.deltaX)) return;
    evento.currentTarget.scrollLeft += evento.deltaY;
    evento.preventDefault();
  };

  const abrirLightbox = (indice) => {
    setIndiceActivo(indice);
    setLightboxAbierta(true);
  };

  if (imagenes.length === 0) return null;

  return (
    <div className={styles.galeria}>
      <div ref={pistaRef} className={styles.pista} onScroll={actualizarFlechas} onWheel={alRueda}>
        {imagenes.map((src, indice) => (
          <button
            key={src}
            type="button"
            className={styles.imagenBoton}
            onClick={() => abrirLightbox(indice)}
          >
            <img src={src} alt={alt} className={styles.imagen} />
          </button>
        ))}
      </div>

      {imagenes.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.flecha} ${styles.flechaIzquierda}`}
            onClick={() => desplazar(-1)}
            disabled={!puedeAnterior}
            aria-label={t('galeriaAnterior')}
          >
            <ChevronLeft size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
          </button>
          <button
            type="button"
            className={`${styles.flecha} ${styles.flechaDerecha}`}
            onClick={() => desplazar(1)}
            disabled={!puedeSiguiente}
            aria-label={t('galeriaSiguiente')}
          >
            <ChevronRight size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
          </button>
        </>
      )}

      <GaleriaProductoLightbox
        imagenes={imagenes}
        alt={alt}
        abierta={lightboxAbierta}
        indiceActivo={indiceActivo}
        onCambiarIndice={setIndiceActivo}
        onCerrar={() => setLightboxAbierta(false)}
        nombre={nombre}
        precio={precio}
        colores={colores}
        tallas={tallas}
      />
    </div>
  );
}

export default GaleriaProducto;
