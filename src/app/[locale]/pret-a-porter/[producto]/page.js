/* Ruta DINÁMICA: una plantilla para TODOS los productos.
   /pret-a-porter/vestido-aurora, /pret-a-porter/falda-vera...
   El parámetro llega en params.producto; Jaume lo conectará a datos. */

export default async function FichaProducto({ params }) {
  const { producto } = await params;
  return (
    <section className="seccion contenedor">
      <p className="text-caption uppercase text-gris-500 mb-16">Ficha de producto</p>
      <h1 className="capitalize">{producto.replaceAll('-', ' ')}</h1>
      <p className="text-gris-500 mt-24 texto-legible">
        Plantilla de ficha pendiente de maquetar. Una sola plantilla sirve para todos los productos.
      </p>
    </section>
  );
}
