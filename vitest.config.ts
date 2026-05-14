import { defineVitestConfig } from '@stencil/vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    projects: [
      {
        test: {
          name: 'storybook',
          environment: 'jsdom',
          include: ['src/**/*.stories.{js,jsx,mjs,ts,tsx}'],
          exclude: ['src/**/*.cmp.test.{ts,tsx}', 'src/**/*.unit.test.{ts,tsx}'],
          plugins: [storybookTest({ configDir: '.storybook' })],
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      // Unit tests - stencil environment for component logic
      {
        test: {
          name: 'unit',
          include: ['src/**/*.unit.test.{ts,tsx}'],
          environment: 'stencil',
        },
      },
      // Component browser tests - real browser via Playwright
      {
        test: {
          name: 'browser',
          include: ['src/**/*.cmp.test.{ts,tsx}'],
          setupFiles: ['./vitest-setup.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
