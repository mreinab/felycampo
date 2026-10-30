'use client';

/* ============================================================
   CITA — detalle, presentado como un folio A4 (y así se imprime con
   "Imprimir": el menú y la barra del admin se ocultan en impresión,
   ver layout.module.css). Todos los datos que la clienta envió desde
   el formulario de cita del front, el punto más cercano según su
   código postal/ciudad (ver ../puntoCercano.js — OpenStreetMap +
   PUNTOS_VENTA del mapa), el atelier o boutique que se le asigna,
   estado, historial y notas internas del equipo.
   Datos de EJEMPLO (citasMock): cambiar estado/asignación y guardar
   notas solo muestran el aviso "(demo)" hasta que haya base de datos.
   ============================================================ */

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Printer } from 'lucide-react';
import { BotonVolver, useToast } from '@/components/admin';
import { Boton } from '@/components/ui';
import { citasMock, ESTADOS_CITA } from '@/components/admin/mockData';
import { fechaCorta, fechaHora, nombreIdioma } from '../citasFormato';
import { ATELIERES_PROPIOS, boutiquesPorPais, puntoMasCercano, puntoPorId } from '../puntoCercano';
import styles from './page.module.css';

function Dato({ etiqueta, children }) {
  return (
    <div className={styles.dato}>
      <p className={styles.datoEtiqueta}>{etiqueta}</p>
      <div className={styles.datoValor}>{children}</div>
    </div>
  );
}

function SugerenciaPunto({ sugerencia }) {
  if (sugerencia === undefined) return <p className={styles.sugerenciaAviso}>Buscando el punto más cercano…</p>;
  if (sugerencia === null) {
    return <p className={styles.sugerenciaAviso}>No se ha podido localizar el código postal o la ciudad. Elige el punto a mano.</p>;
  }
  if (sugerencia.error) {
    return <p className={styles.sugerenciaAviso}>No se ha podido consultar el mapa ahora mismo. Elige el punto a mano.</p>;
  }
  const { punto, km, lugar } = sugerencia;
  return (
    <div className={styles.sugerencia}>
      <p className={styles.sugerenciaNombre}>{punto.nombre}</p>
      <p className={styles.sugerenciaDetalle}>
        {punto.direccion.join(', ')} · {punto.pais}
        {punto.telefono && <> · {punto.telefono}</>}
      </p>
      <p className={styles.sugerenciaDetalle}>
        A unos {km} km en línea recta de {lugar.nombre}
      </p>
    </div>
  );
}

