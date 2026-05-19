import { Component, Prop, h, Element } from '@stencil/core';
import { getButtonClasses } from './opo-button.variants';

@Component({
  tag: 'opo-button',
  styleUrl: 'opo-button.css',
  shadow: true,
  formAssociated: true,
})
export class OpoButton {
  @Element() el!: HTMLElement;

  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' = 'primary';
  @Prop() size: 'sm' | 'md' | 'lg' | 'icon' = 'md';
  @Prop() loading = false;
  @Prop() fullWidth = false;

  @Prop() as: 'button' | 'a' | string = 'button';
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() disabled = false;
  @Prop() href?: string;

  private get isLink() {
    return this.as === 'a' || !!this.href;
  }

  render() {
    const Tag = this.isLink ? 'a' : 'button';

    const classes = getButtonClasses({
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      loading: this.loading,
    });

    return (
      <Tag
        type={!this.isLink ? this.type : undefined}
        href={this.href}
        disabled={(!this.isLink && (this.disabled || this.loading)) as any}
        class={classes}
        aria-busy={this.loading ? 'true' : 'false'}
        part="base"
      >
        <slot name="icon-start" />
        <slot />
        <slot name="icon-end" />

        {this.loading && (
          <span class="opo-button__loader" part="loader">
            <slot name="loader">
              {/* Spinner por defecto */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9" />
              </svg>
            </slot>
          </span>
        )}
      </Tag>
    );
  }
}
