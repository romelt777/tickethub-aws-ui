import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    "extends": ["next/core-web-vitals", "plugin:react/recommended"],
    "plugins": ["react"],
    "rules": {
      "react/prop-types": "warn"
    }
  },
  pluginReact.configs.flat.recommended,
]);
