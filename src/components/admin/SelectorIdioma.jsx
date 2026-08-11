'use client';

/* ============================================================
   SELECTOR IDIOMA — Fely Campo (admin)
   Alterna qué idioma se edita en un grupo de campos de texto
   bilingües (nombre, descripción, contenido...). No duplica la
   pantalla entera — solo cambia qué valor del objeto {es, en} se ve.
   Uso:
     const [idioma, setIdioma] = useState('es');
     <SelectorIdioma idioma={idioma} onChange={setIdioma} />
     <Input etiqueta="Nombre" valor={form.nombre[idioma]}
       onChange={(e) => actualizarCampo('nombre', idioma, e.target.value)} />
   ============================================================ */

import styles from './SelectorIdioma.module.css';

const IDIOMAS = [
  { valor: 'es', etiqueta: 'ES' },
  { valor: 'en', etiqueta: 'EN' },
];

function SelectorIdioma({ idioma, onChange }) {
  return (
    <div className={styles.grupo} role="tablist" aria-label="Idioma del contenido">
      {IDIOMAS.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          role="tab"
          aria-selected={idioma === opcion.valor}
          className={`${styles.opcion} ${idioma === opcion.valor ? styles.opcionActiva : ''}`}
          onClick={() => onChange(opcion.valor)}
        >
          {opcion.etiqueta}
        </button>
      ))}
    </div>
  );
}

export default SelectorIdioma;
