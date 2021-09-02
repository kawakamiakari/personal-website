module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'react-app',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier',
  ],
  globals: {
    graphql: true,
    __PATH_PREFIX__: true,
    __BASE_PATH__: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'graphql',
    'jsx-a11y',
    'import',
  ],
  rules: {
    'no-anonymous-exports-page-templates': 'warn',
    'limited-exports-page-templates': 'warn',
  },
};
