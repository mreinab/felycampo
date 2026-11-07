'use client';

/* ============================================================
   ADMIN · PUNTOS DE VENTA — Fely Campo
   /admin/puntos-de-venta: los puntos del mapa de la web
   (/puntos-de-venta-fely-campo y el final de /visita-fely-campo).
   Igual que el resto del panel: un listado con pestañas (por país) y una
   ficha con el editor común (EditorPagina.jsx: vista previa del mapa y
   «Guardar y publicar»). Vistas, según la URL:
     (sin parámetros) / ?pais=<país>   listado (todos / un país)
     ?punto=<id>                       editar un punto (punto=nuevo: crear)
   Datos y reglas: PuntosVenta.jsx (estado) y lib/puntosVenta.js (lo
   mismo que lee la web). Ver docs/admin-puntos-venta.md.
   ============================================================ */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink, Plus } from 'lucide-react';
import { Boton } from '@/components/ui';
import {
  EDITOR_PUNTOS, ID_PREVIA_PUNTOS, RUTA_WEB_PUNTOS, camposPunto, esAtelierPropio, nuevoPunto, paisesDe, validarExtraPunto,
} from '@/lib/puntosVenta';
import CampoLinea from './CampoLinea';
import ConfirmarBorrado from './ConfirmarBorrado';
import EditorPagina from './EditorPagina';
import { FilaListado, PestanasListado } from './ListadoAdmin';
import PageHeader from './PageHeader';
import { conPunto, usePuntosVenta } from './PuntosVenta';
import SelectorUbicacion from './SelectorUbicacion';
import { useToast } from './Toast';
import editorStyles from './EditorPagina.module.css';
import campos from './CamposEditor.module.css';
import listado from './ListadoAdmin.module.css';

const BASE = EDITOR_PUNTOS;
const WEB = `/es${RUTA_WEB_PUNTOS}`;
const NUEVO = 'nuevo';
const OTRO_PAIS = '__otro__';
const DEMO = ' (demo: se guardará de verdad al conectar la base de datos)';

// ---------- Listado ----------

function Listado({ pais }) {
  const { mostrarToast } = useToast();
  const { puntos, alternar, borrar } = usePuntosVenta();
  const [porBorrar, setPorBorrar] = useState(null);
  const paises = paisesDe(puntos);
  const lista = pais ? puntos.filter((punto) => punto.pais === pais) : puntos;
  const enLaWeb = puntos.filter((punto) => punto.publicado).length;

  return (
    <>
      <PageHeader
        titulo="Puntos de venta"
        subtitulo={`${puntos.length} puntos · ${enLaWeb} en el mapa de la web · los ateliers propios y las tiendas que venden Fely Campo`}
      >
        <Boton variante="contorno" nuevaPestana href={WEB}>
          <ExternalLink size={14} aria-hidden="true" /> Ver en la web
        </Boton>
        <Boton variante="solido" href={`${BASE}?punto=${NUEVO}${pais ? `&pais=${encodeURIComponent(pais)}` : ''}`}>
          <Plus size={14} aria-hidden="true" /> Nuevo punto de venta
        </Boton>
      </PageHeader>

      <PestanasListado
        etiqueta="Países"
        pestanas={[
          {
            href: BASE, nombre: 'Todos', cuenta: puntos.length, activa: !pais,
          },
          ...paises.map(({ pais: nombre, numero }) => ({
            href: `${BASE}?pais=${encodeURIComponent(nombre)}`, nombre, cuenta: numero, activa: pais === nombre,
          })),
        ]}
      />

      {lista.length === 0 && <p className={listado.vacio}>No hay puntos de venta en este país.</p>}

      {lista.map((punto) => (
        <FilaListado
          key={punto.id}
          vertical
          imagen={punto.foto}
          titulo={punto.nombre}
          detalle={[punto.direccion.join(', '), !pais && punto.pais].filter(Boolean).join(' · ')}
          etiqueta={esAtelierPropio(punto) ? 'Atelier propio' : undefined}
          publicado={punto.publicado}
          editar={`${BASE}?punto=${punto.id}`}
          verEnWeb={WEB}
          onAlternar={() => {
            alternar(punto.id);
            mostrarToast(`${punto.publicado ? 'Quitado del mapa' : 'Vuelve a salir en el mapa'}${DEMO}`);
          }}
          onBorrar={esAtelierPropio(punto) ? undefined : () => setPorBorrar(punto)}
        />
      ))}

      <ConfirmarBorrado
        abierto={Boolean(porBorrar)}
        titulo={`¿Borrar «${porBorrar?.nombre}»?`}
        mensaje="Deja de salir en el mapa de la web. No se puede deshacer; si solo quieres quitarlo un tiempo, ocúltalo con el ojo."
        onConfirmar={() => {
          borrar(porBorrar.id);
          mostrarToast(`Borrado${DEMO}`);
          setPorBorrar(null);
        }}
        onCancelar={() => setPorBorrar(null)}
      />
    </>
  );
}

// ---------- Editar un punto ----------

const BLOQUES = [
  {
    id: 'datos',
    nombre: 'Datos',
    resumen: 'Nombre, dirección y contacto',
    descripcion: 'Lo que se lee en el listado del mapa y al pinchar en su punto. Sale igual en español y en inglés.',
    datos: (d) => [d.nombre, d.pais, d.direccion, d.telefono, d.email],
  },
  {
    id: 'ubicacion',
    nombre: 'Dónde está',
    resumen: 'Su punto en el mapa',
    descripcion: 'El sitio exacto del punto en el mapa de la web.',
    datos: (d) => [d.lat, d.lng],
  },
  {
    id: 'foto',
    nombre: 'Foto',
    resumen: 'Opcional',
    descripcion: 'La foto pequeña junto a su nombre en el listado del mapa. Si no tiene, sale una foto de un atelier.',
    datos: (d) => d.foto,
  },
];

