# Testing Strategy

---

## Overview

La estrategia de testing del sistema se ha planteado principalmente desde la perspectiva del comportamiento observable del componente y no desde detalles internos de implementación.

La intención es favorecer tests más resilientes a refactors internos y más cercanos al comportamiento real percibido por usuarios y tecnologías asistivas.

---

## Filosofía de testing

En lugar de validar detalles internos de implementación, los tests deberían priorizar:

- comportamiento observable,
- accesibilidad,
- renderizado esperado,
- interacción real,
- y estados relevantes del componente.

Por este motivo, resulta preferible utilizar queries accesibles como:

```js
getByRole();
getByLabelText();
getByText();
```

frente a estrategias más acopladas a implementación interna como:

```jsx
querySelector(".button");
```

o snapshots excesivamente grandes y poco expresivos.

---

## Component Testing

La estrategia actual se orienta principalmente a:

- component testing,
- validación básica de accesibilidad,
- y renderizado de variantes y estados.

Ejemplos típicos:

- renderizado correcto según props,
- comportamiento visual esperado,
- estados disabled/loading,
- iconos decorativos vs accesibles,
- y nombres accesibles correctos.

---

## Testing orientado a accesibilidad

La accesibilidad se considera parte del comportamiento esperado del componente.

Por este motivo, los tests deberían validar aspectos como:

- roles accesibles,
- labels,
- nombres accesibles,
- navegación mediante teclado,
- y presencia correcta de atributos ARIA cuando resulten necesarios.

---

## Alcance actual

En esta iteración no se ha implementado todavía una estrategia completa de testing automatizado para todos los componentes.

El objetivo principal ha sido establecer:

- una arquitectura reutilizable,
- foundations consistentes,
- y una dirección clara para futuras validaciones automatizadas.

---

## Posibles evoluciones futuras

- integración progresiva con `Vitest` (ya configurado, cobertura en expansión),
- component testing más completo,
- testing de accesibilidad mediante `axe-core`,
- visual regression testing (`Chromatic`),
- end-to-end testing (`Playwright`),
- testing responsive,
- y coverage más formalizado.
