import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Atoms/Card",
  component: "opo-card",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Primitivo visual para componer superficies tipo card. Aporta superficie, borde, sombra, radio y padding, mientras que la estructura interna del contenido pertenece a quien consume el componente.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "article", "section"],
      description: "Elemento raíz semántico renderizado por la card.",
      table: { defaultValue: { summary: "div" } },
    },
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"],
      description: "Estilo visual de la card.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Densidad de espaciado interno.",
      table: { defaultValue: { summary: "md" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Hace que la card ocupe todo el ancho disponible.",
      table: { defaultValue: { summary: "false" } },
    },
    interactive: {
      control: "boolean",
      description:
        "Añade affordance visual interactiva. No añade semántica de botón ni de enlace.",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export default meta;

type CardArgs = {
  as?: "div" | "article" | "section";
  variant?: "default" | "outlined" | "elevated";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  interactive?: boolean;
};

function renderCard(args: CardArgs) {
  return html`
    <opo-card
      as=${args.as ?? "div"}
      variant=${args.variant ?? "default"}
      size=${args.size ?? "md"}
      ?full-width=${args.fullWidth}
      ?interactive=${args.interactive}
    >
      <div style="display: grid; gap: 12px;">
        <p
          style="margin: 0; color: var(--sys-color-text-muted); font-size: 0.875rem;"
        >
          Preparación
        </p>

        <h3
          style="margin: 0; color: var(--sys-typography-heading-color); font-size: 1.25rem; line-height: 1.25;"
        >
          Plan de estudio semanal
        </h3>

        <p
          style="margin: 0; color: var(--sys-color-text-muted); line-height: 1.5;"
        >
          Organiza tus sesiones de estudio, repasos y simulacros desde un único
          espacio.
        </p>

        <opo-button variant="primary" size="md"> Ver plan </opo-button>
      </div>
    </opo-card>
  `;
}

// ==================== VARIANTS ====================

export const Default: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
  },
  render: (args) => renderCard(args),
};

export const Outlined: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "outlined",
    size: "md",
  },
  render: (args) => renderCard(args),
};

export const Elevated: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "elevated",
    size: "md",
  },
  render: (args) => renderCard(args),
};

// ==================== SIZES ====================

export const Small: StoryObj<CardArgs> = {
  args: {
    as: "div",
    size: "sm",
  },
  render: (args) => renderCard(args),
};

export const Medium: StoryObj<CardArgs> = {
  args: {
    as: "div",
    size: "md",
  },
  render: (args) => renderCard(args),
};

export const Large: StoryObj<CardArgs> = {
  args: {
    as: "div",
    size: "lg",
  },
  render: (args) => renderCard(args),
};

// ==================== SEMANTIC ROOT ====================

export const AsArticle: StoryObj<CardArgs> = {
  args: {
    as: "article",
    variant: "default",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usa article cuando la card representa una pieza de contenido independiente.",
      },
    },
  },
  render: (args) => renderCard(args),
};

export const AsSection: StoryObj<CardArgs> = {
  args: {
    as: "section",
    variant: "outlined",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usa section cuando la card agrupa un área temática dentro de una página más amplia.",
      },
    },
  },
  render: (args) => renderCard(args),
};

// ==================== COMPOSITION ====================

export const CustomComposition: StoryObj<CardArgs> = {
  args: {
    as: "article",
    variant: "default",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "La card no impone slots de header, content o footer. Quien consume el componente compone la estructura interna con HTML estándar y componentes del Design System.",
      },
    },
  },
  render: (args) => html`
    <opo-card
      as=${args.as ?? "article"}
      variant=${args.variant ?? "default"}
      size=${args.size ?? "md"}
      ?full-width=${args.fullWidth}
      ?interactive=${args.interactive}
    >
      <div style="display: grid; gap: 16px; max-inline-size: 320px;">
        <div style="display: grid; gap: 8px;">
          <span
            style="color: var(--sys-color-brand-primary); font-weight: 600;"
          >
            Recurso
          </span>

          <h3
            style="margin: 0; color: var(--sys-typography-heading-color); font-size: 1.25rem; line-height: 1.25;"
          >
            Guía de accesibilidad
          </h3>

          <p
            style="margin: 0; color: var(--sys-color-text-muted); line-height: 1.5;"
          >
            Buenas prácticas para interfaces accesibles y mantenibles.
          </p>
        </div>

        <div style="display: flex; gap: 12px; align-items: center;">
          <opo-button variant="primary" size="md">Leer guía</opo-button>
          <opo-link href="/" variant="secondary">Ver detalles</opo-link>
        </div>
      </div>
    </opo-card>
  `,
};

export const WithMedia: StoryObj<CardArgs> = {
  args: {
    as: "article",
    variant: "default",
    size: "md",
  },
  render: (args) => html`
    <opo-card
      as=${args.as ?? "article"}
      variant=${args.variant ?? "default"}
      size=${args.size ?? "md"}
      ?full-width=${args.fullWidth}
      ?interactive=${args.interactive}
    >
      <div style="display: grid; gap: 16px; max-inline-size: 360px;">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop"
          alt=""
          style="display: block; inline-size: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: 6px;"
        />

        <div style="display: grid; gap: 8px;">
          <span
            style="color: var(--sys-color-brand-primary); font-weight: 600;"
          >
            Curso
          </span>

          <h3
            style="margin: 0; color: var(--sys-typography-heading-color); font-size: 1.25rem; line-height: 1.25;"
          >
            Diseño de componentes
          </h3>

          <p
            style="margin: 0; color: var(--sys-color-text-muted); line-height: 1.5;"
          >
            Aprende a estructurar componentes reutilizables con una API clara.
          </p>
        </div>
      </div>
    </opo-card>
  `,
};

// ==================== STATES ====================

export const Interactive: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
    interactive: true,
  },
  render: (args) => renderCard(args),
};

// ==================== LAYOUT ====================

export const FullWidth: StoryObj<CardArgs> = {
  args: {
    as: "div",
    variant: "default",
    size: "md",
    fullWidth: true,
  },
  render: (args) => html`
    <div
      style="width: 640px; border: 1px dashed #afafb3; padding: 16px; display: flex;"
    >
      ${renderCard(args)}
    </div>
  `,
};
