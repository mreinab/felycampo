// GaleriaVosotras.jsx

'use client';

/* ============================================================
   GALERÍA DE VOSOTRAS — Fely Campo
   Cuadrícula de looks de clientas para /atelier/vosotras — a
   diferencia de Novias/Fiesta (CuadriculaProductos: catálogo de
   producto con precio/talla/color), esta sección es la comunidad:
   fotos que las clientas comparten llevando piezas de Fely Campo, no
   productos en venta. Por eso no lleva PanelFiltros (sin talla/color/
   precio que filtrar) ni CuadriculaProductos.

   Cada tile de la cuadrícula es un "look": su propia mini-galería de
   fotos (CarruselFotos.jsx, ui/ — cross-fade + barra de progreso al
   hover, mismo componente que ResenasClientes.jsx) más un botón "+"
   (40px, esquina inferior derecha, ver .abrirBtn) que — igual que
   clicar la propia foto — abre un lightbox a pantalla completa con esa
   mini-galería. Las fotos son reales (público/img/Clientes/CLIENTAS,
   ver FOTOS_INVITADAS/FOTOS_NOVIAS más abajo): cada array interior es
   UN grupo de fotos que a simple vista parecen de la misma clienta/
   misma boda (mismo vestido, mismo acompañante, mismo lugar) — se
   agruparon a mano revisando las fotos una a una, no hay metadato real
   que las una todavía. nombre/comentario/producto vinculado siguen
   siendo PLACEHOLDER (no hay reseña real de estas clientas), ver
   comentario de LOOKS más abajo.

   El lightbox reutiliza el mecanismo de RunwayGaleria.jsx (mismo
   .lightbox/.abierta, cabecera con logo + cerrar, pista con scroll-
   snap + rueda con cooldown, franja de miniaturas a la izquierda para
   saltar entre fotos sin cerrar, y el propio bloque "Consigue el look"
   — .panelProductosBloque, productos reales de productosEjemplo.js
   enlazando a su ficha de Tienda, mismo criterio que "productos" en
   colecciones.js) pero con contenido propio: las miniaturas son las
   fotos DE ESE MISMO look (no otros looks de la cuadrícula — no hay
   forma de saltar de un look a otro sin cerrar, a diferencia de
   RunwayGaleria con sus looks de colección), y encima de "Consigue el
   look" el panel muestra el nombre de la clienta + su comentario, no
   "Look X" — mismo tratamiento tipográfico que .pie de
   ResenasClientes.module.css (cita + nombre).

   La propia CabeceraSeccion vive aquí dentro (no en page.js, que solo
   le reenvía subtitleKey/titleKey/descriptionKey/margenSuperiorAmplio)
   — mismo criterio que CuadriculaProductos.jsx con su toggle de
   densidad: el toggle "Invitadas"/"Novias" (.toggleCategoria, mismo
   lenguaje visual que .toggleBoton ahí — subrayado en el activo) sale
   como "children" de CabeceraSeccion y filtra LOOKS_EJEMPLO por su
   campo "categoria" (real: viene de qué carpeta sale cada grupo de
   fotos, FOTOS_INVITADAS o FOTOS_NOVIAS, ver más abajo).
   Uso:
     <GaleriaVosotras titleKey="..." />
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Plus, X } from 'lucide-react';
import { CabeceraSeccion, CarruselFotos } from '../ui';
import useEnVista from '@/hooks/useEnVista';
import { RESENAS_EJEMPLO } from './resenasEjemplo';
import { fiestaProductos } from './fiestaProductos';
import { slugify } from '@/lib/slugify';
import { FOTOS_INVITADAS, FOTOS_NOVIAS } from './vosotrasFotos';
import styles from './GaleriaVosotras.module.css';

// "Consigue el look" — vínculo aún de mentira (no hay backend que sepa
// qué prenda real lleva cada clienta), pero en vez de productosEjemplo.js
// (nombre/imagen inventados, sin ficha real detrás) apunta siempre a la
// misma pieza real del catálogo de Fiesta (mismo objeto que ya vende
// /atelier/fiesta/look-1-ss27, ver fiestaProductos.js) — así el enlace
// aterriza en una ficha de producto que existe de verdad.
const PRODUCTO_VINCULADO = fiestaProductos.find((p) => p.nombre === 'Look 1 SS27');

// Cada look: su propia mini-galería (grupo real de fotos, portada
// siempre primera) + nombre/comentario (reutiliza RESENAS_EJEMPLO,
// resenasEjemplo.js, en vez de inventar reseñas reales de estas
// clientas concretas — no hay backend todavía que las capture) + el
// producto vinculado de arriba.
function construirLooks(gruposFotos, categoria, indiceInicial) {
  return gruposFotos.map((fotos, indice) => {
    const indiceGlobal = indiceInicial + indice;
    const resena = RESENAS_EJEMPLO[indiceGlobal % RESENAS_EJEMPLO.length];
    return {
      fotos,
      nombre: resena.nombre,
      comentario: resena.texto,
      productos: PRODUCTO_VINCULADO ? [PRODUCTO_VINCULADO] : [],
      categoria,
    };
  });
}

const LOOKS_EJEMPLO = [
  ...construirLooks(FOTOS_INVITADAS, 'invitadas', 0),
  ...construirLooks(FOTOS_NOVIAS, 'novias', FOTOS_INVITADAS.length),
];

// Mismo fundido+subida al entrar en el viewport que TarjetaProducto.jsx
// (useEnVista + .al-scroll/.en-vista de global.css) — aparte porque un
// hook no puede llamarse dentro del .map() de la cuadrícula más abajo.
function TileVosotras({ onAbrir, fotos, etiquetaAbrir }) {
  const [ref, enVista] = useEnVista();

  return (
    <div ref={ref} className={`${styles.item} al-scroll ${enVista ? 'en-vista' : ''}`} onClick={onAbrir}>
      <CarruselFotos fotos={fotos} />
      <button
        type="button"
        className={styles.abrirBtn}
        onClick={(evento) => { evento.stopPropagation(); onAbrir(); }}
        aria-label={etiquetaAbrir}
      >
        <Plus size={20} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" />
      </button>
    </div>
  );
}

function GaleriaVosotras({ subtitleKey, titleKey, descriptionKey, margenSuperiorAmplio }) {
  const t = useTranslations();
  const locale = useLocale();
  const pistaRef = useRef(null);
  const cerrarRef = useRef(null);
  const ruedaEnCooldownRef = useRef(false);

  const [categoria, setCategoria] = useState('invitadas');
  const [abierta, setAbierta] = useState(false);
  const [indiceLook, setIndiceLook] = useState(0);
  const [indiceFoto, setIndiceFoto] = useState(0);

  const looksVisibles = useMemo(
    () => LOOKS_EJEMPLO.filter((look) => look.categoria === categoria),
    [categoria]
  );
  const lookActivo = looksVisibles[indiceLook];

  const abrir = (indice) => {
    setIndiceLook(indice);
    setIndiceFoto(0);
    setAbierta(true);
  };
  const cerrar = () => setAbierta(false);

  // Cambiar de categoría cierra el lightbox y vuelve a "indiceLook" 0 —
  // el índice pertenece a la lista ya filtrada, así que no tiene
  // sentido mantenerlo al cambiar de lista.
  const cambiarCategoria = (nueva) => {
    if (nueva === categoria) return;
    setCategoria(nueva);
    setIndiceLook(0);
    setAbierta(false);
  };

  // Foco en cerrar + sin scroll de la página detrás mientras está
  // abierto — mismo criterio que RunwayGaleria/GaleriaProductoLightbox.
  // También marca <body> con "vosotras-lightbox-abierta" mientras dura:
  // el lightbox ya trae su propia cabecera (logo + cerrar, ver más abajo)
  // así que el Navbar de siempre no pinta nada ahí — global.css lo
  // esconde con esa clase en vez de duplicar aquí la lógica de
  // scrolled/transparent que ya tiene Navbar.jsx.
  useEffect(() => {
    if (!abierta) return undefined;
    const enfocadoAntes = document.activeElement;
    cerrarRef.current?.focus();
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('vosotras-lightbox-abierta');

    const alTeclado = (evento) => {
      if (evento.key === 'Escape') cerrar();
    };
    document.addEventListener('keydown', alTeclado);

    return () => {
      document.removeEventListener('keydown', alTeclado);
      document.body.style.overflow = overflowPrevio;
      document.body.classList.remove('vosotras-lightbox-abierta');
      enfocadoAntes?.focus?.();
    };
  }, [abierta]);

  // Al abrir (o cambiar de look), salta de golpe a la primera foto —
  // el barrido solo se ve al navegar ya dentro.
  useEffect(() => {
    if (!abierta) return;
    const nodo = pistaRef.current;
    if (!nodo) return;
    nodo.scrollTo({ left: indiceFoto * nodo.clientWidth, behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierta, indiceLook]);

  const irAIndice = (indice) => {
    const nodo = pistaRef.current;
    if (!nodo) return;
    nodo.scrollTo({ left: indice * nodo.clientWidth, behavior: 'smooth' });
    setIndiceFoto(indice);
  };

  const alScroll = () => {
    const nodo = pistaRef.current;
    if (!nodo || nodo.clientWidth === 0) return;
    const indice = Math.round(nodo.scrollLeft / nodo.clientWidth);
    if (indice !== indiceFoto) setIndiceFoto(indice);
  };

  const alRueda = (evento) => {
    evento.preventDefault();
    if (ruedaEnCooldownRef.current) return;

    const delta = Math.abs(evento.deltaX) > Math.abs(evento.deltaY) ? evento.deltaX : evento.deltaY;
    if (Math.abs(delta) < 10) return;

    const siguiente = indiceFoto + (delta > 0 ? 1 : -1);
    if (siguiente < 0 || siguiente >= lookActivo.fotos.length) return;

    ruedaEnCooldownRef.current = true;
    irAIndice(siguiente);
    setTimeout(() => { ruedaEnCooldownRef.current = false; }, 500);
  };

  const tabIndexInteractivo = abierta ? 0 : -1;

  return (
    <>
      <CabeceraSeccion
        subtitleKey={subtitleKey}
        titleKey={titleKey}
        descriptionKey={descriptionKey}
        margenSuperiorAmplio={margenSuperiorAmplio}
      >
        <div className={styles.toggleCategoria}>
          <button
            type="button"
            className={`${styles.toggleCategoriaBoton} ${categoria === 'invitadas' ? styles.toggleCategoriaBotonActivo : ''}`}
            aria-pressed={categoria === 'invitadas'}
            onClick={() => cambiarCategoria('invitadas')}
          >
            {t('vosotras.invitadas')}
          </button>
          <button
            type="button"
            className={`${styles.toggleCategoriaBoton} ${categoria === 'novias' ? styles.toggleCategoriaBotonActivo : ''}`}
            aria-pressed={categoria === 'novias'}
            onClick={() => cambiarCategoria('novias')}
          >
            {t('vosotras.novias')}
          </button>
        </div>
      </CabeceraSeccion>

      <div className={styles.grid}>
        {looksVisibles.map((look, indice) => (
          <TileVosotras
            key={indice}
            fotos={look.fotos}
            onAbrir={() => abrir(indice)}
            etiquetaAbrir={t('vosotras.verGaleria')}
          />
        ))}
      </div>

      <div className={`${styles.lightbox} ${abierta ? styles.abierta : ''}`} aria-hidden={!abierta}>
        <div className={styles.cabecera}>
          <a href={`/${locale}`} className={styles.logoLink} tabIndex={tabIndexInteractivo}>
            <img src="/img/logo/logo-felycampo.png" alt="Fely Campo" className={styles.logo} />
          </a>
          <button
            ref={cerrarRef}
            type="button"
            className={styles.cerrar}
            onClick={cerrar}
            aria-label={t('producto.galeriaCerrar')}
            tabIndex={tabIndexInteractivo}
          >
            <X size={40} strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" />
          </button>
        </div>

        <div ref={pistaRef} className={styles.pista} onScroll={alScroll} onWheel={alRueda}>
          {lookActivo.fotos.map((foto) => (
            <div key={foto} className={styles.pistaItem}>
              <img src={foto} alt="" className={styles.pistaImagen} />
            </div>
          ))}
        </div>

        {lookActivo.fotos.length > 1 && (
          <div className={styles.miniaturas}>
            {lookActivo.fotos.map((foto, indice) => (
              <button
                key={foto}
                type="button"
                className={`${styles.miniatura} ${indice === indiceFoto ? styles.miniaturaActiva : ''}`}
                onClick={() => irAIndice(indice)}
                aria-label={String(indice + 1)}
                aria-current={indice === indiceFoto}
                tabIndex={tabIndexInteractivo}
              >
                <img src={foto} alt="" className={styles.miniaturaImagen} />
              </button>
            ))}
          </div>
        )}

        <div className={styles.panelInfo}>
          <div className={styles.panelInfoInterior}>
            <div className={styles.panelResena}>
              <p className={styles.panelTexto}>&ldquo;{lookActivo.comentario}&rdquo;</p>
              <p className={styles.panelNombre}>{lookActivo.nombre}</p>
            </div>

            {lookActivo.productos.length > 0 && (
              <div className={styles.panelProductosBloque}>
                <p className={styles.panelProductosTitulo}>{t('producto.consigueElLook')}</p>
                <div className={styles.panelProductos}>
                  {lookActivo.productos.map((producto) => (
                    <a
                      key={producto.nombre}
                      href={`/${locale}/atelier/fiesta/${slugify(producto.nombre)}`}
                      className={styles.panelProducto}
                      tabIndex={tabIndexInteractivo}
                    >
                      <span className={styles.panelProductoImagenWrap}>
                        <img src={producto.imagen} alt="" className={styles.panelProductoImagen} />
                        <button
                          type="button"
                          className={styles.panelProductoAnadir}
                          onClick={(evento) => evento.preventDefault()}
                          aria-label={t('producto.anadirCesta')}
                          tabIndex={tabIndexInteractivo}
                        >
                          <Plus size={12} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" />
                        </button>
                      </span>
                      <span className={styles.panelProductoNombre}>{producto.nombre}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GaleriaVosotras;
