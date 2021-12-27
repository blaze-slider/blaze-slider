module.exports = {
  globals: {
    NodeJS: true
  },
  env: {
    jest: true,
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'brace-style': 'off'
  }
}
