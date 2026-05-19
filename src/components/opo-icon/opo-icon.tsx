import { Build, Component, Prop, h, Element } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "opo-icon",
  styleUrl: "opo-icon.css",
  shadow: true,
})
export class OpoIcon {
  @Element() el!: HTMLElement;

  private hasWarnedInternalName = false;
  private hasWarnedMissingIcon = false;

  /** Nombre público del icono dentro del catálogo. Requerido si no se usa slot="icon". */
  @Prop() name?: string;

  /** Tamaño visual del icono. */
  @Prop() size: "sm" | "md" | "lg" = "md";

  /** Color semántico opcional. Si no se define, el icono hereda currentColor. */
  @Prop() color?: "primary" | "secondary" | "danger" | "success" | "warning";

  /** Texto accesible para iconos con significado. Si se omite, el icono se trata como decorativo. */
  @Prop() ariaLabel?: string;

  /** Activa una animación continua de rotación. */
  @Prop() spin = false;

  /** URL pública del sprite SVG. Permite que una app consumidora sirva los iconos desde otra ruta. */
  @Prop() spriteUrl = "/icons/opo-sprite-ui.svg";

  private get hasCustomIcon() {
    return !!this.el.querySelector('[slot="icon"]');
  }

  private get normalizedName() {
    if (!this.name) return "";

    const trimmed = this.name.trim();
    const normalized = trimmed
      .replace(/^opo-icon-/, "")
      .replace(/^(ui|brand)-/, "");

    if (Build.isDev && !this.hasWarnedInternalName && normalized !== trimmed) {
      this.hasWarnedInternalName = true;
      console.warn(
        `[opo-icon] Internal prefix detected in name="${trimmed}". Use public names like "check" instead.`,
      );
    }
    return normalized;
  }

  private get iconHref() {
    return `${this.spriteUrl}#opo-icon-${this.normalizedName}`;
  }

  render() {
    if (!this.normalizedName && !this.hasCustomIcon) {
      if (Build.isDev && !this.hasWarnedMissingIcon) {
        this.hasWarnedMissingIcon = true;
        console.warn(
          '[opo-icon] The "name" prop or a slot="icon" is required.',
        );
      }
      return null;
    }

    const classes = clsx("opo-icon", `opo-icon--${this.size}`, {
      [`opo-icon--color-${this.color}`]: this.color,
      "opo-icon--spin": this.spin,
    });

    return (
      <span
        part="base"
        class={classes}
        aria-hidden={this.ariaLabel ? undefined : "true"}
        aria-label={this.ariaLabel}
        role={this.ariaLabel ? "img" : undefined}
      >
        {this.hasCustomIcon ? (
          <slot name="icon" />
        ) : (
          <svg
            part="svg"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <use href={this.iconHref} />
          </svg>
        )}
      </span>
    );
  }
}
