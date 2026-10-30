'use client';

/* ============================================================
   RESERVAR CITA — ATELIER — Fely Campo. Ruta: /visita-fely-campo/cita
   Página normal (con el Navbar arriba y el fondo blanco del sitio): solo
   el formulario, centrado en la página — antes era una capa a pantalla
   completa por encima del Navbar, con una foto al 50% a la izquierda y
   una X para cerrar (calcada de MiCuentaModal); quitadas a petición.

   Un único formulario pequeño: nombre completo, email y teléfono de
   contacto, fecha de la
   boda (obligatoria, día/mes/año en selects propios — no
   <input type="date">, a petición), código postal, ciudad, mensaje
   libre y la casilla de aceptar privacidad/términos (obligatoria).

   "Enviar solicitud" manda los datos a /api/cita (email de confirmación
   a la clienta + aviso al equipo del atelier, ver src/app/api/cita/
   route.js) y, si va bien, registra la conversión (src/lib/analitica.js)
   y lleva a la página de confirmación (./confirmacion). Ya no se
   pregunta si la cita es de novia o de invitada, ni el atelier (lo
   decide el equipo al contactar; los enlaces "Pedir cita" de cada
   atelier aún llevan ?ubicacion=<id>, que ya no se usa) — quitados a
   petición. */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Boton, Input } from '@/components/ui';
import { rutaConfirmacionCita } from '@/lib/citaAtelier';
import { registrarConversionCita } from '@/lib/analitica';
import styles from './page.module.css';

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
  const router = useRouter();
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
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);
  // Campo trampa para bots — oculto, una persona nunca lo rellena (ver
  // api/cita/route.js).
  const [web, setWeb] = useState('');

  const withLocale = (href) => `/${locale}${href}`;
  const conLimpieza = (setter) => (evento) => { setter(evento.target.value); setAvisoDatos(false); };

  const fechaBoda = fechaDia && fechaMes && fechaAnio
    ? `${fechaAnio}-${String(fechaMes).padStart(2, '0')}-${String(fechaDia).padStart(2, '0')}`
    : '';

  const alEnviar = async (evento) => {
    evento.preventDefault();
    if (enviando) return;
    if (!fechaBoda || !nombreCompleto.trim() || !email.trim() || !telefono.trim() || !codigoPostal.trim() || !ciudad.trim() || !aceptaLegal) {
      setAvisoDatos(true);
      return;
    }

    setEnviando(true);
    setErrorEnvio(false);
    try {
      const respuesta = await fetch('/api/cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale, fechaBoda, nombreCompleto, email, telefono, codigoPostal, ciudad, mensaje, aceptaLegal, web,
        }),
      });
      const resultado = await respuesta.json().catch(() => ({}));
      if (!respuesta.ok || !resultado.ok) {
        // 422 = datos no válidos según el servidor (ej. fecha pasada).
        if (respuesta.status === 422) setAvisoDatos(true);
        else setErrorEnvio(true);
        setEnviando(false);
        return;
      }
      registrarConversionCita();
      router.push(withLocale(rutaConfirmacionCita()));
    } catch {
      setErrorEnvio(true);
      setEnviando(false);
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.formContenedor}>
        <form className={styles.form} onSubmit={alEnviar} noValidate>
          <div className={styles.cabecera}>
            <h1 className={styles.titulo}>{t('titulo')}</h1>
            <p className={styles.subtitulo}>{t('subtitulo')}</p>
          </div>

          <div className={styles.trampa} aria-hidden="true">
            <input type="text" name="web" tabIndex={-1} autoComplete="off" value={web} onChange={(evento) => setWeb(evento.target.value)} />
          </div>

          {/* "*" delante del placeholder = campo obligatorio (los mismos
              que comprueba alEnviar). */}
          <Input
            etiqueta={t('nombreCompleto')}
            etiquetaOculta
            nombre="nombreCompleto"
            placeholder={`*${t('nombreCompleto')}`}
            valor={nombreCompleto}
            onChange={(evento) => { setNombreCompleto(evento.target.value); setAvisoDatos(false); }}
          />
          <Input
            etiqueta={t('email')}
            etiquetaOculta
            tipo="email"
            nombre="email"
            placeholder={`*${t('email')}`}
            valor={email}
            onChange={(evento) => { setEmail(evento.target.value); setAvisoDatos(false); }}
          />
          <Input
            etiqueta={t('telefono')}
            etiquetaOculta
            tipo="tel"
            nombre="telefono"
            placeholder={`*${t('telefono')}`}
            valor={telefono}
            onChange={(evento) => { setTelefono(evento.target.value); setAvisoDatos(false); }}
          />

          <div className={styles.campo}>
            <span className={styles.etiqueta}>{t('fechaBoda')}</span>
            <div className={styles.fechaFila}>
              <select
                className={styles.select}
                aria-label={t('dia')}
                value={fechaDia}
                onChange={conLimpieza(setFechaDia)}
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
                onChange={conLimpieza(setFechaMes)}
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
                onChange={conLimpieza(setFechaAnio)}
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
              etiquetaOculta
              nombre="codigoPostal"
              placeholder={`*${t('codigoPostal')}`}
              valor={codigoPostal}
              onChange={(evento) => { setCodigoPostal(evento.target.value); setAvisoDatos(false); }}
            />
            <Input
              etiqueta={t('ciudad')}
              etiquetaOculta
              nombre="ciudad"
              placeholder={`*${t('ciudad')}`}
              valor={ciudad}
              onChange={(evento) => { setCiudad(evento.target.value); setAvisoDatos(false); }}
            />
          </div>

          <label className={styles.campo}>
            <span className={styles.etiquetaOculta}>{t('mensaje')}</span>
            <textarea
              className={styles.textarea}
              placeholder={t('mensaje')}
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

          {avisoDatos && <p className={styles.aviso} role="alert">{t('avisoDatos')}</p>}
          {errorEnvio && <p className={styles.aviso} role="alert">{t('errorEnvio')}</p>}

          <Boton variante="solido" tamano="full" type="submit" desactivado={enviando}>
            {enviando ? t('enviando') : t('enviar')}
          </Boton>
        </form>
      </div>
    </div>
  );
}
