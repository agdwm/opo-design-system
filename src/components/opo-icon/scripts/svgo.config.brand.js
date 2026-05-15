export default {
  plugins: [
    { removeViewBox: false },
    { cleanupIDs: true },
    { removeDimensions: true },
    { removeAttrs: { attrs: '(fill|stroke)' } },
  ],
};
