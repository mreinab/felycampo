/* Ruta DINÁMICA: look individual dentro de una colección. */

export default async function Look({ params }) {
  const { coleccion, look } = await params;
  return (
    <section className="seccion contenedor">
      <p className="text-caption uppercase text-gris-500 mb-16 capitalize">{coleccion.replaceAll('-', ' ')}</p>
      <h1 className="capitalize">{look.replaceAll('-', ' ')}</h1>
    </section>
  );
}
