import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const pendingImage = "/src/assets/demo/promo-card-course.png";
const freeTestsImage = "/src/assets/demo/promo-card-free-tests.png";
const knowledgeTestImage = "/src/assets/demo/promo-card-knowledge-test.png";

const meta: Meta = {
  title: "Components/Blocks/Promo Card",
  component: "opo-promo-card",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      page: null,
      description: {
        component:
          "Bloque promocional para áreas de producto. Combina un título, texto de apoyo, media visual y una acción mediante slot o un estado pendiente.",
      },
    },
  },
  argTypes: {
    heading: {
      control: "text",
      description: "Título principal mostrado en la cabecera de la card.",
      table: { defaultValue: { summary: "undefined" } },
    },
    description: {
      control: "text",
      description: "Texto de apoyo mostrado debajo del título.",
      table: { defaultValue: { summary: "undefined" } },
    },
    imageSrc: {
      control: "text",
      description: "Ruta de la imagen utilizada en el área media.",
      table: { defaultValue: { summary: "undefined" } },
    },
    imageAlt: {
      control: "text",
      description:
        "Texto alternativo accesible para la imagen. Déjalo vacío cuando la imagen sea decorativa.",
      table: { defaultValue: { summary: '""' } },
    },
    headingLevel: {
      control: "select",
      options: [2, 3, 4, 5, 6],
      description:
        "Nivel semántico del heading. El estilo visual no cambia.",
      table: { defaultValue: { summary: "3" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Hace que la card ocupe todo el ancho disponible.",
      table: { defaultValue: { summary: "false" } },
    },
    pending: {
      control: "boolean",
      description:
        "Muestra un estado pendiente no interactivo en lugar del slot de acción.",
      table: { defaultValue: { summary: "false" } },
    },
    pendingLabel: {
      control: "text",
      description: "Texto mostrado cuando la card está en estado pendiente.",
      table: { defaultValue: { summary: "Próximamente" } },
    },
    actionLabel: {
      control: "text",
      description: "Label utilizado solo en la story para el ejemplo de acción mediante slot.",
      table: {
        category: "Story helpers",
      },
    },
  },
};

export default meta;

type PromoCardArgs = {
  heading: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  fullWidth?: boolean;
  pending?: boolean;
  pendingLabel?: string;
  actionLabel?: string;
};

/**
 * Helper para renderizar stories individuales con un override de layout
 * y validar de forma segura la compatibilidad con subgrid.
 */
function renderStory(content: unknown) {
  return html`
    <style>
      .story-single-container {
        min-height: 400px;
        padding: 30px 40px 40px;
        box-sizing: border-box;
        max-inline-size: 500px;
        margin-inline: auto;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: max-content max-content max-content;
        align-content: start;
        gap: 0;
      }
      /* Forzamos externamente que el componente actúe en subgrid en la prueba */
      .story-single-container opo-promo-card {
        display: contents;
      }
      .story-single-container opo-promo-card::part(base) {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
        row-gap: 0;
      }
    </style>
    <div class="story-single-container">${content}</div>
  `;
}

function renderPromoCard(args: PromoCardArgs) {
  return html`
    <opo-promo-card
      heading=${args.heading}
      description=${ifDefined(args.description)}
      image-src=${args.imageSrc}
      image-alt=${ifDefined(args.imageAlt)}
      heading-level=${args.headingLevel ?? 3}
      ?full-width=${args.fullWidth}
      ?pending=${args.pending}
      pending-label=${ifDefined(args.pendingLabel)}
    >
      ${!args.pending
        ? html`
            <opo-button slot="action" variant="primary">
              ${args.actionLabel ?? "Acceder gratis"}
            </opo-button>
          `
        : null}
    </opo-promo-card>
  `;
}

// ==================== BASIC ====================

export const Default: StoryObj<PromoCardArgs> = {
  args: {
    heading: "OpositaTest es Gratis",
    description: "¡Accede gratis a todos los test de oposiciones!",
    imageSrc: freeTestsImage,
    imageAlt: "",
    headingLevel: 3,
    actionLabel: "Acceder gratis",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

// ==================== STATES ====================

export const Pending: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Temario avanzado",
    description:
      "Nuevos recursos de preparación estarán disponibles próximamente.",
    imageSrc: pendingImage,
    imageAlt: "",
    headingLevel: 3,
    pending: true,
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

export const CustomPendingLabel: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Nuevos simulacros",
    description: "Estamos preparando nuevos simulacros para esta oposición.",
    imageSrc: pendingImage,
    imageAlt: "",
    headingLevel: 3,
    pending: true,
    pendingLabel: "Disponible pronto",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

// ==================== COMPOSITION ====================

export const WithActionSlot: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Test de conocimientos",
    description: "¿Cuánto sabes sobre el proceso de la oposición?",
    imageSrc: knowledgeTestImage,
    imageAlt: "",
    headingLevel: 3,
    actionLabel: "Hacer test de conocimientos",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

export const SemanticHeading: StoryObj<PromoCardArgs> = {
  args: {
    heading: "Recursos para preparar tu oposición",
    description:
      "El nivel semántico del heading puede adaptarse a la jerarquía de la página sin cambiar el estilo visual.",
    imageSrc: freeTestsImage,
    imageAlt: "",
    headingLevel: 4,
    actionLabel: "Ver recursos",
  },
  render: (args) => renderStory(renderPromoCard(args)),
};

// ==================== LAYOUT ====================

export const FullWidth: StoryObj<PromoCardArgs> = {
  args: {
    heading: "OpositaTest es Gratis",
    description: "¡Accede gratis a todos los test de oposiciones!",
    imageSrc: freeTestsImage,
    imageAlt: "",
    headingLevel: 3,
    fullWidth: true,
    actionLabel: "Acceder gratis",
  },
  render: (args) => html`
    <style>
      .story-fullwidth-container {
        width: 700px;
        border: 1px dashed #afafb3;
        padding: 16px;
        min-height: 400px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: max-content max-content max-content;
        align-content: start;
        gap: 0;
      }
      .story-fullwidth-container opo-promo-card {
        display: contents;
      }
      .story-fullwidth-container opo-promo-card::part(base) {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
        row-gap: 0;
      }
    </style>
    <div class="story-fullwidth-container">${renderPromoCard(args)}</div>
  `,
};

export const CardGroup: StoryObj<PromoCardArgs> = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Ejemplo de layout con varias promo cards dentro de un grid externo responsive. La card mantiene su layout flex standalone.",
      },
    },
  },
  render: () => html`
    <style>
      .opo-promo-cards-demo {
        min-height: 500px;
        padding: 30px 40px 40px;
        box-sizing: border-box;
      }

      .opo-promo-cards-grid {
        display: grid;
        grid-template-columns: minmax(0, 333px);
        justify-content: center;
        gap: 48px;
        max-inline-size: 1100px;
        margin-inline: auto;
      }

      @media (width >= 768px) {
        .opo-promo-cards-grid {
          grid-template-columns: repeat(2, minmax(0, 333px));
          column-gap: 48px;
        }
      }

      @media (width >= 1024px) {
        .opo-promo-cards-grid {
          grid-template-columns: repeat(3, minmax(0, 333px));
        }
      }
    </style>

    <div class="opo-promo-cards-demo">
      <div class="opo-promo-cards-grid">
        <opo-promo-card
          full-width
          heading="OpositaTest gratis"
          description="Accede gratis a todos los test de oposiciones."
          image-src=${freeTestsImage}
          image-alt=""
        >
          <opo-button slot="action" variant="primary">
            Acceder gratis
          </opo-button>
        </opo-promo-card>

        <opo-promo-card
          full-width
          heading="Test de nivel"
          description="Comprueba cuánto sabes sobre tu oposición."
          image-src=${knowledgeTestImage}
          image-alt=""
        >
          <opo-button slot="action" variant="primary"> Hacer test </opo-button>
        </opo-promo-card>

        <opo-promo-card
          full-width
          heading="Nuevos recursos"
          description="Estamos preparando nuevas herramientas de estudio."
          image-src=${pendingImage}
          image-alt=""
          pending
        ></opo-promo-card>
      </div>
    </div>
  `,
};
