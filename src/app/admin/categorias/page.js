'use client';

/* ============================================================
   CATEGORÍAS — spec sección 7. Solo Prêt-à-porter/Atelier admiten
   categorías nuevas — Archivo tiene estructura fija (Runway/
   Colecciones), no editable desde aquí.
   ============================================================ */

import { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { PageHeader, DragList, useToast } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { categoriasMock, tiposProducto } from '@/components/admin/mockData';
import styles from './page.module.css';

export default function CategoriasPage() {
  const { mostrarToast } = useToast();
  const [categorias, setCategorias] = useState(categoriasMock);
  const [tab, setTab] = useState('pret-a-porter');
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const lista = categorias[tab];
  const esFija = tab === 'archivo';

  function alternarVisible(id) {
    setCategorias((actual) => ({
      ...actual,
      [tab]: actual[tab].map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)),
    }));
  }

  function anadirCategoria() {
    if (!nuevaCategoria.trim()) return;
    setCategorias((actual) => ({
      ...actual,
      [tab]: [...actual[tab], { id: `cat${Date.now()}`, nombre: nuevaCategoria, visible: true, orden: actual[tab].length + 1 }],
    }));
    setNuevaCategoria('');
    mostrarToast('Categoría añadida (demo)');
  }

  return (
    <div>
      <PageHeader titulo="Categorías" subtitulo="Orden y visibilidad en el menú de navegación pública" />

      <div className={styles.tabs}>
        {tiposProducto.map((t) => (
          <button
            key={t.valor}
            type="button"
            className={`${styles.tab} ${tab === t.valor ? styles.activo : ''}`}
            onClick={() => setTab(t.valor)}
          >
            {t.etiqueta}
          </button>
        ))}
      </div>

      {esFija && <p className={styles.avisoFija}>Archive/Colecciones tiene una estructura fija (Runway/Colecciones) — no se pueden añadir categorías nuevas aquí.</p>}

      <div className={styles.lista}>
        {esFija ? (
          lista.map((cat) => (
            <div key={cat.id} className={styles.fila}>
              <GripVertical size={16} className={styles.asaFija} />
              <span className={styles.nombre}>{cat.nombre}</span>
            </div>
          ))
        ) : (
          <DragList
            items={lista}
            claveItem={(c) => c.id}
            onReorder={(nuevo) => setCategorias((actual) => ({ ...actual, [tab]: nuevo }))}
            renderItem={(cat) => (
              <div className={styles.fila}>
                <span className={styles.nombre}>{cat.nombre}</span>
                <Boton variante="texto" onClick={() => alternarVisible(cat.id)}>{cat.visible ? 'Ocultar' : 'Mostrar'}</Boton>
              </div>
            )}
          />
        )}
      </div>

      {!esFija && (
        <div className={styles.anadirFila}>
          <Input etiqueta="Nueva categoría" valor={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} />
          <Boton variante="contorno" onClick={anadirCategoria}>Añadir</Boton>
        </div>
      )}
    </div>
  );
}
