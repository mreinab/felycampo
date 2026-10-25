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
   zigzag + RunwayBackstage, contenido en pretAPorterEditorial.js —
   ahora los BloqueSeccion están comentados y RunwayBackstage quitado
   (a petición), solo queda la descripción. A
   diferencia de Novias/Fiesta, aquí la cuadrícula de producto NO se
   comenta — sigue al final de la página, sin tocar (a petición
   explícita: "todas las imágenes de producto al final").

   "ocultarPrecio" (a petición explícita): Prêt-à-porter deja de
   enseñar precio de catálogo, mismo criterio que Atelier (Novias/
   Fiesta) — ver comentario de esa prop en CuadriculaProductos.jsx.
   La ficha de producto (ver FichaProductoAcciones.jsx) tampoco lo
   enseña ya. */

import { getTranslations } from 'next-intl/server';
import { /* BloqueSeccion, */ CarruselInfinito, CuadriculaProductos, HeroPagina, RunwayDescripcion } from '@/components/layout';
import { CabeceraSeccion } from '@/components/ui';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { PRET_A_PORTER_EDITORIAL } from './pretAPorterEditorial';
import styles from './page.module.css';
import { metadataPagina, textosSeo } from '@/lib/seo';

// Hero: carrusel infinito de looks FW27 (recortes WebP con fondo
// transparente) en vez de una sola foto — se mueve solo, sin fin. Orden
// = el de los archivos en la carpeta.
const RUTA_CARRUSEL = '/img/collections/runway/fw27-lacoleccion/carrusel-png';
const IMAGENES_HERO = ['02', '04', '05', '08', '13', '15', '16', '17', '20', '22', '27']
  .map((numero) => `${RUTA_CARRUSEL}/fely-campo-pasarela-la-coleccion-look-${numero}-recorte.webp`);

// Foto de pasarela FW27 junto a su producto en la cuadrícula (ver
// "imagenEditorial" en CuadriculaProductos.jsx): misma ficha al hacer
// clic. Emparejadas a ojo por prenda (la foto enseña ese producto).
// Todas son recortes PNG (fondo transparente), de la misma carpeta que
// el carrusel del hero.
// "antes": la foto va delante de su producto en vez de detrás — junto
// con ORDEN_CUADRICULA decide en qué columna cae cada foto, para que no
// queden siempre en el mismo lado de la fila.
const FOTOS_PASARELA = {
  'Chaqueta Samarcanda': { src: `${RUTA_CARRUSEL}/fely-campo-pasarela-la-coleccion-look-17-recorte.webp`, antes: true },
  'Chaqueta Sucre': { src: `${RUTA_CARRUSEL}/fely-campo-pasarela-la-coleccion-look-16-recorte.webp`, antes: true }, // look con Falda Sucre
  'Chaqueta Aranjuez': { src: `${RUTA_CARRUSEL}/fely-campo-pasarela-la-coleccion-look-24-recorte.webp`, antes: true },
  'Top lencero': { src: `${RUTA_CARRUSEL}/fely-campo-pasarela-la-coleccion-look-04-recorte.webp` }, // look con Falda Jeju
  'Vestido Ciruela': { src: `${RUTA_CARRUSEL}/fely-campo-pasarela-la-coleccion-look-03-recorte.webp`, antes: true },
  Chaqueta: { src: `${RUTA_CARRUSEL}/fely-campo-pasarela-la-coleccion-look-05-recorte.webp` },
};

// Orden de la cuadrícula en esta página (solo aquí, tiendaProductos.js
// no cambia). Pensado para 4 columnas en escritorio — con las fotos, cada
// fila queda así (F = foto de pasarela):
//   1: F17 · Samarcanda · Basilea · Lhasa
//   2: Chicago · Falda Sucre · F16 · Chaqueta Sucre
//   3: Goree · F24 · Aranjuez · Abrigo Corto
//   4: Ubud · Falda Jeju · Top lencero · F04
//   5: Copenhague · F03 · Ciruela · Top Encaje París
//   6: Zahara · Chaqueta · F05
// Un producto nuevo que no esté en la lista va al final.
const ORDEN_CUADRICULA = [
  'Chaqueta Samarcanda', 'Falda Basilea', 'Falda Lhasa',
  'Vestido Largo Chicago', 'Falda Sucre', 'Chaqueta Sucre',
  'Pantalón Goree', 'Chaqueta Aranjuez', 'Abrigo Corto',
  'Top Ubud', 'Falda Jeju', 'Top lencero',
  'Abrigo Copenhague', 'Vestido Ciruela', 'Top Encaje París',
  'Vestido Zahara', 'Chaqueta',
];

const posicion = (producto) => {
  const indice = ORDEN_CUADRICULA.indexOf(producto.nombre);
  return indice === -1 ? ORDEN_CUADRICULA.length : indice;
};

const PRODUCTOS_CON_PASARELA = tiendaProductos
  .map((producto) => {
    const foto = FOTOS_PASARELA[producto.nombre];
    return foto ? { ...producto, imagenEditorial: foto.src, imagenEditorialAntes: !!foto.antes } : producto;
  })
  .sort((a, b) => posicion(a) - posicion(b));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataPagina({ locale, ruta: '/pret-a-porter' });
}

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <section className="seccion">
      {/* Solo en esta página (a petición): hero sin velo ni texto encima
          (solo el carrusel), Navbar transparente en oscuro (ver
          "esPretAPorter" en [locale]/layout.js). El título va debajo,
          centrado, con la misma cabecera que las páginas de categoría
          de Atelier (CabeceraSeccion enCuadricula + alinear="start",
          la que pinta CuadriculaProductos allí). */}
      <h1 className="sr-only">{textosSeo('/pret-a-porter', locale).h1}</h1>
      <HeroPagina
        tono="oscuro"
        className={styles.heroCarrusel}
      >
        <CarruselInfinito imagenes={IMAGENES_HERO} alt={t('catalogo.tituloTienda')} />
      </HeroPagina>

      <CabeceraSeccion
        titleKey="catalogo.tituloTienda"
        alinear="start"
        enCuadricula
        className={styles.cabecera}
      />

      <div className={styles.textoDescripcion}>
        <RunwayDescripcion texto={PRET_A_PORTER_EDITORIAL.descripcion[locale]} />
      </div>

      {/* Comentado a petición (no visible de momento) — contenido en
          pretAPorterEditorial.js, sin tocar, por si se recupera.
      {PRET_A_PORTER_EDITORIAL.bloques.map((bloque, indice) => (
        <BloqueSeccion
          key={bloque.imagen}
          imagen={bloque.imagen}
          titulo={bloque.titulo[locale]}
          texto={bloque.texto[locale]}
          invertido={indice % 2 === 1}
        />
      ))}
      */}

      <CuadriculaProductos
        productos={PRODUCTOS_CON_PASARELA}
        disposicion="grid"
        // Cabecera (CabeceraSeccion) comentada a petición: sin "tituloKey"
        // CuadriculaProductos no la pinta (ni el botón de filtros, que va
        // dentro de ella).
        // tituloKey="catalogo.subtituloFelyCampo"
        // coleccionKey="catalogo.tituloTienda"
        // descriptionKey="cuadriculaProductos.novedadesDescripcion"
        ocultarSubtitulo
        ocultarPrecio
      />
    </section>
  );
}
