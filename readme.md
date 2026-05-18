# STENCIL LANDING CHALLENGE

Starter para una prueba técnica centrada en `Stencil`, `Web Components` y `Storybook`.

La base está preparada para que la persona candidata clone el repo, instale dependencias y empiece a trabajar sin perder tiempo en setup. El starter incluye un único componente de ejemplo, `opo-button`, y una landing externa separada de la librería.

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

## Solution Overview

He priorizado una aproximación `component-driven`: antes de completar la landing como una página aislada, he identificado las piezas reutilizables del diseño y las he construido como componentes de la librería, utilizando posteriormente la landing externa como un caso de uso real de consumo.

De este modo, la landing no actúa únicamente como una implementación visual concreta, sino también como una validación práctica de la reutilización, composición y flexibilidad de los componentes definidos dentro del sistema.

> [!NOTE]
> Parte de las decisiones documentadas en este README representan una dirección arquitectónica explorada durante la prueba y no necesariamente una implementación completamente desarrollada en esta iteración inicial.

La arquitectura separa:

- foundations reutilizables mediante Design Tokens,
- sistema de iconos,
- librería de componentes,
- landing consumidora,
- y documentación arquitectónica,

---

## Setup

### Install

```bash
npm install
```

---

## Development Workflow

### Commands

| Command                 | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Flujo completo: Stencil + Iconos + Storybook |
| `npm run dev:fresh`     | Limpieza total + flujo completo              |
| `npm run landing:dev`   | Ejecutar solo la landing page                |
| `npm run build`         | Build de producción de la librería           |
| `npm run icons:build`   | Generar/actualizar sprite de iconos          |
| `npm run storybook:dev` | Ejecutar solo Storybook                      |

---

#### Flujos de desarrollo disponibles y equivalencia comandos antiguos y actuales

