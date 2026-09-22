'use client';

/* ============================================================
   RESERVAR CITA — ATELIER — Fely Campo. Ruta: /visita-fely-campo/cita
   Página a pantalla completa (no modal — ver respuesta a "modal vs.
   página" en la conversación: SEO/enlace directo piden una URL real),
   calcada del DISEÑO de MiCuentaModal.jsx/.css (foto 50% izquierda +
   contenido 50% derecha, X arriba a la derecha) — ver page.module.css
   para el porqué de position:fixed/z-index en vez de la clase
   "abierta" del modal real.

   Un único formulario pequeño (sin pasos ni bienvenida editorial, ver
   historial de este archivo para el flujo de bienvenida/ubicación/
   WhatsApp-email que llevaba antes): nombre completo, email y teléfono
   de contacto, fecha del evento (opcional, día/mes/año en selects
   propios — no <input type="date">, a petición), código postal,
   mensaje libre y la casilla de aceptar privacidad/términos
   (obligatoria). "Enviar solicitud" pasa a una pantalla de
   confirmación — PLACEHOLDER a propósito, sin backend real todavía
   (mismo criterio que ModalSolicitudAtelier.jsx). El panel de la foto
   (IMAGEN_LATERAL) se oculta en mobile/tablet vertical (ver
   .imagenPanel en page.module.css) — ahí solo queda el formulario. */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Boton, Input } from '@/components/ui';
import styles from './page.module.css';

const IMAGEN_LATERAL = '/img/citas-atelier-felycampo-2.jpg';

