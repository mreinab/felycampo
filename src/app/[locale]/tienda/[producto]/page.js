/* Ruta DINÁMICA: una plantilla para TODOS los productos.
   /tienda/vestido-aurora, /tienda/falda-vera... El parámetro llega en
   params.producto — el slug de "nombre" (ver src/lib/slugify.js),
   mismo algoritmo que usa TarjetaProducto para enlazar aquí. Busca en
   el catálogo de ejemplo compartido por las páginas de categoría
   (productosEjemplo.js) mientras no hay backend real. */

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { CuadriculaProductos } from '@/components/layout';
import { productosEjemplo } from '@/components/layout/productosEjemplo';
import { FichaProductoAcciones, GaleriaProducto } from '@/components/ecommerce';
import { Acordeon, FilaAcordeon } from '@/components/ui';
import { slugify } from '@/lib/slugify';
import EscribirResena from '@/components/layout/EscribirResena';
import styles from './page.module.css';

export default async function FichaProducto({ params }) {
  const { producto: slug } = await params;
  const t = await getTranslations('producto');

  const producto = productosEjemplo.find((candidato) => slugify(candidato.nombre) === slug);
  if (!producto) notFound();

  // Mismo catálogo de ejemplo, excluyendo el producto actual — hasta
  // 4, la misma cantidad que espera CuadriculaProductos en "fila".
  const relacionados = productosEjemplo.filter((candidato) => candidato !== producto).slice(0, 4);

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
          </div>

          <FichaProductoAcciones colores={producto.colores} tallas={producto.tallas} />

          <Acordeon>
            <FilaAcordeon titulo={t('detalles')} abiertoPorDefecto>
              <p>{producto.descripcion}</p>
            </FilaAcordeon>
            <FilaAcordeon titulo={t('composicion')}>
              <p>{t('composicionTexto')}</p>
            </FilaAcordeon>
            <FilaAcordeon titulo={t('envios')}>
              <p>{t('enviosTexto')}</p>
            </FilaAcordeon>
          </Acordeon>
        </div>
      </div>

      {relacionados.length > 0 && (
        <CuadriculaProductos
          productos={relacionados}
          tituloKey="catalogo.subtituloFelyCampo"
          coleccionKey="producto.relacionados"
        />
      )}

      {/* Placeholder de UI para el flujo "cliente logueado deja una
          reseña" — ver EscribirResena.jsx para el porqué no hay login
          real detrás. Alimentaría /admin/resenas (nueva fila con
          `estado: 'Oculta'`, pendiente de revisión). */}
      <div className="mt-24">
        <EscribirResena />
      </div>
    </section>
  );
}
