// FichaProductoAcciones.jsx

'use client';

/* ============================================================
   ACCIONES DE FICHA DE PRODUCTO — Fely Campo
   Panel interactivo de la ficha de producto (/tienda/[producto]):
   color + talla (SelectorColor/SelectorTalla, ya existentes) y el
   CTA de compra — el resto de la ficha (galería, acordeón, "también
   te puede interesar") vive directamente en page.js porque no
   necesita estado propio. Aparte porque page.js es un Server
   Component (resuelve el producto por slug) y esto sí necesita
   useState — no se puede repartir estado de un Server Component.
   Uso:
     <FichaProductoAcciones nombre="Vestido Aurora" colores={[...]} tallas={['S','M','L']} />
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SelectorColor, SelectorTalla, Boton, BotonGuardar } from '../ui';
import GuiaTallas from './GuiaTallas';
import styles from './FichaProductoAcciones.module.css';

function FichaProductoAcciones({ colores = [], tallas = [] }) {
  const t = useTranslations('producto');
  const tGuia = useTranslations('guiaTallas');
  const [color, setColor] = useState(colores[0]?.nombre ?? null);
  const [talla, setTalla] = useState(null);
  const [guiaAbierta, setGuiaAbierta] = useState(false);

  return (
    <div className={styles.acciones}>
      {colores.length > 0 && (
        <SelectorColor colores={colores} seleccionado={color} onSelect={setColor} />
      )}

      {tallas.length > 0 && (
        <div className={styles.bloqueTalla}>
          <SelectorTalla tallas={tallas} seleccionada={talla} onSelect={setTalla} />
        </div>
      )}

      <div className={styles.fila}>
        <Boton variante="solido" tamano="full" desactivado={tallas.length > 0 && !talla}>
          {t('anadirCesta')}
        </Boton>
        <BotonGuardar variante="solido" />
      </div>

      {tallas.length > 0 && (
        <div className={styles.filaTalla}>
          <Boton variante="texto" onClick={() => setGuiaAbierta(true)}>{tGuia('abrir')}</Boton>
        </div>
      )}

      <GuiaTallas abierto={guiaAbierta} onCerrar={() => setGuiaAbierta(false)} />
    </div>
  );
}

export default FichaProductoAcciones;
