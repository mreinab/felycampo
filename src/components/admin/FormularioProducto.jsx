'use client';

/* ============================================================
   FORMULARIO DE PRODUCTO — Fely Campo (admin)
   Página única con secciones numeradas (spec 2.3), en vez de wizard:
   todo visible y editable a la vez, mejor para "editar" (no hay que
   re-navegar pasos por un solo campo). Los campos específicos
   dependen del tipo elegido — CAMPOS_TIPO decide qué renderizar, no
   una pila de "if tipo === ...".
   La categoría (antes "Sección web") ya no se elige aquí: se hereda
   del contexto de navegación — tipoInicial/categoriaInicial llegan
   fijados cuando el formulario se abre desde /admin/productos/[tipo]
   o desde un enlace de categoría del sidebar (spec: "the user already
   uploads the product on the section").
   Cambiar el tipo en modo edición pide confirmación explícita (spec:
   "should not be allowed without explicit confirmation") porque
   descarta los campos específicos del tipo anterior.
   ============================================================ */

import {
  useMemo, useRef, useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  Link2, Plus, Search, Upload, X,
} from 'lucide-react';
import {
  PageHeader, FormSeccion, DragList, SelectorIdioma, useToast, useCategorias,
} from '@/components/admin';
import { Boton, Input } from '@/components/ui';
import {
  tiposProducto, coleccionesMock, coloresMock, telasMock, tallasEstandar, ajustesTiendaMock, rutaTipoProducto,
} from '@/components/admin/mockData';
import styles from './FormularioProducto.module.css';

// Compresión de imágenes al subir — evitar que fotos de móvil (varios MB,
// sin redimensionar) lleguen pesadas a la web pública. No dependemos de que
// el usuario elija bien el tamaño: se reescala a un máximo razonable y se
// reencoda en el cliente, sin bloquear la subida en ningún caso.
const IMAGEN_DIMENSION_MAXIMA = 2000;
const IMAGEN_CALIDAD_JPEG = 0.82;
const IMAGEN_AVISO_BYTES = 1.5 * 1024 * 1024;

function extensionDeMime(mime) {
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'jpg';
}

// Esquema "Nombre - Color - TIPO _ Marca" (p.ej. "Sandalias de tacón con
// pompón - Beige - MUJER _ H&M") aplicado al `File` que se sube — nombre
// del producto tal cual lo ha escrito el usuario en este formulario,
// primer color elegido (si hay), y el tipo de producto en mayúsculas
// haciendo de "categoría". Solo cambia el nombre del archivo (metadata),
// no genera ni sube nada — ver aviso de imágenes 100% cliente en
// docs/adminpanel.md sección 5.
function nombreArchivoImagen({
  nombre, colorIds, tipo, posicion, total, mime,
}) {
  const partes = [nombre?.es?.trim() || 'Producto'];

  const colorPrincipal = coloresMock.find((c) => c.id === colorIds[0])?.nombre;
  if (colorPrincipal) partes.push(colorPrincipal);

  const tipoEtiqueta = tiposProducto.find((t) => t.valor === tipo)?.etiqueta;
  if (tipoEtiqueta) partes.push(tipoEtiqueta.toUpperCase());

  const sufijoPosicion = total > 1 ? ` (${posicion})` : '';
  return `${partes.join(' - ')}${sufijoPosicion} _ ${ajustesTiendaMock.nombreTienda}.${extensionDeMime(mime)}`;
}

function comprimirImagen(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => {
      const img = new Image();
      img.onload = () => {
        const escala = Math.min(1, IMAGEN_DIMENSION_MAXIMA / Math.max(img.width, img.height));
        const ancho = Math.round(img.width * escala);
        const alto = Math.round(img.height * escala);
        const canvas = document.createElement('canvas');
        canvas.width = ancho;
        canvas.height = alto;
        canvas.getContext('2d').drawImage(img, 0, 0, ancho, alto);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo comprimir la imagen'))),
          'image/jpeg',
          IMAGEN_CALIDAD_JPEG
        );
      };
      img.onerror = reject;
      img.src = lector.result;
    };
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
}

// Un producto con varias piezas (p.ej. conjunto de dos piezas) puede tener
// una prenda por pieza, cada una con su propio SKU — mismo patrón que
// FormularioLook.jsx "Prendas y SKU". Arranca con una fila vacía para que
// el formulario no se abra sin ningún campo que rellenar.
function prendasIniciales(producto) {
  return producto?.prendas?.length ? producto.prendas : [{ nombre: '', sku: '' }];
}

