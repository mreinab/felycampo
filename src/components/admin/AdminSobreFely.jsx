'use client';

/* ============================================================
   ADMIN · SOBRE FELY (HISTORIA) — Fely Campo
   /admin/paginas/sobre-fely, sobre el editor común (EditorPagina.jsx).
   Bloques, en el orden de la web:
     · Portada: foto, título y subtítulo
     · Un bloque por capítulo: título, subtítulo, texto, fotos (con
       su pie, reordenables), pie compartido y galería
     · Cierre: título y texto
     · Documental: foto, título, texto y enlace (YouTube)
   Datos y reglas: lib/sobreFely.js. Ver docs/admin-paginas.md.
   ============================================================ */

import {
  ID_PAGINA_SOBRE_FELY, camposSobreFely, obtenerSobreFely, opcionalesSobreFely,
} from '@/lib/sobreFely';
import EditorPagina from './EditorPagina';
import styles from './EditorPagina.module.css';

// Qué hace cada foto de un capítulo según su posición (ver
// SobreFelyContenido.jsx en la web).
function papelFotoCapitulo(indice, total) {
  if (indice === 0) return 'Junto al texto';
  return total === 2 ? 'Debajo del texto' : 'En fila, debajo';
}

// Los capítulos son fijos (sus id no cambian al editar), así que los
// bloques se sacan una vez de lo publicado.
const BLOQUES = [
  {
    id: 'portada', nombre: 'Portada', resumen: 'Foto, título y subtítulo', descripcion: 'La foto a pantalla completa con la que se abre la página.', datos: (d) => d.hero,
  },
  ...obtenerSobreFely().capitulos.map((capitulo, indice) => ({
    id: capitulo.id,
    nombre: capitulo.etiqueta.es,
    resumen: `Capítulo ${indice + 1}`,
    descripcion: `Capítulo ${indice + 1} de la historia. La foto principal va ${indice % 2 === 0 ? 'a la izquierda' : 'a la derecha'} del texto.`,
    datos: (d) => d.capitulos.find((otro) => otro.id === capitulo.id),
  })),
  {
    id: 'cierre', nombre: 'Cierre', resumen: 'Título y texto', descripcion: 'El texto centrado que cierra la historia.', datos: (d) => d.cierre,
  },
  {
    id: 'documental', nombre: 'Documental', resumen: 'Tarjeta con enlace', descripcion: 'La tarjeta grande del final, que lleva al vídeo.', datos: (d) => d.documental,
  },
];

function Portada({ h }) {
  return (
    <div className={styles.medioYCampos}>
      {h.medio(['hero', 'imagen'], { etiqueta: 'Foto', detalle: 'Horizontal', proporcion: '16 / 9' })}
      <div className={styles.fichaCampos}>
        {h.texto(['hero', 'titulo'], { etiqueta: 'Título', largoRecomendado: 40 })}
        {h.texto(['hero', 'subtitulo'], { etiqueta: 'Subtítulo', largoRecomendado: 60 })}
      </div>
    </div>
  );
}

function Capitulo({ h, indice }) {
  const ruta = (...resto) => ['capitulos', indice, ...resto];
  return (
    <>
      <div className={styles.dosColumnas}>
        <div className={styles.fichaCampos}>
          {h.texto(ruta('etiqueta'), { etiqueta: 'Título', largoRecomendado: 40 })}
          {h.texto(ruta('titulo'), { etiqueta: 'Subtítulo', largoRecomendado: 70 })}
        </div>
        {h.texto(ruta('parrafos'), { etiqueta: 'Texto', parrafos: true, filas: 12 })}
      </div>

      <div className={styles.division} />

      <div className={styles.seccionBloque}>
        <p className={styles.grupoTitulo}>Fotos del capítulo</p>
        <p className={styles.ayudaBloque}>
          La 1.ª va junto al texto. Si hay una más, va debajo del texto; si hay dos o más, en fila debajo del capítulo.
        </p>
        {h.galeria(ruta('imagenes'), { conPie: true, papeles: papelFotoCapitulo })}
        <div className={styles.columnaTexto}>
          {h.texto(ruta('pie'), {
            etiqueta: 'Pie común a todas las fotos', opcional: true, ayuda: 'Un solo pie debajo de las fotos, en vez de uno en cada una.',
          })}
        </div>
      </div>

      <div className={styles.division} />

      <div className={styles.seccionBloque}>
        <p className={styles.grupoTitulo}>Galería al final del capítulo · opcional</p>
        <p className={styles.ayudaBloque}>Más fotos, en filas de dos a todo el ancho.</p>
        {h.galeria(ruta('galeria'), { conPie: true, papeles: () => 'Galería' })}
      </div>
    </>
  );
}

function Cierre({ h }) {
  return (
    <div className={styles.columnaTexto}>
      {h.texto(['cierre', 'titulo'], { etiqueta: 'Título', largoRecomendado: 70 })}
      {h.texto(['cierre', 'parrafos'], { etiqueta: 'Texto', parrafos: true, filas: 8 })}
    </div>
  );
}

function Documental({ h }) {
  return (
    <div className={styles.medioYCampos}>
      {h.medio(['documental', 'imagen'], { etiqueta: 'Foto', detalle: 'Horizontal', proporcion: '16 / 9' })}
      <div className={styles.fichaCampos}>
        {h.texto(['documental', 'titulo'], { etiqueta: 'Título', largoRecomendado: 60 })}
        {h.texto(['documental', 'texto'], { etiqueta: 'Texto', largoRecomendado: 90 })}
        {h.url(['documental', 'enlace'], { etiqueta: 'Enlace al vídeo', ayuda: 'Dirección completa, por ejemplo de YouTube. Se abre en otra pestaña.' })}
      </div>
    </div>
  );
}

function AdminSobreFely() {
  return (
    <EditorPagina
      id={ID_PAGINA_SOBRE_FELY}
      titulo="Historia de Fely"
      rutaWeb="/sobre-fely"
      bloques={BLOQUES}
      campos={camposSobreFely}
      opcionales={opcionalesSobreFely}
    >
      {(bloque, h) => {
        if (bloque.id === 'portada') return <Portada h={h} />;
        if (bloque.id === 'cierre') return <Cierre h={h} />;
        if (bloque.id === 'documental') return <Documental h={h} />;
        const indice = h.borrador.capitulos.findIndex((capitulo) => capitulo.id === bloque.id);
        return <Capitulo h={h} indice={indice} />;
      }}
    </EditorPagina>
  );
}

export default AdminSobreFely;