// Nombres de mes propios (no hay diccionario de meses en messages/
// {locale}.json todavía) — mismo criterio bilingüe por campo que
// atelierIndex.js, aquí como array fijo en vez de {es, en} por entrada.
const MESES = {
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const DIAS = Array.from({ length: 31 }, (_, i) => i + 1);
// El evento es a futuro (es la fecha para la que se pide el vestido,
// no una fecha pasada) — año actual + 3 basta de sobra para una boda/
// fiesta ya planeada con antelación.
const ANIO_ACTUAL = new Date().getFullYear();
const ANIOS = Array.from({ length: 4 }, (_, i) => ANIO_ACTUAL + i);

export default function Pagina() {
  const t = useTranslations('pedirCitaAtelier');
  const locale = useLocale();
  const meses = MESES[locale] || MESES.es;

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaDia, setFechaDia] = useState('');
  const [fechaMes, setFechaMes] = useState('');
  const [fechaAnio, setFechaAnio] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [aceptaLegal, setAceptaLegal] = useState(false);
  const [avisoDatos, setAvisoDatos] = useState(false);
  const [enviado, setEnviado] = useState(false);

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

  // Antes de montar (SSR y el primer tick en cliente, ver comentario de
  // arriba) no se puede pintar el portal — sin nada aquí, se veía el
  // Navbar y el Footer del layout con un hueco en blanco entre medias
  // mientras React hidrata. En su lugar, un logo pulsante a toda la
  // altura de la sección (misma .color-fondo que .pagina) — normal,
  // dentro del flujo (no fixed/portal, no le hace falta ganarle al
  // Footer todavía: eso solo importa una vez montado el portal real).
  if (!montado) {
    return (
      <div className={styles.cargando}>
        <img src="/img/logo/logo-felycampo.png" alt="" className={styles.cargandoLogo} />
      </div>
    );
  }

  const withLocale = (href) => `/${locale}${href}`;

  const alEnviar = (evento) => {
    evento.preventDefault();
    if (!nombreCompleto.trim() || !email.trim() || !telefono.trim() || !codigoPostal.trim() || !ciudad.trim() || !aceptaLegal) {
      setAvisoDatos(true);
      return;
    }
    // Placeholder — sin backend real todavía, ver comentario de cabecera.
    setEnviado(true);
  };

  return createPortal(
    <div className={styles.pagina}>
      <a href={`/${locale}/visita-fely-campo`} className={styles.cerrar} aria-label={t('cerrar')}>
        <X size={28} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
      </a>

      {/* Solo visible cuando .imagenPanel se oculta (mobile y tablet en
          vertical, ver page.module.css) — sin la foto ahí no queda
          ninguna marca visible. Misma fila/altura que "cerrar" de
          arriba (mismo "top", centrado vertical propio dentro de esa
          fila vía .logoMobile). */}
      <div className={styles.logoMobile}>
        <img src="/img/logo/logo-felycampo.png" alt="Fely Campo" className={styles.logoMobileImagen} />
      </div>

      <div className={styles.layout}>
        <div className={styles.imagenPanel}>
          <img src={IMAGEN_LATERAL} alt="" className={styles.imagen} />
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formContenedor}>
            {enviado ? (
              <div className={styles.confirmacion}>
                <h1 className={styles.titulo}>{t('confirmacionTitulo')}</h1>
                <p className={styles.dondeIntro}>{t('confirmacionTexto')}</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={alEnviar}>
                <h1 className={styles.titulo}>{t('titulo')}</h1>

                <Input
                  etiqueta={t('nombreCompleto')}
                  nombre="nombreCompleto"
                  placeholder={t('nombreCompletoPlaceholder')}
                  valor={nombreCompleto}
                  onChange={(evento) => { setNombreCompleto(evento.target.value); setAvisoDatos(false); }}
                />
                <Input
                  etiqueta={t('email')}
                  tipo="email"
                  nombre="email"
                  placeholder={t('emailPlaceholder')}
                  valor={email}
                  onChange={(evento) => { setEmail(evento.target.value); setAvisoDatos(false); }}
                />
                <Input
                  etiqueta={t('telefono')}
                  tipo="tel"
                  nombre="telefono"
                  placeholder={t('telefonoPlaceholder')}
                  valor={telefono}
                  onChange={(evento) => { setTelefono(evento.target.value); setAvisoDatos(false); }}
                />

                <div className={styles.campo}>
                  <span className={styles.etiqueta}>{t('fechaEvento')}</span>
                  <div className={styles.fechaFila}>
                    <select
                      className={styles.select}
                      aria-label={t('dia')}
                      value={fechaDia}
                      onChange={(evento) => setFechaDia(evento.target.value)}
                    >
                      <option value="">{t('dia')}</option>
                      {DIAS.map((dia) => (
                        <option key={dia} value={dia}>{dia}</option>
                      ))}
                    </select>
                    <select
                      className={styles.select}
                      aria-label={t('mes')}
                      value={fechaMes}
                      onChange={(evento) => setFechaMes(evento.target.value)}
                    >
                      <option value="">{t('mes')}</option>
                      {meses.map((nombreMes, indice) => (
                        <option key={nombreMes} value={indice + 1}>{nombreMes}</option>
                      ))}
                    </select>
                    <select
                      className={styles.select}
                      aria-label={t('anio')}
                      value={fechaAnio}
                      onChange={(evento) => setFechaAnio(evento.target.value)}
                    >
                      <option value="">{t('anio')}</option>
                      {ANIOS.map((anio) => (
                        <option key={anio} value={anio}>{anio}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.fila2Columnas}>
                  <Input
                    etiqueta={t('codigoPostal')}
                    nombre="codigoPostal"
                    placeholder={t('codigoPostalPlaceholder')}
                    valor={codigoPostal}
                    onChange={(evento) => { setCodigoPostal(evento.target.value); setAvisoDatos(false); }}
                  />
                  <Input
                    etiqueta={t('ciudad')}
                    nombre="ciudad"
                    placeholder={t('ciudadPlaceholder')}
                    valor={ciudad}
                    onChange={(evento) => { setCiudad(evento.target.value); setAvisoDatos(false); }}
                  />
                </div>

                <label className={styles.campo}>
                  <span className={styles.etiqueta}>{t('mensaje')}</span>
                  <textarea
                    className={styles.textarea}
                    value={mensaje}
                    onChange={(evento) => setMensaje(evento.target.value)}
                    rows={3}
                  />
                </label>

                <label className={styles.legalFila}>
                  <input
                    type="checkbox"
                    className={styles.legalCheckbox}
                    checked={aceptaLegal}
                    onChange={(evento) => { setAceptaLegal(evento.target.checked); setAvisoDatos(false); }}
                  />
                  <span className={styles.legalTexto}>
                    {t.rich('aceptoLegal', {
                      privacidad: (chunks) => (
                        <a href={withLocale('/legal/privacidad')} className={styles.legalEnlace} target="_blank" rel="noopener noreferrer">
                          {chunks}
                        </a>
                      ),
                      terminos: (chunks) => (
                        <a href={withLocale('/legal/terminos')} className={styles.legalEnlace} target="_blank" rel="noopener noreferrer">
                          {chunks}
                        </a>
                      ),
                    })}
                  </span>
                </label>

                {avisoDatos && <p className={styles.aviso}>{t('avisoDatos')}</p>}

                <Boton variante="solido" tamano="full" type="submit">{t('enviar')}</Boton>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
