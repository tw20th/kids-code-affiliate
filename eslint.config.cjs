const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    // ✅ ビルド後のJSをESLint対象から除外
    ignores: ["node_modules", ".next", "out", "lib/**/*", "functions/lib/**/*"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: ["tsconfig.json", "functions/tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "@typescript-eslint/no-explicit-any": "error",
      "prettier/prettier": "error",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  js.configs.recommended,
  prettier,
];
