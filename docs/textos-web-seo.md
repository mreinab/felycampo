# Textos públicos de felycampo.com — para revisión SEO

Extraído del código de la web el 2026-10-22. Solo español (la web también tiene versión en inglés, con los mismos textos traducidos en `messages/en.json` y en las claves `en` de los archivos de datos).

## Instrucciones para la IA

Eres un experto en SEO y redacción para moda de lujo. Este documento contiene todos los textos públicos de la web de **Fely Campo**, firma española de moda de autor nacida en Salamanca: vestidos de novia y de fiesta (madrina, invitada) diseñados y confeccionados a medida en sus ateliers de **Salamanca, Madrid y Oviedo**, colecciones de pasarela y prêt-à-porter online. Confección 100 % en España, con talleres propios y cooperativas de mujeres del medio rural de Castilla y León.

Tu tarea: proponer versiones mejoradas para SEO de estos textos, manteniendo la voz de la marca (elegante, cálida, cercana, artesanal, nunca agresivamente comercial).

Reglas:

1. **Conserva la clave** de cada texto (lo que aparece entre `comillas invertidas`) para que los cambios se puedan aplicar en el código. Devuelve los textos con el formato `clave: texto nuevo`.
2. **Titles**: 50–60 caracteres, palabra clave principal al principio y la marca al final (`… | Fely Campo`). **Meta descriptions**: 140–160 caracteres, con llamada a la acción. Ninguno puede repetirse entre páginas.
3. Palabras clave de referencia: vestidos de novia a medida, vestidos de fiesta a medida, vestido de madrina, vestido de invitada de boda, atelier de novias en Salamanca / Madrid / Oviedo, moda de autor hecha en España, prêt-à-porter.
4. No inventes datos (precios, fechas, premios, direcciones, nombres de personas o colecciones). Si falta información útil para el SEO, indícalo como sugerencia aparte.
5. Los textos de interfaz cortos (botones, menús, formularios) solo deben cambiarse si mejoran claramente la experiencia o el SEO; prioriza las secciones marcadas como **Alta**.
6. Los textos en primera persona de Fely Campo (Sobre Fely, citas) y los relatos del blog son voz de autora: mejora titulares, entradillas y estructura, pero no reescribas el contenido personal.
7. Las páginas de producto y de categoría que no aparecen con SEO propio generan su title y description automáticamente a partir del nombre y la descripción del producto o colección; por eso esas descripciones también cuentan para el SEO.

---

## Global: menú, pie de página, avisos

**URL:** todas las páginas · **Prioridad SEO:** Media

Textos que aparecen en todas las páginas: navegación, migas de pan, footer, newsletter, aviso de cookies, botón de WhatsApp y página 404.

#### Textos de interfaz (`messages/es.json` → `nav`)

- `nav.links.tienda`: Prêt-à-porter
- `nav.links.atelier`: Atelier
- `nav.links.colecciones`: Colecciones
- `nav.links.elMundoDeFely`: Sobre Fely
- `nav.links.puntosDeVenta`: Dónde encontrar Fely Campo
- `nav.links.puntosDeVentaCorto`: Dónde encontrarnos
- `nav.links.pedirCita`: Pedir cita
- `nav.submenus.tienda.verTodos`: Ver todos
- `nav.submenus.tienda.tops`: Tops y Camisas
- `nav.submenus.tienda.coats`: Chaquetas y Abrigos
- `nav.submenus.tienda.faldas`: Faldas
- `nav.submenus.tienda.pantalones`: Pantalones
- `nav.submenus.tienda.vestidos`: Vestidos
- `nav.submenus.atelier.novias`: Novias
- `nav.submenus.atelier.fiesta`: Fiesta
- `nav.submenus.atelier.vosotras`: Vosotras
- `nav.submenus.atelier.salamanca`: Atelier Salamanca
- `nav.submenus.atelier.madrid`: Atelier Madrid
- `nav.submenus.atelier.oviedo`: Atelier Oviedo
- `nav.submenus.atelier.nuestroAtelier`: Nuestro Atelier
- `nav.submenus.colecciones.fiesta`: Colección Fiesta
- `nav.submenus.colecciones.novias`: Colección Novias
- `nav.submenus.colecciones.pretaporter`: Prêt-à-porter
- `nav.submenus.colecciones.runway`: Runway
- `nav.submenus.elMundoDeFely.historia`: Historia
- `nav.submenus.elMundoDeFely.podcast`: Podcast
- `nav.submenus.elMundoDeFely.talleres`: Nuestros talleres
- `nav.submenus.puntosDeVenta.propios`: Propios
- `nav.submenus.puntosDeVenta.externos`: Boutiques Selectas
- `nav.actions.wishlist`: Wishlist
- `nav.actions.miCuenta`: Mi cuenta
- `nav.actions.carrito`: Carrito
- `nav.aria.abrirMenu`: Abrir menú
- `nav.aria.cerrarMenu`: Cerrar menú
- `nav.aria.carrito`: Carrito
- `nav.aria.volverMenu`: Volver
- `nav.movil.menu`: Menú
- `nav.movil.verTodo`: Ver todo
- `nav.movil.paso`: Paso {actual} de {total}

#### Textos de interfaz (`messages/es.json` → `breadcrumb`)

- `breadcrumb.ariaLabel`: Miga de pan

#### Textos de interfaz (`messages/es.json` → `footer`)

- `footer.newsletter.texto`: Suscríbete y sé la primera en conocer ofertas, colecciones limitadas y novedades.
- `footer.newsletter.consentimiento`: Al enviar tu email, aceptas nuestra <privacidad>Política de privacidad</privacidad>.
- `footer.newsletter.politicaEnlace`: Política de privacidad
- `footer.newsletter.enviar`: Enviar
- `footer.newsletter.suscribirse`: Suscribirse
- `footer.newsletter.placeholder`: E-mail
- `footer.newsletter.exito`: ¡Gracias! Ya estás suscrita.
- `footer.newsletter.error`: Algo ha ido mal. Inténtalo de nuevo.

#### Textos de interfaz (`messages/es.json` → `newsletterPopup`)

- `newsletterPopup.titulo`: Únete a Fely Campo
- `newsletterPopup.subtitulo`: Suscríbete a nuestra newsletter para tener acceso anticipado a ofertas especiales, novedades y estar conectada con nuestra comunidad.
- `newsletterPopup.consentimiento`: Aceptas recibir comunicaciones comerciales.
- `newsletterPopup.noGracias`: No, gracias
- `newsletterPopup.cerrar`: Cerrar

#### Textos de interfaz (`messages/es.json` → `cookies`)

- `cookies.titulo`: Cookies
- `cookies.texto`: Usamos cookies propias y de terceros para el correcto funcionamiento del sitio, medir su uso y personalizar tu experiencia.
- `cookies.personalizar`: Personalizar
- `cookies.rechazar`: Rechazar todas
- `cookies.aceptar`: Aceptar todas
- `cookies.guardar`: Guardar preferencias
- `cookies.categorias.necesarias.nombre`: Necesarias
- `cookies.categorias.necesarias.texto`: Imprescindibles para que el sitio funcione correctamente. No se pueden desactivar.
- `cookies.categorias.analiticas.nombre`: Analíticas
- `cookies.categorias.analiticas.texto`: Nos ayudan a entender cómo se usa el sitio para poder mejorarlo.
- `cookies.categorias.marketing.nombre`: Marketing
- `cookies.categorias.marketing.texto`: Se usan para mostrarte publicidad relevante dentro y fuera de nuestro sitio.

#### Textos de interfaz (`messages/es.json` → `whatsappFlotante`)

- `whatsappFlotante.label`: Escríbenos por WhatsApp
- `whatsappFlotante.mensaje`: Hola, me gustaría recibir información sobre Fely Campo.

#### Textos de interfaz (`messages/es.json` → `notFound`)

- `notFound.eyebrow`: Error 404
- `notFound.texto`: Esta página no existe o se ha movido de sitio.
- `notFound.boton`: Volver al inicio

#### Textos de interfaz (`messages/es.json` → `compromiso`)

- `compromiso.texto`: Diseñado & Confeccionado en Salamanca desde 1997
- `compromiso.subtitulo`: Artesanía, Feminidad & Cercanía

## Inicio (landing)

**URL:** / · **Prioridad SEO:** Alta

#### SEO de `/` (`src/lib/seoTextos.js`)

- `title`: Fely Campo | Vestidos de novia y fiesta a medida
- `h1 (oculto, solo para buscadores)`: Fely Campo: vestidos de novia y fiesta a medida en Salamanca, Madrid y Oviedo
- `meta description`: Firma de moda nacida en Salamanca: vestidos de novia y de fiesta a medida en nuestros ateliers de Salamanca, Madrid y Oviedo, y prêt-à-porter online.

#### Textos de interfaz (`messages/es.json` → `heroCarousel`)

- `heroCarousel.entradilla`: El universo de Fely Campo
- `heroCarousel.descripcion`: Elegancia, sobriedad y un patronaje excelente.
- `heroCarousel.cta`: Descubre más

#### Textos de interfaz (`messages/es.json` → `splitMedia`)

- `splitMedia.item1.label`: Atelier Novia
- `splitMedia.item1.titulo`: Atelier Novia
- `splitMedia.item1.cta`: Ver todo
- `splitMedia.item2.label`: Atelier Fiesta
- `splitMedia.item2.titulo`: Atelier Fiesta
- `splitMedia.item2.cta`: Ver todo

#### Textos de interfaz (`messages/es.json` → `descubreFely`)

- `descubreFely.titulo`: Descubre a Fely
- `descubreFely.cta`: Sobre la diseñadora

#### Textos de interfaz (`messages/es.json` → `citaFelyLanding`)

- `citaFelyLanding.texto`: Lo que quiero transmitir con mis vestidos es <em>un sentimiento y una pasión</em> por lo que es mi oficio y mi profesión, <em>la moda</em>.

#### Textos de interfaz (`messages/es.json` → `pedirCitaLanding`)

- `pedirCitaLanding.titulo`: Estamos deseando conocerte, te esperamos en el atelier
- `pedirCitaLanding.cta`: Pedir cita
- `pedirCitaLanding.ctaAtelier`: Conoce más

#### Textos de interfaz (`messages/es.json` → `atelierFiesta`)

- `atelierFiesta.salamanca.eyebrow`: Atelier
- `atelierFiesta.salamanca.titulo`: Salamanca
- `atelierFiesta.madrid.eyebrow`: Atelier & Showroom
- `atelierFiesta.madrid.titulo`: Madrid
- `atelierFiesta.oviedo.eyebrow`: Atelier
- `atelierFiesta.oviedo.titulo`: Oviedo

#### Textos de interfaz (`messages/es.json` → `collectionTitle`)

- `collectionTitle.edicionMujer.label`: Prêt-à-porter FW27
- `collectionTitle.edicionMujer.title`: La Colección
- `collectionTitle.edicionMujer.description`: La historia de una mujer que diseña para otras mujeres, una atemporalidad que Fely Campo abre ahora, por primera vez, al Prêt-à-porter.

#### Textos de interfaz (`messages/es.json` → `mediaBanner`)

- `mediaBanner.label`: La Colección
- `mediaBanner.titulo`: Otoño-Invierno 2027
- `mediaBanner.cta`: Descubre la colección

#### Textos de interfaz (`messages/es.json` → `splitMediaCategorias`)

- `splitMediaCategorias.item1.label`: Vestidos
- `splitMediaCategorias.item1.titulo`: Vestidos
- `splitMediaCategorias.item1.cta`: Ver todo
- `splitMediaCategorias.item2.label`: Chaquetas
- `splitMediaCategorias.item2.titulo`: Chaquetas
- `splitMediaCategorias.item2.cta`: Ver todo

#### Textos de interfaz (`messages/es.json` → `cuadriculaTabs`)

- `cuadriculaTabs.subtitulo`: Atelier
- `cuadriculaTabs.titulo`: Un look para cada ocasión
- `cuadriculaTabs.descripcion`: Reserva tu cita y vive un día único en el Atelier. Disfruta del asesoramiento personalizado de nuestra diseñadora.
- `cuadriculaTabs.reservarCita`: Reserva tu cita

#### Textos de interfaz (`messages/es.json` → `cuadriculaProductos`)

- `cuadriculaProductos.verMas`: Ver más
- `cuadriculaProductos.coleccion`: La Colección
- `cuadriculaProductos.novedades`: FW27
- `cuadriculaProductos.novedadesDescripcion`: Piezas nuevas de temporada, pensadas para acompañar cada ocasión con la misma artesanía de siempre.
- `cuadriculaProductos.shopNow`: Ver colección
- `cuadriculaProductos.progreso`: Progreso del carrusel: {porcentaje}%.
- `cuadriculaProductos.anterior`: Ver productos anteriores
- `cuadriculaProductos.siguiente`: Ver más productos
- `cuadriculaProductos.vistaCuadricula`: Vista en cuadrícula
- `cuadriculaProductos.vistaCompacta`: Vista en 2 columnas
- `cuadriculaProductos.filtros`: Filtros
- `cuadriculaProductos.cargandoMas`: Cargando más productos…

#### Textos de interfaz (`messages/es.json` → `visitaAtelier`)

- `visitaAtelier.titulo`: De mujeres, Para mujeres, Por las mujeres
- `visitaAtelier.texto`:

  > Con 54 años de trayectoria, Fely Campo está profundamente ligada a la tierra charra, de piedra, luz y oficio. Especializada en fiesta, novia y prêt-à-porter, Fely Campo crea piezas desde el patronaje, la elección de tejidos y el conocimiento de unas manos que entienden como un oficio que se transmite y permanece.


#### Textos de interfaz (`messages/es.json` → `clientsReview`)

- `clientsReview.titulo`: Ellas te lo cuentan
- `clientsReview.resenas[0].texto`:

  > Muchísimas gracias Fely....me hiciste disfrutar del día más importante...y me hiciste la mujer más feliz....cuando tenga fotos de la fotógrafa profesional te mando por si las quieres publicar...te pondré la reseña que te mereces....Muchísimas gracias por todo y una suerte haberte conocido 🥰🥰

- `clientsReview.resenas[0].nombre`: Marta G.
- `clientsReview.resenas[1].texto`: La costura a medida marca la diferencia. Se nota en cada puntada.
- `clientsReview.resenas[1].nombre`: Elena R.
- `clientsReview.resenas[2].texto`: Un asesoramiento cercano y honesto, nunca me habían escuchado tanto en una tienda.
- `clientsReview.resenas[2].nombre`: Carmen L.
- `clientsReview.resenas[3].texto`: Calidad excepcional y un servicio que te hace sentir única.
- `clientsReview.resenas[3].nombre`: Beatriz S.
- `clientsReview.resenas[4].texto`: Volvería sin dudarlo. Fely Campo entiende lo que una mujer necesita.
- `clientsReview.resenas[4].nombre`: Lucía M.

## Atelier (índice)

**URL:** /atelier · **Prioridad SEO:** Alta

#### SEO de `/atelier` (`src/lib/seoTextos.js`)

- `title`: Atelier de novia y fiesta a medida | Fely Campo
- `h1 (oculto, solo para buscadores)`: Atelier de novia y fiesta a medida
- `meta description`: Descubre el atelier de Fely Campo: vestidos de novia y de fiesta diseñados y confeccionados a medida, con asesoramiento personal y cita previa.

#### Contenido de la página (`src/app/[locale]/atelier/atelierIndex.js`)

- `ATELIER_INDEX.descripcion[0]`: Donde todo empieza.
- `ATELIER_INDEX.descripcion[1]`: Donde nada termina.
- `ATELIER_INDEX.descripcion[2]`: Donde tú pones nuestro punto final.
- `ATELIER_INDEX.novias.titulo`: Atelier Novias
- `ATELIER_INDEX.novias.texto`: La complicidad como objetivo, el deseo como molde y la precisión nuestra consecuencia.
- `ATELIER_INDEX.fiesta.titulo`: Atelier Fiesta
- `ATELIER_INDEX.fiesta.texto`: Te escuchamos, nuestro proceso será el tuyo, un camino conjunto para conseguir ese vestido, esa imagen al detalle de tus ideas.
- `ATELIER_INDEX.ateliers[0].ciudad`: Atelier Salamanca
- `ATELIER_INDEX.ateliers[1].ciudad`: Atelier & Showroom Madrid
- `ATELIER_INDEX.ateliers[2].ciudad`: Atelier Oviedo

#### Textos de interfaz (`messages/es.json` → `atelierIndex`)

- `atelierIndex.subtitulo`: Fely Campo
- `atelierIndex.titulo`: Atelier
- `atelierIndex.conoceColeccion`: Conoce la colección
- `atelierIndex.pedirCita`: Pide cita
- `atelierIndex.conoceAteliers`: Conoce nuestros ateliers
- `atelierIndex.visitanosTitulo`: Visítanos
- `atelierIndex.visitanosDescripcion`: Ven a conocer como trabajamos, te atenderemos presencialmente en uno de nuestros atelieres

#### Textos de interfaz (`messages/es.json` → `heroPagina`)

- `heroPagina.podcast`: Entre telas y palabras.
- `heroPagina.runwayArchivo`: Todas nuestras colecciones de pasarela.
- `heroPagina.atelierNovias`: Vestidos de novia hechos a medida en nuestro atelier.
- `heroPagina.atelierFiesta`: Vestidos de fiesta e invitada, hechos a medida.
- `heroPagina.pretAPorter`: Prendas para el día a día, con el cuidado del atelier.
- `heroPagina.sobreFely`: Una vida entre telas.
- `heroPagina.runway`: Colección de pasarela
- `heroPagina.atelierCiudad`: Visítanos siempre con cita previa.

## Atelier · Novias

**URL:** /atelier/novias · **Prioridad SEO:** Alta

#### SEO de `/atelier/novias` (`src/lib/seoTextos.js`)

- `title`: Vestidos de novia a medida | Atelier Fely Campo
- `meta description`: Vestidos de novia diseñados y confeccionados a medida en el atelier de Fely Campo. Conoce nuestras colecciones de novia y pide tu cita.

#### Contenido editorial (`src/app/[locale]/atelier/novias/noviaEditorial.js`)

- `NOVIA_EDITORIAL.descripcion[0]`: Cada novia llega con una historia distinta, con su propia manera de entender ese día.
- `NOVIA_EDITORIAL.descripcion[1]`: De ahí nace el vestido, nunca al revés: primero la escuchamos a ella, después cortamos la tela.
- `NOVIA_EDITORIAL.bloques[0].titulo`: Una historia, un vestido
- `NOVIA_EDITORIAL.bloques[0].texto`:

  > En el atelier el punto de partida nunca es el patrón: es la novia. Escuchamos quién es, cómo se mueve, qué quiere sentir el día de su boda, y desde ahí construimos cada pieza, a mano y a su medida.

- `NOVIA_EDITORIAL.bloques[1].titulo`: Hecho a mano, para ella
- `NOVIA_EDITORIAL.bloques[1].texto`:

  > Esa misma manera de trabajar da forma a cada colección: siluetas depuradas, tejidos nobles y un cuidado artesanal en cada costura, pensados para acompañar a la novia, no para imponerse sobre ella.


## Atelier · Fiesta

**URL:** /atelier/fiesta · **Prioridad SEO:** Alta

#### SEO de `/atelier/fiesta` (`src/lib/seoTextos.js`)

- `title`: Vestidos de fiesta e invitada a medida | Fely Campo
- `meta description`: Vestidos de fiesta, madrina e invitada de boda hechos a medida en el atelier de Fely Campo. Descubre las colecciones y reserva tu cita.

#### Contenido editorial (`src/app/[locale]/atelier/fiesta/fiestaEditorial.js`)

- `FIESTA_EDITORIAL.descripcion[0]`: Cada fiesta pide su propio vestido, su propia manera de brillar.
- `FIESTA_EDITORIAL.descripcion[1]`: En el atelier trabajamos esa versión única, pieza a pieza, hasta encontrarla.
- `FIESTA_EDITORIAL.bloques[0].titulo`: Un vestido, una noche
- `FIESTA_EDITORIAL.bloques[0].texto`:

  > Cada pieza de fiesta nace de una ocasión concreta: una boda, una gala, una cena que se recuerda. Escuchamos qué momento va a vivir cada clienta y construimos el vestido a su alrededor.

- `FIESTA_EDITORIAL.bloques[1].titulo`: El detalle que se nota
- `FIESTA_EDITORIAL.bloques[1].texto`: Tejidos nobles, siluetas trabajadas a mano y un acabado artesanal en cada costura: la misma manera de trabajar detrás de cada pieza de fiesta.

## Atelier · Categorías por estilo y silueta

**URL:** /atelier/novias/categoria/… y /atelier/fiesta/categoria/… · **Prioridad SEO:** Alta

Nombres de las categorías por las que se filtran los vestidos; cada una tiene su propia URL y su title se genera con estos nombres.

#### Grupos y categorías (`src/components/layout/estiloSiluetaGrupos.js`)

- `GRUPOS_ESTILO_SILUETA[0].opciones[0]`: alfombraRoja
- `GRUPOS_ESTILO_SILUETA[1].opciones[0]`: corteA
- `GRUPOS_ESTILO_SILUETA[2].opciones[0]`: dosPiezas
- `GRUPOS_ESTILO_SILUETA[5].opciones[1]`: escoteEspalda

#### Textos de interfaz (`messages/es.json` → `atelierCategoriaSeo`)

- `atelierCategoriaSeo.titulo`: {categoria} · {seccion} · Atelier | Fely Campo
- `atelierCategoriaSeo.descripcion`: Vestidos de estilo {categoria} en la colección {seccion} del Atelier de Fely Campo. Cita personalizada con nuestra diseñadora.

#### Textos de interfaz (`messages/es.json` → `catalogo`)

- `catalogo.subtituloFelyCampo`: Fely Campo
- `catalogo.subtituloTienda`: Prêt-à-porter
- `catalogo.tituloTienda`: Prêt-à-porter

#### Textos de interfaz (`messages/es.json` → `filtros`)

- `filtros.titulo`: Filtros
- `filtros.cerrar`: Cerrar filtros
- `filtros.ordenarPor`: Ordenar por
- `filtros.talla`: Talla
- `filtros.color`: Color
- `filtros.coleccion`: Colección
- `filtros.hasta`: Hasta {precio}
- `filtros.limpiar`: Limpiar filtros
- `filtros.verResultados`: Ver productos
- `filtros.estiloYSilueta.titulo`: Estilo y silueta
- `filtros.estiloYSilueta.grupos.silueta.titulo`: Silueta
- `filtros.estiloYSilueta.grupos.silueta.opciones.corteA`: Corte A
- `filtros.estiloYSilueta.grupos.silueta.opciones.recto`: Recto
- `filtros.estiloYSilueta.grupos.silueta.opciones.sirena`: Sirena
- `filtros.estiloYSilueta.grupos.silueta.opciones.princesa`: Princesa
- `filtros.estiloYSilueta.grupos.volumen.titulo`: Volumen
- `filtros.estiloYSilueta.grupos.volumen.opciones.dosPiezas`: Dos piezas
- `filtros.estiloYSilueta.grupos.largo.titulo`: Largo
- `filtros.estiloYSilueta.grupos.largo.opciones.corto`: Corto
- `filtros.estiloYSilueta.grupos.largo.opciones.midi`: Midi
- `filtros.estiloYSilueta.grupos.largo.opciones.largo`: Largo
- `filtros.estiloYSilueta.grupos.largo.opciones.cola`: Cola
- `filtros.estiloYSilueta.grupos.estilo.titulo`: Estilo
- `filtros.estiloYSilueta.grupos.estilo.opciones.minimal`: Minimal
- `filtros.estiloYSilueta.grupos.estilo.opciones.lencero`: Lencero
- `filtros.estiloYSilueta.grupos.estilo.opciones.diferente`: Diferente
- `filtros.estiloYSilueta.grupos.estilo.opciones.clasico`: Clásico
- `filtros.estiloYSilueta.grupos.estilo.opciones.romantico`: Romántico
- `filtros.estiloYSilueta.grupos.detalles.titulo`: Detalles
- `filtros.estiloYSilueta.grupos.detalles.opciones.asimetrico`: Asimétrico
- `filtros.estiloYSilueta.grupos.detalles.opciones.escoteEspalda`: Escote espalda
- `filtros.estiloYSilueta.grupos.detalles.opciones.fluido`: Fluido
- `filtros.estiloYSilueta.grupos.detalles.opciones.mangas`: Mangas / Manga
- `filtros.estiloYSilueta.grupos.ocasion.titulo`: Ocasión
- `filtros.estiloYSilueta.grupos.ocasion.opciones.alfombraRoja`: Alfombra roja
- `filtros.estiloYSilueta.grupos.ocasion.opciones.noche`: Noche
- `filtros.estiloYSilueta.grupos.ocasion.opciones.tarde`: Tarde
- `filtros.estiloYSilueta.grupos.ocasion.opciones.dia`: Día

