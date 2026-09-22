/* Ruta: /atelier/novias — antes enseñaba el catálogo completo de las 6
   colecciones de Novia (ver noviaProductos.js: Introspección, Inside,
   Savia Novia, Bambú Novia, ME y Bride 27). A petición explícita, la
   página deja de listar esas 6 y muestra solo la última, Bride 27 —
   noviaProductos.js NO se toca (sigue con las 6 completas: catálogo
   real que también alimenta /admin/colecciones/novia y las fichas
   individuales en [producto]/page.js), aquí solo se filtra lo que se
   enseña en esta página.

   Antes de la cuadrícula, una sección editorial (ver noviaEditorial.js)
   cuenta cómo se trabaja con cada novia en el atelier — dos
   BloqueSeccion en zigzag (mismo patrón que /atelier-fiesta/salamanca)
   y un RunwayBackstage con fotos fuertes de Bride 27 (misma cuadrícula
   editorial que ya usa La Colección en /runways-la-coleccion), en vez
   de ir directa a la cuadrícula de looks como antes.

   Hero + título: mismo patrón que la ficha de colección de Runway (ver
   /runways/[coleccion]/page.js — .hero con RunwayMediaLateral,
   data-navbar-hero para que el Navbar se vuelva sólido al salir de él,
   + .textoDescripcion con .textoRow) en vez del ProductHero sin título
   que llevaba antes. "nombre"/"temporada" son "Atelier"/"Novias" — el
   mismo par que ya usa CuadriculaProductos como subtítulo/título antes
   de la cuadrícula (tituloKey/coleccionKey más abajo), aquí grande en
   el propio hero. RunwayDescripcion (editorial de arriba) pasa a vivir
   dentro de ese mismo .textoDescripcion, debajo de la fila de título.

   Cuadrícula de looks (CuadriculaProductos) comentada a petición — no
   se usa por el momento, la página se queda en la parte editorial de
   arriba (hero + storytelling + RunwayBackstage). noviaProductos.js
   sigue intacto (ver comentario del principio), solo se deja de
   pintar aquí. */

import { getTranslations } from 'next-intl/server';
import { BloqueSeccion, /* CuadriculaProductos, */ RunwayBackstage, RunwayDescripcion, RunwayMediaLateral } from '@/components/layout';
// import { noviaProductos } from '@/components/layout/noviaProductos';
import { NOVIA_EDITORIAL } from './noviaEditorial';
import styles from './page.module.css';

// const PRODUCTOS_BRIDE_27 = noviaProductos.filter((producto) => producto.coleccion === 'Bride 27');

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <section className="seccion">
      <div className={styles.hero} data-navbar-hero>
        <RunwayMediaLateral
          medio={{ tipo: 'imagen', src: '/img/landing/hero-atelier-novia-felycampo.jpg' }}
          alt={t('nav.submenus.atelier.novias')}
        />
      </div>

      <div className={styles.textoDescripcion}>
        <div className={styles.textoRow}>
          <p className={styles.nombre}>{t('nav.links.atelier')}</p>
          <p className={styles.temporada}>{t('nav.submenus.atelier.novias')}</p>
        </div>

        <RunwayDescripcion texto={NOVIA_EDITORIAL.descripcion[locale]} />
      </div>

      {NOVIA_EDITORIAL.bloques.map((bloque, indice) => (
        <BloqueSeccion
          key={bloque.imagen}
          imagen={bloque.imagen}
          titulo={bloque.titulo[locale]}
          texto={bloque.texto[locale]}
          invertido={indice % 2 === 1}
        />
      ))}

      <div className="contenedor">
        <RunwayBackstage imagenes={NOVIA_EDITORIAL.backstage} alt="Bride 27" />
      </div>

      {/* Comentado a petición — sin cuadrícula de looks por el momento.
      <CuadriculaProductos
        productos={PRODUCTOS_BRIDE_27}
        disposicion="grid"
        tituloKey="nav.links.atelier"
        coleccionKey="nav.submenus.atelier.novias"
        descriptionKey="cuadriculaTabs.descripcion"
        ocultarPrecio
        hrefBase="atelier/novias"
        estiloYSilueta
      />
      */}
    </section>
  );
}
