module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint-config-airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    //    "arrow-body-style": [2, "always"]
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
  },
};
