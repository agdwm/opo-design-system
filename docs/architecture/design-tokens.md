# Design Tokens

## Overview

El sistema de tokens se organiza en capas para separar:

- valores primitivos reutilizables,
- decisiones semánticas del sistema,
- y adaptaciones específicas de componentes.

La intención es evitar que los componentes dependan directamente de valores visuales crudos y facilitar una evolución más ordenada del sistema.

```txt
reference tokens
        ↓
system tokens
        ↓
component tokens
        ↓
component styles
```

---

## Token Architecture

| Nivel     | Prefijo  | Propósito                            | Ejemplo                    |
| --------- | -------- | ------------------------------------ | -------------------------- |
| Reference | `--ref-` | Valores primitivos base              | `--ref-color-amber-500`    |
| System    | `--sys-` | Decisiones reutilizables del sistema | `--sys-color-text-primary` |
| Component | `--cmp-` | Adaptación específica de componente  | `--cmp-button-background`  |

---

## Reference Tokens

Los reference tokens contienen valores base del sistema.

No representan intención de uso ni contexto semántico. Son primitives reutilizables.

Ejemplos:

```css
--ref-color-amber-500
--ref-spacing-400
--ref-radius-md
--ref-shadow-sm
--ref-motion-duration-fast
```

Su función es proporcionar una base estable sobre la que construir decisiones semánticas.

---

## System Tokens

Los system tokens expresan decisiones reutilizables del sistema.

Ejemplos:

```css
--sys-color-text-primary
--sys-color-surface-page
--sys-color-border-default
```

A diferencia de los reference tokens, estos nombres sí expresan intención de uso.

Por ejemplo:

```css
--sys-color-text-primary: var(--ref-color-zinc-950);
```

Esto permite cambiar el valor real del color sin modificar los componentes que consumen la decisión semántica.

---

## Component Tokens

Los component tokens adaptan decisiones globales a un componente concreto.

Ejemplo:

```css
--cmp-button-background: var(--sys-color-action-primary);
```

Y después:

```css
.opo-button {
  background-color: var(--cmp-button-background);
}
```

Esta capa puede ser útil en sistemas grandes, multi-producto o white-label.

En sistemas pequeños, no siempre es necesario crear component tokens para todo. Algunos componentes pueden consumir system tokens directamente cuando no existe una necesidad real de personalización adicional.

---

## Consumption Flow

Ejemplo de flujo completo:

```css
/* reference.tokens.css */
--ref-color-amber-500: #ffb142;

/* system.tokens.css */
--sys-color-brand-primary: var(--ref-color-amber-500);

/* component token */
--cmp-button-background: var(--sys-color-brand-primary);

/* component style */
.opo-button {
  background-color: var(--cmp-button-background);
}
```

La dirección recomendada es:

```txt
ref → sys → cmp → component
```

No obstante, esta arquitectura debe aplicarse con criterio. Añadir capas que no aportan intención real puede generar abstracción innecesaria.

---

## Token Philosophy

La regla principal es:

```txt
Reference tokens = valor
System tokens = intención
Component tokens = adaptación
```

Un system token debería aportar significado. Si únicamente renombra un reference token sin añadir intención, puede convertirse en una capa redundante.

Por ejemplo, esto aporta poco:

```css
--sys-radius-md: var(--ref-radius-md);
```

Pero esto aporta más intención:

```css
--sys-radius-card: var(--ref-radius-md);
--sys-radius-control: var(--ref-radius-xs);
```

La decisión depende del grado de madurez del sistema. En esta iteración se ha evitado formalizar demasiada semántica prematuramente.

---

## Color Tokens

### Reference Color Tokens

Los colores se definen primero como reference tokens.

Ejemplo:

```css
--ref-color-amber-500: oklch(0.8168 0.1513 71.72);
--ref-color-zinc-950: oklch(0.2401 0.0038 286.11);
```

Esta capa describe valores cromáticos reutilizables, sin asumir todavía dónde se usarán.

---

### OKLCH

Los colores se han definido en `oklch()` para favorecer:

- escalas perceptualmente más uniformes,
- mejor control de luminosidad, croma y tono,
- y una evolución más predecible de la paleta.

Aunque se conservan comentarios con valores hexadecimales por trazabilidad, el valor principal del token se expresa en OKLCH.

```css
--ref-color-amber-500: oklch(0.8168 0.1513 71.72); /* #ffb142 */
```

---

### System Color Tokens

Los system color tokens expresan intención visual.

