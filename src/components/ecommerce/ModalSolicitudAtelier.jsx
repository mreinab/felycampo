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
   "resumen" (foto + nombre + color elegido): mismo diseño que
   .panelProducto de RunwayGaleria.jsx ("Consigue el look"), sin su
   botón "+" flotante (aquí no se añade nada a la cesta, es solo
   contexto de la solicitud) y con el color ya elegido debajo del
   nombre en vez de al lado de la foto.
   "tallas" (por defecto TALLAS_DISPONIBLES, ver guiaTallasData.js): la
   talla se pide siempre, no solo si el producto trae el prop — misma
   escala (36 a 64) que el resto del sitio. Al final de ese mismo
   campo, "Guía de tallas" abre GuiaTallas.jsx — mismo mecanismo que
   .filaTalla en FichaProductoAcciones.jsx (Tienda), aquí dentro del
   propio campo de Talla en vez de en una fila aparte.
   Uso:
     <ModalSolicitudAtelier abierto={abierto} onCerrar={...}
       imagen="/img/aurora.jpg" producto="Vestido Aurora" color="Marfil"
       colorHex="#F5F1EE" />
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal, Boton, SelectorTalla, Input } from '../ui';
import { TALLAS_DISPONIBLES, TALLAS_AGOTADAS_EJEMPLO } from './guiaTallasData';
import GuiaTallas from './GuiaTallas';
import styles from './ModalSolicitudAtelier.module.css';

function ModalSolicitudAtelier({ abierto, onCerrar, imagen, producto, color, colorHex, tallas = TALLAS_DISPONIBLES }) {
  const t = useTranslations('solicitudAtelier');
  const tGuia = useTranslations('guiaTallas');
  const [talla, setTalla] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  const [avisoTalla, setAvisoTalla] = useState(false);
  const [avisoDatos, setAvisoDatos] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [guiaAbierta, setGuiaAbierta] = useState(false);

  const alEnviar = (evento) => {
    evento.preventDefault();
    if (!talla) {
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
    <>
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

            <div className={styles.campo}>
              <span className={styles.etiqueta}>{t('talla')}</span>
              <SelectorTalla
                tallas={tallas}
                agotadas={TALLAS_AGOTADAS_EJEMPLO}
                seleccionada={talla}
                onSelect={(valor) => { setTalla(valor); setAvisoTalla(false); }}
              />
              {avisoTalla && <p className={styles.aviso}>{t('avisoTalla')}</p>}
              <div className={styles.filaTalla}>
                <Boton variante="texto" onClick={() => setGuiaAbierta(true)}>{tGuia('abrir')}</Boton>
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
            <Input
              etiqueta={t('telefono')}
              tipo="tel"
              nombre="telefono"
              placeholder={t('telefonoPlaceholder')}
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

      <GuiaTallas abierto={guiaAbierta} onCerrar={() => setGuiaAbierta(false)} />
    </>
  );
}

export default ModalSolicitudAtelier;
