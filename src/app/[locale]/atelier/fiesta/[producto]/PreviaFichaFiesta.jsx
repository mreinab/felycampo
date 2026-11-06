'use client';

/* ============================================================
   VISTA PREVIA DE UN LOOK DE FIESTA — Fely Campo
   Con ?previa=fiesta-look, la ficha del look se pinta con el borrador
   que dejó el admin (/admin/colecciones/fiesta) en este navegador:
   { look, coleccion } (ver lib/previa.js). Se actualiza sola mientras
   se edita. Sin borrador, se vuelve al listado de Fiesta.
   ============================================================ */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BarraPrevia from '@/components/layout/BarraPrevia';
import FichaAtelierCuerpo from '@/components/ecommerce/FichaAtelierCuerpo';
import { ID_PREVIA_LOOK_FIESTA, lookAProducto } from '@/lib/catalogoFiesta';
import { sinNumeroColeccion } from '@/lib/nombreColeccion';
import { clavePrevia } from '@/lib/previa';

function leer() {
  try {
    return JSON.parse(localStorage.getItem(clavePrevia(ID_PREVIA_LOOK_FIESTA)) || 'null');
  } catch {
    return null;
  }
}

// "publicados": los looks publicados (del servidor), para los relacionados.
function PreviaFichaFiesta({ locale, textos, publicados = [] }) {
  const router = useRouter();
  const [borrador, setBorrador] = useState(null);
  const [comprobado, setComprobado] = useState(false);

  useEffect(() => {
    setBorrador(leer());
    setComprobado(true);
    const alCambiar = (evento) => {
      if (evento.key === clavePrevia(ID_PREVIA_LOOK_FIESTA)) setBorrador(leer());
    };
    window.addEventListener('storage', alCambiar);
    return () => window.removeEventListener('storage', alCambiar);
  }, []);

  useEffect(() => {
    if (comprobado && !borrador) router.replace(`/${locale}/atelier/fiesta`);
  }, [comprobado, borrador, router, locale]);

  if (!borrador?.look || !borrador?.coleccion) return null;

  const { look, coleccion } = borrador;
  const producto = lookAProducto({ ...look, nombre: look.nombre || 'Look' }, coleccion);
  const descripcion = locale === 'en' && producto.descripcionEn ? producto.descripcionEn : producto.descripcion;
  // Los mismos relacionados que la ficha de verdad: otros looks publicados.
  const relacionados = publicados.filter((otro) => otro.id !== look.id).slice(0, 10);

  return (
    <FichaAtelierCuerpo
      producto={producto}
      nombreVisible={sinNumeroColeccion(producto.nombre)}
      descripcion={descripcion}
      relacionados={relacionados}
      seccion="fiesta"
      locale={locale}
      textos={textos}
      despues={<BarraPrevia editor={`/admin/colecciones/fiesta?categoria=${coleccion.id}&look=${look.id || 'nuevo'}`} />}
    />
  );
}

export default PreviaFichaFiesta;
