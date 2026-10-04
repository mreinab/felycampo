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
import { /* BloqueSeccion, */ CarruselInfinito, CuadriculaProductos, RunwayDescripcion } from '@/components/layout';
import { tiendaProductos } from '@/components/layout/tiendaProductos';
import { PRET_A_PORTER_EDITORIAL } from './pretAPorterEditorial';
import styles from './page.module.css';

// Hero: carrusel infinito de looks FW27 (recortes PNG con fondo
// transparente) en vez de una sola foto — se mueve solo, sin fin. Orden
// = el de los archivos en la carpeta.
const RUTA_CARRUSEL = '/img/collections/runway/fw27-lacoleccion/carrusel png';
const IMAGENES_HERO = ['02', '04', '05', '08', '13', '15', '16', '17', '20', '22', '27']
  .map((numero) => `${RUTA_CARRUSEL}/FelyCampo_${numero}.png`);

// Foto de pasarela FW27 junto a su producto en la cuadrícula (ver
// "imagenEditorial" en CuadriculaProductos.jsx): misma ficha al hacer
// clic. Emparejadas a ojo por prenda (la foto enseña ese producto).
// Todas son recortes PNG (fondo transparente), de la misma carpeta que
// el carrusel del hero.
// "antes": la foto va delante de su producto en vez de detrás — junto
// con ORDEN_CUADRICULA decide en qué columna cae cada foto, para que no
// queden siempre en el mismo lado de la fila.
const FOTOS_PASARELA = {
  'Chaqueta Samarcanda': { src: `${RUTA_CARRUSEL}/FelyCampo_17.png`, antes: true },
  'Chaqueta Sucre': { src: `${RUTA_CARRUSEL}/FelyCampo_16.png`, antes: true }, // look con Falda Sucre
  'Chaqueta Aranjuez': { src: `${RUTA_CARRUSEL}/FelyCampo_24.png`, antes: true },
  'Top lencero': { src: `${RUTA_CARRUSEL}/FelyCampo_04.png` }, // look con Falda Jeju
  'Vestido Ciruela': { src: `${RUTA_CARRUSEL}/FelyCampo_03.png`, antes: true },
  Chaqueta: { src: `${RUTA_CARRUSEL}/FelyCampo_05.png` },
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

export default async function Pagina({ params }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <section className="seccion">
      <div className={`${styles.hero} ${styles.heroCarrusel}`} data-navbar-hero>
        <CarruselInfinito imagenes={IMAGENES_HERO} alt={t('catalogo.tituloTienda')} />
      </div>

      <div className={styles.textoDescripcion}>
        <div className={styles.textoRow}>
          <p className={styles.nombre}>{t('catalogo.subtituloFelyCampo')}</p>
          <p className={styles.temporada}>{t('catalogo.tituloTienda')}</p>
        </div>

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
