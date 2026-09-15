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
   Talla con stock bajo ("agotadas", ver tiendaProductos.js
   "tallasDisponibles"): SelectorTalla ya no la tacha/deshabilita, solo
   la enseña con menos opacidad — al elegirla, el CTA cambia de
   "Añadir" a "Avísame cuando esté disponible" y abre
   ModalAvisoDisponibilidad en vez de añadir al carrito (ver
   alPulsarAccion). "tallas" es siempre el rango completo (36 a 64,
   ver TALLAS_DISPONIBLES) — el producto decide cuáles de esas están
   agotadas, nunca cuáles enseñar.
   Uso:
     <FichaProductoAcciones nombre="Vestido Aurora" precio="890 €"
       imagen="/img/aurora.jpg" colores={[...]} tallas={TALLAS_DISPONIBLES}
       agotadas={[36, 38, 44, 46]} />
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SelectorColor, SelectorTalla, Boton, BotonGuardar } from '../ui';
import { useCarrito } from '@/context/CarritoContext';
import GuiaTallas from './GuiaTallas';
import ModalAvisoDisponibilidad from './ModalAvisoDisponibilidad';
import styles from './FichaProductoAcciones.module.css';

function FichaProductoAcciones({ nombre, precio, imagen, colores = [], tallas = [], agotadas = [] }) {
  const t = useTranslations('producto');
  const tGuia = useTranslations('guiaTallas');
  const { agregar } = useCarrito();
  const [color, setColor] = useState(colores[0]?.nombre ?? null);
  const [talla, setTalla] = useState(null);
  const [guiaAbierta, setGuiaAbierta] = useState(false);
  const [avisoTalla, setAvisoTalla] = useState(false);
  const [avisoDisponibilidadAbierto, setAvisoDisponibilidadAbierto] = useState(false);

  const faltaTalla = tallas.length > 0 && !talla;
  // Talla elegida pero con stock bajo (ver "agotadas"): no tiene
  // sentido dejar comprarla directamente, así que "Añadir" pasa a ser
  // "Avísame cuando esté disponible" (ver alPulsarAccion).
  const tallaAgotada = talla !== null && agotadas.includes(talla);

  const alPulsarAccion = () => {
    if (faltaTalla) {
      setAvisoTalla(true);
      return;
    }
    if (tallaAgotada) {
      setAvisoDisponibilidadAbierto(true);
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
          <SelectorTalla
            tallas={tallas}
            agotadas={agotadas}
            seleccionada={talla}
            onSelect={(valor) => { setTalla(valor); setAvisoTalla(false); }}
          />
        </div>
      )}

      <div className={styles.bloqueAnadir}>
        <div className={styles.fila}>
          <Boton variante="solido" tamano="full" onClick={alPulsarAccion}>
            {tallaAgotada ? t('avisame') : t('anadirCesta')}
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

      <ModalAvisoDisponibilidad
        abierto={avisoDisponibilidadAbierto}
        onCerrar={() => setAvisoDisponibilidadAbierto(false)}
        imagen={imagen}
        producto={nombre}
        color={color}
        colorHex={colores.find((candidato) => candidato.nombre === color)?.hex}
        talla={talla}
      />
    </div>
  );
}

export default FichaProductoAcciones;
