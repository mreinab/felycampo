# Panel de administración — cómo funciona hoy

Este documento explica, para un programador que va a conectar el panel `/admin` a un backend real, cómo funciona **hoy** la lógica de las tres áreas que ya tienen comportamiento construido: **Pedidos**, **Consultas** (citas/generales y consultas de precio) y **Producto**. El resto de secciones del sidebar (Clientes, Reseñas, Newsletter, Blog, Stock, Materiales, Diseño, Contenido, Extras, Analíticas, Settings, Dashboard) están listadas al final tal cual, sin detalle, porque su diseño de producto todavía no está decidido.

## 1. Arquitectura actual — léase antes de todo

- **Nada persiste.** Cada página usa `useState(xMock)` inicializado desde `src/components/admin/mockData.js`. Cualquier cambio (editar un pedido, cambiar un estado, subir una imagen, borrar un producto) es una mutación de ese estado en memoria del navegador. Al recargar la página, todo vuelve a los valores originales de `mockData.js`.
- **No hay ni una sola llamada `fetch`/API en todo `/admin`.** Todo lo que parece "guardar" (botones "Guardar notas", "Publicar", cambios de estado) solo hace `setState` + `mostrarToast(...)` con el sufijo literal `(demo)`.
- **No hay autenticación ni autorización.** Cualquiera que entre a `/admin/lo-que-sea` ve el panel completo. `src/app/admin/layout.js` es un root layout independiente (hermano de `[locale]`, sin next-intl, sin prefijo de idioma) — no comprueba sesión de ningún tipo.
- **Las imágenes subidas nunca llegan a un servidor.** `FormularioProducto.jsx` comprime la imagen en el propio navegador (canvas, ver más abajo) y genera un `URL.createObjectURL(blob)` — un blob efímero que vive solo en la pestaña actual y desaparece al recargar. No hay subida a ningún storage.
- **Las relaciones entre entidades son casi todas por *nombre de texto libre*, no por id.** Por ejemplo, un pedido no guarda `productoId`, guarda `producto: 'Vestido Aurora'` (string), y la UI busca ese string en `productosMock` con `.find(p => p.nombre === item.producto)`. Esto es fràgil (renombrar un producto rompe la relación) y es una de las cosas más importantes a corregir con id reales al construir el backend.
- Stack: Next.js App Router, Client Components (`'use client'`) en todo el panel porque `TablaAdmin`/`DragList`/etc. reciben props función (render/onClick) que no pueden cruzar el límite servidor→cliente. CSS Modules, sin librería de estado global (solo `useState` local + dos Context providers: `CategoriasProvider` y `ToastProvider`, ver más abajo).

## 2. Patrones y componentes compartidos

### `TablaAdmin.jsx`
Tabla genérica sin lógica de datos propia — solo pinta filas. Props relevantes:
- `columnas`: array de `{ clave, etiqueta, render? }`. Si no hay `render`, pinta `fila[clave]` tal cual.
- `filas`, `claveFila` (por defecto `fila.id`).
- `seleccionables` + `seleccionadas` + `onToggleSeleccion` + `onToggleTodas`: checkboxes para acciones en bloque (usado en Producto).
- `renderAcciones`: columna final de acciones (botones "Ver"/"Editar"/"Duplicar"...).
- `hrefFila(fila)`: si se pasa, toda la fila navega a esa URL al hacer click (usado en Pedidos y Consultas).
- `onClickFila(fila)`: alternativa a `hrefFila` para disparar una función en vez de navegar — hoy solo lo usa Producto, para abrir el modal de edición al hacer click en cualquier parte de la fila. Si se pasan ambos, gana `hrefFila`.
- Los `<td>` de checkbox y de acciones hacen `stopPropagation()` para no disparar la navegación/acción de fila al hacer click en ellos.
- **No pagina.** Renderiza el 100% del array filtrado. Con datos reales y catálogos grandes, esto necesitará paginación (server-side o al menos virtualización).

### Badges de estado (fondo de color, solo para tablas internas — no confundir con `<Etiqueta>`, que es texto plano sin fondo y se usa en la web pública)
Cada badge sigue el mismo patrón: un objeto `CONFIG` que mapea un estado interno a `{ etiqueta, clase }`, una función `calcularX(valorCrudo)` que traduce el valor real del dato a esa clave interna, y dos exports (el componente default + `calcularX`/`CONFIG_X` con nombre, importados directamente desde el archivo, no desde el barrel `index.js`). El campo `clase` se reutiliza también en `TabsFiltro` para pintar las pestañas del mismo color — los valores hex están **duplicados a mano** en `TabsFiltro.module.css` porque un CSS Module no puede importar clases de otro.