## Atelier · Vosotras

**URL:** /atelier/vosotras · **Prioridad SEO:** Media

#### SEO de `/atelier/vosotras` (`src/lib/seoTextos.js`)

- `title`: Novias e invitadas Fely Campo | Vosotras
- `h1 (oculto, solo para buscadores)`: Novias e invitadas Fely Campo
- `meta description`: Novias e invitadas que han llevado Fely Campo en el día más especial. Fotos reales de nuestras clientas y sus vestidos hechos a medida.

#### Textos de interfaz (`messages/es.json` → `vosotras`)

- `vosotras.descripcion`: ¿Y qué decir de vosotras? Si las palabras no son suficientes, que hablen las fotos.
- `vosotras.verGaleria`: Ver galería
- `vosotras.invitadas`: Invitadas
- `vosotras.novias`: Novias

## Atelier de Salamanca

**URL:** /atelier-fiesta/salamanca · **Prioridad SEO:** Alta

#### SEO de `/atelier-fiesta/salamanca` (`src/lib/seoTextos.js`)

- `title`: Atelier de novia y fiesta a medida en Salamanca | Fely Campo
- `meta description`: Atelier y taller de Fely Campo en Salamanca: vestidos de novia y de fiesta a medida, asesoramiento personal y showroom. Visítanos con cita previa.

#### Contenido (`src/app/[locale]/atelier-fiesta/atelieres.js` → `salamanca`)

- `ATELIERES.salamanca.descripcion`:

  > En Salamanca, el atelier convive con el corazón creativo de Fely Campo. Un espacio donde oficio, precisión y creación se encuentran, con la esencia de Castilla como parte del universo de la firma.

- `ATELIERES.salamanca.secciones[0].titulo`: El Atelier
- `ATELIERES.salamanca.secciones[0].texto[0]`:

  > Un espacio para descubrir Fely Campo, probar sus colecciones y conocer de cerca el universo de la firma. Diseños atemporales y piezas que permanecen más allá de cada temporada.

- `ATELIERES.salamanca.secciones[1].titulo`: Asesoramiento personalizado
- `ATELIERES.salamanca.secciones[1].texto[0]`:

  > Cada cita comienza contigo. Nuestro equipo te acompaña para encontrar el diseño, corte, color y tejido que mejor encajen contigo, y valorar las posibles modificaciones de la pieza elegida.


## Atelier de Madrid

**URL:** /atelier-fiesta/madrid · **Prioridad SEO:** Alta

#### SEO de `/atelier-fiesta/madrid` (`src/lib/seoTextos.js`)

- `title`: Atelier de novia y fiesta a medida en Madrid | Fely Campo
- `meta description`: Atelier y showroom de Fely Campo en Madrid, en la calle Jorge Juan: vestidos de novia y de fiesta a medida. Pide tu cita previa.

#### Contenido (`src/app/[locale]/atelier-fiesta/atelieres.js` → `madrid`)

- `ATELIERES.madrid.descripcion`:

  > Nuestro atelier de Madrid ocupa un emplazamiento muy especial en la calle Jorge Juan. Un espacio íntimo, pensado para descubrir la firma de una forma cercana y personal. Allí, podrás encontrarte con la diseñadora y definir cada detalle, cada proporción y cada tejido para comenzar a dar forma a una pieza única: un espacio donde el tiempo se detiene para vestir a cada mujer desde su propia esencia.

- `ATELIERES.madrid.secciones[0].titulo`: A medida
- `ATELIERES.madrid.secciones[0].texto[0]`: Con la complicidad como objetivo, la diseñadora realiza el diseño a medida de piezas únicas e irrepetibles pensadas especialmente para cada mujer.
- `ATELIERES.madrid.secciones[1].titulo`: Showroom
- `ATELIERES.madrid.secciones[1].texto[0]`:

  > El Showroom es el lugar dentro de su Atelier en Madrid donde la diseñadora expone muchas de las prendas más icónicas de la firma. Te sumergirás en un universo de piezas que reflejan el alma y la esencia de su creadora durante sus más de 50 años de trayectoria en el mundo de la moda.

- `ATELIERES.madrid.secciones[2].titulo`: Novias
- `ATELIERES.madrid.secciones[2].texto[0]`:

  > En su Atelier de Madrid, la diseñadora ofrece un espacio de encuentro donde cada novia puede imaginar, construir y dar forma a su vestido soñado, hecho a medida y pensado exclusivamente para ella. Su personalidad, su forma de vivir la belleza, sus sensaciones y los tejidos que la emocionan marcan el punto de partida de cada diseño.

- `ATELIERES.madrid.secciones[3].titulo`: Prêt-à-porter
- `ATELIERES.madrid.secciones[3].texto[0]`:

  > El Atelier de Madrid de Fely Campo cuenta con un espacio dedicado por completo a las colecciones de prêt-à-porter de lujo con las que la diseñadora ha trasladado su sello de diseño al día a día.


## Atelier de Oviedo

**URL:** /atelier-fiesta/oviedo · **Prioridad SEO:** Alta

#### SEO de `/atelier-fiesta/oviedo` (`src/lib/seoTextos.js`)

- `title`: Atelier de novia y fiesta a medida en Oviedo | Fely Campo
- `meta description`: Atelier de Fely Campo en el centro de Oviedo: vestidos de novia, fiesta e invitada a medida y prêt-à-porter. Te atendemos con cita previa.

#### Contenido (`src/app/[locale]/atelier-fiesta/atelieres.js` → `oviedo`)

- `ATELIERES.oviedo.descripcion[0]`: En el corazón de Asturias, un espacio donde la moda se encuentra con la emoción.
- `ATELIERES.oviedo.descripcion[1]`: Desde 2015, Fely Campo acompaña a cada mujer en la elección de una pieza especial, cuidando cada silueta, cada tejido y cada detalle.
- `ATELIERES.oviedo.secciones[0].titulo`: Nuestro equipo
- `ATELIERES.oviedo.secciones[0].texto[0]`: Asesoramiento personalizado por nuestro equipo de cuatro personas liderado por Carlos Albuixech.
- `ATELIERES.oviedo.secciones[0].texto[1]`: Te escuchamos para encontrar la silueta, el color y los detalles que mejor hablan de ti.
- `ATELIERES.oviedo.secciones[1].titulo`: El proceso
- `ATELIERES.oviedo.secciones[1].texto[0]`: Detrás de cada creación hay tiempo, oficio y una mirada precisa.
- `ATELIERES.oviedo.secciones[1].texto[1]`: Te acompañamos en cada prueba para que el vestido encuentre su forma definitiva: la tuya.
- `ATELIERES.oviedo.secciones[2].titulo`: El espacio
- `ATELIERES.oviedo.secciones[2].texto[0]`: Un lugar para descubrir Fely Campo de cerca.
- `ATELIERES.oviedo.secciones[2].texto[1]`: Un espacio íntimo donde conocer nuestras colecciones, tocar los tejidos y dejarse llevar por los detalles.
- `ATELIERES.oviedo.secciones[3].titulo`: Novia
- `ATELIERES.oviedo.secciones[3].texto[0]`: Para un día que merece ser único.
- `ATELIERES.oviedo.secciones[3].texto[1]`: Creaciones pensadas para acompañarte con naturalidad, elegancia y personalidad desde el primer momento.

#### Textos de interfaz (`messages/es.json` → `visitenos`)

- `visitenos.eyebrow`: Visita
- `visitenos.titulo`: Nuestros Ateliers
- `visitenos.intro`: Nuestros ateliers y showroom, siempre con cita previa para atenderte con calma en nuestras ubicaciones en Salamanca, Madrid u Oviedo.
- `visitenos.pedirCita`: Pedir cita
- `visitenos.conoceMas`: Conoce más.
- `visitenos.telf`: Telf
- `visitenos.movil`: Móvil
- `visitenos.showroomNota`: Showroom con cita previa

## Visita Fely Campo (ubicaciones) y pedir cita

**URL:** /visita-fely-campo y /visita-fely-campo/cita · **Prioridad SEO:** Alta

#### SEO de `/visita-fely-campo` (`src/lib/seoTextos.js`)

- `title`: Ateliers en Salamanca, Madrid y Oviedo | Fely Campo
- `meta description`: Visita los ateliers y el showroom de Fely Campo en Salamanca, Madrid y Oviedo. Direcciones, horarios y cita previa para novia e invitada.

#### SEO de `/visita-fely-campo/cita` (`src/lib/seoTextos.js`)

- `title`: Pide cita en el atelier | Novia e invitada | Fely Campo
- `meta description`: Reserva tu cita en el atelier de Fely Campo en Salamanca, Madrid u Oviedo para tu vestido de novia o de invitada. Te confirmamos por email.

#### SEO de `/visita-fely-campo/cita/confirmacion-novia` (`src/lib/seoTextos.js`)

- `title`: Cita de novia solicitada | Fely Campo
- `meta description`: Hemos recibido tu solicitud de cita de novia en el atelier de Fely Campo.

#### SEO de `/visita-fely-campo/cita/confirmacion-invitada` (`src/lib/seoTextos.js`)

- `title`: Cita de invitada solicitada | Fely Campo
- `meta description`: Hemos recibido tu solicitud de cita de invitada en el atelier de Fely Campo.

#### Ubicaciones (`src/app/[locale]/visita-fely-campo/ubicaciones.js`)

- `UBICACIONES[0].ciudad`: Salamanca
- `UBICACIONES[0].nombre`: Atelier Salamanca
- `UBICACIONES[0].direccion[0]`: C/ Laguna Negra 17-19
- `UBICACIONES[0].direccion[1]`: 37008 Salamanca
- `UBICACIONES[0].telefonos[0]`: +34 923 000 000
- `UBICACIONES[0].telefonos[1]`: +34 616 356 217
- `UBICACIONES[0].horario`: Lun - Vie: 09:30 - 17:30
- `UBICACIONES[0].descripcion`: Espacio dedicado a la novia y a nuestras colecciones de fiesta, además de contar con una sección de nuestra línea pret-a-porter.
- `UBICACIONES[1].ciudad`: Madrid
- `UBICACIONES[1].nombre`: Showroom Madrid
- `UBICACIONES[1].direccion[0]`: C/ Jorge Juan 12
- `UBICACIONES[1].direccion[1]`: 28001 Madrid
- `UBICACIONES[1].telefonos[0]`: +34 910 000 000
- `UBICACIONES[1].descripcion`:

  > Espacio Showroom y Atelier a medida. Cuenta con las últimas colecciones de prêt-à-porter de lujo presentadas en Mercedes Benz Fashion Week Madrid, además de espacios dedicados para las colecciones de novia y fiesta.

- `UBICACIONES[2].ciudad`: Oviedo
- `UBICACIONES[2].nombre`: Atelier Oviedo
- `UBICACIONES[2].direccion[0]`: C/ Uría 12
- `UBICACIONES[2].direccion[1]`: 33003 Oviedo
- `UBICACIONES[2].telefonos[0]`: +34 985 000 000
- `UBICACIONES[2].horario`: Lun - Sáb: 10:30 - 14:00 y 17:00 - 20:30
- `UBICACIONES[2].descripcion`: Espacio dedicado a colecciones de fiesta. Además de contar con una sección de colecciones de novia.

#### Textos de interfaz (`messages/es.json` → `pedirCitaAtelier`)

- `pedirCitaAtelier.cerrar`: Cerrar
- `pedirCitaAtelier.titulo`: Pide tu cita
- `pedirCitaAtelier.subtitulo`: Rellena el formulario y nos pondremos en contacto contigo.
- `pedirCitaAtelier.nombreCompleto`: Nombre completo
- `pedirCitaAtelier.nombreCompletoPlaceholder`: María Martín García
- `pedirCitaAtelier.emailPlaceholder`: maria@ejemplo.com
- `pedirCitaAtelier.telefonoPlaceholder`: +34 600 000 000
- `pedirCitaAtelier.fechaEvento`: Fecha del evento (opcional)
- `pedirCitaAtelier.dia`: Día
- `pedirCitaAtelier.mes`: Mes
- `pedirCitaAtelier.anio`: Año
- `pedirCitaAtelier.codigoPostal`: Código postal
- `pedirCitaAtelier.ciudad`: Ciudad
- `pedirCitaAtelier.ciudadPlaceholder`: Salamanca
- `pedirCitaAtelier.mensaje`: Cuéntanos lo que estás buscando y nosotros te ayudaremos
- `pedirCitaAtelier.aceptoLegal`: Acepto la <privacidad>política de privacidad</privacidad> y los <terminos>términos y condiciones</terminos>.
- `pedirCitaAtelier.avisoDatos`: Completa los campos obligatorios y acepta la política de privacidad para continuar.
- `pedirCitaAtelier.enviar`: Enviar solicitud
- `pedirCitaAtelier.confirmacionTitulo`: ¡Solicitud enviada!
- `pedirCitaAtelier.confirmacionTexto`: Gracias por tu interés. Nuestro equipo se pondrá en contacto contigo lo antes posible para concretar el día y la hora de tu cita.
- `pedirCitaAtelier.atelier`: Atelier
- `pedirCitaAtelier.atelierPlaceholder`: *Elige atelier
- `pedirCitaAtelier.tipo`: Tu cita es para
- `pedirCitaAtelier.tipoNovia`: Novia
- `pedirCitaAtelier.tipoInvitada`: Invitada
- `pedirCitaAtelier.fechaBoda`: *Fecha de la boda
- `pedirCitaAtelier.enviando`: Enviando…
- `pedirCitaAtelier.errorEnvio`: No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbenos a info@felycampo.com.
- `pedirCitaAtelier.confirmacionNoviaTitulo`: ¡Tu cita de novia está solicitada!
- `pedirCitaAtelier.confirmacionNoviaTexto`:

  > Gracias por confiar en Fely Campo para tu vestido de novia. Te hemos enviado un email con los datos de tu solicitud y el equipo del atelier te escribirá para confirmar el día y la hora.

- `pedirCitaAtelier.confirmacionInvitadaTitulo`: ¡Tu cita de invitada está solicitada!
- `pedirCitaAtelier.confirmacionInvitadaTexto`:

  > Gracias por tu interés en Fely Campo. Te hemos enviado un email con los datos de tu solicitud y el equipo del atelier te escribirá para confirmar el día y la hora.

- `pedirCitaAtelier.volverInicio`: Volver al inicio

#### Textos de interfaz (`messages/es.json` → `solicitudAtelier`)

- `solicitudAtelier.titulo`: Solicita información
- `solicitudAtelier.subtitulo`: Cuéntanos qué talla necesitas y cómo podemos contactarte, te responderemos con toda la información.
- `solicitudAtelier.talla`: Talla
- `solicitudAtelier.avisoTalla`: Selecciona una talla.
- `solicitudAtelier.nombre`: Nombre
- `solicitudAtelier.nombrePlaceholder`: María Martín
- `solicitudAtelier.emailPlaceholder`: maria@ejemplo.com
- `solicitudAtelier.telefonoPlaceholder`: +34 600 000 000
- `solicitudAtelier.comentario`: Comentario (opcional)
- `solicitudAtelier.comentarioPlaceholder`: Cuéntanos cualquier detalle adicional…
- `solicitudAtelier.avisoDatos`: Completa tu nombre y email para continuar.
- `solicitudAtelier.enviar`: Enviar solicitud
- `solicitudAtelier.confirmacionTitulo`: ¡Solicitud enviada!
- `solicitudAtelier.confirmacionTexto`: Gracias por tu interés. Nuestro equipo se pondrá en contacto contigo lo antes posible.
- `solicitudAtelier.cerrar`: Cerrar

## Sobre Fely

**URL:** /sobre-fely · **Prioridad SEO:** Alta

Historia de la diseñadora en primera persona: mejora titulares y etiquetas, no el relato.

#### SEO de `/sobre-fely` (`src/lib/seoTextos.js`)

- `title`: Fely Campo, la diseñadora | Historia de la firma
- `meta description`: La historia de Fely Campo: de la niña de la aguja en Salamanca a una firma de novia, fiesta y prêt-à-porter con ateliers en tres ciudades.

#### Textos de interfaz (`messages/es.json` → `sobreFely`)

- `sobreFely.eyebrow`: La Diseñadora
- `sobreFely.tituloHero`: Fely Campo
- `sobreFely.titulo`: Conoce a Fely Campo
- `sobreFely.trayectoria`: Trayectoria
- `sobreFely.manifiestoEyebrow`: Manifiesto — Colección Ibiza

#### Capítulos (`src/app/[locale]/sobre-fely/sobreFely.js`)

- `SOBRE_FELY.capitulos[0].etiqueta`: El comienzo
- `SOBRE_FELY.capitulos[0].titulo`: 13 años. Un camino inesperado.
- `SOBRE_FELY.capitulos[0].parrafos[0]`:

  > Tenía 13 años cuando mi vida empezó a tomar un rumbo que nunca habría imaginado. Tenía una timidez casi enfermiza y, cuando suspendí los estudios, mi madre decidió mandarme a un pequeño taller, sin saber que aquel lugar acabaría marcando mi futuro. Era una niña tímida, todavía intentando encontrar mi sitio en el mundo, y no podía imaginar que entre telas, agujas e hilos descubriría una forma de expresarme que iba mucho más allá de la ropa.

- `SOBRE_FELY.capitulos[0].cita`: A veces, la vida no te lleva por el camino que habías pensado, sino por aquel que, sin saberlo, estabas destinada a encontrar.
- `SOBRE_FELY.capitulos[1].etiqueta`: El primer vestido
- `SOBRE_FELY.capitulos[1].titulo`: 14 años. Descubrir una forma de expresarme.
- `SOBRE_FELY.capitulos[1].parrafos[0]`:

  > A los 14 años hice mi primer vestido. Era una niña muy tímida; me costaba hablar, relacionarme y mostrar lo que llevaba dentro. Pero cuando me puse aquel vestido, descubrí algo que no esperaba: podía esconderme detrás de él y, al mismo tiempo, sentirme fuerte. Comprendí, aunque todavía no supiera explicarlo, que la ropa podía cambiar cómo nos sentimos, ayudarnos a encontrar nuestra voz y revelar quiénes somos. No hay ninguna fotografía de ese primer vestido.

- `SOBRE_FELY.capitulos[2].etiqueta`: La primera novia
- `SOBRE_FELY.capitulos[2].titulo`: 15 años. El primer traje de novia.
- `SOBRE_FELY.capitulos[2].parrafos[0]`:

  > Con 15 años hice mi primer vestido de novia. Era muy joven, pero aquel encargo me permitió descubrir una dimensión diferente de la moda. Detrás de un vestido había una mujer con la ilusión de vestirse un día que recordaría toda su vida. Sin darme cuenta, estaba descubriendo que quería crear prendas que no solo vistieran a una mujer, sino que la hicieran sentirse ella misma. No tengo imágenes de ese primer vestido, pero siempre perdurará en mi memoria.

- `SOBRE_FELY.capitulos[2].pie`: Diseño de novia de Fely Campo de la década de los 80
- `SOBRE_FELY.capitulos[3].etiqueta`: Aprender el oficio
- `SOBRE_FELY.capitulos[3].titulo`: El valor de lo que no siempre se ve.
- `SOBRE_FELY.capitulos[3].parrafos[0]`:

  > El taller fue mi escuela. Aprendí que detrás de cada prenda hay mucho más de lo que se aprecia a primera vista: horas de trabajo, conocimiento, paciencia y una atención casi invisible a cada detalle. Aprendí observando, practicando, equivocándome y volviendo a empezar.

- `SOBRE_FELY.capitulos[3].parrafos[1]`:

  > Con los años entendí que la creatividad necesita del oficio para hacerse realidad y que la verdadera calidad nace de esa unión. Ese aprendizaje sigue presente en mi manera de trabajar: en el respeto por los materiales, en el cuidado de cada patrón y en la convicción de que las cosas bien hechas requieren dedicación.

- `SOBRE_FELY.capitulos[4].etiqueta`: Nace la firma Fely Campo
- `SOBRE_FELY.capitulos[4].titulo`: 1997. Una forma propia de entender la moda.
- `SOBRE_FELY.capitulos[4].parrafos[0]`:

  > En 1997, todo aquel aprendizaje, aquella pasión y tantos años de dedicación tomaron forma en una firma propia: Fely Campo. Lo que había comenzado casi por casualidad se había convertido en una manera de entender la vida y en el deseo de crear con una identidad propia. Empezaba una nueva etapa, llena de retos, decisiones y oportunidades para llevar mi visión más lejos.

- `SOBRE_FELY.capitulos[4].parrafos[1]`:

  > La firma fue creciendo, las colecciones fueron encontrando su lugar y el trabajo comenzó a trascender el pequeño taller donde todo había empezado. Pero, en el fondo, la esencia seguía siendo la misma: crear desde la sensibilidad, cuidar el oficio y diseñar para mujeres que quieren sentirse seguras, elegantes y fieles a sí mismas.

- `SOBRE_FELY.capitulos[4].pie`: Primera boutique de Fely Campo en Salamanca, 1995
- `SOBRE_FELY.capitulos[4].galeria[0].pie`: Modelo con diseño Fely Campo en uno de sus desfiles (2014)
- `SOBRE_FELY.capitulos[4].galeria[1].pie`: Fely Campo en el backstage de uno de sus desfiles de Salamanca (década de los 90)
- `SOBRE_FELY.capitulos[4].galeria[2].pie`: Fely Campo saliendo a saludar tras uno de sus desfiles de Salamanca (década de los 90)
- `SOBRE_FELY.capitulos[4].galeria[3].pie`: Encuentro con el diseño japonés en el Jardín de Salamanca en 2002
- `SOBRE_FELY.capitulos[5].etiqueta`: Hoy
- `SOBRE_FELY.capitulos[5].titulo`: Una historia que sigue viva.
- `SOBRE_FELY.capitulos[5].parrafos[0]`:

  > Hoy, después de más de cinco décadas vinculada a la moda, sigo encontrando algo de aquella niña tímida en cada nueva creación. Continúo emocionándome al descubrir un tejido, imaginar una silueta o ver cómo una mujer se reconoce en una prenda.

- `SOBRE_FELY.capitulos[5].parrafos[1]`:

  > Han cambiado los años, las experiencias y las dimensiones del proyecto, pero hay algo que permanece intacto: la necesidad de crear para que las mujeres, a través de la moda, se vean a ellas mismas. Fely Campo es hoy el resultado de todo ese recorrido, de las manos que trabajan, del conocimiento que se transmite y de una forma de hacer que respeta el tiempo y los detalles.

- `SOBRE_FELY.capitulos[5].parrafos[2]`:

  > Cuando miro atrás, pienso que nunca imaginé hasta dónde me llevaría aquel primer vestido. Y, sin embargo, sigo persiguiendo la misma sensación que tuve entonces: la emoción de crear algo capaz de hacer sentir diferente a una mujer.

- `SOBRE_FELY.cierre.titulo`: Una vida entre telas. Una historia que sigue.
- `SOBRE_FELY.cierre.parrafos[0]`: Todo empezó con una niña que encontró fuerza en la moda como forma de expresarse al mundo. Hoy, esa misma pasión sigue dando vida a cada creación de Fely Campo.
- `SOBRE_FELY.cierre.parrafos[1]`: A lo largo de estos años he recibido numerosos premios. No es necesario enumerarlos, dado que el mayor premio para mí es el agradecimiento de mis clientas.
- `SOBRE_FELY.documental.titulo`: Conoce a Fely Campo - Documental
- `SOBRE_FELY.documental.meta`: 54 cintas de vídeo resumen parte de mi historia

## Colecciones y runways

**URL:** /colecciones-fely-campo y /runways/[colección] · **Prioridad SEO:** Alta

Cada colección tiene su propia página de runway; su title y description salen del nombre y la descripción de abajo.

#### SEO de `/colecciones-fely-campo` (`src/lib/seoTextos.js`)

