'use client';

/* ============================================================
   PANEL DE CLIENTE (/mi-cuenta/panel) — Fely Campo
   El "dentro" de Mi Cuenta — placeholder de lo que vería una clienta
   ya registrada/con sesión iniciada (ver MiCuentaModal.jsx: sus dos
   "submit" navegan aquí como demostración, ninguno comprueba
   credenciales de verdad todavía). Sidebar de pestañas (mismo
   subrayado que .navLink/.navLinkActivo del Navbar, en columna en vez
   de en fila — igual criterio que .submenuLink en
   NavbarPanelLateralContent.module.css) + contenido a la derecha.

   Tres pestañas:
   - "Mis pedidos" (por defecto): pedidos de ejemplo con sus productos
     y el total del pedido (totalPedido, suma los "precio" de sus
     productos) — cada producto lleva "Escribir reseña" (abre
     EscribirResenaModal, ver ahí), justo lo que se pidió: un sitio
     para reseñar productos ya comprados. Tras "enviar" en el modal, el
     botón de ese producto pasa a "Reseña enviada" — solo estado local
     de esta página (useState), no hay backend que cruce compras con
     reseñas todavía.
   - "Mis reseñas": las que la clienta ya ha escrito — de ejemplo
     también, no las que se acaban de enviar arriba (no hay conexión
     real entre las dos) — seguidas de "Productos por reseñar"
     (productosPorResenar): los productos comprados en cualquier
     pedido que aún no tienen reseña, con su propio "Escribir reseña"
     — así se puede empezar una reseña nueva desde esta pestaña, no
     solo desde "Mis pedidos".
   - "Mis datos": formulario con los mismos campos que el registro de
     MiCuentaModal.jsx (nombre completo, email, fecha de nacimiento)
     más teléfono (solo aquí, no en el registro), precargado —
     "Guardar cambios" no hace nada (placeholder).

   PLACEHOLDER a propósito, a petición: todo el contenido (pedidos,
   reseñas, datos) es fijo, tomado de productosEjemplo.js — sin
   backend real que sepa qué ha comprado o escrito una clienta
   concreta.
   ============================================================ */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Package, Star, User } from 'lucide-react';
import { Input, Boton } from '@/components/ui';
import { EscribirResenaModal } from '@/components/ecommerce';
import { productosEjemplo } from '@/components/layout/productosEjemplo';
import styles from './page.module.css';

// PLACEHOLDER — ver comentario de arriba: pedidos y reseñas fijos de
// ejemplo, tomados de productosEjemplo.js.
const PEDIDOS_EJEMPLO = [
  {
    numero: 'FC-2941',
    fecha: '12 de mayo de 2026',
    estado: 'Entregado',
    productos: [productosEjemplo[0], productosEjemplo[3]],
  },
  {
    numero: 'FC-2887',
    fecha: '3 de marzo de 2026',
    estado: 'Entregado',
    productos: [productosEjemplo[7]],
  },
];

const RESENAS_EJEMPLO = [
  { producto: productosEjemplo[5], valoracion: 5, texto: 'La caída de la tela es preciosa, mejor en persona que en foto.' },
];

// Suma los precios de un pedido — "precio" es un string ya formateado
// ("1.050 €", ver PRECIOS en productosEjemplo.js), así que se
// desformatea a número (quitar "." de millares y "€"), se suma y se
// vuelve a formatear con el mismo criterio (punto de millares).
function totalPedido(productos) {
  const total = productos.reduce((suma, producto) => {
    const numero = Number(producto.precio.replace(/[.\s€]/g, ''));
    return suma + (Number.isNaN(numero) ? 0 : numero);
  }, 0);
  return `${total.toLocaleString('es-ES')} €`;
}

const TABS = ['pedidos', 'resenas', 'datos'];

// Un icono por pestaña — mismo trazo (strokeWidth/strokeLinecap/
// strokeLinejoin) que el resto de iconos sueltos del sitio (ver
// Estrellas más abajo, o el icono "cerrar" de MiCuentaModal.jsx).
const ICONOS_TAB = { pedidos: Package, resenas: Star, datos: User };

