# Accessibility

## Overview

La accesibilidad se ha considerado desde el inicio como parte de la arquitectura del sistema, no como una capa añadida al final.

Aunque el alcance de esta iteración no incluye una auditoría completa, varias decisiones de componentes, tokens, HTML y CSS se han planteado siguiendo principios básicos de accesibilidad y progressive enhancement.

El objetivo es construir componentes reutilizables que sean:

- semánticamente claros,
- robustos en distintos contextos,
- compatibles con tecnologías asistivas,
- y respetuosos con las preferencias del usuario.

---

# Semantic HTML

Siempre que sea posible, la interfaz debe apoyarse primero en HTML semántico nativo.

Esto implica priorizar elementos como:

```html
<button>
  <a>
    <nav>
      <header>main> section> label> input></header>
    </nav></a
  >
</button>
```

antes de recurrir a roles personalizados o atributos ARIA.

La regla general es:

```txt
HTML semántico primero.
ARIA solo cuando aporta semántica que HTML no puede expresar por sí mismo.
```

ARIA puede mejorar la accesibilidad cuando se usa correctamente, pero también puede introducir confusión si se usa de forma innecesaria o incorrecta.

---

# Icon Accessibility

El componente `opo-icon` distingue entre dos casos principales:

- iconos decorativos,
- iconos con significado propio.

---

## Decorative Icons

Por defecto, si no se proporciona una etiqueta accesible, el icono se considera decorativo.

En ese caso, el componente aplica:

```html
aria-hidden="true"
```

Esto evita que tecnologías asistivas anuncien iconos que no aportan información adicional.

Ejemplo:

```html
<opo-button>
  <opo-icon name="check"></opo-icon>
  Guardar
</opo-button>
```

En este caso, el texto visible `Guardar` ya comunica la acción. El icono no necesita ser anunciado.

---

## Meaningful Icons

Cuando el icono transmite significado por sí mismo, debe proporcionarse una etiqueta accesible mediante `ariaLabel`.

Ejemplo:

```html
<opo-icon name="trash-2" aria-label="Eliminar elemento"></opo-icon>
```

En este caso, el componente renderiza el icono con:

```html
role="img" aria-label="Eliminar elemento"
```

De esta forma, el icono puede ser anunciado correctamente por tecnologías asistivas.

---

# ariaLabel Strategy

La prop `ariaLabel` se utiliza para diferenciar entre:

```txt
decorative icon → aria-hidden="true"
meaningful icon → role="img" + aria-label
```

Esta estrategia evita exponer iconos decorativos al árbol accesible, pero permite etiquetar aquellos que sí transmiten información.

La intención es mantener una API explícita y sencilla:

```html
<!-- Decorative -->
<opo-icon name="star"></opo-icon>

<!-- Meaningful -->
<opo-icon name="warning" aria-label="Advertencia"></opo-icon>
```

---

# Avoiding Redundant Labels

No todos los iconos necesitan `aria-label`.

Si un icono aparece junto a texto visible que ya comunica su significado, normalmente debe tratarse como decorativo.

Ejemplo:

```html
<button>
  <opo-icon name="search"></opo-icon>
  Buscar
</button>
```

Aquí el texto `Buscar` ya proporciona el nombre accesible del botón.

Añadir `aria-label="Buscar"` al icono podría generar una experiencia redundante para lectores de pantalla.

---

# Icon-Only Controls

Cuando un icono se utiliza dentro de un control sin texto visible, el nombre accesible debe vivir en el control interactivo, no necesariamente en el icono.

Ejemplo recomendado:

```html
<opo-button variant="ghost" size="icon" aria-label="Buscar">
  <opo-icon name="search"></opo-icon>
</opo-button>
```

En este caso:

- el botón recibe el nombre accesible,
- el icono sigue siendo decorativo,
- y la interacción queda correctamente descrita.

---

# currentColor Inheritance

Los iconos heredan color mediante:

```css
currentColor
```

Esto permite que el color del icono venga definido por el contexto donde se utiliza.

Ejemplo:

```css
.opo-button {
  color: var(--sys-color-on-action-primary);
}
```

