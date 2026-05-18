import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  publicDir: '../dist',
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
