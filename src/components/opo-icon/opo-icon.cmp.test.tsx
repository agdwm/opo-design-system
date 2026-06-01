import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-icon", () => {
  // =========================================================
  // RENDERING
  // =========================================================
  // Verifies the visual rendering contract of the component:
  // sprite usage, slot rendering, and empty states.
  describe("rendering", () => {
    it("renders an SVG icon from the sprite when name is provided", async () => {
      const { root } = await render(<opo-icon name="check"></opo-icon>);

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const custom = root.shadowRoot?.querySelector('[part="custom"]');
      const svg = root.shadowRoot?.querySelector("svg");
      const use = root.shadowRoot?.querySelector("use");

      expect(root).toHaveClass("hydrated");
      expect(base).toBeTruthy();
      expect(custom).toHaveClass("is-empty");
      expect(svg).toBeTruthy();
      expect(use?.getAttribute("href")).toBe(
        "/icons/opo-sprite.svg#opo-icon-check",
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
        "/icons/opo-sprite.svg#opo-icon-check",
      );
    });

    it("normalizes ui and brand prefixes from the public name API", async () => {
      const { root: uiRoot } = await render(<opo-icon name="ui-check"></opo-icon>);
      const { root: brandRoot } = await render(
        <opo-icon name="brand-check"></opo-icon>,
      );

      const uiUse = uiRoot.shadowRoot?.querySelector("use");
      const brandUse = brandRoot.shadowRoot?.querySelector("use");

      expect(uiUse?.getAttribute("href")).toBe(
        "/icons/opo-sprite.svg#opo-icon-check",
      );
      expect(brandUse?.getAttribute("href")).toBe(
        "/icons/opo-sprite.svg#opo-icon-check",
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

      await new Promise((resolve) => setTimeout(resolve, 0));

      const custom = root.shadowRoot?.querySelector('[part="custom"]');
      const slot = root.shadowRoot?.querySelector('slot[name="icon"]');
      const slottedSvg = root.querySelector('svg[slot="icon"]');
      const internalSvg = root.shadowRoot?.querySelector('[part="svg"]');
      const internalUse = root.shadowRoot?.querySelector("use");
      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(slot).toBeTruthy();
      expect(custom).not.toHaveClass("is-empty");
      expect(slottedSvg).toBeTruthy();
      expect(internalSvg).toBeNull();
      expect(internalUse).toBeNull();
      expect(base).toHaveClass("has-custom-icon");
    });

    it('renders a custom slotted SVG when no name is provided', async () => {
      const { root } = await render(
        <opo-icon ariaLabel="Custom icon">
          <svg slot="icon" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </opo-icon>,
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const custom = root.shadowRoot?.querySelector('[part="custom"]');
      const slot = root.shadowRoot?.querySelector('slot[name="icon"]');
      const slottedSvg = root.querySelector('svg[slot="icon"]');
      const internalSvg = root.shadowRoot?.querySelector('[part="svg"]');
      const internalUse = root.shadowRoot?.querySelector("use");

      expect(base).toBeTruthy();
      expect(custom).not.toHaveClass("is-empty");
      expect(slot).toBeTruthy();
      expect(slottedSvg).toBeTruthy();
      expect(internalSvg).toBeNull();
      expect(internalUse).toBeNull();
      expect(base).toHaveClass("has-custom-icon");
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
  describe("accessibility", () => {
    it("treats the icon as decorative when ariaLabel is not provided", async () => {
      const { root } = await render(<opo-icon name="star"></opo-icon>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base?.getAttribute("aria-hidden")).toBe("true");

      expect(base?.getAttribute("role")).toBeNull();
      expect(base?.hasAttribute("role")).toBe(false);

      expect(base?.getAttribute("aria-label")).toBeNull();
    });

    it("treats the icon as informative when ariaLabel is provided", async () => {
      const { root } = await render(
        <opo-icon name="warning" ariaLabel="Warning"></opo-icon>,
      );

      const base = root.shadowRoot?.querySelector('[part="base"]');
      const svg = root.shadowRoot?.querySelector("svg");

      expect(base?.getAttribute("role")).toBe("img");
      expect(base?.getAttribute("aria-label")).toBe("Warning");
      expect(base?.getAttribute("aria-hidden")).toBeNull();
      expect(base?.hasAttribute("aria-hidden")).toBe(false);

      expect(svg?.getAttribute("aria-hidden")).toBe("true");
      expect(svg?.getAttribute("focusable")).toBe("false");
    });
  });

  // =========================================================
  // STYLING API
  // =========================================================
  describe("styling API", () => {
    it("reflects the default size attribute", async () => {
      const { root } = await render(<opo-icon name="check"></opo-icon>);

      expect(root.getAttribute("size")).toBe("md");
    });

    it("reflects the selected size attribute", async () => {
      const { root } = await render(
        <opo-icon name="check" size="lg"></opo-icon>,
      );

      expect(root.getAttribute("size")).toBe("lg");
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
      const custom = root.shadowRoot?.querySelector('[part="custom"]');

      expect(base).toBeTruthy();
      expect(svg).toBeTruthy();
      expect(custom).toBeTruthy();
    });
  });
});
