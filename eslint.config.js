import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  { ignores: ["dist/", ".astro/", "node_modules/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  prettier,
  {
    // build-time Node code: the Astro config and the one-shot migration script
    files: ["*.mjs", "scripts/**/*.mjs"],
    languageOptions: { globals: globals.node },
  },
  {
    // client modules run in the browser
    files: ["src/scripts/**/*.ts", "src/lib/**/*.ts"],
    languageOptions: { globals: globals.browser },
  },
];
