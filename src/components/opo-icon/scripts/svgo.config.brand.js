import { createSvgoConfig } from "./svgo.config.base.js";

export default createSvgoConfig({
  presetOverrides: {
    // Brand icons may include masks, clipPaths, gradients or filters.
    // Do not minify/remove IDs here because internal url(#id) references
    // can break when icons are later packed into an SVG sprite.
    cleanupIds: false,
    removeUselessDefs: false,
  },
  preserveBrandIdentity: true,
});
