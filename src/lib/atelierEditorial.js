// atelierEditorial.js
//
// La parte editorial (fotos y textos) de /atelier/novias, /atelier/fiesta y
// /pret-a-porter: lo comparten la web (NoviasContenido.jsx,
// FiestaContenido.jsx, PretAPorterCabecera.jsx) y el admin (pestaña «Página
// de la web» de Colección Novias, Colección Fiesta y Prêt-à-porter).
//
// PARA EL PROGRAMADOR: al conectar la base de datos, solo hay que cambiar
// obtenerEditorialNovias() / obtenerEditorialFiesta() /
// obtenerEditorialPretAPorter(). Ver
// docs/admin-atelier-editorial.md.

import { EDITORIAL_FIESTA, EDITORIAL_NOVIAS, EDITORIAL_PRET_A_PORTER } from '@/datos/atelierEditorial';

// Ids de página (Paginas.jsx) y de vista previa (?previa=<id>).
export const ID_PAGINA_NOVIAS = 'atelier-novias';
export const ID_PAGINA_FIESTA = 'atelier-fiesta';
export const ID_PAGINA_PRET_A_PORTER = 'pret-a-porter-pagina';

export function obtenerEditorialNovias() {
  return EDITORIAL_NOVIAS;
}

export function obtenerEditorialFiesta() {
  return EDITORIAL_FIESTA;
}

export function obtenerEditorialPretAPorter() {
  return EDITORIAL_PRET_A_PORTER;
}

// /pret-a-porter: el carrusel de la portada y la descripción.
export function camposEditorialPretAPorter(datos) {
  return [
    {
      bloque: 'portada', nombre: 'las fotos de la portada', tipo: 'lista', valor: datos.portada, minimo: 1, mensaje: 'Añade al menos una foto a la portada.',
    },
    {
      bloque: 'descripcion', nombre: 'la descripción', tipo: 'texto', valor: datos.descripcion, requerido: true,
    },
    ...CATEGORIAS_PRET_A_PORTER_PAGINA.map(({ id, nombre }) => ({
      bloque: 'categorias', nombre: `la foto de «${nombre}»`, tipo: 'medio', valor: datos.categorias.imagenes[id], requerido: true,
    })),
    {
      bloque: 'categorias', nombre: 'el texto de las categorías', tipo: 'texto', valor: datos.categorias.texto, requerido: true,
    },
  ];
}

// Las 5 categorías de /pret-a-porter, con su foto de cabecera.
export const CATEGORIAS_PRET_A_PORTER_PAGINA = [
  { id: 'vestidos', nombre: 'Vestidos' },
  { id: 'faldas', nombre: 'Faldas' },
  { id: 'pantalones', nombre: 'Pantalones' },
  { id: 'tops-y-camisetas', nombre: 'Tops y camisetas' },
  { id: 'chaquetas-y-abrigos', nombre: 'Chaquetas y abrigos' },
];

// Un bloque de foto + texto nuevo, vacío (el id no cambia al moverlo).
export function nuevoBloqueEditorial() {
  return {
    id: `bloque-${Date.now().toString(36)}`, tipo: 'imagen', src: '', titulo: { es: '', en: '' }, texto: { es: '', en: '' },
  };
}

export const esVideoEditorial = (src) => /\.(mp4|webm|mov)(\?|#|$)/i.test(src || '') || /#video$/.test(src || '');

// Galería final → lo que espera RunwayBackstage: una foto es su ruta y un
// vídeo, { tipo: 'video', src }.
export function galeriaParaWeb(lista = []) {
  return lista.map((src) => (esVideoEditorial(src) ? { tipo: 'video', src } : src));
}

// Campos de la página (ver lib/camposPagina.js). Bloques del editor:
// portada, introduccion, [pestanas], cada bloque (por su id) y galeria.
export function camposEditorial(datos) {
  const campos = [
    {
      bloque: 'portada', nombre: 'la foto de portada', tipo: 'medio', valor: datos.hero.imagen, requerido: true,
    },
    {
      bloque: 'portada', nombre: 'la frase de la portada', tipo: 'texto', valor: datos.hero.subtitulo, requerido: true,
    },
    {
      bloque: 'introduccion', nombre: 'la introducción', tipo: 'texto', valor: datos.descripcion, requerido: true,
    },
  ];
  if (datos.pestanas) {
    campos.push(
      {
        bloque: 'pestanas', nombre: 'el nombre de la 1.ª pestaña', tipo: 'texto', valor: datos.pestanas.atelier, requerido: true,
      },
      {
        bloque: 'pestanas', nombre: 'el nombre de la 2.ª pestaña', tipo: 'texto', valor: datos.pestanas.colecciones, requerido: true,
      },
    );
  }
  if (datos.categorias) {
    campos.push(
      {
        bloque: 'categorias', nombre: 'la foto de las páginas de categoría', tipo: 'medio', valor: datos.categorias.imagen, requerido: true,
      },
      {
        bloque: 'categorias', nombre: 'el texto de las páginas de categoría', tipo: 'texto', valor: datos.categorias.texto, requerido: true,
      },
    );
    if (datos.categorias.subtitulo) {
      campos.push({
        bloque: 'categorias', nombre: 'la frase de las páginas de categoría', tipo: 'texto', valor: datos.categorias.subtitulo, requerido: true,
      });
    }
  }
  datos.bloques.forEach((bloque, indice) => {
    const de = `del bloque ${indice + 1}`;
    campos.push(
      {
        bloque: bloque.id, nombre: `la foto o el vídeo ${de}`, tipo: 'medio', valor: bloque.src, requerido: true,
      },
      {
        bloque: bloque.id, nombre: `el título ${de}`, tipo: 'texto', valor: bloque.titulo, requerido: true,
      },
      {
        bloque: bloque.id, nombre: `el texto ${de}`, tipo: 'texto', valor: bloque.texto, requerido: true,
      },
    );
  });
  return campos;
}
