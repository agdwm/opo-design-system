# Layering & Motion

## Overview

La estrategia de layering y motion del sistema se ha planteado con el objetivo de:

- mantener una jerarquía visual predecible,
- evitar conflictos entre componentes reutilizables,
- y reducir comportamientos inesperados relacionados con stacking contexts o animaciones excesivamente complejas.

Aunque el alcance de esta iteración no requería una arquitectura avanzada de overlays o motion, se han definido algunas foundations reutilizables para facilitar una evolución más consistente del sistema.

---

# Z-Index Strategy

En lugar de utilizar valores arbitrarios directamente dentro de los componentes:

```css
z-index: 9999;
```

el sistema utiliza una pequeña escala de layering basada en tokens reutilizables.

La estrategia sigue la misma arquitectura de capas utilizada en el resto de Design Tokens:

```txt
reference tokens
        ↓
system tokens
        ↓
component styles
```

---

## Reference Z-Index Tokens

Los reference tokens contienen únicamente valores numéricos reutilizables:

```css
--ref-z-index-0: 0;
--ref-z-index-100: 100;
--ref-z-index-200: 200;
--ref-z-index-300: 300;
--ref-z-index-400: 400;
--ref-z-index-500: 500;
--ref-z-index-600: 600;
--ref-z-index-700: 700;
```

Estos valores no expresan todavía intención visual.

---

## System Z-Index Tokens

Los system tokens representan decisiones reales de layering dentro de la interfaz:

```css
--sys-z-index-header
--sys-z-index-dropdown
--sys-z-index-overlay
--sys-z-index-modal
--sys-z-index-toast
--sys-z-index-tooltip
```

Ejemplo:

```css
--sys-z-index-modal: var(--ref-z-index-500);
```

Esto permite desacoplar:

- el valor numérico,
- de la intención visual del sistema.

---

# Why Tokenized Layering?

La estrategia busca evitar la clásica “inflación de z-index”:

```css
z-index: 999;
z-index: 9999;
z-index: 99999;
```

que suele aparecer cuando distintos componentes comienzan a competir entre sí sin una jerarquía clara.

Centralizar el layering mediante tokens favorece:

- consistencia,
- mantenibilidad,
- previsibilidad,
- y mejor escalabilidad del sistema.

---

# Stacking Contexts

Muchos problemas relacionados con `z-index` no provienen realmente del valor numérico utilizado, sino de la creación accidental de nuevos stacking contexts.

Algunas propiedades que generan stacking contexts automáticamente:

```css
transform
opacity
filter
position + z-index
mix-blend-mode
isolation
```

Esto puede provocar que un elemento con:

```css
z-index: 9999;
```

siga apareciendo visualmente por debajo de otro componente si ambos pertenecen a stacking contexts distintos.

---

# isolation:isolate

Para ayudar a encapsular la jerarquía visual de la aplicación, el sistema incorpora:

```css
#root,
#__next {
  isolation: isolate;
}
```

siguiendo una aproximación inspirada en Josh Comeau.

---

## Why isolation:isolate?

`isolation: isolate` crea un root stacking context para la aplicación.

Esto ayuda a:

- encapsular overlays y capas dentro del árbol principal,
- reducir conflictos entre componentes reutilizados,
- y hacer más predecible el comportamiento del layering.

---

## Relationship with Z-Index Tokens

`isolation: isolate` no sustituye la estrategia de z-index.

Ambas capas se complementan:

```txt
z-index tokens
→ definen jerarquía visual

isolation:isolate
→ encapsula stacking contexts
```

La combinación de ambas favorece una arquitectura de layering más robusta.

---

# Motion Philosophy

Aunque el alcance de esta iteración no requería una estrategia avanzada de motion, las animaciones y transiciones se han planteado desde una perspectiva funcional y discreta.

La intención principal es mejorar:

- feedback visual,
- continuidad entre estados,
- claridad de interacción,
- y percepción de jerarquía.

No se busca utilizar motion como elemento puramente decorativo.

---

# Motion Scale

El sistema incorpora una pequeña escala de motion durations reutilizables:

```css
--ref-motion-duration-fast
--ref-motion-duration-base
--ref-motion-duration-slow
--ref-motion-duration-slower
```

Ejemplo:

```css
--ref-motion-duration-fast: 150ms;
--ref-motion-duration-base: 250ms;
--ref-motion-duration-slow: 400ms;
--ref-motion-duration-slower: 1000ms;
```

La escala cubre:

- feedback rápido,
- transiciones estándar,
- transiciones más expresivas,
- y motion continua o en loop.

---

# Motion Tokens

En esta iteración, las motion durations se mantienen principalmente como foundation tokens reutilizables.

Se ha evitado introducir demasiados system motion tokens específicos prematuramente:

```css
--sys-motion-duration-spinner
```

salvo cuando exista una necesidad semántica realmente consolidada.

La intención es evitar sobre-abstracción innecesaria.

---

# Continuous Motion

Animaciones continuas como spinners utilizan duraciones más lentas:

```css
animation: icon-spin var(--ref-motion-duration-slower) linear infinite;
```

Este tipo de motion pertenece a una categoría distinta de las transiciones rápidas de UI y suele requerir tiempos más largos para resultar visualmente cómodos.

---

# prefers-reduced-motion

El sistema contempla compatibilidad con:

```css
prefers-reduced-motion
```

como parte de una estrategia progresiva de accesibilidad y progressive enhancement.

Ejemplo:

```css
@media (prefers-reduced-motion: reduce) {
  .opo-icon--spin {
    animation: none;
  }
}
```

La intención es reducir motion no esencial cuando el usuario así lo solicita desde el sistema operativo.

---

# Motion Principles

La estrategia general intenta mantener:

- transiciones ligeras,
- duraciones contenidas,
- easing predecible,
- y motion funcional.

En general, se evita:

- animación excesivamente compleja,
- motion puramente decorativa,
- y transiciones demasiado agresivas o distractoras.

---

# Current Scope

En esta iteración, la estrategia de layering y motion se mantiene deliberadamente contenida.

El objetivo principal es:

- establecer foundations reutilizables,
- evitar conflictos de stacking,
- introducir una escala básica de motion,
- y mantener una experiencia visual coherente.

No se ha intentado construir todavía una arquitectura completa de overlays, portals o motion choreography.

---

# Future Improvements

Posibles evoluciones futuras:

- semantic motion tokens,
- easing tokens reutilizables,
- overlay manager centralizado,
- animation presets,
- visual regression de overlays,
- motion choreography entre componentes,
- y estrategias más avanzadas de focus management y layering para modales complejos.
