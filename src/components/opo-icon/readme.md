# opo-icon

Componente de Web Component que gestiona un sistema de iconos mediante **SVG optimizados** compilados en **sprites**. Implementa validación automática, optimización con SVGO, y generación de sprites separados para iconos UI (interfaz) y Brand (logos).

## Documentación general

Si no estás familiarizado con la estrategia de iconos del proyecto, lee primero las [Consideraciones sobre el Sistema de Iconos](../../readme.md#icon) en el readme raíz.

## Contenidos técnicos

### Pipeline de Generación

El sistema de iconos implementa un pipeline automático de validación, optimización y generación de sprites mediante scripts de build especializados.

El flujo general es:

```
SVG originales (opo-icon/raw-icons/)
    ↓
Validación específica por tipo
    ↓
Optimización con SVGO
    ↓
Generación de sprites (svg-sprite)
    ↓
Sprites finales (sprites/)
```

Este proceso se ejecuta automáticamente en `npm run build` y también en `npm run storybook` a través de `prestorybook`; durante desarrollo continuo, `npm run dev` regenera sprites al detectar cambios en `raw-icons/`.

### Estructura de Carpetas y Nomenclatura

Los iconos se organizan en la siguiente estructura dentro del componente `opo-icon`:

```bash
src/components/opo-icon/
├── raw-icons/
│   ├── ui/                       ← Iconos de interfaz (outline, 24x24, currentColor)
│   │   ├── ui-chevron-down.svg
│   │   ├── ui-chevron-up.svg
│   │   └── ...
│   └── brand/                    ← Logos, pictogramas y redes sociales (sin restricciones de color)
│       ├── brand-logo.svg
│       ├── brand-social-github.svg
│       └── ...
├── sprites/
│   ├── opo-sprite-ui.svg         ← Sprite compilado de iconos UI
│   ├── opo-sprite-brand.svg      ← Sprite compilado de iconos brand
│   └── index.ts                  ← Exports del componente
├── opo-icon.tsx                  ← Componente web
├── opo-icon.css                  ← Estilos del componente
└── readme.md
```

**Convenciones de Nomenclatura:**

- **Archivos SVG:** Usar `kebab-case` con prefijos claros.
  - `ui-*` para iconos de interfaz
  - `brand-*` para logos y pictogramas
  - Ejemplo: `ui-chevron-down.svg`, `brand-logo-horizontal.svg`

- **IDs en Sprites:** Generados automáticamente con patrón único `opo-icon-{nombre-normalizado}` para `ui` y `brand`.
  - El nombre normalizado elimina el prefijo de categoría del archivo (`ui-` o `brand-`).
  - Permiten referenciar cada símbolo en el sprite mediante `<use xlink:href="#opo-icon-chevron-down">`

### Generación de Sprites con svg-sprite

El pipeline utiliza la librería [`svg-sprite`](https://github.com/jkphl/svg-sprite) para compilar múltiples SVGs en un único sprite optimizado con modo `symbol`.

**Script:** [scripts/generate-icon-sprite.js](scripts/generate-icon-sprite.js)

El script realiza las siguientes operaciones:

1. **Detección de carpetas:** Busca iconos en `raw-icons/ui` y `raw-icons/brand`
2. **Validación pre-compilación:** Valida cada SVG según reglas específicas (incluyendo prefijo de archivo obligatorio por carpeta y colisiones de nombre normalizado).

- Ante colisiones de nombre normalizado, la automatización solo notifica y bloquea el build.
- La resolución (mantener, renombrar o eliminar) se decide manualmente en revisión de diseño.

3. **Optimización individual:** Aplica SVGO a cada icono antes de agregarlo al sprite
4. **Compilación:** Genera dos sprites separados:
   - `opo-sprite-ui.svg` - Contiene todos los iconos de interfaz con IDs `opo-icon-*`

- `opo-sprite-brand.svg` - Contiene logos y pictogramas con IDs `opo-icon-*`

5. **Minificación:** Los sprites se generan sin declaración XML y doctypes para reducir tamaño

**Ventajas del modo symbol:**

- Los símbolos se pueden reutilizar sin duplicación de código
- Facilita la reutilización de colores y estilos mediante `<use>` references
- Compatible con CSS y JavaScript para modificación en tiempo real
- Excelente compresión cuando se cachea el archivo sprite

**Ejecución manual (si es necesario):**

```bash
npm run icons:build
```

Esto regenerará los sprites incluso si no hay cambios en los archivos source.

### Optimización con SVGO

Todos los SVGs se optimizan automáticamente utilizando [`SVGO`](https://github.com/svg/svgo) (SVG Optimizer) antes de compilarse en los sprites.

**Configuración:** El proyecto incluye tres configuraciones SVGO especializadas:

1. **[svgo.config.base.js](svgo.config.base.js)** - Configuración base compartida

   Plugins aplicados a todos los iconos:
   - `removeDimensions` - Elimina `width` y `height` del SVG raíz para que escale via CSS
   - `removeAttrs` - Elimina `id`, `data-*`, `aria-hidden`, `xmlns` para evitar conflictos en sprites
   - `removeStyleElement` - Elimina elementos `<style>`
   - `removeScripts` - Elimina elementos `<script>` por seguridad
   - `removeComments` - Elimina comentarios
   - `removeUselessDefs` - Elimina definiciones `<defs>` no utilizadas
   - `sortAttrs` - Ordena atributos alfabéticamente
   - `convertPathData` - Optimiza rutas con precisión de 3 decimales

   ```javascript
   // svgo.config.base.js
   const sharedPlugins = [
     { name: 'removeDimensions' },
     { name: 'removeAttrs', params: { attrs: ['id', 'data-*', ...] } },
     { name: 'removeStyleElement' },
     // ... más plugins
   ];
   ```

2. **[svgo.config.js](svgo.config.js)** - Configuración para iconos UI

   Extends la configuración base e incluye sobrescrituras del preset:

   ```javascript
   export default createSvgoConfig({
     presetOverrides: {
       convertColors: {
         currentColor: true, // Convierte colores permitidos a currentColor
       },
     },
   });
   ```

   Esto garantiza que los iconos UI puedan heredar color del CSS.

3. **[svgo.config.brand.js](svgo.config.brand.js)** - Configuración para iconos brand

   Usa solo la configuración base sin sobrescrituras, permitiendo colores fijos en logos.

**Beneficios de SVGO:**

- **Reducción de tamaño:** Típicamente 30-50% de compresión
- **Sanitización:** Elimina atributos potencialmente problemáticos
- **Multipass:** Ejecuta optimizaciones en múltiples pasadas para resultados óptimos
- **Consistencia:** Asegura que todos los SVGs sigan el mismo formato

### Validación de Iconos

El pipeline implementa validaciones estrictas y específicas según el tipo de icono para garantizar consistencia e integración correcta en los sprites.

**Validación para Iconos UI (`validateLineIcon`):**

Reglas estrictas para iconos de interfaz (ui):

- ✅ El nombre de archivo DEBE empezar por `ui-`
- ✅ `viewBox` DEBE ser exactamente `"0 0 24 24"`
- ✅ NO debe tener atributos `width` o `height` en el SVG raíz
- ✅ NO puede usar estilos inline (`style` attributes)
- ✅ NO puede contener elementos `<style>`
- ✅ NO puede contener elementos `<script>`
- ✅ NO puede tener colores hardcodeados (excepto `currentColor`, `none`, `inherit`, `transparent`, `context-fill`, `context-stroke` o referencias `url(#...)`)

Ejemplo válido:

```xml
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="M..."/>
</svg>
```

Ejemplo NO válido:

```xml
<!-- ❌ width/height no permitidos -->
<svg viewBox="0 0 24 24" width="24" height="24">

<!-- ❌ viewBox incorrecto -->
<svg viewBox="0 0 32 32">

<!-- ❌ color hardcodeado -->
<svg viewBox="0 0 24 24">
  <path fill="#333" d="M..."/>
</svg>
```

**Validación para Iconos Brand (`validateBrandIcon`):**

Reglas más flexibles para logos y pictogramas:

- ✅ El nombre de archivo DEBE empezar por `brand-`
- ✅ `viewBox` DEBE estar presente (cualquier tamaño)
- ✅ NO debe tener atributos `width` o `height`
- ✅ NO puede contener elementos `<script>`
- ✅ Permite colores fijos (útil para logos con marca color)

Regla global adicional:

- ✅ No se permiten colisiones de nombre normalizado entre `ui` y `brand` (ej: `ui-minus.svg` y `brand-minus.svg`).
- ✅ Si hay colisión, el build falla de forma intencionada y solicita revisión manual (no hay auto-remediación).

**Mensajes de Error:**

El script detiene la generación y lista todos los errores encontrados:

```
❌ Validation failed for UI icons:
  - chevron-bad.svg: viewBox must be "0 0 24 24" (got "0 0 32 32").
  - icon-color.svg: Hardcoded fill color "#333" is not allowed. Use currentColor/none.
  - logo.svg: Root <svg> must not define width/height.
```

### Consumo en Componentes

El componente `opo-icon` expone el sprite compilado y proporciona una interfaz para referenciar símbolos.

**Uso básico:**

```tsx
// En el componente opo-icon.tsx
<use xlink:href={`#${this.getIconId()}`} />
```

```tsx
// En un componente consumidor
<opo-icon name="chevron-down" />
<opo-icon name="brand-logo" />
```

**Props disponibles:**

- `name` (string) - Nombre del icono (sin prefijo `ui-` o `brand-`)
- `size` (string, opcional) - Tamaño del icono (pequeño, medio, grande)
- `color` (string, opcional) - Para iconos UI, hereda del CSS; para brand, permite sobrescrituras

**Acceso a los Sprites:**

Los sprites se importan automáticamente en el componente y están disponibles en el bundle compilado:

```javascript
// Importar sprite
import uiSprite from './sprites/opo-sprite-ui.svg?raw';
import brandSprite from './sprites/opo-sprite-brand.svg?raw';

// Los sprites se inyectan en el shadow DOM del componente
```

**Ejemplo de uso en la landing:**

```html
<opo-icon name="chevron-down"></opo-icon> <opo-icon name="github" class="social-icon"></opo-icon>
```

```css
/* UI icons heredan el color actual a traves de 'currentColor' */
.icon-danger {
  color: oklch(0.6 0.2 15); /* rojo */
}

.icon-danger opo-icon {
  /* Automáticamente roja */
}
```

### Workflow de Desarrollo

**Para agregar un nuevo icono:**

1. **Exportar desde Figma** (o crear SVG):
   - Para iconos UI: Asegurar `viewBox="0 0 24 24"`, usar `currentColor` en fills
   - Para logos: Exportar con colores brand, validar existencia de `viewBox`

2. **Guardar en la carpeta correcta:**

   ```bash
   # Para iconos de interfaz
   src/components/opo-icon/raw-icons/ui/ui-{name}.svg

   # Para logos/pictogramas
   src/components/opo-icon/raw-icons/brand/brand-{name}.svg
   ```

3. **El pipeline automático:**
   - Detecta el nuevo archivo
   - Valida según el tipo
   - Optimiza con SVGO
   - Regenera el sprite
   - Hot-reload en dev server

4. **Usar en componentes:**
   ```html
   <opo-icon name="{name}"></opo-icon>
   ```

**Troubleshooting:**

| Problema        | Causa                                            | Solución                                                                 |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| Sin sprite      | Archivo fuera `raw-icons/`                       | Mover a `raw-icons/{ui\|brand}/`                                         |
| Validación      | ViewBox incorrecto                               | Usar `viewBox="0 0 24 24"`                                               |
| Color no hereda | Fill hardcodeado en UI                           | Cambiar a `fill="currentColor"`                                          |
| Archivo pesado  | SVGO no optimizado                               | Revisar SVG origen                                                       |
| ID duplicado    | Nombre normalizado repetido entre `ui` y `brand` | Revisar manualmente en diseño y decidir (mantener, renombrar o eliminar) |