- `title`: Colecciones y desfiles de pasarela | Fely Campo
- `meta description`: Todas las colecciones de pasarela de Fely Campo, de Diafonía a La Colección: looks, backstage y vídeos de cada desfile.

#### La Colección (AW27) — /runways/la-coleccion

- `COLECCIONES[la-coleccion].nombre`: La Colección
- `COLECCIONES[la-coleccion].descripcion`:

  > Esta colección celebra la riqueza de los tejidos y la elegancia de sus combinaciones. Desde la suavidad y el brillo del satén hasta la textura envolvente del tweed y los brocados, cada material aporta carácter y sofisticación. Los paillettes y la paleta que va del beige al negro, con delicados toques de rosa viejo, añaden un juego de luces y matices que atraen la mirada y enriquecen cada prenda. Los abrigos se presentan con formas envolventes y el prêt-à-porter se caracteriza por su versatilidad, capaz de transformarse del día a la noche con pequeños cambios en los accesorios. Todos los tejidos han sido seleccionados por su calidad y sostenibilidad, asegurando que las prendas puedan disfrutarse temporada tras temporada, de un armario a otro, con elegancia y conciencia.

- `COLECCIONES[la-coleccion].looks[undefined]`: Satén y tweed en diálogo: la chaqueta estructurada suaviza su caída sobre una falda de movimiento fluido.
- `COLECCIONES[la-coleccion].looks[undefined]`: Brocado y paillettes para la noche, con accesorios que permiten transformar el look del día a la noche.
- `COLECCIONES[la-coleccion].looks[undefined]`: Tres piezas que se combinan entre sí: prueba de cómo se ve el panel con un trío de productos vinculados.

#### Dreaming (SS26) — /runways/dreaming

- `COLECCIONES[dreaming].nombre`: Dreaming
- `COLECCIONES[dreaming].descripcion`:

  > Soñar es un espacio no lineal sin pasado, presente ni futuro. Atemporal, donde el caos de las tendencias es una irrelevancia pasajera, donde la realidad es moldeada por quien sueña. Soñar es dar voz a la imaginación, permitir que la creatividad y el conocimiento se unan, dar a la realidad una forma que existe en un ahora atemporal. La pasión que impulsa a soñar creativamente es la realidad de una mujer. En esta colección, Fely Campo ha apostado no por el espectáculo, sino por la mujer, por una mujer cuya belleza se refleja en los estilos de esta colección, por una mujer que reconoce que el estilo va más allá del capricho de una tendencia. Con estos tejidos, Fely Campo ha diseñado una colección que una mujer puede llevar.


#### Self World (AW26) — /runways/self-world

- `COLECCIONES[self-world].nombre`: Self World
- `COLECCIONES[self-world].descripcion`:

  > Self <>World. Interacción entre el «yo» (self) y el «mundo» (world). Conexión continua entre nuestra identidad interna y el entorno que nos rodea. He elegido este título para esta colección porque la moda es una declaración íntima: un reflejo de cómo deseamos que el mundo nos contemple y de cómo, a su vez, el mundo nos contempla. Durante los últimos dos siglos, la moda se ha democratizado, convirtiéndose en un lenguaje universal que nos permite expresar tanto nuestro estilo individual como nuestro sentido de pertenencia. El exterior se convierte en un espejo del yo interior, una danza de formas, texturas y colores que revela quiénes somos y, a veces, quiénes anhelamos ser. Este proceso ha liberado los límites del color, la tela y el diseño, dándonos la libertad de transformarnos sin traicionar la esencia que llevamos dentro, respetando las sensibilidades culturales que compartimos hoy. Pero, ante todo, esta colección honra la sostenibilidad. Intento crear diseños que trasciendan lo efímero y la urgencia de lo nuevo por lo nuevo, prendas que irradien elegancia y estilo, no solo hoy, sino también en el mañana. Cada estilo de diseño ha sido creado para que cada mujer, sin importar quién sea, se enfrente al mundo con ropa elegante y elaborada que refleje la belleza interna inherente de cada mujer. «La belleza está en los ojos de quien la contempla, ya sea en los tuyos o en los míos». Este es un homenaje a las texturas y a la magia de las superposiciones. Desde la dulzura envolvente del tweed y la calidez aterciopelada hasta el destello sutil del satén y las aplicaciones en relieve, cada material evoca épocas y estilos que resuenan en armonía. El terciopelo se entrelaza con lentejuelas y bordados, creando piezas que seducen al tacto y deslumbran por su riqueza y opulencia. Los tejidos pesados, como el tweed y la lana, dialogan en contraste con la ligereza etérea de la seda y otros textiles ligeros, logrando un equilibrio sublime entre estructura y fluidez.


#### Lei Zu (SS25) — /runways/lei-zu

- `COLECCIONES[lei-zu].nombre`: Lei Zu
- `COLECCIONES[lei-zu].descripcion`:

  > Atravesar una ruta insospechada: la delicia de recorrer la ruta de la seda ondulante bajo nuestros pies, acompañados de la luz de un cimbreante sol, recorriendo el hilo que envuelve una historia de leyenda y misterio. Fely Campo presenta "Lei Zu" como una colección de prêt-à-porter de lujo que nos habla de su viaje desde Europa a China. "Lei Zu" es un paseo estético a través de 25 sofisticados looks que parten del magistral uso del tweed hasta los patrones más livianos protagonizados por las sedas artesanales chinas traídas por la diseñadora en su reciente viaje a Guangzhou, entremezclándose con los volúmenes de los tafetanes, la esencialidad de los linos, los brocados estampados y la sutileza de las organzas y tules bordados con paillets. En todo su recorrido "Lei Zu" es una oda absoluta a la riqueza del tejido que alcanza su máxima expresión gracias a las siluetas y el cuidado de los cortes. Las superposiciones de piezas, los volúmenes generados por el tafetán, los cortes de las siluetas sastre más estructuradas se hacen protagonistas de las primeras etapas de ese camino en tweeds y trajes de lino que se van deconstruyendo para mostrarnos figuras más lenceras y sensuales con vestidos camiseros y maxi kaftanes de encajes hasta llegar al hipnótico movimiento de los vestidos de las colas de los vestidos más vaporosos. "Lei Zu" acaricia la mirada de quien la observa con tonalidades empolvadas: cristalinos azules, nacarados blancos, suaves lilas y cálidos beige que se sorprenden con la acidez de las limas y los radiantes pistachos. Un elogio a la luz para alcanzar al final del camino el ansiado titilar de pinceladas doradas sobre las negras sedas chinas. "Lei Zu" no es solo una colección. Ni siquiera es una leyenda. Es un viaje al origen de la moda. Es la historia que ya cautivó a Baricco transformada en prendas. Es la magia de transitar la ruta de la seda.


#### The Way Here (AW25) — /runways/the-way-here

- `COLECCIONES[the-way-here].nombre`: The Way Here
- `COLECCIONES[the-way-here].descripcion`:

  > "Una decisión de mi madre me puso por primera vez ante una aguja y un dedal… Sin saberlo, aquel día comenzó a hilvanarse mi vida. Y con ella, esta colección." "The Way Here", el camino hasta aquí, da título a la colección más personal de Fely Campo, vinculada a la emoción y el pensamiento resultado de los 50 años que lleva dedicada a este oficio. En definitiva, su amor por la moda. Un amor y un camino que se materializa en esta colección de prêt-à-porter de lujo. Un viaje creativo hacia el interior, que se erige desde las tonalidades de su color fetiche, el negro: azabache, grafito, antracita, humo, ébano, para envolverse con el fulgor brillante de los tonos fuego y caldero, que se inundan de frescura con las distintas tonalidades verdes. La luminosidad del plata y el dorado junto al crema le otorgan el toque de madurez y sobriedad a la paleta de color de esta colección. Un recorrido a través de la variedad de tejidos: los cálidos paños, los atrevidos lamés, los esenciales tafetanes, los mágicos brocados y las novedosas organzas, fusionan la pasión terrenal con la más experimental de su trayectoria. The Way Here muestra, en su puesta en escena, personal, delicada, enérgica… una nueva perspectiva, en la que se palpa mi pasión, para sentir el tacto de la tela. 26 looks que han viajado para nacer tras estos 50 años: un itinerario que florece a través de líneas más sencillas, con la delicadeza del amor que va brotando, pero con la pasión imparable que te empuja a crear; un amor que avanza y te hipnotiza a través de siluetas que con cada look se tornan más sofisticadas, mostrando la mirada profunda de la diseñadora al conocimiento del oficio, donde el patrón cobra una importancia vital. En palabras de Fely Campo: "The Way Here es la celebración, el crecimiento y la pulsión creativa de 50 años dedicada a la búsqueda de la belleza a través del tejido, del patrón, de mi bien más preciado. En definitiva, mi vida."


#### Zigurat (SS24) — /runways/zigurat

- `COLECCIONES[zigurat].nombre`: Zigurat
- `COLECCIONES[zigurat].descripcion`:

  > Hedonismo, libertad, opulencia, nostalgia y glamour. Esta colección de prêt-à-porter de lujo emerge en Cuba: Fely Campo nos invita a escalar un "Zigurat" de emociones a través de 26 looks que se empapan del ritmo Decó. El Art Decó viste esta colección de patrones puros, que se construyen con la limpieza y sobriedad de los edificios más caprichosos de la Habana. Siluetas y cortes geométricos se entrelazan con tejidos inspirados en el lenguaje ornamental art decó: brocados inundados de juegos visuales 3D con motivos naturales y geométricos; mosaicos orgánicos que se contraponen junto a la verticalidad de las líneas del otomán y los tweeds más arriesgados. Frente a la calma voluminosa de los tafetanes surgen las formas sinuosas de los rasos en movimiento. Los colores rinden homenaje a la vibrante esencia de Cuba y al esplendor del Art Decó. La paleta cromática es diversa, abarcando desde tonos neón y metalizados hasta tonalidades suaves y luminosas. El blanco, como hilo conductor, brilla en conjunto con los vibrantes matices de rosa, azul y amarillo. El uso magistral de tonos metálicos en plata y dorado añade un toque de lujo y sofisticación a la colección. Las siluetas se inspiran en patrones geométricos y cortes rectos característicos del Art Decó. Los escotes cuadrados, los vestidos de siluetas sueltas y los adornos de líneas aportan una estética nítida y elegante. Detalles como mangas con cintas y faldas con volúmenes completan la visión única de Fely Campo. La colaboración artística es un pilar fundamental en esta colección. El artista plástico Álvaro García-Miguel ha creado una pintura digital exclusiva que fusiona el Art Decó con el expresionismo, reflejando la esencia misma de la colección. La realizadora 3D Cami Alberti ha dado vida a los espacios cubanos y ha permitido una inmersión en la obra de Álvaro, fusionando lo terrenal con lo tecnológico. La música, compuesta especialmente para el desfile por Jorge Gamarra (miembro del equipo de Cami Alberti), fusiona ritmos cubanos ancestrales con toques electrónicos, capturando la vitalidad de la cultura y la esencia de la firma. La pieza "Zigurat", coreografiada por el destacado creador de danza española Jose Manuel Buzón e interpretada por 7 talentosos bailarines de la Compañía de Danza Ballet de Cámara de Madrid, perteneciente a la Fundación de la Danza «Alicia Alonso», se entrelaza de manera espectacular con la colección y cierra el desfile en un deslumbrante acto. Contraste, formas, estructura, cromatismo, ornamentos. "Zigurat" crea un universo sentimental que seduce y atraviesa esta propuesta de moda viva e intensa de la diseñadora Fely Campo.


#### Tempore (AW24) — /runways/tempore

- `COLECCIONES[tempore].nombre`: Tempore
- `COLECCIONES[tempore].descripcion`:

  > Mañana, tarde y noche. Tres momentos, tres ritmos, tres emociones pero, sobre todo, un día cualquiera. Tempore explora la fascinación que siento por las imágenes cotidianas que transitan en la vida de una mujer. "Con esta colección pretendo reflejar lo sensorial del acto de vestirse a diario: aquello con lo que te vistes cambia la forma en que te sientes", asegura Fely Campo. Una colección de 27 looks que, en su puesta en escena, adquiere la estructura poética de un Sijô coreano, para crear una narración sobre el día a día que impacta en lo instantáneo, a través de tres tiempos, tres frases, tres composiciones en continuo movimiento: la primera, un boceto sutil de la mañana, casi una helada en el amanecer, las primeras siluetas del día con tejidos tan esenciales como el paño o el tweed que florecen amarillos y cálidos en el cénit; la segunda, las tonalidades magentas y granates crean patrones vibrantes, las prendas adquieren volúmenes que contrastan con piezas más entalladas, el día fluye para observar, admirar y sentir tactos diversos como el tweed, el paño, los rasos, el tafetán y las gasas; la tercera, un centelleo sobre la oscuridad, una melodía de emociones atraviesa el armario femenino, un giro hacia los contrastes absolutos que llegan con la noche, los volúmenes se teatralizan. Tempore es una propuesta sensorial para una mujer que seduce en su día a día, que apuesta por la moda de autor y que desea prendas versátiles. Una mujer que entiende la moda como forma de expresión. Tempore nace como tres colecciones, tres imágenes seductoras, tres maneras de entender la belleza que, como un parpadeo, aparecen y desaparecen construyendo la moda de cada momento.


#### Nagare (SS23) — /runways/nagare

- `COLECCIONES[nagare].nombre`: Nagare
- `COLECCIONES[nagare].descripcion`:

  > Una incansable búsqueda de la belleza. Así es como entiendo el fluir de la moda de principio a fin; un lenguaje que se mueve incansable y en el que encuentro el equilibrio entre la belleza y el ruido de nuestra forma de vida actual. En "Nagare" la sensualidad empapa el ritmo urbano de ciudades como Madrid, Tokio o Nueva York, sorprendentes urbes en plena vibración con las que aludo a nociones tales como la vorágine, la vibración y la pulsión, pero que también evocan quietud, sutileza y deseo, a través de tejidos y patrones que desean participar de ese bullicio. Una colección de prêt-à-porter de lujo con la que quiero representar el movimiento de nuestro ritmo de vida actual. Patrones que aman la sutileza; tejidos que se tornan vulnerables al ruido, al vaivén, al fluir, en definitiva, al movimiento de la mujer que vive con ellos. Con "Nagare" quiero crear una imagen sensorial contemporánea sobre el concepto de la fluidez, con prendas dúctiles y versátiles que reflejan el sentir de la mujer actual que busca moda de autor española, consciente de la necesidad de consumir moda sostenible. Una colección que refleje el "Nagare" de nuestro tiempo: un ballet clásico que fluye con el sonido de la ruidosa ciudad. "Nagare" es para mí una pulsión, una antítesis de lo rígido, la búsqueda de la belleza en pleno movimiento.


#### Diafonía (AW23) — /runways/diafonia

- `COLECCIONES[diafonia].nombre`: Diafonía
- `COLECCIONES[diafonia].descripcion`:

  > Con esta colección de prêt-à-porter de lujo os proponemos un viaje, a través de un contrapunto de sensaciones, al admirar la sobrecogedora belleza de los balcones de las Arribes. Quien se haya asomado alguna vez a este paraje, habrá sentido esa salvaje caricia y la contundente delicadeza del sonido de ese paisaje. Los sentimientos encontrados se armonizan en looks que exponen el contraste de texturas. Las escenas más íntimas, la búsqueda de la belleza sutil y sensible, suena a través de finos rasos, transparencias, tejidos vaporosos y delicados reflejos que se abren paso sobre la fuerza de un paisaje más abrupto, compuesto por prendas de abrigo de tacto firme y tenaz como la lana. Las líneas de la colección más sobrias se componen de volúmenes sastre y oversize, trasladándonos con audacia a la magnitud de las texturas pétreas. Prendas que se comportan como una coraza, bajo las que el acoplamiento de una diafonía descubre una segunda línea más íntima, con una estética lencera, sensual y delicada. Un contrapunto de estéticas que plantea una visión de la moda versátil y atemporal. Diafonía construye un armario femenino que refleja la dureza y la delicadeza de un paisaje inspirador, a través de la contraposición de estéticas. En definitiva, una vertiginosa manera de acercarse al foco de toda la inspiración de Fely Campo: la mujer, su carácter, sus contradicciones, sus contrastes y su manera de sentir el momento actual; acompañada del sonido electromagnético de la diafonía para recorrer el incansable camino hacia la búsqueda de la belleza.


## Talleres

**URL:** /talleres-fely-campo · **Prioridad SEO:** Media

#### SEO de `/talleres-fely-campo` (`src/lib/seoTextos.js`)

- `title`: Nuestros talleres en Salamanca | Fely Campo
- `meta description`: Conoce los talleres de Fely Campo: el atelier de Salamanca y dos pequeños talleres de la sierra donde manos expertas confeccionan cada pieza.

#### Textos de interfaz (`messages/es.json` → `talleres`)

- `talleres.eyebrow`: Nuestro proceso
- `talleres.titulo`: Nuestros talleres
- `talleres.intro`:

  > Donde las manos cuentan historias
  > Cada pieza Fely Campo nace cerca. En nuestro atelier y en dos pequeños talleres de la sierra, manos expertas transforman cada tejido con tiempo, precisión y sensibilidad. Detrás de esas manos hay mujeres, oficio y territorio.


#### Contenido (`src/app/[locale]/talleres-fely-campo/talleres.js`)

- `TALLERES[0].tipo`: TALLER PROPIO
- `TALLERES[0].distancia`: Nuestro taller principal
- `TALLERES[0].parrafos[0]`:

  > En Salamanca se encuentra el lugar donde todo comienza: nuestro atelier. Es aquí donde nacen las ideas, se prueban los primeros prototipos y ocurre toda la magia de Fely Campo.

- `TALLERES[0].parrafos[1]`:

  > En este espacio trabajamos los diseños, creamos los patrones y seleccionamos los tejidos que darán forma a cada colección. Una vez definidos, las piezas se cortan y se envían a nuestros talleres de apoyo, donde continúa el proceso de confección con el mismo cuidado y dedicación.

- `TALLERES[1].tipo`: Taller I
- `TALLERES[1].distancia`: 72 km desde nuestro taller en Salamanca
- `TALLERES[1].liderazgo`: Liderado por Blanca
- `TALLERES[1].parrafos[0]`:

  > Su historia con la costura inició cuando ella cumple 12 años, cuando su madre la llevó a aprender con una modista. A los 16, cuando antaño se podía empezar a trabajar, entró en una fábrica y desde entonces coser se convirtió en su manera de estar en el mundo: es lo que ama, lo que conoce y lo que sigue haciendo, cada día, con la misma entrega.

- `TALLERES[1].parrafos[1]`:

  > Después de pasar por distintas fábricas y ver cómo fueron cerrando una tras otra, hace 13 años abrió su propio taller. Fue entonces cuando comenzó también su historia con Fely Campo, una relación construida puntada a puntada, desde el oficio, la constancia y el amor por hacer las cosas bien.

- `TALLERES[1].parrafos[2]`:

  > Su lugar de trabajo habla de ella. Está lleno de plantas y flores, de fotos de sus mascotas y de su familia, de dos canarios en la ventana rodeados de verde, y de frases sobre la historia de la moda que cubren las paredes. Un taller lleno de vida, donde la costura no es solo un oficio, sino una forma de habitar el tiempo.

- `TALLERES[2].tipo`: Taller II
- `TALLERES[2].distancia`: 54 km desde nuestro taller en Salamanca
- `TALLERES[2].liderazgo`: Liderado por María José
- `TALLERES[2].parrafos[0]`: En Tamames, el tiempo se mide con experiencia y sueños cumplidos.
- `TALLERES[2].parrafos[1]`:

  > María José lleva 44 años dedicándose a la costura. Amalia, 25. Isabel, 36. Amalia e Isabel son hermanas, y las tres comparten mucho más que un oficio. Realmente es una pasión.

- `TALLERES[2].parrafos[2]`:

  > Hace 35 años trabajaban juntas en un pequeño taller de la misma calle para otros costureros. Desde su ventana veían, justo enfrente, el espacio que algún día imaginaron como propio. Un lugar más grande, más suyo, donde continuar haciendo aquello que sabían hacer con las manos y con el corazón.

- `TALLERES[2].parrafos[3]`: Un día cruzaron la calle.
- `TALLERES[2].parrafos[4]`:

  > Desde entonces, aquel taller soñado se convirtió en su lugar de trabajo. Y desde hace 19 años, también forma parte de la historia de Fely Campo. En los tablones de corcho conviven pequeñas estampas religiosas, que colecciona Amalia, con una fotografía de David Bustamante, el favorito de María José. Pequeños gestos que han acumulado por el paso de los años y hablan de ellas, convirtiendo el espacio de trabajo en algo íntimo y propio.

- `TALLERES[2].parrafos[5]`: Tres mujeres, décadas de oficio y una manera de entender la costura que no se aprende deprisa. Se transmite, se perfecciona y se conserva.

## Responsabilidad (manifiesto sostenible)

**URL:** /responsabilidad · **Prioridad SEO:** Media

#### SEO de `/responsabilidad` (`src/lib/seoTextos.js`)

- `title`: Moda responsable y producción local | Fely Campo
- `meta description`: El compromiso de Fely Campo con una moda responsable: producción local en Salamanca, oficio artesano, tejidos seleccionados y prendas para durar.

#### Textos de interfaz (`messages/es.json` → `responsabilidad`)

- `responsabilidad.eyebrow`: Manifiesto sostenible
- `responsabilidad.titulo`: El compromiso de Fely Campo con la moda

#### Manifiesto (`src/app/[locale]/responsabilidad/responsabilidad.js`)

- `RESPONSABILIDAD.texto`:

  > En Fely Campo el diseño es la manera en la que nos comunicamos con el mundo, por lo que tenemos el compromiso de aportar un impacto positivo a las personas y al planeta.
  > Apostamos por el slowfashion a través de la durabilidad de las prendas y del valor de la moda de autor 100% hecha en España. Nuestro compromiso es de sostenibilidad social además de medioambiental.
  > Pretendemos generar un impacto positivo en nuestra comunidad y creemos en las personas como principales agentes de cambio; por lo que promovemos la igualdad de género y la inclusión en el lugar de trabajo para crear un equipo que inspire a las personas.
  > La mujer es el centro que inspira nuestra firma, pero también el que la crea. Fely Campo trabaja con cooperativas de mujeres del medio rural de Castilla y León para la confección de sus prendas, garantizando así un producto fabricado íntegramente en España, que favorece la producción local y la no despoblación de las zonas rurales además de la calidad y el saber hacer de la alta costura.
  > Impulsamos un consumo responsable, creando prendas de alta calidad, con diseños con esencia atemporal y versátiles para poder ser utilizados en diferentes ocasiones. Creamos la mayoría de nuestras piezas elaboradas exclusivamente para el cliente, fabricación made to order, evitando la generación de residuos y stock. Además de incluir en nuestras colecciones, cada vez más fibras de origen natural o recicladas en los tejidos con los que diseñamos.
  > Además, Fely Campo colabora activamente en diferentes iniciativas solidarias o preocupadas por inspirar el papel de la mujer en nuestra sociedad como Programa Promociona, Colaboración con AECC Salamanca, etc.


## Puntos de venta

**URL:** /puntos-de-venta-fely-campo · **Prioridad SEO:** Media

Lista de tiendas multimarca (nombres y ciudades; direcciones y teléfonos omitidos, no se deben cambiar).

#### SEO de `/puntos-de-venta-fely-campo` (`src/lib/seoTextos.js`)

- `title`: Puntos de venta y boutiques | Fely Campo
- `meta description`: Encuentra Fely Campo en boutiques seleccionadas de España, Europa y Estados Unidos. Mapa de puntos de venta y búsqueda por código postal.

#### Textos de interfaz (`messages/es.json` → `puntosVenta`)

- `puntosVenta.tituloHero`: Boutique Selectas
- `puntosVenta.subtituloHero`: Encuentra tu Fely Campo en nuestros puntos de venta.
- `puntosVenta.eyebrow`: Dónde encontrarnos
- `puntosVenta.titulo`: Puntos de venta
- `puntosVenta.intro`:

  > Descubre nuestros ateliers y la red de boutique que trabajan con Fely Campo, en España y en el resto del mundo. Contamos con más de 200 puntos de venta. Encuentra tu punto de venta más cercano

