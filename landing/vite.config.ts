import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

export default defineConfig({
  root: __dirname,
  publicDir: "../public",

  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },

  server: {
    fs: {
      allow: [".."],
    },
    /* Expose dev server to local network devices
    (physical mobile devices, BrowserStack, etc.) */
    host: "0.0.0.0",
    /* Custom dev server port */
    port: 8080,
    /* Explicitly allow Browserstack Local and localhost access */
    allowedHosts: ["bs-local.com", "localhost", "127.0.0.1"],
  },
});
