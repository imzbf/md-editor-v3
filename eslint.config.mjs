import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import prettierConfig from '@vue/eslint-config-prettier';

export default [
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  prettierConfig,
  {
    rules: {
      'vue/prefer-import-from-vue': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // a.x!
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
];
