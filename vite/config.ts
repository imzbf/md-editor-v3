import path from 'path';
import { UserConfigExport, ConfigEnv, BuildOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import markdown from '@vavt/vite-plugin-import-markdown';

import nodeService from './plugins/nodeService';

import { name } from '../package.json';

const OUT_DIR = '../lib';

const libBuildOptions: BuildOptions = {
  outDir: path.resolve(__dirname, OUT_DIR),
  lib: {
    entry: path.resolve(__dirname, '../MdEditor'),
    name: 'MdEditorV3',
    formats: ['es', 'cjs'],
    fileName(format) {
      switch (format) {
        case 'es': {
          return `${name}.mjs`;
        }
        case 'cjs': {
          return `${name}.cjs`;
        }
        default: {
          return '';
        }
      }
    }
  },
  rollupOptions: {
    external: [
      'vue',
      'medium-zoom',
      'lru-cache',
      'copy-to-clipboard',
      '@vavt/markdown-theme',
      'codemirror',
      /@codemirror\/.*/,
      /@lezer\/.*/,
      /markdown-it.*/
    ],
    output: {
      globals: {
        vue: 'Vue'
      }
    }
  }
};

const resolvePath = (p: string) => path.resolve(__dirname, p);

export default ({ mode }: ConfigEnv): UserConfigExport => {
  console.log('mode：', mode);

  return {
    base: '/',
    publicDir: mode === 'production' ? false : './dev/public',
    server: {
      host: 'localhost',
      open: true,
      port: 3344,
      https: false
    },
    resolve: {
      alias: {
        '@': resolvePath('../dev'),
        '~': resolvePath('../MdEditor')
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      mode !== 'production' && nodeService(),
      mode !== 'production' && markdown(),
      mode === 'production' &&
        dts({
          outputDir: resolvePath(`${OUT_DIR}/MdEditor`),
          include: [
            resolvePath('../MdEditor/type.ts'),
            resolvePath('../MdEditor/Editor.tsx'),
            resolvePath('../MdEditor/extensions/**/*.tsx'),
            resolvePath('../MdEditor/index.ts'),
            resolvePath('../MdEditor/config.ts'),
            resolvePath('../MdEditor/layouts/Content/composition/type.d.ts')
          ]
        })
    ],
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    build: mode === 'production' ? libBuildOptions : {}
  };
};
