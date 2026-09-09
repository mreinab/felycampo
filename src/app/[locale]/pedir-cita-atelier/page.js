'use client';

/* ============================================================
   RESERVAR CITA — ATELIER — Fely Campo. Ruta: /pedir-cita-atelier
   Formulario simple: motivo de la visita + calendario (día/hora) +
   datos de contacto — mismo lenguaje visual que ModalSolicitudAtelier
   (título en mayúsculas, .campo/.etiqueta/.aviso, Input de ui/) pero
   como página completa en vez de modal, y con el mismo chip
   seleccionable (.chip/.chipActivo) que visita-fely-campo/
   MapaPuntosVenta usan para sus filtros — aquí para elegir día/hora/
   motivo en vez de filtrar una lista.

   PLACEHOLDER a propósito, mismo criterio que ModalSolicitudAtelier:
   "confirmar" no manda nada a ningún backend real todavía, solo pasa
   a la pantalla de confirmación. DIAS_DISPONIBLES son los próximos 14
   días naturales a partir de mañana — no hay disponibilidad real que
   consultar, así que se generan en el cliente en vez de venir de datos
   (por eso cambian según cuándo se visite la página, no están fijados
   en el propio código). HORAS_DISPONIBLES es un horario fijo de
   ejemplo (con hueco de comida 13-16h).
   ============================================================ */

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Boton, CabeceraSeccion, Input } from '@/components/ui';
import styles from './page.module.css';

const DIAS_A_MOSTRAR = 14;
const HORAS_DISPONIBLES = ['10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'];
const MOTIVOS = ['probarColeccion', 'vestidoMedida'];

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
  const locale = useLocale();
  const dias = useMemo(() => generarDias(locale), [locale]);

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

  return (
    <section className="seccion contenedor">
      <CabeceraSeccion subtitleKey="pedirCitaAtelier.eyebrow" titleKey="pedirCitaAtelier.titulo" descriptionKey="pedirCitaAtelier.intro" />

      <div className={styles.envoltorio}>
        {enviado ? (
          <div className={styles.confirmacion}>
            <h2 className={styles.tituloConfirmacion}>{t('confirmacionTitulo')}</h2>
            <p>{t('confirmacionTexto')}</p>
            <Boton variante="solido" tamano="full" href={`/${locale}`}>{t('volver')}</Boton>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
