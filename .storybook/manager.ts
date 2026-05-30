import { addons } from "storybook/manager-api";
import "../src/stylesheets/fonts";

import { theme } from "./theme";

addons.setConfig({
  theme,
});
