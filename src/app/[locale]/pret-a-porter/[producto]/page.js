/* Ruta DINÁMICA: una plantilla para TODOS los productos.
   /pret-a-porter/falda-basilea... El parámetro llega en params.producto
   — el slug de "nombre" (ver src/lib/slugify.js), mismo algoritmo que
   usa TarjetaProducto para enlazar aquí. Busca en el catálogo real de
   Prêt-à-porter (tiendaProductos.js), mismo criterio que
   atelier/{novias,fiesta}/[producto]/page.js con sus propios catálogos.

   Sin precio ni tallas (a petición explícita, mismo criterio que
   Atelier): ni "producto.precio" ni "producto.tallas"/"agotadas" se
   pasan ya a GaleriaProducto/FichaProductoAcciones — ver el detalle
   completo en FichaProductoAcciones.jsx. */

import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { ProductosRecomendados, ResenasClientes } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { RESENAS_EJEMPLO } from '@/components/layout/resenasEjemplo';
import { FichaProductoAcciones, GaleriaProducto, LookPasarela } from '@/components/ecommerce';
import { Acordeon, FilaAcordeon, Boton } from '@/components/ui';
import { slugify } from '@/lib/slugify';
import styles from './page.module.css';

// Páginas de listado reales (Prêt-à-porter + categorías, Atelier + sus
// 3 secciones) — mismo criterio que RUTAS_CON_PRODUCT_HERO en
// src/app/[locale]/layout.js, para reconocer desde qué categoría llegó
// la visita (ver "Sigue explorando" más abajo) a partir del Referer.
const RUTAS_TIENDA = ['/pret-a-porter', '/pret-a-porter/tops-y-camisetas', '/pret-a-porter/chaquetas-y-abrigos', '/pret-a-porter/faldas', '/pret-a-porter/pantalones', '/pret-a-porter/vestidos'];
const RUTAS_ATELIER = ['/atelier', '/atelier/novias', '/atelier/fiesta', '/atelier/vosotras'];

export default async function FichaProducto({ params }) {
  const { locale, producto: slug } = await params;
  const t = await getTranslations('producto');

  const producto = tiendaProductos.find((candidato) => slugify(candidato.nombre) === slug);
  if (!producto) notFound();

  // Mismo catálogo real, excluyendo el producto actual — hasta 10, la
  // misma cantidad que espera ProductosRecomendados en su carrusel.
  const relacionados = tiendaProductos.filter((candidato) => candidato !== producto).slice(0, 10);

  // "Sigue explorando" (ver debajo de ProductosRecomendados más abajo):
  // vuelve a la categoría de la que vino la visita, leyendo el Referer
  // del navegador — más fiable que "producto.categoria" (llevaría a la
  // categoría real del producto, no a la página de la que vino de
  // verdad la visita: pudo llegar aquí desde /pret-a-porter, un enlace
  // externo, o buscador). Sin Referer reconocible (visita directa,
  // marcador, fuera del sitio), cae a /pret-a-porter como categoría por
  // defecto.
  const referer = (await headers()).get('referer') || '';
  let rutaOrigen = null;
  try {
    rutaOrigen = new URL(referer).pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  } catch {
    rutaOrigen = null;
  }
  const esOrigenAtelier = rutaOrigen && RUTAS_ATELIER.includes(rutaOrigen);
  const esOrigenTienda = rutaOrigen && RUTAS_TIENDA.includes(rutaOrigen);
  const hrefSeguirExplorando = esOrigenAtelier || esOrigenTienda ? `/${locale}${rutaOrigen}` : `/${locale}/pret-a-porter`;
  const keySeguirExplorando = esOrigenAtelier ? 'seguirExplorandoAtelier' : 'seguirExplorandoTienda';

  return (
    <section className={`seccion contenedor ${styles.debajoNavbar}`}>
      <div className={styles.ficha}>
        <GaleriaProducto
          imagenes={producto.imagenes?.length ? producto.imagenes : [producto.imagen]}
          alt={producto.nombre}
          nombre={producto.nombre}
          colores={producto.colores}
        />

        <div className={styles.info}>
          <div className={styles.bloquePrincipal}>
            <div className={styles.cabecera}>
              <h1 className={styles.nombre}>{producto.nombre}</h1>
              <p className={styles.descripcion}>{producto.descripcion}</p>
            </div>

            <FichaProductoAcciones
              nombre={producto.nombre}
              imagen={producto.imagen}
              colores={producto.colores}
            />

            <Acordeon>
              <FilaAcordeon titulo={t('composicion')}>
                <p>{t('composicionTexto')}</p>
                <div>
                  <p>{t('origenDisenado')}</p>
                  <p>{t('origenFabricado')}</p>
                  <p>{t('origenTintura')}</p>
                  <p>{t('origenTejido')}</p>
                </div>
              </FilaAcordeon>
              <FilaAcordeon titulo={t('envios')}>
                <div>
                  <p>{t('enviosSubtitulo')}</p>
                  <p>{t('entregaEstimada')}</p>
                </div>
                <div>
                  <p>{t('devolucionesSubtitulo')}</p>
                  <p>
                    {t.rich('devolucionesTexto', {
                      email: (chunks) => <a href="mailto:info@felycampo.com" className="enlace-texto">{chunks}</a>,
                      telefono: (chunks) => <a href="tel:+34683703644" className="enlace-texto">{chunks}</a>,
                      atencion: (chunks) => <a href={`/${locale}/ayuda/atencion-cliente`} className="enlace-texto">{chunks}</a>,
                    })}
                  </p>
                </div>
              </FilaAcordeon>
            </Acordeon>
          </div>
        </div>
      </div>

      <div className={styles.debajoFicha}>
        {/* PLACEHOLDER a propósito, ver LookPasarela.jsx — se
            renderiza siempre con una imagen fija, sin lógica real de
            selección todavía (pendiente de admin panel). Detalle
            completo en docs/design.md, sección "Look de pasarela
            (placeholder)". Fuera de .info (ver más arriba), alineado a
            la derecha, justo encima de ResenasClientes. */}
        <LookPasarela
          titulo={t('runwayLook')}
          imagen="/img/collections/runway/fw27-lacoleccion/FelyCampo_01.webp"
          alt={t('runwayLook')}
        />

        <ResenasClientes resenas={RESENAS_EJEMPLO} />

        {relacionados.length > 0 && (
          <>
            <ProductosRecomendados productos={relacionados} ocultarPrecio />
            <div className={styles.seguirExplorando}>
              <Boton variante="solido" href={hrefSeguirExplorando}>{t(keySeguirExplorando)}</Boton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
