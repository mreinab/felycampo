'use client';

/* ============================================================
   FORMULARIO DE LOOK — ATELIER FIESTA — Fely Campo (admin)
   Pide exactamente lo que la web enseña del look (ver
   docs/admin-atelier-fiesta.md):
     1. Colección y nombre — el nombre se propone solo al poner el
        número ("Look 6 26_Opaline") y se puede retocar; da la URL.
     2. Referencia (SKU) — opcional, texto libre ("Ref." en la ficha).
     3. Fotos — mínimo una, reordenables (1.ª tarjeta y ficha, 2.ª al
        pasar el ratón).
     4. Descripción ES/EN — opcional; vacía = texto automático.
     5. Publicado / borrador.
   Al lado, una vista previa de cómo se verá la tarjeta en /atelier/fiesta.
   La validación es la misma que usaría la base de datos
   (validarLookFiesta en lib/catalogoFiesta.js).
   ============================================================ */

import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Boton, Input } from '@/components/ui';
import {
  descripcionAutomatica, lookAProducto, nombreInternoColeccion, nombreSugeridoLook, slugLook, validarLookFiesta, RUTA_FICHA_FIESTA,
} from '@/lib/catalogoFiesta';
import { sinNumeroColeccion } from '@/lib/nombreColeccion';
import PageHeader from './PageHeader';
import FormSeccion from './FormSeccion';
import FotosOrdenables from './FotosOrdenables';
import styles from './AdminAtelierFiesta.module.css';

const PAPELES_FOTO = ['Tarjeta y ficha (principal)', 'Al pasar el ratón'];

function numeroDeNombre(nombre) {
  return (nombre || '').match(/^Look (\d+)/)?.[1] || '';
}

