'use client';

/* ============================================================
   ADMIN · RUNWAY — Fely Campo
   /admin/colecciones/runway: las colecciones de pasarela. Igual que el
   resto del panel: un listado con las piezas comunes (ListadoAdmin.jsx)
   y una ficha por colección con el editor común (EditorPagina.jsx:
   Español | English, Vista previa y «Guardar y publicar»), con un bloque
   por cada parte de su página en la web (/runways-<slug>). Vistas:
     (sin parámetros)         listado (reordenable)
     ?categoria=<id>          editar una colección (categoria=nueva: crear)
   "categoria" es el mismo parámetro que usa el submenú "Runway" del menú
   lateral. Datos y reglas: Runway.jsx (estado) y lib/runway.js (lo
   mismo que lee la web). Ver docs/admin-runway.md.
   ============================================================ */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink, Plus } from 'lucide-react';
import { Boton } from '@/components/ui';
import {
  EDITOR_RUNWAY, SLUG_NUEVA_RUNWAY, camposColeccionRunway, idPreviaRunway, nuevaColeccionRunway, slugRunway, validarExtraRunway,
} from '@/lib/runway';
import CampoLinea from './CampoLinea';
import ConfirmarBorrado from './ConfirmarBorrado';
import DragList from './DragList';
import EditorPagina from './EditorPagina';
import { FilaListado } from './ListadoAdmin';
import PageHeader from './PageHeader';
import { useRunway } from './Runway';
import { useToast } from './Toast';
import editorStyles from './EditorPagina.module.css';
import listado from './ListadoAdmin.module.css';
import styles from './AdminColeccionesAtelier.module.css';

const BASE = EDITOR_RUNWAY;
const DEMO = ' (demo: se guardará de verdad al conectar la base de datos)';
const urlWeb = (coleccion) => `/es/runways-${coleccion.slug}`;

// Campos que pueden quedar vacíos a propósito (ver RunwayContenido.jsx).
const OPCIONALES = ['video', 'descripcion.en', 'videoEnlace.href', 'videoEnlace.imagen', 'videoEnlace.titulo', 'videoEnlace.meta.es', 'videoEnlace.meta.en'];

// ---------- Listado ----------

function Listado() {
  const { mostrarToast } = useToast();
  const {
    colecciones, alternar, borrar, reordenar,
  } = useRunway();
  const [porBorrar, setPorBorrar] = useState(null);
  const publicadas = colecciones.filter((c) => c.publicado).length;

  return (
    <>
      <PageHeader
        titulo="Runway"
        subtitulo={`${colecciones.length} colecciones de pasarela · ${publicadas} en la web · arrastra para cambiar el orden en que salen`}
      >
        <Boton variante="contorno" href="/es/colecciones-fely-campo">
          <ExternalLink size={14} aria-hidden="true" /> Ver en la web
        </Boton>
        <Boton variante="solido" href={`${BASE}?categoria=${SLUG_NUEVA_RUNWAY}`}>
          <Plus size={14} aria-hidden="true" /> Nueva colección
        </Boton>
      </PageHeader>

      <DragList
        items={colecciones}
        claveItem={(c) => c.id}
        onReorder={(lista) => { reordenar(lista); mostrarToast(`Orden guardado${DEMO}`); }}
        renderItem={(coleccion, indice) => (
          <FilaListado
            numero={indice + 1}
            vertical
            imagen={coleccion.portada}
            titulo={`${coleccion.nombre} · ${coleccion.temporada}`}
            detalle={[
              `${coleccion.looks.length} looks`,
              coleccion.backstage.length > 0 && `${coleccion.backstage.length} fotos de backstage`,
              coleccion.video ? 'con vídeo' : (coleccion.videoEnlace?.href && 'con enlace al desfile'),
            ].filter(Boolean).join(' · ')}
            publicado={coleccion.publicado}
            editar={`${BASE}?categoria=${coleccion.id}`}
            verEnWeb={urlWeb(coleccion)}
            onAlternar={() => {
              alternar(coleccion.id);
              mostrarToast(`${coleccion.publicado ? 'Colección oculta en la web' : 'Colección publicada en la web'}${DEMO}`);
            }}
            onBorrar={() => setPorBorrar(coleccion)}
          />
        )}
      />

      <ConfirmarBorrado
        abierto={Boolean(porBorrar)}
        titulo={`¿Borrar ${porBorrar?.nombre} ${porBorrar?.temporada}?`}
        mensaje="Su página deja de existir (quien entre en su dirección irá al listado de colecciones). No se puede deshacer; si solo quieres quitarla un tiempo, ocúltala."
        onConfirmar={() => {
          borrar(porBorrar.id);
          mostrarToast(`Colección borrada${DEMO}`);
          setPorBorrar(null);
        }}
        onCancelar={() => setPorBorrar(null)}
      />
    </>
  );
}

