'use client';

/* ============================================================
   COLORES — Fely Campo (admin)
   Biblioteca de colores reutilizable desde el formulario de producto
   (picker en vez de escribir hex/nombre a mano cada vez). Antes vivía
   como una pestaña dentro de GestorMateriales.jsx (Colores/Telas/
   Colecciones en una sola página) — se separó en su propia página
   colgada del sidebar porque mezclar los tres conceptos ahí resultaba
   confuso. "Colecciones" no se migró: la temporada de un producto ya
   se gestiona directamente desde su propio formulario (sección
   "Colección" de FormularioProducto.jsx).

   Mismo lenguaje visual que la sección "Colores" de
   FormularioProducto.jsx/FormularioLook.jsx (rejilla de chips + fila de
   alta con swatch/HEX/nombre) en vez de la lista de filas de antes —
   así un admin que ya conoce ese picker reconoce esta página al
   instante. Aquí los chips no son toggle (no hay nada que "seleccionar"
   en una biblioteca), llevan una X propia para borrar en su lugar.
   ============================================================ */

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { PageHeader, useToast } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { coloresMock } from '@/components/admin/mockData';
import styles from './GestorColores.module.css';

function GestorColores() {
  const { mostrarToast } = useToast();
  const [colores, setColores] = useState(coloresMock);

  const [nombreColorNuevo, setNombreColorNuevo] = useState('');
  const [hexColorNuevo, setHexColorNuevo] = useState('#000000');
  // El input HEX es texto libre mientras se escribe ("#6E263" a mitad de
  // teclear no es un hex válido todavía) — el swatch nativo <input
  // type="color"> exige siempre un #rrggbb completo, así que recibe esta
  // versión saneada en vez de hexColorNuevo tal cual. Mismo criterio que
  // FormularioProducto.jsx/FormularioLook.jsx.
  const hexColorValido = /^#[0-9a-fA-F]{6}$/.test(hexColorNuevo) ? hexColorNuevo : '#000000';

  function anadirColor() {
    if (!nombreColorNuevo.trim()) return;
    setColores((actual) => [...actual, { id: `col${Date.now()}`, nombre: nombreColorNuevo.trim(), hex: hexColorValido }]);
    setNombreColorNuevo('');
    setHexColorNuevo('#000000');
    mostrarToast('Color añadido (demo)');
  }

  function quitarColor(id) {
    setColores((actual) => actual.filter((c) => c.id !== id));
  }

  return (
    <div>
      <PageHeader titulo="Colores" subtitulo="Colores reutilizables al crear o editar un producto" />

      <div className={styles.coloresGrid}>
        {colores.map((color) => (
          <div key={color.id} className={styles.colorChip}>
            <span className={styles.colorPunto} style={{ background: color.hex }} />
            <span className={styles.colorNombre}>{color.nombre}</span>
            <button type="button" className={styles.chipQuitar} aria-label={`Quitar ${color.nombre}`} onClick={() => quitarColor(color.id)}>
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.anadirFila}>
        <label className={styles.campoColor}>
          <span className={styles.etiquetaCampo}>Selector</span>
          <input type="color" value={hexColorValido} onChange={(e) => setHexColorNuevo(e.target.value)} className={styles.inputColor} aria-label="Elegir color" />
        </label>
        {/* HEX como campo editable junto al swatch — el swatch da el atajo
            visual rápido, el texto permite pegar/escribir un código exacto;
            ambos sincronizados con el mismo estado. */}
        <Input etiqueta="HEX" valor={hexColorNuevo} onChange={(e) => setHexColorNuevo(e.target.value)} placeholder="#6E2635" />
        <Input etiqueta="Nombre" valor={nombreColorNuevo} onChange={(e) => setNombreColorNuevo(e.target.value)} placeholder="Burdeos" />
        <Boton variante="contorno" tamano="s" onClick={anadirColor}>
          <Plus size={14} />
          Añadir color
        </Boton>
      </div>
    </div>
  );
}

export default GestorColores;
