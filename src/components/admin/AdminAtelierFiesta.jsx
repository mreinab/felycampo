'use client';

/* ============================================================
   ADMIN · COLECCIÓN FIESTA — Fely Campo
   /admin/colecciones/fiesta. Igual que Blog & Podcast y Vosotras: los
   listados con las piezas comunes (ListadoAdmin.jsx) y cada ficha con
   el editor común (EditorPagina.jsx: Español | English, Vista previa y
   «Guardar y publicar»). Vistas, según la URL (así el botón "atrás" del
   navegador y el menú lateral funcionan):
     (sin parámetros)              listado de colecciones (reordenable)
     ?categoria=<id>               looks de una colección
     ?categoria=<id>&look=<id>     editar un look  (look=nuevo: crear)
     ?categoria=<id>&editar=1      editar la colección
     ?nueva=1                      crear una colección
   "categoria" es el mismo parámetro que usa el submenú "Colección
   Fiesta" del menú lateral (AdminSidebar.jsx).
   Los datos y los cambios: AtelierFiesta.jsx (estado) y
   lib/catalogoFiesta.js (las mismas funciones que usa la web). Ver
   docs/admin-atelier-fiesta.md.
   ============================================================ */

import { useId, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink, Pencil, Plus } from 'lucide-react';
import { Boton } from '@/components/ui';
import {
  ID_PREVIA_LOOK_FIESTA, RUTA_FICHA_FIESTA, descripcionAutomatica, nombreInternoColeccion, nombreSugeridoLook, slugLook,
  validarColeccionFiesta, validarLookFiesta,
} from '@/lib/catalogoFiesta';
import { sinNumeroColeccion } from '@/lib/nombreColeccion';
import { useAtelierFiesta } from './AtelierFiesta';
import BotonVolver from './BotonVolver';
import CampoLinea from './CampoLinea';
import ConfirmarBorrado from './ConfirmarBorrado';
import DragList from './DragList';
import EditorPagina from './EditorPagina';
import { FilaListado } from './ListadoAdmin';
import PageHeader from './PageHeader';
import { useToast } from './Toast';
import campos from './CamposEditor.module.css';
import editorStyles from './EditorPagina.module.css';
import listado from './ListadoAdmin.module.css';
import styles from './AdminAtelierFiesta.module.css';

const BASE = '/admin/colecciones/fiesta';
const NUEVO = 'nuevo';
// Aviso común: sin base de datos, nada se guarda de verdad todavía.
const DEMO = ' (demo: se guardará de verdad al conectar la base de datos)';

const nombreVisible = (coleccion) => sinNumeroColeccion(nombreInternoColeccion(coleccion));
const urlColeccion = (coleccion) => `/es${RUTA_FICHA_FIESTA}?coleccion=${encodeURIComponent(nombreInternoColeccion(coleccion))}`;
const urlLook = (look) => `/es${RUTA_FICHA_FIESTA}/${slugLook(look.nombre)}`;
const fotos = (n) => `${n} ${n === 1 ? 'foto' : 'fotos'}`;

// ---------- Listados ----------

function ListadoColecciones() {
  const { mostrarToast } = useToast();
  const { colecciones, reordenarColecciones, alternarColeccion } = useAtelierFiesta();
  const visibles = colecciones.filter((c) => c.visible).length;

  return (
    <>
      <PageHeader
        titulo="Colección Fiesta"
        subtitulo={`${colecciones.length} colecciones · ${visibles} en la web · arrastra para cambiar el orden en que salen`}
      >
        <Boton variante="contorno" href={`/es${RUTA_FICHA_FIESTA}`}>
          <ExternalLink size={14} aria-hidden="true" /> Ver en la web
        </Boton>
        <Boton variante="solido" href={`${BASE}?nueva=1`}>
          <Plus size={14} aria-hidden="true" /> Nueva colección
        </Boton>
      </PageHeader>

      <DragList
        items={colecciones}
        claveItem={(c) => c.id}
        onReorder={(lista) => { reordenarColecciones(lista); mostrarToast(`Orden de colecciones guardado${DEMO}`); }}
        renderItem={(coleccion, indice) => {
          const total = coleccion.looks.length;
          const ocultos = coleccion.looks.filter((l) => !l.publicado).length;
          return (
            <FilaListado
              numero={indice + 1}
              vertical
              imagen={coleccion.portada || coleccion.looks[0]?.imagenes[0]}
              titulo={nombreVisible(coleccion)}
              detalle={[
                coleccion.temporada && `Temporada ${coleccion.temporada}`,
                `${total} looks`,
                ocultos > 0 && `${ocultos} ocultos`,
              ].filter(Boolean).join(' · ')}
              publicado={coleccion.visible}
              abrir={`${BASE}?categoria=${coleccion.id}`}
              accion={{ href: `${BASE}?categoria=${coleccion.id}`, texto: 'Ver looks' }}
              editar={`${BASE}?categoria=${coleccion.id}&editar=1`}
              verEnWeb={urlColeccion(coleccion)}
              onAlternar={() => {
                alternarColeccion(coleccion.id);
                mostrarToast(`${coleccion.visible ? 'Colección oculta en la web' : 'Colección publicada en la web'}${DEMO}`);
              }}
            />
          );
        }}
      />
    </>
  );
}

