'use client';

/* ============================================================
   PÁGINAS EDITABLES — estado del admin — Fely Campo
   El contenido publicado de las páginas que se editan con EditorPagina
   (inicio, Sobre Fely, Talleres) mientras se trabaja en el admin. Parte
   de los mismos datos que la web (lib/landing.js, lib/sobreFely.js,
   lib/talleres.js) y vive en el layout del panel, así que lo publicado
   se mantiene al moverse por el admin. Sin base de datos todavía: se
   pierde al recargar.
   PARA EL PROGRAMADOR: guardar(id, datos) es la acción que debe llamar a
   la API (ver docs/admin-paginas.md).
   ============================================================ */

import {
  createContext, useCallback, useContext, useState,
} from 'react';
import { obtenerLanding, PARAMETRO_PREVIA_LANDING } from '@/lib/landing';
import { ID_PAGINA_SOBRE_FELY, obtenerSobreFely } from '@/lib/sobreFely';
import { ID_PAGINA_TALLERES, obtenerTalleres } from '@/lib/talleres';

const PaginasContext = createContext(null);

function PaginasProvider({ children }) {
  // Copia profunda: el admin nunca muta los objetos que lee la web.
  const [paginas, setPaginas] = useState(() => structuredClone({
    [PARAMETRO_PREVIA_LANDING]: obtenerLanding(),
    [ID_PAGINA_SOBRE_FELY]: obtenerSobreFely(),
    [ID_PAGINA_TALLERES]: obtenerTalleres(),
  }));

  const guardar = useCallback((id, datos) => {
    setPaginas((actual) => ({ ...actual, [id]: structuredClone(datos) }));
  }, []);

  return (
    <PaginasContext.Provider value={{ paginas, guardar }}>
      {children}
    </PaginasContext.Provider>
  );
}

// Lo publicado de una página y cómo publicar cambios.
function usePagina(id) {
  const contexto = useContext(PaginasContext);
  if (!contexto) throw new Error('usePagina debe usarse dentro de <PaginasProvider>');
  return {
    publicado: contexto.paginas[id],
    guardar: (datos) => contexto.guardar(id, datos),
  };
}

export { PaginasProvider, usePagina };
