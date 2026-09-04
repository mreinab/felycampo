/* Ruta DINÁMICA: una plantilla para TODOS los productos.
   /tienda/vestido-aurora, /tienda/falda-vera... El parámetro llega en
   params.producto — el slug de "nombre" (ver src/lib/slugify.js),
   mismo algoritmo que usa TarjetaProducto para enlazar aquí. Busca en
   el catálogo de ejemplo compartido por las páginas de categoría
   (productosEjemplo.js) mientras no hay backend real. */

import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { ProductosRecomendados, ResenasClientes } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';
import { FichaProductoAcciones, GaleriaProducto, LookPasarela } from '@/components/ecommerce';
import { Acordeon, FilaAcordeon, Boton } from '@/components/ui';
import { slugify } from '@/lib/slugify';
import styles from './page.module.css';

// Páginas de listado reales (Tienda + categorías, Atelier + sus 3
// secciones) — mismo criterio que RUTAS_CON_PRODUCT_HERO en
// src/app/[locale]/layout.js, para reconocer desde qué categoría llegó
// la visita (ver "Sigue explorando" más abajo) a partir del Referer.
const RUTAS_TIENDA = ['/tienda', '/tienda/tops-y-camisetas', '/tienda/chaquetas-y-abrigos', '/tienda/faldas', '/tienda/vestidos', '/tienda/zapatos', '/tienda/accesorios'];
const RUTAS_ATELIER = ['/atelier', '/atelier/novias', '/atelier/fiesta', '/atelier/vosotras'];

export default async function FichaProducto({ params }) {
  const { locale, producto: slug } = await params;
  const t = await getTranslations('producto');

  const producto = productosEjemplo.find((candidato) => slugify(candidato.nombre) === slug);
  if (!producto) notFound();

  // Mismo catálogo de ejemplo, excluyendo el producto actual — hasta
  // 10, la misma cantidad que espera ProductosRecomendados en su carrusel.
  const relacionados = productosEjemplo.filter((candidato) => candidato !== producto).slice(0, 10);

  // "Sigue explorando" (ver debajo de ProductosRecomendados más abajo):
  // vuelve a la categoría de la que vino la visita, leyendo el Referer
  // del navegador — no hay campo de categoría en productosEjemplo (es
  // el mismo catálogo de ejemplo compartido por todas las páginas de
  // listado, ver productosEjemplo.js), así que no hay otra forma de
  // saber "de qué categoría viene" este producto en concreto. Sin
  // Referer reconocible (visita directa, marcador, fuera del sitio),
  // cae a /tienda como categoría por defecto.
  const referer = (await headers()).get('referer') || '';
  let rutaOrigen = null;
  try {
    rutaOrigen = new URL(referer).pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  } catch {
    rutaOrigen = null;
  }
  const esOrigenAtelier = rutaOrigen && RUTAS_ATELIER.includes(rutaOrigen);
  const esOrigenTienda = rutaOrigen && RUTAS_TIENDA.includes(rutaOrigen);
  const hrefSeguirExplorando = esOrigenAtelier || esOrigenTienda ? `/${locale}${rutaOrigen}` : `/${locale}/tienda`;
  const keySeguirExplorando = esOrigenAtelier ? 'seguirExplorandoAtelier' : 'seguirExplorandoTienda';

  // PLACEHOLDER a propósito, ver ResenasClientes.jsx — mismas
  // fotos/textos/nombres que r1/r2 de resenasMock
  // (src/components/admin/mockData.js), las únicas dos con foto real
  // disponible en /public/img/Clientes. Sin conexión real todavía con
  // el admin (ni filtrado por producto ni por estado "Publicada").
  const resenas = [
    {
      nombre: 'Marta Ibáñez',
      texto: 'El vestido Aurora es una pasada, la tela y el corte son espectaculares.',
      foto: '/img/Clientes/ClientReview- (1).jpg',
    },
    {
      nombre: 'Laura Gómez',
      texto: 'Atención impecable en el atelier, el vestido de novia superó mis expectativas.',
      foto: '/img/Clientes/ClientReview- (2).jpg',
    },
  ];

  return (
    <section className="seccion contenedor">
      <div className={styles.ficha}>
        <GaleriaProducto
          imagenes={producto.imagenes?.length ? producto.imagenes : [producto.imagen]}
          alt={producto.nombre}
          nombre={producto.nombre}
          precio={producto.precio}
          colores={producto.colores}
          tallas={producto.tallas}
        />

        <div className={styles.info}>
          <div className={styles.cabecera}>
            <h1 className={styles.nombre}>{producto.nombre}</h1>
            <p className={styles.precio}>{producto.precio}</p>
            <p className={styles.descripcion}>{producto.descripcion}</p>
          </div>

          <FichaProductoAcciones
            nombre={producto.nombre}
            precio={producto.precio}
            imagen={producto.imagen}
            colores={producto.colores}
            tallas={producto.tallas}
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

          {/* PLACEHOLDER a propósito, ver LookPasarela.jsx — se
              renderiza siempre con una imagen fija, sin lógica real
              de selección todavía (pendiente de admin panel). Detalle
              completo en docs/design.md, sección "Look de pasarela
              (placeholder)". */}
          <LookPasarela
            titulo={t('runwayLook')}
            imagen="/img/collections/runway/fw27-lacoleccion/FelyCampo_01.webp"
            alt={t('runwayLook')}
          />
        </div>
      </div>

      <ResenasClientes resenas={resenas} />

      {relacionados.length > 0 && (
        <>
          <ProductosRecomendados productos={relacionados} />
          <div className={styles.seguirExplorando}>
            <Boton variante="solido" href={hrefSeguirExplorando}>{t(keySeguirExplorando)}</Boton>
          </div>
        </>
      )}
    </section>
  );
}
