'use client';

/* ============================================================
   EXTRAS — spec sección 11. Opcionales, no bloquean el lanzamiento.
   ============================================================ */

import { useState } from 'react';
import { PageHeader, useToast } from '@/components/admin';
import { extrasMock } from '@/components/admin/mockData';
import styles from './page.module.css';

export default function ExtrasPage() {
  const { mostrarToast } = useToast();
  const [extras, setExtras] = useState(extrasMock);

  function alternar(id) {
    setExtras((actual) => actual.map((e) => (e.id === id ? { ...e, activo: !e.activo } : e)));
    mostrarToast('Preferencia guardada (demo)');
  }

  return (
    <div>
      <PageHeader titulo="Extras" subtitulo="Funcionalidades opcionales, no bloquean el lanzamiento" />
      <div className={styles.lista}>
        {extras.map((extra) => (
          <div key={extra.id} className={styles.fila}>
            <div>
              <p className={styles.nombre}>{extra.nombre}</p>
              <p className={styles.descripcion}>{extra.descripcion}</p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={extra.activo} onChange={() => alternar(extra.id)} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
