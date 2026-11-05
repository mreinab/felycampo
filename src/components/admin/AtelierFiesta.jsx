'use client';

/* ============================================================
   ATELIER FIESTA — estado del admin — Fely Campo
   Las colecciones y looks de Fiesta mientras se editan en
   /admin/colecciones/fiesta. Vive en el layout del admin (como
   Categorias/Toast), así que lo editado se mantiene al moverse por el
   panel. Parte de los mismos datos que la web (src/datos/atelierFiesta.js)
   y usa las mismas funciones (src/lib/catalogoFiesta.js).

   PARA EL PROGRAMADOR: hoy los cambios viven solo en memoria (se pierden
   al recargar, como el resto del admin). Al conectar la base de datos,
   guardarColeccion / guardarLook / eliminarLook / reordenarColecciones
   son los únicos puntos que tienen que llamar a la API; reciben y
   devuelven objetos con la forma documentada en datos/atelierFiesta.js.
   ============================================================ */

import {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import {
  categoriasAdminFiesta, obtenerColeccionesFiesta, ordenarLooks, slugLook,
} from '@/lib/catalogoFiesta';
import { useCategorias } from './Categorias';

const AtelierFiestaContext = createContext(null);

function AtelierFiestaProvider({ children }) {
  // Copia profunda: el admin nunca muta el array que lee la web.
  const [colecciones, setColecciones] = useState(() => structuredClone(obtenerColeccionesFiesta()));
  const { reordenarCategorias } = useCategorias();

  // El submenú "Fiesta" del menú lateral sigue a las colecciones.
  useEffect(() => {
    reordenarCategorias('fiesta', categoriasAdminFiesta(colecciones));
  }, [colecciones, reordenarCategorias]);

  // Alta (sin id) o edición de una colección. Devuelve su id.
  const guardarColeccion = useCallback((datos) => {
    const id = datos.id || `coleccion-${Date.now()}`;
    setColecciones((actual) => {
      const existe = actual.some((c) => c.id === id);
      const limpia = {
        temporada: String(datos.temporada || '').trim(),
        nombre: datos.nombre.trim(),
        visible: Boolean(datos.visible),
        portada: datos.portada || '',
      };
      if (existe) return actual.map((c) => (c.id === id ? { ...c, ...limpia } : c));
      // Nueva: la primera (la más reciente), sin looks.
      return [{ id, carpeta: id, looks: [], ...limpia }, ...actual];
    });
    return id;
  }, []);

  const reordenarColecciones = useCallback((lista) => setColecciones(lista), []);

  // Alta o edición de un look en "coleccionId" (puede moverse de
  // colección). Si un look publicado cambia de nombre, su URL anterior
  // se guarda en slugsAnteriores para que la web la redirija.
  const guardarLook = useCallback((datos, coleccionId) => {
    const id = datos.id || slugLook(datos.nombre);
    setColecciones((actual) => {
      let anterior = null;
      actual.forEach((c) => c.looks.forEach((l) => { if (l.id === datos.id) anterior = l; }));
      const slugsAnteriores = [...(anterior?.slugsAnteriores || [])];
      if (anterior?.publicado && slugLook(anterior.nombre) !== slugLook(datos.nombre)
        && !slugsAnteriores.includes(slugLook(anterior.nombre))) {
        slugsAnteriores.push(slugLook(anterior.nombre));
      }
      const look = {
        id,
        nombre: datos.nombre.trim(),
        sku: (datos.sku || '').trim(),
        publicado: Boolean(datos.publicado),
        descripcion: { es: (datos.descripcion?.es || '').trim(), en: (datos.descripcion?.en || '').trim() },
        imagenes: datos.imagenes,
        slugsAnteriores: slugsAnteriores.filter((s) => s !== slugLook(datos.nombre)),
      };
      // El look ocupa su sitio por número (Look 1, 2, 3…), sea nuevo,
      // renombrado o movido de colección.
      return actual.map((c) => {
        const sinLook = c.looks.filter((l) => l.id !== datos.id);
        if (c.id !== coleccionId) return { ...c, looks: sinLook };
        return { ...c, looks: ordenarLooks([...sinLook, look]) };
      });
    });
    return id;
  }, []);

  const eliminarLook = useCallback((lookId) => {
    setColecciones((actual) => actual.map((c) => ({ ...c, looks: c.looks.filter((l) => l.id !== lookId) })));
  }, []);

  return (
    <AtelierFiestaContext.Provider value={{
      colecciones, guardarColeccion, reordenarColecciones, guardarLook, eliminarLook,
    }}
    >
      {children}
    </AtelierFiestaContext.Provider>
  );
}

function useAtelierFiesta() {
  const contexto = useContext(AtelierFiestaContext);
  if (!contexto) throw new Error('useAtelierFiesta debe usarse dentro de <AtelierFiestaProvider>');
  return contexto;
}

export { AtelierFiestaProvider, useAtelierFiesta };
