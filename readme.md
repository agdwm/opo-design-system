# STENCIL LANDING CHALLENGE

Starter para una prueba técnica centrada en `Stencil`, `Web Components` y `Storybook`.

La base está preparada para que la persona candidata clone el repo, instale dependencias y empiece a trabajar sin perder tiempo en setup. El starter incluye un único componente de ejemplo, `opo-button`, y una landing externa separada de la librería.

## Setup

```bash
npm install
npm start
```

Landing local:

`http://localhost:3333`

Storybook:

```bash
npm run storybook
```

Storybook local:

`http://localhost:6006`

## Objetivo de la prueba

Construir una landing page usando `Stencil` y documentar los componentes en `Storybook`.

La idea es que la pagina viva fuera de la librería de componentes, como ocurriría en una web consumidora del paquete.

## Lo que ya viene hecho

- Entorno base de Stencil listo para arrancar.
- Landing externa inicial en `landing/`.
- Un único componente de ejemplo: `opo-button`.
- Storybook configurado para documentar componentes de la librería.

El resto de componentes debe decidirlo y construirlo la persona candidata.

## Como consume la landing la librería

La landing no importa componentes uno a uno ni requiere tocar `package.json` cada vez que se añade uno nuevo.

La web externa carga solo el bundle raíz de Stencil desde:

`landing/main.ts`

Ese bundle registra automáticamente los Web Components compilados por la librería, así que cualquier componente nuevo que se cree en `src/components/` pasa a estar disponible en la landing tras recompilar.

## Requisitos esperados

- Usar `Stencil` para construir componentes reutilizables.
- Montar la landing desde la web externa, no desde un componente contenedor dentro de la librería.
- Documentar en Storybook los componentes.
- Organizar la solución con una jerarquía de componentes clara.

## Se valorara especialmente

- Reutilización real de componentes.
- Jerarquía de componentes bien pensada.
- Buen manejo de estados y variantes.
- Calidad visual general.
- Accesibilidad básica.
- Uso de CSS variables o un sistema visual consistente.

## Bonus

- Mejoras de accesibilidad.
- Mejor documentación en Storybook.
- Theming mediante variables CSS.
- Tests básicos de componentes.

## Entrega

- Sube tus cambios al repositorio o comparte un enlace con tu solución.
- Incluye una breve explicación:
  - decisiones técnicas
  - tradeoffs
  - qué mejorarías con más tiempo

## Nota para evaluación

La estructura actual está pensada para que la landing y la librería convivan en el mismo repo, pero separadas:

- `npm start` levanta una landing externa en Vite y recompila la librería de Stencil en paralelo.
- `npm run storybook` levanta Storybook y recompila Stencil en paralelo para reflejar cambios en componentes.

---

## Table of Contents

## Solution Overview

He priorizado una aproximación component-driven: antes de completar la landing como una página aislada, he identificado las piezas reutilizables del diseño y las he construido como componentes de la librería, utilizando posteriormente la landing externa como un caso de uso real de consumo.

De este modo, la landing no actúa únicamente como una implementación visual concreta, sino también como una validación práctica de la reutilización, composición y flexibilidad de los componentes definidos dentro del sistema.

> [!NOTE]
> Parte de las decisiones documentadas en este README representan una dirección arquitectónica explorada durante la prueba y no necesariamente una implementación completamente desarrollada en esta iteración inicial.

### Component Library

### Landing Integration

### Storybook Documentation

## Component Architecture

Cómo se ha separado la librería y la landing.

---