| Badge | Archivo | Estados (valor crudo → clase/color) |
|---|---|---|
| `EstadoBadge` | `EstadoBadge.jsx` | Envoltorio simple de `<Etiqueta>` (sin fondo). Mapea muchos valores textuales sueltos (`Activo`, `Pendiente`, `Pagado`, `Cerrado`, `Fallido`...) a 4 variantes visuales de `<Etiqueta>` (`tinta`/`rosa`/`velo`/`agotado`). Es el badge "genérico" usado donde no hay un badge dedicado (pago de pedido, estado de consulta general). |
| `EstadoPedidoBadge` | `EstadoPedidoBadge.jsx` | `Procesando`→"En proceso" (azul, `enProceso`), `Enviado`→"Enviado" (amarillo, `enviado`), `Entregado`→"Completado" (verde, `completado`). El campo real `estadoEnvio` del pedido **no cambia de nombre**, esto solo re-etiqueta visualmente. Exporta también `SIGUIENTE_ESTADO` (`Procesando→Enviado→Entregado→null`), aunque hoy el detalle de pedido no lo usa para avanzar automáticamente: el usuario elige directamente cualquiera de los 3 botones. |
| `EstadoContactoBadge` | `EstadoContactoBadge.jsx` | Binario: `estado === 'Pendiente'` → `pendiente` (amarillo, "Pendiente de contactar"); cualquier otro valor (incluido `'Contactado'` o un futuro `'Cerrado'`) → `contactado` (verde). Se usa en Consultas de precio. |
| `EstadoPublicacionBadge` | `EstadoPublicacionBadge.jsx` | 4 estados de producto: `Activo`→`publicado` (verde), `Programado`→`programado` ("Esperando a publicar", amarillo), `Archivado`→`archivado` (gris), cualquier otro valor (incluido `Borrador`) → `borrador` (azul claro). Se usa en Producto. |
| `OrigenProductoBadge` | `OrigenProductoBadge.jsx` | Solo para Consultas de precio: recibe el **nombre** del producto consultado, lo busca en `productosMock` por `nombre`, y según `categoriaId` devuelve `novias` (`cat3`, rosa), `fiesta` (`cat4`, naranja) o, si no encuentra el producto o su categoría no es esa, `atelier` (genérico, azul). |

### `ModalOverlay.jsx`
Diálogo centrado a pantalla completa. Fondo oscuro como `<div>` hermano del panel (para que su opacidad no se herede al contenido). Cierra con click fuera del panel, tecla `Escape`, o el botón `X`. No tiene lógica de guardado propia — el formulario que envuelve (`FormularioProducto`) es quien decide qué pasa al confirmar. Usado hoy solo en Producto (alta y edición).

### `TabsFiltro.jsx` / `FiltroBar.jsx`
`TabsFiltro`: pestañas subrayadas para filtrar la tabla de abajo; cada opción puede llevar `clase` para heredar el color de un badge de estado (ver tabla arriba). `FiltroBar`: fila de controles de filtro/búsqueda (inputs, `FiltroSelector` que es un `<select>` estilizado). Ambos son puramente de presentación — el filtrado real es `Array.filter` en cada página, no hay lógica compartida de query.

### `PageHeader`, `BotonVolver`, `Toast` (`useToast`)
`PageHeader` pinta título/subtítulo y un slot `children` que se renderiza a la derecha (usado para los selectores de estado de 3/2 botones en pedidos y consultas de precio). `BotonVolver` es un link "volver" con `href` explícito (nunca `router.back()`). `useToast().mostrarToast(mensaje)` dispara una notificación temporal — es el único feedback que recibe el usuario tras cualquier "guardado", y siempre incluye el sufijo `(demo)` para dejar claro que no persiste.

