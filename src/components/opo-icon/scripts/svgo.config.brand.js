import { createSvgoConfig } from "./svgo.config.base.js";

export default createSvgoConfig({
  presetOverrides: {
    cleanupIds: true,
  },
  preserveBrandIdentity: true,
});
