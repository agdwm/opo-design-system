import { Component, Prop, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-spinner",
  styleUrl: "opo-spinner.css",
  shadow: true,
})
export class OpoSpinner {
  /** Visual size of the spinner. */
  @Prop() size: "sm" | "md" | "lg" = "md";

  /** Accessible label used when the spinner communicates loading by itself. */
  @Prop() label = "Cargando";

  /**
   * Hides the spinner from assistive technologies.
   * Use it when another element already communicates the loading state.
   */
  @Prop({ reflect: true }) decorative = false;

  render() {
    const classes = clsx(
      // Base
      "opo-spinner",

      // Sizes
      `opo-spinner--${this.size}`,
    );

    return (
      <span
        part="base"
        class={classes}
        role={this.decorative ? undefined : "status"}
        aria-label={this.decorative ? undefined : this.label}
        aria-hidden={this.decorative ? "true" : undefined}
      />
    );
  }
}
