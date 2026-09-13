'use client';

/* ============================================================
   RESERVAR CITA — ATELIER — Fely Campo. Ruta: /visita-fely-campo/cita
   Página a pantalla completa (no modal — ver respuesta a "modal vs.
   página" en la conversación: SEO/enlace directo/?ubicacion= piden
   una URL real), pero calcada del DISEÑO de MiCuentaModal.jsx/.css
   (foto 50% izquierda + contenido 50% derecha, X arriba a la derecha)
   — ver page.module.css para el porqué de position:fixed/z-index en
   vez de la clase "abierta" del modal real.

   Tres pasos dentro del mismo panel derecho:
   0. Bienvenida (pasoIntro): texto editorial de presentación +
      "Continuar", pantalla propia (no un párrafo suelto encima del
      paso 1) para que se lea como apertura, no como una etiqueta más
      del formulario.
   1. "¿Dónde quieres pedir la cita?" — tres botones grandes
      (Salamanca/Madrid/Oviedo, UBICACIONES de ../ubicaciones.js). El
      panel de la foto muestra la imagen de esa sede en cuanto se
      elige (MEDIOS_TALLERES, mismas fotos que ListadoUbicaciones.jsx).
   2. El formulario que ya existía (trasladado desde /pedir-cita-atelier,
      ruta eliminada): motivo + día/hora + datos de contacto. Un enlace
      "Cambiar ubicación" vuelve al paso 1.
   "?ubicacion=<id>" en la URL (lo mandan ListadoUbicaciones.jsx y
   AtelierDetalle.jsx) preselecciona la sede y salta directo al paso 2,
   saltándose también la bienvenida (pasoIntro arranca en false) — ya
   viene de un enlace con contexto propio, no hace falta la apertura.

   PLACEHOLDER a propósito, mismo criterio que ModalSolicitudAtelier:
   "confirmar" no manda nada a ningún backend real todavía, solo pasa
   a la pantalla de confirmación. DIAS_DISPONIBLES son los próximos 14
   días naturales a partir de mañana — no hay disponibilidad real que
   consultar, así que se generan en el cliente en vez de venir de datos
   (por eso cambian según cuándo se visite la página, no están fijados
   en el propio código). HORAS_DISPONIBLES es un horario fijo de
   ejemplo (con hueco de comida 13-16h). */

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Boton, Input } from '@/components/ui';
import { UBICACIONES } from '../ubicaciones';
import styles from './page.module.css';

const DIAS_A_MOSTRAR = 14;
const HORAS_DISPONIBLES = ['10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'];
const MOTIVOS = ['vestidoNovia', 'vestidoFiesta', 'probarColeccion'];

// Mismas fotos que MEDIOS_TALLERES en ../ListadoUbicaciones.jsx — una
// por sede, para el panel izquierdo una vez elegida.
const IMAGEN_POR_UBICACION = {
  salamanca: '/img/talleres/salamanca-ateliernovia-ateliernoviasalamanca-ubicacion-felycampo.webp',
  madrid: '/img/talleres/madrid-atelier_madrid_fiesta_novia_medida.webp',
  oviedo: '/img/talleres/oviedo-atelier_fiesta_oviedo_felycampo_espacio_9-2048x1365.webp',
};
// Antes de elegir sede — la misma foto que MiCuentaModal.jsx, mismo
// espíritu de "imagen de marca" genérica.
const IMAGEN_POR_DEFECTO = '/img/felycampo-lacoleccion-3.webp';

function generarDias(locale) {
  const formateador = new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' });

  return Array.from({ length: DIAS_A_MOSTRAR }, (_, indice) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + indice + 1);
    const etiqueta = formateador.format(fecha);
    return {
      // Clave estable para el chip — no depende del formato de fecha.
      id: fecha.toISOString().slice(0, 10),
      etiqueta: etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1),
    };
  });
}