- `puntosVenta.direcciones`: Cómo llegar
- `puntosVenta.buscarCpPlaceholder`: Código postal
- `puntosVenta.buscarCpBoton`: Buscar
- `puntosVenta.buscarCpError`: Introduce un código postal español válido (5 dígitos).
- `puntosVenta.internacionalTitulo`: Boutiques internacionales
- `puntosVenta.internacionalIntro`: Milán ocupa un lugar especial en nuestra red internacional, gracias a la estrecha relación que mantenemos con el mercado italiano.

#### Tiendas (`src/components/layout/puntosVenta.js`)

- Fely Campo Atelier Novias y fiesta Salamanca — Salamanca 37008
- Fely Campo Madrid Atelier — Madrid 28001
- Teresa Justel — Toledo 45004
- For You — Burgos 09007
- Fely Campo Oviedo — Oviedo, Asturias 33004
- L.M & Company — Logroño 26003
- Pilar y Carmen — A Coruña 15003
- Paqui Muriel — Linares, Jaén 23700
- Ángela Serrano — Jaén 23001
- Boutique Tess — Albacete 02001
- Marengo — Zaragoza 50001
- Miguel Ángel Jacinto — Benaguasil 46180
- Sancresp 21 — Granada 18004
- Atelier by Penhalta — Valencia 46002
- Domani Valencia — Valencia 46004
- Saratoga Boutique Valencia — Valencia 46004
- Juan y Ana Amante — Murcia 33001
- Bolta — Oliva, Valencia 46780
- Gala García Novias — Lleida 25006
- Vogam — Lleida 25007
- Mamen González Novias — Alicante 03001
- Naoite Olot — Olot, Girona 17800
- Steil Pleser — Swansea SA4 8SZ
- Macbees — Killarney
- Olivier Sinic Le Château Blanc — Verlinghem 59237
- Nigel Rayment — Luton LU2 7QW
- Ela María — Newcastle West
- The Wedding Shop — Colchester CO1 1DA
- Bliss Bridal — Luxemburgo 1946
- Liluca AG — Zúrich 8001
- Le Chapeau — Amberes 2000
- Don't Call Me Dear — Galway
- Liluca Meier AG — St. Gallen 9000
- Sposi Domani — Cerese di Virgilio 46034
- Katriona — Banbridge BT32
- The Fashion House — Magherafelt BT45 6EE
- Say Yes Munich — Múnich 81675
- Agnetti — Macerata 62100
- Le Spose di Domenico — Marsala 91025
- Bon Ton — Sora 03039
- Alida Giordani — Porto Sant'Elpidio 63821
- Giambona — Terrasini 90049
- Frasal Black Cherry — Sciacca 92019
- Sergio Messina — Palermo 90143
- Catherines of Partick — Glasgow G11 6NY
- La Boutique della Sposa — Palermo 90123
- Gioel Moda — Casagiove 81022
- Frox of Falkirk — Falkirk FK1 1JQ
- Parente — San Giuseppe 80047
- Filippo Marchesani — Cupello 66051
- Bellavia — Porto Empedocle 92014
- Dente Anna Fausta — Canosa di Puglia 76012
- Novias Di Stefano — Catania 95129
- Mythos Tavani — Barletta 76121
- Sorelle Carbe — Avola 96012
- Atelier 7 — Viena 1070
- Fantasy Bridal — Kinnelon, New Jersey 07405

## Prêt-à-porter (tienda online)

**URL:** /pret-a-porter y categorías · **Prioridad SEO:** Alta

#### SEO de `/pret-a-porter` (`src/lib/seoTextos.js`)

- `title`: Prêt-à-porter de mujer | Tienda online Fely Campo
- `h1 (oculto, solo para buscadores)`: Prêt-à-porter de mujer Fely Campo
- `meta description`: Compra online el prêt-à-porter de Fely Campo: vestidos, faldas, pantalones, tops y abrigos diseñados y confeccionados en Salamanca.

#### SEO de `/pret-a-porter/vestidos` (`src/lib/seoTextos.js`)

- `title`: Vestidos de mujer | Prêt-à-porter Fely Campo
- `meta description`: Vestidos de prêt-à-porter de Fely Campo para el día a día y para ocasiones especiales, confeccionados en Salamanca. Compra online.

#### SEO de `/pret-a-porter/faldas` (`src/lib/seoTextos.js`)

- `title`: Faldas de mujer | Prêt-à-porter Fely Campo
- `meta description`: Faldas de Fely Campo en tejidos seleccionados, estampadas y lisas, diseñadas y confeccionadas en Salamanca. Descubre la colección online.

#### SEO de `/pret-a-porter/chaquetas-y-abrigos` (`src/lib/seoTextos.js`)

- `title`: Chaquetas y abrigos de mujer | Fely Campo
- `meta description`: Chaquetas y abrigos de mujer de Fely Campo, con tejidos nobles y patronaje de atelier, confeccionados en Salamanca. Compra online.

#### SEO de `/pret-a-porter/pantalones` (`src/lib/seoTextos.js`)

- `title`: Pantalones de mujer | Prêt-à-porter Fely Campo
- `meta description`: Pantalones de mujer de Fely Campo con patronaje propio y acabados de atelier, confeccionados en Salamanca. Compra online.

#### SEO de `/pret-a-porter/tops-y-camisetas` (`src/lib/seoTextos.js`)

- `title`: Tops y camisetas de mujer | Fely Campo
- `meta description`: Tops, blusas y camisetas de prêt-à-porter de Fely Campo, diseñados en Salamanca para combinar con el resto de la colección. Compra online.

#### Contenido editorial (`src/app/[locale]/pret-a-porter/pretAPorterEditorial.js`)

- `PRET_A_PORTER_EDITORIAL.descripcion[0]`: La misma firma, para el día a día.
- `PRET_A_PORTER_EDITORIAL.descripcion[1]`: El mismo cuidado, ahora listo para llevar.
- `PRET_A_PORTER_EDITORIAL.bloques[0].titulo`: Vestir sin esperar
- `PRET_A_PORTER_EDITORIAL.bloques[0].texto`:

  > La colección prêt-à-porter recoge la misma manera de construir cada prenda, pero lista para llevar: patrones estudiados, tejidos con carácter y un punto de diseño que no pasa desapercibido.

- `PRET_A_PORTER_EDITORIAL.bloques[1].titulo`: Color y volumen, todos los días
- `PRET_A_PORTER_EDITORIAL.bloques[1].texto`: Abrigos con volumen, colores que se atreven y detalles hechos a mano: prendas pensadas para salir del taller ya con personalidad propia.

#### Productos (`src/components/layout/tiendaProductos.js`) — nombre y descripción, de cada uno sale su ficha /pret-a-porter/[producto]

- `faldas · Falda Basilea`: Falda Basilea estampada color verde esmeralda.
- `faldas · Falda Lhasa`: Falda Lhasa a cuadros color marrón bronce.
- `chaquetas-y-abrigos · Chaqueta Samarcanda`: Chaqueta Samarcanda a cuadros marrón y negro.
- `vestidos · Vestido Largo Chicago`: Vestido Largo Chicago de manga larga en encaje negro.
- `faldas · Falda Sucre`: Falda Sucre con abertura color marrón.
- `pantalones · Pantalón Goree`: Pantalón Goree a rayas color antracita.
- `chaquetas-y-abrigos · Chaqueta Sucre`: Chaqueta Sucre de lana color marrón.
- `chaquetas-y-abrigos · Abrigo Corto`: Abrigo corto color morado.
- `chaquetas-y-abrigos · Chaqueta Aranjuez`: Chaqueta Aranjuez de paillette color dorado.
- `faldas · Falda Jeju`: Falda Jeju a cuadros color gris.
- `tops-y-camisetas · Top Ubud`: Top Ubud de cuerpo pellizcado color rojo y negro.
- `chaquetas-y-abrigos · Abrigo Copenhague`: Abrigo Copenhague de lana color rosa palo.
- `tops-y-camisetas · Top Encaje París`: Top Encaje París de encaje en diversos colores.
- `vestidos · Vestido Zahara`: Vestido Zahara plisado color verde botella.
- `vestidos · Vestido Ciruela`: (sin descripción)
- `tops-y-camisetas · Top lencero`: (sin descripción)
- `chaquetas-y-abrigos · Chaqueta`: (sin descripción)

#### Textos de interfaz (`messages/es.json` → `producto`)

- `producto.anadirWishlist`: Añadir a Wishlist
- `producto.fichaCaption`: Ficha de producto
- `producto.anadirCesta`: Añadir
- `producto.avisame`: Avísame cuando esté disponible
- `producto.avisoTalla`: Selecciona una talla antes de añadir al carrito.
- `producto.talla`: Talla
- `producto.contactar`: Contacta con nosotros
- `producto.avisoColor`: Selecciona un color antes de contactar.
- `producto.runwayLook`: Runway look
- `producto.composicion`: Composición
- `producto.composicionTexto`: 100% materiales de temporada, seleccionados por nuestro equipo de diseño. Lavado a mano o en seco, no usar secadora.
- `producto.origenDisenado`: Diseñado en: Salamanca, España
- `producto.origenFabricado`: Fabricado en: Salamanca, España
- `producto.origenTintura`: Tintura y estampación: Italia
- `producto.origenTejido`: Origen tejido: India
- `producto.categorias`: Categorías
- `producto.porEncargoTitulo`: Producto por Encargo (PRE-ORDER)
- `producto.porEncargoTexto`:

  > Esta prenda se realiza por encargo específicamente para cada pedido y cliente, por lo que no se admite realizar devolución una vez confirmado el pedido. Por ello puedes contactar con nosotros para más información y para hacer el pedido a través de nuestro botón de más información.

- `producto.envios`: Envíos y devoluciones
- `producto.enviosSubtitulo`: Envíos
- `producto.devolucionesSubtitulo`: Devoluciones
- `producto.devolucionesTexto`:

  > Puedes ponerte en contacto con nosotros en <email>info@felycampo.com</email> o en el <telefono>+34 683 703 644</telefono> dentro de los 14 días naturales siguientes a la recepción del pedido para gestionar una devolución o cambio. Te indicaremos los pasos a seguir. Los gastos de devolución corren a cargo del cliente, salvo en caso de prenda defectuosa o error en el pedido. Visita nuestra página de <atencion>atención al cliente</atencion>.

- `producto.entregaEstimada`: Entrega estimada: 2 semanas
- `producto.noEncontrado`: No hemos encontrado este producto.
- `producto.seguirExplorandoTienda`: Sigue explorando la colección
- `producto.seguirExplorandoAtelier`: Sigue explorando el atelier
- `producto.galeriaAnterior`: Imagen anterior
- `producto.galeriaSiguiente`: Imagen siguiente
- `producto.galeriaCerrar`: Cerrar galería
- `producto.lookNumero`: Look {numero}
- `producto.productosLook`: Prendas de este look
- `producto.consigueElLook`: Consigue el look
- `producto.lookVerDetalle`: Ver detalle del look

#### Textos de interfaz (`messages/es.json` → `contactoProducto`)

- `contactoProducto.titulo`: Contacta con nosotros
- `contactoProducto.subtitulo`: Cuéntanos qué necesitas y te contestamos lo antes posible.
- `contactoProducto.nombre`: Nombre
- `contactoProducto.nombrePlaceholder`: María Martín
- `contactoProducto.emailPlaceholder`: maria@ejemplo.com
- `contactoProducto.avisoDatos`: Completa tu nombre y email para continuar.
- `contactoProducto.enviar`: Enviar
- `contactoProducto.confirmacionTitulo`: ¡Listo!
- `contactoProducto.confirmacionTexto`: Hemos recibido tu mensaje. Nuestro equipo se pondrá en contacto contigo enseguida.
- `contactoProducto.cerrar`: Cerrar

#### Textos de interfaz (`messages/es.json` → `guiaTallas`)

- `guiaTallas.abrir`: Guía de tallas
- `guiaTallas.titulo`: Medidas
- `guiaTallas.cerrar`: Cerrar guía de tallas
- `guiaTallas.seleccionaTallaje`: Selecciona un tallaje
- `guiaTallas.unidadCm`: CM
- `guiaTallas.vistaPatron`: Patrón
- `guiaTallas.talla`: Talla
- `guiaTallas.disclaimer`: Las medidas se han tomado como referencia y pueden variar ligeramente según el material o la fabricación. Sirven como referencia al elegir la talla.
- `guiaTallas.comoMedir`: Cómo medir
- `guiaTallas.medidas.pecho.etiqueta`: Pecho
- `guiaTallas.medidas.pecho.texto`: Rodea el busto por el punto más saliente.
- `guiaTallas.medidas.cintura.etiqueta`: Cintura
- `guiaTallas.medidas.cintura.texto`: Envuelve la parte más estrecha del abdomen.
- `guiaTallas.medidas.cadera.etiqueta`: Cadera
- `guiaTallas.medidas.cadera.texto`: Mide el contorno en el punto más ancho.

#### Textos de interfaz (`messages/es.json` → `infoEnvios`)

- `infoEnvios.titulo`: Envíos y devoluciones
- `infoEnvios.cerrar`: Cerrar
- `infoEnvios.enviosTitulo`: Envíos
- `infoEnvios.metodoDomicilio`: Domicilio
- `infoEnvios.plazoDomicilio`: (1-4 días laborables)
- `infoEnvios.metodoTienda`: Tienda
- `infoEnvios.plazoTienda`: (2-8 días laborables)
- `infoEnvios.metodoPuntoRecogida`: Punto de recogida
- `infoEnvios.plazoPuntoRecogida`: (1-3 días laborables)
- `infoEnvios.gratis`: Gratis
- `infoEnvios.devolucionesTitulo`: Devoluciones
- `infoEnvios.devolucionesIntro`: Tienes 30 días (14 días para artículos de la colección CAPSULE) para realizar cambios y devoluciones:
- `infoEnvios.metodoEnTienda`: En tienda
- `infoEnvios.metodoEnPuntoEntrega`: En punto de entrega
- `infoEnvios.metodoRecogidaDomicilio`: Recogida a domicilio
- `infoEnvios.notaFinal`: Algunos artículos tienen condiciones especiales de devolución. Consulta más información en <ayuda>Ayuda</ayuda>.

#### Textos de interfaz (`messages/es.json` → `escribirResena`)

- `escribirResena.titulo`: Escribe tu reseña
- `escribirResena.subtitulo`: Cuéntanos qué te ha parecido esta pieza — tu opinión ayuda a otras clientas.
- `escribirResena.valoracion`: Valoración
- `escribirResena.avisoValoracion`: Selecciona una valoración.
- `escribirResena.comentario`: Tu reseña
- `escribirResena.comentarioPlaceholder`: ¿Qué es lo que más te ha gustado?
- `escribirResena.enviar`: Enviar reseña
- `escribirResena.confirmacionTitulo`: ¡Gracias por tu reseña!
- `escribirResena.confirmacionTexto`: La revisaremos y la publicaremos en la ficha del producto en breve.
- `escribirResena.cerrar`: Cerrar

## Fichas de vestidos de novia

**URL:** /atelier/novias/[producto] · **Prioridad SEO:** Media

Cada look tiene su ficha. Donde no hay descripción propia, se usa una **plantilla automática** ("Pieza de la colección X…"), que hoy se repite en muchas fichas y es una oportunidad de mejora SEO. Origen: `src/components/layout/noviaProductos.js`.

#### Colección Bride 27 — 18 looks (18 con descripción propia)

- `Look 1 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 2 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 3 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 4 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 5 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 6 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 7 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 8 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 9 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 10 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 11 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 12 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 13 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 14 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 15 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 16 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 17 - Bride 27`: Vestido Novia nueva colección 26/27
- `Look 18 - Bride 27`: Vestido Novia nueva colección 26/27

#### Colección ME — 14 looks (14 con descripción propia)

- `Look 1 - ME Bridal`: Vestido de líneas lápiz, con detalle pieza corsé en cintura. Escote en espalda cuadrado pronunciado. Detalle de manga abullonada en satén azul.
- `Look 2 - ME Bridal`:

  > Vestido de línea recta inspiración años 20, con detalles de banda encaje en cuerpo, falda tableada con ligeros recogidos. Detalle de botones y caídas con satén azul.

- `Look 3 - ME Bridal`:

  > Vestido de líneas lápiz, con detalle pieza corsé en cintura. Escote en espalda cuadrado pronunciado. Detalle de manga abullonada en satén azul. Capa en gasa de Seda

- `Look 4 - ME Bridal`:

  > Abrigo de manga japonesa abullonadas, con detalle de escote en espalda con cuello al bies, colas cuadradas. Combinado con vestido de satén con brillo de silueta lápiz con espalda volada.

- `Look 5 - ME Bridal`: Conjunto 3 piezas de cuerpo de encaje, con manga abullonada y abertura en espalda. Combinación de raso y falda de tafetán en línea A con grandes godets.
- `Look 6 - ME Bridal`: Vestido de escote recto, con tirante fino, de líneas puras con detalle de escote espalda separada, Confeccionado en raso de seda.
- `Look 7 - ME Bridal`:

  > Vestido de línea A, con esote bañera, hombros al descubiertos, manga larga. En delantero detalle abullonado en satén, en espalda escote cuadrado. Confeccionado en crep.

- `Look 8 - ME Bridal`:

  > Vestido de largos asimétricos, corto por delante y con cola. Escote cuadrado muy pronunciado en espalda, confeccionado en tafetán con textura y detalle de pedrería con perlas en delantero. Manguitos con caídas largas.

- `Look 9 - ME Bridal`: Vestido línea A, con manga larga, y escote pronunciado en espalda. Confeccionado en raso con flores brocadas, con detalle de botones en espalda en satén azul.
- `Look 10 - ME Bridal`: Abrigo de líneas geométricas, con cuello chimenea, y abertura pronunciada en espalda con colas. Combinado con vestido de saten tafetanado, de falda tableada.
- `Look 11 - ME Bridal`:

  > Vestido de silueta sirena, confeccionado en crep. Con hombro metido y escote delantero a pico. Detalle de tul bordado en flores de perlas y lentejuelas en cuerpo. Capa confeccionada en crep, con gran vuelo.

- `Look 12 - ME Bridal`: Vestido entallado en cuerpo, con falda de vuelo tableada. Detalle de cinturón lazos a altura de cadera. Confeccionado en satén tafetaneado.
- `Look 13 - ME Bridal`: Vestido midi, silueta A, con cancán pronunciado en falda, de tules. Escote en espalda. Confeccionado a mano en red de pedrería y perlas.
- `Look 14 - ME Bridal`: Vestido baby doll, confeccionado en tul y encaje de red con tonos holográficos. Escotes cuadrados pronunciados. Detalle de guantes abullonados

#### Colección Bambú Novia — 13 looks (0 con descripción propia)

- _13 looks con la descripción automática: Look 1 - Bambú Novia, Look 2 - Bambú Novia, Look 3 - Bambú Novia, Look 4 - Bambú Novia, Look 5 - Bambú Novia, Look 6 - Bambú Novia, Look 7 - Bambú Novia, Look 8 - Bambú Novia, Look 9 - Bambú Novia, Look 10 - Bambú Novia, Look 11 - Bambú Novia, Look 12 - Bambú Novia, Look 13 - Bambú Novia_

#### Colección Savia Novia — 9 looks (0 con descripción propia)

- _9 looks con la descripción automática: Look 1 - Savia Novia, Look 2 - Savia Novia, Look 3 - Savia Novia, Look 4 - Savia Novia, Look 5 - Savia Novia, Look 6 - Savia Novia, Look 7 - Savia Novia, Look 8 - Savia Novia, Look 9 - Savia Novia_

#### Colección Inside — 7 looks (0 con descripción propia)

- _7 looks con la descripción automática: Look 1 - Inside Introspection Novia, Look 2 - Inside Introspection Novia, Look 3 - Inside Introspection Novia, Look 4 - Inside Introspection Novia, Look 5 - Inside Introspection Novia, Look 6 - Inside Introspection Novia, Look 7 - Inside Introspection Novia_

#### Colección Introspección — 13 looks (0 con descripción propia)

- _13 looks con la descripción automática: Look 1 - Introspección Novia, Look 2 - Introspección Novia, Look 3 - Introspección Novia, Look 4 - Introspección Novia, Look 5 - Introspección Novia, Look 6 - Introspección Novia, Look 7 - Introspección Novia, Look 8 - Introspección Novia, Look 9 - Introspección Novia, Look 10 - Introspección Novia, Look 11 - Introspección Novia, Look 12 - Introspección Novia, Look 13 - Introspección Novia_

## Fichas de vestidos de fiesta

**URL:** /atelier/fiesta/[producto] · **Prioridad SEO:** Media

Cada look tiene su ficha. Donde no hay descripción propia, se usa una **plantilla automática** ("Pieza de la colección X…"), que hoy se repite en muchas fichas y es una oportunidad de mejora SEO. Origen: `src/components/layout/fiestaProductos.js`.

#### Colección 26_Opaline — 32 looks (0 con descripción propia)

- _32 looks con la descripción automática: Look 1 26_Opaline, Look 2 26_Opaline, Look 3 26_Opaline, Look 4 26_Opaline, Look 5 26_Opaline, Look 6 26_Opaline, Look 7 26_Opaline, Look 8 26_Opaline, Look 9 26_Opaline, Look 10 26_Opaline, Look 11 26_Opaline, Look 12 26_Opaline, Look 13 26_Opaline, Look 14 26_Opaline, Look 15 26_Opaline, Look 16 26_Opaline, Look 17 26_Opaline, Look 18 26_Opaline, Look 19 26_Opaline, Look 20 26_Opaline, Look 21 26_Opaline, Look 22 26_Opaline, Look 23 26_Opaline, Look 24 26_Opaline, Look 25 26_Opaline, Look 26 26_Opaline, Look 27 26_Opaline, Look 28 26_Opaline, Look 29 26_Opaline, Look 30 26_Opaline, Look 31 26_Opaline, Look 32 26_Opaline_

#### Colección 25_L'Allure — 35 looks (35 con descripción propia)

- `Look 1 25_L'Allure`: Vestido largo en satén beirut con chaqueta con tejido organza.
- `Look 2 25_L'Allure`: Vestido largo en crep satén con chaqueta de encaje o capelina en jacquart de rosas.
- `Look 3 25_L'Allure`: Conjunto pantalón y casaca confeccionados en raso a una cara.
- `Look 4 25_L'Allure`: Conjunto pantalón y top confeccionado en lamé plisado con abrigo a juego de lino lurex.
- `Look 5 25_L'Allure`: Vestido largo con capa confeccionado en raso a una cara.
- `Look 6 25_L'Allure`: Conjunto de pantalón y top confeccionados en satén con capa en gasa o chaleco con tejido jacquart con rosas.
- `Look 7 25_L'Allure`: Falda larga con tejido raso a una cara y chaqueta a juego confeccionada en raso a una cara con pedrería.
- `Look 8 25_L'Allure`: Vestido largo con tejido raso toscana y chaqueta a juego confeccionada en jacquart acolchado.
- `Look 9 25_L'Allure`: Vestido largo con tejido brocado rosas.
- `Look 10 25_L'Allure`: Vestido con chaqueta confeccionados en raso a una cara.
- `Look 11 25_L'Allure`: Vestido con tejido de crep grueso con capelina a juego tambien en crep grueso o abrigo confeccionado con relieve geom.
- `Look 12 25_L'Allure`: Vestido con tejido de mikado con capelina a juego o abrigo confeccionados en organza.
- `Look 13 25_L'Allure`: Vestido con capelina a juego en tejido jacquart liso brillo.
- `Look 14 25_L'Allure`: Falda larga y top confeccionados en raso a una cara.
- `Look 15 25_L'Allure`: Vestido largo y chaqueta en tejido jacquart liso brillo.
- `Look 16 25_L'Allure`: Vestido largo y chaqueta en raso doble cara.
- `Look 17 25_L'Allure`: Conjunto falda y chaqueta en raso a una cara.
- `Look 18 25_L'Allure`: Vestido largo confeccionado en jacquard film.
- `Look 19 25_L'Allure`: Conjunto pantalón y casaca confeccionado en raso doble cara y la casaca con pluma.
- `Look 20 25_L'Allure`: Conjunto pantalón y casaca confeccionado en crep fino.
- `Look 21 25_L'Allure`: Conjunto pantalón y casaca en raso a una cara.
- `Look 22 25_L'Allure`: Vestido largo con estampado acuarela.
- `Look 23 25_L'Allure`: Vestido largo con tejido lamé tweed raya y abrigo confeccionada con tweed flores con efecto envejecido.
- `Look 24 25_L'Allure`: Vestido largo con estampado de flores y chaqueta confeccionada con organza.
- `Look 25 25_L'Allure`: Vestido largo confeccionado con tejido raso a una cara.
- `Look 26 25_L'Allure`: Conjunto pantalón y casaca con tejido raso a una cara.
- `Look 27 25_L'Allure`: Conjunto pantalón y chaqueta en crep fino.
- `Look 28 25_L'Allure`: Vestido largo con tejido de brocado rosas.
- `Look 29 25_L'Allure`: Vestido largo con tejido organza relieve.
- `Look 30 25_L'Allure`: Vestido largo con tejido raso a una cara y pedrería.
- `Look 31 25_L'Allure`: Vestido largo con tejido raso a una cara y chaqueta de pedrería.
- `Look 32 25_L'Allure`: Vestido largo con tejido crep grueso y chaleco en organza.
- `Look 33 25_L'Allure`: Vestido largo con tejido brocado rosas.
- `Look 34 25_L'Allure`: Vestido largo de raso a una cara.
- `Look 35 25_L'Allure`: Conjunto pantalón y top con abrigo en lamé degradado.

