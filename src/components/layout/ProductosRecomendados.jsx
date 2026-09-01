'use client';

/* ============================================================
   PRODUCTOS RECOMENDADOS — Fely Campo
   Carrusel horizontal de hasta 10 productos — SOLO para la ficha de
   producto (tienda/[producto]/page.js), debajo de LookPasarela. No se
   usa en ningún otro sitio (Tienda/Atelier/home siguen con
   CuadriculaProductos tal cual estaban).

   A diferencia de CuadriculaProductos, cuyo título es un
   CabeceraSeccion (subtítulo pequeño + título + acción en grid de 4
   columnas), aquí el título es un <h3> plano a todo el ancho, sin
   subtítulo ni acción al lado. Y la cuadrícula no es una fila fija ni
   un grid paginado: es una banda de scroll horizontal libre, con la
   misma conversión de rueda vertical -> scroll horizontal que
   GaleriaProducto (para poder hojearla también con un ratón normal,
   no solo con trackpad/touch).
   Uso:
     <ProductosRecomendados titulo="Otros productos que te van a encantar"
        productos={relacionados} />
   ============================================================ */

import { useEffect, useRef } from 'react';
import TarjetaProducto from '../ecommerce/TarjetaProducto';
import styles from './ProductosRecomendados.module.css';

function ProductosRecomendados({ titulo, productos = [] }) {
  const contenedorRef = useRef(null);
  const pistaRef = useRef(null);
  const objetivoScrollRef = useRef(0);
  const animandoRef = useRef(false);

  // Mismo patrón que GaleriaProducto.jsx: listener nativo con
  // passive:false (React registra onWheel como pasivo, así que
  // preventDefault no serviría de nada ahí) + un objetivo animado por
  // requestAnimationFrame en vez de sumar el delta directo — así
  // varios "notches" de rueda seguidos se funden en un scroll
  // continuo, en vez de dar saltos secos.
  useEffect(() => {
    const nodo = contenedorRef.current;
    if (!nodo) return undefined;

    const animar = () => {
      const pista = pistaRef.current;
      if (!pista) {
        animandoRef.current = false;
        return;
      }
      const actual = pista.scrollLeft;
      const diferencia = objetivoScrollRef.current - actual;
      if (Math.abs(diferencia) < 0.5) {
        pista.scrollLeft = objetivoScrollRef.current;
        animandoRef.current = false;
        return;
      }
      pista.scrollLeft = actual + diferencia * 0.2;
      requestAnimationFrame(animar);
    };

    const alRueda = (evento) => {
      if (Math.abs(evento.deltaY) <= Math.abs(evento.deltaX)) return;
      const pista = pistaRef.current;
      if (!pista) return;
      evento.preventDefault();
      if (!animandoRef.current) objetivoScrollRef.current = pista.scrollLeft;
      const maximo = pista.scrollWidth - pista.clientWidth;
      objetivoScrollRef.current = Math.min(maximo, Math.max(0, objetivoScrollRef.current + evento.deltaY));
      if (!animandoRef.current) {
        animandoRef.current = true;
        requestAnimationFrame(animar);
      }
    };

    nodo.addEventListener('wheel', alRueda, { passive: false });
    return () => nodo.removeEventListener('wheel', alRueda);
  }, []);

  const productosVisibles = productos.slice(0, 10);
  if (productosVisibles.length === 0) return null;

  return (
    <section className={styles.seccion}>
      <h3 className={styles.titulo}>{titulo}</h3>
      <div ref={contenedorRef} className={styles.contenedor}>
        <div ref={pistaRef} className={styles.pista}>
          {productosVisibles.map((producto) => (
            <div key={producto.nombre} className={styles.item}>
              <TarjetaProducto {...producto} variante="carrusel" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductosRecomendados;