// El país: los que ya hay, o uno nuevo escrito a mano.
function ElegirPais({ valor, paises, onChange }) {
  const [otro, setOtro] = useState(() => Boolean(valor) && !paises.includes(valor));
  return (
    <div className={campos.campo}>
      <div className={campos.cabecera}>
        <label htmlFor="punto-pais" className={campos.etiqueta}>País</label>
      </div>
      <select
        id="punto-pais"
        className={campos.entrada}
        value={otro ? OTRO_PAIS : valor}
        onChange={(evento) => {
          if (evento.target.value === OTRO_PAIS) {
            setOtro(true);
            onChange('');
          } else {
            setOtro(false);
            onChange(evento.target.value);
          }
        }}
      >
        {paises.map((pais) => <option key={pais} value={pais}>{pais}</option>)}
        <option value={OTRO_PAIS}>Otro país…</option>
      </select>
      {otro && (
        <CampoLinea etiqueta="¿Qué país?" valor={valor} placeholder="Portugal" onChange={onChange} />
      )}
    </div>
  );
}

function EditarPunto({ puntoId, paisInicial }) {
  const router = useRouter();
  const { puntos, guardar } = usePuntosVenta();
  const esNuevo = puntoId === NUEVO;
  const paises = paisesDe(puntos).map(({ pais }) => pais);
  const [vacio] = useState(() => ({ ...nuevoPunto(), pais: paisInicial || 'España' }));
  const guardado = esNuevo ? vacio : puntos.find((punto) => punto.id === puntoId);

  if (!guardado) {
    return <p className={listado.vacio}>Este punto de venta no existe. <Link href={BASE}>Volver a Puntos de venta</Link></p>;
  }

  // En el editor, teléfono y email vacíos son '' (se guardan como null).
  const publicado = { ...guardado, telefono: guardado.telefono || '', email: guardado.email || '' };
  const idPrevia = (borrador) => borrador.id || 'nuevo-en-previa';

  return (
    <EditorPagina
      key={puntoId}
      id={ID_PREVIA_PUNTOS}
      titulo={esNuevo ? 'Nuevo punto de venta' : guardado.nombre}
      rutaWeb={RUTA_WEB_PUNTOS}
      bloques={BLOQUES}
      campos={camposPunto}
      publicado={publicado}
      datosPrevia={(borrador) => ({
        puntos: conPunto(puntos, { ...borrador, id: idPrevia(borrador), publicado: true }),
        enfocar: idPrevia(borrador),
      })}
      validarExtra={(borrador) => validarExtraPunto(borrador, puntos)}
      guardar={(borrador) => {
        const id = guardar(borrador);
        router.replace(`${BASE}?punto=${id}`);
      }}
      migas="Puntos de venta"
      volver={BASE}
      estadoPublicado={esNuevo ? 'Sin publicar' : (guardado.publicado ? 'En el mapa' : 'Oculto en la web')}
      textoPublicado={esNuevo ? 'Punto de venta publicado' : 'Cambios publicados'}
      enLaWeb={!esNuevo}
    >
      {(bloque, h) => {
        const linea = (ruta, props) => (
          <CampoLinea valor={h.leer(ruta) || ''} onChange={(valor) => h.cambiar(ruta, valor)} {...props} />
        );
        if (bloque.id === 'datos') {
          return (
            <div className={editorStyles.columnaTexto}>
              <div className={editorStyles.fichaCampos}>
                {linea(['nombre'], { etiqueta: 'Nombre de la tienda', placeholder: 'Boutique Tess' })}
                <ElegirPais valor={h.borrador.pais} paises={paises} onChange={(pais) => h.cambiar(['pais'], pais)} />
                <div className={editorStyles.dosColumnas}>
                  {linea(['direccion', 0], { etiqueta: 'Calle y número', placeholder: 'C/ Marqués de Molins 14' })}
                  {linea(['direccion', 1], { etiqueta: 'Ciudad y código postal', placeholder: 'Albacete 02001' })}
                </div>
                <div className={editorStyles.dosColumnas}>
                  {linea(['telefono'], {
                    etiqueta: 'Teléfono', opcional: true, placeholder: '+34 967 60 74 47', ayuda: 'Con el prefijo del país (+34…), para poder llamar desde el móvil.',
                  })}
                  {linea(['email'], {
                    etiqueta: 'Email', opcional: true, tipo: 'email', placeholder: 'tienda@ejemplo.com',
                  })}
                </div>
              </div>
            </div>
          );
        }
        if (bloque.id === 'ubicacion') {
          const { direccion, pais } = h.borrador;
          return (
            <SelectorUbicacion
              lat={h.borrador.lat}
              lng={h.borrador.lng}
              direccion={[...direccion, pais].filter((parte) => String(parte || '').trim()).join(', ')}
              onChange={({ lat, lng }) => { h.cambiar(['lat'], lat); h.cambiar(['lng'], lng); }}
            />
          );
        }
        return (
          <div className={editorStyles.medioYCampos}>
            {h.medio(['foto'], {
              etiqueta: 'Foto', detalle: 'Vertical', proporcion: '3 / 4', opcional: true,
            })}
          </div>
        );
      }}
    </EditorPagina>
  );
}

// ---------- Página ----------

function AdminPuntosVenta() {
  const params = useSearchParams();
  const punto = params.get('punto');
  const pais = params.get('pais');
  if (punto) return <EditarPunto puntoId={punto} paisInicial={pais} />;
  return <Listado pais={pais} />;
}

export default AdminPuntosVenta;