- `npm start` → `npm run landing:dev`
  - **Landing only**
  - Ejecuta la landing externa.
  - Disponible en:
    - [localhost:3333](http://localhost:3333)

- `npm run storybook` → `npm run storybook:dev`
  - **Storybook only**
  - Ejecuta únicamente Storybook.
  - Útil para revisar documentación o stories cuando la librería y los assets ya están generados.
  - Disponible en:
    - [localhost:6006](http://localhost:6006)

- `npm run dev`
  - **Standard development**
  - Entorno completo de desarrollo del Design System:
    - Stencil en modo watch,
    - generación de iconos en modo watch,
    - y Storybook.
  - Disponible en:
    - [localhost:6006](http://localhost:6006)

- `npm run dev:fresh`
  - **Clean development start**
  - Limpieza total + entorno completo de desarrollo.

---

### ¿Por qué evolucionaron los scripts respecto al starter original?

> [!NOTE]
> Los cambios en los scripts y el workflow responden a necesidades reales derivadas de la evolución del proyecto hacia una arquitectura más desacoplada, distribuible y orientada a componentes reutilizables.

---

El proyecto partía de un starter básico de Stencil, donde los comandos principales (`npm start`, `npm run storybook`) lanzaban Stencil y la landing o Storybook en paralelo.

Ese flujo era adecuado para el alcance inicial del proyecto, pero a medida que el sistema evolucionó hacia una arquitectura más orientada a componentes reutilizables y a un Design System real, comenzaron a aparecer nuevos requisitos técnicos y de organización del workflow.

### Necesidades que surgieron durante la evolución del sistema

- **Sincronización de assets:**  
  Stencil limpia `dist` al arrancar, lo que hacía necesario garantizar que Storybook y la landing dispusieran siempre de los assets SVG generados.

- **Pipeline de iconos:**  
  El sistema incorporó generación automática de:
  - sprite SVG runtime,
  - manifest JSON,
  - y typings TypeScript.

  El `icons.manifest.json` actúa como catálogo runtime de iconos disponibles y se utiliza para tooling, Storybook y generación automática de galerías.

  Los typings TypeScript (`icon-name.d.ts`) generan automáticamente una unión tipada con todos los nombres públicos de iconos, mejorando autocompletado, sincronización y DX.

  Todo esto requería una pipeline explícita y ordenada basada en:

  ```txt
  raw-icons → build pipeline → dist/icons → runtime serving

  ```

- **Separación de flujos de desarrollo:**
  A medida que el proyecto creció, comenzaron a diferenciarse distintos contextos de trabajo:
  - desarrollo integrado,
  - landing aislada,
  - Storybook aislado,
  - y arranques limpios desde cero.

- **Mayor previsibilidad del entorno de desarrollo:**
  El sistema evolucionó hacia un flujo más explícito y determinista para reducir inconsistencias relacionadas con generación y serving de assets runtime `/icons/*`.

---

### Antes

```json
"start": "npm run build && concurrently -k -n STENCIL,SITE \"npm run dev:lib\" \"vite --config landing/vite.config.ts --host 0.0.0.0 --port 3333\"",
"storybook": "npm run build && concurrently -k -n STENCIL,SB \"npm run dev:lib\" \"storybook dev -p 6006\""
```

---

### Ahora

```json
"dev": "npm run dev:ordered",
"dev:ordered": "npm run build && concurrently -k -n STENCIL,ICONS,SB \"npm run dev:lib\" \"npm run icons:watch\" \"npm run storybook:dev\"",
"dev:fresh": "npm run dev:reset && npm run dev:ordered",
"landing:dev": "npm run icons:build && vite --config landing/vite.config.ts --host 0.0.0.0 --port 3333",
"storybook:dev": "storybook dev -p 6006 --no-open"
```

---

### Ventajas del nuevo enfoque

- El pipeline de iconos es más robusto y explícito.
- El arranque deja de depender únicamente de procesos paralelos y pasa a ser más determinista y predecible.
- Cada flujo tiene su comando específico, mejorando la DX y el onboarding.
- Se reducen inconsistencias relacionadas con sincronización y serving de assets runtime.
- El README y los scripts reflejan correctamente el contrato arquitectónico:

```txt
source → artifact → runtime
```

---

### Local URLs

#### Landing

```txt
http://localhost:3333
```

#### Storybook

```txt
http://localhost:6006
```

---

## Project Structure

```txt
src/
├── components/
├── foundations/
├── global/
└── types/

landing/
├── index.html
└── main.ts

.storybook/

dist/
└── icons/

docs/
└── architecture/
```

---

## Design System Approach

La implementación prioriza una aproximación:

- component-driven,
- reusable-first,
- y desacoplada entre source, build y runtime.

---

## Icon System

El sistema de iconos utiliza:

- SVG sprites,
- assets distribuibles,
- manifest generado,
- typings automáticos,
- y runtime serving desacoplado.

Arquitectura general:

```txt
raw-icons → dist/icons → runtime serving
```

Más detalles:

- [Icon System](./docs/architecture/icon-system.md)

---

## Design Tokens

El sistema de tokens sigue una arquitectura en capas:

```txt
reference → system → component
```

con separación entre:

- valores primitivos,
- decisiones semánticas,
- y adaptación específica de componentes.

Más detalles:

- [Design Tokens](./docs/architecture/design-tokens.md)

---

## Storybook

Storybook se utiliza como:

- entorno de documentación,
- validación visual,
- aislamiento de componentes,
- y playground para variantes y estados.

El sistema de iconos y los assets SVG se sirven desde:

```txt
/icons/*
```

mediante runtime assets generados en:

```txt
dist/icons/
```

Más detalles sobre foundations y decisiones arquitectónicas:

## Architecture Documentation

- [Icon System](./docs/architecture/icon-system.md)
- [Design Tokens](./docs/architecture/design-tokens.md)
- [Typography](./docs/architecture/typography.md)
- [Layering & Motion](./docs/architecture/layering-and-motion.md)
- [Accessibility](./docs/architecture/accessibility.md)

---

> [!NOTE]
> **Nota sobre documentación:**
>
> - Los `README.md` de componentes generados por Stencil se usan como referencia técnica automática.
> - La documentación principal de uso y ejemplos vive en Storybook MDX (por ejemplo `src/components/opo-icon/opo-icon.mdx`).
> - Las decisiones de arquitectura se documentan en `docs/architecture/` (por ejemplo `docs/architecture/icon-system.md`).

---

## Tradeoffs

Dado el alcance de la prueba, algunas decisiones se han simplificado deliberadamente para priorizar claridad arquitectónica y la construcción de una base sólida, coherente y mantenible frente a una implementación excesivamente compleja.

Se ha evitado introducir:

- abstracciones prematuras,
- granularidad excesiva,
- o complejidad innecesaria.

Por ejemplo:

- La **escala de tokens** se ha mantenido deliberadamente contenida para evitar introducir granularidad y complejidad innecesarias de forma prematura (ej: `containers`, `shadows`, `font-family`).
- Algunas aproximaciones modernas como `container queries` o `fluid typography` se han aplicado de forma selectiva, evitando extenderlas indiscriminadamente a todo el sistema.
- Se valoró el uso de `@scope` para encapsular determinados estilos de composición de la landing, pero se priorizó una arquitectura más simple basada en cascade layers (`@layer`), estilos encapsulados por componente en Stencil y CSS custom properties para theming.
- Aunque inicialmente se valoró incorporar fallbacks adicionales de compatibilidad `@supports` para determinadas características modernas de CSS como `oklch()`, finalmente se optó por priorizar una implementación más simple y alineada con el soporte actual de navegadores modernos ([OKLCH support](https://caniuse.com/?search=oklch)).
  Considero que el soporte actual de `oklch()` en navegadores modernos resulta **suficientemente sólido** como para incorporarlo progresivamente en sistemas frontend contemporáneos, especialmente en entornos donde no existen fuertes requisitos de compatibilidad legacy.

---

## Future Improvements

En un contexto real de evolución del sistema, algunos aspectos que podrían desarrollarse más adelante serían:

- Estrategia completa de theming (`light/dark mode`).
- Multi-brand support `brand themes`
- Estrategias de internacionalización (`i18n`).
- Mayor adopción progresiva de `container queries`.
- Estrategias avanzadas de motion.

- Evolución hacia pipelines automatizados de design tokens con herramientas como [Style Dictionary](https://styledictionary.com/) en escenarios multi-brand o multi-platform.

- Auditorías de accesibilidad ([axe-core](https://www.deque.com/axe/)) y performance más exhaustivas ([WebPageTest](https://www.webpagetest.org/)).
- Integración progresiva de visual regression testing ([Chromatic](https://www.chromatic.com/)).
- Integración de end-to-end testing ([Playwright](https://playwright.dev/)).
- Automatización de análisis estático y métricas de calidad mediante herramientas como [SonarQube](https://www.sonarsource.com/es/products/sonarqube/).
- Integración de herramientas de monitoring y runtime error tracking mediante plataformas como [Sentry](https://sentry.io/).

- Migrar de `npm` a [`pnpm@^11`](https://pnpm.io/) para obtener una **gestión de dependencias más segura** (resolución estricta, prevención de dependencias fantasma y lockfile más robusto), junto con instalaciones más rápidas y menor consumo de disco.

---
