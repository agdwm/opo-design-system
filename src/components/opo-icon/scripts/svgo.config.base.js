const sharedPlugins = [
  // Remove width/height from root <svg> so it scales via CSS
  { name: 'removeDimensions' },

  {
    name: 'removeAttrs',
    params: {
      attrs: ['id', 'data-name', 'data-testid', 'aria-hidden', 'xmlns'],
    },
  },

  { name: 'removeStyleElement' },
  { name: 'removeScripts' },
  { name: 'removeComments' },
  { name: 'removeUselessDefs' },
  { name: 'sortAttrs' },

  {
    name: 'convertPathData',
    params: { floatPrecision: 3 },
  },
];

export function createSvgoConfig({ presetOverrides } = {}) {
  return {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        ...(presetOverrides ? { params: { overrides: presetOverrides } } : {}),
      },
      ...sharedPlugins,
    ],
  };
}