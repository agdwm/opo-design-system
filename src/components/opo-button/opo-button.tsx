import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'opo-button',
  styleUrl: 'opo-button.css',
  shadow: true,
})
export class OpoButton {
  @Prop() variant: 'primary' | 'secondary' = 'primary';
  @Prop() disabled = false;

  @Event() opoClick: EventEmitter<void>;

  private handleClick = () => {
    if (!this.disabled) {
      this.opoClick.emit();
    }
  };

  render() {
    return (
      <button class={`button button--${this.variant}`} disabled={this.disabled} type="button" onClick={this.handleClick}>
        <slot />
      </button>
    );
  }
}