// ---------- Editar una colección ----------

const BLOQUES = [
  {
    id: 'datos', nombre: 'Nombre y temporada', resumen: 'Y su dirección', descripcion: 'Salen en la cabecera de su página y en su tarjeta del listado.', datos: (d) => [d.nombre, d.temporada],
  },
  {
    id: 'portada', nombre: 'Portada', resumen: 'Cabecera y tarjeta', descripcion: 'La foto de la cabecera de su página y de su tarjeta en el listado de colecciones.', datos: (d) => d.portada,
  },
  {
    id: 'descripcion', nombre: 'Texto', resumen: 'Bajo la cabecera', descripcion: 'El texto de la colección, debajo de la cabecera.', datos: (d) => d.descripcion,
  },
  {
    id: 'backstage', nombre: 'Backstage', resumen: 'Opcional', descripcion: 'Fotos del backstage, entre el texto y los looks. Si no hay, esa parte no sale.', datos: (d) => d.backstage,
  },
  {
    id: 'looks', nombre: 'Looks', resumen: 'Una foto por look', descripcion: 'Una foto por look, en el orden del desfile («Look 1, 2…»). Al pulsar una, se abre en grande con su texto, si lo tiene.', datos: (d) => d.looks,
  },
  {
    id: 'video', nombre: 'Vídeo del desfile', resumen: 'Al final', descripcion: 'Al final de la página: un vídeo propio o, si no hay, una foto que lleva al desfile en YouTube.', datos: (d) => [d.video, d.videoEnlace],
  },
];

