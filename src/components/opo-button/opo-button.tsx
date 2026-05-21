import { Build, Component, Element, Prop, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-button",
  styleUrl: "opo-button.css",
  shadow: true,
})
export class OpoButton {
  @Element() el!: HTMLElement;

  /** Visual style of the button. */
  @Prop() variant: "primary" | "secondary" | "ghost" | "destructive" =
    "primary";

  /** Visual size of the button. */
  @Prop() size: "sm" | "md" | "lg" = "md";

  /** Renders the button as an icon-only button. */
  @Prop({ reflect: true }) iconOnly = false;

  /** Makes the button take the full available width. */
  @Prop({ reflect: true }) fullWidth = false;

  /** Shows a loading state and prevents interaction. */
  @Prop() loading = false;

  /** Disables the button. */
  @Prop() disabled = false;

  /** Accessible label. Required when the button has no visible text, eg: icon-only buttons. */
  @Prop() ariaLabel?: string;

  /** Native button type. */
  @Prop() type: "button" | "submit" | "reset" = "button";

  private get isInteractionDisabled() {
    return this.disabled || this.loading;
  }

  private get hasIconStart() {
    return !!this.el.querySelector('[slot="icon-start"]');
  }

  private get hasIconEnd() {
    return !!this.el.querySelector('[slot="icon-end"]');
  }

  private get isIconOnly() {
    return this.iconOnly;
  }

  private validateAccessibility() {
    if (Build.isDev && this.isIconOnly && !this.ariaLabel) {
      console.warn(
        "[opo-button] Icon-only buttons should provide an accessible ariaLabel.",
      );
    }
  }

  render() {
    this.validateAccessibility();

    const classes = clsx(
      // Base
      "opo-button",

      // Variants
      `opo-button--${this.variant}`,
      // Sizes
      `opo-button--${this.size}`,
      // Modifiers
      {
        "opo-button--full-width": this.fullWidth,
        "opo-button--icon-only": this.iconOnly,
      },
      // States
      {
        "is-loading": this.loading,
        "is-disabled": this.disabled,
      },
    );

    return (
      <button
        // Public styling API
        part="base"
        class={classes}
        // Native button behavior
        type={this.type}
        disabled={this.isInteractionDisabled}
        // Accessibility
        aria-label={this.ariaLabel}
        aria-busy={this.loading ? "true" : undefined}
      >
        {this.hasIconStart && (
          <span class="opo-button__icon-start" part="icon-start">
            <slot name="icon-start" />
          </span>
        )}

        {!this.isIconOnly && (
          <span class="opo-button__label" part="label">
            <slot />
          </span>
        )}

        {this.hasIconEnd && (
          <span class="opo-button__icon-end" part="icon-end">
            <slot name="icon-end" />
          </span>
        )}

        {this.loading && (
          <span class="opo-button__loader" part="loader" aria-hidden="true">
            <slot name="loader">
              <opo-spinner size="sm" />
            </slot>
          </span>
        )}
      </button>
    );
  }
}
