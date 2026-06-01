import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
  title: "Components/Atoms/Spinner",
  component: "opo-spinner",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Indicador de carga del Design System OPO. Puede anunciar un estado de carga mediante role=status o comportarse como elemento decorativo cuando otro componente ya comunica el estado.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño visual del spinner.",
      table: { defaultValue: { summary: "md" } },
    },
    label: {
      control: "text",
      description:
        "Etiqueta accesible usada cuando el spinner comunica el estado de carga por sí mismo.",
      table: { defaultValue: { summary: "Cargando" } },
    },
    decorative: {
      control: "boolean",
      description:
        "Oculta el spinner a tecnologías asistivas cuando el estado ya está comunicado por otro elemento.",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;

type SpinnerArgs = {
  size?: "sm" | "md" | "lg";
  label?: string;
  decorative?: boolean;
};

function renderSpinner(args: SpinnerArgs) {
  return html`
    <opo-spinner
      size=${args.size ?? "md"}
      label=${ifDefined(args.label)}
      ?decorative=${args.decorative}
    ></opo-spinner>
  `;
}

// ==================== BASIC ====================

export const Default: StoryObj<SpinnerArgs> = {
  args: {
    size: "md",
    label: "Cargando",
  },
  render: (args) => renderSpinner(args),
};

// ==================== SIZES ====================

export const Sizes: StoryObj<SpinnerArgs> = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 24px;">
      <opo-spinner size="sm" label="Cargando"></opo-spinner>
      <opo-spinner size="md" label="Cargando"></opo-spinner>
      <opo-spinner size="lg" label="Cargando"></opo-spinner>
    </div>
  `,
};

// ==================== ACCESSIBILITY ====================

export const WithCustomLabel: StoryObj<SpinnerArgs> = {
  args: {
    size: "md",
    label: "Cargando resultados",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usa un label específico cuando el spinner comunica por sí mismo qué contenido está cargando.",
      },
    },
  },
  render: (args) => renderSpinner(args),
};

export const Decorative: StoryObj<SpinnerArgs> = {
  args: {
    size: "md",
    decorative: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usa decorative cuando otro componente ya comunica el estado de carga, por ejemplo un botón con aria-busy.",
      },
    },
  },
  render: (args) => renderSpinner(args),
};

// ==================== COMPOSITION ====================

export const InButton: StoryObj<SpinnerArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de uso decorativo dentro de un botón en estado loading. El botón comunica el estado mediante aria-busy.",
      },
    },
  },
  render: () => html`
    <opo-button loading>
      Procesando
      <opo-spinner slot="loader" size="sm" decorative></opo-spinner>
    </opo-button>
  `,
};

export const InText: StoryObj<SpinnerArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de spinner junto a texto visible. En este caso el spinner puede ser decorativo porque el texto ya comunica el estado.",
      },
    },
  },
  render: () => html`
    <div style="display: inline-flex; align-items: center; gap: 8px;">
      <opo-spinner size="sm" decorative></opo-spinner>
      <span>Cargando contenido…</span>
    </div>
  `,
};
