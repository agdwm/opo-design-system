import { describe, expect, h, it, render } from '@stencil/vitest';

describe('opo-button', () => {
  it('renders slot content', async () => {
    const { root } = await render(<opo-button>CTA</opo-button>);

    await expect(root).toEqualHtml(`
      <opo-button class="hydrated">
        <mock:shadow-root>
          <button class="button button--primary" type="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
        CTA
      </opo-button>
    `);
  });
});
