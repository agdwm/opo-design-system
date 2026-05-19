import { h } from '@stencil/core';
import { describe, expect, it, render } from '@stencil/vitest';

describe('opo-button', () => {
  it('renders with default props', async () => {
    const { root } = await render(<opo-button>Click me</opo-button>);
    const button = root.shadowRoot?.querySelector('button');

    expect(root).toHaveClass('hydrated');
    expect(button?.textContent).toContain('Click me');
  });

  it('applies correct variant class', async () => {
    const { root } = await render(<opo-button variant="destructive">Delete</opo-button>);
    const button = root.shadowRoot?.querySelector('button');

    expect(button?.className).toContain('opo-button--destructive');
  });

  it('shows loading state', async () => {
    const { root } = await render(<opo-button loading>Enviando...</opo-button>);
    const button = root.shadowRoot?.querySelector('button');

    expect(button?.className).toContain('opo-button--loading');
  });

  it('renders as link when href is provided', async () => {
    const { root } = await render(<opo-button href="/test">Link</opo-button>);
    const link = root.shadowRoot?.querySelector('a');
    expect(link).toBeTruthy();
  });
});
