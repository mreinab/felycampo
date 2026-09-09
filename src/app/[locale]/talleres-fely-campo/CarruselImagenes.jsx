// CarruselImagenes.jsx

'use client';

/* ============================================================
   Envoltorio mínimo de .imagenes (ver page.js/page.module.css) para
   permitir scrollear el carrusel en horizontal con la rueda del ratón
   al pasar por encima — sin esto, el wheel vertical normal no mueve
   un overflow-x (solo el trackpad/shift+wheel lo hacen de forma
   nativa). onWheel de React es pasivo por defecto (no se puede
   preventDefault ahí), así que el listener se añade a mano con
   { passive: false } — de ahí que esto sea un Client Component aparte
   en vez de interactividad suelta en el page.js (Server Component). */
import { useEffect, useRef } from 'react';

function CarruselImagenes({ className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    function onWheel(evento) {
      // Gesto ya horizontal (trackpad, shift+wheel): se deja pasar tal cual.
      if (Math.abs(evento.deltaX) > Math.abs(evento.deltaY)) return;
      evento.preventDefault();
      el.scrollLeft += evento.deltaY;
    }

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default CarruselImagenes;
