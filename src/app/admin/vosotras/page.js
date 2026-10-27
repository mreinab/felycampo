'use client';

/* ============================================================
   VOSOTRAS — fotos y reseñas de clientas (admin)
   Lo que se ve en /atelier/vosotras, en el mismo orden que la
   cuadrícula del front: pestañas Invitadas/Novias y, en cada una, los
   grupos de fotos (una casilla = un grupo, la primera foto es la
   portada) y las reseñas intercaladas. Lee los datos REALES del front
   (FOTOS_INVITADAS, FOTOS_NOVIAS, RESENAS_INTERCALADAS en
   components/layout/vosotrasFotos.js), así lo que se ve aquí es lo que
   hay publicado.
   "Añadir" abre un formulario para subir fotos o escribir una reseña,
   eligiendo Invitadas/Novias y si es foto o texto. Sin base de datos
   todavía: lo añadido se queda solo en esta pantalla (aviso "(demo)")
   y hoy se publica pasándolo al archivo vosotrasFotos.js.
   ============================================================ */

import { useMemo, useState } from 'react';
import { ImagePlus, MessageSquareQuote } from 'lucide-react';
import { PageHeader, TabsFiltro, ModalOverlay, useToast } from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import { FOTOS_INVITADAS, FOTOS_NOVIAS, RESENAS_INTERCALADAS } from '@/components/layout/vosotrasFotos';
import styles from './page.module.css';

const CATEGORIAS = [
  { valor: 'invitadas', etiqueta: 'Invitadas' },
  { valor: 'novias', etiqueta: 'Novias' },
];

const TIPOS = [
  { valor: 'foto', etiqueta: 'Fotos', icono: ImagePlus },
  { valor: 'resena', etiqueta: 'Reseña', icono: MessageSquareQuote },
];

function nombreArchivo(ruta) {
  return ruta.split('/').pop();
}

// Grupos de fotos y reseñas del front, por pestaña. Las reseñas
// intercaladas son todas de Invitadas (ver GaleriaVosotras.jsx).
function elementosIniciales() {
  return {
    invitadas: {
      grupos: FOTOS_INVITADAS.map((fotos, i) => ({ id: `inv-${i}`, fotos })),
      resenas: RESENAS_INTERCALADAS.map((r, i) => ({ id: `res-${i}`, ...r, firma: r.firma?.es })),
    },
    novias: {
      grupos: FOTOS_NOVIAS.map((fotos, i) => ({ id: `nov-${i}`, fotos })),
      resenas: [],
    },
  };
}

const FORMULARIO_VACIO = {
  categoria: 'invitadas', tipo: 'foto', archivos: [], grupoDestino: 'nuevo', texto: '', firma: '', grupoEnlazado: '',
};