export default function Pagina() {
  const t = useTranslations('pedirCitaAtelier');
  // Mismo "Atelier"/"Atelier & Showroom"/"Atelier" que ya usan las
  // fichas de /atelier-fiesta/[sede] — se reutiliza tal cual en vez de
  // duplicar el texto aquí.
  const tAtelier = useTranslations('atelierFiesta');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const dias = useMemo(() => generarDias(locale), [locale]);

  // "?ubicacion=" preselecciona la sede y salta al paso 2 — solo si
  // coincide con un id real de UBICACIONES, si no se ignora y se
  // queda en el paso 1.
  const ubicacionInicial = UBICACIONES.find((u) => u.id === searchParams.get('ubicacion'))?.id ?? null;
  const [ubicacionId, setUbicacionId] = useState(ubicacionInicial);
  const ubicacionSeleccionada = UBICACIONES.find((u) => u.id === ubicacionId) ?? null;

  // Paso 0: bienvenida (texto editorial) antes de preguntar la sede —
  // se salta si "?ubicacion=" ya trae una sede válida (mismo caso que
  // salta directo al paso 2, ver comentario de cabecera).
  const [pasoIntro, setPasoIntro] = useState(!ubicacionInicial);

  const [motivo, setMotivo] = useState(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [avisoMotivo, setAvisoMotivo] = useState(false);
  const [avisoFecha, setAvisoFecha] = useState(false);
  const [avisoDatos, setAvisoDatos] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Sin scroll de la página detrás mientras esta pantalla completa
  // está montada — mismo criterio que MiCuentaModal.jsx al abrir.
  useEffect(() => {
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflowPrevio; };
  }, []);

  const alEnviar = (evento) => {
    evento.preventDefault();
    if (!motivo) {
      setAvisoMotivo(true);
      return;
    }
    if (!diaSeleccionado || !horaSeleccionada) {
      setAvisoFecha(true);
      return;
    }
    if (!nombre.trim() || !apellidos.trim() || !email.trim()) {
      setAvisoDatos(true);
      return;
    }
    // Placeholder — ver comentario de cabecera.
    setEnviado(true);
  };

  const imagenActual = IMAGEN_POR_UBICACION[ubicacionId] ?? IMAGEN_POR_DEFECTO;

  return (
    <div className={styles.pagina}>
      <a href={`/${locale}/visita-fely-campo`} className={styles.cerrar} aria-label={t('cerrar')}>
        <X size={28} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
      </a>

      <div className={styles.layout}>
        <div className={styles.imagenPanel}>
          <img src={imagenActual} alt="" className={styles.imagen} />
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formContenedor}>
            {pasoIntro ? (
              <div key="intro" className={`${styles.introPaso} entrada-suave`}>
                <div className={styles.introTexto}>
                  <h2 className={styles.titulo}>{t('introTitulo')}</h2>
                  <p className={styles.dondeIntro}>{t('dondeIntro')}</p>
                </div>
                <Boton variante="solido" tamano="full" onClick={() => setPasoIntro(false)}>
                  {t('continuar')}
                </Boton>
              </div>
            ) : !ubicacionSeleccionada ? (
              <div key="ubicacion" className={`${styles.paso} entrada-suave`}>
                <div className={styles.cabecera}>
                  <h1 className={styles.titulo}>{t('dondeTitulo')}</h1>
                </div>

                <div className={styles.ubicaciones}>
                  {UBICACIONES.map((ubicacion) => (
                    <button
                      key={ubicacion.id}
                      type="button"
                      className={styles.ubicacionBtn}
                      onClick={() => setUbicacionId(ubicacion.id)}
                    >
                      <span className={styles.ubicacionCiudad}>{ubicacion.ciudad}</span>
                      <span className={styles.ubicacionTipo}>{tAtelier(`${ubicacion.id}.eyebrow`)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : enviado ? (
              <div key="confirmacion" className={`${styles.confirmacion} entrada-suave`}>
                <h2 className={styles.tituloConfirmacion}>{t('confirmacionTitulo')}</h2>
                <p>{t('confirmacionTexto')}</p>
                <Boton variante="solido" tamano="full" href={`/${locale}/visita-fely-campo`}>{t('volver')}</Boton>
              </div>
            ) : (
              <div key="form" className={`${styles.paso} entrada-suave`}>
                <button
                  type="button"
                  className={styles.cambiarUbicacion}
                  onClick={() => setUbicacionId(null)}
                  aria-label={t('cambiarUbicacion')}
                >
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
                    <path d="M8 1L1 8L8 15M1 8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </button>

                <div className={styles.cabecera}>
                  <span className={styles.subtituloUbicacion}>{ubicacionSeleccionada.nombre}</span>
                  <h1 className={styles.titulo}>{t('titulo')}</h1>
                </div>

                <form className={styles.form} onSubmit={alEnviar}>
                  <div className={styles.campo}>
                    <span className={styles.etiqueta}>{t('motivo')}</span>
                    <div className={styles.chips}>
                      {MOTIVOS.map((clave) => (
                        <button
                          key={clave}
                          type="button"
                          className={`${styles.chip} ${motivo === clave ? styles.chipActivo : ''}`}
                          aria-pressed={motivo === clave}
                          onClick={() => { setMotivo(clave); setAvisoMotivo(false); }}
                        >
                          {t(`motivo${clave.charAt(0).toUpperCase()}${clave.slice(1)}`)}
                        </button>
                      ))}
                    </div>
                    {avisoMotivo && <p className={styles.aviso}>{t('avisoMotivo')}</p>}
                  </div>

                  <div className={styles.campo}>
                    <span className={styles.etiqueta}>{t('dia')}</span>
                    <div className={`${styles.chips} ${styles.chipsScroll}`}>
                      {dias.map((dia) => (
                        <button
                          key={dia.id}
                          type="button"
                          className={`${styles.chip} ${diaSeleccionado === dia.id ? styles.chipActivo : ''}`}
                          aria-pressed={diaSeleccionado === dia.id}
                          onClick={() => { setDiaSeleccionado(dia.id); setAvisoFecha(false); }}
                        >
                          {dia.etiqueta}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.campo}>
                    <span className={styles.etiqueta}>{t('hora')}</span>
                    <div className={styles.chips}>
                      {HORAS_DISPONIBLES.map((hora) => (
                        <button
                          key={hora}
                          type="button"
                          className={`${styles.chip} ${horaSeleccionada === hora ? styles.chipActivo : ''}`}
                          aria-pressed={horaSeleccionada === hora}
                          onClick={() => { setHoraSeleccionada(hora); setAvisoFecha(false); }}
                        >
                          {hora}
                        </button>
                      ))}
                    </div>
                    {avisoFecha && <p className={styles.aviso}>{t('avisoFecha')}</p>}
                  </div>

                  <Input
                    etiqueta={t('nombre')}
                    nombre="nombre"
                    placeholder={t('nombrePlaceholder')}
                    valor={nombre}
                    onChange={(evento) => { setNombre(evento.target.value); setAvisoDatos(false); }}
                  />
                  <Input
                    etiqueta={t('apellidos')}
                    nombre="apellidos"
                    placeholder={t('apellidosPlaceholder')}
                    valor={apellidos}
                    onChange={(evento) => { setApellidos(evento.target.value); setAvisoDatos(false); }}
                  />
                  <Input
                    etiqueta={t('email')}
                    tipo="email"
                    nombre="email"
                    placeholder={t('emailPlaceholder')}
                    valor={email}
                    onChange={(evento) => { setEmail(evento.target.value); setAvisoDatos(false); }}
                  />
                  {avisoDatos && <p className={styles.aviso}>{t('avisoDatos')}</p>}

                  <Boton variante="solido" tamano="full" type="submit">{t('enviar')}</Boton>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
