// FichaProductoAtelier.jsx

/* ============================================================
   FICHA DE PRODUCTO — ATELIER (Novias/Fiesta) — Fely Campo
   Plantilla propia para /atelier/novias/[producto] y
   /atelier/fiesta/[producto] — a propósito NO es la misma que
   /pret-a-porter/[producto]/page.js: estas piezas no se compran online
   (sin precio de catálogo, a presupuesto/cita) así que no llevan
   precio ni FichaProductoAcciones (talla + "añadir a la cesta"). En su
   lugar, InfoAtelier.jsx (color + CTA "Contacta con nosotros", ver ahí).
   GaleriaProducto también lleva "esAtelier" (mismo CTA en el panel de
   compra rápida del lightbox, ver GaleriaProductoLightbox.jsx) — sin
   precio ni "tallas" ahí, solo nombre/colores.
   TarjetaProducto enlaza aquí vía su prop "hrefBase"
   ('atelier/novias'/'atelier/fiesta' en vez de 'pret-a-porter', ver
   CuadriculaProductos.jsx) — mismo slug que /lib/slugify.js.
   Acordeon: "Composición" (mismos textos que
   pret-a-porter/[producto]/page.js) + "Producto por Encargo
   (PRE-ORDER)" — aquí no tiene sentido "Envíos y devoluciones" (piezas
   por encargo, no venta online), así que esa fila se sustituye por la
   de PRE-ORDER, explicando que no se admite devolución una vez
   confirmado el pedido.
   "ResenasClientes" (debajo de la ficha, antes de "relacionados"):
   mismo PLACEHOLDER y mismo orden que pret-a-porter/[producto]/page.js
   — RESENAS_EJEMPLO compartido entre las dos (ver resenasEjemplo.js),
   no una copia propia de Atelier.
   "relacionados" (ProductosRecomendados, debajo de la ficha): mismo
   PLACEHOLDER que pret-a-porter/[producto]/page.js — catálogo de
   ejemplo compartido (productosEjemplo.js), sin backend real todavía
   que cruce productos por colección/categoría de verdad. Enlaza a esta
   misma ficha (hrefBase) y sin precio (ocultarPrecio), no a
   Prêt-à-porter.
   Fiesta y Novias son la excepción: buscan y enseñan relacionados
   dentro de su propio catálogo real (fiestaProductos.js /
   noviaProductos.js), no del placeholder genérico.
   "Categorías" (debajo del Acordeon): cuando el producto trae "tags"
   real (ver noviaProductos.js/fiestaProductos.js — columna "Tags
   (categoría)" de cada -info.xlsx, o la tabla pegada a mano para las
   colecciones de Fiesta que no tienen excel), se pintan tal cual,
   enlazando a su página de categoría real los que coincidan con una
   opción conocida (tagACategoria, ver estiloSiluetaGrupos.js) y como
   texto suelto el resto (tejidos, "Colección", el nombre de la propia
   colección...). Sin "tags" reales (SS27 y Prêt-à-porter dentro de
   fiestaProductos.js — ninguna de las dos tiene esa columna todavía —,
   y el resto de Atelier con el catálogo de ejemplo genérico) sigue el
   PLACEHOLDER de siempre: combinaciones
   fijas (COMBOS_ESTILO_SILUETA) tomadas de las mismas opciones que
   "Estilo y silueta" en PanelFiltros.jsx (mismas claves de traducción,
   filtros.estiloYSilueta.grupos.*), para no duplicar los textos. Solo
   en Atelier: ese filtro no existe en Tienda. En los dos casos cada
   tag enlazado va a "/atelier/{seccion}/categoria/{opcion}" (mismo id
   de opción que en GRUPOS_ESTILO_SILUETA, ver
   estiloSiluetaGrupos.js) — página real e indexable (no un hash de
   URL: generateStaticParams/generateMetadata propios, ver
   atelier/novias/categoria/[categoria]/page.js) que preselecciona el
   chip correspondiente en PanelFiltros y muestra una miga de pan real
   ("Atelier / Novias") con el nombre de la categoría como título (ver
   prop "categoriaActiva" en CuadriculaProductos.jsx). Ninguno de los
   dos casos filtra la cuadrícula de verdad todavía (misma limitación
   de "estiloYSilueta"), solo la selección visual del chip.
   Uso:
     <FichaProductoAtelier slug="vestido-aurora" seccion="novias" />
   ============================================================ */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { productosEjemplo } from '@/components/layout/productosEjemplo';
