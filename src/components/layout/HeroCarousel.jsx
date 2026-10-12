// HeroCarousel.jsx

'use client';

import { useEffect, useState } from 'react';
import Boton from '../ui/Boton';
import styles from './HeroCarousel.module.css';

// Duración de cada slide: el primero se queda más (8s), el resto rota
// cada 6s. La barra de progreso recibe la misma duración por inline
// style (ver .progresoRelleno abajo), así que van siempre sincronizadas.
const SLIDE_DURATION_MS = 6000;
const PRIMER_SLIDE_DURATION_MS = 8000;
const duracionSlide = (index) => (index === 0 ? PRIMER_SLIDE_DURATION_MS : SLIDE_DURATION_MS);

/**
 * Hero a pantalla completa de la home: 3 slides (imagen o vídeo) que
 * rotan solos (8s el primero, 6s el resto). La barra de progreso lineal
 * está oculta (comentada al final del JSX).
 * Encima de cada slide, abajo,
 * una fila con la descripción a la izquierda y el CTA a la derecha. El
 * único elemento clicable es el CTA — la imagen no lleva su propio
 * enlace, para no anidar/duplicar <a> dentro del slide.
 * Los datos vienen por props, nada hardcodeado aquí.
 * "srcMobile" (opcional, solo slides de imagen): recorte propio para
 * mobile vía <picture>/<source> (max-width:768px, mismo corte que el
 * resto del sitio) — sin recorte por vídeo, ese siempre usa "src" tal
 * cual en cualquier ancho.
 */
function HeroCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    // Accesibilidad: si el sistema pide reducir el movimiento, el
    // carrusel no avanza solo (el usuario puede seguir navegando a mano).
    const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefiereMenosMovimiento) return undefined;

    // setTimeout por slide (no setInterval): cada uno tiene su duración.
    const temporizador = setTimeout(() => {
      setActiveIndex((actual) => (actual + 1) % slides.length);
    }, duracionSlide(activeIndex));

    return () => clearTimeout(temporizador);
  }, [activeIndex, slides.length]);

  return (
    <section className={styles.hero}>
      {slides.map((slide, index) => {
        const activo = index === activeIndex;
        return (
          <div
            key={index}
            className={`${styles.slide} ${activo ? styles.activo : ''}`}
            aria-hidden={!activo}
          >
            {slide.tipo === 'video' ? (
              <video
                src={slide.src}
                className={styles.media}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : slide.srcMobile ? (
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.srcMobile} />
                <img src={slide.src} alt="" className={styles.media} />
              </picture>
            ) : (
              <img src={slide.src} alt="" className={styles.media} />
            )}

            <div className={styles.pie}>
              {/* Solo la entradilla, en mayúsculas y centrada con el CTA
                  debajo (a petición). La segunda frase (slide.descripcion)
                  sigue en los datos por si se recupera:
                  <span>{slide.descripcion}</span> */}
              <p className={styles.descripcion}>{slide.entradilla}</p>
              <Boton
                variante="texto-crema"
                href={slide.ctaHref}
                tabIndex={activo ? 0 : -1}
              >
                {slide.ctaTexto}
              </Boton>
            </div>
          </div>
        );
      })}

      {/* Barra de progreso oculta a petición — recuperable tal cual
          (los estilos .progreso* siguen en HeroCarousel.module.css).
      <div className={styles.progreso}>
        <div className={styles.progresoPista} />
        // key={activeIndex}: fuerza a React a remontar el div en cada
        // cambio de slide, lo que reinicia la animación CSS desde 0%.
        <div
          key={activeIndex}
          className={styles.progresoRelleno}
          style={{ animationDuration: `${duracionSlide(activeIndex)}ms` }}
        />
      </div>
      */}
    </section>
  );
}

export default HeroCarousel;
