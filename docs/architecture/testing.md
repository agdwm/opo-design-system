# Testing Strategy

---

## Overview

La estrategia de testing del sistema se plantea desde el comportamiento observable de los componentes, evitando validar detalles internos de implementación siempre que sea posible.

El objetivo es crear tests resilientes a refactors internos y cercanos al comportamiento real percibido por usuarios, navegadores y tecnologías asistivas.

Actualmente el proyecto utiliza Vitest como framework principal de testing, con soporte específico para Stencil, Browser Mode mediante Playwright y una integración inicial con Storybook principalmente orientada a documentación, accesibilidad manual/asistida y playground visual.

El uso de Browser Mode permite validar componentes en un entorno más cercano al navegador real que los entornos puramente simulados mediante JSDOM.

---

## Testing approach

La estrategia actual se centra principalmente en **Component Tests** ejecutados en navegador real mediante Vitest Browser Mode y Playwright.

A futuro, la arquitectura contempla distintos niveles de testing según la naturaleza del comportamiento que se desee validar:

- **Unit Tests:** lógica aislada, transformaciones y utilidades puras.
- **Component Tests:** renderizado, interacción, accesibilidad y API pública de componentes.
- **Integration Tests:** colaboración entre múltiples módulos o servicios.
- **End-to-End Tests (E2E):** validación de flujos completos desde la perspectiva del usuario final.

Actualmente la cobertura principal del proyecto se concentra en Component Tests.

Esta separación permite diferenciar entre qué se está validando y cómo se está ejecutando cada escenario. Por ejemplo, Storybook Interaction Testing o los mocks de Storybook no constituyen por sí mismos un nivel nuevo de testing, sino técnicas complementarias para construir escenarios controlados, reproducibles y más cercanos al uso real de los componentes.

---

## Testing stack

Las principales herramientas instaladas son:

- `vitest`: framework principal de testing.
- `@stencil/vitest`: integración de Stencil con Vitest.
- `@vitest/browser-playwright`: ejecución de component tests en navegador real mediante Playwright.
- `@vitest/coverage-v8`: provider de coverage basado en V8, instalado y alineado con la versión de Vitest.
- `@vitest/ui`: interfaz visual de Vitest.
- `@storybook/addon-vitest`: integración entre Storybook y Vitest.
- `@storybook/addon-a11y`: soporte de revisión de accesibilidad en Storybook.
- `jsdom`: entorno DOM para determinados tests.
- `@storybook/web-components-vite`: soporte de Storybook para Web Components con Vite.

---

## Scripts de testing disponibles

Los scripts principales de testing son:

```bash
npm test
```

Ejecuta Vitest.

```bash
npm run test:watch
```

Ejecuta Vitest en modo watch.

```bash
npm run test:ui
```

Abre la interfaz visual de Vitest.

---

## Comandos recomendados

Para ejecutar todos los tests:

```bash
npm test
```

Para ejecutar solo los component tests de navegador:

```bash
npx vitest --project browser
```

Para ejecutar solo un test concreto de componente:

```bash
npx vitest --project browser src/components/opo-icon/opo-icon.cmp.test.tsx
```

Para abrir la UI de Vitest solo con los browser tests:

```bash
npx vitest --ui --project browser
```

Para abrir la UI de Vitest con un único archivo:

```bash
npx vitest --ui --project browser src/components/opo-icon/opo-icon.cmp.test.tsx
```

Para ejecutar los tests con coverage:

```bash
npx vitest run --coverage
```

Para ejecutar solo los browser component tests con coverage:

```bash
npx vitest run --project browser --coverage
```

> [!NOTE]
> Actualmente el reporte de coverage con V8 no se considera una métrica fiable para los browser component tests del proyecto. Aunque los tests se ejecutan correctamente en Chromium, la recolección de coverage devuelve 0% incluso apuntando temporalmente a `dist/**/*.js`. La causa probable está en la integración entre Vitest Browser Mode, Playwright y el bundle precompilado de Stencil cargado durante el setup de tests.

---

## Convenciones de nomenclatura de archivos

El proyecto utiliza actualmente las siguientes convenciones:

| Tipo de test            | Patrón            |
| ----------------------- | ----------------- |
| Unit tests              | `*.unit.test.tsx` |
| Browser component tests | `*.cmp.test.tsx`  |
| Storybook stories       | `*.stories.ts`    |