#### Colección Prêt-à-porter — 27 looks (13 con descripción propia)

- `PANTALÓN ANCHO RAYA DIPLOMATICA`: RAYA DIPLOMATICA ANCHA / RAYA DIPLOMATICA FINA
- `PANTALÓN ANCHO BOLSILLOS`: CUADROS ROJOS
- `TOP PICHI`: JACQUARD EFECTO ONDAS
- `FALDA TAFETÁN EFECTO PAPEL`: TAFETÁN EFECTO PAPEL PLATA / TAFETÁN EFECTO PAPEL DORADO
- `TOP TWEED BOLSILLOS`: VERDE / FUCSIA / GRANATE
- `PANTALÓN FLUIDO TERCIOPELO`: TERCIPOELO LAMÉ VERDE
- `ABRIGO OVERSIZE SASTRE`: JASPEADO MARRON
- `PANTALÓN CAMPANA`: JACQUARD EFECTO OLAS ARENA
- `CASACA LARGA RAYA DIPLOMÁTICA`: RAYA DIPLOMATICA ANCHA / RAYA DIPLOMATICA FINA
- `FALDA MIDI TERCIPELO`: TERCIOPELO-LAME-AZUL
- `FALDA TAFETÁN ESTAMPADA`: TAFETAN-ESTAMPADO-CUADROS-PLATA-NEGRO-AZUL / TAFETAN-ESTAMPADO-METEORA-MORADO
- `CHAQUETA RAYA DIPLOMÁTICA`: RAYA DIPLOMATICA ANCHA / RAYA DIPLOMATICA FINA
- `TRENCH CUADRO ESCOCÉS`: ROJO / VERDE
- _14 looks con la descripción automática: CHAQUETÓN OVERSIZE, PANTALÓN PALAZZO, ABRIGO CRUZADO, PANTALÓN PITILLO LANA, FALDA MIDI BOLSILLOS PLASTÓN, FALDA TAFETÁN, ABRIGO CRUZADO LANA, ABRIGO SASTRE, CHAQUETÓN CUELLO ABULLONADO, ABRIGO MANGA JAPONESA, ABRIGO OVERSIZE VOLANTES, ABRIGO VOLANTE TABLAS, ABRIGO OVERSIZE, CAPA LANA_

#### Colección En Madrid — 26 looks (0 con descripción propia)

- _26 looks con la descripción automática: Look 1 - En Madrid, Look 2 - En Madrid, Look 3 - En Madrid, Look 4 - En Madrid, Look 6 - En Madrid, Look 8 - En Madrid, Look 9 - En Madrid, Look 10 - En Madrid, Look 11 - En Madrid, Look 12 - En Madrid, Look 13 - En Madrid, Look 15 - En Madrid, Look 16 - En Madrid, Look 18 - En Madrid, Look 20 - En Madrid, Look 22 - En Madrid, Look 26 - En Madrid, Look 27 - En Madrid, Look 29 - En Madrid, Look 30 - En Madrid, Look 31 - En Madrid, Look 32 - En Madrid, Look 34 - En Madrid, Look 36 - En Madrid, Look 41 - En Madrid, Look 42 - En Madrid_

#### Colección A Walk — 29 looks (0 con descripción propia)

- _29 looks con la descripción automática: Look 60 – A Walk, Look 56 – A Walk, Look 52 – A Walk, Look 51 – A Walk, Look 47 – A Walk, Look 46 – A Walk, Look 45 – A Walk, Look 40 – A Walk, Look 39 – A Walk, Look 38 – A Walk, Look 37 – A Walk, Look 35 – A Walk, Look 34 – A Walk, Look 28 – A Walk, Look 25 – A Walk, Look 24 – A Walk, Look 21 – A Walk, Look 16 – A Walk, Look 13 – A Walk, Look 12 – A Walk, Look 10 – A Walk, Look 8 – A Walk, Look 7 – A Walk, Look 6 – A Walk, Look 5 – A Walk, Look 4 – A Walk, Look 3 – A Walk, Look 2 – A Walk, Look 1 – A Walk_

#### Colección Bambú — 13 looks (0 con descripción propia)

- _13 looks con la descripción automática: Look 49 – Bambú Fiesta, Look 48 – Bambú Fiesta, Look 47 – Bambú Fiesta, Look 46 – Bambú Fiesta, Look 45 – Bambú Fiesta, Look 44 – Bambú Fiesta, Look 24 – Bambú Fiesta, Look 20 – Bambú Fiesta, Look 19 – Bambú Fiesta, Look 17 – Bambú Fiesta, Look 11 – Bambú Fiesta, Look 8 – Bambú Fiesta, Look 2 – Bambú Fiesta_

#### Colección Savia — 14 looks (0 con descripción propia)

- _14 looks con la descripción automática: Look 17 – Savia Fiesta, Look 15 – Savia Fiesta, Look 14 – Savia Fiesta, Look 13 – Savia Fiesta, Look 12 – Savia Fiesta, Look 11 – Savia Fiesta, Look 9 – Savia Fiesta, Look 8 – Savia Fiesta, Look 6 – Savia Fiesta, Look 5 – Savia Fiesta, Look 4 – Savia Fiesta, Look 3 – Savia Fiesta, Look 2 – Savia Fiesta, Look 1 – Savia Fiesta_

#### Colección Miscelanea — 9 looks (0 con descripción propia)

- _9 looks con la descripción automática: Look 33 – Miscelanea Fiesta, Look 30 – Miscelanea Fiesta, Look 28 – Miscelanea Fiesta, Look 18 – Miscelanea Fiesta, Look 15 – Miscelanea Fiesta, Look 14 – Miscelanea Fiesta, Look 4 – Miscelanea Fiesta, Look 3 – Miscelanea Fiesta, Look 1 – Miscelanea Fiesta_

#### Colección Furisode — 14 looks (0 con descripción propia)

- _14 looks con la descripción automática: Look 1 Furisode Fiesta, Look 2 Furisode Fiesta, Look 3 Furisode Fiesta, Look 4 Furisode Fiesta, Look 11 Furisode Fiesta, Look 12 Furisode Fiesta, Look 14 Furisode Fiesta, Look 15 Furisode Fiesta, Look 16 Furisode Fiesta, Look 17 Furisode Fiesta, Look 24 Furisode Fiesta, Look 25 Furisode Fiesta, Look 29 Furisode Fiesta, Look 30 Furisode Fiesta_

## Blog / podcast

**URL:** /podcast y /podcast/[entrada] · **Prioridad SEO:** Alta

Cada entrada tiene su URL propia. Los relatos de autores invitados son voz de autor: mejora título, entradilla y estructura, no el texto.

#### SEO de `/podcast` (`src/lib/seoTextos.js`)

- `title`: Blog y podcast de moda | Fely Campo
- `meta description`: Artículos y episodios del podcast de Fely Campo sobre vestidos de novia, invitada, madrina y el oficio del atelier.

#### Textos de interfaz (`messages/es.json` → `blog`)

- `blog.volver`: Volver al blog
- `blog.leerArticulo`: Leer artículo
- `blog.escucharEpisodio`: Escuchar episodio
- `blog.episodio`: Episodio
- `blog.con`: Con
- `blog.shopHere`: Comprar aquí

### La Niña de la Aguja — /podcast/la-nina-de-la-aguja

- `BLOG[la-nina-de-la-aguja].categoria`: Relato
- `BLOG[la-nina-de-la-aguja].autor`: Bozhana Stoeva
- `BLOG[la-nina-de-la-aguja].titulo`: La Niña de la Aguja
- `BLOG[la-nina-de-la-aguja].resumen`:

  > Un cuento de Bozhana Stoeva basado en la historia real de Fely Campo: de una niña de trece años con un dedal en Salamanca a más de 50 años dedicada a la alta costura.

- `BLOG[la-nina-de-la-aguja].bloques[0].texto`: Cuento basado en la historia de Fely Campo, escrito por Bozhana Stoeva (Lo Invisible Visible blog).
- `BLOG[la-nina-de-la-aguja].bloques[1].texto`:

  > Amanecía. La ciudad de Salamanca todavía dormía. El crepúsculo se disipaba por las silenciosas calles. El eco de los pasos retumbaba por las baldosas que servían de vestimenta de las angostas travesías. Las pocas luces se asomaban por las ventanas de los edificios cuyos destellos se perseguían por la piedra franca que cubría las fachadas de los eternos palacetes solariegos. Detrás de una abertura se divisaba el rostro de una niña de profundos ojos oscuros. Se solía despertar temprano. Mientras los demás dormían disfrutaba del amanecer y de la intimidad que las primeras horas de la mañana le otorgaban en exclusiva a ella. Deambulaba por los vericuetos de sus sueños, trazaba el recorrido del futuro.

- `BLOG[la-nina-de-la-aguja].bloques[2].texto`:

  > Tenía deseos simples, reales, humanos. Se imponía metas a largo plazo. Enumeraba los objetivos que parecían lejos del alcance. Sin haber leído las obras de Nicolás Maquiavelo era consciente de que las metas deberían proyectarse más allá de lo posible para alcanzar lo añorado. "Sólo apuntando lejos, el objetivo se consigue", se decía la niña a sí misma.

- `BLOG[la-nina-de-la-aguja].bloques[3].texto`:

  > Pronto su madre se levantaría y la sacaría del ensimismamiento. La desviaría del viaje por el país de los sueños. Le daría las tareas del día. Hasta la madrugada siguiente no volvería a la ventana a través de la cual se abría el amplio horizonte de un ahora y de un hoy, de un mañana y de un después.

- `BLOG[la-nina-de-la-aguja].bloques[4].texto`:

  > La niña escuchó la voz de su madre desde un rincón de la casa. Era la hora de los quehaceres que le asignaban. Aún con algo de sueño se dirigió adónde la reclamaban. Tenía un mal presentimiento. Para animarse, optó por pensar en el paseo que daría más tarde por la ciudad. Escucharía el sonido de los pasos resonando por las grandes piedras francas de las rúas. Perseguiría las sombras que la luz diurna perfilaba por las fachadas de las casas señoriales. De camino a la Plaza Mayor, se detendría un instante en frente de la Casa de las Conchas. Se quedaría como si contase las conchas incrustadas investigando la técnica con la cual las manos de los albañiles las eternizaron y regalaron a la humanidad. Retomaría la ruta. Pasaría despreocupada por la calle de Padilleros desde donde continuaría otro recorrido allende las fronteras de Salamanca y las callejuelas por las cuales se perdía. Volvería al juego de la adivinanza en un intento de enumerar los nombres cambiantes de la calle de los mil nombres. Llegaría a la Plaza Mayor. Observaría como si la viese por primera vez la arquitectura singular. No era un cuadrado perfecto. Ninguna de sus fachadas medía lo mismo. Se esforzaría en entender la descripción que Miguel de Unamuno le había dado.

- `BLOG[la-nina-de-la-aguja].bloques[5].texto`: ¿Es un cuadrilátero. Irregular, pero asombrosamente armónico. ¿Qué sería esto?, se haría la pregunta sin esperar una respuesta.
- `BLOG[la-nina-de-la-aguja].bloques[6].texto`:

  > "Algo útil debes de aprender", la niña escuchó la orden. "Si no se estudia, se ha de dominar un oficio", le introdujo el dedo en el dedal y le puso la aguja en la mano.

- `BLOG[la-nina-de-la-aguja].bloques[7].alt`: Detalle de una aguja de máquina de coser sobre una etiqueta Fely Campo
- `BLOG[la-nina-de-la-aguja].bloques[7].caption`: La aguja y el dedal.
- `BLOG[la-nina-de-la-aguja].bloques[8].texto`:

  > La niña se asustó. El castigo le pareció fuerte. Clavó los profundos ojos oscuros en los ojos de su madre. No percibió ningún indicio de misericordia, ni benevolencia. La madre se mantuvo firme en la decisión tomada. La niña había cumplido trece años. No le consentiría que destrozase su futuro. Si no quería estudiar, debería dominar un oficio.

- `BLOG[la-nina-de-la-aguja].bloques[9].texto`:

  > La niña conocía a su madre. Una mujer con clase y estilo que venía de Valero. Había heredado la determinación de la gente que procedía de la Sierra de Francia. Cuando tomaba una decisión era inquebrantable. No cedería a las súplicas de la niña, no le consentiría incumplir la orden. Fue duro. El dedal se deslizaba. Se perdía entre la manita fina de aquella niña delgadita y delicada. Inclinada sobre la tela con la aguja de coser, asemejaba una muñeca de Lladró con pelo oscuro y ojos grandes como dos aceitunas. No hubo una alternativa. Obedeció al dolor de la aguja, a los callos que le provocaba el dedal. Día tras días repetía los intentos de coser las telas y ajustarse a los patrones que su madre le pasaba. No funcionaba. La madre observaba. Examinaba. No aprobaba.

- `BLOG[la-nina-de-la-aguja].bloques[10].texto`:

  > Hasta que un día la niña se emocionó. Vio aquello en lo que no había reparado. El enfado no impedía percibir lo visible invisible entre las telas y los pinchazos de la aguja. Daría riendas sueltas a la imaginación. La creatividad la guiaría por los desvíos del destino. Haría sola lo que tanto deseaba para sentirse segura. Se diseñaría un bonito vestido a medida. Consciente de lo tímida que era escondería la timidez con aquello que ella misma se cosería.

- `BLOG[la-nina-de-la-aguja].bloques[11].texto`: Manos a la obra. Al menos Mamá no se enfadará con mis malas notas en el cole, pensó la niña.
- `BLOG[la-nina-de-la-aguja].bloques[12].texto`: La ventaja sería el propio estilo. Se elaboraría la ropa. Se vestiría con la elegancia de las actrices de las películas. No se sentiría rara.
- `BLOG[la-nina-de-la-aguja].bloques[13].texto`: La obligación se convirtió en pasión. La pasión en una dedicación. Se entregó en cuerpo y alma a la aguja y al dedal.
- `BLOG[la-nina-de-la-aguja].bloques[14].texto`: La madre la vigilaba, a veces desde la cercanía, a veces desde la lejanía. Dejaba el espacio a la niña.
- `BLOG[la-nina-de-la-aguja].bloques[15].texto`:

  > La niña aprendía sola el oficio de modista. La costura era un mundo aparte. Según crecía descubría las peripecias del oficio y del entorno. Ser mujer emprendedora resultaba más que un desafío. Comenzaba a comprender mejor la dureza del carácter de su madre. Se levantaba antes del amanecer. Diseñaba, dibujaba, hacía a medida los vestidos y las prendas de las clientas. A mediodía se ocupaba del negocio. Buscaba las telas. Lidiaba con vendedores. Imponía autoridad ante la falta de respeto masculino. Se enfrentada a la desconfianza en áreas diversas. Continuó adelante fiel a las primeras clientas, las señoras de su querida Salamanca.

- `BLOG[la-nina-de-la-aguja].bloques[16].alt`: Una mano dibuja el boceto de una prenda sobre un cristal
- `BLOG[la-nina-de-la-aguja].bloques[16].caption`: Diseñaba, dibujaba, hacía a medida.
- `BLOG[la-nina-de-la-aguja].bloques[17].texto`:

  > La niña trabajaba con empeño. Las clientas fieles traían a otras clientas. El negocio se expandía. La fama de la niña llegó a toda la Provincia de Salamanca. Señoras nobles, ricas y no tan ricas deseaban conocer a la Niña de la Aguja. Ávidas de tener un diseño exclusivo, de lucir vestidos irrepetibles en las fiestas o en una boda, pedían citas con antelación. Se enojaban cuando no lo conseguían.

- `BLOG[la-nina-de-la-aguja].bloques[18].texto`: La Niña de la Aguja no rechazaba a ninguna mujer que le acercaba al taller. Apreciaba el aprecio. Valoraba el valor de la confianza.
- `BLOG[la-nina-de-la-aguja].bloques[19].texto`:

  > Cuando se cansaba o la inspiración se demoraba, la Niña de la Aguja se dirigía a la Plaza Mayor de Salamanca. Daba vueltas entre las fachadas irregulares. Se inspiraba en la armonía del cuadrilátero irregular, pero asombrosamente armónico. La compañía de los desconocidos que se acercaban a la plaza la hacía relajarse. La creatividad rebrotaba.

- `BLOG[la-nina-de-la-aguja].bloques[20].texto`: La Niña de la Aguja volvía al taller. Cogía con ansiedad el lápiz. Los dedos comenzaban a dibujar hasta que no consiguieran lo que esbozaba la imaginación.
- `BLOG[la-nina-de-la-aguja].bloques[21].alt`: Fachada del atelier Fely Campo en Salamanca
- `BLOG[la-nina-de-la-aguja].bloques[21].caption`: El local de Salamanca.
- `BLOG[la-nina-de-la-aguja].bloques[22].texto`:

  > Un día, después de haber paseado por el lugar de su inspiración, la Plaza Mayor de su querida Salamanca, se encaminó a casa. Bajando por la calle de Padilleros vislumbró un cartel. Se alquilaba un local. Eran las 9.00 horas de la mañana. A las 11.00 horas lo tenía alquilado. Dio el primer paso para salir de la ciudad natal y la Provincia de Salamanca. Llegó a Barcelona. Cruzó las fronteras de España. Alcanzó el reconocimiento en París, Milán y Londres. Conocía el éxito. Abrió tiendas en las famosas ciudades de la moda. Y cuando había recorrido caminos, encontró el lugar idóneo para estar en la capital de su país natal. Coincidencia o no, la esperaba en el madrileño barrio de Salamanca que el marqués de Salamanca concibió y diseñó para dar lujo y exclusividad a una ciudad en expansión.

- `BLOG[la-nina-de-la-aguja].bloques[23].alt`: Desfile final de Fely Campo con varias modelos en pasarela
- `BLOG[la-nina-de-la-aguja].bloques[23].caption`: Alcanzó el reconocimiento en París, Milán y Londres.
- `BLOG[la-nina-de-la-aguja].bloques[24].texto`:

  > Ideó un atelier tienda con encanto propio y la emoción que la aguja y el dedal le habían transmitido. Tímida como era y siempre lo fue, no colgó un cartel en la puerta. No escribió su nombre. Prefirió alojarse en un edificio donde de día el portero mantenía el portal abierto e indicaba adónde dirigirse a quienes preguntaban por ella. La Niña de la Aguja facilitaba con discreción las instrucciones y la dirección, calle de Jorge Juan 29, primero exterior derecha.

- `BLOG[la-nina-de-la-aguja].bloques[25].texto`:

  > Al subir las escaleras de madera que crujen al unísono de los pasos, el índice de tantas manos conocidas y menos conocidas aprieta el botón del timbre. A veces abre ella misma, a veces alguien la ayuda. Al cruzar el umbral, se penetra en el mundo de la Niña de la Aguja. Con aprecio agradece el aprecio. Con cariño recibe y despide.

- `BLOG[la-nina-de-la-aguja].bloques[26].texto`:

  > Cuando una clienta la visita, la Niña de la Aguja se detiene. A veces sentada, a veces de pie. Observa unos instantes. Se levanta. Se aleja. Vuelve y tiende una prenda. Retrocede unos pasos. Se fija en la imagen reflejada en el espejo. Dos miradas se cruzan. Una sonrisa ilumina la cara que observa desde el espejo. La esencia está captada. La mujer lucirá bella, feliz, contenta. Tímida e insegura, con mayor o menor autoestima, se sentirá segura.

- `BLOG[la-nina-de-la-aguja].bloques[27].texto`:

  > El antaño se quedó atrás, el presente es presente y el futuro se esboza en el horizonte, pensó la Niña de la Aguja una mañana cuando se asomó al balcón del atelier madrileño. Los recuerdos se precipitaban, las vivencias avivaban las emociones.

- `BLOG[la-nina-de-la-aguja].bloques[28].texto`:

  > Un día cualquiera la Niña de la Aguja camina por el barrio de Salamanca. Bajando por la calle de Jorge Juan, tiene la mirada dirigida en otra dirección. Observa en retrospectiva la imagen reflejada en los espejos de los amplios escaparates.

- `BLOG[la-nina-de-la-aguja].bloques[29].texto`:

  > La Niña de la Aguja ha perdido miedo a la aguja. El dedal no le hace daño. Los pinchazos no la duelen. Las llamas delicadas de los dedos delgaditos se han acostumbrado a la aguja adquiriendo su propia protección. La cautela se centra en domar la aguja para proteger a la persona que prueba una prenda. Con suavidad ajusta el vestido a las curvas del cuerpo para transmitir la belleza en sus múltiples variaciones. Combina los colores al son de las tonalidades. Deben resaltar los tonos del pelo, la piel, los ojos. La esencia ha de prevalecer.

- `BLOG[la-nina-de-la-aguja].bloques[30].alt`: Retrato de Fely Campo riendo en su atelier
- `BLOG[la-nina-de-la-aguja].bloques[30].caption`: La Niña de la Aguja, hoy.
- `BLOG[la-nina-de-la-aguja].bloques[31].texto`:

  > De pronto se para delante de un amplio portal en el número 5 de la calle de Jorge Juan. Donde antes se abría paso a los carruajes, la niña adulta entra con pasos firmes. Levanta la mirada ante el señor que le abre la pesada puerta de madera. Saluda con discreción. Vacila un instante ante los peldaños que conducen al interior. Contempla el entorno. Vuelve a dar las gracias a su madre que un día cuando tenía trece años le pusiera una aguja en la mano y un dedal en el dedo.

- `BLOG[la-nina-de-la-aguja].bloques[32].texto`: Debió aprender un oficio. Hubo de hacer algo útil. Lo hizo. Lo consiguió. Cayó muchas veces. Se levantó otras tantas. Se mantuvo erguida. Y llegó. Llegó lejos.
- `BLOG[la-nina-de-la-aguja].bloques[33].texto`:

  > Quizás en aquel instante se acordase de lo que Rafael Farina cantaba: "mi Salamanca bendita… ay que te quiero, te quiero… ay que te quiero cuanto te quiero… Salamanca bendita, que cosita bonita tiene el tesoro de tu joyero. Salamanca bendita, tres cositas bonitas: cante, flamenco, toro y torero."

- `BLOG[la-nina-de-la-aguja].bloques[33].autor`: Rafael Farina
- `BLOG[la-nina-de-la-aguja].bloques[34].texto`:

  > Y desde la lejanía a la Niña de la Aguja le viene el susurro de su madre, "tres cositas bonitas… y una cuarta, la Niña de la Aguja, la cuarta cosita bonita que tiene Salamanca".

- `BLOG[la-nina-de-la-aguja].bloques[35].texto`: Le abren la puerta del portal. La saludan con respeto y admiración. La han reconocido.
- `BLOG[la-nina-de-la-aguja].bloques[36].texto`: "¡Buenas tardes, Señora!", la Niña de la Aguja escucha su nombre. "Un placer haberla conocido. Bienvenida".
- `BLOG[la-nina-de-la-aguja].bloques[37].texto`:

  > La emoción le provoca inseguridad. Se frena un instante antes de subir la escalera. Debe imponer autoridad a su propia timidez. Había aprendido camuflarla sin conseguir vencerla. Da la vuelta hacia atrás como si buscase un refugio para esconderse. Su familia, amigos íntimos, conocidos cercanos y caras desconocidas la esperan en la amplia sala de la segunda planta. Recobró la entereza. Afuera desde las calles más bonitas de Madrid sus modelos y diseños la saludaban y acompañaban.

