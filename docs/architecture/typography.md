# Typography

## Overview

La estrategia tipográfica del sistema se ha planteado como una capa reutilizable dentro de la arquitectura de Design Tokens.

El objetivo principal es desacoplar los valores tipográficos base de su contexto de uso, evitando que la tipografía quede demasiado ligada a nombres de dispositivo, breakpoint o componente concreto.

La estructura general sigue esta lógica:

```txt
reference typography tokens
        ↓
system typography tokens
        ↓
component styles
```

---

## Font Family

El sistema utiliza `IBM Plex Sans` como tipografía principal, acompañada de una fallback stack más robusta:

```css
--ref-font-family-sans: "IBM Plex Sans", system-ui, sans-serif;
```

La inclusión de `system-ui` permite que, si la fuente principal no está disponible o todavía no ha terminado de cargar, el navegador utilice automáticamente la tipografía nativa del sistema operativo.

Esto mejora:

- el comportamiento de carga,
- la coherencia visual entre plataformas,
- y la experiencia percibida por el usuario.

Ejemplos de fuentes utilizadas por `system-ui`:

- SF Pro en macOS/iOS,
- Segoe UI en Windows,
- Roboto en Android.

---

## Font Size Strategy

La escala tipográfica original estaba acoplada a contexto visual y viewport, con nombres como:

```css
--font-size-desktop-xs
```

Para hacerla más reutilizable, se ha refactorizado hacia una escala neutral de reference tokens:

```css
--ref-font-size-100
--ref-font-size-200
--ref-font-size-300
--ref-font-size-400
--ref-font-size-500
--ref-font-size-600
--ref-font-size-700
--ref-font-size-800
--ref-font-size-900
--ref-font-size-1000
```

Ejemplo:

```css
--ref-font-size-300: 1rem; /* 16px */
--ref-font-size-700: 1.5rem; /* 24px */
```

Esta nomenclatura:

- elimina referencias directas a dispositivos,
- evita acoplar valores a un contexto visual concreto,
- facilita la reutilización,
- y permite evolucionar la escala sin renombrar tokens constantemente.

Los reference font-size tokens representan únicamente valores tipográficos reutilizables. No deberían expresar intención final de uso.

---

## System Typography Tokens

Sobre los reference tokens puede construirse una capa semántica de system tokens.

Ejemplo:

```css
--sys-typography-body-size: var(--ref-font-size-300);
--sys-typography-heading-size: var(--ref-font-size-700);
```

Esta capa expresa decisiones reutilizables del sistema.

Por ejemplo:

```css
--sys-typography-body-size
```

representa una decisión de uso tipográfico más clara que:

```css
--ref-font-size-300
```

En un sistema más maduro, esta capa podría evolucionar hacia una escala tipográfica más completa:

```css
--sys-typography-body-sm-size
--sys-typography-body-md-size
--sys-typography-heading-sm-size
--sys-typography-heading-md-size
--sys-typography-heading-lg-size
```

En esta iteración, la semántica tipográfica se mantiene deliberadamente contenida para evitar una abstracción prematura.

---

## Line Height

Los tokens de `line-height` se han definido como valores unitless.

Ejemplo:

```css
--ref-line-height-base: 1.5;
```

Esto significa que el `line-height` se calcula proporcionalmente respecto al `font-size` actual del elemento.

Por ejemplo:

```css
font-size: 16px;
line-height: 1.5;
```

equivale a:

```txt
24px
```

La ventaja de usar valores unitless es que escalan mejor con el tamaño de fuente del propio elemento, en lugar de depender de una medida absoluta en `px` o `rem`.

Esto mejora:

- flexibilidad,
- herencia tipográfica,
- compatibilidad con fluid typography,
- y mantenibilidad en componentes reutilizables.

---

## Line Height Scale

La escala propuesta representa diferentes densidades tipográficas:

```css
--ref-line-height-none: 1;
--ref-line-height-tight: 1.2;
--ref-line-height-snug: 1.25;
--ref-line-height-normal: 1.4;
--ref-line-height-base: 1.5;
--ref-line-height-relaxed: 1.625;
--ref-line-height-loose: 1.8;
```