// Miniatura de tela: recorte cuadrado centrado a 150×150 — a diferencia de
// comprimirImagen() (hasta 2000px, fotos reales del producto), aquí es
// solo una muestra de tejido en un chip, así que se fuerza un tamaño fijo
// pequeño para que el peso se quede bajo sin depender de lo que suba el
// admin. Duplicado de FormularioLook.jsx (no se puede importar una
// función de otro componente 'use client' sin exportarla a propósito).
const TELA_IMAGEN_LADO = 150;

function comprimirImagenTela(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => {
      const img = new Image();
      img.onload = () => {
        const lado = Math.min(img.width, img.height);
        const offsetX = (img.width - lado) / 2;
        const offsetY = (img.height - lado) / 2;
        const canvas = document.createElement('canvas');
        canvas.width = TELA_IMAGEN_LADO;
        canvas.height = TELA_IMAGEN_LADO;
        canvas.getContext('2d').drawImage(img, offsetX, offsetY, lado, lado, 0, 0, TELA_IMAGEN_LADO, TELA_IMAGEN_LADO);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo procesar la imagen de la tela'))),
          'image/jpeg',
          0.85
        );
      };
      img.onerror = reject;
      img.src = lector.result;
    };
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
}

const CAMPOS_TIPO = {
  'pret-a-porter': {
    precio: { requerido: true, placeholder: '890 €' }, tallas: true, colores: true, telas: true, stock: true, coleccion: 'opcional',
  },
  atelier: {
    precio: { requerido: false, placeholder: 'Desde 980 €' }, tallas: false, colores: 'opcional', telas: 'opcional', stock: false, coleccion: 'opcional',
  },
  archivo: {
    precio: false, tallas: false, colores: false, telas: false, stock: false, coleccion: { requerido: true },
  },
  // novia/fiesta: archivos de colecciones pasadas, mismo criterio que
  // archivo/Runway — ver categoriasMock.novia/fiesta en mockData.js.
  novia: {
    precio: false, tallas: false, colores: false, telas: false, stock: false, coleccion: { requerido: true },
  },
  fiesta: {
    precio: false, tallas: false, colores: false, telas: false, stock: false, coleccion: { requerido: true },
  },
};