### `Categorias.jsx` (`CategoriasProvider` / `useCategorias`)
Context (mismo patrón que `Toast`) que envuelve todo el panel en `layout.js`. Guarda `categoriasMock` en estado compartido para que una categoría creada/ocultada/reordenada en `/admin/categorias` se refleje al instante en el sidebar y en los filtros de Producto sin recargar. Expone `anadirCategoria(tipo, nombre)`, `alternarVisible(tipo, id)`, `reordenarCategorias(tipo, nuevaLista)`. Igual que el resto: solo memoria, se pierde al recargar.

---

## 3. Sección Pedidos

**Rutas:** `/admin/pedidos` (listado) y `/admin/pedidos/[id]` (detalle). Solo Prêt-à-porter genera pedidos (Atelier genera Consultas, ver sección 4; Archivo no genera transacciones — así lo dice el comentario del propio código).

**Datos:** `pedidosMock`. Cada pedido tiene (campos vistos en uso real): `id` (p.ej. `FC-2031`), `cliente` (nombre en texto libre, no id), `fecha`, `total`, `estadoPago` (`Pendiente`/`Pagado`/`Fallido`), `estadoEnvio` (`Procesando`/`Enviado`/`Entregado`), `direccionEnvio`, `tracking`, `notasInternas`, `items: [{ producto, talla, color, cantidad, precio }]` — de nuevo `producto` y `color` son strings, no ids (se resuelven contra `productosMock`/`coloresMock` buscando por nombre).

**Listado (`/admin/pedidos/page.js`):**
- Filtros 100% client-side sobre el array completo: `estadoPago` (select), `estadoEnvio` (tabs `TabsFiltro`, con la lectura inicial desde `?estadoEnvio=` en la URL — así el dashboard puede enlazar directamente a "pedidos sin enviar"), rango de fechas `desde`/`hasta` (comparación de strings ISO), búsqueda de texto libre sobre `id + cliente`, y un selector "Fecha" que ordena `Más recientes`/`Más antiguos`.
- Columna "Pedido" muestra un icono de nota (`StickyNote`) con tooltip CSS-only si `notasInternas` no está vacío.
- Columna de miniatura: resuelve la imagen de cada `item.producto` contra `productosMock` (por nombre) y muestra la primera + un contador `+N` si hay más de un artículo.
- Columna "Pago" usa `EstadoBadge` (genérico); columna "Estado" usa `EstadoPedidoBadge`.
- Fila entera clicable (`hrefFila`) hacia el detalle.

**Detalle (`/admin/pedidos/[id]/page.js`):**
- Busca el pedido por `id` en `pedidosMock`; si no existe, `notFound()`.
- Selector de estado de envío: 3 botones (`Procesando`/`Enviado`/`Entregado`, coloreados con `CONFIG_ESTADO_PEDIDO`) en la esquina superior derecha del `PageHeader`. Al pulsar uno, `setPedido({ ...pedido, estadoEnvio: nuevo })` + toast — **no hay flujo forzado de orden**, el usuario puede saltar directamente de "Procesando" a "Entregado" o volver atrás sin restricción.
- Resumen: Cliente, Fecha, Total, Dirección de envío, y un campo de texto libre para "Nº de seguimiento" que se autoguarda en el estado local en cada `onChange` (sin botón "Guardar", sin validación de formato).
- Tabla de artículos (`items`): imagen (por nombre de producto), producto, talla, color (con muestra de color resuelta por nombre contra `coloresMock`), cantidad, precio. Es de solo lectura — no se pueden añadir/quitar/editar artículos desde aquí.
- Notas internas: `<textarea>` + botón "Guardar notas" que solo hace `mostrarToast(...)`, no persiste nada realmente distinto de lo que ya estaba en el estado local del componente.
- Bloque final "Estado del pedido": `EstadoTimeline` con 4 pasos fijos (`Recibido, Confirmado, Enviado, Entregado`) — el paso activo se deriva de `estadoEnvio` vía `INDICE_PASO = { Procesando: 1, Enviado: 2, Entregado: 3 }`. Es puramente visual, no aporta datos nuevos.

**Qué necesita el backend:**
- Endpoints: `GET /pedidos` (con filtros de pago/envío/fecha/búsqueda — hoy todo eso vive en el cliente y habría que decidir cuánto mover a query params reales), `GET /pedidos/:id`, `PATCH /pedidos/:id` (estado de envío, tracking, notas internas).
- Modelo de datos: pedido con `clienteId` (FK real, no nombre en texto), `items` con `productoId` + `varianteId` (talla/color) en vez de strings sueltos.
- Historial de cambios de estado de envío si se quiere auditoría (hoy no se guarda cuándo cambió cada estado, solo el estado actual).
- Integración de tracking real (¿un transportista concreto? hoy es un campo de texto libre sin validar).
- Decidir si el salto de estado debe ser libre (como ahora) o forzado a seguir el orden de `SIGUIENTE_ESTADO`.

