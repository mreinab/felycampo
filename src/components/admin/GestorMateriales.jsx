'use client';

/* ============================================================
   MATERIALES — Fely Campo (admin)
   Biblioteca de colores y telas reutilizable desde el formulario de
   producto (picker en vez de escribir hex/nombre a mano cada vez).
   Mismo patrón de tabs que Categorías, pero sin orden/arrastre — el
   orden de colores/telas no tiene efecto en la web pública.
   ============================================================ */

import { useState } from 'react';
import { X } from 'lucide-react';
import { PageHeader, useToast } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { coloresMock, telasMock, coleccionesMock } from '@/components/admin/mockData';
import styles from './GestorMateriales.module.css';

const TEMPORADAS = [
  { valor: 'ss', etiqueta: 'Primavera-Verano' },
  { valor: 'fw', etiqueta: 'Otoño-Invierno' },
];

function GestorMateriales() {
  const { mostrarToast } = useToast();
  const [colores, setColores] = useState(coloresMock);
  const [telas, setTelas] = useState(telasMock);
  const [colecciones, setColecciones] = useState(coleccionesMock);
  const [tab, setTab] = useState('colores');

  const [nombreColor, setNombreColor] = useState('');
  const [hexColor, setHexColor] = useState('#000000');
  const [nombreTela, setNombreTela] = useState('');
  const [composicionTela, setComposicionTela] = useState('');
  const [temporadaNueva, setTemporadaNueva] = useState('ss');
  const [anioNuevo, setAnioNuevo] = useState('');

  function anadirColor() {
    if (!nombreColor.trim()) return;
    setColores((actual) => [...actual, { id: `col${Date.now()}`, nombre: nombreColor, hex: hexColor }]);
    setNombreColor('');
    setHexColor('#000000');
    mostrarToast('Color añadido (demo)');
  }

  function quitarColor(id) {
    setColores((actual) => actual.filter((c) => c.id !== id));
  }

  function anadirTela() {
    if (!nombreTela.trim()) return;
    setTelas((actual) => [...actual, { id: `tel${Date.now()}`, nombre: nombreTela, composicion: composicionTela }]);
    setNombreTela('');
    setComposicionTela('');
    mostrarToast('Tela añadida (demo)');
  }

  function quitarTela(id) {
    setTelas((actual) => actual.filter((t) => t.id !== id));
  }

  function anadirColeccion() {
    const anio = parseInt(anioNuevo, 10);
    if (!anio || anio < 2000 || anio > 2099) return;
    const valor = `${temporadaNueva}${String(anio).slice(-2)}`;
    if (colecciones.some((c) => c.valor === valor)) {
      mostrarToast('Esa colección ya existe');
      return;
    }
    const nombreTemporada = TEMPORADAS.find((t) => t.valor === temporadaNueva).etiqueta;
    setColecciones((actual) => [...actual, { valor, etiqueta: `${nombreTemporada} ${anio}` }]);
    setAnioNuevo('');
    mostrarToast('Colección añadida (demo)');
  }

  function quitarColeccion(valor) {
    setColecciones((actual) => actual.filter((c) => c.valor !== valor));
  }

  return (
    <div>
      <PageHeader titulo="Materiales" subtitulo="Colores, telas y colecciones reutilizables al crear o editar un producto" />

      <div className={styles.tabs}>
        <button type="button" className={`${styles.tab} ${tab === 'colores' ? styles.activo : ''}`} onClick={() => setTab('colores')}>Colores</button>
        <button type="button" className={`${styles.tab} ${tab === 'telas' ? styles.activo : ''}`} onClick={() => setTab('telas')}>Telas</button>
        <button type="button" className={`${styles.tab} ${tab === 'colecciones' ? styles.activo : ''}`} onClick={() => setTab('colecciones')}>Colecciones</button>
      </div>

      {tab === 'colores' ? (
        <>
          <div className={styles.lista}>
            {colores.map((color) => (
              <div key={color.id} className={styles.fila}>
                <span className={styles.swatch} style={{ background: color.hex }} />
                <span className={styles.nombre}>{color.nombre}</span>
                <span className={styles.hex}>{color.hex}</span>
                <Boton variante="texto" onClick={() => quitarColor(color.id)}><X size={14} /></Boton>
              </div>
            ))}
          </div>
          <div className={styles.anadirFila}>
            <Input etiqueta="Nombre del color" placeholder="Burdeos" valor={nombreColor} onChange={(e) => setNombreColor(e.target.value)} />
            <label className={styles.campoColor}>
              <span className={styles.etiquetaCampo}>Color</span>
              <input type="color" value={hexColor} onChange={(e) => setHexColor(e.target.value)} className={styles.inputColor} />
            </label>
            <Boton variante="contorno" onClick={anadirColor}>Añadir color</Boton>
          </div>
        </>
      ) : tab === 'telas' ? (
        <>
          <div className={styles.lista}>
            {telas.map((tela) => (
              <div key={tela.id} className={styles.fila}>
                <span className={styles.nombre}>{tela.nombre}</span>
                <span className={styles.composicion}>{tela.composicion || '—'}</span>
                <Boton variante="texto" onClick={() => quitarTela(tela.id)}><X size={14} /></Boton>
              </div>
            ))}
          </div>
          <div className={styles.anadirFila}>
            <Input etiqueta="Nombre de la tela" placeholder="Tafetán" valor={nombreTela} onChange={(e) => setNombreTela(e.target.value)} />
            <Input etiqueta="Composición" placeholder="70% algodón, 30% poliéster" valor={composicionTela} onChange={(e) => setComposicionTela(e.target.value)} />
            <Boton variante="contorno" onClick={anadirTela}>Añadir tela</Boton>
          </div>
        </>
      ) : (
        <>
          <div className={styles.lista}>
            {colecciones.map((coleccion) => (
              <div key={coleccion.valor} className={styles.fila}>
                <span className={styles.nombre}>{coleccion.etiqueta}</span>
                <span className={styles.composicion}>{coleccion.valor}</span>
                <Boton variante="texto" onClick={() => quitarColeccion(coleccion.valor)}><X size={14} /></Boton>
              </div>
            ))}
          </div>
          <div className={styles.anadirFila}>
            <label className={styles.campoTemporada}>
              <span className={styles.etiquetaCampo}>Temporada</span>
              <select className={styles.selectInput} value={temporadaNueva} onChange={(e) => setTemporadaNueva(e.target.value)}>
                {TEMPORADAS.map((t) => <option key={t.valor} value={t.valor}>{t.etiqueta}</option>)}
              </select>
            </label>
            <Input etiqueta="Año" placeholder="2027" tipo="number" valor={anioNuevo} onChange={(e) => setAnioNuevo(e.target.value)} />
            <Boton variante="contorno" onClick={anadirColeccion}>Añadir colección</Boton>
          </div>
        </>
      )}
    </div>
  );
}

export default GestorMateriales;
