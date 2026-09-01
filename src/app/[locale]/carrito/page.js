'use client';

/* ============================================================
   BOLSA (/carrito) — Fely Campo
   Dos columnas en escritorio: productos añadidos a la izquierda (en
   cuadrícula, ver TarjetaCarrito), resumen del pedido a la derecha,
   pegado arriba mientras la columna de productos es más alta que él
   (mismo patrón que la ficha de producto, ver
   tienda/[producto]/page.module.css). Apiladas en mobile: productos
   primero, resumen debajo.

   'use client' en el propio page.js (no un Server Component
   delegando en un componente cliente aparte) porque toda la página
   depende de CarritoContext — no hay parte server-only que aislar
   (a diferencia de tienda/[producto], que sí resuelve el producto por
   slug en el servidor).
   ============================================================ */

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBasket, User } from 'lucide-react';
import { Boton } from '@/components/ui';
import { TarjetaCarrito, PanelInfoEnvios } from '@/components/ecommerce';
import { useCarrito } from '@/context/CarritoContext';
import { formatearPrecio, parsearPrecio } from '@/lib/precio';
import styles from './page.module.css';

export default function Pagina() {
  const t = useTranslations('carrito');
  const locale = useLocale();
  const { lineas, cantidadTotal, subtotal, quitar, actualizarCantidad, actualizarTalla } = useCarrito();
  const [panelEnviosAbierto, setPanelEnviosAbierto] = useState(false);

  // El coste de envío no se calcula todavía (sin backend real) — se
  // muestra "A calcular" y no entra en el total.
  const total = subtotal;

  return (
    <section className="seccion contenedor cart">
      {lineas.length === 0 ? (
        <div className={styles.vacio}>
          <ShoppingBasket className={styles.vacioIcono} strokeWidth={1} />
          <p className={styles.vacioTexto}>{t('vacio')}</p>
          <Boton variante="solido" tamano="m" href={`/${locale}/tienda`}>{t('explorarTienda')}</Boton>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.cuadricula}>
            {lineas.map((linea) => (
              <TarjetaCarrito
                key={linea.id}
                imagen={linea.imagen}
                nombre={linea.nombre}
                precio={linea.precio}
                talla={linea.talla}
                tallasDisponibles={linea.tallasDisponibles}
                color={linea.color}
                colorHex={linea.colorHex}
                cantidad={linea.cantidad}
                onCantidad={(cantidad) => actualizarCantidad(linea.id, cantidad)}
                onTalla={(talla) => actualizarTalla(linea.id, talla)}
                onQuitar={() => quitar(linea.id)}
              />
            ))}
          </div>

          <aside className={styles.resumen}>
            <h2 className={styles.resumenTitulo}>{t('tuPedido')} ({cantidadTotal})</h2>

            <div className={styles.costes}>
              {lineas.map((linea) => (
                <div key={linea.id} className={styles.filaCoste}>
                  <span>{linea.nombre} × {linea.cantidad}</span>
                  <span>{formatearPrecio(parsearPrecio(linea.precio) * linea.cantidad)}</span>
                </div>
              ))}
              <div className={styles.filaCoste}>
                <span>{t('envio')}</span>
                <span>{t('aCalcular')}</span>
              </div>
              <div className={`${styles.filaCoste} ${styles.filaTotal}`}>
                <span>{t('total')}</span>
                <span>{formatearPrecio(total)}</span>
              </div>
            </div>

            <div className={styles.filaPedir}>
              <Boton variante="solido" tamano="full">{t('iniciarPedido')}</Boton>

              <a href={`/${locale}/mi-cuenta`} className={styles.loginPrompt}>
                <div className={styles.loginPromptGrupo}>
                  <User className={styles.loginPromptIcono} strokeWidth={1.5} />
                  <span className={styles.loginPromptPregunta}>{t('loginPromptPregunta')}</span>
                </div>
                {t('loginPromptCta')}
              </a>
            </div>

            <button type="button" className={styles.infoEnvio} onClick={() => setPanelEnviosAbierto(true)}>
              <span className={styles.infoEnvioSubrayado}>{t('infoEnvioSubrayado')} {t('infoEnvioResto')}</span>
            </button>
          </aside>
        </div>
      )}

      <PanelInfoEnvios abierto={panelEnviosAbierto} onCerrar={() => setPanelEnviosAbierto(false)} />
    </section>
  );
}
