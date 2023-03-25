module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'vue/prefer-import-from-vue': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // a.x!
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
};
