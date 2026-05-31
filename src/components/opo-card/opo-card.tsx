import { Component, Prop, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-card",
  styleUrl: "opo-card.css",
  shadow: true,
})
export class OpoCard {
  /** Semantic root element. */
  @Prop() as: "div" | "article" | "section" = "div";

  /** Visual style of the card. */
  @Prop() variant: "default" | "outlined" | "elevated" = "default";

  /** Internal spacing density. */
  @Prop() size: "sm" | "md" | "lg" = "md";

  /** Makes the card take the full available width. */
  @Prop({ reflect: true }) fullWidth = false;

  /** Makes the card visually interactive. Does not add navigation or action semantics by itself. */
  @Prop({ reflect: true }) interactive = false;

  render() {
    const Tag = this.as;

    const classes = clsx(
      // Base
      "opo-card",

      // Variants
      `opo-card--${this.variant}`,

      // Sizes
      `opo-card--${this.size}`,

      // Modifiers
      {
        "opo-card--full-width": this.fullWidth,
        "opo-card--interactive": this.interactive,
      },
    );

    return (
      <Tag part="base" class={classes}>
        <slot />
      </Tag>
    );
  }
}