import { fiestaProductos } from '@/components/layout/fiestaProductos';
import { noviaProductos } from '@/components/layout/noviaProductos';
import { RESENAS_EJEMPLO } from '@/components/layout/resenasEjemplo';
import { ProductosRecomendados, ResenasClientes } from '@/components/layout';
import { tagACategoria } from '@/components/layout/estiloSiluetaGrupos';
import GaleriaProducto from './GaleriaProducto';
import InfoAtelier from './InfoAtelier';
import { Boton, Acordeon, FilaAcordeon } from '@/components/ui';
import { slugify } from '@/lib/slugify';
import styles from './FichaProductoAtelier.module.css';

const CATALOGOS_REALES = { fiesta: fiestaProductos, novias: noviaProductos };

// Ver comentario "Categorías" arriba — combinaciones fijas (2-3 tags
// de grupos distintos cada una) que se turnan por producto, mismas
// claves que GRUPOS_ESTILO_SILUETA en estiloSiluetaGrupos.js. Solo se
// usan cuando el producto no trae "tags" reales (ver más abajo).
const COMBOS_ESTILO_SILUETA = [
  [{ grupo: 'silueta', opcion: 'corteA' }, { grupo: 'estilo', opcion: 'clasico' }, { grupo: 'detalles', opcion: 'escoteEspalda' }],
  [{ grupo: 'silueta', opcion: 'sirena' }, { grupo: 'estilo', opcion: 'romantico' }, { grupo: 'detalles', opcion: 'fluido' }],
  [{ grupo: 'silueta', opcion: 'princesa' }, { grupo: 'largo', opcion: 'cola' }, { grupo: 'estilo', opcion: 'diferente' }],
  [{ grupo: 'volumen', opcion: 'dosPiezas' }, { grupo: 'estilo', opcion: 'minimal' }, { grupo: 'detalles', opcion: 'asimetrico' }],
];

async function FichaProductoAtelier({ slug, seccion, locale }) {
  const tProducto = await getTranslations('producto');
  const tFiltros = await getTranslations('filtros');

  // Fiesta y Novias ya tienen catálogo real (ver CATALOGOS_REALES) — el
  // resto de Atelier sigue con el placeholder genérico.
  const catalogo = CATALOGOS_REALES[seccion] || productosEjemplo;

  const producto = catalogo.find((candidato) => slugify(candidato.nombre) === slug);
  if (!producto) notFound();

  const indiceProducto = catalogo.indexOf(producto);
  // Con "tags" reales (Novias, ver noviaProductos.js) se enseñan tal
  // cual en vez del placeholder — ver comentario "Categorías" arriba.
  const categorias = producto.tags || COMBOS_ESTILO_SILUETA[indiceProducto % COMBOS_ESTILO_SILUETA.length];
  // Nombres de colección reales del catálogo actual (ver "coleccion" en
  // noviaProductos.js/fiestaProductos.js) — un tag real que coincida
  // exactamente con uno de ellos enlaza a la cuadrícula filtrada por
  // esa colección (ver CuadriculaProductos.jsx), igual que un tag de
  // Estilo y silueta enlaza a su página de categoría.
  const nombresColeccion = new Set(catalogo.map((candidato) => candidato.coleccion).filter(Boolean));

  // Mismo catálogo que "producto", excluyendo el actual — hasta 10, la
  // misma cantidad que espera ProductosRecomendados en su carrusel (ver
  // pret-a-porter/[producto]/page.js).
  const relacionados = catalogo.filter((candidato) => candidato !== producto).slice(0, 10);

  return (
    <section className={`seccion contenedor ${styles.debajoNavbar}`}>
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
            sku={producto.sku}
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
            {tProducto('categorias')}: {categorias.map((tag, indice) => {
              // Tag real (string, ver comentario "Categorías" arriba) vs.
              // placeholder ({grupo, opcion}) — dos destinos de enlace
              // posibles para un tag real: página de categoría (Estilo y
              // silueta) o cuadrícula filtrada por colección (nombre de
              // colección exacto, ver "nombresColeccion" arriba); el
              // placeholder siempre va a categoría, nunca a colección.
              const esTagReal = typeof tag === 'string';
              const categoria = esTagReal ? tagACategoria(tag, { esFiesta: seccion === 'fiesta' }) : tag;
              const esColeccion = esTagReal && !categoria && nombresColeccion.has(tag);
              const etiqueta = esTagReal ? tag : tFiltros(`estiloYSilueta.grupos.${tag.grupo}.opciones.${tag.opcion}`);
              let href = null;
              if (categoria) href = `/${locale}/atelier/${seccion}/categoria/${categoria.opcion}`;
              else if (esColeccion) href = `/${locale}/atelier/${seccion}?coleccion=${encodeURIComponent(tag)}`;
              return (
                <span key={esTagReal ? tag : `${tag.grupo}-${tag.opcion}`}>
                  {href ? (
                    <Link href={href} className={styles.categoriaTag}>
                      {etiqueta}
                    </Link>
                  ) : etiqueta}
                  {indice < categorias.length - 1 && ', '}
                </span>
              );
            })}
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
