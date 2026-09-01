'use client';

/* ============================================================
   CONTEXTO DE CARRITO — Fely Campo
   Estado del carrito compartido por toda la app (Navbar, ficha de
   producto, página /carrito) — sin backend real todavía, vive solo en
   memoria del cliente y se pierde al recargar, igual que el resto de
   "datos de ejemplo" del proyecto (productosEjemplo.js). Monta en
   src/app/[locale]/layout.js, envolviendo Navbar + main + Footer —
   único ancestro común entre el Navbar (contador, panel) y cualquier
   página de producto (que añade líneas).

   Cada línea se identifica por nombre+talla+color (ver idLinea):
   añadir el mismo producto con la misma combinación solo sube la
   cantidad, no duplica la fila.
   ============================================================ */

import { createContext, useContext, useEffect, useState } from 'react';
import { parsearPrecio } from '@/lib/precio';

const CarritoContext = createContext(null);
const CLAVE_STORAGE = 'fely-campo-carrito';

function idLinea({ nombre, talla, color }) {
  return [nombre, talla, color].filter(Boolean).join('__');
}

export function CarritoProvider({ children }) {
  const [lineas, setLineas] = useState([]);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  // Persistencia mínima en localStorage — imprescindible aquí: el sitio
  // entero enlaza con <a href> normales, nunca next/link (ver Navbar.jsx,
  // Boton.jsx), así que ir a /carrito — o a cualquier otra página — es
  // SIEMPRE una recarga completa, no una navegación cliente. Sin esto,
  // CarritoProvider se remontaría desde cero en cada clic y el carrito
  // se vaciaría solo por navegar.
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_STORAGE);
      if (guardado) setLineas(JSON.parse(guardado));
    } catch {
      // localStorage no disponible (privado, bloqueado...) — el carrito
      // sigue funcionando durante la carga actual, solo no sobrevive a
      // la próxima navegación.
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lineas));
    } catch {
      // Ver comentario de arriba.
    }
  }, [lineas, hidratado]);

  const agregar = ({ nombre, precio, imagen, talla, color, colorHex, tallasDisponibles }) => {
    const id = idLinea({ nombre, talla, color });
    setLineas((actuales) => {
      const existente = actuales.find((linea) => linea.id === id);
      if (existente) {
        return actuales.map((linea) => (linea.id === id ? { ...linea, cantidad: linea.cantidad + 1 } : linea));
      }
      return [...actuales, { id, nombre, precio, imagen, talla, color, colorHex, tallasDisponibles, cantidad: 1 }];
    });
    setPanelAbierto(true);
  };

  const quitar = (id) => setLineas((actuales) => actuales.filter((linea) => linea.id !== id));

  const actualizarCantidad = (id, cantidad) => {
    setLineas((actuales) => actuales.map((linea) => (linea.id === id ? { ...linea, cantidad: Math.max(1, cantidad) } : linea)));
  };

  // Cambiar la talla desde /carrito no re-agrupa con otra línea ya
  // existente con esa misma combinación — caso límite que no hace
  // falta cubrir sin backend real detrás.
  const actualizarTalla = (id, talla) => {
    setLineas((actuales) => actuales.map((linea) => (linea.id === id ? { ...linea, talla } : linea)));
  };

  const cerrarPanel = () => setPanelAbierto(false);

  const cantidadTotal = lineas.reduce((total, linea) => total + linea.cantidad, 0);
  const subtotal = lineas.reduce((total, linea) => total + parsearPrecio(linea.precio) * linea.cantidad, 0);

  const valor = {
    lineas,
    agregar,
    quitar,
    actualizarCantidad,
    actualizarTalla,
    cantidadTotal,
    subtotal,
    panelAbierto,
    cerrarPanel,
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>.');
  return contexto;
}
