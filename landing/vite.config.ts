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
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["bs-local.com", "localhost", "127.0.0.1"],
  },
});
