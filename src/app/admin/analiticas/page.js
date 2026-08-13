'use client';

/* ============================================================
   ANALÍTICAS — placeholder de ejemplo. KPIs y ranking de productos
   con datos 100% estáticos (kpisAnaliticas, topProductosMock).
   ============================================================ */

import { PageHeader, TablaAdmin } from '@/components/admin';
import { kpisAnaliticas, topProductosMock } from '@/components/admin/mockData';
import styles from './page.module.css';

export default function AnaliticasPage() {
  return (
    <div>
      <PageHeader titulo="Analíticas" subtitulo="Resumen del mes en curso" />

      <div className={styles.kpis}>
        {kpisAnaliticas.map((kpi) => (
          <div key={kpi.id} className={styles.kpiTarjeta}>
            <p className={styles.kpiEtiqueta}>{kpi.etiqueta}</p>
            <p className={styles.kpiValor}>{kpi.valor}</p>
            <p className={`${styles.kpiVariacion} ${kpi.variacion.startsWith('-') ? styles.kpiNegativa : ''}`}>
              {kpi.variacion} vs. mes anterior
            </p>
          </div>
        ))}
      </div>

      <h2 className={styles.subtitulo}>Productos más vendidos</h2>
      <TablaAdmin
        columnas={[
          { clave: 'producto', etiqueta: 'Producto' },
          { clave: 'unidadesVendidas', etiqueta: 'Unidades vendidas' },
          { clave: 'ingresos', etiqueta: 'Ingresos' },
        ]}
        filas={topProductosMock}
        claveFila={(fila) => fila.producto}
      />
    </div>
  );
}
