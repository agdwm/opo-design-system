import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-icon", () => {
  // =========================================================
  // RENDERING
  // =========================================================
  // Verifies the visual rendering contract of the component:
  // sprite usage, slot rendering and empty states.
  describe("rendering", () => {
    it("renders an SVG icon from the sprite when name is provided", async () => {
      const { root } = await render(<opo-icon name="check"></opo-icon>);

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const svg = root.shadowRoot?.querySelector("svg");
      const use = root.shadowRoot?.querySelector("use");

      expect(root).toHaveClass("hydrated");
      expect(base).toBeTruthy();
      expect(svg).toBeTruthy();
      expect(use?.getAttribute("href")).toBe(
        "/icons/opo-sprite-ui.svg#opo-icon-check",
      );
    });

    it("uses a custom spriteUrl when provided", async () => {
      const { root } = await render(
        <opo-icon name="check" spriteUrl="/custom-url/icons.svg"></opo-icon>,
      );

      const use = root.shadowRoot?.querySelector("use");

      expect(use?.getAttribute("href")).toBe(
        "/custom-url/icons.svg#opo-icon-check",
      );
    });

    it("normalizes internal icon prefixes from the public name API", async () => {
      const { root } = await render(
        <opo-icon name="opo-icon-check"></opo-icon>,
      );

      const use = root.shadowRoot?.querySelector("use");

      expect(use?.getAttribute("href")).toBe(
        "/icons/opo-sprite-ui.svg#opo-icon-check",
      );
    });

    it('renders a custom slotted SVG instead of the internal sprite icon when slot="icon" is provided', async () => {
      const { root } = await render(
        <opo-icon name="check" ariaLabel="Custom icon">
          <svg slot="icon" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </opo-icon>,
      );

      const slot = root.shadowRoot?.querySelector('slot[name="icon"]');
      const internalUse = root.shadowRoot?.querySelector("use");
      const slottedSvg = root.querySelector('svg[slot="icon"]');

      expect(slot).toBeTruthy(); // the named slot should exist in the shadow DOM
      expect(slottedSvg).toBeTruthy(); // custom SVG should be rendered through the slot
      expect(internalUse).toBeNull(); // sprite-based icon should not render when a slotted icon is provided
    });

    it("does not render the icon wrapper when neither name nor custom slot is provided", async () => {
      const { root } = await render(<opo-icon></opo-icon>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toBeNull();
    });
  });

  // =========================================================
  // ACCESSIBILITY
  // =========================================================
  // Ensures the component exposes the correct accessible
  // semantics for decorative and informative icons.
  describe("accessibility", () => {
    it("treats the icon as decorative when ariaLabel is not provided", async () => {
      const { root } = await render(<opo-icon name="star"></opo-icon>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base?.getAttribute("aria-hidden")).toBe("true");
      expect(base?.getAttribute("role")).toBeNull();
      expect(base?.getAttribute("aria-label")).toBeNull(); // if the icon is decorative, we don't want it to have an accessible name.
    });

    it("treats the icon as informative when ariaLabel is provided", async () => {
      const { root } = await render(
        <opo-icon name="warning" ariaLabel="Warning"></opo-icon>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const svg = root.shadowRoot?.querySelector("svg");

      expect(base?.getAttribute("role")).toBe("img"); // este elemento funciona como una imagen
      expect(base?.getAttribute("aria-label")).toBe("Warning");
      expect(base?.getAttribute("aria-hidden")).toBeNull(); // si el icono es informativo, no debe ser oculto para los lectores de pantalla

      expect(svg?.getAttribute("aria-hidden")).toBe("true"); //El SVG interno se oculta para que el lector de pantalla no lea contenido duplicado
      expect(svg?.getAttribute("focusable")).toBe("false");
    });
  });

  // =========================================================
  // STYLING API
  // =========================================================
  // Verifies the public styling contract exposed through:
  // classes, modifiers and shadow parts.
  describe("styling API", () => {
    it("applies the default size class", async () => {
      const { root } = await render(<opo-icon name="check"></opo-icon>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-icon--md");
    });

    it("applies the selected size class", async () => {
      const { root } = await render(
        <opo-icon name="check" size="lg"></opo-icon>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-icon--lg");
    });

    it("applies the selected semantic color class", async () => {
      const { root } = await render(
        <opo-icon name="check" color="success"></opo-icon>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("opo-icon--color-success");
    });

    it("applies the spinning state class when spinning is true", async () => {
      const { root } = await render(
        <opo-icon name="refresh-cw" spinning></opo-icon>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toHaveClass("is-spinning");
    });

    it("exposes the expected shadow parts", async () => {
      const { root } = await render(<opo-icon name="check"></opo-icon>);

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const svg = root.shadowRoot?.querySelector('[part="svg"]');

      expect(base).toBeTruthy();
      expect(svg).toBeTruthy();
    });
  });
});
