'use client';

/* ============================================================
   CATEGORÍAS — Fely Campo (admin)
   Estado compartido (mismo patrón que Toast.jsx) para que las
   categorías creadas en /admin/categorias aparezcan al instante como
   sub-nivel del sidebar bajo cada tipo de producto — sin esto, cada
   página tendría su propia copia de categoriasMock y no se verían
   los cambios entre pantallas.
   ============================================================ */

import { createContext, useCallback, useContext, useState } from 'react';
import { categoriasMock } from './mockData';

const CategoriasContext = createContext(null);

function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState(categoriasMock);

  const anadirCategoria = useCallback((tipo, nombre) => {
    setCategorias((actual) => ({
      ...actual,
      [tipo]: [...actual[tipo], { id: `cat${Date.now()}`, nombre, visible: true, orden: actual[tipo].length + 1 }],
    }));
  }, []);

  const alternarVisible = useCallback((tipo, id) => {
    setCategorias((actual) => ({
      ...actual,
      [tipo]: actual[tipo].map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)),
    }));
  }, []);

  const reordenarCategorias = useCallback((tipo, nuevaLista) => {
    setCategorias((actual) => ({ ...actual, [tipo]: nuevaLista }));
  }, []);

  return (
    <CategoriasContext.Provider value={{
      categorias, anadirCategoria, alternarVisible, reordenarCategorias,
    }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}

function useCategorias() {
  const contexto = useContext(CategoriasContext);
  if (!contexto) throw new Error('useCategorias debe usarse dentro de <CategoriasProvider>');
  return contexto;
}

export { CategoriasProvider, useCategorias };