function FormularioLookFiesta({
  look, coleccionIdInicial, colecciones, onGuardar, onCancelar, onEliminar,
}) {
  const esNuevo = !look;
  const [coleccionId, setColeccionId] = useState(coleccionIdInicial);
  const [numero, setNumero] = useState(numeroDeNombre(look?.nombre));
  const [nombre, setNombre] = useState(look?.nombre || '');
  // Mientras no se toque el nombre a mano, sigue al número y la colección.
  const [nombreManual, setNombreManual] = useState(!esNuevo);
  const [sku, setSku] = useState(look?.sku || '');
  const [imagenes, setImagenes] = useState(look?.imagenes || []);
  const [descripcion, setDescripcion] = useState({ es: look?.descripcion?.es || '', en: look?.descripcion?.en || '' });
  const [publicado, setPublicado] = useState(look ? look.publicado : true);
  const [errores, setErrores] = useState([]);

  const coleccion = colecciones.find((c) => c.id === coleccionId) || colecciones[0];

  function cambiarNumero(valor) {
    const limpio = valor.replace(/\D/g, '');
    setNumero(limpio);
    if (!nombreManual) setNombre(nombreSugeridoLook(coleccion, limpio));
  }

  function cambiarColeccion(id) {
    setColeccionId(id);
    if (!nombreManual) setNombre(nombreSugeridoLook(colecciones.find((c) => c.id === id), numero));
  }

  const datos = {
    id: look?.id, coleccionId, nombre, sku, imagenes, descripcion, publicado,
  };
  const slug = slugLook(nombre);
  const cambiaUrl = !esNuevo && look.publicado && slugLook(look.nombre) !== slug;
  const vistaPrevia = useMemo(() => (coleccion ? lookAProducto({ ...datos, nombre: nombre || 'Look' }, coleccion) : null), [coleccion, nombre, imagenes, sku]); // eslint-disable-line react-hooks/exhaustive-deps

  function guardar(evento) {
    evento.preventDefault();
    const encontrados = validarLookFiesta(datos, colecciones);
    setErrores(encontrados);
    if (encontrados.length === 0) onGuardar(datos, coleccionId);
  }

  return (
    <form onSubmit={guardar} noValidate>
      <PageHeader
        titulo={esNuevo ? 'Nuevo look' : sinNumeroColeccion(look.nombre)}
        subtitulo={`Atelier Fiesta · ${coleccion ? sinNumeroColeccion(nombreInternoColeccion(coleccion)) : ''}`}
      >
        {!esNuevo && look.publicado && (
          <Boton variante="contorno" href={`/es${RUTA_FICHA_FIESTA}/${slugLook(look.nombre)}`}>
            <ExternalLink size={14} aria-hidden="true" /> Ver en la web
          </Boton>
        )}
      </PageHeader>

      <div className={styles.formulario}>
        <div className={styles.columnaCampos}>
          <FormSeccion numero={1} titulo="Colección y nombre" descripcion="El nombre es el que se ve en la web y forma la URL del look.">
            <div className={styles.pila}>
            <label className={styles.campo}>
              <span className={styles.etiqueta}>Colección</span>
              <select className={styles.select} value={coleccionId} onChange={(evento) => cambiarColeccion(evento.target.value)}>
                {colecciones.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}{c.temporada ? ` (${c.temporada})` : ''}{c.visible ? '' : ' · oculta'}
                  </option>
                ))}
              </select>
            </label>
            <div className={styles.fila}>
              <Input etiqueta="Número de look" nombre="numero" valor={numero} onChange={(evento) => cambiarNumero(evento.target.value)} placeholder="6" />
              <Input
                etiqueta="Nombre en la web"
                nombre="nombre"
                valor={nombre}
                onChange={(evento) => { setNombre(evento.target.value); setNombreManual(true); }}
                placeholder="Look 6 26_Opaline"
              />
            </div>
            <p className={styles.ayuda}>
              URL: <strong>{RUTA_FICHA_FIESTA}/{slug || '…'}</strong>
              {' · '}En la web el número de temporada no se ve: «{sinNumeroColeccion(nombre) || '…'}».
            </p>
            {cambiaUrl && (
              <p className={styles.aviso}>
                Este look ya está publicado: al cambiar el nombre cambia su URL. La antigua
                ({slugLook(look.nombre)}) redirigirá a la nueva, así no se pierden visitas ni posicionamiento.
              </p>
            )}
            </div>
          </FormSeccion>

          <FormSeccion numero={2} titulo="Referencia" descripcion="Opcional. En la ficha sale como «Ref.». Si son varias piezas, sepáralas con «/».">
            <div className={styles.pila}>
            <Input etiqueta="Referencia (SKU)" nombre="sku" valor={sku} onChange={(evento) => setSku(evento.target.value)} placeholder="18138 T / 18139 F" />
            </div>
          </FormSeccion>

          <FormSeccion numero={3} titulo="Fotos" descripcion="Mínimo una. La 1.ª es la de la tarjeta y la principal de la ficha; la 2.ª aparece al pasar el ratón por la tarjeta.">
            <div className={styles.pila}>
            <FotosOrdenables fotos={imagenes} onChange={setImagenes} papeles={PAPELES_FOTO} alt={sinNumeroColeccion(nombre)} />
            </div>
          </FormSeccion>

          <FormSeccion numero={4} titulo="Descripción" descripcion="Opcional. Si la dejas vacía, la ficha muestra el texto automático (en gris como ejemplo).">
            <div className={styles.pila}>
            <label className={styles.campo}>
              <span className={styles.etiqueta}>Español</span>
              <textarea
                className={styles.textarea}
                rows={4}
                value={descripcion.es}
                onChange={(evento) => setDescripcion((d) => ({ ...d, es: evento.target.value }))}
                placeholder={coleccion ? descripcionAutomatica({ sku }, coleccion) : ''}
              />
            </label>
            <label className={styles.campo}>
              <span className={styles.etiqueta}>Inglés</span>
              <textarea
                className={styles.textarea}
                rows={4}
                value={descripcion.en}
                onChange={(evento) => setDescripcion((d) => ({ ...d, en: evento.target.value }))}
                placeholder="Si la dejas vacía, en inglés se muestra la descripción en español."
              />
            </label>
            </div>
          </FormSeccion>

          <FormSeccion numero={5} titulo="Publicación" descripcion="Un look en borrador no aparece en ningún sitio de la web.">
            <div className={styles.pila}>
            <div className={styles.opciones} role="radiogroup" aria-label="Publicación">
              <label className={styles.opcion}>
                <input type="radio" name="publicado" checked={publicado} onChange={() => setPublicado(true)} />
                Publicado
              </label>
              <label className={styles.opcion}>
                <input type="radio" name="publicado" checked={!publicado} onChange={() => setPublicado(false)} />
                Borrador
              </label>
            </div>
            </div>
          </FormSeccion>

          {errores.length > 0 && (
            <ul className={styles.errores} role="alert">
              {errores.map((error) => <li key={error}>{error}</li>)}
            </ul>
          )}

          <div className={styles.botones}>
            <Boton variante="solido" type="submit">{esNuevo ? 'Crear look' : 'Guardar cambios'}</Boton>
            <Boton variante="contorno" onClick={onCancelar}>Cancelar</Boton>
            {!esNuevo && (
              <button type="button" className={styles.eliminar} onClick={onEliminar}>Eliminar look</button>
            )}
          </div>
        </div>

        {/* Vista previa: así se verá en la cuadrícula de /atelier/fiesta. */}
        <aside className={styles.vistaPrevia} aria-label="Vista previa en la web">
          <p className={styles.etiqueta}>Así se verá en la web</p>
          <div className={styles.tarjeta}>
            {vistaPrevia?.imagen
              ? <img src={vistaPrevia.imagen} alt="" className={styles.tarjetaImagen} />
              : <div className={styles.tarjetaVacia}>Sin foto</div>}
            <p className={styles.tarjetaTitulo}>{vistaPrevia?.titulo || sinNumeroColeccion(nombre) || 'Look'}</p>
            {vistaPrevia?.subtitulo && <p className={styles.tarjetaSubtitulo}>{vistaPrevia.subtitulo}</p>}
          </div>
          <p className={styles.ayuda}>
            Título en Google: «{sinNumeroColeccion(nombre) || '…'} | Vestido de fiesta a medida | Fely Campo»
          </p>
          {!publicado && <p className={styles.aviso}>En borrador: no se verá en la web.</p>}
        </aside>
      </div>
    </form>
  );
}

export default FormularioLookFiesta;
