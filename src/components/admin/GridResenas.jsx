'use client';

/* ============================================================
   GRID RESEÑAS — Fely Campo (admin)
   Vista alternativa a TablaAdmin para /admin/resenas: rejilla de 4
   columnas (12 tarjetas/página, mismo Paginacion que GridPedidos/
   GridConsultasPrecio). La imagen de la tarjeta es la del PRODUCTO
   reseñado (no la foto que sube la clienta, ver FormularioResena.jsx
   "Foto de la clienta" — esa es secundaria, aquí prima reconocer de
   un vistazo qué producto es).
   Uso:
     <GridResenas filas={resenas} hrefFila={(r) => `/admin/resenas/${r.id}/editar`} porPagina={12} />
   ============================================================ */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import EstadoBadge from './EstadoBadge';
import Estrellas from './Estrellas';
import Paginacion from './Paginacion';
import { productosMock } from './mockData';
import styles from './GridResenas.module.css';

function productoDe(productoId) {
  return productosMock.find((p) => p.id === productoId);
}

function Tarjeta({ resena, href }) {
  const producto = productoDe(resena.productoId);

  return (
    <Link href={href} className={styles.tarjeta}>
      <div className={styles.imagenWrap}>
        {producto?.imagen ? <img src={producto.imagen} alt="" className={styles.imagen} /> : <div className={styles.imagenVacia} />}
        {resena.nuevo && <span className={styles.puntoNuevo} title="Nuevo" aria-label="Nuevo" />}
        <span className={styles.estadoEsquina}><EstadoBadge estado={resena.estado} /></span>
      </div>
      <div className={styles.info}>
        <p className={styles.nombreCliente}>{resena.nombreCliente}</p>
        <Estrellas valor={resena.valoracion} />
        <p className={styles.texto}>{resena.texto}</p>
        {producto && (
          <p className={styles.producto}>
            {producto.nombre}
            {' · '}
            {producto.sku}
          </p>
        )}
      </div>
    </Link>
  );
}

function GridResenas({
  filas, hrefFila, porPagina = 12, vacio = 'No hay reseñas que mostrar.',
}) {
  const [pagina, setPagina] = useState(1);

  useEffect(() => { setPagina(1); }, [filas]);

  const filasPagina = filas.slice((pagina - 1) * porPagina, pagina * porPagina);

  if (filas.length === 0) {
    return <p className={styles.vacio}>{vacio}</p>;
  }

  return (
    <div>
      <div className={styles.grid}>
        {filasPagina.map((resena) => (
          <Tarjeta key={resena.id} resena={resena} href={hrefFila(resena)} />
        ))}
      </div>
      <Paginacion pagina={pagina} porPagina={porPagina} total={filas.length} onCambiar={setPagina} />
    </div>
  );
}

export default GridResenas;