---

## 4. Sección Consultas

Hay **dos variantes completamente independientes**, con su propio mock, sus propias rutas y su propio badge — no comparten código de listado.

### 4.1 Consultas / Citas generales

**Rutas:** `/admin/consultas` y `/admin/consultas/[id]`. Cubre consultas de Atelier (Novias/Fiesta) y formularios de contacto general — cualquier cosa que no sea específicamente el botón "Precio a consultar" (eso es la otra variante).

**Datos:** `consultasMock`. Campos en uso: `id`, `cliente: { nombre, email }` (objeto anidado, no `clienteId`), `tipo` (`Consulta`/`Cita`), `asunto`, `fecha`, `estado` (`Pendiente`/`Contactado`/`Cerrado`), `mensaje`, `productoRelacionado` (nombre de producto en texto libre, opcional).

**Listado:** filtros por `tipo`, `estado` (con lectura inicial de `?estado=` en la URL, usado por el enlace del dashboard) y búsqueda por `cliente.nombre`. Columna "Estado" con `EstadoBadge` genérico (no tiene badge dedicado como las consultas de precio). Fila clicable al detalle.

**Detalle:**
- `productoRelacionado` se resuelve contra `productosMock` por nombre; si hay match, enlaza a la edición del producto.
- Selector de estado: aquí es un `<select>` con 3 opciones (`Pendiente`/`Contactado`/`Cerrado`) + un botón directo "Marcar como cerrada" — **no** son botones de color como en Pedidos/Consultas de precio, es un patrón de UI distinto dentro de la misma sección del panel.
- Mantiene un `historial` en estado local: cada cambio de estado añade `{ estado, fecha: hoy }` a un array que se pinta como lista — pero este historial nace vacío en cada carga de página (solo arranca con la entrada `Pendiente` inicial) y se pierde igual que todo lo demás al recargar. Si se quiere historial real hace falta persistirlo en el backend con timestamp de servidor.
- Notas internas: mismo patrón que Pedidos (`textarea` + botón que solo hace toast).

### 4.2 Consultas de precio

**Rutas:** `/admin/consultas-precio` y `/admin/consultas-precio/[id]`. Nace porque los productos de Atelier no muestran precio en la ficha pública — en su lugar hay (o debería haber) un botón "Precio a consultar" que deja estos datos de contacto. **Importante:** esta sesión de trabajo construyó a fondo el panel admin de esta sección, pero **el botón público "Precio a consultar" en la ficha de producto de Atelier no se ha implementado** — hoy `consultasPrecioMock` es solo un dataset de ejemplo, no hay ningún flujo real en el sitio público que genere estas filas.

**Datos:** `consultasPrecioMock`. Campos: `id`, `producto` (**nombre en texto libre**, no `productoId` — es la relación más frágil de todo el panel: si se renombra un producto, `OrigenProductoBadge` y el detalle dejan de encontrarlo), `color` (nombre, opcional, puede ser `null`), `fecha`, `nombre`, `email`, `telefono`, `clienteId` (`null` si quien pregunta no es cliente registrado — este sí es un id real, a diferencia de `producto`), `estado` (`'Pendiente'` | `'Contactado'` — binario, ver `EstadoContactoBadge` arriba), `mensaje` (opcional), `notasInternas` (opcional).

**Listado:**
- Filtros: estado de contacto (tabs `TabsFiltro`), "Cliente" (`Todos`/`Registrados`/`No registrados`, según si `clienteId` es truthy), búsqueda de texto sobre `nombre + producto`.
- **Orden por defecto: más recientes primero** (`sort` por `fecha` descendente) — a diferencia de Consultas/Citas generales, que no fuerza ningún orden.
- Columna "Producto": badge `OrigenProductoBadge` (arriba) + nombre del producto.
- Columna "Recibida": texto derivado `Hace N días` (`calcularDias` = días completos desde `fecha` hasta `Date.now()`, `Hoy` si `dias <= 0`, `Hace 1 día` para `dias === 1`). **Regla de urgencia:** si `dias >= 4` **y** el estado sigue siendo `pendiente` (`calcularEstadoContacto(c.estado) === 'pendiente'`), el texto se pinta en `var(--color-rosa-oscuro)` (clase `.recibidaUrgente`) para llamar la atención sobre consultas sin responder hace tiempo. Si ya está `Contactado`, nunca se marca en rosa aunque hayan pasado muchos días.
- Columna "Nombre" añade una etiqueta "Cliente" junto al nombre si `clienteId` no es `null`.