function Estrellas({ valoracion }) {
  return (
    <div className={styles.estrellasLectura} aria-label={`${valoracion} / 5`}>
      {[1, 2, 3, 4, 5].map((numero) => (
        <Star
          key={numero}
          size={16}
          strokeWidth={1.5}
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill={numero <= valoracion ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Pagina() {
  const t = useTranslations('panelCliente');
  // Mismas etiquetas que el formulario de registro de MiCuentaModal.jsx
  // (nombreCompleto/email/fechaNacimiento) — no se duplican como
  // claves nuevas en "panelCliente".
  const tCuenta = useTranslations('miCuenta');
  const [tab, setTab] = useState('pedidos');
  const [productoModal, setProductoModal] = useState(null);
  const [resenadas, setResenadas] = useState([]);

  const abrirResena = (producto) => setProductoModal(producto);
  const cerrarResena = () => setProductoModal(null);
  const marcarResenado = () => {
    setResenadas((actuales) => (
      productoModal && !actuales.includes(productoModal.nombre)
        ? [...actuales, productoModal.nombre]
        : actuales
    ));
  };

  // Productos comprados (en cualquier pedido) que todavía no tienen
  // reseña — ni de ejemplo (RESENAS_EJEMPLO) ni recién enviada
  // (resenadas) — para poder escribir una reseña nueva también desde
  // esta pestaña, no solo desde "Mis pedidos". Set por nombre: un
  // mismo producto puede repetirse en varios pedidos.
  const nombresYaResenados = new Set([
    ...RESENAS_EJEMPLO.map(({ producto }) => producto.nombre),
    ...resenadas,
  ]);
  const productosPorResenar = PEDIDOS_EJEMPLO
    .flatMap((pedido) => pedido.productos)
    .filter((producto, indice, lista) => (
      !nombresYaResenados.has(producto.nombre)
      && lista.findIndex((otro) => otro.nombre === producto.nombre) === indice
    ));

  return (
    <section className="seccion contenedor panelCliente">
      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label="Mi cuenta">
          {TABS.map((clave) => {
            const Icono = ICONOS_TAB[clave];
            return (
              <button
                key={clave}
                type="button"
                className={`${styles.tab} ${tab === clave ? styles.tabActivo : ''}`}
                onClick={() => setTab(clave)}
              >
                <Icono size={16} strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" />
                <span className={styles.tabTexto}>
                  {t(`tab${clave.charAt(0).toUpperCase()}${clave.slice(1)}`)}
                </span>
              </button>
            );
          })}
        </nav>

        <div className={styles.contenido}>
          {tab === 'pedidos' && (
            <div className={styles.bloque}>
              <h1 className={styles.titulo}>{t('pedidosTitulo')}</h1>

              {PEDIDOS_EJEMPLO.map((pedido) => (
                <div key={pedido.numero} className={styles.pedido}>
                  <div className={styles.pedidoCabecera}>
                    <p className={styles.pedidoNumero}>{t('pedidoNumero', { numero: pedido.numero })}</p>
                    <p className={styles.pedidoMeta}>
                      {pedido.fecha} · {pedido.estado} · {t('pedidoTotal', { total: totalPedido(pedido.productos) })}
                    </p>
                  </div>

                  <div className={styles.pedidoProductos}>
                    {pedido.productos.map((producto) => {
                      const yaResenado = resenadas.includes(producto.nombre);
                      return (
                        <div key={producto.nombre} className={styles.pedidoProducto}>
                          <img src={producto.imagen} alt="" className={styles.pedidoImagen} />
                          <div className={styles.pedidoProductoInfo}>
                            <p className={styles.pedidoProductoNombre}>{producto.nombre}</p>
                            <p className={styles.pedidoProductoPrecio}>{producto.precio}</p>
                          </div>
                          <Boton
                            variante="contorno"
                            tamano="s"
                            desactivado={yaResenado}
                            onClick={() => abrirResena(producto)}
                            className={styles.pedidoAccion}
                          >
                            {yaResenado ? t('resenaEnviada') : t('escribirResena')}
                          </Boton>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'resenas' && (
            <div className={styles.bloque}>
              <h1 className={styles.titulo}>{t('resenasTitulo')}</h1>

              {RESENAS_EJEMPLO.length === 0 ? (
                <p className={styles.vacio}>{t('resenasVacio')}</p>
              ) : (
                RESENAS_EJEMPLO.map(({ producto, valoracion, texto }) => (
                  <div key={producto.nombre} className={styles.resena}>
                    <img src={producto.imagen} alt="" className={styles.pedidoImagen} />
                    <div className={styles.resenaInfo}>
                      <p className={styles.pedidoProductoNombre}>{producto.nombre}</p>
                      <Estrellas valoracion={valoracion} />
                      <p className={styles.resenaTexto}>&ldquo;{texto}&rdquo;</p>
                    </div>
                  </div>
                ))
              )}

              {productosPorResenar.length > 0 && (
                <div className={styles.cabeceraBloque}>
                  <p className={styles.subtitulo}>{t('resenasPendientesTitulo')}</p>

                  <div className={styles.pedidoProductos}>
                    {productosPorResenar.map((producto) => (
                      <div key={producto.nombre} className={styles.pedidoProducto}>
                        <img src={producto.imagen} alt="" className={styles.pedidoImagen} />
                        <div className={styles.pedidoProductoInfo}>
                          <p className={styles.pedidoProductoNombre}>{producto.nombre}</p>
                          <p className={styles.pedidoProductoPrecio}>{producto.precio}</p>
                        </div>
                        <Boton
                          variante="contorno"
                          tamano="s"
                          onClick={() => abrirResena(producto)}
                          className={styles.pedidoAccion}
                        >
                          {t('escribirResena')}
                        </Boton>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'datos' && (
            <div className={styles.bloque}>
              <div className={styles.cabeceraBloque}>
                <h1 className={styles.titulo}>{t('datosTitulo')}</h1>
                <p className={styles.subtitulo}>{t('datosSubtitulo')}</p>
              </div>

              <form className={styles.form} onSubmit={(evento) => evento.preventDefault()}>
                <Input etiqueta={tCuenta('nombreCompleto')} tipo="text" nombre="nombreCompleto" valor="María Martín García" onChange={() => {}} />
                <Input etiqueta={tCuenta('email')} tipo="email" nombre="email" valor="maria@ejemplo.com" onChange={() => {}} />
                <Input etiqueta={tCuenta('telefono')} tipo="tel" nombre="telefono" valor="+34 683 703 644" onChange={() => {}} />
                <Input etiqueta={tCuenta('fechaNacimiento')} tipo="date" nombre="fechaNacimiento" valor="1994-05-12" onChange={() => {}} />
                <Boton variante="solido" tamano="m" type="submit">{t('guardarCambios')}</Boton>
              </form>
            </div>
          )}
        </div>
      </div>

      <EscribirResenaModal
        abierto={!!productoModal}
        onCerrar={cerrarResena}
        producto={productoModal}
        onEnviado={marcarResenado}
      />
    </section>
  );
}