function FormularioVosotras({ valores, setValores, grupos, onGuardar, onCancelar }) {
  const cambiar = (campo, valor) => setValores((actual) => ({ ...actual, [campo]: valor }));

  const alElegirArchivos = (evento) => {
    const archivos = [...evento.target.files].map((archivo) => ({ nombre: archivo.name, url: URL.createObjectURL(archivo) }));
    cambiar('archivos', archivos);
  };

  const listo = valores.tipo === 'foto' ? valores.archivos.length > 0 : valores.texto.trim().length > 0;

  return (
    <form className={styles.formulario} onSubmit={(e) => { e.preventDefault(); if (listo) onGuardar(); }}>
      <h2 className={styles.formularioTitulo}>Añadir a Vosotras</h2>

      <fieldset className={styles.campo}>
        <legend className={styles.etiqueta}>Pestaña</legend>
        <div className={styles.opciones}>
          {CATEGORIAS.map((c) => (
            <button
              key={c.valor}
              type="button"
              className={`${styles.opcion} ${valores.categoria === c.valor ? styles.opcionActiva : ''}`}
              aria-pressed={valores.categoria === c.valor}
              onClick={() => setValores({ ...valores, categoria: c.valor, grupoDestino: 'nuevo', grupoEnlazado: '' })}
            >
              {c.etiqueta}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.campo}>
        <legend className={styles.etiqueta}>Tipo</legend>
        <div className={styles.opciones}>
          {TIPOS.map(({ valor, etiqueta, icono: Icono }) => (
            <button
              key={valor}
              type="button"
              className={`${styles.opcion} ${valores.tipo === valor ? styles.opcionActiva : ''}`}
              aria-pressed={valores.tipo === valor}
              onClick={() => cambiar('tipo', valor)}
            >
              <Icono size={16} strokeWidth={1.5} aria-hidden="true" />
              {etiqueta}
            </button>
          ))}
        </div>
      </fieldset>

      {valores.tipo === 'foto' ? (
        <>
          <label className={styles.campo}>
            <span className={styles.etiqueta}>Fotos (la primera será la portada)</span>
            <input type="file" accept="image/*" multiple onChange={alElegirArchivos} className={styles.archivo} />
          </label>
          {valores.archivos.length > 0 && (
            <div className={styles.previas}>
              {valores.archivos.map((a) => <img key={a.url} src={a.url} alt={a.nombre} className={styles.previa} />)}
            </div>
          )}
          <label className={styles.campo}>
            <span className={styles.etiqueta}>Dónde van</span>
            <select className={styles.select} value={valores.grupoDestino} onChange={(e) => cambiar('grupoDestino', e.target.value)}>
              <option value="nuevo">Grupo nuevo (casilla nueva, al principio)</option>
              {grupos.map((g, i) => (
                <option key={g.id} value={g.id}>Añadir al grupo {i + 1}: {nombreArchivo(g.fotos[0])}</option>
              ))}
            </select>
          </label>
        </>
      ) : (
        <>
          <label className={styles.campo}>
            <span className={styles.etiqueta}>Texto de la reseña (en la cuadrícula se ve el principio, con «(...)»)</span>
            <textarea className={styles.textarea} value={valores.texto} onChange={(e) => cambiar('texto', e.target.value)} rows={6} />
          </label>
          <Input etiqueta="Firma (ej. Mari Carmen, Gijón)" valor={valores.firma} onChange={(e) => cambiar('firma', e.target.value)} />
          <label className={styles.campo}>
            <span className={styles.etiqueta}>Enlazar con sus fotos (opcional: al pulsar la reseña se abre su galería)</span>
            <select className={styles.select} value={valores.grupoEnlazado} onChange={(e) => cambiar('grupoEnlazado', e.target.value)}>
              <option value="">Sin fotos</option>
              {grupos.map((g, i) => (
                <option key={g.id} value={g.fotos[0]}>Grupo {i + 1}: {nombreArchivo(g.fotos[0])}</option>
              ))}
            </select>
          </label>
        </>
      )}

      <div className={styles.accionesFormulario}>
        <Boton variante="contorno" onClick={onCancelar}>Cancelar</Boton>
        <Boton type="submit" desactivado={!listo}>Guardar</Boton>
      </div>
    </form>
  );
}

export default function VosotrasAdminPage() {
  const { mostrarToast } = useToast();
  const [categoria, setCategoria] = useState('invitadas');
  const [elementos, setElementos] = useState(elementosIniciales);
  const [formAbierto, setFormAbierto] = useState(false);
  const [valores, setValores] = useState(FORMULARIO_VACIO);

  const { grupos, resenas } = elementos[categoria];
  const grupoEnlazado = useMemo(
    () => Object.fromEntries(grupos.map((g, i) => [g.fotos[0], i + 1])),
    [grupos]
  );

  function abrirFormulario() {
    setValores({ ...FORMULARIO_VACIO, categoria });
    setFormAbierto(true);
  }

  function guardar() {
    const { categoria: destino } = valores;
    setElementos((actual) => {
      const seccion = actual[destino];
      if (valores.tipo === 'foto') {
        const urls = valores.archivos.map((a) => a.url);
        const gruposNuevos = valores.grupoDestino === 'nuevo'
          ? [{ id: `nuevo-${Date.now()}`, fotos: urls, nuevo: true }, ...seccion.grupos]
          : seccion.grupos.map((g) => (g.id === valores.grupoDestino ? { ...g, fotos: [...g.fotos, ...urls], nuevo: true } : g));
        return { ...actual, [destino]: { ...seccion, grupos: gruposNuevos } };
      }
      const resena = {
        id: `res-nueva-${Date.now()}`, extracto: valores.texto.trim(), firma: valores.firma.trim(), portada: valores.grupoEnlazado || undefined, nueva: true,
      };
      return { ...actual, [destino]: { ...seccion, resenas: [...seccion.resenas, resena] } };
    });
    setCategoria(destino);
    setFormAbierto(false);
    mostrarToast(valores.tipo === 'foto' ? 'Fotos añadidas (demo)' : 'Reseña añadida (demo)');
  }

  const totalFotos = grupos.reduce((suma, g) => suma + g.fotos.length, 0);

  return (
    <div>
      <PageHeader
        titulo="Fotos y reseñas de Vosotras"
        subtitulo={`${grupos.length} grupos · ${totalFotos} fotos · ${resenas.length} reseñas — tal y como salen en /atelier/vosotras`}
      >
        <Boton variante="contorno" href="/es/atelier/vosotras">Ver en la web</Boton>
        <Boton onClick={abrirFormulario}>Añadir</Boton>
      </PageHeader>

      <TabsFiltro opciones={CATEGORIAS} valor={categoria} onChange={setCategoria} />

      <section className={styles.seccion}>
        <p className={styles.seccionTitulo}>Reseñas</p>
        {resenas.length === 0 ? (
          <p className={styles.vacio}>Todavía no hay reseñas en esta pestaña.</p>
        ) : (
          <div className={styles.resenas}>
            {resenas.map((r) => (
              <blockquote key={r.id} className={styles.resena}>
                <p className={styles.resenaTexto}>&ldquo;{r.extracto} (...)&rdquo;</p>
                <footer className={styles.resenaPie}>
                  <span>{r.firma || 'Sin firma'}</span>
                  <span className={styles.resenaEnlace}>
                    {r.portada && grupoEnlazado[r.portada] ? `Abre el grupo ${grupoEnlazado[r.portada]}` : 'Sin fotos enlazadas'}
                  </span>
                  {r.nueva && <span className={styles.nuevo}>Nueva</span>}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </section>

      <section className={styles.seccion}>
        <p className={styles.seccionTitulo}>Grupos de fotos</p>
        <div className={styles.grid}>
          {grupos.map((g, i) => (
            <figure key={g.id} className={styles.tarjeta}>
              <div className={styles.portada}>
                <img src={g.fotos[0]} alt="" loading="lazy" />
                <span className={styles.numero}>{i + 1}</span>
                {g.nuevo && <span className={`${styles.nuevo} ${styles.nuevoSobreFoto}`}>Nuevo</span>}
              </div>
              <figcaption className={styles.pie}>
                <span>{g.fotos.length} {g.fotos.length === 1 ? 'foto' : 'fotos'}</span>
                {resenas.some((r) => r.portada === g.fotos[0]) && <span>Con reseña</span>}
              </figcaption>
              {g.fotos.length > 1 && (
                <div className={styles.miniaturas}>
                  {g.fotos.slice(1).map((foto) => <img key={foto} src={foto} alt="" loading="lazy" />)}
                </div>
              )}
            </figure>
          ))}
        </div>
      </section>

      <ModalOverlay abierto={formAbierto} onCerrar={() => setFormAbierto(false)}>
        <FormularioVosotras
          valores={valores}
          setValores={setValores}
          grupos={elementos[valores.categoria].grupos}
          onGuardar={guardar}
          onCancelar={() => setFormAbierto(false)}
        />
      </ModalOverlay>
    </div>
  );
}