- `BLOG[la-nina-de-la-aguja].bloques[38].texto`:

  > Clava los ojos en la escalera blanca que culebrea a la segunda planta suavizando las esquinas y aligerando sus pasos. Peldaño tras peldaño se acerca al salón de actos.

- `BLOG[la-nina-de-la-aguja].bloques[39].texto`:

  > Alguien le abre la puerta. La vuelven a saludar con admiración y respeto. Los aplausos se escuchan desde el interior. El acto empieza. Se anuncia el nombre de la invitada de honor a la cual rinden homenaje.

- `BLOG[la-nina-de-la-aguja].bloques[40].texto`:

  > Bienvenidos al Foro de Mujeres Extraordinarias. Nos gustaría presentarles y darle las gracias a nuestra invitada …, y las miradas giran a la puerta por la cual entra la Niña de la Aguja.

- `BLOG[la-nina-de-la-aguja].bloques[41].alt`: Fely Campo en un acto de homenaje, vestida de blanco, junto a una pantalla y un maniquí
- `BLOG[la-nina-de-la-aguja].bloques[41].caption`: El Foro de Mujeres Extraordinarias.
- `BLOG[la-nina-de-la-aguja].bloques[42].texto`: La emoción no le permite proceder. Las lágrimas humedecen los ojos. Tímida al exterior, extrovertida en el interior, venció y convenció.
- `BLOG[la-nina-de-la-aguja].bloques[43].texto`:

  > Venció y convenció desde donde Miguel de Unamuno advirtió que vencer no era convencer. A la Niña de la Aguja le sobró fuerza para oponerse y resistir a las injusticias. Convenció porque convencer significa persuadir. Y para persuadir a ella no le faltó ni lucha, ni razón, ni derecho. La Niña de la Aguja levanta la mirada hacia la pantalla grande. Avista su nombre escrito con letras blancas sobre fondo negro.

- `BLOG[la-nina-de-la-aguja].bloques[44].texto`: Fely Campo. Más de 50 años dedicada a la moda.
- `BLOG[la-nina-de-la-aguja].bloques[45].texto`: A Fely, Fely Campo, con cariño y mucho más…, B.S.
- `BLOG[la-nina-de-la-aguja].bloques[46].texto`: El 23 de abril de 2024, El Parador de Ávila, Ávila. El 21 de abril de 2024, La Casa de la Princesa, Madrid. B.S.
- `BLOG[la-nina-de-la-aguja].bloques[47].texto`:

  > Gracias Bozhana Stoeva por crear este maravilloso cuento, y gracias por dejarnos compartirlo con todos vosotros. Os animamos a todos a leer su trabajo en su página invisiblevisible.es.


### Crear sin pedir permiso — /podcast/podcast-01-crear-sin-pedir-permiso

- `BLOG[podcast-01-crear-sin-pedir-permiso].categoria`: Podcast
- `BLOG[podcast-01-crear-sin-pedir-permiso].duracion`: 34 min
- `BLOG[podcast-01-crear-sin-pedir-permiso].titulo`: Crear sin pedir permiso
- `BLOG[podcast-01-crear-sin-pedir-permiso].resumen`: Fely Campo habla del taller de costura donde empezó todo, del salto a París y de qué significa hoy dirigir su propia firma.
- `BLOG[podcast-01-crear-sin-pedir-permiso].notas[0]`:

  > En el primer episodio de El mundo de Fely Campo, la propia diseñadora se sienta a repasar su trayectoria: los 13 años en el taller de costura de Salamanca, la apertura de su primera tienda y el momento en que decidió que su firma tenía que salir de España.

- `BLOG[podcast-01-crear-sin-pedir-permiso].notas[1]`:

  > Una conversación sin guion sobre el oficio, la comunidad de mujeres que cose cada colección y lo que significa, después de más de cinco décadas, seguir eligiendo la moda cada mañana.


