module.exports = {
  globals: {
    NodeJS: true,
  },
  env: {
    jest: true,
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style': 'off',
    'brace-style': 'off',
    'no-new': 'off',
    'no-undef': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-use-before-define': 'off',
  },
}
