/* Ruta: /pret-a-porter — catálogo real (ver tiendaProductos.js), todas las
   categorías juntas sin filtrar (cada una tiene su propia página, ver
   tienda/{categoria}/page.js).

   Hero + título: mismo patrón que atelier/novias/page.js y
   atelier/fiesta/page.js (ver ahí el detalle completo) — .hero con
   RunwayMediaLateral, data-navbar-hero, + .textoDescripcion con
   .textoRow, en vez del ProductHero sin título que llevaba antes.
   "nombre"/"temporada" son "Fely Campo"/"Prêt-à-porter"
   (catalogo.subtituloFelyCampo/tituloTienda), el mismo par que ya usa
   CuadriculaProductos como subtítulo/título antes de la cuadrícula.

   Antes de la cuadrícula, mismo patrón editorial que esas dos páginas:
   RunwayDescripcion dentro de .textoDescripcion + dos BloqueSeccion en
   zigzag + RunwayBackstage, contenido en pretAPorterEditorial.js. A
   diferencia de Novias/Fiesta, aquí la cuadrícula de producto NO se
   comenta — sigue al final de la página, sin tocar (a petición
   explícita: "todas las imágenes de producto al final").

   "ocultarPrecio" (a petición explícita): Prêt-à-porter deja de
   enseñar precio de catálogo, mismo criterio que Atelier (Novias/
   Fiesta) — ver comentario de esa prop en CuadriculaProductos.jsx.
   La ficha de producto (ver FichaProductoAcciones.jsx) tampoco lo
   enseña ya. */

import { getTranslations } from 'next-intl/server';
import { BloqueSeccion, CuadriculaProductos, RunwayBackstage, RunwayDescripcion, RunwayMediaLateral } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { PRET_A_PORTER_EDITORIAL } from './pretAPorterEditorial';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <section className="seccion">
      <div className={styles.hero} data-navbar-hero>
        <RunwayMediaLateral
          medio={{ tipo: 'imagen', src: '/img/hero-pages/hero-pages-pretaporter-cover.jpg' }}
          alt={t('catalogo.tituloTienda')}
        />
      </div>

      <div className={styles.textoDescripcion}>
        <div className={styles.textoRow}>
          <p className={styles.nombre}>{t('catalogo.subtituloFelyCampo')}</p>
          <p className={styles.temporada}>{t('catalogo.tituloTienda')}</p>
        </div>

        <RunwayDescripcion texto={PRET_A_PORTER_EDITORIAL.descripcion[locale]} />
      </div>

      {PRET_A_PORTER_EDITORIAL.bloques.map((bloque, indice) => (
        <BloqueSeccion
          key={bloque.imagen}
          imagen={bloque.imagen}
          titulo={bloque.titulo[locale]}
          texto={bloque.texto[locale]}
          invertido={indice % 2 === 1}
        />
      ))}

      <div className="contenedor">
        <RunwayBackstage imagenes={PRET_A_PORTER_EDITORIAL.backstage} alt={t('catalogo.tituloTienda')} />
      </div>

      <CuadriculaProductos
        productos={tiendaProductos}
        disposicion="grid"
        tituloKey="catalogo.subtituloFelyCampo"
        coleccionKey="catalogo.tituloTienda"
        descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
