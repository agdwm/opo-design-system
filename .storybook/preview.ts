import type { Preview } from '@storybook/web-components-vite';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import '../src/global/global.css';
import '../src/foundations/foundations.css';
import '../dist/landing-challenge/landing-challenge.esm.js';

const preview: Preview = {
  parameters: {
    docs: {
      theme: {
        base: 'light',
        fontBase: 'IBM Plex Sans, system-ui, sans-serif',
        fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
        colorPrimary: '#ffb142',
        colorSecondary: '#59b3b3',
        appBg: '#ffffff',
        appContentBg: '#ffffff',
        appBorderColor: '#ebeaec',
        appBorderRadius: 8,
        appHoverBg: '#f5f5f5',
        appPreviewBg: '#ffffff',
        textColor: '#383641',
        textInverseColor: '#ffffff',
        textMutedColor: '#88868d',
        barTextColor: '#383641',
        barHoverColor: '#f5f5f5',
        barSelectedColor: '#ffb142',
        barBg: '#ffffff',
        buttonBg: '#f5f5f5',
        buttonBorder: '#ebeaec',
        booleanBg: '#ebeaec',
        booleanSelectedBg: '#ffb142',
      },
    },
    layout: 'centered',
  },
};

export default preview;
