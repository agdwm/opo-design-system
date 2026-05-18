# Icon System

## Overview

El sistema de iconos se ha planteado como una arquitectura reutilizable orientada a componentes, donde los SVG originales pasan por una pipeline de normalización y compilación antes de ser consumidos por el componente `opo-icon`.

La estrategia final se basa en:

```txt
raw-icons → build pipeline → dist/icons → runtime serving
```

Esto permite:

- mantener una única fuente de verdad para los SVG originales,
- desacoplar el runtime de los assets fuente,
- generar automáticamente sprite, manifest y typings,
- y distribuir el sistema de iconos como parte de la librería de componentes.

---

## Architecture Overview

```txt
src/components/opo-icon/
├── raw-icons/
│   ├── ui/
│   └── brand/
│
dist/icons/
├── opo-sprite-ui.svg
├── opo-sprite-brand.svg
├── icons.manifest.json
└── icon-name.d.ts
```

### Source Layer

```txt
raw-icons/
```

Contiene los SVG originales y representa la única fuente editable del sistema.

- `ui/` → iconos de interfaz reutilizables
- `brand/` → logos y pictogramas de marca

Los archivos dentro de `raw-icons` nunca se sirven directamente al navegador.

---

### Build Artifacts

```txt
dist/icons/
```

Se generan automáticamente durante `icons:build`.

Estos artefactos incluyen:

- SVG sprite compilado
- manifest JSON
- typings TypeScript
- assets distribuibles para runtime

Los archivos dentro de `dist/icons` no deben editarse manualmente.

---

### Runtime Layer

El componente `opo-icon` consume únicamente assets públicos servidos desde:

```txt
/icons/*
```

Ejemplo:

```html
<use href="/icons/opo-sprite-ui.svg#opo-icon-check"></use>
```

Esto desacopla completamente el componente de:

- Storybook,
- Vite,
- Stencil,
- o la estructura interna del repositorio.

---

# SVG Sprite Strategy

Todos los iconos se renderizan mediante un modelo basado en:

```txt
<symbol> + <use>
```

Durante la build:

1. Los SVG originales se transforman en símbolos SVG (`<symbol>`).
2. Cada símbolo recibe un ID único:

   ```txt
   opo-icon-check
   ```

3. El sprite final se genera en:

   ```txt
   dist/icons/opo-sprite-ui.svg
   ```

4. El componente `opo-icon` renderiza:

   ```html
   <use href="/icons/opo-sprite-ui.svg#opo-icon-check"></use>
   ```

---

## Why Sprite-Based Rendering?

Aunque técnicamente sería posible renderizar cada SVG como un asset independiente, el modelo sprite aporta varias ventajas arquitectónicas importantes:

### Consistency

Todos los iconos se renderizan mediante el mismo mecanismo.

### Runtime Performance

Reduce la necesidad de múltiples requests HTTP independientes.

### Styling

Facilita:

- theming,
- herencia mediante `currentColor`,
- y estrategias de diseño consistentes.

### Encapsulation

El componente mantiene una API desacoplada de la estructura interna de cada SVG.

---

# Shadow DOM Considerations

El componente `opo-icon` utiliza:

```ts
shadow: true;
```

Por este motivo, el sistema no puede depender de:

```html
<use href="#icon-id"></use>
```

referenciando símbolos inline dentro del documento principal.

En su lugar, el componente consume un sprite SVG externo mediante URL absoluta:

```html
<use href="/icons/opo-sprite-ui.svg#opo-icon-check"></use>
```

Esto garantiza compatibilidad con:

- Shadow DOM,
- Storybook,
- SSR,
- apps consumidoras externas,
- y futuros escenarios de distribución mediante CDN.

---

# SVG Normalization Strategy

Los SVG originales proporcionados desde Figma presentaban varias inconsistencias habituales en flujos de exportación orientados únicamente a diseño visual.

Algunos problemas detectados:

- `viewBox` inconsistentes
- tamaños arbitrarios
- colores hardcodeados
- estilos inline
- transforms innecesarios
- IDs redundantes
- metadata generada automáticamente
- diferencias estructurales entre assets

Aunque estos problemas no impedían el renderizado, sí dificultaban:

- consistencia visual,
- theming,
- integración segura en sprites,
- reutilización,
- y mantenibilidad del sistema.