La separación permite diferenciar claramente:

- tests de lógica aislada,
- tests de componentes renderizados en navegador,
- y documentación interactiva mediante Storybook.

---

## Proyectos de testing

La configuración actual separa los tests en dos proyectos:

### Tests unitarios

Pensados para lógica aislada, helpers o funciones puras.

Actualmente el proyecto tiene preparado este proyecto de test, aunque la suite principal se apoya en browser component tests.

Patrón de archivos:

`src/**/*.unit.test.{ts,tsx}`

### Browser component tests

Pensados para validar componentes renderizados en navegador real mediante Playwright.

Patrón de archivos:

`src/**/*.cmp.test.{ts,tsx}`

> [!NOTE]
> Las stories de Storybook (`*.stories.ts`) se utilizan actualmente como documentación interactiva y playground visual, no como suites de test ejecutadas por Vitest.

> Aunque el proyecto tiene instalada la integración `@storybook/addon-vitest`, los tests basados en stories quedan fuera del flujo principal por ahora. Podrían incorporarse más adelante mediante `play()` functions e interaction testing.

---

## Filosofía de component testing

Los component tests deberían validar principalmente:

- renderizado esperado,
- contrato público de props,
- accesibilidad básica,
- clases y estados públicos,
- slots,
- shadow parts públicos,
- edge cases relevantes.

No deberían centrarse en detalles internos como:

- métodos privados,
- estructura interna excesivamente específica,
- snapshots grandes,
- valores exactos de CSS,
- implementación concreta de helpers internos.

Muchos componentes utilizan Shadow DOM mediante Stencil.

Por este motivo, algunos tests interactúan explícitamente con `shadowRoot` para validar renderizado interno, slots, accessibility semantics y shadow parts expuestos públicamente.

---

## Testing orientado a accesibilidad

La accesibilidad se considera parte del comportamiento esperado del componente.

Los tests deberían cubrir, cuando aplique:

- roles accesibles,
- `aria-label`,
- `aria-hidden`,
- nombres accesibles,
- estados interactivos,
- foco,
- navegación mediante teclado,
- atributos ARIA necesarios.

---

## Testing techniques

Además de los distintos niveles de testing, el proyecto utiliza o contempla distintas técnicas complementarias:

- Browser Mode mediante Vitest.
- Ejecución en navegador real con Playwright.
- Accessibility Testing.
- Storybook Interaction Testing mediante `play()` functions.
- Mocking de módulos y dependencias externas en Storybook.
- Visual Regression Testing.
- Code Coverage.

Estas técnicas no sustituyen a los niveles de testing, sino que ayudan a ejecutar, controlar o enriquecer los escenarios de validación. Por ejemplo, los mocks en Storybook permiten crear estados reproducibles sin depender de APIs reales, sesiones, fechas, permisos o módulos externos.

---

## Notas sobre Browser Mode y Playwright

Los browser component tests utilizan actualmente Playwright con Chromium como navegador de referencia durante desarrollo.

La arquitectura de componentes está pensada para funcionar correctamente en navegadores modernos compatibles con Web Components y Shadow DOM.

Si Chromium no está instalado localmente:

```bash
npx playwright install chromium
```

---

## Coverage con V8: estado actual

El proyecto tiene instalado `@vitest/coverage-v8` alineado con `vitest@4.1.2`.

La configuración de coverage está planteada a nivel raíz dentro de `test.coverage`, de forma que pueda aplicar tanto a unit tests como a browser component tests.

La intención de esta configuración es poder medir, en una fase posterior, métricas como:

- statements,
- branches,
- functions,
- lines.

Sin embargo, durante la validación actual se ha detectado que el reporte de coverage no es todavía representativo para los browser component tests.

### Resultado observado

Al ejecutar:

```bash
npx vitest run --project browser --coverage
```

los tests se ejecutan correctamente en Chromium, pero el reporte de coverage devuelve 0% para los archivos fuente.

También se ha probado acotar temporalmente el coverage hacia el artefacto compilado:

```bash
npx vitest run --project browser --coverage --coverage.include="dist/**/*.js" --coverage.exclude="**/*.map" --coverage.all=false
```