> [!IMPORTANT]
>
> ## 🧩 Design System Approach
>
> Aunque considero que muchas de las decisiones presentes en la implementación original eran totalmente válidas para el alcance inicial de esta prueba técnica, he optado por aprovechar el ejercicio como una **oportunidad para explorar cómo podría evolucionar la arquitectura frontend** hacia un enfoque más _“design-system-oriented”_ en lugar de _“page-oriented”_, al considerar que este enfoque está más alineado con las responsabilidades asociadas a la posición.
>
> Dado que no parto de un sistema de diseño previamente definido ni de una arquitectura de tokens establecida desde diseño, muchas de las decisiones documentadas en este README han sido inferidas a partir de buenas prácticas ampliamente utilizadas en sistemas de diseño modernos, priorizando aspectos como:
>
> - consistencia,
> - reutilización,
> - mantenibilidad,
> - escalabilidad,
> - accesibilidad,
> - y desacoplamiento entre diseño e implementación.
>
> Esto incluye decisiones relacionadas no solo con los design tokens, sino también con otros aspectos de la arquitectura frontend como:
>
> - resets CSS,
> - estructura de tokens,
> - nomenclatura,
> - tipografía,
> - estrategias tipográficas responsive,
> - estrategias de theming,
> - o adopción progresiva de características modernas de CSS.
>
> Al mismo tiempo, entiendo los **sistemas de diseño** no tanto como conjuntos rígidos de reglas cerradas, sino como **ecosistemas vivos sujetos a evolución** constante según las necesidades de producto, contexto de uso, accesibilidad, escalabilidad y colaboración entre equipos. Desde esta perspectiva, aunque muchas de las decisiones documentadas en este README parten de patrones y aproximaciones ampliamente adoptadas en arquitecturas frontend modernas, también han sido interpretadas y adaptadas desde mi propia experiencia, criterio técnico y comprensión del contexto concreto de la prueba, **evitando aplicar soluciones de forma dogmática** o descontextualizada.
>
> Por otro lado, entiendo este tipo de decisiones como parte de un **proceso colaborativo y transversal** entre diseño, desarrollo, producto... En un entorno real, cualquier evolución del sistema debería idealmente consensuarse con los equipos implicados para garantizar coherencia tanto visual como técnica a largo plazo.
>
> También soy consciente de que parte del nivel de abstracción y profundidad arquitectónica explorado en este README excede probablemente las necesidades estrictamente necesarias para el alcance actual de la prueba. Sin embargo, he preferido abordarlo deliberadamente como un ejercicio de exploración técnica orientado a reflejar mejor mi aproximación habitual al desarrollo de sistemas frontend y librerías de componentes reutilizables.
>
> En definitiva, las decisiones documentadas en este README no pretenden cuestionar la aproximación original, sino explorar una posible dirección de evolución arquitectónica del sistema tomando esta propuesta de landing page como punto de partida.

## CSS Reset

