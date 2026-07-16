# Fely Campo — Sistema de diseño
> Atelier a plena luz — la fotografía manda, la interfaz acompaña.

**Tema:** claro

Fely Campo es una firma de moda de fiesta y novia fundada en Salamanca en 1997. Su
sistema digital es minimalismo de autor: lienzo blanco, mucho aire, tipografía sobria
y protagonismo total de la fotografía. La referencia visual es Cecilie Bahnsen —
espacio en blanco generoso, jerarquía tipográfica limpia, cero ruido cromático en la
interfaz. La diferencia propia de Fely Campo es un rosa de marca vibrante (#E92174)
usado como **acento**, no como superficie: aparece en etiquetas, hover, y la CTA de
compra, para firmar sin gritar. El color fuerte lo pone la ropa; la interfaz se aparta
para dejarla hablar.

La estructura de tokens y componentes sigue el molde de sistemas e-commerce
documentados (ref. Peak Design): tokens como fuente única de la verdad, superficies
por nivel, componentes de tienda (tarjeta de producto, selectores, carrito).

---

## Tokens — Color

| Nombre | Valor | Token | Rol |
|--------|-------|-------|-----|
| Fondo | `#FFFFFF` | `--color-fondo` | Lienzo, fondo de página. El color lo pone la foto. |
| Tinta | `#202020` | `--color-tinta` | Texto principal, negro suave. Ancla titulares y cuerpo. |
| Negro | `#101010` | `--color-negro` | Negro puro, máximo contraste puntual. |
| Gris 700 | `#404040` | `--color-gris-700` | Gris oscuro, texto de apoyo. |
| Gris 500 | `#757575` | `--color-gris-500` | Texto secundario, metadatos, precio. |
| Gris 400 | `#8E8E8E` | `--color-gris-400` | Iconos, placeholder. |
| Gris 300 | `#AEAEAE` | `--color-gris-300` | Borde de input. |
| Gris 200 | `#D9D9D9` | `--color-gris-200` | Bordes suaves. |
| Gris 100 | `#F2F2F2` | `--color-gris-100` | Fondos gris claro. |
| Hairline | `#EFEFEF` | `--color-hairline` | Líneas separadoras y divisores. |
| Rosa marca | `#E92174` | `--color-rosa` | Acento de marca. Etiquetas, hover, CTA de compra. Nunca superficie grande. |
| Rosa oscuro | `#C2185F` | `--color-rosa-oscuro` | Hover y texto rosa sobre blanco (contraste legible). |
| Rosa velo | `#FCE4EE` | `--color-rosa-velo` | Fondo suave de etiqueta o sección. |
| Crema | `#F5F1EE` | `--color-crema` | Fondo cálido alternativo, placeholder de imagen. |

---

## Tokens — Tipografía

Familia única: **Helvetica → Inter → Arial → sans-serif**. Inter se carga como fuente
web (casi idéntica a Helvetica) para quien no la tenga instalada. **Sin letter-spacing**
en ningún nivel, por decisión de marca.

### Escala

| Rol | Tamaño | Interlineado | Token |
|-----|--------|--------------|-------|
| caption | 12px | 1.4 | `--text-caption` |
| small | 14px | 1.5 | `--text-small` |
| body | 16px | 1.6 | `--text-body` |
| body-lg | 18px | 1.6 | `--text-body-lg` |
| h4 | 20px | 1.3 | `--text-h4` |
| h3 | 24px | 1.2 | `--text-h3` |
| h2 | 32px | 1.2 | `--text-h2` |
| h1 | 48px | 1.1 | `--text-h1` |
| display | 64px | 1.05 | `--text-display` |

Pesos: 300 (light), 400 (regular), 500 (medium), 600 (semibold). Titulares en 500.
Nunca bold (700+).

---

## Tokens — Espaciado y forma

**Unidad base:** 4px · **Densidad:** amplia (aire editorial)

| Nombre | Valor | Token |
|--------|-------|-------|
| 4–32 | 4/8/12/16/20/24/32px | `--spacing-*` |
| 40 | 40px (margen lateral desktop) | `--spacing-40` |
| 64 / 80 | 64 / 80px | `--spacing-64` / `--spacing-80` |
| 120 | 120px (sección, móvil) | `--spacing-120` |
| 200 | 200px (sección, desktop) | `--spacing-200` |

### Radios (semánticos — cada elemento tiene su token)

| Elemento | Valor | Token |
|----------|-------|-------|
| botones | 0px | `--radius-botones` |
| inputs | 0px | `--radius-inputs` |
| tarjetas | 0px | `--radius-tarjetas` |
| badges | 0px | `--radius-badges` |
| imágenes | **0px** | `--radius-imagenes` |
| pills (sin uso actual) | 9999px | `--radius-full` |

**CERO radio en todo el sistema, sin excepción.** Verificado contra capturas y CSS
reales de Cecilie Bahnsen: no existe un solo `border-radius` en su interfaz, ni
siquiera en imágenes de producto. La primera versión de este sistema tenía 4px en
imágenes por costumbre de diseño, sin base en el referente — queda corregido.

### Layout

- Ancho de contenido: 1440px (`--page-max-width`)
- Ancho de sitio: 1920px (`--site-max-width`)
- Ancho de texto legible: 700px (`--text-max-width`)
- Separación de sección: 120px móvil / 200px desktop
- Gap entre elementos: 24px

---

## Superficies

| Nivel | Nombre | Valor | Uso |
|-------|--------|-------|-----|
| 0 | Lienzo | `#FFFFFF` | Fondo de página, grids de producto. |
| 1 | Crema | `#F5F1EE` | Tarjeta/panel cálido, placeholder de imagen. Elevación por tono. |
| 2 | Hairline | `#EFEFEF` | Divisores y bordes entre secciones. |
| dark | Panel oscuro | `#202020` | Hero split, footer, zonas de contraste. |

Elevación por **tono**, no por sombra. La separación entre superficies se logra
exclusivamente con hairlines (`#EFEFEF`) y espacio en blanco — nunca con contraste
de relleno ni sombras (ref. Bongusta: "the UI is the gallery wall, never the artwork").

---

## Componentes

### Botón
Cuatro variantes: `solido` (tinta, acción principal), `contorno` (secundaria),
`rosa` (CTA de compra destacada — usar con moderación), `texto` (enlace subrayado
en rosa). Tamaños s/m/l/full. Esquinas rectas. Al hover, el sólido vira a rosa.

### Tarjeta de producto
Imagen a sangre (radio 0px, sin marco ni sombra) + badge opcional + nombre + precio
con rebaja opcional, pegado debajo. Sin contenedor de tarjeta: la imagen ocupa toda
la columna. Se separa de otras tarjetas solo por el gap del grid, nunca por borde.
La misma estructura sirve para producto, look y colección.

**Badge — corregido:** texto plano en mayúsculas, esquina superior derecha de la
imagen, SIN fondo ni forma de pill (así aparece "New" en el referente). La primera
versión usaba una cápsula rellena de rosa; no existe ese tratamiento en Cecilie
Bahnsen y se ha quitado.

### Selector de talla
Fila de tallas. Activa en tinta, agotadas tachadas y deshabilitadas. Radio 0.

### Selector de cantidad
Control − / n / + para carrito. Borde gris, radio 0.

### Input
Campo con etiqueta opcional. Borde gris-300, foco en tinta. Radio 0.

### Línea de carrito
Imagen + nombre + talla + cantidad + precio + quitar. Separador hairline abajo.

### Navbar
Logo centrado, navegación izquierda, utilidades derecha. Borde inferior hairline.

### Footer
Cuatro columnas (atención, marca, síguenos, newsletter) + barra legal inferior.

### Bloque de sección
Imagen + texto + enlace. Patrón editorial repetido (About, Atelier, colecciones).
Admite versión invertida (imagen a la derecha).

---

## Do's & Don'ts

### Do
- Usar el rosa #E92174 como acento: etiquetas, hover, CTA de compra. Nunca como fondo grande.
- Texto rosa sobre blanco → usar rosa oscuro #C2185F (contraste legible).
- Titulares en peso 500; cuerpo en 400. Sin letter-spacing.
- Esquinas rectas en TODO: botones, inputs, tarjetas e imágenes. Cero radio.
- Elevación por tono (crema, hairline), no por sombra.
- Bloques de texto a 700px máximo para líneas legibles.
- Dejar aire: 120–200px entre secciones.

### Don't
- No convertir el rosa en superficie dominante ni rellenar con él.
- No usar bold (700+) ni añadir letter-spacing.
- No meter sombras decorativas en tarjetas o imágenes.
- No redondear nada, tampoco imágenes (cero radio, verificado contra el referente).
- No dejar que la interfaz compita con la fotografía.

---

## Referencias

- **Cecilie Bahnsen** — referencia visual principal: minimalismo de autor, aire,
  fotografía protagonista, cero color de interfaz.
- **Peak Design** — referencia de estructura e-commerce: tokens, superficies por
  nivel, product cards, hero split, nav + filtros.
- **Bongusta** — referencia de organización más cercana (e-commerce editorial claro,
  fotografía protagonista, estructura por hairlines): de aquí los radios semánticos
  por elemento y la disciplina de separar superficies solo con bordes. Sus VALORES
  (densidad compacta, secciones de 48px, botones pill) NO se adoptan: contradicen
  el aire y las esquinas rectas de Fely Campo.
- **The Row / Aesop** — misma contención editorial: neutro + un acento, serif/sans
  restringido, blanco que hace el trabajo.

## Notas para desarrollo (Jaume)

- Tailwind **v4**: los tokens viven en `src/styles/global.css` dentro de `@theme`.
  No hay `tailwind.config.js`.
- Tokens también en formato W3C en `tokens/tokens.json` (puente con Figma).
- Componentes = capa visual. La lógica (carrito, datos, checkout) se conecta después.
- El alias `@/` requiere `jsconfig.json` (montaje inicial).


---

## Arquitectura de tokens (simple, adaptada a este proyecto)

**`src/styles/global.css` es la única fuente real.** Todos los valores de marca
—color, tipografía, espaciado, radios, layout— viven en su bloque `@theme` y
en ningún otro sitio. Tailwind v4 lo lee directamente. Para cambiar cualquier
valor del sistema, se edita **solo ese archivo**.

`tokens/tokens.json` no es una fuente activa que haya que mantener sincronizada
a diario — es un **export puntual** en formato W3C, útil únicamente si en algún
momento se importan estos valores a Figma. Se actualiza a mano, de vez en cuando,
copiando lo que ya está decidido en `global.css`. Si nunca se usa Figma con este
proyecto, ese archivo puede ignorarse sin ningún coste.

No hay scripts de generación ni de verificación: con un único archivo real no
hace falta — la desincronía entre dos fuentes solo puede pasar si hay dos
fuentes. Esta es la razón de fondo del cambio respecto a la versión anterior.

---

## Arquitectura de estilos — CSS en cascada (CSS Modules), no utilidades en fila

Los componentes ya no se estilizan con clases de Tailwind amontonadas en el
JSX (`bg-tinta text-white px-7 py-3...`). Cada componente tiene su propio
archivo `NombreComponente.module.css` con clases semánticas normales
(`.boton`, `.solido`, `.activa`...) que usan los tokens de `global.css` vía
`var(--...)`. Es CSS en cascada de verdad: herencia, especificidad, y un
único sitio por componente donde se lee su estilo completo de un vistazo.

```
Boton.jsx           → import styles from './Boton.module.css'
Boton.module.css    → .boton { ... }  .solido { background: var(--color-tinta); }
```

Ventajas para este proyecto: se lee como CSS clásico (coherente con tu forma
de trabajar), cada componente es autocontenido, y sigue habiendo una única
fuente de valores (`global.css`) — los módulos no inventan colores nuevos,
solo los aplican.

Tailwind sigue instalado y disponible (útil para maquetación rápida de
páginas nuevas: grids, flex, espaciados puntuales), pero **los componentes
del sistema ya no dependen de él** para su apariencia — su CSS es autónomo.

---

## Mapa de equivalencias — styleguide.html (alias cortos) ↔ global.css (Tailwind)

`styleguide.html` es HTML puro sin build, así que sus variables pueden llevar
nombres cortos. `global.css` usa Tailwind v4, que exige el prefijo `--color-*`,
`--spacing-*`, `--text-*` para generar utilidades (`bg-rosa`, `p-5`, `text-h1`).
Mismo valor siempre — solo cambia el prefijo. Mantener este mapa sincronizado
a mano cada vez que se añada un token nuevo:

| styleguide.html | global.css (Tailwind) | Valor |
|---|---|---|
| `--fondo` | `--color-fondo` | `#FFFFFF` |
| `--tinta` | `--color-tinta` | `#202020` |
| `--g100` … `--g700` | `--color-gris-100` … `--color-gris-700` | (igual escala) |
| `--rosa` / `--rosa-oscuro` / `--rosa-velo` | `--color-rosa` / `--color-rosa-oscuro` / `--color-rosa-velo` | (igual) |
| `--space-1` … `--space-11` | `--spacing-1` … `--spacing-11` | 4px … 200px (por PASO, no por valor) |
| `--text-micro` … `--text-display` | (mismo nombre) | rem, con `html{font-size:87.5%}` |
| `--border-thin` / `--border-regular` | (mismo nombre) | 0.75px / 1px |
| `--screen-tablet` / `--screen-desktop` | (mismo nombre) | 768px / 1024px |
| `--max-texto` / `--max-contenido` / `--max-sitio` | (mismo nombre) | 700 / 1440 / 1920px |

## ⚠️ Cambio importante — espaciado renombrado por PASO, no por valor

Antes: `--spacing-24` significaba literalmente 24px (nombre = valor).
Ahora: `--spacing-5` significa "el 5º paso de la escala", que equivale a 24px
(nombre = posición). Es el mismo criterio que ya usaba `styleguide.html`.

Si en el futuro se añade un componente nuevo y se copia un valor antiguo tipo
`var(--spacing-24)`, **ya no existe** — hay que traducirlo al paso correspondiente
(`var(--spacing-5)`). Tabla de conversión rápida:

4px→1 · 8px→2 · 12px→3 · 16px→4 · 24px→5 · 32px→6 · 40px→7 · 64px→8 · 80px→9 · 120px→10 · 200px→11

Los 10 componentes ya existentes (`src/components/**/*.module.css` y
`src/app/page.module.css`) fueron migrados a la escala nueva. Verificado sin
tokens huérfanos con una comprobación automática antes de esta entrega.


---

## Tailwind eliminado — CSS puro + CSS Modules

Se retiró Tailwind del proyecto (paquete, `@import`, `postcss.config.mjs`).
Motivo: con todos los componentes ya construidos en CSS Modules, cada uno
lleva su propio estilo en cascada — no había ninguna clase de utilidad
Tailwind en uso real, solo la dependencia instalada sin aprovechar.

- `@theme { }` (sintaxis exclusiva de Tailwind) → `:root { }` (CSS estándar,
  funciona en cualquier navegador sin necesitar el paquete).
- CSS Modules (`.module.css`) son soportados por Next.js de fábrica — no
  necesitan Tailwind ni configuración adicional para funcionar.
- Impacto en peso/velocidad: mínimo (Tailwind sin usar apenas pesaba más
  allá de su reset base). El beneficio real es limpieza: una dependencia
  menos, un solo reset (el propio de `global.css`), y cero ambigüedad sobre
  si una clase es "de Tailwind" o del proyecto.