**Detalle:**
- Selector de estado: 2 botones (`Pendiente de contactar` / `Contactado`) en el `PageHeader`, mismo patrón visual que Pedidos pero con 2 opciones en vez de 3.
- `productoRelacionado` = `productosMock.find(p => p.nombre === consulta.producto)` (misma relación frágil por nombre). Si no hay match, se muestra el string crudo sin enlace ni imagen.
- Tabla "Producto de interés" (una sola fila, la propia consulta): imagen del producto relacionado, badge de origen + nombre/enlace de edición, color (con muestra visual resuelta por nombre contra `coloresMock`).
- Bloque "Mensaje" (solo si `mensaje` no está vacío), estilizado en cursiva entre comillas generadas por CSS.
- Bloque "Cliente registrado": si `clienteId` existe, enlaza a `/admin/clientes/:id`; si no, texto "No — visitante sin cuenta".
- "Notas internas": mismo patrón textarea + toast que el resto del panel.

**Qué necesita el backend (ambas variantes):**
- Endpoint real para el formulario público que genera estas filas (`POST /consultas` y `POST /consultas-precio`, con envío de email de notificación al equipo — hoy no se envía ningún email, es 100% mock).
- Reemplazar `producto` (string) por `productoId` en `consultasPrecioMock`/`consultasMock` — es el fix de datos más importante de esta sección.
- Persistir el historial de cambios de estado con timestamp de servidor (hoy solo existe, y de forma efímera, en Consultas/Citas).
- Decidir si el umbral de "4 días sin contactar → aviso visual" debe ser configurable (hoy es un `4` hardcodeado en `page.js`) y si además de un cambio de color debería disparar una notificación real al equipo.
- Endpoint `PATCH` para cambiar estado y guardar notas internas en ambas variantes.

---

## 5. Sección Producto

**Rutas:** `/admin/productos` (todos), `/admin/productos/pret-a-porter`, `/admin/productos/atelier`, `/admin/productos/archivo` — las 4 rutas renderizan el mismo componente `ListaProductos.jsx` con un prop `tipoFijo` distinto (o ninguno en la ruta general). No hay lógica distinta en `archivo`: es la misma tabla y el mismo formulario, solo con menos campos activos según `CAMPOS_TIPO.archivo` (ver abajo). No existe una página de detalle de solo-lectura — "ver" un producto abre el mismo modal de edición que "Editar".

**Datos:** `productosMock`, más las bibliotecas reutilizables `categoriasMock` (por tipo, vía `CategoriasProvider`), `coloresMock`, `telasMock`, `coleccionesMock`, `tiposProducto` (`pret-a-porter`/`atelier`/`archivo`), `tallasEstandar` (`XS`–`XXL`, lista fija). Un producto tiene: `id`, `tipo`, `categoriaId` (FK real a `categoriasMock[tipo]`), `nombre`, `descripcionCorta`, `imagen` (portada) + `imagenes` (array), `precio` (string libre tipo `"890 €"`, no numérico), `tallas: [{ talla, stock }]`, `colorIds`/`telaIds` (arrays de FK reales a `coloresMock`/`telasMock` — esta relación sí es por id, a diferencia de pedidos/consultas), `estado` (`Borrador`/`Activo`/`Programado`/`Archivado`), `coleccion` (valor de `coleccionesMock`), `sku`.