function LooksColeccion({ coleccion }) {
  const { mostrarToast } = useToast();
  const { alternarLook, eliminarLook } = useAtelierFiesta();
  const [porBorrar, setPorBorrar] = useState(null);
  const publicados = coleccion.looks.filter((l) => l.publicado).length;

  return (
    <>
      <BotonVolver href={BASE}>Colección Fiesta</BotonVolver>
      <PageHeader
        titulo={nombreVisible(coleccion)}
        subtitulo={`${coleccion.temporada ? `Temporada ${coleccion.temporada} · ` : ''}${coleccion.looks.length} looks · ${publicados} en la web · ordenados por su número${coleccion.visible ? '' : ' · la colección está oculta en la web'}`}
      >
        {coleccion.visible && (
          <Boton variante="contorno" href={urlColeccion(coleccion)}>
            <ExternalLink size={14} aria-hidden="true" /> Ver en la web
          </Boton>
        )}
        <Boton variante="contorno" href={`${BASE}?categoria=${coleccion.id}&editar=1`}>
          <Pencil size={14} aria-hidden="true" /> Editar colección
        </Boton>
        <Boton variante="solido" href={`${BASE}?categoria=${coleccion.id}&look=${NUEVO}`}>
          <Plus size={14} aria-hidden="true" /> Nuevo look
        </Boton>
      </PageHeader>

      {coleccion.looks.length === 0 ? (
        <p className={listado.vacio}>Esta colección todavía no tiene looks.</p>
      ) : (
        <div className={listado.lista}>
          {coleccion.looks.map((look) => (
            <FilaListado
              key={look.id}
              vertical
              imagen={look.imagenes[0]}
              titulo={sinNumeroColeccion(look.nombre)}
              detalle={[look.sku && `Ref. ${look.sku}`, fotos(look.imagenes.length)].filter(Boolean).join(' · ')}
              publicado={look.publicado}
              editar={`${BASE}?categoria=${coleccion.id}&look=${look.id}`}
              verEnWeb={urlLook(look)}
              onAlternar={() => {
                alternarLook(look.id);
                mostrarToast(`${look.publicado ? 'Look oculto en la web' : 'Look publicado en la web'}${DEMO}`);
              }}
              onBorrar={() => setPorBorrar(look)}
            />
          ))}
        </div>
      )}

      <ConfirmarBorrado
        abierto={Boolean(porBorrar)}
        titulo={`¿Borrar ${porBorrar ? sinNumeroColeccion(porBorrar.nombre) : 'el look'}?`}
        mensaje={porBorrar?.publicado
          ? `Desaparecerá de la web y su página (${slugLook(porBorrar.nombre)}) llevará al listado de Fiesta. No se puede deshacer; si solo quieres quitarlo un tiempo, ocúltalo.`
          : 'No se puede deshacer.'}
        onCancelar={() => setPorBorrar(null)}
        onConfirmar={() => {
          eliminarLook(porBorrar.id);
          setPorBorrar(null);
          mostrarToast(`Look borrado${DEMO}`);
        }}
      />
    </>
  );
}

// ---------- Editar un look ----------

