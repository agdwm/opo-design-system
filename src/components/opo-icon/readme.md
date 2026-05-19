# opo-icon

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                   | Type                                                             | Default                      |
| ----------- | ------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------- |
| `ariaLabel` | `aria-label` | Texto accesible para iconos con significado. Si se omite, el icono se trata como decorativo.  | `string`                                                         | `undefined`                  |
| `color`     | `color`      | Color semántico opcional. Si no se define, el icono hereda currentColor.                      | `"danger" \| "primary" \| "secondary" \| "success" \| "warning"` | `undefined`                  |
| `name`      | `name`       | Nombre público del icono dentro del catálogo. Requerido si no se usa slot="icon".             | `string`                                                         | `undefined`                  |
| `size`      | `size`       | Tamaño visual del icono.                                                                      | `"lg" \| "md" \| "sm"`                                           | `"md"`                       |
| `spinning`  | `spinning`   | Activa una animación continua de rotación.                                                    | `boolean`                                                        | `false`                      |
| `spriteUrl` | `sprite-url` | URL pública del sprite SVG. Permite que una app consumidora sirva los iconos desde otra ruta. | `string`                                                         | `"/icons/opo-sprite-ui.svg"` |


## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"base"` |             |
| `"svg"`  |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