export default function DetalleCitaPage({ params }) {
  const { id } = use(params);
  const cita = citasMock.find((c) => c.id === id);

  const { mostrarToast } = useToast();
  const [estado, setEstado] = useState(cita?.estado || 'Pendiente');
  const [notas, setNotas] = useState('');
  const [historial, setHistorial] = useState(
    cita ? [{ estado: 'Pendiente', fecha: fechaHora(cita.recibida) }] : []
  );
  // undefined = buscando · null = no localizado · { error } = fallo de red
  const [sugerencia, setSugerencia] = useState(undefined);
  const [asignado, setAsignado] = useState('');

  useEffect(() => {
    if (!cita) return undefined;
    let vigente = true;
    puntoMasCercano(cita)
      .then((resultado) => {
        if (!vigente) return;
        setSugerencia(resultado);
        // Empieza con lo sugerido, salvo que ya se haya elegido otro.
        if (resultado) setAsignado((actual) => actual || resultado.punto.id);
      })
      .catch(() => vigente && setSugerencia({ error: true }));
    return () => { vigente = false; };
  }, [cita]);

  if (!cita) notFound();

  function ahoraLegible() {
    const ahora = new Date();
    return fechaHora(`${ahora.toISOString().slice(0, 10)}T${ahora.toTimeString().slice(0, 5)}`);
  }

  function cambiarEstado(nuevo) {
    if (nuevo === estado) return;
    setEstado(nuevo);
    setHistorial([...historial, { estado: nuevo, fecha: ahoraLegible() }]);
    mostrarToast(`Estado actualizado a "${nuevo}" (demo)`);
  }

  function cambiarAsignado(nuevoId) {
    setAsignado(nuevoId);
    const punto = puntoPorId(nuevoId);
    if (punto) mostrarToast(`Asignada a ${punto.nombre} (demo)`);
  }

  function guardarNotas() {
    mostrarToast('Notas internas guardadas (demo)');
  }

  const asuntoRespuesta = encodeURIComponent(cita.locale === 'en' ? 'Your appointment at Fely Campo' : 'Tu cita en Fely Campo');
  const telefonoEnlace = `tel:${cita.telefono.replace(/\s/g, '')}`;
  const puntoAsignado = puntoPorId(asignado);

  return (
    <div>
      <div className={styles.barra}>
        <BotonVolver href="/admin/consultas" />
        <div className={styles.barraAcciones}>
          <Boton variante="contorno" href={`mailto:${cita.email}?subject=${asuntoRespuesta}`}>Responder por email</Boton>
          <Boton variante="contorno" href={telefonoEnlace}>Llamar</Boton>
          <Boton onClick={() => window.print()}>
            <span className={styles.botonIcono}><Printer size={16} strokeWidth={1.5} aria-hidden="true" />Imprimir</span>
          </Boton>
        </div>
      </div>

      <div className={styles.mesa}>
        <article className={styles.folio}>
          <header className={styles.cabecera}>
            <img src="/img/logo/fely-campo-logo.webp" alt="Fely Campo" className={styles.logo} />
            <div className={styles.cabeceraTexto}>
              <p className={styles.tipoDocumento}>Solicitud de cita</p>
              <p className={styles.recibida}>Recibida el {fechaHora(cita.recibida)}</p>
            </div>
          </header>

          <h1 className={styles.nombre}>{cita.nombre}</h1>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>Datos de la clienta</h2>
            <div className={styles.datos}>
              <Dato etiqueta="Email"><a href={`mailto:${cita.email}`}>{cita.email}</a></Dato>
              <Dato etiqueta="Teléfono"><a href={telefonoEnlace}>{cita.telefono}</a></Dato>
              <Dato etiqueta="Fecha del evento">{fechaCorta(cita.fechaBoda)}</Dato>
              <Dato etiqueta="Código postal">{cita.codigoPostal}</Dato>
              <Dato etiqueta="Ciudad">{cita.ciudad}</Dato>
              <Dato etiqueta="Idioma">{nombreIdioma(cita.locale)}</Dato>
              <Dato etiqueta="Privacidad y términos">{cita.aceptaLegal ? 'Aceptados' : 'No aceptados'}</Dato>
            </div>
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>Mensaje</h2>
            <p className={styles.mensaje}>{cita.mensaje || 'Sin mensaje.'}</p>
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>Punto más cercano (sugerencia)</h2>
            <SugerenciaPunto sugerencia={sugerencia} />
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>Gestión</h2>
            <div className={styles.estadoBloque}>
              <p className={styles.datoEtiqueta}>Estado</p>
              {/* Un clic = cambio de estado (queda en el historial). */}
              <div className={`${styles.estados} ${styles.soloPantalla}`} role="group" aria-label="Estado de la cita">
                {ESTADOS_CITA.map((opcion) => (
                  <button
                    key={opcion}
                    type="button"
                    className={`${styles.estadoBoton} ${estado === opcion ? styles.estadoActivo : ''}`}
                    aria-pressed={estado === opcion}
                    onClick={() => cambiarEstado(opcion)}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
              <span className={`${styles.datoValor} ${styles.soloImpresion}`}>{estado}</span>
            </div>
            <div className={styles.datos}>
              <Dato etiqueta="Atelier asignado">
                <select className={`${styles.selectInput} ${styles.soloPantalla}`} value={asignado} onChange={(e) => cambiarAsignado(e.target.value)}>
                  <option value="">Sin asignar</option>
                  <optgroup label="Ateliers Fely Campo">
                    {ATELIERES_PROPIOS.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                  </optgroup>
                  {boutiquesPorPais().map(([pais, boutiques]) => (
                    <optgroup key={pais} label={`Boutiques · ${pais}`}>
                      {boutiques.map((p) => <option key={p.id} value={p.id}>{p.nombre} — {p.direccion.at(-1)}</option>)}
                    </optgroup>
                  ))}
                </select>
                <span className={styles.soloImpresion}>{puntoAsignado ? puntoAsignado.nombre : 'Sin asignar'}</span>
              </Dato>
            </div>
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>Historial de estado</h2>
            <ul className={styles.historial}>
              {historial.map((h, i) => (
                <li key={i} className={styles.historialFila}>
                  <span>{h.fecha}</span>
                  <span>{h.estado}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>Notas internas</h2>
            <div className={styles.soloPantalla}>
              <textarea className={styles.notas} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Solo las ve el equipo" />
              <Boton variante="contorno" tamano="s" onClick={guardarNotas}>Guardar notas</Boton>
            </div>
            <p className={`${styles.notasImpresas} ${styles.soloImpresion}`}>{notas || 'Sin notas.'}</p>
          </section>
        </article>
      </div>
    </div>
  );
}
