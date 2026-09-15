'use client';

/* ============================================================
   RESERVAR CITA — ATELIER — Fely Campo. Ruta: /visita-fely-campo/cita
   Página a pantalla completa (no modal — ver respuesta a "modal vs.
   página" en la conversación: SEO/enlace directo/?ubicacion= piden
   una URL real), pero calcada del DISEÑO de MiCuentaModal.jsx/.css
   (foto 50% izquierda + contenido 50% derecha, X arriba a la derecha)
   — ver page.module.css para el porqué de position:fixed/z-index en
   vez de la clase "abierta" del modal real.

   Dos pasos dentro del mismo panel derecho:
   0. Bienvenida (pasoIntro): texto editorial de presentación +
      "Continuar", pantalla propia (no un párrafo suelto encima del
      paso 1) para que se lea como apertura, no como una etiqueta más
      del formulario.
   1. "¿Dónde quieres pedir la cita?" — tres botones grandes
      (Salamanca/Madrid/Oviedo, UBICACIONES de ../ubicaciones.js). El
      panel de la foto es siempre IMAGEN_LATERAL, la misma en los tres
      pasos.
   2. Contacto directo con la sede elegida: WhatsApp (wa.me,
      "ubicacion.whatsapp" — mismo dato/mismo formato de enlace que
      ListadoUbicaciones.jsx/AtelierDetalle.jsx) o email (mailto, mismo
      correo general que el resto del sitio, ver "enlace-texto" en
      ayuda/contacto/page.js). Ya no hay formulario de día/hora ni
      pantalla de confirmación propia — la cita se cierra por esos dos
      canales, no en la propia web (PLACEHOLDER de reserva real
      retirado, ver historial de este archivo si hiciera falta
      recuperar ese flujo). Un enlace "Cambiar ubicación" vuelve al
      paso 1.
   "?ubicacion=<id>" en la URL (lo mandan ListadoUbicaciones.jsx y
   AtelierDetalle.jsx) preselecciona la sede y salta directo al paso 2,
   saltándose también la bienvenida (pasoIntro arranca en false) — ya
   viene de un enlace con contexto propio, no hace falta la apertura. */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Boton } from '@/components/ui';
import { UBICACIONES } from '../ubicaciones';
import styles from './page.module.css';

// Mismo correo que el resto del sitio (ver ayuda/contacto, envios,
// devoluciones, atencion-cliente).
const EMAIL_CONTACTO = 'info@felycampo.com';

// Misma foto para el panel izquierdo durante todo el proceso (bienvenida,
// elegir sede y contacto) — antes cambiaba según la sede elegida
// (MEDIOS_TALLERES en ../ListadoUbicaciones.jsx), ahora es siempre esta.
const IMAGEN_LATERAL = '/img/atelier/citas-atelier-felycampo.jpg';

export default function Pagina() {
  const t = useTranslations('pedirCitaAtelier');
  // Mismo "Atelier"/"Atelier & Showroom"/"Atelier" que ya usan las
  // fichas de /atelier-fiesta/[sede] — se reutiliza tal cual en vez de
  // duplicar el texto aquí.
  const tAtelier = useTranslations('atelierFiesta');
  const locale = useLocale();
  const searchParams = useSearchParams();

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

  // Sin scroll de la página detrás mientras esta pantalla completa
  // está montada — mismo criterio que MiCuentaModal.jsx al abrir.
  useEffect(() => {
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflowPrevio; };
  }, []);

  // Portal a document.body (igual que GaleriaProductoLightbox.jsx/
  // RunwayGaleria.jsx, mismo motivo): esta "página" vive dentro de
  // <main>, que tiene isolation:isolate (ver global.css) — sin portal,
  // ese ancestro atrapa el z-index:100 de .pagina, que entonces nunca
  // podría ganarle al Footer real (position:relative + z-index:2,
  // hermano de <main>, fuera de su contexto de apilamiento) — solo
  // existe en cliente, así que se espera a montar antes de renderizarlo.
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  if (!montado) return null;

  const whatsappHref = ubicacionSeleccionada && `https://wa.me/${ubicacionSeleccionada.whatsapp.replace(/\D/g, '')}`;
  const mailtoHref = ubicacionSeleccionada && `mailto:${EMAIL_CONTACTO}?subject=${encodeURIComponent(t('emailAsunto', { sede: ubicacionSeleccionada.nombre }))}`;

  return createPortal(
    <div className={styles.pagina}>
      <a href={`/${locale}/visita-fely-campo`} className={styles.cerrar} aria-label={t('cerrar')}>
        <X size={28} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
      </a>

      <div className={styles.layout}>
        <div className={styles.imagenPanel}>
          <img src={IMAGEN_LATERAL} alt="" className={styles.imagen} />
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
            ) : (
              <div key="contacto" className={`${styles.paso} entrada-suave`}>
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
                  <p className={styles.dondeIntro}>{t('contactoTexto')}</p>
                </div>

                <div className={styles.contactoBotones}>
                  <Boton variante="solido" tamano="full" href={whatsappHref}>{t('contactarWhatsapp')}</Boton>
                  <Boton variante="contorno" tamano="full" href={mailtoHref}>{t('contactarEmail')}</Boton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