Cada valor responde a una intención visual distinta:

- `none`: casos específicos sin espacio adicional, como iconos.
- `tight`: títulos grandes.
- `snug`: headings estándar.
- `normal`: texto compacto.
- `base`: texto de lectura general.
- `relaxed`: lectura más cómoda.
- `loose`: bloques de texto más espaciosos.

---

## Font Weights

La escala de pesos tipográficos se mantiene deliberadamente reducida:

```css
--ref-font-weight-regular: 400;
--ref-font-weight-medium: 500;
--ref-font-weight-semibold: 600;
--ref-font-weight-bold: 700;
```

Aunque `IBM Plex Sans` dispone de una gama más amplia de pesos, limitar la escala ayuda a mantener:

- jerarquía visual más clara,
- menor complejidad,
- consistencia entre componentes,
- y una interfaz menos fragmentada.

Una escala demasiado granular de pesos puede añadir ruido visual sin aportar necesariamente más claridad.

---

## Letter Spacing

El sistema incorpora una pequeña escala de `letter-spacing`:

```css
--ref-letter-spacing-tighter: -0.04em;
--ref-letter-spacing-tight: -0.02em;
--ref-letter-spacing-normal: 0;
--ref-letter-spacing-wide: 0.02em;
--ref-letter-spacing-wider: 0.04em;
--ref-letter-spacing-widest: 0.06em;
```

Los valores se definen en `em` para que escalen proporcionalmente con el tamaño de fuente actual.

Esto permite que el tracking mantenga una relación más natural con la escala tipográfica.

---

## Fluid Typography

La fluid typography puede ser útil en contextos expresivos como:

- hero sections,
- headings principales,
- marketing pages,
- composiciones editoriales.

Sin embargo, no toda la tipografía de una interfaz necesita ser fluida.

En componentes UI más funcionales, una escala estable suele favorecer:

- legibilidad,
- previsibilidad,
- consistencia,
- y menor complejidad.

Por este motivo, la estrategia propuesta es híbrida: usar fluid typography solo cuando aporte valor real.

---

## Clamp Strategy

`clamp()` permite definir tamaños fluidos con límites mínimo y máximo.

Ejemplo:

```css
--sys-typography-heading-md-size: clamp(
  var(--ref-font-size-500),
  1rem + 0.8vw,
  var(--ref-font-size-700)
);
```

Este patrón permite que el tamaño tipográfico crezca progresivamente con el viewport, sin exceder unos límites controlados.

Esto puede ayudar a reducir media queries específicas para ciertos textos expresivos.

---

## Responsive Typography

La tipografía responsive no se plantea como una regla universal aplicada a toda la interfaz.

En su lugar, se recomienda decidir caso por caso:

```txt
UI text → escala estable
Marketing/display text → posible escala fluida
Long-form reading → line-height y ancho de línea controlados
```

Esta aproximación evita convertir `clamp()` en una solución indiscriminada.

El objetivo no es que todo sea fluido, sino que la tipografía responda mejor cuando el contexto visual lo justifique.

---

## Current Scope

En esta iteración, la estrategia tipográfica se centra en:

- crear una base de reference tokens reutilizables,
- mejorar la nomenclatura,
- introducir line-height unitless,
- añadir una pequeña escala de letter-spacing,
- y dejar abierta la posibilidad de fluid typography sin formalizarla en exceso.

No se ha intentado cerrar una escala tipográfica semántica definitiva.

En un entorno real, esta capa debería evolucionar junto con diseño, producto y necesidades reales de componentes.

---

## Future Improvements

Posibles mejoras futuras:

- definir una escala completa de system typography tokens,
- documentar estilos tipográficos por rol,
- incorporar fluid typography en headings específicos,
- validar la escala tipográfica con contenido real,
- revisar contraste y legibilidad en distintos tamaños,
- y sincronizar tokens tipográficos con Figma.
