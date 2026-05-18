import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: [
    { from: "./public", to: "/" },
    { from: "../dist/icons", to: "/icons" },
  ],
};

export default config;