function FormularioProducto({
  productoExistente, tipoInicial, categoriaInicial, onGuardado,
}) {
  const router = useRouter();
  const { mostrarToast } = useToast();

  const tipoFijado = Boolean(tipoInicial) && !productoExistente;
  const ocultarSeccionTipo = tipoFijado || Boolean(productoExistente);
  const [tipo, setTipo] = useState(productoExistente?.tipo || tipoInicial || '');
  const [categoriaId, setCategoriaId] = useState(productoExistente?.categoriaId || categoriaInicial || '');
  const [idioma, setIdioma] = useState('es');
  const [nombre, setNombre] = useState({ es: productoExistente?.nombre || '', en: '' });
  const [descripcion, setDescripcion] = useState({ es: productoExistente?.descripcionCorta || '', en: '' });
  const [imagenes, setImagenes] = useState(productoExistente?.imagenes || []);
  const [estado, setEstado] = useState(productoExistente?.estado || 'Borrador');
  const [precio, setPrecio] = useState(productoExistente?.precio || '');
  const [tallas, setTallas] = useState(productoExistente?.tallas || []);
  const [colorIds, setColorIds] = useState(productoExistente?.colorIds || []);
  const [telaIds, setTelaIds] = useState(productoExistente?.telaIds || []);
  const [coleccion, setColeccion] = useState(productoExistente?.coleccion || '');
  // El desplegable arranca mostrando solo la colección vigente (fw27,
  // "Otoño-Invierno 2027") — no las 4 temporadas de coleccionesMock, para
  // no enseñar un histórico que hoy no aplica a ningún producto nuevo.
  // Si el producto que se edita ya pertenecía a otra colección (una de
  // las antiguas del mock), se añade también esa para no perder el dato
  // al abrir el formulario. Mismo criterio "demo, sin backend" que
  // coloresDisponibles/telasDisponibles más abajo: una colección añadida
  // aquí no se escribe de vuelta en mockData.js.
  const [coleccionesDisponibles, setColeccionesDisponibles] = useState(() => {
    const vigente = coleccionesMock.filter((c) => c.valor === 'fw27');
    const actual = productoExistente?.coleccion;
    if (actual && !vigente.some((c) => c.valor === actual)) {
      const existente = coleccionesMock.find((c) => c.valor === actual);
      if (existente) return [...vigente, existente];
    }
    return vigente;
  });
  const [estacionColeccionNueva, setEstacionColeccionNueva] = useState('fw');
  const [anioColeccionNuevo, setAnioColeccionNuevo] = useState('');
  const [nombresArchivos, setNombresArchivos] = useState({});
  const [prendas, setPrendas] = useState(() => prendasIniciales(productoExistente));
  // Copia local de coloresMock/telasMock — permite añadir un color/tela
  // nuevos sin salir del modal (mismo criterio "demo, sin backend" que
  // GestorColores.jsx/GestorTejidos.jsx: no se escribe de vuelta en
  // mockData.js, pero el recién creado sí aparece al momento como chip
  // seleccionable aquí).
  const [coloresDisponibles, setColoresDisponibles] = useState(coloresMock);
  const [telasDisponibles, setTelasDisponibles] = useState(telasMock);
  const [nombreColorNuevo, setNombreColorNuevo] = useState('');
  const [hexColorNuevo, setHexColorNuevo] = useState('#000000');
  // El input HEX es texto libre mientras se escribe ("#6E263" a mitad de
  // teclear no es un hex válido todavía) — el swatch nativo <input
  // type="color"> exige siempre un #rrggbb completo, así que recibe esta
  // versión saneada en vez de hexColorNuevo tal cual.
  const hexColorValido = /^#[0-9a-fA-F]{6}$/.test(hexColorNuevo) ? hexColorNuevo : '#000000';
  const [nombreTelaNueva, setNombreTelaNueva] = useState('');
  const [composicionTelaNueva, setComposicionTelaNueva] = useState('');
  const [imagenTelaNueva, setImagenTelaNueva] = useState('');
  const [subiendoImagenTela, setSubiendoImagenTela] = useState(false);
  // Vínculo con el look de Runway/Novia/Fiesta que enseña esta misma
  // pieza en pasarela — `categorias` viene de CategoriasProvider (mismo
  // Context que ListaProductos.jsx/FormularioLook.jsx), así que un look
  // subido/editado en esta misma sesión de admin ya aparece aquí buscable,
  // sin recargar. Al revés (FormularioLook.jsx buscando productos) no
  // tiene ese lujo: productosMock ahí es la copia estática del import,
  // porque no existe un ProductosProvider — ver comentario en ese archivo.
  const { categorias } = useCategorias();
  const [lookVinculado, setLookVinculado] = useState(productoExistente?.lookVinculado || null);
  const [buscarLook, setBuscarLook] = useState('');

  const inputArchivoRef = useRef(null);
  const inputImagenTelaRef = useRef(null);

  async function agregarImagenes(archivos) {
    const lista = Array.from(archivos || []);
    if (!lista.length) return;

    let pesoOriginal = 0;
    let pesoComprimido = 0;
    let algunaPesada = false;
    let posicion = imagenes.length;
    const total = imagenes.length + lista.length;
    const nombresNuevos = {};

    const nuevas = await Promise.all(lista.map(async (archivo) => {
      posicion += 1;
      const miPosicion = posicion;
      pesoOriginal += archivo.size;
      let blobFinal;
      try {
        blobFinal = await comprimirImagen(archivo);
      } catch {
        blobFinal = archivo;
      }
      pesoComprimido += blobFinal.size;
      if (blobFinal.size > IMAGEN_AVISO_BYTES) algunaPesada = true;

      const archivoNombrado = new File(
        [blobFinal],
        nombreArchivoImagen({
          nombre, colorIds, tipo, posicion: miPosicion, total, mime: blobFinal.type,
        }),
        { type: blobFinal.type }
      );
      const url = URL.createObjectURL(archivoNombrado);
      nombresNuevos[url] = archivoNombrado.name;
      return url;
    }));

    setImagenes((actual) => [...actual, ...nuevas]);
    setNombresArchivos((actual) => ({ ...actual, ...nombresNuevos }));

    const enMb = (bytes) => (bytes / (1024 * 1024)).toFixed(1);
    const resumen = `Imágenes optimizadas: ${enMb(pesoOriginal)} MB → ${enMb(pesoComprimido)} MB (demo)`;
    mostrarToast(algunaPesada ? `${resumen}. Alguna sigue pesando bastante — considera recortarla.` : resumen);
  }

  const campos = CAMPOS_TIPO[tipo];
  const idiomasCompletados = ['es', 'en'].filter((cod) => nombre[cod]?.trim() && descripcion[cod]?.trim());
  // Vincular a un look solo tiene sentido para las piezas vendibles
  // (Prêt-à-porter/Atelier) — Runway/Novia/Fiesta ya SON el lado
  // editorial, no un producto que se vincule a sí mismo.
  const esVendible = tipo === 'pret-a-porter' || tipo === 'atelier';

  // Numeración de secciones — Imágenes y Prendas y SKU son siempre 1 y 2;
  // el resto se calcula con un contador porque "Tipo de producto" es
  // opcional (ocultarSeccionTipo) y "Colores"/"Tejidos y Composición" solo
  // existen para los tipos que los usan (CAMPOS_TIPO) — evita reescribir
  // ternarios a mano en cada FormSeccion cuando cambia qué va antes de qué.
  let contadorSeccion = 2;
  const numeroTipo = !ocultarSeccionTipo ? (contadorSeccion += 1) : null;
  const numeroDatos = (contadorSeccion += 1);
  const numeroEspecificos = (contadorSeccion += 1);
  const numeroColeccion = campos?.coleccion ? (contadorSeccion += 1) : null;
  const numeroTallas = campos?.tallas ? (contadorSeccion += 1) : null;
  const numeroColores = campos?.colores ? (contadorSeccion += 1) : null;
  const numeroTejidos = campos?.telas ? (contadorSeccion += 1) : null;
  const numeroVinculo = esVendible ? (contadorSeccion += 1) : null;

  // Aplana categorias.archivo/novia/fiesta → una fila por look ya con
  // alguna imagen o prenda subida (los huecos "Look N" vacíos no aportan
  // nada que buscar). Es la lista que se filtra por nombre/SKU/colección
  // en la sección "Vincular a Runway/Novia/Fiesta".
  const looksBuscables = useMemo(() => {
    const lista = [];
    ['archivo', 'novia', 'fiesta'].forEach((tipoArchivo) => {
      (categorias[tipoArchivo] || []).forEach((cat) => {
        if (!cat.numeroLooks) return;
        for (let i = 0; i < cat.numeroLooks; i += 1) {
          const look = cat.looks?.[i];
          if (!look?.imagenes?.length && !look?.prendas?.length) continue;
          lista.push({
            tipo: tipoArchivo,
            categoriaId: cat.id,
            categoriaNombre: cat.nombre,
            lookIndice: i,
            lookNombre: look.nombre || `Look ${i + 1}`,
            imagen: look.imagenes?.[0],
            prendas: look.prendas || [],
          });
        }
      });
    });
    return lista;
  }, [categorias]);

  const resultadosLook = useMemo(() => {
    const q = buscarLook.trim().toLowerCase();
    if (!q) return looksBuscables;
    return looksBuscables.filter((l) => l.categoriaNombre.toLowerCase().includes(q)
      || l.lookNombre.toLowerCase().includes(q)
      || l.prendas.some((p) => p.nombre?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)));
  }, [looksBuscables, buscarLook]);

  function vincularLook(item) {
    setLookVinculado(item);
    setBuscarLook('');
  }

  function actualizarPrenda(indice, campo, valor) {
    setPrendas((actual) => actual.map((p, i) => (i === indice ? { ...p, [campo]: valor } : p)));
  }

  function agregarPrenda() {
    setPrendas((actual) => [...actual, { nombre: '', sku: '' }]);
  }

  function quitarPrenda(indice) {
    setPrendas((actual) => (actual.length > 1 ? actual.filter((_, i) => i !== indice) : [{ nombre: '', sku: '' }]));
  }

  function anadirColorNuevo() {
    if (!nombreColorNuevo.trim()) return;
    const nuevo = { id: `col${Date.now()}`, nombre: nombreColorNuevo.trim(), hex: hexColorValido };
    setColoresDisponibles((actual) => [...actual, nuevo]);
    setColorIds((actual) => [...actual, nuevo.id]);
    setNombreColorNuevo('');
    setHexColorNuevo('#000000');
  }

  async function agregarImagenTela(archivo) {
    if (!archivo) return;
    setSubiendoImagenTela(true);
    let blobFinal;
    try {
      blobFinal = await comprimirImagenTela(archivo);
    } catch {
      blobFinal = archivo;
    }
    setImagenTelaNueva(URL.createObjectURL(blobFinal));
    setSubiendoImagenTela(false);
  }

  function anadirTelaNueva() {
    if (!nombreTelaNueva.trim()) return;
    const nueva = {
      id: `tel${Date.now()}`,
      nombre: nombreTelaNueva.trim(),
      composicion: composicionTelaNueva.trim(),
      imagen: imagenTelaNueva || undefined,
    };
    setTelasDisponibles((actual) => [...actual, nueva]);
    setTelaIds((actual) => [...actual, nueva.id]);
    setNombreTelaNueva('');
    setComposicionTelaNueva('');
    setImagenTelaNueva('');
  }

  function anadirColeccionNueva() {
    const anio = parseInt(anioColeccionNuevo, 10);
    if (!anio || anio < 2000 || anio > 2099) {
      mostrarToast('Introduce un año válido para la colección');
      return;
    }
    const valor = `${estacionColeccionNueva}${String(anio).slice(-2)}`;
    if (coleccionesDisponibles.some((c) => c.valor === valor)) {
      mostrarToast('Esa colección ya existe');
      return;
    }
    const etiquetaEstacion = estacionColeccionNueva === 'fw' ? 'Otoño-Invierno' : 'Primavera-Verano';
    const nueva = { valor, etiqueta: `${etiquetaEstacion} ${anio}` };
    setColeccionesDisponibles((actual) => [...actual, nueva]);
    setColeccion(valor);
    setAnioColeccionNuevo('');
  }

  function cambiarTipo(nuevoTipo) {
    if (productoExistente && tipo && nuevoTipo !== tipo) {
      const confirmado = window.confirm(
        'Cambiar el tipo de producto descarta los campos específicos del tipo actual (precio, tallas, colección...). ¿Quieres continuar?'
      );
      if (!confirmado) return;
    }
    setTipo(nuevoTipo);
    setCategoriaId('');
  }

  function alternarTalla(talla) {
    setTallas((actual) => (
      actual.some((f) => f.talla === talla)
        ? actual.filter((f) => f.talla !== talla)
        : [...actual, { talla, stock: 0 }]
    ));
  }

  function cambiarStockTalla(talla, stock) {
    setTallas((actual) => actual.map((f) => (f.talla === talla ? { ...f, stock } : f)));
  }

  const MENSAJE_GUARDADO = {
    Activo: 'Producto publicado (demo)',
    Programado: 'Guardado para publicar más tarde — no visible en la web todavía (demo)',
    Borrador: 'Borrador guardado (demo)',
  };

  function guardar(estadoFinal) {
    setEstado(estadoFinal);
    mostrarToast(MENSAJE_GUARDADO[estadoFinal]);

    if (onGuardado) {
      onGuardado({
        id: productoExistente?.id || `p${Date.now()}`,
        tipo,
        categoriaId,
        nombre: nombre.es,
        descripcionCorta: descripcion.es,
        imagen: imagenes[0] || '',
        imagenes,
        ...(campos.precio && { precio }),
        ...(campos.tallas && { tallas }),
        ...(campos.colores && { colorIds }),
        ...(campos.telas && { telaIds }),
        ...(campos.coleccion && { coleccion }),
        prendas: prendas.filter((p) => p.nombre.trim() || p.sku.trim()),
        ...(esVendible && { lookVinculado: lookVinculado || undefined }),
        estado: estadoFinal,
        sku: productoExistente?.sku || `FC-NEW-${Date.now().toString().slice(-4)}`,
      });
      return;
    }

    router.push(tipo ? rutaTipoProducto(tipo) : '/admin/productos');
  }

  return (
    <div>
      <PageHeader
        titulo={productoExistente ? `Editar: ${productoExistente.nombre}` : 'Nuevo producto'}
        subtitulo={productoExistente ? `SKU ${productoExistente.sku}` : 'Completa los pasos en orden'}
      />

      <FormSeccion
        numero={1}
        titulo="Imágenes"
        descripcion="Mínimo 1, recomendado 3-6 — arrastra para reordenar."
        accion={imagenes.length > 0 && (
          <Boton variante="solido" onClick={() => inputArchivoRef.current?.click()}>
            <Upload size={14} />
            Subir otra imagen
          </Boton>
        )}
      >
        <div className={styles.galeria}>
          <div className={styles.subirCaja}>
            {imagenes.length === 0 ? (
              <button type="button" className={styles.subirVacio} onClick={() => inputArchivoRef.current?.click()}>
                <Upload size={22} strokeWidth={1} className={styles.subirIcono} aria-hidden="true" />
                <span>Añadir imagen</span>
              </button>
            ) : (
              <div className={styles.imagenesScroll}>
                <DragList
                  items={imagenes.map((src) => ({ src, nombreArchivo: nombresArchivos[src] }))}
                  claveItem={(item) => item.src}
                  onReorder={(nuevo) => setImagenes(nuevo.map((i) => i.src))}
                  orientacion="horizontal"
                  renderItem={(item, indice) => (
                    <div className={styles.imagenItem}>
                      <img src={item.src} alt="" title={item.nombreArchivo} className={styles.imagenMiniatura} />
                      {indice === 0 && <span className={styles.imagenEtiqueta}>Portada</span>}
                      {indice === 1 && <span className={styles.imagenEtiqueta}>Contra portada</span>}
                      <button
                        type="button"
                        className={styles.imagenQuitar}
                        aria-label="Quitar imagen"
                        onClick={() => setImagenes(imagenes.filter((s) => s !== item.src))}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                />
              </div>
            )}
          </div>
          <p className={styles.subirHint}>
            Se optimizan automáticamente al subirlas. Recomendado: menos de 500 KB, formato WebP/JPEG.
          </p>
          <input
            ref={inputArchivoRef}
            type="file"
            accept="image/*"
            multiple
            className={styles.inputArchivo}
            onChange={(e) => {
              agregarImagenes(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
      </FormSeccion>

      <FormSeccion numero={2} titulo="Prendas y SKU" descripcion="Cada pieza del producto con su código de inventario — útil si es un conjunto de varias piezas.">
        <div className={styles.campoAncho}>
          <div className={styles.prendasLista}>
            {prendas.map((prenda, indice) => (
              // eslint-disable-next-line react/no-array-index-key -- filas sin id propio, reordenar no está soportado
              <div key={indice} className={styles.prendaFila}>
                <Input
                  etiqueta="Prenda"
                  valor={prenda.nombre}
                  onChange={(e) => actualizarPrenda(indice, 'nombre', e.target.value)}
                  placeholder="Pantalón"
                />
                <Input
                  etiqueta="SKU"
                  valor={prenda.sku}
                  onChange={(e) => actualizarPrenda(indice, 'sku', e.target.value)}
                  placeholder="MBO2724"
                />
                <button
                  type="button"
                  className={styles.prendaQuitar}
                  aria-label={`Quitar ${prenda.nombre || 'prenda'}`}
                  onClick={() => quitarPrenda(indice)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <Boton variante="contorno" tamano="s" onClick={agregarPrenda}>
            <Plus size={14} />
            Añadir prenda
          </Boton>
        </div>
      </FormSeccion>

      {!ocultarSeccionTipo && (
        <FormSeccion numero={numeroTipo} titulo="Tipo de producto" descripcion="Determina qué campos y categorías aplican — no se puede cambiar sin confirmación una vez creado.">
          <div className={styles.tipoGrid}>
            {tiposProducto.map((opcion) => (
              <button
                key={opcion.valor}
                type="button"
                className={`${styles.tipoOpcion} ${tipo === opcion.valor ? styles.tipoOpcionActiva : ''}`}
                onClick={() => cambiarTipo(opcion.valor)}
              >
                {opcion.etiqueta}
              </button>
            ))}
          </div>
        </FormSeccion>
      )}

      {tipo && (
        <>
          <FormSeccion numero={numeroDatos} titulo="Datos comunes" descripcion="Nombre y descripción necesitan versión en los dos idiomas del sitio.">
            <div className={styles.campoAncho}>
              <SelectorIdioma idioma={idioma} onChange={setIdioma} completados={idiomasCompletados} />
            </div>
            <Input
              etiqueta={`Nombre (${idioma.toUpperCase()})`}
              valor={nombre[idioma]}
              onChange={(e) => setNombre({ ...nombre, [idioma]: e.target.value })}
            />
            <div className={styles.campoAncho}>
              <span className={styles.etiquetaCampo}>{`Descripción corta (${idioma.toUpperCase()})`}</span>
              <textarea
                className={styles.textarea}
                value={descripcion[idioma]}
                onChange={(e) => setDescripcion({ ...descripcion, [idioma]: e.target.value })}
              />
            </div>
          </FormSeccion>

          <FormSeccion numero={numeroEspecificos} titulo="Campos específicos" descripcion={`Solo lo relevante para ${tiposProducto.find((t) => t.valor === tipo).etiqueta}.`}>
            {campos.precio && (
              <Input
                etiqueta={`Precio${campos.precio.requerido ? '' : ' (opcional)'}`}
                placeholder={campos.precio.placeholder}
                valor={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            )}
          </FormSeccion>

          {campos.coleccion && (
            <FormSeccion numero={numeroColeccion} titulo="Colección" descripcion={`Colección/temporada del producto${campos.coleccion.requerido ? '' : ' (opcional)'} — a la que pertenece hoy.`}>
              <label className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Colección actual</span>
                <select className={styles.selectInput} value={coleccion} onChange={(e) => setColeccion(e.target.value)}>
                  <option value="">Selecciona una colección</option>
                  {coleccionesDisponibles.map((c) => (
                    <option key={c.valor} value={c.valor}>{c.etiqueta}</option>
                  ))}
                </select>
              </label>

              <div className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Añadir una colección nueva</span>
                <div className={styles.anadirFila}>
                  <label>
                    <span className={styles.etiquetaCampo}>Temporada</span>
                    <select className={styles.selectInput} value={estacionColeccionNueva} onChange={(e) => setEstacionColeccionNueva(e.target.value)}>
                      <option value="fw">Otoño-Invierno</option>
                      <option value="ss">Primavera-Verano</option>
                    </select>
                  </label>
                  <Input etiqueta="Año" tipo="number" valor={anioColeccionNuevo} onChange={(e) => setAnioColeccionNuevo(e.target.value)} placeholder="2027" />
                </div>
                {/* Botón subordinado, debajo de los campos en vez de metido en la
                    misma fila — nunca desactivado (la validación del año avisa
                    con un toast en vez de deshabilitar el botón). */}
                <Boton variante="contorno" tamano="s" className={styles.accionAnadirColeccion} onClick={anadirColeccionNueva}>
                  <Plus size={14} />
                  Añadir colección
                </Boton>
              </div>
            </FormSeccion>
          )}

          {campos.tallas && (
            <FormSeccion numero={numeroTallas} titulo="Tallas y Stock" descripcion="Tallas disponibles y stock por talla.">
              <div className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Toca una talla para activarla</span>
                <div className={styles.tallasGrid}>
                  {tallasEstandar.map((t) => {
                    const fila = tallas.find((f) => f.talla === t);
                    const activa = Boolean(fila);
                    return (
                      <div key={t} className={`${styles.tallaBox} ${activa ? styles.tallaBoxActiva : ''}`}>
                        <button type="button" className={styles.tallaBoton} onClick={() => alternarTalla(t)}>
                          {t}
                        </button>
                        {activa && (
                          <input
                            type="number"
                            min={0}
                            className={styles.tallaStock}
                            value={fila.stock}
                            onChange={(e) => cambiarStockTalla(t, Number(e.target.value))}
                            aria-label={`Stock talla ${t}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FormSeccion>
          )}

          {campos.colores && (
            <FormSeccion numero={numeroColores} titulo="Colores" descripcion={`Colores del producto${campos.colores === 'opcional' ? ' (opcional)' : ''}.`}>
              <div className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Toca un color guardado en Materiales para activarlo, o añade uno nuevo</span>
                <div className={styles.coloresGrid}>
                  {coloresDisponibles.map((c) => {
                    const activo = colorIds.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className={`${styles.colorChip} ${activo ? styles.colorChipActivo : ''}`}
                        onClick={() => setColorIds(activo ? colorIds.filter((id) => id !== c.id) : [...colorIds, c.id])}
                      >
                        <span className={styles.colorPunto} style={{ background: c.hex }} />
                        {c.nombre}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.anadirFila}>
                  <label className={styles.campoColor}>
                    <span className={styles.etiquetaCampo}>Selector</span>
                    <input type="color" value={hexColorValido} onChange={(e) => setHexColorNuevo(e.target.value)} className={styles.inputColor} aria-label="Elegir color" />
                  </label>
                  {/* HEX como campo editable junto al swatch — el swatch da el atajo
                      visual rápido, el texto permite pegar/escribir un código exacto;
                      ambos sincronizados con el mismo estado. */}
                  <Input etiqueta="HEX" valor={hexColorNuevo} onChange={(e) => setHexColorNuevo(e.target.value)} placeholder="#6E2635" />
                  <Input etiqueta="Nuevo color" valor={nombreColorNuevo} onChange={(e) => setNombreColorNuevo(e.target.value)} placeholder="Burdeos" />
                  <Boton variante="contorno" tamano="s" onClick={anadirColorNuevo} desactivado={!nombreColorNuevo.trim()}>
                    <Plus size={14} />
                    Añadir color
                  </Boton>
                </div>
              </div>
            </FormSeccion>
          )}

          {campos.telas && (
            <FormSeccion numero={numeroTejidos} titulo="Tejidos y Composición" descripcion={`Telas del producto${campos.telas === 'opcional' ? ' (opcional)' : ''}, con su composición.`}>
              <div className={styles.campoAncho}>
                <span className={styles.etiquetaCampo}>Toca una tela guardada en Materiales para activarla, o añade una nueva</span>
                <div className={styles.telasGrid}>
                  {telasDisponibles.map((t) => {
                    const activo = telaIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        className={`${styles.telaChip} ${activo ? styles.telaChipActivo : ''}`}
                        onClick={() => setTelaIds(activo ? telaIds.filter((id) => id !== t.id) : [...telaIds, t.id])}
                      >
                        {t.imagen && <img src={t.imagen} alt="" className={styles.telaChipImagen} />}
                        <span className={styles.telaChipTexto}>
                          <span className={styles.telaChipNombre}>{t.nombre}</span>
                          <span className={styles.telaChipComposicion}>{t.composicion}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className={styles.anadirFila}>
                  <div className={styles.campoColor}>
                    <span className={styles.etiquetaCampo}>Imagen</span>
                    <button
                      type="button"
                      className={`${styles.inputColor} ${styles.inputImagenTela}`}
                      onClick={() => inputImagenTelaRef.current?.click()}
                      aria-label="Subir foto de la tela"
                    >
                      {imagenTelaNueva ? (
                        <img src={imagenTelaNueva} alt="" className={styles.inputImagenTelaPreview} />
                      ) : (
                        <Upload size={16} strokeWidth={1} aria-hidden="true" />
                      )}
                    </button>
                    <input
                      ref={inputImagenTelaRef}
                      type="file"
                      accept="image/*"
                      className={styles.inputArchivo}
                      onChange={(e) => {
                        agregarImagenTela(e.target.files?.[0]);
                        e.target.value = '';
                      }}
                    />
                  </div>
                  <Input etiqueta="Nueva tela" valor={nombreTelaNueva} onChange={(e) => setNombreTelaNueva(e.target.value)} placeholder="Tafetán" />
                  <Input etiqueta="Composición" valor={composicionTelaNueva} onChange={(e) => setComposicionTelaNueva(e.target.value)} placeholder="70% algodón, 30% poliéster" />
                  <Boton variante="contorno" tamano="s" onClick={anadirTelaNueva} desactivado={!nombreTelaNueva.trim() || subiendoImagenTela}>
                    <Plus size={14} />
                    {subiendoImagenTela ? 'Optimizando…' : 'Añadir tela'}
                  </Boton>
                </div>
              </div>
            </FormSeccion>
          )}

          {esVendible && (
            <FormSeccion numero={numeroVinculo} titulo="Vincular a Runway / Novia / Fiesta" descripcion="Conecta esta pieza con el look de pasarela en el que aparece — así la clienta puede comprarla desde el archivo editorial.">
              <div className={styles.campoAncho}>
                {lookVinculado ? (
                  <div className={styles.vinculoActual}>
                    {lookVinculado.imagen ? (
                      <img src={lookVinculado.imagen} alt="" className={styles.vinculoActualImagen} />
                    ) : <span className={styles.vinculoActualImagen} />}
                    <div className={styles.vinculoActualTexto}>
                      <span className={styles.vinculoActualNombre}>{lookVinculado.lookNombre}</span>
                      <span className={styles.vinculoActualSub}>{lookVinculado.categoriaNombre}</span>
                    </div>
                    <Boton variante="contorno-rosa" tamano="s" onClick={() => setLookVinculado(null)}>
                      <X size={14} />
                      Quitar vínculo
                    </Boton>
                  </div>
                ) : (
                  <p className={styles.vinculoVacio}>Sin vincular todavía — busca por nombre de colección, look o SKU de una prenda.</p>
                )}

                <div className={styles.vinculoBuscador}>
                  <Search size={16} className={styles.vinculoBuscadorIcono} aria-hidden="true" />
                  <input
                    type="text"
                    className={styles.vinculoBuscadorInput}
                    placeholder="Buscar por colección, look o SKU…"
                    value={buscarLook}
                    onChange={(e) => setBuscarLook(e.target.value)}
                  />
                </div>

                <div className={styles.vinculoLista}>
                  {resultadosLook.length === 0 ? (
                    <p className={styles.vinculoVacio}>Sin resultados.</p>
                  ) : resultadosLook.map((item) => {
                    const activo = lookVinculado?.tipo === item.tipo
                      && lookVinculado?.categoriaId === item.categoriaId
                      && lookVinculado?.lookIndice === item.lookIndice;
                    return (
                      <button
                        key={`${item.tipo}-${item.categoriaId}-${item.lookIndice}`}
                        type="button"
                        className={`${styles.vinculoFila} ${activo ? styles.vinculoFilaActiva : ''}`}
                        onClick={() => vincularLook(item)}
                      >
                        {item.imagen ? (
                          <img src={item.imagen} alt="" className={styles.vinculoFilaImagen} />
                        ) : <span className={styles.vinculoFilaImagen} />}
                        <span className={styles.vinculoFilaTexto}>
                          <span className={styles.vinculoFilaNombre}>{item.lookNombre}</span>
                          <span className={styles.vinculoFilaSub}>{item.categoriaNombre}</span>
                        </span>
                        {activo && <Link2 size={14} className={styles.vinculoFilaCheck} aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FormSeccion>
          )}

          <div className={styles.acciones}>
            <Boton variante="contorno" className={styles.accionBorrador} onClick={() => guardar('Borrador')}>Guardar borrador</Boton>
            <Boton variante="contorno" className={styles.accionProgramado} onClick={() => guardar('Programado')}>Publicar más tarde</Boton>
            <Boton variante="solido" onClick={() => guardar('Activo')}>Publicar producto</Boton>
          </div>
        </>
      )}
    </div>
  );
}

export default FormularioProducto;
export { comprimirImagen };
