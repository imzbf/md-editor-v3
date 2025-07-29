import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';

import parserTs from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      // Vue 文件主解析器
      parser: vueParser,
      globals: {
        ...globals.node,
        ...globals.browser
      },
      sourceType: 'module',
      parserOptions: {
        // 用于 <script lang="ts"> 的嵌套解析器
        parser: parserTs,
        // 告诉 TS 支持 .vue 文件
        extraFileExtensions: ['.vue'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    settings: {
      'import/resolver': {
        typescript: {} // 使用 tsconfig.json 中的 paths 字段
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // 不强制所有函数必须显式声明返回类型
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 不要求所有模块公有导出（函数、方法）必须显式声明参数与返回类型
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // 关闭“对 any 类型变量赋值”的限制（例如：const a: any = ...）
      // 在某些快速开发场景中可容忍此类不安全赋值
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // 关闭“对 any 类型成员访问”的限制（例如：a.b.c）
      // 适用于对第三方库、全局变量等非类型安全场景的宽松处理
      '@typescript-eslint/no-unsafe-member-access': 'off',
      // 关闭“对 any 类型函数返回值”的限制（例如：function foo(): any { ... }）
      '@typescript-eslint/no-unsafe-return': 'off',
      // 关闭“对 any 类型函数调用”的限制（例如：anyFunc()）
      // 可减少类型不完整时的报错干扰，但需自行保证调用安全性
      '@typescript-eslint/no-unsafe-call': 'off',
      // 关闭“未绑定方法直接赋值”的限制（例如：const fn = obj.method）
      // 在某些 class 实例或函数绑定场景下更方便使用
      '@typescript-eslint/unbound-method': 'off',

      // 标签内容不强制换行，与prettier冲突
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      // vue规则 br 会强制不使用/，与prettier冲突
      'vue/html-self-closing': 'off',
      'vue/no-v-html': 'off',

      // 属性强制使用camelCase
      'vue/attribute-hyphenation': [
        'error',
        'never',
        {
          ignore: [
            'accept-charset',
            'http-equiv',
            'accesskey',
            'contenteditable',
            'tabindex',
            'maxlength',
            'minlength',
            'autocomplete',
            'autocapitalize',
            'spellcheck',
            'crossorigin',
            'referrerpolicy',
            'aria-*',
            'data-*'
          ]
        }
      ],

      // 强制事件名使用camelCase
      'vue/v-on-event-hyphenation': [
        'error',
        'never',
        {
          autofix: true,
          ignore: []
        }
      ],

      // 强制组件名使用 PascalCase
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: []
        }
      ],

      // 每行最多 4 个属性
      'vue/max-attributes-per-line': [
        'off',
        {
          singleline: {
            max: 4
          },
          multiline: {
            max: 1
          }
        }
      ],

      // import 顺序规则
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'ignore',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
);
