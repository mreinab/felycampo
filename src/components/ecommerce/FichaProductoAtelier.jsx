// FichaProductoAtelier.jsx

/* ============================================================
   FICHA DE PRODUCTO — ATELIER (Novias/Fiesta) — Fely Campo
   Plantilla propia para /atelier/novias/[producto] y
   /atelier/fiesta/[producto] — a propósito NO es la misma que
   /tienda/[producto]/page.js: estas piezas no se compran online (sin
   precio de catálogo, a presupuesto/cita) así que no llevan precio ni
   FichaProductoAcciones (talla + "añadir a la cesta"). En su lugar,
   InfoAtelier.jsx (color + CTA "Contacta con nosotros", ver ahí).
   GaleriaProducto también lleva "esAtelier" (mismo CTA en el panel de
   compra rápida del lightbox, ver GaleriaProductoLightbox.jsx) — sin
   precio ni "tallas" ahí, solo nombre/colores.
   TarjetaProducto enlaza aquí vía su prop "hrefBase"
   ('atelier/novias'/'atelier/fiesta' en vez de 'tienda', ver
   CuadriculaProductos.jsx) — mismo slug que /lib/slugify.js.
   Acordeon: "Composición" (mismos textos que tienda/[producto]/page.js)
   + "Producto por Encargo (PRE-ORDER)" — aquí no tiene sentido "Envíos
   y devoluciones" (piezas por encargo, no venta online), así que esa
   fila se sustituye por la de PRE-ORDER, explicando que no se admite
   devolución una vez confirmado el pedido.
   "ResenasClientes" (debajo de la ficha, antes de "relacionados"):
   mismo PLACEHOLDER y mismo orden que tienda/[producto]/page.js —
   RESENAS_EJEMPLO compartido entre las dos (ver resenasEjemplo.js), no
   una copia propia de Atelier.
   "relacionados" (ProductosRecomendados, debajo de la ficha): mismo
   PLACEHOLDER que tienda/[producto]/page.js — catálogo de ejemplo
   compartido (productosEjemplo.js), sin backend real todavía que
   cruce productos por colección/categoría de verdad. Enlaza a esta
   misma ficha (hrefBase) y sin precio (ocultarPrecio), no a Tienda.
   Fiesta es la excepción: busca y enseña relacionados dentro de
   furisodeProductos.js (catálogo real de la colección Furisode), no del
   placeholder genérico — Novias sigue igual, sin catálogo propio
   todavía.
   "Categorías" (debajo del Acordeon): las combinaciones en sí son
   PLACEHOLDER, mismo criterio que "relacionados" — productosEjemplo no
   tiene todavía un campo propio de categoría/silueta, así que aquí se
   turnan unas pocas combinaciones fijas (COMBOS_ESTILO_SILUETA)
   tomadas de las mismas opciones que "Estilo y silueta" en
   PanelFiltros.jsx (mismas claves de traducción,
   filtros.estiloYSilueta.grupos.*), para no duplicar los textos. Solo
   en Atelier: ese filtro no existe en Tienda. Cada tag SÍ enlaza de
   verdad: a "/atelier/{seccion}/categoria/{opcion}" (mismo id de
   opción que en GRUPOS_ESTILO_SILUETA, ver
   estiloSiluetaGrupos.js) — página real e indexable (no un hash de
   URL: generateStaticParams/generateMetadata propios, ver
   atelier/novias/categoria/[categoria]/page.js) que preselecciona el
   chip correspondiente en PanelFiltros y muestra una miga de pan real
   ("Atelier / Novias") con el nombre de la categoría como título (ver
   prop "categoriaActiva" en CuadriculaProductos.jsx). No filtra la
   cuadrícula de verdad todavía (misma limitación de "estiloYSilueta"
   — productosEjemplo no tiene esos atributos), solo la selección
   visual del chip.
   Uso:
     <FichaProductoAtelier slug="vestido-aurora" seccion="novias" />
   ============================================================ */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { productosEjemplo } from '@/components/layout/productosEjemplo';
import { furisodeProductos } from '@/components/layout/furisodeProductos';
import { RESENAS_EJEMPLO } from '@/components/layout/resenasEjemplo';
import { ProductosRecomendados, ResenasClientes } from '@/components/layout';
import GaleriaProducto from './GaleriaProducto';
import InfoAtelier from './InfoAtelier';
import { Boton, Acordeon, FilaAcordeon } from '@/components/ui';
import { slugify } from '@/lib/slugify';
import styles from './FichaProductoAtelier.module.css';

// Ver comentario "Categorías" arriba — combinaciones fijas (2-3 tags
// de grupos distintos cada una) que se turnan por producto, mismas
// claves que GRUPOS_ESTILO_SILUETA en estiloSiluetaGrupos.js.
const COMBOS_ESTILO_SILUETA = [
  [{ grupo: 'silueta', opcion: 'corteA' }, { grupo: 'estilo', opcion: 'clasico' }, { grupo: 'detalles', opcion: 'escoteEspalda' }],
  [{ grupo: 'silueta', opcion: 'sirena' }, { grupo: 'estilo', opcion: 'romantico' }, { grupo: 'detalles', opcion: 'fluido' }],
  [{ grupo: 'silueta', opcion: 'princesa' }, { grupo: 'largo', opcion: 'cola' }, { grupo: 'estilo', opcion: 'diferente' }],
  [{ grupo: 'volumen', opcion: 'dosPiezas' }, { grupo: 'estilo', opcion: 'minimal' }, { grupo: 'detalles', opcion: 'asimetrico' }],
];

async function FichaProductoAtelier({ slug, seccion, locale }) {
  const tProducto = await getTranslations('producto');
  const tFiltros = await getTranslations('filtros');

  // Fiesta ya tiene catálogo real (furisodeProductos) — Novias sigue
  // con el placeholder genérico hasta que tenga el suyo.
  const catalogo = seccion === 'fiesta' ? furisodeProductos : productosEjemplo;

  const producto = catalogo.find((candidato) => slugify(candidato.nombre) === slug);
  if (!producto) notFound();

  const indiceProducto = catalogo.indexOf(producto);
  const categorias = COMBOS_ESTILO_SILUETA[indiceProducto % COMBOS_ESTILO_SILUETA.length];

  // Mismo catálogo que "producto", excluyendo el actual — hasta 10, la
  // misma cantidad que espera ProductosRecomendados en su carrusel (ver
  // tienda/[producto]/page.js).
  const relacionados = catalogo.filter((candidato) => candidato !== producto).slice(0, 10);

  return (
    <section className="seccion contenedor">
      <div className={styles.ficha}>
        <GaleriaProducto
          imagenes={producto.imagenes?.length ? producto.imagenes : [producto.imagen]}
          alt={producto.nombre}
          nombre={producto.nombre}
          colores={producto.colores}
          tallas={producto.tallas}
          esAtelier
        />

        <div className={styles.info}>
          <InfoAtelier
            imagen={producto.imagen}
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

          <p className={styles.categorias}>
            {tProducto('categorias')}: {categorias.map(({ grupo, opcion }, indice) => (
              <span key={`${grupo}-${opcion}`}>
                <Link href={`/${locale}/atelier/${seccion}/categoria/${opcion}`} className={styles.categoriaTag}>
                  {tFiltros(`estiloYSilueta.grupos.${grupo}.opciones.${opcion}`)}
                </Link>
                {indice < categorias.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className={styles.debajoFicha}>
        <ResenasClientes resenas={RESENAS_EJEMPLO} />

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
