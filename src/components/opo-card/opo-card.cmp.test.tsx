import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-card", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders a div as the default semantic root", async () => {
      const { root } = await render(<opo-card>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root).toHaveClass("hydrated");
      expect(base?.tagName.toLowerCase()).toBe("div");
      expect(base).toHaveClass("opo-card");
      expect(base).toHaveClass("opo-card--default");
      expect(base).toHaveClass("opo-card--md");
    });

    it("renders an article when as is article", async () => {
      const { root } = await render(
        <opo-card as="article">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base?.tagName.toLowerCase()).toBe("article");
    });

    it("renders a section when as is section", async () => {
      const { root } = await render(
        <opo-card as="section">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base?.tagName.toLowerCase()).toBe("section");
    });

    it("renders default slotted content directly inside the card surface", async () => {
      const { root } = await render(
        <opo-card>
          <p>Contenido principal</p>
        </opo-card>,
      );

      const defaultSlot = root.shadowRoot?.querySelector("slot");

      expect(defaultSlot).toBeTruthy();
      expect(root.textContent).toContain("Contenido principal");
    });
  });

  // =========================================================
  // STYLING API
  // =========================================================

  describe("styling API", () => {
    it("applies the selected visual variant", async () => {
      const { root } = await render(
        <opo-card variant="outlined">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-card--outlined");
    });

    it("applies the elevated variant", async () => {
      const { root } = await render(
        <opo-card variant="elevated">Contenido</opo-card>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-card--elevated");
    });

    it("applies the selected size class", async () => {
      const { root } = await render(<opo-card size="lg">Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-card--lg");
    });

    it("applies full width styles and reflects the full-width attribute", async () => {
      const { root } = await render(<opo-card fullWidth>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root.hasAttribute("full-width")).toBe(true);
      expect(base).toHaveClass("opo-card--full-width");
    });

    it("applies the interactive modifier and reflects the interactive attribute", async () => {
      const { root } = await render(<opo-card interactive>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(root.hasAttribute("interactive")).toBe(true);
      expect(base).toHaveClass("opo-card--interactive");
    });

    it("does not add interactive semantics when interactive is true", async () => {
      const { root } = await render(<opo-card interactive>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base?.getAttribute("role")).toBeNull();
      expect(base?.hasAttribute("tabindex")).toBe(false);
    });
  });

  // =========================================================
  // SHADOW PARTS
  // =========================================================

  describe("shadow parts", () => {
    it("exposes only the base shadow part", async () => {
      const { root } = await render(<opo-card>Contenido</opo-card>);

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const legacyParts = root.shadowRoot?.querySelectorAll(
        '[part="body"], [part="header"], [part="heading"], [part="action"], [part="content"], [part="footer"]',
      );

      expect(base).toBeTruthy();
      expect(legacyParts?.length).toBe(0);
    });
  });
});
