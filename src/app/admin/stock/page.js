'use client';

/* ============================================================
   STOCK — spec sección 10. Solo lectura por ahora: cards por
   ubicación (extra "Stock por ubicación" activo, ver /admin/extras).
   'use client': TablaAdmin recibe columnas con funciones render, que
   no pueden cruzar el límite servidor→cliente.
   ============================================================ */

import { PageHeader, TablaAdmin } from '@/components/admin';
import { ubicacionesStock, stockMock } from '@/components/admin/mockData';
import styles from './page.module.css';

function nivelDe(cantidad) {
  if (cantidad === 0) return { texto: 'Agotado', clase: 'nivelAgotado' };
  if (cantidad < 5) return { texto: 'Stock bajo', clase: 'nivelBajo' };
  return { texto: 'Stock ok', clase: 'nivelOk' };
}

export default function StockPage() {
  return (
    <div>
      <PageHeader titulo="Stock" subtitulo="Vista rápida por ubicación" />

      <div className={styles.ubicaciones}>
        {ubicacionesStock.map((ubicacion) => {
          const items = stockMock.filter((s) => s.locationId === ubicacion.id);
          return (
            <div key={ubicacion.id} className={styles.tarjeta}>
              <div className={styles.tarjetaCabecera}>
                <span className={styles.tarjetaNombre}>{ubicacion.nombre}</span>
                <span className={styles.tarjetaTipo}>{ubicacion.tipo}</span>
              </div>
              <TablaAdmin
                columnas={[
                  { clave: 'producto', etiqueta: 'Producto' },
                  { clave: 'talla', etiqueta: 'Talla' },
                  { clave: 'color', etiqueta: 'Color' },
                  { clave: 'cantidad', etiqueta: 'Cantidad' },
                  {
                    clave: 'nivel',
                    etiqueta: 'Nivel',
                    render: (item) => {
                      const nivel = nivelDe(item.cantidad);
                      return <span className={`${styles.nivel} ${styles[nivel.clase]}`}>{nivel.texto}</span>;
                    },
                  },
                ]}
                filas={items}
                claveFila={(item) => `${item.producto}-${item.talla}-${item.color}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