### Listado (`ListaProductos.jsx`)
- Filtros client-side: tipo (oculto si `tipoFijo` viene fijado por la ruta), colección, estado de publicación (tabs, vía `EstadoPublicacionBadge`/`calcularEstadoPublicacion`), búsqueda sobre `nombre + sku`. Si la categoría llega por `?categoria=`, filtra también por `categoriaId`.
- Si `agruparPorCategoria` está activo (usado por las rutas de tipo) y no hay `?categoria=` seleccionada, en vez de la tabla se muestra una rejilla de tarjetas, una por categoría visible de ese tipo, que enlazan a `?categoria=X`.
- Selección múltiple (checkboxes) + barra de acciones en bloque cuando hay algo seleccionado: **Publicar** (`estado: 'Activo'`, verde), **Archivar** (`estado: 'Archivado'`, gris — antes se llamaba "Desactivar" y ponía `Borrador`, se corrigió para que el nombre coincida con lo que realmente hace), **Borrar** (rojo, con **doble `window.confirm()`** antes de ejecutar `setProductos(actual => actual.filter(...))`), y una X para deseleccionar todo.
- Fila entera clicable (`onClickFila`, no `hrefFila`: abre el modal de edición en vez de navegar) además del botón "Editar" explícito en la columna de acciones. "Duplicar" solo muestra un toast, no crea realmente una copia.
- Alta y edición comparten el mismo componente `FormularioProducto` dentro de un `ModalOverlay`: alta con `tipoInicial`/`categoriaInicial` (heredados de la ruta/categoría desde la que se abrió, por eso el formulario no deja elegir categoría manualmente); edición con `productoExistente`.

### `FormularioProducto.jsx`
- Secciones numeradas con `FormSeccion` (1 Imágenes, [2 Tipo de producto — solo en alta sin tipo fijado], Datos comunes, Campos específicos), todas visibles a la vez, no es un wizard paso a paso.
- **Imágenes:** al subir un archivo, se comprime en el propio navegador antes de nada — `comprimirImagen()` usa `<canvas>` para reescalar al máximo 2000px en el lado más largo y reencodar a JPEG calidad 0.82, luego `URL.createObjectURL(blob)`. Esto **no sube nada a ningún servidor**: es un blob local que vive solo mientras la pestaña esté abierta. Reordenable por drag & drop (`DragList`); la primera imagen es "Portada" y la segunda "Contra portada" (solo etiquetas visuales, no hay campos separados para eso en el modelo de datos).
- **Tipo de producto:** oculto si ya viene fijado por la ruta (alta desde `/admin/productos/pret-a-porter`, por ejemplo) o si se está editando un producto existente (para evitar cambios accidentales de tipo desde el modal de edición). Cambiar el tipo con datos ya escritos pide confirmación (`window.confirm`) porque descarta los campos específicos del tipo anterior.
- **Campos específicos por tipo** (`CAMPOS_TIPO`): `pret-a-porter` tiene precio obligatorio + tallas + colores + telas + stock; `atelier` tiene precio opcional (placeholder "Desde 980 €") + colores/telas opcionales, sin tallas ni stock; `archivo` no tiene ninguno de esos campos, solo colección obligatoria. El botón principal que se mostraría en la ficha pública también depende del tipo (`"Añadir al carrito"` / `"Solicitar cita"` / ninguno) — es solo texto informativo dentro del formulario, no genera nada real.
- **Nombre/Descripción con selector de idioma ES/EN** (`SelectorIdioma`): el formulario permite escribir ambos idiomas y marca cuáles están "completados", **pero al guardar (`guardar()`) solo se persiste `nombre.es`/`descripcion.es`** — el texto en inglés se escribe en el formulario y se descarta sin avisar al usuario. Esto es una laguna real a resolver: o se decide un modelo de datos i18n (`nombre: { es, en } `) y se guarda de verdad, o se quita el selector de idioma si no va a usarse todavía.
- Al guardar, tres botones con distinto `estado` final: **Guardar borrador** (`Borrador`), **Publicar más tarde** (`Programado`), **Publicar** (`Activo`) — cada uno dispara `onGuardado(productoCompleto)` con un toast distinto. Un producto nuevo recibe `id: 'p' + Date.now()` y `sku: 'FC-NEW-' + timestamp` — ids no deterministas, claramente provisionales.

### Relación con Categorías (`Categorias.jsx` / `/admin/categorias`)
- `categoriasMock` vive en el `CategoriasProvider` (Context), no en cada página — así una categoría añadida/ocultada/reordenada en `/admin/categorias` se refleja al instante en el sidebar (submenús bajo cada tipo de producto) y en los filtros del listado de productos, sin recargar.
- Solo Prêt-à-porter y Atelier admiten categorías nuevas/reordenables (drag & drop vía `DragList`); Archivo tiene una estructura fija de 2 categorías (`Runway`, `Colecciones`, marcadas `fija: true` en el mock) que no se pueden añadir ni reordenar desde la UI.
- `alternarVisible` oculta una categoría del menú público sin borrar sus productos — pero hoy nada impide dejar productos "huérfanos" en una categoría oculta o borrada; no hay validación de integridad referencial en el cliente.

