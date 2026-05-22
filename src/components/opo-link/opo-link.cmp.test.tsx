import { h } from "@stencil/core";
import { describe, expect, it, render } from "@stencil/vitest";

describe("opo-link", () => {
  // =========================================================
  // RENDERING
  // =========================================================

  describe("rendering", () => {
    it("renders a native anchor when href is provided", async () => {
      const { root } = await render(<opo-link href="/docs">Docs</opo-link>);

      const link = root.shadowRoot?.querySelector("a");
      const fallback = root.shadowRoot?.querySelector("span");

      expect(root).toHaveClass("hydrated");
      expect(link).toBeTruthy();
      expect(fallback).toBeNull();

      expect(link).toHaveClass("opo-link");
      expect(link).toHaveClass("opo-link--primary");
      expect(link?.getAttribute("href")).toBe("/docs");
      expect(link?.getAttribute("part")).toBe("base");
    });

    it("renders a non-navigable span when href is not provided", async () => {
      const { root } = await render(<opo-link>Missing href</opo-link>);

      const link = root.shadowRoot?.querySelector("a");
      const fallback = root.shadowRoot?.querySelector("span");

      expect(link).toBeNull();
      expect(fallback).toBeTruthy();

      expect(fallback).toHaveClass("opo-link");
      expect(fallback).toHaveClass("is-disabled");
      expect(fallback?.getAttribute("part")).toBe("base");
      expect(fallback?.hasAttribute("aria-disabled")).toBe(false);
    });
  });

  // =========================================================
  // STYLING API
  // =========================================================

  describe("styling API", () => {
    it("applies the selected visual variant", async () => {
      const { root } = await render(
        <opo-link href="/docs" variant="secondary">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link).toHaveClass("opo-link--secondary");
    });

    it("applies the quiet modifier", async () => {
      const { root } = await render(
        <opo-link href="/docs" quiet>
          Quiet link
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(root.hasAttribute("quiet")).toBe(true);
      expect(link).toHaveClass("opo-link--quiet");
    });

    it("applies static color classes", async () => {
      const { root } = await render(
        <opo-link href="/docs" staticColor="white">
          Static white
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link).toHaveClass("opo-link--static-white");
    });

    it("exposes the expected shadow part", async () => {
      const { root } = await render(<opo-link href="/docs">Docs</opo-link>);

      const base = root.shadowRoot?.querySelector('[part="base"]');

      expect(base).toBeTruthy();
    });
  });

  // =========================================================
  // STATES
  // =========================================================

  describe("states", () => {
    it("renders a disabled semantic fallback when disabled is true", async () => {
      const { root } = await render(
        <opo-link href="/docs" disabled>
          Disabled link
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");
      const fallback = root.shadowRoot?.querySelector("span");

      expect(root.hasAttribute("disabled")).toBe(true);

      expect(link).toBeNull();
      expect(fallback).toBeTruthy();

      expect(fallback).toHaveClass("is-disabled");
      expect(fallback?.getAttribute("aria-disabled")).toBe("true");
      expect(fallback?.getAttribute("part")).toBe("base");
    });

    it("does not expose href when disabled", async () => {
      const { root } = await render(
        <opo-link href="/docs" disabled>
          Disabled link
        </opo-link>,
      );

      const fallback = root.shadowRoot?.querySelector("span");

      expect(fallback?.hasAttribute("href")).toBe(false);
    });
  });

  // =========================================================
  // LINK ATTRIBUTES
  // =========================================================

  describe("link attributes", () => {
    it("applies target when provided", async () => {
      const { root } = await render(
        <opo-link href="/docs" target="_self">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("target")).toBe("_self");
    });

    it('automatically applies rel="noopener noreferrer" when target is _blank', async () => {
      const { root } = await render(
        <opo-link href="https://example.com" target="_blank">
          External
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("target")).toBe("_blank");
      expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("preserves custom rel when provided", async () => {
      const { root } = await render(
        <opo-link href="https://example.com" target="_blank" rel="external">
          External
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("rel")).toBe("external");
    });

    it("applies download as a filename when provided as string", async () => {
      const { root } = await render(
        <opo-link href="/file.pdf" download="file.pdf">
          Download
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("download")).toBe("file.pdf");
    });

    it("applies download as a boolean attribute", async () => {
      const { root } = await render(
        <opo-link href="/file.pdf" download={true}>
          Download
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.hasAttribute("download")).toBe(true);
    });

    it("applies referrerPolicy when provided", async () => {
      const { root } = await render(
        <opo-link href="/docs" referrerPolicy="no-referrer">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("referrerpolicy")).toBe("no-referrer");
    });
  });

  // =========================================================
  // ACCESSIBILITY
  // =========================================================

  describe("accessibility", () => {
    it("applies aria-label to the native anchor", async () => {
      const { root } = await render(
        <opo-link href="/docs" ariaLabel="Open documentation">
          Docs
        </opo-link>,
      );

      const link = root.shadowRoot?.querySelector("a");

      expect(link?.getAttribute("aria-label")).toBe("Open documentation");
    });

    it("applies aria-label to the non-navigable fallback", async () => {
      const { root } = await render(
        <opo-link ariaLabel="Unavailable documentation">Docs</opo-link>,
      );

      const fallback = root.shadowRoot?.querySelector("span");

      expect(fallback?.getAttribute("aria-label")).toBe(
        "Unavailable documentation",
      );
    });
  });
});
