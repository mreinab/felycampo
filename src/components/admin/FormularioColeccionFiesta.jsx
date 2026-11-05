'use client';

/* ============================================================
   FORMULARIO DE COLECCIÓN — ATELIER FIESTA — Fely Campo (admin)
   Nombre, temporada, visible en la web y portada (solo para el admin).
   El orden se cambia arrastrando en el listado de colecciones. Ver
   docs/admin-atelier-fiesta.md.
   ============================================================ */

import { useState } from 'react';
import { Boton, Input } from '@/components/ui';
import { nombreInternoColeccion, validarColeccionFiesta } from '@/lib/catalogoFiesta';
import { sinNumeroColeccion } from '@/lib/nombreColeccion';
import PageHeader from './PageHeader';
import FormSeccion from './FormSeccion';
import FotosOrdenables from './FotosOrdenables';
import styles from './AdminAtelierFiesta.module.css';

function FormularioColeccionFiesta({
  coleccion, colecciones, onGuardar, onCancelar,
}) {
  const esNueva = !coleccion;
  const [nombre, setNombre] = useState(coleccion?.nombre || '');
  const [temporada, setTemporada] = useState(coleccion?.temporada || '');
  const [visible, setVisible] = useState(coleccion ? coleccion.visible : true);
  const [portada, setPortada] = useState(coleccion?.portada ? [coleccion.portada] : []);
  const [errores, setErrores] = useState([]);

  const datos = {
    id: coleccion?.id, nombre, temporada, visible, portada: portada[0] || '',
  };
  const interno = nombreInternoColeccion(datos);
  const cambiaNombre = !esNueva && interno !== nombreInternoColeccion(coleccion);
  const conLooks = (coleccion?.looks || []).length;

  function guardar(evento) {
    evento.preventDefault();
    const encontrados = validarColeccionFiesta(datos, colecciones);
    setErrores(encontrados);
    if (encontrados.length === 0) onGuardar(datos);
  }

  return (
    <form onSubmit={guardar} noValidate>
      <PageHeader
        titulo={esNueva ? 'Nueva colección' : sinNumeroColeccion(nombreInternoColeccion(coleccion))}
        subtitulo="Atelier Fiesta · colección"
      />

      <div className={styles.columnaCampos}>
        <FormSeccion numero={1} titulo="Nombre y temporada" descripcion="En la web solo se ve el nombre. La temporada ordena y distingue colecciones con el mismo nombre.">
            <div className={styles.pila}>
          <div className={styles.fila}>
            <Input etiqueta="Nombre" nombre="nombre" valor={nombre} onChange={(evento) => setNombre(evento.target.value)} placeholder="Opaline" />
            <Input etiqueta="Temporada (opcional)" nombre="temporada" valor={temporada} onChange={(evento) => setTemporada(evento.target.value.replace(/\D/g, '').slice(0, 2))} placeholder="26" />
          </div>
          <p className={styles.ayuda}>
            En la web: <strong>«{sinNumeroColeccion(interno) || '…'}»</strong> · nombre interno (filtro y enlaces): {interno || '…'}
          </p>
          {cambiaNombre && conLooks > 0 && (
            <p className={styles.aviso}>
              Los {conLooks} looks de esta colección mantienen su nombre y su URL. Si quieres que su nombre
              cambie también, edítalos uno a uno (su URL antigua redirigirá a la nueva).
            </p>
          )}
            </div>
        </FormSeccion>

        <FormSeccion numero={2} titulo="Visible en la web" descripcion="Si está oculta, no sale en el listado ni en el filtro de /atelier/fiesta. Sus looks publicados siguen teniendo su propia página.">
            <div className={styles.pila}>
          <div className={styles.opciones} role="radiogroup" aria-label="Visible en la web">
            <label className={styles.opcion}>
              <input type="radio" name="visible" checked={visible} onChange={() => setVisible(true)} />
              Visible
            </label>
            <label className={styles.opcion}>
              <input type="radio" name="visible" checked={!visible} onChange={() => setVisible(false)} />
              Oculta
            </label>
          </div>
            </div>
        </FormSeccion>

        <FormSeccion numero={3} titulo="Portada" descripcion="Opcional. Solo se usa aquí, en el admin, para reconocer la colección.">
            <div className={styles.pila}>
          <FotosOrdenables fotos={portada} onChange={(fotos) => setPortada(fotos.slice(-1))} papeles={['Portada']} />
            </div>
        </FormSeccion>

        {errores.length > 0 && (
          <ul className={styles.errores} role="alert">
            {errores.map((error) => <li key={error}>{error}</li>)}
          </ul>
        )}

        <div className={styles.botones}>
          <Boton variante="solido" type="submit">{esNueva ? 'Crear colección' : 'Guardar cambios'}</Boton>
          <Boton variante="contorno" onClick={onCancelar}>Cancelar</Boton>
        </div>
      </div>
    </form>
  );
}

export default FormularioColeccionFiesta;