**Qué necesita el backend:**
- Endpoints: `GET/POST /productos`, `GET/PATCH/DELETE /productos/:id`, bulk `PATCH /productos?ids=...` para las acciones en bloque; `GET/POST/PATCH /categorias`.
- Subida de imágenes real: endpoint de upload (o URL prefirmada a un storage tipo S3/Cloudinary) que sustituya `URL.createObjectURL`; decidir si la compresión client-side actual (canvas → JPEG 0.82, máx. 2000px) se mantiene antes de subir o se mueve al servidor.
- Modelo de datos i18n real para `nombre`/`descripcionCorta` si el selector ES/EN va a usarse de verdad (hoy se pierde el inglés al guardar).
- `precio` como valor numérico + moneda en vez de string libre `"890 €"`, para poder ordenar/filtrar/sumar de verdad.
- Ids reales y estables al crear (hoy `Date.now()`), generados por el backend.
- Decidir si "Duplicar" y "Borrar" (con la doble confirmación ya implementada en el cliente, que debería mantenerse o replicarse en el backend) deben ser operaciones reversibles (soft delete) dado que hoy "Borrar" es irreversible en el propio flujo del cliente.
- Validación de integridad: no permitir borrar/ocultar una categoría con productos activos sin decidir qué pasa con ellos.

---

## 6. Trabajo backend transversal (no específico de una sección)

Por prioridad aproximada:

1. **Autenticación y autorización del panel.** Hoy `/admin/*` es público — cualquiera con la URL entra. Es el hueco más urgente antes de conectar datos reales.
2. **Persistencia real (base de datos).** Sustituir `mockData.js` por endpoints. Todas las páginas ya están escritas asumiendo un array + `useState`, así que el cambio principal es sustituir el array por el resultado de un `fetch`/`use` y las mutaciones locales por llamadas `POST`/`PATCH`/`DELETE`.
3. **Subida y almacenamiento real de imágenes**, sustituyendo los blobs `URL.createObjectURL` (afecta a Producto; las otras dos secciones documentadas aquí no suben imágenes).
4. **Relaciones por id en vez de nombre de texto libre.** El caso más frágil es `consultasPrecioMock.producto` / `consultasMock.productoRelacionado` / `pedidosMock.items[].producto` / `pedidosMock.cliente`, todos strings que se resuelven por búsqueda de nombre en el cliente. Deberían ser `productoId`/`clienteId` reales.
5. **Envío de emails/notificaciones reales** para consultas nuevas (general y de precio) — hoy no se envía nada, solo se ve en el panel si alguien entra a mirarlo.
6. **Internacionalización real de contenido de producto** (nombre/descripción ES/EN) — el formulario ya tiene la UI pero descarta el inglés al guardar.
7. **Paginación / búsqueda server-side** si el catálogo de productos o el volumen de pedidos/consultas crece — `TablaAdmin` hoy renderiza el array filtrado completo sin límite.
8. **Historial de estado con timestamps de servidor** (pedidos, consultas, consultas de precio) — hoy en el mejor de los casos (Consultas/Citas) hay un historial que nace vacío en cada carga de página.

## 7. Resto de secciones del sidebar (sin explorar — pendientes de decisión de producto)

- **Home/Dashboard** (`/admin`)
- **Clientes** (`/admin/clientes`)
- **Newsletter** (`/admin/newsletter`)
- **Reseñas** (`/admin/resenas`)
- **Stock** (`/admin/stock`)
- **Analíticas** (`/admin/analiticas`)
- **Diseño** (`/admin/diseno`)
- **Contenido** (`/admin/contenido`)
- **Blog** (`/admin/blog`)
- **Materiales** (`/admin/materiales`)
- **Extras** (`/admin/extras`)
- **Settings** (`/admin/settings`)

Todas siguen el mismo patrón general descrito en la sección 1 (mock en memoria, sin backend), pero no se han documentado en detalle aquí porque su diseño de producto todavía está por decidir.
