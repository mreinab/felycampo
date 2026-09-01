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
     <FichaProductoAcciones nombre="Vestido Aurora" precio="890 €"
       imagen="/img/aurora.jpg" colores={[...]} tallas={['S','M','L']} />
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SelectorColor, SelectorTalla, Boton, BotonGuardar } from '../ui';
import { useCarrito } from '@/context/CarritoContext';
import GuiaTallas from './GuiaTallas';
import styles from './FichaProductoAcciones.module.css';

function FichaProductoAcciones({ nombre, precio, imagen, colores = [], tallas = [] }) {
  const t = useTranslations('producto');
  const tGuia = useTranslations('guiaTallas');
  const { agregar } = useCarrito();
  const [color, setColor] = useState(colores[0]?.nombre ?? null);
  const [talla, setTalla] = useState(null);
  const [guiaAbierta, setGuiaAbierta] = useState(false);
  const [avisoTalla, setAvisoTalla] = useState(false);

  const faltaTalla = tallas.length > 0 && !talla;

  const anadirCesta = () => {
    if (faltaTalla) {
      setAvisoTalla(true);
      return;
    }
    setAvisoTalla(false);
    const colorHex = colores.find((candidato) => candidato.nombre === color)?.hex;
    agregar({ nombre, precio, imagen, talla, color, colorHex, tallasDisponibles: tallas });
  };

  return (
    <div className={styles.acciones}>
      {colores.length > 0 && (
        <SelectorColor colores={colores} seleccionado={color} onSelect={setColor} />
      )}

      {tallas.length > 0 && (
        <div className={styles.bloqueTalla}>
          <SelectorTalla tallas={tallas} seleccionada={talla} onSelect={(valor) => { setTalla(valor); setAvisoTalla(false); }} />
        </div>
      )}

      <div className={styles.bloqueAnadir}>
        <div className={styles.fila}>
          <Boton variante="solido" tamano="full" onClick={anadirCesta}>
            {t('anadirCesta')}
          </Boton>
          <BotonGuardar variante="solido" />
        </div>

        {avisoTalla && <p className={styles.avisoTalla}>{t('avisoTalla')}</p>}
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
