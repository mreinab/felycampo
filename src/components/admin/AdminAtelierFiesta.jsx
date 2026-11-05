'use client';

/* ============================================================
   ADMIN · ATELIER FIESTA — Fely Campo
   /admin/colecciones/fiesta. Una sola página con cuatro vistas, según la
   URL (así el botón "atrás" del navegador y el menú lateral funcionan):
     (sin parámetros)              listado de colecciones, reordenable
     ?categoria=<id>               looks de una colección
     ?categoria=<id>&look=<id>     editar un look  (look=nuevo: crear)
     ?categoria=<id>&editar=1      editar la colección
     ?nueva=1                      crear una colección
   "categoria" es el mismo parámetro que usa el submenú "Fiesta" del menú
   lateral (AdminSidebar.jsx), así que sus enlaces llevan aquí.
   Los datos y los cambios: AtelierFiesta.jsx (estado) y
   lib/catalogoFiesta.js (las mismas funciones que usa la web).
   ============================================================ */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink, Pencil, Plus } from 'lucide-react';
import { Boton } from '@/components/ui';
import { nombreInternoColeccion, slugLook } from '@/lib/catalogoFiesta';
import { sinNumeroColeccion } from '@/lib/nombreColeccion';
import PageHeader from './PageHeader';
import BotonVolver from './BotonVolver';
import DragList from './DragList';
import ConfirmarBorrado from './ConfirmarBorrado';
import { useToast } from './Toast';
import { useAtelierFiesta } from './AtelierFiesta';
import FormularioLookFiesta from './FormularioLookFiesta';
import FormularioColeccionFiesta from './FormularioColeccionFiesta';
import styles from './AdminAtelierFiesta.module.css';

const BASE = '/admin/colecciones/fiesta';
// Aviso común: sin base de datos, nada se guarda de verdad todavía.
const DEMO = ' (demo: se guardará de verdad al conectar la base de datos)';

const nombreVisible = (coleccion) => sinNumeroColeccion(nombreInternoColeccion(coleccion));

function Estado({ activo, si, no }) {
  return <span className={`${styles.estado} ${activo ? styles.estadoSi : styles.estadoNo}`}>{activo ? si : no}</span>;
}

