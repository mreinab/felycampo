'use client';

/* ============================================================
   CATEGORÍAS — spec sección 7. Solo Prêt-à-porter/Atelier admiten
   categorías nuevas — los archivos de colecciones (Runway/Novia/Fiesta,
   `tipo: 'archivo'/'novia'/'fiesta'`) tienen estructura fija (una entrada
   por colección, `fija: true` en cada categoría de mockData.js), no
   editable desde aquí. `esFija` se calcula mirando la propia lista, no
   comparando `tab` contra un tipo hardcodeado — así un futuro archivo más
   no necesita tocar esta página.
   ============================================================ */

import { useState } from 'react';
import { GripVertical, Plus } from 'lucide-react';
import {
  PageHeader, DragList, useToast, useCategorias,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { tiposProducto } from '@/components/admin/mockData';
import styles from './page.module.css';

export default function CategoriasPage() {
  const { mostrarToast } = useToast();
  const {
    categorias, anadirCategoria: anadirCategoriaContexto, alternarVisible: alternarVisibleContexto, reordenarCategorias,
  } = useCategorias();
  const [tab, setTab] = useState('pret-a-porter');
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const lista = categorias[tab];
  const esFija = Boolean(lista?.some((c) => c.fija));

  function alternarVisible(id) {
    alternarVisibleContexto(tab, id);
  }

  function anadirCategoria() {
    if (!nuevaCategoria.trim()) return;
    anadirCategoriaContexto(tab, nuevaCategoria);
    setNuevaCategoria('');
    mostrarToast('Categoría añadida (demo)');
  }

  function enfocarNuevaCategoria() {
    document.querySelector('input[name="nuevaCategoria"]')?.focus();
  }

  return (
    <div>
      <PageHeader titulo="Categorías" subtitulo="Orden y visibilidad en el menú de navegación pública">
        {!esFija && (
          <Boton variante="solido" onClick={enfocarNuevaCategoria}><Plus size={14} /> Nueva categoría</Boton>
        )}
      </PageHeader>

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

      {esFija && <p className={styles.avisoFija}>Esta sección tiene una entrada fija por colección — no se pueden añadir categorías nuevas aquí.</p>}

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
            onReorder={(nuevo) => reordenarCategorias(tab, nuevo)}
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
          <Input etiqueta="Nueva categoría" nombre="nuevaCategoria" valor={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} />
          <Boton variante="contorno" onClick={anadirCategoria}>Añadir</Boton>
        </div>
      )}
    </div>
  );
}
