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
   "ResenasClientes" (COMENTADO por ahora, a petición — ver JSX):
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
   Sin "Categorías" (la lista de tags debajo del Acordeon) — quitada a
   petición de todas las fichas de producto.
   Uso:
     <FichaProductoAtelier slug="vestido-aurora" seccion="novias" />
   ============================================================ */

import { permanentRedirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { productosEjemplo } from '@/components/layout/productosEjemplo';
import { fiestaProductos } from '@/components/layout/fiestaProductos';
import { noviaProductos } from '@/components/layout/noviaProductos';
// import { RESENAS_EJEMPLO } from '@/components/layout/resenasEjemplo';
import { ProductosRecomendados /* , ResenasClientes */ } from '@/components/layout';
import GaleriaProducto from './GaleriaProducto';
import InfoAtelier from './InfoAtelier';
import { Boton, Acordeon, FilaAcordeon, JsonLd } from '@/components/ui';
import { producto as productoJsonLd, migas } from '@/lib/datosEstructurados';
import { slugify } from '@/lib/slugify';
import { buscarProductoFiesta } from '@/lib/catalogoFiesta';
import { sinNumeroColeccion } from '@/lib/nombreColeccion';
import styles from './FichaProductoAtelier.module.css';

const CATALOGOS_REALES = { fiesta: fiestaProductos, novias: noviaProductos };

async function FichaProductoAtelier({ slug, seccion, locale }) {
  const tProducto = await getTranslations('producto');

  // Fiesta y Novias ya tienen catálogo real (ver CATALOGOS_REALES) — el
  // resto de Atelier sigue con el placeholder genérico.
  const catalogo = CATALOGOS_REALES[seccion] || productosEjemplo;

  // Fiesta: búsqueda con redirección — si el look se renombró desde el
  // admin, su URL antigua redirige (301) a la nueva (ver
  // buscarProductoFiesta en lib/catalogoFiesta.js).
  let producto;
  if (seccion === 'fiesta') {
    const resultado = buscarProductoFiesta(slug);
    if (resultado.redirigirA) permanentRedirect(`/${locale}/atelier/fiesta/${resultado.redirigirA}`);
    producto = resultado.producto;
  } else {
    producto = catalogo.find((candidato) => slugify(candidato.nombre) === slug);
  }
  if (!producto) permanentRedirect(`/${locale}/atelier/${seccion}`); // slug inexistente: al listado (ninguna URL en 404)

  // Descripción en inglés si el look la tiene (se escribe en el admin);
  // si no, la de siempre en español.
  const descripcion = locale === 'en' && producto.descripcionEn ? producto.descripcionEn : producto.descripcion;

  // Mismo catálogo que "producto", excluyendo el actual — hasta 10, la
  // misma cantidad que espera ProductosRecomendados en su carrusel (ver
  // pret-a-porter/[producto]/page.js).
  const relacionados = catalogo.filter((candidato) => candidato !== producto).slice(0, 10);

  // Product (sin precio) + BreadcrumbList — auditoría SEO M2, ver
  // lib/datosEstructurados.js.
  const nombreSeccion = seccion === 'fiesta' ? (locale === 'es' ? 'Atelier Fiesta' : 'Eveningwear atelier') : (locale === 'es' ? 'Atelier Novias' : 'Bridal atelier');
  // Nombre para enseñar: sin el número de temporada de la colección
  // ("Look 27 26_Opaline" -> "Look 27 Opaline", ver lib/nombreColeccion.js).
  // producto.nombre completo sigue dando el slug de la URL.
  const nombreVisible = sinNumeroColeccion(producto.nombre);

  const jsonLd = [
    productoJsonLd({
      nombre: nombreVisible,
      descripcion,
      imagenes: producto.imagenes?.length ? producto.imagenes : [producto.imagen],
      sku: producto.sku,
      url: `/${locale}/atelier/${seccion}/${slug}`,
    }),
    migas([
      { nombre: 'Fely Campo', ruta: `/${locale}` },
      { nombre: 'Atelier', ruta: `/${locale}/atelier` },
      { nombre: nombreSeccion, ruta: `/${locale}/atelier/${seccion}` },
      { nombre: nombreVisible },
    ]),
  ];

  return (
    <section className={`seccion contenedor ${styles.debajoNavbar}`}>
      <JsonLd datos={jsonLd} />
      <div className={styles.ficha}>
        <GaleriaProducto
          imagenes={producto.imagenes?.length ? producto.imagenes : [producto.imagen]}
          alt={nombreVisible}
          nombre={nombreVisible}
          colores={producto.colores}
          tallas={producto.tallas}
          esAtelier
        />

        <div className={styles.info}>
          <InfoAtelier
            imagen={producto.imagen}
            nombre={nombreVisible}
            sku={producto.sku}
            descripcion={descripcion}
            colores={producto.colores}
            tallas={producto.tallas}
          />

          <Acordeon>
            <FilaAcordeon titulo={tProducto('composicion')}>
              <p>{tProducto('composicionTexto')}</p>
              <div>
                <p>{tProducto('origenDisenado')}</p>
                {/* "nuestros talleres" enlaza a /talleres-fely-campo (a petición). */}
                <p>{tProducto.rich('origenFabricado', { talleres: (chunks) => <a href={`/${locale}/talleres-fely-campo`} className="enlace-texto">{chunks}</a> })}</p>
              </div>
            </FilaAcordeon>
            <FilaAcordeon titulo={tProducto('porEncargoTitulo')}>
              <p>{tProducto('porEncargoTexto')}</p>
            </FilaAcordeon>
          </Acordeon>

        </div>
      </div>

      <div className={styles.debajoFicha}>
        {/* Reseñas comentadas a petición hasta que hagan falta — para
            recuperarlas, descomentar esta línea y los dos imports de
            arriba (RESENAS_EJEMPLO, ResenasClientes).
        <ResenasClientes resenas={RESENAS_EJEMPLO} /> */}

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
