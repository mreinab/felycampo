'use client';

/* ============================================================
   RESERVAR CITA — ATELIER — Fely Campo. Ruta: /visita-fely-campo/cita
   Página normal (con el Navbar arriba y el fondo blanco del sitio): solo
   el formulario, centrado en la página — antes era una capa a pantalla
   completa por encima del Navbar, con una foto al 50% a la izquierda y
   una X para cerrar (calcada de MiCuentaModal); quitadas a petición.

   Un único formulario pequeño: nombre completo, email y teléfono de
   contacto, fecha del evento (opcional, día/mes/año en selects propios
   — no <input type="date">, a petición), código postal, ciudad,
   mensaje libre y la casilla de aceptar privacidad/términos
   (obligatoria). "Enviar solicitud" pasa a una pantalla de
   confirmación — PLACEHOLDER a propósito, sin backend real todavía
   (mismo criterio que ModalSolicitudAtelier.jsx). */

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Boton, Input } from '@/components/ui';
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

  return (
    <div className={styles.pagina}>
      <div className={styles.formContenedor}>
        {enviado ? (
          <div className={styles.confirmacion}>
            <h1 className={styles.titulo}>{t('confirmacionTitulo')}</h1>
            <p className={styles.dondeIntro}>{t('confirmacionTexto')}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={alEnviar}>
            <div className={styles.cabecera}>
              <h1 className={styles.titulo}>{t('titulo')}</h1>
              <p className={styles.subtitulo}>{t('subtitulo')}</p>
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

            {avisoDatos && <p className={styles.aviso}>{t('avisoDatos')}</p>}

            <Boton variante="solido" tamano="full" type="submit">{t('enviar')}</Boton>
          </form>
        )}
      </div>
    </div>
  );
}
