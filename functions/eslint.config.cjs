const js = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const parser = require('@typescript-eslint/parser')

module.exports = [
  {
    ignores: ['lib/**/*'], // ✅ 全体適用のためにこの位置に移動
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
    },
  },
  js.configs.recommended,
]
