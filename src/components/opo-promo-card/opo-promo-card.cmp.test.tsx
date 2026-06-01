import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-promo-card", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders an article as the semantic root", async () => {
      const { root } = await render(
        <opo-promo-card
          heading="OpositaTest gratis"
          description="Accede gratis a todos los test de oposiciones."
          imageSrc="/assets/promo.png"
          imageAlt=""
        >
          <button slot="action">Acceder gratis</button>
        </opo-promo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root).toHaveClass("hydrated");
      expect(base?.tagName.toLowerCase()).toBe("article");
      expect(base).toHaveClass("opo-promo-card");
    });

    it("renders heading, description, media and action slot", async () => {
      const { root } = await render(
        <opo-promo-card
          heading="Test de conocimientos"
          description="Comprueba cuánto sabes sobre tu oposición."
          imageSrc="/assets/knowledge-test.png"
          imageAlt=""
        >
          <button slot="action">Hacer test</button>
        </opo-promo-card>,
      );

      const title = root.shadowRoot?.querySelector('[part="title"]');
      const description = root.shadowRoot?.querySelector('[part="description"]');
      const image = root.shadowRoot?.querySelector('[part="image"]');
      const actionSlot = root.shadowRoot?.querySelector('slot[name="action"]');

      expect(title?.textContent).toBe("Test de conocimientos");
      expect(description?.textContent).toBe(
        "Comprueba cuánto sabes sobre tu oposición.",
      );
      expect(image).toBeTruthy();
      expect(actionSlot).toBeTruthy();
    });

    it("does not render the description when it is not provided", async () => {
      const { root } = await render(
        <opo-promo-card
          heading="OpositaTest gratis"
          imageSrc="/assets/promo.png"
          imageAlt=""
        >
          <button slot="action">Acceder gratis</button>
        </opo-promo-card>,
      );

      const description = root.shadowRoot?.querySelector('[part="description"]');

      expect(description).toBeNull();
    });
  });

  // =========================================================
  // MEDIA
  // =========================================================

  describe("media", () => {
    it("renders image attributes from the public API", async () => {
      const { root } = await render(
        <opo-promo-card
          heading="Recursos gratuitos"
          imageSrc="/assets/free-tests.png"
          imageAlt="Captura de la plataforma"
        >
          <button slot="action">Ver recursos</button>
        </opo-promo-card>,
      );

      const image = root.shadowRoot?.querySelector(
        '[part="image"]',
      ) as HTMLImageElement;

      expect(image.getAttribute("src")).toBe("/assets/free-tests.png");
      expect(image.getAttribute("alt")).toBe("Captura de la plataforma");
      expect(image.getAttribute("loading")).toBe("lazy");
    });

    it("uses an empty alt attribute by default for decorative promo images", async () => {
      const { root } = await render(
        <opo-promo-card
          heading="Recursos gratuitos"
          imageSrc="/assets/free-tests.png"
        >
          <button slot="action">Ver recursos</button>
        </opo-promo-card>,
      );

      const image = root.shadowRoot?.querySelector(
        '[part="image"]',
      ) as HTMLImageElement;

      expect(image.getAttribute("alt")).toBe("");
    });
  });

  // =========================================================
  // SEMANTICS
  // =========================================================

  describe("semantics", () => {
    it("renders the selected heading level", async () => {
      const { root } = await render(
        <opo-promo-card
          heading="Recursos para preparar tu oposición"
          headingLevel={4}
          imageSrc="/assets/promo.png"
          imageAlt=""
        >
          <button slot="action">Ver recursos</button>
        </opo-promo-card>,
      );

      expect(root.shadowRoot?.querySelector("h4")).toBeTruthy();
      expect(root.shadowRoot?.querySelector("h3")).toBeNull();
    });
  });

  // =========================================================
  // STATES
  // =========================================================

  describe("states", () => {
    it("applies full width styles and reflects the full-width attribute", async () => {
      const { root } = await render(
        <opo-promo-card
          fullWidth
          heading="OpositaTest gratis"
          imageSrc="/assets/promo.png"
          imageAlt=""
        >
          <button slot="action">Acceder gratis</button>
        </opo-promo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root).toHaveAttribute("full-width");
      expect(base).toHaveClass("opo-promo-card--full-width");
    });

    it("renders pending state instead of the action slot", async () => {
      const { root } = await render(
        <opo-promo-card
          pending
          heading="Nuevos recursos"
          imageSrc="/assets/pending.png"
          imageAlt=""
        >
          <button slot="action">Acceder</button>
        </opo-promo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const pending = root.shadowRoot?.querySelector('[part="pending"]');
      const actionSlot = root.shadowRoot?.querySelector('slot[name="action"]');

      expect(root).toHaveAttribute("pending");
      expect(base).toHaveClass("is-pending");
      expect(pending?.textContent).toBe("Próximamente");
      expect(actionSlot).toBeNull();
    });

    it("renders a custom pending label", async () => {
      const { root } = await render(
        <opo-promo-card
          pending
          pendingLabel="Disponible pronto"
          heading="Nuevos simulacros"
          imageSrc="/assets/pending.png"
          imageAlt=""
        ></opo-promo-card>,
      );

      const pending = root.shadowRoot?.querySelector('[part="pending"]');

      expect(pending?.textContent).toBe("Disponible pronto");
    });
  });

  // =========================================================
  // SHADOW PARTS
  // =========================================================

  describe("shadow parts", () => {
    it("exposes the expected shadow parts in default state", async () => {
      const { root } = await render(
        <opo-promo-card
          heading="OpositaTest gratis"
          description="Accede gratis a todos los test de oposiciones."
          imageSrc="/assets/promo.png"
          imageAlt=""
        >
          <button slot="action">Acceder gratis</button>
        </opo-promo-card>,
      );

      const shadowRoot = root.shadowRoot;

      expect(shadowRoot?.querySelector('[part="base"]')).toBeTruthy();
      expect(shadowRoot?.querySelector('[part="header"]')).toBeTruthy();
      expect(shadowRoot?.querySelector('[part="title"]')).toBeTruthy();
      expect(shadowRoot?.querySelector('[part="description"]')).toBeTruthy();
      expect(shadowRoot?.querySelector('[part="media"]')).toBeTruthy();
      expect(shadowRoot?.querySelector('[part="image"]')).toBeTruthy();
      expect(shadowRoot?.querySelector('[part="footer"]')).toBeTruthy();
    });

    it("exposes the pending shadow part when pending", async () => {
      const { root } = await render(
        <opo-promo-card
          pending
          heading="Nuevos recursos"
          imageSrc="/assets/pending.png"
          imageAlt=""
        ></opo-promo-card>,
      );

      expect(root.shadowRoot?.querySelector('[part="pending"]')).toBeTruthy();
    });
  });
});
