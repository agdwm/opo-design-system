import { defineConfig } from "vite";

export default defineConfig({
  root: __dirname,
  publicDir: "../public",
  // server: {},

  server: {
    fs: {
      allow: [".."],
    },
    /* Expose dev server to local network devices
      (physical mobile devices, BrowserStack Local, etc.) */
    host: "0.0.0.0",
    /* Custom dev server port */
    port: 8080,
    /* Explicitly allow BrowserStack Local and localhost access */
    allowedHosts: ["bs-local.com", "localhost", "127.0.0.1"],
  },
});
