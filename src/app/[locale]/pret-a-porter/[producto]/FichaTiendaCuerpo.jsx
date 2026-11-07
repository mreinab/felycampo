// FichaTiendaCuerpo.jsx

/* ============================================================
   FICHA DE PRÊT-À-PORTER — lo que se ve — Fely Campo
   Galería, nombre, descripción, color + «Contacta con nosotros»,
   acordeón y relacionados. Lo pinta page.js (servidor: busca el
   producto, los textos, el JSON-LD y el «Sigue explorando») y también la
   vista previa del admin (PreviaFichaTienda.jsx), con el borrador. Solo
   usa componentes cliente, así que vale para las dos.
   "textos": ya traducidos — { acordeon: <FilaAcordeon>…</FilaAcordeon>,
   seguirExplorando }.
   ============================================================ */

import ProductosRecomendados from '@/components/layout/ProductosRecomendados';
import FichaProductoAcciones from '@/components/ecommerce/FichaProductoAcciones';
import GaleriaProducto from '@/components/ecommerce/GaleriaProducto';
import { Acordeon, Boton } from '@/components/ui';
import styles from './page.module.css';

function FichaTiendaCuerpo({
  producto, descripcion, relacionados = [], textos, hrefSeguirExplorando, antes = null, despues = null,
}) {
  return (
    <section className={`seccion contenedor ${styles.debajoNavbar}`}>
      {antes}
      <div className={styles.ficha}>
        <GaleriaProducto
          imagenes={producto.imagenes?.length ? producto.imagenes : [producto.imagen]}
          alt={producto.nombre}
          nombre={producto.nombre}
          colores={producto.colores}
        />

        <div className={styles.info}>
          <div className={styles.bloquePrincipal}>
            <div className={styles.cabecera}>
              <h1 className={styles.nombre}>{producto.nombre}</h1>
              <p className={styles.descripcion}>{descripcion}</p>
            </div>

            <FichaProductoAcciones
              nombre={producto.nombre}
              imagen={producto.imagen}
              colores={producto.colores}
            />

            <Acordeon>{textos.acordeon}</Acordeon>
          </div>
        </div>
      </div>

      <div className={styles.debajoFicha}>
        {/* "Runway look" (LookPasarela) y las reseñas (ResenasClientes)
            quitados a petición (2026-11-04) — eran placeholders. Los
            componentes siguen en components/ por si se recuperan. */}
        {relacionados.length > 0 && (
          <>
            <ProductosRecomendados productos={relacionados} ocultarPrecio />
            <div className={styles.seguirExplorando}>
              <Boton variante="solido" href={hrefSeguirExplorando}>{textos.seguirExplorando}</Boton>
            </div>
          </>
        )}
      </div>
      {despues}
    </section>
  );
}

export default FichaTiendaCuerpo;