Dado que este proyecto parte de una base limpia, he añadido un reset ligero inspirado en [Josh Comeau's reset](https://www.joshwcomeau.com/css/custom-css-reset/) con el objetivo de establecer comportamientos base más predecibles y accesibles entre navegadores, sin imponer decisiones visuales o estéticas.

Este reset proporciona una base más consistente para la librería de componentes y adopta mejoras progresivas mediante características modernas de CSS (ej: `text-wrap: balance;` `interpolate-size: allow-keywords;`)

## Design Tokens

### Token Architecture (reference || system || component)

Los tokens del sistema se organizan en distintas capas independientes con el objetivo de desacoplar los **valores base** del sistema de diseño de su **intención de diseño reutilizable** y de las necesidades concretas de **implementación** de cada componente.

| Nivel         | Prefijo  | Propósito                                                                                                      | Ejemplo                            |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| **Reference** | `--ref-` | Valores base reutilizables. No representan intención ni contexto de uso.                                       | `--ref-font-size-500`              |
| **System**    | `--sys-` | Representan decisiones reutilizables del sistema. Pueden adaptarse según tema, contexto o criterio responsive. | `--sys-typography-heading-md-size` |
| **Component** | `--cmp-` | Adaptación específica del componente. Desacopla la implementación de decisiones globales del sistema.          | `--cmp-button-bg`                  |

---

- **Reference tokens (`--ref-`)**
  - Contienen los valores primitivos compartidos del sistema (`colors`, `typography`, `spacing`, `radius`, `shadows`, etc.).
  - No representan intención ni contexto de uso.
  - No deberían consumirse directamente desde los componentes.

```css
/* reference.tokens.css */
--ref-color-amber-500
```

- **System tokens (`--sys-`)**
  - Actúan como una capa de abstracción sobre los reference tokens.
  - Representan decisiones globales del sistema relacionadas con color, tipografía, theming, comportamiento responsive o accesibilidad.
  - Pueden adaptarse según contexto, tema o estrategia responsive.

```css
/* system.tokens.css */
--sys-color-brand
```

- **Component tokens (`--cmp-`)**
  - Adaptan las decisiones globales del sistema a las necesidades concretas de cada componente.
  - Favorecen una arquitectura más independiente entre capas y extensible.
  - Permiten introducir una capa adicional de personalización sin acoplar directamente el componente al sistema global.

```css
/* component.tokens.css */
--cmp-button-bg
```

```css
/* button.css */
.button {
  background-color: var(--cmp-button-bg);
}
```

> [!NOTE]
> La **nomenclatura** propuesta para los system tokens (`--sys-`) debe entenderse como una interpretación razonada a partir de la landing implementada, los valores presentes en el archivo de tokens original y los posibles contextos de uso observados durante la prueba.
>
> Su objetivo es ilustrar cómo los reference tokens podrían evolucionar hacia una capa semántica capaz de expresar decisiones reutilizables de producto, interfaz y marca.
>
> En un entorno real, esta nomenclatura debería consensuarse con diseño para garantizar que los nombres utilizados tanto en Figma como en código respondan al mismo lenguaje compartido. La mayor virtud de un sistema de diseño no es únicamente la calidad del código, sino que diseño y desarrollo puedan hablar el mismo idioma.

La dirección habitual de consumo dentro del sistema seguiría una estructura similar a:

```txt
reference tokens
(--ref-color-amber-500: #ffb142)
        ↓
system tokens
(--sys-color-brand: var(--ref-color-amber-500))
        ↓
component tokens
(--cmp-button-bg: var(--sys-color-brand))
        ↓
component styles
.button {
  background-color: var(--cmp-button-bg);
}
```

En sistemas pequeños o de menor complejidad, los componentes pueden consumir system tokens directamente. Sin embargo, en arquitecturas más complejas o multi-producto, los component tokens permiten introducir una capa adicional de desacoplamiento entre las decisiones globales del sistema y las necesidades particulares de implementación de cada componente.

Por otro lado, no todos los component tokens necesariamente deberían exponerse globalmente mediante `:root`.

Aquellos tokens que formen parte de la API pública de personalización del componente (`theming`, `branding`, `white-label`, etc.) pueden exponerse como tokens globales reutilizables. Sin embargo, tokens más específicos o relacionados con detalles internos de implementación suelen mantenerse scoped dentro del propio componente para evitar acoplamientos innecesarios y reducir contaminación del namespace global.

### Color Tokens

He optado por reorganizar los colores en una estructura de **reference color tokens** basada en escalas tonales reutilizables.

En lugar de asociar directamente los tokens a contextos específicos de uso `(primary, hover, background, pressed…)`, he adoptado una estrategia de nomenclatura más neutral y escalable inspirada en sistemas modernos de diseño como Tailwind CSS.

```css
/* Before */
--color-primary-main-hover: #ffc470;

/* After */
--ref-color-amber-400: oklch(0.8567 0.1219 74.66);
```

Esto permite **desacoplar la definición física del color de su intención de uso** dentro de la interfaz.

Posteriormente, estos reference tokens pueden ser reutilizados por system tokens que representan el propósito real del color dentro del sistema.

Además, he optado por definir los colores utilizando `oklch()` debido a las ventajas que ofrece frente a espacios de color tradicionales como `hex` o `hsl`:

- Permite controlar de forma independiente luminosidad (L), saturación (C) y tono (H), facilitando la construcción de paletas más coherentes y sistemáticas.
- Produce transiciones cromáticas perceptualmente más uniformes.
- Evita problemas habituales de otros modelos de color donde algunos tonos pueden volverse excesivamente apagados, grisáceos o artificialmente saturados.

Para la conversión y validación de colores entre formatos `hex` y `oklch()` he utilizado [oklch.com](https://oklch.com/), en lugar del selector nativo de VS Code, ya que se trata de una herramienta especializada en espacios de color desarrollada por [Evil Martians](https://evilmartians.com/devtools) y creada por Andrey Sitnik (autor de PostCSS y Autoprefixer).

Por otro lado, he conservado todos los valores cromáticos presentes en el sistema original, incluso cuando algunos tonos neutros resultaban visualmente muy próximos (ej: `#ebeaec`, `#eeedf0`), para preservar trazabilidad respecto a la propuesta inicial y evitar perder posibles usos previstos desde diseño.

### Typography System

#### Font Family

El archivo de tokens original únicamente definía una familia tipográfica de seguridad `(sans-serif)`. Con el objetivo de mejorar el comportamiento de carga de fuentes y ofrecer una experiencia visual más consistente entre plataformas, he decidido ampliar la fallback font stack incorporando `system-ui`.

De este modo, si IBM Plex Sans no está disponible o todavía no ha terminado de cargar, el navegador utilizará automáticamente la **tipografía nativa del sistema operativo** (SF Pro en macOS/iOS, Segoe UI en Windows, Roboto en Android, etc.), proporcionando una _experiencia visual más consistente y natural_ que la ofrecida por una familia genérica `sans-serif`.

Además, la nomenclatura original ha sido actualizada hacia una convención más neutral y alineada con la arquitectura general del sistema de tokens.

```css
/* Before */
--font-family-main: 'IBM Plex Sans', sans-serif;

/* After */
--ref-font-family-sans: 'IBM Plex Sans', system-ui, sans-serif;
```

#### Font Sizes

La escala tipográfica original utilizaba tokens con un naming acoplado tanto al viewport `(desktop, mobile)` como al contexto visual `(xs, xl, xxl)`.
Con el objetivo de desacoplar la tipografía del contexto de uso y mejorar la escalabilidad del sistema, he refactorizado la nomenclatura hacia un sistema de _reference typography tokens_ neutral y reutilizable.

```css
/* Before */
--font-size-desktop-xs: 0.75rem;

/* After */
--ref-font-size-100: 0.75rem;
```

La nueva nomenclatura:

- elimina referencias directas a dispositivos o breakpoints,
- adopta una escala numérica más consistente y extensible y
- sigue una aproximación similar a la utilizada por sistemas modernos como _Tailwind CSS, Material Design o Spectrum._

Estos tokens representan únicamente valores tipográficos reutilizables y **no deberían utilizarse directamente** dentro de los componentes.

En su lugar, las decisiones tipográficas reutilizables del sistema se encapsulan mediante system tokens (`--sys-`), que posteriormente son adaptados a través de component tokens específicos (`--cmp-`) consumidos finalmente por los componentes.

```css
/* Example */
--sys-typography-body-md-size: var(--ref-font-size-300);
```

Esta separación entre **reference tokens** y **system tokens** mejora la reutilización, mantenibilidad y escalabilidad del sistema, además de facilitar futuras refactorizaciones y la introducción de responsive o fluid typography mediante `clamp()`.

#### Line Heights

Tras analizar los valores de `line-height` definidos en los diseños de Figma, he podido identificar y abstraer una **escala tipográfica consistente** en un conjunto más reducido de tokens reutilizables de interlineado.

En lugar de asociar los tokens a viewports específicos (`desktop`,`mobile`) o a contextos de uso tipográfico (`heading`,`body`), he adoptado una estrategia de nomenclatura más neutral basada en la densidad visual y reutilización transversal.

```css
/* Before */
--font-line-height-desktop-m: 1.5rem;

/* After */
--ref-line-height-base: 1.5;
```

He definido los tokens intencionadamente como **valores unitless** (sin unidad) en lugar de utilizar medidas absolutas en `px` o `rem`, ya que los valores unitless proporcionan un comportamiento tipográfico más flexible y resiliente al escalar proporcionalmente respecto al tamaño de fuente calculado de cada elemento, en lugar de depender del `font-size` raíz del documento (`html`).

Por ejemplo, un valor de `1.5` significa que el line-height calculado será equivalente al `150%` del tamaño de fuente actual del elemento.

Esto resulta especialmente útil en escenarios de **tipografía fluida** como:

```css
font-size: clamp(2rem, 5vw, 4rem);
line-height: 1.2;
```

#### Font Weights

Aunque [**_IBM Plex Sans_**](https://www.ibm.com/plex/specs/) dispone oficialmente de una gama de pesos tipográficos más amplia, he decidido mantener deliberadamente la escala original de `font-weight` (`400`, `500`, `600` y `700`), ya que un conjunto reducido y controlado contribuye a mantener una jerarquía tipográfica más coherente y mantenible dentro de la interfaz.

Esta decisión reduce la complejidad visual del sistema y evita un uso excesivamente granular de pesos tipográficos que raramente aporta valor real en contextos UI.

La única modificación realizada fue la **actualización de la nomenclatura de los tokens** para alinearla con la convención utilizada en el resto de reference tokens del sistema.

```css
/* Before */
--font-weight-text: 400;

/* After */
--ref-font-weight-regular: 400;
```

#### Letter Spacing

El sistema original no incluía tokens específicos para `letter-spacing`. Aunque el tracking suele tener un impacto más sutil que otras propiedades tipográficas como `font-size` o `line-height`, también contribuye a la consistencia del sistema tipográfico.

Por este motivo, he optado por incorporar una pequeña escala de **reference letter-spacing tokens** reutilizables.

Estos valores se han definido en unidades relativas `em` para garantizar que el espaciado escale proporcionalmente junto al tamaño tipográfico, mejorando así la consistencia visual entre distintos tamaños de fuente.

De nuevo, estos tokens no representan estilos tipográficos finales, sino valores tipográficos reutilizables del sistema.

### Spacing Strategy

Aunque muchos sistemas modernos utilizan unidades relativas como `rem` también para los spacing tokens, he decidido mantener los espaciados estructurales del sistema en `px`.

Si bien utilizar `rem` en spacing puede resultar beneficioso en contextos más editoriales o centrados en lectura, en interfaces UI y layouts estructurales **un escalado excesivo del spacing puede reducir significativamente el espacio útil disponible para el contenido**, comprometiendo la densidad visual de la interfaz y afectando potencialmente a la experiencia de uso.

Por este motivo, esta decisión busca preservar un comportamiento espacial más estable y predecible dentro de la interfaz, evitando que el espaciado crezca proporcionalmente junto al tamaño tipográfico cuando el usuario modifica el `font-size` raíz del navegador.

Por otro lado, he refactorizado la nomenclatura original de los spacing tokens para alinearla con la utilizada en el resto de tokens del sistema, siguiendo la misma lógica de desacoplamiento del contexto de uso.

```css
/* Before */
--spacing-desktop-xxs: 8px;

/* After */
--ref-spacing-200: 8px;
```

### Radius Tokens

El sistema original ya incorporaba una serie reducida de valores de `border-radius` orientados a construir una interfaz visualmente suave y consistente.

```css
/* Before */
--radius-md: 24px;

/* After */
--ref-radius-lg: 24px;
```

He optado por mantener esta aproximación, actualizando la nomenclatura hacia una convención más alineada con el resto de reference tokens del sistema.

Aunque los tokens originales utilizaban radios relativamente amplios (`16px`, `24px`, `32px`), probablemente alineados con una dirección visual más “soft” y contemporánea, también se han incorporado tamaños más reducidos como `6px`, presentes en determinados elementos del diseño original (`buttons`), para cubrir componentes funcionales de menor escala.

### Shadow Tokens

El sistema original ya incorporaba una pequeña serie de tokens orientados a definir elevaciones visuales reutilizables mediante `box-shadow`.

He optado por mantener la geometría original de las sombras (`0 10px 20px`) y una escala deliberadamente reducida, evitando introducir niveles adicionales de elevación que añadirían complejidad innecesaria al sistema.

En este sentido, la principal diferencia entre los distintos shadow tokens no reside tanto en el tamaño o difusión de la sombra, sino en la intensidad visual generada mediante distintos niveles de transparencia (ej: `0.1` , `0.2`).

Además, he decidido definir las sombras utilizando el formato `oklch()` para mantener coherencia cromática con el resto del sistema de color y evitar sombras neutras excesivamente grisáceas o desconectadas de la paleta general de la interfaz.

La nomenclatura también ha sido actualizada hacia una convención más consistente con el resto de reference tokens del sistema.

```css
/* Before */
--shadow-l: 0px 10px 20px 0px #38364133;

/* After */
--ref-shadow-md: 0 10px 20px 0 oklch(0.3393 0.0192 293.69 / 0.2);
```

### Container Strategy

El sistema original ya incluía una pequeña serie de tokens orientados a definir restricciones de anchura máxima para distintos contextos de layout y composición.

```css
/* Before */
--container-medium: 880px;

/* After */
--ref-container-md: 880px;
```

He optado por mantener esta aproximación, actualizando únicamente la nomenclatura neutral hacia una convención más consistente con el resto de reference tokens del sistema.

Estos tokens representan restricciones reutilizables de composición que posteriormente pueden ser consumidas por distintas capas del sistema (`sections`, wrappers, grids o componentes) según las necesidades de cada contexto.

Los valores se han mantenido en `px` al considerar que representan restricciones estructurales de layout y no escalas tipográficas. Esto permite preservar una composición horizontal más estable y predecible independientemente de posibles cambios en el `font-size` raíz del navegador.

Por otro lado, he optado deliberadamente por mantener una **escala de containers relativamente reducida** para evitar introducir una granularidad excesiva que añadiría complejidad prematura al sistema.

## Responsive Strategy

### Breakpoints

Los breakpoints originales estaban definidos principalmente siguiendo una aproximación _“device-oriented”_, tomando como referencia resoluciones concretas de dispositivos (ej: `375px => iPhone`) o convenciones responsive históricas ampliamente utilizadas (ej: `992px => tablets`).

Con el objetivo de evitar que la estrategia responsive dependiera directamente de tamaños de pantalla específicos, he decidido refactorizar el sistema hacia una escala de breakpoints orientada a representar zonas intermedias alejadas de las resoluciones reales más frecuentes o _“dead-zones”_, permitiendo así agrupar dispositivos similares bajo un mismo comportamiento responsive y reduciendo la necesidad de introducir adaptaciones específicas para resoluciones muy próximas entre sí.

```css
/* Before */
--breakpoint-xs: 375px;
/* After */
--ref-breakpoint-sm: 576px;

/* Before */
--breakpoint-m: 992px;
/* After */
--ref-breakpoint-lg: 1024px;
```

Para ello, he tomado como referencia la distribución actual de resoluciones más comunes publicada por [Screen Resolution Stats](https://gs.statcounter.com/screen-resolution-stats), donde puede observarse cómo las resoluciones tienden a agruparse en distintas franjas naturales `(mobile, tablet, laptop, desktop, etc.)` en lugar de distribuirse de forma uniforme.

Bajo esta lógica, por ejemplo, `375px` no debería actuar necesariamente como breakpoint, ya que se encuentra literalmente en el centro del cluster móvil más habitual.

> [!TIP]
> Se ha tenido en cuenta tanto las estadísticas globales (_worldwide_) como las correspondientes a España (_Spain_), observándose una distribución de resoluciones muy similar en ambos casos.
> Esto ayudó a validar que la escala propuesta resultara coherente tanto con tendencias globales como con el posible público objetivo y contexto de uso de la aplicación.

Considero que esta propuesta de escala intenta situarse en un punto intermedio razonable entre el concepto de `dead-zones`, la familiaridad con convenciones ampliamente utilizadas por el ecosistema frontend actual y la mantenibilidad del sistema a largo plazo.

Los breakpoints se han definido en `px` al considerar que representan puntos de transición estructurales del layout y no escalas tipográficas, permitiendo mantener un comportamiento responsive más estable y predecible independientemente de posibles cambios en el `font-size` raíz del navegador.

La nomenclatura de los breakpoints también ha sido actualizada para alinearla con convenciones ampliamente adoptadas por sistemas modernos como Tailwind CSS (`sm`, `md`, `lg`, `xl`, `2xl`...), favoreciendo una mayor familiaridad y consistencia con el ecosistema frontend actual.

En cualquier caso, aunque resulta recomendable disponer de un conjunto reducido y consistente de breakpoints de referencia, esto no impide que en determinados escenarios puedan surgir `edge-cases`, puntos de corte más específicos asociados a necesidades concretas del diseño o al comportamiento particular de ciertos componentes.

### Mobile First

Aunque el diseño proporcionado en Figma únicamente incluye la versión desktop, los componentes han sido implementados siguiendo una aproximación responsive **mobile-first**.

Más allá de responder únicamente al dispositivo predominante desde el que acceden los usuarios, hoy en día considero el enfoque mobile-first principalmente como una estrategia de arquitectura responsive y _progressive enhancement_, donde los estilos base representan el estado más universal y limitado de los componentes, añadiendo progresivamente mejoras conforme aumenta el espacio disponible.

Esta aproximación favorece una cascada CSS más simple y predecible, reduce la necesidad de sobrescribir estilos complejos entre breakpoints y facilita la construcción de interfaces más mantenibles, escalables y resilientes a largo plazo.

### Container Queries & Media Queries

Aunque el sistema mantiene una escala de breakpoints globales basada en _media queries_ para decisiones estructurales de layout, considero que en arquitecturas frontend modernas orientadas a componentes las _container queries_ representan una aproximación especialmente interesante para adaptar componentes reutilizables en función de su contexto real de renderizado y no únicamente del viewport global.

A diferencia de las media queries tradicionales, que responden al _viewport_ (tamaño total de la ventana gráfica), las _container queries_ permiten que un componente adapte su comportamiento en función del tamaño de su contenedor padre.

En sistemas basados en componentes, un mismo elemento puede reutilizarse en contextos de layout muy distintos (`sidebar`, `grid`, `modal`, `hero`, etc.), donde el espacio disponible no siempre guarda una relación directa con el tamaño total del _viewport_. En este sentido, las _container queries_ favorecen la construcción de componentes más autónomos, flexibles y desacoplados de su contexto específico de composición o layout.

### Responsive Typography

En lugar de basar toda la estrategia tipográfica exclusivamente en breakpoints rígidos mediante media queries, he optado por una aproximación híbrida donde determinados system typography tokens pueden incorporar comportamiento responsive y fluid typography mediante `clamp()` cuando resulta realmente beneficioso para el contexto visual del componente.

Considero que en sistemas de diseño modernos orientados a componentes no toda la tipografía necesita comportarse de forma completamente fluida.

> [!TIP]
> Aunque `clamp()` y fluid typography resultan especialmente útiles en determinados contextos expresivos (`hero`, `display`, `marketing`, etc.), considero importante evitar convertirlos en una solución universal aplicada indiscriminadamente a toda la interfaz.
>
> En muchos componentes UI, una escala tipográfica más estable y predecible suele favorecer mejor la legibilidad, consistencia visual y mantenibilidad del sistema.

En este sentido, `clamp()` no se plantea únicamente como un recurso para generar escalados fluidos, sino también como una herramienta que permite reducir la necesidad de múltiples ajustes tipográficos específicos mediante media queries, simplificando progresivamente la estrategia responsive del sistema.

Ejemplo:

```css id="jlwm347"
/* reference-tokens.css */
:root {
  --ref-font-size-500: 1.25rem;
  --ref-font-size-700: 1.5rem;
}

/* system-tokens.css */
:root {
  --sys-typography-heading-md-size: clamp(var(--ref-font-size-500), 1rem + 0.8vw, var(--ref-font-size-700));
}

/* component-tokens.css */
:root {
  --cmp-card-title-fs: var(--sys-typography-heading-md-size);
}

/* card.css */
.card__title {
  font-size: var(--cmp-card-title-fs);
}
```

```jsx
/* Card.jsx */
export const Card = ({ title, as: Tag = 'div', ...rest }) => {
  return (
    <Tag className="card" {...rest}>
      <h2 className="card__title">{title}</h2>
    </Tag>
  );
};
```

## Layering Strategy

En lugar de utilizar valores arbitrarios de `z-index` directamente dentro de los componentes, se ha definido una pequeña estrategia de layering basada en tokens reutilizables.

Siguiendo la misma arquitectura de tokens utilizada en el resto del sistema, los valores de `z-index` se organizan en distintas capas desacopladas:

- Los **reference tokens** representan únicamente valores numéricos neutrales reutilizables.
- Los **system tokens** encapsulan posteriormente las decisiones reales de layering del sistema (`header`, `dropdown`, `modal`, `tooltip`, etc.).

```css
/* reference-tokens.css */
:root {
  --ref-z-index-200: 200;
}
```

```css
/* system-tokens.css */
:root {
  --sys-z-index-header: var(--ref-z-index-200);
}
```

Esta aproximación permite evitar la clásica “inflación de z-index”, donde distintos componentes terminan compitiendo mediante valores progresivamente más altos (`999`, `9999`, etc.), favoreciendo una jerarquía de capas más consistente y mantenible.

Por otro lado, en arquitecturas frontend contemporáneas orientadas a componentes, muchos problemas relacionados con `z-index` no provienen únicamente del valor numérico utilizado, sino de la **interacción entre distintos stacking contexts** generados dentro de la aplicación.

> [!WARNING]
> Algunos stacking contexts pueden generarse de forma implícita mediante propiedades como `transform`, `opacity`, `filter` o determinados contextos de posicionamiento, alterando el comportamiento esperado de `z-index` dentro de la interfaz.

Por este motivo, además de la escala de layering tokens, el sistema incorpora `isolation: isolate` sobre los contenedores raíz habituales en aplicaciones React y Next.js (`#root`, `#\_\_next`) siguiendo la aproximación propuesta por Josh Comeau:

```css
/* reset.css */
#root,
#__next {
  isolation: isolate;
}
```

Esta propiedad permite crear un **_root stacking context_** para la aplicación, ayudando a encapsular el comportamiento de layering dentro del árbol principal de la UI y reduciendo posibles conflictos entre componentes reutilizados en distintos contextos de composición o layout.

Desde esta perspectiva, `isolation: isolate` no sustituye a la estrategia de `z-index` tokens, sino que la complementa:

- Los tokens definen la jerarquía global de capas del sistema.
- `isolation: isolate` ayuda a encapsular y hacer más predecible el comportamiento interno de stacking entre componentes.

Esta combinación favorece arquitecturas de layering más robustas, desacopladas y escalables a largo plazo.

## Motion Strategy

Aunque el alcance de esta prueba no requería una estrategia avanzada de motion, considero que las animaciones y transiciones forman parte de la experiencia del sistema y no únicamente de una capa estética.

Por este motivo, cualquier uso de motion dentro de los componentes se ha planteado desde un enfoque funcional y discreto, priorizando:

- feedback visual,
- continuidad entre estados,
- percepción de jerarquía,
- y claridad de interacción.

En este sentido, las transiciones se han mantenido deliberadamente ligeras y contenidas, evitando animaciones excesivamente complejas que puedan introducir ruido visual o afectar negativamente a la experiencia de uso.

Además, el sistema contempla compatibilidad con `prefers-reduced-motion` como parte de una estrategia progresiva de accesibilidad y progressive enhancement.

## Accessibility Considerations

Aunque el alcance de la prueba no permitía desarrollar una auditoría completa de accesibilidad, muchas de las decisiones arquitectónicas del sistema se han planteado teniendo en cuenta principios básicos de accesibilidad y progressive enhancement desde el inicio.

Esto incluye aspectos como:

- uso de HTML semántico,
- jerarquía tipográfica consistente,
- focus states visibles,
- estrategias responsive compatibles con zoom y aumento de tamaño del texto,
- compatibilidad con `prefers-reduced-motion`,
- contraste suficiente,
- relaciones semánticas claras entre elementos interactivos y contenido accesible (ej: asociaciones `label/input`, estados accesibles mediante `aria-expanded`, `aria-controls`, descripciones contextuales `aria-describedby` o contenido alternativo `alt` en imágenes),
- uso de atributos `aria-*` cuando resultaban necesarios para mejorar la semántica o interacción de determinados componentes.

Además, varias de las decisiones documentadas a lo largo del README (spacing, fluid typography, container queries, line-height unitless, etc.) también han sido planteadas considerando su impacto potencial sobre legibilidad, mantenibilidad y experiencia de uso.

Además de los aspectos puramente relacionados con accesibilidad, varias de estas decisiones también contribuyen indirectamente a mejorar la semántica general de la interfaz y determinados aspectos de **_SEO_** técnico, especialmente aquellos relacionados con estructura semántica, legibilidad del contenido, comportamiento responsive y performance.

## Testing Strategy

Los componentes de la librería se han planteado con una estrategia básica de component testing, centrada en validar comportamiento, accesibilidad y renderizado esperado desde la perspectiva del usuario.

En lugar de comprobar detalles internos de implementación, los tests deberían priorizar queries accesibles (`getByRole`, `getByLabelText`, etc.) y casos de uso reales del componente.

Esto permite asegurar que los componentes reutilizables mantienen un comportamiento predecible a medida que evolucionan sus props, variantes o estados.

---

## Tradeoffs

Dado el alcance limitado de la prueba, algunas decisiones se han simplificado deliberadamente para priorizar claridad arquitectónica y mantenibilidad frente a una implementación excesivamente compleja.

Por ejemplo:

- La escala de tokens se ha mantenido deliberadamente contenida para evitar introducir granularidad y complejidad innecesarias de forma prematura (ej: `containers`, `shadows`, `font-family`).
- Algunas aproximaciones modernas como `container queries` o `fluid typography` se han aplicado de forma selectiva, evitando extenderlas indiscriminadamente a todo el sistema.
- Se valoró el uso de `@scope` para encapsular determinados estilos de composición de la landing, pero se priorizó una arquitectura más simple basada en cascade layers (`@layer`), estilos encapsulados por componente en Stencil y CSS custom properties para theming.
- Aunque inicialmente se valoró incorporar fallbacks adicionales de compatibilidad `@supports` para determinadas características modernas de CSS como `oklch()`, finalmente se optó por priorizar una implementación más simple y alineada con el soporte actual de navegadores modernos ([OKLCH support](https://caniuse.com/?search=oklch)).

Considero que el soporte actual de `oklch()` en navegadores modernos resulta **suficientemente sólido** como para incorporarlo progresivamente en sistemas frontend contemporáneos, especialmente en entornos donde no existen fuertes requisitos de compatibilidad legacy.

En general, he intentado priorizar aquellas decisiones que consideraba más relevantes para construir una base sólida, coherente y escalable, evitando introducir complejidad o niveles de abstracción innecesarios para el contexto actual de la prueba.

---

## Future Improvements

En un contexto real de evolución del sistema, algunos aspectos que podrían desarrollarse más adelante serían:

- Estrategia completa de theming (`light/dark mode`, `brand themes`).
- Definición de motion tokens reutilizables.
- Estrategias de internacionalización (`i18n`).
- Mayor adopción progresiva de `container queries`.
- Evolución hacia pipelines automatizados de design tokens con herramientas como [Style Dictionary](https://styledictionary.com/) en escenarios multi-brand o multi-platform.
- Auditorías de accesibilidad ([axe-core](https://www.deque.com/axe/)) y performance más exhaustivas ([WebPageTest](https://www.webpagetest.org/)).
- Integración progresiva de visual regression testing ([Chromatic](https://www.chromatic.com/)) y end-to-end testing ([Playwright](https://playwright.dev/)).
- Integración de herramientas de monitoring y runtime error tracking mediante plataformas como [Sentry](https://sentry.io/).
- Automatización de análisis estático y métricas de calidad mediante herramientas como [SonarQube](https://www.sonarsource.com/es/products/sonarqube/).