El resultado sigue siendo 0%, lo que indica que el problema no está únicamente en el mapeo desde `dist` hacia `src`, sino probablemente en la recolección de coverage dentro del flujo actual de Browser Mode.

### Diagnóstico actual

Los browser component tests sí validan comportamiento real del componente porque:

- renderizan Web Components reales,
- ejecutan los tests en Chromium mediante Playwright,
- interactúan con Shadow DOM real,
- validan atributos, eventos, estados públicos y semántica accesible.

El problema está en la instrumentación de coverage, no necesariamente en la ejecución de los tests.

La causa probable está relacionada con el pipeline actual:

```text
Stencil bundle precompilado
→ setup de tests
→ Vitest Browser Mode
→ Playwright/Chromium
→ V8 coverage
```

En este flujo, V8 no está recogiendo o asociando correctamente los rangos ejecutados con los archivos del proyecto.

### Decisión actual

Por este motivo, el coverage queda configurado como una mejora de tooling en progreso, pero no se utiliza todavía como métrica principal de calidad.

La calidad de la suite se evalúa actualmente desde:

- cobertura de comportamientos críticos,
- pruebas sobre estados públicos,
- accesibilidad básica,
- eventos emitidos,
- interacción real en navegador,
- y validación del contrato público de los componentes.

### Siguientes pasos posibles

Para formalizar coverage en una fase posterior, se podría:

- crear una reproducción mínima aislada para distinguir entre problema de Browser Mode, Stencil o setup del bundle,
- probar `@vitest/coverage-istanbul` como alternativa a V8,
- añadir `unit tests` reales para lógica aislada y medir coverage fuera de Browser Mode,
- revisar si el flujo de tests puede ejecutar módulos fuente directamente en lugar del bundle precompilado,
- documentar qué métricas de coverage se consideran relevantes para una librería de componentes,
- definir umbrales solo cuando la medición sea estable y representativa.

---

## Storybook + Stencil Hot Reload considerations

Durante el desarrollo se detectó que, aunque Stencil recompila correctamente componentes y estilos encapsulados (`Shadow DOM`) mediante:

```bash
stencil build --watch
```

Storybook/Vite puede mantener en caché módulos relacionados con el loader y los bundles generados por Stencil.

Esto puede provocar que cambios en archivos `.tsx` o `.css` no se reflejen automáticamente en Storybook, incluso cuando Stencil ya ha recompilado correctamente el componente.

Para mejorar la experiencia de desarrollo, la configuración de Storybook incorpora actualmente:

- invalidación explícita de módulos relacionados con `loader/` y `dist/`,
- y un full reload automático cuando cambian archivos dentro de `src/components`.

Esta estrategia permite reflejar correctamente cambios en componentes Web Components y estilos Shadow DOM durante desarrollo sin necesidad de reiniciar manualmente Storybook.

Esta lógica se implementa actualmente mediante un plugin Vite definido dentro de `.storybook/main.ts`.

---

## Screenshots and artifacts (archivos auxiliares)

Vitest Browser / Playwright puede generar artifacts locales como:

```text
.vitest-attachments/
__screenshots__/
```

Mientras no exista una estrategia formal de visual regression testing, estos archivos deben tratarse como artifacts temporales y no versionarse.

---

## Posibles mejoras futuras

Posibles evoluciones futuras:

- Integrar `axe-core` para validación automatizada de accesibilidad.
- Ampliar component tests en más componentes.
- Incorporar progresivamente **Storybook Interaction Testing** mediante `play()` functions.
- Incorporar **mocks en Storybook** para construir escenarios reproducibles y desacoplados de dependencias externas (APIs, sesión, fechas, permisos o módulos auxiliares), mejorando la documentación, el interaction testing y futuras estrategias de visual testing.
- Investigar y formalizar una estrategia de Code Coverage fiable para Browser Mode con Stencil y Vitest.
- Valorar Visual Regression Testing con `Chromatic`, `Percy`, `Playwright` o `snapshots`.
- Explorar **Integration Tests** para validaciones entre módulos o servicios cuando la complejidad del sistema lo requiera.
- Explorar **E2E Tests** para flujos completos de usuario si la librería evoluciona hacia escenarios de producto más amplios.
- Definir convenciones comunes para nombres de tests y estructura de archivos.
