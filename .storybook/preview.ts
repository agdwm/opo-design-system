import type { Preview } from "@storybook/web-components-vite";
import { theme } from "./theme";
import { defineCustomElements } from "../loader";

import "../src/stylesheets/fonts";
import "../src/stylesheets/global.css";
import "../src/foundations/foundations.css";

// Register Stencil custom elements so Storybook can render shadow DOM and component styles.
defineCustomElements();

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    docs: {
      theme,
    },
    layout: "centered",
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Colors", "Typography", "Icons"],
          "Components",
          ["Atoms", "Molecules", "Blocks"],
        ],
      },
    },
  },
};

export default preview;