```html
<opo-button>
  <opo-icon name="check"></opo-icon>
  Guardar
</opo-button>
```

El icono hereda automáticamente el color del botón.

Esta estrategia aporta varias ventajas:

- reduce props visuales innecesarias,
- mantiene consistencia entre texto e iconos,
- favorece theming,
- y evita valores hardcodeados como `white` o `#fff`.

---

# Color and Contrast

Aunque los iconos puedan heredar color del contexto, el contraste final debe validarse en el componente o superficie donde se usan.

La responsabilidad del contraste no recae únicamente en `opo-icon`, sino en la composición final:

```txt
icon color + background color + context
```

Por ejemplo, un icono `warning` puede ser correcto en un fondo claro, pero necesitar otro tratamiento si se usa sobre una superficie oscura.

---

# Motion Accessibility

El sistema contempla `prefers-reduced-motion` para reducir animaciones no esenciales cuando el usuario así lo solicita desde el sistema operativo.

Ejemplo:

```css
@media (prefers-reduced-motion: reduce) {
  .opo-icon--spin {
    animation: none;
  }
}
```

Esto es especialmente importante en animaciones continuas como spinners, loaders o transiciones decorativas.

La regla general es:

```txt
Motion funcional, sí.
Motion imprescindible, con cuidado.
Motion decorativa, reducible.
```

---

# Focus and Keyboard Interaction

Los componentes interactivos deben ser accesibles mediante teclado y mostrar estados de foco visibles.

Aunque `opo-icon` no es interactivo por sí mismo, suele utilizarse dentro de componentes que sí lo son, como:

- botones,
- links,
- menús,
- dropdowns,
- tabs,
- toolbars.

La responsabilidad del foco debe vivir en el elemento interactivo, no en el icono decorativo.

Por ejemplo:

```html
<button>
  <opo-icon name="settings"></opo-icon>
  Configuración
</button>
```

El foco debe recaer sobre el botón, no sobre el icono.

---

# SVG Focus Behavior

Los SVG internos del componente se renderizan con:

```html
focusable="false"
```

Esto ayuda a evitar que el SVG pueda recibir foco accidentalmente en ciertos navegadores o entornos, especialmente cuando se usa dentro de controles interactivos.

---

# Custom SVG Slot

`opo-icon` permite proporcionar un SVG personalizado mediante slot:

```html
<opo-icon aria-label="Icono personalizado">
  <svg slot="icon" viewBox="0 0 24 24">...</svg>
</opo-icon>
```

Este patrón está pensado principalmente para contenido estático.

Cuando se usa un SVG custom, se mantienen las mismas reglas generales:

- si es decorativo, no necesita etiqueta accesible,
- si comunica significado, debe proporcionarse `aria-label`,
- el SVG debería estar correctamente dimensionado,
- y debería respetar `currentColor` si forma parte de la interfaz.

---

# Progressive Enhancement

Varias decisiones del sistema se han planteado como mejoras progresivas:

- `prefers-reduced-motion`,
- `currentColor`,
- `focusable="false"` en SVG,
- HTML semántico,
- line-height unitless,
- y tokens reutilizables para estados visuales.

La idea es que la interfaz funcione de forma robusta incluso si ciertas mejoras visuales o de motion no están disponibles.

---

# Current Scope

En esta iteración, la accesibilidad se ha abordado a nivel de foundations y componentes básicos.

Se han priorizado:

- semántica clara,
- iconos decorativos correctamente ocultos,
- soporte para iconos con etiqueta accesible,
- herencia de color mediante `currentColor`,
- reducción de motion no esencial,
- y buenas prácticas básicas de HTML.

No se ha realizado una auditoría completa de accesibilidad automatizada o manual.

---

# Future Improvements

Posibles mejoras futuras:

- auditoría con `axe-core`,
- pruebas manuales con lector de pantalla,
- validación sistemática de contraste,
- testing de navegación por teclado,
- documentación por componente de patrones ARIA,
- focus management para overlays y modales,
- y revisión de accesibilidad en estados responsive.
