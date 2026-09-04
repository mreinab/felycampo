// ModalSolicitudAtelier.jsx

'use client';

/* ============================================================
   SOLICITUD DE INFORMACIÓN — ATELIER — Fely Campo
   Modal (ver ui/Modal.jsx) que abre InfoAtelier.jsx al pulsar
   "Contacta con nosotros" — pide talla + datos de contacto +
   comentario opcional, con el producto y el color ya elegidos como
   contexto fijo (no editable aquí, ver "resumen" más abajo).
   PLACEHOLDER a propósito, sin backend real todavía (mismo criterio
   que "añadir a la cesta" en FichaProductoAcciones.jsx): "enviar" no
   manda nada a ningún sitio, solo pasa a la pantalla de confirmación
   — el equipo comercial contactará más adelante cuando exista un
   backend real que reciba estas solicitudes (mismo shape que
   consultasPrecioMock en components/admin/mockData.js: producto,
   color, talla, nombre, email, teléfono, comentario).
   Uso:
     <ModalSolicitudAtelier abierto={abierto} onCerrar={...}
       producto="Vestido Aurora" color="Marfil" tallas={['S','M','L']} />
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal, Boton, SelectorTalla, Input } from '../ui';
import styles from './ModalSolicitudAtelier.module.css';

function ModalSolicitudAtelier({ abierto, onCerrar, producto, color, tallas = [] }) {
  const t = useTranslations('solicitudAtelier');
  const [talla, setTalla] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  const [avisoTalla, setAvisoTalla] = useState(false);
  const [avisoDatos, setAvisoDatos] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const alEnviar = (evento) => {
    evento.preventDefault();
    if (tallas.length > 0 && !talla) {
      setAvisoTalla(true);
      return;
    }
    if (!nombre.trim() || !email.trim()) {
      setAvisoDatos(true);
      return;
    }
    // Placeholder — ver comentario de arriba.
    setEnviado(true);
  };

  return (
    <Modal abierto={abierto} onCerrar={onCerrar}>
      {enviado ? (
        <div className={styles.confirmacion}>
          <h2 className={styles.titulo}>{t('confirmacionTitulo')}</h2>
          <p>{t('confirmacionTexto')}</p>
          <Boton variante="solido" tamano="full" onClick={onCerrar}>{t('cerrar')}</Boton>
        </div>
      ) : (
        <form className={styles.form} onSubmit={alEnviar}>
          <h2 className={styles.titulo}>{t('titulo')}</h2>
          <p className={styles.subtitulo}>{t('subtitulo')}</p>

          <div className={styles.resumen}>
            <p><strong>{t('producto')}:</strong> {producto}</p>
            {color && <p><strong>{t('color')}:</strong> {color}</p>}
          </div>

          {tallas.length > 0 && (
            <div className={styles.campo}>
              <span className={styles.etiqueta}>{t('talla')}</span>
              <SelectorTalla
                tallas={tallas}
                seleccionada={talla}
                onSelect={(valor) => { setTalla(valor); setAvisoTalla(false); }}
              />
              {avisoTalla && <p className={styles.aviso}>{t('avisoTalla')}</p>}
            </div>
          )}

          <Input
            etiqueta={t('nombre')}
            nombre="nombre"
            valor={nombre}
            onChange={(evento) => { setNombre(evento.target.value); setAvisoDatos(false); }}
          />
          <Input
            etiqueta={t('email')}
            tipo="email"
            nombre="email"
            valor={email}
            onChange={(evento) => { setEmail(evento.target.value); setAvisoDatos(false); }}
          />
          <Input
            etiqueta={t('telefono')}
            tipo="tel"
            nombre="telefono"
            valor={telefono}
            onChange={(evento) => setTelefono(evento.target.value)}
          />

          <label className={styles.campo}>
            <span className={styles.etiqueta}>{t('comentario')}</span>
            <textarea
              className={styles.textarea}
              value={comentario}
              onChange={(evento) => setComentario(evento.target.value)}
              placeholder={t('comentarioPlaceholder')}
              rows={3}
            />
          </label>

          {avisoDatos && <p className={styles.aviso}>{t('avisoDatos')}</p>}

          <Boton variante="solido" tamano="full" type="submit">{t('enviar')}</Boton>
        </form>
      )}
    </Modal>
  );
}

export default ModalSolicitudAtelier;
