import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