const BLOQUES_LOOK = [
  {
    id: 'nombre',
    nombre: 'Colección y nombre',
    resumen: 'Nombre, referencia y URL',
    descripcion: 'El nombre es el que se ve en la web y forma la dirección (URL) del look.',
    datos: (d) => [d.coleccionId, d.nombre, d.sku],
  },
  {
    id: 'fotos',
    nombre: 'Fotos',
    resumen: 'La primera, en la tarjeta',
    descripcion: 'La 1.ª es la de la tarjeta y la principal de la ficha; la 2.ª aparece al pasar el ratón por la tarjeta. Arrastra para cambiar el orden.',
    datos: (d) => d.imagenes,
  },
  {
    id: 'descripcion',
    nombre: 'Descripción',
    resumen: 'Opcional',
    descripcion: 'El texto de la ficha. Si se deja vacío, la ficha enseña un texto automático.',
    datos: (d) => d.descripcion,
  },
];

const PAPELES_FOTO = ['Tarjeta y ficha', 'Al pasar el ratón'];

const numeroDeNombre = (nombre) => (nombre || '').match(/^Look (\d+)/)?.[1] || '';

function CampoColeccion({ colecciones, valor, onChange }) {
  const id = useId();
  return (
    <div className={campos.campo}>
      <div className={campos.cabecera}>
        <label htmlFor={id} className={campos.etiqueta}>Colección</label>
      </div>
      <div className={campos.selectMarco}>
        <select id={id} className={campos.select} value={valor} onChange={(evento) => onChange(evento.target.value)}>
          {colecciones.map((c) => (
            <option key={c.id} value={c.id}>
              {nombreVisible(c)}{c.temporada ? ` (temporada ${c.temporada})` : ''}{c.visible ? '' : ' · oculta'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Nombre y referencia. Mientras no se toque el nombre a mano, sigue al
// número y a la colección ("Look 6 26_Opaline").
function DatosLook({ h, colecciones, original }) {
  const [nombreManual, setNombreManual] = useState(Boolean(original?.nombre));
  const { borrador } = h;
  const coleccion = colecciones.find((c) => c.id === borrador.coleccionId) || colecciones[0];
  const numero = numeroDeNombre(borrador.nombre);
  const slug = slugLook(borrador.nombre);
  const cambiaUrl = original?.publicado && slugLook(original.nombre) !== slug;

  return (
    <div className={editorStyles.columnaTexto}>
      <CampoColeccion
        colecciones={colecciones}
        valor={borrador.coleccionId}
        onChange={(id) => {
          h.cambiar(['coleccionId'], id);
          if (!nombreManual) h.cambiar(['nombre'], nombreSugeridoLook(colecciones.find((c) => c.id === id), numero));
        }}
      />
      <div className={editorStyles.dosColumnas}>
        <CampoLinea
          etiqueta="Número de look"
          valor={numero}
          placeholder="6"
          opcional
          onChange={(valor) => {
            const limpio = valor.replace(/\D/g, '');
            // Con el nombre escrito a mano, solo se cambia su número.
            const nombre = nombreManual && /^Look \d*/.test(borrador.nombre)
              ? borrador.nombre.replace(/^Look \d*/, `Look ${limpio}`)
              : nombreSugeridoLook(coleccion, limpio);
            h.cambiar(['nombre'], nombre);
          }}
        />
        <CampoLinea
          etiqueta="Nombre en la web"
          valor={borrador.nombre}
          placeholder="Look 6 26_Opaline"
          onChange={(nombre) => { setNombreManual(true); h.cambiar(['nombre'], nombre); }}
        />
      </div>
      <p className={styles.ayuda}>
        Dirección: <strong>{RUTA_FICHA_FIESTA}/{slug || '…'}</strong>
        {' · '}En la web el número de temporada no se ve: «{sinNumeroColeccion(borrador.nombre) || '…'}».
      </p>
      {cambiaUrl && (
        <p className={styles.aviso}>
          Este look ya está publicado: al cambiar el nombre cambia su dirección. La antigua
          ({slugLook(original.nombre)}) llevará a la nueva, así no se pierden visitas ni posiciones en Google.
        </p>
      )}
      <CampoLinea
        etiqueta="Referencia (SKU)"
        opcional
        valor={borrador.sku}
        placeholder="18138 T / 18139 F"
        ayuda="En la ficha sale como «Ref.». Si son varias piezas, sepáralas con «/»."
        onChange={(sku) => h.cambiar(['sku'], sku)}
      />
    </div>
  );
}

function EditarLook({ coleccion, lookId }) {
  const router = useRouter();
  const { colecciones, guardarLook } = useAtelierFiesta();
  const esNuevo = lookId === NUEVO;
  const original = esNuevo ? null : coleccion.looks.find((l) => l.id === lookId);
  const [vacio] = useState(() => ({
    id: '', nombre: '', sku: '', publicado: true, descripcion: { es: '', en: '' }, imagenes: [], slugsAnteriores: [],
  }));

  if (!esNuevo && !original) {
    return <p className={listado.vacio}>Este look no existe. <Link href={`${BASE}?categoria=${coleccion.id}`}>Volver a la colección</Link></p>;
  }

  const publicado = { ...(original || vacio), coleccionId: coleccion.id };
  const camposLook = (d) => [
    {
      bloque: 'nombre', nombre: 'el nombre del look', tipo: 'medio', valor: (d.nombre || '').trim(), requerido: true,
    },
    {
      bloque: 'fotos', nombre: 'las fotos', tipo: 'lista', valor: d.imagenes, minimo: 1,
    },
  ];
  const coleccionDe = (d) => colecciones.find((c) => c.id === d.coleccionId) || coleccion;

  return (
    <EditorPagina
      key={lookId}
      id={ID_PREVIA_LOOK_FIESTA}
      titulo={esNuevo ? 'Nuevo look' : sinNumeroColeccion(original.nombre)}
      rutaWeb={`${RUTA_FICHA_FIESTA}/${slugLook(publicado.nombre) || NUEVO}`}
      bloques={BLOQUES_LOOK}
      campos={camposLook}
      // Solo el nombre repetido: lo demás ya lo avisan los campos.
      validarExtra={(d) => validarLookFiesta(d, colecciones).filter((error) => error.startsWith('Ya hay otro look'))}
      publicado={publicado}
      datosPrevia={(d) => ({ look: d, coleccion: coleccionDe(d) })}
      guardar={(d) => {
        const id = guardarLook(d, d.coleccionId);
        router.replace(`${BASE}?categoria=${d.coleccionId}&look=${id}`);
      }}
      migas={`Colección Fiesta · ${nombreVisible(coleccion)}`}
      volver={`${BASE}?categoria=${coleccion.id}`}
      estadoPublicado={esNuevo ? 'Sin publicar' : (original.publicado ? 'Publicado' : 'Oculto en la web')}
      textoPublicado={esNuevo ? 'Look publicado' : 'Cambios publicados'}
      enLaWeb={!esNuevo && original.publicado && coleccion.visible}
    >
      {(bloque, h) => {
        if (bloque.id === 'nombre') return <DatosLook h={h} colecciones={colecciones} original={original} />;
        if (bloque.id === 'fotos') {
          return h.galeria(['imagenes'], { papeles: (indice) => PAPELES_FOTO[indice] || '', textoAnadir: 'Añadir fotos' });
        }
        return (
          <div className={editorStyles.columnaTexto}>
            {h.texto(['descripcion'], {
              etiqueta: 'Descripción',
              multilinea: true,
              filas: 5,
              opcional: true,
              ayuda: h.idioma === 'en'
                ? 'Si se deja vacía, en inglés se enseña la descripción en español.'
                : `Si se deja vacía, la ficha dice: «${descripcionAutomatica({ sku: h.borrador.sku }, coleccionDe(h.borrador))}»`,
            })}
          </div>
        );
      }}
    </EditorPagina>
  );
}

// ---------- Crear / editar una colección ----------

const BLOQUES_COLECCION = [
  {
    id: 'nombre',
    nombre: 'Nombre y temporada',
    resumen: 'Lo que se ve en la web',
    descripcion: 'En la web solo se ve el nombre. La temporada distingue colecciones con el mismo nombre.',
    datos: (d) => [d.nombre, d.temporada],
  },
  {
    id: 'portada',
    nombre: 'Portada',
    resumen: 'Opcional',
    descripcion: 'Solo se usa aquí, en el admin, para reconocer la colección en el listado.',
    datos: (d) => d.portada,
  },
];

function EditarColeccion({ coleccion }) {
  const router = useRouter();
  const { colecciones, guardarColeccion } = useAtelierFiesta();
  const esNueva = !coleccion;
  const [vacia] = useState(() => ({
    id: '', nombre: '', temporada: '', visible: true, portada: '',
  }));
  const publicado = esNueva ? vacia : {
    id: coleccion.id, nombre: coleccion.nombre, temporada: coleccion.temporada, visible: coleccion.visible, portada: coleccion.portada || '',
  };
  const camposColeccion = (d) => [
    {
      bloque: 'nombre', nombre: 'el nombre de la colección', tipo: 'medio', valor: (d.nombre || '').trim(), requerido: true,
    },
  ];

  return (
    <EditorPagina
      key={coleccion?.id || 'nueva'}
      id="fiesta-coleccion"
      titulo={esNueva ? 'Nueva colección' : nombreVisible(coleccion)}
      rutaWeb={RUTA_FICHA_FIESTA}
      bloques={BLOQUES_COLECCION}
      campos={camposColeccion}
      validarExtra={(d) => validarColeccionFiesta(d, colecciones).filter((error) => !error.startsWith('Escribe el nombre'))}
      publicado={publicado}
      conVistaPrevia={false}
      guardar={(d) => {
        const id = guardarColeccion(d);
        router.replace(`${BASE}?categoria=${id}${esNueva ? '' : '&editar=1'}`);
      }}
      migas="Colección Fiesta"
      volver={esNueva ? BASE : `${BASE}?categoria=${coleccion.id}`}
      estadoPublicado={esNueva ? 'Sin publicar' : (coleccion.visible ? 'Publicada' : 'Oculta en la web')}
      textoPublicado={esNueva ? 'Colección creada' : 'Cambios publicados'}
      enLaWeb={!esNueva && coleccion.visible}
    >
      {(bloque, h) => {
        if (bloque.id === 'portada') {
          return (
            <div className={styles.portadaColeccion}>
              {h.medio(['portada'], { etiqueta: 'Portada', detalle: 'Vertical', proporcion: '3 / 4', opcional: true })}
            </div>
          );
        }
        const interno = nombreInternoColeccion(h.borrador);
        const cambiaNombre = !esNueva && interno !== nombreInternoColeccion(coleccion);
        return (
          <div className={editorStyles.columnaTexto}>
            <div className={editorStyles.dosColumnas}>
              <CampoLinea etiqueta="Nombre" valor={h.borrador.nombre} placeholder="Opaline" onChange={(nombre) => h.cambiar(['nombre'], nombre)} />
              <CampoLinea
                etiqueta="Temporada"
                opcional
                valor={h.borrador.temporada}
                placeholder="26"
                ayuda="Dos cifras, o vacía."
                onChange={(temporada) => h.cambiar(['temporada'], temporada.replace(/\D/g, '').slice(0, 2))}
              />
            </div>
            <p className={styles.ayuda}>
              En la web: <strong>«{sinNumeroColeccion(interno) || '…'}»</strong>
            </p>
            {cambiaNombre && coleccion.looks.length > 0 && (
              <p className={styles.aviso}>
                Los {coleccion.looks.length} looks de esta colección mantienen su nombre y su dirección. Si quieres que su nombre
                cambie también, edítalos uno a uno (su dirección antigua llevará a la nueva).
              </p>
            )}
          </div>
        );
      }}
    </EditorPagina>
  );
}

// ---------- Página ----------

function AdminAtelierFiesta() {
  const params = useSearchParams();
  const { colecciones } = useAtelierFiesta();

  const coleccion = colecciones.find((c) => c.id === params.get('categoria'));
  const lookParam = params.get('look');

  if (params.get('nueva')) return <EditarColeccion />;
  if (!coleccion) return <ListadoColecciones />;
  if (params.get('editar')) return <EditarColeccion coleccion={coleccion} />;
  if (lookParam) return <EditarLook coleccion={coleccion} lookId={lookParam} />;
  return <LooksColeccion coleccion={coleccion} />;
}

export default AdminAtelierFiesta;
