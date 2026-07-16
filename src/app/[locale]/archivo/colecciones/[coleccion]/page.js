/* Ruta DINÁMICA: plantilla para cada colección del archivo. */

export default async function Coleccion({ params }) {
  const { coleccion } = await params;
  return (
    <section className="seccion contenedor">
      <p className="text-caption uppercase text-gris-500 mb-16">Colección</p>
      <h1 className="capitalize">{coleccion.replaceAll('-', ' ')}</h1>
    </section>
  );
}
