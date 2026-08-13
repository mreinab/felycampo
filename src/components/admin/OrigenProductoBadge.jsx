/* ============================================================
   ORIGEN PRODUCTO BADGE — Fely Campo (admin)
   Mismo criterio que EstadoContactoBadge/EstadoPedidoBadge: fondo de
   color, solo tablas internas. Indica de qué apartado de Atelier viene
   el producto de una consulta de precio (Novias/Fiesta); si el producto
   no se resuelve en productosMock (o no pertenece a Novias/Fiesta) cae
   en la etiqueta genérica "Atelier".
   Uso: <OrigenProductoBadge producto="Vestido Elena" />
   ============================================================ */

import { productosMock } from './mockData';
import styles from './OrigenProductoBadge.module.css';

const CONFIG = {
  atelier: { etiqueta: 'Atelier', clase: 'atelier' },
  novias: { etiqueta: 'Novias', clase: 'novias' },
  fiesta: { etiqueta: 'Fiesta', clase: 'fiesta' },
};

function calcularOrigenProducto(nombreProducto) {
  const producto = productosMock.find((p) => p.nombre === nombreProducto);
  if (producto?.categoriaId === 'cat3') return 'novias';
  if (producto?.categoriaId === 'cat4') return 'fiesta';
  return 'atelier';
}

function OrigenProductoBadge({ producto }) {
  const { etiqueta, clase } = CONFIG[calcularOrigenProducto(producto)];
  return <span className={`${styles.badge} ${styles[clase]}`}>{etiqueta}</span>;
}

export default OrigenProductoBadge;
export { calcularOrigenProducto, CONFIG as CONFIG_ORIGEN_PRODUCTO };
