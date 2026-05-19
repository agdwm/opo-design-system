const sharedPlugins = [
  // removeDimensions does not break visual identity,
  // it only removes width/height from the root to allow scaling via CSS.
  { name: "removeDimensions" },

  {
    name: "removeAttrs",
    params: {
      // 'xmlns' delete to preserve namespace
      attrs: ["id", "data-name", "data-testid", "aria-hidden"],
    },
  },

  { name: "removeStyleElement" },
  { name: "removeScripts" },
  { name: "removeComments" },
  { name: "removeUselessDefs" },
  { name: "sortAttrs" },

  {
    name: "convertPathData",
    params: { floatPrecision: 3 },
  },
];

const safeSharedPlugins = [
  { name: "removeDimensions" },
  {
    name: "removeAttrs",
    params: {
      attrs: ["id", "data-name", "data-testid", "aria-hidden"],
    },
  },
  { name: "removeScripts" },
  { name: "removeComments" },
  { name: "removeUselessDefs" },
  { name: "sortAttrs" },
  {
    name: "convertPathData",
    params: { floatPrecision: 3 },
  },
];

const uiOnlyPlugins = [{ name: "removeStyleElement" }];

export function createSvgoConfig({
  presetOverrides,
  preserveBrandIdentity = false,
} = {}) {
  return {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        ...(presetOverrides ? { params: { overrides: presetOverrides } } : {}),
      },
      ...safeSharedPlugins,
      ...(preserveBrandIdentity ? [] : uiOnlyPlugins),
    ],
  };
}
