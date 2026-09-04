// ResenasClientes.jsx

/* ============================================================
   RESEÑAS DE CLIENTES (placeholder) — Fely Campo
   Bloque de reseñas publicadas, debajo de .ficha en la ficha de
   producto (tienda/[producto]/page.js) — solo LECTURA, reseñas ya
   publicadas desde el admin panel (ver resenasMock en
   src/components/admin/mockData.js, campo estado: 'Publicada'). El
   formulario público "Escribe tu reseña" (EscribirResena.jsx) que
   vivía debajo en la misma página se quitó del sitio público.

   PLACEHOLDER a propósito, mismo criterio que LookPasarela.jsx: no
   está conectado de verdad al admin todavía (ni hay filtrado real por
   producto, ni por estado), así que se renderiza siempre con un par
   de reseñas de ejemplo — mismas foto/texto/nombre que r1/r2 de
   resenasMock, las únicas dos con foto real disponible en
   /public/img/Clientes. Cuando exista esa conexión real, este mismo
   componente puede recibir el resultado filtrado (estado: 'Publicada',
   productoId del producto actual) tal cual.

   Diseño minimalista guiado por la foto: retrato de cliente a sangre
   (sin marco ni sombra, cero radio) con el texto y el nombre debajo,
   como pie de foto. Pensado explícitamente para funcionar igual de
   bien con 1 sola reseña que con 2, 3 o 4 — cada tarjeta tiene un
   ancho acotado (nunca se estira a ocupar toda la fila) y la fila se
   centra, así que no se ve "vacío" ni desproporcionado según cuántas
   reseñas haya.
   Uso:
     <ResenasClientes resenas={[
       { nombre: 'Marta Ibáñez', texto: 'El vestido...', foto: '/img/Clientes/ClientReview- (1).jpg' },
     ]} />
   ============================================================ */

import styles from './ResenasClientes.module.css';

function ResenasClientes({ resenas = [] }) {
  if (resenas.length === 0) return null;

  return (
    <section className={styles.seccion}>
      <div className={styles.fila}>
        {resenas.map((resena) => (
          <figure key={resena.nombre} className={styles.tarjeta}>
            <div className={styles.marco}>
              {resena.foto ? (
                <img src={resena.foto} alt="" className={styles.foto} />
              ) : (
                <div className={styles.fotoVacia} aria-hidden="true" />
              )}
            </div>
            <figcaption className={styles.pie}>
              <p className={styles.texto}>&ldquo;{resena.texto}&rdquo;</p>
              <p className={styles.nombre}>{resena.nombre}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default ResenasClientes;
