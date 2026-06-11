import { Component, Prop, State, Watch, h } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-avatar",
  styleUrl: "opo-avatar.css",
  shadow: true,
})
export class OpoAvatar {
  /** Image source. */
  @Prop() src?: string;

  /**
   * Accessible image description.
   * Use an empty string when the avatar is decorative or when the name is already visible nearby.
   */
  @Prop() alt = "";

  /** Fallback text, usually initials. */
  @Prop() fallback?: string;

  /** Fallback icon name used when there is no image or text fallback. */
  @Prop() fallbackIcon = "user";

  /** Visual size of the avatar. */
  @Prop() size: "sm" | "md" | "lg" = "md";

  /** Fallback color treatment. */
  @Prop() color: "neutral" | "brand" = "neutral";

  /* @State is reactive, so if hasImageError changes,
     the component will automatically re-render. */
  @State() private hasImageError = false;

  /* If the image URL changes, Stencil executes the @Watch method,
  which calls handleSrcChange to reset the error and retry rendering the new image. */
  @Watch("src")
  protected handleSrcChange() {
    /* hasImageError is a State (reactive), so when the value changes,
    Stencil detects a State change and automatically re-renders the component. */
    this.hasImageError = false;
  }

  // We only render the image when a URL exists
  // and the image has not previously failed.
  private get shouldRenderImage() {
    return !!this.src && !this.hasImageError;
  }

  // If the image fails to load,
  // we activate fallback mode.
  private handleImageError = () => {
    this.hasImageError = true;
  };

  render() {
    const classes = clsx(
      // Base
      "opo-avatar",

      // Sizes
      `opo-avatar--${this.size}`,

      // Variants
      `opo-avatar--${this.color}`,

      // States
      {
        "is-image": this.shouldRenderImage,
        "is-fallback": !this.shouldRenderImage,
      },
    );

    return (
      <span part="base" class={classes}>
        {this.shouldRenderImage ? (
          <img
            part="image"
            class="opo-avatar__image"
            src={this.src}
            alt={this.alt}
            loading="lazy"
            decoding="async"
            /* Native event that is triggered when the image fails to load:
            404, corrupted image, network error, etc. */
            onError={this.handleImageError}
          />
        ) : (
          <span part="fallback" class="opo-avatar__fallback" aria-hidden="true">
            {this.fallback ? (
              this.fallback
            ) : (
              <opo-icon name={this.fallbackIcon} size="md" aria-hidden="true" />
            )}
          </span>
        )}
      </span>
    );
  }
}
