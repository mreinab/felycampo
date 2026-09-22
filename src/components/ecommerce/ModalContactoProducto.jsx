// ModalContactoProducto.jsx

'use client';

/* ============================================================
   CONTACTO DE PRODUCTO — Fely Campo
   Modal (ver ui/Modal.jsx) que abre FichaProductoAcciones.jsx /
   GaleriaProductoLightbox.jsx al pulsar "Contacta con nosotros" en la
   ficha de Prêt-à-porter — mismo patrón que ModalSolicitudAtelier.jsx
   (mismo Modal, misma maquetación de título/subtítulo/resumen/campos),
   sin talla (Prêt-à-porter no enseña tallas, a diferencia de Atelier):
   solo nombre + email. Antes era ModalAvisoDisponibilidad.jsx (abría
   al elegir una talla agotada); Prêt-à-porter ya no vende con precio
   ni tallas online, así que ese flujo pasa a ser un contacto genérico
   sobre la pieza, sin condicionarlo a ninguna talla — ver historial.
   PLACEHOLDER a propósito, sin backend real todavía (mismo criterio
   que ModalSolicitudAtelier.jsx): "enviar" no manda nada a ningún
   sitio, solo pasa a la pantalla de confirmación.
   Uso:
     <ModalContactoProducto abierto={abierto} onCerrar={...}
       imagen="/img/aurora.jpg" producto="Vestido Aurora" color="Marfil"
       colorHex="#F5F1EE" />
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal, Boton, Input } from '../ui';
import styles from './ModalContactoProducto.module.css';

function ModalContactoProducto({ abierto, onCerrar, imagen, producto, color, colorHex }) {
  const t = useTranslations('contactoProducto');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [avisoDatos, setAvisoDatos] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const alEnviar = (evento) => {
    evento.preventDefault();
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
            {imagen && (
              <img src={imagen} alt="" className={styles.resumenImagen} />
            )}
            <div className={styles.resumenInfo}>
              <p className={styles.resumenNombre}>{producto}</p>
              {color && (
                <p className={styles.resumenColor}>
                  {colorHex && <span className={styles.resumenColorMuestra} style={{ background: colorHex }} />}
                  {color}
                </p>
              )}
            </div>
          </div>

          <Input
            etiqueta={t('nombre')}
            nombre="nombre"
            placeholder={t('nombrePlaceholder')}
            valor={nombre}
            onChange={(evento) => { setNombre(evento.target.value); setAvisoDatos(false); }}
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
    </Modal>
  );
}

export default ModalContactoProducto;
