import globals from "globals";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    ...js.configs.recommended,
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelte.parsers.svelte,
      globals: globals.browser,
    },
    plugins: {
      svelte,
    },
    rules: {
      ...svelte.configs.recommended.rules,
    },
  },
];

/** @type {string[]} */
export const ignores = ["node_modules/", "dist/", "build/", ".vscode/", ".env"];