Ejemplos:

```css
--sys-color-text-primary: var(--ref-color-zinc-950);
--sys-color-surface-page: var(--ref-color-zinc-50);
--sys-color-border-default: var(--ref-color-zinc-400);
```

Este tipo de token sí aporta semántica, porque describe el rol del color dentro de la interfaz.

---

### Brand & Feedback Colors

También se definen colores semánticos asociados a marca y feedback:

```css
--sys-color-brand-primary
--sys-color-brand-accent
--sys-color-danger
--sys-color-success
--sys-color-warning
```

Estos tokens permiten que componentes como botones, iconos o estados visuales puedan usar decisiones del sistema sin depender directamente de valores primitivos.

---

## Spacing Tokens

Los spacing tokens se mantienen como reference tokens numéricos:

```css
--ref-spacing-100: 4px;
--ref-spacing-200: 8px;
--ref-spacing-300: 12px;
--ref-spacing-400: 16px;
```

En esta iteración, el spacing se mantiene en `px` para preservar estabilidad estructural del layout.

La decisión busca evitar que los espacios estructurales escalen de forma excesiva al modificar el tamaño de fuente raíz del navegador.

Esto no significa que `rem` sea incorrecto para spacing, sino que en este contexto se prioriza una composición UI más estable y predecible.

---

## Radius Tokens

La escala de radius se mantiene reducida y reutilizable:

```css
--ref-radius-xs
--ref-radius-sm
--ref-radius-md
--ref-radius-lg
--ref-radius-full
```

Los reference tokens describen valores base.

Si el sistema crece, puede tener sentido introducir system tokens más semánticos:

```css
--sys-radius-control
--sys-radius-card
--sys-radius-pill
```

En esta iteración, se evita crear demasiados alias semánticos hasta que los patrones de uso estén más consolidados.

---

## Shadow Tokens

Las sombras se definen como reference tokens:

```css
--ref-shadow-sm
--ref-shadow-md
```

La escala se mantiene deliberadamente contenida para evitar granularidad innecesaria.

En el futuro, si aparecen patrones más estables de elevación, podría evolucionar hacia tokens semánticos como:

```css
--sys-shadow-surface-raised
--sys-shadow-overlay
--sys-shadow-popover
```

En esta iteración, los shadows siguen funcionando principalmente como foundation tokens reutilizables.

---

## Motion Tokens

La escala de motion durations se define como reference tokens:

```css
--ref-motion-duration-fast: 150ms;
--ref-motion-duration-base: 250ms;
--ref-motion-duration-slow: 400ms;
--ref-motion-duration-slower: 1000ms;
```

Estos valores cubren:

- feedback rápido,
- transiciones estándar,
- transiciones más expresivas,
- y motion continua o en loop.

Ejemplo:

```css
--ref-motion-duration-slower: 1000ms; /* continuous or looping motion, such as spinners or loading indicators */
```

En esta iteración se evita crear demasiados system motion tokens específicos como `--sys-motion-duration-spinner`, salvo que aparezcan patrones repetidos que justifiquen esa semántica.

---

## Avoiding Over-Abstraction

No todos los valores necesitan pasar por todas las capas.

Una arquitectura de tokens madura no consiste en crear más tokens, sino en crear tokens con intención clara.

Ejemplo de abstracción innecesaria:

```css
--sys-motion-duration-fast: var(--ref-motion-duration-fast);
```

Si el token no añade intención, quizá es mejor usar el reference token directamente o esperar a que exista un patrón real.

Ejemplo con más intención:

```css
--sys-motion-duration-feedback: var(--ref-motion-duration-fast);
```

Aun así, incluso este tipo de token debe introducirse solo cuando el sistema lo necesite de forma consistente.

---

## Current Scope

En esta iteración, la capa de tokens se ha mantenido deliberadamente contenida.

El objetivo principal es:

- establecer una base reutilizable,
- mejorar la consistencia visual,
- evitar valores mágicos en componentes,
- y preparar el sistema para una evolución futura.

No se ha intentado cerrar una taxonomía semántica definitiva, ya que en un entorno real debería consensuarse con diseño y evolucionar junto al producto.

---

## Future Improvements

Posibles evoluciones futuras:

- definición más madura de component tokens,
- tematización light/dark,
- soporte multi-brand,
- integración con Style Dictionary,
- sincronización con Figma Tokens / Tokens Studio,
- versionado de tokens,
- validación automática de tokens,
- y generación de documentación visual desde la fuente de tokens.
