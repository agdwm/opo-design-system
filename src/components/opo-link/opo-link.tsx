import { Component, Prop, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-link",
  styleUrl: "opo-link.css",
  shadow: true,
})
export class OpoLink {
  /** URL that the link points to. */
  @Prop() href?: string;

  /** Visual style of the link. */
  @Prop() variant: "primary" | "secondary" = "primary";

  /** Removes the underline when the surrounding context already makes the link purpose clear. */
  @Prop({ reflect: true }) quiet = false;

  /**
   * Disables navigation and renders a non-interactive element.
   * Since <a> does not support the native disabled attribute,
   * the component renders a semantic fallback element instead.
   */
  @Prop({ reflect: true }) disabled = false;

  /** Static color for links displayed on fixed dark/light backgrounds. */
  @Prop() staticColor?: "white" | "black";

  /** Where to open the linked document. */
  @Prop() target?: "_blank" | "_self" | "_parent" | "_top";

  /** Relationship between the current document and the linked document. */
  @Prop() rel?: string;

  /** Prompts the browser to download the linked resource. */
  @Prop() download?: boolean | string;

  /** Referrer policy for the request. */
  @Prop() referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";

  /** Accessible label when the visible text is not descriptive enough. */
  @Prop() ariaLabel?: string;

  private get computedRel() {
    if (this.rel) return this.rel;

    if (this.target === "_blank") {
      return "noopener noreferrer";
    }

    return undefined;
  }

  private get isDisabled() {
    return this.disabled || !this.href;
  }

  render() {
    const classes = clsx(
      // Base
      "opo-link",

      // Variants
      `opo-link--${this.variant}`,

      // Modifiers
      {
        "opo-link--quiet": this.quiet,
        [`opo-link--static-${this.staticColor}`]: this.staticColor,
      },

      // States
      {
        "is-disabled": this.isDisabled,
      },
    );

    // Disabled or non-navigable state
    if (this.isDisabled) {
      return (
        <span
          part="base"
          class={classes}
          aria-disabled={this.disabled ? "true" : undefined}
          aria-label={this.ariaLabel}
        >
          <slot />
        </span>
      );
    }

    // Interactive link
    return (
      <a
        part="base"
        class={classes}
        href={this.href}
        target={this.target}
        rel={this.computedRel}
        download={this.download}
        referrerPolicy={this.referrerPolicy}
        aria-label={this.ariaLabel}
      >
        <slot />
      </a>
    );
  }
}
