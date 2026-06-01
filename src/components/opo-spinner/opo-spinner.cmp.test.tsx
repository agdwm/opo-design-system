import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-spinner", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders with default props", async () => {
      const { root } = await render(<opo-spinner></opo-spinner>);

      const spinner = root.shadowRoot?.querySelector('[part="base"]');

      expect(root).toHaveClass("hydrated");
      expect(spinner).toBeTruthy();
      expect(spinner).toHaveClass("opo-spinner");
      expect(spinner).toHaveClass("opo-spinner--md");
    });

    it("applies the selected size class", async () => {
      const { root } = await render(<opo-spinner size="lg"></opo-spinner>);

      const spinner = root.shadowRoot?.querySelector('[part="base"]');

      expect(spinner).toHaveClass("opo-spinner--lg");
    });

    it("exposes the base shadow part", async () => {
      const { root } = await render(<opo-spinner></opo-spinner>);

      expect(root.shadowRoot?.querySelector('[part="base"]')).toBeTruthy();
    });
  });

  // =========================================================
  // ACCESSIBILITY
  // =========================================================

  describe("accessibility", () => {
    it("renders as a status indicator by default", async () => {
      const { root } = await render(<opo-spinner></opo-spinner>);

      const spinner = root.shadowRoot?.querySelector('[part="base"]');

      expect(spinner?.getAttribute("role")).toBe("status");
      expect(spinner?.getAttribute("aria-label")).toBe("Cargando");
      expect(spinner?.hasAttribute("aria-hidden")).toBe(false);
    });

    it("uses a custom accessible label when provided", async () => {
      const { root } = await render(
        <opo-spinner label="Cargando resultados"></opo-spinner>,
      );

      const spinner = root.shadowRoot?.querySelector('[part="base"]');

      expect(spinner?.getAttribute("aria-label")).toBe("Cargando resultados");
    });

    it("renders as decorative when decorative is true", async () => {
      const { root } = await render(<opo-spinner decorative></opo-spinner>);

      const spinner = root.shadowRoot?.querySelector('[part="base"]');

      expect(root).toHaveAttribute("decorative");
      expect(spinner?.hasAttribute("role")).toBe(false);
      expect(spinner?.hasAttribute("aria-label")).toBe(false);
      expect(spinner?.getAttribute("aria-hidden")).toBe("true");
    });
  });
});
