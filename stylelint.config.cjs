/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],

  rules: {
    'order/properties-order': [
      [
        {
          groupName: 'custom-properties',
          properties: ['/^--/'],
        },

        {
          groupName: 'positioning',
          properties: ['position', 'z-index', 'inset', 'top', 'right', 'bottom', 'left'],
        },

        {
          groupName: 'layout',
          properties: [
            'display',
            'visibility',

            'overflow',
            'overflow-x',
            'overflow-y',

            'flex',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'flex-direction',
            'flex-wrap',

            'grid',
            'grid-template',
            'grid-template-columns',
            'grid-template-rows',
            'grid-auto-flow',
            'grid-column',
            'grid-row',

            'gap',
            'row-gap',
            'column-gap',

            'place-items',
            'align-items',
            'justify-content',
          ],
        },

        {
          groupName: 'sizing',
          properties: ['box-sizing', 'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'],
        },

        {
          groupName: 'spacing',
          properties: [
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
          ],
        },

        {
          groupName: 'border',
          properties: [
            'border',
            'border-width',
            'border-style',
            'border-color',

            'border-top',
            'border-top-width',
            'border-top-style',
            'border-top-color',

            'border-right',
            'border-bottom',
            'border-left',

            'border-radius',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius',

            'outline',
            'outline-width',
            'outline-style',
            'outline-color',
            'outline-offset',
          ],
        },

        {
          groupName: 'background',
          properties: [
            'background',
            'background-color',
            'background-image',
            'background-size',
            'background-position',
            'background-repeat',
            'box-shadow',
            'opacity',
          ],
        },

        {
          groupName: 'typography',
          properties: [
            'color',

            'font',
            'font-family',
            'font-size',
            'font-weight',
            'font-style',
            'line-height',
            'letter-spacing',

            'text-align',
            'text-transform',
            'text-decoration',

            'white-space',
            'word-break',
            'overflow-wrap',
          ],
        },

        {
          groupName: 'interaction',
          properties: ['appearance', 'cursor', 'pointer-events', 'user-select'],
        },

        {
          groupName: 'animation',
          properties: [
            'transition',
            'transition-property',
            'transition-duration',
            'transition-timing-function',
            'transition-delay',

            'transform',
            'transform-origin',

            'animation',
            'animation-name',
            'animation-duration',
            'animation-timing-function',
            'animation-delay',
            'animation-iteration-count',
          ],
        },
      ],

      {
        unspecified: 'bottomAlphabetical',
      },
    ],

    'color-hex-length': 'long',

    'selector-class-pattern': '^[a-z][a-z0-9-]*(?:__[a-z0-9-]+)?(?:--[a-z0-9-]+)?$',
    'selector-id-pattern': null,

    'custom-property-empty-line-before': null,
    'no-descending-specificity': null,
    'comment-empty-line-before': null,

    'value-keyword-case': null,
    'import-notation': null,

    'color-function-notation': 'modern',
    'alpha-value-notation': 'number',
    'hue-degree-notation': 'number',
    'lightness-notation': null,
  },
};