function EditarColeccion({ id }) {
  const router = useRouter();
  const { colecciones, guardar } = useRunway();
  const esNueva = id === SLUG_NUEVA_RUNWAY;
  const [vacia] = useState(nuevaColeccionRunway);
  const coleccion = esNueva ? vacia : colecciones.find((c) => c.id === id);

  if (!coleccion) {
    return <p className={listado.vacio}>Esta colección no existe. <Link href={BASE}>Volver a Runway</Link></p>;
  }
  const slug = esNueva ? SLUG_NUEVA_RUNWAY : coleccion.slug;

  return (
    <EditorPagina
      key={id}
      id={idPreviaRunway(slug)}
      titulo={esNueva ? 'Nueva colección' : `${coleccion.nombre} · ${coleccion.temporada}`}
      rutaWeb={`/runways-${slug}`}
      bloques={BLOQUES}
      campos={camposColeccionRunway}
      opcionales={OPCIONALES}
      validarExtra={validarExtraRunway}
      publicado={coleccion}
      guardar={(datos) => {
        const nuevoId = guardar(datos, id);
        if (esNueva) router.replace(`${BASE}?categoria=${nuevoId}`);
      }}
      migas="Runway"
      volver={BASE}
      estadoPublicado={esNueva ? 'Sin publicar' : (coleccion.publicado ? 'Publicada' : 'Oculta en la web')}
      textoPublicado={esNueva ? 'Colección publicada' : 'Cambios publicados'}
      enLaWeb={!esNueva && coleccion.publicado}
    >
      {(bloque, h) => {
        if (bloque.id === 'datos') {
          return (
            <div className={editorStyles.columnaTexto}>
              <div className={editorStyles.dosColumnas}>
                <CampoLinea etiqueta="Nombre" valor={h.borrador.nombre} placeholder="La Colección" onChange={(nombre) => h.cambiar(['nombre'], nombre)} />
                <CampoLinea
                  etiqueta="Temporada"
                  valor={h.borrador.temporada}
                  placeholder="AW27"
                  ayuda="AW (otoño-invierno) o SS (primavera-verano) y el año."
                  onChange={(temporada) => h.cambiar(['temporada'], temporada.toUpperCase())}
                />
              </div>
              <p className={styles.ayuda}>
                Dirección: <strong>/runways-{esNueva ? (slugRunway(h.borrador.nombre, colecciones.map((c) => c.slug))) : coleccion.slug}</strong>
                {' · '}
                {esNueva
                  ? 'se crea con el nombre al publicar y ya no cambia, para no romper enlaces ni perder posiciones en Google.'
                  : 'fija: no cambia aunque cambie el nombre.'}
              </p>
            </div>
          );
        }
        if (bloque.id === 'portada') {
          return <div className={styles.portadaColeccion}>{h.medio(['portada'], { etiqueta: 'Portada', detalle: 'Vertical', proporcion: '3 / 4' })}</div>;
        }
        if (bloque.id === 'descripcion') {
          return (
            <div className={editorStyles.columnaTexto}>
              {h.texto(['descripcion'], {
                etiqueta: 'Texto',
                multilinea: true,
                filas: 12,
                opcional: h.idioma === 'en',
                ayuda: h.idioma === 'en' ? 'Si se deja vacío, en inglés se enseña el texto en español.' : 'Un solo párrafo.',
              })}
            </div>
          );
        }
        if (bloque.id === 'backstage') return h.galeria(['backstage'], { textoAnadir: 'Añadir fotos' });
        if (bloque.id === 'looks') {
          return h.galeria(['looks'], {
            conPie: true, papeles: (indice) => `Look ${indice + 1}`, textoPie: 'Texto del look', textoAnadir: 'Añadir looks',
          });
        }
        // Vídeo del desfile
        return (
          <div className={editorStyles.columnaTexto}>
            <div className={styles.portadaColeccion}>
              {h.medio(['video'], {
                etiqueta: 'Vídeo propio', tipo: 'video', proporcion: '16 / 9', opcional: true,
              })}
            </div>
            {h.borrador.video ? (
              <p className={styles.ayuda}>Con vídeo propio, el enlace a YouTube no se usa. Para usar el enlace, quita el vídeo.</p>
            ) : (
              <>
                {h.url(['videoEnlace', 'href'], { etiqueta: 'Enlace al desfile', ayuda: 'La dirección del vídeo en YouTube, empezando por https://' })}
                <div className={editorStyles.medioYCampos}>
                  {h.medio(['videoEnlace', 'imagen'], {
                    etiqueta: 'Foto del enlace', detalle: 'Horizontal', proporcion: '16 / 9', opcional: true,
                  })}
                  <div className={editorStyles.fichaCampos}>
                    <CampoLinea
                      etiqueta="Título"
                      opcional
                      valor={h.borrador.videoEnlace.titulo}
                      placeholder="Dreaming SS26 - Desfile"
                      onChange={(titulo) => h.cambiar(['videoEnlace', 'titulo'], titulo)}
                    />
                    {h.texto(['videoEnlace', 'meta'], { etiqueta: 'Texto bajo el título', opcional: true, largoRecomendado: 50 })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      }}
    </EditorPagina>
  );
}

function AdminRunway() {
  const params = useSearchParams();
  const id = params.get('categoria');
  return id ? <EditarColeccion id={id} /> : <Listado />;
}

export default AdminRunway;