### Colecciones de novia: la búsqueda del traje de novia — /podcast/colecciones-de-novia-la-busqueda-del-traje-de-novia

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].categoria`: Novias
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].autor`: Fely Campo
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].titulo`: Colecciones de novia: la búsqueda del traje de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].resumen`:

  > Cuándo salen las nuevas colecciones, cómo elegir marca, atelier a medida o vestido de colección, y un repaso a las siluetas: la guía de Fely Campo para encontrar tu vestido de novia.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[0].texto`:

  > La búsqueda del vestido de novia perfecto es una de las prioridades en el proceso de organizar uno de los eventos más especiales de cualquier novia. Es un momento muy especial, ya que el vestido es el reflejo de los sueños en su vida futura; debe realzar su personalidad y acompañarla; resaltará zonas de su cuerpo que deses mostrar y tendrá que disimular aquellas con las que no se sienta tan satisfecha.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[1].texto`: A continuación te proponemos una serie de tips para elegir tu vestido de novia.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[2].texto`: La elección del vestido de novia entre las nuevas colecciones de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[3].texto`:

  > Al principio es normal que el proceso pueda resultarte abrumador. Las opciones hoy en día son infinitas y a veces ni si quiera podemos saber dónde ni cuándo comenzar a mirar.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[4].texto`: Lo ideal es empezar a buscar referencias de lo que buscamos una vez que los diseñadores han presentado sus nuevas colecciones de novia.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[5].texto`: Cuándo se presentan las últimas colecciones de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[6].texto`: Y es que mezclar tus gustos con las tendencias del momento y las nuevas propuestas harán que seas una novia diferente.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[7].texto`:

  > Para ello debemos tener en cuenta el calendario de nuevas colecciones nupciales. El año antes a tu boda, cada diseñador o firma de vestidos de novia presenta sus colecciones para el año siguiente, a través de pasarelas, eventos o editoriales de colecciones de novias para el próximo año.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[8].texto`:

  > De aquí cada novia puede recopilar imágenes, un año antes del gran día, que le sirvan para comenzar a soñar e ir conociendo lo que les gusta y lo que no. Entre las pasarelas referentes que encontramos en España para encontrar inspiración de trajes de novia, encontramos la Barcelona Bridal Fashion Week. Además de las internacionales o las de alta costura que nos harán hacernos una idea de lo que buscamos y como queremos que sea nuestra ceremonia.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[9].alt`: Desfile Fely Campo en pasarela de novias Barcelona Bridal Fashion Week
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[9].caption`: Desfile Fely Campo en pasarela de novias Barcelona Bridal Fashion Week.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[10].texto`:

  > Esto simplemente servirá de inspiración para planear los primeros detalles de una boda y para tener más claro el estilo al comenzar la búsqueda del atelier de novia o la tienda de novia. Conocer tus gustos, justo antes de comenzar a probarnos los vestidos de novia que han adaptado desde las pasarelas a nuestras bodas, puede ser muy importante para que estos primeros momentos no nos abrumen.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[11].texto`: Las novias de otoño e invierno también tienen su sitio
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[12].texto`: Y por supuesto estas novias también tienen su hueco en las propuestas de los diseñadores. Las fechas para comenzar la búsqueda son similares.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[13].texto`:

  > Cada vez son más los diseñadores que presentan entre sus novedades de vestidos de novia propuestas de colecciones de novia para invierno y otoño o piezas que permiten adaptar los vestidos a esta época del año: con abrigos de novia, capas de novia, chaquetas de novia, etc.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[14].alt`: Vestido de novia con abrigo a juego
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[14].caption`: Vestido de novia con abrigo a juego.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[15].texto`:

  > En definitiva, tú decides cuándo te sientes cómoda para comenzar a mirar adaptándote a tu fecha; pero nosotros te recomendamos entre unos 12 o 7 meses antes del día de los sueños. Tienes que tener en cuenta que una vez que lo eliges te tomarán medidas y comenzarás a realizar las pruebas que sean necesarias para terminarlo de adaptar y ultimar todos los detalles.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[16].texto`: La elección del vestido de novias: Marcas de vestidos de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[17].texto`:

  > Hay novias que tienen muy clara su idea en referencia al estilo, pero las dudas les asaltan cuando hablamos de quién se encargará de llevar a cabo la confección de su vestido de novia.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[18].texto`:

  > También encontramos quien prefiere un proceso en el que todo sea sorpresa e ir dejándose llevar por las emociones en vez de ir buscando las novedades y las últimas colecciones de novia en la búsqueda de su traje. Sea como sea, aquí te damos algunas claves para saber cuál es tu firma de vestidos de novia que te traiga las últimas tendencias de la moda nupcial.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[19].texto`:

  > Lo importante es dar con la firma que nos enamore y cumpla todos esos deseos que hemos ido recopilando. Elegir el vestido de tu boda es un proceso muy íntimo, especial y muy emocionante en el que por encima de todo necesitas sentirte identificada y entendida.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[20].texto`:

  > Lo primero es que te sientas identificada con el universo que la marca te propone; que sientas que sus valores y su manera de hacer se adapte a los tuyos y a tu pensamiento, ya que tu vestido de novia transmitirá gran parte de tu historia.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[21].texto`:

  > Pero lo que es crucial es la primera cita, el feeling que sientes con el diseñador de tu vestido de novia (en caso de que decidas ir a un atelier a medida) o con la persona que te hará el vestido en una tienda (en caso de que el vestido que elijas sea en tienda a partir de una colección). El sentirte entendida cuando le expones tus ideas, la complicidad que adquieras con los profesionales y el que te hagan sentir tranquila porque te van a dejar ser tú misma y que tomes decisiones y detalles asesorándote…

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[22].texto`:

  > Además es importante que confíes en una marca de novia que te demuestre su profesionalidad. En la primera prueba podrás ver cómo te asesoran en cuanto a siluetas y cortes, ya que lo primordial es encontrar un vestido que favorezca tu silueta, color de piel, etc.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[23].texto`:

  > Esta complicidad que tengas con la marca que confeccione el vestido de tu boda irá creciendo en cada prueba y te hará disfrutar del proceso de creación, sintiéndote especial y única meses antes de la boda, para que todo sean buenas vibraciones en el gran día.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[24].alt`: Detalle traje de novia con sobrefalda y encaje Fely Campo colección Introspección
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[24].caption`: Detalle traje de novia con sobrefalda y encaje Fely Campo colección Introspección.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[25].texto`: Cómo elegir entre vestido de novia a medida o vestido de novia de colección
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[26].texto`:

  > Esta probablemente sea una de las primeras y más importantes dudas a las que se enfrenta una novia, una vez que da el paso de sumergirse en la complicada elección entre cientos de vestidos de novia. Y es que las dos opciones son fantásticas, ninguna es mejor que otra, cada una de ellas te muestra momentos diferentes y especiales sobre el proceso de creación del vestido de novia y dependerán enteramente de las sensaciones que la novia tenga en sus primeros días de búsqueda del vestido de novia perfecto.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[27].texto`:

  > A continuación te damos unas pinceladas sobre las diferencias que pueden hacer que te decantes por uno u otro; y si aún así no te decides, te damos una solución para que te dejes llevar por tus sueños y sensaciones del momento a la hora de elegir tu traje de novia perfecto.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[28].texto`: Atelier de novias: la novia a medida
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[29].texto`: Como hemos visto en post anteriores, los atelieres de moda son los espacios creativos de cada diseñador.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[30].alt`: Interior del atelier de novias Fely Campo
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[30].caption`: Interior del atelier de novias Fely Campo.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[31].texto`:

  > En cuanto al atelier de novias, el diseñador vive la complicidad y el proceso de crear un vestido de novia junto a la complicidad de cada uno. El proceso creativo se vuelve completamente personalizado a la hora de que una novia acuda a un atelier de novias para realizar un vestido de novia a medida. La novia interviene en el proceso creativo, creándose vestidos únicos para cada una de ellas, con un sello de identidad que aúna la personalidad de la novia y la firma.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[32].texto`:

  > En el atelier de novias Fely Campo, tanto en el de Salamanca como en el de Oviedo, el sueño y la personalidad de cada novia es la fuente de inspiración de cada vestido que se crea.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[33].texto`: La colección de novias
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[34].texto`:

  > Las colecciones de novias son las propuestas que cada temporada diseña cada creador de moda de novias. Estas suelen reflejar la esencia de la firma en toda su esencia, muestran sus valores y lo más característico de su manera de entender a las novias, sus valores y cómo cada creador adapta las tendencias y la estética de las novias a su firma .

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[35].texto`:

  > Con las colecciones de novias muchas tiendas permiten que dentro de la colección puedas hacer pequeñas modificaciones, por lo que se adaptan a ti para que el vestido cumpla todas tus expectativas y sueños.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[36].texto`:

  > Los vestidos de colección de novias de Fely Campo reflejan todas sus ideas y buscan realzar al máximo la silueta de cada novia. Están cuidados al detalle y son concebidos para una mujer exigente en la calidad del producto que busca vestidos de novia hechos en España, con gran elegancia e identidad. Se cuida cada detalle para permitir a todas las novias soñar.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[37].texto`: La posibilidad de tener las dos
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[38].texto`:

  > Probablemente si estas debatiéndote mucho ante esta elección, la mejor decisión será poder acudir a algún lugar que te permita experimentar los dos procesos e incluso entremezclarlos, permitiéndote adquirir un vestido de colección de novias pero que te posibilte el realizar modificaciones en tejidos, siluetas, añadir o eliminar cosas, combinar varios vestidos, etc.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[39].texto`:

  > Lo importante es que sea cual sea el vestido de novia que quieras, de colección o a medida, es la experiencia y complicidad que consigas con la firma que se encargará de tu vestido de boda lo que hará del proceso de ver nacer tu vestido de novia algo mágico.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[40].texto`: Estilos de novias
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[41].texto`:

  > Cada novia hace una declaración de intenciones sobre su vida futura y una declaración de estilo. Se trata, probablemente, del vestido más importante de tu vida y no es tarea fácil encontrarlo. Hay muchísimos estilos de vestidos de novia, siluetas de novia, tendencias de novia, etc. Tendrás que encontrar aquellos que supongan un equilibrio entre lo que más te guste y que el patrón se adapte a lo que más te favorece. A continuación te mostramos un resumen de lo que podrás encontrar cuando comiences la gran búsqueda.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[42].texto`: Siluetas de vestidos de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[43].texto`:

  > Dentro de cada silueta cada firma te propondrá los cortes que más se adapten a tu cuerpo, especialmente si confeccionas un vestido en un atelier de novia que te permite realizar más cambios, incluso aunque los vestidos sean de colección. Hoy de manera resumida te comentamos los cortes más característicos de las colecciones de novia.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[44].texto`: Vestidos de novia con línea A
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[45].alt`: Vestido de novia silueta A colección Introspección Fely Campo
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[45].caption`: Vestido de novia silueta A colección Introspección Fely Campo.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[46].texto`:

  > Es una silueta de novia en la que el vestido coge volumen a partir de la cintura dibujando una A, mientras que en el pecho suele ser ajustado. Este tipo de vestidos lo encontramos con más o menos volumen, y el volumen puede empezar más arriba o más abajo. Los tejidos de novia pueden ser infinitos, encontrando faldas con varias capas de tul que darán ese aire romántico y de princesa, con tejidos más estructurados que le dan un aire más minimalista. Es una silueta muy versátil que se puede adaptar a muchos tipos de personalidad y estilos. Dentro de este tipo de silueta encontramos el corte princesa, que es el de volumen más exagerado, de cuento, que suelen elegirlo novias que quieren una boda más tradicional o una celebración muy significativa.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[47].texto`: Vestidos sirena de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[48].alt`: Vestido de novia silueta sirena colección Savia Novia Fely Campo
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[48].caption`: Vestido de novia silueta sirena colección Savia Novia Fely Campo.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[49].texto`:

  > El vestido sirena es un vestido conocido por enfatizar la silueta de la novia, ya que realza las curvas naturales de la silueta de la mujer, incluso las enfatiza aún más el volumen que crea dando al cuerpo femenino otra curva en la parte baja del vestido. Esto permite que pueda ser un vestido con gran cola o con menos, para adaptarse a lo que cada una quiera. En cuanto al escote, permite muchísimas opciones.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[50].texto`: Vestidos de novia con corte imperio
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[51].alt`: Vestido de novia con corte imperio
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[51].caption`: Vestido de novia con corte imperio.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[52].texto`:

  > Se trata de otro vestido de novia con corte tradicional. El vestido de novia con corte imperio es un vestido con corte bajo el pecho y que luego cae con una silueta más o menos recta hasta los pies. El estilo boho y romántico busca mucho este tipo de siluetas ya que permiten combinar tejidos de novia muy fluidos y vaporosos, plisados, etc.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[53].texto`: Vestido silueta columna
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[54].texto`:

  > Caracterizado por líneas rectas en toda la silueta del vestido de novia, este tipo de vestido permite que sean más ajustados marcando las curvas más femeninas o de una manera más relajada. Es muy versátil y lleva cortes de muchas maneras diferentes para resaltar los mejores detalles de la silueta de cada novia.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[55].texto`: Las tendencias de los trajes de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[56].texto`:

  > Las tendencias tienen que ver mucho con las siluetas y la personalidad de las novias. Siempre encontramos vestidos más clásicos y austeros, frente a otros más de cuento, de princesa, más románticos.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[57].texto`:

  > Los bohemios y minimalistas desde hace varias temporadas se imponen por su comodidad, además de por cómo destacan la personalidad de la novia con unos sencillos cortes.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[58].texto`:

  > Otra de las tendencias actuales son los vestidos de novia lenceros, ya que es la contraposición a los vestidos de volúmenes y excesos; reflejan al máximo el estilo del día a día de una novia diferente.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[59].texto`:

  > Los trajes de dos piezas de novia, ya sean trajes pantalón o faldas, ganan protagonismo cada vez más. Y otro de los grandes reyes de las colecciones de trajes de novias desde 2018, que se impone con más fuerza en las nuevas colecciones de novia 2022, son piezas como abrigos de novia o sobrefaldas, ya que permiten tener vestidos versátiles que se adaptan a los distintos momentos de la boda y que la novia sorprenda dos veces; así la novia puede llevar una gran cola para la ceremonia y en el momento del baile, tener un vestido más sencillo que le dé gran comodidad.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[60].alt`: Vestido de novia Fely Campo cola de una capa y drapeado colección Inside Introspection
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[60].caption`: Vestido de novia Fely Campo cola de una capa y drapeado colección Inside Introspection.
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[61].texto`: La personalidad de la novia en su vestido de novia
- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[62].texto`:

  > En definitiva, lo más importante es que la novia se sienta cómoda y sea un fiel reflejo de su personalidad y de lo que quiere transmitir de ella uno de los días más importantes de su vida. Y es algo a lo que tanto las tendencias como las siluetas deben adaptarse por encima de todo.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[63].texto`:

  > Si estás buscando tu vestido de novia perfecto, disfruta de la búsqueda y déjate asesorar siendo fiel a tu esencia para tener el vestido de novia de alta costura, ya sea un vestido de novia de colección o de vestido de novia a medida en atelier.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[64].texto`:

  > Visita el Atelier de novia de Fely Campo de vestidos de novia y deja que la diseñadora te haga soñar. Siente la complicidad con Fely Campo de encontrar TU VESTIDO DE NOVIA junto a un equipo con años de experiencia, que te guiará y te hará vivir un sueño.

- `BLOG[colecciones-de-novia-la-busqueda-del-traje-de-novia].bloques[65].texto`: Suscríbete a nuestro canal de YouTube para sumergirte en el maravilloso mundo de Fely Campo y seguir de cerca su participación en grandes eventos.

### Vestidos de novia: los sueños se hacen realidad — /podcast/vestidos-de-novia-los-suenos-se-hacen-realidad

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].categoria`: Novias
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].autor`: Fely Campo
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].titulo`: Vestidos de novia: los sueños se hacen realidad
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].resumen`: Presupuesto, calendario, estilos, escotes y colores: la guía completa de Fely Campo para encontrar el vestido de novia con el que siempre has soñado.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[0].texto`:

  > Si al entrar en el espacio de la ceremonia se escucha un suspiro masivo, seguido de un silencio de sorpresa y a continuación resuena entre los invitados la frase "Parece una princesa", significa que la novia acertó con la elección de su vestido de novia.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[1].texto`:

  > Cuando pensamos en vestidos de novias, por lo general, la primera idea que se nos viene a la mente es un vestido de cuento de hadas, como el de las princesas de las películas de Disney, como una celebrity en un evento de alfombra roja o como las novias de la realeza.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[2].texto`:

  > Esta idea no es casual, ya que la mayoría de las nosotras ha crecido con el sueño de vestirse tan especial, al menos una vez en su vida. Pero esa idea muchas veces dista de la realidad.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[3].texto`:

  > Si ya tienes a tu persona soñada, es hora de ponerte manos la obra para encontrar tu vestido de novia ideal. Porque tu boda será la ocasión perfecta para lucir un vestido de novia y alcanzar el sueño de ser la protagonista de tu propia historia… con final feliz!

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[4].texto`: Buscando el vestido de novia perfecto
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[5].texto`: Encontrar el vestido de novia perfecto puede ser una tarea muy sencilla o algo más laboriosa.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[6].texto`:

  > Muchos son los factores que tendrás que valorar a la hora de escoger entre los mejores vestido de novia: tu gusto personal, el color, el corte y escote que mejor se adapten a tu silueta, el tipo de mangas, si quieres llevar cola, el estilo de la ceremonia, el entorno de la fiesta, el color de la decoración, la fecha de la celebración, el sobre todo, el presupuesto.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[7].texto`:

  > Si estás planeando tu boda, te recomendamos que sigas leyendo nuestros apuntes sobre los detalles relevantes a tener en cuenta para que encuentres el vestido de novia con el que tanto has soñado.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[8].texto`: Presupuesto para un vestido de novia
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[9].texto`: Entre los diferentes aspectos que deberás contemplar, se encuentra el precio del vestido.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[10].texto`:

  > Gracias a las tradiciones, las bodas terminan siendo una fiesta donde no se escatima en gastos, por esa creencia de que es un evento único y que pasa una sola vez en tu vida. Te aconsejamos que hagas un cálculo global y establezcas un presupuesto para cada partida de los detalles de la boda, incluida la del vestido de novia. Intenta ajustarte a ese presupuesto, ya suele suponer el mayor desembolso de todos los apartados que conllevan la preparación de una boda, por muy sencilla que se quiera organizar.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[11].texto`:

  > Es por ello que, hoy día, son varias las soluciones que existen para adquirir vestidos de novias adaptadas a cada bolsillo: alquiler de vestidos de novia, venta de vestidos de novia online, vestidos de novia de segunda mano, vestidos de novia de colección comprados en una tienda de vestidos de novia, vestidos de novia de colección con opciones a modificaciones en un atelier de vestidos de novia de colección, vestidos de novia a medida confeccionados en un atelier de vestidos de novia, vestidos de novia alta costura…

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[12].texto`:

  > En cuanto a probar vestidos de novia, te recomendamos que no te pruebes los que no te puedas permitir. Evitarás  enamorarte de alguno y que cuando tengas que decidir entre los vestidos que realmente están dentro de ese presupuesto, te cueste no poder quitarte la idea de aquel que no puedes comprarte como referencia. Será entonces más difícil ver alguno que te guste porque sentirás que ninguno te hará sentir tan especial como ese.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[13].texto`:

  > Sé consciente de que pueden surgir gastos extra y el vestido de novia podría encarecer (bordados adicionales, cambios en la mangas, añadir un lazo…) Y no olvides el resto de accesorios que te complementarán tu look nupcial: los zapatos, el velo, los adornos para el pelo, la joyería…

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[14].texto`:

  > Toma nota: por ahorro, por practicidad o por sostenibilidad, cada vez más novias buscan diseños versátiles y reutilizables con los que poder sacarles partido a su vestido de novia en alguna otra ocasión después del enlace.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[15].texto`: Cuándo empezar a buscar vestido de novia
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[16].texto`:

  > Disponer del espacio para el banquete, el envío  de las invitaciones, la elección del destino para la luna de miel… ¿Todo en marcha?. Pues ahora te toca empezar la búsqueda de tu vestido de novia.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[17].texto`:

  > Ojear catálogos de vestidos de novia es un hobby que puedes hacer cuando quieras. Pero te recomendamos que comiences a visitar tiendas de vestidos de novia para probarte vestidos cuanto estés preparada para llevar a cabo una compra.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[18].texto`:

  > Comprar un vestido de novia es una labor abrumadora, pero no por ello deberías postergar la compra al último momento; podría convertirse en un problema; buscarlo con tiempo puede hacer que el proceso sea muy especial. La antelación ideal para comenzar a ver un vestido de novia y adquirirlo es de cinco a ocho meses antes de la boda.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[19].texto`: Pide cita previa
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[20].texto`:

  > Lo idóneo es que antes de acudir a los diferentes establecimientos a probarte vestidos, conciertes una cita previa. Solo así tendrás la seguridad de que los expertos en la materia podrán atenderte, con la garantía de que lo harán sin prisas. Recuerda que estamos hablando de cómo elegir el vestido de novia perfecto, no de un traje cualquiera.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[21].texto`: Ve preparada para la prueba
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[22].texto`:

  > Te recomendamos que cuando asistas a probarte distintos vestidos de novia, lo hagas con ropa interior en tonos claros o nude y con un sujetador sin tirantes. En la medida de lo posible, preocúpate por ir con el cabello bien arreglado y maquillada. Lleva contigo unos zapatos de tacón. De este manera te harás una idea más clara de cuál sería el resultado final.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[23].texto`: Asiste acompañada
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[24].texto`:

  > Sin dejarte influenciar demasiado, la opinión de las personas más cercanas y quienes mejor te conozcan, podrán ayudar en esta difícil elección. Por eso es importante elegir la compañía a la hora de acudir tanto a una tienda de vestidos de novia como a un atelier de novias. Además es probable es que tengas que pedir ayuda a quien te haya acompañado a las pruebas de tu vestido de novia para vestirte el día del "sí, quiero".

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[25].texto`: Escucha a tu corazón, evita que te presionen y no compres sin estar del todo convencida. ¡Al final la decisión será tuya!
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[26].texto`: Estilos de vestidos de novia
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[27].texto`:

  > La forma de tu figura, tu tez de piel, tu estatura y tu peso, lo que conforma tu silueta, resultarán concluyentes a la hora de dar con el modelo perfecto para ti. Por eso hay vestidos de novia para personas con mucho busto, vestidos de novia para bajitas, vestidos de novia para mujeres delgadas, vestidos de novia cortos o vestidos de novia en tallas grandes.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[28].texto`:

  > Cualquiera que sea tu situación, asegúrate de que el elegido es el que más realza tu figura, tanto en lo que a corte, escote y largo se refiere. Hay tantos tipos de vestidos de novia como cuerpos existen, así que pruébate todos los diseños que haga falta hasta tener claro que ese es "el vestido".

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[29].texto`: Vestidos de novia boho
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[30].texto`: Bohemio; este estilo fusiona perfectamente el estilo vintage con el romanticismo. Encajes de ensueño, mangas tres cuarto, faldas fluidas… ¡Feminidad al 500%!
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[31].alt`: Vestido de novia estilo boho
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[31].caption`: Vestido de novia estilo boho
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[32].texto`: Vestidos de novia corte sirena
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[33].texto`:

  > El vestido de novia corte sirena abraza tu figura mientras que la cola de su falda te acompaña a cada paso. Estilo extremadamente sofisticado, que nos recuerda a las célebres actrices sobre la alfombra roja.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[34].texto`: Vestidos de novia corte princesa
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[35].texto`:

  > Con aires de cuento de hadas, se caracteriza por tener una diferencia muy marcada entre la cintura estrecha y la falda amplia, es ideal para aquellas mujeres que quieran disimular la zona de la cadera y remarcar su cintura.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[36].texto`: Vestidos de novia corte A
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[37].texto`:

  > Podría confundirse con el corte princesa. La diferencia de los vestidos de novia de corte A, es que en este corte, se forma una línea triángulo que se abre desde la zona de la cintura hasta el filo del vestido.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[38].alt`: Vestidos de novia corte A. Colección Metaphysics
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[38].caption`: Vestidos de novia corte A. Colección Metaphysics.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[39].texto`: Vestidos de novia corte imperio
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[40].texto`:

  > Para un look elegante, con un toque de ingenuidad el día de tu boda. El corte imperio empieza justo debajo de la línea del busto y la falda baja suelta y vaporosa. Cómodo y romántico. Admite varios tipos de escote.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[41].alt`: Vestidos de novia corte imperio de la Colección Celebration de Fely Campo
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[41].caption`: Vestidos de novia corte imperio de la Colección Celebration de Fely Campo.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[42].texto`: Vestidos de novia corte griego
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[43].texto`:

  > Camina hacia el altar sintiéndote como una diosa con tu vestido de novia de estilo griego, que destacará tu pecho y alargará visualmente más tu figura respecto a otros modelos.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[44].alt`: Vestido de novia con corte griego. Colección Lines
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[44].caption`: Vestido de novia con corte griego. Colección Lines.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[45].texto`:

  > Cuando leas nuestro post "La elección del vestido de novia entre las nuevas colecciones de novia" podrás añadir estilos de vestidos de novia a tu lista de opciones.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[46].texto`: Tipos de escote para un vestido de novia
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[47].texto`:

  > El escote, un buen aliado para acentuar o disimular lo que se desee en cada caso. Servirá tanto para afinar tus brazos, destacar tu cuello, realzar el pecho… como para enseñar unos hombros bonitos, lucir piernas esbeltas o mostrar un tatuaje.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[48].texto`: Aquí te mencionamos algunos de los escotes de vestidos de novia más habituales para facilitarte la elección. ¡Encuentra el tuyo!
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[49].texto`: Vestidos de novia palabra de honor
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[50].texto`:

  > Es un escote que favorece a casi todas las novias porque realza el pecho, alarga el cuello y destaca tus hombros. Está entre los escotes para vestidos de novia más escogidos en cualquier temporada.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[51].alt`: Vestido de novia con escote palabra de honor. Colección Etéreo
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[51].caption`: Vestido de novia con escote palabra de honor. Colección Etéreo.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[52].texto`: Vestidos de novia cuello halter
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[53].texto`:

  > Los vestidos de novia cuello halter se abrochan siempre detrás del cuello, dejando los hombros, los brazos y parte de la espalda al descubierto. Ideal para mujeres con mucho pecho y para quien quiera lucir sensual en su gran día.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[54].alt`: Vestido de novia cuello halter. Atelier de novias de Fely Campo
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[54].caption`: Vestido de novia cuello halter. Atelier de novias de Fely Campo.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[55].texto`: Vestidos de novia escote corazón
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[56].texto`:

  > Este tipo de escote resulta especialmente romántico y femenino. Muy similar al palabra de honor, pero con forma de corazón, en vez de recto como en anterior. La versatilidad de los vestidos de novia escote corazón radica en que realza el pecho pequeño y destaca el grande.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[57].alt`: Vestido de novia con escote corazón. Colección Introspección
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[57].caption`: Vestido de novia con escote corazón. Colección Introspección.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[58].texto`: Vestidos de novia cuello alto (o tipo cisne)
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[59].texto`:

  > Alargarás tu cuello y lucirás muy esbelta si eliges un vestido de novia cuello alto. Son los favoritos para los meses más fríos del año, aunque también se llevan en primavera dejando los hombros al descubierto.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[60].alt`: Vestido de novia con cuello alto de la Colección Lines de Fely Campo
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[60].caption`: Vestido de novia con cuello alto de la Colección Lines de Fely Campo.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[61].texto`: Vestidos de novia cuello barco
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[62].texto`:

  > Se distingue porque traza una línea simétrica que va de hombro a hombro. El escote cuello barco deja las clavículas al descubierto, lo que te aportará sensualidad. Las novias con el cuello corto, silueta recta y o caderas un poco anchas, sin duda se verán especialmente favorecidas con vestido de novia de cuello barco.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[63].texto`: Vestidos de novia de colores
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[64].texto`:

  > Toda mujer ha soñado con casarse vestida de blanco. Y es que, ya desde los años 1400, las damas de la realeza utilizaban vestidos de novia blancos. Y aunque han ido evolucionando con toques de brillo,  el blanco era el color que prevalecía para las bodas. Desde entonces se dice que el blanco simboliza la pureza e inocencia propios de una novia.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[65].texto`: De ahí que por tradición  el blanco se ha convertido en el color con más presencia en las colecciones de vestidos de novia hasta la actualidad.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[66].texto`:

  > Pero en los tiempos que corren, la tendencia es innovar y qué mejor momento para ello que el día de tu boda con tu vestido de novia. En las pasarelas nupciales, los diseñadores arriesgan con vestidos de novia de colores distintos al blanco, como los rosas, los grises, toques más arriesgados de colores vibrantes…y aciertan!

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[67].texto`:

  > Antes de que se usara el vestido de novia blanco como símbolo de la pureza, se usaban vestidos de novia de colores y cada uno representaba una situación diferente, según las supersticiones de algunos países.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[68].alt`: Vestidos de novias de colores en Valmont Barcelona Bridal Fashion Week
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[68].caption`: Vestidos de novias de colores en Valmont Barcelona Bridal Fashion Week.
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[69].texto`:

  > Por ejemplo, si la novia usaba un vestido de novia azul, significaba que el amor siempre iba a ser verdadero; en amarillo, significaba sentir pena por quien la desposaba; en perla, significaba que viviría un remolino de sentimientos.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[70].texto`:

  > Teniendo el tiempo suficiente para la elección, te recomendamos que te pruebes vestidos de novia rosa, vestidos de novia champagne, vestidos de novia negro o vestidos de novia color ivory (marfil). No habrá otra ocasión similar a esta para que experimentes con tus preferencias y el color de tu piel. Que el color de tu vestido de novia refleje tu personalidad. Con cualquiera que escojas, deslumbrarás!

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[71].texto`: Vestidos de novia alta costura
- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[72].texto`:

  > ¡Por fin has llegado al apartado más importante de todos!: al de la elección de un taller de moda para la confección de tu vestido de novia. Naturalmente esta es la alternativa más apropiada para convertir la engorrosa labor de encontrar tu vestido de novia en un recuerdo entrañable.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[73].texto`:

  > Tan importante como acudir acompañada a las pruebas por personas de confianza a la compra del vestido, es que te dejes aconsejar por profesionales. Quizá tengas claro qué estilo de vestido de novia es el más indicado para ti, pero no estará de más que escuches sus consejos y te dejes asesorar. Recuerda que ellos son especialistas en mimos, conexión y comprensión. Sabrán cómo dar con lo que quieres, lo que esperas y lo que obtendrás de tu vestido de novia.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[74].texto`:

  > Pide aquí tu cita, sin prisas pero con antelación. La diseñadora Fely Campo te hará vivir la experiencia de que te elaboren un vestido de novia de alta costura y a medida o te asesorará en la búsqueda de un vestido de colección y las modificaciones que puedes hacerle. Una esmerada y personalizada atención te esperan en nuestros ateliers de moda de Salamanca u Oviedo.

- `BLOG[vestidos-de-novia-los-suenos-se-hacen-realidad].bloques[75].texto`: ¡Despierta, es real, tendrás el vestido de novia perfecto! Saldrás de nuestro atelier de moda brillando como la princesa que siempre soñaste ser!

### Vestidos de madrina: la búsqueda de la elegancia con personalidad — /podcast/vestidos-de-madrina

- `BLOG[vestidos-de-madrina].categoria`: Invitadas
- `BLOG[vestidos-de-madrina].autor`: Fely Campo
- `BLOG[vestidos-de-madrina].titulo`: Vestidos de madrina: la búsqueda de la elegancia con personalidad
- `BLOG[vestidos-de-madrina].resumen`:

  > Protocolo, largos, colores, mantillas y abrigos: la guía de Fely Campo para que la madrina y la madre de la novia encuentren su vestido ideal sin eclipsar a la novia.

- `BLOG[vestidos-de-madrina].bloques[0].texto`:

  > La madrina, junto a la madre de la novia, es una de las protagonistas de la boda y un pilar esencial para los novios. Después de la novia, se convierte en la mujer más observada de la ceremonia, ya que es la encargada de acompañar al novio, tanto en una boda religiosa como en una civil.

- `BLOG[vestidos-de-madrina].bloques[1].texto`: A continuación podrás encontrar una guía para responder a las grandes preguntas de cómo ser la madrina ideal.
- `BLOG[vestidos-de-madrina].bloques[2].texto`: Cómo debe vestir la madrina de una boda
- `BLOG[vestidos-de-madrina].bloques[3].texto`:

  > Cuando los novios anuncian la fecha de la boda, tras la emoción y las felicitaciones, y cuando la madre del novio tiene su momento de pensar en su papel como madrina en esa boda, y no puede evitar preguntarse cómo debe ir vestida la madrina de una boda.

- `BLOG[vestidos-de-madrina].bloques[4].texto`:

  > Es cierto que hay unas ciertas reglas de protocolo, pero no debes olvidar que si eres la madrina, después de la novia, tu vestido será el que más miradas atraiga y lo principal es que sin eclipsar a la novia, seas fiel a ti misma, a tu manera de vestir en el día a día, que seas tú quien lleva el vestido y no el vestido el que te lleva a ti. La mayoría de las madrinas sueñan con un elegante vestido de madrina para acompañar a su hijo o familiar hacia el altar el día de su boda y en este post te vamos a dar unos tips para que la búsqueda de tu look te resulte una experiencia emocionante, que te haga sentir cómoda formando parte de uno de los días más importantes en la vida de los novios.

- `BLOG[vestidos-de-madrina].bloques[5].texto`: Protocolo de los vestidos para madrina
- `BLOG[vestidos-de-madrina].bloques[6].texto`:

  > El protagonismo de la boda lo tienen los novios, y como la madrina es una de las personas queridas que más les acompañará, la elección de su estilismo debe tener en cuenta sus preferencias.

- `BLOG[vestidos-de-madrina].bloques[7].texto`:

  > Normalmente la novia y el novio planean la boda y eligen sus estilismos en base a sus gustos y lo que han soñado para ese día tan especial y son las madrinas y las madres de las novias quienes les acompañan muy de cerca. Son las personas que viven el día de los novios con tanta ilusión como si fuera el suyo propio, pero manteniéndose en un segundo plano y buscando la perfección en el día de sus hijos.

- `BLOG[vestidos-de-madrina].bloques[8].texto`:

  > Su vestido de madrina debe ir acorde al de la novia sin sobrepasarla ni eclipsarla. Si la novia lleva cola, lo ideal es que la madrina también, pero en menos medida.

- `BLOG[vestidos-de-madrina].bloques[9].texto`: El largo del vestido de madrina
- `BLOG[vestidos-de-madrina].bloques[10].texto`:

  > En cuanto al largo del vestido, en caso de que la novia se haya vestido con un vestido largo, la madrina puede ir tanto de largo como de corto, no importa si la boda es de mañana o de tarde. De hecho la madrina es la única invitada, que según el protocolo más estricto, puede llevar un vestido largo aunque la boda sea de día. Los demás invitados, incluida la madre de la novia, deberán llevar como mucho un largo midi. Eso sí, lo aconsejable es que el corte del vestido no esté nunca por encima de la rodilla.

- `BLOG[vestidos-de-madrina].bloques[11].alt`: Vestido de madrina largo en un jardín
- `BLOG[vestidos-de-madrina].bloques[11].caption`: Vestido de madrina de largo completo.
- `BLOG[vestidos-de-madrina].bloques[12].texto`: Colores de vestidos de madrina
- `BLOG[vestidos-de-madrina].bloques[13].texto`:

  > Los colores en un vestido de madrina son muy amplios. Por supuesto los blancos están reservados para la novia y no debe llevarlos para no eclipsarla. Antes las madrinas solían utilizar tonos empolvados, pero como vimos en algún post anterior sobre vestidos de novia, ellas cada vez son más atrevidas y muchas veces no solo van de blanco, sino que los rosas, platas, marfiles o grises también son colores de la novia. Lo mejor es que una vez que la novia ha elegido su vestido, le comente a la madrina qué colores quedan reservados para ella.

- `BLOG[vestidos-de-madrina].bloques[14].texto`:

  > Hay colores que son una apuesta segura de elegancia, como el azul marino, los verdes o los corales. Los tonos empolvados, como el verde agua, los rosas, etc., son muy utilizados desde siempre. Y por supuesto los rojos y los tonos frambuesas son de los favoritos para las madrinas tanto en bodas de día como de noche.

- `BLOG[vestidos-de-madrina].bloques[15].alt`: Vestido de madrina en un tono azul empolvado con encaje
- `BLOG[vestidos-de-madrina].bloques[15].caption`: Vestido de madrina en un tono empolvado.
- `BLOG[vestidos-de-madrina].bloques[16].texto`:

  > Casi siempre, el negro o los colores muy oscuros han estado vetados en este tipo de eventos, pero en la actualidad esta parte del protocolo se comienza a evitar en muchas bodas. De hecho en las ceremonias de noche, el negro puede ser un color tremendamente elegante y perfecto para lucir por la madrina, siempre y cuando ella sienta guapa y segura con él y la novia también.

- `BLOG[vestidos-de-madrina].bloques[17].texto`:

  > Lo importante es que la madrina se encuentre cómoda y comente con los novios cuales son los colores que le hacen sentir así. Puede ayudar mucho que los novios acompañen a la madrina en su elección, para que entiendan cómo el color favorece su personalidad y hace que ella se sienta cómoda y hermosa.

- `BLOG[vestidos-de-madrina].bloques[18].texto`: Vestidos de madrina con mantilla para la boda
- `BLOG[vestidos-de-madrina].bloques[19].texto`:

  > Otro de los temas a tener en cuenta son las madrinas con mantilla. La decisión de llevar mantilla suele ser un deseo personal de la madrina, pero también de los novios. Y por supuesto, inevitablemente, condiciona el traje y los complementos que llevará la madrina.

- `BLOG[vestidos-de-madrina].bloques[20].texto`:

  > Suelen llevarse en ceremonias muy formales y en este caso sí que deben llevarse con un vestido de madrina largo, aunque cada vez son más las madrinas que lo llevan también con un vestido de corte midi.

- `BLOG[vestidos-de-madrina].bloques[21].texto`:

  > La mantilla cobrará mucho protagonismo, por ello el vestido y todo el estilismo de la madrina deberá compensarse siendo de lo más sencillo, evitando los artificios. Esto convertirá el estilismo de la madrina en un desfile de elegancia absoluta.

- `BLOG[vestidos-de-madrina].bloques[22].alt`: Look de madrina con tocado de ala ancha
- `BLOG[vestidos-de-madrina].bloques[22].caption`: Un look de madrina con tocado de ala ancha.
- `BLOG[vestidos-de-madrina].bloques[23].texto`: Vestidos de madrina de otoño y de invierno
- `BLOG[vestidos-de-madrina].bloques[24].texto`:

  > Es cierto que la mayoría de las celebraciones se centra en los meses que van desde abril, incluso marzo, hasta septiembre. Sin embargo desde la situación que hemos vivido recientemente, este año los eventos han dado el protagonismo al otoño y al invierno. Por ello los vestidos de madrina en 2021 más buscados han sido los que se adaptan a las épocas de invierno y otoño.

- `BLOG[vestidos-de-madrina].bloques[25].texto`:

  > Muchos novios decidieron posponer su boda para esta época y muchas firmas han adaptado sus colecciones de novias para ello. Los trajes con segundas piezas han hecho que muchos de los vestidos de madrina sean espectaculares. Las tendencias en vestidos de madrina en esta época son otras: los tejidos son más gruesos, los colores algo más oscuros, pero por supuesto los diseñadores de vestidos de madrina han hecho propuestas que no perdían un ápice de la alegría que caracteriza los vestidos de esta época.

- `BLOG[vestidos-de-madrina].bloques[26].alt`: Conjunto de madrina en terciopelo azul noche, colección Savia
- `BLOG[vestidos-de-madrina].bloques[26].caption`: Conjunto de madrina en terciopelo, colección Savia.
- `BLOG[vestidos-de-madrina].bloques[27].texto`:

  > Los vestidos con abrigo de madrina en brocados estampados o colores atrevidos, los trajes de varias piezas que se adaptan a esta época con chaquetas en elegantes terciopelos, el juego de los estilismos con estolas, son algunas de las propuestas de las marcas de vestidos de madrina que pueden hacer tu estilismo más divertido y sorprendente.

- `BLOG[vestidos-de-madrina].bloques[28].alt`: Abrigo rojo de madrina sobre vestido estampado, colección Savia
- `BLOG[vestidos-de-madrina].bloques[28].caption`: Abrigo de madrina en rojo sobre vestido estampado, colección Savia.
- `BLOG[vestidos-de-madrina].bloques[29].texto`:

  > De hecho, una de las prendas que más le gusta a nuestra diseñadora son los abrigos, ya que son una pieza que acompaña al estilismo y puede convertir el vestido de madrina más elegante si cabe; aporta seguridad a la mujer que lo lleva, la acompaña. Las segundas piezas son una apuesta segura para sorprender, ya que se convierten en una manera de tener dos estilismos durante la ceremonia.

- `BLOG[vestidos-de-madrina].bloques[30].texto`: La madre de la novia
- `BLOG[vestidos-de-madrina].bloques[31].texto`:

  > Por supuesto la madre de la novia es otra de las grandes protagonistas de este día tan especial. Todas ellas buscan estar a la altura de la celebración, acompañar a sus hijas en todo momento y ayudarlas junto a la madrina para que todo sea como la pareja siempre han soñado su día.

- `BLOG[vestidos-de-madrina].bloques[32].texto`:

  > Como la madrina de la boda, los colores no deben eclipsar a los de la novia. También tiene que tener en cuenta la elección que ha hecho la madrina en cuanto a colores, estilo, etc., para no coincidir. Y en las ceremonias más protocolarias, si la ceremonia es de día, no debe llevar vestido largo; pero como ya hemos mencionado anteriormente, este tipo de protocolos en cuanto a los largos de los vestidos y detalles así, está perdiendo importancia.

- `BLOG[vestidos-de-madrina].bloques[33].alt`: La madre de la novia junto a la novia el día de la boda
- `BLOG[vestidos-de-madrina].bloques[33].caption`: La madre de la novia, el día de la boda.
- `BLOG[vestidos-de-madrina].bloques[34].texto`: El Atelier de la Madrina y la Madre de Novia
- `BLOG[vestidos-de-madrina].bloques[35].texto`:

  > En definitiva, la búsqueda del vestido de la madrina y de la madre de la novia, es otro de los momentos especiales y emocionantes que se dan en los preparativos de la ceremonia. Por lo que el lugar en el que decidan realizar su vestido es tremendamente importante; el hecho de sentirse comprendidas en todo momento, escuchadas y aconsejadas es muy importante para que se sientan cómodas. No se trata solo de encontrar un vestido bonito, sino de la experiencia de encontrarlo.

- `BLOG[vestidos-de-madrina].bloques[36].texto`:

  > Desde los Ateliers de Fely Campo, especializados en colecciones de fiesta, buscamos conocer a las madrinas y a las madres de las novias; conocer el tipo de ceremonia y sus gustos es parte del proceso. Trasladamos la filosofía de nuestra diseñadora a nuestras tiendas de Oviedo y Salamanca: "Me gusta conocer a la mujer que voy a vestir, no disfrazarla".

- `BLOG[vestidos-de-madrina].bloques[37].alt`: Clienta saliendo del Atelier Fely Campo con bolsas de la marca
- `BLOG[vestidos-de-madrina].bloques[37].caption`: En el Atelier de Fely Campo.
- `BLOG[vestidos-de-madrina].bloques[38].texto`:

  > Lo más importante para nosotros, por encima del protocolo al vestir a la madrina de boda o madre de la novia, es la naturalidad; porque es ahí donde una mujer se siente guapa y puede mostrar toda su elegancia con su vestido de madrina o de madre de la novia. La naturalidad unida a un buen patrón, que favorezca su silueta harán que, de manera discreta, todos los invitados de la boda alaben el estilismo de una madrina que muestra su personalidad con su elección.

- `BLOG[vestidos-de-madrina].bloques[39].texto`:

  > Visita los Ateliers de Salamanca y Oviedo en el centro de las ciudades, para dejar que te asesoremos con tu vestido de madrina. Siente la complicidad con el equipo de Fely Campo para encontrar tu VESTIDO DE MADRINA O MADRE DE LA NOVIA ideal. Un equipo con años de experiencia que te guiará y te hará vivir un sueño.

- `BLOG[vestidos-de-madrina].bloques[40].texto`: Suscríbete a nuestro canal de YouTube para sumergirte en el maravilloso mundo de Fely Campo y seguir de cerca su participación en grandes eventos.

### Vestidos de damas de honor — /podcast/vestidos-de-damas-de-honor-2

- `BLOG[vestidos-de-damas-de-honor-2].categoria`: Invitadas
- `BLOG[vestidos-de-damas-de-honor-2].autor`: Fely Campo
- `BLOG[vestidos-de-damas-de-honor-2].titulo`: Vestidos de damas de honor
- `BLOG[vestidos-de-damas-de-honor-2].resumen`: Quién es la dama de honor, cómo elegir su vestido y qué dice la tradición frente a la tendencia: la guía de Fely Campo para un cortejo con personalidad.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[0].texto`: Quién es la dama de honor en una boda
- `BLOG[vestidos-de-damas-de-honor-2].bloques[1].texto`:

  > La aparición de la figura de la dama de honor de una boda se remonta más allá de la Edad Media, instituyéndose en Europa en los países cristianos. Así, la dama de honor era, por lo general, una niña menor de 12 años y emparentada directamente con la novia. En las bodas cristianas la dama de honor era quien abría el cortejo, delante de la novia, en su camino hacia el altar de la iglesia.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[2].texto`:

  > Con el tiempo esa niña pasó a ser un grupo de amigas cercanas a la novia o a la pareja, que hacían las veces de anfitrionas y cómplices y colaboraban con la novia velando en todo momento por la satisfacción de los invitados a la boda.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[3].texto`:

  > Además, se vestían todas de manera idéntica, en ocasiones, muy parecidas a la de la novia, porque según las supersticiones, así la protegerían de los malos espíritus que quisieran hacerle algún tipo de daño. De ahí que en la actualidad las damas de honor de una misma boda lleven un vestido muy similar entre ellas.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[4].texto`: Damas de honor en la actualidad
- `BLOG[vestidos-de-damas-de-honor-2].bloques[5].texto`:

  > Como ya lo adelantábamos, poco a poco la figura de la niña o de una chica menor y familiar de la novia se convirtió en a un grupo de mujeres, amigas íntimas o familiares de la novia. Normalmente el grupo de damas de honor lo componen entre 4 y 8 chicas, número que podrá variar según las preferencias de la novia.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[6].texto`:

  > Hoy día las damas de honor son esas personas de confianza, elegidas por la novia para que la acompañen en todo el proceso que conlleva una boda: desde la involucración en los preparativos, que tienen lugar semanas y a veces hasta meses antes del evento, pasando por la disposición de los invitados en las mesas, hasta resolver cualquier contratiempo.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[7].texto`:

  > En España no es muy frecuente ver cortejos de damas de honor. Es una costumbre anglosajona que forma parte de las bodas que se celebren en Inglaterra, Australia y Estados Unidos. Además de la implicación en los detalles previos al enlace, las damas de honor comparten entre ellas y con la novia momentos trascendentales como el de su preparación personal: elección del vestido de dama de honor, maquillaje, peinados…

- `BLOG[vestidos-de-damas-de-honor-2].bloques[8].texto`:

  > Por este motivo es fundamental elegir a una persona con la que la novia se sienta cómoda y que le aporte tranquilidad y confianza, porque será quien la acompañe y con quien comparta momentos emotivos en su gran día.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[9].texto`:

  > Además, esa niña, de la que nació el rol de dama de honor, sigue apareciendo en las bodas con una misión muy distinta pero no por ello menos notable: llevar los anillos y arras (generalmente acompañada por otra damita u otro niño pequeño), anteceden a la novia en su paseíllo de entrada al altar en el caso de las ceremonias religiosas, o en el encuentro con el oficiante cuando se trata de ceremonias civiles.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[10].texto`: Elección de los vestidos de damas de honor
- `BLOG[vestidos-de-damas-de-honor-2].bloques[11].texto`: Ser elegida como dama de honor será un verdadero reconocimiento y una muestra de cariño y aprecio especial de la novia hacia la elegida.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[12].texto`:

  > Una vez que está decidido quiénes formarán parte del cortejo de damas de honor, llega la hora de elegir el vestido de dama de honor. Por norma general la encargada de esta elección, así como la de los complementos para los vestidos de dama de honor, es la novia. Y como no se trata de un grupo de invitadas cualquiera, la novia se deberá esmerar en hacer que sus damas de honor que luzcan absolutamente elegantes y estilosas el día de la boda.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[13].texto`:

  > No cabe duda, el vestido de las damas de honor será uno de los focos de atención del resto de invitados a la boda, después del vestido de novia, y junto con el de vestido de madrina y el de madre de la novia. Estos deberían ser acordes al tipo de vestido de la novia. Por ejemplo, si una novia ha elegido un vestido de novia de corte griego, el vestido de sus damas de honor no sería apropiado si fuera de estilo sexy… y viceversa.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[14].texto`: Tradición o tendencia
