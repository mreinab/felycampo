// FichaProductoAtelier.jsx

/* ============================================================
   FICHA DE PRODUCTO — ATELIER (Novias/Fiesta) — Fely Campo
   Plantilla propia para /atelier/novias/[producto] y
   /atelier/fiesta/[producto] — a propósito NO es la misma que
   /tienda/[producto]/page.js: estas piezas no se compran online (sin
   precio de catálogo, a presupuesto/cita) así que no llevan precio ni
   FichaProductoAcciones (talla + "añadir a la cesta"). En su lugar,
   InfoAtelier.jsx (color + CTA "Contacta con nosotros", ver ahí).
   TarjetaProducto enlaza aquí vía su prop "hrefBase"
   ('atelier/novias'/'atelier/fiesta' en vez de 'tienda', ver
   CuadriculaProductos.jsx) — mismo slug que /lib/slugify.js.
   Acordeon: "Composición" (mismos textos que tienda/[producto]/page.js)
   + "Producto por Encargo (PRE-ORDER)" — aquí no tiene sentido "Envíos
   y devoluciones" (piezas por encargo, no venta online), así que esa
   fila se sustituye por la de PRE-ORDER, explicando que no se admite
   devolución una vez confirmado el pedido.
   "relacionados" (ProductosRecomendados, debajo de la ficha): mismo
   PLACEHOLDER que tienda/[producto]/page.js — catálogo de ejemplo
   compartido (productosEjemplo.js), sin backend real todavía que
   cruce productos por colección/categoría de verdad. Enlaza a esta
   misma ficha (hrefBase) y sin precio (ocultarPrecio), no a Tienda.
   Uso:
     <FichaProductoAtelier slug="vestido-aurora" seccion="novias" />
   ============================================================ */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { productosEjemplo } from '@/components/layout/productosEjemplo';
import { ProductosRecomendados } from '@/components/layout';
import GaleriaProducto from './GaleriaProducto';
import InfoAtelier from './InfoAtelier';
import { Boton, Acordeon, FilaAcordeon } from '@/components/ui';
import { slugify } from '@/lib/slugify';
import styles from './FichaProductoAtelier.module.css';

async function FichaProductoAtelier({ slug, seccion, locale }) {
  const tProducto = await getTranslations('producto');

  const producto = productosEjemplo.find((candidato) => slugify(candidato.nombre) === slug);
  if (!producto) notFound();

  // Mismo catálogo de ejemplo, excluyendo el producto actual — hasta
  // 10, la misma cantidad que espera ProductosRecomendados en su
  // carrusel (ver tienda/[producto]/page.js).
  const relacionados = productosEjemplo.filter((candidato) => candidato !== producto).slice(0, 10);

  return (
    <section className="seccion contenedor">
      <div className={styles.ficha}>
        <GaleriaProducto
          imagenes={producto.imagenes?.length ? producto.imagenes : [producto.imagen]}
          alt={producto.nombre}
        />

        <div className={styles.info}>
          <InfoAtelier
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            colores={producto.colores}
            tallas={producto.tallas}
          />

          <Acordeon>
            <FilaAcordeon titulo={tProducto('composicion')}>
              <p>{tProducto('composicionTexto')}</p>
              <div>
                <p>{tProducto('origenDisenado')}</p>
                <p>{tProducto('origenFabricado')}</p>
                <p>{tProducto('origenTintura')}</p>
                <p>{tProducto('origenTejido')}</p>
              </div>
            </FilaAcordeon>
            <FilaAcordeon titulo={tProducto('porEncargoTitulo')}>
              <p>{tProducto('porEncargoTexto')}</p>
            </FilaAcordeon>
          </Acordeon>
        </div>
      </div>

      <div className={styles.debajoFicha}>
        {relacionados.length > 0 && (
          <ProductosRecomendados
            productos={relacionados}
            hrefBase={`atelier/${seccion}`}
            ocultarPrecio
          />
        )}

        <div className={styles.seguirExplorando}>
          <Boton variante="solido" href={`/${locale}/atelier/${seccion}`}>
            {tProducto('seguirExplorandoAtelier')}
          </Boton>
        </div>
      </div>
    </section>
  );
}

export default FichaProductoAtelier;