Por este motivo se implementó una pipeline de normalización orientada a Design Systems reutilizables.

---

# SVG Validation Rules

Durante la build se validan automáticamente distintos aspectos de los SVG.

Entre ellos:

- nombres duplicados,
- `viewBox` inconsistentes,
- estilos inline,
- colores hardcodeados,
- IDs duplicados,
- iconos vacíos,
- y colisiones de nombres públicos.

La pipeline sigue una estrategia:

```txt
fail-fast
```

Si un asset incumple las reglas definidas, el build falla explícitamente.

---

# Public vs Internal Naming

El sistema distingue entre:

## Public API

```html
<opo-icon name="check"></opo-icon>
```

## Internal Symbol IDs

```txt
opo-icon-check
```

Los prefijos internos (`ui-`, `brand-`, `opo-icon-`) nunca forman parte de la API pública.

---

## Legacy Compatibility

El componente mantiene compatibilidad temporal con nombres legacy:

```txt
ui-check
opo-icon-check
```

pero normalizándolos automáticamente a:

```txt
check
```

y mostrando warnings únicamente en desarrollo.

---

# Manifest & Typings

Durante `icons:build` se generan automáticamente:

## Manifest

```txt
dist/icons/icons.manifest.json
```

Usado por:

- Storybook,
- galerías de iconos,
- tooling,
- y validación runtime.

---

## TypeScript Typings

```txt
dist/icons/icon-name.d.ts
```

Generado automáticamente desde el mismo catálogo de iconos.

Esto permite:

- autocompletado,
- reducción de errores,
- sincronización entre sprite y API,
- y mejor DX para consumers TypeScript.

Actualmente los typings se consideran tooling interno y todavía no forman parte de una API pública estable documentada.

---

# Storybook Integration

Storybook consume el manifest mediante:

```txt
fetch("/icons/icons.manifest.json")
```

en runtime.

Se evitó deliberadamente el uso de imports estáticos desde `dist/icons` para evitar problemas derivados de:

```txt
stencil build --watch
```

limpiando `dist` durante el arranque.

---

# Development Workflow

El flujo de desarrollo recomendado es:

```bash
npm run dev
```

o:

```bash
npm run dev:fresh
```

El sistema garantiza:

1. Build inicial completo
2. Generación inicial de iconos
3. Arranque de watchers
4. Storybook sirviendo assets desde `/icons`

---

# Runtime Asset Serving

Storybook expone:

```txt
dist/icons
```

como:

```txt
/icons
```

mediante `staticDirs`.

Esto permite que:

```html
<use href="/icons/opo-sprite-ui.svg#opo-icon-check"></use>
```

funcione correctamente tanto en:

- Storybook,
- landing externa,
- como futuras aplicaciones consumidoras.

---

# Component API

## Basic Usage

```html
<opo-icon name="check"></opo-icon>
```

---

## Semantic Colors

```html
<opo-icon name="warning" color="danger"></opo-icon>
```

Los colores semánticos son opcionales.

Por defecto, el icono hereda:

```css
currentColor
```

desde el contexto padre.

---

## Decorative Icons

Cuando no se proporciona:

```txt
aria-label
```

el icono se considera decorativo y se oculta de tecnologías asistivas.

---

## Custom SVG

El componente también soporta iconos personalizados mediante slot:

```html
<opo-icon aria-label="Custom icon">
  <svg slot="icon">...</svg>
</opo-icon>
```

Este soporte está pensado principalmente para contenido estático.

---

# CurrentColor Strategy

El sistema prioriza herencia mediante:

```css
currentColor
```

como comportamiento principal.

Esto permite que los iconos:

- hereden automáticamente el color del contexto,
- funcionen correctamente dentro de botones y componentes compuestos,
- y reduzcan la necesidad de props visuales explícitas.

Ejemplo:

```css
.opo-button {
  color: var(--sys-color-on-action-primary);
}
```

```html
<opo-button>
  <opo-icon name="check"></opo-icon>
</opo-button>
```

---

# Future Improvements

Algunas posibles evoluciones futuras:

- aliases y deprecations automáticas,
- categorías y metadata de iconos,
- visual regression testing,
- hashing/versionado del sprite,
- CDN asset serving,
- y tooling adicional de validación SVG.
