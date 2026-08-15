/* Ruta DINÁMICA: una plantilla para TODOS los productos.
   /pret-a-porter/vestido-aurora, /pret-a-porter/falda-vera...
   El parámetro llega en params.producto; Jaume lo conectará a datos. */

import EscribirResena from '@/components/layout/EscribirResena';

export default async function FichaProducto({ params }) {
  const { producto } = await params;
  return (
    <section className="seccion contenedor">
      <p className="text-caption uppercase text-gris-500 mb-16">Ficha de producto</p>
      <h1 className="capitalize">{producto.replaceAll('-', ' ')}</h1>
      <p className="text-gris-500 mt-24 texto-legible">
        Plantilla de ficha pendiente de maquetar. Una sola plantilla sirve para todos los productos.
      </p>

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