- `BLOG[vestidos-de-damas-de-honor-2].bloques[15].texto`: A continuación unas nociones sobre lo que marcan las tradiciones y sobre lo que está de moda con respecto a los vestidos de damas de honor.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[16].texto`:

  > Si hablamos de un estilo más tradicional de cortejo de damas de honor, estas pueden llevar un vestido idéntico todas ellas, de un mismo estilo y color, con accesorios parecidos y peinadas de manera similar, casi imitando a la novia.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[17].alt`: Vestidos de damas de honor. Fotografía de Jaime S.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[17].caption`: Vestidos de damas de honor. Fotografía de Jaime S.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[18].texto`:

  > Otra alternativa es escoger un mismo modelo pero que cada una luzca un color diferente o bien proponer dos colores distintos que combinen y que cada dama de honor escoja el que prefiera.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[19].alt`: Dos damas de honor con vestidos de distinto color, verde y rosa
- `BLOG[vestidos-de-damas-de-honor-2].bloques[19].caption`: Vestidos de dama de honor en distintos colores.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[20].texto`: Hay versiones en las que una vez elegido un color y un tejido, se deja a criterio de cada una, el modelo de vestido de dama de honor que lucirá ese día.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[21].alt`: Vestidos de dama de honor estampados
- `BLOG[vestidos-de-damas-de-honor-2].bloques[21].caption`: Vestidos de dama de honor estampados.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[22].alt`: Vestidos de dama de honor elegantes, fotografiados por Juankar Foto
- `BLOG[vestidos-de-damas-de-honor-2].bloques[22].caption`: Vestidos de dama de honor elegantes, fotografiados por Juankar Foto.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[23].texto`:

  > En ocasiones hay novias muy detallistas, que prefieren que la tonalidad del vestido de las damas de honor sintonice con el color de la decoración de la boda, con el del ramo de novia o con algún otro complemento incluido en su look nupcial, como el velo o los zapatos.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[24].texto`:

  > Puede que los vestidos de dama de honor cortos estén marcando tendencia, pero son los vestidos de dama de honor largos los que siguen siendo los favoritos por la mayoría de novias e invitadas de boda, independientemente de que la celebración sea durante el día o de que se trate de una boda de noche o al caer la tarde

- `BLOG[vestidos-de-damas-de-honor-2].bloques[25].texto`:

  > En líneas generales y en lo que se refiere a colores, no hay nada escrito. Los colores que más suelen demandar para vestidos de dama de honor son todos los tonos pasteles, el dorado y el plata, el nude… Entre los más populares están los vestidos de dama de honor rosa, los vestidos de dama de honor azul y los vestidos de dama de honor malva.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[26].texto`: Respecto al estilo de los vestidos de damas de honor, te recomendamos que no pierdas de vista otros factores a tener en cuenta:
- `BLOG[vestidos-de-damas-de-honor-2].bloques[27].texto`: – Cada dama de honor debería vestirse de acuerdo a su propia personalidad y estilo, no sentirse disfrazada.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[28].texto`: – Los vestidos de damas de honor deberán ir acordes con la estación del año en la que se celebrará el enlace.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[29].texto`: – Anteponer la comodidad que sentirán con su vestido de dama de honor a cualquier otro aspecto, de forma que todas se sientan cómodas el gran día.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[30].texto`: Vestidos de damas de honor a medida
- `BLOG[vestidos-de-damas-de-honor-2].bloques[31].texto`:

  > Como ya lo mencionamos, muchas novias deciden que sus damas de honor lleven vestidos con el mismo tono, tipo de tela y largo, y que cada una de ellas personalice el corte que más le favorezca a su cuerpo y con el que más cómoda estará durante todo el evento.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[32].texto`:

  > Lo más coherente y sencillo es que, si ya se ha apostado por el asesoramiento personalizado, en cuanto se refiere a la confección del vestido de novia, se permita a los mismos profesionales de un atelier de novias, que tienen también atelier de invitada, trabajar sobre los vestidos de damas de honor que las acompañantes más íntimas lucirán en exclusiva el día de la gran celebración.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[33].texto`:

  > Consideramos que este es un gesto bonito y elegante con el cual las novias pueden agasajar y complacer a su cortejo de damas de honor. Como muestra de respeto por esa relación tan importante y el papel que se quiere que desempeñe el día de la boda, las damas de honor merecen destacarse entre la multitud de otros amigos y familiares. ¡Y sin duda esta es para nosotros la opción más acertada!

- `BLOG[vestidos-de-damas-de-honor-2].bloques[34].texto`: Damas de honor Fely Campo
- `BLOG[vestidos-de-damas-de-honor-2].bloques[35].texto`:

  > La idea de que la novia y sus damas de honor asistan juntas a la elección y confección de sus vestidos, aumenta la emoción del evento y suma instantes únicos y emocionalmente intensos entre la novia y sus compañeras más incondicionales.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[36].alt`: Vestidos de damas de honor 2020. Fotografía de Manuel Laya
- `BLOG[vestidos-de-damas-de-honor-2].bloques[36].caption`: Vestidos de damas de honor 2020. Fotografía de Manuel Laya.
- `BLOG[vestidos-de-damas-de-honor-2].bloques[37].texto`:

  > Fely Campo lleva desde 1994 dedicándose a la producción de diseños de alta costura y a la creación de una atmósfera de complicidad que buscan las novias, madrinas, invitadas de boda y sus damas de honor para disfrutar de la creación de sus prendas: vestidos para ceremonias, vestidos de fiesta, vestidos de novia, vestidos de madrina de boda y, por supuesto, vestidos de damas de honor.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[38].texto`:

  > Teniendo en cuenta que cada mujer y cada cuerpo de las damas de honor son diferentes, nosotros sabremos jugar con el patrón para que cada una de ellas haciendo variaciones en cortes, variaciones de escote y detalles en el vestido para que a cada una se saque el mayor partido. Adaptaremos el estilo perfecto para cada una de las damas de honor, manteniendo la armonía con el vestido de la novia, con el resto de damas de honor y con la temática de la boda.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[39].texto`:

  > Si tienes planes de boda, acierta solicitando desde ya una cita en cualquiera de los ateliers de invitada de Fely Campo para que, en una primera toma de contacto, expongas tus ideas sobre el vestido de dama de honor con el que quieres que tu cortejo deslumbre tanto como tú. Y ella o su equipo de profesionales con años de experiencia, te asesorará para que ese día luzcas el vestido de dama de honor perfecto para ti.

- `BLOG[vestidos-de-damas-de-honor-2].bloques[40].texto`: Visita nuestro canal de YouTube para que sigas de cerca lo que hace Fely Campo dentro y fuera de nuestro país.

## Ayuda y contacto

**URL:** /ayuda/… · **Prioridad SEO:** Media

#### SEO de `/ayuda/atencion-cliente` (`src/lib/seoTextos.js`)

- `title`: Atención al cliente | Fely Campo
- `meta description`: Teléfono, email y horario de atención al cliente de Fely Campo, y recogida en tienda (Click & Collect) en Salamanca.

#### SEO de `/ayuda/contacto` (`src/lib/seoTextos.js`)

- `title`: Contacto | Fely Campo
- `meta description`: Contacta con Fely Campo: atención prêt-à-porter, atención a tiendas, WhatsApp y chat online. Atelier en C/ Laguna Negra 17-19, Salamanca.

#### SEO de `/ayuda/envios` (`src/lib/seoTextos.js`)

- `title`: Envíos a España y la UE | Fely Campo
- `meta description`: Plazos, zonas y seguimiento de los envíos de Fely Campo. Preparamos cada pedido a mano en Salamanca y enviamos a España y a la Unión Europea.

#### SEO de `/ayuda/devoluciones` (`src/lib/seoTextos.js`)

- `title`: Devoluciones y cambios | Fely Campo
- `meta description`: Cómo devolver o cambiar un pedido de Fely Campo: 14 días naturales desde la recepción, gastos de devolución y pasos a seguir.

#### Textos de interfaz (`messages/es.json` → `atencionCliente`)

- `atencionCliente.titulo`: Atención al cliente
- `atencionCliente.emailLabel`: Email
- `atencionCliente.telefonoLabel`: Teléfono
- `atencionCliente.horarioLabel`: Horario
- `atencionCliente.horario`: Lun - Vie: 8:00 - 16:00
- `atencionCliente.clickCollectLabel`: Click & Collect
- `atencionCliente.clickCollect`: Recogida en tienda disponible.
- `atencionCliente.direccionLabel`: Tienda

#### Textos de interfaz (`messages/es.json` → `contacto`)

- `contacto.titulo`: Contacto
- `contacto.tiendasTitulo`: Atención a tiendas
- `contacto.horario`: Lun - Vie: 8:00 - 16:00
- `contacto.emailTitulo`: E-mail
- `contacto.pretaporterTitulo`: Atención Prêt-à-porter
- `contacto.chatOnline`: Chat online
- `contacto.clickCollectTitulo`: Click & Collect
- `contacto.direccion`: C/ Laguna Negra 17-19, Salamanca
- `contacto.parrafos[0]`:

  > En felycampo.com queremos ayudarte a elegir los mejores vestidos de novia y vestidos de fiesta, looks especiales de prêt-à-porter de lujo ideales para cualquier ocasión.

- `contacto.parrafos[1]`:

  > En nuestro nuevo Atelier de Madrid encontrarás lo último de nuestras colecciones de pasarela y además podrás vivir la experiencia única de crear un vestido a medida, ya sea de fiesta, novia o para cualquier evento.

- `contacto.parrafos[2]`: Si estás buscando tu vestido de novia, ponemos a tu disposición nuestro Atelier Novia Salamanca, donde vivirás una experiencia única.
- `contacto.parrafos[3]`:

  > En las tiendas Fely Campo Fiesta Salamanca y Oviedo, si eres la madrina, invitada o dama de honor de cualquier evento, nuestras estilistas te asesorarán personalmente para que encuentres el vestido perfecto.

- `contacto.parrafos[4]`: Además, tienes a tu disposición una gran red de puntos de venta a nivel nacional e internacional, donde encontrar nuestra firma.
- `contacto.parrafos[5]`: Fely Campo lleva la elegancia de su diseño al día a día con la línea prêt-à-porter, que podrás encontrar en nuestra tienda de Salamanca.
- `contacto.parrafos[6]`: Ven a conocer en directo la magia de Fely Campo.

#### Textos de interfaz (`messages/es.json` → `envios`)

- `envios.titulo`: Envíos
- `envios.texto`: Preparamos cada pedido a mano en nuestro atelier de Salamanca y lo enviamos a toda España y a la Unión Europea.
- `envios.entregaLabel`: Entrega estimada
- `envios.entrega`: 2 semanas
- `envios.zonaLabel`: Zona de envío
- `envios.zona`: España y Unión Europea
- `envios.seguimientoLabel`: Seguimiento
- `envios.seguimiento`: Recibirás un email con el número de seguimiento en cuanto tu pedido salga del atelier.
- `envios.dudasTexto`: ¿Tienes alguna duda sobre tu envío? Escríbenos a <email>info@felycampo.com</email> o consulta <atencion>Atención al cliente</atencion>.

#### Textos de interfaz (`messages/es.json` → `devoluciones`)

- `devoluciones.titulo`: Devoluciones
- `devoluciones.texto`:

  > Puedes ponerte en contacto con nosotros en <email>info@felycampo.com</email> o en el <telefono>+34 683 703 644</telefono> dentro de los 14 días naturales siguientes a la recepción del pedido para gestionar una devolución o cambio. Te indicaremos los pasos a seguir.

- `devoluciones.gastosLabel`: Gastos de devolución
- `devoluciones.gastos`: A cargo de la clienta, salvo prenda defectuosa o error en el pedido.
- `devoluciones.masInfoTexto`: Visita nuestra página de <atencion>Atención al cliente</atencion> para más información.

## Legal

**URL:** /legal/… · **Prioridad SEO:** Baja

Aviso legal, privacidad y términos aún son páginas pendientes de maquetar. La política de cookies sí tiene contenido.

#### SEO de `/legal/aviso-legal` (`src/lib/seoTextos.js`)

- `title`: Aviso legal | Fely Campo
- `meta description`: Aviso legal de felycampo.com: titular del sitio web, datos de contacto y condiciones de uso.

#### SEO de `/legal/privacidad` (`src/lib/seoTextos.js`)

- `title`: Política de privacidad | Fely Campo
- `meta description`: Cómo trata Fely Campo tus datos personales: finalidades, base legal, plazos de conservación y tus derechos.

#### SEO de `/legal/terminos` (`src/lib/seoTextos.js`)

- `title`: Términos y condiciones de compra | Fely Campo
- `meta description`: Condiciones generales de compra en la tienda online de Fely Campo: pedidos, pagos, envíos y devoluciones.

#### SEO de `/legal/cookies` (`src/lib/seoTextos.js`)

- `title`: Política de cookies | Fely Campo
- `meta description`: Qué cookies usa felycampo.com, para qué sirven y cómo cambiar tus preferencias en cualquier momento.

#### Política de cookies (`src/app/[locale]/legal/cookies/page.js`)

- `COOKIES.eyebrow`: Fely Campo
- `COOKIES.titulo`: Política de cookies
- `COOKIES.intro`: Esta página explica qué son las cookies, cuáles usamos en felycampo.com y cómo puedes gestionarlas.
- `COOKIES.secciones[0].titulo`: ¿Qué es una cookie?
- `COOKIES.secciones[0].texto`:

  > Una cookie es un pequeño archivo que se guarda en tu navegador al visitar un sitio web. Sirve para recordar información entre páginas o entre visitas — por ejemplo, el contenido de tu cesta o tus preferencias de idioma.

- `COOKIES.secciones[1].titulo`: Cookies que usamos
- `COOKIES.secciones[1].texto`: Agrupamos nuestras cookies en tres categorías. Puedes elegir cuáles aceptar desde el aviso de cookies (el botón "Personalizar") en cualquier momento.
- `COOKIES.secciones[2].titulo`: Necesarias
- `COOKIES.secciones[2].texto`:

  > Imprescindibles para que el sitio funcione: mantener tu sesión iniciada, recordar el contenido de tu cesta o guardar tu elección sobre cookies. No se pueden desactivar porque el sitio no funcionaría sin ellas.

- `COOKIES.secciones[3].titulo`: Analíticas
- `COOKIES.secciones[3].texto`: Nos ayudan a entender cómo se usa el sitio (páginas visitadas, tiempo de permanencia) para poder mejorarlo. Solo se activan si las aceptas.
- `COOKIES.secciones[4].titulo`: Marketing
- `COOKIES.secciones[4].texto`: Se usan para mostrarte publicidad relevante de Fely Campo dentro y fuera de nuestro sitio. Solo se activan si las aceptas.
- `COOKIES.secciones[5].titulo`: Cómo cambiar tu elección
- `COOKIES.secciones[5].texto`:

  > Puedes aceptar, rechazar o personalizar tu elección en cualquier momento borrando las cookies de tu navegador para esta web — el aviso volverá a aparecer en tu siguiente visita. También puedes bloquear o eliminar cookies desde la configuración de tu propio navegador, aunque eso puede afectar al funcionamiento de partes del sitio.


## Cesta, favoritos y cuenta

**URL:** /carrito, /wishlist, /mi-cuenta · **Prioridad SEO:** Baja

Textos de interfaz; poco peso SEO (la cesta y la cuenta no se indexan).

#### SEO de `/carrito` (`src/lib/seoTextos.js`)

- `title`: Tu carrito | Fely Campo
- `h1 (oculto, solo para buscadores)`: Tu carrito
- `meta description`: Revisa los productos de tu carrito en la tienda online de Fely Campo.

#### SEO de `/wishlist` (`src/lib/seoTextos.js`)

- `title`: Tu wishlist | Fely Campo
- `h1 (oculto, solo para buscadores)`: Tu wishlist
- `meta description`: Las prendas de Fely Campo que has guardado en tu lista de deseos.

#### Textos de interfaz (`messages/es.json` → `carrito`)

- `carrito.titulo`: Carrito
- `carrito.cerrar`: Cerrar carrito
- `carrito.vacio`: Tu carrito está vacío.
- `carrito.explorarTienda`: Explorar tienda
- `carrito.pagar`: Pagar
- `carrito.verCarrito`: Carrito
- `carrito.quitar`: Quitar
- `carrito.talla`: Talla
- `carrito.tuPedido`: Tu pedido
- `carrito.loginPromptPregunta`: ¿Ya tienes cuenta?
- `carrito.loginPromptCta`: Inicia sesión para un pago más rápido.
- `carrito.envio`: Envío
- `carrito.aCalcular`: A calcular
- `carrito.total`: Total
- `carrito.iniciarPedido`: Tramitar pedido
- `carrito.infoEnvioSubrayado`: Envíos
- `carrito.infoEnvioResto`: y devoluciones

#### Textos de interfaz (`messages/es.json` → `wishlist`)

- `wishlist.titulo`: Lista de deseos
- `wishlist.descripcion`: Guarda aquí las piezas que más te gustan para encontrarlas fácilmente y añadirlas a la cesta cuando quieras.
- `wishlist.vacio`: Tu wishlist está vacía.
- `wishlist.explorarTienda`: Explorar tienda

#### Textos de interfaz (`messages/es.json` → `miCuenta`)

- `miCuenta.tabLogin`: Iniciar sesión
- `miCuenta.tabRegistro`: Crear cuenta
- `miCuenta.tituloLogin`: Inicia sesión
- `miCuenta.tituloRegistro`: Crea tu cuenta
- `miCuenta.subtituloLogin`: Accede para ver tus pedidos, tu wishlist y tus datos guardados.
- `miCuenta.subtituloRegistro`: Solo necesitamos un par de datos para crear tu cuenta.
- `miCuenta.nombreCompleto`: Nombre completo
- `miCuenta.nombreCompletoPlaceholder`: María Martín García
- `miCuenta.fechaNacimiento`: Fecha de nacimiento
- `miCuenta.emailPlaceholder`: maria@ejemplo.com
- `miCuenta.telefonoPlaceholder`: +34 683 703 644
- `miCuenta.password`: Contraseña
- `miCuenta.enviarLogin`: Iniciar sesión
- `miCuenta.enviarRegistro`: Crear cuenta
- `miCuenta.google`: Continuar con Google
- `miCuenta.preguntaRegistro`: ¿Eres nueva en Fely Campo?
- `miCuenta.preguntaLogin`: ¿Ya tienes cuenta?
- `miCuenta.cerrar`: Cerrar

#### Textos de interfaz (`messages/es.json` → `panelCliente`)

- `panelCliente.tabPedidos`: Mis pedidos
- `panelCliente.tabResenas`: Mis reseñas
- `panelCliente.tabDatos`: Mis datos
- `panelCliente.pedidosTitulo`: Mis pedidos
- `panelCliente.pedidoNumero`: Pedido {numero}
- `panelCliente.pedidoTotal`: Total {total}
- `panelCliente.escribirResena`: Escribir reseña
- `panelCliente.resenaEnviada`: Reseña enviada
- `panelCliente.resenasTitulo`: Mis reseñas
- `panelCliente.resenasVacio`: Todavía no has escrito ninguna reseña.
- `panelCliente.resenasPendientesTitulo`: Productos por reseñar
- `panelCliente.datosTitulo`: Mis datos
- `panelCliente.datosSubtitulo`: Así es como te vemos nosotras — puedes actualizarlo cuando quieras.
- `panelCliente.guardarCambios`: Guardar cambios

## Otros textos

**URL:** — · **Prioridad SEO:** Baja

#### SEO de `/mi-cuenta/panel` (`src/lib/seoTextos.js`)

- `title`: Mi cuenta | Fely Campo
- `meta description`: Tus pedidos, reseñas y datos de cliente de Fely Campo.

---

_1131 textos en total._