function ListadoColecciones({ colecciones, onReordenar }) {
  return (
    <>
      <PageHeader
        titulo="Fiesta"
        subtitulo={`${colecciones.length} colecciones · arrastra para cambiar el orden en que salen en la web`}
      >
        <Boton variante="solido" href={`${BASE}?nueva=1`}>
          <Plus size={14} aria-hidden="true" /> Nueva colección
        </Boton>
      </PageHeader>

      <DragList
        items={colecciones}
        claveItem={(c) => c.id}
        onReorder={onReordenar}
        renderItem={(coleccion) => {
          const total = coleccion.looks.length;
          const borradores = coleccion.looks.filter((l) => !l.publicado).length;
          return (
            <div className={styles.filaColeccion}>
              {coleccion.portada
                ? <img src={coleccion.portada} alt="" className={styles.portada} draggable={false} />
                : <div className={styles.portadaVacia} />}
              <div className={styles.filaTexto}>
                <p className={styles.filaNombre}>
                  {nombreVisible(coleccion)}
                  {coleccion.temporada && <span className={styles.temporada}>{coleccion.temporada}</span>}
                </p>
                <p className={styles.filaDetalle}>
                  {total} looks{borradores > 0 ? ` · ${borradores} en borrador` : ''}
                </p>
              </div>
              <Estado activo={coleccion.visible} si="Visible" no="Oculta" />
              <div className={styles.filaAcciones}>
                <Link href={`${BASE}?categoria=${coleccion.id}`} className={styles.enlace}>Ver looks</Link>
                <Link href={`${BASE}?categoria=${coleccion.id}&editar=1`} className={styles.enlaceIcono} aria-label={`Editar ${nombreVisible(coleccion)}`}>
                  <Pencil size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        }}
      />
    </>
  );
}

function LooksColeccion({ coleccion }) {
  const interno = nombreInternoColeccion(coleccion);
  return (
    <>
      <BotonVolver href={BASE}>Colecciones</BotonVolver>
      <PageHeader
        titulo={nombreVisible(coleccion)}
        subtitulo={`${coleccion.temporada ? `Temporada ${coleccion.temporada} · ` : ''}${coleccion.looks.length} looks · ${coleccion.visible ? 'visible en la web' : 'oculta en la web'}`}
      >
        {coleccion.visible && (
          <Boton variante="contorno" href={`/es/atelier/fiesta?coleccion=${encodeURIComponent(interno)}`}>
            <ExternalLink size={14} aria-hidden="true" /> Ver en la web
          </Boton>
        )}
        <Boton variante="contorno" href={`${BASE}?categoria=${coleccion.id}&editar=1`}>
          <Pencil size={14} aria-hidden="true" /> Editar colección
        </Boton>
        <Boton variante="solido" href={`${BASE}?categoria=${coleccion.id}&look=nuevo`}>
          <Plus size={14} aria-hidden="true" /> Nuevo look
        </Boton>
      </PageHeader>

      {coleccion.looks.length === 0 ? (
        <p className={styles.vacio}>Esta colección todavía no tiene looks.</p>
      ) : (
        <ul className={styles.rejilla}>
          {coleccion.looks.map((look) => (
            <li key={look.id}>
              <Link href={`${BASE}?categoria=${coleccion.id}&look=${look.id}`} className={styles.tarjetaLook}>
                {look.imagenes[0]
                  ? <img src={look.imagenes[0]} alt="" className={styles.tarjetaImagen} loading="lazy" />
                  : <div className={styles.tarjetaVacia}>Sin foto</div>}
                <span className={styles.tarjetaNombre}>{sinNumeroColeccion(look.nombre)}</span>
                <span className={styles.tarjetaDetalle}>
                  {look.sku ? `Ref. ${look.sku}` : 'Sin referencia'} · {look.imagenes.length} {look.imagenes.length === 1 ? 'foto' : 'fotos'}
                </span>
                {!look.publicado && <span className={styles.borrador}>Borrador</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function AdminAtelierFiesta() {
  const router = useRouter();
  const params = useSearchParams();
  const { mostrarToast } = useToast();
  const {
    colecciones, guardarColeccion, reordenarColecciones, guardarLook, eliminarLook,
  } = useAtelierFiesta();
  const [lookABorrar, setLookABorrar] = useState(null);

  const coleccion = colecciones.find((c) => c.id === params.get('categoria'));
  const lookParam = params.get('look');
  const look = coleccion?.looks.find((l) => l.id === lookParam);

  // Crear colección
  if (params.get('nueva')) {
    return (
      <FormularioColeccionFiesta
        colecciones={colecciones}
        onCancelar={() => router.push(BASE)}
        onGuardar={(datos) => {
          const id = guardarColeccion(datos);
          mostrarToast(`Colección creada${DEMO}`);
          router.push(`${BASE}?categoria=${id}`);
        }}
      />
    );
  }

  if (!coleccion) {
    return (
      <ListadoColecciones
        colecciones={colecciones}
        onReordenar={(lista) => { reordenarColecciones(lista); mostrarToast(`Orden de colecciones guardado${DEMO}`); }}
      />
    );
  }

  // Editar colección
  if (params.get('editar')) {
    return (
      <FormularioColeccionFiesta
        coleccion={coleccion}
        colecciones={colecciones}
        onCancelar={() => router.push(`${BASE}?categoria=${coleccion.id}`)}
        onGuardar={(datos) => {
          guardarColeccion(datos);
          mostrarToast(`Colección guardada${DEMO}`);
          router.push(`${BASE}?categoria=${coleccion.id}`);
        }}
      />
    );
  }

  // Crear / editar look
  if (lookParam === 'nuevo' || look) {
    return (
      <>
        <BotonVolver href={`${BASE}?categoria=${coleccion.id}`}>{nombreVisible(coleccion)}</BotonVolver>
        <FormularioLookFiesta
          key={lookParam}
          look={look}
          coleccionIdInicial={coleccion.id}
          colecciones={colecciones}
          onCancelar={() => router.push(`${BASE}?categoria=${coleccion.id}`)}
          onGuardar={(datos, coleccionId) => {
            guardarLook(datos, coleccionId);
            mostrarToast(`${look ? 'Look guardado' : 'Look creado'}${DEMO}`);
            router.push(`${BASE}?categoria=${coleccionId}`);
          }}
          onEliminar={() => setLookABorrar(look)}
        />
        <ConfirmarBorrado
          abierto={Boolean(lookABorrar)}
          titulo={`¿Eliminar ${lookABorrar ? sinNumeroColeccion(lookABorrar.nombre) : 'el look'}?`}
          mensaje={lookABorrar?.publicado
            ? `Desaparecerá de la web y su página (${slugLook(lookABorrar.nombre)}) llevará al listado de Fiesta. Si solo quieres quitarlo temporalmente, ponlo en borrador.`
            : 'Esta acción no se puede deshacer.'}
          textoConfirmar="Eliminar look"
          onCancelar={() => setLookABorrar(null)}
          onConfirmar={() => {
            eliminarLook(lookABorrar.id);
            setLookABorrar(null);
            mostrarToast(`Look eliminado${DEMO}`);
            router.push(`${BASE}?categoria=${coleccion.id}`);
          }}
        />
      </>
    );
  }

  return <LooksColeccion coleccion={coleccion} />;
}

export default AdminAtelierFiesta;
