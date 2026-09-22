/* Ruta: /atelier/fiesta — catálogo real de las 11 colecciones de Fiesta
   (ver fiestaProductos.js): Primavera Verano 2027 (SS27), Primavera
   Verano 2026, Primavera Verano 2025, Prêt-à-porter, En Madrid, A
   Walk, Bambú, Savia, Miscelanea, Essentielle y Furisode, cada una con
   sus looks reales. Mismo criterio que atelier/novias/page.js.

   Hero + título: mismo patrón que la ficha de colección de Runway (ver
   /runways/[coleccion]/page.js — .hero con RunwayMediaLateral,
   data-navbar-hero para que el Navbar se vuelva sólido al salir de él,
   + .textoDescripcion con .textoRow) en vez del ProductHero sin título
   que llevaba antes — mismo cambio que atelier/novias/page.js (ver ahí
   el detalle completo). "nombre"/"temporada" son "Atelier"/"Fiesta", el
   mismo par que ya usa CuadriculaProductos como subtítulo/título antes
   de la cuadrícula (tituloKey/coleccionKey más abajo).

   Antes de la cuadrícula, mismo patrón editorial que
   atelier/novias/page.js (ver ahí el detalle completo): RunwayDescripcion
   dentro de .textoDescripcion + dos BloqueSeccion en zigzag +
   RunwayBackstage, contenido en fiestaEditorial.js.

   Cuadrícula de looks (CuadriculaProductos) al final, visible — a
   petición explícita (a diferencia de atelier/novias/page.js, aquí NO
   se comenta). "Prêt-à-porter" se quita de COLECCIONES_FIESTA (no
   pertenece a este listado de colecciones de Fiesta) — fiestaProductos.js
   NO se toca (sigue con las 11 completas: catálogo real que también
   alimenta /admin/colecciones/fiesta), aquí solo se excluye de lo que
   se enseña en esta página. */

import { getTranslations } from 'next-intl/server';
import { BloqueSeccion, CuadriculaProductos, RunwayBackstage, RunwayDescripcion, RunwayMediaLateral } from '@/components/layout';
import { fiestaProductos } from '@/components/layout/fiestaProductos';
import { FIESTA_EDITORIAL } from './fiestaEditorial';
import styles from './page.module.css';

// Colecciones de Fiesta, de la más reciente a la más antigua — mismo
// orden real en que aparecen los looks en la cuadrícula (ver
// fiestaProductos.js); ver también comentario de "colecciones" en
// CuadriculaProductos.jsx (filtra la cuadrícula de verdad). Sin
// "Prêt-à-porter" (ver comentario de arriba).
const COLECCIONES_FIESTA = [
  'Primavera Verano 2027',
  'Primavera Verano 2026',
  'Primavera Verano 2025',
  'En Madrid',
  'A Walk',
  'Bambú',
  'Savia',
  'Miscelanea',
  'Essentielle',
  'Furisode',
];

const PRODUCTOS_FIESTA = fiestaProductos.filter((producto) => producto.coleccion !== 'Prêt-à-porter');

export default async function Pagina({ params, searchParams }) {
  const { locale } = await params;
  // "?coleccion=" (ver comentario de novias/page.js): solo se
  // preselecciona si coincide exacto con una de las colecciones reales.
  const { coleccion } = await searchParams;
  const coleccionActiva = COLECCIONES_FIESTA.includes(coleccion) ? coleccion : null;
  const t = await getTranslations();

  return (
    <section className="seccion">
      <div className={styles.hero} data-navbar-hero>
        <RunwayMediaLateral
          medio={{ tipo: 'imagen', src: '/img/landing/hero-atelier-fiesta-felycampo.jpg' }}
          alt={t('nav.submenus.atelier.fiesta')}
        />
      </div>

      <div className={styles.textoDescripcion}>
        <div className={styles.textoRow}>
          <p className={styles.nombre}>{t('nav.links.atelier')}</p>
          <p className={styles.temporada}>{t('nav.submenus.atelier.fiesta')}</p>
        </div>

        <RunwayDescripcion texto={FIESTA_EDITORIAL.descripcion[locale]} />
      </div>

      {FIESTA_EDITORIAL.bloques.map((bloque, indice) => (
        <BloqueSeccion
          key={bloque.imagen}
          imagen={bloque.imagen}
          titulo={bloque.titulo[locale]}
          texto={bloque.texto[locale]}
          invertido={indice % 2 === 1}
        />
      ))}

      <div className="contenedor">
        <RunwayBackstage imagenes={FIESTA_EDITORIAL.backstage} alt={t('nav.submenus.atelier.fiesta')} />
      </div>

      <CuadriculaProductos
        productos={PRODUCTOS_FIESTA}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.fiesta"
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarPrecio
        colecciones={COLECCIONES_FIESTA}
        coleccionActiva={coleccionActiva}
        hrefBase="atelier/fiesta"
        estiloYSilueta
        esFiesta
      />
    </section>
  );
}
